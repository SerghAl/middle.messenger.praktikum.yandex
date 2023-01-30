export function checkCyrillicAndLat(input: string): boolean {
	let test = /^[A-ZА-Я][а-яА-Яa-zA-Z\-]*$/;
	return test.test(input);
}
