// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/fp-ts/lib/ChainRec.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 1.0.0
 */
exports.tailRec = function (f, a) {
    var v = f(a);
    while (v.isLeft()) {
        v = f(v.value);
    }
    return v.value;
};

},{}],"node_modules/fp-ts/lib/function.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 1.0.0
 */
exports.identity = function (a) {
    return a;
};
/**
 * @since 1.0.0
 */
exports.unsafeCoerce = exports.identity;
/**
 * @since 1.0.0
 */
exports.not = function (predicate) {
    return function (a) { return !predicate(a); };
};
function or(p1, p2) {
    return function (a) { return p1(a) || p2(a); };
}
exports.or = or;
/**
 * @since 1.0.0
 * @deprecated
 */
exports.and = function (p1, p2) {
    return function (a) { return p1(a) && p2(a); };
};
/**
 * @since 1.0.0
 */
exports.constant = function (a) {
    return function () { return a; };
};
/**
 * A thunk that returns always `true`
 *
 * @since 1.0.0
 */
exports.constTrue = function () {
    return true;
};
/**
 * A thunk that returns always `false`
 *
 * @since 1.0.0
 */
exports.constFalse = function () {
    return false;
};
/**
 * A thunk that returns always `null`
 *
 * @since 1.0.0
 */
exports.constNull = function () {
    return null;
};
/**
 * A thunk that returns always `undefined`
 *
 * @since 1.0.0
 */
exports.constUndefined = function () {
    return;
};
/**
 * A thunk that returns always `void`
 *
 * @since 1.14.0
 */
exports.constVoid = function () {
    return;
};
/**
 * Flips the order of the arguments to a function of two arguments.
 *
 * @since 1.0.0
 */
// tslint:disable-next-line: deprecation
exports.flip = function (f) {
    return function (b) { return function (a) { return f(a)(b); }; };
};
/**
 * The `on` function is used to change the domain of a binary operator.
 *
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
exports.on = function (op) { return function (f) {
    return function (x, y) { return op(f(x), f(y)); };
}; };
function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    var len = fns.length - 1;
    return function (x) {
        var y = x;
        for (var i = len; i > -1; i--) {
            y = fns[i].call(this, y);
        }
        return y;
    };
}
exports.compose = compose;
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    var len = fns.length - 1;
    return function (x) {
        var y = x;
        for (var i = 0; i <= len; i++) {
            y = fns[i].call(this, y);
        }
        return y;
    };
}
exports.pipe = pipe;
/**
 * @since 1.0.0
 * @deprecated
 */
exports.concat = function (x, y) {
    var lenx = x.length;
    if (lenx === 0) {
        return y;
    }
    var leny = y.length;
    if (leny === 0) {
        return x;
    }
    var r = Array(lenx + leny);
    for (var i = 0; i < lenx; i++) {
        r[i] = x[i];
    }
    for (var i = 0; i < leny; i++) {
        r[i + lenx] = y[i];
    }
    return r;
};
/**
 * @since 1.0.0
 * @deprecated
 */
function curried(f, n, acc) {
    return function (x) {
        // tslint:disable-next-line: deprecation
        var combined = exports.concat(acc, [x]);
        // tslint:disable-next-line: deprecation
        return n === 0 ? f.apply(this, combined) : curried(f, n - 1, combined);
    };
}
exports.curried = curried;
function curry(f) {
    // tslint:disable-next-line: deprecation
    return curried(f, f.length - 1, []);
}
exports.curry = curry;
/* tslint:disable-next-line */
var getFunctionName = function (f) { return f.displayName || f.name || "<function" + f.length + ">"; };
/**
 * @since 1.0.0
 * @deprecated
 */
exports.toString = function (x) {
    if (typeof x === 'string') {
        return JSON.stringify(x);
    }
    if (x instanceof Date) {
        return "new Date('" + x.toISOString() + "')";
    }
    if (Array.isArray(x)) {
        // tslint:disable-next-line: deprecation
        return "[" + x.map(exports.toString).join(', ') + "]";
    }
    if (typeof x === 'function') {
        return getFunctionName(x);
    }
    if (x == null) {
        return String(x);
    }
    if (typeof x.toString === 'function' && x.toString !== Object.prototype.toString) {
        return x.toString();
    }
    try {
        return JSON.stringify(x, null, 2);
    }
    catch (e) {
        return String(x);
    }
};
/**
 * @since 1.0.0
 */
exports.tuple = function () {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
};
/**
 * @since 1.0.0
 * @deprecated
 */
exports.tupleCurried = function (a) { return function (b) {
    return [a, b];
}; };
/**
 * Applies a function to an argument ($)
 *
 * @since 1.0.0
 * @deprecated
 */
exports.apply = function (f) { return function (a) {
    return f(a);
}; };
/**
 * Applies an argument to a function (#)
 *
 * @since 1.0.0
 * @deprecated
 */
exports.applyFlipped = function (a) { return function (f) {
    return f(a);
}; };
/**
 * For use with phantom fields
 *
 * @since 1.0.0
 * @deprecated
 */
exports.phantom = undefined;
/**
 * A thunk that returns always the `identity` function.
 * For use with `applySecond` methods.
 *
 * @since 1.5.0
 * @deprecated
 */
exports.constIdentity = function () {
    return exports.identity;
};
/**
 * @since 1.9.0
 */
exports.increment = function (n) {
    return n + 1;
};
/**
 * @since 1.9.0
 */
exports.decrement = function (n) {
    return n - 1;
};
/**
 * @since 1.18.0
 */
