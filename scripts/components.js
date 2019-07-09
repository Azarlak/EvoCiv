"use strict";

/**
 * @typedef FuncArr_T
 * @type { Array.<{ ref: string, func: ((amount: number) => void) }> }
 */
/*
	@todo
	|| ( [...]       // culture<RESOURCE|CATEGORY> + tradition<RESOURCE|UNLOCKED> + ?inspiration<UNLOCKED> + ?policy<UNLOCKED><regulation>
	|| material(+istic)
	|| assignable: [?]
*/
// science<RESOURCE|CATEGORY> + knowledge<RESOURCE|CATEGORY> + tech(nology)<UNLOCKED> | For stuff that can be unlocked
/** @todo */
class Generic_Component { // Basically everything
	generateRef() {
		return Symbol("generic_Component Symbol");
		/* return util.randInt(Number.MAX_SAFE_INTEGER) + ""; */
	};
	
	/**
	 * @param {object} [opts = {}]
	 * @param {string|Symbol} [opts.ref = Generic_Component.generateRef()]
	 */
	constructor(opts = {}) {
		this.ref = util.inputOrFallback(opts.ref, this.generateRef());
	};
};
/** @todo */
class Unlock_Component { // [tech, tradition]
	/** @todo */
	unlock() {};
	/** @todo */
	lock() {};
	
	/**
	 * @param {object   } [opts = {}]
	 * @param {boolean  } [opts.isLocked = false]
	 * @param {FuncArr_T} [opts.onUnlock = []]
	 * @param {FuncArr_T} [opts.onLock   = []]
	 */
	constructor(opts = {}) {
		this.isLocked = util.inputOrFallback(opts.isLocked, false);
		this.onUnlock = util.inputOrFallback(opts.onUnlock, []);
		this.onLock   = util.inputOrFallback(opts.onLock  , []);
	};
};
/** @todo */
class Resource_Component {   // AKA: "(have, own(+er(+ship)), possess(+ion), property, retain, get, acquire/acquisition)+Component"
	// CONSIDER: Replace these two with `Gain_Component` (+`Drain_Component`)?
	/** @todo @return {function} */
	get gain() {
		return undefined; // @todo: FIXME
	};
	/** @todo @return {function} */
	get lose() {
		return undefined; // @todo: FIXME
	};
	
	/**
	 * @todo
	 * @param {object} [opts = {}]
	 * @param {number} [opts.value    = 0]
	 * @param {number} [opts.maxValue = Infinity]
	 * @param {string} [opts.name = ""]
	 */
	constructor(opts = {}) {
		this.value    = util.inputOrFallback(opts.value   , 0);
		this.maxValue = util.inputOrFallback(opts.maxValue, Infinity); // AKA: "limit" | NOTE: Storage/Something limit.
		this.name     = util.inputOrFallback(opts.name    , "");       // TODO: CONSIDER: "Move this to Generic_Component, and/or use Generic_Component.generateRef()?"
	};
};
class ResourceFlow {
	/**
	 * @param {string} name - Name of the resource.
	 * @param {number} flow - Change of the resource's value.
	 */
	constructor(name, flow) {
		this.name = name;
		this.flow = flow;
	};
}
/** @todo */
class Gain_Component_PROTO {
	
};
/** @todo */
class Gain_Component extends Gain_Component_PROTO {
	/**
	 * @param {number} [amount = 1]
	 * @param {GainMode_T} [mode]
	 */
	/** @todo */
	gain(amount = 1, mode) {};
	/**
	 * @typedef GainMode_T
	 * @type {0|1|2|3|4|5|6|7}
	 */
	/**
	 * @typedef GainModes_T
	 * @property { 0 } ADD - Denotes 'entity.resource_Component.value += amount'
	 * @property { 1 } LOG - Denotes harder and harder to earn resource based on currently owned amount.
	 * @property { 2 } CAP - Denotes 'entity.resource_Component.value += Math.min(amount, limit)'
	 * @property { 3 } MAX - Denotes 'entity.resource_Component.value  = entity.resource_Component.maxValue'
	 * @property { 4 } INC - Denotes 'entity.resource_Component.value += entity.gain_Component.default'
	 * @property { 5 } MUL - Denotes 'entity.resource_Component.value *= amount'
	 * @property { 6 } MID - Denotes that resource is harder to earn if you have or earn a lot or very little of it.
	 * @property { 7 } FUN - Denotes that a unique function needs to be called to determine gains.
	 */
	/** @type { GainModes_T } */
	static get GAIN_MODES() {
		return {
			ADD: 0,   // AKA: "ADDITIVE"   , "NORMAL"
			LOG: 1,   // AKA: "DIMINISHING", "LIMIT/*mathematical*/"
			CAP: 2,   // AKA: "CAPPED"     , "LIMITED" , "AT_MOST"   | NOTE: "Should use same 'limit' property as 'LOG'?"
			MAX: 3,   // AKA: "FIL", "FILL", "MAXIMIZE"
			INC: 4,   // AKA: "INCREMENT"  , "INCREASE", "STEP"
			MUL: 5,   // AKA: "MULTIPLY"
			MID: 6,   // AKA: "BELL_CURVE" , "BELL", 
			FUN: 7,   // AKA: "FUNCTION"   , "NAN" , "OTHER",
		};
	};
	
