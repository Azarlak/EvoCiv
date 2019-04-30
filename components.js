"use strict";

/**
 * @typedef FuncArr_T
 * @type { Array.<{ name: string, func: ((amount: number) => void) }> }
 */
/*
	|| ( [...]       // culture<RESOURCE|CATEGORY> + tradition<RESOURCE|UNLOCKED> + ?inspiration<UNLOCKED> + ?policy<UNLOCKED><regulation>
	|| material(+istic)
	|| assignable: [?]
*/
// science<RESOURCE|CATEGORY> + knowledge<RESOURCE|CATEGORY> + tech(nology)<UNLOCKED> | For stuff that can be unlocked
/** @todo */
class Generic_Component { // Basically everything
	generateShort() {
		return util.randInt(Number.MAX_SAFE_INTEGER) + "";
	};
	
	/**
	 * @param {object} [opts]
	 * @param {string} [opts.short]
	 */
	constructor(opts) {
		this.short = util.override(opts.short, this.generateShort());
	};
};
/** @todo */
class Unlock_Component { // [tech, tradition]
	/** @todo */
	unlock() {};
	/** @todo */
	lock() {};
	
	/**
	 * @param { object    } [opts]
	 * @param { boolean   } [opts.unlocked]
	 * @param { FuncArr_T } [opts.onUnlock]
	 * @param { FuncArr_T } [opts.onLock  ]
	 */
	constructor(opts) {
		this.unlocked = opts.unlocked;
		this.onUnlock = opts.onUnlock;
		this.onLock   = opts.onLock;
	};
};
/** @todo */
class Resource_Component {   // AKA: "(have, own(+er(+ship)), possess(+ion), property, retain, get, acquire/acquisition)+Component"
	// CONSIDER: Replace these two with 'Gain_Component' (+'Drain_Component')?
	/** @return {function} */
	get gain() { return undefined; };
	/** @return {function} */
	get lose() { return undefined; };
	
	/**
	 * @todo
	 * @param {object} [opts]
	 * @param {number} [opts.value]
	 * @param {number} [opts.maxValue]
	 * @param {string} [opts.name ]
	 */
	constructor(opts) {
		this.value    = util.override(opts.value   , 0);
		this.maxValue = util.override(opts.maxValue, Infinity); // AKA: "limit" | NOTE: Storage/Something limit.
		this.name     = util.override(opts.name    , "");       // TODO: CONSIDER: "Move this to Generic_Component?"
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
	/** @param {number} amount */
	/** @todo */
	gain(amount) {};
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
	/*static */get GAIN_MODES() {
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
		 * @param { object } [opts]
		 * 
		 * @param { GainModes_T } [opts.mode  ]
		 * @param { number      } [opts.limit ]
		 * // Having this be an array lets us add and remove checks that need to be done, for instance if 
		 * @param { FuncArr_T   } [opts.onGain] - An array of containers of functions to be called when 'gain()' is called.
		 */
	constructor(opts) {
		super();
		this.limit  = util.override(opts.limit, Infinity);
		this.mode   = util.override(opts.mode , this.GAIN_MODES.ADD);
		this.onGain = opts.onGain;
	};
};
/** @todo */
class Drain_Component {   // CONSIDER: "Is this just gain_Component with negative values? If so, have both an upper and lower limit?"
	/**
	 * @param {object} [opts]
	 * @param {FuncArr_T} [opts.onDrain]
	 */
	constructor(opts) {
		//	Having this be an array lets us add and remove checks that need to be done,
		// for instance if some producer depends on this resource being above a certain level,
		// either as consumption or requirement?
		util.override(opts.onDrain, undefined);
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
	//requirementsCheckCache; // This should go in prototype. This should be updated upon potentially being outdated, maybe by a central system which maintains?

	/**
	 * @typedef Requirements_T
	 * @type { Array.<{ name: string, value: (number | boolean | string) }> }
	 */
	/**
	 * @param {object} [opts]
	 * @param {ResourceFlow[]}  opts.production
	 * @param {ResourceFlow[]} [opts.consumption ]
	 * @param {Requirements_T} [opts.requirements]
	 * @param {number}    [opts.batchSize]
	 * @param {FuncArr_T} [opts.onBatch  ]
	 */
	constructor(opts) {
		this.production   = opts.production; // AKA: "yield", "production", "gain"
		this.consumption  = opts.consumption;
		this.requirements = opts.requirements;
		
		this.batchSize = opts.batchSize || 1;
		
		// this. productionCache = this.batchSize * this.gains;
		// this.consumptionCache = this.batchSize * this.drains;
		
		// Having this be an array lets us add and remove checks that need to be done
		/** @type {FuncArr_T} */
		this.onBatch = opts.onBatch; // AKA: "onProduce", "onProduction"
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
	 * @param {object}    [opts]
	 * @param {boolean}   [opts.isActive    ]
	 * @param {FuncArr_T} [opts.onActivate  ]
	 * @param {FuncArr_T} [opts.onDeactivate]
	 * @param {FuncArr_T} [opts.onToggle    ]
	 */
	constructor(opts) {
		this.isActive     = opts.isActive; // AKA: "isOn"
		this.onToggle     = opts.onToggle;
		this.onActivate   = opts.onActivate;
		this.onDeactivate = opts.onDeactivate;
		//canActivate  : boolean; // AKA: "canTurnOn"
		//canDeactivate: boolean; // AKA: "canTurnOff"
	};
};
/** @todo */
class Run_Component { // Stuff that can happen over a(+n) (+in)finite period of time
	/**
	 * @typedef RunStates_T
	 * @property {0} STOPPED
	 * @property {1} RUNNING
	 * @property {2} PAUSED
	 * @property {3} WATING
	 */
	get STATES() {
		return {
			STOPPED: 0,
			RUNNING: 1,
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
	 * @param {object} [opts]
	 * @param {RunStates_T} [opts.state]
	 * 
	 * @param {boolean} [opts.canStart]
	 * @param {boolean} [opts.canPause]
	 * @param {boolean} [opts.canStop ]
	 * @param {boolean} [opts.canWait ]
	 * 
	 * @param {boolean} [opts.canFinish]
	 * @param {boolean} [opts.canRepeat]
	 * @param {number } [opts.repeatN  ]
	 * 
	 * @param {FuncArr_T} [opts.onStart]
	 * @param {FuncArr_T} [opts.onPause]
	 * @param {FuncArr_T} [opts.onStop ]
	 * @param {FuncArr_T} [opts.whileWait]
	 */
	constructor(opts) {
		this.state = opts.state;
		
		this.canStart = opts.canStart;
		this.canPause = opts.canPause;
		this.canStop  = opts.canStop;
		this.canWait  = opts.canWait;
		
		this.canFinish = opts.canFinish; // AKA: ?"(+is)finishable", ?"(+is)indefinite", ?"(+is)finite"
		this.canRepeat = opts.canRepeat;
		this.repeatN   = opts.repeatN;   // // (-1 | Infinite): indefinitely, 0: not repeating. If canFinish = false, this never gets used.
		
		this.onStart   = opts.onStart;
		this.onPause   = opts.onPause;
		this.onStop    = opts.onStop;
		this.whileWait = opts.whileWait;
	};
};
/** @todo */
class Tooltip_Component { // Stuff that has tooltips
	
	/**
	 * @param {object} [opts]
	 * @param {?} [opts.content]
	 */
	constructor(opts) {
		this.content = opts.content;
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