const util = {
	/**
	 * @param  {any} input
	 * @return {boolean} false if input is null or undefined, otherwise true.
	 */
	exists(input) {
		return (input !== undefined && input !== null);
	},
	/**
	 * @param  {any} override
	 * @param  {any} input
	 * @return {any} override if it exists, otherwise input.
	 */
	override(input, override) {
		return (this.exists(override))
			? override
			: input
		;
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