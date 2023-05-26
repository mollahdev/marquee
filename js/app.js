var p = Object.defineProperty;
var u = (r, t, e) => t in r ? p(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var a = (r, t, e) => (u(r, typeof t != "symbol" ? t + "" : t, e), e);
class d {
  constructor(t, e) {
    a(this, "start");
    a(this, "size");
    a(this, "visibleArea");
    a(this, "duplicate");
    a(this, "translate");
    a(this, "mover");
    a(this, "wrapper");
    a(this, "item");
    a(this, "className");
    this.scope = t, this.config = e, this.start = performance.now(), this.size = 0, this.visibleArea = 0, this.duplicate = 4, this.translate = new Function("_", 'return "translate(0, 0)"');
  }
  get speed() {
    var t;
    return ((t = this.config) == null ? void 0 : t.duration) * 1e3;
  }
  wrapInner(t, e, i) {
    const s = document.createElement(e), n = t.appendChild(s);
    for (let h in i)
      n.setAttribute(h, i[h]);
    for (; t.firstChild !== s; )
      s.appendChild(t.firstChild);
    return n;
  }
  changeExistingMarkup() {
    this.className = `direction-${this.config.direction}`, this.item = this.wrapInner(this.scope, "div", { class: "marquee-clone" }), this.mover = this.wrapInner(this.scope, "div", { class: `marquee-mover ${this.className}` }), this.wrapper = this.wrapInner(this.scope, "div", { class: "marquee-wrapper" });
  }
}
function c(r, t, e) {
  const i = e.value, s = {
    vertical: ["up", "down"],
    horizontal: ["left", "right"]
  };
  e.value = function() {
    if (s[t] && this.config) {
      const n = s[t], { direction: h } = this.config;
      n.includes(h) && i.apply(this);
    }
  };
}
var m = Object.defineProperty, v = Object.getOwnPropertyDescriptor, l = (r, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? v(t, e) : t, n = r.length - 1, h; n >= 0; n--)
    (h = r[n]) && (s = (i ? h(t, e, s) : h(s)) || s);
  return i && s && m(t, e, s), s;
};
class o extends d {
  constructor(t, e) {
    super(t, e), this.changeExistingMarkup(), this.vertical(), this.horizontal(), this.animate();
  }
  vertical() {
    if (!this.mover || !this.wrapper || !this.item)
      return;
    const t = this.scope.clientHeight, e = Math.ceil(t / this.mover.clientHeight);
    this.duplicate = e > 1 ? e * 2 : 3, this.wrapper.style.maxHeight = t + "px", this.wrapper.style.overflow = "hidden";
    for (let i = 1; i < this.duplicate; i++)
      this.mover.appendChild(this.item.cloneNode(!0));
    this.size = this.mover.clientHeight, this.visibleArea = this.scope.clientHeight, this.translate = new Function(
      "value",
      "return `translateY(${value}px)`"
    );
  }
  horizontal() {
    if (!this.mover || !this.wrapper || !this.item)
      return;
    this.mover.style.display = "inline-flex", this.mover.style.alignItems = "center";
    const t = this.scope.clientWidth, e = Math.ceil(t / this.mover.clientWidth);
    this.duplicate = e > 1 ? e * 2 : 3, this.wrapper.style.maxWidth = t + "px", this.wrapper.style.overflow = "hidden";
    for (let i = 1; i < this.duplicate; i++)
      this.mover.appendChild(this.item.cloneNode(!0));
    this.size = this.mover.clientWidth, this.visibleArea = this.scope.clientWidth, this.translate = new Function(
      "value",
      "return `translateX(${value}px)`"
    );
  }
  moveElement(t) {
    if (!this.config || !this.scope || !this.mover)
      return;
    let e = "0", i = t * (this.size - this.visibleArea);
    switch (this.config.direction) {
      case "up":
        e = `-${i}`;
        break;
      case "left":
        e = `-${i}`;
        break;
      case "down":
        e = `-${this.size - this.visibleArea - i}`;
        break;
      case "right":
        e = `-${this.size - this.visibleArea - i}`;
        break;
    }
    this.mover.style.transform = this.translate(e);
  }
  animate() {
    const t = performance.now(), e = Math.min((t - this.start) / this.speed, 1);
    this.moveElement(e), e >= 1 && (this.start = performance.now()), requestAnimationFrame(this.animate.bind(this));
  }
}
l([
  c
], o.prototype, "vertical", 1);
l([
  c
], o.prototype, "horizontal", 1);
class w {
  constructor(t, e) {
    this.selector = t;
    const i = {
      direction: "up",
      duration: 30
    };
    typeof t == "string" && document.querySelectorAll(t).forEach((n) => {
      new o(
        n,
        Object.assign(i, e)
      );
    });
  }
}
export {
  w as default
};