function absurd(_) {
    throw new Error('Called `absurd` function which should be uncallable');
}
exports.absurd = absurd;
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
}
exports.flow = flow;

},{}],"node_modules/fp-ts/lib/pipeable.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        case 10:
            return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
    }
}
exports.pipe = pipe;
var isFunctor = function (I) { return typeof I.map === 'function'; };
var isContravariant = function (I) { return typeof I.contramap === 'function'; };
var isFunctorWithIndex = function (I) { return typeof I.mapWithIndex === 'function'; };
var isApply = function (I) { return typeof I.ap === 'function'; };
var isChain = function (I) { return typeof I.chain === 'function'; };
var isBifunctor = function (I) { return typeof I.bimap === 'function'; };
var isExtend = function (I) { return typeof I.extend === 'function'; };
var isFoldable = function (I) { return typeof I.reduce === 'function'; };
var isFoldableWithIndex = function (I) { return typeof I.reduceWithIndex === 'function'; };
var isAlt = function (I) { return typeof I.alt === 'function'; };
var isCompactable = function (I) { return typeof I.compact === 'function'; };
var isFilterable = function (I) { return typeof I.filter === 'function'; };
var isFilterableWithIndex = function (I) {
    return typeof I.filterWithIndex === 'function';
};
var isProfunctor = function (I) { return typeof I.promap === 'function'; };
var isSemigroupoid = function (I) { return typeof I.compose === 'function'; };
var isMonadThrow = function (I) { return typeof I.throwError === 'function'; };
function pipeable(I) {
    var r = {};
    if (isFunctor(I)) {
        var map = function (f) { return function (fa) { return I.map(fa, f); }; };
        r.map = map;
    }
    if (isContravariant(I)) {
        var contramap = function (f) { return function (fa) { return I.contramap(fa, f); }; };
        r.contramap = contramap;
    }
    if (isFunctorWithIndex(I)) {
        var mapWithIndex = function (f) { return function (fa) { return I.mapWithIndex(fa, f); }; };
        r.mapWithIndex = mapWithIndex;
    }
    if (isApply(I)) {
        var ap = function (fa) { return function (fab) { return I.ap(fab, fa); }; };
        var apFirst = function (fb) { return function (fa) { return I.ap(I.map(fa, function (a) { return function () { return a; }; }), fb); }; };
        r.ap = ap;
        r.apFirst = apFirst;
        r.apSecond = function (fb) { return function (fa) { return I.ap(I.map(fa, function () { return function (b) { return b; }; }), fb); }; };
    }
    if (isChain(I)) {
        var chain = function (f) { return function (ma) { return I.chain(ma, f); }; };
        var chainFirst = function (f) { return function (ma) { return I.chain(ma, function (a) { return I.map(f(a), function () { return a; }); }); }; };
        var flatten = function (mma) { return I.chain(mma, function_1.identity); };
        r.chain = chain;
        r.chainFirst = chainFirst;
        r.flatten = flatten;
    }
    if (isBifunctor(I)) {
        var bimap = function (f, g) { return function (fa) { return I.bimap(fa, f, g); }; };
        var mapLeft = function (f) { return function (fa) { return I.bimap(fa, f, function_1.identity); }; };
        r.bimap = bimap;
        r.mapLeft = mapLeft;
    }
    if (isExtend(I)) {
        var extend = function (f) { return function (wa) { return I.extend(wa, f); }; };
        var duplicate = function (wa) { return I.extend(wa, function_1.identity); };
        r.extend = extend;
        r.duplicate = duplicate;
    }
    if (isFoldable(I)) {
        var reduce = function (b, f) { return function (fa) { return I.reduce(fa, b, f); }; };
        var foldMap = function (M) {
            var foldMapM = I.foldMap(M);
            return function (f) { return function (fa) { return foldMapM(fa, f); }; };
        };
        var reduceRight = function (b, f) { return function (fa) { return I.foldr(fa, b, f); }; };
        r.reduce = reduce;
        r.foldMap = foldMap;
        r.reduceRight = reduceRight;
    }
    if (isFoldableWithIndex(I)) {
        var reduceWithIndex = function (b, f) { return function (fa) {
            return I.reduceWithIndex(fa, b, f);
        }; };
        var foldMapWithIndex = function (M) {
            var foldMapM = I.foldMapWithIndex(M);
            return function (f) { return function (fa) { return foldMapM(fa, f); }; };
        };
        var reduceRightWithIndex = function (b, f) { return function (fa) {
            return I.foldrWithIndex(fa, b, f);
        }; };
        r.reduceWithIndex = reduceWithIndex;
        r.foldMapWithIndex = foldMapWithIndex;
        r.reduceRightWithIndex = reduceRightWithIndex;
    }
    if (isAlt(I)) {
        var alt = function (that) { return function (fa) { return I.alt(fa, that()); }; };
        r.alt = alt;
    }
    if (isCompactable(I)) {
        r.compact = I.compact;
        r.separate = I.separate;
    }
    if (isFilterable(I)) {
        var filter = function (predicate) { return function (fa) {
            return I.filter(fa, predicate);
        }; };
        var filterMap = function (f) { return function (fa) { return I.filterMap(fa, f); }; };
        var partition = function (predicate) { return function (fa) {
            return I.partition(fa, predicate);
        }; };
        var partitionMap = function (f) { return function (fa) { return I.partitionMap(fa, f); }; };
        r.filter = filter;
        r.filterMap = filterMap;
        r.partition = partition;
        r.partitionMap = partitionMap;
    }
    if (isFilterableWithIndex(I)) {
        var filterWithIndex = function (predicateWithIndex) { return function (fa) { return I.filterWithIndex(fa, predicateWithIndex); }; };
        var filterMapWithIndex = function (f) { return function (fa) {
            return I.filterMapWithIndex(fa, f);
        }; };
        var partitionWithIndex = function (predicateWithIndex) { return function (fa) { return I.partitionWithIndex(fa, predicateWithIndex); }; };
        var partitionMapWithIndex = function (f) { return function (fa) {
            return I.partitionMapWithIndex(fa, f);
        }; };
        r.filterWithIndex = filterWithIndex;
        r.filterMapWithIndex = filterMapWithIndex;
        r.partitionWithIndex = partitionWithIndex;
        r.partitionMapWithIndex = partitionMapWithIndex;
    }
    if (isProfunctor(I)) {
        var promap = function (f, g) { return function (fa) { return I.promap(fa, f, g); }; };
        r.promap = promap;
    }
    if (isSemigroupoid(I)) {
        var compose = function (that) { return function (fa) {
            return I.compose(fa, that);
        }; };
        r.compose = compose;
    }
    if (isMonadThrow(I)) {
        var fromOption = function (onNone) { return function (ma) {
            return ma._tag === 'None' ? I.throwError(onNone()) : I.of(ma.value);
        }; };
        var fromEither = function (ma) {
            return ma._tag === 'Left' ? I.throwError(ma.value) : I.of(ma.value);
        };
        var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? I.of(a) : I.throwError(onFalse(a))); }; };
        var filterOrElse = function (predicate, onFalse) { return function (ma) { return I.chain(ma, function (a) { return (predicate(a) ? I.of(a) : I.throwError(onFalse(a))); }); }; };
        r.fromOption = fromOption;
        r.fromEither = fromEither;
        r.fromPredicate = fromPredicate;
        r.filterOrElse = filterOrElse;
    }
    return r;
}
exports.pipeable = pipeable;

},{"./function":"node_modules/fp-ts/lib/function.js"}],"node_modules/fp-ts/lib/Eq.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pipeable_1 = require("./pipeable");
/**
 * @since 1.19.0
 */
exports.URI = 'Eq';
/**
 * @since 1.19.0
 */
function fromEquals(equals) {
    return {
        equals: function (x, y) { return x === y || equals(x, y); }
    };
}
exports.fromEquals = fromEquals;
/**
 * @since 1.19.0
 */
function strictEqual(a, b) {
    return a === b;
}
exports.strictEqual = strictEqual;
var eqStrict = { equals: strictEqual };
/**
 * @since 1.19.0
 */
exports.eqString = eqStrict;
/**
 * @since 1.19.0
 */
exports.eqNumber = eqStrict;
/**
 * @since 1.19.0
 */
exports.eqBoolean = eqStrict;
/**
 * @since 1.19.0
 */
function getStructEq(eqs) {
    return fromEquals(function (x, y) {
        for (var k in eqs) {
            if (!eqs[k].equals(x[k], y[k])) {
                return false;
            }
        }
        return true;
    });
}
exports.getStructEq = getStructEq;
/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @example
 * import { getTupleEq, eqString, eqNumber, eqBoolean } from 'fp-ts/lib/Eq'
 *
 * const E = getTupleEq(eqString, eqNumber, eqBoolean)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @since 1.19.0
 */
function getTupleEq() {
    var eqs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eqs[_i] = arguments[_i];
    }
    return fromEquals(function (x, y) { return eqs.every(function (E, i) { return E.equals(x[i], y[i]); }); });
}
exports.getTupleEq = getTupleEq;
/**
 * @since 1.19.0
 */
exports.eq = {
    URI: exports.URI,
    contramap: function (fa, f) { return fromEquals(function (x, y) { return fa.equals(f(x), f(y)); }); }
};
var contramap = pipeable_1.pipeable(exports.eq).contramap;
exports.contramap = contramap;
/**
 * @since 1.19.0
 */
