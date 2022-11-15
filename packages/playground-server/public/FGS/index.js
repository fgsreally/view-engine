function Ht(e, t) {
  const n = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let s = 0; s < o.length; s++)
    n[o[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const Ki = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Wi = /* @__PURE__ */ Ht(Ki);
function fr(e) {
  return !!e || e === "";
}
function Hn(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = te(o) ? Yi(o) : Hn(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else {
    if (te(e))
      return e;
    if (q(e))
      return e;
  }
}
const qi = /;(?![^(]*\))/g, Ji = /:(.+)/;
function Yi(e) {
  const t = {};
  return e.split(qi).forEach((n) => {
    if (n) {
      const o = n.split(Ji);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Ce(e) {
  let t = "";
  if (te(e))
    t = e;
  else if (P(e))
    for (let n = 0; n < e.length; n++) {
      const o = Ce(e[n]);
      o && (t += o + " ");
    }
  else if (q(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const ar = (e) => te(e) ? e : e == null ? "" : P(e) || q(e) && (e.toString === _r || !S(e.toString)) ? JSON.stringify(e, dr, 2) : String(e), dr = (e, t) => t && t.__v_isRef ? dr(e, t.value) : vt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [o, s]) => (n[`${o} =>`] = s, n), {})
} : hr(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : q(t) && !P(t) && !mr(t) ? String(t) : t, W = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Rt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], re = () => {
}, pr = () => !1, Qi = /^on[^a-z]/, un = (e) => Qi.test(e), In = (e) => e.startsWith("onUpdate:"), ne = Object.assign, ko = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Zi = Object.prototype.hasOwnProperty, L = (e, t) => Zi.call(e, t), P = Array.isArray, vt = (e) => kn(e) === "[object Map]", hr = (e) => kn(e) === "[object Set]", S = (e) => typeof e == "function", te = (e) => typeof e == "string", zo = (e) => typeof e == "symbol", q = (e) => e !== null && typeof e == "object", Ko = (e) => q(e) && S(e.then) && S(e.catch), _r = Object.prototype.toString, kn = (e) => _r.call(e), Wo = (e) => kn(e).slice(8, -1), mr = (e) => kn(e) === "[object Object]", qo = (e) => te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, wn = /* @__PURE__ */ Ht(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Xi = /* @__PURE__ */ Ht("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), zn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Gi = /-(\w)/g, Re = zn((e) => e.replace(Gi, (t, n) => n ? n.toUpperCase() : "")), el = /\B([A-Z])/g, ot = zn((e) => e.replace(el, "-$1").toLowerCase()), xt = zn((e) => e.charAt(0).toUpperCase() + e.slice(1)), dt = zn((e) => e ? `on${xt(e)}` : ""), tn = (e, t) => !Object.is(e, t), Kt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Pn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, gr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ms;
const Sn = () => ms || (ms = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function An(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Ne;
class tl {
  constructor(t = !1) {
    this.active = !0, this.effects = [], this.cleanups = [], !t && Ne && (this.parent = Ne, this.index = (Ne.scopes || (Ne.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = Ne;
      try {
        return Ne = this, t();
      } finally {
        Ne = n;
      }
    } else
      process.env.NODE_ENV !== "production" && An("cannot run an inactive effect scope.");
  }
  on() {
    Ne = this;
  }
  off() {
    Ne = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
      if (this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.active = !1;
    }
  }
}
function nl(e, t = Ne) {
  t && t.active && t.effects.push(e);
}
function ol() {
  return Ne;
}
function sl(e) {
  Ne ? Ne.cleanups.push(e) : process.env.NODE_ENV !== "production" && An("onScopeDispose() is called when there is no active effect scope to be associated with.");
}
const nn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Er = (e) => (e.w & st) > 0, vr = (e) => (e.n & st) > 0, rl = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= st;
}, il = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let o = 0; o < t.length; o++) {
      const s = t[o];
      Er(s) && !vr(s) ? s.delete(e) : t[n++] = s, s.w &= ~st, s.n &= ~st;
    }
    t.length = n;
  }
}, vo = /* @__PURE__ */ new WeakMap();
let Yt = 0, st = 1;
const No = 30;
let _e;
const Nt = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Oo = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Jo {
  constructor(t, n = null, o) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, nl(this, o);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = _e, n = nt;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = _e, _e = this, nt = !0, st = 1 << ++Yt, Yt <= No ? rl(this) : gs(this), this.fn();
    } finally {
      Yt <= No && il(this), st = 1 << --Yt, _e = this.parent, nt = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    _e === this ? this.deferStop = !0 : this.active && (gs(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function gs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let nt = !0;
const Nr = [];
function Tt() {
  Nr.push(nt), nt = !1;
}
function $t() {
  const e = Nr.pop();
  nt = e === void 0 ? !0 : e;
}
function ve(e, t, n) {
  if (nt && _e) {
    let o = vo.get(e);
    o || vo.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || o.set(n, s = nn());
    const r = process.env.NODE_ENV !== "production" ? { effect: _e, target: e, type: t, key: n } : void 0;
    yo(s, r);
  }
}
function yo(e, t) {
  let n = !1;
  Yt <= No ? vr(e) || (e.n |= st, n = !Er(e)) : n = !e.has(_e), n && (e.add(_e), _e.deps.push(e), process.env.NODE_ENV !== "production" && _e.onTrack && _e.onTrack(Object.assign({ effect: _e }, t)));
}
function Ke(e, t, n, o, s, r) {
  const i = vo.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && P(e))
    i.forEach((a, p) => {
      (p === "length" || p >= o) && c.push(a);
    });
  else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        P(e) ? qo(n) && c.push(i.get("length")) : (c.push(i.get(Nt)), vt(e) && c.push(i.get(Oo)));
        break;
      case "delete":
        P(e) || (c.push(i.get(Nt)), vt(e) && c.push(i.get(Oo)));
        break;
      case "set":
        vt(e) && c.push(i.get(Nt));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: o, oldValue: s, oldTarget: r } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? Mt(c[0], u) : Mt(c[0]));
  else {
    const a = [];
    for (const p of c)
      p && a.push(...p);
    process.env.NODE_ENV !== "production" ? Mt(nn(a), u) : Mt(nn(a));
  }
}
function Mt(e, t) {
  const n = P(e) ? e : [...e];
  for (const o of n)
    o.computed && Es(o, t);
  for (const o of n)
    o.computed || Es(o, t);
}
function Es(e, t) {
  (e !== _e || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(ne({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const ll = /* @__PURE__ */ Ht("__proto__,__v_isRef,__isVue"), Or = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(zo)
), cl = /* @__PURE__ */ Kn(), ul = /* @__PURE__ */ Kn(!1, !0), fl = /* @__PURE__ */ Kn(!0), al = /* @__PURE__ */ Kn(!0, !0), vs = /* @__PURE__ */ dl();
function dl() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = M(this);
      for (let r = 0, i = this.length; r < i; r++)
        ve(o, "get", r + "");
      const s = o[t](...n);
      return s === -1 || s === !1 ? o[t](...n.map(M)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Tt();
      const o = M(this)[t].apply(this, n);
      return $t(), o;
    };
  }), e;
}
function Kn(e = !1, t = !1) {
  return function(o, s, r) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_isShallow")
      return t;
    if (s === "__v_raw" && r === (e ? t ? Tr : Cr : t ? xr : Vr).get(o))
      return o;
    const i = P(o);
    if (!e && i && L(vs, s))
      return Reflect.get(vs, s, r);
    const c = Reflect.get(o, s, r);
    return (zo(s) ? Or.has(s) : ll(s)) || (e || ve(o, "get", s), t) ? c : ie(c) ? i && qo(s) ? c : c.value : q(c) ? e ? Ir(c) : Qo(c) : c;
  };
}
const pl = /* @__PURE__ */ yr(), hl = /* @__PURE__ */ yr(!0);
function yr(e = !1) {
  return function(n, o, s, r) {
    let i = n[o];
    if (rt(i) && ie(i) && !ie(s))
      return !1;
    if (!e && (!Mn(s) && !rt(s) && (i = M(i), s = M(s)), !P(n) && ie(i) && !ie(s)))
      return i.value = s, !0;
    const c = P(n) && qo(o) ? Number(o) < n.length : L(n, o), u = Reflect.set(n, o, s, r);
    return n === M(r) && (c ? tn(s, i) && Ke(n, "set", o, s, i) : Ke(n, "add", o, s)), u;
  };
}
function _l(e, t) {
  const n = L(e, t), o = e[t], s = Reflect.deleteProperty(e, t);
  return s && n && Ke(e, "delete", t, void 0, o), s;
}
function ml(e, t) {
  const n = Reflect.has(e, t);
  return (!zo(t) || !Or.has(t)) && ve(e, "has", t), n;
}
function gl(e) {
  return ve(e, "iterate", P(e) ? "length" : Nt), Reflect.ownKeys(e);
}
const br = {
  get: cl,
  set: pl,
  deleteProperty: _l,
  has: ml,
  ownKeys: gl
}, wr = {
  get: fl,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && An(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && An(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, El = /* @__PURE__ */ ne({}, br, {
  get: ul,
  set: hl
}), vl = /* @__PURE__ */ ne({}, wr, {
  get: al
}), Yo = (e) => e, Wn = (e) => Reflect.getPrototypeOf(e);
function En(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const s = M(e), r = M(t);
  n || (t !== r && ve(s, "get", t), ve(s, "get", r));
  const { has: i } = Wn(s), c = o ? Yo : n ? Zo : on;
  if (i.call(s, t))
    return c(e.get(t));
  if (i.call(s, r))
    return c(e.get(r));
  e !== s && e.get(t);
}
function vn(e, t = !1) {
  const n = this.__v_raw, o = M(n), s = M(e);
  return t || (e !== s && ve(o, "has", e), ve(o, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function Nn(e, t = !1) {
  return e = e.__v_raw, !t && ve(M(e), "iterate", Nt), Reflect.get(e, "size", e);
}
function Ns(e) {
  e = M(e);
  const t = M(this);
  return Wn(t).has.call(t, e) || (t.add(e), Ke(t, "add", e, e)), this;
}
function Os(e, t) {
  t = M(t);
  const n = M(this), { has: o, get: s } = Wn(n);
  let r = o.call(n, e);
  r ? process.env.NODE_ENV !== "production" && Dr(n, o, e) : (e = M(e), r = o.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), r ? tn(t, i) && Ke(n, "set", e, t, i) : Ke(n, "add", e, t), this;
}
function ys(e) {
  const t = M(this), { has: n, get: o } = Wn(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && Dr(t, n, e) : (e = M(e), s = n.call(t, e));
  const r = o ? o.call(t, e) : void 0, i = t.delete(e);
  return s && Ke(t, "delete", e, void 0, r), i;
}
function bs() {
  const e = M(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? vt(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && Ke(e, "clear", void 0, void 0, n), o;
}
function On(e, t) {
  return function(o, s) {
    const r = this, i = r.__v_raw, c = M(i), u = t ? Yo : e ? Zo : on;
    return !e && ve(c, "iterate", Nt), i.forEach((a, p) => o.call(s, u(a), u(p), r));
  };
}
function yn(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = M(s), i = vt(r), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, a = s[e](...o), p = n ? Yo : t ? Zo : on;
    return !t && ve(r, "iterate", u ? Oo : Nt), {
      next() {
        const { value: d, done: _ } = a.next();
        return _ ? { value: d, done: _ } : {
          value: c ? [p(d[0]), p(d[1])] : p(d),
          done: _
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ye(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${xt(e)} operation ${n}failed: target is readonly.`, M(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function Nl() {
  const e = {
    get(r) {
      return En(this, r);
    },
    get size() {
      return Nn(this);
    },
    has: vn,
    add: Ns,
    set: Os,
    delete: ys,
    clear: bs,
    forEach: On(!1, !1)
  }, t = {
    get(r) {
      return En(this, r, !1, !0);
    },
    get size() {
      return Nn(this);
    },
    has: vn,
    add: Ns,
    set: Os,
    delete: ys,
    clear: bs,
    forEach: On(!1, !0)
  }, n = {
    get(r) {
      return En(this, r, !0);
    },
    get size() {
      return Nn(this, !0);
    },
    has(r) {
      return vn.call(this, r, !0);
    },
    add: Ye("add"),
    set: Ye("set"),
    delete: Ye("delete"),
    clear: Ye("clear"),
    forEach: On(!0, !1)
  }, o = {
    get(r) {
      return En(this, r, !0, !0);
    },
    get size() {
      return Nn(this, !0);
    },
    has(r) {
      return vn.call(this, r, !0);
    },
    add: Ye("add"),
    set: Ye("set"),
    delete: Ye("delete"),
    clear: Ye("clear"),
    forEach: On(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = yn(r, !1, !1), n[r] = yn(r, !0, !1), t[r] = yn(r, !1, !0), o[r] = yn(r, !0, !0);
  }), [
    e,
    n,
    t,
    o
  ];
}
const [Ol, yl, bl, wl] = /* @__PURE__ */ Nl();
function qn(e, t) {
  const n = t ? e ? wl : bl : e ? yl : Ol;
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(L(n, s) && s in o ? n : o, s, r);
}
const Dl = {
  get: /* @__PURE__ */ qn(!1, !1)
}, Vl = {
  get: /* @__PURE__ */ qn(!1, !0)
}, xl = {
  get: /* @__PURE__ */ qn(!0, !1)
}, Cl = {
  get: /* @__PURE__ */ qn(!0, !0)
};
function Dr(e, t, n) {
  const o = M(n);
  if (o !== n && t.call(e, o)) {
    const s = Wo(e);
    console.warn(`Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Vr = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ new WeakMap(), Tr = /* @__PURE__ */ new WeakMap();
function Tl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function $l(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Tl(Wo(e));
}
function Qo(e) {
  return rt(e) ? e : Jn(e, !1, br, Dl, Vr);
}
function $r(e) {
  return Jn(e, !1, El, Vl, xr);
}
function Ir(e) {
  return Jn(e, !0, wr, xl, Cr);
}
function Ft(e) {
  return Jn(e, !0, vl, Cl, Tr);
}
function Jn(e, t, n, o, s) {
  if (!q(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = s.get(e);
  if (r)
    return r;
  const i = $l(e);
  if (i === 0)
    return e;
  const c = new Proxy(e, i === 2 ? o : n);
  return s.set(e, c), c;
}
function Ot(e) {
  return rt(e) ? Ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
function rt(e) {
  return !!(e && e.__v_isReadonly);
}
function Mn(e) {
  return !!(e && e.__v_isShallow);
}
function bo(e) {
  return Ot(e) || rt(e);
}
function M(e) {
  const t = e && e.__v_raw;
  return t ? M(t) : e;
}
function Pr(e) {
  return Pn(e, "__v_skip", !0), e;
}
const on = (e) => q(e) ? Qo(e) : e, Zo = (e) => q(e) ? Ir(e) : e;
function Sr(e) {
  nt && _e && (e = M(e), process.env.NODE_ENV !== "production" ? yo(e.dep || (e.dep = nn()), {
    target: e,
    type: "get",
    key: "value"
  }) : yo(e.dep || (e.dep = nn())));
}
function Ar(e, t) {
  e = M(e), e.dep && (process.env.NODE_ENV !== "production" ? Mt(e.dep, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : Mt(e.dep));
}
function ie(e) {
  return !!(e && e.__v_isRef === !0);
}
function yt(e) {
  return Il(e, !1);
}
function Il(e, t) {
  return ie(e) ? e : new Pl(e, t);
}
class Pl {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : M(t), this._value = n ? t : on(t);
  }
  get value() {
    return Sr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Mn(t) || rt(t);
    t = n ? t : M(t), tn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : on(t), Ar(this, t));
  }
}
function z(e) {
  return ie(e) ? e.value : e;
}
const Sl = {
  get: (e, t, n) => z(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return ie(s) && !ie(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Mr(e) {
  return Ot(e) ? e : new Proxy(e, Sl);
}
var Fr;
class Al {
  constructor(t, n, o, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Fr] = !1, this._dirty = !0, this.effect = new Jo(t, () => {
      this._dirty || (this._dirty = !0, Ar(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = o;
  }
  get value() {
    const t = M(this);
    return Sr(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Fr = "__v_isReadonly";
function Ml(e, t, n = !1) {
  let o, s;
  const r = S(e);
  r ? (o = e, s = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : re) : (o = e.get, s = e.set);
  const i = new Al(o, s, r || !s, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const bt = [];
function Dn(e) {
  bt.push(e);
}
function Vn() {
  bt.pop();
}
function O(e, ...t) {
  Tt();
  const n = bt.length ? bt[bt.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = Fl();
  if (o)
    ze(o, n, 11, [
      e + t.join(""),
      n && n.proxy,
      s.map(({ vnode: r }) => `at <${ro(n, r.type)}>`).join(`
`),
      s
    ]);
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...Rl(s)), console.warn(...r);
  }
  $t();
}
function Fl() {
  let e = bt[bt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function Rl(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Ll(n));
  }), t;
}
function Ll({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${ro(e.component, e.type, o)}`, r = ">" + n;
  return e.props ? [s, ...jl(e.props), r] : [s + r];
}
function jl(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...Rr(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Rr(e, t, n) {
  return te(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : ie(t) ? (t = Rr(e, M(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : S(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = M(t), n ? t : [`${e}=`, t]);
}
const Xo = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function ze(e, t, n, o) {
  let s;
  try {
    s = o ? e(...o) : e();
  } catch (r) {
    Yn(r, t, n);
  }
  return s;
}
function Ve(e, t, n, o) {
  if (S(e)) {
    const r = ze(e, t, n, o);
    return r && Ko(r) && r.catch((i) => {
      Yn(i, t, n);
    }), r;
  }
  const s = [];
  for (let r = 0; r < e.length; r++)
    s.push(Ve(e[r], t, n, o));
  return s;
}
function Yn(e, t, n, o = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Xo[n] : n;
    for (; r; ) {
      const a = r.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, i, c) === !1)
            return;
      }
      r = r.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      ze(u, null, 10, [e, i, c]);
      return;
    }
  }
  Ul(e, n, s, o);
}
function Ul(e, t, n, o = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = Xo[t];
    if (n && Dn(n), O(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && Vn(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let sn = !1, wo = !1;
const de = [];
let Me = 0;
const Lt = [];
let Ae = null, Xe = 0;
const Lr = /* @__PURE__ */ Promise.resolve();
let Go = null;
const Bl = 100;
function jr(e) {
  const t = Go || Lr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Hl(e) {
  let t = Me + 1, n = de.length;
  for (; t < n; ) {
    const o = t + n >>> 1;
    rn(de[o]) < e ? t = o + 1 : n = o;
  }
  return t;
}
function Qn(e) {
  (!de.length || !de.includes(e, sn && e.allowRecurse ? Me + 1 : Me)) && (e.id == null ? de.push(e) : de.splice(Hl(e.id), 0, e), Ur());
}
function Ur() {
  !sn && !wo && (wo = !0, Go = Lr.then(kr));
}
function kl(e) {
  const t = de.indexOf(e);
  t > Me && de.splice(t, 1);
}
function Br(e) {
  P(e) ? Lt.push(...e) : (!Ae || !Ae.includes(e, e.allowRecurse ? Xe + 1 : Xe)) && Lt.push(e), Ur();
}
function ws(e, t = sn ? Me + 1 : 0) {
  for (process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()); t < de.length; t++) {
    const n = de[t];
    if (n && n.pre) {
      if (process.env.NODE_ENV !== "production" && es(e, n))
        continue;
      de.splice(t, 1), t--, n();
    }
  }
}
function Hr(e) {
  if (Lt.length) {
    const t = [...new Set(Lt)];
    if (Lt.length = 0, Ae) {
      Ae.push(...t);
      return;
    }
    for (Ae = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ae.sort((n, o) => rn(n) - rn(o)), Xe = 0; Xe < Ae.length; Xe++)
      process.env.NODE_ENV !== "production" && es(e, Ae[Xe]) || Ae[Xe]();
    Ae = null, Xe = 0;
  }
}
const rn = (e) => e.id == null ? 1 / 0 : e.id, zl = (e, t) => {
  const n = rn(e) - rn(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function kr(e) {
  wo = !1, sn = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), de.sort(zl);
  const t = process.env.NODE_ENV !== "production" ? (n) => es(e, n) : re;
  try {
    for (Me = 0; Me < de.length; Me++) {
      const n = de[Me];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        ze(n, null, 14);
      }
    }
  } finally {
    Me = 0, de.length = 0, Hr(e), sn = !1, Go = null, (de.length || Lt.length) && kr(e);
  }
}
function es(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Bl) {
      const o = t.ownerInstance, s = o && is(o.type);
      return O(`Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
let wt = !1;
const At = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Sn().__VUE_HMR_RUNTIME__ = {
  createRecord: ao(zr),
  rerender: ao(ql),
  reload: ao(Jl)
});
const Ct = /* @__PURE__ */ new Map();
function Kl(e) {
  const t = e.type.__hmrId;
  let n = Ct.get(t);
  n || (zr(t, e.type), n = Ct.get(t)), n.instances.add(e);
}
function Wl(e) {
  Ct.get(e.type.__hmrId).instances.delete(e);
}
function zr(e, t) {
  return Ct.has(e) ? !1 : (Ct.set(e, {
    initialDef: Zt(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Zt(e) {
  return Vi(e) ? e.__vccOpts : e;
}
function ql(e, t) {
  const n = Ct.get(e);
  !n || (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Zt(o.type).render = t), o.renderCache = [], wt = !0, o.update(), wt = !1;
  }));
}
function Jl(e, t) {
  const n = Ct.get(e);
  if (!n)
    return;
  t = Zt(t), Ds(n.initialDef, t);
  const o = [...n.instances];
  for (const s of o) {
    const r = Zt(s.type);
    At.has(r) || (r !== n.initialDef && Ds(r, t), At.add(r)), s.appContext.optionsCache.delete(s.type), s.ceReload ? (At.add(r), s.ceReload(t.styles), At.delete(r)) : s.parent ? (Qn(s.parent.update), s.parent.type.__asyncLoader && s.parent.ceReload && s.parent.ceReload(t.styles)) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  Br(() => {
    for (const s of o)
      At.delete(Zt(s.type));
  });
}
function Ds(e, t) {
  ne(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function ao(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let ht, Qt = [], Do = !1;
function fn(e, ...t) {
  ht ? ht.emit(e, ...t) : Do || Qt.push({ event: e, args: t });
}
function Kr(e, t) {
  var n, o;
  ht = e, ht ? (ht.enabled = !0, Qt.forEach(({ event: s, args: r }) => ht.emit(s, ...r)), Qt = []) : typeof window < "u" && window.HTMLElement && !(!((o = (n = window.navigator) === null || n === void 0 ? void 0 : n.userAgent) === null || o === void 0) && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    Kr(r, t);
  }), setTimeout(() => {
    ht || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Do = !0, Qt = []);
  }, 3e3)) : (Do = !0, Qt = []);
}
function Yl(e, t) {
  fn("app:init", e, t, {
    Fragment: Ee,
    Text: to,
    Comment: ce,
    Static: Tn
  });
}
function Ql(e) {
  fn("app:unmount", e);
}
const Zl = /* @__PURE__ */ ts("component:added"), Wr = /* @__PURE__ */ ts("component:updated"), Xl = /* @__PURE__ */ ts("component:removed");
function ts(e) {
  return (t) => {
    fn(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
  };
}
const Gl = /* @__PURE__ */ qr("perf:start"), ec = /* @__PURE__ */ qr("perf:end");
function qr(e) {
  return (t, n, o) => {
    fn(e, t.appContext.app, t.uid, t, n, o);
  };
}
function tc(e, t, n) {
  fn("component:emit", e.appContext.app, e, t, n);
}
function nc(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const o = e.vnode.props || W;
  if (process.env.NODE_ENV !== "production") {
    const { emitsOptions: p, propsOptions: [d] } = e;
    if (p)
      if (!(t in p))
        (!d || !(dt(t) in d)) && O(`Component emitted event "${t}" but it is neither declared in the emits option nor as an "${dt(t)}" prop.`);
      else {
        const _ = p[t];
        S(_) && (_(...n) || O(`Invalid event arguments: event validation failed for event "${t}".`));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && t.slice(7);
  if (i && i in o) {
    const p = `${i === "modelValue" ? "model" : i}Modifiers`, { number: d, trim: _ } = o[p] || W;
    _ && (s = n.map((D) => D.trim())), d && (s = n.map(gr));
  }
  if ((process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && tc(e, t, s), process.env.NODE_ENV !== "production") {
    const p = t.toLowerCase();
    p !== t && o[dt(p)] && O(`Event "${p}" is emitted in component ${ro(e, e.type)} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ot(t)}" instead of "${t}".`);
  }
  let c, u = o[c = dt(t)] || o[c = dt(Re(t))];
  !u && r && (u = o[c = dt(ot(t))]), u && Ve(u, e, 6, s);
  const a = o[c + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, Ve(a, e, 6, s);
  }
}
function Jr(e, t, n = !1) {
  const o = t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, c = !1;
  if (__VUE_OPTIONS_API__ && !S(e)) {
    const u = (a) => {
      const p = Jr(a, t, !0);
      p && (c = !0, ne(i, p));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !c ? (q(e) && o.set(e, null), null) : (P(r) ? r.forEach((u) => i[u] = null) : ne(i, r), q(e) && o.set(e, i), i);
}
function Zn(e, t) {
  return !e || !un(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), L(e, t[0].toLowerCase() + t.slice(1)) || L(e, ot(t)) || L(e, t));
}
let le = null, Yr = null;
function Fn(e) {
  const t = le;
  return le = e, Yr = e && e.type.__scopeId || null, t;
}
function Xt(e, t = le, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && Ls(-1);
    const r = Fn(t), i = e(...s);
    return Fn(r), o._d && Ls(1), (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && Wr(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
let Vo = !1;
function Rn() {
  Vo = !0;
}
function po(e) {
  const { type: t, vnode: n, proxy: o, withProxy: s, props: r, propsOptions: [i], slots: c, attrs: u, emit: a, render: p, renderCache: d, data: _, setupState: D, ctx: y, inheritAttrs: V } = e;
  let $, B;
  const F = Fn(e);
  process.env.NODE_ENV !== "production" && (Vo = !1);
  try {
    if (n.shapeFlag & 4) {
      const Y = s || o;
      $ = Te(p.call(Y, Y, d, r, D, _, y)), B = u;
    } else {
      const Y = t;
      process.env.NODE_ENV !== "production" && u === r && Rn(), $ = Te(Y.length > 1 ? Y(r, process.env.NODE_ENV !== "production" ? {
        get attrs() {
          return Rn(), u;
        },
        slots: c,
        emit: a
      } : { attrs: u, slots: c, emit: a }) : Y(r, null)), B = t.props ? u : sc(u);
    }
  } catch (Y) {
    en.length = 0, Yn(Y, e, 1), $ = fe(ce);
  }
  let J = $, R;
  if (process.env.NODE_ENV !== "production" && $.patchFlag > 0 && $.patchFlag & 2048 && ([J, R] = oc($)), B && V !== !1) {
    const Y = Object.keys(B), { shapeFlag: ye } = J;
    if (Y.length) {
      if (ye & 7)
        i && Y.some(In) && (B = rc(B, i)), J = je(J, B);
      else if (process.env.NODE_ENV !== "production" && !Vo && J.type !== ce) {
        const be = Object.keys(u), j = [], Z = [];
        for (let K = 0, ue = be.length; K < ue; K++) {
          const x = be[K];
          un(x) ? In(x) || j.push(x[2].toLowerCase() + x.slice(3)) : Z.push(x);
        }
        Z.length && O(`Extraneous non-props attributes (${Z.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`), j.length && O(`Extraneous non-emits event listeners (${j.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !Vs(J) && O("Runtime directive used on component with non-element root node. The directives will not function as intended."), J = je(J), J.dirs = J.dirs ? J.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Vs(J) && O("Component inside <Transition> renders non-element root node that cannot be animated."), J.transition = n.transition), process.env.NODE_ENV !== "production" && R ? R(J) : $ = J, Fn(F), $;
}
const oc = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Qr(t);
  if (!o)
    return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (c) => {
    t[s] = c, n && (r > -1 ? n[r] = c : c.patchFlag > 0 && (e.dynamicChildren = [...n, c]));
  };
  return [Te(o), i];
};
function Qr(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    if (it(o)) {
      if (o.type !== ce || o.children === "v-if") {
        if (t)
          return;
        t = o;
      }
    } else
      return;
  }
  return t;
}
const sc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || un(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, rc = (e, t) => {
  const n = {};
  for (const o in e)
    (!In(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, Vs = (e) => e.shapeFlag & 7 || e.type === ce;
function ic(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: c, patchFlag: u } = t, a = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || c) && wt || t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? xs(o, i, a) : !!i;
    if (u & 8) {
      const p = t.dynamicProps;
      for (let d = 0; d < p.length; d++) {
        const _ = p[d];
        if (i[_] !== o[_] && !Zn(a, _))
          return !0;
      }
    }
  } else
    return (s || c) && (!c || !c.$stable) ? !0 : o === i ? !1 : o ? i ? xs(o, i, a) : !0 : !!i;
  return !1;
}
function xs(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (t[r] !== e[r] && !Zn(n, r))
      return !0;
  }
  return !1;
}
function lc({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const cc = (e) => e.__isSuspense;
function uc(e, t) {
  t && t.pendingBranch ? P(e) ? t.effects.push(...e) : t.effects.push(e) : Br(e);
}
function Zr(e, t) {
  if (!oe)
    process.env.NODE_ENV !== "production" && O("provide() can only be used inside setup().");
  else {
    let n = oe.provides;
    const o = oe.parent && oe.parent.provides;
    o === n && (n = oe.provides = Object.create(o)), n[e] = t;
  }
}
function xn(e, t, n = !1) {
  const o = oe || le;
  if (o) {
    const s = o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && S(t) ? t.call(o.proxy) : t;
    process.env.NODE_ENV !== "production" && O(`injection "${String(e)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && O("inject() can only be used inside setup() or functional components.");
}
const Cs = {};
function Dt(e, t, n) {
  return process.env.NODE_ENV !== "production" && !S(t) && O("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), Xr(e, t, n);
}
function Xr(e, t, { immediate: n, deep: o, flush: s, onTrack: r, onTrigger: i } = W) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && O('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), o !== void 0 && O('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (F) => {
    O("Invalid watch source: ", F, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, u = oe;
  let a, p = !1, d = !1;
  if (ie(e) ? (a = () => e.value, p = Mn(e)) : Ot(e) ? (a = () => e, o = !0) : P(e) ? (d = !0, p = e.some((F) => Ot(F) || Mn(F)), a = () => e.map((F) => {
    if (ie(F))
      return F.value;
    if (Ot(F))
      return Et(F);
    if (S(F))
      return ze(F, u, 2);
    process.env.NODE_ENV !== "production" && c(F);
  })) : S(e) ? t ? a = () => ze(e, u, 2) : a = () => {
    if (!(u && u.isUnmounted))
      return _ && _(), Ve(e, u, 3, [D]);
  } : (a = re, process.env.NODE_ENV !== "production" && c(e)), t && o) {
    const F = a;
    a = () => Et(F());
  }
  let _, D = (F) => {
    _ = B.onStop = () => {
      ze(F, u, 4);
    };
  };
  if (cn)
    return D = re, t ? n && Ve(t, u, 3, [
      a(),
      d ? [] : void 0,
      D
    ]) : a(), re;
  let y = d ? [] : Cs;
  const V = () => {
    if (!!B.active)
      if (t) {
        const F = B.run();
        (o || p || (d ? F.some((J, R) => tn(J, y[R])) : tn(F, y))) && (_ && _(), Ve(t, u, 3, [
          F,
          y === Cs ? void 0 : y,
          D
        ]), y = F);
      } else
        B.run();
  };
  V.allowRecurse = !!t;
  let $;
  s === "sync" ? $ = V : s === "post" ? $ = () => ge(V, u && u.suspense) : (V.pre = !0, u && (V.id = u.uid), $ = () => Qn(V));
  const B = new Jo(a, $);
  return process.env.NODE_ENV !== "production" && (B.onTrack = r, B.onTrigger = i), t ? n ? V() : y = B.run() : s === "post" ? ge(B.run.bind(B), u && u.suspense) : B.run(), () => {
    B.stop(), u && u.scope && ko(u.scope.effects, B);
  };
}
function fc(e, t, n) {
  const o = this.proxy, s = te(e) ? e.includes(".") ? Gr(o, e) : () => o[e] : e.bind(o, o);
  let r;
  S(t) ? r = t : (r = t.handler, n = t);
  const i = oe;
  Ut(this);
  const c = Xr(s, r.bind(o), n);
  return i ? Ut(i) : Vt(), c;
}
function Gr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
function Et(e, t) {
  if (!q(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), ie(e))
    Et(e.value, t);
  else if (P(e))
    for (let n = 0; n < e.length; n++)
      Et(e[n], t);
  else if (hr(e) || vt(e))
    e.forEach((n) => {
      Et(n, t);
    });
  else if (mr(e))
    for (const n in e)
      Et(e[n], t);
  return e;
}
function ac() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Gn(() => {
    e.isMounted = !0;
  }), si(() => {
    e.isUnmounting = !0;
  }), e;
}
const De = [Function, Array], dc = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: De,
    onEnter: De,
    onAfterEnter: De,
    onEnterCancelled: De,
    onBeforeLeave: De,
    onLeave: De,
    onAfterLeave: De,
    onLeaveCancelled: De,
    onBeforeAppear: De,
    onAppear: De,
    onAfterAppear: De,
    onAppearCancelled: De
  },
  setup(e, { slots: t }) {
    const n = oo(), o = ac();
    let s;
    return () => {
      const r = t.default && ni(t.default(), !0);
      if (!r || !r.length)
        return;
      let i = r[0];
      if (r.length > 1) {
        let V = !1;
        for (const $ of r)
          if ($.type !== ce) {
            if (process.env.NODE_ENV !== "production" && V) {
              O("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            if (i = $, V = !0, process.env.NODE_ENV === "production")
              break;
          }
      }
      const c = M(e), { mode: u } = c;
      if (process.env.NODE_ENV !== "production" && u && u !== "in-out" && u !== "out-in" && u !== "default" && O(`invalid <transition> mode: ${u}`), o.isLeaving)
        return ho(i);
      const a = Ts(i);
      if (!a)
        return ho(i);
      const p = xo(a, c, o, n);
      Co(a, p);
      const d = n.subTree, _ = d && Ts(d);
      let D = !1;
      const { getTransitionKey: y } = a.type;
      if (y) {
        const V = y();
        s === void 0 ? s = V : V !== s && (s = V, D = !0);
      }
      if (_ && _.type !== ce && (!mt(a, _) || D)) {
        const V = xo(_, c, o, n);
        if (Co(_, V), u === "out-in")
          return o.isLeaving = !0, V.afterLeave = () => {
            o.isLeaving = !1, n.update();
          }, ho(i);
        u === "in-out" && a.type !== ce && (V.delayLeave = ($, B, F) => {
          const J = ti(o, _);
          J[String(_.key)] = _, $._leaveCb = () => {
            B(), $._leaveCb = void 0, delete p.delayedLeave;
          }, p.delayedLeave = F;
        });
      }
      return i;
    };
  }
}, ei = dc;
function ti(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || (o = /* @__PURE__ */ Object.create(null), n.set(t.type, o)), o;
}
function xo(e, t, n, o) {
  const { appear: s, mode: r, persisted: i = !1, onBeforeEnter: c, onEnter: u, onAfterEnter: a, onEnterCancelled: p, onBeforeLeave: d, onLeave: _, onAfterLeave: D, onLeaveCancelled: y, onBeforeAppear: V, onAppear: $, onAfterAppear: B, onAppearCancelled: F } = t, J = String(e.key), R = ti(n, e), Y = (j, Z) => {
    j && Ve(j, o, 9, Z);
  }, ye = (j, Z) => {
    const K = Z[1];
    Y(j, Z), P(j) ? j.every((ue) => ue.length <= 1) && K() : j.length <= 1 && K();
  }, be = {
    mode: r,
    persisted: i,
    beforeEnter(j) {
      let Z = c;
      if (!n.isMounted)
        if (s)
          Z = V || c;
        else
          return;
      j._leaveCb && j._leaveCb(!0);
      const K = R[J];
      K && mt(e, K) && K.el._leaveCb && K.el._leaveCb(), Y(Z, [j]);
    },
    enter(j) {
      let Z = u, K = a, ue = p;
      if (!n.isMounted)
        if (s)
          Z = $ || u, K = B || a, ue = F || p;
        else
          return;
      let x = !1;
      const ee = j._enterCb = (we) => {
        x || (x = !0, we ? Y(ue, [j]) : Y(K, [j]), be.delayedLeave && be.delayedLeave(), j._enterCb = void 0);
      };
      Z ? ye(Z, [j, ee]) : ee();
    },
    leave(j, Z) {
      const K = String(e.key);
      if (j._enterCb && j._enterCb(!0), n.isUnmounting)
        return Z();
      Y(d, [j]);
      let ue = !1;
      const x = j._leaveCb = (ee) => {
        ue || (ue = !0, Z(), ee ? Y(y, [j]) : Y(D, [j]), j._leaveCb = void 0, R[K] === e && delete R[K]);
      };
      R[K] = e, _ ? ye(_, [j, x]) : x();
    },
    clone(j) {
      return xo(j, t, n, o);
    }
  };
  return be;
}
function ho(e) {
  if (an(e))
    return e = je(e), e.children = null, e;
}
function Ts(e) {
  return an(e) ? e.children ? e.children[0] : void 0 : e;
}
function Co(e, t) {
  e.shapeFlag & 6 && e.component ? Co(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ni(e, t = !1, n) {
  let o = [], s = 0;
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    const c = n == null ? i.key : String(n) + String(i.key != null ? i.key : r);
    i.type === Ee ? (i.patchFlag & 128 && s++, o = o.concat(ni(i.children, t, c))) : (t || i.type !== ce) && o.push(c != null ? je(i, { key: c }) : i);
  }
  if (s > 1)
    for (let r = 0; r < o.length; r++)
      o[r].patchFlag = -2;
  return o;
}
function It(e) {
  return S(e) ? { setup: e, name: e.name } : e;
}
const Gt = (e) => !!e.type.__asyncLoader, an = (e) => e.type.__isKeepAlive;
function pc(e, t) {
  oi(e, "a", t);
}
function hc(e, t) {
  oi(e, "da", t);
}
function oi(e, t, n = oe) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Xn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      an(s.parent.vnode) && _c(o, t, n, s), s = s.parent;
  }
}
function _c(e, t, n, o) {
  const s = Xn(t, e, o, !0);
  ri(() => {
    ko(o[t], s);
  }, n);
}
function Xn(e, t, n = oe, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      Tt(), Ut(n);
      const c = Ve(t, n, e, i);
      return Vt(), $t(), c;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = dt(Xo[e].replace(/ hook$/, ""));
    O(`${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const qe = (e) => (t, n = oe) => (!cn || e === "sp") && Xn(e, t, n), mc = qe("bm"), Gn = qe("m"), gc = qe("bu"), Ec = qe("u"), si = qe("bum"), ri = qe("um"), vc = qe("sp"), Nc = qe("rtg"), Oc = qe("rtc");
function yc(e, t = oe) {
  Xn("ec", e, t);
}
function ii(e) {
  Xi(e) && O("Do not use built-in directive ids as custom directive id: " + e);
}
function li(e, t) {
  const n = le;
  if (n === null)
    return process.env.NODE_ENV !== "production" && O("withDirectives can only be used inside render functions."), e;
  const o = so(n) || n.proxy, s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, c, u, a = W] = t[r];
    S(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Et(c), s.push({
      dir: i,
      instance: o,
      value: c,
      oldValue: void 0,
      arg: u,
      modifiers: a
    });
  }
  return e;
}
function lt(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    r && (c.oldValue = r[i].value);
    let u = c.dir[o];
    u && (Tt(), Ve(u, n, 8, [
      e.el,
      c,
      e,
      t
    ]), $t());
  }
}
const To = "components", ci = Symbol();
function bc(e) {
  return te(e) ? wc(To, e, !1) || e : e || ci;
}
function wc(e, t, n = !0, o = !1) {
  const s = le || oe;
  if (s) {
    const r = s.type;
    if (e === To) {
      const c = is(r, !1);
      if (c && (c === t || c === Re(t) || c === xt(Re(t))))
        return r;
    }
    const i = $s(s[e] || r[e], t) || $s(s.appContext[e], t);
    if (!i && o)
      return r;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const c = e === To ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      O(`Failed to resolve ${e.slice(0, -1)}: ${t}${c}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && O(`resolve${xt(e.slice(0, -1))} can only be used in render() or setup().`);
}
function $s(e, t) {
  return e && (e[t] || e[Re(t)] || e[xt(Re(t))]);
}
function eo(e, t, n = {}, o, s) {
  if (le.isCE || le.parent && Gt(le.parent) && le.parent.isCE)
    return fe("slot", t === "default" ? null : { name: t }, o && o());
  let r = e[t];
  process.env.NODE_ENV !== "production" && r && r.length > 1 && (O("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."), r = () => []), r && r._c && (r._d = !1), ae();
  const i = r && ui(r(n)), c = _t(Ee, {
    key: n.key || i && i.key || `_${t}`
  }, i || (o ? o() : []), i && e._ === 1 ? 64 : -2);
  return !s && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), r && r._c && (r._d = !0), c;
}
function ui(e) {
  return e.some((t) => it(t) ? !(t.type === ce || t.type === Ee && !ui(t.children)) : !0) ? e : null;
}
const $o = (e) => e ? wi(e) ? so(e) || e.proxy : $o(e.parent) : null, jt = /* @__PURE__ */ ne(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => process.env.NODE_ENV !== "production" ? Ft(e.props) : e.props,
  $attrs: (e) => process.env.NODE_ENV !== "production" ? Ft(e.attrs) : e.attrs,
  $slots: (e) => process.env.NODE_ENV !== "production" ? Ft(e.slots) : e.slots,
  $refs: (e) => process.env.NODE_ENV !== "production" ? Ft(e.refs) : e.refs,
  $parent: (e) => $o(e.parent),
  $root: (e) => $o(e.root),
  $emit: (e) => e.emit,
  $options: (e) => __VUE_OPTIONS_API__ ? os(e) : e.type,
  $forceUpdate: (e) => e.f || (e.f = () => Qn(e.update)),
  $nextTick: (e) => e.n || (e.n = jr.bind(e.proxy)),
  $watch: (e) => __VUE_OPTIONS_API__ ? fc.bind(e) : re
}), ns = (e) => e === "_" || e === "$", fi = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (process.env.NODE_ENV !== "production" && o !== W && o.__isScriptSetup && L(o, t))
      return o[t];
    let a;
    if (t[0] !== "$") {
      const D = i[t];
      if (D !== void 0)
        switch (D) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (o !== W && L(o, t))
          return i[t] = 1, o[t];
        if (s !== W && L(s, t))
          return i[t] = 2, s[t];
        if ((a = e.propsOptions[0]) && L(a, t))
          return i[t] = 3, r[t];
        if (n !== W && L(n, t))
          return i[t] = 4, n[t];
        (!__VUE_OPTIONS_API__ || Io) && (i[t] = 0);
      }
    }
    const p = jt[t];
    let d, _;
    if (p)
      return t === "$attrs" && (ve(e, "get", t), process.env.NODE_ENV !== "production" && Rn()), p(e);
    if ((d = c.__cssModules) && (d = d[t]))
      return d;
    if (n !== W && L(n, t))
      return i[t] = 4, n[t];
    if (_ = u.config.globalProperties, L(_, t))
      return _[t];
    process.env.NODE_ENV !== "production" && le && (!te(t) || t.indexOf("__v") !== 0) && (s !== W && ns(t[0]) && L(s, t) ? O(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === le && O(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return s !== W && L(s, t) ? (s[t] = n, !0) : o !== W && L(o, t) ? (o[t] = n, !0) : L(e.props, t) ? (process.env.NODE_ENV !== "production" && O(`Attempting to mutate prop "${t}". Props are readonly.`, e), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && O(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`, e), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, propsOptions: r } }, i) {
    let c;
    return !!n[i] || e !== W && L(e, i) || t !== W && L(t, i) || (c = r[0]) && L(c, i) || L(o, i) || L(jt, i) || L(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : L(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (fi.ownKeys = (e) => (O("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function Dc(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(jt).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => jt[n](e),
      set: re
    });
  }), t;
}
function Vc(e) {
  const { ctx: t, propsOptions: [n] } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: re
    });
  });
}
function xc(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(M(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (ns(o[0])) {
        O(`setup() return property ${JSON.stringify(o)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: re
      });
    }
  });
}
function Cc() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? O(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Io = !0;
function Tc(e) {
  const t = os(e), n = e.proxy, o = e.ctx;
  Io = !1, t.beforeCreate && Is(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: r,
    methods: i,
    watch: c,
    provide: u,
    inject: a,
    created: p,
    beforeMount: d,
    mounted: _,
    beforeUpdate: D,
    updated: y,
    activated: V,
    deactivated: $,
    beforeDestroy: B,
    beforeUnmount: F,
    destroyed: J,
    unmounted: R,
    render: Y,
    renderTracked: ye,
    renderTriggered: be,
    errorCaptured: j,
    serverPrefetch: Z,
    expose: K,
    inheritAttrs: ue,
    components: x,
    directives: ee,
    filters: we
  } = t, Ie = process.env.NODE_ENV !== "production" ? Cc() : null;
  if (process.env.NODE_ENV !== "production") {
    const [H] = e.propsOptions;
    if (H)
      for (const U in H)
        Ie("Props", U);
  }
  if (a && $c(a, o, Ie, e.appContext.config.unwrapInjectedRef), i)
    for (const H in i) {
      const U = i[H];
      S(U) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, H, {
        value: U.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[H] = U.bind(n), process.env.NODE_ENV !== "production" && Ie("Methods", H)) : process.env.NODE_ENV !== "production" && O(`Method "${H}" has type "${typeof U}" in the component definition. Did you reference the function correctly?`);
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !S(s) && O("The data option must be a function. Plain object usage is no longer supported.");
    const H = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && Ko(H) && O("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."), !q(H))
      process.env.NODE_ENV !== "production" && O("data() should return an object.");
    else if (e.data = Qo(H), process.env.NODE_ENV !== "production")
      for (const U in H)
        Ie("Data", U), ns(U[0]) || Object.defineProperty(o, U, {
          configurable: !0,
          enumerable: !0,
          get: () => H[U],
          set: re
        });
  }
  if (Io = !0, r)
    for (const H in r) {
      const U = r[H], Ue = S(U) ? U.bind(n, n) : S(U.get) ? U.get.bind(n, n) : re;
      process.env.NODE_ENV !== "production" && Ue === re && O(`Computed property "${H}" has no getter.`);
      const kt = !S(U) && S(U.set) ? U.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        O(`Write operation failed: computed property "${H}" is readonly.`);
      } : re, hn = Oe({
        get: Ue,
        set: kt
      });
      Object.defineProperty(o, H, {
        enumerable: !0,
        configurable: !0,
        get: () => hn.value,
        set: (_n) => hn.value = _n
      }), process.env.NODE_ENV !== "production" && Ie("Computed", H);
    }
  if (c)
    for (const H in c)
      ai(c[H], o, n, H);
  if (u) {
    const H = S(u) ? u.call(n) : u;
    Reflect.ownKeys(H).forEach((U) => {
      Zr(U, H[U]);
    });
  }
  p && Is(p, e, "c");
  function se(H, U) {
    P(U) ? U.forEach((Ue) => H(Ue.bind(n))) : U && H(U.bind(n));
  }
  if (se(mc, d), se(Gn, _), se(gc, D), se(Ec, y), se(pc, V), se(hc, $), se(yc, j), se(Oc, ye), se(Nc, be), se(si, F), se(ri, R), se(vc, Z), P(K))
    if (K.length) {
      const H = e.exposed || (e.exposed = {});
      K.forEach((U) => {
        Object.defineProperty(H, U, {
          get: () => n[U],
          set: (Ue) => n[U] = Ue
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Y && e.render === re && (e.render = Y), ue != null && (e.inheritAttrs = ue), x && (e.components = x), ee && (e.directives = ee);
}
function $c(e, t, n = re, o = !1) {
  P(e) && (e = Po(e));
  for (const s in e) {
    const r = e[s];
    let i;
    q(r) ? "default" in r ? i = xn(r.from || s, r.default, !0) : i = xn(r.from || s) : i = xn(r), ie(i) ? o ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (c) => i.value = c
    }) : (process.env.NODE_ENV !== "production" && O(`injected property "${s}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`), t[s] = i) : t[s] = i, process.env.NODE_ENV !== "production" && n("Inject", s);
  }
}
function Is(e, t, n) {
  Ve(P(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ai(e, t, n, o) {
  const s = o.includes(".") ? Gr(n, o) : () => n[o];
  if (te(e)) {
    const r = t[e];
    S(r) ? Dt(s, r) : process.env.NODE_ENV !== "production" && O(`Invalid watch handler specified by key "${e}"`, r);
  } else if (S(e))
    Dt(s, e.bind(n));
  else if (q(e))
    if (P(e))
      e.forEach((r) => ai(r, t, n, o));
    else {
      const r = S(e.handler) ? e.handler.bind(n) : t[e.handler];
      S(r) ? Dt(s, r, e) : process.env.NODE_ENV !== "production" && O(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else
    process.env.NODE_ENV !== "production" && O(`Invalid watch option: "${o}"`, e);
}
function os(e) {
  const t = e.type, { mixins: n, extends: o } = t, { mixins: s, optionsCache: r, config: { optionMergeStrategies: i } } = e.appContext, c = r.get(t);
  let u;
  return c ? u = c : !s.length && !n && !o ? u = t : (u = {}, s.length && s.forEach((a) => Ln(u, a, i, !0)), Ln(u, t, i)), q(t) && r.set(t, u), u;
}
function Ln(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && Ln(e, r, n, !0), s && s.forEach((i) => Ln(e, i, n, !0));
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && O('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = Ic[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Ic = {
  data: Ps,
  props: pt,
  emits: pt,
  methods: pt,
  computed: pt,
  beforeCreate: he,
  created: he,
  beforeMount: he,
  mounted: he,
  beforeUpdate: he,
  updated: he,
  beforeDestroy: he,
  beforeUnmount: he,
  destroyed: he,
  unmounted: he,
  activated: he,
  deactivated: he,
  errorCaptured: he,
  serverPrefetch: he,
  components: pt,
  directives: pt,
  watch: Sc,
  provide: Ps,
  inject: Pc
};
function Ps(e, t) {
  return t ? e ? function() {
    return ne(S(e) ? e.call(this, this) : e, S(t) ? t.call(this, this) : t);
  } : t : e;
}
function Pc(e, t) {
  return pt(Po(e), Po(t));
}
function Po(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function he(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function pt(e, t) {
  return e ? ne(ne(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Sc(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = ne(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = he(e[o], t[o]);
  return n;
}
function Ac(e, t, n, o = !1) {
  const s = {}, r = {};
  Pn(r, no, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), di(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && hi(t || {}, s, e), n ? e.props = o ? s : $r(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function Mc(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function Fc(e, t, n, o) {
  const { props: s, attrs: r, vnode: { patchFlag: i } } = e, c = M(s), [u] = e.propsOptions;
  let a = !1;
  if (!(process.env.NODE_ENV !== "production" && Mc(e)) && (o || i > 0) && !(i & 16)) {
    if (i & 8) {
      const p = e.vnode.dynamicProps;
      for (let d = 0; d < p.length; d++) {
        let _ = p[d];
        if (Zn(e.emitsOptions, _))
          continue;
        const D = t[_];
        if (u)
          if (L(r, _))
            D !== r[_] && (r[_] = D, a = !0);
          else {
            const y = Re(_);
            s[y] = So(u, c, y, D, e, !1);
          }
        else
          D !== r[_] && (r[_] = D, a = !0);
      }
    }
  } else {
    di(e, t, s, r) && (a = !0);
    let p;
    for (const d in c)
      (!t || !L(t, d) && ((p = ot(d)) === d || !L(t, p))) && (u ? n && (n[d] !== void 0 || n[p] !== void 0) && (s[d] = So(u, c, d, void 0, e, !0)) : delete s[d]);
    if (r !== c)
      for (const d in r)
        (!t || !L(t, d) && !0) && (delete r[d], a = !0);
  }
  a && Ke(e, "set", "$attrs"), process.env.NODE_ENV !== "production" && hi(t || {}, s, e);
}
function di(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, c;
  if (t)
    for (let u in t) {
      if (wn(u))
        continue;
      const a = t[u];
      let p;
      s && L(s, p = Re(u)) ? !r || !r.includes(p) ? n[p] = a : (c || (c = {}))[p] = a : Zn(e.emitsOptions, u) || (!(u in o) || a !== o[u]) && (o[u] = a, i = !0);
    }
  if (r) {
    const u = M(n), a = c || W;
    for (let p = 0; p < r.length; p++) {
      const d = r[p];
      n[d] = So(s, u, d, a[d], e, !L(a, d));
    }
  }
  return i;
}
function So(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const c = L(i, "default");
    if (c && o === void 0) {
      const u = i.default;
      if (i.type !== Function && S(u)) {
        const { propsDefaults: a } = s;
        n in a ? o = a[n] : (Ut(s), o = a[n] = u.call(null, t), Vt());
      } else
        o = u;
    }
    i[0] && (r && !c ? o = !1 : i[1] && (o === "" || o === ot(n)) && (o = !0));
  }
  return o;
}
function pi(e, t, n = !1) {
  const o = t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, c = [];
  let u = !1;
  if (__VUE_OPTIONS_API__ && !S(e)) {
    const p = (d) => {
      u = !0;
      const [_, D] = pi(d, t, !0);
      ne(i, _), D && c.push(...D);
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!r && !u)
    return q(e) && o.set(e, Rt), Rt;
  if (P(r))
    for (let p = 0; p < r.length; p++) {
      process.env.NODE_ENV !== "production" && !te(r[p]) && O("props must be strings when using array syntax.", r[p]);
      const d = Re(r[p]);
      Ss(d) && (i[d] = W);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !q(r) && O("invalid props options", r);
    for (const p in r) {
      const d = Re(p);
      if (Ss(d)) {
        const _ = r[p], D = i[d] = P(_) || S(_) ? { type: _ } : _;
        if (D) {
          const y = Ms(Boolean, D.type), V = Ms(String, D.type);
          D[0] = y > -1, D[1] = V < 0 || y < V, (y > -1 || L(D, "default")) && c.push(d);
        }
      }
    }
  }
  const a = [i, c];
  return q(e) && o.set(e, a), a;
}
function Ss(e) {
  return e[0] !== "$" ? !0 : (process.env.NODE_ENV !== "production" && O(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Ao(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function As(e, t) {
  return Ao(e) === Ao(t);
}
function Ms(e, t) {
  return P(t) ? t.findIndex((n) => As(n, e)) : S(t) && As(t, e) ? 0 : -1;
}
function hi(e, t, n) {
  const o = M(t), s = n.propsOptions[0];
  for (const r in s) {
    let i = s[r];
    i != null && Rc(r, o[r], i, !L(e, r) && !L(e, ot(r)));
  }
}
function Rc(e, t, n, o) {
  const { type: s, required: r, validator: i } = n;
  if (r && o) {
    O('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !n.required)) {
    if (s != null && s !== !0) {
      let c = !1;
      const u = P(s) ? s : [s], a = [];
      for (let p = 0; p < u.length && !c; p++) {
        const { valid: d, expectedType: _ } = jc(t, u[p]);
        a.push(_ || ""), c = d;
      }
      if (!c) {
        O(Uc(e, t, a));
        return;
      }
    }
    i && !i(t) && O('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Lc = /* @__PURE__ */ Ht("String,Number,Boolean,Function,Symbol,BigInt");
function jc(e, t) {
  let n;
  const o = Ao(t);
  if (Lc(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else
    o === "Object" ? n = q(e) : o === "Array" ? n = P(e) : o === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Uc(e, t, n) {
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(xt).join(" | ")}`;
  const s = n[0], r = Wo(t), i = Fs(t, s), c = Fs(t, r);
  return n.length === 1 && Rs(s) && !Bc(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, Rs(r) && (o += `with value ${c}.`), o;
}
function Fs(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Rs(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Bc(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const _i = (e) => e[0] === "_" || e === "$stable", ss = (e) => P(e) ? e.map(Te) : [Te(e)], Hc = (e, t, n) => {
  if (t._n)
    return t;
  const o = Xt((...s) => (process.env.NODE_ENV !== "production" && oe && O(`Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`), ss(t(...s))), n);
  return o._c = !1, o;
}, mi = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (_i(s))
      continue;
    const r = e[s];
    if (S(r))
      t[s] = Hc(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && O(`Non-function value encountered for slot "${s}". Prefer function slots for better performance.`);
      const i = ss(r);
      t[s] = () => i;
    }
  }
}, gi = (e, t) => {
  process.env.NODE_ENV !== "production" && !an(e.vnode) && O("Non-function value encountered for default slot. Prefer function slots for better performance.");
  const n = ss(t);
  e.slots.default = () => n;
}, kc = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = M(t), Pn(t, "_", n)) : mi(t, e.slots = {});
  } else
    e.slots = {}, t && gi(e, t);
  Pn(e.slots, no, 1);
}, zc = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = W;
  if (o.shapeFlag & 32) {
    const c = t._;
    c ? process.env.NODE_ENV !== "production" && wt ? ne(s, t) : n && c === 1 ? r = !1 : (ne(s, t), !n && c === 1 && delete s._) : (r = !t.$stable, mi(t, s)), i = t;
  } else
    t && (gi(e, t), i = { default: 1 });
  if (r)
    for (const c in s)
      !_i(c) && !(c in i) && delete s[c];
};
function Ei() {
  return {
    app: null,
    config: {
      isNativeTag: pr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Kc = 0;
function Wc(e, t) {
  return function(o, s = null) {
    S(o) || (o = Object.assign({}, o)), s != null && !q(s) && (process.env.NODE_ENV !== "production" && O("root props passed to app.mount() must be an object."), s = null);
    const r = Ei(), i = /* @__PURE__ */ new Set();
    let c = !1;
    const u = r.app = {
      _uid: Kc++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: Bs,
      get config() {
        return r.config;
      },
      set config(a) {
        process.env.NODE_ENV !== "production" && O("app.config cannot be replaced. Modify individual options instead.");
      },
      use(a, ...p) {
        return i.has(a) ? process.env.NODE_ENV !== "production" && O("Plugin has already been applied to target app.") : a && S(a.install) ? (i.add(a), a.install(u, ...p)) : S(a) ? (i.add(a), a(u, ...p)) : process.env.NODE_ENV !== "production" && O('A plugin must either be a function or an object with an "install" function.'), u;
      },
      mixin(a) {
        return __VUE_OPTIONS_API__ ? r.mixins.includes(a) ? process.env.NODE_ENV !== "production" && O("Mixin has already been applied to target app" + (a.name ? `: ${a.name}` : "")) : r.mixins.push(a) : process.env.NODE_ENV !== "production" && O("Mixins are only available in builds supporting Options API"), u;
      },
      component(a, p) {
        return process.env.NODE_ENV !== "production" && Fo(a, r.config), p ? (process.env.NODE_ENV !== "production" && r.components[a] && O(`Component "${a}" has already been registered in target app.`), r.components[a] = p, u) : r.components[a];
      },
      directive(a, p) {
        return process.env.NODE_ENV !== "production" && ii(a), p ? (process.env.NODE_ENV !== "production" && r.directives[a] && O(`Directive "${a}" has already been registered in target app.`), r.directives[a] = p, u) : r.directives[a];
      },
      mount(a, p, d) {
        if (c)
          process.env.NODE_ENV !== "production" && O("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
        else {
          process.env.NODE_ENV !== "production" && a.__vue_app__ && O("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
          const _ = fe(o, s);
          return _.appContext = r, process.env.NODE_ENV !== "production" && (r.reload = () => {
            e(je(_), a, d);
          }), p && t ? t(_, a) : e(_, a, d), c = !0, u._container = a, a.__vue_app__ = u, (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && (u._instance = _.component, Yl(u, Bs)), so(_.component) || _.component.proxy;
        }
      },
      unmount() {
        c ? (e(null, u._container), (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && (u._instance = null, Ql(u)), delete u._container.__vue_app__) : process.env.NODE_ENV !== "production" && O("Cannot unmount an app that is not mounted.");
      },
      provide(a, p) {
        return process.env.NODE_ENV !== "production" && a in r.provides && O(`App already provides property with key "${String(a)}". It will be overwritten with the new value.`), r.provides[a] = p, u;
      }
    };
    return u;
  };
}
function Mo(e, t, n, o, s = !1) {
  if (P(e)) {
    e.forEach((_, D) => Mo(_, t && (P(t) ? t[D] : t), n, o, s));
    return;
  }
  if (Gt(o) && !s)
    return;
  const r = o.shapeFlag & 4 ? so(o.component) || o.component.proxy : o.el, i = s ? null : r, { i: c, r: u } = e;
  if (process.env.NODE_ENV !== "production" && !c) {
    O("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
    return;
  }
  const a = t && t.r, p = c.refs === W ? c.refs = {} : c.refs, d = c.setupState;
  if (a != null && a !== u && (te(a) ? (p[a] = null, L(d, a) && (d[a] = null)) : ie(a) && (a.value = null)), S(u))
    ze(u, c, 12, [i, p]);
  else {
    const _ = te(u), D = ie(u);
    if (_ || D) {
      const y = () => {
        if (e.f) {
          const V = _ ? p[u] : u.value;
          s ? P(V) && ko(V, r) : P(V) ? V.includes(r) || V.push(r) : _ ? (p[u] = [r], L(d, u) && (d[u] = p[u])) : (u.value = [r], e.k && (p[e.k] = u.value));
        } else
          _ ? (p[u] = i, L(d, u) && (d[u] = i)) : D ? (u.value = i, e.k && (p[e.k] = i)) : process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
      };
      i ? (y.id = -1, ge(y, n)) : y();
    } else
      process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
  }
}
let Wt, et;
function He(e, t) {
  e.appContext.config.performance && jn() && et.mark(`vue-${t}-${e.uid}`), (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && Gl(e, t, jn() ? et.now() : Date.now());
}
function ke(e, t) {
  if (e.appContext.config.performance && jn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end";
    et.mark(o), et.measure(`<${ro(e, e.type)}> ${t}`, n, o), et.clearMarks(n), et.clearMarks(o);
  }
  (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && ec(e, t, jn() ? et.now() : Date.now());
}
function jn() {
  return Wt !== void 0 || (typeof window < "u" && window.performance ? (Wt = !0, et = window.performance) : Wt = !1), Wt;
}
function qc() {
  const e = [];
  if (typeof __VUE_OPTIONS_API__ != "boolean" && (process.env.NODE_ENV !== "production" && e.push("__VUE_OPTIONS_API__"), Sn().__VUE_OPTIONS_API__ = !0), typeof __VUE_PROD_DEVTOOLS__ != "boolean" && (process.env.NODE_ENV !== "production" && e.push("__VUE_PROD_DEVTOOLS__"), Sn().__VUE_PROD_DEVTOOLS__ = !1), process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(`Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const ge = uc;
function Jc(e) {
  return Yc(e);
}
function Yc(e, t) {
  qc();
  const n = Sn();
  n.__VUE__ = !0, (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && Kr(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const { insert: o, remove: s, patchProp: r, createElement: i, createText: c, createComment: u, setText: a, setElementText: p, parentNode: d, nextSibling: _, setScopeId: D = re, cloneNode: y, insertStaticContent: V } = e, $ = (l, f, h, g = null, m = null, N = null, w = !1, v = null, b = process.env.NODE_ENV !== "production" && wt ? !1 : !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !mt(l, f) && (g = gn(l), Je(l, m, N, !0), l = null), f.patchFlag === -2 && (b = !1, f.dynamicChildren = null);
    const { type: E, ref: T, shapeFlag: C } = f;
    switch (E) {
      case to:
        B(l, f, h, g);
        break;
      case ce:
        F(l, f, h, g);
        break;
      case Tn:
        l == null ? J(f, h, g, w) : process.env.NODE_ENV !== "production" && R(l, f, h, w);
        break;
      case Ee:
        we(l, f, h, g, m, N, w, v, b);
        break;
      default:
        C & 1 ? be(l, f, h, g, m, N, w, v, b) : C & 6 ? Ie(l, f, h, g, m, N, w, v, b) : C & 64 || C & 128 ? E.process(l, f, h, g, m, N, w, v, b, Pt) : process.env.NODE_ENV !== "production" && O("Invalid VNode type:", E, `(${typeof E})`);
    }
    T != null && m && Mo(T, l && l.ref, N, f || l, !f);
  }, B = (l, f, h, g) => {
    if (l == null)
      o(f.el = c(f.children), h, g);
    else {
      const m = f.el = l.el;
      f.children !== l.children && a(m, f.children);
    }
  }, F = (l, f, h, g) => {
    l == null ? o(f.el = u(f.children || ""), h, g) : f.el = l.el;
  }, J = (l, f, h, g) => {
    [l.el, l.anchor] = V(l.children, f, h, g, l.el, l.anchor);
  }, R = (l, f, h, g) => {
    if (f.children !== l.children) {
      const m = _(l.anchor);
      ye(l), [f.el, f.anchor] = V(f.children, h, m, g);
    } else
      f.el = l.el, f.anchor = l.anchor;
  }, Y = ({ el: l, anchor: f }, h, g) => {
    let m;
    for (; l && l !== f; )
      m = _(l), o(l, h, g), l = m;
    o(f, h, g);
  }, ye = ({ el: l, anchor: f }) => {
    let h;
    for (; l && l !== f; )
      h = _(l), s(l), l = h;
    s(f);
  }, be = (l, f, h, g, m, N, w, v, b) => {
    w = w || f.type === "svg", l == null ? j(f, h, g, m, N, w, v, b) : ue(l, f, m, N, w, v, b);
  }, j = (l, f, h, g, m, N, w, v) => {
    let b, E;
    const { type: T, props: C, shapeFlag: I, transition: A, patchFlag: k, dirs: Q } = l;
    if (process.env.NODE_ENV === "production" && l.el && y !== void 0 && k === -1)
      b = l.el = y(l.el);
    else {
      if (b = l.el = i(l.type, N, C && C.is, C), I & 8 ? p(b, l.children) : I & 16 && K(l.children, b, null, g, m, N && T !== "foreignObject", w, v), Q && lt(l, null, g, "created"), C) {
        for (const G in C)
          G !== "value" && !wn(G) && r(b, G, null, C[G], N, l.children, g, m, Be);
        "value" in C && r(b, "value", null, C.value), (E = C.onVnodeBeforeMount) && Se(E, g, l);
      }
      Z(b, l, l.scopeId, w, g);
    }
    (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && (Object.defineProperty(b, "__vnode", {
      value: l,
      enumerable: !1
    }), Object.defineProperty(b, "__vueParentComponent", {
      value: g,
      enumerable: !1
    })), Q && lt(l, null, g, "beforeMount");
    const X = (!m || m && !m.pendingBranch) && A && !A.persisted;
    X && A.beforeEnter(b), o(b, f, h), ((E = C && C.onVnodeMounted) || X || Q) && ge(() => {
      E && Se(E, g, l), X && A.enter(b), Q && lt(l, null, g, "mounted");
    }, m);
  }, Z = (l, f, h, g, m) => {
    if (h && D(l, h), g)
      for (let N = 0; N < g.length; N++)
        D(l, g[N]);
    if (m) {
      let N = m.subTree;
      if (process.env.NODE_ENV !== "production" && N.patchFlag > 0 && N.patchFlag & 2048 && (N = Qr(N.children) || N), f === N) {
        const w = m.vnode;
        Z(l, w, w.scopeId, w.slotScopeIds, m.parent);
      }
    }
  }, K = (l, f, h, g, m, N, w, v, b = 0) => {
    for (let E = b; E < l.length; E++) {
      const T = l[E] = v ? Ge(l[E]) : Te(l[E]);
      $(null, T, f, h, g, m, N, w, v);
    }
  }, ue = (l, f, h, g, m, N, w) => {
    const v = f.el = l.el;
    let { patchFlag: b, dynamicChildren: E, dirs: T } = f;
    b |= l.patchFlag & 16;
    const C = l.props || W, I = f.props || W;
    let A;
    h && ct(h, !1), (A = I.onVnodeBeforeUpdate) && Se(A, h, f, l), T && lt(f, l, h, "beforeUpdate"), h && ct(h, !0), process.env.NODE_ENV !== "production" && wt && (b = 0, w = !1, E = null);
    const k = m && f.type !== "foreignObject";
    if (E ? (x(l.dynamicChildren, E, v, h, g, k, N), process.env.NODE_ENV !== "production" && h && h.type.__hmrId && Cn(l, f)) : w || kt(l, f, v, null, h, g, k, N, !1), b > 0) {
      if (b & 16)
        ee(v, f, C, I, h, g, m);
      else if (b & 2 && C.class !== I.class && r(v, "class", null, I.class, m), b & 4 && r(v, "style", C.style, I.style, m), b & 8) {
        const Q = f.dynamicProps;
        for (let X = 0; X < Q.length; X++) {
          const G = Q[X], xe = C[G], St = I[G];
          (St !== xe || G === "value") && r(v, G, xe, St, m, l.children, h, g, Be);
        }
      }
      b & 1 && l.children !== f.children && p(v, f.children);
    } else
      !w && E == null && ee(v, f, C, I, h, g, m);
    ((A = I.onVnodeUpdated) || T) && ge(() => {
      A && Se(A, h, f, l), T && lt(f, l, h, "updated");
    }, g);
  }, x = (l, f, h, g, m, N, w) => {
    for (let v = 0; v < f.length; v++) {
      const b = l[v], E = f[v], T = b.el && (b.type === Ee || !mt(b, E) || b.shapeFlag & 70) ? d(b.el) : h;
      $(b, E, T, null, g, m, N, w, !0);
    }
  }, ee = (l, f, h, g, m, N, w) => {
    if (h !== g) {
      for (const v in g) {
        if (wn(v))
          continue;
        const b = g[v], E = h[v];
        b !== E && v !== "value" && r(l, v, E, b, w, f.children, m, N, Be);
      }
      if (h !== W)
        for (const v in h)
          !wn(v) && !(v in g) && r(l, v, h[v], null, w, f.children, m, N, Be);
      "value" in g && r(l, "value", h.value, g.value);
    }
  }, we = (l, f, h, g, m, N, w, v, b) => {
    const E = f.el = l ? l.el : c(""), T = f.anchor = l ? l.anchor : c("");
    let { patchFlag: C, dynamicChildren: I, slotScopeIds: A } = f;
    process.env.NODE_ENV !== "production" && (wt || C & 2048) && (C = 0, b = !1, I = null), A && (v = v ? v.concat(A) : A), l == null ? (o(E, h, g), o(T, h, g), K(f.children, h, T, m, N, w, v, b)) : C > 0 && C & 64 && I && l.dynamicChildren ? (x(l.dynamicChildren, I, h, m, N, w, v), process.env.NODE_ENV !== "production" && m && m.type.__hmrId ? Cn(l, f) : (f.key != null || m && f === m.subTree) && Cn(l, f, !0)) : kt(l, f, h, T, m, N, w, v, b);
  }, Ie = (l, f, h, g, m, N, w, v, b) => {
    f.slotScopeIds = v, l == null ? f.shapeFlag & 512 ? m.ctx.activate(f, h, g, w, b) : se(f, h, g, m, N, w, b) : H(l, f, b);
  }, se = (l, f, h, g, m, N, w) => {
    const v = l.component = su(l, g, m);
    if (process.env.NODE_ENV !== "production" && v.type.__hmrId && Kl(v), process.env.NODE_ENV !== "production" && (Dn(l), He(v, "mount")), an(l) && (v.ctx.renderer = Pt), process.env.NODE_ENV !== "production" && He(v, "init"), iu(v), process.env.NODE_ENV !== "production" && ke(v, "init"), v.asyncDep) {
      if (m && m.registerDep(v, U), !l.el) {
        const b = v.subTree = fe(ce);
        F(null, b, f, h);
      }
      return;
    }
    U(v, l, f, h, m, N, w), process.env.NODE_ENV !== "production" && (Vn(), ke(v, "mount"));
  }, H = (l, f, h) => {
    const g = f.component = l.component;
    if (ic(l, f, h))
      if (g.asyncDep && !g.asyncResolved) {
        process.env.NODE_ENV !== "production" && Dn(f), Ue(g, f, h), process.env.NODE_ENV !== "production" && Vn();
        return;
      } else
        g.next = f, kl(g.update), g.update();
    else
      f.el = l.el, g.vnode = f;
  }, U = (l, f, h, g, m, N, w) => {
    const v = () => {
      if (l.isMounted) {
        let { next: T, bu: C, u: I, parent: A, vnode: k } = l, Q = T, X;
        process.env.NODE_ENV !== "production" && Dn(T || l.vnode), ct(l, !1), T ? (T.el = k.el, Ue(l, T, w)) : T = k, C && Kt(C), (X = T.props && T.props.onVnodeBeforeUpdate) && Se(X, A, T, k), ct(l, !0), process.env.NODE_ENV !== "production" && He(l, "render");
        const G = po(l);
        process.env.NODE_ENV !== "production" && ke(l, "render");
        const xe = l.subTree;
        l.subTree = G, process.env.NODE_ENV !== "production" && He(l, "patch"), $(
          xe,
          G,
          d(xe.el),
          gn(xe),
          l,
          m,
          N
        ), process.env.NODE_ENV !== "production" && ke(l, "patch"), T.el = G.el, Q === null && lc(l, G.el), I && ge(I, m), (X = T.props && T.props.onVnodeUpdated) && ge(() => Se(X, A, T, k), m), (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && Wr(l), process.env.NODE_ENV !== "production" && Vn();
      } else {
        let T;
        const { el: C, props: I } = f, { bm: A, m: k, parent: Q } = l, X = Gt(f);
        if (ct(l, !1), A && Kt(A), !X && (T = I && I.onVnodeBeforeMount) && Se(T, Q, f), ct(l, !0), C && fo) {
          const G = () => {
            process.env.NODE_ENV !== "production" && He(l, "render"), l.subTree = po(l), process.env.NODE_ENV !== "production" && ke(l, "render"), process.env.NODE_ENV !== "production" && He(l, "hydrate"), fo(C, l.subTree, l, m, null), process.env.NODE_ENV !== "production" && ke(l, "hydrate");
          };
          X ? f.type.__asyncLoader().then(
            () => !l.isUnmounted && G()
          ) : G();
        } else {
          process.env.NODE_ENV !== "production" && He(l, "render");
          const G = l.subTree = po(l);
          process.env.NODE_ENV !== "production" && ke(l, "render"), process.env.NODE_ENV !== "production" && He(l, "patch"), $(null, G, h, g, l, m, N), process.env.NODE_ENV !== "production" && ke(l, "patch"), f.el = G.el;
        }
        if (k && ge(k, m), !X && (T = I && I.onVnodeMounted)) {
          const G = f;
          ge(() => Se(T, Q, G), m);
        }
        (f.shapeFlag & 256 || Q && Gt(Q.vnode) && Q.vnode.shapeFlag & 256) && l.a && ge(l.a, m), l.isMounted = !0, (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && Zl(l), f = h = g = null;
      }
    }, b = l.effect = new Jo(
      v,
      () => Qn(E),
      l.scope
    ), E = l.update = () => b.run();
    E.id = l.uid, ct(l, !0), process.env.NODE_ENV !== "production" && (b.onTrack = l.rtc ? (T) => Kt(l.rtc, T) : void 0, b.onTrigger = l.rtg ? (T) => Kt(l.rtg, T) : void 0, E.ownerInstance = l), E();
  }, Ue = (l, f, h) => {
    f.component = l;
    const g = l.vnode.props;
    l.vnode = f, l.next = null, Fc(l, f.props, g, h), zc(l, f.children, h), Tt(), ws(), $t();
  }, kt = (l, f, h, g, m, N, w, v, b = !1) => {
    const E = l && l.children, T = l ? l.shapeFlag : 0, C = f.children, { patchFlag: I, shapeFlag: A } = f;
    if (I > 0) {
      if (I & 128) {
        _n(E, C, h, g, m, N, w, v, b);
        return;
      } else if (I & 256) {
        hn(E, C, h, g, m, N, w, v, b);
        return;
      }
    }
    A & 8 ? (T & 16 && Be(E, m, N), C !== E && p(h, C)) : T & 16 ? A & 16 ? _n(E, C, h, g, m, N, w, v, b) : Be(E, m, N, !0) : (T & 8 && p(h, ""), A & 16 && K(C, h, g, m, N, w, v, b));
  }, hn = (l, f, h, g, m, N, w, v, b) => {
    l = l || Rt, f = f || Rt;
    const E = l.length, T = f.length, C = Math.min(E, T);
    let I;
    for (I = 0; I < C; I++) {
      const A = f[I] = b ? Ge(f[I]) : Te(f[I]);
      $(l[I], A, h, null, m, N, w, v, b);
    }
    E > T ? Be(l, m, N, !0, !1, C) : K(f, h, g, m, N, w, v, b, C);
  }, _n = (l, f, h, g, m, N, w, v, b) => {
    let E = 0;
    const T = f.length;
    let C = l.length - 1, I = T - 1;
    for (; E <= C && E <= I; ) {
      const A = l[E], k = f[E] = b ? Ge(f[E]) : Te(f[E]);
      if (mt(A, k))
        $(A, k, h, null, m, N, w, v, b);
      else
        break;
      E++;
    }
    for (; E <= C && E <= I; ) {
      const A = l[C], k = f[I] = b ? Ge(f[I]) : Te(f[I]);
      if (mt(A, k))
        $(A, k, h, null, m, N, w, v, b);
      else
        break;
      C--, I--;
    }
    if (E > C) {
      if (E <= I) {
        const A = I + 1, k = A < T ? f[A].el : g;
        for (; E <= I; )
          $(null, f[E] = b ? Ge(f[E]) : Te(f[E]), h, k, m, N, w, v, b), E++;
      }
    } else if (E > I)
      for (; E <= C; )
        Je(l[E], m, N, !0), E++;
    else {
      const A = E, k = E, Q = /* @__PURE__ */ new Map();
      for (E = k; E <= I; E++) {
        const pe = f[E] = b ? Ge(f[E]) : Te(f[E]);
        pe.key != null && (process.env.NODE_ENV !== "production" && Q.has(pe.key) && O("Duplicate keys found during update:", JSON.stringify(pe.key), "Make sure keys are unique."), Q.set(pe.key, E));
      }
      let X, G = 0;
      const xe = I - k + 1;
      let St = !1, ps = 0;
      const zt = new Array(xe);
      for (E = 0; E < xe; E++)
        zt[E] = 0;
      for (E = A; E <= C; E++) {
        const pe = l[E];
        if (G >= xe) {
          Je(pe, m, N, !0);
          continue;
        }
        let Pe;
        if (pe.key != null)
          Pe = Q.get(pe.key);
        else
          for (X = k; X <= I; X++)
            if (zt[X - k] === 0 && mt(pe, f[X])) {
              Pe = X;
              break;
            }
        Pe === void 0 ? Je(pe, m, N, !0) : (zt[Pe - k] = E + 1, Pe >= ps ? ps = Pe : St = !0, $(pe, f[Pe], h, null, m, N, w, v, b), G++);
      }
      const hs = St ? Qc(zt) : Rt;
      for (X = hs.length - 1, E = xe - 1; E >= 0; E--) {
        const pe = k + E, Pe = f[pe], _s = pe + 1 < T ? f[pe + 1].el : g;
        zt[E] === 0 ? $(null, Pe, h, _s, m, N, w, v, b) : St && (X < 0 || E !== hs[X] ? mn(Pe, h, _s, 2) : X--);
      }
    }
  }, mn = (l, f, h, g, m = null) => {
    const { el: N, type: w, transition: v, children: b, shapeFlag: E } = l;
    if (E & 6) {
      mn(l.component.subTree, f, h, g);
      return;
    }
    if (E & 128) {
      l.suspense.move(f, h, g);
      return;
    }
    if (E & 64) {
      w.move(l, f, h, Pt);
      return;
    }
    if (w === Ee) {
      o(N, f, h);
      for (let C = 0; C < b.length; C++)
        mn(b[C], f, h, g);
      o(l.anchor, f, h);
      return;
    }
    if (w === Tn) {
      Y(l, f, h);
      return;
    }
    if (g !== 2 && E & 1 && v)
      if (g === 0)
        v.beforeEnter(N), o(N, f, h), ge(() => v.enter(N), m);
      else {
        const { leave: C, delayLeave: I, afterLeave: A } = v, k = () => o(N, f, h), Q = () => {
          C(N, () => {
            k(), A && A();
          });
        };
        I ? I(N, k, Q) : Q();
      }
    else
      o(N, f, h);
  }, Je = (l, f, h, g = !1, m = !1) => {
    const { type: N, props: w, ref: v, children: b, dynamicChildren: E, shapeFlag: T, patchFlag: C, dirs: I } = l;
    if (v != null && Mo(v, null, h, l, !0), T & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const A = T & 1 && I, k = !Gt(l);
    let Q;
    if (k && (Q = w && w.onVnodeBeforeUnmount) && Se(Q, f, l), T & 6)
      zi(l.component, h, g);
    else {
      if (T & 128) {
        l.suspense.unmount(h, g);
        return;
      }
      A && lt(l, null, f, "beforeUnmount"), T & 64 ? l.type.remove(l, f, h, m, Pt, g) : E && (N !== Ee || C > 0 && C & 64) ? Be(E, f, h, !1, !0) : (N === Ee && C & 384 || !m && T & 16) && Be(b, f, h), g && co(l);
    }
    (k && (Q = w && w.onVnodeUnmounted) || A) && ge(() => {
      Q && Se(Q, f, l), A && lt(l, null, f, "unmounted");
    }, h);
  }, co = (l) => {
    const { type: f, el: h, anchor: g, transition: m } = l;
    if (f === Ee) {
      process.env.NODE_ENV !== "production" && l.patchFlag > 0 && l.patchFlag & 2048 && m && !m.persisted ? l.children.forEach((w) => {
        w.type === ce ? s(w.el) : co(w);
      }) : ki(h, g);
      return;
    }
    if (f === Tn) {
      ye(l);
      return;
    }
    const N = () => {
      s(h), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (l.shapeFlag & 1 && m && !m.persisted) {
      const { leave: w, delayLeave: v } = m, b = () => w(h, N);
      v ? v(l.el, N, b) : b();
    } else
      N();
  }, ki = (l, f) => {
    let h;
    for (; l !== f; )
      h = _(l), s(l), l = h;
    s(f);
  }, zi = (l, f, h) => {
    process.env.NODE_ENV !== "production" && l.type.__hmrId && Wl(l);
    const { bum: g, scope: m, update: N, subTree: w, um: v } = l;
    g && Kt(g), m.stop(), N && (N.active = !1, Je(w, l, f, h)), v && ge(v, f), ge(() => {
      l.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve()), (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && Xl(l);
  }, Be = (l, f, h, g = !1, m = !1, N = 0) => {
    for (let w = N; w < l.length; w++)
      Je(l[w], f, h, g, m);
  }, gn = (l) => l.shapeFlag & 6 ? gn(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : _(l.anchor || l.el), ds = (l, f, h) => {
    l == null ? f._vnode && Je(f._vnode, null, null, !0) : $(f._vnode || null, l, f, null, null, null, h), ws(), Hr(), f._vnode = l;
  }, Pt = {
    p: $,
    um: Je,
    m: mn,
    r: co,
    mt: se,
    mc: K,
    pc: kt,
    pbc: x,
    n: gn,
    o: e
  };
  let uo, fo;
  return t && ([uo, fo] = t(Pt)), {
    render: ds,
    hydrate: uo,
    createApp: Wc(ds, uo)
  };
}
function ct({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Cn(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (P(o) && P(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let c = s[r];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = s[r] = Ge(s[r]), c.el = i.el), n || Cn(i, c)), process.env.NODE_ENV !== "production" && c.type === ce && !c.el && (c.el = i.el);
    }
}
function Qc(e) {
  const t = e.slice(), n = [0];
  let o, s, r, i, c;
  const u = e.length;
  for (o = 0; o < u; o++) {
    const a = e[o];
    if (a !== 0) {
      if (s = n[n.length - 1], e[s] < a) {
        t[o] = s, n.push(o);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        c = r + i >> 1, e[n[c]] < a ? r = c + 1 : i = c;
      a < e[n[r]] && (r > 0 && (t[o] = n[r - 1]), n[r] = o);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
const Zc = (e) => e.__isTeleport, Ee = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), to = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), ce = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0), Tn = Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0), en = [];
let $e = null;
function ae(e = !1) {
  en.push($e = e ? null : []);
}
function Xc() {
  en.pop(), $e = en[en.length - 1] || null;
}
let ln = 1;
function Ls(e) {
  ln += e;
}
function vi(e) {
  return e.dynamicChildren = ln > 0 ? $e || Rt : null, Xc(), ln > 0 && $e && $e.push(e), e;
}
function We(e, t, n, o, s, r) {
  return vi(Le(e, t, n, o, s, r, !0));
}
function _t(e, t, n, o, s) {
  return vi(fe(e, t, n, o, s, !0));
}
function it(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function mt(e, t) {
  return process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && At.has(t.type) ? !1 : e.type === t.type && e.key === t.key;
}
const Gc = (...e) => Oi(...e), no = "__vInternal", Ni = ({ key: e }) => e != null ? e : null, $n = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? te(e) || ie(e) || S(e) ? { i: le, r: e, k: t, f: !!n } : e : null;
function Le(e, t = null, n = null, o = 0, s = null, r = e === Ee ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ni(t),
    ref: t && $n(t),
    scopeId: Yr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null
  };
  return c ? (rs(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= te(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && O("VNode created with invalid key (NaN). VNode type:", u.type), ln > 0 && !i && $e && (u.patchFlag > 0 || r & 6) && u.patchFlag !== 32 && $e.push(u), u;
}
const fe = process.env.NODE_ENV !== "production" ? Gc : Oi;
function Oi(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === ci) && (process.env.NODE_ENV !== "production" && !e && O(`Invalid vnode type when creating vnode: ${e}.`), e = ce), it(e)) {
    const c = je(e, t, !0);
    return n && rs(c, n), ln > 0 && !r && $e && (c.shapeFlag & 6 ? $e[$e.indexOf(e)] = c : $e.push(c)), c.patchFlag |= -2, c;
  }
  if (Vi(e) && (e = e.__vccOpts), t) {
    t = eu(t);
    let { class: c, style: u } = t;
    c && !te(c) && (t.class = Ce(c)), q(u) && (bo(u) && !P(u) && (u = ne({}, u)), t.style = Hn(u));
  }
  const i = te(e) ? 1 : cc(e) ? 128 : Zc(e) ? 64 : q(e) ? 4 : S(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && bo(e) && (e = M(e), O("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), Le(e, t, n, o, s, i, r, !0);
}
function eu(e) {
  return e ? bo(e) || no in e ? ne({}, e) : e : null;
}
function je(e, t, n = !1) {
  const { props: o, ref: s, patchFlag: r, children: i } = e, c = t ? bi(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Ni(c),
    ref: t && t.ref ? n && s ? P(s) ? s.concat($n(t)) : [s, $n(t)] : $n(t) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && r === -1 && P(i) ? i.map(yi) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ee ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && je(e.ssContent),
    ssFallback: e.ssFallback && je(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  };
}
function yi(e) {
  const t = je(e);
  return P(e.children) && (t.children = e.children.map(yi)), t;
}
function tu(e = " ", t = 0) {
  return fe(to, null, e, t);
}
function bn(e = "", t = !1) {
  return t ? (ae(), _t(ce, null, e)) : fe(ce, null, e);
}
function Te(e) {
  return e == null || typeof e == "boolean" ? fe(ce) : P(e) ? fe(
    Ee,
    null,
    e.slice()
  ) : typeof e == "object" ? Ge(e) : fe(to, null, String(e));
}
function Ge(e) {
  return e.el === null || e.memo ? e : je(e);
}
function rs(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (P(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), rs(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(no in t) ? t._ctx = le : s === 3 && le && (le.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    S(t) ? (t = { default: t, _ctx: le }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [tu(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function bi(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = Ce([t.class, o.class]));
      else if (s === "style")
        t.style = Hn([t.style, o.style]);
      else if (un(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(P(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else
        s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Se(e, t, n, o = null) {
  Ve(e, t, 7, [
    n,
    o
  ]);
}
const nu = Ei();
let ou = 0;
function su(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || nu, r = {
    uid: ou++,
    vnode: e,
    type: o,
    parent: t,
    appContext: s,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new tl(!0),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: pi(o, s),
    emitsOptions: Jr(o, s),
    emit: null,
    emitted: null,
    propsDefaults: W,
    inheritAttrs: o.inheritAttrs,
    ctx: W,
    data: W,
    props: W,
    attrs: W,
    slots: W,
    refs: W,
    setupState: W,
    setupContext: null,
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return process.env.NODE_ENV !== "production" ? r.ctx = Dc(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = nc.bind(null, r), e.ce && e.ce(r), r;
}
let oe = null;
const oo = () => oe || le, Ut = (e) => {
  oe = e, e.scope.on();
}, Vt = () => {
  oe && oe.scope.off(), oe = null;
}, ru = /* @__PURE__ */ Ht("slot,component");
function Fo(e, t) {
  const n = t.isNativeTag || pr;
  (ru(e) || n(e)) && O("Do not use built-in or reserved HTML elements as component id: " + e);
}
function wi(e) {
  return e.vnode.shapeFlag & 4;
}
let cn = !1;
function iu(e, t = !1) {
  cn = t;
  const { props: n, children: o } = e.vnode, s = wi(e);
  Ac(e, n, s, t), kc(e, o);
  const r = s ? lu(e, t) : void 0;
  return cn = !1, r;
}
function lu(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && Fo(o.name, e.appContext.config), o.components) {
      const r = Object.keys(o.components);
      for (let i = 0; i < r.length; i++)
        Fo(r[i], e.appContext.config);
    }
    if (o.directives) {
      const r = Object.keys(o.directives);
      for (let i = 0; i < r.length; i++)
        ii(r[i]);
    }
    o.compilerOptions && cu() && O('"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.');
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Pr(new Proxy(e.ctx, fi)), process.env.NODE_ENV !== "production" && Vc(e);
  const { setup: s } = o;
  if (s) {
    const r = e.setupContext = s.length > 1 ? uu(e) : null;
    Ut(e), Tt();
    const i = ze(s, e, 0, [process.env.NODE_ENV !== "production" ? Ft(e.props) : e.props, r]);
    if ($t(), Vt(), Ko(i)) {
      if (i.then(Vt, Vt), t)
        return i.then((c) => {
          js(e, c, t);
        }).catch((c) => {
          Yn(c, e, 0);
        });
      if (e.asyncDep = i, process.env.NODE_ENV !== "production" && !e.suspense) {
        const c = (n = o.name) !== null && n !== void 0 ? n : "Anonymous";
        O(`Component <${c}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
      }
    } else
      js(e, i, t);
  } else
    Di(e, t);
}
function js(e, t, n) {
  S(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : q(t) ? (process.env.NODE_ENV !== "production" && it(t) && O("setup() should not return VNodes directly - return a render function instead."), (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && (e.devtoolsRawSetupState = t), e.setupState = Mr(t), process.env.NODE_ENV !== "production" && xc(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && O(`setup() should return an object. Received: ${t === null ? "null" : typeof t}`), Di(e, n);
}
let Ro;
const cu = () => !Ro;
function Di(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && Ro && !o.render) {
      const s = o.template || os(e).template;
      if (s) {
        process.env.NODE_ENV !== "production" && He(e, "compile");
        const { isCustomElement: r, compilerOptions: i } = e.appContext.config, { delimiters: c, compilerOptions: u } = o, a = ne(ne({
          isCustomElement: r,
          delimiters: c
        }, i), u);
        o.render = Ro(s, a), process.env.NODE_ENV !== "production" && ke(e, "compile");
      }
    }
    e.render = o.render || re;
  }
  __VUE_OPTIONS_API__ && (Ut(e), Tt(), Tc(e), $t(), Vt()), process.env.NODE_ENV !== "production" && !o.render && e.render === re && !t && (o.template ? O('Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".') : O("Component is missing template or render function."));
}
function Us(e) {
  return new Proxy(e.attrs, process.env.NODE_ENV !== "production" ? {
    get(t, n) {
      return Rn(), ve(e, "get", "$attrs"), t[n];
    },
    set() {
      return O("setupContext.attrs is readonly."), !1;
    },
    deleteProperty() {
      return O("setupContext.attrs is readonly."), !1;
    }
  } : {
    get(t, n) {
      return ve(e, "get", "$attrs"), t[n];
    }
  });
}
function uu(e) {
  const t = (o) => {
    process.env.NODE_ENV !== "production" && e.exposed && O("expose() should be called only once per setup()."), e.exposed = o || {};
  };
  let n;
  return process.env.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return n || (n = Us(e));
    },
    get slots() {
      return Ft(e.slots);
    },
    get emit() {
      return (o, ...s) => e.emit(o, ...s);
    },
    expose: t
  }) : {
    get attrs() {
      return n || (n = Us(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function so(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Mr(Pr(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in jt)
          return jt[n](e);
      }
    }));
}
const fu = /(?:^|[-_])(\w)/g, au = (e) => e.replace(fu, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function is(e, t = !0) {
  return S(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function ro(e, t, n = !1) {
  let o = is(t);
  if (!o && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (o = s[1]);
  }
  if (!o && e && e.parent) {
    const s = (r) => {
      for (const i in r)
        if (r[i] === t)
          return i;
    };
    o = s(e.components || e.parent.type.components) || s(e.appContext.components);
  }
  return o ? au(o) : n ? "App" : "Anonymous";
}
function Vi(e) {
  return S(e) && "__vccOpts" in e;
}
const Oe = (e, t) => Ml(e, t, cn);
function du(e, t, n) {
  const o = arguments.length;
  return o === 2 ? q(t) && !P(t) ? it(t) ? fe(e, null, [t]) : fe(e, t) : fe(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && it(n) && (n = [n]), fe(e, t, n));
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function _o(e) {
  return !!(e && e.__v_isShallow);
}
function pu() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, o = { style: "color:#9d288c" }, s = {
    header(d) {
      return q(d) ? d.__isVue ? ["div", e, "VueInstance"] : ie(d) ? [
        "div",
        {},
        ["span", e, p(d)],
        "<",
        c(d.value),
        ">"
      ] : Ot(d) ? [
        "div",
        {},
        ["span", e, _o(d) ? "ShallowReactive" : "Reactive"],
        "<",
        c(d),
        `>${rt(d) ? " (readonly)" : ""}`
      ] : rt(d) ? [
        "div",
        {},
        ["span", e, _o(d) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(d),
        ">"
      ] : null : null;
    },
    hasBody(d) {
      return d && d.__isVue;
    },
    body(d) {
      if (d && d.__isVue)
        return [
          "div",
          {},
          ...r(d.$)
        ];
    }
  };
  function r(d) {
    const _ = [];
    d.type.props && d.props && _.push(i("props", M(d.props))), d.setupState !== W && _.push(i("setup", d.setupState)), d.data !== W && _.push(i("data", M(d.data)));
    const D = u(d, "computed");
    D && _.push(i("computed", D));
    const y = u(d, "inject");
    return y && _.push(i("injected", y)), _.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: d }]
    ]), _;
  }
  function i(d, _) {
    return _ = ne({}, _), Object.keys(_).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        d
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(_).map((D) => [
          "div",
          {},
          ["span", o, D + ": "],
          c(_[D], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(d, _ = !0) {
    return typeof d == "number" ? ["span", t, d] : typeof d == "string" ? ["span", n, JSON.stringify(d)] : typeof d == "boolean" ? ["span", o, d] : q(d) ? ["object", { object: _ ? M(d) : d }] : ["span", n, String(d)];
  }
  function u(d, _) {
    const D = d.type;
    if (S(D))
      return;
    const y = {};
    for (const V in d.ctx)
      a(D, V, _) && (y[V] = d.ctx[V]);
    return y;
  }
  function a(d, _, D) {
    const y = d[D];
    if (P(y) && y.includes(_) || q(y) && _ in y || d.extends && a(d.extends, _, D) || d.mixins && d.mixins.some((V) => a(V, _, D)))
      return !0;
  }
  function p(d) {
    return _o(d) ? "ShallowRef" : d.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const Bs = "3.2.39", hu = "http://www.w3.org/2000/svg", gt = typeof document < "u" ? document : null, Hs = gt && /* @__PURE__ */ gt.createElement("template"), _u = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t ? gt.createElementNS(hu, e) : gt.createElement(e, n ? { is: n } : void 0);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => gt.createTextNode(e),
  createComment: (e) => gt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => gt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  cloneNode(e) {
    const t = e.cloneNode(!0);
    return "_value" in e && (t._value = e._value), t;
  },
  insertStaticContent(e, t, n, o, s, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (s && (s === r || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)); )
        ;
    else {
      Hs.innerHTML = o ? `<svg>${e}</svg>` : e;
      const c = Hs.content;
      if (o) {
        const u = c.firstChild;
        for (; u.firstChild; )
          c.appendChild(u.firstChild);
        c.removeChild(u);
      }
      t.insertBefore(c, n);
    }
    return [
      i ? i.nextSibling : t.firstChild,
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function mu(e, t, n) {
  const o = e._vtc;
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function gu(e, t, n) {
  const o = e.style, s = te(n);
  if (n && !s) {
    for (const r in n)
      Lo(o, r, n[r]);
    if (t && !te(t))
      for (const r in t)
        n[r] == null && Lo(o, r, "");
  } else {
    const r = o.display;
    s ? t !== n && (o.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (o.display = r);
  }
}
const ks = /\s*!important$/;
function Lo(e, t, n) {
  if (P(n))
    n.forEach((o) => Lo(e, t, o));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Eu(e, t);
    ks.test(n) ? e.setProperty(ot(o), n.replace(ks, ""), "important") : e[o] = n;
  }
}
const zs = ["Webkit", "Moz", "ms"], mo = {};
function Eu(e, t) {
  const n = mo[t];
  if (n)
    return n;
  let o = Re(t);
  if (o !== "filter" && o in e)
    return mo[t] = o;
  o = xt(o);
  for (let s = 0; s < zs.length; s++) {
    const r = zs[s] + o;
    if (r in e)
      return mo[t] = r;
  }
  return t;
}
const Ks = "http://www.w3.org/1999/xlink";
function vu(e, t, n, o, s) {
  if (o && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Ks, t.slice(6, t.length)) : e.setAttributeNS(Ks, t, n);
  else {
    const r = Wi(t);
    n == null || r && !fr(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function Nu(e, t, n, o, s, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    o && i(o, s, r), e[t] = n == null ? "" : n;
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const u = n == null ? "" : n;
    (e.value !== u || e.tagName === "OPTION") && (e.value = u), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = fr(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch (u) {
    process.env.NODE_ENV !== "production" && O(`Failed setting prop "${t}" on <${e.tagName.toLowerCase()}>: value ${n} is invalid.`, u);
  }
  c && e.removeAttribute(t);
}
const [xi, Ou] = /* @__PURE__ */ (() => {
  let e = Date.now, t = !1;
  if (typeof window < "u") {
    Date.now() > document.createEvent("Event").timeStamp && (e = performance.now.bind(performance));
    const n = navigator.userAgent.match(/firefox\/(\d+)/i);
    t = !!(n && Number(n[1]) <= 53);
  }
  return [e, t];
})();
let jo = 0;
const yu = /* @__PURE__ */ Promise.resolve(), bu = () => {
  jo = 0;
}, wu = () => jo || (yu.then(bu), jo = xi());
function Du(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Vu(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
function xu(e, t, n, o, s = null) {
  const r = e._vei || (e._vei = {}), i = r[t];
  if (o && i)
    i.value = o;
  else {
    const [c, u] = Cu(t);
    if (o) {
      const a = r[t] = Tu(o, s);
      Du(e, c, a, u);
    } else
      i && (Vu(e, c, i, u), r[t] = void 0);
  }
}
const Ws = /(?:Once|Passive|Capture)$/;
function Cu(e) {
  let t;
  if (Ws.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Ws); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ot(e.slice(2)), t];
}
function Tu(e, t) {
  const n = (o) => {
    const s = o.timeStamp || xi();
    (Ou || s >= n.attached - 1) && Ve($u(o, n.value), t, 5, [o]);
  };
  return n.value = e, n.attached = wu(), n;
}
function $u(e, t) {
  if (P(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((o) => (s) => !s._stopped && o && o(s));
  } else
    return t;
}
const qs = /^on[a-z]/, Iu = (e, t, n, o, s = !1, r, i, c, u) => {
  t === "class" ? mu(e, o, s) : t === "style" ? gu(e, n, o) : un(t) ? In(t) || xu(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Pu(e, t, o, s)) ? Nu(e, t, o, r, i, c, u) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), vu(e, t, o, s));
};
function Pu(e, t, n, o) {
  return o ? !!(t === "innerHTML" || t === "textContent" || t in e && qs.test(t) && S(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || qs.test(t) && te(n) ? !1 : t in e;
}
const Qe = "transition", qt = "animation", io = (e, { slots: t }) => du(ei, Su(e), t);
io.displayName = "Transition";
const Ci = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
io.props = /* @__PURE__ */ ne({}, ei.props, Ci);
const ut = (e, t = []) => {
  P(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Js = (e) => e ? P(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Su(e) {
  const t = {};
  for (const x in e)
    x in Ci || (t[x] = e[x]);
  if (e.css === !1)
    return t;
  const { name: n = "v", type: o, duration: s, enterFromClass: r = `${n}-enter-from`, enterActiveClass: i = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: u = r, appearActiveClass: a = i, appearToClass: p = c, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: _ = `${n}-leave-active`, leaveToClass: D = `${n}-leave-to` } = e, y = Au(s), V = y && y[0], $ = y && y[1], { onBeforeEnter: B, onEnter: F, onEnterCancelled: J, onLeave: R, onLeaveCancelled: Y, onBeforeAppear: ye = B, onAppear: be = F, onAppearCancelled: j = J } = t, Z = (x, ee, we) => {
    ft(x, ee ? p : c), ft(x, ee ? a : i), we && we();
  }, K = (x, ee) => {
    x._isLeaving = !1, ft(x, d), ft(x, D), ft(x, _), ee && ee();
  }, ue = (x) => (ee, we) => {
    const Ie = x ? be : F, se = () => Z(ee, x, we);
    ut(Ie, [ee, se]), Ys(() => {
      ft(ee, x ? u : r), Ze(ee, x ? p : c), Js(Ie) || Qs(ee, o, V, se);
    });
  };
  return ne(t, {
    onBeforeEnter(x) {
      ut(B, [x]), Ze(x, r), Ze(x, i);
    },
    onBeforeAppear(x) {
      ut(ye, [x]), Ze(x, u), Ze(x, a);
    },
    onEnter: ue(!1),
    onAppear: ue(!0),
    onLeave(x, ee) {
      x._isLeaving = !0;
      const we = () => K(x, ee);
      Ze(x, d), Lu(), Ze(x, _), Ys(() => {
        !x._isLeaving || (ft(x, d), Ze(x, D), Js(R) || Qs(x, o, $, we));
      }), ut(R, [x, we]);
    },
    onEnterCancelled(x) {
      Z(x, !1), ut(J, [x]);
    },
    onAppearCancelled(x) {
      Z(x, !0), ut(j, [x]);
    },
    onLeaveCancelled(x) {
      K(x), ut(Y, [x]);
    }
  });
}
function Au(e) {
  if (e == null)
    return null;
  if (q(e))
    return [go(e.enter), go(e.leave)];
  {
    const t = go(e);
    return [t, t];
  }
}
function go(e) {
  const t = gr(e);
  return process.env.NODE_ENV !== "production" && Mu(t), t;
}
function Mu(e) {
  typeof e != "number" ? O(`<transition> explicit duration is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && O("<transition> explicit duration is NaN - the duration expression might be incorrect.");
}
function Ze(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function ft(e, t) {
  t.split(/\s+/).forEach((o) => o && e.classList.remove(o));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Ys(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Fu = 0;
function Qs(e, t, n, o) {
  const s = e._endId = ++Fu, r = () => {
    s === e._endId && o();
  };
  if (n)
    return setTimeout(r, n);
  const { type: i, timeout: c, propCount: u } = Ru(e, t);
  if (!i)
    return o();
  const a = i + "end";
  let p = 0;
  const d = () => {
    e.removeEventListener(a, _), r();
  }, _ = (D) => {
    D.target === e && ++p >= u && d();
  };
  setTimeout(() => {
    p < u && d();
  }, c + 1), e.addEventListener(a, _);
}
function Ru(e, t) {
  const n = window.getComputedStyle(e), o = (y) => (n[y] || "").split(", "), s = o(Qe + "Delay"), r = o(Qe + "Duration"), i = Zs(s, r), c = o(qt + "Delay"), u = o(qt + "Duration"), a = Zs(c, u);
  let p = null, d = 0, _ = 0;
  t === Qe ? i > 0 && (p = Qe, d = i, _ = r.length) : t === qt ? a > 0 && (p = qt, d = a, _ = u.length) : (d = Math.max(i, a), p = d > 0 ? i > a ? Qe : qt : null, _ = p ? p === Qe ? r.length : u.length : 0);
  const D = p === Qe && /\b(transform|all)(,|$)/.test(n[Qe + "Property"]);
  return {
    type: p,
    timeout: d,
    propCount: _,
    hasTransform: D
  };
}
function Zs(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, o) => Xs(n) + Xs(e[o])));
}
function Xs(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Lu() {
  return document.body.offsetHeight;
}
const ju = ["ctrl", "shift", "alt", "meta"], Uu = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => ju.some((n) => e[`${n}Key`] && !t.includes(n))
}, Bu = (e, t) => (n, ...o) => {
  for (let s = 0; s < t.length; s++) {
    const r = Uu[t[s]];
    if (r && r(n, t))
      return;
  }
  return e(n, ...o);
}, Ti = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Jt(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: o }) {
    !t != !n && (o ? t ? (o.beforeEnter(e), Jt(e, !0), o.enter(e)) : o.leave(e, () => {
      Jt(e, !1);
    }) : Jt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Jt(e, t);
  }
};
function Jt(e, t) {
  e.style.display = t ? e._vod : "none";
}
const Hu = /* @__PURE__ */ ne({ patchProp: Iu }, _u);
let Gs;
function ku() {
  return Gs || (Gs = Jc(Hu));
}
const er = (...e) => {
  ku().render(...e);
};
function zu() {
  pu();
}
process.env.NODE_ENV !== "production" && zu();
function Ku(e) {
  for (var t = -1, n = e == null ? 0 : e.length, o = {}; ++t < n; ) {
    var s = e[t];
    o[s[0]] = s[1];
  }
  return o;
}
var tr;
const dn = typeof window < "u", Un = (e) => typeof e == "number", Wu = (e) => typeof e == "string", Eo = () => {
};
dn && ((tr = window == null ? void 0 : window.navigator) == null ? void 0 : tr.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function $i(e) {
  return typeof e == "function" ? e() : z(e);
}
function qu(e) {
  return e;
}
function ls(e) {
  return ol() ? (sl(e), !0) : !1;
}
function Ju(e, t = !0) {
  oo() ? Gn(e) : t ? e() : jr(e);
}
function Yu(e, t, n = {}) {
  const {
    immediate: o = !0
  } = n, s = yt(!1);
  let r = null;
  function i() {
    r && (clearTimeout(r), r = null);
  }
  function c() {
    s.value = !1, i();
  }
  function u(...a) {
    i(), s.value = !0, r = setTimeout(() => {
      s.value = !1, r = null, e(...a);
    }, $i(t));
  }
  return o && (s.value = !0, dn && u()), ls(c), {
    isPending: s,
    start: u,
    stop: c
  };
}
function Ii(e) {
  var t;
  const n = $i(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Pi = dn ? window : void 0;
function Qu(...e) {
  let t, n, o, s;
  if (Wu(e[0]) ? ([n, o, s] = e, t = Pi) : [t, n, o, s] = e, !t)
    return Eo;
  let r = Eo;
  const i = Dt(() => Ii(t), (u) => {
    r(), u && (u.addEventListener(n, o, s), r = () => {
      u.removeEventListener(n, o, s), r = Eo;
    });
  }, { immediate: !0, flush: "post" }), c = () => {
    i(), r();
  };
  return ls(c), c;
}
function Zu(e, t = !1) {
  const n = yt(), o = () => n.value = Boolean(e());
  return o(), Ju(o, t), n;
}
const Uo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Bo = "__vueuse_ssr_handlers__";
Uo[Bo] = Uo[Bo] || {};
Uo[Bo];
var nr = Object.getOwnPropertySymbols, Xu = Object.prototype.hasOwnProperty, Gu = Object.prototype.propertyIsEnumerable, ef = (e, t) => {
  var n = {};
  for (var o in e)
    Xu.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && nr)
    for (var o of nr(e))
      t.indexOf(o) < 0 && Gu.call(e, o) && (n[o] = e[o]);
  return n;
};
function tf(e, t, n = {}) {
  const o = n, { window: s = Pi } = o, r = ef(o, ["window"]);
  let i;
  const c = Zu(() => s && "ResizeObserver" in s), u = () => {
    i && (i.disconnect(), i = void 0);
  }, a = Dt(() => Ii(e), (d) => {
    u(), c.value && s && d && (i = new ResizeObserver(t), i.observe(d, r));
  }, { immediate: !0, flush: "post" }), p = () => {
    u(), a();
  };
  return ls(p), {
    isSupported: c,
    stop: p
  };
}
var or;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(or || (or = {}));
var nf = Object.defineProperty, sr = Object.getOwnPropertySymbols, of = Object.prototype.hasOwnProperty, sf = Object.prototype.propertyIsEnumerable, rr = (e, t, n) => t in e ? nf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, rf = (e, t) => {
  for (var n in t || (t = {}))
    of.call(t, n) && rr(e, n, t[n]);
  if (sr)
    for (var n of sr(t))
      sf.call(t, n) && rr(e, n, t[n]);
  return e;
};
const lf = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
rf({
  linear: qu
}, lf);
const cf = (e) => e === void 0, uf = (e) => typeof Element > "u" ? !1 : e instanceof Element, ir = (e) => Object.keys(e);
class ff extends Error {
  constructor(t) {
    super(t), this.name = "ElementPlusError";
  }
}
function cs(e, t) {
  if (process.env.NODE_ENV !== "production") {
    const n = te(e) ? new ff(`[${e}] ${t}`) : e;
    console.warn(n);
  }
}
const af = "utils/dom/style";
function df(e, t = "px") {
  if (!e)
    return "";
  if (te(e))
    return e;
  if (Un(e))
    return `${e}${t}`;
  cs(af, "binding value must be a string or number");
}
/*! Element Plus Icons Vue v2.0.10 */
var pn = (e, t) => {
  let n = e.__vccOpts || e;
  for (let [o, s] of t)
    n[o] = s;
  return n;
}, pf = {
  name: "CircleCloseFilled"
}, hf = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _f = /* @__PURE__ */ Le("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
}, null, -1), mf = [
  _f
];
function gf(e, t, n, o, s, r) {
  return ae(), We("svg", hf, mf);
}
var Si = /* @__PURE__ */ pn(pf, [["render", gf], ["__file", "circle-close-filled.vue"]]), Ef = {
  name: "Close"
}, vf = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Nf = /* @__PURE__ */ Le("path", {
  fill: "currentColor",
  d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
}, null, -1), Of = [
  Nf
];
function yf(e, t, n, o, s, r) {
  return ae(), We("svg", vf, Of);
}
var bf = /* @__PURE__ */ pn(Ef, [["render", yf], ["__file", "close.vue"]]), wf = {
  name: "InfoFilled"
}, Df = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Vf = /* @__PURE__ */ Le("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
}, null, -1), xf = [
  Vf
];
function Cf(e, t, n, o, s, r) {
  return ae(), We("svg", Df, xf);
}
var Ai = /* @__PURE__ */ pn(wf, [["render", Cf], ["__file", "info-filled.vue"]]), Tf = {
  name: "SuccessFilled"
}, $f = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, If = /* @__PURE__ */ Le("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
}, null, -1), Pf = [
  If
];
function Sf(e, t, n, o, s, r) {
  return ae(), We("svg", $f, Pf);
}
var Mi = /* @__PURE__ */ pn(Tf, [["render", Sf], ["__file", "success-filled.vue"]]), Af = {
  name: "WarningFilled"
}, Mf = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Ff = /* @__PURE__ */ Le("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
}, null, -1), Rf = [
  Ff
];
function Lf(e, t, n, o, s, r) {
  return ae(), We("svg", Mf, Rf);
}
var Fi = /* @__PURE__ */ pn(Af, [["render", Lf], ["__file", "warning-filled.vue"]]);
const Ri = "__epPropKey", tt = (e) => e, jf = (e) => q(e) && !!e[Ri], Li = (e, t) => {
  if (!q(e) || jf(e))
    return e;
  const { values: n, required: o, default: s, type: r, validator: i } = e, u = {
    type: r,
    required: !!o,
    validator: n || i ? (a) => {
      let p = !1, d = [];
      if (n && (d = Array.from(n), L(e, "default") && d.push(s), p || (p = d.includes(a))), i && (p || (p = i(a))), !p && d.length > 0) {
        const _ = [...new Set(d)].map((D) => JSON.stringify(D)).join(", ");
        O(`Invalid prop: validation failed${t ? ` for prop "${t}"` : ""}. Expected one of [${_}], got value ${JSON.stringify(a)}.`);
      }
      return p;
    } : void 0,
    [Ri]: !0
  };
  return L(e, "default") && (u.default = s), u;
}, lo = (e) => Ku(Object.entries(e).map(([t, n]) => [
  t,
  Li(n, t)
])), Uf = tt([
  String,
  Object,
  Function
]), Bf = {
  Close: bf,
  SuccessFilled: Mi,
  InfoFilled: Ai,
  WarningFilled: Fi,
  CircleCloseFilled: Si
}, lr = {
  success: Mi,
  warning: Fi,
  error: Si,
  info: Ai
}, ji = (e, t) => {
  if (e.install = (n) => {
    for (const o of [e, ...Object.values(t != null ? t : {})])
      n.component(o.name, o);
  }, t)
    for (const [n, o] of Object.entries(t))
      e[n] = o;
  return e;
}, Hf = (e, t) => (e.install = (n) => {
  e._context = n._context, n.config.globalProperties[t] = e;
}, e), kf = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
}, zf = ["", "default", "small", "large"], Kf = (e) => e, Ui = Symbol(), Bn = yt();
function us(e, t = void 0) {
  const n = oo() ? xn(Ui, Bn) : Bn;
  return e ? Oe(() => {
    var o, s;
    return (s = (o = n.value) == null ? void 0 : o[e]) != null ? s : t;
  }) : n;
}
const Wf = (e, t, n = !1) => {
  var o;
  const s = !!oo(), r = s ? us() : void 0, i = (o = t == null ? void 0 : t.provide) != null ? o : s ? Zr : void 0;
  if (!i) {
    cs("provideGlobalConfig", "provideGlobalConfig() can only be used inside setup().");
    return;
  }
  const c = Oe(() => {
    const u = z(e);
    return r != null && r.value ? qf(r.value, u) : u;
  });
  return i(Ui, c), (n || !Bn.value) && (Bn.value = c.value), c;
}, qf = (e, t) => {
  var n;
  const o = [.../* @__PURE__ */ new Set([...ir(e), ...ir(t)])], s = {};
  for (const r of o)
    s[r] = (n = t[r]) != null ? n : e[r];
  return s;
}, Jf = Li({
  type: String,
  values: zf,
  required: !1
}), Yf = "el", Qf = "is-", at = (e, t, n, o, s) => {
  let r = `${e}-${t}`;
  return n && (r += `-${n}`), o && (r += `__${o}`), s && (r += `--${s}`), r;
}, fs = (e) => {
  const t = us("namespace", Yf);
  return {
    namespace: t,
    b: (y = "") => at(t.value, e, y, "", ""),
    e: (y) => y ? at(t.value, e, "", y, "") : "",
    m: (y) => y ? at(t.value, e, "", "", y) : "",
    be: (y, V) => y && V ? at(t.value, e, y, V, "") : "",
    em: (y, V) => y && V ? at(t.value, e, "", y, V) : "",
    bm: (y, V) => y && V ? at(t.value, e, y, "", V) : "",
    bem: (y, V, $) => y && V && $ ? at(t.value, e, y, V, $) : "",
    is: (y, ...V) => {
      const $ = V.length >= 1 ? V[0] : !0;
      return y && $ ? `${Qf}${y}` : "";
    },
    cssVar: (y) => {
      const V = {};
      for (const $ in y)
        y[$] && (V[`--${t.value}-${$}`] = y[$]);
      return V;
    },
    cssVarName: (y) => `--${t.value}-${y}`,
    cssVarBlock: (y) => {
      const V = {};
      for (const $ in y)
        y[$] && (V[`--${t.value}-${e}-${$}`] = y[$]);
      return V;
    },
    cssVarBlockName: (y) => `--${t.value}-${e}-${y}`
  };
}, cr = yt(0), Zf = () => {
  const e = us("zIndex", 2e3), t = Oe(() => e.value + cr.value);
  return {
    initialZIndex: e,
    currentZIndex: t,
    nextZIndex: () => (cr.value++, t.value)
  };
};
var as = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
};
const Xf = lo({
  size: {
    type: tt([Number, String])
  },
  color: {
    type: String
  }
}), Gf = It({
  name: "ElIcon",
  inheritAttrs: !1
}), ea = /* @__PURE__ */ It({
  ...Gf,
  props: Xf,
  setup(e) {
    const t = e, n = fs("icon"), o = Oe(() => {
      const { size: s, color: r } = t;
      return !s && !r ? {} : {
        fontSize: cf(s) ? void 0 : df(s),
        "--color": r
      };
    });
    return (s, r) => (ae(), We("i", bi({
      class: z(n).b(),
      style: z(o)
    }, s.$attrs), [
      eo(s.$slots, "default")
    ], 16));
  }
});
var ta = /* @__PURE__ */ as(ea, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const ur = ji(ta), na = lo({
  value: {
    type: [String, Number],
    default: ""
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: Boolean,
  hidden: Boolean,
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger"],
    default: "danger"
  }
}), oa = ["textContent"], sa = It({
  name: "ElBadge"
}), ra = /* @__PURE__ */ It({
  ...sa,
  props: na,
  setup(e, { expose: t }) {
    const n = e, o = fs("badge"), s = Oe(() => n.isDot ? "" : Un(n.value) && Un(n.max) ? n.max < n.value ? `${n.max}+` : `${n.value}` : `${n.value}`);
    return t({
      content: s
    }), (r, i) => (ae(), We("div", {
      class: Ce(z(o).b())
    }, [
      eo(r.$slots, "default"),
      fe(io, {
        name: `${z(o).namespace.value}-zoom-in-center`,
        persisted: ""
      }, {
        default: Xt(() => [
          li(Le("sup", {
            class: Ce([
              z(o).e("content"),
              z(o).em("content", r.type),
              z(o).is("fixed", !!r.$slots.default),
              z(o).is("dot", r.isDot)
            ]),
            textContent: ar(z(s))
          }, null, 10, oa), [
            [Ti, !r.hidden && (z(s) || r.isDot)]
          ])
        ]),
        _: 1
      }, 8, ["name"])
    ], 2));
  }
});
var ia = /* @__PURE__ */ as(ra, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue"]]);
const la = ji(ia), Ho = {}, ca = lo({
  a11y: {
    type: Boolean,
    default: !0
  },
  locale: {
    type: tt(Object)
  },
  size: Jf,
  button: {
    type: tt(Object)
  },
  experimentalFeatures: {
    type: tt(Object)
  },
  keyboardNavigation: {
    type: Boolean,
    default: !0
  },
  message: {
    type: tt(Object)
  },
  zIndex: Number,
  namespace: {
    type: String,
    default: "el"
  }
});
It({
  name: "ElConfigProvider",
  props: ca,
  setup(e, { slots: t }) {
    Dt(() => e.message, (o) => {
      Object.assign(Ho, o != null ? o : {});
    }, { immediate: !0, deep: !0 });
    const n = Wf(e);
    return () => eo(t, "default", { config: n == null ? void 0 : n.value });
  }
});
const Bi = ["success", "info", "warning", "error"], me = Kf({
  customClass: "",
  center: !1,
  dangerouslyUseHTMLString: !1,
  duration: 3e3,
  icon: void 0,
  id: "",
  message: "",
  onClose: void 0,
  showClose: !1,
  type: "info",
  offset: 16,
  zIndex: 0,
  grouping: !1,
  repeatNum: 1,
  appendTo: dn ? document.body : void 0
}), ua = lo({
  customClass: {
    type: String,
    default: me.customClass
  },
  center: {
    type: Boolean,
    default: me.center
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: me.dangerouslyUseHTMLString
  },
  duration: {
    type: Number,
    default: me.duration
  },
  icon: {
    type: Uf,
    default: me.icon
  },
  id: {
    type: String,
    default: me.id
  },
  message: {
    type: tt([
      String,
      Object,
      Function
    ]),
    default: me.message
  },
  onClose: {
    type: tt(Function),
    required: !1
  },
  showClose: {
    type: Boolean,
    default: me.showClose
  },
  type: {
    type: String,
    values: Bi,
    default: me.type
  },
  offset: {
    type: Number,
    default: me.offset
  },
  zIndex: {
    type: Number,
    default: me.zIndex
  },
  grouping: {
    type: Boolean,
    default: me.grouping
  },
  repeatNum: {
    type: Number,
    default: me.repeatNum
  }
}), fa = {
  destroy: () => !0
}, Fe = $r([]), aa = (e) => {
  const t = Fe.findIndex((s) => s.id === e), n = Fe[t];
  let o;
  return t > 0 && (o = Fe[t - 1]), { current: n, prev: o };
}, da = (e) => {
  const { prev: t } = aa(e);
  return t ? t.vm.exposed.bottom.value : 0;
}, pa = ["id"], ha = ["innerHTML"], _a = It({
  name: "ElMessage"
}), ma = /* @__PURE__ */ It({
  ..._a,
  props: ua,
  emits: fa,
  setup(e, { expose: t }) {
    const n = e, { Close: o } = Bf, s = fs("message"), r = yt(), i = yt(!1), c = yt(0);
    let u;
    const a = Oe(() => n.type ? n.type === "error" ? "danger" : n.type : "info"), p = Oe(() => {
      const R = n.type;
      return { [s.bm("icon", R)]: R && lr[R] };
    }), d = Oe(() => n.icon || lr[n.type] || ""), _ = Oe(() => da(n.id)), D = Oe(() => n.offset + _.value), y = Oe(() => c.value + D.value), V = Oe(() => ({
      top: `${D.value}px`,
      zIndex: n.zIndex
    }));
    function $() {
      n.duration !== 0 && ({ stop: u } = Yu(() => {
        F();
      }, n.duration));
    }
    function B() {
      u == null || u();
    }
    function F() {
      i.value = !1;
    }
    function J({ code: R }) {
      R === kf.esc && F();
    }
    return Gn(() => {
      $(), i.value = !0;
    }), Dt(() => n.repeatNum, () => {
      B(), $();
    }), Qu(document, "keydown", J), tf(r, () => {
      c.value = r.value.getBoundingClientRect().height;
    }), t({
      visible: i,
      bottom: y,
      close: F
    }), (R, Y) => (ae(), _t(io, {
      name: z(s).b("fade"),
      onBeforeLeave: R.onClose,
      onAfterLeave: Y[0] || (Y[0] = (ye) => R.$emit("destroy")),
      persisted: ""
    }, {
      default: Xt(() => [
        li(Le("div", {
          id: R.id,
          ref_key: "messageRef",
          ref: r,
          class: Ce([
            z(s).b(),
            { [z(s).m(R.type)]: R.type && !R.icon },
            z(s).is("center", R.center),
            z(s).is("closable", R.showClose),
            R.customClass
          ]),
          style: Hn(z(V)),
          role: "alert",
          onMouseenter: B,
          onMouseleave: $
        }, [
          R.repeatNum > 1 ? (ae(), _t(z(la), {
            key: 0,
            value: R.repeatNum,
            type: z(a),
            class: Ce(z(s).e("badge"))
          }, null, 8, ["value", "type", "class"])) : bn("v-if", !0),
          z(d) ? (ae(), _t(z(ur), {
            key: 1,
            class: Ce([z(s).e("icon"), z(p)])
          }, {
            default: Xt(() => [
              (ae(), _t(bc(z(d))))
            ]),
            _: 1
          }, 8, ["class"])) : bn("v-if", !0),
          eo(R.$slots, "default", {}, () => [
            R.dangerouslyUseHTMLString ? (ae(), We(Ee, { key: 1 }, [
              bn(" Caution here, message could've been compromised, never use user's input as message "),
              Le("p", {
                class: Ce(z(s).e("content")),
                innerHTML: R.message
              }, null, 10, ha)
            ], 2112)) : (ae(), We("p", {
              key: 0,
              class: Ce(z(s).e("content"))
            }, ar(R.message), 3))
          ]),
          R.showClose ? (ae(), _t(z(ur), {
            key: 2,
            class: Ce(z(s).e("closeBtn")),
            onClick: Bu(F, ["stop"])
          }, {
            default: Xt(() => [
              fe(z(o))
            ]),
            _: 1
          }, 8, ["class", "onClick"])) : bn("v-if", !0)
        ], 46, pa), [
          [Ti, i.value]
        ])
      ]),
      _: 3
    }, 8, ["name", "onBeforeLeave"]));
  }
});
var ga = /* @__PURE__ */ as(ma, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue"]]);
let Ea = 1;
const Hi = (e) => {
  const t = !e || te(e) || it(e) || S(e) ? { message: e } : e, n = {
    ...me,
    ...t
  };
  if (!n.appendTo)
    n.appendTo = document.body;
  else if (te(n.appendTo)) {
    let o = document.querySelector(n.appendTo);
    uf(o) || (cs("ElMessage", "the appendTo option is not an HTMLElement. Falling back to document.body."), o = document.body), n.appendTo = o;
  }
  return n;
}, va = (e) => {
  const t = Fe.indexOf(e);
  if (t === -1)
    return;
  Fe.splice(t, 1);
  const { handler: n } = e;
  n.close();
}, Na = ({ appendTo: e, ...t }, n) => {
  const { nextZIndex: o } = Zf(), s = `message_${Ea++}`, r = t.onClose, i = document.createElement("div"), c = {
    ...t,
    zIndex: o() + t.zIndex,
    id: s,
    onClose: () => {
      r == null || r(), va(d);
    },
    onDestroy: () => {
      er(null, i);
    }
  }, u = fe(ga, c, S(c.message) || it(c.message) ? {
    default: S(c.message) ? c.message : () => c.message
  } : null);
  u.appContext = n || Bt._context, er(u, i), e.appendChild(i.firstElementChild);
  const a = u.component, d = {
    id: s,
    vnode: u,
    vm: a,
    handler: {
      close: () => {
        a.exposed.visible.value = !1;
      }
    },
    props: u.component.props
  };
  return d;
}, Bt = (e = {}, t) => {
  if (!dn)
    return { close: () => {
    } };
  if (Un(Ho.max) && Fe.length >= Ho.max)
    return { close: () => {
    } };
  const n = Hi(e);
  if (n.grouping && Fe.length) {
    const s = Fe.find(({ vnode: r }) => {
      var i;
      return ((i = r.props) == null ? void 0 : i.message) === n.message;
    });
    if (s)
      return s.props.repeatNum += 1, s.props.type = n.type, s.handler;
  }
  const o = Na(n, t);
  return Fe.push(o), o.handler;
};
Bi.forEach((e) => {
  Bt[e] = (t = {}, n) => {
    const o = Hi(t);
    return Bt({ ...o, type: e }, n);
  };
});
function Oa(e) {
  for (const t of Fe)
    (!e || e === t.props.type) && t.handler.close();
}
Bt.closeAll = Oa;
Bt._context = null;
const ya = Hf(Bt, "$message");
export {
  ya as E
};
