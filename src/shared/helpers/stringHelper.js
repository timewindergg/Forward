export const normalizeName = (name) => {
	// return name.replace(/^\s+|\s+$/g,'').toLowerCase();
	return name.replace(/ /g, '').toLowerCase();
}