exports.eqDate = exports.eq.contramap(exports.eqNumber, function (date) { return date.valueOf(); });

},{"./pipeable":"node_modules/fp-ts/lib/pipeable.js"}],"node_modules/fp-ts/lib/Either.js":[function(require,module,exports) {
"use strict";
/**
 * @file Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.
 *
 * ```ts
 * const parse = (errorMessage: string) => (input: string): Either<string, number> => {
 *   const n = parseInt(input, 10)
 *   return isNaN(n) ? left(errorMessage) : right(n)
 * }
 * ```
 *
 * `Either` is right-biased, which means that `Right` is assumed to be the default case to operate on. If it is `Left`,
 * operations like `map`, `chain`, ... return the `Left` value unchanged:
 *
 * ```ts
 * right(12).map(double) // right(24)
 * left(23).map(double)  // left(23)
 * ```
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChainRec_1 = require("./ChainRec");
var function_1 = require("./function");
var Eq_1 = require("./Eq");
var pipeable_1 = require("./pipeable");
exports.URI = 'Either';
/**
 * Left side of `Either`
 */
var Left = /** @class */ (function () {
    function Left(value) {
        this.value = value;
        this._tag = 'Left';
    }
    /**
     * The given function is applied if this is a `Right`
     * @obsolete
     */
    Left.prototype.map = function (f) {
        return this;
    };
    /** @obsolete */
    Left.prototype.ap = function (fab) {
        return (fab.isLeft() ? fab : this);
    };
    /**
     * Flipped version of `ap`
     * @obsolete
     */
    Left.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    /**
     * Binds the given function across `Right`
     * @obsolete
     */
    Left.prototype.chain = function (f) {
        return this;
    };
    /** @obsolete */
    Left.prototype.bimap = function (f, g) {
        return new Left(f(this.value));
    };
    /** @obsolete */
    Left.prototype.alt = function (fy) {
        return fy;
    };
    /**
     * Lazy version of `alt`
     *
     * @example
     * import { right } from 'fp-ts/lib/Either'
     *
     * assert.deepStrictEqual(right(1).orElse(() => right(2)), right(1))
     *
     * @since 1.6.0
     * @obsolete
     */
    Left.prototype.orElse = function (fy) {
        return fy(this.value);
    };
    /** @obsolete */
    Left.prototype.extend = function (f) {
        return this;
    };
    /** @obsolete */
    Left.prototype.reduce = function (b, f) {
        return b;
    };
    /**
     * Applies a function to each case in the data structure
     * @obsolete
     */
    Left.prototype.fold = function (onLeft, onRight) {
        return onLeft(this.value);
    };
    /**
     * Returns the value from this `Right` or the given argument if this is a `Left`
     * @obsolete
     */
    Left.prototype.getOrElse = function (a) {
        return a;
    };
    /**
     * Returns the value from this `Right` or the result of given argument if this is a `Left`
     * @obsolete
     */
    Left.prototype.getOrElseL = function (f) {
        return f(this.value);
    };
    /**
     * Maps the left side of the disjunction
     * @obsolete
     */
    Left.prototype.mapLeft = function (f) {
        return new Left(f(this.value));
    };
    Left.prototype.inspect = function () {
        return this.toString();
    };
    Left.prototype.toString = function () {
        // tslint:disable-next-line: deprecation
        return "left(" + function_1.toString(this.value) + ")";
    };
    /**
     * Returns `true` if the either is an instance of `Left`, `false` otherwise
     * @obsolete
     */
    Left.prototype.isLeft = function () {
        return true;
    };
    /**
     * Returns `true` if the either is an instance of `Right`, `false` otherwise
     * @obsolete
     */
    Left.prototype.isRight = function () {
        return false;
    };
    /**
     * Swaps the disjunction values
     * @obsolete
     */
    Left.prototype.swap = function () {
        return new Right(this.value);
    };
    Left.prototype.filterOrElse = function (_, zero) {
        return this;
    };
    Left.prototype.filterOrElseL = function (_, zero) {
        return this;
    };
    /**
     * Use `filterOrElse` instead
     * @since 1.6.0
     * @deprecated
     */
    Left.prototype.refineOrElse = function (p, zero) {
        return this;
    };
    /**
     * Lazy version of `refineOrElse`
     * Use `filterOrElseL` instead
     * @since 1.6.0
     * @deprecated
     */
    Left.prototype.refineOrElseL = function (p, zero) {
        return this;
    };
    return Left;
}());
exports.Left = Left;
/**
 * Right side of `Either`
 */
var Right = /** @class */ (function () {
    function Right(value) {
        this.value = value;
        this._tag = 'Right';
    }
    Right.prototype.map = function (f) {
        return new Right(f(this.value));
    };
    Right.prototype.ap = function (fab) {
        return fab.isRight() ? this.map(fab.value) : exports.left(fab.value);
    };
    Right.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    Right.prototype.chain = function (f) {
        return f(this.value);
    };
    Right.prototype.bimap = function (f, g) {
        return new Right(g(this.value));
    };
    Right.prototype.alt = function (fy) {
        return this;
    };
    Right.prototype.orElse = function (fy) {
        return this;
    };
    Right.prototype.extend = function (f) {
        return new Right(f(this));
    };
    Right.prototype.reduce = function (b, f) {
        return f(b, this.value);
    };
    Right.prototype.fold = function (onLeft, onRight) {
        return onRight(this.value);
    };
    Right.prototype.getOrElse = function (a) {
        return this.value;
    };
    Right.prototype.getOrElseL = function (f) {
        return this.value;
    };
    Right.prototype.mapLeft = function (f) {
        return new Right(this.value);
    };
    Right.prototype.inspect = function () {
        return this.toString();
    };
    Right.prototype.toString = function () {
        // tslint:disable-next-line: deprecation
        return "right(" + function_1.toString(this.value) + ")";
    };
    Right.prototype.isLeft = function () {
        return false;
    };
    Right.prototype.isRight = function () {
        return true;
    };
    Right.prototype.swap = function () {
        return new Left(this.value);
    };
    Right.prototype.filterOrElse = function (p, zero) {
        return p(this.value) ? this : exports.left(zero);
    };
    Right.prototype.filterOrElseL = function (p, zero) {
        return p(this.value) ? this : exports.left(zero(this.value));
    };
    Right.prototype.refineOrElse = function (p, zero) {
        return p(this.value) ? this : exports.left(zero);
    };
    Right.prototype.refineOrElseL = function (p, zero) {
        return p(this.value) ? this : exports.left(zero(this.value));
    };
    return Right;
}());
exports.Right = Right;
/**
 * @since 1.17.0
 */
exports.getShow = function (SL, SA) {
    return {
        show: function (e) { return e.fold(function (l) { return "left(" + SL.show(l) + ")"; }, function (a) { return "right(" + SA.show(a) + ")"; }); }
    };
};
/**
 * Use `getEq`
 *
 * @since 1.0.0
 * @deprecated
 */
exports.getSetoid = getEq;
/**
 * @since 1.19.0
 */
function getEq(EL, EA) {
    return Eq_1.fromEquals(function (x, y) {
        return x.isLeft() ? y.isLeft() && EL.equals(x.value, y.value) : y.isRight() && EA.equals(x.value, y.value);
    });
}
exports.getEq = getEq;
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 1.7.0
 */
exports.getSemigroup = function (S) {
    return {
        concat: function (x, y) { return (y.isLeft() ? x : x.isLeft() ? y : exports.right(S.concat(x.value, y.value))); }
    };
};
/**
 * `Apply` semigroup
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 1.7.0
 */
exports.getApplySemigroup = function (S) {
    return {
        concat: function (x, y) { return (x.isLeft() ? x : y.isLeft() ? y : exports.right(S.concat(x.value, y.value))); }
    };
};
/**
 * @since 1.7.0
 */
exports.getApplyMonoid = function (M) {
    return __assign({}, exports.getApplySemigroup(M), { empty: exports.right(M.empty) });
};
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @since 1.0.0
 */
exports.left = function (l) {
    return new Left(l);
};
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @since 1.0.0
 */
exports.right = function (a) {
    return new Right(a);
};
/**
 * Use `fromPredicate` instead
 *
 * @since 1.6.0
 * @deprecated
 */
exports.fromRefinement = function (refinement, onFalse) { return function (a) {
    return refinement(a) ? exports.right(a) : exports.left(onFalse(a));
}; };
/**
 * Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use
 * the provided default as a `Left`
 *
 * @since 1.0.0
 */
exports.fromOption = function (onNone) { return function (fa) {
    return fa.isNone() ? exports.left(onNone) : exports.right(fa.value);
}; };
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @since 1.0.0
 */
exports.fromNullable = function (defaultValue) { return function (a) {
    return a == null ? exports.left(defaultValue) : exports.right(a);
}; };
/**
 * Default value for the optional `onerror` argument of `tryCatch`
 *
 * @since 1.0.0
 */
exports.toError = function (e) {
    if (e instanceof Error) {
        return e;
    }
    else {
        return new Error(String(e));
    }
};
/**
 * Use `tryCatch2v` instead
 *
 * @since 1.0.0
 * @deprecated
 */
exports.tryCatch = function (f, onerror) {
    if (onerror === void 0) { onerror = exports.toError; }
    return exports.tryCatch2v(f, onerror);
};
/**
 * Constructs a new `Either` from a function that might throw
 *
 * @example
 * import { Either, left, right, tryCatch2v } from 'fp-ts/lib/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch2v(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @since 1.11.0
 */
exports.tryCatch2v = function (f, onerror) {
    try {
        return exports.right(f());
    }
    catch (e) {
        return exports.left(onerror(e));
    }
};
/**
 * @since 1.0.0
 */
exports.fromValidation = function (fa) {
    return fa.isFailure() ? exports.left(fa.value) : exports.right(fa.value);
};
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @since 1.0.0
 */
exports.isLeft = function (fa) {
    return fa.isLeft();
};
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @since 1.0.0
 */
exports.isRight = function (fa) {
    return fa.isRight();
};
/**
 * Use `getWitherable`
 *
 * @since 1.7.0
 * @deprecated
 */
function getCompactable(ML) {
    var compact = function (fa) {
        if (fa.isLeft()) {
            return fa;
        }
        if (fa.value.isNone()) {
            return exports.left(ML.empty);
        }
        return exports.right(fa.value.value);
    };
    var separate = function (fa) {
        if (fa.isLeft()) {
            return {
                left: fa,
                right: fa
            };
        }
        if (fa.value.isLeft()) {
            return {
                left: exports.right(fa.value.value),
                right: exports.left(ML.empty)
            };
        }
        return {
            left: exports.left(ML.empty),
            right: exports.right(fa.value.value)
        };
    };
    return {
        URI: exports.URI,
        _L: undefined,
        compact: compact,
        separate: separate
    };
}
exports.getCompactable = getCompactable;
/**
 * Use `getWitherable`
 *
 * @since 1.7.0
 * @deprecated
 */
function getFilterable(ML) {
    // tslint:disable-next-line: deprecation
    var C = getCompactable(ML);
    var partitionMap = function (fa, f) {
        if (fa.isLeft()) {
            return {
                left: fa,
                right: fa
            };
        }
        var e = f(fa.value);
        if (e.isLeft()) {
            return {
                left: exports.right(e.value),
                right: exports.left(ML.empty)
            };
        }
        return {
            left: exports.left(ML.empty),
            right: exports.right(e.value)
        };
    };
    var partition = function (fa, p) {
        if (fa.isLeft()) {
            return {
                left: fa,
                right: fa
            };
        }
        if (p(fa.value)) {
            return {
                left: exports.left(ML.empty),
                right: exports.right(fa.value)
            };
        }
        return {
            left: exports.right(fa.value),
            right: exports.left(ML.empty)
        };
    };
    var filterMap = function (fa, f) {
        if (fa.isLeft()) {
            return fa;
        }
        var optionB = f(fa.value);
        if (optionB.isSome()) {
            return exports.right(optionB.value);
        }
        return exports.left(ML.empty);
    };
    var filter = function (fa, p) { return fa.filterOrElse(p, ML.empty); };
    return __assign({}, C, { map: exports.either.map, partitionMap: partitionMap,
        filterMap: filterMap,
        partition: partition,
        filter: filter });
}
exports.getFilterable = getFilterable;
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @since 1.7.0
 */
function getWitherable(ML) {
    // tslint:disable-next-line: deprecation
    var filterableEither = getFilterable(ML);
    var wither = function (F) {
        var traverseF = exports.either.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), filterableEither.compact); };
    };
    var wilt = function (F) {
        var traverseF = exports.either.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), filterableEither.separate); };
    };
    return __assign({}, filterableEither, { traverse: exports.either.traverse, reduce: exports.either.reduce, wither: wither,
        wilt: wilt });
}
exports.getWitherable = getWitherable;
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError).value, { a: 1 })
 * assert.deepStrictEqual(parseJSON('{"a":}', toError).value, new SyntaxError('Unexpected token } in JSON at position 5'))
 *
 * @since 1.16.0
 */
