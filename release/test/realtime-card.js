(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorate = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
      if (decorator = decorators[i4])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var t = window;
  var e = t.ShadowRoot && (t.ShadyCSS === void 0 || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = new WeakMap();
  var o = class {
    constructor(t3, e7, n7) {
      if (this._$cssResult$ = true, n7 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3, this.t = e7;
    }
    get styleSheet() {
      let t3 = this.o;
      const s5 = this.t;
      if (e && t3 === void 0) {
        const e7 = s5 !== void 0 && s5.length === 1;
        e7 && (t3 = n.get(s5)), t3 === void 0 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e7 && n.set(s5, t3));
      }
      return t3;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t3) => new o(typeof t3 == "string" ? t3 : t3 + "", void 0, s);
  var i = (t3, ...e7) => {
    const n7 = t3.length === 1 ? t3[0] : e7.reduce((e8, s5, n8) => e8 + ((t4) => {
      if (t4._$cssResult$ === true)
        return t4.cssText;
      if (typeof t4 == "number")
        return t4;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s5) + t3[n8 + 1], t3[0]);
    return new o(n7, t3, s);
  };
  var S = (s5, n7) => {
    e ? s5.adoptedStyleSheets = n7.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n7.forEach((e7) => {
      const n8 = document.createElement("style"), o6 = t.litNonce;
      o6 !== void 0 && n8.setAttribute("nonce", o6), n8.textContent = e7.cssText, s5.appendChild(n8);
    });
  };
  var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e7 = "";
    for (const s5 of t4.cssRules)
      e7 += s5.cssText;
    return r(e7);
  })(t3) : t3;

  // node_modules/@lit/reactive-element/reactive-element.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = {toAttribute(t3, i4) {
    switch (i4) {
      case Boolean:
        t3 = t3 ? h : null;
        break;
      case Object:
      case Array:
        t3 = t3 == null ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, i4) {
    let s5 = t3;
    switch (i4) {
      case Boolean:
        s5 = t3 !== null;
        break;
      case Number:
        s5 = t3 === null ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t3);
        } catch (t4) {
          s5 = null;
        }
    }
    return s5;
  }};
  var a = (t3, i4) => i4 !== t3 && (i4 == i4 || t3 == t3);
  var l = {attribute: true, type: String, converter: n2, reflect: false, hasChanged: a};
  var d = "finalized";
  var u = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t3) {
      var i4;
      this.finalize(), ((i4 = this.h) !== null && i4 !== void 0 ? i4 : this.h = []).push(t3);
    }
    static get observedAttributes() {
      this.finalize();
      const t3 = [];
      return this.elementProperties.forEach((i4, s5) => {
        const e7 = this._$Ep(s5, i4);
        e7 !== void 0 && (this._$Ev.set(e7, s5), t3.push(e7));
      }), t3;
    }
    static createProperty(t3, i4 = l) {
      if (i4.state && (i4.attribute = false), this.finalize(), this.elementProperties.set(t3, i4), !i4.noAccessor && !this.prototype.hasOwnProperty(t3)) {
        const s5 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e7 = this.getPropertyDescriptor(t3, s5, i4);
        e7 !== void 0 && Object.defineProperty(this.prototype, t3, e7);
      }
    }
    static getPropertyDescriptor(t3, i4, s5) {
      return {get() {
        return this[i4];
      }, set(e7) {
        const r4 = this[t3];
        this[i4] = e7, this.requestUpdate(t3, r4, s5);
      }, configurable: true, enumerable: true};
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) || l;
    }
    static finalize() {
      if (this.hasOwnProperty(d))
        return false;
      this[d] = true;
      const t3 = Object.getPrototypeOf(this);
      if (t3.finalize(), t3.h !== void 0 && (this.h = [...t3.h]), this.elementProperties = new Map(t3.elementProperties), this._$Ev = new Map(), this.hasOwnProperty("properties")) {
        const t4 = this.properties, i4 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
        for (const s5 of i4)
          this.createProperty(s5, t4[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i4) {
      const s5 = [];
      if (Array.isArray(i4)) {
        const e7 = new Set(i4.flat(1 / 0).reverse());
        for (const i5 of e7)
          s5.unshift(c(i5));
      } else
        i4 !== void 0 && s5.push(c(i4));
      return s5;
    }
    static _$Ep(t3, i4) {
      const s5 = i4.attribute;
      return s5 === false ? void 0 : typeof s5 == "string" ? s5 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
    }
    u() {
      var t3;
      this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = new Map(), this._$Eg(), this.requestUpdate(), (t3 = this.constructor.h) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
    }
    addController(t3) {
      var i4, s5;
      ((i4 = this._$ES) !== null && i4 !== void 0 ? i4 : this._$ES = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s5 = t3.hostConnected) === null || s5 === void 0 || s5.call(t3));
    }
    removeController(t3) {
      var i4;
      (i4 = this._$ES) === null || i4 === void 0 || i4.splice(this._$ES.indexOf(t3) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t3, i4) => {
        this.hasOwnProperty(i4) && (this._$Ei.set(i4, this[i4]), delete this[i4]);
      });
    }
    createRenderRoot() {
      var t3;
      const s5 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t3;
      this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this._$ES) === null || t3 === void 0 || t3.forEach((t4) => {
        var i4;
        return (i4 = t4.hostConnected) === null || i4 === void 0 ? void 0 : i4.call(t4);
      });
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      var t3;
      (t3 = this._$ES) === null || t3 === void 0 || t3.forEach((t4) => {
        var i4;
        return (i4 = t4.hostDisconnected) === null || i4 === void 0 ? void 0 : i4.call(t4);
      });
    }
    attributeChangedCallback(t3, i4, s5) {
      this._$AK(t3, s5);
    }
    _$EO(t3, i4, s5 = l) {
      var e7;
      const r4 = this.constructor._$Ep(t3, s5);
      if (r4 !== void 0 && s5.reflect === true) {
        const h3 = (((e7 = s5.converter) === null || e7 === void 0 ? void 0 : e7.toAttribute) !== void 0 ? s5.converter : n2).toAttribute(i4, s5.type);
        this._$El = t3, h3 == null ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
      }
    }
    _$AK(t3, i4) {
      var s5;
      const e7 = this.constructor, r4 = e7._$Ev.get(t3);
      if (r4 !== void 0 && this._$El !== r4) {
        const t4 = e7.getPropertyOptions(r4), h3 = typeof t4.converter == "function" ? {fromAttribute: t4.converter} : ((s5 = t4.converter) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== void 0 ? t4.converter : n2;
        this._$El = r4, this[r4] = h3.fromAttribute(i4, t4.type), this._$El = null;
      }
    }
    requestUpdate(t3, i4, s5) {
      let e7 = true;
      t3 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a)(this[t3], i4) ? (this._$AL.has(t3) || this._$AL.set(t3, i4), s5.reflect === true && this._$El !== t3 && (this._$EC === void 0 && (this._$EC = new Map()), this._$EC.set(t3, s5))) : e7 = false), !this.isUpdatePending && e7 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t4) {
        Promise.reject(t4);
      }
      const t3 = this.scheduleUpdate();
      return t3 != null && await t3, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t3;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i5) => this[i5] = t4), this._$Ei = void 0);
      let i4 = false;
      const s5 = this._$AL;
      try {
        i4 = this.shouldUpdate(s5), i4 ? (this.willUpdate(s5), (t3 = this._$ES) === null || t3 === void 0 || t3.forEach((t4) => {
          var i5;
          return (i5 = t4.hostUpdate) === null || i5 === void 0 ? void 0 : i5.call(t4);
        }), this.update(s5)) : this._$Ek();
      } catch (t4) {
        throw i4 = false, this._$Ek(), t4;
      }
      i4 && this._$AE(s5);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      var i4;
      (i4 = this._$ES) === null || i4 === void 0 || i4.forEach((t4) => {
        var i5;
        return (i5 = t4.hostUpdated) === null || i5 === void 0 ? void 0 : i5.call(t4);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    _$Ek() {
      this._$AL = new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      this._$EC !== void 0 && (this._$EC.forEach((t4, i4) => this._$EO(i4, this[i4], t4)), this._$EC = void 0), this._$Ek();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  u[d] = true, u.elementProperties = new Map(), u.elementStyles = [], u.shadowRootOptions = {mode: "open"}, o2 == null || o2({ReactiveElement: u}), ((s2 = e2.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : e2.reactiveElementVersions = []).push("1.6.2");

  // node_modules/lit-html/lit-html.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", {createHTML: (t3) => t3}) : void 0;
  var o3 = "$lit$";
  var n3 = `lit$${(Math.random() + "").slice(9)}$`;
  var l2 = "?" + n3;
  var h2 = `<${l2}>`;
  var r3 = document;
  var d2 = () => r3.createComment("");
  var u2 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
  var c2 = Array.isArray;
  var v = (t3) => c2(t3) || typeof (t3 == null ? void 0 : t3[Symbol.iterator]) == "function";
  var a2 = "[ 	\n\f\r]";
  var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g = /'/g;
  var $ = /"/g;
  var y = /^(?:script|style|textarea|title)$/i;
  var w = (t3) => (i4, ...s5) => ({_$litType$: t3, strings: i4, values: s5});
  var x = w(1);
  var b = w(2);
  var T = Symbol.for("lit-noChange");
  var A = Symbol.for("lit-nothing");
  var E = new WeakMap();
  var C = r3.createTreeWalker(r3, 129, null, false);
  var P = (t3, i4) => {
    const s5 = t3.length - 1, l5 = [];
    let r4, d3 = i4 === 2 ? "<svg>" : "", u3 = f;
    for (let i5 = 0; i5 < s5; i5++) {
      const s6 = t3[i5];
      let e7, c4, v2 = -1, a3 = 0;
      for (; a3 < s6.length && (u3.lastIndex = a3, c4 = u3.exec(s6), c4 !== null); )
        a3 = u3.lastIndex, u3 === f ? c4[1] === "!--" ? u3 = _ : c4[1] !== void 0 ? u3 = m : c4[2] !== void 0 ? (y.test(c4[2]) && (r4 = RegExp("</" + c4[2], "g")), u3 = p) : c4[3] !== void 0 && (u3 = p) : u3 === p ? c4[0] === ">" ? (u3 = r4 != null ? r4 : f, v2 = -1) : c4[1] === void 0 ? v2 = -2 : (v2 = u3.lastIndex - c4[2].length, e7 = c4[1], u3 = c4[3] === void 0 ? p : c4[3] === '"' ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, r4 = void 0);
      const w2 = u3 === p && t3[i5 + 1].startsWith("/>") ? " " : "";
      d3 += u3 === f ? s6 + h2 : v2 >= 0 ? (l5.push(e7), s6.slice(0, v2) + o3 + s6.slice(v2) + n3 + w2) : s6 + n3 + (v2 === -2 ? (l5.push(void 0), i5) : w2);
    }
    const c3 = d3 + (t3[s5] || "<?>") + (i4 === 2 ? "</svg>" : "");
    if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [e3 !== void 0 ? e3.createHTML(c3) : c3, l5];
  };
  var V = class {
    constructor({strings: t3, _$litType$: i4}, e7) {
      let h3;
      this.parts = [];
      let r4 = 0, u3 = 0;
      const c3 = t3.length - 1, v2 = this.parts, [a3, f2] = P(t3, i4);
      if (this.el = V.createElement(a3, e7), C.currentNode = this.el.content, i4 === 2) {
        const t4 = this.el.content, i5 = t4.firstChild;
        i5.remove(), t4.append(...i5.childNodes);
      }
      for (; (h3 = C.nextNode()) !== null && v2.length < c3; ) {
        if (h3.nodeType === 1) {
          if (h3.hasAttributes()) {
            const t4 = [];
            for (const i5 of h3.getAttributeNames())
              if (i5.endsWith(o3) || i5.startsWith(n3)) {
                const s5 = f2[u3++];
                if (t4.push(i5), s5 !== void 0) {
                  const t5 = h3.getAttribute(s5.toLowerCase() + o3).split(n3), i6 = /([.?@])?(.*)/.exec(s5);
                  v2.push({type: 1, index: r4, name: i6[2], strings: t5, ctor: i6[1] === "." ? k : i6[1] === "?" ? I : i6[1] === "@" ? L : R});
                } else
                  v2.push({type: 6, index: r4});
              }
            for (const i5 of t4)
              h3.removeAttribute(i5);
          }
          if (y.test(h3.tagName)) {
            const t4 = h3.textContent.split(n3), i5 = t4.length - 1;
            if (i5 > 0) {
              h3.textContent = s3 ? s3.emptyScript : "";
              for (let s5 = 0; s5 < i5; s5++)
                h3.append(t4[s5], d2()), C.nextNode(), v2.push({type: 2, index: ++r4});
              h3.append(t4[i5], d2());
            }
          }
        } else if (h3.nodeType === 8)
          if (h3.data === l2)
            v2.push({type: 2, index: r4});
          else {
            let t4 = -1;
            for (; (t4 = h3.data.indexOf(n3, t4 + 1)) !== -1; )
              v2.push({type: 7, index: r4}), t4 += n3.length - 1;
          }
        r4++;
      }
    }
    static createElement(t3, i4) {
      const s5 = r3.createElement("template");
      return s5.innerHTML = t3, s5;
    }
  };
  function N(t3, i4, s5 = t3, e7) {
    var o6, n7, l5, h3;
    if (i4 === T)
      return i4;
    let r4 = e7 !== void 0 ? (o6 = s5._$Co) === null || o6 === void 0 ? void 0 : o6[e7] : s5._$Cl;
    const d3 = u2(i4) ? void 0 : i4._$litDirective$;
    return (r4 == null ? void 0 : r4.constructor) !== d3 && ((n7 = r4 == null ? void 0 : r4._$AO) === null || n7 === void 0 || n7.call(r4, false), d3 === void 0 ? r4 = void 0 : (r4 = new d3(t3), r4._$AT(t3, s5, e7)), e7 !== void 0 ? ((l5 = (h3 = s5)._$Co) !== null && l5 !== void 0 ? l5 : h3._$Co = [])[e7] = r4 : s5._$Cl = r4), r4 !== void 0 && (i4 = N(t3, r4._$AS(t3, i4.values), r4, e7)), i4;
  }
  var S2 = class {
    constructor(t3, i4) {
      this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i4;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t3) {
      var i4;
      const {el: {content: s5}, parts: e7} = this._$AD, o6 = ((i4 = t3 == null ? void 0 : t3.creationScope) !== null && i4 !== void 0 ? i4 : r3).importNode(s5, true);
      C.currentNode = o6;
      let n7 = C.nextNode(), l5 = 0, h3 = 0, d3 = e7[0];
      for (; d3 !== void 0; ) {
        if (l5 === d3.index) {
          let i5;
          d3.type === 2 ? i5 = new M(n7, n7.nextSibling, this, t3) : d3.type === 1 ? i5 = new d3.ctor(n7, d3.name, d3.strings, this, t3) : d3.type === 6 && (i5 = new z(n7, this, t3)), this._$AV.push(i5), d3 = e7[++h3];
        }
        l5 !== (d3 == null ? void 0 : d3.index) && (n7 = C.nextNode(), l5++);
      }
      return C.currentNode = r3, o6;
    }
    v(t3) {
      let i4 = 0;
      for (const s5 of this._$AV)
        s5 !== void 0 && (s5.strings !== void 0 ? (s5._$AI(t3, s5, i4), i4 += s5.strings.length - 2) : s5._$AI(t3[i4])), i4++;
    }
  };
  var M = class {
    constructor(t3, i4, s5, e7) {
      var o6;
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i4, this._$AM = s5, this.options = e7, this._$Cp = (o6 = e7 == null ? void 0 : e7.isConnected) === null || o6 === void 0 || o6;
    }
    get _$AU() {
      var t3, i4;
      return (i4 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i4 !== void 0 ? i4 : this._$Cp;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i4 = this._$AM;
      return i4 !== void 0 && (t3 == null ? void 0 : t3.nodeType) === 11 && (t3 = i4.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i4 = this) {
      t3 = N(this, t3, i4), u2(t3) ? t3 === A || t3 == null || t3 === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== T && this._(t3) : t3._$litType$ !== void 0 ? this.g(t3) : t3.nodeType !== void 0 ? this.$(t3) : v(t3) ? this.T(t3) : this._(t3);
    }
    k(t3) {
      return this._$AA.parentNode.insertBefore(t3, this._$AB);
    }
    $(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.k(t3));
    }
    _(t3) {
      this._$AH !== A && u2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.$(r3.createTextNode(t3)), this._$AH = t3;
    }
    g(t3) {
      var i4;
      const {values: s5, _$litType$: e7} = t3, o6 = typeof e7 == "number" ? this._$AC(t3) : (e7.el === void 0 && (e7.el = V.createElement(e7.h, this.options)), e7);
      if (((i4 = this._$AH) === null || i4 === void 0 ? void 0 : i4._$AD) === o6)
        this._$AH.v(s5);
      else {
        const t4 = new S2(o6, this), i5 = t4.u(this.options);
        t4.v(s5), this.$(i5), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i4 = E.get(t3.strings);
      return i4 === void 0 && E.set(t3.strings, i4 = new V(t3)), i4;
    }
    T(t3) {
      c2(this._$AH) || (this._$AH = [], this._$AR());
      const i4 = this._$AH;
      let s5, e7 = 0;
      for (const o6 of t3)
        e7 === i4.length ? i4.push(s5 = new M(this.k(d2()), this.k(d2()), this, this.options)) : s5 = i4[e7], s5._$AI(o6), e7++;
      e7 < i4.length && (this._$AR(s5 && s5._$AB.nextSibling, e7), i4.length = e7);
    }
    _$AR(t3 = this._$AA.nextSibling, i4) {
      var s5;
      for ((s5 = this._$AP) === null || s5 === void 0 || s5.call(this, false, true, i4); t3 && t3 !== this._$AB; ) {
        const i5 = t3.nextSibling;
        t3.remove(), t3 = i5;
      }
    }
    setConnected(t3) {
      var i4;
      this._$AM === void 0 && (this._$Cp = t3, (i4 = this._$AP) === null || i4 === void 0 || i4.call(this, t3));
    }
  };
  var R = class {
    constructor(t3, i4, s5, e7, o6) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i4, this._$AM = e7, this.options = o6, s5.length > 2 || s5[0] !== "" || s5[1] !== "" ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3, i4 = this, s5, e7) {
      const o6 = this.strings;
      let n7 = false;
      if (o6 === void 0)
        t3 = N(this, t3, i4, 0), n7 = !u2(t3) || t3 !== this._$AH && t3 !== T, n7 && (this._$AH = t3);
      else {
        const e8 = t3;
        let l5, h3;
        for (t3 = o6[0], l5 = 0; l5 < o6.length - 1; l5++)
          h3 = N(this, e8[s5 + l5], i4, l5), h3 === T && (h3 = this._$AH[l5]), n7 || (n7 = !u2(h3) || h3 !== this._$AH[l5]), h3 === A ? t3 = A : t3 !== A && (t3 += (h3 != null ? h3 : "") + o6[l5 + 1]), this._$AH[l5] = h3;
      }
      n7 && !e7 && this.j(t3);
    }
    j(t3) {
      t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t3) {
      this.element[this.name] = t3 === A ? void 0 : t3;
    }
  };
  var H = s3 ? s3.emptyScript : "";
  var I = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t3) {
      t3 && t3 !== A ? this.element.setAttribute(this.name, H) : this.element.removeAttribute(this.name);
    }
  };
  var L = class extends R {
    constructor(t3, i4, s5, e7, o6) {
      super(t3, i4, s5, e7, o6), this.type = 5;
    }
    _$AI(t3, i4 = this) {
      var s5;
      if ((t3 = (s5 = N(this, t3, i4, 0)) !== null && s5 !== void 0 ? s5 : A) === T)
        return;
      const e7 = this._$AH, o6 = t3 === A && e7 !== A || t3.capture !== e7.capture || t3.once !== e7.once || t3.passive !== e7.passive, n7 = t3 !== A && (e7 === A || o6);
      o6 && this.element.removeEventListener(this.name, this, e7), n7 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      var i4, s5;
      typeof this._$AH == "function" ? this._$AH.call((s5 = (i4 = this.options) === null || i4 === void 0 ? void 0 : i4.host) !== null && s5 !== void 0 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var z = class {
    constructor(t3, i4, s5) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      N(this, t3);
    }
  };
  var j = i2.litHtmlPolyfillSupport;
  j == null || j(V, M), ((t2 = i2.litHtmlVersions) !== null && t2 !== void 0 ? t2 : i2.litHtmlVersions = []).push("2.7.4");
  var B = (t3, i4, s5) => {
    var e7, o6;
    const n7 = (e7 = s5 == null ? void 0 : s5.renderBefore) !== null && e7 !== void 0 ? e7 : i4;
    let l5 = n7._$litPart$;
    if (l5 === void 0) {
      const t4 = (o6 = s5 == null ? void 0 : s5.renderBefore) !== null && o6 !== void 0 ? o6 : null;
      n7._$litPart$ = l5 = new M(i4.insertBefore(d2(), t4), t4, void 0, s5 != null ? s5 : {});
    }
    return l5._$AI(t3), l5;
  };

  // node_modules/lit-element/lit-element.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var l3;
  var o4;
  var s4 = class extends u {
    constructor() {
      super(...arguments), this.renderOptions = {host: this}, this._$Do = void 0;
    }
    createRenderRoot() {
      var t3, e7;
      const i4 = super.createRenderRoot();
      return (t3 = (e7 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e7.renderBefore = i4.firstChild), i4;
    }
    update(t3) {
      const i4 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = B(i4, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t3;
      super.connectedCallback(), (t3 = this._$Do) === null || t3 === void 0 || t3.setConnected(true);
    }
    disconnectedCallback() {
      var t3;
      super.disconnectedCallback(), (t3 = this._$Do) === null || t3 === void 0 || t3.setConnected(false);
    }
    render() {
      return T;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === void 0 || l3.call(globalThis, {LitElement: s4});
  var n4 = globalThis.litElementPolyfillSupport;
  n4 == null || n4({LitElement: s4});
  ((o4 = globalThis.litElementVersions) !== null && o4 !== void 0 ? o4 : globalThis.litElementVersions = []).push("3.3.2");

  // node_modules/lit-html/is-server.js
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var e4 = (e7) => (n7) => typeof n7 == "function" ? ((e8, n8) => (customElements.define(e8, n8), n8))(e7, n7) : ((e8, n8) => {
    const {kind: t3, elements: s5} = n8;
    return {kind: t3, elements: s5, finisher(n9) {
      customElements.define(e8, n9);
    }};
  })(e7, n7);

  // node_modules/@lit/reactive-element/decorators/property.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var i3 = (i4, e7) => e7.kind === "method" && e7.descriptor && !("value" in e7.descriptor) ? {...e7, finisher(n7) {
    n7.createProperty(e7.key, i4);
  }} : {kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e7.key, initializer() {
    typeof e7.initializer == "function" && (this[e7.key] = e7.initializer.call(this));
  }, finisher(n7) {
    n7.createProperty(e7.key, i4);
  }};
  var e5 = (i4, e7, n7) => {
    e7.constructor.createProperty(n7, i4);
  };
  function n5(n7) {
    return (t3, o6) => o6 !== void 0 ? e5(n7, t3, o6) : i3(n7, t3);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */

  // node_modules/@lit/reactive-element/decorators/base.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */

  // node_modules/@lit/reactive-element/decorators/event-options.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */

  // node_modules/@lit/reactive-element/decorators/query.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */

  // node_modules/@lit/reactive-element/decorators/query-all.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */

  // node_modules/@lit/reactive-element/decorators/query-async.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  /**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var n6;
  var e6 = ((n6 = window.HTMLSlotElement) === null || n6 === void 0 ? void 0 : n6.prototype.assignedElements) != null ? (o6, n7) => o6.assignedElements(n7) : (o6, n7) => o6.assignedNodes(n7).filter((o7) => o7.nodeType === Node.ELEMENT_NODE);

  // node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */

  // src/utils/korean-date-format.ts
  function koreandateFormat(time = new Date()) {
    const isUnder10 = (num) => num < 10 ? `0${num}` : num;
    const month = isUnder10(time.getMonth() + 1);
    const date = isUnder10(time.getDate());
    const hours = isUnder10(time.getHours());
    const minutes = isUnder10(time.getMinutes());
    return `${month}. ${date}. ${hours}:${minutes}`;
  }

  // src/elements/naver/popup/header.ts
  var NaverPopupHeader = class extends s4 {
    render() {
      return x`
      <div class="header">
        <h1 class="title">급상승 검색어</h1>
        <span class="update"> ${koreandateFormat()} </span>
      </div>
    `;
    }
  };
  NaverPopupHeader.styles = [
    i`
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 18px;
        border-bottom: 1px solid var(--color_border_out);
      }

      .title {
        font-size: 1.5rem;
        color: var(--color_title);
        font-weight: 700;
      }

      .update {
        font-size: 1.3rem;
        color: var(--color_caption2);
        font-weight: 500;
      }
    `
  ];
  NaverPopupHeader = __decorate([
    e4("naver-popup-header")
  ], NaverPopupHeader);

  // src/elements/naver/popup/keyword-list/keyword-list-item.ts
  var NaverPopupKeywordListItem = class extends s4 {
    render() {
      return x`
      <div class="container">
        <a href="${this.ranking.keyword}">
          <span class="rank">${this.ranking.rank}</span>
          <span class="keyword">${this.ranking.keyword}</span>
        </a>
      </div>
    `;
    }
  };
  NaverPopupKeywordListItem.styles = [
    i`
      .rank {
        color: var(--color_caption1);
        font-weight: 500;
        font-size: 1.5rem;
        margin-right: 10px;
        width: 16px;
        text-align: right;
      }

      .keyword {
        color: var(--color_caption1);
        font-size: 1.5rem;
        width: 100%;
        text-align: left;
      }
    `
  ];
  __decorate([
    n5({type: Object})
  ], NaverPopupKeywordListItem.prototype, "ranking", 2);
  NaverPopupKeywordListItem = __decorate([
    e4("naver-popup-keyword-list-item")
  ], NaverPopupKeywordListItem);

  // src/elements/naver/popup/keyword-list/index.ts
  var NaverPopupKeywordList = class extends s4 {
    constructor() {
      super(...arguments);
      this.rankigns = [];
    }
    render() {
      return x`
      <div class="container">
        ${this.rankigns.map((ranking) => {
        return x`
            <naver-popup-keyword-list-item
              .ranking=${ranking}
            ></naver-popup-keyword-list-item>
          `;
      })}
      </div>
    `;
    }
  };
  NaverPopupKeywordList.styles = [
    i`
      .container {
        margin: 20px 0;
        padding: 0 18px;
      }
    `
  ];
  __decorate([
    n5({type: Array})
  ], NaverPopupKeywordList.prototype, "rankigns", 2);
  NaverPopupKeywordList = __decorate([
    e4("naver-popup-keyword-list")
  ], NaverPopupKeywordList);

  // src/elements/naver/popup/index.ts
  var NaverPopup = class extends s4 {
    render() {
      return x`
      <div class="container">
        <naver-popup-header></naver-popup-header>
        <naver-popup-keyword-list .rankigns=${[]}></naver-popup-keyword-list>
      </div>
    `;
    }
  };
  NaverPopup.styles = [
    i`
      .container {
        width: 100%;
        z-index: 1000;
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        background: var(--color_block_bg);
        animation: popup 0.15s ease-in-out;
        box-shadow: 0 0 0 1px var(--color_border_out),
          0 4px 8px 0 rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
      }

      .container::before {
        content: "";
        display: block;
        position: absolute;
        top: -13px;
        right: 13px;
        background-image: url(https://pm.pstatic.net/resources/asset/sp_main.30918f90.png);
        background-size: 422px 405px;
        background-position: -165px -114px;
        background-repeat: no-repeat;
        width: 22px;
        height: 13px;
      }

      html[data-dark="true"] .container::before {
        background-position: -142px -114px;
      }
      html[data-dark="true"] .container {
        box-shadow: 0 0 0 1px #383c3c, 0 4px 12px 0 rgba(0, 0, 0, 0.5);
      }
    `
  ];
  NaverPopup = __decorate([
    e4("naver-popup")
  ], NaverPopup);
})();
