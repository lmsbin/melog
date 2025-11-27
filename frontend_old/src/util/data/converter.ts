export function stringify(param: any) {
	if (param instanceof Object) {
		return JSON.stringify(param);
	}
}
