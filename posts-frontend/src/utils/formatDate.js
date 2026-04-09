function formatDate(date) {
	return new Date(date).toISOString().slice(0, 16).replace("T", " ");
}

export default formatDate;
