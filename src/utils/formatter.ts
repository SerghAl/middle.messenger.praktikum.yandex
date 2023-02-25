export function formatDate(dateString: string): string {
	let date = new Date(dateString);

	return `${date.getHours()}:${date.getMinutes()}`;
}
