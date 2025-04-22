const { exec, execSync } = require('child_process');
const fs = require('fs/promises');

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