exports.parseJSON = function (s, onError) {
    return exports.tryCatch2v(function () { return JSON.parse(s); }, onError);
};
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import { stringifyJSON, toError } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError).value, '{"a":1}')
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(stringifyJSON(circular, toError).value, new TypeError('Converting circular structure to JSON'))
 *
 * @since 1.16.0
 */
exports.stringifyJSON = function (u, onError) {
    return exports.tryCatch2v(function () { return JSON.stringify(u); }, onError);
};
var throwError = exports.left;
var fromEither = function_1.identity;
/**
 * @since 1.0.0
 */
exports.either = {
    URI: exports.URI,
    map: function (ma, f) { return ma.map(f); },
    of: exports.right,
    ap: function (mab, ma) { return ma.ap(mab); },
    chain: function (ma, f) { return ma.chain(f); },
    reduce: function (fa, b, f) { return fa.reduce(b, f); },
    foldMap: function (M) { return function (fa, f) { return (fa.isLeft() ? M.empty : f(fa.value)); }; },
    foldr: function (fa, b, f) { return (fa.isLeft() ? b : f(fa.value, b)); },
    traverse: function (F) { return function (ta, f) {
        return ta.isLeft() ? F.of(exports.left(ta.value)) : F.map(f(ta.value), exports.right);
    }; },
    sequence: function (F) { return function (ta) {
        return ta.isLeft() ? F.of(exports.left(ta.value)) : F.map(ta.value, exports.right);
    }; },
    bimap: function (fla, f, g) { return fla.bimap(f, g); },
    alt: function (mx, my) { return mx.alt(my); },
    extend: function (wa, f) { return wa.extend(f); },
    chainRec: function (a, f) {
        return ChainRec_1.tailRec(function (e) {
            if (e.isLeft()) {
                return exports.right(exports.left(e.value));
            }
            else {
                var r = e.value;
                return r.isLeft() ? exports.left(f(r.value)) : exports.right(exports.right(r.value));
            }
        }, f(a));
    },
    throwError: throwError,
    fromEither: fromEither,
    fromOption: function (o, e) { return (o.isNone() ? throwError(e) : exports.right(o.value)); }
};
//
// backporting
//
/**
 * @since 1.19.0
 */
function fold(onLeft, onRight) {
    return function (ma) { return ma.fold(onLeft, onRight); };
}
exports.fold = fold;
/**
 * @since 1.19.0
 */
function orElse(f) {
    return function (ma) { return ma.orElse(f); };
}
exports.orElse = orElse;
/**
 * @since 1.19.0
 */
function getOrElse(f) {
    return function (ma) { return ma.getOrElseL(f); };
}
exports.getOrElse = getOrElse;
/**
 * @since 1.19.0
 */
function elem(E) {
    return function (a) { return function (ma) { return (exports.isLeft(ma) ? false : E.equals(a, ma.value)); }; };
}
exports.elem = elem;
/**
 * @since 1.19.0
 */
function getValidation(S) {
    return {
        URI: exports.URI,
        _L: undefined,
        map: exports.either.map,
        of: exports.either.of,
        ap: function (mab, ma) {
            return exports.isLeft(mab)
                ? exports.isLeft(ma)
                    ? exports.left(S.concat(mab.value, ma.value))
                    : mab
                : exports.isLeft(ma)
                    ? ma
                    : exports.right(mab.value(ma.value));
        },
        chain: exports.either.chain,
        alt: function (fx, fy) {
            if (exports.isRight(fx)) {
                return fx;
            }
            return exports.isLeft(fy) ? exports.left(S.concat(fx.value, fy.value)) : fy;
        }
    };
}
exports.getValidation = getValidation;
/**
 * @since 1.19.0
 */
function getValidationSemigroup(SE, SA) {
    return {
        concat: function (fx, fy) {
            return exports.isLeft(fx)
                ? exports.isLeft(fy)
                    ? exports.left(SE.concat(fx.value, fy.value))
                    : fx
                : exports.isLeft(fy)
                    ? fy
                    : exports.right(SA.concat(fx.value, fy.value));
        }
    };
}
exports.getValidationSemigroup = getValidationSemigroup;
/**
 * @since 1.19.0
 */
function getValidationMonoid(SE, SA) {
    return {
        concat: getValidationSemigroup(SE, SA).concat,
        empty: exports.right(SA.empty)
    };
}
exports.getValidationMonoid = getValidationMonoid;
var _a = pipeable_1.pipeable(exports.either), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, bimap = _a.bimap, chain = _a.chain, chainFirst = _a.chainFirst, duplicate = _a.duplicate, extend = _a.extend, flatten = _a.flatten, foldMap = _a.foldMap, map = _a.map, mapLeft = _a.mapLeft, reduce = _a.reduce, reduceRight = _a.reduceRight, fromPredicate = _a.fromPredicate, filterOrElse = _a.filterOrElse, pipeableFromOption = _a.fromOption;
exports.alt = alt;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.bimap = bimap;
exports.chain = chain;
exports.chainFirst = chainFirst;
exports.duplicate = duplicate;
exports.extend = extend;
exports.flatten = flatten;
exports.foldMap = foldMap;
exports.map = map;
exports.mapLeft = mapLeft;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.fromPredicate = fromPredicate;
exports.filterOrElse = filterOrElse;
/**
 * Lazy version of `fromOption`
 *
 * @since 1.3.0
 */
exports.fromOptionL = pipeableFromOption;

},{"./ChainRec":"node_modules/fp-ts/lib/ChainRec.js","./function":"node_modules/fp-ts/lib/function.js","./Eq":"node_modules/fp-ts/lib/Eq.js","./pipeable":"node_modules/fp-ts/lib/pipeable.js"}],"node_modules/io-ts/lib/index.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Either_1 = require("fp-ts/lib/Either");

var Type =
/** @class */
function () {
  function Type(
  /** a unique name for this runtime type */
  name,
  /** a custom type guard */
  is,
  /** succeeds if a value of type I can be decoded to a value of type A */
  validate,
  /** converts a value of type A to a value of type O */
  encode) {
    this.name = name;
    this.is = is;
    this.validate = validate;
    this.encode = encode;
  }

  Type.prototype.pipe = function (ab, name) {
    var _this = this;

    if (name === void 0) {
      name = "pipe(" + this.name + ", " + ab.name + ")";
    }

    return new Type(name, ab.is, function (i, c) {
      var validation = _this.validate(i, c);

      if (validation.isLeft()) {
        return validation;
      } else {
        return ab.validate(validation.value, c);
      }
    }, this.encode === exports.identity && ab.encode === exports.identity ? exports.identity : function (b) {
      return _this.encode(ab.encode(b));
    });
  };

  Type.prototype.asDecoder = function () {
    return this;
  };

  Type.prototype.asEncoder = function () {
    return this;
  };
  /** a version of `validate` with a default context */


  Type.prototype.decode = function (i) {
    return this.validate(i, exports.getDefaultContext(this));
  };

  return Type;
}();

exports.Type = Type;

exports.identity = function (a) {
  return a;
};

exports.getFunctionName = function (f) {
  return f.displayName || f.name || "<function" + f.length + ">";
};

exports.getContextEntry = function (key, type) {
  return {
    key: key,
    type: type
  };
};

exports.getValidationError = function (value, context) {
  return {
    value: value,
    context: context
  };
};

exports.getDefaultContext = function (type) {
  return [{
    key: '',
    type: type
  }];
};

