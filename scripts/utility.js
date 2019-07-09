/*
	todo: Create methods for property assignment of util.override and util.inputOrFallback, and replace many of the current setups with them (especially in components.js)
		propertyInputOrFallback(input, fallback, maxRecursions = 0, depth = 0) { ... } // AKA: objectFallbackMerge
		propertyInputOrOverride(input, override, maxRecursions = 0, depth = 0) { ... } // AKA: objectOverrideMerge
		EXAMPLE: 
			`propertyInputOrFallback(
				{ a: "hi", c: 5 },
				{ b: [7] , c: {name: "Bob", age: 27} }
			);`
			should return `{ a: "hi", b: [7], c: 5 }`
			and
			`propertyInputOrOverride(
				{ a: "hi", c: 5 },
				{ b: [7] , c: {name: "Bob", age: 27} }
			);`
			should return `{ a: "hi", b: [7], c: {name: "Bob", age: 27} }`
		if maxRecursions is a larger than 0, call this function again for any property ...
			... which is an object in (or array in?) both input and fallback/override,  ...
			... but with maxRecursions reduced by 1 and depth increased by 1.           ...
			... If depth becomes too large, propagate an error up to the caller,        ...
			... as we have most likely encountered a loop. Or perhaps we could          ...
			... send along a list of checked properties to each new recursion?
*/
const util = {
	/**
	 * @param  {any} input
	 * @return {boolean} false if input is null or undefined, otherwise true.
	 */
	exists(input) {
		return (input !== undefined && input !== null);
	},
	/**
	 * @template T
	 * @param  {T} override
	 * @param  {T} input
	 * @return {T} override if it exists, otherwise input.
	 */
	override(input, override) {
		return (this.exists(override))
			? override
			: input
		;
	},
	/**
	 * @template T
	 * @param  {T} input
	 * @param  {T} fallback
	 * @return {T} input if it exists, otherwise fallback.
	 */
	inputOrFallback(input, fallback) {
		return this.override(fallback, input);
	},
	/**
	 * @param {number} max - Exclusive
	 */
	rand(max) {
		return Math.random() * max;
	 },
	/**
	 * @param {number} min - Inclusive
	 * @param {number} max - Exclusive
	 */
	random(min, max) {
		return Math.random() * (max - min) + min;
	 },
	/**
	 * @param {number} max - Exclusive
	 */
	randInt(max) {
		return Math.floor(this.rand(Math.floor(max)));
	 },
	/**
	 * @param {number} min - Inclusive
	 * @param {number} max - Exclusive
	 */
	randomInt(min, max) {
		return Math.floor(this.random(Math.ceil(min), Math.floor(max)));
	 },
};
