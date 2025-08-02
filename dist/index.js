'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// Función helper para validar React (útil para debugging)
var checkReactAvailability = function () {
    if (typeof React === 'undefined') {
        console.warn('FancyButton: React no está disponible. Asegúrate de que React esté instalado.');
        return false;
    }
    return true;
};
var FancyButton = function (props) {
    var _a;
    // Destructuring con valores por defecto más robustos
    var _b = props.children, children = _b === void 0 ? "Button" : _b, _c = props.variant, variant = _c === void 0 ? "3d" : _c, _d = props.appearance, appearance = _d === void 0 ? "3d" : _d, _e = props.size, size = _e === void 0 ? "medium" : _e, backgroundColor = props.backgroundColor, color = props.color, borderColor = props.borderColor, hoverColor = props.hoverColor, startIcon = props.startIcon, endIcon = props.endIcon, _f = props.iconOnly, iconOnly = _f === void 0 ? false : _f, _g = props.disabled, disabled = _g === void 0 ? false : _g, _h = props.ripple, ripple = _h === void 0 ? true : _h, onClick = props.onClick, _j = props.fullWidth, fullWidth = _j === void 0 ? false : _j, maxWidth = props.maxWidth, _k = props.className, className = _k === void 0 ? '' : _k, _l = props.style, externalStyle = _l === void 0 ? {} : _l, otherProps = __rest(props, ["children", "variant", "appearance", "size", "backgroundColor", "color", "borderColor", "hoverColor", "startIcon", "endIcon", "iconOnly", "disabled", "ripple", "onClick", "fullWidth", "maxWidth", "className", "style"]);
    // Verificación de React en desarrollo
    if (typeof process !== 'undefined' && ((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === 'development') {
        checkReactAvailability();
    }
    var buttonRef = React.useRef(null);
    var _m = React.useState(false), isHovered = _m[0], setIsHovered = _m[1];
    var _o = React.useState(false), isActive = _o[0], setIsActive = _o[1];
    // Utilidad para obtener color con opacidad - más robusta
    var getRGBA = function (hex, alpha) {
        if (!hex || typeof hex !== 'string')
            return '';
        try {
            var c = hex.replace('#', '');
            if (c.length === 3)
                c = c.split('').map(function (x) { return x + x; }).join('');
            if (c.length !== 6)
                return '';
            var num = parseInt(c, 16);
            if (isNaN(num))
                return '';
            return "rgba(".concat((num >> 16) & 255, ",").concat((num >> 8) & 255, ",").concat(num & 255, ",").concat(alpha, ")");
        }
        catch (error) {
            console.warn('FancyButton: Error procesando color', hex, error);
            return '';
        }
    };
    var handleClick = function (e) {
        if (disabled)
            return;
        var button = buttonRef.current;
        if (!button || !ripple) {
            if (onClick)
                onClick(e);
            return;
        }
        try {
            var rippleEl_1 = document.createElement('span');
            var rect = button.getBoundingClientRect();
            var size_1 = Math.max(rect.width, rect.height);
            var x = e.clientX - rect.left - size_1 / 2;
            var y = e.clientY - rect.top - size_1 / 2;
            rippleEl_1.style.width = rippleEl_1.style.height = "".concat(size_1, "px");
            rippleEl_1.style.left = "".concat(x, "px");
            rippleEl_1.style.top = "".concat(y, "px");
            rippleEl_1.className = 'rippleAnimation';
            button.appendChild(rippleEl_1);
            setTimeout(function () {
                try {
                    if (rippleEl_1 && rippleEl_1.parentNode) {
                        rippleEl_1.remove();
                    }
                }
                catch (cleanupError) {
                    console.warn('FancyButton: Error limpiando ripple', cleanupError);
                }
            }, 1200);
        }
        catch (rippleError) {
            console.warn('FancyButton: Error creando efecto ripple', rippleError);
        }
        if (onClick)
            onClick(e);
    };
    // Estilos dinámicos más robustos
    var internalStyle = {
        background: backgroundColor || undefined,
        color: color || undefined,
        border: (variant === '3d' || variant === 'outline' || borderColor)
            ? "2px solid ".concat(borderColor || (variant === '3d' ? '#016bd6' : variant === 'outline' ? '#0173e6' : 'transparent'))
            : 'none',
        boxSizing: 'border-box',
        width: 'auto',
        maxWidth: 'none',
        minWidth: 0,
    };
    if (fullWidth) {
        internalStyle.width = '100%';
        internalStyle.display = 'block';
    }
    if (maxWidth) {
        internalStyle.maxWidth = typeof maxWidth === 'number' ? "".concat(maxWidth, "px") : maxWidth;
    }
    // Para variante text: solo color de texto en hover, fondo solo en active
    if (variant === 'text') {
        var hoverColorValue = hoverColor || '#00b4d8';
        internalStyle = __assign(__assign({}, internalStyle), { '--hover-color': hoverColorValue, '--active-bg': hoverColor ? getRGBA(hoverColor, 0.15) : 'rgba(0,180,216,0.15)', color: isHovered && hoverColor ? hoverColor : color, background: isActive && hoverColor
                ? getRGBA(hoverColor, 0.15)
                : 'transparent', border: 'none', boxShadow: 'none', textShadow: 'none', transition: 'color 0.2s, background 0.2s' });
    }
    // Para appearance classic
    if (appearance === 'classic') {
        internalStyle = __assign(__assign({}, internalStyle), { '--classic-hover': hoverColor || color || '#0ea5e9', '--classic-border': borderColor || color || '#0ea5e9', '--classic-bg': backgroundColor || 'transparent', transition: 'color 0.3s, border-color 0.3s, background 0.3s' });
    }
    // Combinar estilos externos con internos
    var finalStyle = __assign(__assign({}, internalStyle), externalStyle);
    // Clases CSS más robustas
    var classes = [
        'custom-button',
        "variant-".concat(variant),
        "size-".concat(size),
        appearance === 'classic' ? 'appearance-classic' : '',
        disabled ? 'disabled' : '',
        iconOnly ? 'icon-only' : '',
        className,
    ].filter(Boolean).join(' ');
    return (jsxRuntime.jsxs("button", __assign({ ref: buttonRef, className: classes, style: finalStyle, onClick: handleClick, onMouseEnter: function () { return setIsHovered(true); }, onMouseLeave: function () {
            setIsHovered(false);
            setIsActive(false);
        }, onMouseDown: function () { return setIsActive(true); }, onMouseUp: function () { return setIsActive(false); }, disabled: disabled }, otherProps, { children: [startIcon && jsxRuntime.jsx("span", { className: "btn-icon start", children: startIcon }), !iconOnly && jsxRuntime.jsx("span", { className: "btn-label", children: children }), endIcon && jsxRuntime.jsx("span", { className: "btn-icon end", children: endIcon })] })));
};

exports.FancyButton = FancyButton;
exports.default = FancyButton;
//# sourceMappingURL=index.js.map