exports.appendContext = function (c, key, type) {
  var len = c.length;
  var r = Array(len + 1);

  for (var i = 0; i < len; i++) {
    r[i] = c[i];
  }

  r[len] = {
    key: key,
    type: type
  };
  return r;
};

exports.failures = function (errors) {
  return new Either_1.Left(errors);
};

exports.failure = function (value, context) {
  return exports.failures([exports.getValidationError(value, context)]);
};

exports.success = function (value) {
  return new Either_1.Right(value);
};

var pushAll = function (xs, ys) {
  var l = ys.length;

  for (var i = 0; i < l; i++) {
    xs.push(ys[i]);
  }
}; //
// basic types
//


var NullType =
/** @class */
function (_super) {
  __extends(NullType, _super);

  function NullType() {
    var _this = _super.call(this, 'null', function (m) {
      return m === null;
    }, function (m, c) {
      return _this.is(m) ? exports.success(m) : exports.failure(m, c);
    }, exports.identity) || this;

    _this._tag = 'NullType';
    return _this;
  }

  return NullType;
}(Type);

exports.NullType = NullType;
/** @alias `null` */

exports.nullType = new NullType();
exports.null = exports.nullType;

var UndefinedType =
/** @class */
function (_super) {
  __extends(UndefinedType, _super);

  function UndefinedType() {
    var _this = _super.call(this, 'undefined', function (m) {
      return m === void 0;
    }, function (m, c) {
      return _this.is(m) ? exports.success(m) : exports.failure(m, c);
    }, exports.identity) || this;

    _this._tag = 'UndefinedType';
    return _this;
  }

  return UndefinedType;
}(Type);

exports.UndefinedType = UndefinedType;
var undefinedType = new UndefinedType();
exports.undefined = undefinedType;

var VoidType =
/** @class */
function (_super) {
  __extends(VoidType, _super);

  function VoidType() {
    var _this = _super.call(this, 'void', undefinedType.is, undefinedType.validate, exports.identity) || this;

    _this._tag = 'VoidType';
    return _this;
  }

  return VoidType;
}(Type);

exports.VoidType = VoidType;
/** @alias `void` */

exports.voidType = new VoidType();
exports.void = exports.voidType;

var AnyType =
/** @class */
function (_super) {
  __extends(AnyType, _super);

  function AnyType() {
    var _this = _super.call(this, 'any', function (_) {
      return true;
    }, exports.success, exports.identity) || this;

    _this._tag = 'AnyType';
    return _this;
  }

  return AnyType;
}(Type);

exports.AnyType = AnyType;
exports.any = new AnyType();

var NeverType =
/** @class */
function (_super) {
  __extends(NeverType, _super);

  function NeverType() {
    var _this = _super.call(this, 'never', function (_) {
      return false;
    }, function (m, c) {
      return exports.failure(m, c);
    },
    /* istanbul ignore next */
    function () {
      throw new Error('cannot encode never');
    }) || this;

    _this._tag = 'NeverType';
    return _this;
  }

  return NeverType;
}(Type);

exports.NeverType = NeverType;
exports.never = new NeverType();

var StringType =
/** @class */
function (_super) {
  __extends(StringType, _super);

  function StringType() {
    var _this = _super.call(this, 'string', function (m) {
      return typeof m === 'string';
    }, function (m, c) {
      return _this.is(m) ? exports.success(m) : exports.failure(m, c);
    }, exports.identity) || this;

    _this._tag = 'StringType';
    return _this;
  }

  return StringType;
}(Type);

exports.StringType = StringType;
exports.string = new StringType();

var NumberType =
/** @class */
function (_super) {
  __extends(NumberType, _super);

  function NumberType() {
    var _this = _super.call(this, 'number', function (m) {
      return typeof m === 'number';
    }, function (m, c) {
      return _this.is(m) ? exports.success(m) : exports.failure(m, c);
    }, exports.identity) || this;

    _this._tag = 'NumberType';
    return _this;
  }

  return NumberType;
}(Type);

exports.NumberType = NumberType;
exports.number = new NumberType();

var BooleanType =
/** @class */
function (_super) {
  __extends(BooleanType, _super);

  function BooleanType() {
    var _this = _super.call(this, 'boolean', function (m) {
      return typeof m === 'boolean';
    }, function (m, c) {
      return _this.is(m) ? exports.success(m) : exports.failure(m, c);
    }, exports.identity) || this;

    _this._tag = 'BooleanType';
    return _this;
  }

  return BooleanType;
}(Type);

exports.BooleanType = BooleanType;
exports.boolean = new BooleanType();

var AnyArrayType =
/** @class */
function (_super) {
  __extends(AnyArrayType, _super);

  function AnyArrayType() {
    var _this = _super.call(this, 'Array', Array.isArray, function (m, c) {
      return _this.is(m) ? exports.success(m) : exports.failure(m, c);
    }, exports.identity) || this;

    _this._tag = 'AnyArrayType';
    return _this;
  }

  return AnyArrayType;
}(Type);

exports.AnyArrayType = AnyArrayType;
var arrayType = new AnyArrayType();
exports.Array = arrayType;

var AnyDictionaryType =
/** @class */
function (_super) {
  __extends(AnyDictionaryType, _super);

  function AnyDictionaryType() {
    var _this = _super.call(this, 'Dictionary', function (m) {
      return m !== null && typeof m === 'object';
    }, function (m, c) {
      return _this.is(m) ? exports.success(m) : exports.failure(m, c);
    }, exports.identity) || this;

    _this._tag = 'AnyDictionaryType';
    return _this;
  }

  return AnyDictionaryType;
}(Type);

exports.AnyDictionaryType = AnyDictionaryType;
exports.Dictionary = new AnyDictionaryType();

var ObjectType =
/** @class */
function (_super) {
  __extends(ObjectType, _super);

  function ObjectType() {
    var _this = _super.call(this, 'object', exports.Dictionary.is, exports.Dictionary.validate, exports.identity) || this;

    _this._tag = 'ObjectType';
    return _this;
  }

  return ObjectType;
}(Type);

exports.ObjectType = ObjectType;
exports.object = new ObjectType();

var FunctionType =
/** @class */
function (_super) {
  __extends(FunctionType, _super);

  function FunctionType() {
    var _this = _super.call(this, 'Function', // tslint:disable-next-line:strict-type-predicates
    function (m) {
      return typeof m === 'function';
    }, function (m, c) {
      return _this.is(m) ? exports.success(m) : exports.failure(m, c);
    }, exports.identity) || this;

    _this._tag = 'FunctionType';
    return _this;
  }

  return FunctionType;
}(Type);

exports.FunctionType = FunctionType;
exports.Function = new FunctionType(); //
// refinements
//

var RefinementType =
/** @class */
function (_super) {
  __extends(RefinementType, _super);

  function RefinementType(name, is, validate, encode, type, predicate) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.type = type;
    _this.predicate = predicate;
    _this._tag = 'RefinementType';
    return _this;
  }

  return RefinementType;
}(Type);

exports.RefinementType = RefinementType;

exports.refinement = function (type, predicate, name) {
  if (name === void 0) {
    name = "(" + type.name + " | " + exports.getFunctionName(predicate) + ")";
  }

  return new RefinementType(name, function (m) {
    return type.is(m) && predicate(m);
  }, function (i, c) {
    var validation = type.validate(i, c);

    if (validation.isLeft()) {
      return validation;
    } else {
      var a = validation.value;
      return predicate(a) ? exports.success(a) : exports.failure(a, c);
    }
  }, type.encode, type, predicate);
};

exports.Integer = exports.refinement(exports.number, function (n) {
  return n % 1 === 0;
}, 'Integer'); //
// literals
//

var LiteralType =
/** @class */
function (_super) {
  __extends(LiteralType, _super);

  function LiteralType(name, is, validate, encode, value) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.value = value;
    _this._tag = 'LiteralType';
    return _this;
  }

  return LiteralType;
}(Type);

exports.LiteralType = LiteralType;

exports.literal = function (value, name) {
  if (name === void 0) {
    name = JSON.stringify(value);
  }

  var is = function (m) {
    return m === value;
  };

  return new LiteralType(name, is, function (m, c) {
    return is(m) ? exports.success(value) : exports.failure(m, c);
  }, exports.identity, value);
}; //
// keyof
//


var KeyofType =
/** @class */
function (_super) {
  __extends(KeyofType, _super);

  function KeyofType(name, is, validate, encode, keys) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.keys = keys;
    _this._tag = 'KeyofType';
    return _this;
  }

  return KeyofType;
}(Type);

exports.KeyofType = KeyofType;
var hasOwnProperty = Object.prototype.hasOwnProperty;

exports.keyof = function (keys, name) {
  if (name === void 0) {
    name = "(keyof " + JSON.stringify(Object.keys(keys)) + ")";
  }

  var is = function (m) {
    return exports.string.is(m) && hasOwnProperty.call(keys, m);
  };

  return new KeyofType(name, is, function (m, c) {
    return is(m) ? exports.success(m) : exports.failure(m, c);
  }, exports.identity, keys);
}; //
// recursive types
//


