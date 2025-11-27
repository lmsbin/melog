/**
 * API 요청 스케줄러
 *
 * API 서버의 rate limiting을 준수하기 위해 각 요청 사이에 최소 500ms의 지연을 보장합니다.
 * 이벤트 기반으로 큐에 있는 요청을 순차적으로 처리합니다.
 */

const MIN_REQUEST_INTERVAL = 500; // 500ms
const queue: Array<() => void> = [];
let canProcess = true;

/**
 * 다음 요청이 실행될 수 있을 때까지 대기합니다.
 * 이전 요청이 완료된 후 최소 500ms가 지날 때까지 대기합니다.
 * 여러 요청이 동시에 들어와도 순차적으로 처리되도록 큐를 사용합니다.
 */
export async function waitForRequestInterval(): Promise<void> {
	return new Promise<void>((resolve) => {
		queue.push(resolve);
		// 큐에 새 요청이 들어왔으므로 작업 지시 이벤트 발생
		processNext();
	});
}

/**
 * 작업 지시 이벤트 핸들러
 * 작업 가능한 상황이면 큐에서 꺼내서 작업을 지시합니다.
 */
function processNext(): void {
	// 이미 작업 중이거나 큐가 비어있으면 무시
	if (!canProcess || queue.length === 0) {
		return;
	}

	// 작업 가능 상태를 false로 변경
	canProcess = false;

	// 큐에서 요청을 꺼내서 작업 지시
	const resolve = queue.shift()!;
	resolve();

	// 작업 완료 후 500ms 지연 후 다음 작업 지시 이벤트 발생
	setTimeout(() => {
		canProcess = true;
		processNext();
	}, MIN_REQUEST_INTERVAL);
}
