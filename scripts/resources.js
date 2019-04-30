/**
 * @typedef Resource_T - Resource type
 * @property {number} ref      - Reference/ID number used internally.
 * @property {number} value    - How much of this resource there is(typically, how much the player has).
 */
/**
 * @typedef Resource_VISUAL_T - Displayable resource type
 * @property {Resource_T}   data     - 
 * @property {string}       name     - Name   shown to the user, if the current settings result in a textual display of this resource.
 * @property {string}      [symbol]  - Symbol shown to the user, if available and the current settings result in a symbolic display of this resource.
 * @property {string}      [iconURL] - Icon   shown to the user, if available and the current settings result in an iconographic display of this resource.
 * @property {HTMLElement} [element] - A reference to the resource panel element representing this resource.
 */
var typeDefCatcher;
const resources = {
	/** @type {Resource_T[]} */
	list: [{ ref: NaN, value: 0 }],
	/**
	 * @param {number} ref
	 */
	getByRef(ref) {
		return this.list.find((value) => ref === value.ref);
	},
};



/** @todo */
function loadInternalResources() {};
/** @todo */
function loadVisualResources() {};
/** @todo */
function loadAllResources() {};