var RecursiveType =
/** @class */
function (_super) {
  __extends(RecursiveType, _super);

  function RecursiveType(name, is, validate, encode, runDefinition) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.runDefinition = runDefinition;
    _this._tag = 'RecursiveType';
    return _this;
  }

  Object.defineProperty(RecursiveType.prototype, "type", {
    get: function () {
      return this.runDefinition();
    },
    enumerable: true,
    configurable: true
  });
  return RecursiveType;
}(Type);

exports.RecursiveType = RecursiveType;

exports.recursion = function (name, definition) {
  var cache;

  var runDefinition = function () {
    if (!cache) {
      cache = definition(Self);
    }

    return cache;
  };

  var Self = new RecursiveType(name, function (m) {
    return runDefinition().is(m);
  }, function (m, c) {
    return runDefinition().validate(m, c);
  }, function (a) {
    return runDefinition().encode(a);
  }, runDefinition);
  return Self;
}; //
// arrays
//


var ArrayType =
/** @class */
function (_super) {
  __extends(ArrayType, _super);

  function ArrayType(name, is, validate, encode, type) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.type = type;
    _this._tag = 'ArrayType';
    return _this;
  }

  return ArrayType;
}(Type);

exports.ArrayType = ArrayType;

exports.array = function (type, name) {
  if (name === void 0) {
    name = "Array<" + type.name + ">";
  }

  return new ArrayType(name, function (m) {
    return arrayType.is(m) && m.every(type.is);
  }, function (m, c) {
    var arrayValidation = arrayType.validate(m, c);

    if (arrayValidation.isLeft()) {
      return arrayValidation;
    } else {
      var xs = arrayValidation.value;
      var len = xs.length;
      var a = xs;
      var errors = [];

      for (var i = 0; i < len; i++) {
        var x = xs[i];
        var validation = type.validate(x, exports.appendContext(c, String(i), type));

        if (validation.isLeft()) {
          pushAll(errors, validation.value);
        } else {
          var vx = validation.value;

          if (vx !== x) {
            if (a === xs) {
              a = xs.slice();
            }

            a[i] = vx;
          }
        }
      }

      return errors.length ? exports.failures(errors) : exports.success(a);
    }
  }, type.encode === exports.identity ? exports.identity : function (a) {
    return a.map(type.encode);
  }, type);
}; //
// interfaces
//


var InterfaceType =
/** @class */
function (_super) {
  __extends(InterfaceType, _super);

  function InterfaceType(name, is, validate, encode, props) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.props = props;
    _this._tag = 'InterfaceType';
    return _this;
  }

  return InterfaceType;
}(Type);

exports.InterfaceType = InterfaceType;

var getNameFromProps = function (props) {
  return "{ " + Object.keys(props).map(function (k) {
    return k + ": " + props[k].name;
  }).join(', ') + " }";
};

var useIdentity = function (types, len) {
  for (var i = 0; i < len; i++) {
    if (types[i].encode !== exports.identity) {
      return false;
    }
  }

  return true;
};
/** @alias `interface` */


exports.type = function (props, name) {
  if (name === void 0) {
    name = getNameFromProps(props);
  }

  var keys = Object.keys(props);
  var types = keys.map(function (key) {
    return props[key];
  });
  var len = keys.length;
  return new InterfaceType(name, function (m) {
    if (!exports.Dictionary.is(m)) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      var k = keys[i];

      if (!hasOwnProperty.call(m, k) || !types[i].is(m[k])) {
        return false;
      }
    }

    return true;
  }, function (m, c) {
    var dictionaryValidation = exports.Dictionary.validate(m, c);

    if (dictionaryValidation.isLeft()) {
      return dictionaryValidation;
    } else {
      var o = dictionaryValidation.value;
      var a = o;
      var errors = [];

      for (var i = 0; i < len; i++) {
        var k = keys[i];

        if (!hasOwnProperty.call(a, k)) {
          if (a === o) {
            a = __assign({}, o);
          }

          a[k] = a[k];
        }

        var ak = a[k];
        var type_1 = types[i];
        var validation = type_1.validate(ak, exports.appendContext(c, k, type_1));

        if (validation.isLeft()) {
          pushAll(errors, validation.value);
        } else {
          var vak = validation.value;

          if (vak !== ak) {
            /* istanbul ignore next */
            if (a === o) {
              a = __assign({}, o);
            }

            a[k] = vak;
          }
        }
      }

      return errors.length ? exports.failures(errors) : exports.success(a);
    }
  }, useIdentity(types, len) ? exports.identity : function (a) {
    var s = __assign({}, a);

    for (var i = 0; i < len; i++) {
      var k = keys[i];
      var encode = types[i].encode;

      if (encode !== exports.identity) {
        s[k] = encode(a[k]);
      }
    }

    return s;
  }, props);
};

exports.interface = exports.type; //
// partials
//

var PartialType =
/** @class */
function (_super) {
  __extends(PartialType, _super);

  function PartialType(name, is, validate, encode, props) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.props = props;
    _this._tag = 'PartialType';
    return _this;
  }

  return PartialType;
}(Type);

exports.PartialType = PartialType;

exports.partial = function (props, name) {
  if (name === void 0) {
    name = "PartialType<" + getNameFromProps(props) + ">";
  }

  var keys = Object.keys(props);
  var types = keys.map(function (key) {
    return props[key];
  });
  var len = keys.length;
  var partials = {};

  for (var i = 0; i < len; i++) {
    partials[keys[i]] = exports.union([types[i], undefinedType]);
  }

  return new PartialType(name, function (m) {
    if (!exports.Dictionary.is(m)) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      var k = keys[i];

      if (!partials[k].is(m[k])) {
        return false;
      }
    }

    return true;
  }, function (m, c) {
    var dictionaryValidation = exports.Dictionary.validate(m, c);

    if (dictionaryValidation.isLeft()) {
      return dictionaryValidation;
    } else {
      var o = dictionaryValidation.value;
      var a = o;
      var errors = [];

      for (var i = 0; i < len; i++) {
        var k = keys[i];
        var ak = a[k];
        var type_2 = partials[k];
        var validation = type_2.validate(ak, exports.appendContext(c, k, type_2));

        if (validation.isLeft()) {
          pushAll(errors, validation.value);
        } else {
          var vak = validation.value;

          if (vak !== ak) {
            /* istanbul ignore next */
            if (a === o) {
              a = __assign({}, o);
            }

            a[k] = vak;
          }
        }
      }

      return errors.length ? exports.failures(errors) : exports.success(a);
    }
  }, useIdentity(types, len) ? exports.identity : function (a) {
    var s = __assign({}, a);

    for (var i = 0; i < len; i++) {
      var k = keys[i];
      var ak = a[k];

      if (ak !== undefined) {
        s[k] = types[i].encode(ak);
      }
    }

    return s;
  }, props);
}; //
// dictionaries
//


var DictionaryType =
/** @class */
function (_super) {
  __extends(DictionaryType, _super);

  function DictionaryType(name, is, validate, encode, domain, codomain) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.domain = domain;
    _this.codomain = codomain;
    _this._tag = 'DictionaryType';
    return _this;
  }

  return DictionaryType;
}(Type);

exports.DictionaryType = DictionaryType;
var refinedDictionary = exports.refinement(exports.Dictionary, function (d) {
  return Object.prototype.toString.call(d) === '[object Object]';
});

exports.dictionary = function (domain, codomain, name) {
  if (name === void 0) {
    name = "{ [K in " + domain.name + "]: " + codomain.name + " }";
  }

  var isIndexSignatureRequired = codomain !== exports.any;
  var D = isIndexSignatureRequired ? refinedDictionary : exports.Dictionary;
  return new DictionaryType(name, function (m) {
    return D.is(m) && Object.keys(m).every(function (k) {
      return domain.is(k) && codomain.is(m[k]);
    });
  }, function (m, c) {
    var dictionaryValidation = D.validate(m, c);

    if (dictionaryValidation.isLeft()) {
      return dictionaryValidation;
    } else {
      var o = dictionaryValidation.value;
      var a = {};
      var errors = [];
      var keys = Object.keys(o);
      var len = keys.length;
      var changed = false;

      for (var i = 0; i < len; i++) {
        var k = keys[i];
        var ok = o[k];
        var domainValidation = domain.validate(k, exports.appendContext(c, k, domain));
        var codomainValidation = codomain.validate(ok, exports.appendContext(c, k, codomain));

        if (domainValidation.isLeft()) {
          pushAll(errors, domainValidation.value);
        } else {
          var vk = domainValidation.value;
          changed = changed || vk !== k;
          k = vk;
        }

        if (codomainValidation.isLeft()) {
          pushAll(errors, codomainValidation.value);
        } else {
          var vok = codomainValidation.value;
          changed = changed || vok !== ok;
          a[k] = vok;
        }
      }

      return errors.length ? exports.failures(errors) : exports.success(changed ? a : o);
    }
  }, domain.encode === exports.identity && codomain.encode === exports.identity ? exports.identity : function (a) {
    var s = {};
    var keys = Object.keys(a);
    var len = keys.length;

    for (var i = 0; i < len; i++) {
      var k = keys[i];
      s[String(domain.encode(k))] = codomain.encode(a[k]);
    }

    return s;
  }, domain, codomain);
}; //
// unions
//


