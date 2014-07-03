// Date formatter
function dateFormatter(milis) {
	var date = new Date(milis);
	return date.toLocaleDateString();
}