	/**
	 * @param {object}     [opts = {}]
	 * @param {number}     [opts.limit  = Infinity]
	 * @param {GainMode_T} [opts.mode   = Gain_Component.GAIN_MODES.ADD]
	 * // Having this be an array lets us add and remove checks that need to be done, for instance if 
	 * @param {FuncArr_T } [opts.onGain = []] - An array of containers of functions to be called when 'gain()' is called.
	 */
	constructor(opts = {}) {
		super();
		this.limit  = util.inputOrFallback(opts.limit , Infinity);
		this.mode   = util.inputOrFallback(opts.mode  , Gain_Component.GAIN_MODES.ADD);
		this.onGain = util.inputOrFallback(opts.onGain, []);
	};
};
/** @todo */
class Drain_Component {   // CONSIDER: "Is this just `Gain_Component` with negative values? If so, merge and have both an upper and lower limit on Gain_Component?"
	/**
	 * @param {object} [opts = {}]
	 * @param {FuncArr_T} [opts.onDrain = []]
	 */
	constructor(opts = {}) {
		//	Having this be an array lets us add and remove checks that need to be done,
		// for instance if some producer depends on this resource being above a certain level,
		// either as consumption or requirement?
		this.onDrain = util.inputOrFallback(opts.onDrain, []);
	};
};
/** @todo */
class Production_Component { // AKA: "(produce(r), make(r), ?(yield, earn, gain))+Component" | NOTE: This denotes an entity that can PRODUCE, not can BE produced
	// CONSIDER: Should consumption and yield be separate data/components,
	//           or should consumption simply be negative yield?
	/** @todo */
	produce() {};
	/** @todo */
	checkCanProduce() {};
	/** @type {boolean} */
	requirementsCheckCache; // @todo: This should go in prototype. This should be updated upon potentially being outdated, maybe by a central system which maintains some kind of list of what could be outdated by what?

	/**
	 * @typedef Requirement_T
	 * @type { { ref: string, name: string|number, value: number|boolean|string } }
	 */
	/**
	 * @param {object} opts
	 * @param {ResourceFlow[]}  [opts.production   = []] // Optional because some resources might self-die, and such a process wouldn't necessarily have opts.production
	 * @param {ResourceFlow[]}  [opts.consumption  = []] // At least one of opts.production and opts.consumption should be defined
	 * @param {Requirement_T[]} [opts.requirements = []]
	 * @param {number}    [opts.batchSize = 1 ]
	 * @param {FuncArr_T} [opts.onBatch   = []] 
	 */
	constructor(opts) {
		if (!util.exists(opts.production) && !util.exists(opts.consumption)) {
			throw("Production_Component() > neither_production_nor_consumption");
		}
		this.production   = util.inputOrFallback(opts.production  , []); // AKA: "yield", "production", "gain"
		this.consumption  = util.inputOrFallback(opts.consumption , []);
		this.requirements = util.inputOrFallback(opts.requirements, []);
		
		this.batchSize = util.inputOrFallback(opts.batchSize, 1);
		
		// this. productionCache = this.batchSize * this.gains;
		// this.consumptionCache = this.batchSize * this.drains;
		
		// Having this be an array lets us add and remove checks that need to be done
		this.onBatch = util.inputOrFallback(opts.onBatch, []); // AKA: "onProduce", "onProduction"
	};
};
/** @todo */
class Active_Component { // AKA: "activate_Component", "activation_Component"
	/** @todo */
	activate() {};
	/** @todo */
	deactivate() {};
	/** @todo */
	toggle() {};
	