var UnionType =
/** @class */
function (_super) {
  __extends(UnionType, _super);

  function UnionType(name, is, validate, encode, types) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.types = types;
    _this._tag = 'UnionType';
    return _this;
  }

  return UnionType;
}(Type);

exports.UnionType = UnionType;

exports.union = function (types, name) {
  if (name === void 0) {
    name = "(" + types.map(function (type) {
      return type.name;
    }).join(' | ') + ")";
  }

  var len = types.length;
  return new UnionType(name, function (m) {
    return types.some(function (type) {
      return type.is(m);
    });
  }, function (m, c) {
    var errors = [];

    for (var i = 0; i < len; i++) {
      var type_3 = types[i];
      var validation = type_3.validate(m, exports.appendContext(c, String(i), type_3));

      if (validation.isRight()) {
        return validation;
      } else {
        pushAll(errors, validation.value);
      }
    }

    return exports.failures(errors);
  }, useIdentity(types, len) ? exports.identity : function (a) {
    var i = 0;

    for (; i < len - 1; i++) {
      var type_4 = types[i];

      if (type_4.is(a)) {
        return type_4.encode(a);
      }
    }

    return types[i].encode(a);
  }, types);
}; //
// intersections
//


var IntersectionType =
/** @class */
function (_super) {
  __extends(IntersectionType, _super);

  function IntersectionType(name, is, validate, encode, types) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.types = types;
    _this._tag = 'IntersectionType';
    return _this;
  }

  return IntersectionType;
}(Type);

exports.IntersectionType = IntersectionType;

function intersection(types, name) {
  if (name === void 0) {
    name = "(" + types.map(function (type) {
      return type.name;
    }).join(' & ') + ")";
  }

  var len = types.length;
  return new IntersectionType(name, function (m) {
    return types.every(function (type) {
      return type.is(m);
    });
  }, function (m, c) {
    var a = m;
    var errors = [];

    for (var i = 0; i < len; i++) {
      var type_5 = types[i];
      var validation = type_5.validate(a, c);

      if (validation.isLeft()) {
        pushAll(errors, validation.value);
      } else {
        a = validation.value;
      }
    }

    return errors.length ? exports.failures(errors) : exports.success(a);
  }, useIdentity(types, len) ? exports.identity : function (a) {
    var s = a;

    for (var i = 0; i < len; i++) {
      var type_6 = types[i];
      s = type_6.encode(s);
    }

    return s;
  }, types);
}

exports.intersection = intersection; //
// tuples
//

var TupleType =
/** @class */
function (_super) {
  __extends(TupleType, _super);

  function TupleType(name, is, validate, encode, types) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.types = types;
    _this._tag = 'TupleType';
    return _this;
  }

  return TupleType;
}(Type);

exports.TupleType = TupleType;

function tuple(types, name) {
  if (name === void 0) {
    name = "[" + types.map(function (type) {
      return type.name;
    }).join(', ') + "]";
  }

  var len = types.length;
  return new TupleType(name, function (m) {
    return arrayType.is(m) && m.length === len && types.every(function (type, i) {
      return type.is(m[i]);
    });
  }, function (m, c) {
    var arrayValidation = arrayType.validate(m, c);

    if (arrayValidation.isLeft()) {
      return arrayValidation;
    } else {
      var as = arrayValidation.value;
      var t = as;
      var errors = [];

      for (var i = 0; i < len; i++) {
        var a = as[i];
        var type_7 = types[i];
        var validation = type_7.validate(a, exports.appendContext(c, String(i), type_7));

        if (validation.isLeft()) {
          pushAll(errors, validation.value);
        } else {
          var va = validation.value;

          if (va !== a) {
            /* istanbul ignore next */
            if (t === as) {
              t = as.slice();
            }

            t[i] = va;
          }
        }
      }

      if (as.length > len) {
        errors.push(exports.getValidationError(as[len], exports.appendContext(c, String(len), exports.never)));
      }

      return errors.length ? exports.failures(errors) : exports.success(t);
    }
  }, useIdentity(types, len) ? exports.identity : function (a) {
    return types.map(function (type, i) {
      return type.encode(a[i]);
    });
  }, types);
}

exports.tuple = tuple; //
// readonly objects
//

var ReadonlyType =
/** @class */
function (_super) {
  __extends(ReadonlyType, _super);

  function ReadonlyType(name, is, validate, encode, type) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.type = type;
    _this._tag = 'ReadonlyType';
    return _this;
  }

  return ReadonlyType;
}(Type);

exports.ReadonlyType = ReadonlyType;

exports.readonly = function (type, name) {
  if (name === void 0) {
    name = "Readonly<" + type.name + ">";
  }

  return new ReadonlyType(name, type.is, function (m, c) {
    return type.validate(m, c).map(function (x) {
      if ("development" !== 'production') {
        return Object.freeze(x);
      }

      return x;
    });
  }, type.encode === exports.identity ? exports.identity : type.encode, type);
}; //
// readonly arrays
//


var ReadonlyArrayType =
/** @class */
function (_super) {
  __extends(ReadonlyArrayType, _super);

  function ReadonlyArrayType(name, is, validate, encode, type) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.type = type;
    _this._tag = 'ReadonlyArrayType';
    return _this;
  }

  return ReadonlyArrayType;
}(Type);

exports.ReadonlyArrayType = ReadonlyArrayType;

exports.readonlyArray = function (type, name) {
  if (name === void 0) {
    name = "ReadonlyArray<" + type.name + ">";
  }

  var arrayType = exports.array(type);
  return new ReadonlyArrayType(name, arrayType.is, function (m, c) {
    return arrayType.validate(m, c).map(function (x) {
      if ("development" !== 'production') {
        return Object.freeze(x);
      } else {
        return x;
      }
    });
  }, arrayType.encode, type);
}; //
// strict types
//


var StrictType =
/** @class */
function (_super) {
  __extends(StrictType, _super);

  function StrictType(name, is, validate, encode, props) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.props = props;
    _this._tag = 'StrictType';
    return _this;
  }

  return StrictType;
}(Type);

exports.StrictType = StrictType;
/**
 * Specifies that only the given properties are allowed
 * @deprecated use `exact` instead
 */

exports.strict = function (props, name) {
  if (name === void 0) {
    name = "StrictType<" + getNameFromProps(props) + ">";
  }

  var exactType = exact(exports.type(props));
  return new StrictType(name, exactType.is, exactType.validate, exactType.encode, props);
};

exports.isTagged = function (tag) {
  var f = function (type) {
    if (type instanceof InterfaceType || type instanceof StrictType) {
      return hasOwnProperty.call(type.props, tag);
    } else if (type instanceof IntersectionType) {
      return type.types.some(f);
    } else if (type instanceof UnionType) {
      return type.types.every(f);
    } else if (type instanceof RefinementType || type instanceof ExactType) {
      return f(type.type);
    } else {
      return false;
    }
  };

  return f;
};

var findTagged = function (tag, types) {
  var len = types.length;
  var is = exports.isTagged(tag);
  var i = 0;

  for (; i < len - 1; i++) {
    var type_8 = types[i];

    if (is(type_8)) {
      return type_8;
    }
  }

  return types[i];
};

exports.getTagValue = function (tag) {
  var f = function (type) {
    switch (type._tag) {
      case 'InterfaceType':
      case 'StrictType':
        return type.props[tag].value;

      case 'IntersectionType':
        return f(findTagged(tag, type.types));

      case 'UnionType':
        return f(type.types[0]);

      case 'RefinementType':
      case 'ExactType':
      case 'RecursiveType':
        return f(type.type);
    }
  };

  return f;
};

var TaggedUnionType =
/** @class */
function (_super) {
  __extends(TaggedUnionType, _super);

  function TaggedUnionType(name, is, validate, encode, types, tag) {
    var _this = _super.call(this, name, is, validate, encode, types)
    /* istanbul ignore next */
    // <= workaround for https://github.com/Microsoft/TypeScript/issues/13455
    || this;

    _this.tag = tag;
    return _this;
  }

  return TaggedUnionType;
}(UnionType);

exports.TaggedUnionType = TaggedUnionType;

