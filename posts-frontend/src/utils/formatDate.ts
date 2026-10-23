function formatDate(date: string | Date): string {
	return new Date(date).toISOString().slice(0, 16).replace("T", " ");
}

export default formatDate;
