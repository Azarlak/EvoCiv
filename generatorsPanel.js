// Generators: Units, Jobs, Buildings, etc.



// This should be foldable, so it doesn't take up space when not relevant
// Possibly also minified variant, as alternative to folding?
const unitsSection = {
	baseAttributes: [
		, ["class", "generatorSection"]
		, ["id", "unitsSection"]
	],
	/** @type { HTMLElement } */
	ref: null,
	/** @todo: Separate gathering/mining/something(no ingredients) units from crafting(ingredients) units */
	/**
	 * @typedef Recipe_T
	 * 
	 * @property {string[]}  products  - What each craft action creates.
	 * @property {string[]} [consumes] - What each craft action costs.
	 * @property {string[]} [requires] - Must be fulfilled for crafting, but not consumed.
	 */
	/** 
	 * @typedef TEMP_Unit_T
	 * @property {string}   short    - A short reference string for the unit.
	 * @property {string}   name     - The full name of the unit.
	 * @property {boolean}  unlocked - Whether the unit is unlocked or not.
	 * @property {Recipe_T} recipe   - NO_COMMENT_YET
	 */
	/** @type { Unit_T[] } */
	unitList: [
	],
};

/** @todo?: Change these to return the innerHTML instead of editing it here; Also means el does not need to get passed. */
/**
 * @param {Element} el
 * @param {Unit_T} unit
 */
function generateGainElement(el, unit) {
	const gain = unit.production_Component.production;
	
	if (!util.exists(gain)) { return false; }
	
	el.innerHTML = "";
	for (let i=0; i<gain.length; i++) {
		el.innerHTML += gain[i].flow + " " + gain[i].name;
	}
};
/**
 * @param {Element} el
 * @param {Unit_T} unit
 */
function generateDrainElement(el, unit) {
	const drain = unit.production_Component.consumption;
	
	if (!util.exists(drain)) { return false; }
	
	el.innerHTML = "";
	for (let i=0; i<drain.length; i++) {
		el.innerHTML += drain[i].flow + " " + drain[i].name;
	}
};
/**
 * @param {Element} el
 * @param {Unit_T} unit
 */
function generateNeedsElement(el, unit) {
	const needs = unit.production_Component.requirements;
	
	if (!util.exists(needs)) { return false; }
	
	el.innerHTML = "";
	for (let i=0; i<needs.length; i++) {
		el.innerHTML += needs[i].name + ": " + needs[i].value;
	}
};

/** @todo **/
function updatePanel() {};
/** @todo */
/** @param {Unit_T} unit */
function generateUnitItem(unit) {
	/** @type { HTMLTemplateElement } */
	const template = (document.getElementById("unitItem_TEMPLATE"));
	/** @type { HTMLElement } */
	const clone = (template.content.cloneNode(true));
	
	/** @type { HTMLElement } */
	const unit_El = (clone.firstElementChild);
	unit_El.id = unit.generic_Component.short + "UnitItem";
	unit_El.style.display = (unit.unlock_Component.unlocked)
		? "inline-block"
		: "none"
	;
	
	/** @type { HTMLElement } */
	const titleBar_El = (unit_El.getElementsByClassName("titleBar")[0]);
	const main_El     = (unit_El.getElementsByClassName("main"    )[0]); {
		titleBar_El.innerText = unit.resource_Component.name;
		
		/** @type { HTMLElement } */
		const thumbnail_El = (main_El.getElementsByClassName("thumbnail")[0]); // const thumbnail = document.createElement("image");
		thumbnail_El.innerText = "THUMB";
		
		const form_El = main_El.getElementsByClassName("allocator")[0]; {
			const allocator_El = form_El.getElementsByClassName("allocator"     )[0];
			/** @todo: Make sure this is only visible for units with multiple (unlocked) recipes? Possibly hint it but crossed/grayed out? */
			const recipe_El    = form_El.getElementsByClassName("recipeSelector")[0];
		}
		
		/** @todo: Should be a settings or in-panel/in-section toggle whether this is visible */
		const production_El = main_El.getElementsByClassName("productionDisplay")[0]; {
			const needs_El = production_El.getElementsByClassName("needs")[0];
			const drain_El = production_El.getElementsByClassName("drain")[0];
			const gain_El  = production_El.getElementsByClassName("gain" )[0];
			
			if (false === generateGainElement (gain_El , unit)) {  gain_El.remove(); }
			if (false === generateNeedsElement(needs_El, unit)) { needs_El.remove(); }
			if (false === generateDrainElement(drain_El, unit)) { drain_El.remove(); }
		}
	}
	return unit_El;
};


/** @todo */
const generatorsPanel = {
	/** @todo */
	hideAll() {
		
	},
	/* CONSIDER: Instead of generating stuff like this, maybe we should
			have it in the html document, and just hide/show as necessary?
	 */
	// /**
	//  * @todo
	//  * @param { Array.<string> | ? } [sections]
	//  */
	/* generate(sections) {
		unitsSection.ref = document.getElementById("unitsSection");
		
		for (let i=1; i<unitsSection.unitList.length; i++) {
			const unitElement = generateUnitItem(unitsSection.unitList[i]);
			unitsSection.ref.appendChild(unitElement);
		}
	}, */
	/**   @param {Units_T} units   */
	generate(units) { return generateUnitsSection(units); },
};

//generatorsPanel.generate([unitsSection]);




/* function generateUnitItem() {
	
}; */


/**   @param {Units_T} units   */
function generateUnitsSection(units) {
	unitsSection.ref = document.getElementById("unitsSection");	
	for (let i=0; i<units.list.length; i++) {
		const unitElement = generateUnitItem(units.list[i]);
		console.log(unitElement)
		unitsSection.ref.appendChild(unitElement);
	}
};