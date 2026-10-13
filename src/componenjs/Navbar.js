"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Navbar;
var _react = require("react");
var _lucideReact = require("lucide-react");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var links = [{
  label: 'Work',
  href: '#work'
}, {
  label: 'About',
  href: '#about'
}, {
  label: 'Skills',
  href: '#skills'
}, {
  label: 'Experience',
  href: '#experience'
}];
function Navbar() {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var closeMenu = function closeMenu() {
    return setOpen(false);
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "navbar"
  }, /*#__PURE__*/React.createElement("a", {
    className: "brand",
    href: "#home",
    onClick: closeMenu,
    "aria-label": "Aadhil T home"
  }, "AD"), /*#__PURE__*/React.createElement("nav", {
    className: "nav-links ".concat(open ? 'is-open' : ''),
    "aria-label": "Main navigation"
  }, links.map(function (link) {
    return /*#__PURE__*/React.createElement("a", {
      key: link.href,
      href: link.href,
      onClick: closeMenu
    }, link.label);
  }), /*#__PURE__*/React.createElement("a", {
    className: "nav-contact",
    href: "#contact",
    onClick: closeMenu
  }, "Let's talk ", /*#__PURE__*/React.createElement(_lucideReact.ArrowUpRight, {
    size: 15
  }))), /*#__PURE__*/React.createElement("button", {
    className: "menu-toggle",
    type: "button",
    "aria-label": open ? 'Close navigation menu' : 'Open navigation menu',
    "aria-expanded": open,
    onClick: function onClick() {
      return setOpen(function (value) {
        return !value;
      });
    }
  }, open ? /*#__PURE__*/React.createElement(_lucideReact.X, {
    size: 22
  }) : /*#__PURE__*/React.createElement(_lucideReact.Menu, {
    size: 22
  })));
}