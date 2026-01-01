/**
 * 커맨드 익스큐터
 *
 * 목표:
 * - UI는 "커맨드 실행"만 호출하고, 비즈니스 로직은 커맨드 핸들러로 캡슐화합니다.
 * - 테스트에서는 executor에 handler를 등록/교체하여 쉽게 검증할 수 있습니다.
 */

export type CommandName = string;

export type Command<TPayload = unknown> = {
	name: CommandName;
	payload?: TPayload;
};

export type CommandHandler<TPayload = unknown, TResult = unknown> = (
	payload: TPayload | undefined
) => TResult | Promise<TResult>;

class CommandExecutor {
	private handlers = new Map<CommandName, CommandHandler<any, any>>();

	/**
	 * 커맨드 핸들러 등록
	 * - 같은 name이 이미 등록되어 있으면 덮어씁니다.
	 * - 반환값으로 unregister 함수를 제공합니다.
	 */
	register<TPayload = unknown, TResult = unknown>(
		name: CommandName,
		handler: CommandHandler<TPayload, TResult>
	) {
		this.handlers.set(name, handler);
		return () => this.unregister(name);
	}

	unregister(name: CommandName) {
		this.handlers.delete(name);
	}

	has(name: CommandName) {
		return this.handlers.has(name);
	}

	list() {
		return Array.from(this.handlers.keys());
	}

	clear() {
		this.handlers.clear();
	}

	execute<TPayload = unknown, TResult = unknown>(
		command: Command<TPayload>
	): TResult | Promise<TResult>;
	execute<TPayload = unknown, TResult = unknown>(
		name: CommandName,
		payload?: TPayload
	): TResult | Promise<TResult>;
	execute<TPayload = unknown, TResult = unknown>(
		arg1: Command<TPayload> | CommandName,
		arg2?: TPayload
	) {
		const name = typeof arg1 === 'string' ? arg1 : arg1.name;
		const payload = typeof arg1 === 'string' ? arg2 : arg1.payload;

		const handler = this.handlers.get(name);
		if (!handler) {
			throw new Error(
				`[CommandExecutor] 등록되지 않은 커맨드입니다: "${name}"`
			);
		}

		return handler(payload) as TResult | Promise<TResult>;
	}
}

/**
 * 앱에서 기본으로 사용하는 싱글톤 익스큐터
 * - UI/비즈니스 로직 어디에서든 import로 접근 가능
 */
export default new CommandExecutor();
