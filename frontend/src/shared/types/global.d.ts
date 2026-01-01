import type { CommandExecutor } from '@/shared/command';

declare global {
	/**
	 * 전역 커맨드 익스큐터 (디버깅/테스트 편의)
	 *
	 * - 앱 실행 시점에 `registerGlobalCommandExecutor()`가 등록합니다.
	 * - 사용 예: `globalThis.$CommandExecutor.execute('some-command', payload)`
	 */
	// eslint-disable-next-line no-var
	var $CommandExecutor: CommandExecutor;
}

export {};
