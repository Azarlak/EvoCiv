/**
 * @todo: This bullshit won't work until it's hosted on a proper server apparently. Ugh. Github Pages I suppose?
 * @param {string} source
 */
function fetchJsonData(source) {
	// TEMP
	//return;
	const request = new XMLHttpRequest();
	request.open("GET", source);
	request.responseType = "json";
	//request.responseType = "text";
	request.send();
};
/**
 * @todo
 * @param {string} [source]
 */
function loadResourcesData(source) {};
/**
 * @todo
 * @param {string} [source]
 */
function loadUnitsData(source) {
	const data = fetchJsonData(util.inputOrFallback(source, "units.json"));
};
/** @todo */
function loadUserData() {};
/** @todo */
function loadData() {
	loadResourcesData();
	loadUnitsData();
};
