"use strict";

/**
 * @typedef Unit_T - Unit type
 * @property {Production_Component} production_Component
 * @property {  Resource_Component}   resource_Component
 * @property {   Generic_Component}    generic_Component
 * @property {    Unlock_Component}     unlock_Component
 * @property {number} ref   - Reference/ID number used internally.
 */
/**
 * @typedef Unit_VISUAL_T - Displayable unit type
 * @property {Unit_T}       data     - 
 * @property {string}       name     - Name   shown to the user, if the current settings result in a textual display of this unit.
 * @property {string}      [symbol]  - Symbol shown to the user, if available and the current settings result in a symbolic display of this unit.
 * @property {string}      [iconURL] - Icon   shown to the user, if available and the current settings result in an iconographic display of this unit.
 * @property {HTMLElement} [element] - A reference to the unit panel element representing this unit.
 */
/**
 * @typedef Units_T
 * @prop { Unit_T[] } list
 * @prop { (ref: number) => Unit_T } getByRef
 */
var typeDefCatcher;
/** @type {Units_T} */
const units = {
	/** @type {Unit_T[]} */
	list: [
		{
			ref: NaN,
			unlock_Component:     new     Unlock_Component({
				isLocked: false,
			 }),
			generic_Component:    new    Generic_Component({
				ref: "unit1",
			 }),
			resource_Component:   new   Resource_Component({
				name: "Unit 1",
				value: 0,
				maxValue: Infinity,
			 }),
			production_Component: new Production_Component({
				consumption: [new ResourceFlow("unit1DRAIN1", 1)],
				production:  [new ResourceFlow("unit1GAIN1 ", 1)],
			 }),
		}
	],
	/** @param {number} ref */
	getByRef(ref) {
		return this.list.find((value) => ref === value.ref);
	},
};



/** @todo */
function loadInternalUnits() {};
/** @todo */
function loadVisualUnits() {};
/** @todo */
function loadAllUnits() {};