	/**
	 * @param {object}    [opts = {}]
	 * @param {boolean}   [opts.isActive     = false]
	 * @param {FuncArr_T} [opts.onActivate   = []   ]
	 * @param {FuncArr_T} [opts.onDeactivate = []   ]
	 * @param {FuncArr_T} [opts.onToggle     = []   ]
	 */
	constructor(opts = {}) {
		this.isActive     =  util.inputOrFallback(opts.isActive    , false); // AKA: "isOn"
		this.onToggle     =  util.inputOrFallback(opts.onToggle    , []);
		this.onActivate   =  util.inputOrFallback(opts.onActivate  , []);
		this.onDeactivate =  util.inputOrFallback(opts.onDeactivate, []);
		//canActivate  : boolean; // AKA: "canTurnOn"
		//canDeactivate: boolean; // AKA: "canTurnOff"
	};
};
/** @todo */
class Run_Component { // Stuff that can happen over a(+n) (+in)finite period of time
	/**
	 * @typedef RunState_T
	 * @type {0|1|2|3}
	 */
	/**
	 * @typedef RunStates_T
	 * @property {0} STOPPED
	 * @property {1} RUNNING
	 * @property {2} PAUSED
	 * @property {3} WATING
	 */
	static get STATES() {
		return {
			STOPPED: 0,
			RUNNING: 1,
			/** @todo: What purpose does this serve which is not equally well served by 'STOPPED'? */
			PAUSED : 2,
			// When it wants to run, but can't for some temporary reason,
			// such as resource shortage, storage limit, etc.
			WAITING: 3, // AKA: ?"POLLING", ?"CHECKING"
		};
	 }
	/** @todo */
	start() {};
	/** @todo */
	stop () {};
	/** @todo */
	pause() {};
	/** @todo */
	unPause() {}; // Probably just calls start(), but first checks if it's paused to begin with?
	
	/**
	 * @param {object} [opts = {}]
	 * @param {RunState_T} [opts.state = Run_Component.STATES.STOPPED]
	 * 
	 * @param {boolean} [opts.canStart = true ]
	 * @param {boolean} [opts.canPause = false]
	 * @param {boolean} [opts.canStop  = true ]
	 * @param {boolean} [opts.canWait  = false]
	 * 
	 * @param {boolean} [opts.canFinish = false]
	 * @param {boolean} [opts.canRepeat = false]
	 * @param {number } [opts.repeatN   = 0    ]
	 * 
	 * @param {FuncArr_T} [opts.onStart   = []]
	 * @param {FuncArr_T} [opts.onPause   = []]
	 * @param {FuncArr_T} [opts.onStop    = []]
	 * @param {FuncArr_T} [opts.whileWait = []]
	 */
	constructor(opts = {}) {
		this.state = util.inputOrFallback(opts.state, Run_Component.STATES.STOPPED);
		
		this.canStart = util.inputOrFallback(opts.canStart, true );
		this.canPause = util.inputOrFallback(opts.canPause, false);
		this.canStop  = util.inputOrFallback(opts.canStop , true );
		this.canWait  = util.inputOrFallback(opts.canWait , false);
		
		this.canFinish = util.inputOrFallback(opts.canFinish, false); // AKA: ?"(+is)finishable", ?"(+is)indefinite", ?"(+is)finite"
		this.canRepeat = util.inputOrFallback(opts.canRepeat, false);
		this.repeatN   = util.inputOrFallback(opts.repeatN, 0);   // (-1 | Infinite): indefinitely, 0: not repeating. If canFinish===false or canRepeat===false, this never gets used.
		
		this.onStart   = util.inputOrFallback(opts.onStart  , []);
		this.onPause   = util.inputOrFallback(opts.onPause  , []);
		this.onStop    = util.inputOrFallback(opts.onStop   , []);
		this.whileWait = util.inputOrFallback(opts.whileWait, []);
	};
};
/** @todo */
class Tooltip_Component { // Stuff that has tooltips
	/** @todo: Create a text engine that allows for easily importing variable values dynamically into a text and update continually */
	/**
	 * @param {object} [opts = {}]
	 * @param {?} [opts.content] - Defaults to "Whoopsie! Looks like someone forgot to set the content of this tooltip!"
	 */
	constructor(opts = {}) {
		this.content = util.inputOrFallback(opts.content, "Whoopsie! Looks like someone forgot to set the content of this tooltip!");
	};
};
/* 
	collectable | gatherable | generateable // Stuff USER can produce for free   | IMPLIES: ?"GETTABLE", ?"PRODUCEABLE"
	growable    | generateable              // Stuff USER can produce indefinitely, though not necessarily infinitely(they don't run out, but production speed might be capped/limited) | IMPLIES: "PRODUCEABLE"
	craftable   | refineable                // Stuff USER can make from other things   | IMPLIES: ""
	refineable  | combineable | ingredient  // Stuff that can be made into other things
	achievable  | achievement               // Stuff that can measure user's accomplishments by, which automatically are given upon completion of something specific
	regenerateable | cloneable | multipliable | ?(breedable | farmable) // Stuff USER can produce if you have some of it already, possiby requiring some other resource as well, possibly being limited in terms of gain speed and/or storage limit | EXAMPLE: "plants", "livestock"
	occurable   | happenable | triggerable  // Stuff that can happen | AKA: "trigger_Component" | EXAMPLE: "events"
	cooldownable                            // Stuff that can have a cooldown
	switchable  | changeable | ?(swappable) // Stuff that can switch between states | EXAMPLE: "stuff that has modes"
	assignable
	buyable { cost: ResourceFlow_T }
	sellable
*/
