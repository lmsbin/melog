const { exec } = require('child_process');
const fs = require('fs/promises');

// 프로젝트 루트에 .env 파일 생성
// .env 파일 내에 API_KEY=@@@@@@@ 설정
// 터미널에 node start

(async function main() {
	const file = await fs.readFile('.env', 'utf-8');
	const map = new Map(file.split('\r\n').map((x) => x.split('=')));
	const API_KEY = map.get('API_KEY');

	if (!API_KEY) {
		console.error('API_KEY not found');
		process.exit(1);
	}

	exec(`cd backend/src && cargo run ${API_KEY}`, { stdio: 'inherit' });
	exec('cd frontend && npm run dev', { stdio: 'inherit' });
})();
