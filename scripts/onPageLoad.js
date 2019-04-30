function connectSlidersToFields() {
	/** @type {HTMLInputElement[]} */
	const sliders = (Array.from(document.getElementsByClassName("rangeSlider")));
	// For each slider
	for (let i=0; i<sliders.length; i++) {
		const slider = sliders[i];
		// console.log("slider");
		// console.log(slider);
		const field  = /**@type {HTMLInputElement}*/(document.getElementById(slider.id.replace("Slider", "Field")));
		
		if (field === null) { continue; }
		// console.log("field");
		// console.log(field);
		
		// Slider updates field
		slider.oninput = function() {
			field.value = this.value;
		}.bind(slider);
		// Field updates slider
		field.oninput = function() {
			if (this.value > this.max) {
				this.value = this.max
			}
			slider.value = this.value;
		}.bind(field);
		
		// Set field values based on slider, so we don't have to duplicate it in HTML
		field.min   = slider.min;
		field.max   = slider.max;
		field.step  = slider.step;
		field.value = slider.value;
	}
};
function attachSliderMarkings() {
	/** @type {HTMLInputElement[]} */
	const sliders = (Array.from(document.getElementsByClassName("rangeSlider")));
	const markeds = (sliders.filter((slider) => slider.hasAttribute("markings")));
	
	// console.log(sliders);
	// console.log(markeds);
	// For each marked slider
	for (let i=0; i<markeds.length; i++) {
		// console.log("OUTER");
		const slider = sliders[i];
		
		const marksString = slider.attributes.getNamedItem("markings").value;
		
		const noWhiteSpace  = marksString  .replace(/\s/gm, "");
		const doubleQuotes  = noWhiteSpace .replace(/'/gm , '"');
		const quotedStrings = doubleQuotes .replace(/([^"])([a-z_\-]+):/gm, '$1"$2":');
		const addedSpaces   = quotedStrings.replace(/(,|{|:)|(})/gm, "$1 $2");
		const noNumQuotes   = addedSpaces  .replace(/"((?:\d+)|null|undefined|NaN)"/gm, "$1");
		// console.log(noNumQuotes);
		
		const el/*marks*/ = JSON.parse(noNumQuotes);
		// console.log(el);
		const datalist = document.createElement("datalist");
		// For each marking
		for (let v = el.start; v <= el.end; v += el.step) {
			const mark = document.createElement("option");
			mark.value = v;
			datalist.appendChild(mark);
		}
		datalist.id = slider.id + "List";
		datalist.className = "sliderMarkingsList";
		slider.appendChild(datalist);
	}
};

/** @todo */
function doCompatibilityChanges() {
	if (CSS.supports("display", "grid") !== true) {
		console.log("NOSUPPORT");
	}
};



function onPageLoad() {
	connectSlidersToFields();
	attachSliderMarkings();
	doCompatibilityChanges();
	loadData();
	generatorsPanel.generate(units);
};

onPageLoad();