exports.taggedUnion = function (tag, types, name) {
  if (name === void 0) {
    name = "(" + types.map(function (type) {
      return type.name;
    }).join(' | ') + ")";
  }

  var len = types.length;
  var values = new Array(len);
  var hash = {};
  var useHash = true;
  var get = exports.getTagValue(tag);

  for (var i = 0; i < len; i++) {
    var value = get(types[i]);
    useHash = useHash && exports.string.is(value);
    values[i] = value;
    hash[String(value)] = i;
  }

  var isTagValue = useHash ? function (m) {
    return exports.string.is(m) && hasOwnProperty.call(hash, m);
  } : function (m) {
    return values.indexOf(m) !== -1;
  };
  var getIndex = useHash ? function (tag) {
    return hash[tag];
  } : function (tag) {
    var i = 0;

    for (; i < len - 1; i++) {
      if (values[i] === tag) {
        break;
      }
    }

    return i;
  };
  var TagValue = new Type(values.map(function (l) {
    return JSON.stringify(l);
  }).join(' | '), isTagValue, function (m, c) {
    return isTagValue(m) ? exports.success(m) : exports.failure(m, c);
  }, exports.identity);
  return new TaggedUnionType(name, function (v) {
    if (!exports.Dictionary.is(v)) {
      return false;
    }

    var tagValue = v[tag];
    return TagValue.is(tagValue) && types[getIndex(tagValue)].is(v);
  }, function (s, c) {
    var dictionaryValidation = exports.Dictionary.validate(s, c);

    if (dictionaryValidation.isLeft()) {
      return dictionaryValidation;
    } else {
      var d = dictionaryValidation.value;
      var tagValueValidation = TagValue.validate(d[tag], exports.appendContext(c, tag, TagValue));

      if (tagValueValidation.isLeft()) {
        return tagValueValidation;
      } else {
        var i = getIndex(tagValueValidation.value);
        var type_9 = types[i];
        return type_9.validate(d, exports.appendContext(c, String(i), type_9));
      }
    }
  }, useIdentity(types, len) ? exports.identity : function (a) {
    return types[getIndex(a[tag])].encode(a);
  }, types, tag);
}; //
// exact types
//


var ExactType =
/** @class */
function (_super) {
  __extends(ExactType, _super);

  function ExactType(name, is, validate, encode, type) {
    var _this = _super.call(this, name, is, validate, encode) || this;

    _this.type = type;
    _this._tag = 'ExactType';
    return _this;
  }

  return ExactType;
}(Type);

exports.ExactType = ExactType;

var getProps = function (type) {
  switch (type._tag) {
    case 'RefinementType':
    case 'ReadonlyType':
      return getProps(type.type);

    case 'InterfaceType':
    case 'StrictType':
    case 'PartialType':
      return type.props;

    case 'IntersectionType':
      return type.types.reduce(function (props, type) {
        return Object.assign(props, getProps(type));
      }, {});
  }
};

function exact(type, name) {
  if (name === void 0) {
    name = "ExactType<" + type.name + ">";
  }

  var props = getProps(type);
  return new ExactType(name, function (m) {
    return type.is(m) && Object.getOwnPropertyNames(m).every(function (k) {
      return hasOwnProperty.call(props, k);
    });
  }, function (m, c) {
    var looseValidation = type.validate(m, c);

    if (looseValidation.isLeft()) {
      return looseValidation;
    } else {
      var o = looseValidation.value;
      var keys = Object.getOwnPropertyNames(o);
      var len = keys.length;
      var errors = [];

      for (var i = 0; i < len; i++) {
        var key = keys[i];

        if (!hasOwnProperty.call(props, key)) {
          errors.push(exports.getValidationError(o[key], exports.appendContext(c, key, exports.never)));
        }
      }

      return errors.length ? exports.failures(errors) : exports.success(o);
    }
  }, type.encode, type);
}

exports.exact = exact;
/** Drops the runtime type "kind" */

function clean(type) {
  return type;
}

exports.clean = clean;

function alias(type) {
  return function () {
    return type;
  };
}

exports.alias = alias;
},{"fp-ts/lib/Either":"node_modules/fp-ts/lib/Either.js"}],"node_modules/io-ts/lib/PathReporter.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function stringify(v) {
    return typeof v === 'function' ? index_1.getFunctionName(v) : JSON.stringify(v);
}
function getContextPath(context) {
    return context.map(function (_a) {
        var key = _a.key, type = _a.type;
        return key + ": " + type.name;
    }).join('/');
}
function getMessage(v, context) {
    return "Invalid value " + stringify(v) + " supplied to " + getContextPath(context);
}
function failure(es) {
    return es.map(function (e) { return getMessage(e.value, e.context); });
}
exports.failure = failure;
function success() {
    return ['No errors!'];
}
exports.success = success;
exports.PathReporter = {
    report: function (validation) { return validation.fold(failure, success); }
};

},{"./index":"node_modules/io-ts/lib/index.js"}],"node_modules/io-ts/lib/ThrowReporter.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PathReporter_1 = require("./PathReporter");
exports.ThrowReporter = {
    report: function (validation) {
        if (validation.isLeft()) {
            throw PathReporter_1.PathReporter.report(validation).join('\n');
        }
    }
};

},{"./PathReporter":"node_modules/io-ts/lib/PathReporter.js"}],"src/pre-descriptions.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = exports.MessageType = exports.myPublicKey = void 0;

var myBooks = function () {
  var collection = [{
    nqme: 'Lord of the rings',
    author: 'JRR Tolkien',
    rating: 10
  }, {
    name: '1984',
    author: 'George Orwell',
    rating: 9
  }];

  function getCollection() {
    return collection;
  }

  function favoriteBook() {
    return collection[0];
  }

  function sortBooks() {// no-op
  }

  function addBook(book) {
    collection.push(book);
    sortBooks();
  }

  return {
    books: getCollection(),
    addBook: addBook,
    favoriteBook: favoriteBook()
  };
}();

myBooks.addBook({
  name: 'foo',
  author: 'bar'
});
console.log(myBooks.books);
console.log('Favorite: ', myBooks.favoriteBook); // interface CustomWindow extends Window {
//     myBooks: any;
// }
// const customWindow: CustomWindow = window;
// customWindow.myBooks = myBooks;
// export default myBooks;

var myPrivateKey = 'Secret';
exports.myPublicKey = 'Public';
var MessageType;

(function (MessageType) {
  MessageType[MessageType["INFORMATION"] = 0] = "INFORMATION";
  MessageType[MessageType["WARNING"] = 1] = "WARNING";
  MessageType[MessageType["ERROR"] = 2] = "ERROR";
  MessageType[MessageType["DEBUTG"] = 3] = "DEBUTG";
})(MessageType = exports.MessageType || (exports.MessageType = {})); // private function


function logToConsole(message) {
  switch (message.type) {
    case MessageType.INFORMATION:
      console.log(message.content);
      break;

    default:
      console.error(message.content);
  }

  console.log(message);
} // exported function


function log(message) {
  logToConsole(message);
}

exports.log = log;
},{}],"src/load_modules.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
}); // import myBooks from "./pre-descriptions";
// import { myPublicKey } from "./pre-descriptions";
// console.log(myBooks);

var t = __importStar(require("io-ts"));

var ThrowReporter_1 = require("io-ts/lib/ThrowReporter");

var pre_descriptions_1 = require("./pre-descriptions");

console.log('Public Key: ', pre_descriptions_1.myPublicKey);
var infoMessage = {
  content: 'Hello world',
  type: pre_descriptions_1.MessageType.INFORMATION
};
var errorMessage = {
  content: 'Oopsie doopsie',
  type: pre_descriptions_1.MessageType.ERROR
};
(0, pre_descriptions_1.log)(infoMessage);
(0, pre_descriptions_1.log)(errorMessage);
var nameValidator = t.string;
var validationResult = nameValidator.decode('foobar');
console.log("validation result: ".concat(validationResult.isRight()));
var countryValidator = t.type({
  id: t.string,
  name: t.string,
  capitalCity: t.string
});
var validCountry = {
  id: 'BE',
  name: 'Belgium',
  capitalCity: 'Brussels'
};
var invalidCountry = {
  foo: 'foo',
  name: 'bar'
};
var validationResultForValidCountry = countryValidator.decode(validCountry);
var validationResultForInvalidCountry = countryValidator.decode(invalidCountry);
ThrowReporter_1.ThrowReporter.report(validationResultForValidCountry);
var validCountryObject = validationResultForValidCountry.value;
console.log('Valid country`s name: ', validCountryObject.name);

try {
  ThrowReporter_1.ThrowReporter.report(validationResultForInvalidCountry);
  console.log('Done!');
} catch (error) {
  console.error('An error occured: ', error);
}
},{"io-ts":"node_modules/io-ts/lib/index.js","io-ts/lib/ThrowReporter":"node_modules/io-ts/lib/ThrowReporter.js","./pre-descriptions":"src/pre-descriptions.ts"}]},{},["src/load_modules.ts"], null)
//# sourceMappingURL=/load_modules.fc2480dd.js.map