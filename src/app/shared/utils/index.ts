export function formatDateToShort(isoDate: string): string {
	const date = new Date(isoDate);

	const day = date.getUTCDate().toString().padStart(2, "0");
	const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
	const year = date.getUTCFullYear().toString().slice(-2);

	return `${day}.${month}.${year}`;
}
