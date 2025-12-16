const { spawn, exec } = require('child_process');
const fs = require('fs/promises');
const http = require('http');

// 프로젝트 루트에 .env 파일 생성
// .env 파일 내에 API_KEY=@@@@@@@ 설정
// 터미널에 node start

// 브라우저를 여는 함수 (Windows 전용)
function openBrowser(url) {
	exec(`start "" "${url}"`, (error) => {
		if (error) {
			console.error('브라우저를 열 수 없습니다:', error);
		}
	});
}

// 특정 HTTP 서버가 준비될 때까지 주기적으로 요청을 보내서 확인
function waitForServer(url, { timeoutMs = 60_000, intervalMs = 1_000 } = {}) {
	return new Promise((resolve, reject) => {
		const startTime = Date.now();

		const check = () => {
			const request = http.get(url, (res) => {
				// 응답 바디는 사용하지 않으므로 바로 소모
				res.resume();

				// 2xx~4xx 응답이면 "서버가 살아 있다"고 보고 준비 완료로 간주
				if (
					res.statusCode &&
					res.statusCode >= 200 &&
					res.statusCode < 500
				) {
					return resolve();
				}

				retry();
			});

			request.on('error', () => {
				retry();
			});
		};

		const retry = () => {
			if (Date.now() - startTime > timeoutMs) {
				return reject(
					new Error('서버가 지정된 시간 안에 준비되지 않았습니다.')
				);
			}

			setTimeout(check, intervalMs);
		};

		check();
	});
}

(async function main() {
	console.log('🌱 환경 설정 파일(.env)을 읽는 중입니다...');

	const file = await fs.readFile('.env', 'utf-8');
	const map = new Map(file.split('\r\n').map((x) => x.split('=')));
	const API_KEY = map.get('API_KEY');

	if (!API_KEY) {
		console.error(
			'❌ API_KEY not found (.env 파일에 API_KEY=... 를 설정하세요)'
		);
		process.exit(1);
	}

	console.log('🔑 API_KEY 확인 완료. 서버들을 순차적으로 시작합니다.');

	// 백엔드 서버 시작
	console.log('🚀 백엔드 서버를 시작합니다... (backend/src, cargo run)');
	const backend = spawn('cargo', ['run', API_KEY], {
		cwd: 'backend/src',
		stdio: 'inherit',
		shell: true,
	});

	// 프론트엔드 서버 시작
	console.log(
		'🚀 프론트엔드 개발 서버를 시작합니다... (frontend, npm run dev)'
	);
	const frontend = spawn('npm', ['run', 'dev'], {
		cwd: 'frontend',
		stdio: 'inherit',
		shell: true,
	});

	frontend.on('exit', (code) => {
		if (code === 0) {
			console.log(
				'✅ 프론트엔드 개발 서버 프로세스가 정상적으로 종료되었습니다.'
			);
		} else {
			console.error(
				`❌ 프론트엔드 개발 서버 프로세스가 비정상 종료되었습니다. (exit code: ${code})`
			);
		}
	});

	// 프론트엔드 서버가 실제로 준비될 때까지 HTTP 요청으로 확인한 뒤 브라우저 열기
	const url = 'http://localhost:5173';
	console.log(`⏳ 프론트엔드 서버 준비 상태를 확인 중입니다... (${url})`);

	try {
		await waitForServer(url, { timeoutMs: 120_000, intervalMs: 2_000 });
		console.log(
			`✅ 프론트엔드 서버가 준비되었습니다. 브라우저를 엽니다: ${url}`
		);
		openBrowser(url);
	} catch (error) {
		console.error(
			'⚠️ 프론트엔드 서버가 일정 시간 내에 준비되지 않았습니다. 브라우저를 자동으로 열지 않습니다.'
		);
		console.error(error.message);
	}
})();
