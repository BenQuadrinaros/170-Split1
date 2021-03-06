!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).rexuiplugin = e()
}(this, function () {
    "use strict";

    function p(t) {
        return (p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function B(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function n(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }

    function m(t, e, i) {
        return e && n(t.prototype, e), i && n(t, i), t
    }

    function b(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), e && i(t, e)
    }

    function x(t) {
        return (x = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function i(t, e) {
        return (i = Object.setPrototypeOf || function (t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function z(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function w(r) {
        var o = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                })), !0
            } catch (t) {
                return !1
            }
        }();
        return function () {
            var t, e, i, n = x(r);
            if (o) {
                var s = x(this).constructor;
                t = Reflect.construct(n, arguments, s)
            } else t = n.apply(this, arguments);
            return e = this, !(i = t) || "object" != typeof i && "function" != typeof i ? z(e) : i
        }
    }

    function l(t, e) {
        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = x(t));) ;
        return t
    }

    function C(t, e, i) {
        return (C = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, i) {
            var n = l(t, e);
            if (n) {
                var s = Object.getOwnPropertyDescriptor(n, e);
                return s.get ? s.get.call(i) : s.value
            }
        })(t, e, i || t)
    }

    function r(t, e, i, n) {
        return (r = "undefined" != typeof Reflect && Reflect.set ? Reflect.set : function (t, e, i, n) {
            var s, r, o, a, h = l(t, e);
            if (h) {
                if ((s = Object.getOwnPropertyDescriptor(h, e)).set) return s.set.call(n, i), !0;
                if (!s.writable) return !1
            }
            if (s = Object.getOwnPropertyDescriptor(n, e)) {
                if (!s.writable) return !1;
                s.value = i, Object.defineProperty(n, e, s)
            } else a = i, (o = e) in (r = n) ? Object.defineProperty(r, o, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : r[o] = a;
            return !0
        })(t, e, i, n)
    }

    function e(t, e, i, n, s) {
        if (!r(t, e, i, n || t) && s) throw new Error("failed to set property");
        return i
    }

    function S(t) {
        return function (t) {
            if (Array.isArray(t)) return t
        }(t) || s(t) || o(t) || function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function h(t) {
        return function (t) {
            if (Array.isArray(t)) return a(t)
        }(t) || s(t) || o(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function s(t) {
        if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
    }

    function o(t, e) {
        if (t) {
            if ("string" == typeof t) return a(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? a(t, e) : void 0
        }
    }

    function a(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
        return n
    }

    function v(t, e, i) {
        var n = i.length;
        if (2 <= n) {
            var s = i[n - 2], r = i[n - 1];
            if (t === s && e === r) return i
        }
        return i.push(t, e), i
    }

    function c(t, e, i, n, s, r, o, a, h) {
        o && s < r && (r -= 360);
        var l = g(r - s) / a;
        s = g(s);
        for (var u = 0; u <= a; u++) {
            var c = s + l * u, d = t + i * Math.cos(c), f = e + n * Math.sin(c);
            v(d, f, h)
        }
        return h
    }

    var u = function () {
            function i(t) {
                B(this, i), this.scene = t, this.displayList = t.sys.displayList, this.updateList = t.sys.updateList, t.events.once("destroy", this.destroy, this)
            }

            return m(i, [{
                key: "destroy", value: function () {
                    this.scene = null, this.displayList = null, this.updateList = null
                }
            }], [{
                key: "register", value: function (t, e) {
                    i.prototype[t] = e
                }
            }]), i
        }(), d = Phaser.Utils.Objects.GetValue, k = function () {
            function r(t, e, i, n, s) {
                B(this, r), this.cornerRadius = {}, this._width = 0, this._height = 0, this.setTo(t, e, i, n, s)
            }

            return m(r, [{
                key: "setTo", value: function (t, e, i, n, s) {
                    return this.setPosition(t, e), this.setRadius(s), this.setSize(i, n), this
                }
            }, {
                key: "setPosition", value: function (t, e) {
                    return void 0 === t && (t = 0), void 0 === e && (e = t), this.x = t, this.y = e, this
                }
            }, {
                key: "setRadius", value: function (t) {
                    var e, i;
                    void 0 === t && (t = 0), i = "number" == typeof t ? e = t : (e = d(t, "x", 0), d(t, "y", 0));
                    var n = this.cornerRadius;
                    return n.tl = f(d(t, "tl", void 0), e, i), n.tr = f(d(t, "tr", void 0), e, i), n.bl = f(d(t, "bl", void 0), e, i), n.br = f(d(t, "br", void 0), e, i), this
                }
            }, {
                key: "setSize", value: function (t, e) {
                    return this.width = t, this.height = e, this
                }
            }, {
                key: "minWidth", get: function () {
                    var t = this.cornerRadius;
                    return Math.max(t.tl.x + t.tr.x, t.bl.x + t.br.x)
                }
            }, {
                key: "minHeight", get: function () {
                    var t = this.cornerRadius;
                    return Math.max(t.tl.y + t.bl.y, t.tr.y + t.br.y)
                }
            }, {
                key: "width", get: function () {
                    return this._width
                }, set: function (t) {
                    null == t && (t = 0), this._width = Math.max(t, this.minWidth)
                }
            }, {
                key: "height", get: function () {
                    return this._height
                }, set: function (t) {
                    null == t && (t = 0), this._height = Math.max(t, this.minHeight)
                }
            }, {
                key: "radius", get: function () {
                    var t = this.cornerRadius;
                    return Math.max(t.tl.x, t.tl.y, t.tr.x, t.tr.y, t.bl.x, t.bl.y, t.br.x, t.br.y)
                }
            }]), r
        }(), f = function (t, e, i) {
            return void 0 === t ? {x: e, y: i} : "number" == typeof t ? {x: t, y: t} : t
        }, g = Phaser.Math.DegToRad, P = Phaser.Renderer.WebGL.Utils, y = function (t, e, i, n, s, r) {
            for (var o = P.getTintAppendFloatAlpha(i.fillColor, i.fillAlpha * n), a = i.pathData, h = i.pathIndexes, l = 0; l < h.length; l += 3) {
                var u = 2 * h[l], c = 2 * h[l + 1], d = 2 * h[l + 2], f = a[0 + u] - s, p = a[1 + u] - r, v = a[0 + c] - s,
                    g = a[1 + c] - r, y = a[0 + d] - s, k = a[1 + d] - r, m = e.getX(f, p), b = e.getY(f, p),
                    x = e.getX(v, g), C = e.getY(v, g), w = e.getX(y, k), S = e.getY(y, k);
                t.batchTri(m, b, x, C, w, S, o, o, o)
            }
        }, T = Phaser.Renderer.WebGL.Utils, O = function (t, e, i, n, s) {
            var r = t.strokeTint, o = T.getTintAppendFloatAlpha(e.strokeColor, e.strokeAlpha * i);
            r.TL = o, r.TR = o, r.BL = o, r.BR = o;
            var a = e.pathData, h = a.length - 1, l = e.lineWidth, u = l / 2, c = a[0] - n, d = a[1] - s;
            e.closePath || (h -= 2);
            for (var f = 2; f < h; f += 2) {
                var p = a[f] - n, v = a[f + 1] - s;
                t.batchLine(c, d, p, v, u, u, l, f - 2, !!e.closePath && f === h - 1), c = p, d = v
            }
        }, t = Phaser.GameObjects.Components.TransformMatrix, M = new t, _ = new t, E = new t,
        j = {camera: M, sprite: _, calc: E}, R = function (t, e, i) {
            var n = M, s = _, r = E;
            return s.applyITRS(t.x, t.y, t.rotation, t.scaleX, t.scaleY), n.copyFrom(e.matrix), i ? (n.multiplyWithOffset(i, -e.scrollX * t.scrollFactorX, -e.scrollY * t.scrollFactorY), s.e = t.x, s.f = t.y) : (s.e -= e.scrollX * t.scrollFactorX, s.f -= e.scrollY * t.scrollFactorY), n.multiply(s, r), j
        }, D = function (t, e, i, n) {
            var s = i || e.fillColor, r = n || e.fillAlpha, o = (16711680 & s) >>> 16, a = (65280 & s) >>> 8, h = 255 & s;
            t.fillStyle = "rgba(" + o + "," + a + "," + h + "," + r + ")"
        }, L = function (t, e, i, n) {
            var s = i || e.strokeColor, r = n || e.strokeAlpha, o = (16711680 & s) >>> 16, a = (65280 & s) >>> 8,
                h = 255 & s;
            t.strokeStyle = "rgba(" + o + "," + a + "," + h + "," + r + ")", t.lineWidth = e.lineWidth
        }, I = Phaser.Renderer.Canvas.SetTransform, Y = {
            renderWebGL: function (t, e, i, n) {
                e.dirty && (e.updateData(), e.dirty = !1), i.addToRenderList(e);
                var s = t.pipelines.set(e.pipeline), r = R(e, i, n), o = s.calcMatrix.copyFrom(r.calc),
                    a = e._displayOriginX, h = e._displayOriginY, l = i.alpha * e.alpha;
                t.pipelines.preBatch(e), e.isFilled && y(s, o, e, l, a, h), e.isStroked && O(s, e, l, a, h), t.pipelines.postBatch(e)
            }, renderCanvas: function (t, e, i, n) {
                e.dirty && (e.updateData(), e.dirty = !1), i.addToRenderList(e);
                var s = t.currentContext;
                if (I(t, s, e, i, n)) {
                    var r = e._displayOriginX, o = e._displayOriginY, a = e.pathData, h = a.length - 1, l = a[0] - r,
                        u = a[1] - o;
                    s.beginPath(), s.moveTo(l, u), e.closePath || (h -= 2);
                    for (var c = 2; c < h; c += 2) {
                        var d = a[c] - r, f = a[c + 1] - o;
                        s.lineTo(d, f)
                    }
                    s.closePath(), e.isFilled && (D(s, e), s.fill()), e.isStroked && (L(s, e), s.stroke()), s.restore()
                }
            }
        }, A = Phaser.GameObjects.Shape, F = Phaser.Utils.Objects.GetValue, W = Phaser.Geom.Polygon.Earcut,
        V = function () {
            b(f, A);
            var d = w(f);

            function f(t, e, i, n, s, r, o, a) {
                var h;
                B(this, f), void 0 === e && (e = 0), void 0 === i && (i = 0);
                var l = new k;
                h = d.call(this, t, "rexRoundRectangleShape", l);
                var u = F(r, "radius", r);
                l.setTo(0, 0, n, s, u);
                var c = F(r, "iteration", void 0);
                return h.setIteration(c), h.setPosition(e, i), void 0 !== o && h.setFillStyle(o, a), h.updateDisplayOrigin(), h.dirty = !0, h
            }

            return m(f, [{
                key: "updateData", value: function () {
                    var t = this.geom, e = this.pathData;
                    e.length = 0;
                    var i, n = t.cornerRadius, s = this.iteration + 1;
                    if (i = n.br, X(i)) {
                        var r = t.width - i.x, o = t.height - i.y;
                        c(r, o, i.x, i.y, 0, 90, !1, s, e)
                    } else v(t.width, t.height, e);
                    if (i = n.bl, X(i)) {
                        r = i.x, o = t.height - i.y;
                        c(r, o, i.x, i.y, 90, 180, !1, s, e)
                    } else v(0, t.height, e);
                    if (i = n.tl, X(i)) {
                        r = i.x, o = i.y;
                        c(r, o, i.x, i.y, 180, 270, !1, s, e)
                    } else v(0, 0, e);
                    if (i = n.tr, X(i)) {
                        r = t.width - i.x, o = i.y;
                        c(r, o, i.x, i.y, 270, 360, !1, s, e)
                    } else v(t.width, 0, e);
                    return e.push(e[0], e[1]), this.pathIndexes = W(e), this
                }
            }, {
                key: "width", get: function () {
                    return this.geom.width
                }, set: function (t) {
                    this.resize(t, this.height)
                }
            }, {
                key: "height", get: function () {
                    return this.geom.height
                }, set: function (t) {
                    this.resize(this.width, t)
                }
            }, {
                key: "resize", value: function (t, e) {
                    if (void 0 === e && (e = t), this.geom.width === t && this.geom.height === e) return this;
                    this.geom.height = e, this.geom.width = t, this.updateDisplayOrigin(), this.dirty = !0;
                    var i = this.input;
                    return i && !i.customHitArea && (i.hitArea.width = t, i.hitArea.height = e), this
                }
            }, {
                key: "iteration", get: function () {
                    return this._iteration
                }, set: function (t) {
                    void 0 !== this._iteration ? this._iteration !== t && (this._iteration = t, this.dirty = !0) : this._iteration = t
                }
            }, {
                key: "setIteration", value: function (t) {
                    return void 0 === t && (t = 6), this.iteration = t, this
                }
            }, {
                key: "radius", get: function () {
                    return this.geom.radius
                }, set: function (t) {
                    this.geom.setRadius(t), this.updateDisplayOrigin(), this.dirty = !0
                }
            }, {
                key: "setRadius", value: function (t) {
                    return void 0 === t && (t = 0), this.radius = t, this
                }
            }, {
                key: "cornerRadius", get: function () {
                    return this.geom.cornerRadius
                }, set: function (t) {
                    this.radius = t
                }
            }, {
                key: "setCornerRadius", value: function (t) {
                    return this.setRadius(t)
                }
            }]), f
        }(), X = function (t) {
            return 0 !== t.x && 0 !== t.y
        };
    Object.assign(V.prototype, Y);

    function G(t) {
        return null == t || "" === t || 0 === t.length
    }

    function H(t, e, i) {
        if ("object" === p(t)) {
            if (G(e)) {
                if (null == i) return;
                "object" === p(i) && (t = i)
            } else {
                "string" == typeof e && (e = e.split("."));
                var n = e.pop();
                (function (t, e, i) {
                    var n = t;
                    if (!G(e)) {
                        var s;
                        "string" == typeof e && (e = e.split("."));
                        for (var r = 0, o = e.length; r < o; r++) {
                            var a;
                            if (null == n[s = e[r]] || "object" !== p(n[s])) a = r !== o - 1 || void 0 === i ? {} : i, n[s] = a;
                            n = n[s]
                        }
                    }
                    return n
                })(t, e)[n] = i
            }
            return t
        }
    }

    u.register("roundRectangle", function (t, e, i, n, s, r, o) {
        var a = new V(this.scene, t, e, i, n, s, r, o);
        return this.scene.add.existing(a), a
    }), H(window, "RexPlugins.UI.RoundRectangle", V);
    var U = Phaser.Renderer.WebGL.Utils, N = {
        renderWebGL: function (t, e, i, n) {
            if (e.dirty && (e.updateTexture(), e.dirty = !1), 0 !== e.width && 0 !== e.height) {
                i.addToRenderList(e);
                var s = e.frame, r = s.width, o = s.height, a = U.getTintAppendFloatAlpha,
                    h = t.pipelines.set(e.pipeline, e), l = h.setTexture2D(s.glTexture, e);
                t.pipelines.preBatch(e), h.batchTexture(e, s.glTexture, r, o, e.x, e.y, r / e.resolution, o / e.resolution, e.scaleX, e.scaleY, e.rotation, e.flipX, e.flipY, e.scrollFactorX, e.scrollFactorY, e.displayOriginX, e.displayOriginY, 0, 0, r, o, a(e.tintTopLeft, i.alpha * e._alphaTL), a(e.tintTopRight, i.alpha * e._alphaTR), a(e.tintBottomLeft, i.alpha * e._alphaBL), a(e.tintBottomRight, i.alpha * e._alphaBR), e.tintFill, 0, 0, i, n, !1, l), t.pipelines.postBatch(e)
            }
        }, renderCanvas: function (t, e, i, n) {
            e.dirty && (e.updateTexture(), e.dirty = !1), 0 !== e.width && 0 !== e.height && (i.addToRenderList(e), t.batchSprite(e, e.frame, i, n))
        }
    }, J = Phaser.Display.Color, K = {
        clear: function () {
            return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.dirty = !0, this
        }, fill: function (t) {
            return this.context.fillStyle = t, this.context.fillRect(0, 0, this.canvas.width, this.canvas.height), this.dirty = !0, this
        }, loadFromURL: function (t, e) {
            var i = this, n = new Image;
            return n.onload = function () {
                i.width !== n.width || i.height !== n.height ? i.resize(n.width, n.height) : i.clear(), i.context.drawImage(n, 0, 0), i.updateTexture(), e && e(), n.onload = null, n.src = "", n.remove()
            }, n.src = t, this
        }, loadFromURLPromise: function (i) {
            var n = this;
            return new Promise(function (t, e) {
                n.loadFromURL(i, t)
            })
        }, getDataURL: function (t, e) {
            return this.canvas.toDataURL(t, e)
        }, getPixel: function (t, e, i) {
            void 0 === i && (i = new J);
            var n = this.context.getImageData(t, e, 1, 1);
            return i.setTo(n.data[0], n.data[1], n.data[2], n.data[3]), i
        }, setPixel: function (t, e, i, n, s, r) {
            if ("number" != typeof i) {
                var o = i;
                i = o.red, n = o.green, s = o.blue, r = o.alpha
            }
            void 0 === r && (r = 0 !== i || 0 !== n || 0 !== s ? 255 : 0);
            var a = this.context.createImageData(1, 1);
            return a.data[0] = i, a.data[1] = n, a.data[2] = s, a.data[3] = r, this.context.putImageData(a, t, e), this.dirty = !0, this
        }
    }, Z = {
        updateTexture: function (t, e) {
            t && (e ? t.call(e, this.canvas, this.context) : t(this.canvas, this.context)), this.canvas.width === this.frame.width && this.canvas.height === this.frame.height || this.frame.setSize(this.canvas.width, this.canvas.height), this.renderer.gl && (this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, !0), this.frame.glTexture = this.frame.source.glTexture), this.dirty = !1;
            var i = this.input;
            return i && !i.customHitArea && (i.hitArea.width = this.width, i.hitArea.height = this.height), this
        }, generateTexture: function (t, e, i, n, s) {
            var r, o = this.canvas, a = this.scene.sys, h = a.game.renderer;
            void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n ? n = o.width : n *= this.resolution, void 0 === s ? s = o.height : s *= this.resolution;
            var l = (r = a.textures.exists(t) ? a.textures.get(t) : a.textures.createCanvas(t, n, s)).getSourceImage();
            l.width !== n && (l.width = n), l.height !== s && (l.height = s);
            var u = l.getContext("2d");
            return u.clearRect(0, 0, n, s), u.drawImage(o, e, i, n, s), h.gl && r && h.canvasToTexture(l, r.source[0].glTexture, !0, 0), this
        }, loadTexture: function (t, e) {
            var i = this.scene.textures.getFrame(t, e);
            return i && (this.width !== i.cutWidth || this.height !== i.cutHeight ? this.resize(i.cutWidth, i.cutHeight) : this.clear(), this.context.drawImage(i.source.image, i.cutX, i.cutY, i.cutWidth, i.cutHeight, 0, 0, this.canvas.width, this.canvas.height), this.dirty = !0), this
        }
    }, q = Phaser.Display.Canvas.CanvasPool, $ = Phaser.GameObjects.GameObject, Q = function () {
        b(a, $);
        var o = w(a);

        function a(t, e, i, n, s) {
            var r;
            return B(this, a), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 1), void 0 === s && (s = 1), (r = o.call(this, t, "rexCanvas")).renderer = t.sys.game.renderer, r.resolution = 1, r._width = n, r._height = s, n = Math.max(Math.ceil(n * r.resolution), 1), s = Math.max(Math.ceil(s * r.resolution), 1), r.canvas = q.create(z(r), n, s), r.context = r.canvas.getContext("2d"), r.dirty = !1, r.setPosition(e, i), r.setOrigin(.5, .5), r.initPipeline(), r._crop = r.resetCropObject(), r.texture = t.sys.textures.addCanvas(null, r.canvas, !0), r.frame = r.texture.get(), r.frame.source.resolution = r.resolution, r.renderer && r.renderer.gl && (r.renderer.deleteTexture(r.frame.source.glTexture), r.frame.source.glTexture = null), r.dirty = !0, t.sys.game.events.on("contextrestored", function () {
                this.dirty = !0
            }, z(r)), r
        }

        return m(a, [{
            key: "width", get: function () {
                return this._width
            }, set: function (t) {
                this.setSize(t, this._height)
            }
        }, {
            key: "height", get: function () {
                return this._height
            }, set: function (t) {
                this.setSize(this._width, t)
            }
        }, {
            key: "setSize", value: function (t, e) {
                return this._width === t && this._height === e || (this._width = t, this._height = e, this.updateDisplayOrigin(), t = Math.max(Math.ceil(t * this.resolution), 1), e = Math.max(Math.ceil(e * this.resolution), 1), this.canvas.width = t, this.canvas.height = e, this.frame.setSize(t, e), this.dirty = !0), this
            }
        }, {
            key: "displayWidth", get: function () {
                return this.scaleX * this._width
            }, set: function (t) {
                this.scaleX = t / this._width
            }
        }, {
            key: "displayHeight", get: function () {
                return this.scaleY * this._height
            }, set: function (t) {
                this.scaleY = t / this._height
            }
        }, {
            key: "setDisplaySize", value: function (t, e) {
                return this.displayWidth = t, this.displayHeight = e, this
            }
        }, {
            key: "getCanvas", value: function (t) {
                return t || (this.dirty = !0), this.canvas
            }
        }, {
            key: "getContext", value: function (t) {
                return t || (this.dirty = !0), this.context
            }
        }, {
            key: "needRedraw", value: function () {
                return this.dirty = !0, this
            }
        }, {
            key: "preDestroy", value: function () {
                q.remove(this.canvas)
            }
        }, {
            key: "resize", value: function (t, e) {
                return this.setSize(t, e), this
            }
        }]), a
    }(), tt = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Q, [tt.Alpha, tt.BlendMode, tt.Crop, tt.Depth, tt.Flip, tt.GetBounds, tt.Mask, tt.Origin, tt.Pipeline, tt.ScrollFactor, tt.Tint, tt.Transform, tt.Visible, N, K, Z]);

    function et(t, e, i) {
        if (null == t) return t;
        switch (p(t)) {
            case"string":
                return t;
            case"number":
                return "#".concat(st(Math.floor(t).toString(16), 6, "0", 1));
            case"function":
                return t(e, i);
            case"object":
                return t.hasOwnProperty("r") ? t.hasOwnProperty("a") ? "rgba(".concat(t.r, ",").concat(t.g, ",").concat(t.b, ",").concat(t.a, ")") : "rgb(".concat(t.r, ",").concat(t.g, ",").concat(t.b, ")") : t.hasOwnProperty("h") ? t.hasOwnProperty("a") ? "hsla(".concat(t.h, ",").concat(t.s, ",").concat(t.l, ",").concat(t.a, ")") : "hsl(".concat(t.h, ",").concat(t.s, ",").concat(t.l, ")") : t;
            default:
                return t
        }
    }

    function it(t, e, i, n, s, r, o) {
        var a, h, l, u, c, d = new k(e, i, n, s, r), f = d.minWidth, p = d.minHeight, v = f <= n ? 1 : n / f,
            g = p <= s ? 1 : s / p, y = d.cornerRadius;
        t.save(), t.beginPath(), t.translate(e, i), u = n - (h = (a = y.br).x * v), c = s - (l = a.y * g), t.moveTo(n, c), 0 < h && 0 < l ? ut(t, u, c, h, l, ot, at, o) : (t.lineTo(n, s), t.lineTo(u, s)), u = h = (a = y.bl).x * v, c = s - (l = a.y * g), t.lineTo(h, s), 0 < h && 0 < l ? ut(t, u, c, h, l, at, ht, o) : (t.lineTo(0, s), t.lineTo(0, c)), u = h = (a = y.tl).x * v, c = l = a.y * g, t.lineTo(0, c), 0 < h && 0 < l ? ut(t, u, c, h, l, ht, lt, o) : (t.lineTo(0, 0), t.lineTo(u, 0)), u = n - (h = (a = y.tr).x * v), c = l = a.y * g, t.lineTo(u, 0), 0 < h && 0 < l ? ut(t, u, c, h, l, lt, ot, o) : (t.lineTo(n, 0), t.lineTo(n, c)), t.closePath(), t.restore()
    }

    function nt(t, e, i, n, s, r, o, a) {
        if (null != e || null != i) {
            var h = t.canvas.width, l = t.canvas.height;
            null == i && (n = 0);
            var u = n / 2;
            h -= n, l -= n, function (t, e, i, n, s, r, o, a, h, l, u, c) {
                if (it(t, e, i, n, s, r, c), null != o) {
                    var d;
                    if (null != l) (d = u ? t.createLinearGradient(0, 0, n, 0) : t.createLinearGradient(0, 0, 0, s)).addColorStop(0, o), d.addColorStop(1, l), o = d;
                    t.fillStyle = o, t.fill()
                }
                null != a && 0 < h && (t.strokeStyle = a, t.lineWidth = h, t.stroke())
            }((t.canvas, t.context), u, u, h, l, s, e, i, n, r, o, a)
        }
    }

    var st = Phaser.Utils.String.Pad, rt = Phaser.Math.DegToRad, ot = rt(0), at = rt(90), ht = rt(180), lt = rt(270),
        ut = function (t, e, i, n, s, r, o, a) {
            if (null == a) t.ellipse(e, i, n, s, 0, r, o); else for (var h, l, u, c = (o - r) / (a += 1), d = 0; d <= a; d++) u = r + c * d, h = e + n * Math.cos(u), l = i + s * Math.sin(u), t.lineTo(h, l)
        }, ct = Phaser.Utils.Objects.GetValue, dt = function () {
            b(v, Q);
            var p = w(v);

            function v(t, e, i, n, s, r, o, a, h, l, u) {
                var c;
                B(this, v), (c = p.call(this, t, e, i, n, s)).type = "rexRoundRectangleCanvas";
                var d = ct(r, "radius", r), f = ct(r, "iteration", void 0);
                return c.setRadius(d), c.setIteration(f), c.setFillStyle(o, l, u), c.setStrokeStyle(a, h), c
            }

            return m(v, [{
                key: "radius", get: function () {
                    return this._radius
                }, set: function (t) {
                    this.dirty |= this._radius != t, this._radius = t
                }
            }, {
                key: "setRadius", value: function (t) {
                    return this.radius = t, this
                }
            }, {
                key: "iteration", get: function () {
                    return this._iteration
                }, set: function (t) {
                    this.dirty |= this._iteration != t, this._iteration = t
                }
            }, {
                key: "setIteration", value: function (t) {
                    return this.iteration = t, this
                }
            }, {
                key: "fillStyle", get: function () {
                    return this._fillStyle
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.dirty |= this._fillStyle != t, this._fillStyle = t
                }
            }, {
                key: "fillColor2", get: function () {
                    return this._fillColor2
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.dirty |= this._fillColor2 != t, this._fillColor2 = t
                }
            }, {
                key: "isHorizontalGradient", get: function () {
                    return this._fillStyle
                }, set: function (t) {
                    this.dirty |= this._isHorizontalGradient != t, this._isHorizontalGradient = t
                }
            }, {
                key: "setFillStyle", value: function (t, e, i) {
                    return void 0 === i && (i = !0), this.fillStyle = t, this.fillColor2 = e, this.isHorizontalGradient = i, this
                }
            }, {
                key: "strokeStyle", get: function () {
                    return this._strokeStyle
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.dirty |= this._strokeStyle != t, this._strokeStyle = t
                }
            }, {
                key: "lineWidth", get: function () {
                    return this._lineWidth
                }, set: function (t) {
                    this.dirty |= this._lineWidth != t, this._lineWidth = t
                }
            }, {
                key: "setStrokeStyle", value: function (t, e) {
                    return this.strokeStyle = t, this.lineWidth = e, this
                }
            }, {
                key: "updateTexture", value: function () {
                    return this.clear(), function () {
                        nt(this, this.fillStyle, this.strokeStyle, this.lineWidth, this.radius, this.fillColor2, this.isHorizontalGradient, this.iteration)
                    }.call(this), C(x(v.prototype), "updateTexture", this).call(this), this
                }
            }]), v
        }();
    u.register("roundRectangleCanvas", function (t, e, i, n, s, r, o, a, h, l) {
        var u = new dt(this.scene, t, e, i, n, s, r, o, a, h, l);
        return this.scene.add.existing(u), u
    }), H(window, "RexPlugins.UI.RoundRectangleCanvas", dt);

    function ft(t) {
        var e = bt.create(this), i = e.getContext("2d");
        t.syncFont(e, i);
        var n = i.measureText(t.testString);
        if (n.hasOwnProperty("actualBoundingBoxAscent") && n.hasOwnProperty("actualBoundingBoxDescent")) {
            var s = n.actualBoundingBoxAscent, r = n.actualBoundingBoxDescent,
                o = {ascent: s, descent: r, fontSize: s + r};
            return bt.remove(e), o
        }
        var a = Math.ceil(n.width * t.baselineX), h = a, l = 2 * h;
        if (h = h * t.baselineY | 0, e.width = a, e.height = l, i.fillStyle = "#f00", i.fillRect(0, 0, a, l), i.font = t._font, i.textBaseline = "alphabetic", i.fillStyle = "#000", i.fillText(t.testString, 0, h), o = {
            ascent: 0,
            descent: 0,
            fontSize: 0
        }, !i.getImageData(0, 0, a, l)) return o.ascent = h, o.descent = h + 6, o.fontSize = o.ascent + o.descent, bt.remove(e), o;
        var u, c, d = i.getImageData(0, 0, a, l).data, f = d.length, p = 4 * a, v = 0, g = !1;
        for (u = 0; u < h; u++) {
            for (c = 0; c < p; c += 4) if (255 !== d[v + c]) {
                g = !0;
                break
            }
            if (g) break;
            v += p
        }
        for (o.ascent = h - u, v = f - p, g = !1, u = l; h < u; u--) {
            for (c = 0; c < p; c += 4) if (255 !== d[v + c]) {
                g = !0;
                break
            }
            if (g) break;
            v -= p
        }
        return o.descent = u - h, o.fontSize = o.ascent + o.descent, bt.remove(e), o
    }

    function pt(t) {
        if (Array.isArray(t)) t.length = 0; else for (var e in t) delete t[e]
    }

    function vt(t, e) {
        var i = Array.isArray(t);
        if (void 0 === e ? e = i ? [] : {} : pt(e), i) {
            e.length = t.length;
            for (var n = 0, s = t.length; n < s; n++) e[n] = t[n]
        } else for (var r in t) e[r] = t[r];
        return e
    }

    function gt() {
    }

    function yt(t, e, i, n, s) {
        n <= 0 && (i = Qt);
        var r = ie;
        if (ne.pushMultiple(r), !t || !t.length) return r;
        for (var o, a, h, l = t.split(ee), u = 0, c = l.length; u < c; u++) if (o = l[u], h = u === c - 1 ? Zt : qt, i !== Qt) {
            var d, f;
            if (a = 0 === u ? n - s : n, o.length <= 100) if ((b = e(o)) <= a) {
                r.push(ne.newline(o, b, h));
                continue
            }
            for (var p, v = "", g = "", y = 0, k = 0, m = (d = i === te ? o.split(" ") : o).length; k < m; k++) f = d[k], i === te ? (v += f, k < m - 1 && (v += " ")) : v += f, a < (p = e(v)) && (0 === k ? r.push(ne.newline("", 0, $t)) : (r.push(ne.newline(g, y, $t)), v = f, i === te && k < m - 1 && (v += " "), p = e(v)), a = n), g = v, y = p;
            r.push(ne.newline(g, y, h))
        } else {
            var b = e(o);
            r.push(ne.newline(o, b, h))
        }
        return r
    }

    var kt = Phaser.Renderer.WebGL.Utils, mt = {
            renderWebGL: function (t, e, i, n) {
                if (0 !== e.width && 0 !== e.height) {
                    i.addToRenderList(e);
                    var s = e.frame, r = s.width, o = s.height, a = kt.getTintAppendFloatAlpha,
                        h = t.pipelines.set(e.pipeline, e), l = h.setTexture2D(s.glTexture, e);
                    t.pipelines.preBatch(e), h.batchTexture(e, s.glTexture, r, o, e.x, e.y, r / e.style.resolution, o / e.style.resolution, e.scaleX, e.scaleY, e.rotation, e.flipX, e.flipY, e.scrollFactorX, e.scrollFactorY, e.displayOriginX, e.displayOriginY, 0, 0, r, o, a(e.tintTopLeft, i.alpha * e._alphaTL), a(e.tintTopRight, i.alpha * e._alphaTR), a(e.tintBottomLeft, i.alpha * e._alphaBL), a(e.tintBottomRight, i.alpha * e._alphaBR), e.tintFill, 0, 0, i, n, !1, l), t.pipelines.postBatch(e)
                }
            }, renderCanvas: function (t, e, i, n) {
                0 !== e.width && 0 !== e.height && (i.addToRenderList(e), t.batchSprite(e, e.frame, i, n))
            }
        }, bt = Phaser.Display.Canvas.CanvasPool, xt = 0, Ct = 1, wt = 2, St = 0, Pt = 1, Tt = 2, Ot = /(?:\r\n|\r|\n)/,
        Mt = Phaser.Utils.Objects.GetAdvancedValue, _t = Phaser.Utils.Objects.GetValue, Et = {
            backgroundColor: ["backgroundColor", null, et],
            backgroundColor2: ["backgroundColor2", null, et],
            backgroundHorizontalGradient: ["backgroundHorizontalGradient", !0, null],
            backgroundStrokeColor: ["backgroundStrokeColor", null, et],
            backgroundStrokeLineWidth: ["backgroundStrokeLineWidth", 2, null],
            backgroundCornerRadius: ["backgroundCornerRadius", 0, null],
            backgroundCornerIteration: ["backgroundCornerIteration", null, null],
            fontFamily: ["fontFamily", "Courier", null],
            fontSize: ["fontSize", "16px", null],
            fontStyle: ["fontStyle", "", null],
            color: ["color", "#fff", et],
            stroke: ["stroke", "#fff", et],
            strokeThickness: ["strokeThickness", 0, null],
            shadowOffsetX: ["shadow.offsetX", 0, null],
            shadowOffsetY: ["shadow.offsetY", 0, null],
            shadowColor: ["shadow.color", "#000", et],
            shadowBlur: ["shadow.blur", 0, null],
            shadowStroke: ["shadow.stroke", !1, null],
            shadowFill: ["shadow.fill", !1, null],
            underlineColor: ["underline.color", "#000", et],
            underlineThickness: ["underline.thickness", 0, null],
            underlineOffset: ["underline.offset", 0, null],
            halign: ["halign", "left", null],
            valign: ["valign", "top", null],
            maxLines: ["maxLines", 0, null],
            fixedWidth: ["fixedWidth", 0, null],
            fixedHeight: ["fixedHeight", 0, null],
            resolution: ["resolution", 0, null],
            lineSpacing: ["lineSpacing", 0, null],
            rtl: ["rtl", !1, null],
            testString: ["testString", "|MÃ‰qgy", null],
            baselineX: ["baselineX", 1.2, null],
            baselineY: ["baselineY", 1.4, null],
            wrapMode: ["wrap.mode", 0, null],
            wrapWidth: ["wrap.width", 0, null]
        }, Bt = function () {
            function n(t, e) {
                B(this, n), this.parent = t, this.backgroundColor, this.backgroundColor2, this.backgroundHorizontalGradient, this.backgroundStrokeColor, this.backgroundStrokeLineWidth, this.backgroundCornerRadius, this.backgroundCornerIteration, this.fontFamily, this.fontSize, this.fontStyle, this.color, this.stroke, this.strokeThickness, this.shadowOffsetX, this.shadowOffsetY, this.shadowColor, this.shadowBlur, this.shadowStroke, this.shadowFill, this.underlineColor, this.underlineThickness, this.underlineOffset, this.halign, this.valign, this.maxLines, this.fixedWidth, this.fixedHeight, this.resolution, this.lineSpacing, this.rtl, this.testString, this.baselineX, this.baselineY, this._font, this.setStyle(e, !1);
                var i = _t(e, "metrics", !1);
                this.metrics = i ? {
                    ascent: _t(i, "ascent", 0),
                    descent: _t(i, "descent", 0),
                    fontSize: _t(i, "fontSize", 0)
                } : ft(this)
            }

            return m(n, [{
                key: "canvas", get: function () {
                    return this.parent.canvasText.canvas
                }
            }, {
                key: "context", get: function () {
                    return this.parent.canvasText.context
                }
            }, {
                key: "isWrapFitMode", get: function () {
                    return 0 < this.fixedWidth && this.wrapMode !== St && 0 === this.wrapWidth
                }
            }, {
                key: "setStyle", value: function (t, e) {
                    if (void 0 === e && (e = !0), t && t.hasOwnProperty("wrap")) {
                        var i = t.wrap;
                        if (i.hasOwnProperty("mode")) {
                            var n = i.mode;
                            "string" == typeof n && (i.mode = zt[n])
                        } else i.hasOwnProperty("width") && (i.mode = 1)
                    }
                    for (var s in t && t.hasOwnProperty("fontSize") && "number" == typeof t.fontSize && (t.fontSize = t.fontSize.toString() + "px"), Et) {
                        var r = Et[s], o = r[0], a = r[1], h = r[2], l = Mt(t, o, a);
                        h && (l = h(l)), this[s] = l
                    }
                    var u = _t(t, "font", null);
                    this._font = null === u ? this.fontStyle + " " + this.fontSize + " " + this.fontFamily : u;
                    var c = _t(t, "fill", null);
                    return null !== c && (this.color = c), e ? this.update(!0) : this.parent
                }
            }, {
                key: "syncFont", value: function (t, e) {
                    e.font = this._font
                }
            }, {
                key: "syncStyle", value: function (t, e) {
                    e.textBaseline = "alphabetic", e.fillStyle = this.color, e.strokeStyle = this.stroke, e.lineWidth = this.strokeThickness, e.lineCap = "round", e.lineJoin = "round"
                }
            }, {
                key: "syncShadow", value: function (t, e) {
                    e ? (t.shadowOffsetX = this.shadowOffsetX, t.shadowOffsetY = this.shadowOffsetY, t.shadowColor = this.shadowColor, t.shadowBlur = this.shadowBlur) : (t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowColor = 0, t.shadowBlur = 0)
                }
            }, {
                key: "update", value: function (t) {
                    return t && (this._font = this.fontStyle + " " + this.fontSize + " " + this.fontFamily, this.metrics = ft(this)), this.parent.updateText(t)
                }
            }, {
                key: "buildFont", value: function () {
                    var t = this.fontStyle + " " + this.fontSize + " " + this.fontFamily;
                    return t !== this._font && (this._font = t), this
                }
            }, {
                key: "setFont", value: function (t) {
                    return "string" == typeof t ? (this.fontFamily = t, this.fontSize = "", this.fontStyle = "") : (this.fontFamily = _t(t, "fontFamily", "Courier"), this.fontSize = _t(t, "fontSize", "16px"), this.fontStyle = _t(t, "fontStyle", "")), this.update(!0)
                }
            }, {
                key: "setFontFamily", value: function (t) {
                    return this.fontFamily = t, this.update(!0)
                }
            }, {
                key: "setFontStyle", value: function (t) {
                    return this.fontStyle = t, this.update(!0)
                }
            }, {
                key: "setFontSize", value: function (t) {
                    return "number" == typeof t && (t = t.toString() + "px"), this.fontSize = t, this.update(!0)
                }
            }, {
                key: "setTestString", value: function (t) {
                    return this.testString = t, this.update(!0)
                }
            }, {
                key: "setFixedSize", value: function (t, e) {
                    return this.fixedWidth = t, this.fixedHeight = e, t && (this.parent.width = t), e && (this.parent.height = e), this.update(this.isWrapFitMode)
                }
            }, {
                key: "setResolution", value: function (t) {
                    return this.resolution = t, this.update(!1)
                }
            }, {
                key: "setLineSpacing", value: function (t) {
                    return this.lineSpacing = t, this.update(!1)
                }
            }, {
                key: "setBackgroundColor", value: function (t, e, i) {
                    return void 0 === i && (i = !0), this.backgroundColor = et(t, this.canvas, this.context), this.backgroundColor2 = et(e, this.canvas, this.context), this.backgroundHorizontalGradient = i, this.update(!1)
                }
            }, {
                key: "setBackgroundStrokeColor", value: function (t, e) {
                    return this.backgroundStrokeColor = et(t, this.canvas, this.context), this.backgroundStrokeLineWidth = e, this.update(!1)
                }
            }, {
                key: "setBackgroundCornerRadius", value: function (t, e) {
                    return this.backgroundCornerRadius = t, this.backgroundCornerIteration = e, this.update(!1)
                }
            }, {
                key: "setFill", value: function (t) {
                    return this.color = et(t, this.canvas, this.context), this.update(!1)
                }
            }, {
                key: "setColor", value: function (t) {
                    return this.color = et(t, this.canvas, this.context), this.update(!1)
                }
            }, {
                key: "setStroke", value: function (t, e) {
                    return void 0 === t ? this.strokeThickness = 0 : (void 0 === e && (e = this.strokeThickness), this.stroke = et(t, this.canvas, this.context), this.strokeThickness = e), this.update(!0)
                }
            }, {
                key: "setShadow", value: function (t, e, i, n, s, r) {
                    return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = "#000"), void 0 === n && (n = 0), void 0 === s && (s = !1), void 0 === r && (r = !0), this.shadowOffsetX = t, this.shadowOffsetY = e, this.shadowColor = et(i, this.canvas, this.context), this.shadowBlur = n, this.shadowStroke = s, this.shadowFill = r, this.update(!1)
                }
            }, {
                key: "setShadowOffset", value: function (t, e) {
                    return void 0 === t && (t = 0), void 0 === e && (e = t), this.shadowOffsetX = t, this.shadowOffsetY = e, this.update(!1)
                }
            }, {
                key: "setShadowColor", value: function (t) {
                    return void 0 === t && (t = "#000"), this.shadowColor = et(t, this.canvas, this.context), this.update(!1)
                }
            }, {
                key: "setShadowBlur", value: function (t) {
                    return void 0 === t && (t = 0), this.shadowBlur = t, this.update(!1)
                }
            }, {
                key: "setShadowStroke", value: function (t) {
                    return this.shadowStroke = t, this.update(!1)
                }
            }, {
                key: "setShadowFill", value: function (t) {
                    return this.shadowFill = t, this.update(!1)
                }
            }, {
                key: "setUnderline", value: function (t, e, i) {
                    return void 0 === t && (t = "#000"), void 0 === e && (e = 0), void 0 === i && (i = 0), this.underlineColor = et(t, this.canvas, this.context), this.underlineThickness = e, this.underlineOffset = i, this.update(!1)
                }
            }, {
                key: "setUnderlineColor", value: function (t) {
                    return void 0 === t && (t = "#000"), this.underlineColor = et(t, this.canvas, this.context), this.update(!1)
                }
            }, {
                key: "setUnderlineThickness", value: function (t) {
                    return void 0 === t && (t = 0), this.underlineThickness = t, this.update(!1)
                }
            }, {
                key: "setUnderlineOffset", value: function (t) {
                    return void 0 === t && (t = 0), this.underlineOffset = t, this.update(!1)
                }
            }, {
                key: "setWrapMode", value: function (t) {
                    return "string" == typeof t && (t = zt[t.toLowerCase()] || 0), this.wrapMode = t, this.update(!0)
                }
            }, {
                key: "setWrapWidth", value: function (t) {
                    return this.wrapWidth = t, this.update(!1)
                }
            }, {
                key: "setAlign", value: function (t, e) {
                    return void 0 === t && (t = "left"), void 0 === e && (e = "top"), this.halign = t, this.valign = e, this.update(!1)
                }
            }, {
                key: "setHAlign", value: function (t) {
                    return void 0 === t && (t = "left"), this.halign = t, this.update(!1)
                }
            }, {
                key: "setVAlign", value: function (t) {
                    return void 0 === t && (t = "top"), this.valign = t, this.update(!1)
                }
            }, {
                key: "setMaxLines", value: function (t) {
                    return void 0 === t && (t = 0), this.maxLines = t, this.update(!1)
                }
            }, {
                key: "getTextMetrics", value: function () {
                    var t = this.metrics;
                    return {ascent: t.ascent, descent: t.descent, fontSize: t.fontSize}
                }
            }, {
                key: "lineHeight", get: function () {
                    return this.metrics.fontSize + this.strokeThickness + this.lineSpacing
                }
            }, {
                key: "toJSON", value: function () {
                    var t = {};
                    for (var e in Et) t[e] = this[e];
                    return t.metrics = this.getTextMetrics(), t
                }
            }, {
                key: "destroy", value: function () {
                    this.parent = void 0
                }
            }]), n
        }(), zt = {none: St, word: Pt, char: Tt, character: Tt}, jt = {
            draw: function (t, e, i, n) {
                var s = this.penManager;
                this.hitAreaManager.clear();
                var r = this.context;
                r.save();
                var o = this.defaultStyle;
                this.clear(), nt(this, o.backgroundColor, o.backgroundStrokeColor, o.backgroundStrokeLineWidth, o.backgroundCornerRadius, o.backgroundColor2, o.backgroundHorizontalGradient, o.backgroundCornerIteration), t += this.startXOffset, e += this.startYOffset;
                var a, h, l, u, c, d, f = o.halign, p = o.valign, v = o.lineHeight, g = s.lines, y = g.length,
                    k = o.maxLines;
                u = (l = 0 < k && k < y ? (h = k, "center" === p ? Math.floor((y - h) / 2) : "bottom" === p ? y - h : 0) : (h = y, 0)) + h, d = "center" === p ? Math.max((n - h * v) / 2, 0) : "bottom" === p ? Math.max(n - h * v - 2, 0) : 0, d += e;
                for (var m = l; m < u; m++) if (0 !== (a = s.getLineWidth(m))) {
                    c = "center" === f ? (i - a) / 2 : "right" === f ? i - a : 0, c += t;
                    for (var b = g[m], x = 0, C = b.length; x < C; x++) this.drawPen(b[x], c, d)
                }
                r.restore()
            }, drawPen: function (t, e, i) {
                e += t.x, i += t.y + (t.prop.y || 0);
                var n = this.canvas, s = this.context;
                s.save();
                var r = this.parser.propToContextStyle(this.defaultStyle, t.prop);
                r.buildFont(), r.syncFont(n, s), r.syncStyle(n, s), 0 < r.underlineThickness && 0 < t.width && this.drawUnderline(e, i, t.width, r), t.isTextPen && this.drawText(e, i, t.text, r), t.isImagePen && this.drawImage(e, i, t.prop.img, r), s.restore(), t.hasAreaMarker && 0 < t.width && this.hitAreaManager.add(t.prop.area, e, i - this.startYOffset, t.width, this.defaultStyle.lineHeight)
            }, clear: function () {
                var t = this.canvas;
                this.context.clearRect(0, 0, t.width, t.height)
            }, drawUnderline: function (t, e, i, n) {
                e += n.underlineOffset - n.underlineThickness / 2, this.autoRound && (t = Math.round(t), e = Math.round(e));
                var s = this.context, r = s.lineCap;
                s.lineCap = "butt", s.strokeStyle = n.underlineColor, s.lineWidth = n.underlineThickness, s.beginPath(), s.moveTo(t, e), s.lineTo(t + i, e), s.stroke(), s.lineCap = r
            }, drawText: function (t, e, i, n) {
                this.autoRound && (t = Math.round(t), e = Math.round(e));
                var s = this.context;
                n.strokeThickness && (n.syncShadow(s, n.shadowStroke), s.strokeText(i, t, e)), n.color && "none" !== n.color && (n.syncShadow(s, n.shadowFill), s.fillText(i, t, e))
            }, drawImage: function (t, e, i) {
                e -= this.startYOffset, this.parent.imageManager.draw(i, this.context, t, e, this.autoRound)
            }
        }, Rt = function () {
            function t() {
                B(this, t), this.items = []
            }

            return m(t, [{
                key: "destroy", value: function () {
                    this.clear(), this.items = void 0
                }
            }, {
                key: "pop", value: function () {
                    return 0 < this.items.length ? this.items.pop() : null
                }
            }, {
                key: "push", value: function (t) {
                    return this.items.push(t), this
                }
            }, {
                key: "pushMultiple", value: function (t) {
                    return this.items.push.apply(this.items, t), t.length = 0, this
                }
            }, {
                key: "clear", value: function () {
                    return this.items.length = 0, this
                }
            }]), t
        }(), Dt = Phaser.Utils.Objects.GetValue, Lt = xt, It = Ct, Yt = function () {
            function e(t) {
                B(this, e), this.prop = {}, this.resetFromJSON(t)
            }

            return m(e, [{
                key: "resetFromJSON", value: function (t) {
                    this.text = Dt(t, "text", ""), this.x = Dt(t, "x", 0), this.y = Dt(t, "y", 0), this.width = Dt(t, "width", 0);
                    var e = Dt(t, "prop", null);
                    null === e && (e = {}), this.prop = e, this.newLineMode = Dt(t, "newLineMode", 0), this.startIndex = Dt(t, "startIndex", 0)
                }
            }, {
                key: "plainText", get: function () {
                    var t = this.text;
                    return this.newLineMode === It && (t += "\n"), t
                }
            }, {
                key: "wrapText", get: function () {
                    var t = this.text;
                    return this.newLineMode !== Lt && (t += "\n"), t
                }
            }, {
                key: "rawTextLength", get: function () {
                    var t = this.text.length;
                    return this.newLineMode === It && (t += 1), t
                }
            }, {
                key: "endIndex", get: function () {
                    return this.startIndex + this.rawTextLength
                }
            }, {
                key: "lastX", get: function () {
                    return this.x + this.width
                }
            }, {
                key: "isTextPen", get: function () {
                    return "" !== this.text
                }
            }, {
                key: "isImagePen", get: function () {
                    return !!this.prop.img
                }
            }, {
                key: "hasAreaMarker", get: function () {
                    return !!this.prop.area
                }
            }]), e
        }(), At = Phaser.Utils.Objects.GetFastValue, Ft = xt, Wt = wt, Vt = new Rt, Xt = new Rt, Gt = function () {
            function a(t) {
                B(this, a), this.pens = [], this.lines = [], this.maxLinesWidth = void 0, this.PensPool = At(t, "pensPool", Vt), this.LinesPool = At(t, "linesPool", Xt), this.tagToText = At(t, "tagToText", gt), this.tagToTextScope = At(t, "tagToTextScope", void 0)
            }

            return m(a, [{
                key: "destroy", value: function () {
                    this.freePens(), this.tagToText = void 0, this.tagToTextScope = void 0
                }
            }, {
                key: "freePens", value: function () {
                    for (var t = 0, e = this.lines.length; t < e; t++) this.lines[t].length = 0;
                    this.PensPool.pushMultiple(this.pens), this.LinesPool.pushMultiple(this.lines), this.maxLinesWidth = void 0
                }
            }, {
                key: "addTextPen", value: function (t, e, i, n, s, r) {
                    var o = this.PensPool.pop();
                    return null == o && (o = new Yt), Ht.text = t, Ht.x = e, Ht.y = i, Ht.width = n, Ht.prop = s, Ht.newLineMode = r, o.resetFromJSON(Ht), this.addPen(o), this
                }
            }, {
                key: "addImagePen", value: function (t, e, i, n) {
                    return this.addTextPen("", t, e, i, n, Ft), this
                }
            }, {
                key: "addNewLinePen", value: function () {
                    var t = this.lastPen, e = t ? t.lastX : 0, i = t ? t.y : 0, n = t ? vt(t.prop) : null;
                    return this.addTextPen("", e, i, 0, n, Wt), this
                }
            }, {
                key: "addPen", value: function (t) {
                    var e = this.lastPen;
                    t.startIndex = null == e ? 0 : e.endIndex, this.pens.push(t);
                    var i = this.lastLine;
                    null == i && (i = this.LinesPool.pop() || [], this.lines.push(i)), i.push(t), t.newLineMode !== Ft && (i = this.LinesPool.pop() || [], this.lines.push(i)), this.maxLinesWidth = void 0
                }
            }, {
                key: "clone", value: function (t) {
                    null == t && (t = new a), t.freePens();
                    for (var e = 0, i = this.lines.length; e < i; e++) for (var n = this.lines[e], s = 0, r = n.length; s < r; s++) {
                        var o = n[s];
                        t.addPen(o.text, o.x, o.y, o.width, vt(o.prop), o.newLineMode)
                    }
                    return t
                }
            }, {
                key: "lastPen", get: function () {
                    return this.pens[this.pens.length - 1]
                }
            }, {
                key: "lastLine", get: function () {
                    return this.lines[this.lines.length - 1]
                }
            }, {
                key: "getLineStartIndex", value: function (t) {
                    if (t >= this.lines.length) return this.getLineEndIndex(t);
                    var e = this.lines[t];
                    return e && e[0] ? e[0].startIndex : 0
                }
            }, {
                key: "getLineEndIndex", value: function (t) {
                    t >= this.lines.length && (t = this.lines.length - 1);
                    var e, i, n = !1;
                    for (e = t; 0 <= e && !(n = null != (i = this.lines[e]) && 0 < i.length); e--) ;
                    return n ? i[i.length - 1].endIndex : 0
                }
            }, {
                key: "getLineWidth", value: function (t) {
                    var e = this.lines[t];
                    if (!e) return 0;
                    var i = e[e.length - 1];
                    return null == i ? 0 : i.lastX
                }
            }, {
                key: "getMaxLineWidth", value: function () {
                    if (void 0 !== this.maxLinesWidth) return this.maxLinesWidth;
                    for (var t, e = 0, i = 0, n = this.lines.length; i < n; i++) e < (t = this.getLineWidth(i)) && (e = t);
                    return this.maxLinesWidth = e
                }
            }, {
                key: "getLineWidths", value: function () {
                    for (var t = [], e = 0, i = this.lines.length; e < i; e++) t.push(this.getLineWidth(e));
                    return t
                }
            }, {
                key: "linesCount", get: function () {
                    return this.lines.length
                }
            }, {
                key: "plainText", get: function () {
                    for (var t = "", e = this.pens, i = 0, n = e.length; i < n; i++) t += e[i].plainText;
                    return t
                }
            }, {
                key: "rawTextLength", get: function () {
                    for (var t = 0, e = this.pens, i = 0, n = this.pens.length; i < n; i++) t += e[i].rawTextLength;
                    return t
                }
            }, {
                key: "getSliceTagText", value: function (t, e, i) {
                    if (void 0 === t && (t = 0), void 0 === e) {
                        var n = this.lastPen;
                        if (null == n) return "";
                        e = n.endIndex
                    }
                    void 0 === i && (i = !1);
                    for (var s, r, o, a, h, l, u = "", c = 0, d = this.pens.length; c < d && ((a = (s = this.pens[c]).endIndex) <= t || (s = this.pens[c], r = i ? s.wrapText : s.plainText, h = s.prop, t <= (o = s.startIndex) && a <= e || (r = r.substring(t - o, e - o)), this.tagToTextScope ? u += this.tagToText.call(this.tagToTextScope, r, h, l) : u += this.tagToText(r, h, l), l = h, !(e <= a))); c++) ;
                    return u
                }
            }]), a
        }(), Ht = {}, Ut = Phaser.Geom.Rectangle, Nt = new Rt, Jt = function () {
            function t() {
                B(this, t), this.hitAreas = []
            }

            return m(t, [{
                key: "destroy", value: function () {
                    this.clear()
                }
            }, {
                key: "clear", value: function () {
                    return Nt.pushMultiple(this.hitAreas), this
                }
            }, {
                key: "add", value: function (t, e, i, n, s) {
                    var r = Nt.pop();
                    return null === r ? r = new Ut(e, i, n, s) : r.setTo(e, i, n, s), r.key = t, this.hitAreas.push(r), this
                }
            }, {
                key: "getFirstHitArea", value: function (t, e) {
                    for (var i, n = this.hitAreas, s = 0, r = n.length; s < r; s++) if ((i = n[s]).contains(t, e)) return i;
                    return null
                }
            }, {
                key: "drawBounds", value: function (t, e, i) {
                    void 0 === e && (e = 16777215), i && t.save().scaleCanvas(i.scaleX, i.scaleY).rotateCanvas(i.rotation).translateCanvas(i.x, i.y);
                    for (var n, s = this.hitAreas, r = 0, o = s.length; r < o; r++) n = s[r], t.lineStyle(1, e).strokeRect(n.x, n.y, n.width, n.height);
                    return i && t.restore(), this
                }
            }]), t
        }(), Kt = function (t, e, i, n) {
            var s = this.hitAreaManager.getFirstHitArea(i, n);
            if (null !== s) {
                var r = s.key;
                this.parent.emit("".concat(t, "-").concat(r), e, i, n), this.parent.emit(t, r, e, i, n)
            }
        }, Zt = xt, qt = Ct, $t = wt, Qt = St, te = Pt, ee = Ot, ie = [], ne = new Rt;
    ne.newline = function (t, e, i) {
        var n = this.pop();
        return null === n && (n = {}), n.text = t, n.width = e, n.newLineMode = i, n
    };
    var se = Phaser.Utils.Objects.GetValue, re = St, oe = xt, ae = function () {
        function i(t) {
            B(this, i), this.parent = t.parent, this.context = se(t, "context", null), this.canvas = this.context.canvas, this.parser = se(t, "parser", null), this.defaultStyle = se(t, "style", null), this.autoRound = !0, this.pensPool = se(t, "pensPool", null), this.penManager = this.newPenManager(), this._tmpPenManager = null, this.hitAreaManager = new Jt;
            var e = this.context;
            this.getTextWidth = function (t) {
                return e.measureText(t).width
            }
        }

        return m(i, [{
            key: "destroy", value: function () {
                this.context = void 0, this.canvas = void 0, this.parser = void 0, this.defaultStyle = void 0, this.penManager && (this.penManager.destroy(), this.penManager = void 0), this._tmpPenManager && (this._tmpPenManager.destroy(), this._tmpPenManager = void 0), this.hitAreaManager && (this.hitAreaManager.destroy(), this.hitAreaManager = void 0)
            }
        }, {
            key: "updatePenManager", value: function (t, e, i, n, s) {
                if (void 0 === s && (s = this.penManager), s.freePens(), "" === t) return s;
                if (this.parent.style.isWrapFitMode) {
                    var r = this.parent.padding;
                    i = this.parent.style.fixedWidth - r.left - r.right
                }
                for (var o, a, h, l, u, c = this.canvas, d = this.context, f = 0, p = 0, v = this.parser.splitText(t), g = 0, y = v.length; g < y; g++) if (o = (l = this.parser.tagTextToProp(v[g], a)).plainText, (a = l.prop).img) {
                    var k = this.imageManager.getOuterWidth(a.img);
                    0 < i && e !== re && i < f + k && (s.addNewLinePen(), p += n, f = 0), s.addImagePen(f, p, k, vt(a)), f += k
                } else if ("" !== o) {
                    d.save(), (h = this.parser.propToContextStyle(this.defaultStyle, a)).buildFont(), h.syncFont(c, d), h.syncStyle(c, d);
                    for (var m, b = 0, x = (u = yt(o, function (t) {
                        return d.measureText(t).width
                    }, e, i, f)).length; b < x; b++) m = u[b], s.addTextPen(m.text, f, p, m.width, vt(a), m.newLineMode), m.newLineMode !== oe ? (f = 0, p += n) : f += m.width;
                    d.restore()
                }
                return s
            }
        }, {
            key: "startXOffset", get: function () {
                return this.defaultStyle.strokeThickness / 2
            }
        }, {
            key: "startYOffset", get: function () {
                var t = this.defaultStyle;
                return t.strokeThickness / 2 + t.metrics.ascent
            }
        }, {
            key: "lines", get: function () {
                return this.penManager.lines
            }
        }, {
            key: "desplayLinesCount", get: function () {
                var t = this.penManager.linesCount, e = this.defaultStyle.maxLines;
                return 0 < e && e < t && (t = e), t
            }
        }, {
            key: "linesWidth", get: function () {
                return this.penManager.getMaxLineWidth()
            }
        }, {
            key: "linesHeight", get: function () {
                var t = this.desplayLinesCount, e = this.defaultStyle.lineHeight * t;
                return 0 < t && (e -= this.defaultStyle.lineSpacing), e
            }
        }, {
            key: "imageManager", get: function () {
                return this.parent.imageManager
            }
        }, {
            key: "newPenManager", value: function () {
                return new Gt({
                    pensPool: this.pensPool,
                    tagToText: this.parser.propToTagText,
                    tagToTextScope: this.parser
                })
            }
        }, {
            key: "tmpPenManager", get: function () {
                return null === this._tmpPenManager && (this._tmpPenManager = this.newPenManager()), this._tmpPenManager
            }
        }, {
            key: "getPlainText", value: function (t, e, i) {
                var n;
                if (null == t) n = this.penManager.plainText; else {
                    var s = this.parser.splitText(t, 1);
                    n = "";
                    for (var r = 0, o = s.length; r < o; r++) n += s[r]
                }
                return null == e && null == i || (null == e && (e = 0), null == i && (i = n.length), n = n.substring(e, i)), n
            }
        }, {
            key: "getPenManager", value: function (t, e) {
                if (void 0 === t) return this.copyPenManager(e, this.penManager);
                void 0 === e && (e = this.newPenManager());
                var i = this.defaultStyle;
                return this.updatePenManager(t, i.wrapMode, i.wrapWidth, i.lineHeight, e), e
            }
        }, {
            key: "getText", value: function (t, e, i, n) {
                if (null == t) return this.penManager.getSliceTagText(e, i, n);
                var s = this.tmpPenManager, r = this.defaultStyle;
                return this.updatePenManager(t, r.wrapMode, r.wrapWidth, r.lineHeight, s), s.getSliceTagText(e, i, n)
            }
        }, {
            key: "copyPenManager", value: function (t, e) {
                return void 0 === e && (e = this.penManager), e.copy(t)
            }
        }, {
            key: "getTextWidth", value: function (t) {
                return void 0 === t && (t = this.penManager), t.getMaxLineWidth()
            }
        }, {
            key: "getLastPen", value: function (t) {
                return void 0 === t && (t = this.penManager), t.lastPen
            }
        }]), i
    }(), he = {
        setInteractive: function () {
            this.parent.on("pointerdown", function (t, e, i, n) {
                Kt.call(this, "areadown", t, e, i)
            }, this).on("pointerup", function (t, e, i, n) {
                Kt.call(this, "areaup", t, e, i)
            }, this)
        }
    };
    Object.assign(ae.prototype, jt, he);

    function le(t, e) {
        void 0 === e && (e = {key: t}), e.hasOwnProperty("key") || (e.key = t);
        var i = e.key, n = e.frame, s = e.width, r = e.height;
        if (void 0 === s || void 0 === r) {
            var o = this.textureManager.getFrame(i, n), a = o ? o.cutWidth : 0, h = o ? o.cutHeight : 0;
            void 0 === s && void 0 === r ? (s = a, r = h) : void 0 === s ? s = a * (r / h) : void 0 === r && (r = h * (s / a))
        }
        this.images[t] = {
            key: i,
            frame: n,
            width: s,
            height: r,
            y: ue(e, "y", 0),
            left: ue(e, "left", 0),
            right: ue(e, "right", 0)
        }
    }

    var ue = Phaser.Utils.Objects.GetValue, ce = function () {
        function e(t) {
            B(this, e), this.textureManager = t.textures, this.images = {}
        }

        return m(e, [{
            key: "destroy", value: function () {
                this.textureManager = void 0, this.images = void 0
            }
        }, {
            key: "add", value: function (t, e) {
                if ("string" == typeof t) le.call(this, t, e); else if (Array.isArray(t)) for (var i = 0, n = (s = t).length; i < n; i++) le.call(this, s[i]); else {
                    var s = t;
                    for (var t in s) le.call(this, t, s[t])
                }
                return this
            }
        }, {
            key: "has", value: function (t) {
                return this.images.hasOwnProperty(t)
            }
        }, {
            key: "remove", value: function (t) {
                return this.has(t) && delete this.images[t], this
            }
        }, {
            key: "get", value: function (t) {
                return this.images.hasOwnProperty(t) || this.textureManager.exists(t) && this.add(t), this.images[t]
            }
        }, {
            key: "getOuterWidth", value: function (t) {
                var e = this.get(t);
                return e ? e.width + e.left + e.right : 0
            }
        }, {
            key: "getFrame", value: function (t) {
                var e = this.get(t);
                return e ? this.textureManager.getFrame(e.key, e.frame) : void 0
            }
        }, {
            key: "hasTexture", value: function (t) {
                return !!this.getFrame(t)
            }
        }]), e
    }(), de = {
        draw: function (t, e, i, n, s) {
            var r = this.get(t);
            i += r.left, n += r.y, s && (i = Math.round(i), n = Math.round(n));
            var o = this.textureManager.getFrame(r.key, r.frame);
            e.drawImage(o.source.image, o.cutX, o.cutY, o.cutWidth, o.cutHeight, i, n, r.width, r.height)
        }
    };
    Object.assign(ce.prototype, de);
    var fe = Phaser.Utils.Objects.IsPlainObject, pe = Phaser.DOM.AddToDOM, ve = Phaser.Display.Canvas.CanvasPool,
        ge = Phaser.GameObjects.GameObject, ye = Phaser.Utils.Objects.GetValue, ke = Phaser.DOM.RemoveFromDOM, me = Ot,
        be = {}, xe = function () {
            b(c, ge);
            var u = w(c);

            function c(t, e, i, n, s, r, o) {
                var a;
                if (B(this, c), fe(e)) {
                    var h = e;
                    e = ye(h, "x", 0), i = ye(h, "y", 0), n = ye(h, "text", ""), s = ye(h, "style", "")
                }
                if (void 0 === e && (e = 0), void 0 === i && (i = 0), (a = u.call(this, t, r)).renderer = t.sys.game.renderer, a.setPosition(e, i), a.setOrigin(0, 0), a.initPipeline(), a.canvas = ve.create(z(a)), a.context = a.canvas.getContext("2d"), s) {
                    if (s.hasOwnProperty("align")) {
                        var l = s.align;
                        delete s.align, s.halign = l
                    }
                    s.hasOwnProperty("stroke") && !s.hasOwnProperty("strokeThickness") && (s.strokeThickness = 1)
                }
                return a.style = new Bt(z(a), s), a.autoRound = !0, a._text = void 0, a.padding = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }, a.width = 1, a.height = 1, a.dirty = !1, 0 === a.style.resolution && (a.style.resolution = 1), a._crop = a.resetCropObject(), a.texture = t.sys.textures.addCanvas(null, a.canvas, !0), a.frame = a.texture.get(), a.frame.source.resolution = a.style.resolution, a.renderer.gl && (a.renderer.deleteTexture(a.frame.source.glTexture), a.frame.source.glTexture = null), be.hasOwnProperty(r) || (be[r] = new Rt), a.canvasText = new ae({
                    parent: z(a),
                    context: a.context,
                    parser: o,
                    style: a.style,
                    pensPool: be[r]
                }), s && s.padding && a.setPadding(s.padding), a._imageManager = void 0, a.setText(n), t.sys.game.events.on("contextrestored", function () {
                    this.dirty = !0
                }, z(a)), a
            }

            return m(c, [{
                key: "text", get: function () {
                    return this._text
                }, set: function (t) {
                    this.setText(t)
                }
            }, {
                key: "initRTL", value: function () {
                    this.style.rtl && (this.canvas.dir = "rtl", this.context.direction = "rtl", this.canvas.style.display = "none", pe(this.canvas, this.scene.sys.canvas), this.originX = 1)
                }
            }, {
                key: "setText", value: function (t) {
                    return t || 0 === t || (t = ""), Array.isArray(t) && (t = t.join("\n")), t !== this._text && (this._text = t.toString(), this.updateText()), this
                }
            }, {
                key: "setStyle", value: function (t) {
                    return this.style.setStyle(t)
                }
            }, {
                key: "setFont", value: function (t) {
                    return this.style.setFont(t)
                }
            }, {
                key: "setFontFamily", value: function (t) {
                    return this.style.setFontFamily(t)
                }
            }, {
                key: "setFontSize", value: function (t) {
                    return this.style.setFontSize(t)
                }
            }, {
                key: "setFontStyle", value: function (t) {
                    return this.style.setFontStyle(t)
                }
            }, {
                key: "setFixedSize", value: function (t, e) {
                    return this.style.setFixedSize(t, e)
                }
            }, {
                key: "setBackgroundColor", value: function (t, e, i) {
                    return this.style.setBackgroundColor(t, e, i)
                }
            }, {
                key: "setBackgroundStrokeColor", value: function (t, e) {
                    return this.style.setBackgroundStrokeColor(t, e)
                }
            }, {
                key: "setBackgroundCornerRadius", value: function (t, e) {
                    return this.style.setBackgroundCornerRadius(t, e)
                }
            }, {
                key: "setFill", value: function (t) {
                    return this.style.setFill(t)
                }
            }, {
                key: "setColor", value: function (t) {
                    return this.style.setColor(t)
                }
            }, {
                key: "setStroke", value: function (t, e) {
                    return this.style.setStroke(t, e)
                }
            }, {
                key: "setShadow", value: function (t, e, i, n, s, r) {
                    return this.style.setShadow(t, e, i, n, s, r)
                }
            }, {
                key: "setShadowOffset", value: function (t, e) {
                    return this.style.setShadowOffset(t, e)
                }
            }, {
                key: "setShadowColor", value: function (t) {
                    return this.style.setShadowColor(t)
                }
            }, {
                key: "setShadowBlur", value: function (t) {
                    return this.style.setShadowBlur(t)
                }
            }, {
                key: "setShadowStroke", value: function (t) {
                    return this.style.setShadowStroke(t)
                }
            }, {
                key: "setShadowFill", value: function (t) {
                    return this.style.setShadowFill(t)
                }
            }, {
                key: "setWrapMode", value: function (t) {
                    return this.style.setWrapMode(t)
                }
            }, {
                key: "setWrapWidth", value: function (t) {
                    return this.style.setWrapWidth(t)
                }
            }, {
                key: "setAlign", value: function (t) {
                    return this.style.setHAlign(t)
                }
            }, {
                key: "setLineSpacing", value: function (t) {
                    return this.style.setLineSpacing(t)
                }
            }, {
                key: "setPadding", value: function (t, e, i, n) {
                    if ("object" === p(t)) {
                        var s = t, r = ye(s, "x", null);
                        i = null !== r ? t = r : (t = ye(s, "left", 0), ye(s, "right", t));
                        var o = ye(s, "y", null);
                        n = null !== o ? e = o : (e = ye(s, "top", 0), ye(s, "bottom", e))
                    } else void 0 === t && (t = 0), void 0 === e && (e = t), void 0 === i && (i = t), void 0 === n && (n = e);
                    return this.padding.left = t, this.padding.top = e, this.padding.right = i, this.padding.bottom = n, this.updateText(!1)
                }
            }, {
                key: "setResolution", value: function (t) {
                    return this.style.setResolution(t)
                }
            }, {
                key: "setMaxLines", value: function (t) {
                    return this.style.setMaxLines(t)
                }
            }, {
                key: "updateText", value: function (t) {
                    void 0 === t && (t = !0);
                    var e = this.canvasText, i = this.style;
                    t && e.updatePenManager(this._text, i.wrapMode, i.wrapWidth, i.lineHeight);
                    var n, s, r = this.padding;
                    0 === i.fixedWidth ? (this.width = e.linesWidth + r.left + r.right, n = e.linesWidth) : (this.width = i.fixedWidth, (n = this.width - r.left - r.right) < e.linesWidth && (n = e.linesWidth)), 0 === i.fixedHeight ? (this.height = e.linesHeight + r.top + r.bottom, s = e.linesHeight) : (this.height = i.fixedHeight, (s = this.height - r.top - r.bottom) < e.linesHeight && (s = e.linesHeight));
                    var o = this.width, a = this.height;
                    this.updateDisplayOrigin();
                    var h = i.resolution;
                    o *= h, a *= h, o = Math.max(Math.ceil(o), 1), a = Math.max(Math.ceil(a), 1);
                    var l = this.canvas, u = this.context;
                    l.width !== o || l.height !== a ? (l.width = o, l.height = a, this.frame.setSize(o, a)) : u.clearRect(0, 0, o, a), u.save(), u.scale(h, h), e.draw(r.left, r.top, n, s), u.restore(), this.renderer.gl && (this.frame.source.glTexture = this.renderer.canvasToTexture(l, this.frame.source.glTexture, !0), this.frame.glTexture = this.frame.source.glTexture), this.dirty = !0;
                    var c = this.input;
                    return c && !c.customHitArea && (c.hitArea.width = this.width, c.hitArea.height = this.height), this
                }
            }, {
                key: "getTextMetrics", value: function () {
                    return this.style.getTextMetrics()
                }
            }, {
                key: "toJSON", value: function () {
                    var t = Ce.ToJSON(this), e = {
                        autoRound: this.autoRound,
                        text: this._text,
                        style: this.style.toJSON(),
                        resolution: this.resolution,
                        padding: {
                            left: this.padding.left,
                            right: this.padding.right,
                            top: this.padding.top,
                            bottom: this.padding.bottom
                        }
                    };
                    return t.data = e, t
                }
            }, {
                key: "preDestroy", value: function () {
                    this.style.rtl && ke(this.canvas), ve.remove(this.canvas), this.canvasText.destroy(), this.canvasText = void 0, this._imageManager && (this._imageManager.destroy(), this._imageManager = void 0)
                }
            }, {
                key: "setInteractive", value: function (t, e, i) {
                    return ge.prototype.setInteractive.call(this, t, e, i), this.canvasText.setInteractive(), this
                }
            }, {
                key: "getWrappedText", value: function (t, e, i) {
                    return (t = this.canvasText.getText(t, e, i, !0)).split(me)
                }
            }, {
                key: "getPlainText", value: function (t, e, i) {
                    return this.canvasText.getPlainText(t, e, i)
                }
            }, {
                key: "getText", value: function (t, e, i) {
                    return this.canvasText.getText(t, e, i, !1)
                }
            }, {
                key: "getSubString", value: function (t, e, i) {
                    return this.getText(t, e, i)
                }
            }, {
                key: "copyPenManager", value: function (t) {
                    return this.canvasText.copyPenManager(t)
                }
            }, {
                key: "getPenManager", value: function (t, e) {
                    return this.canvasText.getPenManager(t, e)
                }
            }, {
                key: "setSize", value: function (t, e) {
                    return this.setFixedSize(t, e)
                }
            }, {
                key: "resize", value: function (t, e) {
                    return this.setFixedSize(t, e)
                }
            }, {
                key: "lineSpacing", get: function () {
                    return this.style.lineSpacing
                }, set: function (t) {
                    this.setLineSpacing(t)
                }
            }, {
                key: "imageManager", get: function () {
                    return this._imageManager || (this._imageManager = new ce(this.scene)), this._imageManager
                }
            }, {
                key: "addImage", value: function (t, e) {
                    return this.imageManager.add(t, e), this
                }
            }, {
                key: "drawAreaBounds", value: function (t, e) {
                    return this.canvasText.hitAreaManager.drawBounds(t, e, this), this
                }
            }]), c
        }(), Ce = Phaser.GameObjects.Components;
    Phaser.Class.mixin(xe, [Ce.Alpha, Ce.BlendMode, Ce.ComputedSize, Ce.Crop, Ce.Depth, Ce.Flip, Ce.GetBounds, Ce.Mask, Ce.Origin, Ce.Pipeline, Ce.ScrollFactor, Ce.Tint, Ce.Transform, Ce.Visible, mt]);
    var we = {plainText: null, prevProp: null}, Se = new Bt, Pe = {}, Te = {
            splitText: function (t, e) {
                for (var i = [], n = 0; ;) {
                    var s = _e.exec(t);
                    if (!s) {
                        var r = t.length;
                        return n < r && i.push(t.substring(n, r)), i
                    }
                    var o = s[0], a = _e.lastIndex - o.length;
                    n < a && i.push(t.substring(n, a)), void 0 === e && i.push(o), n = _e.lastIndex
                }
            }, tagTextToProp: function (t, e) {
                var i, n;
                null == e && (e = {}), e.img && Oe(e, $e, "img"), i = Ee.test(t) ? (Oe(e, Qe, "b", !0), "") : Be.test(t) ? (Oe(e, $e, "b"), "") : ze.test(t) ? (Oe(e, Qe, "i", !0), "") : je.test(t) ? (Oe(e, $e, "i"), "") : Re.test(t) ? (n = t.match(Re), Oe(e, Qe, "size", "".concat(n[1], "px")), "") : De.test(t) ? (Oe(e, $e, "size"), "") : Le.test(t) ? (n = t.match(Le), Oe(e, Qe, "color", n[1]), "") : Ie.test(t) ? (Oe(e, $e, "color"), "") : Ye.test(t) ? (n = t.match(Ye), Oe(e, Qe, "u", !0), "") : Ae.test(t) ? (n = t.match(Ae), Oe(e, Qe, "u", n[1]), "") : Fe.test(t) ? (Oe(e, $e, "u"), "") : We.test(t) ? (Oe(e, Qe, "shadow", !0), "") : Ve.test(t) ? (Oe(e, $e, "shadow"), "") : Xe.test(t) ? (Oe(e, Qe, "stroke", !0), "") : Ge.test(t) ? (n = t.match(Ge), Oe(e, Qe, "stroke", n[1]), "") : He.test(t) ? (Oe(e, $e, "stroke"), "") : Ue.test(t) ? (n = t.match(Ue), Oe(e, Qe, "y", parseFloat(n[1])), "") : Ne.test(t) ? (Oe(e, $e, "y"), "") : Je.test(t) ? (n = t.match(Je), Oe(e, Qe, "img", n[1]), "") : Ke.test(t) ? (Oe(e, $e, "img"), "") : Ze.test(t) ? (n = t.match(Ze), Oe(e, Qe, "area", n[1]), "") : qe.test(t) ? (Oe(e, $e, "area"), "") : t;
                var s = we;
                return s.plainText = i, s.prop = e, s
            }, propToContextStyle: function (t, e) {
                var i = Se;
                if (e.hasOwnProperty("img")) i.image = e.img; else {
                    if (i.image = null, e.hasOwnProperty("family") ? i.fontFamily = e.family : i.fontFamily = t.fontFamily, e.hasOwnProperty("size")) {
                        var n = e.size;
                        "number" == typeof n && (n = "".concat(n, "px")), i.fontSize = n
                    } else i.fontSize = t.fontSize;
                    i.fontStyle = Me(e.b, e.i), e.hasOwnProperty("color") ? i.color = e.color : i.color = t.color, e.hasOwnProperty("stroke") ? (!0 === e.stroke ? i.stroke = t.stroke : i.stroke = e.stroke, i.strokeThickness = t.strokeThickness) : (i.stroke = t.stroke, i.strokeThickness = 0)
                }
                return e.hasOwnProperty("shadow") ? (!0 === e.shadow ? i.shadowColor = t.shadowColor : i.shadowColor = e.shadow, i.shadowOffsetX = t.shadowOffsetX, i.shadowOffsetY = t.shadowOffsetY, i.shadowBlur = t.shadowBlur, i.shadowStroke = !0, i.shadowFill = !0) : (i.shadowColor = "#000", i.shadowOffsetX = 0, i.shadowOffsetY = 0, i.shadowBlur = 0, i.shadowStroke = !1, i.shadowFill = !1), e.hasOwnProperty("u") ? (!0 === e.u ? i.underlineColor = t.underlineColor : i.underlineColor = e.u, i.underlineThickness = t.underlineThickness, i.underlineOffset = t.underlineOffset) : (i.underlineColor = "#000", i.underlineThickness = 0, i.underlineOffset = 0), i
            }, propToTagText: function (t, e, i) {
                null == i && (i = Pe);
                var n = [];
                for (var s in i) e.hasOwnProperty(s) || n.push("[/".concat(s, "]"));
                for (var s in e) {
                    var r = e[s];
                    if (i[s] !== r) switch (s) {
                        case"size":
                            n.push("[size=".concat(r.replace("px", ""), "]"));
                            break;
                        case"color":
                        case"stroke":
                        case"img":
                        case"y":
                            n.push("[".concat(s, "=").concat(r, "]"));
                            break;
                        case"u":
                            !0 === r ? n.push("[u]") : n.push("[u=".concat(r, "]"));
                            break;
                        default:
                            n.push("[".concat(s, "]"))
                    }
                }
                return n.push(t), n.join("")
            }
        }, Oe = function (t, e, i, n) {
            return e === Qe ? t[i] = n : t.hasOwnProperty(i) && delete t[i], t
        }, Me = function (t, e) {
            return t && e ? "bold italic" : t ? "bold" : e ? "italic" : ""
        },
        _e = /\[b\]|\[\/b\]|\[i\]|\[\/i\]|\[size=(\d+)\]|\[\/size\]|\[color=([a-z]+|#[0-9abcdef]+)\]|\[\/color\]|\[u\]|\[u=([a-z]+|#[0-9abcdef]+)\]|\[\/u\]|\[shadow\]|\[\/shadow\]|\[stroke\]|\[stroke=([a-z]+|#[0-9abcdef]+)\]|\[\/stroke\]|\[img=([^\]]+)\]|\[\/img\]|\[area=([^\]]+)\]|\[\/area\]|\[y=([-.0-9]+)\]|\[\/y\]/gi,
        Ee = /\[b\]/i, Be = /\[\/b\]/i, ze = /\[i\]/i, je = /\[\/i\]/i, Re = /\[size=(\d+)\]/i, De = /\[\/size\]/i,
        Le = /\[color=([a-z]+|#[0-9abcdef]+)\]/i, Ie = /\[\/color\]/i, Ye = /\[u\]/i,
        Ae = /\[u=([a-z]+|#[0-9abcdef]+)\]/i, Fe = /\[\/u\]/i, We = /\[shadow\]/i, Ve = /\[\/shadow\]/i,
        Xe = /\[stroke\]/i, Ge = /\[stroke=([a-z]+|#[0-9abcdef]+)\]/i, He = /\[\/stroke\]/i, Ue = /\[y=([-.0-9]+)\]/i,
        Ne = /\[\/y\]/i, Je = /\[img=([^\]]+)\]/i, Ke = /\[\/img\]/i, Ze = /\[area=([^\]]+)\]/i, qe = /\[\/area\]/i,
        $e = !1, Qe = !0, ti = function () {
            b(o, xe);
            var r = w(o);

            function o(t, e, i, n, s) {
                return B(this, o), r.call(this, t, e, i, n, s, "rexBBCodeText", Te)
            }

            return o
        }();
    u.register("BBCodeText", function (t, e, i, n) {
        var s = new ti(this.scene, t, e, i, n);
        return this.scene.add.existing(s), s
    }), H(window, "RexPlugins.UI.BBCodeText", ti);
    var ei = {plainText: null, prevProp: null}, ii = new Bt, ni = function () {
            function e(t) {
                B(this, e), void 0 === t && (t = {}), this.tags = t
            }

            return m(e, [{
                key: "addTag", value: function (t, e) {
                    this.tags[t] = e
                }
            }, {
                key: "splitText", value: function (t, e) {
                    for (var i = [], n = 0; ;) {
                        var s = oi.exec(t);
                        if (!s) {
                            var r = t.length;
                            return n < r && i.push(t.substring(n, r)), i
                        }
                        var o = s[0], a = oi.lastIndex - o.length;
                        if (n < a && i.push(t.substring(n, a)), void 0 === e) i.push(o); else if (1 === e) if (ai.test(o)) {
                            var h = o.match(hi);
                            i.push(h[2])
                        } else if (li.test(o)) {
                            h = o.match(ui);
                            i.push(h[2])
                        }
                        n = oi.lastIndex
                    }
                }
            }, {
                key: "tagTextToProp", value: function (t) {
                    var e, i;
                    if (ai.test(t)) {
                        if (null != (r = t.match(hi))) {
                            var n = r[1], s = this.tags;
                            (i = s.hasOwnProperty(n) ? s[n] : {})._class = n, e = r[2]
                        }
                    } else if (li.test(t)) {
                        var r;
                        if (null != (r = t.match(ui))) {
                            var o = r[1];
                            (i = si(o))._style = o, e = r[2]
                        }
                    }
                    null == e && (e = t), null == i && (i = {});
                    var a = ei;
                    return a.plainText = e, a.prop = i, a
                }
            }, {
                key: "propToContextStyle", value: function (t, e) {
                    var i = ii;
                    if (e.hasOwnProperty("img")) i.image = e.img; else {
                        if (i.image = null, e.hasOwnProperty("family") || e.hasOwnProperty("fontFamily") || e.hasOwnProperty("font-family")) {
                            var n = e.hasOwnProperty("family") ? e.family : e.hasOwnProperty("fontFamily") ? e.fontFamily : e["font-family"];
                            i.fontFamily = n
                        } else i.fontFamily = t.fontFamily;
                        if (e.hasOwnProperty("size") || e.hasOwnProperty("fontSize") || e.hasOwnProperty("font-size")) {
                            var s = e.hasOwnProperty("size") ? e.size : e.hasOwnProperty("fontSize") ? e.fontSize : e["font-size"];
                            "number" == typeof s && (s = "".concat(s, "px")), i.fontSize = s
                        } else i.fontSize = t.fontSize;
                        if (e.hasOwnProperty("style") || e.hasOwnProperty("fontStyle") || e.hasOwnProperty("font-style")) {
                            var r = e.hasOwnProperty("style") ? e.style : e.hasOwnProperty("fontStyle") ? e.fontStyle : e["font-style"];
                            i.fontStyle = r
                        } else i.fontStyle = t.fontStyle;
                        if (e.hasOwnProperty("color") || e.hasOwnProperty("font-color")) {
                            var o = e.hasOwnProperty("color") ? e.color : e["font-color"];
                            i.color = o
                        } else i.color = t.color;
                        if (e.hasOwnProperty("stroke")) {
                            var a = e.stroke;
                            i.stroke = a.hasOwnProperty("color") ? a.color : t.stroke, i.strokeThickness = a.hasOwnProperty("thinkness") ? a.thinkness : t.strokeThickness
                        } else i.stroke = t.stroke, i.strokeThickness = t.strokeThickness
                    }
                    if (e.hasOwnProperty("shadow")) {
                        var h = e.shadow;
                        i.shadowColor = h.hasOwnProperty("color") ? h.color : t.shadowColor, i.shadowOffsetX = h.hasOwnProperty("offsetX") ? h.offsetX : t.shadowOffsetX, i.shadowOffsetY = h.hasOwnProperty("offsetY") ? h.offsetY : t.shadowOffsetY, i.shadowBlur = h.hasOwnProperty("blur") ? h.blur : t.shadowBlur, i.shadowStroke = !0, i.shadowFill = !0
                    } else i.shadowColor = t.shadowColor, i.shadowOffsetX = t.shadowOffsetX, i.shadowOffsetY = t.shadowOffsetY, i.shadowBlur = t.shadowBlur, i.shadowStroke = t.shadowStroke, i.shadowFill = t.shadowFill;
                    if (e.hasOwnProperty("u") || e.hasOwnProperty("underline")) {
                        var l = e.hasOwnProperty("u") ? e.u : e.underline;
                        i.underlineColor = l.hasOwnProperty("color") ? l.color : t.underlineColor, i.underlineThickness = l.hasOwnProperty("thinkness") ? l.thinkness : t.underlineThickness, i.underlineOffset = l.hasOwnProperty("offset") ? l.offset : t.underlineOffset
                    } else i.underlineColor = t.underlineColor, i.underlineThickness = t.underlineThickness, i.underlineOffset = t.underlineOffset;
                    return i
                }
            }, {
                key: "propToTagText", value: function (t, e) {
                    return e.hasOwnProperty("_class") ? "" === t && this.isTextTag(e._class) ? "" : "<class='".concat(e._class, "'>").concat(t, "</class>") : e.hasOwnProperty("_style") ? "<style='".concat(e._style, "'>").concat(t, "</style>") : t
                }
            }, {
                key: "destroy", value: function () {
                    this.tags = void 0
                }
            }, {
                key: "isTextTag", value: function (t) {
                    var e = this.tags[t];
                    return !!e && null == e.img
                }
            }]), e
        }(), si = function (t) {
            for (var e, i, n, s = {}, r = 0, o = (t = t.split(";")).length; r < o; r++) if (i = (e = t[r].split(":"))[0], n = e[1], !ri(i) && !ri(n)) {
                switch (i) {
                    case"stroke":
                        var a = n.split(" ");
                        n = {}, 1 <= (l = a.length) && (n.color = a[0]), 2 <= l && (n.thinkness = parseInt(a[1].replace("px", "")));
                        break;
                    case"shadow":
                        var h = n.split(" ");
                        n = {}, 1 <= (l = h.length) && (n.color = h[0]), 2 <= l && (n.offsetX = parseInt(h[1].replace("px", ""))), 3 <= l && (n.offsetY = parseInt(h[2].replace("px", ""))), 4 <= l && (n.blur = parseInt(h[3].replace("px", "")));
                        break;
                    case"u":
                    case"underline":
                        var l, u = n.split(" ");
                        n = {}, 1 <= (l = u.length) && (n.color = u[0]), 2 <= l && (n.thinkness = parseInt(u[1].replace("px", ""))), 3 <= l && (n.offset = parseInt(u[2].replace("px", "")));
                        break;
                    case"y":
                        n = parseFloat(n)
                }
                s[i] = n
            }
            return s
        }, ri = function (t) {
            return 0 === (t = t.replace(ci, "")).length
        },
        oi = /<\s*class=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/class\s*\>|<\s*style=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/style\s*\>/g,
        ai = /<\s*class=/i, hi = /<\s*class=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/class\s*\>/, li = /<\s*style=/i,
        ui = /<\s*style=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/style\s*\>/, ci = /^\s+|\s+$/,
        di = Phaser.Utils.Objects.GetValue, fi = function () {
            b(l, xe);
            var h = w(l);

            function l(t, e, i, n, s) {
                var r;
                B(this, l);
                var o = di(s, "tags", void 0), a = new ni(o);
                return (r = h.call(this, t, e, i, n, s, "rexTagText", a)).parser = a, r
            }

            return m(l, [{
                key: "addTag", value: function (t, e) {
                    return this.parser.addTag(t, e), this.updateText(!0)
                }
            }, {
                key: "addTags", value: function (t) {
                    for (var e in t) this.parser.addTag(e, t[e]);
                    return this.updateText(!0)
                }
            }, {
                key: "preDestroy", value: function () {
                    C(x(l.prototype), "preDestroy", this).call(this), this.parser.destroy(), this.parser = void 0
                }
            }]), l
        }();
    u.register("tagText", function (t, e, i, n) {
        var s = new fi(this.scene, t, e, i, n);
        return this.scene.add.existing(s), s
    }), H(window, "RexPlugins.UI.TagText", fi);
    var pi = Phaser.GameObjects.Zone, vi = Phaser.Utils.Array.Add, gi = Phaser.Utils.Array.Remove, yi = function () {
        b(a, pi);
        var o = w(a);

        function a(t, e, i, n, s) {
            var r;
            return B(this, a), void 0 === n && (n = 1), void 0 === s && (s = 1), (r = o.call(this, t, e, i, n, s)).children = [], r
        }

        return m(a, [{
            key: "destroy", value: function (t) {
                this.scene && (this.clear(!t), C(x(a.prototype), "destroy", this).call(this, t))
            }
        }, {
            key: "contains", value: function (t) {
                return -1 !== this.children.indexOf(t)
            }
        }, {
            key: "add", value: function (t) {
                return vi(this.children, t, 0, function (t) {
                    t.on("destroy", this.remove, this)
                }, this), this
            }
        }, {
            key: "remove", value: function (t, e) {
                return gi(this.children, t, function (t) {
                    t.off("destroy", this.remove, this), e && t.destroy()
                }), this
            }
        }, {
            key: "clear", value: function (t) {
                for (var e, i = 0, n = this.children.length; i < n; i++) (e = this.children[i]).off("destroy", this.remove, this), t && e.destroy();
                return this.children.length = 0, this
            }
        }]), a
    }(), ki = Phaser.GameObjects.Components;
    Phaser.Class.mixin(yi, [ki.Alpha, ki.Flip]);

    function mi(t) {
        var e;
        return t.hasOwnProperty("rexContainer") && (e = t.rexContainer.parent), e
    }

    function bi(t) {
        for (var e = mi(t); e;) e = mi(t = e);
        return t
    }

    function xi(t) {
        return t.hasOwnProperty("rexContainer") || (t.rexContainer = {}), t.rexContainer
    }

    function Ci(t) {
        return this.setParent(t), this.resetChildState(t).updateChildVisible(t).updateChildActive(t).updateChildScrollFactor(t).updateChildMask(t), Oi.call(this, t), this
    }

    function wi(t) {
        this.setParent(t);
        var e = xi(t);
        return e.x = t.x, e.y = t.y, e.rotation = t.rotation, e.scaleX = t.scaleX, e.scaleY = t.scaleY, e.flipX = t.flipX, e.flipY = t.flipY, e.alpha = t.alpha, e.visible = t.visible, e.active = t.active, this.updateChildPosition(t).updateChildAlpha(t).updateChildVisible(t).updateChildActive(t).updateChildScrollFactor(t).updateChildMask(t), Oi.call(this, t), this
    }

    function Si(t, e) {
        return t === e ? 1 : t / e
    }

    function Pi(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }

    var Ti = {
        setParent: function (t, e) {
            void 0 === e && (e = this);
            var i = xi(t);
            return e ? (i.parent = e, i.self = t) : (i.parent = null, i.self = null), this
        }, getParent: function (t) {
            return void 0 === t && (t = this), mi(t)
        }, getTopmostParent: function (t) {
            return void 0 === t && (t = this), bi(t)
        }
    }, Oi = yi.prototype.add, Mi = {
        add: function (t) {
            return Array.isArray(t) ? this.addMultiple(t) : Ci.call(this, t), this
        }, addMultiple: function (t) {
            for (var e = 0, i = t.length; e < i; e++) Ci.call(this, t[e]);
            return this
        }, addLocal: function (t) {
            return Array.isArray(t) ? this.addMultiple(t) : wi.call(this, t), this
        }, addLocalMultiple: function (t) {
            for (var e = 0, i = t.length; e < i; e++) wi.call(this, t[e]);
            return this
        }
    }, _i = yi.prototype.remove, Ei = yi.prototype.clear, Bi = {
        remove: function (t, e) {
            return mi(t) !== this || (this.setParent(t, null), _i.call(this, t, e)), this
        }, clear: function (t) {
            for (var e = 0, i = this.children.length; e < i; e++) this.setParent(this.children[e], null);
            return Ei.call(this, t), this
        }
    }, zi = {
        getLocalState: function (t) {
            return xi(t)
        }, resetChildState: function (t) {
            return this.resetChildPositionState(t).resetChildVisibleState(t).resetChildAlphaState(t).resetChildActiveState(t), this
        }, resetChildrenState: function (t) {
            for (var e = 0, i = t.length; e < i; e++) this.resetChildState(t[e]);
            return this
        }, syncProperties: function () {
            return this.syncPosition().syncVisible().syncAlpha().syncActive().syncScrollFactor().syncMask(), this
        }
    }, ji = Phaser.Math.RotateAround, Ri = {
        worldToLocal: function (t) {
            return t.x -= this.x, t.y -= this.y, ji(t, 0, 0, -this.rotation), t.x /= this.scaleX, t.y /= this.scaleY, t.x *= this.flipX ? -1 : 1, t.y *= this.flipY ? -1 : 1, t
        }, localToWorld: function (t) {
            return t.x *= this.flipX ? -1 : 1, t.y *= this.flipY ? -1 : 1, t.x *= this.scaleX, t.y *= this.scaleY, ji(t, 0, 0, this.rotation), t.x += this.x, t.y += this.y, t
        }
    }, Di = {
        updateChildPosition: function (t) {
            t.isRexContainerLite && (t.syncChildrenEnable = !1);
            var e = xi(t), i = e.parent;
            return t.x = e.x, t.y = e.y, i.localToWorld(t), t.scaleX = e.scaleX * i.scaleX, t.scaleY = e.scaleY * i.scaleY, void 0 !== t.flipX && (t.flipX = i.flipX ? !e.flipX : e.flipX, t.flipY = i.flipY ? !e.flipY : e.flipY), t.rotation = e.rotation + i.rotation, t.isRexContainerLite && (t.syncChildrenEnable = !0, t.syncPosition()), this
        }, syncPosition: function () {
            return this.syncChildrenEnable && this.children.forEach(this.updateChildPosition, this), this
        }, resetChildPositionState: function (t) {
            var e = xi(t), i = e.parent;
            return e.x = t.x, e.y = t.y, i.worldToLocal(e), e.scaleX = Si(t.scaleX, i.scaleX), e.scaleY = Si(t.scaleY, i.scaleY), void 0 !== t.flipX && (e.flipX = t.flipX, e.flipY = t.flipY), e.rotation = t.rotation - i.rotation, this
        }, setChildPosition: function (t, e, i) {
            return t.x = e, t.y = i, this.resetChildPositionState(t), this
        }, setChildLocalPosition: function (t, e, i) {
            var n = xi(t);
            return n.x = e, n.y = i, this.updateChildPosition(t), this
        }
    }, Li = {
        updateChildRotation: function (t) {
            var e = xi(t), i = e.parent;
            return t.rotation = i.rotation + e.rotation, this
        }, syncRotation: function () {
            return this.syncChildrenEnable && this.children.forEach(this.updateChildRotation, this), this
        }, resetChildRotationState: function (t) {
            var e = xi(t), i = e.parent;
            return e.rotation = t.rotation - i.rotation, this
        }, setChildRotation: function (t, e) {
            return t.rotation = e, this.resetChildRotationState(t), this
        }, setChildLocalRotation: function (t, e) {
            return xi(t).rotation = e, this.updateChildRotation(t), this
        }
    }, Ii = {
        updateChildScale: function (t) {
            var e = xi(t), i = e.parent;
            return t.scaleX = i.scaleX * e.scaleX, t.scaleY = i.scaleY * e.scaleY, this
        }, syncScale: function () {
            return this.syncChildrenEnable && this.children.forEach(this.updateChildScale, this), this
        }, resetChildScaleState: function (t) {
            var e = xi(t), i = e.parent;
            return e.scaleX = Si(t.scaleX, i.scaleX), e.scaleY = Si(t.scaleY, i.scaleY), this
        }, setChildScale: function (t, e, i) {
            return void 0 === i && (i = e), t.scaleX = e, t.scaleY = i, this.resetChildScaleState(t), this
        }, setChildLocalScale: function (t, e, i) {
            void 0 === i && (i = e);
            var n = xi(t);
            return n.scaleX = e, n.scaleY = i, this.updateChildScale(t), this
        }, setChildDisplaySize: function (t, e, i) {
            return t.setDisplaySize(e, i), this.resetChildScaleState(t), this
        }
    }, Yi = {
        updateChildVisible: function (t) {
            var e = xi(t), i = e.parent, n = !e.hasOwnProperty("maskVisible") || e.maskVisible;
            return t.visible = i.visible && e.visible && n, this
        }, syncVisible: function () {
            return this.syncChildrenEnable && this.children.forEach(this.updateChildVisible, this), this
        }, resetChildVisibleState: function (t) {
            var e = xi(t);
            return e.hasOwnProperty("maskVisible") && delete e.maskVisible, e.visible = t.visible, this
        }, setChildVisible: function (t, e) {
            return this.setChildLocalVisible(t, e), this
        }, setChildLocalVisible: function (t, e) {
            return void 0 === e && (e = !0), xi(t).visible = e, this.updateChildVisible(t), this
        }, setChildMaskVisible: function (t, e) {
            return void 0 === e && (e = !0), xi(t).maskVisible = e, this.updateChildVisible(t), this
        }
    }, Ai = {
        updateChildAlpha: function (t) {
            var e = xi(t), i = e.parent;
            return t.alpha = i.alpha * e.alpha, this
        }, syncAlpha: function () {
            return this.syncChildrenEnable && this.children.forEach(this.updateChildAlpha, this), this
        }, resetChildAlphaState: function (t) {
            var e = xi(t), i = e.parent;
            return e.alpha = Si(t.alpha, i.alpha), this
        }, setChildAlpha: function (t, e) {
            return t.alpha = e, this.resetChildAlphaState(t), this
        }, setChildLocalAlpha: function (t, e) {
            return xi(t).alpha = e, this.updateChildAlpha(t), this
        }
    }, Fi = {
        updateChildActive: function (t) {
            var e = xi(t), i = e.parent;
            return t.active = i.active && e.active, this
        }, syncActive: function () {
            return this.syncChildrenEnable && this.children.forEach(this.updateChildActive, this), this
        }, resetChildActiveState: function (t) {
            return xi(t).active = t.active, this
        }, setChildActive: function (t, e) {
            return t.active = e, this.resetChildActiveState(t), this
        }, setChildLocalActive: function (t, e) {
            return void 0 === e && (e = !0), xi(t).active = e, this.updateChildActive(t), this
        }
    }, Wi = {
        updateChildScrollFactor: function (t) {
            var e = xi(t).parent;
            return t.setScrollFactor(e.scrollFactorX, e.scrollFactorY), this
        }, syncScrollFactor: function () {
            return this.syncChildrenEnable && this.children.forEach(this.updateChildScrollFactor, this), this
        }
    }, Vi = {
        updateChildMask: function (t) {
            return null == this.mask || (this.mask.hasOwnProperty("geometryMask") ? this.mask.geometryMask : this.mask.bitmapMask) !== t && (t.mask = this.mask), this
        }, syncMask: function () {
            return this.syncChildrenEnable && this.children.forEach(this.updateChildMask, this), this
        }, setMask: function (t) {
            return this.mask = t, this
        }, clearMask: function (t) {
            return void 0 === t && (t = !1), t && this.mask && this.mask.destroy(), this.mask = null, this
        }
    }, Xi = Phaser.Utils.Array, Gi = {
        getChildren: function () {
            return this.children
        }, getAllChildren: function (t) {
            void 0 === t && (t = []);
            for (var e, i = this.children, n = 0, s = i.length; n < s; n++) {
                if (e = i[n], t.push(e), e.hasOwnProperty("isRexContainerLite")) t.push.apply(t, h(e.getAllChildren()))
            }
            return t
        }, getAllVisibleChildren: function (t) {
            void 0 === t && (t = []);
            for (var e, i = this.children, n = 0, s = i.length; n < s; n++) {
                if ((e = i[n]).visible) if (t.push(e), e.hasOwnProperty("isRexContainerLite")) t.push.apply(t, h(e.getAllVisibleChildren()))
            }
            return t
        }, contains: function (t) {
            var e = mi(t);
            return !!e && (e === this || this.contains(e))
        }, getByName: function (t, e) {
            if (e) {
                for (var i, n, s = [this]; s.length;) for (var r = 0, o = (i = s.shift()).children.length; r < o; r++) {
                    if ((n = i.children[r]).name === t) return n;
                    n.isRexContainerLite && s.push(n)
                }
                return null
            }
            return Xi.GetFirst(this.children, "name", t)
        }, getRandom: function (t, e) {
            return Xi.GetRandom(this.children, t, e)
        }, getFirst: function (t, e, i, n) {
            return Xi.GetFirstElement(this.children, t, e, i, n)
        }, getAll: function (t, e, i, n) {
            return Xi.GetAll(this.children, t, e, i, n)
        }, count: function (t, e, i, n) {
            return Xi.CountAllMatching(this.children, t, e, i, n)
        }, swap: function (t, e) {
            return Xi.Swap(this.children, t, e), this
        }, moveTo: function (t, e) {
            return Xi.MoveTo(this.children, t, e), this
        }, setAll: function (t, e, i, n) {
            return Xi.SetAll(this.children, t, e, i, n), this
        }
    }, Hi = {
        tweenChild: function (t) {
            var e = t.targets;
            Pi(e) || (e = [e]);
            for (var i, n, s = [], r = 0, o = e.length; r < o; r++) (n = e[r]).hasOwnProperty("rexContainer") && (i = n.scene, s.push(n.rexContainer));
            if (i) {
                t.targets = s;
                var a = i.tweens.add(t);
                return a.on("update", function (t, e, i) {
                    var n = i.parent, s = i.self;
                    switch (e) {
                        case"x":
                        case"y":
                            n.updateChildPosition(s);
                            break;
                        case"angle":
                        case"rotation":
                            n.updateChildRotation(s);
                            break;
                        case"scaleX":
                        case"scaleY":
                            n.updateChildScale(s);
                            break;
                        case"alpha":
                            n.updateChildAlpha(s)
                    }
                }), a
            }
        }, tween: function (t) {
            var e = this.scene;
            return t.targets || (t.targets = this), e.tweens.add(t)
        }
    }, Ui = {};
    Object.assign(Ui, Ti, Mi, Bi, zi, Ri, Di, Li, Ii, Yi, Ai, Fi, Wi, Vi, {
        setDepth: function (t, e) {
            if (this.depth = t, !e && this.children) for (var i = this.getAllChildren(), n = 0, s = i.length; n < s; n++) i[n].depth = t;
            return this
        }, swapDepth: function (t) {
            var e = this.depth, i = t.depth;
            return this.setDepth(i), t.setDepth(e), this
        }, incDepth: function (t) {
            if (this.depth += t, this.children) for (var e = this.getAllChildren(), i = 0, n = e.length; i < n; i++) e[i].depth += t;
            return this
        }
    }, Gi, Hi);
    var Ni = function () {
        b(h, yi);
        var a = w(h);

        function h(t, e, i, n, s, r) {
            var o;
            return B(this, h), (o = a.call(this, t, e, i, n, s)).type = "rexContainerLite", o.isRexContainerLite = !0, o.syncChildrenEnable = !0, o._active = !0, o._mask = null, o._scrollFactorX = 1, o._scrollFactorY = 1, r && o.add(r), o
        }

        return m(h, [{
            key: "destroy", value: function (t) {
                this.scene && (this.syncChildrenEnable = !1, C(x(h.prototype), "destroy", this).call(this, t))
            }
        }, {
            key: "resize", value: function (t, e) {
                return this.setSize(t, e), this
            }
        }, {
            key: "x", get: function () {
                return this._x
            }, set: function (t) {
                this._x !== t && (this._x = t, this.syncPosition())
            }
        }, {
            key: "y", get: function () {
                return this._y
            }, set: function (t) {
                this._y !== t && (this._y = t, this.syncPosition())
            }
        }, {
            key: "rotation", get: function () {
                return C(x(h.prototype), "rotation", this)
            }, set: function (t) {
                this.rotation !== t && (e(x(h.prototype), "rotation", t, this, !0), this.syncPosition())
            }
        }, {
            key: "scaleX", get: function () {
                return C(x(h.prototype), "scaleX", this)
            }, set: function (t) {
                this.scaleX !== t && (e(x(h.prototype), "scaleX", t, this, !0), this.syncPosition())
            }
        }, {
            key: "scaleY", get: function () {
                return C(x(h.prototype), "scaleY", this)
            }, set: function (t) {
                this.scaleY !== t && (e(x(h.prototype), "scaleY", t, this, !0), this.syncPosition())
            }
        }, {
            key: "flipX", get: function () {
                return C(x(h.prototype), "flipX", this)
            }, set: function (t) {
                C(x(h.prototype), "flipX", this) !== t && (e(x(h.prototype), "flipX", t, this, !0), this.syncPosition())
            }
        }, {
            key: "flipY", get: function () {
                return C(x(h.prototype), "flipY", this)
            }, set: function (t) {
                C(x(h.prototype), "flipY", this) !== t && (e(x(h.prototype), "flipY", t, this, !0), this.syncPosition())
            }
        }, {
            key: "visible", get: function () {
                return C(x(h.prototype), "visible", this)
            }, set: function (t) {
                C(x(h.prototype), "visible", this) !== t && (e(x(h.prototype), "visible", t, this, !0), this.syncVisible())
            }
        }, {
            key: "alpha", get: function () {
                return C(x(h.prototype), "alpha", this)
            }, set: function (t) {
                C(x(h.prototype), "alpha", this) !== t && (e(x(h.prototype), "alpha", t, this, !0), this.syncAlpha())
            }
        }, {
            key: "active", get: function () {
                return this._active
            }, set: function (t) {
                this._active !== t && (this._active = t, this.syncActive())
            }
        }, {
            key: "mask", get: function () {
                return this._mask
            }, set: function (t) {
                this._mask !== t && (this._mask = t, this.syncMask())
            }
        }, {
            key: "scrollFactorX", get: function () {
                return this._scrollFactorX
            }, set: function (t) {
                this._scrollFactorX !== t && (this._scrollFactorX = t, this.syncScrollFactor())
            }
        }, {
            key: "scrollFactorY", get: function () {
                return this._scrollFactorY
            }, set: function (t) {
                this._scrollFactorY !== t && (this._scrollFactorY = t, this.syncScrollFactor())
            }
        }, {
            key: "list", get: function () {
                return this.children
            }
        }]), h
    }();
    Object.assign(Ni.prototype, Ui), u.register("container", function (t, e, i, n, s) {
        var r = new Ni(this.scene, t, e, i, n, s);
        return this.scene.add.existing(r), r
    }), H(window, "RexPlugins.UI.Container", Ni), u.register("canvas", function (t, e, i, n) {
        var s = new Q(this.scene, t, e, i, n);
        return this.scene.add.existing(s), s
    }), H(window, "RexPlugins.UI.Canvas", Q);
    var Ji = Phaser.Utils.Objects.GetValue, Ki = function () {
        b(h, Q);
        var a = w(h);

        function h(t, e, i, n, s, r) {
            var o;
            return B(this, h), (o = a.call(this, t, e, i)).type = "rexCircleMaskImage", o.setTexture(n, s, r), o
        }

        return m(h, [{
            key: "setTexture", value: function (t, e, i) {
                var n, s;
                if ("object" === p(e) && (i = e, e = void 0), s = "string" == typeof i ? void (n = i) : (n = Ji(i, "maskType", 0), Ji(i, "backgroundColor", void 0)), void 0 === n ? n = 0 : "string" == typeof n && (n = Zi[n]), this._textureKey = t, this._frameName = e, null === n) return this.loadTexture(t, e), this.dirty = !0, this;
                var r = null != s;
                r || this.loadTexture(t, e);
                var o = this.canvas, a = this.context, h = o.width, l = o.height;
                switch (a.save(), a.globalCompositeOperation = r ? "source-over" : "destination-in", a.beginPath(), n) {
                    case 2:
                        var u = Ji(i, "radius", 0), c = Ji(i, "iteration", void 0);
                        it(a, 0, 0, h, l, u, c);
                        break;
                    default:
                        var d = Math.floor(h / 2), f = Math.floor(l / 2);
                        0 === n ? a.arc(d, f, Math.min(d, f), 0, 2 * Math.PI) : a.ellipse(d, f, d, f, 0, 0, 2 * Math.PI)
                }
                return r && (a.fillStyle = s), a.fill(), a.restore(), r && (a.save(), a.globalCompositeOperation = "destination-atop", this.loadTexture(t, e), a.restore()), this.dirty = !0, this
            }
        }]), h
    }(), Zi = {circle: 0, ellipse: 1, roundRectangle: 2};
    u.register("circleMaskImage", function (t, e, i, n, s) {
        var r = new Ki(this.scene, t, e, i, n, s);
        return this.scene.add.existing(r), r
    }), H(window, "RexPlugins.UI.CircleMaskImage", Ki);
    var qi = function (t, e, i) {
        if (t && "number" != typeof t) {
            if (t.hasOwnProperty(e)) return t[e];
            if (-1 === e.indexOf(".")) return i;
            for (var n = e.split("."), s = t, r = i, o = 0; o < n.length; o++) {
                if (!s.hasOwnProperty(n[o])) {
                    r = i;
                    break
                }
                r = s[n[o]], s = s[n[o]]
            }
            return r
        }
        return i
    }, $i = {
        enableData: function () {
            return void 0 === this.data && (this.data = {}), this
        }, getData: function (t, e) {
            return this.enableData(), void 0 === t ? this.data : qi(this.data, t, e)
        }, setData: function (t, e) {
            if (this.enableData(), 1 === arguments.length) {
                var i = t;
                for (t in i) this.data[t] = i[t]
            } else this.data[t] = e;
            return this
        }, incData: function (t, e, i) {
            return void 0 === i && (i = 0), this.enableData(), this.setData(t, this.getData(t, i) + e), this
        }, mulData: function (t, e, i) {
            return void 0 === i && (i = 0), this.enableData(), this.setData(t, this.getData(t, i) * e), this
        }, clearData: function () {
            return this.data && pt(this.data), this
        }, resetData: function (t) {
            if (this.clearData(), t) for (var e in this.enableData(), t) this.data[e] = t[e];
            return this
        }, cloneData: function () {
            return this.data ? vt(this.data) : {}
        }
    }, Qi = Phaser.Math.DegToRad, tn = Phaser.Math.RadToDeg, en = Phaser.Utils.Objects.GetValue, nn = function () {
        function i(t, e) {
            B(this, i), this.setParent(t), this.type = e, this.setActive().setVisible().setAlpha(1).setPosition(0, 0).setRotation(0).setScale(1, 1).setLeftSpace(0).setRightSpace(0).setOrigin(0).setDrawBelowCallback().setDrawAboveCallback(), this.originX = 0, this.offsetX = 0, this.offsetY = 0
        }

        return m(i, [{
            key: "setParent", value: function (t) {
                return this.parent = t, this
            }
        }, {
            key: "scene", get: function () {
                return this.parent.scene
            }
        }, {
            key: "canvas", get: function () {
                return this.parent ? this.parent.canvas : null
            }
        }, {
            key: "context", get: function () {
                return this.parent ? this.parent.context : null
            }
        }, {
            key: "setDirty", value: function (t) {
                return t && this.parent && (this.parent.dirty = !0), this
            }
        }, {
            key: "active", get: function () {
                return this._active
            }, set: function (t) {
                this.setDirty(this._active != t), this._active = t
            }
        }, {
            key: "setActive", value: function (t) {
                return void 0 === t && (t = !0), this.active = t, this
            }
        }, {
            key: "visible", get: function () {
                return this._visible
            }, set: function (t) {
                this.setDirty(this._visible != t), this._visible = t
            }
        }, {
            key: "setVisible", value: function (t) {
                return void 0 === t && (t = !0), this.visible = t, this
            }
        }, {
            key: "alpha", get: function () {
                return this._alpha
            }, set: function (t) {
                this.setDirty(this._alpha != t), this._alpha = t
            }
        }, {
            key: "setAlpha", value: function (t) {
                return this.alpha = t, this
            }
        }, {
            key: "x", get: function () {
                return this._x
            }, set: function (t) {
                this.setDirty(this._x != t), this._x = t
            }
        }, {
            key: "setX", value: function (t) {
                return this.x = t, this
            }
        }, {
            key: "y", get: function () {
                return this._y
            }, set: function (t) {
                this.setDirty(this._y != t), this._y = t
            }
        }, {
            key: "setY", value: function (t) {
                return this.y = t, this
            }
        }, {
            key: "setPosition", value: function (t, e) {
                return this.x = t, this.y = e, this
            }
        }, {
            key: "rotation", get: function () {
                return this._rotation
            }, set: function (t) {
                this.setDirty(this._rotation != t), this._rotation = t
            }
        }, {
            key: "setRotation", value: function (t) {
                return this.rotation = t, this
            }
        }, {
            key: "angle", get: function () {
                return tn(this._rotation)
            }, set: function (t) {
                this.rotation = Qi(t)
            }
        }, {
            key: "setAngle", value: function (t) {
                return this.angle = t, this
            }
        }, {
            key: "scaleX", get: function () {
                return this._scaleX
            }, set: function (t) {
                this.setDirty(this._scaleX !== t), this._scaleX = t
            }
        }, {
            key: "setScaleX", value: function (t) {
                return this.scaleX = t, this
            }
        }, {
            key: "width", get: function () {
                return 0
            }, set: function () {
            }
        }, {
            key: "setWidth", value: function (t, e) {
                return void 0 === e && (e = !1), this.width = t, e && (this.scaleY = this.scaleX), this
            }
        }, {
            key: "leftSpace", get: function () {
                return this._leftSpace
            }, set: function (t) {
                this.setDirty(this._leftSpace !== t), this._leftSpace = t
            }
        }, {
            key: "setLeftSpace", value: function (t) {
                return this.leftSpace = t, this
            }
        }, {
            key: "rightSpace", get: function () {
                return this._rightSpace
            }, set: function (t) {
                this.setDirty(this._rightSpace !== t), this._rightSpace = t
            }
        }, {
            key: "setRightSpace", value: function (t) {
                return this.rightSpace = t, this
            }
        }, {
            key: "outerWidth", get: function () {
                return this.width + this.leftSpace + this.rightSpace
            }
        }, {
            key: "scaleY", get: function () {
                return this._scaleY
            }, set: function (t) {
                this.setDirty(this._scaleY !== t), this._scaleY = t
            }
        }, {
            key: "setScaleY", value: function (t) {
                return this.scaleY = t, this
            }
        }, {
            key: "height", get: function () {
                return 0
            }, set: function () {
            }
        }, {
            key: "setHeight", value: function (t, e) {
                return void 0 === e && (e = !1), this.height = t, e && (this.scaleX = this.scaleY), this
            }
        }, {
            key: "setScale", value: function (t, e) {
                return void 0 === e && (e = t), this.scaleX = t, this.scaleY = e, this
            }
        }, {
            key: "modifyPorperties", value: function (t) {
                if (!t) return this;
                t.hasOwnProperty("x") && this.setX(t.x), t.hasOwnProperty("y") && this.setY(t.y), t.hasOwnProperty("rotation") ? this.setRotation(t.rotation) : t.hasOwnProperty("angle") && this.setAngle(t.angle), t.hasOwnProperty("alpha") && this.setAlpha(t.alpha);
                var e = en(t, "width", void 0), i = en(t, "height", void 0), n = en(t, "scaleX", void 0),
                    s = en(t, "scaleY", void 0);
                return void 0 !== e && (void 0 === i && void 0 === s ? this.setWidth(e, !0) : this.setWidth(e)), void 0 !== i && (void 0 === e && void 0 === n ? this.setHeight(i, !0) : this.setHeight(i)), void 0 !== n && void 0 === e && this.setScaleX(n), void 0 !== s && void 0 === i && this.setScaleY(s), t.hasOwnProperty("leftSpace") && this.setLeftSpace(t.leftSpace), t.hasOwnProperty("rightSpace") && this.setLeftSpace(t.rightSpace), this
            }
        }, {
            key: "setOrigin", value: function (t) {
                return this.originX = t, this
            }
        }, {
            key: "setDrawBelowCallback", value: function (t) {
                return this.drawBelowCallback = t, this
            }
        }, {
            key: "setDrawAboveCallback", value: function (t) {
                return this.drawAboveCallback = t, this
            }
        }, {
            key: "onFree", value: function () {
                this.setParent().setVisible().setAlpha(1).setPosition(0, 0).setRotation(0).setScale(1, 1).setLeftSpace(0).setRightSpace(0).setOrigin(0).setDrawBelowCallback().setDrawAboveCallback()
            }
        }, {
            key: "drawContent", value: function () {
            }
        }, {
            key: "draw", value: function () {
                var t = this.context;
                t.save();
                var e = this.x + this.leftSpace + this.offsetX - this.originX * this.width, i = this.y + this.offsetY;
                this.autoRound && (e = Math.round(e), i = Math.round(i)), t.translate(e, i), t.globalAlpha = this.alpha, t.scale(this.scaleX, this.scaleY), t.rotate(this.rotation), this.drawBelowCallback && this.drawBelowCallback.call(this), this.drawContent(), this.drawAboveCallback && this.drawAboveCallback.call(this), t.restore()
            }
        }]), i
    }();
    Object.assign(nn.prototype, $i);

    function sn(t, e, i) {
        return e.hasOwnProperty(t) ? e[t] : i[t]
    }

    function rn(t, e) {
        return void 0 === e ? t : t[e]
    }

    function on(t, e, i) {
        var n = p(e);
        "string" === n ? t[e] = i : "number" === n ? (t.left = e, t.right = e, t.top = e, t.bottom = e) : (t.left = Cn(e, "left", 0), t.right = Cn(e, "right", 0), t.top = Cn(e, "top", 0), t.bottom = Cn(e, "bottom", 0))
    }

    function an(t) {
        var e = t.type;
        return e === wn || e === Sn
    }

    function hn(t) {
        return t.type === wn && "\n" === t.text
    }

    function ln(t, e) {
        e && this.textStyle.modify(e);
        for (var i = this.lastAppendedChildren.length = 0, n = t.length; i < n; i++) {
            var s = t.charAt(i), r = this.poolManager.allocate(wn);
            null === r ? r = new Tn(this, s, this.textStyle) : r.setParent(this).setActive().modifyStyle(this.textStyle).setText(s), this.children.push(r), this.lastAppendedChildren.push(r)
        }
        return this
    }

    function un(t, e, i) {
        var n = this.poolManager.allocate(Sn);
        return null === n ? n = new On(this, t, e) : n.setParent(this).setActive().setTexture(t, e), n.modifyPorperties(i), this.lastAppendedChildren.length = 0, this.children.push(n), this.lastAppendedChildren.push(n), this
    }

    function cn(t, e, i, n) {
        var s = this.poolManager.allocate(Pn);
        return null === s ? s = new Mn(this, t, e, i, n) : s.setParent(this).setActive().setName(t).setCallback(e, n).setParameter(i), this.lastAppendedChildren.length = 0, this.children.push(s), this.lastAppendedChildren.push(s), this
    }

    function dn(t, e) {
        if (!e) return t;
        for (var i in null == t && (t = {}), e) t.hasOwnProperty(i) || (t[i] = e[i]);
        return t
    }

    function fn(t, e, i, n) {
        void 0 === n && (n = {word: [], width: 0}), n.word.length = 0;
        for (var s = t.length, r = e, o = n.word, a = 0; r < s;) {
            var h = t[r];
            if (h.type !== wn || " " === h.text || "\n" === h.text) {
                r === e && (o.push(h), a += h.outerWidth);
                break
            }
            if (o.push(h), a += h.outerWidth, r++, i) break
        }
        return n.width = a, n
    }

    function pn(t) {
        var e, i = Bn(t, "start", 0), n = Bn(t, "padding.top", 0), s = Bn(t, "padding.bottom", 0),
            r = Bn(t, "lineHeight", void 0);
        if (void 0 === r) e = Bn(t, "maxLines", 0), r = 0 < this.fixedHeight ? (o = this.fixedHeight - this.padding.top - this.padding.bottom - n - s) / e : 0; else if (0 < this.fixedHeight) {
            if (void 0 === (e = Bn(t, "maxLines", void 0))) {
                var o = this.fixedHeight - this.padding.top - this.padding.bottom - n - s;
                e = Math.floor(o / r)
            }
        } else e = Bn(t, "maxLines", 0);
        var a = 0 === e, h = Bn(t, "wrapWidth", void 0);
        void 0 === h && (h = 0 < this.fixedWidth ? this.fixedWidth - this.padding.left - this.padding.right : 1 / 0);
        for (var l = Bn(t, "letterSpacing", 0), u = Bn(t, "hAlign", 0), c = Bn(t, "vAlign", 0), d = Bn(t, "charWrap", !1), f = {
            start: i,
            isLastPage: !1,
            padding: {top: n, bottom: s},
            lineHeight: r,
            maxLines: e,
            wrapWidth: h,
            letterSpacing: l,
            hAlign: u,
            vAlign: c,
            charWrap: d,
            children: [],
            lines: [],
            maxLineWidth: 0,
            linesHeight: 0
        }, p = this.children, v = 0, g = p.length; v < g; v++) p[v].setActive(!1);
        h += l;
        for (var y, k = this.padding.left, m = k, b = this.padding.top + r + n, x = h, C = i, w = p.length, S = f.children, P = f.lines, T = [], O = 0, M = 0; C < w;) {
            var _ = p[C];
            if (an(_)) {
                var E = (y = fn(p, C, d, y)).word, B = E.length, z = y.width + B * l;
                C += B;
                var j = hn(E[0]);
                if (x < z || j) {
                    if (j) (R = E[0]).setActive().setPosition(m, b), S.push(R), T.push(R);
                    if (m = k, b += r, x = h, P.push({
                        children: T,
                        width: O
                    }), M = Math.max(M, O), O = 0, T = [], !a && P.length === e) break;
                    if (j) continue
                }
                x -= z, O += z;
                for (v = 0, g = E.length; v < g; v++) {
                    var R;
                    (R = E[v]).setActive().setPosition(m, b), S.push(R), T.push(R), m += R.outerWidth + l
                }
            } else C++, _.setActive(), S.push(_), T.push(_)
        }
        0 < T.length && (P.push({
            children: T,
            width: O
        }), M = Math.max(M, O)), f.start += S.length, f.isLastPage = f.start === w, f.maxLineWidth = M, f.linesHeight = P.length * r + n + s;
        var D = 0 < this.fixedWidth ? this.fixedWidth : f.maxLineWidth + this.padding.left + this.padding.right,
            L = 0 < this.fixedHeight ? this.fixedHeight : f.linesHeight + this.padding.top + this.padding.bottom;
        return function (t, e, i) {
            var n = t.hAlign, s = t.vAlign;
            if ("string" == typeof n && (n = _n[n], t.hAlign = n), "string" == typeof s && (s = En[s], t.vAlign = s), 0 !== n) for (var r = t.lines, o = 0, a = r.length; o < a; o++) {
                var h, l = r[o], u = l.width, c = l.children;
                switch (n) {
                    case 1:
                        h = (e - u) / 2;
                        break;
                    case 2:
                        h = e - u
                }
                for (var d = 0, f = c.length; d < f; d++) {
                    c[d].x += h
                }
            }
            if (0 !== s) {
                var p, v = t.linesHeight;
                switch (s) {
                    case 1:
                        p = (i - v) / 2;
                        break;
                    case 2:
                        p = i - v
                }
                for (d = 0, f = (c = t.children).length; d < f; d++) {
                    c[d].y += p
                }
            }
        }(f, D - this.padding.left - this.padding.right, o = L - this.padding.top - this.padding.bottom - n - s), this.setSize(D, L), f
    }

    function vn(t) {
        var e, i = zn(t, "start", 0), n = zn(t, "padding.top", 0), s = zn(t, "padding.bottom", 0),
            r = zn(t, "padding.left", 0), o = zn(t, "padding.right", 0), a = zn(t, "lineWidth", void 0);
        if (void 0 === a) e = zn(t, "maxLines", 0), a = 0 < this.fixedWidth ? (h = this.fixedWidth - this.padding.left - this.padding.right - r - o) / e : 0; else if (0 < this.fixedWidth) {
            if (void 0 === (e = zn(t, "maxLines", void 0))) {
                var h = this.fixedWidth - this.padding.left - this.padding.right;
                e = Math.floor(h / a)
            }
        } else e = zn(t, "maxLines", 0);
        var l = 0 === e, u = zn(t, "fixedChildHeight", void 0);
        if (void 0 === u) {
            var c = zn(t, "charPerLine", void 0);
            if (void 0 !== c) {
                var d = this.fixedHeight - this.padding.top - this.padding.bottom - n - s;
                u = Math.floor(d / c)
            }
        }
        var f = zn(t, "wrapHeight", void 0);
        void 0 === f && (f = 0 < this.fixedHeight ? this.fixedHeight - this.padding.top - this.padding.bottom : 1 / 0);
        for (var p = zn(t, "letterSpacing", 0), v = zn(t, "rtl", !0), g = {
            start: i,
            isLastPage: !1,
            padding: {top: n, bottom: s, left: r, right: o},
            lineWidth: a,
            maxLines: e,
            fixedChildHeight: u,
            wrapHeight: f,
            letterSpacing: p,
            hAlign: zn(t, "hAlign", v ? 2 : 0),
            vAlign: zn(t, "vAlign", 0),
            rtl: v,
            children: [],
            lines: [],
            maxLineHeight: 0,
            linesWidth: 0
        }, y = this.children, k = 0, m = y.length; k < m; k++) y[k].setActive(!1);
        f += p;
        for (var b = this.padding.left + r, x = this.padding.top + n, C = b, w = x, S = f, P = i, T = y.length, O = g.children, M = g.lines, _ = [], E = 0, B = 0; P < T;) {
            var z = y[P];
            if (P++, an(z)) {
                var j = (void 0 !== u ? u : z.height) + p, R = hn(z);
                if (S < j || R) {
                    if (R && (z.setActive().setPosition(C, w).setOrigin(.5), O.push(z), _.push(z)), C = b, w = x, S = f, M.push({
                        children: _,
                        height: E
                    }), B = Math.max(B, E), E = 0, _ = [], !l && M.length === e) break;
                    if (R) continue
                }
                S -= j, E += j, z.setActive().setPosition(C, w).setOrigin(.5), O.push(z), _.push(z), w += j
            } else z.setActive(), O.push(z), _.push(z)
        }
        0 < _.length && (M.push({
            children: _,
            height: E
        }), B = Math.max(B, E)), g.start += O.length, g.isLastPage = g.start === T, g.maxLineHeight = B, g.linesWidth = M.length * a + r + o;
        var D = 0 < this.fixedWidth ? this.fixedWidth : g.linesWidth + this.padding.left + this.padding.right,
            L = 0 < this.fixedHeight ? this.fixedHeight : g.maxLineHeight + this.padding.top + this.padding.bottom;
        return function (t, e, i) {
            var n = t.hAlign, s = t.vAlign;
            "string" == typeof n && (n = _n[n], t.hAlign = n), "string" == typeof s && (s = En[s], t.vAlign = s);
            var r, o = t.rtl, a = t.lines, h = t.lineWidth, l = t.linesWidth;
            switch (n) {
                case 0:
                    r = 0;
                    break;
                case 1:
                    r = (e - l) / 2;
                    break;
                case 2:
                    r = e - l
            }
            o && (r += h);
            for (var u = 0, c = a.length; u < c; u++) {
                var d, f = a[o ? c - u - 1 : u], p = f.children, v = f.height;
                switch (s) {
                    case 0:
                        d = 0;
                        break;
                    case 1:
                        d = (i - v) / 2;
                        break;
                    case 2:
                        d = i - v
                }
                for (var g = 0, y = p.length; g < y; g++) {
                    var k = p[g];
                    k.x += r, k.y += d
                }
                r += h
            }
        }(g, h = D - this.padding.left - this.padding.right - r - o, d = L - this.padding.top - this.padding.bottom - n - s), this.setSize(D, L), g
    }

    var gn = Phaser.Utils.Objects.GetValue, yn = function () {
            b(s, nn);
            var n = w(s);

            function s(t, e) {
                var i;
                return B(this, s), (i = n.call(this, t, "background")).setColor(gn(e, "color", null), gn(e, "color2", null), gn(e, "horizontalGradient", !0)), i.setStroke(gn(e, "stroke", null), gn(e, "strokeThickness", 2)), i.setCornerRadius(gn(e, "cornerRadius", 0), gn(e, "cornerIteration", null)), i
            }

            return m(s, [{
                key: "color", get: function () {
                    return this._color
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.setDirty(this._color != t), this._color = t
                }
            }, {
                key: "color2", get: function () {
                    return this._color2
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.setDirty(this._color2 != t), this._color2 = t
                }
            }, {
                key: "horizontalGradient", get: function () {
                    return this._horizontalGradient
                }, set: function (t) {
                    this.setDirty(this._horizontalGradient != t), this._horizontalGradient = t
                }
            }, {
                key: "setColor", value: function (t, e, i) {
                    return void 0 === i && (i = !0), this.color = t, this.color2 = e, this.horizontalGradient = i, this
                }
            }, {
                key: "stroke", get: function () {
                    return this._stroke
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.setDirty(this._stroke != t), this._stroke = t
                }
            }, {
                key: "strokeThickness", get: function () {
                    return this._strokeThickness
                }, set: function (t) {
                    this.setDirty(this._strokeThickness != t), this._strokeThickness = t
                }
            }, {
                key: "setStroke", value: function (t, e) {
                    return this.stroke = t, this.strokeThickness = e, this
                }
            }, {
                key: "cornerRadius", get: function () {
                    return this._cornerRadius
                }, set: function (t) {
                    this.setDirty(this._cornerRadius != t), this._cornerRadius = t
                }
            }, {
                key: "cornerIteration", get: function () {
                    return this._cornerIteration
                }, set: function (t) {
                    this.setDirty(this._cornerIteration != t), this._cornerIteration = t
                }
            }, {
                key: "setCornerRadius", value: function (t, e) {
                    return this.cornerRadius = t, this.cornerIteration = e, this
                }
            }, {
                key: "drawContent", value: function () {
                    nt(this.parent, this.color, this.stroke, this.strokeThickness, this.cornerRadius, this.color2, this.horizontalGradient, this.cornerIteration)
                }
            }]), s
        }(), kn = Phaser.Utils.Objects.GetValue, mn = function () {
            b(s, nn);
            var n = w(s);

            function s(t, e) {
                var i;
                return B(this, s), (i = n.call(this, t, "background")).setColor(kn(e, "color", null), kn(e, "color2", null), kn(e, "horizontalGradient", !0)), i.setStroke(kn(e, "stroke", null), kn(e, "strokeThickness", 2)), i
            }

            return m(s, [{
                key: "color", get: function () {
                    return this._color
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.setDirty(this._color != t), this._color = t
                }
            }, {
                key: "color2", get: function () {
                    return this._color2
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.setDirty(this._color2 != t), this._color2 = t
                }
            }, {
                key: "horizontalGradient", get: function () {
                    return this._horizontalGradient
                }, set: function (t) {
                    this.setDirty(this._horizontalGradient != t), this._horizontalGradient = t
                }
            }, {
                key: "setColor", value: function (t, e, i) {
                    return void 0 === i && (i = !0), this.color = t, this.color2 = e, this.horizontalGradient = i, this
                }
            }, {
                key: "stroke", get: function () {
                    return this._stroke
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.setDirty(this._stroke != t), this._stroke = t
                }
            }, {
                key: "strokeThickness", get: function () {
                    return this._strokeThickness
                }, set: function (t) {
                    this.setDirty(this._strokeThickness != t), this._strokeThickness = t
                }
            }, {
                key: "setStroke", value: function (t, e) {
                    return this.stroke = t, this.strokeThickness = e, this
                }
            }, {
                key: "drawContent", value: function () {
                    var t = this.parent.padding, e = t.left, i = t.top, n = this.parent.width - t.left - t.right,
                        s = this.parent.height - t.top - t.bottom, r = this.context;
                    if (null != this.color) {
                        var o, a;
                        if (null != this.color2) (a = this.horizontalGradient ? r.createLinearGradient(0, 0, n, 0) : r.createLinearGradient(0, 0, 0, s)).addColorStop(0, this.color), a.addColorStop(1, this.color2), o = a; else o = this.color;
                        r.fillStyle = o, r.fillRect(e, i, n, s)
                    }
                    null != this.stroke && 0 < this.strokeThickness && (r.strokeStyle = this.stroke, r.lineWidth = this.strokeThickness, r.strokeRect(e, i, n, s))
                }
            }]), s
        }(), bn = Phaser.Utils.Objects.GetValue, xn = function () {
            function e(t) {
                B(this, e), this.set(t)
            }

            return m(e, [{
                key: "toJSON", value: function () {
                    return {
                        bold: this.bold,
                        italic: this.italic,
                        fontSize: this.fontSize,
                        fontFamily: this.fontFamily,
                        color: this.color,
                        stroke: this.stroke,
                        strokeThickness: this.strokeThickness,
                        shaodwColor: this.shadowColor,
                        shadowBlur: this.shadowBlur,
                        shadowOffsetX: this.shadowOffsetX,
                        shadowOffsetY: this.shadowOffsetY,
                        offsetX: this.offsetX,
                        offsetY: this.offsetY
                    }
                }
            }, {
                key: "set", value: function (t) {
                    this.setBold(bn(t, "bold", !1)), this.setItalic(bn(t, "italic", !1)), this.setFontSize(bn(t, "fontSize", "16px")), this.setFontFamily(bn(t, "fontFamily", "Courier")), this.setColor(bn(t, "color", "#fff")), this.setStrokeStyle(bn(t, "stroke", null), bn(t, "strokeThickness", 0)), this.setShadow(bn(t, "shadowColor", null), bn(t, "shadowOffsetX", 0), bn(t, "shadowOffsetY", 0), bn(t, "shadowBlur", 0)), this.setOffset(bn(t, "offsetX", 0), bn(t, "offsetY", 0))
                }
            }, {
                key: "modify", value: function (t) {
                    return t.hasOwnProperty("bold") && this.setBold(t.bold), t.hasOwnProperty("italic") && this.setItalic(t.italic), t.hasOwnProperty("fontSize") && this.setFontSize(t.fontSize), t.hasOwnProperty("fontFamily") && this.setFontFamily(t.fontFamily), t.hasOwnProperty("color") && this.setColor(t.color), (t.hasOwnProperty("stroke") || t.hasOwnProperty("strokeThickness")) && this.setStrokeStyle(sn("stroke", t, this), sn("strokeThickness", t, this)), t.hasOwnProperty("shadowColor") && this.setShadowColor(t.shadowColor), (t.hasOwnProperty("shadowOffsetX") || t.hasOwnProperty("shadowOffsetY")) && this.setShadowOffset(sn("shadowOffsetX", t, this), sn("shadowOffsetY", t, this)), t.hasOwnProperty("shadowBlur") && this.setShadowBlur(t.shaodwBlur), t.hasOwnProperty("offsetX") && this.setOffsetX(t.offsetX), t.hasOwnProperty("offsetY") && this.setOffsetY(t.offsetY), this
                }
            }, {
                key: "setBold", value: function (t) {
                    return void 0 === t && (t = !0), this.bold = t, this
                }
            }, {
                key: "setItalic", value: function (t) {
                    return void 0 === t && (t = !0), this.italic = t, this
                }
            }, {
                key: "fontStyle", get: function () {
                    return this.bold && this.italic ? "bold italic" : this.bold ? "bold" : this.italic ? "italic" : ""
                }
            }, {
                key: "setFontSize", value: function (t) {
                    return "number" == typeof t && (t = "".concat(t, "px")), this.fontSize = t, this
                }
            }, {
                key: "setFontFamily", value: function (t) {
                    return this.fontFamily = t, this
                }
            }, {
                key: "font", get: function () {
                    return "".concat(this.fontStyle, " ").concat(this.fontSize, " ").concat(this.fontFamily)
                }
            }, {
                key: "setColor", value: function (t) {
                    return this.color = et(t), this
                }
            }, {
                key: "hasFill", get: function () {
                    return null != this.color
                }
            }, {
                key: "setStrokeStyle", value: function (t, e) {
                    return this.stroke = et(t), void 0 !== e && (this.strokeThickness = e), this
                }
            }, {
                key: "setStrokeThickness", value: function (t) {
                    return this.strokeThickness = t, this
                }
            }, {
                key: "hasStroke", get: function () {
                    return null != this.stroke && 0 < this.strokeThickness
                }
            }, {
                key: "setShadowColor", value: function (t) {
                    return this.shadowColor = et(t), this
                }
            }, {
                key: "setShadowOffset", value: function (t, e) {
                    return this.shadowOffsetX = t, this.shadowOffsetY = e, this
                }
            }, {
                key: "setShadowBlur", value: function (t) {
                    return this.shaodwBlur = t, this
                }
            }, {
                key: "setShadow", value: function (t, e, i, n) {
                    return this.shadowColor = et(t), this.shadowOffsetX = e, this.shadowOffsetY = i, this.shaodwBlur = n, this
                }
            }, {
                key: "setOffsetX", value: function (t) {
                    return this.offsetX = t, this
                }
            }, {
                key: "setOffsetY", value: function (t) {
                    return this.offsetY = t, this
                }
            }, {
                key: "setOffset", value: function (t, e) {
                    return this.offsetX = t, this.offsetY = e, this
                }
            }, {
                key: "syncFont", value: function (t) {
                    return t.font = this.font, this
                }
            }, {
                key: "syncStyle", value: function (t) {
                    t.textBaseline = "alphabetic";
                    var e = this.hasFill, i = this.hasStroke;
                    return t.fillStyle = e ? this.color : "#000", t.strokeStyle = i ? this.stroke : "#000", t.lineWidth = i ? this.strokeThickness : 0, t.lineCap = "round", t.lineJoin = "round", this
                }
            }, {
                key: "syncShadow", value: function (t) {
                    null != t.shadowColor ? (t.shadowColor = this.shadowColor, t.shadowOffsetX = this.shadowOffsetX, t.shadowOffsetY = this.shadowOffsetY, t.shadowBlur = this.shadowBlur) : (t.shadowColor = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowBlur = 0)
                }
            }, {
                key: "getTextMetrics", value: function (t, e) {
                    return this.syncFont(t).syncStyle(t), t.measureText(e)
                }
            }]), e
        }(), Cn = Phaser.Utils.Objects.GetValue, wn = "text", Sn = "image", Pn = "command", Tn = function () {
            b(r, nn);
            var s = w(r);

            function r(t, e, i) {
                var n;
                return B(this, r), (n = s.call(this, t, wn)).style = new xn(i), n.setText(e), n
            }

            return m(r, [{
                key: "autoRound", get: function () {
                    return this.parent.autoRound
                }
            }, {
                key: "offsetX", get: function () {
                    return this.style.offsetX
                }, set: function () {
                }
            }, {
                key: "offsetY", get: function () {
                    return this.style.offsetY
                }, set: function () {
                }
            }, {
                key: "modifyStyle", value: function (t) {
                    return this.setDirty(!0), this.style.modify(t), this
                }
            }, {
                key: "modifyPorperties", value: function (t) {
                    return t && (this.modifyStyle(t), C(x(r.prototype), "modifyPorperties", this).call(this, t)), this
                }
            }, {
                key: "setText", value: function (t) {
                    return this.setDirty(this.text != t), this.text = t, this.updateTextSize(), this
                }
            }, {
                key: "updateTextSize", value: function () {
                    if ("\n" === this.text || "" === this.text) this.textWidth = 0, this.textHeight = 0; else {
                        var t, e, i = this.style.getTextMetrics(this.context, this.text);
                        this.textWidth = i.width, e = i.hasOwnProperty("actualBoundingBoxAscent") ? (t = i.actualBoundingBoxAscent, i.actualBoundingBoxDescent) : t = 0, this.textHeight = t + e
                    }
                    return this
                }
            }, {
                key: "width", get: function () {
                    return this.textWidth * this.scaleX
                }, set: function (t) {
                    0 < this.textWidth ? this.scaleX = t / this.textWidth : this.scaleX = 1
                }
            }, {
                key: "height", get: function () {
                    return this.textHeight * this.scaleY
                }, set: function (t) {
                    0 < this.textHeight ? this.scaleY = t / this.textHeight : this.scaleY = 1
                }
            }, {
                key: "drawContent", value: function () {
                    var t = this.style, e = t.hasFill, i = t.hasStroke;
                    if (e || i) {
                        var n = this.context;
                        t.syncFont(n).syncStyle(n), i && (t.syncShadow(n), n.strokeText(this.text, 0, 0)), e && (t.syncShadow(n), n.fillText(this.text, 0, 0))
                    }
                }
            }, {
                key: "draw", value: function () {
                    if (!this.visible || "" === this.text || "\n" === this.text) return this;
                    C(x(r.prototype), "draw", this).call(this)
                }
            }]), r
        }(), On = function () {
            b(r, nn);
            var s = w(r);

            function r(t, e, i) {
                var n;
                return B(this, r), (n = s.call(this, t, Sn)).setTexture(e, i), n
            }

            return m(r, [{
                key: "frameWidth", get: function () {
                    return this.frameObj ? this.frameObj.cutWidth : 0
                }
            }, {
                key: "frameHeight", get: function () {
                    return this.frameObj ? this.frameObj.cutHeight : 0
                }
            }, {
                key: "offsetY", get: function () {
                    return -this.height
                }, set: function () {
                }
            }, {
                key: "setTexture", value: function (t, e) {
                    return this.key = t, this.frame = e, this.frameObj = this.scene.textures.getFrame(t, e), this
                }
            }, {
                key: "width", get: function () {
                    return this.frameWidth * this.scaleX
                }, set: function (t) {
                    this.setDirty(this.width !== t), this.scaleX = t / this.frameWidth
                }
            }, {
                key: "height", get: function () {
                    return this.frameHeight * this.scaleY
                }, set: function (t) {
                    this.setDirty(this.height !== t), this.scaleY = t / this.frameHeight
                }
            }, {
                key: "setHeight", value: function (t, e) {
                    return void 0 === e && (e = !1), this.height = t, e && (this.scaleX = this.scaleY), this
                }
            }, {
                key: "drawContent", value: function () {
                    var t = this.context, e = this.frameObj;
                    t.drawImage(e.source.image, e.cutX, e.cutY, e.cutWidth, e.cutHeight)
                }
            }, {
                key: "draw", value: function () {
                    if (!this.visible) return this;
                    C(x(r.prototype), "draw", this).call(this)
                }
            }]), r
        }(), Mn = function () {
            b(a, nn);
            var o = w(a);

            function a(t, e, i, n, s) {
                var r;
                return B(this, a), (r = o.call(this, t, Pn)).setName(e).setParameter(n).setCallback(i, s), r
            }

            return m(a, [{
                key: "setName", value: function (t) {
                    return this.name = t, this
                }
            }, {
                key: "setParameter", value: function (t) {
                    return this.param = t, this
                }
            }, {
                key: "setCallback", value: function (t, e) {
                    return this.callback = t, this.scope = e, this
                }
            }, {
                key: "exec", value: function () {
                    return this.scope ? this.callback.call(this.scope, this.param, this.name) : this.callback(this.param, this.name)
                }
            }, {
                key: "draw", value: function () {
                }
            }, {
                key: "onFree", value: function () {
                    C(x(a.prototype), "onFree", this).call(this), this.setName().setCallback().setParameter()
                }
            }]), a
        }(), _n = {left: 0, center: 1, right: 2}, En = {top: 0, center: 1, bottom: 2}, Bn = Phaser.Utils.Objects.GetValue,
        zn = Phaser.Utils.Objects.GetValue, jn = Phaser.Utils.Array.GetAll, Rn = {
            setPadding: function (t, e) {
                var i = this.padding, n = i.left, s = i.right, r = i.top, o = i.bottom;
                return on(this.padding, t, e), this.dirty = this.dirty || n != this.padding.left || s != this.padding.right || r != this.padding.top || o != this.padding.bottom, this
            }, getPadding: function (t) {
                return rn(this.padding, t)
            }, modifyTextStyle: function (t) {
                return this.textStyle.modify(t), this
            }, removeChildren: function () {
                return this.poolManager.freeMultiple(this.children), this.children.length = 0, this.lastAppendedChildren.length = 0, this.dirty = !0, this
            }, setText: function (t, e) {
                return void 0 === t && (t = ""), this.removeChildren(), ln.call(this, t, e), this.dirty = !0, this
            }, appendText: ln, appendImage: un, appendCommand: cn, setWrapConfig: function (t) {
                return this.wrapConfig = t, this
            }, runWordWrap: function (t) {
                return t = dn(t, this.wrapConfig), pn.call(this, t)
            }, runVerticalWrap: function (t) {
                return t = dn(t, this.wrapConfig), vn.call(this, t)
            }, drawContent: function () {
                var t, e = 0 < this.fixedWidth ? this.fixedWidth : this.width,
                    i = 0 < this.fixedHeight ? this.fixedHeight : this.height;
                this.setSize(e, i), this.background.active && this.background.draw();
                for (var n = 0, s = this.children.length; n < s; n++) (t = this.children[n]).active && t.draw();
                this.innerBounds.active && this.innerBounds.draw()
            }, getChildren: function () {
                return this.children
            }, getLastAppendedChildren: function () {
                return this.lastAppendedChildren
            }, getActiveChildren: function () {
                return jn(this.children, "active", !0)
            }
        }, Dn = Phaser.Utils.Objects.GetFastValue, Ln = {}, In = function () {
            function e(t) {
                B(this, e), this.pools = Dn(t, "pools", Ln)
            }

            return m(e, [{
                key: "free", value: function (t) {
                    if (!this.pools) return this;
                    var e = t.type;
                    return this.pools.hasOwnProperty(e) || (this.pools[e] = new Rt), this.pools[e].push(t), t.onFree(), this
                }
            }, {
                key: "freeMultiple", value: function (t) {
                    if (!this.pools) return this;
                    for (var e = 0, i = t.length; e < i; e++) this.free(t[e]);
                    return this
                }
            }, {
                key: "allocate", value: function (t) {
                    return this.pools && this.pools.hasOwnProperty(t) ? this.pools[t].pop() : null
                }
            }]), e
        }(), Yn = Phaser.Utils.Objects.IsPlainObject, An = Phaser.Utils.Objects.GetValue, Fn = function () {
            b(c, Q);
            var u = w(c);

            function c(t, e, i, n, s, r) {
                var o;
                B(this, c), Yn(e) ? (e = An(r = e, "x", 0), i = An(r, "y", 0), n = An(r, "width", 0), s = An(r, "height", 0)) : Yn(n) && (n = An(r = n, "width", 0), s = An(r, "height", 0));
                var a = 0 === n ? 1 : n, h = 0 === s ? 1 : s;
                (o = u.call(this, t, e, i, a, h)).type = "rexDynamicText", o.autoRound = !0, o.padding = {}, o.textStyle = new xn(An(r, "style", void 0)), o.background = new yn(z(o), An(r, "background", void 0)), o.innerBounds = new mn(z(o), An(r, "innerBounds", void 0)), o.children = [], o.lastAppendedChildren = [], o.poolManager = new In(r), o.setFixedSize(n, s), o.setPadding(An(r, "padding", 0)), o.setWrapConfig(An(r, "wrap", void 0));
                var l = An(r, "text", void 0);
                return l && o.setText(l), o
            }

            return m(c, [{
                key: "setFixedSize", value: function (t, e) {
                    return void 0 === t && (t = 0), void 0 === e && (e = 0), 0 < t && 0 < e && this.fixedWidth === t && this.fixedHeight === e || (this.dirty = !0), this.fixedWidth = t, this.fixedHeight = e, this
                }
            }, {
                key: "updateTexture", value: function () {
                    return this.clear(), this.drawContent(), C(x(c.prototype), "updateTexture", this).call(this), this
                }
            }]), c
        }();
    Object.assign(Fn.prototype, Rn), u.register("dynamicText", function (t, e, i, n, s) {
        var r = new Fn(this.scene, t, e, i, n, s);
        return this.scene.add.existing(r), r
    }), H(window, "RexPlugins.UI.DynamicText", Fn);

    function Wn(t) {
        return t.replace(Hn, "\\$&").replace(Un, "\\x2d")
    }

    function Vn(t) {
        return "string" != typeof t || ("" === t ? t = null : Nn.test(t) ? t = parseFloat(t) : "false" === t ? t = !1 : "true" === t && (t = !0)), t
    }

    function Xn(t) {
        return t
    }

    var Gn = {
        setEventEmitter: function (t, e) {
            return void 0 === e && (e = Phaser.Events.EventEmitter), this._privateEE = void 0 === t, this._eventEmitter = this._privateEE ? new e : t, this
        }, destroyEventEmitter: function () {
            return this._eventEmitter && this._privateEE && this._eventEmitter.shutdown(), this
        }, getEventEmitter: function () {
            return this._eventEmitter
        }, on: function () {
            return this._eventEmitter && this._eventEmitter.on.apply(this._eventEmitter, arguments), this
        }, once: function () {
            return this._eventEmitter && this._eventEmitter.once.apply(this._eventEmitter, arguments), this
        }, off: function () {
            return this._eventEmitter && this._eventEmitter.off.apply(this._eventEmitter, arguments), this
        }, emit: function (t) {
            return this._eventEmitter && t && this._eventEmitter.emit.apply(this._eventEmitter, arguments), this
        }, addListener: function () {
            return this._eventEmitter && this._eventEmitter.addListener.apply(this._eventEmitter, arguments), this
        }, removeListener: function () {
            return this._eventEmitter && this._eventEmitter.removeListener.apply(this._eventEmitter, arguments), this
        }, removeAllListeners: function () {
            return this._eventEmitter && this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments), this
        }, listenerCount: function () {
            return this._eventEmitter ? this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments) : 0
        }, listeners: function () {
            return this._eventEmitter ? this._eventEmitter.listeners.apply(this._eventEmitter, arguments) : []
        }
    }, Hn = /[|\\{}()[\]^$+*?.]/g, Un = /-/g, Nn = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i, Jn = function () {
        function i(t) {
            B(this, i), this.setEventEmitter(qi(t, "eventEmitter", void 0)), this.setTagExpression(qi(t, "regex.tag", "[a-z0-9-_.]+")), this.setValueExpression(qi(t, "regex.value", "[ #a-z-_.0-9,|&]+")), this.setValueConverter(qi(t, "valueConvert", !0));
            var e = qi(t, "delimiters", "<>");
            this.setDelimiters(e[0], e[1]), this.isRunning = !1, this.isPaused = !1, this.skipEventFlag = !1, this.lastTagStart = null, this.lastTagEnd = null, this.lastContent = null
        }

        return m(i, [{
            key: "shutdown", value: function () {
                this.destroyEventEmitter()
            }
        }, {
            key: "destroy", value: function () {
                this.shutdown()
            }
        }, {
            key: "setTagExpression", value: function (t) {
                return this.tagExpression = t, this
            }
        }, {
            key: "setValueExpression", value: function (t) {
                return this.valueExpression = t, this
            }
        }, {
            key: "setValueConverter", value: function (t) {
                return t = !0 === t ? Vn : t || Xn, this.valueConverter = t, this
            }
        }, {
            key: "setDelimiters", value: function (t, e) {
                void 0 === e && (e = t[1], t = t[0]), this.delimiterLeft = t, this.delimiterRight = e, t = Wn(t), e = Wn(e);
                var i = "".concat(t, "(").concat(this.tagExpression, ")(=(").concat(this.valueExpression, "))?").concat(e),
                    n = "".concat(t, "/(").concat(this.tagExpression, ")").concat(e);
                return this.reTagOn = RegExp(i, "i"), this.reTagOff = RegExp(n, "i"), this.reSplit = RegExp("".concat(i, "|").concat(n), "gi"), this
            }
        }, {
            key: "setSource", value: function (t) {
                return this.source = t, this
            }
        }, {
            key: "resetIndex", value: function (t) {
                return void 0 === t && (t = 0), this.progressIndex = t, this.reSplit.lastIndex = t, this.lastTagStart = null, this.lastTagEnd = null, this.lastContent = null, this
            }
        }, {
            key: "start", value: function (t) {
                return this.setSource(t).restart(), this
            }
        }, {
            key: "restart", value: function () {
                this.resetIndex().next()
            }
        }, {
            key: "next", value: function () {
                this.isPaused && this.onResume();
                var t = this.source, e = t.length;
                for (0 === this.reSplit.lastIndex && this.onStart(); !this.isPaused;) {
                    var i = this.reSplit.exec(t);
                    if (!i) return this.progressIndex < e && this.onContent(t.substring(this.progressIndex, e)), void this.onComplete();
                    var n = i[0], s = this.reSplit.lastIndex - n.length;
                    this.progressIndex < s && this.onContent(t.substring(this.progressIndex, s)), this.reTagOff.test(n) ? this.onTagEnd(n) : this.onTagStart(n), this.progressIndex = this.reSplit.lastIndex
                }
            }
        }, {
            key: "skipEvent", value: function () {
                return this.skipEventFlag = !0, this
            }
        }, {
            key: "pause", value: function () {
                return this.isPaused || this.onPause(), this
            }
        }, {
            key: "onContent", value: function (t) {
                this.emit("content", t), this.lastContent = t
            }
        }, {
            key: "onTagStart", value: function (t) {
                var e = t.match(this.reTagOn), i = e[1], n = function (t, e) {
                    if (null == t) return [];
                    for (var i = t.split(","), n = 0, s = i.length; n < s; n++) i[n] = e(i[n]);
                    return i
                }(e[3], this.valueConverter);
                this.skipEventFlag = !1, this.emit.apply(this, ["+".concat(i)].concat(h(n))), this.skipEventFlag || this.emit.apply(this, ["+", i].concat(h(n))), this.lastTagStart = i
            }
        }, {
            key: "onTagEnd", value: function (t) {
                var e = t.match(this.reTagOff)[1];
                this.skipEventFlag = !1, this.emit("-".concat(e)), this.skipEventFlag || this.emit("-", e), this.lastTagEnd = e
            }
        }, {
            key: "onStart", value: function () {
                this.isRunning = !0, this.emit("start")
            }
        }, {
            key: "onComplete", value: function () {
                this.isRunning = !1, this.emit("complete"), this.resetIndex()
            }
        }, {
            key: "onPause", value: function () {
                this.isPaused = !0, this.emit("pause")
            }
        }, {
            key: "onResume", value: function () {
                this.isPaused = !1, this.emit("resume")
            }
        }]), i
    }();
    Object.assign(Jn.prototype, Gn);

    function Kn(t) {
        this.typeWriter.setSpeed(t)
    }

    function Zn(t) {
        this.typeWriter.wait(t)
    }

    function qn(t, e) {
        return 2 === t.length && t[0] === e
    }

    function $n(t, e) {
        return 3 === t.length && t[0] === e && "play" === t[2]
    }

    function Qn(t, e) {
        var i = "tag.".concat(e);
        null == t ? this.emit(i) : this.emit.apply(this, [i].concat(h(t)))
    }

    function ts(i, n) {
        return new Promise(function (t, e) {
            i.once(n, function () {
                t()
            })
        })
    }

    function es(t) {
        return ts(t, "complete")
    }

    function is(t, e, i, n, s) {
        return function () {
            t.emit(zr, s), e.apply(n, i)
        }
    }

    function ns(t, e, i, n, s) {
        var r = is(t, i, n, s, "custom"), o = e ? "wait.".concat(e) : "wait";
        t.emit(o, r)
    }

    function ss(t, e, i, n, s) {
        var r, o, a, h, l, u = is(t, i, n, s, "time");
        t.once(zr, function () {
            r && (r.remove(), r = void 0)
        }), o = e, a = u, r = t.typeWriter.timeline.delayCall(o, a, h, l), t.emit("wait.time", e)
    }

    function rs(t, e, i, n) {
        var s = is(t, e, i, n, "click"), r = t.clickEE;
        t.once(zr, function () {
            r.off("pointerdown", s, t)
        }), r.once("pointerdown", s, t), t.emit("wait.click")
    }

    function os(t, e, i, n, s) {
        var r = is(t, i, n, s, "music");
        e && (t.once(zr, function () {
            e.off("complete", r, t)
        }), e.once("complete", r, t)), t.emit("wait.music", e), e || r()
    }

    function as(t) {
        switch (t) {
            case"camera.fadein":
            case"camera.fadeout":
            case"camera.flash":
            case"camera.shake":
            case"camera.zoom":
            case"camera.rotate":
            case"camera.scroll":
                return 1;
            default:
                return
        }
    }

    function hs(e, t, i, n, s) {
        var r, o, a = is(e, i, n, s, "camera.".concat(t)), h = e.camera;
        switch (t) {
            case"camera.fadein":
                r = h.fadeEffect, o = "camerafadeincomplete";
                break;
            case"camera.fadeout":
                r = h.fadeEffect, o = "camerafadeoutcomplete";
                break;
            case"camera.flash":
                r = h.flashEffect, o = "cameraflashcomplete";
                break;
            case"camera.shake":
                r = h.shakeEffect, o = "camerashakecomplete";
                break;
            case"camera.zoom":
                r = h.zoomEffect, o = "camerazoomcomplete";
                break;
            case"camera.rotate":
                r = h.rotateToEffect, o = "camerarotatecomplete";
                break;
            case"camera.scroll":
                r = h.panEffect, o = "camerapancomplete"
        }
        r.isRunning ? (e.once(zr, function (t) {
            h.off(o, a, e)
        }), h.once(o, a, e), e.emit("wait.camera", t)) : (e.emit("wait.camera", t), a())
    }

    function ls(t, e, i, n, s) {
        var r = is(t, i, n, s, "keydown"), o = "keydown-".concat(e.toUpperCase()), a = t.scene.input.keyboard;
        t.once(zr, function () {
            a.off(o, r, t)
        }), a.once(o, r, t), t.emit("wait.keydown", e)
    }

    function us(e, t, i, n, s) {
        var r = is(e, i, n, s), o = t.split("."), a = e.spriteManager;
        switch (o.length) {
            case 1:
                a.isEmpty ? (e.emit("wait.sprite"), r()) : (e.once(zr, function (t) {
                    a.off("empty", r, e)
                }), a.once("empty", r, e), e.emit("wait.sprite"));
                break;
            case 2:
                var h = o[1];
                if (a.has(h)) {
                    var l = e.spriteManager.get(h).sprite;
                    e.once(zr, function () {
                        l.off("destroy", r, e)
                    }), l.once("destroy", r, e), e.emit("wait.sprite", h)
                } else e.emit("wait.sprite", h), r();
                break;
            case 3:
                h = o[1];
                var u = o[2], c = e.spriteManager.getTweenTask(h, u);
                c ? (e.once(zr, function () {
                    c.off("complete", r, e)
                }), c.once("complete", r, e), e.emit("wait.sprite", h, u)) : (e.emit("wait.sprite", h, u), r())
        }
    }

    function cs(t, e, i, n, s) {
        for (var r = 0, o = (e = "string" == typeof e && 1 < e.length && -1 !== e.indexOf("|") ? e.split("|") : [e]).length; r < o; r++) {
            var a = e[r];
            if (null == a || "wait" === a) ns(t, void 0, i, n, s); else if ("number" != typeof a && isNaN(a)) if ("click" === a) rs(t, i, n, s); else if ("se" === a) {
                var h = t.soundManager.getSoundEffect();
                os(t, h, i, n, s)
            } else if ("bgm" === a) {
                h = t.soundManager.getBackgroundMusic();
                os(t, h, i, n, s)
            } else Dr.hasOwnProperty(a.toUpperCase()) ? ls(t, a, i, n, s) : as(a) ? hs(t, a, i, n, s) : ("sprite" === (l = a.split("."))[0] && l.length <= 3 ? us : ns)(t, a, i, n, s); else ss(t, parseFloat(a), i, n, s)
        }
        var l
    }

    var ds = Phaser.Utils.Objects.GetValue, fs = Phaser.Utils.Objects.GetValue, ps = Phaser.Utils.Objects.GetValue,
        vs = Phaser.Utils.Objects.GetValue, gs = Phaser.Utils.Objects.GetValue, ys = Phaser.Utils.Objects.GetValue,
        ks = Phaser.Utils.Objects.GetValue, ms = Phaser.Utils.Objects.GetValue, bs = Phaser.Utils.Objects.GetValue,
        xs = function (t, e) {
            cn.call(t, "speed", Kn, e, t)
        }, Cs = Phaser.Utils.Objects.GetValue, ws = function (t) {
            var e = t[0], i = t[1];
            this.soundManager.playSoundEffect(e), i && this.soundManager.fadeInSoundEffect(i)
        }, Ss = Phaser.Utils.Objects.GetValue, Ps = function (t) {
            this.soundManager.fadeInSoundEffect(t)
        }, Ts = Phaser.Utils.Objects.GetValue, Os = function (t) {
            var e;
            (e = this.soundManager).fadeOutSoundEffect.apply(e, h(t))
        }, Ms = Phaser.Utils.Objects.GetValue, _s = function (t) {
            this.soundManager.setSoundEffectVolume(t)
        }, Es = Phaser.Utils.Objects.GetValue, Bs = function (t) {
            var e = t[0], i = t[1];
            this.soundManager.playBackgroundMusic(e), i && this.soundManager.fadeInBackgroundMusic(i)
        }, zs = function () {
            this.soundManager.stopBackgroundMusic()
        }, js = Phaser.Utils.Objects.GetValue, Rs = function (t) {
            this.soundManager.fadeInBackgroundMusic(t)
        }, Ds = Phaser.Utils.Objects.GetValue, Ls = function (t) {
            var e;
            (e = this.soundManager).fadeOutBackgroundMusic.apply(e, h(t))
        }, Is = Phaser.Utils.Objects.GetValue, Ys = function (t) {
            var e;
            (e = this.soundManager).crossFadeBackgroundMusic.apply(e, h(t))
        }, As = Phaser.Utils.Objects.GetValue, Fs = function () {
            this.soundManager.pauseBackgroundMusic()
        }, Ws = function () {
            this.soundManager.resumeBackgroundMusic()
        }, Vs = Phaser.Utils.Objects.GetValue, Xs = function (t) {
            var e;
            (e = this.camera).fadeIn.apply(e, h(t))
        }, Gs = Phaser.Utils.Objects.GetValue, Hs = function (t) {
            var e;
            (e = this.camera).fadeOut.apply(e, h(t))
        }, Us = Phaser.Utils.Objects.GetValue, Ns = function (t) {
            var e;
            (e = this.camera).shake.apply(e, h(t))
        }, Js = Phaser.Utils.Objects.GetValue, Ks = function (t) {
            var e;
            (e = this.camera).flash.apply(e, h(t))
        }, Zs = Phaser.Utils.Objects.GetValue, qs = function (t) {
            this.camera.setZoom(t)
        }, $s = function (t) {
            var e;
            (e = this.camera).zoomTo.apply(e, h(t))
        }, Qs = Phaser.Utils.Objects.GetValue, tr = Phaser.Math.DegToRad, er = function (t) {
            this.camera.setRotation(t)
        }, ir = function (t) {
            var e = t[0], i = t[1], n = t[2];
            this.camera.rotateTo(e, !1, i, n)
        }, nr = Phaser.Utils.Objects.GetValue, sr = function (t) {
            var e;
            (e = this.camera).setScroll.apply(e, h(t))
        }, rr = function (t) {
            var e = t[0], i = t[1], n = t[2], s = t[3], r = this.camera, o = r.scrollX, a = r.scrollY;
            r.setScroll(e, i), e += r.centerX, i += r.centerY, r.setScroll(o, a), r.pan(e, i, n, s)
        }, or = Phaser.Utils.Objects.GetValue, ar = function (t, e) {
            cn.call(t, "wait", Zn, e, t)
        }, hr = Phaser.Utils.Objects.GetValue, lr = function (t) {
            var e;
            (e = this.spriteManager).add.apply(e, h(t))
        }, ur = function (t) {
            this.spriteManager.remove(t)
        }, cr = Phaser.Utils.Objects.GetValue, dr = function () {
            this.spriteManager.removeAll()
        }, fr = Phaser.Utils.Objects.GetValue, pr = function (t) {
            var e;
            (e = this.spriteManager).setTexture.apply(e, h(t))
        }, vr = Phaser.Utils.Objects.GetValue, gr = function (t) {
            var e = t[0], i = t[1], n = i.shift();
            this.spriteManager.playAnimation(e, n), 0 < i.length && this.spriteManager.chainAnimation(e, i)
        }, yr = function (t) {
            this.spriteManager.stopAnimation(t)
        }, kr = Phaser.Utils.Objects.GetValue, mr = function (t) {
            var e;
            (e = this.spriteManager).chainAnimation.apply(e, h(t))
        }, br = Phaser.Utils.Objects.GetValue, xr = function (t) {
            this.spriteManager.pauseAnimation(t)
        }, Cr = Phaser.Utils.Objects.GetValue, wr = function (t) {
            var e;
            (e = this.spriteManager).setProperty.apply(e, h(t))
        }, Sr = Phaser.Utils.Objects.GetValue, Pr = {to: !0, yoyo: !0}, Tr = function (t) {
            var e;
            (e = this.spriteManager).easeProperty.apply(e, h(t))
        }, Or = function (t, e, i) {
            cn.call(t, e, Qn, i, t)
        }, Mr = Phaser.Utils.Objects.GetValue, _r = [function (e, i, t) {
            var n, s = ds(t, "tags.color", "color");
            i.on("start", function () {
                n = e.textStyle.color
            }).on("+".concat(s), function (t) {
                e.textStyle.setColor(t), i.skipEvent()
            }).on("-".concat(s), function () {
                e.textStyle.setColor(n), i.skipEvent()
            }).on("complete", function () {
                e.textStyle.setColor(n)
            })
        }, function (e, i, t) {
            var n, s = fs(t, "tags.stroke", "stroke");
            i.on("start", function () {
                n = e.textStyle.stroke, e.textStyle.setStrokeStyle(null)
            }).on("+".concat(s), function (t) {
                void 0 === t && (t = n), e.textStyle.setStrokeStyle(t), i.skipEvent()
            }).on("-".concat(s), function () {
                e.textStyle.setStrokeStyle(null), i.skipEvent()
            }).on("complete", function () {
                e.textStyle.setStrokeStyle(n)
            })
        }, function (t, e, i) {
            var n = ps(i, "tags.b", "b");
            e.on("start", function () {
                t.textStyle.setBold(!1)
            }).on("+".concat(n), function () {
                t.textStyle.setBold(!0), e.skipEvent()
            }).on("-".concat(n), function () {
                t.textStyle.setBold(!1), e.skipEvent()
            })
        }, function (t, e, i) {
            var n = vs(i, "tags.i", "i");
            e.on("start", function () {
                t.textStyle.setItalic(!1)
            }).on("+".concat(n), function () {
                t.textStyle.setItalic(!0), e.skipEvent()
            }).on("-".concat(n), function () {
                t.textStyle.setItalic(!1), e.skipEvent()
            })
        }, function (e, i, t) {
            var n, s = gs(t, "tags.size", "size");
            i.on("start", function () {
                n = e.textStyle.fontSize
            }).on("+".concat(s), function (t) {
                e.textStyle.setFontSize(t), i.skipEvent()
            }).on("-".concat(s), function () {
                e.textStyle.setFontSize(n), i.skipEvent()
            }).on("complete", function () {
                e.textStyle.setFontSize(n)
            })
        }, function (e, i, t) {
            var n, s = ys(t, "tags.y", "y");
            i.on("start", function () {
                n = e.textStyle.offsetY, e.textStyle.setOffsetY(0)
            }).on("+".concat(s), function (t) {
                void 0 === t && (t = n), e.textStyle.setOffsetY(t), i.skipEvent()
            }).on("-".concat(s), function () {
                e.textStyle.setOffsetY(0), i.skipEvent()
            }).on("complete", function () {
                e.textStyle.setOffsetY(0)
            })
        }, function (e, i, t) {
            var n, s = ks(t, "tags.shadow", "shadow");
            i.on("start", function () {
                n = e.textStyle.shadowColor, e.textStyle.setShadowColor(null)
            }).on("+".concat(s), function (t) {
                void 0 === t && (t = n), e.textStyle.setShadowColor(t), i.skipEvent()
            }).on("-".concat(s), function () {
                e.textStyle.setShadowColor(null), i.skipEvent()
            }).on("complete", function () {
                e.textStyle.setShadowColor(n)
            })
        }, function (i, n, t) {
            var e = ms(t, "tags.img", "img");
            n.on("+".concat(e), function (t) {
                var e = i.imageManager.get(t);
                un.call(i, e.key, e.frame, {
                    width: e.width,
                    hieght: e.height,
                    leftSpace: e.left,
                    rightSpace: e.right
                }), n.skipEvent()
            }).on("-".concat(e), function () {
                n.skipEvent()
            })
        }, function (e, i, t) {
            var n, s = bs(t, "tags.speed", "speed");
            i.on("start", function () {
                n = e.typeWriter.speed
            }).on("+".concat(s), function (t) {
                xs(e, t), i.skipEvent()
            }).on("-".concat(s), function () {
                xs(e, n), i.skipEvent()
            }).on("complete", function () {
                e.typeWriter.speed = n
            })
        }, function (i, n, t) {
            var e = Cs(t, "tags.se", "se");
            n.on("+".concat(e), function (t, e) {
                cn.call(i, "se", ws, [t, e], i), n.skipEvent()
            }).on("-".concat(e), function () {
                n.skipEvent()
            })
        }, function (e, i, t) {
            var n = Ss(t, "tags.se.fadein", "se.fadein");
            i.on("+".concat(n), function (t) {
                cn.call(e, "se.fadein", Ps, t, e), i.skipEvent()
            }).on("-".concat(n), function () {
                i.skipEvent()
            })
        }, function (i, n, t) {
            var e = Ts(t, "tags.se.fadeout", "se.fadeout");
            n.on("+".concat(e), function (t, e) {
                cn.call(i, "se.fadeout", Os, [t, e = "stop" === e], i), n.skipEvent()
            }).on("-".concat(e), function () {
                n.skipEvent()
            })
        }, function (e, i, t) {
            var n = Ms(t, "tags.se.volume", "se.volume");
            i.on("+".concat(n), function (t) {
                cn.call(e, "se.volume", _s, t, e), i.skipEvent()
            }).on("-".concat(n), function () {
                i.skipEvent()
            })
        }, function (i, n, t) {
            var e = Es(t, "tags.bgm", "bgm");
            n.on("+".concat(e), function (t, e) {
                cn.call(i, "bgm", Bs, [t, e], i), n.skipEvent()
            }).on("-".concat(e), function () {
                cn.call(i, "bgm.stop", zs, void 0, i), n.skipEvent()
            })
        }, function (e, i, t) {
            var n = js(t, "tags.bgm.fadein", "bgm.fadein");
            i.on("+".concat(n), function (t) {
                cn.call(e, "bgm.fadein", Rs, t, e), i.skipEvent()
            }).on("-".concat(n), function () {
                i.skipEvent()
            })
        }, function (i, n, t) {
            var e = Ds(t, "tags.bgm.fadeout", "bgm.fadeout");
            n.on("+".concat(e), function (t, e) {
                cn.call(i, "bgm.fadeout", Ls, [t, e], i), n.skipEvent()
            }).on("-".concat(e), function () {
                n.skipEvent()
            })
        }, function (i, n, t) {
            var e = Is(t, "tags.bgm.cross", "bgm.cross");
            n.on("+".concat(e), function (t, e) {
                cn.call(i, "bgm.cross", Ys, [t, e], i), n.skipEvent()
            }).on("-".concat(e), function () {
                n.skipEvent()
            })
        }, function (t, e, i) {
            var n = As(i, "tags.bgm.pause", "bgm.pause");
            e.on("+".concat(n), function () {
                cn.call(t, "bgm.pause", Fs, void 0, t), e.skipEvent()
            }).on("-".concat(n), function () {
                cn.call(t, "bgm.resume", Ws, void 0, t), e.skipEvent()
            })
        }, function (s, r, t) {
            var e = Vs(t, "tags.camera.fadein", "camera.fadein");
            r.on("+".concat(e), function (t, e, i, n) {
                cn.call(s, "camera.fadein", Xs, [t, e, i, n], s), r.skipEvent()
            })
        }, function (s, r, t) {
            var e = Gs(t, "tags.camera.fadeout", "camera.fadeout");
            r.on("+".concat(e), function (t, e, i, n) {
                cn.call(s, "camera.fadeout", Hs, [t, e, i, n], s), r.skipEvent()
            })
        }, function (i, n, t) {
            var e = Us(t, "tags.camera.shake", "camera.shake");
            n.on("+".concat(e), function (t, e) {
                cn.call(i, "camera.shake", Ns, [t, e], i), n.skipEvent()
            })
        }, function (s, r, t) {
            var e = Js(t, "tags.camera.flash", "camera.flash");
            r.on("+".concat(e), function (t, e, i, n) {
                cn.call(s, "camera.flash", Ks, [t, e, i, n], s), r.skipEvent()
            })
        }, function (n, s, t) {
            var e = Zs(t, "tags.camera.zoom", "camera.zoom");
            s.on("+".concat(e), function (t) {
                cn.call(n, "camera.zoom", qs, t, n), s.skipEvent()
            }).on("+".concat(e, ".to"), function (t, e, i) {
                cn.call(n, "camera.zoom.to", $s, [t, e, i], n), s.skipEvent()
            })
        }, function (n, s, t) {
            var e = Qs(t, "tags.camera.rotate", "camera.rotate");
            s.on("+".concat(e), function (t) {
                t = tr(t), cn.call(n, "camera.rotate", er, t, n), s.skipEvent()
            }).on("+".concat(e, ".to"), function (t, e, i) {
                t = tr(t), cn.call(n, "camera.rotate.to", ir, [t, e, i], n), s.skipEvent()
            })
        }, function (s, r, t) {
            var e = nr(t, "tags.camera.scroll", "camera.scroll");
            r.on("+".concat(e), function (t, e) {
                cn.call(s, "camera.scroll", sr, [t, e], s), r.skipEvent()
            }).on("+".concat(e, ".to"), function (t, e, i, n) {
                cn.call(s, "camera.scroll.to", rr, [t, e, i, n], s), r.skipEvent()
            })
        }, function (e, i, t) {
            var n = or(t, "tags.wait", "wait"), s = or(t, "tags.click", "click");
            i.on("+".concat(n), function (t) {
                ar(e, t), i.skipEvent()
            }).on("-".concat(n), function () {
                i.skipEvent()
            }).on("+".concat(s), function () {
                ar(e, "click"), i.skipEvent()
            }).on("-".concat(s), function () {
                i.skipEvent()
            })
        }, function (o, a, t) {
            var h = hr(t, "sprite", "sprite");
            h && a.on("+", function (t) {
                if (!a.skipEventFlag) {
                    var e = t.split(".");
                    if (qn(e, h)) {
                        for (var i = e[1], n = arguments.length, s = new Array(1 < n ? n - 1 : 0), r = 1; r < n; r++) s[r - 1] = arguments[r];
                        cn.call(o, "sprite.add", lr, [i].concat(s), o), a.skipEvent()
                    }
                }
            }).on("-", function (t) {
                if (!a.skipEventFlag) {
                    var e = t.split(".");
                    if (qn(e, h)) {
                        var i = e[1];
                        cn.call(o, "sprite.remove", ur, i, o), a.skipEvent()
                    }
                }
            })
        }, function (e, i, t) {
            var n = cr(t, "sprite", "sprite");
            n && i.on("-", function (t) {
                i.skipEventFlag || t === n && (cn.call(e, "sprite.removeall", dr, void 0, e), i.skipEvent())
            })
        }, function (a, h, t) {
            var l = fr(t, "sprite", "sprite");
            l && h.on("+", function (t, e, i) {
                if (!h.skipEventFlag) {
                    var n = t.split(".");
                    if (r = l, 3 === (s = n).length && s[0] === r && "texture" === s[2]) {
                        var s, r, o = n[1];
                        cn.call(a, "sprite.texture", pr, [o, e, i], a), h.skipEvent()
                    }
                }
            })
        }, function (r, o, t) {
            var a = vr(t, "sprite", "sprite");
            a && o.on("+", function (t) {
                if (!o.skipEventFlag) {
                    var e, i = t.split(".");
                    if ($n(i, a)) {
                        e = i[1];
                        var n = Array.prototype.slice.call(arguments, 1);
                        cn.call(r, "sprite.play", gr, [e, n], r), o.skipEvent()
                    }
                }
            }).on("+", function (t) {
                if (!o.skipEventFlag) {
                    var e, i, n, s = t.split(".");
                    if (n = a, 3 === (i = s).length && i[0] === n && "stop" === i[2]) e = s[1], cn.call(r, "sprite.stop", yr, e, r), o.skipEvent()
                }
            }).on("-", function (t) {
                if (!o.skipEventFlag) {
                    var e, i = t.split(".");
                    $n(i, a) && (e = i[1], cn.call(r, "sprite.stop", yr, e, r), o.skipEvent())
                }
            })
        }, function (o, a, t) {
            var h = kr(t, "sprite", "sprite");
            h && a.on("+", function (t) {
                if (!a.skipEventFlag) {
                    var e, i = t.split(".");
                    if (s = h, 3 === (n = i).length && n[0] === s && "chain" === n[2]) {
                        var n, s;
                        e = i[1];
                        var r = Array.prototype.slice.call(arguments, 1);
                        cn.call(o, "sprite.chain", mr, [e, r], o), a.skipEvent()
                    }
                }
            })
        }, function (r, o, t) {
            var a = br(t, "sprite", "sprite");
            a && o.on("+", function (t) {
                if (!o.skipEventFlag) {
                    var e, i, n, s = t.split(".");
                    if (n = a, 3 === (i = s).length && i[0] === n && "pause" === i[2]) e = s[1], cn.call(r, "sprite.pause", xr, e, r), o.skipEvent()
                }
            })
        }, function (a, h, t) {
            var l = Cr(t, "sprite", "sprite");
            l && h.on("+", function (t, e) {
                if (!h.skipEventFlag) {
                    var i, n, s, r, o = t.split(".");
                    if (r = l, 3 === (s = o).length && s[0] === r) i = o[1], n = o[2], cn.call(a, "sprite.set", wr, [i, n, e], a), h.skipEvent()
                }
            })
        }, function (u, c, t) {
            var d = Sr(t, "sprite", "sprite");
            d && c.on("+", function (t, e, i, n) {
                if (!c.skipEventFlag) {
                    var s, r, o, a, h, l = t.split(".");
                    if (h = d, 4 === (a = l).length && a[0] === h && Pr[a[3]]) s = l[1], r = l[2], o = "yoyo" === l[3], cn.call(u, "sprite.ease", Tr, [s, r, e, i, n, o], u), c.skipEvent()
                }
            })
        }, function (r, o) {
            o.on("start", function () {
                r.emit("parser.start", o)
            }).on("+", function (t) {
                if (!o.skipEventFlag) {
                    for (var e = "+".concat(t), i = arguments.length, n = new Array(1 < i ? i - 1 : 0), s = 1; s < i; s++) n[s - 1] = arguments[s];
                    r.emit.apply(r, ["parser.".concat(e), o].concat(n)), Or(r, e, n)
                }
            }).on("-", function (t) {
                if (!o.skipEventFlag) {
                    var e = "-".concat(t);
                    r.emit("parser.".concat(e), o), Or(r, e)
                }
            }).on("complete", function () {
                r.emit("parser.complete", o)
            })
        }, function (t, e, i) {
            var n = Mr(i, "tags.r", "r");
            e.on("+".concat(n), function () {
                ln.call(t, "\n"), e.skipEvent()
            }).on("-".concat(n), function () {
                e.skipEvent()
            })
        }, function (e, t) {
            t.on("content", function (t) {
                ln.call(e, t)
            })
        }], Er = Phaser.Utils.Objects.GetValue, Br = function () {
            b(s, Jn);
            var n = w(s);

            function s(t, e) {
                var i;
                return B(this, s), void 0 === e && (e = {}), e.hasOwnProperty("delimiters") || (e.delimiters = "[]"), function (t, e, i) {
                    for (var n = 0, s = _r.length; n < s; n++) _r[n](t, e, i)
                }(t, z(i = n.call(this, e)), e), i.setCommentLineStartSymbol(Er(e, "comment", "//")), i
            }

            return m(s, [{
                key: "setCommentLineStartSymbol", value: function (t) {
                    return this.commentLineStart = t, this
                }
            }, {
                key: "start", value: function (t) {
                    return C(x(s.prototype), "start", this).call(this, function (t, e) {
                        for (var i = t.commentLineStart, n = e.split("\n"), s = 0, r = n.length; s < r; s++) {
                            var o = n[s];
                            "" === o || (0 === o.trim().length || i && o.startsWith(i)) && (n[s] = "")
                        }
                        return n.join("")
                    }(this, t)), this
                }
            }]), s
        }(), zr = "_remove.wait", jr = "_remove.play", Rr = [zr, jr], Dr = Phaser.Input.Keyboard.KeyCodes, Lr = {
            start: function (t) {
                return this.children = t, this.index = 0, this.isPageTyping = !0, this.onTypeStart && this.onTypeStart(t), this.typing(), es(this)
            }, typing: function n(t) {
                void 0 === t && (t = 0);
                var e = 0;
                for (this.inTypingProcessLoop = !0; this.inTypingProcessLoop;) {
                    var i = this.getNextChild();
                    if (!i) {
                        this.timeline.isRunning ? this.timeline.once("complete", function () {
                            this.isPageTyping = !1, this.emit("complete")
                        }, this) : (this.isPageTyping = !1, this.emit("complete"));
                        break
                    }
                    if (an(i)) {
                        var s = this.animationConfig;
                        if (0 < s.duration) {
                            var r = this.timeline.addTimer({
                                name: "anim",
                                target: i,
                                duration: s.duration,
                                yoyo: s.yoyo,
                                onStart: s.onStart,
                                onProgress: s.onProgress,
                                onComplete: s.onComplete
                            });
                            this.skipTypingAnimation && r.seek(1)
                        } else s.onStart && s.onStart(i, 0);
                        this.textPlayer.emit("typing", i), e += this.speed + t, t = 0;
                        var o = this.index === this.children.length;
                        if (0 < e && !o) {
                            this.typingTimer = this.timeline.addTimer({
                                name: "delay",
                                target: this,
                                duration: e,
                                onComplete: function (t, e, i) {
                                    t.typingTimer = void 0, n.call(t, i.remainder)
                                }
                            });
                            break
                        }
                    } else i.type === Pn && i.exec()
                }
                this.inTypingProcessLoop = !1
            }, pause: function () {
                return this.timeline.pause(), this
            }, resume: function () {
                return this.timeline.resume(), this
            }, pauseTyping: function () {
                return this.isTypingPaused || (this.typingTimer ? (this.typingTimer.pause(), this.isTypingPaused = !0) : this.inTypingProcessLoop && (this.inTypingProcessLoop = !1, this.isTypingPaused = !0)), this
            }, resumeTyping: function (t) {
                return this.isTypingPaused && (void 0 === t && (t = 0), this.typingTimer ? (this.isTypingPaused = !1, this.typingTimer.resume(), this.typingTimer.remainder += t) : this.isTypingPaused && (this.isTypingPaused = !1, this.typing(t))), this
            }, wait: function (t) {
                return this.ignoreWait || (this.pauseTyping(), cs(this.textPlayer, t, this.resumeTyping, [], this)), this
            }, setTimeScale: function (t) {
                return this.timeline.setTimeScale(t), this
            }, setIgnoreWait: function (t) {
                return void 0 === t && (t = !0), this.ignoreWait = t, this
            }, setSkipTypingAnimation: function (t) {
                void 0 === t && (t = !0), this.skipTypingAnimation = t;
                for (var e = this.timeline.getTimers("anim"), i = 0, n = e.length; i < n; i++) e[i].seek(1);
                return this
            }, skipCurrentTypingDelay: function () {
                return this.typingTimer && this.typingTimer.seek(1), this
            }
        }, Ir = Phaser.Utils.Objects.GetValue, Yr = function () {
            function i(t, e) {
                B(this, i), this.parent = t, this._isRunning = !1, this.isPaused = !1, this.tickingState = !1, this.setEventEmitter(Ir(e, "eventEmitter", void 0)), this.setTickingMode(Ir(e, "tickingMode", 1))
            }

            return m(i, [{
                key: "boot", value: function () {
                    2 !== this.tickingMode || this.tickingState || this.startTicking()
                }
            }, {
                key: "shutdown", value: function () {
                    this.destroyEventEmitter(), this.tickingState && this.stopTicking(), this.parent = void 0
                }
            }, {
                key: "destroy", value: function () {
                    this.shutdown()
                }
            }, {
                key: "setTickingMode", value: function (t) {
                    "string" == typeof t && (t = Vr[t]), this.tickingMode = t
                }
            }, {
                key: "startTicking", value: function () {
                    this.tickingState = !0
                }
            }, {
                key: "stopTicking", value: function () {
                    this.tickingState = !1
                }
            }, {
                key: "isRunning", get: function () {
                    return this._isRunning
                }, set: function (t) {
                    this._isRunning !== t && (this._isRunning = t, 1 === this.tickingMode && t != this.tickingState && (t ? this.startTicking() : this.stopTicking()))
                }
            }, {
                key: "start", value: function () {
                    return this.isPaused = !1, this.isRunning = !0, this
                }
            }, {
                key: "pause", value: function () {
                    return this.isRunning && (this.isPaused = !0, this.isRunning = !1), this
                }
            }, {
                key: "resume", value: function () {
                    return this.isPaused && (this.isRunning = !0), this
                }
            }, {
                key: "stop", value: function () {
                    return this.isPaused = !1, this.isRunning = !1, this
                }
            }, {
                key: "complete", value: function () {
                    this.isPaused = !1, this.isRunning = !1, this.emit("complete", this.parent, this)
                }
            }]), i
        }();
    Object.assign(Yr.prototype, Gn);

    function Ar(t) {
        return t instanceof Xr
    }

    function Fr(t) {
        return Ar(t) ? t : t.scene && Ar(t.scene) ? t.scene : t.parent && t.parent.scene && Ar(t.parent.scene) ? t.parent.scene : void 0
    }

    function Wr(t) {
        return Ar(t) ? t.events : t.on ? t : void 0
    }

    var Vr = {no: 0, lazy: 1, always: 2}, Xr = Phaser.Scene, Gr = Phaser.Utils.Objects.GetValue, Hr = function () {
        b(s, Yr);
        var n = w(s);

        function s(t, e) {
            var i;
            return B(this, s), (i = n.call(this, t, e)).parent = t, i.scene = Fr(t), i.resetFromJSON(e), i.boot(), i
        }

        return m(s, [{
            key: "resetFromJSON", value: function (t) {
                return this.isRunning = Gr(t, "isRunning", !1), this.timeScale = Gr(t, "timeScale", 1), this.now = Gr(t, "now", 0), this
            }
        }, {
            key: "toJSON", value: function () {
                return {
                    isRunning: this.isRunning,
                    timeScale: this.timeScale,
                    now: this.now,
                    tickingMode: this.tickingMode
                }
            }
        }, {
            key: "boot", value: function () {
                C(x(s.prototype), "boot", this).call(this);
                var t = Wr(this.parent);
                t && t.on("destroy", this.destroy, this)
            }
        }, {
            key: "shutdown", value: function () {
                C(x(s.prototype), "shutdown", this).call(this), this.parent = void 0, this.scene = void 0
            }
        }, {
            key: "start", value: function (t) {
                return void 0 === t && (t = 0), this.delta = 0, this.now = t, C(x(s.prototype), "start", this).call(this), this
            }
        }, {
            key: "seek", value: function (t) {
                return this.now = t, this
            }
        }, {
            key: "setTimeScale", value: function (t) {
                return this.timeScale = t, this
            }
        }, {
            key: "tick", value: function (t) {
                return t *= this.timeScale, this.now += t, this.delta = t, this.emit("update", this.now, this.delta), this
            }
        }]), s
    }(), Ur = function () {
        b(e, Hr);
        var t = w(e);

        function e() {
            return B(this, e), t.apply(this, arguments)
        }

        return m(e, [{
            key: "startTicking", value: function () {
                C(x(e.prototype), "startTicking", this).call(this), this.scene.events.on("update", this.update, this)
            }
        }, {
            key: "stopTicking", value: function () {
                C(x(e.prototype), "stopTicking", this).call(this), this.scene && this.scene.events.off("update", this.update, this)
            }
        }, {
            key: "update", value: function (t, e) {
                return this.isRunning && 0 !== this.timeScale && this.tick(e), this
            }
        }]), e
    }(), Nr = Phaser.Math.Clamp, Jr = function () {
        function i(t, e) {
            B(this, i), this.setTimeline(t).reset(e)
        }

        return m(i, [{
            key: "setTimeline", value: function (t) {
                return this.timeline = t, this
            }
        }, {
            key: "setName", value: function (t) {
                return this.name = t, this
            }
        }, {
            key: "setCallbacks", value: function (t, e, i, n) {
                return this.target = t, this.onStart = e, this.onProgress = i, this.onComplete = n, this
            }
        }, {
            key: "setDuration", value: function (t, e) {
                return void 0 === e && (e = !1), this.duration = t, this.remainder = t, this.t = 0, this.yoyo = e, this
            }
        }, {
            key: "setPaused", value: function (t) {
                return this.isPaused = t, this
            }
        }, {
            key: "pause", value: function () {
                return this.isPaused = !0, this
            }
        }, {
            key: "resume", value: function () {
                return this.isPaused = !1, this
            }
        }, {
            key: "setRemoved", value: function (t) {
                return this.removed = t, this
            }
        }, {
            key: "remove", value: function () {
                return this.removed = !0, this
            }
        }, {
            key: "seek", value: function (t) {
                return this.remainder = this.duration * (1 - t), this
            }
        }, {
            key: "reset", value: function (t) {
                return this.setName(t.name).setDuration(t.duration, t.yoyo).setCallbacks(t.target, t.onStart, t.onProgress, t.onComplete).setPaused(!1).setRemoved(!1), this
            }
        }, {
            key: "onFree", value: function () {
                this.setTimeline().setCallbacks()
            }
        }, {
            key: "getProgress", value: function () {
                var t, e, i = 1 - this.remainder / this.duration;
                return i = Nr(i, 0, 1), this.yoyo && (void 0 === e && (e = .5), (t = i) <= e ? t /= e : t = 1 - (t - e) / (1 - e), i = t), i
            }
        }, {
            key: "setProgress", value: function (t) {
                t = Nr(t, 0, 1), this.remainder = this.duration * (1 - t)
            }
        }, {
            key: "runCallback", value: function (t) {
                t && t(this.target, this.t, this)
            }
        }, {
            key: "update", value: function (t, e) {
                if (this.removed) return !0;
                if (this.isPaused) return !1;
                this.remainder -= e, this.t = this.getProgress(), this.runCallback(this.onProgress);
                var i = this.remainder <= 0;
                return i && this.runCallback(this.onComplete), i
            }
        }]), i
    }(), Kr = function () {
        b(e, Rt);
        var t = w(e);

        function e() {
            return B(this, e), t.apply(this, arguments)
        }

        return m(e, [{
            key: "allocate", value: function () {
                return this.pop()
            }
        }, {
            key: "free", value: function (t) {
                t.onFree(), this.push(t)
            }
        }, {
            key: "freeMultiple", value: function (t) {
                for (var e = 0, i = t.length; e < i; e++) this.free(t[e]);
                return this
            }
        }]), e
    }(), Zr = Phaser.Utils.Objects.GetValue, qr = new Kr, $r = function () {
        b(a, Ur);
        var n = w(a);

        function a(t, e) {
            var i;
            return B(this, a), (i = n.call(this, t, e)).addedTimers = [], i.timers = [], i.timerPool = Zr(e, "pool", qr), i
        }

        return m(a, [{
            key: "shutdown", value: function () {
                this.parent && (this.timerPool.freeMultiple(this.addedTimers).freeMultiple(this.timers), this.timerPool = void 0, this.addedTimers = void 0, this.timers = void 0, C(x(a.prototype), "shutdown", this).call(this))
            }
        }, {
            key: "addTimer", value: function (t) {
                var e = this.timerPool.allocate();
                return e ? e.setTimeline(this).reset(t) : e = new Jr(this, t), this.addedTimers.push(e), e.runCallback(e.onStart), this.isRunning || this.start(), e
            }
        }, {
            key: "delayCall", value: function (t, n, s, r) {
                return this.addTimer({
                    duration: t, onComplete: function (t, e, i) {
                        void 0 === s && (s = []), s.push(i), n.apply(r, s)
                    }
                })
            }
        }, {
            key: "getTimers", value: function (t) {
                for (var e = [], i = [this.addedTimers, this.timers], n = 0, s = i.length; n < s; n++) for (var r = i[n], o = 0, a = r.length; o < a; o++) {
                    var h = r[o];
                    h.name === t && e.push(h)
                }
                return e
            }
        }, {
            key: "update", value: function (t, e) {
                var i;
                C(x(a.prototype), "update", this).call(this, t, e), (i = this.timers).push.apply(i, h(this.addedTimers));
                for (var n = [], s = this.addedTimers.length = 0, r = this.timers.length; s < r; s++) {
                    var o = this.timers[s];
                    o.update(this.now, this.delta) ? this.timerPool.free(o) : n.push(o)
                }
                this.timers = n, 0 === this.timers.length && 0 === this.addedTimers.length && this.complete()
            }
        }]), a
    }(), Qr = Phaser.Utils.Objects.GetValue, to = function () {
        function i(t, e) {
            B(this, i), this.setEventEmitter(), this.textPlayer = t, this.isPageTyping = !1, this.timeline = new $r(t), this.typingTimer = void 0, this.pauseTypingTimer = void 0, this.inTypingProcessLoop = !1, this.isTypingPaused = !1, this.setIgnoreWait(!1), this.setSkipTypingAnimation(!1), this.setTypingStartCallback(Qr(e, "onTypingStart", io)), this.setSpeed(Qr(e, "speed", 250)), this.setAnimationConfig(Qr(e, "animation", void 0))
        }

        return m(i, [{
            key: "destroy", value: function () {
                this.destroyEventEmitter(), this.textPlayer = void 0, this.timeline.destroy(), this.timeline = void 0, this.typingTimer = void 0, this.pauseTypingTimer = void 0, this.onTypeStart = void 0, this.animationConfig = void 0
            }
        }, {
            key: "setSpeed", value: function (t) {
                return this.speed = t, this
            }
        }, {
            key: "setTypingStartCallback", value: function (t) {
                return this.onTypeStart = t, this
            }
        }, {
            key: "setAnimationConfig", value: function (t) {
                return void 0 === t ? t = {} : !1 === t && (t = {duration: 0}), t.hasOwnProperty("duration") || (t.duration = 1e3), t.hasOwnProperty("onStart") || (t.onStart = eo), this.animationConfig = t, this
            }
        }, {
            key: "getNextChild", value: function () {
                var t = this.children[this.index];
                return this.index = Math.min(this.index + 1, this.children.length), t
            }
        }]), i
    }(), eo = function (t) {
        t.setVisible()
    }, io = function (t) {
        for (var e = 0, i = t.length; e < i; e++) t[e].setVisible(!1)
    };
    Object.assign(to.prototype, Gn, Lr);

    function no(t) {
        return t instanceof so
    }

    var so = Phaser.GameObjects.GameObject, ro = Phaser.Utils.Objects.GetValue, oo = function () {
        function n(t, e) {
            B(this, n), this.parent = t, this.scene = Fr(t);
            var i = ro(e, "eventEmitter", !1);
            !0 === i && (i = void 0), this.setEventEmitter(i), this.boot()
        }

        return m(n, [{
            key: "boot", value: function () {
                var t;
                this.parent.once ? t = this.parent : this.parent.events && this.parent.events.once && (t = this.parent.events), t && t.once("destroy", this.destroy, this)
            }
        }, {
            key: "shutdown", value: function () {
                return this.stop(), Ar(this.parent) && this.parent.events.off("shutdown", this.destroy, this), this.destroyEventEmitter(), this.parent = void 0, this.scene = void 0, this
            }
        }, {
            key: "destroy", value: function () {
                return this.shutdown(), this
            }
        }, {
            key: "start", value: function (t) {
                return this.isRunning || (this.tween = this.scene.tweens.add(t).on("complete", this.complete, this), !1 === this.getEventEmitter() && this.setEventEmitter(this.tween)), this
            }
        }, {
            key: "restart", value: function () {
                return this.stop().start(), this
            }
        }, {
            key: "stop", value: function () {
                return this.tween && (this.getEventEmitter() === this.tween && this.setEventEmitter(!1), this.tween.remove(), this.tween = void 0), this
            }
        }, {
            key: "pause", value: function () {
                return this.tween && this.tween.pause(), this
            }
        }, {
            key: "resume", value: function () {
                return this.tween && this.tween.resume(), this
            }
        }, {
            key: "complete", value: function () {
                return this.stop(), this.getEventEmitter() && this.emit("complete"), this
            }
        }, {
            key: "isRunning", get: function () {
                return !!this.tween
            }
        }]), n
    }();
    Object.assign(oo.prototype, Gn);

    function ao(t, e, i, n, s) {
        void 0 === n && (n = 1), void 0 === s && (s = 0);
        var r, o = {mode: 0, volume: {start: s, end: n}, duration: i};
        return "string" == typeof e && (e = t.sound.add(e)), e.hasOwnProperty("_fade") ? (r = e._fade).stop().resetFromJSON(o) : (r = new fo(t, e, o), e._fade = r), r.start(), e.isPlaying || e.setVolume(s).play(), e
    }

    function ho(t, e, i, n) {
        void 0 === n && (n = !0);
        var s, r = {mode: n ? 2 : 1, volume: {start: e.volume, end: 0}, duration: i};
        return e.hasOwnProperty("_fade") ? (s = e._fade).stop().resetFromJSON(r) : (s = new fo(t, e, r), e._fade = s), s.start(), e.isPlaying || e.play(), e
    }

    function lo(i, t) {
        return i.hasOwnProperty("tintR") || (void 0 === t && (t = 16777215), Object.defineProperty(i, "tint", {
            get: function () {
                return i._tintRGB
            }, set: function (t) {
                t = 16777215 & Math.floor(t), i.setTint(t), i._tintRGB !== t && (i._tintRGB = t, i._tintR = t >> 16 & 255, i._tintG = t >> 8 & 255, i._tintB = 255 & t)
            }
        }), Object.defineProperty(i, "tintR", {
            get: function () {
                return i._tintR
            }, set: function (t) {
                var e;
                t = 255 & Math.floor(t), i._tintR !== t && (i._tintR = t, i._tintRGB = (e = i._tintRGB, (255 & t) << 16 | 65535 & e), i.tint = i._tintRGB)
            }
        }), Object.defineProperty(i, "tintG", {
            get: function () {
                return i._tintG
            }, set: function (t) {
                var e;
                t = 255 & Math.floor(t), i._tintG !== t && (i._tintG = t, i._tintRGB = (e = i._tintRGB, (255 & t) << 8 | 16711935 & e), i.tint = i._tintRGB)
            }
        }), Object.defineProperty(i, "tintB", {
            get: function () {
                return i._tintB
            }, set: function (t) {
                var e;
                t = 255 & Math.floor(t), i._tintB !== t && (i._tintB = t, i._tintRGB = (e = i._tintRGB, 255 & t | 16776960 & e), i.tint = i._tintRGB)
            }
        }), Object.defineProperty(i, "tintGray", {
            get: function () {
                return Math.floor((i._tintR + i._tintG + i._tintB) / 3)
            }, set: function (t) {
                t = 255 & Math.floor(t), i._tintR === t && i._tintG === t && i._tintB === t || (i._tintR = t, i._tintG = t, i._tintB = t, i._tintRGB = (i._tintRGB, (255 & t) << 16 | (255 & t) << 8 | 255 & t), i.tint = i._tintRGB)
            }
        }), i.tint = t), i
    }

    var uo = Phaser.Utils.Objects.GetValue, co = Phaser.Utils.Objects.GetAdvancedValue, fo = function () {
        b(r, oo);
        var s = w(r);

        function r(t, e, i) {
            var n;
            return B(this, r), e.scene = t, (n = s.call(this, e)).sound = e, n.volume = {}, n.resetFromJSON(i), n
        }

        return m(r, [{
            key: "resetFromJSON", value: function (t) {
                return this.setMode(uo(t, "mode", 0)), this.setVolumeRange(co(t, "volume.start", this.sound.volume), co(t, "volume.end", 0)), this.setDelay(co(t, "delay", 0)), this.setFadeOutTime(co(t, "duration", 1e3)), this
            }
        }, {
            key: "toJSON", value: function () {
                return {mode: this.mode, volume: this.volume, delay: this.delay, duration: this.duration}
            }
        }, {
            key: "shutdown", value: function () {
                if (!this.sound) return this;
                this.sound.off("destroy", this.destroy, this), this.sound = void 0, C(x(r.prototype), "shutdown", this).call(this)
            }
        }, {
            key: "setMode", value: function (t) {
                return "string" == typeof t && (t = po[t]), this.mode = t, this
            }
        }, {
            key: "setVolumeRange", value: function (t, e) {
                return this.volume.start = t, this.volume.end = e, this
            }
        }, {
            key: "setDelay", value: function (t) {
                return this.delay = t, this
            }
        }, {
            key: "setFadeOutTime", value: function (t) {
                return this.duration = t, this
            }
        }, {
            key: "start", value: function () {
                if (this.isRunning) return this;
                var t = this.volume.start, e = this.volume.end;
                this.sound.setVolume(t);
                var i = {
                    targets: this.sound,
                    volume: {start: t, from: t, to: e},
                    delay: this.delay,
                    duration: this.duration,
                    ease: "Linear",
                    onComplete: function () {
                        switch (this.mode) {
                            case 1:
                                this.sound.stop();
                                break;
                            case 2:
                                this.sound.destroy()
                        }
                    },
                    onCompleteScope: this
                };
                return C(x(r.prototype), "start", this).call(this, i), this
            }
        }]), r
    }(), po = {stop: 1, destroy: 2}, vo = Phaser.Utils.Objects.GetValue, go = function () {
        function n(t, e) {
            B(this, n), this.scene = t, this.soundEffect = void 0, this.backgroundMusic = void 0, this.setBackgroundMusicLoopValue(vo(e, "bgm.loop", !0)), this.setBackgroundMusicFadeTime(vo(e, "bgm.fade", 500));
            var i = vo(e, "bgm.initial", void 0);
            i && this.setCurrentBackgroundMusic(i)
        }

        return m(n, [{
            key: "destroy", value: function (t) {
                this.soundEffect && !t && (this.soundEffect.destroy(), this.soundEffect = void 0), this.backgroundMusic && !t && (this.backgroundMusic.destroy(), this.backgroundMusic = void 0), this.scene = void 0
            }
        }, {
            key: "setBackgroundMusicLoopValue", value: function (t) {
                return this.backgroundMusicLoopValue = t, this
            }
        }, {
            key: "setBackgroundMusicFadeTime", value: function (t) {
                return this.backgroundMusicFadeTime = t, this
            }
        }, {
            key: "getSoundEffect", value: function () {
                return this.soundEffect
            }
        }, {
            key: "getBackgroundMusic", value: function () {
                return this.backgroundMusic
            }
        }, {
            key: "playSoundEffect", value: function (t) {
                return this.soundEffect = this.scene.sound.add(t), this.soundEffect.once("complete", function () {
                    this.soundEffect.destroy(), this.soundEffect = void 0
                }, this).once("destroy", function () {
                    this.soundEffect = void 0
                }, this).play(), this
            }
        }, {
            key: "setSoundEffectVolume", value: function (t) {
                return this.soundEffect && this.soundEffect.setVolume(t), this
            }
        }, {
            key: "fadeInSoundEffect", value: function (t) {
                return this.soundEffect && ao(this.scene, this.soundEffect, t), this
            }
        }, {
            key: "fadeOutSoundEffect", value: function (t, e) {
                return this.soundEffect && ho(this.scene, this.soundEffect, t, e), this
            }
        }, {
            key: "setCurrentBackgroundMusic", value: function (t) {
                (this.backgroundMusic = t) && (t.setLoop(this.backgroundMusicLoopValue), t.once("complete", function () {
                    this.backgroundMusic.destroy(), this.backgroundMusic = void 0
                }, this).once("destroy", function () {
                    this.backgroundMusic = void 0
                }, this), t.isPlaying || t.play())
            }
        }, {
            key: "playBackgroundMusic", value: function (t) {
                return this.backgroundMusic && this.backgroundMusic.key === t || (this.stopBackgroundMusic(), this.setCurrentBackgroundMusic(this.scene.sound.add(t)), 0 < this.backgroundMusicFadeTime && this.fadeInBackgroundMusic(this.backgroundMusicFadeTime)), this
            }
        }, {
            key: "pauseBackgroundMusic", value: function () {
                return this.backgroundMusic && this.backgroundMusic.pause(), this
            }
        }, {
            key: "resumeBackgroundMusic", value: function () {
                return this.backgroundMusic && this.backgroundMusic.resume(), this
            }
        }, {
            key: "stopBackgroundMusic", value: function () {
                return this.backgroundMusic && (0 < this.backgroundMusicFadeTime ? this.fadeOutBackgroundMusic(this.backgroundMusicFadeTime, !0) : (this.backgroundMusic.stop(), this.backgroundMusic.destroy(), this.backgroundMusic = void 0)), this
            }
        }, {
            key: "fadeInBackgroundMusic", value: function (t) {
                return this.backgroundMusic && ao(this.scene, this.backgroundMusic, t), this
            }
        }, {
            key: "fadeOutBackgroundMusic", value: function (t, e) {
                return this.backgroundMusic && ho(this.scene, this.backgroundMusic, t, e), this
            }
        }, {
            key: "crossFadeBackgroundMusic", value: function (t, e) {
                var i = this.backgroundMusicFadeTime;
                return this.backgroundMusicFadeTime = 0, this.fadeOutBackgroundMusic(e, !0).playBackgroundMusic(t).fadeInBackgroundMusic(e), this.backgroundMusicFadeTime = i, this
            }
        }]), n
    }(), yo = function () {
        function n(t, e, i) {
            B(this, n), this.spriteManager = t, this.sprite = e.setName(i), this.tweens = {}, this.name = i
        }

        return m(n, [{
            key: "scene", get: function () {
                return this.spriteManager.scene
            }
        }, {
            key: "destroy", value: function () {
                this.freeSprite().freeTweens(), this.spriteManager = void 0
            }
        }, {
            key: "freeSprite", value: function () {
                return this.sprite.destroy(), this.sprite = void 0, this
            }
        }, {
            key: "freeTweens", value: function () {
                var t = this.tweens;
                for (var e in t) t[e].remove(), delete t[e];
                return this
            }
        }, {
            key: "setProperty", value: function (t, e) {
                return this.sprite[t] = e, this
            }
        }, {
            key: "easeProperty", value: function (t, e, i, n, s, r) {
                var o = this.tweens;
                o.hasOwnProperty(t) && o[t].remove();
                var a = {
                    targets: this.sprite, duration: i, ease: n, yoyo: s, onComplete: function () {
                        o[t].remove(), delete o[t], r && r()
                    }, onCompleteScope: this
                };
                return a[t] = e, o[t] = this.scene.tweens.add(a), this
            }
        }, {
            key: "setTexture", value: function (t, e) {
                return this.sprite.setTexture(t, e), this
            }
        }, {
            key: "playAnimation", value: function (t) {
                return this.sprite.play(t), this
            }
        }, {
            key: "stopAnimation", value: function () {
                return this.sprite.stop(), this
            }
        }, {
            key: "chainAnimation", value: function (t) {
                return this.sprite.chain(t), this
            }
        }, {
            key: "pauseAnimation", value: function () {
                return this.sprite.anims.pause(), this
            }
        }]), n
    }(), ko = Phaser.Utils.Objects.GetValue, mo = Phaser.Utils.Array.Remove, bo = function () {
        function i(t, e) {
            B(this, i), this.scene = t, this.setEventEmitter(ko(e, "eventEmitter", void 0)), this.setCreateCallback(ko(e, "createCallback", "sprite")), this.setSpriteFadeTime(ko(e, "fade", 500)), this.sprites = {}, this.removedSprites = []
        }

        return m(i, [{
            key: "destroy", value: function (t) {
                this.clear(!t), this.createCallback = void 0, this.scene = void 0
            }
        }, {
            key: "setCreateCallback", value: function (t) {
                return this.createCallback = "sprite" === t ? function (t, e, i) {
                    return t.add.sprite(0, 0, e, i)
                } : "image" === t ? function (t, e, i) {
                    return t.add.image(0, 0, e, i)
                } : t, this
            }
        }, {
            key: "setSpriteFadeTime", value: function (t) {
                return this.fadeTime = t, this
            }
        }, {
            key: "has", value: function (t) {
                return this.sprites.hasOwnProperty(t)
            }
        }, {
            key: "get", value: function (t) {
                return this.sprites[t]
            }
        }, {
            key: "getTweenTask", value: function (t, e) {
                if (this.has(t)) {
                    var i = this.get(t).tweens;
                    if (i.hasOwnProperty(e)) return i[e]
                }
                return null
            }
        }, {
            key: "isEmpty", get: function () {
                return function (t) {
                    for (var e in t) return !1;
                    return !0
                }(this.sprites) && 0 === this.removedSprites.length
            }
        }, {
            key: "clear", value: function (t) {
                for (var e in void 0 === t && (t = !0), this.sprites) t && this.sprites[e].destroy(), delete this.sprites[e];
                return this.removedSprites.length = 0, this
            }
        }, {
            key: "add", value: function (t, e, i) {
                var n;
                if (this.remove(t), 3 === arguments.length) n = this.createCallback(this.scene, e, i); else {
                    var s = Array.prototype.slice.call(arguments, 1);
                    n = this.createCallback.apply(this, [this.scene].concat(h(s)))
                }
                0 < this.fadeTime && lo(n), n.once("destroy", function () {
                    mo(this.removedSprites, n), this.isEmpty && this.emit("empty")
                }, this);
                var r = new yo(this, n, t);
                return this.sprites[t] = r, 0 < this.fadeTime && r.setProperty("tintGray", 0).easeProperty("tintGray", 255, this.fadeTime), this
            }
        }, {
            key: "setProperty", value: function (t, e, i) {
                return this.has(t) && this.get(t).setProperty(e, i), this
            }
        }, {
            key: "easeProperty", value: function (t, e, i, n, s, r, o) {
                return this.has(t) && (void 0 === n && (n = 1e3), void 0 === s && (s = "Linear"), this.get(t).easeProperty(e, i, n, s, r, o)), this
            }
        }, {
            key: "remove", value: function (t) {
                if (!this.has(t)) return this;
                var e = this.get(t);
                return delete this.sprites[t], this.removedSprites.push(e.sprite), 0 < this.fadeTime ? e.easeProperty("tintGray", 0, this.fadeTime, "Linear", !1, function () {
                    e.destroy()
                }) : e.destroy(), this
            }
        }, {
            key: "removeAll", value: function () {
                for (var t in this.sprites) this.remove(t);
                return this
            }
        }, {
            key: "setTexture", value: function (t, e, i) {
                return this.has(t) && this.get(t).setTexture(e, i), this
            }
        }, {
            key: "playAnimation", value: function (t, e) {
                return this.has(t) || this.add(t), this.get(t).playAnimation(e), this
            }
        }, {
            key: "stopAnimation", value: function (t) {
                return this.has(t) && this.get(t).stopAnimation(), this
            }
        }, {
            key: "chainAnimation", value: function (t, e) {
                return this.has(t) && this.get(t).chainAnimation(e), this
            }
        }, {
            key: "pauseAnimation", value: function (t) {
                return this.has(t) && this.get(t).pauseAnimation(), this
            }
        }]), i
    }();
    Object.assign(bo.prototype, Gn);
    var xo = Phaser.Utils.Objects.GetValue, Co = {
        setClickTarget: function (t) {
            return Ar(t) ? this.clickEE = t.input : this.clickEE = t.setInteractive(), this
        }, setTargetCamera: function (t) {
            return this.camera = t, this
        }, setNextPageInput: function (s) {
            var r = this;
            this.nextPageInput = s ? "function" == typeof s ? function (t, e, i) {
                var n = is(r, t, e, i);
                s.call(r, n)
            } : function (t, e, i) {
                cs(r, s, t, e, i)
            } : null
        }, addImage: function (t, e) {
            return this.imageManager.add(t, e), this
        }, play: function (t) {
            return this.isPlaying || (this.removeChildren(), this.parser.start(t), this.isPlaying = !0, this.once("complete", function () {
                this.isPlaying = !1
            }, this), this.lastWrapResult = void 0, this.typingNextPage()), this
        }, playPromise: function (t) {
            var e = es(this);
            return this.play(t), e
        }, typingNextPage: function t() {
            if (!this.isPlaying || this.isPageTyping) return this;
            var e = xo(this.wrapConfig, "callback", this.runWordWrap);
            "string" == typeof e && (e = this[e]);
            var i = e.call(this, this.lastWrapResult);
            this.lastWrapResult = i, this.emit("page.start");

            function n() {
                this.emit(jr), i.isLastPage ? this.emit("complete") : (this.emit("page.complete"), this.nextPageInput && this.nextPageInput(t, [], this))
            }

            this.once(jr, function () {
                this.typeWriter.off("complete", n, this)
            }), this.typeWriter.once("complete", n, this).start(i.children)
        }, pause: function () {
            return this.typeWriter.pause(), this
        }, resume: function () {
            return this.typeWriter.resume(), this
        }, setTimeScale: function (t) {
            return this.typeWriter.setTimeScale(t), this
        }, setIgnoreWait: function (t) {
            return this.typeWriter.setIgnoreWait(t), this
        }, showPage: function () {
            if (!this.isPlaying || !this.isPageTyping) return this;
            var t = this.typeWriter.speed, e = this.typeWriter.ignoreWait, i = this.typeWriter.skipTypingAnimation;
            return this.typeWriter.once("complete", function () {
                this.typeWriter.setSpeed(t).setIgnoreWait(e).setSkipTypingAnimation(i)
            }, this).setSpeed(0).skipCurrentTypingDelay().setIgnoreWait(!0).setSkipTypingAnimation(!0), this
        }
    }, wo = Phaser.Utils.Objects.IsPlainObject, So = Phaser.Utils.Objects.GetValue, Po = function () {
        b(d, Fn);
        var c = w(d);

        function d(t, e, i, n, s, r) {
            var o;
            B(this, d), wo(e) ? r = e : wo(n) && (r = n), void 0 === r && (r = {});
            var a = r.text;
            delete r.text, (o = c.call(this, t, e, i, n, s, r)).type = "rexTextPlayer", o.parser = new Br(z(o), So(r, "parser", void 0)), o.typeWriter = new to(z(o), So(r, "typing", void 0)), o._imageManager = void 0;
            var h = So(r, "images", void 0);
            h && o.addImage(h), o._soundManager = void 0;
            var l = So(r, "sounds", void 0);
            l && (o._soundManager = new go(o.scene, l)), o.setTargetCamera(So(r, "camera", o.scene.cameras.main)), o._spriteManager = void 0;
            var u = So(r, "sprites", void 0);
            return u && (o._spriteManager = new bo(o.scene, u)), o.setClickTarget(So(r, "clickTarget", z(o))), o.setNextPageInput(So(r, "nextPageInput", null)), o.isPlaying = !1, a && o.play(a), o
        }

        return m(d, [{
            key: "imageManager", get: function () {
                return void 0 === this._imageManager && (this._imageManager = new ce(this.scene)), this._imageManager
            }
        }, {
            key: "soundManager", get: function () {
                return void 0 === this._soundManager && (this._soundManager = new go(this.scene)), this._soundManager
            }
        }, {
            key: "spriteManager", get: function () {
                return void 0 === this._spriteManager && (this._spriteManager = new bo(this.scene)), this._spriteManager
            }
        }, {
            key: "destroy", value: function (t) {
                this.scene && (function (t) {
                    for (var e = 0, i = Rr.length; e < i; e++) t.emit(Rr[e])
                }(this), this.parser.destroy(), this.parser = void 0, this.typeWriter.destroy(t), this.typeWriter = void 0, this._imageManager && this._imageManager.destroy(t), this._imageManager = void 0, this._soundManager && this._soundManager.destroy(t), this._soundManager = void 0, this.camera = void 0, this._spriteManager && this._spriteManager.destroy(t), this._spriteManager = void 0, this.clickEE = void 0, C(x(d.prototype), "destroy", this).call(this, t))
            }
        }, {
            key: "isPageTyping", get: function () {
                return this.typeWriter.isPageTyping
            }
        }]), d
    }();
    Object.assign(Po.prototype, Co), u.register("textPlayer", function (t, e, i, n, s) {
        var r = new Po(this.scene, t, e, i, n, s);
        return this.scene.add.existing(r), r
    }), H(window, "RexPlugins.UI.TextPlayer", Po);

    function To(t, e, i, n, s, r, o, a, h, l, u, c) {
        void 0 === l && (l = 0), void 0 === u && (u = 2 * Math.PI), void 0 === c && (c = !1), e.beginPath(), e.ellipse(i, n, s, r, 0, l, u, c), null != o && (e.fillStyle = o, e.fill()), null != a && (e.strokeStyle = a, e.lineWidth = h, e.stroke())
    }

    function Oo() {
        var t, e, i, n, s, r, o, a, h, l, u = this.radius, c = this.thickness * this.radius, d = this.radius - c / 2,
            f = this.radius - c;
        if (this.trackColor && 0 < c && To(this.canvas, this.context, u, u, d, d, void 0, this.trackColor, c), this.barColor && 0 < d) {
            var p, v, g;
            if (1 === this.value) p = !1, v = 0, g = 2 * Math.PI; else p = this.anticlockwise, v = this.startAngle, g = 2 * Math.PI * (p ? 1 - this.value : this.value) + v;
            To(this.canvas, this.context, u, u, d, d, void 0, this.barColor, c, v, g, p)
        }
        this.centerColor && 0 < f && (this.centerColor2 ? ((t = this.context.createRadialGradient(u, u, 0, u, u, f)).addColorStop(0, this.centerColor), t.addColorStop(1, this.centerColor2)) : t = this.centerColor, To(this.canvas, this.context, u, u, f, f, t)), this.textFormatCallback && (this.textColor || this.textStrokeColor) && (this.canvas, e = this.context, n = i = u, s = this.getFormatText(), r = "center", o = this.textFont, a = this.textColor, h = this.textStrokeColor, void 0 === (l = this.textStrokeThickness) && null != h && (l = 2), e.font = o, e.textAlign = r, null != a && (e.fillStyle = a, e.fillText(s, i, n)), null != h && 0 < strokeThickness && (e.strokeStyle = h, e.lineWidth = l, e.strokeText(s, i, n)))
    }

    var Mo = Phaser.Utils.Objects.GetValue, _o = Phaser.Utils.Objects.IsPlainObject, Eo = Phaser.Math.Clamp,
        Bo = Phaser.Math.DegToRad(270), zo = function () {
            b(u, Q);
            var l = w(u);

            function u(t, e, i, n, s, r, o) {
                var a;
                B(this, u), _o(e) && (e = Mo(o = e, "x", 0), i = Mo(o, "y", 0), n = Mo(o, "radius", 1), s = Mo(o, "barColor", void 0), r = Mo(o, "value", 0));
                var h = 2 * n;
                return (a = l.call(this, t, e, i, h, h)).type = "rexCircularProgressCanvas", a.setRadius(n), a.setTrackColor(Mo(o, "trackColor", void 0)), a.setBarColor(s), a.setCenterColor(Mo(o, "centerColor", void 0)), a.setThickness(Mo(o, "thickness", .2)), a.setStartAngle(Mo(o, "startAngle", Bo)), a.setAnticlockwise(Mo(o, "anticlockwise", !1)), a.setTextColor(Mo(o, "textColor", void 0)), a.setTextStrokeColor(Mo(o, "textStrokeColor", void 0), Mo(o, "textStrokeThickness", void 0)), a.setTextFont(Mo(o, "textSize", "16px"), Mo(o, "textFamily", "Courier"), Mo(o, "textStyle", "")), a.setTextFormatCallback(Mo(o, "textFormatCallback", void 0), Mo(o, "textFormatCallbackScope", void 0)), a.setValue(r), a
            }

            return m(u, [{
                key: "resize", value: function (t, e) {
                    return (t = Math.floor(Math.min(t, e))) === this.width || (C(x(u.prototype), "resize", this).call(this, t, t), this.setRadius(t / 2)), this
                }
            }, {
                key: "value", get: function () {
                    return this._value
                }, set: function (t) {
                    t = Eo(t, 0, 1), this.dirty = this.dirty || this._value != t, this._value = t
                }
            }, {
                key: "setValue", value: function (t) {
                    return this.value = t, this
                }
            }, {
                key: "radius", get: function () {
                    return this._radius
                }, set: function (t) {
                    this.dirty = this.dirty || this._radius != t;
                    var e = 2 * (this._radius = t);
                    this.resize(e, e)
                }
            }, {
                key: "setRadius", value: function (t) {
                    return this.radius = t, this
                }
            }, {
                key: "trackColor", get: function () {
                    return this._trackColor
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.dirty = this.dirty || this._trackColor != t, this._trackColor = t
                }
            }, {
                key: "setTrackColor", value: function (t) {
                    return this.trackColor = t, this
                }
            }, {
                key: "barColor", get: function () {
                    return this._barColor
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.dirty = this.dirty || this._barColor != t, this._barColor = t
                }
            }, {
                key: "setBarColor", value: function (t) {
                    return this.barColor = t, this
                }
            }, {
                key: "startAngle", get: function () {
                    return this._startAngle
                }, set: function (t) {
                    this.dirty = this.dirty || this._startAngle != t, this._startAngle = t
                }
            }, {
                key: "setStartAngle", value: function (t) {
                    return this.startAngle = t, this
                }
            }, {
                key: "anticlockwise", get: function () {
                    return this._anticlockwise
                }, set: function (t) {
                    this.dirty = this.dirty || this._anticlockwise != t, this._anticlockwise = t
                }
            }, {
                key: "setAnticlockwise", value: function (t) {
                    return void 0 === t && (t = !0), this.anticlockwise = t, this
                }
            }, {
                key: "thickness", get: function () {
                    return this._thickness
                }, set: function (t) {
                    t = Eo(t, 0, 1), this.dirty = this.dirty || this._thickness != t, this._thickness = t
                }
            }, {
                key: "setThickness", value: function (t) {
                    return this.thickness = t, this
                }
            }, {
                key: "centerColor", get: function () {
                    return this._centerColor
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.dirty = this.dirty || this._centerColor != t, this._centerColor = t
                }
            }, {
                key: "centerColor2", get: function () {
                    return this._centerColor2
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.dirty = this.dirty || this._centerColor2 != t, this._centerColor2 = t
                }
            }, {
                key: "setCenterColor", value: function (t, e) {
                    return this.centerColor = t, this.centerColor2 = e, this
                }
            }, {
                key: "textColor", get: function () {
                    return this._textColor
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.dirty = this.dirty || this._textColor != t, this._textColor = t
                }
            }, {
                key: "setTextColor", value: function (t) {
                    return this.textColor = t, this
                }
            }, {
                key: "textStrokeColor", get: function () {
                    return this._textStrokeColor
                }, set: function (t) {
                    t = et(t, this.canvas, this.context), this.dirty = this.dirty || this._textStrokeColor != t, this._textStrokeColor = t
                }
            }, {
                key: "textStrokeThickness", get: function () {
                    return this._textStrokeThickness
                }, set: function (t) {
                    this.dirty = this.dirty || this._textStrokeThickness != t, this._textStrokeThickness = t
                }
            }, {
                key: "setTextStrokeColor", value: function (t, e) {
                    return void 0 === e && (e = 2), this.textStrokeColor = t, this.textStrokeThickness = e, this
                }
            }, {
                key: "textFont", get: function () {
                    return this._textFont
                }, set: function (t) {
                    this.dirty = this.dirty || this._textFont != t, this._textFont = t
                }
            }, {
                key: "setTextFont", value: function (t, e, i) {
                    var n = i + " " + t + " " + e;
                    return this.textFont = n, this
                }
            }, {
                key: "setTextFormatCallback", value: function (t, e) {
                    return this.textFormatCallback = t, this.textFormatCallbackScope = e, this
                }
            }, {
                key: "updateTexture", value: function () {
                    return this.clear(), Oo.call(this), C(x(u.prototype), "updateTexture", this).call(this), this
                }
            }, {
                key: "getFormatText", value: function (t) {
                    return void 0 === t && (t = this.value), this.textFormatCallbackScope ? this.textFormatCallback(t) : this.textFormatCallback.call(this.textFormatCallbackScope, t)
                }
            }]), u
        }();
    u.register("circularProgressCanvas", function (t, e, i, n, s, r) {
        var o = new zo(this.scene, t, e, i, n, s, r);
        return this.scene.add.existing(o), o
    }), H(window, "RexPlugins.UI.CircularProgressCanvas", zo);
    var jo = Phaser.Renderer.Canvas.SetTransform, Ro = {
        renderWebGL: function (t, e, i, n) {
            e.dirty && (e.updateData(), e.dirty = !1), i.addToRenderList(e);
            var s = t.pipelines.set(e.pipeline), r = R(e, i, n), o = s.calcMatrix.copyFrom(r.calc),
                a = e._displayOriginX, h = e._displayOriginY, l = i.alpha * e.alpha;
            t.pipelines.preBatch(e);
            for (var u = e.geom, c = 0, d = u.length; c < d; c++) u[c].webglRender(s, o, l, a, h);
            t.pipelines.postBatch(e)
        }, renderCanvas: function (t, e, i, n) {
            e.dirty && (e.updateData(), e.dirty = !1), i.addToRenderList(e);
            var s = t.currentContext;
            if (jo(t, s, e, i, n)) {
                for (var r = e._displayOriginX, o = e._displayOriginY, a = e.geom, h = 0, l = a.length; h < l; h++) a[h].canvasRender(s, r, o);
                s.restore()
            }
        }
    }, Do = Phaser.GameObjects.Shape, Lo = Phaser.Utils.Array.Remove, Io = function () {
        b(a, Do);
        var o = w(a);

        function a(t, e, i, n, s) {
            var r;
            return B(this, a), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === s && (s = n), (r = o.call(this, t, "rexShapes", []))._width = -1, r._height = -1, r.shapes = {}, r.setPosition(e, i), r.setSize(n, s), r.updateDisplayOrigin(), r.dirty = !0, r
        }

        return m(a, [{
            key: "width", get: function () {
                return this._width
            }, set: function (t) {
                this.setSize(t, this._height)
            }
        }, {
            key: "height", get: function () {
                return this._height
            }, set: function (t) {
                this.setSize(this._width, t)
            }
        }, {
            key: "setDirty", value: function (t) {
                return void 0 === t && (t = !0), this.dirty = t, this
            }
        }, {
            key: "setSize", value: function (t, e) {
                this.dirty = this.dirty || this._width !== t || this._height !== e, this._width = t, this._height = e, this.updateDisplayOrigin();
                var i = this.input;
                return i && !i.customHitArea && (i.hitArea.width = t, i.hitArea.height = e), this
            }
        }, {
            key: "resize", value: function (t, e) {
                return this.setSize(t, e), this
            }
        }, {
            key: "updateShapes", value: function () {
            }
        }, {
            key: "updateData", value: function () {
                this.updateShapes();
                for (var t = this.geom, e = 0, i = t.length; e < i; e++) {
                    var n = t[e];
                    n.dirty && n.updateData()
                }
                return this
            }
        }, {
            key: "clear", value: function () {
                return this.geom.length = 0, pt(this.shapes), this
            }
        }, {
            key: "getShape", value: function (t) {
                return this.shapes[t]
            }
        }, {
            key: "getShapes", value: function () {
                return this.geom
            }
        }, {
            key: "addShape", value: function (t) {
                this.geom.push(t);
                var e = t.name;
                return e && (this.shapes[e] = t), this.dirty = !0, this
            }
        }, {
            key: "deleteShape", value: function (t) {
                var e = this.getShape(t);
                return e && (delete this.shapes[t], Lo(this.geom, e)), this
            }
        }]), a
    }();
    Object.assign(Io.prototype, Ro);
    var Yo = {
        fillStyle: function (t, e) {
            return void 0 === t ? this.isFilled = !1 : (void 0 === e && (e = 1), this.isFilled = !0, this.fillColor = t, this.fillAlpha = e), this
        }, lineStyle: function (t, e, i) {
            return void 0 === t ? this.isStroked = !1 : (void 0 === i && (i = 1), this.isStroked = !0, this.lineWidth = t, this.strokeColor = e, this.strokeAlpha = i), this
        }
    }, Ao = {
        setData: function (t, e) {
            return void 0 === this.data && (this.data = {}), this.data[t] = e, this
        }, getData: function (t, e) {
            return void 0 === this.data && (this.data = {}), this.data.hasOwnProperty(t) || (this.data[t] = e), this.data[t]
        }
    }, Fo = function () {
        function t() {
            B(this, t), this.name = void 0, this.dirty = !0, this.data = void 0, this.isFilled = !1, this.fillColor = void 0, this.fillAlpha = 1, this.isStroked = !1, this.lineWidth = 1, this.strokeColor = void 0, this.strokeAlpha = 1
        }

        return m(t, [{
            key: "setName", value: function (t) {
                return this.name = t, this
            }
        }, {
            key: "reset", value: function () {
                return this.fillStyle(), this.lineStyle(), this
            }
        }, {
            key: "webglRender", value: function () {
            }
        }, {
            key: "canvasRender", value: function () {
            }
        }, {
            key: "updateData", value: function () {
            }
        }]), t
    }();
    Object.assign(Fo.prototype, Yo, Ao);
    var Wo = Phaser.Geom.Polygon.Earcut, Vo = function () {
            b(i, Fo);
            var e = w(i);

            function i() {
                var t;
                return B(this, i), (t = e.call(this)).pathData = [], t.pathIndexes = [], t.closePath = !1, t
            }

            return m(i, [{
                key: "updateData", value: function () {
                    return this.pathIndexes = Wo(this.pathData), this.dirty = !1, this
                }
            }, {
                key: "webglRender", value: function (t, e, i, n, s) {
                    this.isFilled && y(t, e, this, i, n, s), this.isStroked && O(t, this, i, n, s)
                }
            }, {
                key: "canvasRender", value: function (t, e, i) {
                    var n = this.pathData, s = n.length - 1, r = n[0] - e, o = n[1] - i;
                    t.beginPath(), t.moveTo(r, o), this.closePath || (s -= 2);
                    for (var a = 2; a < s; a += 2) {
                        var h = n[a] - e, l = n[a + 1] - i;
                        t.lineTo(h, l)
                    }
                    this.closePath && t.closePath(), this.isFilled && (D(t, this), t.fill()), this.isStroked && (L(t, this), t.stroke())
                }
            }]), i
        }(), Xo = Phaser.Math.DegToRad, Go = function () {
            b(u, Vo);
            var l = w(u);

            function u(t, e, i, n, s, r, o, a) {
                var h;
                return B(this, u), void 0 === a && (a = !1), (h = l.call(this)).setCenterPosition(t, e), h.setRadius(i, n), h.setAngle(s, r, o), h.setPie(a), h.setIterations(32), h
            }

            return m(u, [{
                key: "x", get: function () {
                    return this._x
                }, set: function (t) {
                    this.dirty = this.dirty || this._x !== t, this._x = t
                }
            }, {
                key: "y", get: function () {
                    return this._y
                }, set: function (t) {
                    this.dirty = this.dirty || this._y !== t, this._y = t
                }
            }, {
                key: "setCenterPosition", value: function (t, e) {
                    return this.x = t, this.y = e, this
                }
            }, {
                key: "radiusX", get: function () {
                    return this._radiusX
                }, set: function (t) {
                    this.dirty = this.dirty || this._radiusX !== t, this._radiusX = t
                }
            }, {
                key: "radiusY", get: function () {
                    return this._radiusY
                }, set: function (t) {
                    this.dirty = this.dirty || this._radiusY !== t, this._radiusY = t
                }
            }, {
                key: "setRadius", value: function (t, e) {
                    return void 0 === e && (e = t), this.radiusX = t, this.radiusY = e, this
                }
            }, {
                key: "startAngle", get: function () {
                    return this._startAngle
                }, set: function (t) {
                    this.dirty = this.dirty || this._startAngle !== t, this._startAngle = t
                }
            }, {
                key: "endAngle", get: function () {
                    return this._endAngle
                }, set: function (t) {
                    this.dirty = this.dirty || this._endAngle !== t, this._endAngle = t
                }
            }, {
                key: "anticlockwise", get: function () {
                    return this._anticlockwise
                }, set: function (t) {
                    this.dirty = this.dirty || this._anticlockwise !== t, this._anticlockwise = t
                }
            }, {
                key: "setAngle", value: function (t, e, i) {
                    return void 0 === i && (i = !1), this.startAngle = t, this.endAngle = e, this.anticlockwise = i, this
                }
            }, {
                key: "pie", get: function () {
                    return this._pie
                }, set: function (t) {
                    this.dirty = this.dirty || this._pie !== t, this._pie = t
                }
            }, {
                key: "setPie", value: function (t) {
                    return void 0 === t && (t = !0), this.pie = t, this
                }
            }, {
                key: "iterations", get: function () {
                    return this._iterations
                }, set: function (t) {
                    this.dirty = this.dirty || this._iterations !== t, this._iterations = t
                }
            }, {
                key: "setIterations", value: function (t) {
                    return this.iterations = t, this
                }
            }, {
                key: "updateData", value: function () {
                    return this.pathData.length = 0, this.pie && this.pathData.push(this.x, this.y), c(this.x, this.y, this.radiusX, this.radiusY, this.startAngle, this.endAngle, this.anticlockwise, this.iterations, this.pathData), this.pie && this.pathData.push(this.x, this.y), this.pathData.push(this.pathData[0], this.pathData[1]), C(x(u.prototype), "updateData", this).call(this), this
                }
            }, {
                key: "canvasRender", value: function (t, e, i) {
                    t.beginPath();
                    var n = this.x - e, s = this.y - i, r = Xo(this.startAngle), o = Xo(this.endAngle);
                    this.pie && (t.moveTo(n, s), t.lineTo(n + Math.cos(r) * this.radiusX, s + Math.sin(r) * this.radiusY)), t.ellipse(n, s, this.radiusX, this.radiusY, 0, r, o, this.anticlockwise), this.pie && t.lineTo(n, s), this.isFilled && (D(t, this), t.fill()), this.isStroked && (L(t, this), t.stroke())
                }
            }]), u
        }(), Ho = function () {
            b(s, Go);
            var n = w(s);

            function s(t, e, i) {
                return B(this, s), n.call(this, t, e, i, i, 0, 360)
            }

            return s
        }(), Uo = function () {
            b(n, Vo);
            var i = w(n);

            function n(t) {
                var e;
                return B(this, n), (e = i.call(this)).setCurve(t), e.setIterations(32), e
            }

            return m(n, [{
                key: "curve", get: function () {
                    return this._curve
                }, set: function (t) {
                    this.dirty = this.dirty || this._curve !== t, this._curve = t
                }
            }, {
                key: "setCurve", value: function (t) {
                    return this.curve = t, this
                }
            }, {
                key: "iterations", get: function () {
                    return this._iterations
                }, set: function (t) {
                    this.dirty = this.dirty || this._iterations !== t, this._iterations = t
                }
            }, {
                key: "setIterations", value: function (t) {
                    return this.iterations = t, this
                }
            }, {
                key: "updateData", value: function () {
                    this.pathData.length = 0;
                    for (var t = this.curve.getPoints(this.iterations), e = 0, i = t.length; e < i; e++) this.pathData.push(t[e].x, t[e].y);
                    return this.pathData.push(t[0].x, t[0].y), C(x(n.prototype), "updateData", this).call(this), this
                }
            }]), n
        }(), No = function () {
            b(r, Go);
            var s = w(r);

            function r(t, e, i, n) {
                return B(this, r), s.call(this, t, e, i, n, 0, 360)
            }

            return r
        }(), Jo = function () {
            b(o, Vo);
            var r = w(o);

            function o(t, e, i, n) {
                var s;
                return B(this, o), (s = r.call(this)).setP0(t, e), s.setP1(i, n), s
            }

            return m(o, [{
                key: "x0", get: function () {
                    return this._x0
                }, set: function (t) {
                    this.dirty = this.dirty || this._x0 !== t, this._x0 = t
                }
            }, {
                key: "y0", get: function () {
                    return this._y0
                }, set: function (t) {
                    this.dirty = this.dirty || this._y0 !== t, this._y0 = t
                }
            }, {
                key: "setP0", value: function (t, e) {
                    return this.x0 = t, this.y0 = e, this
                }
            }, {
                key: "x1", get: function () {
                    return this._x1
                }, set: function (t) {
                    this.dirty = this.dirty || this._x1 !== t, this._x1 = t
                }
            }, {
                key: "y1", get: function () {
                    return this._y1
                }, set: function (t) {
                    this.dirty = this.dirty || this._y1 !== t, this._y1 = t
                }
            }, {
                key: "setP1", value: function (t, e) {
                    return this.x1 = t, this.y1 = e, this
                }
            }, {
                key: "updateData", value: function () {
                    return this.pathData.length = 0, this.pathData.push(this.x0, this.y0), this.pathData.push(this.x1, this.y1), this.pathData.push(this.x0, this.y0), C(x(o.prototype), "updateData", this).call(this), this
                }
            }]), o
        }(), Ko = Phaser.Math.DegToRad, Zo = Phaser.Math.RotateAround, qo = Phaser.Math.Interpolation.QuadraticBezier,
        $o = Phaser.Math.Interpolation.CubicBezier, Qo = function () {
            b(i, Vo);
            var e = w(i);

            function i() {
                var t;
                return B(this, i), (t = e.call(this)).setIterations(32), t
            }

            return m(i, [{
                key: "iterations", get: function () {
                    return this._iterations
                }, set: function (t) {
                    this.dirty = this.dirty || this._iterations !== t, this._iterations = t
                }
            }, {
                key: "setIterations", value: function (t) {
                    return this.iterations = t, this
                }
            }, {
                key: "startAt", value: function (t, e) {
                    return this.dirty = !0, this.pathData.length = 0, this.pathData.push(t, e), this.lastPointX = t, this.lastPointY = e, this
                }
            }, {
                key: "lineTo", value: function (t, e, i) {
                    return void 0 === i && (i = !1), i && (t += this.lastPointX, e += this.lastPointY), this.dirty = !0, this.pathData.push(t, e), this.lastPointX = t, this.lastPointY = e, this
                }
            }, {
                key: "verticalLineTo", value: function (t, e) {
                    return this.lineTo(t, this.lastPointY, e), this
                }
            }, {
                key: "horizontalLineTo", value: function (t, e) {
                    return this.lineTo(this.lastPointX, t, e), this
                }
            }, {
                key: "ellipticalArc", value: function (t, e, i, n, s, r, o) {
                    void 0 === o && (o = !1), this.dirty = !0, c(t, e, i, n, s, r, o, this.iterations, this.pathData);
                    var a = this.pathData.length;
                    return this.lastPointX = this.pathData[a - 2], this.lastPointY = this.pathData[a - 1], this
                }
            }, {
                key: "arc", value: function (t, e, i, n, s, r) {
                    return this.ellipticalArc(t, e, i, i, n, s, r), this
                }
            }, {
                key: "quadraticBezierTo", value: function (t, e, i, n) {
                    this.dirty = !0;
                    for (var s = this.lastPointX, r = this.lastPointY, o = 1, a = this.iterations - 1; o <= a; o++) {
                        var h = o / a;
                        this.pathData.push(qo(h, s, t, i), qo(h, r, e, n))
                    }
                    return this.lastPointX = i, this.lastPointY = n, this.lastCX = t, this.lastCY = e, this
                }
            }, {
                key: "smoothQuadraticBezierTo", value: function (t, e) {
                    var i = 2 * this.lastPointX - this.lastCX, n = 2 * this.lastPointY - this.lastCY;
                    return this.quadraticBezierTo(i, n, t, e)
                }
            }, {
                key: "cubicBezierCurveTo", value: function (t, e, i, n, s, r) {
                    this.dirty = !0;
                    for (var o = this.lastPointX, a = this.lastPointY, h = 1, l = this.iterations - 1; h <= l; h++) {
                        var u = h / l;
                        this.pathData.push($o(u, o, t, i, s), $o(u, a, e, n, r))
                    }
                    return this.lastPointX = s, this.lastPointY = r, this.lastCX = i, this.lastCY = n, this
                }
            }, {
                key: "smoothCubicBezierCurveTo", value: function (t, e, i, n) {
                    var s = 2 * this.lastPointX - this.lastCX, r = 2 * this.lastPointY - this.lastCY;
                    return this.cubicBezierCurveTo(s, r, t, e, i, n)
                }
            }, {
                key: "close", value: function () {
                    return this.dirty = !0, this.closePath = !0, this
                }
            }, {
                key: "rotateAround", value: function (t, e, i) {
                    if (0 === this.pathData.length) return this;
                    i = Ko(i);
                    for (var n = {
                        x: 0,
                        y: 0
                    }, s = 0, r = this.pathData.length - 1; s < r; s += 2) n.x = this.pathData[s], n.y = this.pathData[s + 1], Zo(n, t, e, i), this.pathData[s] = n.x, this.pathData[s + 1] = n.y;
                    var o = this.pathData.length;
                    return this.lastPointX = this.pathData[o - 2], this.lastPointY = this.pathData[o - 1], void 0 !== this.lastCX && (n.x = this.lastCX, n.y = this.lastCY, Zo(n, t, e, i), this.lastCX = n.x, this.lastCY = n.y), this
                }
            }]), i
        }(), ta = Phaser.Renderer.WebGL.Utils, ea = function () {
            b(o, Fo);
            var r = w(o);

            function o(t, e, i, n) {
                var s;
                return B(this, o), void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = i), (s = r.call(this)).pathData = [], s.closePath = !0, s.setTopLeftPosition(t, e), s.setSize(i, n), s
            }

            return m(o, [{
                key: "x", get: function () {
                    return this._x
                }, set: function (t) {
                    this.dirty = this.dirty || this._x !== t, this._x = t
                }
            }, {
                key: "y", get: function () {
                    return this._y
                }, set: function (t) {
                    this.dirty = this.dirty || this._y !== t, this._y = t
                }
            }, {
                key: "setTopLeftPosition", value: function (t, e) {
                    return this.x = t, this.y = e, this
                }
            }, {
                key: "width", get: function () {
                    return this._width
                }, set: function (t) {
                    this.dirty = this.dirty || this._width !== t, this._width = t
                }
            }, {
                key: "height", get: function () {
                    return this._height
                }, set: function (t) {
                    this.dirty = this.dirty || this._height !== t, this._height = t
                }
            }, {
                key: "setSize", value: function (t, e) {
                    return this.width = t, this.height = e, this
                }
            }, {
                key: "updateData", value: function () {
                    this.pathData.length = 0;
                    var t = this.x, e = t + this.width, i = this.y, n = i + this.height;
                    return this.pathData.push(t, i), this.pathData.push(e, i), this.pathData.push(e, n), this.pathData.push(t, n), this.pathData.push(t, i), this
                }
            }, {
                key: "webglRender", value: function (t, e, i, n, s) {
                    if (this.isFilled) {
                        var r = t.fillTint, o = ta.getTintAppendFloatAlpha(this.fillColor, this.fillAlpha * i);
                        r.TL = o, r.TR = o, r.BL = o, r.BR = o, t.batchFillRect(-n + this.x, -s + this.y, this.width, this.height)
                    }
                    this.isStroked && O(t, this, i, n, s)
                }
            }, {
                key: "canvasRender", value: function (t, e, i) {
                    this.isFilled && (D(t, this), t.fillRect(-e, -i, this.width, this.height)), this.isStroked && (L(t, this), t.beginPath(), t.rect(-e, -i, this.width, this.height), t.stroke())
                }
            }]), o
        }(), ia = Phaser.Renderer.WebGL.Utils, na = function () {
            b(h, Fo);
            var a = w(h);

            function h(t, e, i, n, s, r) {
                var o;
                return B(this, h), (o = a.call(this)).pathData = [], o.closePath = !0, o.setP0(t, e), o.setP1(i, n), o.setP2(s, r), o
            }

            return m(h, [{
                key: "x0", get: function () {
                    return this._x0
                }, set: function (t) {
                    this.dirty = this.dirty || this._x0 !== t, this._x0 = t
                }
            }, {
                key: "y0", get: function () {
                    return this._y0
                }, set: function (t) {
                    this.dirty = this.dirty || this._y0 !== t, this._y0 = t
                }
            }, {
                key: "setP0", value: function (t, e) {
                    return this.x0 = t, this.y0 = e, this
                }
            }, {
                key: "x1", get: function () {
                    return this._x1
                }, set: function (t) {
                    this.dirty = this.dirty || this._x1 !== t, this._x1 = t
                }
            }, {
                key: "y1", get: function () {
                    return this._y1
                }, set: function (t) {
                    this.dirty = this.dirty || this._y1 !== t, this._y1 = t
                }
            }, {
                key: "setP1", value: function (t, e) {
                    return this.x1 = t, this.y1 = e, this
                }
            }, {
                key: "x2", get: function () {
                    return this._x2
                }, set: function (t) {
                    this.dirty = this.dirty || this._x2 !== t, this._x2 = t
                }
            }, {
                key: "y2", get: function () {
                    return this._y2
                }, set: function (t) {
                    this.dirty = this.dirty || this._y2 !== t, this._y2 = t
                }
            }, {
                key: "setP2", value: function (t, e) {
                    return this.dirty = this.dirty || this.x2 !== t || this.y2 !== e, this.x2 = t, this.y2 = e, this
                }
            }, {
                key: "updateData", value: function () {
                    return this.pathData.length = 0, this.pathData.push(this.x0, this.y0), this.pathData.push(this.x1, this.y1), this.pathData.push(this.x2, this.y2), this.pathData.push(this.x0, this.y0), this
                }
            }, {
                key: "webglRender", value: function (t, e, i, n, s) {
                    if (this.isFilled) {
                        var r = ia.getTintAppendFloatAlpha(this.fillColor, this.fillAlpha * i), o = this.x0 - n,
                            a = this.y0 - s, h = this.x1 - n, l = this.y1 - s, u = this.x2 - n, c = this.y2 - s,
                            d = e.getX(o, a), f = e.getY(o, a), p = e.getX(h, l), v = e.getY(h, l), g = e.getX(u, c),
                            y = e.getY(u, c);
                        t.batchTri(d, f, p, v, g, y, r, r, r)
                    }
                    this.isStroked && O(t, this, i, n, s)
                }
            }, {
                key: "canvasRender", value: function (t, e, i) {
                    var n = this.x1 - e, s = this.y1 - i, r = this.x2 - e, o = this.y2 - i, a = this.x3 - e,
                        h = this.y3 - i;
                    t.beginPath(), t.moveTo(n, s), t.lineTo(r, o), t.lineTo(a, h), t.closePath(), this.isFilled && (D(t, this), t.fill()), this.isStroked && (L(t, this), t.stroke())
                }
            }]), h
        }(), sa = Phaser.Utils.Objects.GetValue, ra = Phaser.Utils.Objects.IsPlainObject, oa = Phaser.Math.Clamp,
        aa = Phaser.Math.DegToRad(270), ha = Phaser.Math.RadToDeg, la = function () {
            b(u, Io);
            var l = w(u);

            function u(t, e, i, n, s, r, o) {
                var a;
                B(this, u), ra(e) && (e = sa(o = e, "x", 0), i = sa(o, "y", 0), n = sa(o, "radius", 1), s = sa(o, "barColor", void 0), r = sa(o, "value", 0));
                var h = 2 * n;
                return (a = l.call(this, t, e, i, h, h)).type = "rexCircularProgress", a.addShape((new Ho).setName("track")).addShape((new Go).setName("bar")).addShape((new Ho).setName("center")), a.setRadius(n), a.setTrackColor(sa(o, "trackColor", void 0)), a.setBarColor(s), a.setCenterColor(sa(o, "centerColor", void 0)), a.setThickness(sa(o, "thickness", .2)), a.setStartAngle(sa(o, "startAngle", aa)), a.setAnticlockwise(sa(o, "anticlockwise", !1)), a.setValue(r), a
            }

            return m(u, [{
                key: "resize", value: function (t, e) {
                    return (t = Math.floor(Math.min(t, e))) === this.width || (C(x(u.prototype), "resize", this).call(this, t, t), this.setRadius(t / 2)), this
                }
            }, {
                key: "value", get: function () {
                    return this._value
                }, set: function (t) {
                    t = oa(t, 0, 1), this.dirty = this.dirty || this._value != t, this._value = t
                }
            }, {
                key: "setValue", value: function (t) {
                    return this.value = t, this
                }
            }, {
                key: "radius", get: function () {
                    return this._radius
                }, set: function (t) {
                    this.dirty = this.dirty || this._radius != t;
                    var e = 2 * (this._radius = t);
                    this.resize(e, e)
                }
            }, {
                key: "setRadius", value: function (t) {
                    return this.radius = t, this
                }
            }, {
                key: "trackColor", get: function () {
                    return this._trackColor
                }, set: function (t) {
                    this.dirty = this.dirty || this._trackColor != t, this._trackColor = t
                }
            }, {
                key: "setTrackColor", value: function (t) {
                    return this.trackColor = t, this
                }
            }, {
                key: "barColor", get: function () {
                    return this._barColor
                }, set: function (t) {
                    this.dirty = this.dirty || this._barColor != t, this._barColor = t
                }
            }, {
                key: "setBarColor", value: function (t) {
                    return this.barColor = t, this
                }
            }, {
                key: "startAngle", get: function () {
                    return this._startAngle
                }, set: function (t) {
                    this.dirty = this.dirty || this._startAngle != t, this._startAngle = t
                }
            }, {
                key: "setStartAngle", value: function (t) {
                    return this.startAngle = t, this
                }
            }, {
                key: "anticlockwise", get: function () {
                    return this._anticlockwise
                }, set: function (t) {
                    this.dirty = this.dirty || this._anticlockwise != t, this._anticlockwise = t
                }
            }, {
                key: "setAnticlockwise", value: function (t) {
                    return void 0 === t && (t = !0), this.anticlockwise = t, this
                }
            }, {
                key: "thickness", get: function () {
                    return this._thickness
                }, set: function (t) {
                    t = oa(t, 0, 1), this.dirty = this.dirty || this._thickness != t, this._thickness = t
                }
            }, {
                key: "setThickness", value: function (t) {
                    return this.thickness = t, this
                }
            }, {
                key: "centerColor", get: function () {
                    return this._centerColor
                }, set: function (t) {
                    this.dirty = this.dirty || this._centerColor != t, this._centerColor = t
                }
            }, {
                key: "setCenterColor", value: function (t) {
                    return this.centerColor = t, this
                }
            }, {
                key: "updateShapes", value: function () {
                    var t = this.radius, e = this.thickness * this.radius, i = this.radius - e / 2, n = this.radius - e,
                        s = this.getShape("track");
                    this.trackColor && 0 < e ? s.setCenterPosition(t, t).setRadius(i).lineStyle(e, this.trackColor) : s.reset();
                    var r = this.getShape("bar");
                    if (this.barColor && 0 < i) {
                        var o, a, h;
                        if (1 === this.value) o = !1, a = 0, h = 360; else o = this.anticlockwise, a = ha(this.startAngle), h = 360 * (o ? 1 - this.value : this.value) + a;
                        r.setCenterPosition(t, t).setRadius(i).setAngle(a, h, o).lineStyle(e, this.barColor)
                    } else r.reset();
                    var l = this.getShape("center");
                    this.centerColor && 0 < n ? l.setCenterPosition(t, t).setRadius(n).fillStyle(this.centerColor) : l.reset()
                }
            }]), u
        }();
    u.register("circularProgress", function (t, e, i, n, s, r) {
        var o = new la(this.scene, t, e, i, n, s, r);
        return this.scene.add.existing(o), o
    }), H(window, "RexPlugins.UI.CircularProgress", la);

    function ua(t) {
        return t.hasOwnProperty("rexSizer") || (t.rexSizer = {}), t.rexSizer
    }

    function ca(t, e) {
        void 0 === e && (void 0 === da && (da = new Phaser.Geom.Rectangle), e = da);
        var i = t.game.config;
        return e.setTo(0, 0, i.width, i.height), e
    }

    var da, fa = Phaser.Display.Align, pa = {
        center: fa.CENTER,
        left: fa.LEFT_CENTER,
        right: fa.RIGHT_CENTER,
        top: fa.TOP_CENTER,
        bottom: fa.BOTTOM_CENTER,
        "left-top": fa.TOP_LEFT,
        "left-center": fa.LEFT_CENTER,
        "left-bottom": fa.BOTTOM_LEFT,
        "center-top": fa.TOP_CENTER,
        "center-center": fa.CENTER,
        "center-bottom": fa.BOTTOM_CENTER,
        "right-top": fa.TOP_RIGHT,
        "right-center": fa.RIGHT_CENTER,
        "right-bottom": fa.BOTTOM_RIGHT
    }, va = new Phaser.GameObjects.Zone({sys: {queueDepthSort: gt, events: {once: gt}}}, 0, 0, 1, 1);
    va.setOrigin(0);

    function ga(t) {
        return void 0 !== t.displayWidth ? t.displayWidth : t.width
    }

    function ya(t) {
        return void 0 !== t.displayHeight ? t.displayHeight : t.height
    }

    function ka(t) {
        var e = ya(t);
        return t.y + e - e * t.originY
    }

    function ma(t) {
        var e = ga(t);
        return t.x - e * t.originX + .5 * e
    }

    function ba(t, e) {
        var i = ya(t);
        return t.y = e - i + i * t.originY, t
    }

    function xa(t, e) {
        var i = ga(t), n = i * t.originX;
        return t.x = e + n - .5 * i, t
    }

    function Ca(t) {
        var e = ga(t);
        return t.x - e * t.originX
    }

    function wa(t, e) {
        var i = ga(t);
        return t.x = e + i * t.originX, t
    }

    function Sa(t) {
        var e = ga(t);
        return t.x + e - e * t.originX
    }

    function Pa(t, e) {
        var i = ga(t);
        return t.x = e - i + i * t.originX, t
    }

    function Ta(t, e) {
        var i = ya(t), n = i * t.originY;
        return t.y = e + n - .5 * i, t
    }

    function Oa(t) {
        var e = ya(t);
        return t.y - e * t.originY + .5 * e
    }

    function Ma(t) {
        var e = ya(t);
        return t.y - e * t.originY
    }

    function _a(t, e) {
        var i = ya(t);
        return t.y = e + i * t.originY, t
    }

    var Ea = 0, Ba = 1, za = 2, ja = 4, Ra = 6, Da = 8, La = 10, Ia = 12, Ya = [];
    Ya[11] = function (t, e, i, n) {
        return void 0 === i && (i = 0), void 0 === n && (n = 0), xa(t, ma(e) + i), ba(t, ka(e) + n), t
    }, Ya[La] = function (t, e, i, n) {
        return void 0 === i && (i = 0), void 0 === n && (n = 0), wa(t, Ca(e) - i), ba(t, ka(e) + n), t
    }, Ya[Ia] = function (t, e, i, n) {
        return void 0 === i && (i = 0), void 0 === n && (n = 0), Pa(t, Sa(e) + i), ba(t, ka(e) + n), t
    }, Ya[Ra] = function (t, e, i, n) {
        var s, r, o;
        return void 0 === i && (i = 0), void 0 === n && (n = 0), s = t, r = ma(e) + i, o = Oa(e) + n, xa(s, r), Ta(s, o), t
    }, Ya[ja] = function (t, e, i, n) {
        return void 0 === i && (i = 0), void 0 === n && (n = 0), wa(t, Ca(e) - i), Ta(t, Oa(e) + n), t
    }, Ya[Da] = function (t, e, i, n) {
        return void 0 === i && (i = 0), void 0 === n && (n = 0), Pa(t, Sa(e) + i), Ta(t, Oa(e) + n), t
    }, Ya[Ba] = function (t, e, i, n) {
        return void 0 === i && (i = 0), void 0 === n && (n = 0), xa(t, ma(e) + i), _a(t, Ma(e) - n), t
    }, Ya[Ea] = function (t, e, i, n) {
        return void 0 === i && (i = 0), void 0 === n && (n = 0), wa(t, Ca(e) - i), _a(t, Ma(e) - n), t
    }, Ya[za] = function (t, e, i, n) {
        return void 0 === i && (i = 0), void 0 === n && (n = 0), Pa(t, Sa(e) + i), _a(t, Ma(e) - n), t
    };

    function Aa(t, e, i, n, s) {
        return Ya[i](t, e, n, s)
    }

    function Fa(t, e) {
        return void 0 === e && (e = {}), "number" == typeof t ? (e.left = t, e.right = t, e.top = t, e.bottom = t) : (e.left = oh(t, "left", 0), e.right = oh(t, "right", 0), e.top = oh(t, "top", 0), e.bottom = oh(t, "bottom", 0)), e
    }

    function Wa(t, e) {
        return void 0 === this.childrenMap && (this.childrenMap = {}), this.childrenMap[t] = e, this
    }

    function Va(t) {
        var e = Math.max(this.childrenWidth, this.minWidth);
        return void 0 === t && (t = e), t
    }

    function Xa(t) {
        var e = Math.max(this.childrenHeight, this.minHeight);
        return void 0 === t && (t = e), t
    }

    function Ga() {
        this._childrenWidth = void 0, this._childrenHeight = void 0;
        for (var t, e = this.getChildrenSizers(), i = 0, n = e.length; i < n; i++) (t = e[i]).ignoreLayout || t.preLayout()
    }

    function Ha(t) {
        var e, i;
        for (var n in this.sizerChildren) !(e = this.sizerChildren[n]) || e.isRexSizer && e.ignoreLayout || (void 0 === (i = this.getExpandedChildWidth(e, t)) && (i = this.resolveWidth(i)), e.runWidthWrap && e.runWidthWrap(i));
        return this
    }

    function Ua(t, e) {
        void 0 === e ? e = new ch : !0 === e && (e = dh);
        var i = t.scale, n = i.canvasBounds, s = i.displayScale, r = i.autoCenter;
        return e.x = 0 <= n.x ? 0 : -(n.x * s.x), e.y = 0 <= n.y ? 0 : -(n.y * s.y), e.width = n.width * s.x - e.x, e.height = n.height * s.y - e.y, 1 !== r && 2 !== r || (e.width -= e.x), 1 !== r && 3 !== r || (e.height -= e.y), e
    }

    function Na(t) {
        Ih(t, !1)
    }

    function Ja(t) {
        Ih(t, !0)
    }

    function Ka(t) {
        return !!t && !ua(t).hidden
    }

    function Za(t, e, i, n, s) {
        return !(!t || !t.getBounds) && (!(n && !n(t, e, i)) && (!!(Ah = t.getBounds(Ah)).contains(e, i) && !(s && !s(t, e, i))))
    }

    function qa(t, e, i, n) {
        if (e) return Za(t, e.x, e.y, i, n);
        for (var s = t.scene.input.manager, r = s.pointersTotal, o = s.pointers, a = 0; a < r; a++) if (e = o[a], Za(t, e.x, e.y, i, n)) return !0;
        return !1
    }

    function $a(t) {
        return t && "function" == typeof t
    }

    function Qa(t, e, i, n, s) {
        return Za(t, e, i, Fh(n), Wh(s))
    }

    function th(t) {
        return !(t.rexSizer && t.rexSizer.hidden)
    }

    function eh(t, e, i) {
        !t || void 0 === e && void 0 === i || (t.resize ? (void 0 === e && (e = t.width), void 0 === i && (i = t.height), t.resize(e, i)) : (void 0 !== e && (t.displayWidth = e), void 0 !== i && (t.displayHeight = i)))
    }

    var ih = Phaser.Utils.Objects.GetValue, nh = Phaser.GameObjects.Group, sh = function (t) {
            return t.add.text(0, 0, "")
        }, rh = new Phaser.Geom.Rectangle, oh = Phaser.Utils.Objects.GetValue, ah = Ni.prototype.add, hh = {
            pin: function (t) {
                return ah.call(this, t), this
            }, addBackground: function (t, e, i) {
                return void 0 === this.backgroundChildren && (this.backgroundChildren = []), "string" == typeof e && (i = e, e = void 0), void 0 === e && (e = 0), this.pin(t), this.backgroundChildren.push(t), this.getSizerConfig(t).padding = Fa(e), void 0 !== i && this.addChildrenMap(i, t), this
            }, isBackground: function (t) {
                return void 0 !== this.backgroundChildren && -1 !== this.backgroundChildren.indexOf(t)
            }
        }, lh = /(\S+)\[(\d+)\]/i, uh = {
            getInnerPadding: function (t) {
                return rn(this.space, t)
            }, setInnerPadding: function (t, e) {
                return on(this.space, t, e), this
            }, getOutterPadding: function (t) {
                return rn(this.getSizerConfig(this).padding, t)
            }, setOuterPadding: function (t, e) {
                return on(this.getSizerConfig(this).padding, t, e), this
            }
        }, ch = Phaser.Geom.Rectangle, dh = new ch, fh = function () {
            function i(t, e) {
                B(this, i), this.gameObject = t, this.scene = t.scene, this.resetFromJSON(e), this.boot()
            }

            return m(i, [{
                key: "resetFromJSON", value: function (t) {
                    var e, i, n, s, r, o, a, h;
                    return void 0 !== t.x ? (e = null, i = t.x) : void 0 !== t.left ? (e = 0, i = t.left) : void 0 !== t.right ? (e = 1, i = t.right) : void 0 !== t.centerX && (e = .5, i = t.centerX), void 0 !== t.y ? (n = null, s = t.y) : void 0 !== t.top ? (n = 0, s = t.top) : void 0 !== t.bottom ? (n = 1, s = t.bottom) : void 0 !== t.centerY && (n = .5, s = t.centerY), void 0 !== i && (i = i.replace("left", "0%").replace("right", "100%").replace("center", "50%").split("%"), r = parseFloat(i[0]) / 100, o = "" === i[1] ? 0 : parseFloat(i[1])), void 0 !== s && (s = s.replace("top", "0%").replace("bottom", "100%").replace("center", "50%").split("%"), a = parseFloat(s[0]) / 100, h = "" === s[1] ? 0 : parseFloat(s[1])), this.setAlign(e, n), this.setPercentage(r, a), this.setOffset(o, h), this
                }
            }, {
                key: "boot", value: function () {
                    this.scene.scale.on("resize", this.anchor, this), this.gameObject.on("destroy", this.destroy, this), this.anchor()
                }
            }, {
                key: "shutdown", value: function () {
                    this.scene.scale.off("resize", this.anchor, this), this.gameObject = void 0, this.scene = void 0
                }
            }, {
                key: "destroy", value: function () {
                    this.shutdown()
                }
            }, {
                key: "setAlign", value: function (t, e) {
                    return this.alignX = t, this.alignY = e, this
                }
            }, {
                key: "setPercentage", value: function (t, e) {
                    return this.percentageX = t, this.percentageY = e, this
                }
            }, {
                key: "setOffset", value: function (t, e) {
                    return this.offsetX = t, this.offsetY = e, this
                }
            }, {
                key: "anchor", value: function () {
                    return this.viewport = Ua(this.scene, !0), this.updatePosition(), this
                }
            }, {
                key: "updatePosition", value: function () {
                    var t = this.gameObject;
                    return null === this.alignX ? t.x = this.anchorX : void 0 !== this.alignX && (t.x = this.anchorX + t.displayWidth * (t.originX - this.alignX)), null === this.alignY ? this.gameObject.y = this.anchorY : void 0 !== this.alignY && (t.y = this.anchorY + t.displayHeight * (t.originY - this.alignY)), this
                }
            }, {
                key: "anchorX", get: function () {
                    return this.viewport.x + this.viewport.width * this.percentageX + this.offsetX
                }
            }, {
                key: "anchorY", get: function () {
                    return this.viewport.y + this.viewport.height * this.percentageY + this.offsetY
                }
            }]), i
        }(), ph = Phaser.Utils.Objects.GetValue, vh = Phaser.Utils.Objects.GetAdvancedValue, gh = function () {
            b(s, oo);
            var n = w(s);

            function s(t, e) {
                var i;
                return B(this, s), (i = n.call(this, t)).gameObject = t, i.scaleStart = {}, i.scaleEnd = {}, i.resetFromJSON(e), i
            }

            return m(s, [{
                key: "resetFromJSON", value: function (t) {
                    return this.setMode(ph(t, "mode", 0)), this.setScaleRange(vh(t, "start", void 0), vh(t, "end", 0)), this.setDelay(vh(t, "delay", 0)), this.setDuration(vh(t, "duration", 1e3)), this.setEase(ph(t, "ease", void 0)), this
                }
            }, {
                key: "toJSON", value: function () {
                    return {
                        mode: this.mode,
                        startX: this.startX,
                        startY: this.startY,
                        endX: this.endX,
                        endY: this.endY,
                        delay: this.delay,
                        duration: this.duration
                    }
                }
            }, {
                key: "setMode", value: function (t) {
                    return "string" == typeof t && (t = yh[t]), this.mode = t, this
                }
            }, {
                key: "setScaleRange", value: function (t, e) {
                    return "number" == typeof t ? (this.startX = t, this.startY = t) : (this.startX = vh(t, "x", this.gameObject.scaleX), this.startY = vh(t, "y", this.gameObject.scaleY)), "number" == typeof e ? (this.endX = e, this.endY = e) : (this.endX = vh(e, "x", void 0), this.endY = vh(e, "y", void 0)), this
                }
            }, {
                key: "setDelay", value: function (t) {
                    return this.delay = t, this
                }
            }, {
                key: "setDuration", value: function (t) {
                    return this.duration = t, this
                }
            }, {
                key: "setEase", value: function (t) {
                    return void 0 === t && (t = "Linear"), this.ease = t, this
                }
            }, {
                key: "start", value: function () {
                    if (this.isRunning) return this;
                    var t = {
                        targets: this.gameObject,
                        delay: this.delay,
                        duration: this.duration,
                        ease: this.ease,
                        yoyo: 2 == this.mode,
                        repeat: 2 == this.mode ? -1 : 0,
                        onComplete: function () {
                            1 === this.mode && this.gameObject.destroy()
                        },
                        onCompleteScope: this
                    };
                    return void 0 !== this.startX && void 0 !== this.endX && (this.gameObject.scaleX = this.startX, t.scaleX = this.endX), void 0 !== this.startY && void 0 !== this.endY && (this.gameObject.scaleY = this.startY, t.scaleY = this.endY), C(x(s.prototype), "start", this).call(this, t), this
                }
            }]), s
        }(), yh = {stop: 0, destroy: 1, yoyo: 2}, kh = {}, mh = Phaser.Utils.Objects.IsPlainObject, bh = {
            popUp: function (t, e, i) {
                if (mh(t)) {
                    var n = t;
                    t = n.duration, e = n.orientation, i = n.ease
                }
                this._scale = function (t, e, i, n, s) {
                    switch (i) {
                        case kh.mode = 0:
                        case"x":
                            kh.start = {x: 0};
                            break;
                        case 1:
                        case"y":
                            kh.start = {y: 0};
                            break;
                        default:
                            kh.start = 0
                    }
                    return kh.end = 1, kh.duration = e, kh.ease = void 0 === n ? "Cubic" : n, void 0 === s ? s = new gh(t, kh) : s.resetFromJSON(kh), s.restart(), s
                }(this, t, e, i, this._scale), this._scale.once("complete", function () {
                    this.emit("popup.complete", this)
                }, this);
                var s = this.getParentSizer();
                if (s) {
                    var r = this;
                    this._scale.on("update", function () {
                        s.resetChildPositionState(r)
                    })
                }
                return this
            }, popUpPromise: function (t, e, i) {
                return this.popUp(t, e, i), es(this._scale)
            }, scaleDownDestroy: function (t, e, i, n) {
                if (mh(t)) {
                    var s = t;
                    t = s.duration, e = s.orientation, i = s.ease, n = s.destroy
                }
                this._scale = function (t, e, i, n, s, r) {
                    s instanceof gh && (r = s, s = void 0), void 0 === s && (s = !0);
                    var o = {};
                    switch (o.mode = s ? 1 : 0, i) {
                        case 0:
                        case"x":
                            o.end = {x: 0};
                            break;
                        case 1:
                        case"y":
                            o.end = {y: 0};
                            break;
                        default:
                            o.end = 0
                    }
                    return o.duration = e, o.ease = void 0 === n ? "Linear" : n, void 0 === r ? r = new gh(t, o) : r.resetFromJSON(o), r.restart(), r
                }(this, t, e, i, n, this._scale), this._scale.once("complete", function () {
                    this.emit("scaledown.complete", this)
                }, this);
                var r = this.getParentSizer();
                if (r) {
                    var o = this;
                    this._scale.on("update", function () {
                        r.resetChildPositionState(o)
                    })
                }
                return this
            }, scaleDownDestroyPromise: function (t, e, i, n) {
                return this.scaleDownDestroy(t, e, i, n), es(this._scale)
            }, scaleDown: function (t, e, i) {
                return this.scaleDownDestroy(t, e, i, !1), this
            }, scaleDownPromise: function (t, e, i) {
                return this.scaleDown(t, e, i), es(this._scale)
            }
        }, xh = Phaser.Utils.Objects.GetValue, Ch = Phaser.Utils.Objects.GetAdvancedValue, wh = function () {
            b(s, oo);
            var n = w(s);

            function s(t, e) {
                var i;
                return B(this, s), (i = n.call(this, t)).gameObject = t, i.alphaStart = void 0, i.alphaEnd = void 0, i.resetFromJSON(e), i
            }

            return m(s, [{
                key: "resetFromJSON", value: function (t) {
                    return this.setMode(xh(t, "mode", 0)), this.setAlphaRange(Ch(t, "start", this.gameObject.alpha), Ch(t, "end", 0)), this.setDelay(Ch(t, "delay", 0)), this.setDuration(Ch(t, "duration", 1e3)), this
                }
            }, {
                key: "toJSON", value: function () {
                    return {
                        mode: this.mode,
                        start: this.alphaStart,
                        end: this.alphaEnd,
                        delay: this.delay,
                        duration: this.duration
                    }
                }
            }, {
                key: "shutdown", value: function () {
                    return this.gameObject && (C(x(s.prototype), "shutdown", this).call(this), this.gameObject = void 0), this
                }
            }, {
                key: "setMode", value: function (t) {
                    return "string" == typeof t && (t = Sh[t]), this.mode = t, this
                }
            }, {
                key: "setAlphaRange", value: function (t, e) {
                    return this.alphaStart = t, this.alphaEnd = e, this
                }
            }, {
                key: "setDelay", value: function (t) {
                    return this.delay = t, this
                }
            }, {
                key: "setDuration", value: function (t) {
                    return this.duration = t, this
                }
            }, {
                key: "start", value: function () {
                    if (this.isRunning) return this;
                    this.gameObject.setAlpha(this.alphaStart);
                    var t = {
                        targets: this.gameObject,
                        alpha: this.alphaEnd,
                        delay: this.delay,
                        duration: this.duration,
                        ease: "Linear",
                        yoyo: 2 == this.mode,
                        repeat: 2 == this.mode ? -1 : 0,
                        onComplete: function () {
                            1 === this.mode && this.gameObject.destroy()
                        },
                        onCompleteScope: this
                    };
                    return C(x(s.prototype), "start", this).call(this, t), this
                }
            }]), s
        }(), Sh = {stop: 0, destroy: 1, yoyo: 2}, Ph = Phaser.Utils.Objects.IsPlainObject, Th = {}, Oh = {},
        Mh = Phaser.Utils.Objects.IsPlainObject, _h = {
            fadeIn: function (t, e) {
                var i, n, s, r, o, a;
                Mh(t) && (t = t.duration);
                this._fade = (n = t, s = e, r = (i = this)._fade, a = Ph(s) ? (o = s.start, s.end) : s, void 0 === o && (o = 0), void 0 === a && (a = i.alpha), Th.mode = 0, Th.start = o, Th.end = a, Th.duration = n, void 0 === r ? r = new wh(i, Th) : r.resetFromJSON(Th), r.restart(), r), this._fade.once("complete", function () {
                    this.emit("fadein.complete", this)
                }, this);
                var h = this.getParentSizer();
                if (h) {
                    var l = this;
                    this._fade.on("update", function () {
                        h.resetChildAlphaState(l)
                    })
                }
                return this
            }, fadeInPromoise: function (t, e) {
                return this.fadeIn(t, e), es(this._fade)
            }, fadeOutDestroy: function (t, e) {
                if (Mh(t)) {
                    var i = t;
                    t = i.duration, e = i.destroy
                }
                var n, s, r, o;
                this._fade = (s = t, r = e, o = (n = this)._fade, r instanceof wh && (o = r, r = void 0), void 0 === r && (r = !0), Oh.mode = r ? 1 : 0, Oh.end = 0, Oh.duration = s, void 0 === o ? o = new wh(n, Oh) : o.resetFromJSON(Oh), o.restart(), o), this._fade.once("complete", function () {
                    this.emit("fadeout.complete", this)
                }, this);
                var a = this.getParentSizer();
                if (a) {
                    var h = this;
                    this._fade.on("update", function () {
                        a.resetChildAlphaState(h)
                    })
                }
                return this
            }, fadeOutDestroyPromise: function (t, e) {
                return this.fadeOutDestroy(t, e), es(this._fade)
            }, fadeOut: function (t) {
                return this.fadeOutDestroy(t, !1), this
            }, fadeOutPromise: function (t) {
                return this.fadeOut(t), es(this._fade)
            }
        }, Eh = Phaser.Utils.Objects.GetValue, Bh = Phaser.Utils.Objects.GetAdvancedValue, zh = function () {
            b(s, oo);
            var n = w(s);

            function s(t, e) {
                var i;
                return B(this, s), (i = n.call(this, t)).gameObject = t, i.resetFromJSON(e), i
            }

            return m(s, [{
                key: "resetFromJSON", value: function (t) {
                    if (this.setMode(Eh(t, "mode", 0)), t && (t.hasOwnProperty("x") || t.hasOwnProperty("y"))) {
                        var e = Bh(t, "x", void 0), i = Bh(t, "y", void 0);
                        this.setTargetPosition(e, i)
                    } else this.setTargetPosition(t);
                    return this.setDelay(Bh(t, "delay", 0)), this.setDuration(Bh(t, "duration", 1e3)), this.setEase(Eh(t, "ease", void 0)), this
                }
            }, {
                key: "toJSON", value: function () {
                    return {
                        mode: this.mode,
                        startX: this.startX,
                        startY: this.startY,
                        endX: this.endX,
                        endY: this.endY,
                        delay: this.delay,
                        duration: this.duration
                    }
                }
            }, {
                key: "setMode", value: function (t) {
                    return "string" == typeof t && (t = jh[t]), this.mode = t, this
                }
            }, {
                key: "setTargetPosition", value: function (t, e) {
                    if ("number" == typeof t || "number" == typeof e) this.startX = this.gameObject.x, this.startY = this.gameObject.y, this.endX = t, this.endY = e; else {
                        var i = t;
                        this.startX = Bh(i, "startX", void 0), this.startY = Bh(i, "startY", void 0), this.endX = Bh(i, "endX", void 0), this.endY = Bh(i, "endY", void 0)
                    }
                    return this
                }
            }, {
                key: "setDelay", value: function (t) {
                    return this.delay = t, this
                }
            }, {
                key: "setDuration", value: function (t) {
                    return this.duration = t, this
                }
            }, {
                key: "setEase", value: function (t) {
                    return void 0 === t && (t = "Linear"), this.ease = t, this
                }
            }, {
                key: "start", value: function () {
                    if (this.isRunning) return this;
                    var t = {
                        targets: this.gameObject,
                        delay: this.delay,
                        duration: this.duration,
                        ease: this.ease,
                        yoyo: 2 == this.mode,
                        repeat: 2 == this.mode ? -1 : 0,
                        onComplete: function () {
                            1 === this.mode && this.gameObject.destroy()
                        },
                        onCompleteScope: this
                    };
                    return void 0 !== this.startX && void 0 !== this.endX && (this.gameObject.setX(this.startX), t.x = this.endX), void 0 !== this.startY && void 0 !== this.endY && (this.gameObject.setY(this.startY), t.y = this.endY), C(x(s.prototype), "start", this).call(this, t), this
                }
            }]), s
        }(), jh = {stop: 0, destroy: 1, yoyo: 2}, Rh = function (t, e) {
            if ("number" == typeof t) return t;
            var i = t[0], n = parseFloat(t.substr(2));
            switch (i) {
                case"+":
                    return e + n;
                case"-":
                    return e - n;
                case"*":
                    return e * n;
                case"/":
                    return e / n
            }
        }, Dh = Phaser.Utils.Objects.IsPlainObject, Lh = {
            moveFrom: function (t, e, i, n, s) {
                if (Dh(e)) {
                    var r = e;
                    e = r.x, i = r.y, t = r.duration, n = r.ease
                }
                this._easeMove = function (t, e, i, n, s, r, o) {
                    r instanceof zh && (o = r, r = void 0), void 0 === r && (r = !1);
                    var a = {};
                    return a.mode = r ? 1 : 0, void 0 !== i && (a.startX = Rh(i, t.x), a.endX = t.x), void 0 !== n && (a.startY = Rh(n, t.y), a.endY = t.y), a.duration = e, a.ease = void 0 === s ? "Linear" : s, void 0 === o ? o = new zh(t, a) : o.resetFromJSON(a), o.restart(), o
                }(this, t, e, i, n, s, this._easeMove), this._easeMove.once("complete", function () {
                    this.emit("movefrom.complete", this)
                }, this);
                var o = this.getParentSizer();
                if (o) {
                    var a = this;
                    this._easeMove.on("update", function () {
                        o.resetChildPositionState(a)
                    })
                }
                return this
            }, moveFromPromise: function (t, e, i, n, s) {
                return this.moveFrom(t, e, i, n, s), es(this._easeMove)
            }, moveFromDestroy: function (t, e, i, n) {
                return this.moveFrom(t, e, i, n, !0), this
            }, moveFromDestroyPromise: function (t, e, i, n) {
                return this.moveFromDestroy(t, e, i, n), es(this._easeMove)
            }, moveTo: function (t, e, i, n, s) {
                if (Dh(e)) {
                    var r = e;
                    e = r.x, i = r.y, t = r.duration, n = r.ease
                }
                this._easeMove = function (t, e, i, n, s, r, o) {
                    r instanceof zh && (o = r, r = void 0), void 0 === r && (r = !1);
                    var a = {};
                    return a.mode = r ? 1 : 0, void 0 !== i && (a.startX = t.x, a.endX = Rh(i, t.x)), void 0 !== n && (a.startY = t.y, a.endY = Rh(n, t.y)), a.duration = e, a.ease = void 0 === s ? "Linear" : s, void 0 === o ? o = new zh(t, a) : o.resetFromJSON(a), o.restart(), o
                }(this, t, e, i, n, s, this._easeMove), this._easeMove.once("complete", function () {
                    this.emit("moveto.complete", this)
                }, this);
                var o = this.getParentSizer();
                if (o) {
                    var a = this;
                    this._easeMove.on("update", function () {
                        o.resetChildPositionState(a)
                    })
                }
                return this
            }, moveToPromise: function (t, e, i, n, s) {
                return this.moveTo(t, e, i, n, s), es(this._easeMove)
            }, moveToDestroy: function (t, e, i, n) {
                return this.moveTo(t, e, i, n, !0), this
            }, moveToDestroyPromise: function (t, e, i, n) {
                return this.moveToDestroy(t, e, i, n, !0), es(this._easeMove)
            }
        }, Ih = function (t, e) {
            t && (ua(t).hidden = e, t.rexContainer.parent.setChildVisible(t, !e))
        }, Yh = {
            show: function (t) {
                return void 0 === t && (t = this), Na(t), this
            }, hide: function () {
                return void 0 === gameObject && (gameObject = this), Ja(gameObject), this
            }, isShow: function () {
                return void 0 === gameObject && (gameObject = this), Ka(gameObject)
            }
        }, Ah = void 0, Fh = function (n) {
            return n ? function (t, e, i) {
                return !!th(t) && (n(t, e, i), !0)
            } : th
        }, Wh = function (t) {
            return t
        }, Vh = Phaser.Display.Align.CENTER, Xh = {
            getSizerConfig: ua, pushIntoBounds: function (t) {
                return void 0 === t && (t = ca(this.scene)), this.left = Math.max(this.left, t.left), this.right = Math.min(this.right, t.right), this.top = Math.max(this.top, t.top), this.bottom = Math.min(this.bottom, t.bottom), this
            }, drawBounds: function (t, e) {
                var i, n, s, r, o = t.scene;
                if ("number" == typeof e) i = e; else {
                    i = ih(e, "color", 16777215);
                    var a = ih(e, "name", !1);
                    a && (n = ih(a, "createTextCallback", sh), s = ih(a, "createTextCallbackScope", void 0), "string" == typeof (r = ih(a, "align", "left-top")) && (r = pa[r]))
                }
                if (n && !t.children) {
                    t.children = new nh(o), t.on("destroy", function () {
                        t.children.destroy(!0), t.children = void 0
                    });
                    var h = t.clear.bind(t);
                    t.clear = function () {
                        h(), t.children.clear(!1, !0)
                    }
                }
                for (var l, u, c = this.getAllChildren([this]), d = 0, f = c.length; d < f; d++) (l = c[d]).getBounds && (i && t.lineStyle(1, i).strokeRectShape(l.getBounds(rh)), l.name && n && (u = s ? n.call(s, o) : n(o)) && (u.setText(l.name), t.children.add(u), va.setPosition(rh.x, rh.y).setSize(rh.width, rh.height), Aa(u, va, r)));
                return this
            }, resolveWidth: Va, resolveChildrenWidth: function (t) {
                var e, i;
                for (var n in this.sizerChildren) (e = this.sizerChildren[n]) && e.isRexSizer && !e.ignoreLayout && (i = this.getExpandedChildWidth(e, t), i = e.resolveWidth(i), e.resolveChildrenWidth(i))
            }, resolveHeight: Xa, getChildWidth: function (t) {
                return t.isRexSizer ? Math.max(t.minWidth, t.childrenWidth) : void 0 !== t.minWidth ? t.minWidth : ga(t)
            }, getChildHeight: function (t) {
                return t.isRexSizer ? Math.max(t.minHeight, t.childrenHeight) : void 0 !== t.minHeight ? t.minHeight : ya(t)
            }, getExpandedChildWidth: function (t, e) {
                return e
            }, getExpandedChildHeight: function (t, e) {
                return e
            }, getChildrenWidth: function () {
                return 0
            }, getChildrenHeight: function () {
                return 0
            }, addChildrenMap: Wa, addElement: Wa, getElement: function (t, e) {
                if ("string" == typeof t && (t = t.split(".")), 0 !== t.length) {
                    var i = t.shift(), n = null;
                    if ("#" === i.charAt(0)) i = i.substring(1), n = this.getByName(i, e); else if (-1 === i.indexOf("[")) this.childrenMap && (n = this.childrenMap[i]); else {
                        var s = i.match(lh);
                        if (null != s && this.childrenMap) {
                            var r = this.childrenMap[s[1]];
                            r && (n = r[s[2]])
                        }
                    }
                    return 0 === t.length ? n : n && n.childrenMap ? n.getElement(t) : null
                }
            }, getAllChildrenSizers: function (t) {
                void 0 === t && (t = []);
                for (var e = t.length, i = this.getChildrenSizers(t), n = t.length, s = e; s < n; s++) i[s].getAllChildrenSizers(t);
                return t
            }, getChildrenSizers: function (t) {
                return void 0 === t && (t = []), t
            }, preLayout: Ga, layout: function () {
                return this.runLayout(), this
            }, runLayout: function (t, e, i) {
                if (this.ignoreLayout) return this;
                var n = !t;
                return n && this.preLayout(), e = this.resolveWidth(e), n && (this.resolveChildrenWidth(e), this.runWidthWrap(e)), i = this.resolveHeight(i), this.resize(e, i), this.layoutChildren(), this.layoutBackgrounds(), this.postLayout()
            }, layoutChildren: function () {
            }, runWidthWrap: Ha, layoutBackgrounds: function () {
                if (void 0 !== this.backgroundChildren) for (var t, e, i, n, s, r, o, a = this.backgroundChildren, h = this.left, l = this.top, u = this.width, c = this.height, d = 0, f = a.length; d < f; d++) (e = (t = a[d]).rexSizer).hidden || (n = h + (i = e.padding).left, s = l + i.top, r = u - i.left - i.right, o = c - i.top - i.bottom, eh(t, r, o), va.setPosition(n, s).setSize(r, o), Aa(t, va, Vh), this.resetChildPositionState(t))
            }, postLayout: function () {
                return this._anchor && this._anchor.updatePosition(), this
            }, setAnchor: function (t) {
                return void 0 === this._anchor ? this._anchor = new fh(this, t) : this._anchor.resetFromJSON(t), this
            }, isInTouching: function (t, e) {
                return void 0 === e && (e = this), qa(e, t)
            }, pointToChild: function (t, e, i, n, s) {
                if ($a(i) || (s = i, n = i = void 0), void 0 === s && (s = this.sizerChildren ? this.sizerChildren : this.children), Pi(s)) {
                    for (var r, o = 0, a = s.length; o < a; o++) if (r = s[o], Qa(r, t, e, i, n)) return r
                } else for (var h in s) if (r = s[h], Qa(r, t, e, i, n)) return r;
                return null
            }, setDraggable: function (s, t) {
                var e = p(s);
                return "string" === e ? s = this.getElement(s) : void 0 !== s && "object" == e || (t = s, s = this), void 0 === t && (t = !0), s.input && s.input.hasOwnProperty("draggable") ? s.input.draggable = t : t && (s.setInteractive(), s.scene.input.setDraggable(s), s.on("drag", function (t, e, i) {
                    var n = this.getTopmostSizer();
                    n.x += e - s.x, n.y += i - s.y
                }, this)), this
            }
        };
    Object.assign(Xh, uh, hh, {
        getParentSizer: function (t) {
            return this.getParent(t)
        }, getTopmostSizer: function (t) {
            return this.getTopmostParent(t)
        }
    }, bh, _h, Lh, Yh);
    var Gh = Phaser.Utils.Objects.GetValue, Hh = function () {
        b(l, Ni);
        var h = w(l);

        function l(t, e, i, n, s, r) {
            var o;
            B(this, l), (o = h.call(this, t, e, i, 2, 2)).isRexSizer = !0, o.setMinSize(n, s), o.setName(Gh(r, "name", "")), o.rexSizer = {}, o.space = {}, o.backgroundChildren = void 0, o.sizerChildren = void 0;
            var a = Gh(r, "anchor", void 0);
            return a && o.setAnchor(a), o.setInnerPadding(Gh(r, "space", 0)), o.setDraggable(Gh(r, "draggable", !1)), o.setDirty(!0), o
        }

        return m(l, [{
            key: "destroy", value: function (t) {
                this.scene && (void 0 !== this.backgroundChildren && (this.backgroundChildren.length = 0), C(x(l.prototype), "destroy", this).call(this, t))
            }
        }, {
            key: "setMinSize", value: function (t, e) {
                return this.setMinWidth(t).setMinHeight(e), this
            }
        }, {
            key: "setMinWidth", value: function (t) {
                return null == t && (t = 0), this.minWidth = t, this
            }
        }, {
            key: "setMinHeight", value: function (t) {
                return null == t && (t = 0), this.minHeight = t, this
            }
        }, {
            key: "setDirty", value: function (t) {
                return void 0 === t && (t = !0), this.dirty = t, this
            }
        }, {
            key: "ignoreLayout", get: function () {
                return this.rexSizer.hidden || !this.dirty
            }
        }, {
            key: "childrenWidth", get: function () {
                return void 0 === this._childrenWidth && (this._childrenWidth = this.getChildrenWidth()), this._childrenWidth
            }
        }, {
            key: "childrenHeight", get: function () {
                return void 0 === this._childrenHeight && (this._childrenHeight = this.getChildrenHeight()), this._childrenHeight
            }
        }, {
            key: "left", get: function () {
                return this.x - ga(this) * this.originX
            }, set: function (t) {
                this.x += t - this.left
            }
        }, {
            key: "alignLeft", value: function (t) {
                return this.left = t, this
            }
        }, {
            key: "right", get: function () {
                return this.left + ga(this)
            }, set: function (t) {
                this.x += t - this.right
            }
        }, {
            key: "alignRight", value: function (t) {
                return this.right = t, this
            }
        }, {
            key: "centerX", get: function () {
                return this.left + ga(this) / 2
            }, set: function (t) {
                this.x += t - this.centerX
            }
        }, {
            key: "alignCenterX", value: function (t) {
                return this.centerX = t, this
            }
        }, {
            key: "top", get: function () {
                return this.y - ya(this) * this.originY
            }, set: function (t) {
                this.y += t - this.top
            }
        }, {
            key: "alignTop", value: function (t) {
                return this.top = t, this
            }
        }, {
            key: "bottom", get: function () {
                return this.top + ya(this)
            }, set: function (t) {
                this.y += t - this.bottom
            }
        }, {
            key: "alignBottom", value: function (t) {
                return this.bottom = t, this
            }
        }, {
            key: "centerY", get: function () {
                return this.top + ya(this) / 2
            }, set: function (t) {
                this.y += t - this.centerY
            }
        }, {
            key: "alignCenterY", value: function (t) {
                return this.centerY = t, this
            }
        }, {
            key: "innerLeft", get: function () {
                return this.left + this.space.left
            }
        }, {
            key: "innerRight", get: function () {
                return this.right - this.space.right
            }
        }, {
            key: "innerTop", get: function () {
                return this.top + this.space.top
            }
        }, {
            key: "innerBottom", get: function () {
                return this.bottom - this.space.bottom
            }
        }, {
            key: "innerWidth", get: function () {
                return this.width - this.space.left - this.space.right
            }
        }, {
            key: "innerHeight", get: function () {
                return this.height - this.space.top - this.space.bottom
            }
        }, {
            key: "minInnerWidth", get: function () {
                var t = this.minWidth - this.space.left - this.space.right;
                return Math.max(t, 0)
            }
        }, {
            key: "minInnerHeigt", get: function () {
                var t = this.minHeight - this.space.top - this.space.bottom;
                return Math.max(t, 0)
            }
        }]), l
    }();
    Object.assign(Hh.prototype, Xh);
    var Uh = Phaser.Utils.Objects.IsPlainObject, Nh = Phaser.Utils.Objects.GetValue, Jh = Phaser.Display.Align.CENTER,
        Kh = {
            add: function (t, e, i, n, s, r, o) {
                var a;
                this.pin(t), Uh(e) && (e = Nh(a = e, "key", void 0), i = Nh(a, "align", Jh), n = Nh(a, "padding", 0), s = Nh(a, "expand", !0), t.isRexSizer || (r = Nh(a, "minWidth", void 0), o = Nh(a, "minHeight", void 0)));
                return void 0 === e && (e = Date.now()), "string" == typeof i && (i = pa[i]), void 0 === i && (i = Jh), void 0 === n && (n = 0), void 0 === s && (s = !0), (a = this.getSizerConfig(t)).align = i, a.padding = Fa(n), Uh(s) ? (a.expandWidth = Nh(s, "width", !1), a.expandHeight = Nh(s, "height", !1)) : (a.expandWidth = s, a.expandHeight = s), t.isRexSizer || (a.expandWidth ? t.minWidth = void 0 === r ? ga(t) : r : t.minWidth = void 0, a.expandHeight ? t.minHeight = void 0 === o ? ya(t) : o : t.minHeight = void 0), this.sizerChildren.hasOwnProperty(e) && this.sizerChildren[e].destroy(), this.sizerChildren[e] = t, this
            }
        }, Zh = Ni.prototype.remove, qh = Ni.prototype.clear, $h = {
            remove: function (t, e) {
                var i;
                if ("string" == typeof t) {
                    if (i = t, !this.sizerChildren.hasOwnProperty(i)) return this
                } else {
                    if (this.getParentSizer(t) !== this) return this;
                    i = this.childToKey(t)
                }
                return delete this.sizerChildren[i], Zh.call(this, t, e), this
            }, removeAll: function (t) {
                var e;
                for (var i in this.sizerChildren) e = this.sizerChildren[i], delete this.sizerChildren[i], Zh.call(this, e, t);
                return this
            }, clear: function (t) {
                return this.removeAll(t), this.backgroundChildren && (this.backgroundChildren.length = 0), qh.call(this, t), this
            }
        }, Qh = {
            getChildrenWidth: function () {
                if (this.rexSizer.hidden) return 0;
                var t, e, i, n = 0, s = this.sizerChildren;
                for (var r in s) e = (t = s[r]).rexSizer.padding, i = this.getChildWidth(t) + e.left + e.right, n = Math.max(i, n);
                return n + this.space.left + this.space.right
            }, getChildrenHeight: function () {
                if (this.rexSizer.hidden) return 0;
                var t, e, i, n = 0, s = this.sizerChildren;
                for (var r in s) i = (t = s[r]).isRexSizer ? Math.max(t.minHeight, t.childrenHeight) : void 0 !== t.minHeight ? t.minHeight : ya(t), i += (e = t.rexSizer.padding).top + e.bottom, n = Math.max(i, n);
                return n + this.space.top + this.space.bottom
            }, getExpandedChildWidth: function (t, e) {
                var i;
                void 0 === e && (e = this.width);
                var n = t.rexSizer;
                if (n.expandWidth) {
                    var s = e - this.space.left - this.space.right, r = n.padding;
                    i = s - r.left - r.right
                }
                return i
            }, getExpandedChildHeight: function (t, e) {
                var i;
                void 0 === e && (e = this.height);
                var n = t.rexSizer;
                if (n.expandHeight) {
                    var s = e - this.space.top - this.space.bottom, r = n.padding;
                    i = s - r.top - r.bottom
                }
                return i
            }, getChildrenSizers: function (t) {
                void 0 === t && (t = []);
                var e, i = this.sizerChildren;
                for (var n in i) (e = i[n]).isRexSizer && t.push(e);
                return t
            }, layoutChildren: function () {
                var t, e, i, n, s, r, o, a, h, l = this.innerLeft, u = this.innerTop, c = this.innerWidth,
                    d = this.innerHeight, f = this.sizerChildren;
                for (var p in f) i = (e = (t = f[p]).rexSizer).padding, t.isRexSizer ? t.runLayout(this, this.getExpandedChildWidth(t), this.getExpandedChildHeight(t)) : (h = a = void 0, e.expandWidth && (a = c - i.left - i.right), e.expandHeight && (h = d - i.top - i.bottom), eh(t, a, h)), n = l + i.left, r = c - i.left - i.right, s = u + i.top, o = d - i.top - i.bottom, va.setPosition(n, s).setSize(r, o), Aa(t, va, e.align), this.resetChildPositionState(t)
            }
        };
    Object.assign(Qh, Kh, $h);

    function tl(t, e) {
        if (Array.isArray(t)) return t.indexOf(e);
        for (var i in t) if (t[i] === e) return i;
        return null
    }

    var el = Phaser.Utils.Objects.IsPlainObject, il = Phaser.Utils.Objects.GetValue, nl = function () {
        b(h, Hh);
        var a = w(h);

        function h(t, e, i, n, s, r) {
            var o;
            return B(this, h), el(e) ? (e = il(r = e, "x", 0), i = il(r, "y", 0), n = il(r, "width", void 0), s = il(r, "height", void 0)) : el(n) && (n = il(r = n, "width", void 0), s = il(r, "height", void 0)), (o = a.call(this, t, e, i, n, s, r)).type = "rexOverlapSizer", o.sizerChildren = {}, o.addChildrenMap("items", o.sizerChildren), o
        }

        return m(h, [{
            key: "destroy", value: function (t) {
                this.scene && (pt(this.sizerChildren), C(x(h.prototype), "destroy", this).call(this, t))
            }
        }, {
            key: "childToKey", value: function (t) {
                if ("string" != typeof t) return tl(this.sizerChildren, t);
                var e = t;
                return this.sizerChildren.hasOwnPropery(e) ? e : null
            }
        }]), h
    }();
    Object.assign(nl.prototype, Qh);

    function sl(t, e, i) {
        var n = t.width / 2;
        return ul(n, n, e, i) <= n
    }

    function rl(t, e, i) {
        if (this.enable && t.isDown) {
            var n = this.sizerChildren.knob;
            if (sl(n, e, i)) {
                var s = n.width / 2, r = n.startAngle, o = cl(s, s, e, i), a = n.anticlockwise ? r - o : o - r,
                    h = dl(a) / (2 * Math.PI);
                this.stopEaseValue(), 0 === this.easeValueDuration || Math.abs(this.value - h) < .1 ? this.value = h : this.easeValueTo(h)
            }
        }
    }

    function ol(t, e, i) {
        if (this.enable && !this.panPointer) {
            var n = this.sizerChildren.knob;
            sl(n, e, i) && vl.call(this, t)
        }
    }

    function al(t, e, i) {
        if (this.enable && t.isDown) {
            var n = this.sizerChildren.knob;
            switch (this.panState) {
                case kl:
                    sl(n, e, i) && vl.call(this, t);
                    break;
                case ml:
                    sl(n, e, i) ? yl.call(this) : gl.call(this)
            }
        }
    }

    function hl(t) {
        this.enable && this.panPointer === t && gl.call(this)
    }

    function ll(t) {
        return void 0 === t && (t = this.value), this.textFormatCallbackScope ? this.textFormatCallback(t) : this.textFormatCallback.call(this.textFormatCallbackScope, t)
    }

    var ul = Phaser.Math.Distance.Between, cl = Phaser.Math.Angle.Between, dl = Phaser.Math.Angle.Normalize,
        fl = Phaser.Math.Angle.Between, pl = Phaser.Math.Angle.Wrap, vl = function (t) {
            this.panPointer = t, this.panState = ml
        }, gl = function () {
            this.panPointer = void 0, this.panState = kl
        }, yl = function () {
            var t = this.panPointer.prevPosition, e = this.panPointer.position, i = this.sizerChildren.knob,
                n = fl(i.x, i.y, t.x, t.y), s = fl(i.x, i.y, e.x, e.y), r = i.anticlockwise ? n - s : s - n,
                o = pl(r) / (2 * Math.PI);
            this.stopEaseValue(), this.value += o
        }, kl = 0, ml = 1, bl = {
            setTextFormatCallback: function (t, e) {
                return this.textFormatCallback = t, this.textFormatCallbackScope = e, this
            }, getFormatText: ll, updateText: function () {
                var t = this.sizerChildren.text;
                return t && (t.setText(ll.call(this)), t.layout && t.layout()), this
            }
        }, xl = {
            setEaseValueDuration: function (t) {
                return this.easeValueDuration = t, this
            }, setEaseValueFunction: function (t) {
                return this.easeValueMode = t, this
            }, stopEaseValue: function () {
                return this.tweenValueTask && this.tweenValueTask.stop(), this
            }, easeValueTo: function (t, e, i) {
                return null == t || (void 0 !== e && (t = Percent(t, e, i)), void 0 === this.tweenValueTask && (this.tweenValueTask = new oo(this, {eventEmitter: null})), this.tweenValueTask.stop().start({
                    targets: this,
                    value: t,
                    duration: this.easeValueDuration,
                    ease: this.easeValueMode
                })), this
            }
        }, Cl = Phaser.Utils.Objects.GetValue, wl = Phaser.Math.Linear, Sl = Phaser.Math.Percent, Pl = Phaser.Math.Snap.To,
        Tl = function () {
            b(u, nl);
            var l = w(u);

            function u(t, e) {
                var i;
                B(this, u), void 0 === e && (e = {}), (i = l.call(this, t, e)).type = "rexKnob", i.eventEmitter = Cl(e, "eventEmitter", z(i));
                var n = Cl(e, "background", void 0), s = Cl(e, "text", void 0);
                n && i.addBackground(n), s && (e.textColor = void 0, e.textStrokeColor = void 0, i.setTextFormatCallback(Cl(e, "textFormatCallback", void 0), Cl(e, "textFormatCallbackScope", void 0)));
                var r = new la(t, e);
                r.setDepth(Cl(e, "knobDepth", 0)), r._value = -1, t.add.existing(r), i.add(r, "knob"), s && i.add(s, "text", "center", 0, !1), i.addChildrenMap("background", n), i.addChildrenMap("knob", r), i.addChildrenMap("text", s);
                var o = Cl(e, "valuechangeCallback", null);
                if (null !== o) {
                    var a = Cl(e, "valuechangeCallbackScope", void 0);
                    i.eventEmitter.on("valuechange", o, a)
                }
                i.setEnable(Cl(e, "enable", void 0)), i.setEaseValueDuration(Cl(e, "easeValue.duration", 0)), i.setEaseValueFunction(Cl(e, "easeValue.ease", "Linear")), i.setGap(Cl(e, "gap", void 0)), i.setValue(Cl(e, "value", 0), Cl(e, "min", void 0), Cl(e, "max", void 0));
                var h = Cl(e, "input", 0);
                switch ("string" == typeof h && (h = Ol[h]), h) {
                    case 0:
                        (function () {
                            this.sizerChildren.knob.setInteractive().on("pointerdown", ol, this).on("pointermove", al, this).on("pointerup", hl, this), this.panPointer = void 0, this.panState = kl
                        }).call(z(i));
                        break;
                    case 1:
                        (function () {
                            this.sizerChildren.knob.setInteractive().on("pointerdown", rl, this).on("pointermove", rl, this)
                        }).call(z(i))
                }
                return i
            }

            return m(u, [{
                key: "setEnable", value: function (t) {
                    return void 0 === t && (t = !0), this.enable = t, this
                }
            }, {
                key: "setGap", value: function (t) {
                    return this.gap = t, this
                }
            }, {
                key: "value", get: function () {
                    return this.sizerChildren.knob.value
                }, set: function (t) {
                    void 0 !== this.gap && (t = Pl(t, this.gap));
                    var e = this.value;
                    this.sizerChildren.knob.value = t;
                    var i = this.value;
                    e !== i && (this.updateText(), this.eventEmitter.emit("valuechange", i, e, this.eventEmitter))
                }
            }, {
                key: "setValue", value: function (t, e, i) {
                    return null == t || (void 0 !== e && (t = Sl(t, e, i)), this.value = t), this
                }
            }, {
                key: "addValue", value: function (t, e, i) {
                    return void 0 !== e && (t = Sl(t, e, i)), this.value += t, this
                }
            }, {
                key: "getValue", value: function (t, e) {
                    var i = this.value;
                    return void 0 !== t && (i = wl(t, e, i)), i
                }
            }]), u
        }(), Ol = {pan: 0, click: 1, none: -1};
    Object.assign(Tl.prototype, bl, xl), u.register("knob", function (t) {
        var e = new Tl(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.Knob", Tl);

    function Ml() {
        for (var t = this.getShapes(), e = 0, i = t.length; e < i; e++) t[e].lineStyle().fillStyle()
    }

    var _l = {arc: Go, circle: Ho, curve: Uo, ellipse: No, line: Jo, lines: Qo, rectangle: ea, triangle: na},
        El = Phaser.Utils.Objects.GetValue, Bl = Phaser.Utils.Objects.IsPlainObject, zl = {
            createShape: function (t, e) {
                var i = new _l[t];
                return e && i.setName(e), i
            }, buildShapes: function (t) {
                var e = El(t, "create", void 0);
                if ("function" == typeof e) e.call(this); else if (Bl(e)) {
                    var i = e;
                    for (var n in i) {
                        var s = i[n];
                        switch (p(s)) {
                            case"number":
                                for (var r = 0; r < s; r++) this.addShape(this.createShape(n));
                                break;
                            case"string":
                                this.addShape(this.createShape(n, s));
                                break;
                            default:
                                for (var o = s, a = (r = 0, o.length); r < a; r++) this.addShape(this.createShape(n, o[r]))
                        }
                    }
                }
                this.setUpdateShapesCallback(El(t, "update"))
            }, setUpdateShapesCallback: function (t) {
                return void 0 === t && (t = Ml), this.dirty = this.dirty || this.updateCallback !== t, this.updateCallback = t, this
            }, updateShapes: function () {
                this.updateCallback.call(this)
            }
        }, jl = Phaser.Utils.Objects.GetValue, Rl = Phaser.Utils.Objects.IsPlainObject, Dl = function () {
            b(h, Io);
            var a = w(h);

            function h(t, e, i, n, s, r) {
                var o;
                return B(this, h), Rl(e) && (e = jl(r = e, "x", 0), i = jl(r, "y", 0), n = jl(r, "width", 2), s = jl(r, "height", 2)), (o = a.call(this, t, e, i, n, s)).type = jl(r, "type", "rexCustomShapes"), o.buildShapes(r), o
            }

            return h
        }();
    Object.assign(Dl.prototype, zl), u.register("customShapes", function (t, e, i, n, s) {
        var r = new Dl(this.scene, t, e, i, n, s);
        return this.scene.add.existing(r), r
    }), H(window, "RexPlugins.UI.CustomShapes", Dl);
    var Ll = function (e, t) {
        void 0 === t && (t = {}), void 0 === t.options && (t.options = {});
        var i = t.options;
        i.responsive = !1, i.maintainAspectRatio = !1, i.hasOwnProperty("devicePixelRatio") || (i.devicePixelRatio = 1);
        var n = !1;
        void 0 === i.animation ? i.animation = {} : !1 === i.animation && (n = !0, i.animation = {});
        var s = i.animation;
        n && (s.duration = 0);
        var r = s.onProgress;
        s.onProgress = function (t) {
            r && r(t), e.needRedraw()
        };
        var o = s.onComplete;
        return s.onComplete = function (t) {
            o && o(t), e.needRedraw()
        }, t
    }, Il = function () {
        b(h, Q);
        var a = w(h);

        function h(t, e, i, n, s, r) {
            var o;
            return B(this, h), (o = a.call(this, t, e, i, n, s)).type = "rexChart", (o.chart = void 0) !== r && o.setChart(r), o
        }

        return m(h, [{
            key: "destroy", value: function (t) {
                this.scene && (this.chart && (this.chart.destroy(), this.chart = void 0), C(x(h.prototype), "destroy", this).call(this, t))
            }
        }, {
            key: "resize", value: function (t, e) {
                if (t === this.width && e === this.height) return this;
                if (C(x(h.prototype), "resize", this).call(this, t, e), this.chart) {
                    var i = this.chart;
                    i.height = this.canvas.height, i.width = this.canvas.width, i.aspectRatio = i.height ? i.width / i.height : null, i.update()
                }
                return this
            }
        }]), h
    }(), Yl = {
        setChart: function (t) {
            if (window.Chart) return this.chart && this.chart.destroy(), this.chart = new Chart(this.context, Ll(this, t)), this;
            return console.error("Can not find chartjs! Load chartjs in preload stage.\nscene.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js');"), this
        }, getChartDataset: function (t) {
            if (void 0 !== this.chart) {
                if ("string" != typeof t) return this.chart.data.datasets[t];
                for (var e, i = this.chart.data.datasets, n = 0, s = i.length; n < s; n++) if ((e = i[n]).label === t) return e
            }
        }, getChartData: function (t, e) {
            var i = this.getChartDataset(t);
            if (void 0 !== i) {
                if ("string" == typeof e) if (-1 === (e = this.chart.data.labels.indexOf(e))) return;
                return i.data[e]
            }
        }, setChartData: function (t, e, i) {
            if (void 0 === this.chart) return this;
            var n = this.getChartDataset(t);
            if ("string" == typeof e && -1 === (e = this.chart.data.labels.indexOf(e))) return this;
            return n.data[e] = i, this
        }, updateChart: function () {
            if (void 0 === this.chart) return this;
            this.chart.update()
        }
    };
    Object.assign(Il.prototype, Yl), u.register("chart", function (t, e, i, n, s) {
        var r = new Il(this.scene, t, e, i, n, s);
        return this.scene.add.existing(r), r
    }), H(window, "RexPlugins.UI.Chart", Il);

    function Al(t, e, i) {
        return void 0 === i && (i = "image"), t[e] || (t[e] = t.scene.make[i]({
            add: !1,
            origin: {x: 0, y: 0}
        }), t.on("destroy", function () {
            t[e] && (t[e].destroy(), t[e] = void 0)
        })), t[e]
    }

    function Fl(t, e, i) {
        return "__BASE" === i ? "".concat(t, ",").concat(e) : "".concat(i, "_").concat(t, ",").concat(e)
    }

    var Wl = Phaser.Utils.Objects.IsPlainObject, Vl = Phaser.Utils.Objects.GetValue, Xl = function (t) {
            return "string" == typeof t && (t = Gl[t]), t
        }, Gl = {scale: 0, repeat: 1}, Hl = {
            setTexture: function (t, e, i, n) {
                Array.isArray(e) && (n = i, i = e, e = void 0), void 0 === e && (e = "__BASE"), this.textureKey = t, this.baseFrameName = e, this.columns.data = i, this.columns.count = i ? i.length : 0, this.columns.stretch = 0, this.columns.minWidth = 0, this.columns.scale = 1, this.rows.data = n, this.rows.count = n ? n.length : 0, this.rows.stretch = 0, this.rows.minHeight = 0, this.rows.scale = 1;
                var s = this.scene.textures.get(t);
                if (!s) return this.clear(), this;
                if (!i || !n) return this.clear(), this;
                for (var r = s.frames[e], o = r.width, a = 0, h = 0, l = i.length; h < l; h++) void 0 === i[h] ? a++ : "number" == typeof i[h] ? o -= i[h] : o -= i[h].width;
                var u = o / a, c = r.height, d = 0;
                for (h = 0, l = n.length; h < l; h++) void 0 === n[h] ? d++ : "number" == typeof n[h] ? c -= n[h] : c -= n[h].width;
                for (var f, p, v, g, y, k = c / d, m = 0, b = 0, x = 0, C = n.length; x < C; x++) {
                    void 0 === n[x] && (n[x] = k), "number" == typeof n[x] && (n[x] = {
                        height: n[x],
                        stretch: x % 2
                    }), v = (f = n[x]).height, this.rows.stretch += 0 | f.stretch, this.rows.minHeight += 0 < f.stretch ? 0 : v;
                    h = m = 0;
                    for (var w = i.length; h < w; h++) void 0 === i[h] && (i[h] = u), "number" == typeof i[h] && (i[h] = {
                        width: i[h],
                        stretch: h % 2
                    }), g = (p = i[h]).width, 0 === x && (this.columns.stretch += 0 | p.stretch, this.columns.minWidth += 0 < p.stretch ? 0 : g), 1 <= g && 1 <= v ? (y = this.getFrameNameCallback(h, x, e)) && s.add(y, 0, m + r.cutX, b + r.cutY, g, v) : console.warn("Size of Grid(".concat(h, ",").concat(x, ") = ").concat(g, "x").concat(v, ", which is invalid")), m += g;
                    b += v
                }
                return this.updateTexture(), this
            }, updateTexture: function () {
                if (this.clear(), void 0 === this.textureKey) return this;
                var t = this.scene.textures.get(this.textureKey);
                if (!t) return this;
                var e, i, n, s, r, o, a, h = this.columns.minWidth, l = this.rows.minHeight, u = this.width - h,
                    c = this.height - l, d = 0 <= u ? 1 : this.width / h, f = 0 <= c ? 1 : this.height / l;
                if (this.preserveRatio) {
                    var p = Math.min(d, f);
                    if (p < d) {
                        var v = (d - p) * h;
                        0 <= u ? u += v : u = v, d = p
                    }
                    if (p < f) {
                        var g = (f - p) * l;
                        0 <= c ? c += g : c = g, f = p
                    }
                }
                this.columns.scale = d, this.rows.scale = f, e = 0 < u && 0 < this.columns.stretch ? u / this.columns.stretch : 0, i = 0 < c && 0 < this.rows.stretch ? c / this.rows.stretch : 0;
                for (var y, k = 0, m = 0, b = 0, x = this.rows.count; b < x; b++) {
                    a = 0 === (r = this.rows.data[b]).stretch ? r.height * f : i * r.stretch;
                    for (var C = k = 0, w = this.columns.count; C < w; C++) o = 0 === (s = this.columns.data[C]).stretch ? s.width * d : e * s.stretch, (n = this.getFrameNameCallback(C, b, this.baseFrameName)) && 0 < o && 0 < a && t.has(n) && (0 === (0 === r.stretch && 0 === s.stretch || 0 === this.getStretchMode(C, b) ? 0 : 1) ? (y = Al(this, "_image", "image")).setTexture(this.textureKey, n).setDisplaySize(o, a) : (y = Al(this, "_tileSprite", "tileSprite")).setTexture(this.textureKey, n).setSize(o, a)), y && (this.draw(y, k, m), y = void 0), k += o;
                    m += a
                }
            }, setStretchMode: function (t) {
                return Wl(t) ? (this.stretchMode.edge = Xl(Vl(t, "edge", 0)), this.stretchMode.internal = Xl(Vl(t, "internal", 0))) : (t = Xl(t), this.stretchMode.edge = t, this.stretchMode.internal = t), this
            }, getStretchMode: function (t, e) {
                return function (t, e) {
                    return 0 === t || t === this.columns.count - 1 || 0 === e || e === this.rows.count - 1
                }.call(this, t, e) ? this.stretchMode.edge : this.stretchMode.internal
            }, setPreserveRatio: function (t) {
                return null == t && (t = !0), this.preserveRatio = t, this
            }
        }, Ul = Phaser.GameObjects.RenderTexture, Nl = Phaser.Utils.Objects.IsPlainObject,
        Jl = Phaser.Utils.Objects.GetValue, Kl = function () {
            b(d, Ul);
            var c = w(d);

            function d(t, e, i, n, s, r, o, a, h, l) {
                var u;
                return B(this, d), Nl(e) ? (e = Jl(l = e, "x", 0), i = Jl(l, "y", 0), n = Jl(l, "width", 1), s = Jl(l, "height", 1), r = Jl(l, "key", void 0), o = Jl(l, "baseFrame", void 0), a = Jl(l, "columns", void 0), h = Jl(l, "rows", void 0)) : Nl(n) ? (n = Jl(l = n, "width", 1), s = Jl(l, "height", 1), r = Jl(l, "key", void 0), o = Jl(l, "baseFrame", void 0), a = Jl(l, "columns", void 0), h = Jl(l, "rows", void 0)) : Nl(r) ? (r = Jl(l = r, "key", void 0), o = Jl(l, "baseFrame", void 0), a = Jl(l, "columns", void 0), h = Jl(l, "rows", void 0)) : Nl(o) ? (o = Jl(l = o, "baseFrame", void 0), a = Jl(l, "columns", void 0), h = Jl(l, "rows", void 0)) : Array.isArray(o) ? (l = h, h = a, a = o, o = Jl(l, "baseFrame", void 0)) : Nl(a) && (a = Jl(l = a, "columns", void 0), h = Jl(l, "rows", void 0)), (u = c.call(this, t, e, i, n, s)).columns = {}, u.rows = {}, u.stretchMode = {}, u._tileSprite = void 0, u._image = void 0, u.setOrigin(.5, .5), u.setGetFrameNameCallback(Jl(l, "getFrameNameCallback", void 0)), u.setStretchMode(Jl(l, "stretchMode", 0)), u.setPreserveRatio(Jl(l, "preserveRatio", !0)), u.setTexture(r, o, a, h), u
            }

            return m(d, [{
                key: "setGetFrameNameCallback", value: function (t) {
                    return void 0 === t && (t = Fl), this.getFrameNameCallback = t, this
                }
            }, {
                key: "minWidth", get: function () {
                    return this.columns.minWidth
                }
            }, {
                key: "minHeight", get: function () {
                    return this.rows.minHeight
                }
            }, {
                key: "fixedPartScaleX", get: function () {
                    return this.columns.scale
                }
            }, {
                key: "fixedPartScaleY", get: function () {
                    return this.rows.scale
                }
            }, {
                key: "resize", value: function (t, e) {
                    return this.width === t && this.height === e || (C(x(d.prototype), "resize", this).call(this, t, e), this.updateTexture()), this
                }
            }]), d
        }();
    Object.assign(Kl.prototype, Hl), u.register("ninePatch", function (t, e, i, n, s, r, o, a) {
        var h = new Kl(this.scene, t, e, i, n, s, r, o, a);
        return this.scene.add.existing(h), h
    }), H(window, "RexPlugins.UI.NinePatch", Kl);

    function Zl(t, e, i, n, s, r, o, a) {
        this.pin(t);
        var h = p(e);
        if (null === e) return this;
        if ("number" !== h) if ("string" === h) e = tu[e]; else if (ql(e)) {
            var l;
            e = $l(l = e, "proportion", 0), i = $l(l, "align", Ql), n = $l(l, "padding", 0), s = $l(l, "expand", !1), r = $l(l, "key", void 0), o = $l(l, "index", void 0), t.isRexSizer || (a = $l(l, "minWidth", void 0), a = 0 === this.orientation ? $l(l, "minWidth", void 0) : $l(l, "minHeight", void 0))
        }
        return "string" == typeof i && (i = pa[i]), void 0 === e && (e = 0), void 0 === i && (i = Ql), void 0 === n && (n = 0), void 0 === s && (s = !1), (l = this.getSizerConfig(t)).proportion = e, l.align = i, l.padding = Fa(n), l.expand = s, void 0 === o || o >= this.sizerChildren.length ? this.sizerChildren.push(t) : this.sizerChildren.splice(o, 0, t), !t.isRexSizer && 0 < e && (0 === this.orientation ? (t.minWidth = void 0 === a ? ga(t) : a, t.minHeight = void 0) : (t.minWidth = void 0, t.minHeight = void 0 === a ? ya(t) : a)), void 0 !== r && this.addChildrenMap(r, t), this
    }

    var ql = Phaser.Utils.Objects.IsPlainObject, $l = Phaser.Utils.Objects.GetValue, Ql = Phaser.Display.Align.CENTER,
        tu = {min: 0, full: -1}, eu = {
            add: Zl, addSpace: function (t) {
                var e, i;
                return void 0 === t && (t = 1), Zl.call(this, (e = this.scene, (i = e.add.zone(0, 0, 1, 1)).isRexSpace = !0, i), {
                    proportion: t,
                    minWidth: 0,
                    minHeight: 0
                }), this
            }, insert: function (t, e, i, n, s, r, o) {
                return Zl.call(this, e, i, n, s, r, o, t), this
            }
        }, iu = Phaser.Utils.Array.Remove, nu = Ni.prototype.remove, su = Ni.prototype.clear, ru = {
            remove: function (t, e) {
                return this.getParentSizer(t) !== this || (iu(this.sizerChildren, t), nu.call(this, t, e)), this
            }, removeAll: function (t) {
                for (var e = 0, i = this.sizerChildren; e < i; e++) this.remove(this.sizerChildren[e], t);
                return this.sizerChildren.length = 0, this
            }, clear: function (t) {
                return this.sizerChildren.length = 0, this.backgroundChildren && (this.backgroundChildren.length = 0), su.call(this, t), this
            }
        }, ou = {
            getChildrenWidth: function (t) {
                if (this.rexSizer.hidden) return 0;
                void 0 === t && (t = !0);
                var e, i, n, s = 0, r = this.sizerChildren;
                if (0 === this.orientation) for (var o = 0, a = r.length; o < a; o++) (e = r[o]).rexSizer.hidden || (n = 0 === e.rexSizer.proportion || t && 0 < e.rexSizer.proportion ? this.getChildWidth(e) : 0, n += (i = e.rexSizer.padding).left + i.right, 0 < o && (n += this.space.item), s += n); else for (o = 0, a = r.length; o < a; o++) (e = r[o]).hasOwnProperty("rexSizer") && (e.rexSizer.hidden || (i = e.rexSizer.padding, n = this.getChildWidth(e) + i.left + i.right, s = Math.max(n, s)));
                return s + this.space.left + this.space.right
            }, getChildrenHeight: function (t) {
                if (this.rexSizer.hidden) return 0;
                void 0 === t && (t = !0);
                var e, i, n, s = 0, r = this.sizerChildren;
                if (0 === this.orientation) for (var o = 0, a = r.length; o < a; o++) (e = r[o]).rexSizer.hidden || (i = e.rexSizer.padding, n = this.getChildHeight(e) + i.top + i.bottom, s = Math.max(n, s)); else for (o = 0, a = r.length; o < a; o++) (e = r[o]).hasOwnProperty("rexSizer") && (e.rexSizer.hidden || (i = e.rexSizer.padding, n = 0 === e.rexSizer.proportion || t && 0 < e.rexSizer.proportion ? this.getChildHeight(e) : 0, n += i.top + i.bottom, 0 < o && (n += this.space.item), s += n));
                return s + this.space.top + this.space.bottom
            }, getExpandedChildWidth: function (t, e) {
                var i;
                void 0 === e && (e = this.width);
                var n = t.rexSizer, s = n.padding;
                0 === this.orientation ? 0 < n.proportion && 0 < this.proportionLength && (i = n.proportion * this.proportionLength) : n.expand && (i = e - this.space.left - this.space.right - s.left - s.right);
                return i
            }, getExpandedChildHeight: function (t, e) {
                var i;
                void 0 === e && (e = this.height);
                var n = t.rexSizer, s = n.padding;
                0 === this.orientation ? n.expand && (i = e - this.space.top - this.space.bottom - s.top - s.bottom) : 0 < n.proportion && 0 < this.proportionLength && (i = n.proportion * this.proportionLength);
                return i
            }, getChildrenSizers: function (t) {
                void 0 === t && (t = []);
                for (var e, i = this.sizerChildren, n = 0, s = i.length; n < s; n++) (e = i[n]).isRexSizer && t.push(e);
                return t
            }, preLayout: function () {
                return this._childrenProportion = void 0, this.proportionLength = void 0, Ga.call(this), this
            }, layoutChildren: function () {
                for (var t, e, i, n, s, r, o, a, h, l = this.sizerChildren, u = this.innerLeft, c = this.innerTop, d = this.innerWidth, f = this.innerHeight, p = u, v = c, g = 0, y = l.length; g < y; g++) (t = l[g]).rexSizer.hidden || (i = (e = t.rexSizer).padding, a = this.getExpandedChildWidth(t), h = this.getExpandedChildHeight(t), t.isRexSizer ? t.runLayout(this, a, h) : eh(t, a, h), void 0 === a && (a = ga(t)), void 0 === h && (h = ya(t)), o = 0 === this.orientation ? (n = p + i.left, r = 0 === e.proportion || 0 === this.proportionLength ? a : e.proportion * this.proportionLength, s = v + i.top, f - i.top - i.bottom) : (n = p + i.left, r = d - i.left - i.right, s = v + i.top, 0 === e.proportion || 0 === this.proportionLength ? h : e.proportion * this.proportionLength), va.setPosition(n, s).setSize(r, o), Aa(t, va, e.align), this.resetChildPositionState(t), 0 === this.orientation ? p += r + i.left + i.right + this.space.item : v += o + i.top + i.bottom + this.space.item)
            }, resolveWidth: function (t) {
                t = Va.call(this, t);
                if (void 0 === this.proportionLength && 0 === this.orientation) {
                    var e = t - this.childrenWidth;
                    0 < e ? (e = t - this.getChildrenWidth(!1), this.proportionLength = e / this.childrenProportion) : this.proportionLength = 0
                }
                return t
            }, resolveHeight: function (t, e) {
                e = Xa.call(this, t, e);
                if (void 0 === this.proportionLength && 1 === this.orientation) {
                    var i = e - this.childrenHeight;
                    0 < i ? (i = e - this.getChildrenHeight(!1), this.proportionLength = i / this.childrenProportion) : this.proportionLength = 0
                }
                return e
            }
        };
    Object.assign(ou, eu, ru);

    function au(t) {
        return "string" == typeof t && (t = hu[t]), t
    }

    var hu = {x: 0, h: 0, horizontal: 0, "left-to-right": 0, y: 1, v: 1, vertical: 1, "top-to-bottom": 1},
        lu = Phaser.Utils.Objects.IsPlainObject, uu = Phaser.Utils.Objects.GetValue, cu = function () {
            b(l, Hh);
            var h = w(l);

            function l(t, e, i, n, s, r, o) {
                var a;
                return B(this, l), lu(e) ? (e = uu(o = e, "x", 0), i = uu(o, "y", 0), n = uu(o, "width", void 0), s = uu(o, "height", void 0), r = uu(o, "orientation", 0)) : lu(n) ? (n = uu(o = n, "width", void 0), s = uu(o, "height", void 0), r = uu(o, "orientation", 0)) : lu(r) && (r = uu(o = r, "orientation", 0)), void 0 === r && (r = 0), (a = h.call(this, t, e, i, n, s, o)).type = "rexSizer", a.sizerChildren = [], a.setOrientation(r), a.setItemSpacing(uu(o, "space.item", 0)), a.addChildrenMap("items", a.sizerChildren), a
            }

            return m(l, [{
                key: "destroy", value: function (t) {
                    this.scene && (this.sizerChildren.length = 0, C(x(l.prototype), "destroy", this).call(this, t))
                }
            }, {
                key: "setOrientation", value: function (t) {
                    return this.orientation = au(t), this
                }
            }, {
                key: "setItemSpacing", value: function (t) {
                    return this.space.item = t, this
                }
            }, {
                key: "childrenProportion", get: function () {
                    return void 0 === this._childrenProportion && (this._childrenProportion = function () {
                        for (var t, e, i = 0, n = this.sizerChildren, s = 0, r = n.length; s < r; s++) (t = n[s]).rexSizer.hidden || 0 < (e = t.rexSizer.proportion) && (i += e);
                        return i
                    }.call(this)), this._childrenProportion
                }
            }]), l
        }();
    Object.assign(cu.prototype, ou), u.register("sizer", function (t, e, i, n, s, r) {
        var o = new cu(this.scene, t, e, i, n, s, r);
        return this.scene.add.existing(o), o
    }), H(window, "RexPlugins.UI.Sizer", cu);

    function du() {
        return Array.prototype.reduce.call(arguments, pu, 0)
    }

    function fu(t, e, i, n) {
        void 0 === i && (i = 0), void 0 === n && (n = t.length - 1);
        for (var s = i; s <= n; s++) t[s] = e;
        return t
    }

    var pu = function (t, e) {
            return t + e
        }, vu = Phaser.Utils.Objects.IsPlainObject, gu = Phaser.Utils.Objects.GetValue, yu = Phaser.Display.Align.CENTER,
        ku = {
            add: function (t, e, i, n, s, r, o) {
                this.pin(t), vu(e) && (e = gu(a = e, "column", void 0), i = gu(a, "row", void 0), n = gu(a, "align", yu), s = gu(a, "padding", 0), r = gu(a, "expand", !1), o = gu(a, "key", void 0));
                var a, h = function (t, e, i, n, s) {
                    if ("number" == typeof t || "number" == typeof e) if (void 0 === t) {
                        for (var r = 0; r < n; r++) if (!i[o = e * n + r]) return o
                    } else if (void 0 === e) {
                        for (r = 0; r < s; r++) if (!i[o = r * n + t]) return o
                    } else {
                        if (!i[o = e * n + t]) return o
                    } else if (!0 === e) {
                        var o;
                        for (r = 0; r < n; r++) for (var a = 0; a < s; a++) if (!i[o = a * n + r]) return o
                    } else {
                        r = 0;
                        for (var h = i.length; r < h; r++) if (!i[r]) return r
                    }
                    return null
                }(e, i, this.sizerChildren, this.columnCount, this.rowCount);
                return null === h || ("string" == typeof n && (n = pa[n]), void 0 === n && (n = yu), void 0 === s && (s = 0), void 0 === r && (r = !0), (a = this.getSizerConfig(t)).align = n, a.padding = Fa(s), a.expand = r, this.sizerChildren[h] = t, void 0 !== o && this.addChildrenMap(o, t)), this
            }
        }, mu = Phaser.Utils.Array.Remove, bu = Ni.prototype.remove, xu = Ni.prototype.clear, Cu = {
            remove: function (t, e) {
                if (this.getParentSizer(t) !== this) return this;
                if (this.isBackground(t)) mu(this.backgroundChildren, t); else {
                    var i = this.sizerChildren.indexOf(t);
                    -1 !== i && (this.sizerChildren[i] = null)
                }
                return bu.call(this, t, e), this
            }, removeAt: function (t, e, i) {
                var n = this.getChildAt(t, e);
                return n && this.remove(n, i), this
            }, removeAll: function (t) {
                for (var e = 0, i = this.sizerChildren.length; e < i; e++) {
                    var n = this.sizerChildren[e];
                    n && this.remove(n, t)
                }
                return this
            }, clear: function (t) {
                return fu(this.sizerChildren, null), this.backgroundChildren && (this.backgroundChildren.length = 0), xu.call(this, t), this
            }
        }, wu = Phaser.Utils.Objects.GetValue, Su = {
            getChildrenWidth: function () {
                if (this.rexSizer.hidden) return 0;
                for (var t, e, i, n, s = 0, r = this.sizerChildren, o = 0; o < this.columnCount; o++) {
                    if ((t = 0) === this.columnProportions[o]) {
                        for (var a = 0; a < this.rowCount; a++) (e = r[a * this.columnCount + o]) && (e.rexSizer.hidden || (i = e.rexSizer.padding, n = this.getChildWidth(e) + i.left + i.right, t = Math.max(t, n)));
                        s += t
                    }
                    this.columnWidth[o] = t
                }
                return s + du.apply(void 0, [this.space.left].concat(h(this.space.column), [this.space.right]))
            }, getChildrenHeight: function () {
                if (this.rexSizer.hidden) return 0;
                for (var t, e, i, n, s = 0, r = this.sizerChildren, o = 0; o < this.rowCount; o++) {
                    if ((t = 0) === this.rowProportions[o]) {
                        for (var a = 0; a < this.columnCount; a++) (e = r[o * this.columnCount + a]) && (e.rexSizer.hidden || (n = e.isRexSizer ? Math.max(e.minHeight, e.childrenHeight) : e.hasOwnProperty("minHeight") ? e.minHeight : ya(e), n += (i = e.rexSizer.padding).top + i.bottom, t = Math.max(t, n)));
                        s += t
                    }
                    this.rowHeight[o] = t
                }
                return s + du.apply(void 0, [this.space.top].concat(h(this.space.row), [this.space.bottom]))
            }, getExpandedChildWidth: function (t, e) {
                var i, n = t.rexSizer;
                if (n.expand) {
                    var s = n.padding;
                    i = e - s.left - s.right
                }
                return i
            }, getExpandedChildHeight: function (t, e) {
                var i, n = t.rexSizer;
                if (n.expand) {
                    var s = n.padding;
                    i = e - s.top - s.bottom
                }
                return i
            }, getChildrenSizers: function (t) {
                void 0 === t && (t = []);
                for (var e, i = this.sizerChildren, n = 0, s = i.length; n < s; n++) (e = i[n]) && e.isRexSizer && t.push(e);
                return t
            }, preLayout: function () {
                return this._totalColumnProportions = void 0, this._totalRowProportions = void 0, this.proportionWidthLength = void 0, this.proportionHeightLength = void 0, Ga.call(this), this
            }, layoutChildren: function () {
                for (var t, e, i, n, s, r, o, a, h, l, u, c = this.innerLeft, d = c, f = this.innerTop, p = this.space.column, v = this.space.row, g = 0; g < this.rowCount; g++) {
                    u = this.getRowHeight(g), d = c;
                    for (var y = 0; y < this.columnCount; y++) l = this.getColumnWidth(y), (t = this.getChildAt(y, g)) && !t.rexSizer.hidden && (a = this.getExpandedChildWidth(t, l), h = this.getExpandedChildHeight(t, u), t.isRexSizer ? t.runLayout(this, a, h) : eh(t, a, h), n = d + (i = (e = t.rexSizer).padding).left, r = l - i.left - i.right, s = f + i.top, o = u - i.top - i.bottom, va.setPosition(n, s).setSize(r, o), Aa(t, va, e.align), this.resetChildPositionState(t)), d += l + p[y];
                    f += u + v[g]
                }
            }, resolveWidth: function (t) {
                t = Va.call(this, t);
                if (void 0 === this.proportionWidthLength) {
                    var e = this.totalColumnProportions;
                    if (0 < e) {
                        var i = t - this.childrenWidth;
                        0 <= i && (this.proportionWidthLength = i / e)
                    } else this.proportionWidthLength = 0
                }
                return t
            }, resolveHeight: function (t, e) {
                e = Xa.call(this, t, e);
                if (void 0 === this.proportionHeightLength) {
                    var i = this.totalRowProportions;
                    if (0 < i) {
                        var n = e - this.childrenHeight;
                        0 <= n && (this.proportionHeightLength = n / i)
                    } else this.proportionHeightLength = 0
                }
                return e
            }, resolveChildrenWidth: function () {
                var t, e, i;
                for (var n in this.sizerChildren) (t = this.sizerChildren[n]) && (i = this.getColumnWidth(parseInt(n) % this.columnCount), t.isRexSizer && (e = this.getExpandedChildWidth(t, i), e = t.resolveWidth(e), t.resolveChildrenWidth(e)))
            }, runWidthWrap: function () {
                var t, e, i;
                for (var n in this.sizerChildren) (t = this.sizerChildren[n]) && (i = this.getColumnWidth(parseInt(n) % this.columnCount), void 0 === (e = this.getExpandedChildWidth(t, i)) && (e = this.resolveWidth(e)), t.runWidthWrap && t.runWidthWrap(e));
                return this
            }, resetGrid: function (t, e, i, n, s) {
                if (void 0 === i && (i = 0), void 0 === n && (n = 0), this.columnCount = t, this.rowCount = e, void 0 === this.sizerChildren ? this.sizerChildren = [] : this.removeAll(), this.sizerChildren.length = t * e, fu(this.sizerChildren, null), this.columnProportions = [], this.columnProportions.length = t, "number" == typeof i) fu(this.columnProportions, i); else for (var r = 0; r < t; r++) this.columnProportions[r] = i[r] || 0;
                if (this.rowProportions = [], this.rowProportions.length = e, "number" == typeof n) fu(this.rowProportions, n); else for (r = 0; r < e; r++) this.rowProportions[r] = n[r] || 0;
                this.columnWidth = [], this.columnWidth.length = t, this.rowHeight = [], this.rowHeight.length = e, this.space.column = [], this.space.column.length = t - 1;
                var o = wu(s, "column", 0);
                if ("number" == typeof o) fu(this.space.column, o); else {
                    r = 0;
                    for (var a = this.space.column.length; r < a; r++) this.space.column[r] = o[r] || 0
                }
                this.space.row = [], this.space.row.length = e - 1;
                var h = wu(s, "row", 0);
                if ("number" == typeof h) fu(this.space.row, h); else for (r = 0, a = this.space.row.length; r < a; r++) this.space.row[r] = h[r] || 0;
                return this
            }
        };
    Object.assign(Su, ku, Cu);
    var Pu = Phaser.Utils.Objects.IsPlainObject, Tu = Phaser.Utils.Objects.GetValue, Ou = function () {
        b(d, Hh);
        var c = w(d);

        function d(t, e, i, n, s, r, o, a, h, l) {
            var u;
            return B(this, d), Pu(e) ? (e = Tu(l = e, "x", 0), i = Tu(l, "y", 0), n = Tu(l, "width", void 0), s = Tu(l, "height", void 0), r = Tu(l, "column", 0), o = Tu(l, "row", 0), a = Tu(l, "columnProportions", 0), h = Tu(l, "rowProportions", 0)) : Pu(n) ? (n = Tu(l = n, "width", void 0), s = Tu(l, "height", void 0), r = Tu(l, "column", 0), o = Tu(l, "row", 0), a = Tu(l, "columnProportions", 0), h = Tu(l, "rowProportions", 0)) : Pu(r) ? (r = Tu(l = r, "column", 0), o = Tu(l, "row", 0), a = Tu(l, "columnProportions", 0), h = Tu(l, "rowProportions", 0)) : Pu(a) && (a = Tu(l = a, "columnProportions", 0), h = Tu(l, "rowProportions", 0)), (u = c.call(this, t, e, i, n, s, l)).type = "rexGridSizer", u.resetGrid(r, o, a, h, Tu(l, "space", void 0)), u.addChildrenMap("items", u.sizerChildren), u
        }

        return m(d, [{
            key: "destroy", value: function (t) {
                this.scene && (this.sizerChildren.length = 0, C(x(d.prototype), "destroy", this).call(this, t))
            }
        }, {
            key: "setColumnProportion", value: function (t, e) {
                return t >= this.columnProportions.length || (this.columnProportions[t] = e), this
            }
        }, {
            key: "setRowProportion", value: function (t, e) {
                return t >= this.rowProportions.length || (this.rowProportions[t] = e), this
            }
        }, {
            key: "totalColumnProportions", get: function () {
                return void 0 === this._totalColumnProportions && (this._totalColumnProportions = function () {
                    for (var t, e = 0, i = 0; i < this.columnCount; i++) 0 < (t = this.columnProportions[i]) && (e += t);
                    return e
                }.call(this)), this._totalColumnProportions
            }
        }, {
            key: "totalRowProportions", get: function () {
                return void 0 === this._totalRowProportions && (this._totalRowProportions = function () {
                    for (var t, e = 0, i = 0; i < this.rowCount; i++) 0 < (t = this.rowProportions[i]) && (e += t);
                    return e
                }.call(this)), this._totalRowProportions
            }
        }, {
            key: "getChildAt", value: function (t, e) {
                return this.sizerChildren[e * this.columnCount + t]
            }
        }, {
            key: "childToGridIndex", value: function (t, e) {
                if (!t) return null;
                var i = this.sizerChildren.indexOf(t);
                return -1 === i ? null : (void 0 === e && (e = {}), e.x = i % this.columnCount, e.y = Math.floor(i / this.columnCount), e)
            }
        }, {
            key: "getColumnWidth", value: function (t) {
                var e = this.columnProportions[t];
                return 0 === e ? this.columnWidth[t] : e * this.proportionWidthLength
            }
        }, {
            key: "getRowHeight", value: function (t) {
                var e = this.rowProportions[t];
                return 0 === e ? this.rowHeight[t] : e * this.proportionHeightLength
            }
        }]), d
    }();
    Object.assign(Ou.prototype, Su), u.register("gridSizer", function (t, e, i, n, s, r, o, a, h) {
        var l = new Ou(this.scene, t, e, i, n, s, r, o, a, h);
        return this.scene.add.existing(l), l
    }), H(window, "RexPlugins.UI.GridSizer", Ou);

    function Mu(t, e, i, n) {
        return "\n" === t ? this.addNewLine() : (this.pin(t), zu(e) && (e = ju(s = e, "padding", 0), i = ju(s, "key", void 0), n = ju(s, "index", void 0)), void 0 === e && (e = 0), (s = this.getSizerConfig(t)).align = Ru, s.padding = Fa(e), void 0 === n || n >= this.sizerChildren.length ? this.sizerChildren.push(t) : this.sizerChildren.splice(n, 0, t), void 0 !== i && this.addChildrenMap(i, t)), this;
        var s
    }

    var _u = function (t, e, i) {
            return e / t <= .25 ? e / (i - 1) : 0
        }, Eu = function (t) {
            var e = t.rexSizer.padding;
            return ga(t) + e.left + e.right
        }, Bu = function (t) {
            var e = t.rexSizer.padding;
            return ya(t) + e.top + e.bottom
        }, zu = Phaser.Utils.Objects.IsPlainObject, ju = Phaser.Utils.Objects.GetValue, Ru = Phaser.Display.Align.CENTER,
        Du = {
            add: function (t, e, i) {
                if (Pi(t)) for (var n = t, s = 0, r = n.length; s < r; s++) Mu.call(this, n[s], e); else Mu.call(this, t, e, i);
                return this
            }, addNewLine: function () {
                return this.sizerChildren.push("\n"), this
            }, insert: function (t, e, i, n) {
                return Mu.call(this, e, i, n, t), this
            }
        }, Lu = Phaser.Utils.Array.Remove, Iu = Ni.prototype.remove, Yu = Ni.prototype.clear, Au = {
            remove: function (t, e) {
                return this.getParentSizer(t) !== this || (Lu(this.sizerChildren, t), Iu.call(this, t, e)), this
            }, removeAll: function (t) {
                for (var e = 0, i = this.sizerChildren.length; e < i; e++) Iu.call(this, this.sizerChildren[e], t);
                return this.sizerChildren.length = 0, this
            }, clear: function (t) {
                return this.sizerChildren.length = 0, this.backgroundChildren && (this.backgroundChildren.length = 0), Yu.call(this, t), this
            }
        }, Fu = {
            getChildrenWidth: function () {
                return this.rexSizer.hidden ? 0 : this.maxChildWidth + this.space.left + this.space.right
            }, getChildrenHeight: function () {
                return this.rexSizer.hidden ? 0 : this.widthWrapResult.height + this.space.top + this.space.bottom
            }, getChildrenSizers: function (t) {
                void 0 === t && (t = []);
                for (var e, i = this.sizerChildren, n = 0, s = i.length; n < s; n++) "\n" !== (e = i[n]) && e.isRexSizer && t.push(e);
                return t
            }, preLayout: function () {
                return this._maxChildWidth = void 0, this._maxChildHeight = void 0, Ga.call(this), this
            }, layoutChildren: function () {
                for (var t, e, i, n, s, r, o, a, h, l, u = this.innerWidth, c = 0, d = this.innerLeft, f = d, p = this.innerTop, v = this.widthWrapResult.lines, g = 0, y = v.length; g < y; g++) {
                    switch (h = (a = v[g]).children, this.rtl && h.reverse(), l = u - a.width, this.align) {
                        case 0:
                            break;
                        case 1:
                            f += l;
                            break;
                        case 2:
                            f += l / 2;
                            break;
                        case 3:
                            c = _u(u, l, h.length);
                            break;
                        case 4:
                            0 === (c = _u(u, l, h.length)) && (f += l);
                            break;
                        case 5:
                            0 === (c = _u(u, l, h.length)) && (f += l / 2)
                    }
                    for (var k = 0, m = h.length; k < m; k++) n = f + (i = (e = (t = h[k]).rexSizer).padding).left, 0 < k && (n += this.space.item), s = p + i.top, r = ga(t), o = ya(t), f = n + r + i.right + c, va.setPosition(n, s).setSize(r, o), Aa(t, va, e.align), this.resetChildPositionState(t);
                    f = d, p += a.height + this.space.line
                }
            }, runWidthWrap: function (t) {
                var e = t - this.space.left - this.space.right;
                this.widthWrapResult = function (t, e) {
                    void 0 === e ? e = {lines: [], width: 0, height: 0} : (e.lines.length = 0, e.width = 0, e.height = 0);
                    for (var i, n, s, r, o, a = this.sizerChildren, h = 0, l = e.lines, u = 0, c = a.length; u < c; u++) {
                        if ("\n" === (i = a[u])) i = void 0, o = !(n = 0); else {
                            if (i.rexSizer.hidden) continue;
                            i.isRexSizer && i.layout(), o = h < (n = Eu(i))
                        }
                        o && (r && (r.width = t - (h + this.space.item), e.width = Math.max(e.width, r.width), e.height += r.height + this.space.line), r = {
                            children: [],
                            height: 0
                        }, l.push(r), h = t), h -= n + this.space.item, i && (r.children.push(i), s = Bu(i), r.height = Math.max(r.height, s))
                    }
                    return r && (r.width = t - (h + this.space.item), e.width = Math.max(e.width, r.width), e.height += r.height), e
                }.call(this, e, this.widthWrapResult), Ha.call(this, t)
            }
        };
    Object.assign(Fu, Du, Au);
    var Wu = Phaser.Utils.Objects.IsPlainObject, Vu = Phaser.Utils.Objects.GetValue, Xu = function () {
        b(h, Hh);
        var a = w(h);

        function h(t, e, i, n, s, r) {
            var o;
            return B(this, h), Wu(e) ? (e = Vu(r = e, "x", 0), i = Vu(r, "y", 0), n = Vu(r, "width", void 0), s = Vu(r, "height", void 0)) : Wu(n) && (n = Vu(r = n, "width", void 0), s = Vu(r, "height", void 0)), (o = a.call(this, t, e, i, n, s, r)).type = "rexFixWidthSizer", o.sizerChildren = [], o.setOrientation(Vu(r, "orientation", 0)), o.setItemSpacing(Vu(r, "space.item", 0)), o.setLineSpacing(Vu(r, "space.line", 0)), o.setAlign(Vu(r, "align", 0)), o.setRTL(Vu(r, "rtl", !1)), o.addChildrenMap("items", o.sizerChildren), o
        }

        return m(h, [{
            key: "destroy", value: function (t) {
                this.scene && (this.sizerChildren.length = 0, C(x(h.prototype), "destroy", this).call(this, t))
            }
        }, {
            key: "setOrientation", value: function (t) {
                return this.orientation = au(t), this
            }
        }, {
            key: "setItemSpacing", value: function (t) {
                return this.space.item = t, this
            }
        }, {
            key: "setLineSpacing", value: function (t) {
                return this.space.line = t, this
            }
        }, {
            key: "setAlign", value: function (t) {
                return "string" == typeof t && (t = Gu[t]), this.align = t, this
            }
        }, {
            key: "setRTL", value: function (t) {
                return void 0 === t && (t = !0), this.rtl = t, this
            }
        }, {
            key: "maxChildWidth", get: function () {
                return void 0 === this._maxChildWidth && (this._maxChildWidth = function (t) {
                    void 0 === t && (t = this.sizerChildren);
                    for (var e, i, n = 0, s = 0, r = t.length; s < r; s++) "\n" !== (e = t[s]) && (i = this.getChildWidth(e), n = Math.max(i, n));
                    return n
                }.call(this)), this._maxChildWidth
            }
        }, {
            key: "maxChildHeight", get: function () {
                return void 0 === this._maxChildHeight && (this._maxChildHeight = function (t) {
                    void 0 === t && (t = this.sizerChildren);
                    for (var e, i, n = 0, s = 0, r = t.length; s < r; s++) "\n" !== (e = t[s]) && (i = e.isRexSizer ? Math.max(e.minHeight, e.childrenHeight) : e.hasOwnProperty("minHeight") ? e.minHeight : ya(e), n = Math.max(i, n));
                    return n
                }.call(this)), this._maxChildHeight
            }
        }]), h
    }(), Gu = {
        left: 0,
        top: 0,
        right: 1,
        bottom: 1,
        center: 2,
        justify: 3,
        "justify-left": 3,
        "justify-top": 3,
        "justify-right": 4,
        "justify-bottom": 4,
        "justify-center": 5
    };
    Object.assign(Xu.prototype, Fu), u.register("fixWidthSizer", function (t, e, i, n, s) {
        var r = new Xu(this.scene, t, e, i, n, s);
        return this.scene.add.existing(r), r
    }), H(window, "RexPlugins.UI.FixWidthSizer", Xu), u.register("overlapSizer", function (t, e, i, n, s) {
        var r = new nl(this.scene, t, e, i, n, s);
        return this.scene.add.existing(r), r
    }), H(window, "RexPlugins.UI.OverlapSizer", nl);

    function Hu(t, e, i, n) {
        var s = new Nu(e, i, n);
        return t && !t.isRexSizer && t.setMask(s.createGeometryMask()), this.pin(s), s
    }

    var Uu = Phaser.GameObjects.Graphics, Nu = function () {
        b(r, Uu);
        var s = w(r);

        function r(t, e, i) {
            var n;
            return B(this, r), void 0 === e && (e = 0), "string" == typeof e && (e = Ju[e]), void 0 === i && (i = 0), (n = s.call(this, t.scene)).parent = t, n.shape = e, n.padding = i, n.setPosition().resize(), n
        }

        return m(r, [{
            key: "destroy", value: function () {
                return this.parent = void 0, C(x(r.prototype), "destroy", this).call(this), this
            }
        }, {
            key: "setPosition", value: function (t, e) {
                var i = this.parent;
                return void 0 === t && (t = i.x), void 0 === e && (e = i.y), C(x(r.prototype), "setPosition", this).call(this, t, e), this
            }
        }, {
            key: "resize", value: function (t, e, i) {
                var n = this.parent;
                if (void 0 === t && (t = n.width), void 0 === e && (e = n.height), void 0 === i && (i = this.padding), this.widthSave === t && this.heightSave === e && this.paddingSave === i) return this;
                switch (this.clear().fillStyle(16777215), this.shape) {
                    case 1:
                        var s = Math.min(t, e) / 2;
                        this.fillCircle(0, 0, s + i);
                        break;
                    default:
                        this.fillRect(-(t * n.originX) - i, -(e * n.originY) - i, t + 2 * i, e + 2 * i)
                }
                return this.widthSave = t, this.heightSave = e, this.paddingSave = i, this
            }
        }]), r
    }(), Ju = {rectangle: 0, circle: 1}, Ku = Phaser.Utils.Objects.GetValue, Zu = function () {
        b(k, cu);
        var y = w(k);

        function k(t, e) {
            var i;
            B(this, k), (i = y.call(this, t, e)).type = "rexLabel";
            var n = Ku(e, "background", void 0), s = Ku(e, "icon", void 0), r = Ku(e, "iconMask", void 0),
                o = Ku(e, "text", void 0), a = Ku(e, "action", void 0), h = Ku(e, "actionMask", void 0),
                l = Ku(e, "align", void 0), u = Ku(e, "space.icon", 0), c = Ku(e, "space.text", 0);
            n && i.addBackground(n), "right" !== l && "bottom" !== l && "center" !== l || i.addSpace(), s && (0 === i.orientation ? (o || a) && (f = {right: u}) : (o || a) && (f = {bottom: u}), i.add(s, 0, "center", f), r = r && i.addChildMask(s, s, 1));
            if (o) {
                var d, f, p, v = Ku(e, "expandTextWidth", !1), g = Ku(e, "expandTextHeight", !1);
                p = 0 === i.orientation ? (d = v ? 1 : 0, a && (f = {right: c}), g) : (d = g ? 1 : 0, a && (f = {bottom: c}), v), i.add(o, d, "center", f, p)
            }
            return a && (i.add(a), h = h && i.addChildMask(a, a, 1)), "center" === l && i.addSpace(), i.addChildrenMap("background", n), i.addChildrenMap("icon", s), i.addChildrenMap("iconMask", r), i.addChildrenMap("text", o), i.addChildrenMap("action", a), i.addChildrenMap("actionMask", h), i
        }

        return m(k, [{
            key: "text", get: function () {
                var t = this.childrenMap.text;
                return void 0 === t ? "" : t.text ? t.text : t.getData("text")
            }, set: function (t) {
                var e = this.childrenMap.text;
                void 0 !== e && (e.setText ? e.setText(t) : e.setData("text", t))
            }
        }, {
            key: "setText", value: function (t) {
                return this.text = t, this
            }
        }, {
            key: "appendText", value: function (t) {
                return this.text += t, this
            }
        }, {
            key: "runLayout", value: function (t, e, i) {
                if (this.ignoreLayout) return this;
                C(x(k.prototype), "runLayout", this).call(this, t, e, i);
                var n = this.childrenMap.iconMask;
                n && (n.setPosition(), this.resetChildPositionState(n));
                var s = this.childrenMap.actionMask;
                return s && (s.setPosition(), this.resetChildPositionState(s)), this
            }
        }, {
            key: "resize", value: function (t, e) {
                C(x(k.prototype), "resize", this).call(this, t, e);
                var i = this.childrenMap.iconMask;
                i && i.resize();
                var n = this.childrenMap.actionMask;
                return n && n.resize(), this
            }
        }]), k
    }(), qu = {addChildMask: Hu};
    Object.assign(Zu.prototype, qu), u.register("label", function (t) {
        var e = new Zu(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.Label", Zu);
    var $u = Phaser.Utils.Objects.GetValue, Qu = function () {
        function i(t, e) {
            B(this, i), this.gameObject = t, this.scene = Fr(t), this.setEventEmitter($u(e, "eventEmitter", void 0)), this._enable = void 0, t.setInteractive($u(e, "inputConfig", void 0)), this.resetFromJSON(e), this.boot()
        }

        return m(i, [{
            key: "resetFromJSON", value: function (t) {
                return this.pointer = void 0, this.lastClickTime = void 0, this.setEnable($u(t, "enable", !0)), this.setMode($u(t, "mode", 1)), this.setClickInterval($u(t, "clickInterval", 100)), this.setDragThreshold($u(t, "threshold", void 0)), this
            }
        }, {
            key: "boot", value: function () {
                this.gameObject.on("pointerdown", this.onPress, this), this.gameObject.on("pointerup", this.onRelease, this), this.gameObject.on("pointerout", this.onPointOut, this), this.gameObject.on("pointermove", this.onMove, this), this.gameObject.on("destroy", this.destroy, this)
            }
        }, {
            key: "shutdown", value: function () {
                this.destroyEventEmitter(), this.pointer = null, this.gameObject = null, this.scene = null
            }
        }, {
            key: "destroy", value: function () {
                this.shutdown()
            }
        }, {
            key: "enable", get: function () {
                return this._enable
            }, set: function (t) {
                if (this._enable !== t) {
                    t || this.cancel();
                    var e = (this._enable = t) ? "enable" : "disable";
                    this.emit(e, this, this.gameObject)
                }
            }
        }, {
            key: "setEnable", value: function (t) {
                return void 0 === t && (t = !0), this.enable = t, this
            }
        }, {
            key: "toggleEnable", value: function () {
                return this.setEnable(!this.enable), this
            }
        }, {
            key: "setMode", value: function (t) {
                return "string" == typeof t && (t = rc[t]), this.mode = t, this
            }
        }, {
            key: "setClickInterval", value: function (t) {
                return this.clickInterval = t, this
            }
        }, {
            key: "setDragThreshold", value: function (t) {
                return this.dragThreshold = t, this
            }
        }, {
            key: "onPress", value: function (t, e, i, n) {
                void 0 === this.pointer && (this.pointer = t, 0 === this.mode && this.click(t.downTime, t, n))
            }
        }, {
            key: "onRelease", value: function (t, e, i, n) {
                this.pointer === t && (1 === this.mode && this.click(t.upTime, t, n), this.pointer = void 0)
            }
        }, {
            key: "onPointOut", value: function (t) {
                this.pointer === t && this.cancel()
            }
        }, {
            key: "onMove", value: function (t) {
                this.pointer === t && void 0 !== this.dragThreshold && t.getDistance() >= this.dragThreshold && this.cancel()
            }
        }, {
            key: "click", value: function (t, e, i) {
                if (!this.enable) return this;
                if (void 0 === t) return this.emit("click", this, this.gameObject, e, i), this;
                this.pointer = void 0;
                var n = this.lastClickTime;
                return void 0 !== n && t - n <= this.clickInterval || (this.lastClickTime = t, this.emit("click", this, this.gameObject, e, i)), this
            }
        }, {
            key: "cancel", value: function () {
                return this.pointer = void 0, this
            }
        }]), i
    }();
    Object.assign(Qu.prototype, Gn);

    function tc(s, t) {
        s._buttonBehavior = new Qu(s, t), s._buttonBehavior.on("click", function (t, e, i, n) {
            oc.call(this, "button.click", e, i, n)
        }, this).on("enable", function (t, e) {
            oc.call(this, "button.enable", e)
        }, this).on("disable", function (t, e) {
            oc.call(this, "button.disable", e)
        }, this), s.on("pointerover", function (t, e, i, n) {
            oc.call(this, "button.over", s, t, n)
        }, this).on("pointerout", function (t, e) {
            oc.call(this, "button.out", s, t, e)
        }, this)
    }

    function ec(t) {
        if (0 === this.buttons.length) {
            if (!this.buttonsExpand) switch (this.buttonsAlign) {
                case"right":
                case"bottom":
                case"center":
                    hc.call(this)
            }
            ac.call(this, t, this.buttonProportion, "center", 0, !0), this.buttonsExpand || "center" === this.buttonsAlign && hc.call(this)
        } else {
            var e = this.sizerChildren.length - 1;
            this.sizerChildren[e].isRexSpace ? lc.call(this, e, t, this.buttonProportion, "center", 0, !0) : ac.call(this, t, this.buttonProportion, "center", 0, !0)
        }
        return this.buttons.push(t), tc.call(this, t, this.clickConfig), this
    }

    function ic(t, e) {
        return (t = this.getButton(t)) && (1 === this.buttons.length ? this.clear(e) : (cc(this.buttons, t), dc.call(this, t, e))), this
    }

    function nc(t, e) {
        void 0 === e && (e = !1);
        var i = yc(t, "dataManager", void 0), s = yc(t, "setValueCallback", void 0),
            r = yc(t, "setValueCallbackScope", void 0);
        void 0 === i && (this.setDataEnabled(), i = this.data), this.buttons.forEach(function (n) {
            var t = n.name;
            s && i.events.on("changedata-".concat(t), function (t, e, i) {
                r ? s.call(r, n, e, i) : s(n, e, i)
            }, this), i.set(t, void 0), i.set(t, e)
        }), this._dataManager = i
    }

    function sc(t) {
        var e = kc(t, "type", void 0);
        e && mc.hasOwnProperty(e) && mc[e].call(this, t)
    }

    var rc = {press: 0, pointerdown: 0, release: 1, pointerup: 1}, oc = function (t, e, i, n) {
        var s;
        if ("number" == typeof e) {
            if (s = e, !(e = this.buttons[s])) return
        } else if (-1 === (s = this.buttons.indexOf(e))) return;
        this.eventEmitter !== this && this.emit(t, e, s, i, n), void 0 !== this.groupName ? this.eventEmitter.emit(t, e, this.groupName, s, i, n) : this.eventEmitter.emit(t, e, s, i, n)
    }, ac = cu.prototype.add, hc = cu.prototype.addSpace, lc = cu.prototype.insert, uc = {
        addButton: function (t) {
            if (Pi(t)) for (var e = t, i = 0, n = e.length; i < n; i++) ec.call(this, e[i]); else ec.call(this, t);
            return this
        }, addButtons: function (t) {
            for (var e = 0, i = t.length; e < i; e++) ec.call(this, t[e]);
            return this
        }
    }, cc = Phaser.Utils.Array.Remove, dc = cu.prototype.remove, fc = cu.prototype.clear, pc = {
        remove: function (t, e) {
            if (Pi(t)) for (var i = t, n = 0, s = i.length; n < s; n++) ic.call(this, i[n], e); else ic.call(this, t, e);
            return this
        }, clear: function (t) {
            return this.buttons.length = 0, fc.call(this, t), this
        }, removeButton: function (t, e) {
            return this.remove(t, e), this
        }, clearButtons: function (t) {
            return this.clear(t), this
        }
    }, vc = function (t, e) {
        return t ? t.hasOwnProperty("name") ? t.name === e ? t : null : GetElementByName(t, e) : null
    }, gc = {
        getButton: function (t) {
            var e;
            switch (p(t)) {
                case"number":
                    e = this.buttons[t];
                    break;
                case"string":
                    e = function (t, e) {
                        if (!t) return null;
                        if (Pi(t)) {
                            for (var i, n = 0, s = t.length; n < s; n++) if (i = vc(t[n], e)) return i
                        } else for (var r in t) if (i = vc(t[r], e)) return i
                    }(this.buttons, t);
                    break;
                default:
                    e = t, -1 === this.buttons.indexOf(e) && (e = void 0)
            }
            return e
        }, setButtonEnable: function (t, e) {
            if (void 0 === t || "boolean" == typeof t) {
                e = t;
                for (var i = 0, n = this.buttons.length; i < n; i++) this.buttons[i]._buttonBehavior.setEnable(e)
            } else this.getButton(t)._buttonBehavior.setEnable(e);
            return this
        }, toggleButtonEnable: function (t) {
            if (void 0 === t || "boolean" == typeof t) for (var e = 0, i = this.buttons.length; e < i; e++) this.buttons[e]._buttonBehavior.toggleEnable(); else this.getButton(t)._buttonBehavior.toggleEnable();
            return this
        }, getButtonEnable: function (t) {
            return void 0 === t && (t = 0), this.getButton(t)._buttonBehavior.enable
        }, emitButtonClick: function (t) {
            return oc.call(this, "button.click", t), this
        }, showButton: function (t) {
            return Na(this.getButton(t)), this
        }, hideButton: function (t) {
            return Ja(this.getButton(t)), this
        }, isButtonShown: function (t) {
            return Ka(this.getButton(t)), this
        }, forEachButtton: function (t, e) {
            for (var i = 0, n = this.buttons.length; i < n; i++) e ? t.call(e, this.buttons[i], i, this.buttons) : t(this.buttons[i], i, this.buttons);
            return this
        }
    }, yc = Phaser.Utils.Objects.GetValue, kc = Phaser.Utils.Objects.GetValue, mc = {
        radio: function (t) {
            nc.call(this, t), this._value = void 0, Object.defineProperty(this, "value", {
                get: function () {
                    return this._value
                }.bind(this), set: function (n) {
                    if (n !== this._value) {
                        this._value = n;
                        var s = this._dataManager;
                        this.buttons.forEach(function (t) {
                            var e = t.name, i = s.get(e);
                            e === n ? i || s.set(e, !0) : i && s.set(e, !1)
                        })
                    }
                }.bind(this), enumerable: !0, configurable: !0
            }), this.on("button.click", function (t) {
                this.value = t.name
            }, this)
        }, checkboxes: function (t) {
            nc.call(this, t), this.on("button.click", function (t) {
                var e = this._dataManager, i = t.name, n = e.get(i);
                e.set(i, !n)
            }, this)
        }
    }, bc = Phaser.Utils.Objects.GetValue, xc = function () {
        b(a, cu);
        var o = w(a);

        function a(t, e) {
            var i;
            B(this, a), void 0 === e && (e = {});
            var n = e.space;
            "number" == typeof n && (e.space = {item: n}), (i = o.call(this, t, e)).type = "rexButtons", i.eventEmitter = bc(e, "eventEmitter", z(i)), i.groupName = bc(e, "groupName", void 0), i.buttons = [];
            var s = bc(e, "background", void 0), r = bc(e, "buttons", void 0);
            return i.buttonsExpand = bc(e, "expand", !1), i.buttonsAlign = bc(e, "align", void 0), i.buttonProportion = i.buttonsExpand ? 1 : 0, i.clickConfig = bc(e, "click", void 0), s && i.addBackground(s), r && i.addButtons(r), sc.call(z(i), e), i.addChildrenMap("background", s), i.addChildrenMap("buttons", i.buttons), i
        }

        return a
    }();
    Object.assign(xc.prototype, uc, pc, gc), u.register("buttons", function (t) {
        var e = new xc(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.Buttons", xc);

    function Cc(t, e) {
        return (t = this.getButton(t)) && (Pc(this.buttons, t), Tc.call(this, t, e)), this
    }

    var wc = Ou.prototype.add, Sc = {
        addButton: function (t, e, i) {
            return wc.call(this, t, e, i, void 0, 0, this.buttonsExpand), this.buttons.push(t), tc.call(this, t, this.clickConfig), this
        }, addButtons: function (t, e) {
            for (var i = 0, n = t; i < n; i++) this.addButton(t[i], void 0, e);
            return this
        }
    }, Pc = Phaser.Utils.Array.Remove, Tc = Ou.prototype.remove, Oc = Ou.prototype.clear, Mc = {
        remove: function (t, e) {
            if (Pi(t)) for (var i = t, n = 0, s = i.length; n < s; n++) Cc.call(this, i[n], e); else Cc.call(this, t, e);
            return this
        }, clear: function (t) {
            return this.buttons.length = 0, Oc.call(this, t), this
        }, removeButton: function (t, e) {
            return this.remove(t, e), this
        }, clearButtons: function (t) {
            return this.clear(t), this
        }
    }, _c = Phaser.Utils.Objects.GetValue, Ec = function () {
        b(k, Ou);
        var y = w(k);

        function k(t, e) {
            var i;
            B(this, k), void 0 === e && (e = {});
            var n = _c(e, "row", 0), s = _c(e, "col", 0), r = _c(e, "buttons", void 0), o = _c(e, "expand", !0),
                a = o ? 1 : 0;
            if (void 0 !== r) {
                n = Math.max(n, r.length);
                for (var h = 0, l = r.length; h < l; h++) s = Math.max(s, r[h].length)
            }
            e.row = n, e.column = s, e.columnProportions = a, e.rowProportions = a, (i = y.call(this, t, e)).type = "rexGridButtons", i.eventEmitter = _c(e, "eventEmitter", z(i)), i.groupName = _c(e, "groupName", void 0), i.buttons = [];
            var u = _c(e, "background", void 0);
            if (i.buttonsExpand = o, _c(e, "space", void 0), i.clickConfig = _c(e, "click", void 0), u && i.addBackground(u), r) for (var c, d, f = 0, p = r.length; f < p; f++) for (var v = 0, g = (c = r[f]).length; v < g; v++) (d = c[v]) && i.addButton(d, v, f);
            return sc.call(z(i), e), i.addChildrenMap("background", u), i.addChildrenMap("buttons", i.buttons), i
        }

        return k
    }();
    Object.assign(Ec.prototype, Sc, Mc, gc), u.register("gridButtons", function (t) {
        var e = new Ec(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.GridButtons", Ec);

    function Bc(t) {
        return jc.call(this, t), this.buttons.push(t), tc.call(this, t, this.clickConfig), this
    }

    function zc(t, e) {
        return (t = this.getButton(t)) && (1 === this.buttons.length ? this.clear(e) : (Dc(this.buttons, t), Lc.call(this, t, e))), this
    }

    var jc = Xu.prototype.add, Rc = {
        addButton: function (t) {
            if (Pi(t)) for (var e = t, i = 0, n = e.length; i < n; i++) Bc.call(this, e[i]); else Bc.call(this, t);
            return this
        }, addButtons: function (t) {
            if (Pi(t[0])) for (var e, i = t, n = 0, s = i.length - 1; n <= s; n++) {
                for (var r = 0, o = (e = i[n]).length; r < o; r++) Bc.call(this, e[r]);
                s < n && jc.addNewLine(this)
            } else for (r = 0, o = t.length; r < o; r++) Bc.call(this, t[r]);
            return this
        }
    }, Dc = Phaser.Utils.Array.Remove, Lc = Xu.prototype.remove, Ic = Xu.prototype.clear, Yc = {
        remove: function (t, e) {
            if (Pi(t)) for (var i = t, n = 0, s = i.length; n < s; n++) zc.call(this, i[n], e); else zc.call(this, t, e);
            return this
        }, clear: function (t) {
            return this.buttons.length = 0, Ic.call(this, t), this
        }, removeButton: function (t, e) {
            return this.remove(t, e), this
        }, clearButtons: function (t) {
            return this.clear(t), this
        }
    }, Ac = Phaser.Utils.Objects.GetValue, Fc = function () {
        b(a, Xu);
        var o = w(a);

        function a(t, e) {
            var i;
            B(this, a), void 0 === e && (e = {});
            var n = e.space;
            "number" == typeof n && (e.space = {
                item: n,
                line: n
            }), (i = o.call(this, t, e)).type = "rexFixWidthButtons", i.eventEmitter = Ac(e, "eventEmitter", z(i)), i.groupName = Ac(e, "groupName", void 0), i.buttons = [];
            var s = Ac(e, "background", void 0), r = Ac(e, "buttons", void 0);
            return i.buttonsAlign = Ac(e, "align", void 0), i.clickConfig = Ac(e, "click", void 0), s && i.addBackground(s), r && i.addButtons(r), sc.call(z(i), e), i.addChildrenMap("background", s), i.addChildrenMap("buttons", i.buttons), i
        }

        return a
    }();
    Object.assign(Fc.prototype, Rc, Yc, gc), u.register("fixWidthButtons", function (t) {
        var e = new Fc(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.FixWidthButtons", Fc);
    var Wc = Phaser.Utils.Objects.GetValue, Vc = function () {
        b(E, cu);
        var _ = w(E);

        function E(t, e) {
            var i;
            B(this, E), void 0 === e && (e = {}), e.orientation = 1, (i = _.call(this, t, e)).type = "rexDialog", i.eventEmitter = Wc(e, "eventEmitter", z(i));
            var n, s, r, o, a = Wc(e, "background", void 0), h = Wc(e, "title", void 0), l = Wc(e, "toolbar", void 0),
                u = Wc(e, "toolbarBackground", void 0), c = Wc(e, "leftToolbar", void 0),
                d = Wc(e, "leftToolbarBackground", void 0), f = Wc(e, "content", void 0),
                p = Wc(e, "description", void 0), v = Wc(e, "choices", void 0), g = Wc(e, "choicesBackground", void 0),
                y = Wc(e, "actions", void 0), k = Wc(e, "actionsBackground", void 0), m = Wc(e, "click", void 0);
            if (a && i.addBackground(a), l && (r = new xc(t, {
                groupName: "toolbar",
                background: u,
                buttons: l,
                orientation: 0,
                space: {item: Wc(e, "space.toolbarItem", 0)},
                click: m,
                eventEmitter: i.eventEmitter
            })), c && (o = new xc(t, {
                groupName: "leftToolbar",
                background: d,
                buttons: c,
                orientation: 0,
                space: {item: Wc(e, "space.leftToolbarItem", 0)},
                click: m,
                eventEmitter: i.eventEmitter
            })), h && !l && !c) {
                var b = Wc(e, "align.title", "center"), x = Wc(e, "space.title", 0);
                (f || p || v || y) && (S = {bottom: x});
                var C = Wc(e, "expand.title", !0);
                i.add(h, 0, b, S, C)
            }
            if (l && !h && !c) {
                x = Wc(e, "space.title", 0);
                (f || p || v || y) && (S = {bottom: x});
                C = Wc(e, "expand.toolbar", !0);
                i.add(r, 0, "right", S, C)
            }
            if (c && !h && !l) {
                x = Wc(e, "space.title", 0);
                (f || p || v || y) && (S = {bottom: x});
                C = Wc(e, "expand.leftToolbar", !0);
                i.add(o, 0, "left", S, C)
            }
            if (h && (l || c)) {
                var w = new cu(t, {orientation: 0});
                o && w.add(o, 0, "right", 0, !1);
                b = Wc(e, "align.title", "left");
                (C = Wc(e, "expand.title", !0)) || "right" !== b && "center" !== b || w.addSpace();
                var S = {left: Wc(e, "space.titleLeft", 0), right: Wc(e, "space.titleRight", 0)}, P = C ? 1 : 0;
                w.add(h, P, "center", S, C), C || "left" !== b && "center" !== b || w.addSpace(), r && w.add(r, 0, "right", 0, !1);
                x = Wc(e, "space.title", 0);
                (f || p || v || y) && (S = {bottom: x}), i.add(w, 0, "center", S, !0)
            }
            if (f) {
                b = Wc(e, "align.content", "center");
                var T = Wc(e, "space.content", 0);
                S = {
                    left: Wc(e, "space.contentLeft", 0),
                    right: Wc(e, "space.contentRight", 0),
                    bottom: p || v || y ? T : 0
                }, C = Wc(e, "expand.content", !0);
                i.add(f, 0, b, S, C)
            }
            if (p) {
                b = Wc(e, "align.description", "center");
                var O = Wc(e, "space.description", 0);
                S = {
                    left: Wc(e, "space.descriptionLeft", 0),
                    right: Wc(e, "space.descriptionRight", 0),
                    bottom: v || y ? O : 0
                }, C = Wc(e, "expand.description", !0);
                i.add(p, 0, b, S, C)
            }
            if (v) {
                b = Wc(e, "align.choices", "center");
                n = new xc(t, {
                    groupName: "choices",
                    background: g,
                    buttons: v,
                    orientation: 1,
                    space: {item: Wc(e, "space.choice", 0)},
                    click: m,
                    eventEmitter: i.eventEmitter,
                    type: Wc(e, "choicesType", void 0),
                    setValueCallback: Wc(e, "choicesSetValueCallback", void 0),
                    setValueCallbackScope: Wc(e, "choicesSetValueCallbackScope", void 0)
                });
                var M = Wc(e, "space.choices", 0);
                S = {
                    left: Wc(e, "space.choicesLeft", 0),
                    right: Wc(e, "space.choicesRight", 0),
                    bottom: y ? M : 0
                }, C = Wc(e, "expand.choices", !0);
                i.add(n, 0, b, S, C)
            }
            if (y) {
                s = new xc(t, {
                    groupName: "actions",
                    background: k,
                    buttons: y,
                    orientation: 0,
                    space: {item: Wc(e, "space.action", 0)},
                    expand: Wc(e, "expand.actions", !1),
                    align: Wc(e, "align.actions", "center"),
                    click: m,
                    eventEmitter: i.eventEmitter
                });
                S = {left: Wc(e, "space.actionsLeft", 0), right: Wc(e, "space.actionsRight", 0)};
                i.add(s, 0, "center", S, !0)
            }
            return i.addChildrenMap("background", a), i.addChildrenMap("title", h), i.addChildrenMap("toolbar", l), i.addChildrenMap("leftToolbar", c), i.addChildrenMap("content", f), i.addChildrenMap("description", p), i.addChildrenMap("choices", v), i.addChildrenMap("actions", y), i.addChildrenMap("choicesSizer", n), i.addChildrenMap("actionsSizer", s), i.addChildrenMap("toolbarSizer", r), i.addChildrenMap("leftToolbarSizer", o), i
        }

        return E
    }();
    Object.assign(Vc.prototype, {
        getChoice: function (t) {
            return this.childrenMap.choicesSizer.getButton(t)
        }, getAction: function (t) {
            return this.childrenMap.actionsSizer.getButton(t)
        }, getToolbar: function (t) {
            return this.childrenMap.toolbarSizer.getButton(t)
        }, getLeftToolbar: function (t) {
            return this.childrenMap.leftToolbarSizer.getButton(t)
        }, setChoiceEnable: function (t, e) {
            return this.childrenMap.choicesSizer.setButtonEnable(t, e), this
        }, setActionEnable: function (t, e) {
            return this.childrenMap.actionsSizer.setButtonEnable(t, e), this
        }, setToolbarEnable: function (t, e) {
            return this.childrenMap.toolbarSizer.setButtonEnable(t, e), this
        }, setLeftToolbarEnable: function (t, e) {
            return this.childrenMap.leftToolbarSizer.setButtonEnable(t, e), this
        }, toggleChoiceEnable: function (t) {
            return this.childrenMap.choicesSizer.toggleButtonEnable(t), this
        }, toggleActionEnable: function (t) {
            return this.childrenMap.actionsSizer.toggleButtonEnable(t), this
        }, toggleToolbarEnable: function (t) {
            return this.childrenMap.toolbarSizer.toggleButtonEnable(t), this
        }, toggleLeftToolbarEnable: function (t) {
            return this.childrenMap.leftToolbarSizer.toggleButtonEnable(t), this
        }, getChoiceEnable: function (t) {
            return this.childrenMap.choicesSizer.getButtonEnable(t)
        }, getActionEnable: function (t) {
            return this.childrenMap.actionsSizer.getButtonEnable(t)
        }, getToolbarEnable: function (t) {
            return this.childrenMap.toolbarSizer.getButtonEnable(t)
        }, getLeftToolbarEnable: function (t) {
            return this.childrenMap.leftToolbarSizer.getButtonEnable(t)
        }, emitChoiceClick: function (t) {
            return this.childrenMap.choicesSizer.emitButtonClick(t), this
        }, emitActionClick: function (t) {
            return this.childrenMap.actionsSizer.emitButtonClick(t), this
        }, emitToolbarClick: function (t) {
            return this.childrenMap.toolbarSizer.emitButtonClick(t), this
        }, emitLeftToolbarClick: function (t) {
            return this.childrenMap.leftToolbarSizer.emitButtonClick(t), this
        }, showChoice: function (t) {
            return this.childrenMap.choicesSizer.showButton(t), this
        }, showAction: function (t) {
            return this.childrenMap.actionsSizer.showButton(t), this
        }, showToolbar: function (t) {
            return this.childrenMap.toolbarSizer.showButton(t), this
        }, showLeftToolbar: function (t) {
            return this.childrenMap.leftToolbarSizer.showButton(t), this
        }, hideChoice: function (t) {
            return this.childrenMap.choicesSizer.hideButton(t), this
        }, hideAction: function (t) {
            return this.childrenMap.actionsSizer.hideButton(t), this
        }, hideToolbar: function (t) {
            return this.childrenMap.toolbarSizer.hideButton(t), this
        }, hideLeftToolbar: function (t) {
            return this.childrenMap.leftToolbarSizer.hideButton(t), this
        }, addChoice: function (t) {
            return this.childrenMap.choicesSizer.addButton(t), this
        }, addAction: function (t) {
            return this.childrenMap.actionsSizer.addButton(t), this
        }, addToolbar: function (t) {
            return this.childrenMap.toolbarSizer.addButton(t), this
        }, addLeftToolbar: function (t) {
            return this.childrenMap.leftToolbarSizer.addButton(t), this
        }, removeChoice: function (t, e) {
            return this.childrenMap.choicesSizer.removeButton(t, e), this
        }, removeAction: function (t, e) {
            return this.childrenMap.actionsSizer.removeButton(t, e), this
        }, removeToolbar: function (t, e) {
            return this.childrenMap.toolbarSizer.removeButton(t, e), this
        }, removeLeftToolbar: function (t, e) {
            return this.childrenMap.leftToolbarSizer.removeButton(t, e), this
        }, clearChoices: function (t) {
            return this.childrenMap.choicesSizer.clearButtons(t), this
        }, clearActions: function (t) {
            return this.childrenMap.actionsSizer.clearButtons(t), this
        }, clearToolbar: function (t) {
            return this.childrenMap.toolbarSizer.clearButtons(t), this
        }, clearLeftToolbar: function (t) {
            return this.childrenMap.leftToolbarSizer.clearButtons(t), this
        }, forEachChoice: function (t, e) {
            return this.childrenMap.choicesSizer.forEachButtton(t, e), this
        }, forEachAction: function (t, e) {
            return this.childrenMap.actionsSizer.forEachButtton(t, e), this
        }, forEachToolbar: function (t, e) {
            return this.childrenMap.toolbarSizer.forEachButtton(t, e), this
        }, forEachLeftToolbar: function (t, e) {
            return this.childrenMap.leftToolbarSizer.forEachButtton(t, e), this
        }
    }), u.register("dialog", function (t) {
        var e = new Vc(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.Dialog", Vc);
    var Xc = {
        getButtonsSizer: function (t) {
            return this.childrenMap["".concat(t, "ButtonsSizer")]
        }, getButton: function (t, e) {
            var i = this.getButtonsSizer(t);
            return i ? i.getButton(e) : void 0
        }, setButtonEnable: function (t, e, i) {
            return this.getButtonsSizer(t).setButtonEnable(e, i), this
        }, setLeftButtonEnable: function (t, e) {
            return this.childrenMap.leftButtonsSizer.setButtonEnable(t, e), this
        }, setRightButtonEnable: function (t, e) {
            return this.childrenMap.rightButtonsSizer.setButtonEnable(t, e), this
        }, setTopButtonEnable: function (t, e) {
            return this.childrenMap.topButtonsSizer.setButtonEnable(t, e), this
        }, setBottomButtonEnable: function (t, e) {
            return this.childrenMap.bottomButtonsSizer.setButtonEnable(t, e), this
        }, toggleButtonEnable: function (t, e) {
            return this.getButtonsSizer(t).toggleButtonEnable(e), this
        }, toggleLeftButtonEnable: function (t) {
            return this.childrenMap.leftButtonsSizer.toggleButtonEnable(t), this
        }, toggleRightButtonEnable: function (t) {
            return this.childrenMap.rightButtonsSizer.toggleButtonEnable(t), this
        }, toggleTopButtonEnable: function (t) {
            return this.childrenMap.topButtonsSizer.toggleButtonEnable(t), this
        }, toggleBottomButtonEnable: function (t) {
            return this.childrenMap.bottomButtonsSizer.toggleButtonEnable(t), this
        }, getButtonEnable: function (t, e) {
            return this.getButtonsSizer(t).getButtonEnable(e)
        }, getLeftButtonEnable: function (t) {
            return this.childrenMap.leftButtonsSizer.getButtonEnable(t)
        }, getRightButtonEnable: function (t) {
            return this.childrenMap.rightButtonsSizer.getButtonEnable(t)
        }, getTopButtonEnable: function (t) {
            return this.childrenMap.topButtonsSizer.getButtonEnable(t)
        }, getBottomButtonEnable: function (t) {
            return this.childrenMap.bottomButtonsSizer.getButtonEnable(t)
        }, emitButtonClick: function (t, e) {
            var i = this.getButtonsSizer(t);
            return i && i.emitButtonClick(e), this
        }, emitLeftButtonClick: function (t) {
            return this.childrenMap.leftButtonsSizer.emitButtonClick(t), this
        }, emitRightButtonClick: function (t) {
            return this.childrenMap.rightButtonsSizer.emitButtonClick(t), this
        }, emitTopButtonClick: function (t) {
            return this.childrenMap.topButtonsSizer.emitButtonClick(t), this
        }, emitBottomButtonClick: function (t) {
            return this.childrenMap.bottomButtonsSizer.emitButtonClick(t), this
        }, getLeftButton: function (t) {
            return this.childrenMap.leftButtonsSizer.getButton(t)
        }, getRightButton: function (t) {
            return this.childrenMap.rightButtonsSizer.getButton(t)
        }, getTopButton: function (t) {
            return this.childrenMap.topButtonsSizer.getButton(t)
        }, getBottomButton: function (t) {
            return this.childrenMap.bottomButtonsSizer.getButton(t)
        }, showButton: function (t, e) {
            return Na(this.getButton(t, e)), this
        }, showLeftButton: function (t) {
            return Na(this.getLeftButton(t)), this
        }, showRightButton: function (t) {
            return Na(this.getRightButton(t)), this
        }, showTopButton: function (t) {
            return Na(this.getTopButton(t)), this
        }, showBottomButton: function (t) {
            return Na(this.getBottomButton(t)), this
        }, hideButton: function (t, e) {
            return Ja(this.getButton(t, e)), this
        }, hideLeftButton: function (t) {
            return Ja(this.getLeftButton(t)), this
        }, hideRightButton: function (t) {
            return Ja(this.getRightButton(t)), this
        }, hideTopButton: function (t) {
            return Ja(this.getTopButton(t)), this
        }, hideBottomButton: function (t) {
            return Ja(this.getBottomButton(t)), this
        }, addButton: function (t, e) {
            return this.getButtonsSizer(t).addButton(e), this
        }, addLeftButton: function (t) {
            return this.addButton("left", t), this
        }, addRightButton: function (t) {
            return this.addButton("right", t), this
        }, addTopButton: function (t) {
            return this.addButton("top", t), this
        }, removeButton: function (t, e, i) {
            return this.getButtonsSizer(t).removeButton(e, i), this
        }, removeLeftButton: function (t, e) {
            return this.removeButton("left", t, e), this
        }, removeRightButton: function (t, e) {
            return this.removeButton("right", t, e), this
        }, removeTopButton: function (t, e) {
            return this.removeButton("top", t, e), this
        }, removeBottomButton: function (t, e) {
            return this.removeButton("bottom", t, e), this
        }, clearButtons: function (t, e) {
            return this.getButtonsSizer(t).clearButtons(e), this
        }, clearLeftButtons: function (t) {
            return this.clearButtons("left", t), this
        }, clearRightButtons: function (t) {
            return this.clearButtons("right", t), this
        }, clearTopButtons: function (t) {
            return this.clearButtons("top", t), this
        }, clearBottomButtonss: function (t) {
            return this.clearButtons("bottom", t), this
        }, forEachLeftButton: function (t, e) {
            return this.childrenMap.leftButtonsSizer.forEachButtton(t, e), this
        }, forEachRightButton: function (t, e) {
            return this.childrenMap.rightButtonsSizer.forEachButtton(t, e), this
        }, forEachTopButton: function (t, e) {
            return this.childrenMap.topButtonsSizer.forEachButtton(t, e), this
        }, forEachBottomButton: function (t, e) {
            return this.childrenMap.bottomButtonsSizer.forEachButtton(t, e), this
        }
    }, Gc = Phaser.Utils.Objects.GetValue, Hc = function () {
        b(M, Ou);
        var O = w(M);

        function M(t, e) {
            var i;
            B(this, M), void 0 === e && (e = {}), e.column = 3, e.row = 3, (i = O.call(this, t, e)).type = "rexTabs", i.eventEmitter = Gc(e, "eventEmitter", z(i));
            var n, s, r, o, a = Gc(e, "background", void 0), h = Gc(e, "panel", void 0),
                l = Gc(e, "leftButtons", void 0), u = Gc(e, "leftButtonsBackground", void 0),
                c = Gc(e, "rightButtons", void 0), d = Gc(e, "rightButtonsBackground", void 0),
                f = Gc(e, "topButtons", void 0), p = Gc(e, "topButtonsBackground", void 0),
                v = Gc(e, "bottomButtons", void 0), g = Gc(e, "bottomButtonsBackground", void 0),
                y = Gc(e, "click", void 0);
            if (a && i.addBackground(a), h && i.add(h, 1, 1, "center", 0, !0), l) {
                var k = Gc(e, "space.leftButtonsOffset", 0), m = Gc(e, "space.leftButton", 0);
                n = new xc(t, {
                    groupName: "left",
                    background: u,
                    buttons: l,
                    orientation: 1,
                    space: {item: m},
                    align: Gc(e, "align.leftButtons", void 0),
                    click: y,
                    eventEmitter: i.eventEmitter
                });
                var b = {top: k};
                i.add(n, 0, 1, "top", b, !1)
            }
            if (c) {
                var x = Gc(e, "space.rightButtonsOffset", 0), C = Gc(e, "space.rightButton", 0);
                s = new xc(t, {
                    groupName: "right",
                    background: d,
                    buttons: c,
                    orientation: 1,
                    space: {item: C},
                    align: Gc(e, "align.rightButtons", void 0),
                    click: y,
                    eventEmitter: i.eventEmitter
                });
                b = {top: x};
                i.add(s, 2, 1, "top", b, !1)
            }
            if (f) {
                var w = Gc(e, "space.topButtonsOffset", 0), S = Gc(e, "space.topButton", 0);
                r = new xc(t, {
                    groupName: "top",
                    background: p,
                    buttons: f,
                    orientation: 0,
                    space: {item: S},
                    align: Gc(e, "align.topButtons", void 0),
                    click: y,
                    eventEmitter: i.eventEmitter
                });
                b = {left: w};
                i.add(r, 1, 0, "left", b, !1)
            }
            if (v) {
                var P = Gc(e, "space.bottomButtonsOffset", 0), T = Gc(e, "space.bottomButton", 0);
                o = new xc(t, {
                    groupName: "bottom",
                    background: g,
                    buttons: v,
                    orientation: 0,
                    space: {item: T},
                    align: Gc(e, "align.bottomButtons", void 0),
                    click: y,
                    eventEmitter: i.eventEmitter
                });
                b = {left: P};
                i.add(o, 1, 2, "left", b, !1)
            }
            return i.addChildrenMap("background", a), i.addChildrenMap("panel", h), i.addChildrenMap("leftButtons", l), i.addChildrenMap("rightButtons", c), i.addChildrenMap("topButtons", f), i.addChildrenMap("bottomButtons", v), i.addChildrenMap("leftButtonsSizer", n), i.addChildrenMap("rightButtonsSizer", s), i.addChildrenMap("topButtonsSizer", r), i.addChildrenMap("bottomButtonsSizer", o), i
        }

        return M
    }();
    Object.assign(Hc.prototype, Xc), u.register("tabs", function (t) {
        var e = new Hc(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.Tabs", Hc);

    function Uc(t, e, i) {
        var n, s, r;
        return t.y === e.y ? (n = Math.min(t.x, e.x), s = Math.max(t.x, e.x), r = Zc(i.x, n, s)) : t.x === e.x && (n = Math.min(t.y, e.y), s = Math.max(t.y, e.y), r = Zc(i.y, n, s)), r
    }

    function Nc(t, e, i) {
        this.enable && (qc.x = e, qc.y = i, this.value = Uc(this.getStartPoint(), this.getEndPoint(), qc))
    }

    function Jc(t) {
        if (this.enable && t.isDown) {
            $c.x = t.worldX, $c.y = t.worldY;
            var e = Uc(this.getStartPoint(), this.getEndPoint(), $c);
            this.stopEaseValue(), 0 === this.easeValueDuration || Math.abs(this.value - e) < .1 ? this.value = e : this.easeValueTo(e)
        }
    }

    function Kc(t, e) {
        void 0 === e && (e = Qc);
        var i = this.childrenMap.thumb, n = i.x, s = i.y;
        return va.setPosition(this.innerLeft, this.innerTop).setSize(this.innerWidth, this.innerHeight), Aa(i, va, t), e.x = i.x, e.y = i.y, i.x = n, i.y = s, e
    }

    var Zc = Phaser.Math.Percent, qc = {}, $c = {}, Qc = {}, td = Phaser.Display.Align.LEFT_CENTER,
        ed = Phaser.Display.Align.TOP_CENTER, id = {}, nd = Phaser.Display.Align.RIGHT_CENTER,
        sd = Phaser.Display.Align.BOTTOM_CENTER, rd = {}, od = Phaser.Math.Linear, ad = {},
        hd = Phaser.Display.Align.LEFT_CENTER, ld = Phaser.Display.Align.TOP_CENTER, ud = Phaser.Utils.Objects.GetValue,
        cd = Phaser.Math.Clamp, dd = Phaser.Math.Linear, fd = Phaser.Math.Percent, pd = Phaser.Math.Snap.To,
        vd = function () {
            b(c, cu);
            var u = w(c);

            function c(t, e) {
                var i;
                B(this, c), (i = u.call(this, t, e)).type = "rexSlider", i.eventEmitter = ud(e, "eventEmitter", z(i));
                var n = ud(e, "background", void 0), s = ud(e, "track", void 0), r = ud(e, "indicator", void 0),
                    o = ud(e, "thumb", void 0);
                n && i.addBackground(n), s && i.add(s, {
                    proportion: 1,
                    expand: !0,
                    minWidth: 0,
                    minHeight: 0
                }), r && i.pin(r), o && i.pin(o);
                var a = ud(e, "input", 0);
                switch ("string" == typeof a && (a = gd[a]), a) {
                    case 0:
                        o && (o.setInteractive(), i.scene.input.setDraggable(o), o.on("drag", Nc, z(i)));
                        break;
                    case 1:
                        i.setInteractive().on("pointerdown", Jc, z(i)).on("pointermove", Jc, z(i))
                }
                i.addChildrenMap("background", n), i.addChildrenMap("track", s), i.addChildrenMap("indicator", r), i.addChildrenMap("thumb", o);
                var h = ud(e, "valuechangeCallback", null);
                if (null !== h) {
                    var l = ud(e, "valuechangeCallbackScope", void 0);
                    i.eventEmitter.on("valuechange", h, l)
                }
                return i.setEnable(ud(e, "enable", void 0)), i.setGap(ud(e, "gap", void 0)), i.setValue(ud(e, "value", 0), ud(e, "min", void 0), ud(e, "max", void 0)), i.setEaseValueDuration(ud(e, "easeValue.duration", 0)), i.setEaseValueFunction(ud(e, "easeValue.ease", "Linear")), i
            }

            return m(c, [{
                key: "setEnable", value: function (t) {
                    return void 0 === t && (t = !0), this.enable = t, this
                }
            }, {
                key: "setGap", value: function (t) {
                    return this.gap = t, this
                }
            }, {
                key: "value", get: function () {
                    return this._value
                }, set: function (t) {
                    void 0 !== this.gap && (t = pd(t, this.gap));
                    var e = this._value;
                    this._value = cd(t, 0, 1), e !== this._value && (this.updateThumb(this._value), this.updateIndicator(this._value), this.eventEmitter.emit("valuechange", this._value, e, this.eventEmitter))
                }
            }, {
                key: "setValue", value: function (t, e, i) {
                    return null == t || (void 0 !== e && (t = fd(t, e, i)), this.value = t), this
                }
            }, {
                key: "addValue", value: function (t, e, i) {
                    return void 0 !== e && (t = fd(t, e, i)), this.value += t, this
                }
            }, {
                key: "getValue", value: function (t, e) {
                    var i = this.value;
                    return void 0 !== t && (i = dd(t, e, i)), i
                }
            }, {
                key: "runLayout", value: function (t, e, i) {
                    return this.ignoreLayout || (C(x(c.prototype), "runLayout", this).call(this, t, e, i), this.updateThumb(), this.updateIndicator()), this
                }
            }]), c
        }(), gd = {drag: 0, click: 1, none: -1}, yd = {
            getStartPoint: function (t) {
                if (void 0 === t && (t = id), this.childrenMap.thumb) {
                    var e = 0 === this.orientation ? td : ed;
                    Kc.call(this, e, t)
                } else 0 === this.orientation ? (t.x = this.innerLeft + 1, t.y = this.centerY) : (t.x = this.centerX, t.y = this.innerTop + 1);
                return t
            }, getEndPoint: function (t) {
                if (void 0 === t && (t = rd), this.childrenMap.thumb) {
                    var e = 0 === this.orientation ? nd : sd;
                    Kc.call(this, e, t)
                } else 0 === this.orientation ? (t.x = this.innerRight - 1, t.y = this.centerY) : (t.x = this.centerX, t.y = this.innerBottom - 1);
                return t
            }, updateThumb: function (t) {
                var e, i, n, s, r = this.childrenMap.thumb;
                return void 0 === r || (void 0 === t && (t = this.value), e = t, i = this.getStartPoint(), n = this.getEndPoint(), void 0 === (s = r) && (s = ad), s.x = od(i.x, n.x, e), s.y = od(i.y, n.y, e), this.resetChildPositionState(r)), this
            }, updateIndicator: function (t) {
                var e, i, n = this.childrenMap.indicator;
                if (void 0 === n) return this;
                void 0 === t && (t = this.value);
                var s = this.childrenMap.thumb;
                if (s) if (0 === this.orientation) {
                    var r = ga(s);
                    e = s.x - r * s.originX + r - this.left
                } else {
                    var o = ya(s);
                    i = s.y - o * s.originY + o - this.top
                } else 0 === this.orientation ? e = this.width * t : i = this.height * t;
                eh(n, e, i);
                var a = 0 === this.orientation ? hd : ld;
                Aa(n, this, a), this.resetChildPositionState(n)
            }
        };
    Object.assign(vd.prototype, yd, xl), u.register("slider", function (t) {
        var e = new vd(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.Slider", vd);

    function kd(t) {
        var e = bd(t, "scrollMode", 0);
        return "string" == typeof e && (e = md[e]), e
    }

    var md = {v: 0, vertical: 0, h: 1, horizontal: 1}, bd = Phaser.Utils.Objects.GetValue, xd = function () {
        function o(t) {
            B(this, o);
            var e = qi(t, "states", void 0);
            e && this.addStates(e);
            var i = qi(t, "extend", void 0);
            if (i) for (var n in i) this.hasOwnProperty(n) && void 0 !== this[n] || (this[n] = i[n]);
            var s = qi(t, "eventEmitter", void 0), r = qi(t, "EventEmitterClass", void 0);
            this.setEventEmitter(s, r), this._stateLock = !1, this.resetFromJSON(t)
        }

        return m(o, [{
            key: "shutdown", value: function () {
                this.destroyEventEmitter()
            }
        }, {
            key: "destroy", value: function () {
                this.shutdown()
            }
        }, {
            key: "resetFromJSON", value: function (t) {
                this.setEnable(qi(t, "enable", !0)), this.start(qi(t, "start", void 0));
                var e = qi(t, "init", void 0);
                return e && e.call(this), this
            }
        }, {
            key: "toJSON", value: function () {
                return {curState: this.state, prevState: this.prevState, enable: this.enable, start: this._start}
            }
        }, {
            key: "setEnable", value: function (t) {
                return void 0 === t && (t = !0), this.enable = t, this
            }
        }, {
            key: "state", get: function () {
                return this._state
            }, set: function (t) {
                if (this.enable && !this._stateLock && this._state !== t) {
                    if (this._prevState = this._state, this._state = t, this._stateLock = !0, this.emit("statechange", this), null != this._prevState) {
                        var e = "exit_" + this._prevState, i = this[e];
                        i && i.call(this), this.emit(e, this)
                    }
                    if (this._stateLock = !1, null != this._state) {
                        var n = "enter_" + this._state, s = this[n];
                        s && s.call(this), this.emit(n, this)
                    }
                }
            }
        }, {
            key: "prevState", get: function () {
                return this._prevState
            }
        }, {
            key: "start", value: function (t) {
                return this._start = t, this._prevState = void 0, this._state = t, this
            }
        }, {
            key: "goto", value: function (t) {
                return null != t && (this.state = t), this
            }
        }, {
            key: "next", value: function () {
                var t, e = this["next_" + this.state];
                return e && (t = "string" == typeof e ? e : e.call(this)), this.goto(t), this
            }
        }, {
            key: "addState", value: function (t, e) {
                var i = qi(e, "next", void 0);
                i && (this["next_" + t] = i);
                var n = qi(e, "exit", void 0);
                n && (this["exit_" + t] = n);
                var s = qi(e, "enter", void 0);
                return s && (this["enter_" + t] = s), this
            }
        }, {
            key: "addStates", value: function (t) {
                for (var e in t) this.addState(e, t[e]);
                return this
            }
        }, {
            key: "update", value: function (t, e, i) {
                void 0 === i && (i = "update");
                var n = this[i + "_" + this.state];
                n && n.call(this, t, e)
            }
        }, {
            key: "preupdate", value: function (t, e) {
                this.update(t, e, "preupdate")
            }
        }, {
            key: "postupdate", value: function (t, e) {
                this.update(t, e, "postupdate")
            }
        }]), o
    }();
    Object.assign(xd.prototype, Gn);
    var Cd = function () {
        b(s, xd);
        var n = w(s);

        function s(t, e) {
            var i;
            return B(this, s), (i = n.call(this, e)).parent = t, i.init(), i
        }

        return m(s, [{
            key: "init", value: function () {
                this.start("IDLE")
            }
        }, {
            key: "next_IDLE", value: function () {
                var t, e = this.parent;
                return e.dragState.isDown && (t = 0 === e.dragThreshold ? "DRAG" : "DRAGBEGIN"), t
            }
        }, {
            key: "update_IDLE", value: function () {
                this.next()
            }
        }, {
            key: "next_DRAGBEGIN", value: function () {
                var t = this.parent, e = t.dragState;
                return e.isDown ? e.pointer.getDistance() >= t.dragThreshold ? "DRAG" : "DRAGBEGIN" : "IDLE"
            }
        }, {
            key: "update_DRAGBEGIN", value: function () {
                this.next()
            }
        }, {
            key: "next_DRAG", value: function () {
                var t, e = this.parent;
                return e.dragState.isUp && (t = e.outOfBounds ? "BACK" : e.slidingEnable ? "SLIDE" : "IDLE"), t
            }
        }, {
            key: "update_DRAG", value: function () {
                var t = this.parent;
                t.dragState.justMoved && t.dragging(), this.next()
            }
        }, {
            key: "next_SLIDE", value: function () {
                var t, e = this.parent;
                return e.dragState.isDown ? t = "DRAG" : e.isSliding || (t = "IDLE"), t
            }
        }, {
            key: "enter_SLIDE", value: function () {
                this.parent.onSliding()
            }
        }, {
            key: "exit_SLIDE", value: function () {
                this.parent.stop()
            }
        }, {
            key: "update_SLIDE", value: function (t, e) {
                this.parent.sliding(t, e), this.next()
            }
        }, {
            key: "next_BACK", value: function () {
                var t, e = this.parent;
                return e.dragState.isDown ? t = "DRAG" : e.isPullBack || (t = "IDLE"), t
            }
        }, {
            key: "enter_BACK", value: function () {
                this.parent.onPullBack()
            }
        }, {
            key: "exit_BACK", value: function () {
                this.parent.stop()
            }
        }, {
            key: "update_BACK", value: function (t, e) {
                this.parent.pullBack(t, e), this.next()
            }
        }]), s
    }(), wd = Phaser.Utils.Objects.GetValue, Sd = Phaser.Math.Distance.Between, Pd = function () {
        function i(t, e) {
            B(this, i), this.gameObject = t, this.scene = Fr(t), this.setEventEmitter(wd(e, "eventEmitter", void 0)), this._enable = void 0, t.setInteractive(wd(e, "inputConfig", void 0)), this.resetFromJSON(e), this.boot()
        }

        return m(i, [{
            key: "resetFromJSON", value: function (t) {
                return this.pointer = void 0, this.isInTouched = !1, this.holdStartTime = void 0, this.x = void 0, this.y = void 0, this.preX = void 0, this.preY = void 0, this.localX = void 0, this.localY = void 0, this.justMoved = !1, this.setEnable(wd(t, "enable", !0)), this.holdThreshold = wd(t, "holdThreshold", 50), this
            }
        }, {
            key: "boot", value: function () {
                this.gameObject.on("pointerdown", this.onPointIn, this), this.gameObject.on("pointerup", this.onPointOut, this), this.gameObject.on("pointerout", this.onPointOut, this), this.gameObject.on("pointermove", this.onPointerMove, this), this.gameObject.on("destroy", this.destroy, this), this.scene.events.on("preupdate", this.preupdate, this)
            }
        }, {
            key: "shutdown", value: function () {
                this.scene && this.scene.events.off("preupdate", this.preupdate, this), this.pointer = void 0, this.gameObject = void 0, this.scene = void 0, this.destroyEventEmitter()
            }
        }, {
            key: "destroy", value: function () {
                this.shutdown()
            }
        }, {
            key: "enable", get: function () {
                return this._enable
            }, set: function (t) {
                this._enable !== t && (t || (this.isInTouched = !1, this.pointer = void 0), this._enable = t)
            }
        }, {
            key: "setEnable", value: function (t) {
                return void 0 === t && (t = !0), this.enable = t, this
            }
        }, {
            key: "toggleEnable", value: function () {
                return this.setEnable(!this.enable), this
            }
        }, {
            key: "isDown", get: function () {
                return this.pointer && this.pointer.isDown
            }
        }, {
            key: "isUp", get: function () {
                return !this.isDown
            }
        }, {
            key: "dx", get: function () {
                return this.x - this.preX
            }
        }, {
            key: "dy", get: function () {
                return this.y - this.preY
            }
        }, {
            key: "dt", get: function () {
                return this.scene.sys.game.loop.delta
            }
        }, {
            key: "speed", get: function () {
                return this.x === this.preX && this.y === this.preY ? 0 : Sd(this.preX, this.preY, this.x, this.y) / (.001 * this.dt)
            }
        }, {
            key: "speedX", get: function () {
                return this.dx / (.001 * this.dt)
            }
        }, {
            key: "speedY", get: function () {
                return this.dy / (.001 * this.dt)
            }
        }, {
            key: "onPointIn", value: function (t, e, i) {
                this.enable && t.isDown && void 0 === this.pointer && (this.pointer = t, this.localX = e, this.localY = i)
            }
        }, {
            key: "onPointOut", value: function (t) {
                this.enable && this.pointer === t && (this.pointer = void 0)
            }
        }, {
            key: "onPointerMove", value: function (t, e, i) {
                this.enable && t.isDown && this.pointer === t && (this.localX = e, this.localY = i)
            }
        }, {
            key: "preupdate", value: function (t) {
                if (this.enable) {
                    var e = this.pointer;
                    this.justMoved = !1, e && !this.isInTouched ? (this.x = e.x, this.y = e.y, this.preX = e.x, this.preY = e.y, this.isInTouched = !0, this.holdStartTime = void 0, this.emit("touchstart", e, this.localX, this.localY)) : e && this.isInTouched ? this.x === e.x && this.y === e.y ? void 0 === this.holdStartTime ? this.holdStartTime = t : t - this.holdStartTime > this.holdThreshold && (this.preX = this.x, this.preY = this.y) : (this.preX = this.x, this.preY = this.y, this.x = e.x, this.y = e.y, this.holdStartTime = void 0, this.justMoved = !0, this.emit("touchmove", e, this.localX, this.localY)) : !e && this.isInTouched && (this.isInTouched = !1, this.holdStartTime = void 0, this.emit("touchend", e))
                }
            }
        }]), i
    }();
    Object.assign(Pd.prototype, Gn);
    var Td = Phaser.Utils.Objects.GetValue, Od = function () {
        function e(t) {
            B(this, e), this.resetFromJSON(t)
        }

        return m(e, [{
            key: "resetFromJSON", value: function (t) {
                return this.setValue(Td(t, "value", 0)), this.setSpeed(Td(t, "speed", 0)), this.setAcceleration(Td(t, "acceleration", 0)), this
            }
        }, {
            key: "reset", value: function () {
                this.setValue(0), this.setSpeed(0), this.setAcceleration(0)
            }
        }, {
            key: "setValue", value: function (t) {
                return this.value = t, this
            }
        }, {
            key: "setSpeed", value: function (t) {
                return this.speed = t, this
            }
        }, {
            key: "setAcceleration", value: function (t) {
                return this.acceleration = t, this
            }
        }, {
            key: "updateSpeed", value: function (t) {
                return 0 !== this.acceleration && (this.speed += this.acceleration * t, this.speed < 0 && (this.speed = 0)), this
            }
        }, {
            key: "getDeltaValue", value: function (t) {
                return this.updateSpeed(t), this.speed <= 0 ? 0 : this.speed * t
            }
        }, {
            key: "update", value: function (t) {
                return this.updateSpeed(t), 0 < this.speed && (this.value += this.getDeltaValue(t)), this
            }
        }, {
            key: "isMoving", get: function () {
                return 0 < this.speed
            }
        }]), e
    }(), Md = function () {
        function t() {
            B(this, t), this.value, this.dir, this.movement = new Od
        }

        return m(t, [{
            key: "init", value: function (t, e, i, n, s) {
                return this.value = t, this.end = s, this.dir = void 0 !== s ? t < s : e, this.movement.setSpeed(i).setAcceleration(-n), this
            }
        }, {
            key: "stop", value: function () {
                this.movement.reset()
            }
        }, {
            key: "update", value: function (t) {
                var e = this.movement.getDeltaValue(t);
                return this.dir || (e = -e), void 0 === this.end ? this.value += e : 0 === e ? this.value = this.end : (this.value += e, this.dir ? this.value > this.end && (this.value = this.end) : this.value < this.end && (this.value = this.end)), this
            }
        }, {
            key: "isMoving", get: function () {
                return this.movement.isMoving
            }
        }]), t
    }(), _d = Phaser.Utils.Objects.GetValue, Ed = function () {
        function a(t, e) {
            B(this, a), this.gameObject = t, this.scene = Fr(t), this.setEventEmitter(_d(e, "eventEmitter", void 0));
            var i = _d(e, "enable", !0), n = {enable: i, eventEmitter: !1};
            this._state = new Cd(this, n);
            var s = {inputConfig: _d(e, "inputConfig", void 0), enable: i, eventEmitter: !1};
            this.dragState = new Pd(t, s), this._enable = void 0, this._value = void 0, this._slowDown = new Md;
            var r = _d(e, "valuechangeCallback", null);
            if (null !== r) {
                var o = _d(e, "valuechangeCallbackScope", void 0);
                this.on("valuechange", r, o)
            }
            if (null !== (r = _d(e, "overmaxCallback", null))) {
                o = _d(e, "overmaxCallbackScope", void 0);
                this.on("overmax", r, o)
            }
            if (null !== (r = _d(e, "overminCallback", null))) {
                o = _d(e, "overminCallbackScope", void 0);
                this.on("overmin", r, o)
            }
            this.resetFromJSON(e), this.boot()
        }

        return m(a, [{
            key: "resetFromJSON", value: function (t) {
                this.setOrientationMode(_d(t, "orientation", 0)), this.setDragThreshold(_d(t, "threshold", 10)), this.setSlidingDeceleration(_d(t, "slidingDeceleration", 5e3)), this.setBackDeceleration(_d(t, "backDeceleration", 2e3));
                var e = _d(t, "bounds", void 0);
                return e ? this.setBounds(e) : this.setBounds(_d(t, "max", 0), _d(t, "min", 0)), this.setValue(_d(t, "value", this.maxValue || 0)), this.setEnable(_d(t, "enable", !0)), this
            }
        }, {
            key: "boot", value: function () {
                this.scene.events.on("update", this._state.update, this._state), this.gameObject.on("destroy", this.destroy, this)
            }
        }, {
            key: "shutdown", value: function () {
                this.destroyEventEmitter(), this.scene && this.scene.events.off("update", this._state.update, this._state), this.gameObject = void 0, this.scene = void 0, this._state.destroy(), this.dragState.destroy()
            }
        }, {
            key: "destroy", value: function () {
                this.shutdown()
            }
        }, {
            key: "enable", get: function () {
                return this._enable
            }, set: function (t) {
                if (this._enable !== t) return this._enable = t, this._state.setEnable(t), this.dragState.setEnable(t), this
            }
        }, {
            key: "setEnable", value: function (t) {
                return void 0 === t && (t = !0), this.enable = t, this
            }
        }, {
            key: "toggleEnable", value: function () {
                return this.setEnable(!this.enable), this
            }
        }, {
            key: "setOrientationMode", value: function (t) {
                return "string" == typeof t && (t = Bd[t]), this.orientationMode = t, this
            }
        }, {
            key: "setDragThreshold", value: function (t) {
                return this.dragThreshold = t, this
            }
        }, {
            key: "setSlidingDeceleration", value: function (t) {
                return this.slidingDeceleration = t, this
            }
        }, {
            key: "setBackDeceleration", value: function (t) {
                return this.backDeceleration = t, this
            }
        }, {
            key: "setBounds", value: function (t, e) {
                if (Array.isArray(t)) {
                    var i = t;
                    t = i[0], e = i[1]
                }
                return t < e ? (this.minValue = t, this.maxValue = e) : (this.minValue = e, this.maxValue = t), this
            }
        }, {
            key: "value", get: function () {
                return this._value
            }, set: function (t) {
                if (t !== this._value) {
                    var e = this._value, i = this.overMax(t), n = this.overMin(t);
                    i && this.emit("overmax", t, e), n && this.emit("overmin", t, e), this.backEnable || (i && (t = this.maxValue), n && (t = this.minValue)), this._value = t, this.emit("valuechange", t, e)
                }
            }
        }, {
            key: "setValue", value: function (t) {
                this.value = t
            }
        }, {
            key: "state", get: function () {
                return this._state.state
            }
        }, {
            key: "isDragging", get: function () {
                return this.dragState.isInTouched
            }
        }, {
            key: "outOfMaxBound", get: function () {
                return this.overMax(this.value)
            }
        }, {
            key: "outOfMinBound", get: function () {
                return this.overMin(this.value)
            }
        }, {
            key: "outOfBounds", get: function () {
                return this.outOfMinBound || this.outOfMaxBound
            }
        }, {
            key: "overMax", value: function (t) {
                return null != this.maxValue && t > this.maxValue
            }
        }, {
            key: "overMin", value: function (t) {
                return null != this.minValue && t < this.minValue
            }
        }, {
            key: "backEnable", get: function () {
                return "number" == typeof this.backDeceleration
            }
        }, {
            key: "isPullBack", get: function () {
                return this._slowDown.isMoving
            }
        }, {
            key: "slidingEnable", get: function () {
                return "number" == typeof this.slidingDeceleration
            }
        }, {
            key: "isSliding", get: function () {
                return this._slowDown.isMoving
            }
        }, {
            key: "dragDelta", get: function () {
                return 0 === this.orientationMode ? this.dragState.dy : 1 === this.orientationMode ? this.dragState.dx : 0
            }
        }, {
            key: "dragSpeed", get: function () {
                return 0 === this.orientationMode ? this.dragState.speedY : 1 === this.orientationMode ? this.dragState.speedX : 0
            }
        }, {
            key: "dragging", value: function () {
                this.value += this.dragDelta
            }
        }, {
            key: "onSliding", value: function () {
                var t = this.value, e = this.dragSpeed;
                if (0 === e) return this._slowDown.stop(), void this._state.next();
                var i = this.slidingDeceleration;
                this._slowDown.init(t, 0 < e, Math.abs(e), i)
            }
        }, {
            key: "sliding", value: function (t, e) {
                e *= .001;
                var i = this._slowDown.update(e).value;
                this.overMax(i) ? (this.value = this.maxValue, this._slowDown.stop()) : this.overMin(i) ? (this.value = this.minValue, this._slowDown.stop()) : this.value = i
            }
        }, {
            key: "onPullBack", value: function () {
                var t = this.value, e = this.outOfMinBound ? this.minValue : this.maxValue, i = Math.abs(e - t),
                    n = this.backDeceleration, s = Math.sqrt(2 * n * i);
                this._slowDown.init(t, void 0, s, n, e)
            }
        }, {
            key: "pullBack", value: function (t, e) {
                e *= .001, this.value = this._slowDown.update(e).value, this._slowDown.isMoving || this._state.next()
            }
        }, {
            key: "stop", value: function () {
                this._slowDown.stop()
            }
        }]), a
    }();
    Object.assign(Ed.prototype, Gn);
    var Bd = {y: 0, v: 0, vertical: 0, x: 1, h: 1, horizontal: 1}, zd = Phaser.Utils.Objects.GetValue,
        jd = {right: 0, left: 1, bottom: 0, top: 1}, Rd = Phaser.Utils.Objects.GetValue, Dd = function () {
            b(p, cu);
            var f = w(p);

            function p(t, e) {
                var i;
                B(this, p), void 0 === e && (e = {});
                var n = kd(e);
                e.orientation = 0 === n ? 1 : 0, (i = f.call(this, t, e)).type = Rd(e, "type", "rexScrollable");
                var s = Rd(e, "background", void 0), r = function (t) {
                    var e, i, n, s = this.scene, r = kd(t), o = new cu(s, {orientation: r}),
                        a = zd(t, "child.gameObject", void 0), h = zd(t, "slider", void 0), l = zd(t, "scroller", !0);
                    if (a) {
                        var u, c = zd(t, "space.child", 0);
                        if (this.childPadding = {}, "number" != typeof c) {
                            var d = c;
                            0 === r ? (c = zd(d, "right", 0), this.childPadding.top = zd(d, "top", 0), this.childPadding.bottom = zd(d, "bottom", 0)) : (c = zd(d, "bottom", 0), this.childPadding.top = zd(d, "left", 0), this.childPadding.bottom = zd(d, "right", 0))
                        } else this.childPadding.top = 0, this.childPadding.bottom = 0;
                        if (h) !0 === h && (h = {}), "string" == typeof (i = zd(h, "position", 0)) && (i = jd[i]), u = 0 === r ? 0 === i ? {left: c} : {right: c} : 0 === i ? {top: c} : {bottom: c}, h.orientation = 0 === o.orientation ? 1 : 0, e = new vd(s, h);
                        l && (!0 === l && (l = {}), l.orientation = r, n = new Ed(a, l)), e && 1 === i && o.add(e, 0, "center", u, !0);
                        var f = zd(t, "child.proportion", 1), p = zd(t, "child.expand", !0);
                        o.add(a, f, "center", 0, p), e && 0 === i && o.add(e, 0, "center", u, !0)
                    }
                    return e && e.on("valuechange", function (t) {
                        this.t = t, this.emit("scroll", this)
                    }, this), n && n.on("valuechange", function (t) {
                        this.childOY = t, this.emit("scroll", this)
                    }, this), this.addChildrenMap("child", a), this.addChildrenMap("slider", e), this.addChildrenMap("scroller", n), o
                }.call(z(i), e), o = Rd(e, "header", void 0), a = Rd(e, "footer", void 0);
                if (s && i.addBackground(s), o) {
                    var h = Rd(e, "align.header", "center"), l = Rd(e, "space.header", 0);
                    c = 0 === n ? {bottom: l} : {right: l};
                    var u = Rd(e, "expand.header", !0);
                    i.add(o, 0, h, c, u)
                }
                if (r && i.add(r, 1, "center", 0, !0), a) {
                    h = Rd(e, "align.footer", "center");
                    var c, d = Rd(e, "space.footer", 0);
                    c = 0 === n ? {top: d} : {left: d};
                    u = Rd(e, "expand.footer", !0);
                    i.add(a, 0, h, c, u)
                }
                return i.addChildrenMap("background", s), i.addChildrenMap("header", o), i.addChildrenMap("footer", a), i
            }

            return m(p, [{
                key: "runLayout", value: function (t, e, i) {
                    return this.ignoreLayout || (C(x(p.prototype), "runLayout", this).call(this, t, e, i), this.resizeController()), this
                }
            }, {
                key: "t", get: function () {
                    var t = this.childrenMap.child.t, e = this.childPadding;
                    if (0 !== e.top || 0 !== e.bottom) {
                        var i = this.childrenMap.child, n = i.topChildOY - i.bottomChildOY, s = n + e.top + e.bottom;
                        t = (n * t + e.top) / s
                    }
                    return t
                }, set: function (t) {
                    var e = this.childPadding;
                    if (0 !== e.top || 0 !== e.bottom) {
                        var i = this.childrenMap.child, n = i.topChildOY - i.bottomChildOY;
                        t = ((n + e.top + e.bottom) * t - e.top) / n
                    }
                    this.childrenMap.child.t = t, this.updateController()
                }
            }, {
                key: "childOY", get: function () {
                    return this.childrenMap.child.childOY
                }, set: function (t) {
                    this.childrenMap.child.childOY = t, this.updateController()
                }
            }, {
                key: "topChildOY", get: function () {
                    return this.childrenMap.child.topChildOY + this.childPadding.top
                }
            }, {
                key: "bottomChildOY", get: function () {
                    return this.childrenMap.child.bottomChildOY - this.childPadding.bottom
                }
            }, {
                key: "setChildOY", value: function (t) {
                    return this.childOY = t, this
                }
            }, {
                key: "setT", value: function (t) {
                    return this.t = t, this
                }
            }, {
                key: "scrollToTop", value: function () {
                    return this.t = 0, this
                }
            }, {
                key: "scrollToBottom", value: function () {
                    return this.t = 1, this
                }
            }, {
                key: "sliderEnable", get: function () {
                    var t = this.childrenMap.slider;
                    if (t) return t.enable
                }, set: function (t) {
                    var e = this.childrenMap.slider;
                    e && e.setEnable(t)
                }
            }, {
                key: "setSliderEnable", value: function (t) {
                    return void 0 === t && (t = !0), this.sliderEnable = t, this
                }
            }, {
                key: "scrollerEnable", get: function () {
                    var t = this.childrenMap.scroller;
                    if (t) return t.enable
                }, set: function (t) {
                    var e = this.childrenMap.scroller;
                    e && e.setEnable(t)
                }
            }, {
                key: "setScrollerEnable", value: function (t) {
                    return void 0 === t && (t = !0), this.scrollerEnable = t, this
                }
            }]), p
        }(), Ld = {
            resizeController: function () {
                var t = this.topChildOY, e = this.bottomChildOY, i = this.childrenMap.scroller, n = this.childrenMap.slider;
                return i && i.setBounds(e, t), n && n.setEnable(e !== t), this.updateController(), this
            }, updateController: function () {
                var t = this.childrenMap.scroller, e = this.childrenMap.slider;
                t && t.setValue(this.childOY), e && e.setValue(this.t)
            }
        };
    Object.assign(Dd.prototype, Ld);
    var Id = function () {
        function i(t, e) {
            B(this, i), this.container = null, this._deltaHeight = 0, this.setParent(t)
        }

        return m(i, [{
            key: "setParent", value: function (t) {
                this.parent = t, this.parentContainer = t.getParentContainer()
            }
        }, {
            key: "destroy", value: function (t) {
                void 0 === t && (t = !1), t || this.destroyContainer(), this.deltaHeight = 0, this.data = void 0, this.container = null, this.parent = void 0, this.parentContainer = void 0
            }
        }, {
            key: "table", get: function () {
                return this.parent
            }
        }, {
            key: "scrollMode", get: function () {
                return this.parentContainer.scrollMode
            }
        }, {
            key: "colIndx", get: function () {
                return this.parent.cellIndxeToColIndex(this.index)
            }
        }, {
            key: "rowIndx", get: function () {
                return this.parent.cellIndxeToRowIndex(this.index)
            }
        }, {
            key: "getContainer", value: function () {
                return this.container
            }
        }, {
            key: "setContainer", value: function (t) {
                return t ? (this.container && this.container.destroy(), this.container = t, this.parentContainer.add(t)) : this.destroyContainer(), this
            }
        }, {
            key: "destroyContainer", value: function () {
                return this.container && (this.container.destroy(), this.container = null), this
            }
        }, {
            key: "popContainer", value: function () {
                if (this.container) {
                    var t = this.container;
                    return this.container = null, this.parentContainer.remove(t), t
                }
                return null
            }
        }, {
            key: "setXY", value: function (t, e) {
                return this.container && this.parentContainer.setChildLocalPosition(this.container, t, e), this
            }
        }, {
            key: "deltaHeight", get: function () {
                return this._deltaHeight
            }, set: function (t) {
                null == t && (t = 0);
                var e = this.parent;
                0 === this._deltaHeight && 0 !== t ? e.nonZeroDeltaHeightCount++ : 0 !== this._deltaHeight && 0 === t && e.nonZeroDeltaHeightCount--;
                var i = this._deltaHeight !== t;
                if (this._deltaHeight = t, i) {
                    var n = 0 === this.scrollMode ? "cellheightchange" : "cellwidthchange";
                    this.parentContainer.emit(n)
                }
            }
        }, {
            key: "deltaWidth", get: function () {
                return this.deltaHeight
            }, set: function (t) {
                this.deltaHeight = t
            }
        }, {
            key: "setDeltaHeight", value: function (t) {
                return this.deltaHeight = t, this
            }
        }, {
            key: "setDeltaWidth", value: function (t) {
                return this.deltaHeight = t, this
            }
        }, {
            key: "height", get: function () {
                return 0 === this.scrollMode ? this.deltaHeight + this.parent.defaultCellHeight : this.parent.defaultCellWidth
            }, set: function (t) {
                1 !== this.scrollMode && this.setDeltaHeight(t - this.parent.defaultCellHeight)
            }
        }, {
            key: "setHeight", value: function (t) {
                return this.height = t, this
            }
        }, {
            key: "width", get: function () {
                return 0 === this.scrollMode ? this.parent.defaultCellWidth : this.deltaHeight + this.parent.defaultCellHeight
            }, set: function (t) {
                0 !== this.scrollMode && this.setDeltaHeight(t - this.parent.defaultCellHeight)
            }
        }, {
            key: "setWidth", value: function (t) {
                return this.width = t, this
            }
        }, {
            key: "scene", get: function () {
                return this.parentContainer.scene
            }
        }]), i
    }();
    Object.assign(Id.prototype, $i);

    function Yd(t) {
        return t.hasOwnProperty("geometryMask") ? t.geometryMask : t.bitmapMask
    }

    function Ad(t, e, i) {
        if (e) {
            void 0 === i && (i = t.getAllChildren());
            for (var n, s, r = t.getBounds(), o = Yd(e), a = 0, h = i.length; a < h; a++) if (!(n = i[a]).hasOwnProperty("isRexContainerLite") && n !== o && Kd(n)) if (n.getBounds) switch (s = n.getBounds(s), Zd(r, s)) {
                case 4:
                    qd(t, n);
                    break;
                case 0:
                    Nd(r, s) || Jd(r, s) ? $d(t, n, e) : Qd(t, n);
                    break;
                default:
                    $d(t, n, e)
            } else $d(t, n, e)
        }
    }

    function Fd(t) {
        if (this.emit("cellinvisible", t), this.cellContainersPool) {
            var e = t.popContainer();
            e && this.cellContainersPool.killAndHide(e)
        }
        t.destroyContainer()
    }

    function Wd() {
        var t = this.preVisibleCells, e = this.visibleCells;
        t.iterate(function (t) {
            e.contains(t) || Fd.call(this, t)
        }, this)
    }

    function Vd(t) {
        var e, i = null;
        (e = t.getContainer()) ? (i = e, t.popContainer()) : this.cellContainersPool && null !== (i = this.cellContainersPool.getFirstDead()) && i.setActive(!0).setVisible(!0), this.emit("cellvisible", t, i, this), this.cellContainersPool && ((e = t.getContainer()) ? null === i ? this.cellContainersPool.add(e) : i !== e && (this.cellContainersPool.add(e), this.cellContainersPool.killAndHide(i)) : null !== i && this.cellContainersPool.killAndHide(i))
    }

    function Xd(t, e) {
        e -= this.y + this.topLeftY, t -= this.x + this.topLeftX;
        var i = this.tableOY - (0 === this.scrollMode ? e : t), n = this.tableOX - (0 === this.scrollMode ? t : e),
            s = this.table, r = s.heightToRowIndex(-i), o = s.widthToColIndex(-n), a = s.colRowToCellIndex(o, r);
        return null !== a && this.isCellVisible(a) ? a : null
    }

    var Gd = Phaser.Utils.Objects.GetValue, Hd = Phaser.Utils.Array.SpliceOne, Ud = function () {
            function i(t, e) {
                B(this, i), this.parent = t, this.cells = [], this.cellPool = new Rt, this.resetFromJSON(e)
            }

            return m(i, [{
                key: "resetFromJSON", value: function (t) {
                    return this.colCount = void 0, this._nonZeroDeltaHeightCount = 0, this.resetTotalRowsHeight(), this.setDefaultCellHeight(Gd(t, "cellHeight", 30)), this.setDefaultCellWidth(Gd(t, "cellWidth", 30)), this.initCells(Gd(t, "cellsCount", 0)), this.setColumnCount(Gd(t, "columns", 1)), this
                }
            }, {
                key: "destroy", value: function (t) {
                    for (var e = 0, i = this.cells.length; e < i; e++) this.freeCell(this.cells[e], t);
                    this.cellPool.destroy(), this.cells = void 0, this.parent = void 0
                }
            }, {
                key: "nonZeroDeltaHeightCount", get: function () {
                    return this._nonZeroDeltaHeightCount
                }, set: function (t) {
                    this._nonZeroDeltaHeightCount !== t && (this._nonZeroDeltaHeightCount = t, this.resetTotalRowsHeight())
                }
            }, {
                key: "defaultCellHeightMode", get: function () {
                    return 0 === this.nonZeroDeltaHeightCount
                }
            }, {
                key: "setDefaultCellHeight", value: function (t) {
                    return this.defaultCellHeight = t, this
                }
            }, {
                key: "setDefaultCellWidth", value: function (t) {
                    return this.defaultCellWidth = t, this
                }
            }, {
                key: "initCells", value: function (t) {
                    var e = this.cells;
                    e.length = t;
                    for (var i = 0; i < t; i++) e[i] = null;
                    return this
                }
            }, {
                key: "insertNewCells", value: function (t, e) {
                    var i = this.cells;
                    if (t === i.length) {
                        var n = t + e;
                        i.legth = n;
                        for (var s = t; s < n; s++) i[s] = null
                    } else {
                        var r, o = [];
                        o.length = e;
                        for (s = 0; s < e; s++) o[s] = null;
                        (r = this.cells).splice.apply(r, [t, 0].concat(o))
                    }
                    return this.resetTotalRowsHeight(), this
                }
            }, {
                key: "removeCells", value: function (t, e) {
                    for (var i = t + e, n = t; n < i; n++) this.freeCell(n);
                    return i === this.cells.length ? this.cells.length = t : (1 === e ? Hd(this.cells, t) : this.cells.splice(t, e), this.buildCellIndex(t)), this.resetTotalRowsHeight(), this
                }
            }, {
                key: "setColumnCount", value: function (t) {
                    return this.colCount = t, this.resetTotalRowsHeight(), this
                }
            }, {
                key: "rowCount", get: function () {
                    return Math.ceil(this.cells.length / this.colCount)
                }
            }, {
                key: "cellsCount", get: function () {
                    return this.cells.length
                }
            }, {
                key: "isValidCellIdx", value: function (t) {
                    return 0 <= t && t < this.cells.length
                }
            }, {
                key: "heightToRowIndex", value: function (t, e) {
                    if (this.defaultCellHeightMode) {
                        var i = t / this.defaultCellHeight;
                        return i = e ? Math.ceil(i) : Math.floor(i)
                    }
                    var n, s = this.rowCount, r = t;
                    for (i = 0; ;) {
                        if (n = 0 <= i && i < s, !(0 < (r -= this.getRowHeight(i)) && n)) {
                            if (0 === r) return i;
                            if (e) {
                                var o = i;
                                (n = 0 <= (i += 1) && i < s) || (i = o)
                            }
                            return i
                        }
                        i += 1
                    }
                }
            }, {
                key: "widthToColIndex", value: function (t, e) {
                    var i = t / this.defaultCellWidth;
                    return i = e ? Math.ceil(i) : Math.floor(i)
                }
            }, {
                key: "colRowToCellIndex", value: function (t, e) {
                    return t >= this.colCount ? null : e * this.colCount + t
                }
            }, {
                key: "rowIndexToHeight", value: function (t, e) {
                    if (this.defaultCellHeightMode) return (e - t + 1) * this.defaultCellHeight;
                    for (var i = 0, n = t; n <= e; n++) i += this.getRowHeight(n);
                    return i
                }
            }, {
                key: "colIndexToWidth", value: function (t, e) {
                    return (e - t + 1) * this.defaultCellWidth
                }
            }, {
                key: "getRowHeight", value: function (t) {
                    var e = this.colCount;
                    if (e <= 1) return this.getCellHeight(this.colRowToCellIndex(0, t));
                    for (var i, n = 0, s = 0; s < e; s++) n < (i = this.getCellHeight(this.colRowToCellIndex(s, t))) && (n = i);
                    return n
                }
            }, {
                key: "getColWidth", value: function () {
                    return this.defaultCellWidth
                }
            }, {
                key: "getCellHeight", value: function (t) {
                    if (!this.isValidCellIdx(t)) return 0;
                    var e;
                    if (this.defaultCellHeightMode) e = this.defaultCellHeight; else {
                        var i = this.getCell(t, !1), n = i ? i.deltaHeight : 0;
                        e = this.defaultCellHeight + n
                    }
                    return e
                }
            }, {
                key: "resetTotalRowsHeight", value: function () {
                    this._totalRowsHeight = null
                }
            }, {
                key: "totalRowsHeight", get: function () {
                    return null === this._totalRowsHeight && (this._totalRowsHeight = this.rowIndexToHeight(0, this.rowCount - 1)), this._totalRowsHeight
                }
            }, {
                key: "totalColumnWidth", get: function () {
                    return this.colCount * this.defaultCellWidth
                }
            }, {
                key: "cellIndxeToColIndex", value: function (t) {
                    return t % this.colCount
                }
            }, {
                key: "cellIndxeToRowIndex", value: function (t) {
                    return Math.floor(t / this.colCount)
                }
            }, {
                key: "getCell", value: function (t, e) {
                    if (!this.isValidCellIdx(t)) return null;
                    if (void 0 === e && (e = !0), null === this.cells[t] && e) {
                        var i = this.newCell(t);
                        this.cells[t] = i
                    }
                    return this.cells[t]
                }
            }, {
                key: "newCell", value: function (t) {
                    var e = this.cellPool.pop();
                    return null === e ? e = new Id(this) : e.setParent(this), e.index = t, e
                }
            }, {
                key: "buildCellIndex", value: function (t) {
                    void 0 === t && (t = 0);
                    for (var e, i = this.cells, n = t, s = i.length; n < s; n++) (e = i[n]) && (e.index = n);
                    return this
                }
            }, {
                key: "getParentContainer", value: function () {
                    return this.parent
                }
            }, {
                key: "freeCell", value: function (t, e) {
                    return "number" == typeof t && (t = this.cells[t]), t && (t.destroy(e), e || this.cellPool.push(t)), this
                }
            }]), i
        }(), Nd = Phaser.Geom.Intersects.RectangleToRectangle, Jd = Phaser.Geom.Rectangle.Overlaps, Kd = function (t) {
            for (; ;) {
                var e = t.rexContainer;
                if (e) {
                    if (e.visible) {
                        var i = e.parent;
                        if (i) {
                            t = i;
                            continue
                        }
                        return !0
                    }
                    return !1
                }
                return t.visible
            }
        }, Zd = function (t, e) {
            var i = 0, n = e.top, s = e.bottom, r = e.left, o = e.right;
            return i += t.contains(r, n) ? 1 : 0, i += t.contains(r, s) ? 1 : 0, i += t.contains(o, n) ? 1 : 0, i += t.contains(o, s) ? 1 : 0
        }, qd = function (t, e) {
            t.setChildMaskVisible(e, !0), e.clearMask && e.clearMask()
        }, $d = function (t, e, i) {
            t.setChildMaskVisible(e, !0), e.setMask && e.setMask(i)
        }, Qd = function (t, e) {
            t.setChildMaskVisible(e, !1), e.clearMask && e.clearMask()
        }, tf = function (t) {
            var e = 0 === this.scrollMode ? this.topLeftX : this.topLeftY;
            return this.tableOX + this.table.colIndexToWidth(0, t - 1) + e
        }, ef = function (t) {
            var e = 0 === this.scrollMode ? this.topLeftY : this.topLeftX;
            return this.tableOY + this.table.rowIndexToHeight(0, t - 1) + e
        }, nf = function () {
            var t = this.preVisibleCells;
            this.preVisibleCells = this.visibleCells, this.visibleCells = t, this.visibleCells.clear()
        }, sf = Phaser.Math.Clamp, rf = {
            setTableOY: function (t) {
                var e = this.table, i = this.topTableOY, n = this.bottomTableOY, s = t > this.topTableOY,
                    r = t < this.bottomTableOY;
                this.clampTableOXY && (e.rowCount < e.heightToRowIndex(this.instHeight, !0) ? t = 0 : s ? t = i : r && (t = n));
                return this._tableOY !== t && (this._tableOY = t), s && (this.execeedTopState || this.emit("execeedtop", this, t, i)), this.execeedTopState = s, r && (this.execeedBottomState || this.emit("execeedbottom", this, t, n)), this.execeedBottomState = r, this
            }, setTableOX: function (t) {
                var e = this.table, i = this.leftTableOX, n = this.rightTableOX, s = t > this.leftTableOX,
                    r = t < this.rightTableOX;
                this.clampTableOXY && (e.colCount < e.widthToColIndex(this.instWidth, !0) ? t = 0 : s ? t = i : r && (t = n));
                return this._tableOX !== t && (this._tableOX = t), s && (this.execeedLeftState || this.emit("execeedleft", this, t, i)), this.execeedLeftState = s, r && (this.execeedRightState || this.emit("execeedright", this, t, n)), this.execeedRightState = r, this
            }, maskCells: function () {
                if (!this.cellsMask) return this;
                if (!this.maskCellsFlag) return this;
                if (0 === this.alpha || !this.visible) return this;
                for (var t, e = [], i = this.visibleCells.entries, n = 0, s = i.length; n < s; n++) (t = i[n].getContainer()) && (t.hasOwnProperty("isRexContainerLite") ? t.getAllChildren(e) : e.push(t));
                return Ad(this, this.cellsMask, e), 0 === this.maskUpdateMode && (this.maskCellsFlag = !1), this
            }, updateTable: function (t) {
                return void 0 === t && (t = !1), t && (nf.call(this), Wd.call(this)), nf.call(this), function () {
                    if (0 !== this.cellsCount) {
                        var t = this.table, e = t.heightToRowIndex(-this.tableOY);
                        e <= 0 && (e = 0);
                        var i = e, n = t.widthToColIndex(-this.tableOX);
                        n <= 0 && (n = 0);
                        for (var s = n, r = t.colRowToCellIndex(s, i), o = this.bottomBound, a = this.rightBound, h = t.cellsCount - 1, l = t.colCount - 1, u = tf.call(this, s), c = u, d = ef.call(this, i); d < o && r <= h;) {
                            if (this.table.isValidCellIdx(r)) {
                                var f = t.getCell(r, !0);
                                this.visibleCells.set(f), this.preVisibleCells.contains(f) || Vd.call(this, f), 0 === this.scrollMode ? f.setXY(c, d) : f.setXY(d, c)
                            }
                            c < a && s < l ? (c += t.getColWidth(s), s += 1) : (c = u, d += t.getRowHeight(i), s = n, i += 1), r = t.colRowToCellIndex(s, i)
                        }
                    }
                }.call(this), Wd.call(this), this.maskCellsFlag = !0, this
            }, isCellVisible: function (t) {
                var e = this.table.getCell(t, !1);
                return e && this.visibleCells.contains(e)
            }, pointToCellIndex: Xd, pointToCellContainer: function (t, e) {
                var i = Xd.call(this, t, e);
                if (null !== i) return this.getCellContainer(i)
            }, eachVisibleCell: function (t, e) {
                return this.visibleCells.each(t, e), this
            }, iterateVisibleCell: function (t, e) {
                return this.visibleCells.iterate(t, e), this
            }, eachCell: function (t, e) {
                return this.table.cells.slice().forEach(t, e), this
            }, iterateCell: function (t, e) {
                return this.table.cells.forEach(t, e), this
            }, setCellsCount: function (t) {
                var e = this.cellsCount;
                return e === t || (t < e ? this.removeCells(t, e - t) : this.insertNewCells(e, t - e)), this
            }, insertNewCells: function (t, e) {
                return "object" === p(t) && (t = t.index), void 0 === e && (e = 1), e <= 0 || (t = sf(t, 0, this.cellsCount), this.table.insertNewCells(t, e)), this
            }, removeCells: function (t, e) {
                if ("object" === p(t) && (t = t.index), void 0 === e && (e = 1), t < 0 && (e += t, t = 0), e <= 0) return this;
                if (t > this.cellsCount) return this;
                for (var i, n = t, s = t + e; n < s; n++) (i = this.getCell(n, !1)) && (this.visibleCells.contains(i) && (Fd.call(this, i), this.visibleCells.delete(i)), this.preVisibleCells.delete(i));
                return this.table.removeCells(t, e), this
            }, setColumnCount: function (t) {
                return this.table.colCount === t || this.table.setColumnCount(t), this
            }, setGridSize: function (t, e) {
                return this.setCellsCount(t * e), this.table.setColumnCount(t), this
            }, updateVisibleCell: function (t) {
                var e = this.table.getCell(t, !1);
                return e && e.container && Vd.call(this, e), this
            }
        }, of = Phaser.GameObjects.Group, af = Phaser.GameObjects.Components, hf = Phaser.Structs.Set,
        lf = Phaser.Utils.Objects.GetValue, uf = function () {
            b(f, Ni);
            var d = w(f);

            function f(t, e, i, n, s, r) {
                var o;
                B(this, f), void 0 === r && (r = {}), (o = d.call(this, t, e, i, n, s)).type = "rexGridTable", o._tableOX = 0, o._tableOY = 0, o.visibleCells = new hf, o.preVisibleCells = new hf, o.execeedTopState = !1, o.execeedBottomState = !1, o.execeedLeftState = !1, o.execeedRightState = !1, lf(r, "reuseCellContainer", !1) && (o.cellContainersPool = new of(t));
                var a = lf(r, "cellVisibleCallback", null);
                if (null !== a) {
                    var h = lf(r, "cellVisibleCallbackScope", void 0);
                    o.on("cellvisible", a, h)
                }
                if (null !== (a = lf(r, "cellInvisibleCallback", null))) {
                    h = lf(r, "cellInvisibleCallbackScope", void 0);
                    o.on("cellinvisible", a, h)
                }
                if (o.setCellsMask(lf(r, "mask", !0)), o.setScrollMode(lf(r, "scrollMode", 0)), o.setClampMode(lf(r, "clamplTableOXY", !0)), 0 === o.scrollMode) {
                    var l = lf(r, "cellWidth", void 0);
                    if (o.expandCellSize = void 0 === l, void 0 === l) {
                        var u = lf(r, "columns", 1);
                        r.cellWidth = o.width / u
                    }
                } else {
                    l = lf(r, "cellHeight", void 0);
                    var c = lf(r, "cellWidth", void 0);
                    o.expandCellSize = void 0 === l, r.cellWidth = l, r.cellHeight = c
                }
                return o.table = new Ud(z(o), r), o.updateTable(), o
            }

            return m(f, [{
                key: "destroy", value: function (t) {
                    this.scene && (this.cellsMask && this.scene.game.events.off("poststep", this.maskCells, this), this.table.destroy(t), this.table = void 0, this.cellContainersPool && (this.cellContainersPool.destroy(!0), this.cellContainersPool = void 0), C(x(f.prototype), "destroy", this).call(this, t))
                }
            }, {
                key: "setScrollMode", value: function (t) {
                    return "string" == typeof t && (t = df[t.toLowerCase()]), this.scrollMode = t, this
                }
            }, {
                key: "setClampMode", value: function (t) {
                    return void 0 === t && (t = !0), this.clampTableOXY = t, this
                }
            }, {
                key: "tableOY", get: function () {
                    return this._tableOY
                }, set: function (t) {
                    this.setTableOY(t).updateTable()
                }
            }, {
                key: "tableOX", get: function () {
                    return this._tableOX
                }, set: function (t) {
                    this.setTableOX(t).updateTable()
                }
            }, {
                key: "setTableOXY", value: function (t, e) {
                    return this.setTableOY(e).setTableOX(t), this
                }
            }, {
                key: "addTableOY", value: function (t) {
                    return this.setTableOY(this.tableOY + t), this
                }
            }, {
                key: "addTableOX", value: function (t) {
                    return this.setTableOX(this.tableOX + t), this
                }
            }, {
                key: "addTableOXY", value: function (t, e) {
                    return this.addTableOY(e).addTableOX(t), this
                }
            }, {
                key: "setTableOYByPercentage", value: function (t) {
                    return this.setTableOY(-this.tableVisibleHeight * t), this
                }
            }, {
                key: "getTableOYPercentage", value: function () {
                    var t = this.tableVisibleHeight;
                    return 0 === t ? 0 : this.tableOY / -t
                }
            }, {
                key: "t", get: function () {
                    return this.getTableOYPercentage()
                }, set: function (t) {
                    this.setTableOYByPercentage(t).updateTable()
                }
            }, {
                key: "getCell", value: function (t) {
                    return this.table.getCell(t, !0)
                }
            }, {
                key: "getCellContainer", value: function (t) {
                    var e, i = this.table.getCell(t, !1);
                    return i && (e = i.getContainer()), e
                }
            }, {
                key: "cellsCount", get: function () {
                    return this.table.cellsCount
                }
            }, {
                key: "columnCount", get: function () {
                    return this.table.colCount
                }
            }, {
                key: "setCellHeight", value: function (t, e) {
                    return ("number" == typeof t ? this.table.getCell(t, !0) : t).height = e, this
                }
            }, {
                key: "setCellWidth", value: function (t, e) {
                    return ("number" == typeof t ? this.table.getCell(t, !0) : t).width = e, this
                }
            }, {
                key: "setCellsMask", value: function (t) {
                    var e, i, n;
                    if (!0 === t ? (e = !0, n = i = 0) : !1 === t ? e = !1 : (e = lf(t, "mask", !0), i = lf(t, "padding", 0), n = lf(t, "updateMode", 0)), this.maskCellsFlag = !0, this.maskUpdateMode = n, e) {
                        var s = new Nu(this, 0, i);
                        this.cellsMask = s.createGeometryMask(), this.add(s), "string" == typeof n && (n = ff[n]), this.scene.game.events.on("poststep", this.maskCells, this)
                    }
                    return this
                }
            }, {
                key: "instHeight", get: function () {
                    return 0 === this.scrollMode ? this.height : this.width
                }
            }, {
                key: "instWidth", get: function () {
                    return 0 === this.scrollMode ? this.width : this.height
                }
            }, {
                key: "tableHeight", get: function () {
                    return this.table.totalRowsHeight
                }
            }, {
                key: "tableWidth", get: function () {
                    return this.table.totalColumnWidth
                }
            }, {
                key: "topTableOY", get: function () {
                    return 0
                }
            }, {
                key: "bottomTableOY", get: function () {
                    return -this.tableVisibleHeight
                }
            }, {
                key: "leftTableOX", get: function () {
                    return 0
                }
            }, {
                key: "rightTableOX", get: function () {
                    return -this.tableVisibleWidth
                }
            }, {
                key: "tableVisibleHeight", get: function () {
                    var t = this.tableHeight, e = this.instHeight;
                    return e < t ? t - e : 0
                }
            }, {
                key: "tableVisibleWidth", get: function () {
                    var t = this.tableWidth, e = this.instWidth;
                    return e < t ? t - e : 0
                }
            }, {
                key: "bottomLeftY", get: function () {
                    return -(this.displayHeight * this.originY) + this.displayHeight
                }
            }, {
                key: "topRightX", get: function () {
                    return -(this.displayWidth * this.originX) + this.displayWidth
                }
            }, {
                key: "topLeftX", get: function () {
                    return -(this.displayWidth * this.originX)
                }
            }, {
                key: "topLeftY", get: function () {
                    return -(this.displayHeight * this.originY)
                }
            }, {
                key: "bottomBound", get: function () {
                    return 0 === this.scrollMode ? this.bottomLeftY : this.topRightX
                }
            }, {
                key: "rightBound", get: function () {
                    return 0 === this.scrollMode ? this.topRightX : this.bottomLeftY
                }
            }, {
                key: "resize", value: function (t, e) {
                    return this.width === t && this.height === e || (C(x(f.prototype), "resize", this).call(this, t, e), this.cellsMask && eh(Yd(this.cellsMask), t, e), this.expandCellSize && this.table.setDefaultCellWidth(this.instWidth / this.table.colCount), this.updateTable(!0)), this
                }
            }]), f
        }();
    Object.assign(uf.prototype, af.GetBounds, rf);

    function cf(t, e, i, n, s, r) {
        var o;
        if (null != (o = void 0 === s ? n : i.pointToCellIndex(n, s))) {
            var a = i.getCellContainer(o);
            a && t.emit(e, a, o, r)
        }
    }

    var df = {v: 0, vertical: 0, h: 1, horizontal: 1}, ff = {update: 0, everyTick: 1}, pf = function (t) {
            var e = this.childrenMap.child, i = e.pointToCellIndex(t.x, t.y);
            if (i !== e.input.lastOverCellIndex) {
                var n = e.input.lastOverCellIndex;
                e.input.lastOverCellIndex = i, cf(this.eventEmitter, "cell.out", e, n, void 0, t), cf(this.eventEmitter, "cell.over", e, i, void 0, t)
            }
        }, vf = function (t) {
            var e = this.childrenMap.child, i = e.input.lastOverCellIndex;
            e.input.lastOverCellIndex = void 0, cf(this.eventEmitter, "cell.out", e, i, void 0, t)
        }, gf = Phaser.Utils.Objects.GetValue, yf = Phaser.Utils.Objects.GetValue, kf = function () {
            b(r, Yr);
            var s = w(r);

            function r(t, e) {
                var i;
                B(this, r);
                var n = Fr(t);
                return n === t && (t = void 0), (i = s.call(this, n, e)).scene = n, (i.gameObject = t) && t.setInteractive(yf(e, "inputConfig", void 0)), i._enable = void 0, i.resetFromJSON(e), i.boot(), i
            }

            return m(r, [{
                key: "resetFromJSON", value: function (t) {
                    return this.setEnable(yf(t, "enable", !0)), void 0 === this.gameObject ? this.bounds = yf(t, "bounds", void 0) : this.bounds = void 0, this.tracerState = mf, this.pointer = void 0, this.lastPointer = void 0, this.movedState = !1, this.isTouchingAnyObject = !1, this
                }
            }, {
                key: "boot", value: function () {
                    C(x(r.prototype), "boot", this).call(this), this.gameObject ? this.gameObject.on("pointerdown", this.onPointerDown, this) : this.scene.input.on("pointerdown", this.onPointerDown, this), this.scene.input.on("pointerup", this.onPointerUp, this), this.scene.input.on("pointermove", this.onPointerMove, this), this.scene.events.once("shutdown", this.destroy, this)
                }
            }, {
                key: "shutdown", value: function () {
                    this.gameObject ? this.gameObject.off("pointerdown", this.onPointerDown, this) : this.scene && this.scene.input.off("pointerdown", this.onPointerDown, this), this.scene && (this.scene.input.off("pointerup", this.onPointerUp, this), this.scene.input.off("pointermove", this.onPointerMove, this), this.scene.events.off("destroy", this.destroy, this), this.scene = void 0), this.scene = void 0, this.gameObject = void 0, this.bounds = void 0, this.pointer = void 0, this.lastPointer = void 0, this.movedState = !1, C(x(r.prototype), "shutdown", this).call(this)
                }
            }, {
                key: "enable", get: function () {
                    return this._enable
                }, set: function (t) {
                    if (this._enable !== t) return t || this.dragCancel(), this._enable = t, this
                }
            }, {
                key: "setEnable", value: function (t) {
                    return void 0 === t && (t = !0), this.enable = t, this
                }
            }, {
                key: "toggleEnable", value: function () {
                    return this.setEnable(!this.enable), this
                }
            }, {
                key: "onPointerDown", value: function (t, e) {
                    this.enable && void 0 === this.pointer && (this.bounds && !this.bounds.contains(t.x, t.y) || this.pointer === t || (this.pointer = t, this.lastPointer = t, this.movedState = !1, this.tracerState = bf, void 0 === this.gameObject && (this.isTouchingAnyObject = 0 < e.length), this.onDragStart()))
                }
            }, {
                key: "onPointerUp", value: function (t) {
                    this.enable && (this.bounds && !this.bounds.contains(t.x, t.y) || this.pointer !== t || (this.pointer = void 0, this.movedState = !1, this.tracerState = mf, this.onDragEnd()))
                }
            }, {
                key: "onPointerMove", value: function (t) {
                    if (this.enable && t.isDown) {
                        var e = !this.bounds || this.bounds.contains(t.x, t.y), i = this.pointer === t;
                        !i && e || (i && !e ? this.onPointerUp(t) : (this.movedState || (this.movedState = t.x !== t.downX || t.y !== t.downY), this.movedState && this.onDrag()))
                    }
                }
            }, {
                key: "dragCancel", value: function () {
                    return this.tracerState === bf && this.onDragEnd(), this.pointer = void 0, this.tracerState = mf, this
                }
            }, {
                key: "onDragStart", value: function () {
                    this.emit("dragstart", this)
                }
            }, {
                key: "onDragEnd", value: function () {
                    this.emit("dragend", this)
                }
            }, {
                key: "onDrag", value: function () {
                    this.emit("drag", this)
                }
            }, {
                key: "preUpdate", value: function () {
                }
            }, {
                key: "postUpdate", value: function () {
                }
            }, {
                key: "startTicking", value: function () {
                    C(x(r.prototype), "startTicking", this).call(this), this.scene.events.on("preupdate", this.preUpdate, this), this.scene.events.on("postupdate", this.postUpdate, this)
                }
            }, {
                key: "stopTicking", value: function () {
                    C(x(r.prototype), "stopTicking", this).call(this), this.scene && (this.scene.events.off("preupdate", this.preUpdate, this), this.scene.events.off("postupdate", this.postUpdate, this))
                }
            }, {
                key: "setRecongizedStateObject", value: function (t) {
                    return this.recongizedState = t, this
                }
            }, {
                key: "state", get: function () {
                    return this.recongizedState.state
                }, set: function (t) {
                    this.recongizedState.state = t
                }
            }, {
                key: "cancel", value: function () {
                    return this.state = xf, this
                }
            }]), r
        }(), mf = 0, bf = 1, xf = "IDLE", Cf = Phaser.Utils.Objects.GetValue, wf = Phaser.Math.Distance.Between,
        Sf = function () {
            b(o, kf);
            var r = w(o);

            function o(t, e) {
                var i;
                B(this, o);
                var n = z(i = r.call(this, t, e)), s = {
                    states: {
                        IDLE: {
                            enter: function () {
                                n.stop(), n.tapsCount = 0, n.x = 0, n.y = 0, n.worldX = 0, n.worldY = 0
                            }, exit: function () {
                                var t = n.lastPointer;
                                n.x = t.x, n.y = t.y, n.worldX = t.worldX, n.worldY = t.worldY
                            }
                        }, BEGIN: {
                            enter: function () {
                                n.start(), n.tapsCount = 0, n.emit("tappingstart", n, n.gameObject, n.lastPointer)
                            }
                        }, RECOGNIZED: {
                            enter: function () {
                                n.start(), n.emit("tap", n, n.gameObject, n.lastPointer), n.emit("".concat(n.tapsCount, "tap"), n, n.gameObject, n.lastPointer)
                            }
                        }
                    }, init: function () {
                        this.state = Pf
                    }, eventEmitter: !1
                };
                return i.setRecongizedStateObject(new xd(s)), i
            }

            return m(o, [{
                key: "resetFromJSON", value: function (t) {
                    C(x(o.prototype), "resetFromJSON", this).call(this, t), this.setMaxHoldTime(Cf(t, "time", 250)), this.setTapInterval(Cf(t, "tapInterval", 200)), this.setDragThreshold(Cf(t, "threshold", 9)), this.setTapOffset(Cf(t, "tapOffset", 10));
                    var e = Cf(t, "taps", void 0);
                    return void 0 !== e ? this.setTaps(e) : (this.setMaxTaps(Cf(t, "maxTaps", void 0)), this.setMinTaps(Cf(t, "minTaps", void 0))), this
                }
            }, {
                key: "onDragStart", value: function () {
                    switch (this.state) {
                        case Pf:
                            this.state = Tf;
                            break;
                        case Tf:
                            var t = this.lastPointer;
                            wf(t.upX, t.upY, t.x, t.y) > this.tapOffset && (this.state = Of, this.state = Tf);
                            break;
                        case Of:
                            this.state = Tf
                    }
                }
            }, {
                key: "onDragEnd", value: function () {
                    this.state === Tf && (this.tapsCount++, this.emit("tapping", this, this.gameObject, this.lastPointer), void 0 !== this.maxTaps && this.tapsCount === this.maxTaps && (this.state = Of))
                }
            }, {
                key: "onDrag", value: function () {
                    this.state !== Pf && this.pointer.getDistance() > this.dragThreshold && (this.state = Pf)
                }
            }, {
                key: "preUpdate", value: function (t) {
                    if (this.state === Tf) {
                        var e = this.lastPointer;
                        if (e.isDown) t - e.downTime > this.holdTime && (this.state = Pf); else t - e.upTime > this.tapInterval && (void 0 === this.minTaps || this.tapsCount >= this.minTaps ? this.state = Of : this.state = Pf)
                    }
                }
            }, {
                key: "postUpdate", value: function () {
                    this.state === Of && (this.state = Pf)
                }
            }, {
                key: "isTapped", get: function () {
                    return this.state === Of
                }
            }, {
                key: "setMaxHoldTime", value: function (t) {
                    return this.holdTime = t, this
                }
            }, {
                key: "setTapInterval", value: function (t) {
                    return this.tapInterval = t, this
                }
            }, {
                key: "setDragThreshold", value: function (t) {
                    return this.dragThreshold = t, this
                }
            }, {
                key: "setTapOffset", value: function (t) {
                    return this.tapOffset = t, this
                }
            }, {
                key: "setMaxTaps", value: function (t) {
                    return this.maxTaps = t, this
                }
            }, {
                key: "setMinTaps", value: function (t) {
                    return this.minTaps = t, this
                }
            }, {
                key: "setTaps", value: function (t, e) {
                    return void 0 === e && (e = t), this.setMinTaps(t).setMaxTaps(e), this
                }
            }]), o
        }(), Pf = "IDLE", Tf = "BEGIN", Of = "RECOGNIZED", Mf = Phaser.Utils.Objects.GetValue,
        _f = Phaser.Utils.Objects.GetValue, Ef = function () {
            b(o, kf);
            var r = w(o);

            function o(t, e) {
                var i;
                B(this, o);
                var n = z(i = r.call(this, t, e)), s = {
                    states: {
                        IDLE: {
                            enter: function () {
                                n.x = 0, n.y = 0, n.worldX = 0, n.worldY = 0
                            }, exit: function () {
                                var t = n.lastPointer;
                                n.x = t.x, n.y = t.y, n.worldX = t.worldX, n.worldY = t.worldY
                            }
                        }, BEGIN: {
                            enter: function () {
                                n.start()
                            }, exit: function () {
                                n.stop()
                            }
                        }, RECOGNIZED: {
                            enter: function () {
                                n.emit("pressstart", n, n.gameObject, n.lastPointer)
                            }, exit: function () {
                                n.emit("pressend", n, n.gameObject, n.lastPointer)
                            }
                        }
                    }, init: function () {
                        this.state = Bf
                    }, eventEmitter: !1
                };
                return i.setRecongizedStateObject(new xd(s)), i
            }

            return m(o, [{
                key: "resetFromJSON", value: function (t) {
                    return C(x(o.prototype), "resetFromJSON", this).call(this, t), this.setDragThreshold(_f(t, "threshold", 9)), this.setMinHoldTime(_f(t, "time", 251)), this
                }
            }, {
                key: "onDragStart", value: function () {
                    this.state = zf, 0 === this.holdTime && (this.state = jf)
                }
            }, {
                key: "onDragEnd", value: function () {
                    this.state = Bf
                }
            }, {
                key: "onDrag", value: function () {
                    this.state !== Bf && this.pointer.getDistance() > this.dragThreshold && (this.state = Bf)
                }
            }, {
                key: "preUpdate", value: function (t) {
                    this.state === zf && t - this.pointer.downTime >= this.holdTime && (this.state = jf)
                }
            }, {
                key: "isPressed", get: function () {
                    return this.state === jf
                }
            }, {
                key: "setDragThreshold", value: function (t) {
                    return this.dragThreshold = t, this
                }
            }, {
                key: "setMinHoldTime", value: function (t) {
                    return this.holdTime = t, this
                }
            }]), o
        }(), Bf = "IDLE", zf = "BEGIN", jf = "RECOGNIZED", Rf = Phaser.Utils.Objects.GetValue,
        Df = Phaser.Math.Distance.Between, Lf = Phaser.Math.Angle.Between, If = {
            getDt: function () {
                return this.scene.sys.game.loop.delta
            }, getVelocity: function () {
                var t = this.pointer.position, e = this.pointer.prevPosition;
                return Df(e.x, e.y, t.x, t.y) / (.001 * this.getDt())
            }, getVelocityX: function () {
                var t = this.pointer.position, e = this.pointer.prevPosition;
                return Math.abs(t.x - e.x) / (.001 * this.getDt())
            }, getVelocityY: function () {
                var t = this.pointer.position, e = this.pointer.prevPosition;
                return Math.abs(t.y - e.y) / (.001 * this.getDt())
            }, getVelocityAngle: function () {
                var t = this.pointer.position, e = this.pointer.prevPosition;
                return Lf(e.x, e.y, t.x, t.y)
            }
        }, Yf = {"up&down": 0, "left&right": 1, "4dir": 2, "8dir": 3}, Af = {}, Ff = Phaser.Utils.Objects.GetValue,
        Wf = Phaser.Math.RadToDeg, Vf = function () {
            b(o, kf);
            var r = w(o);

            function o(t, e) {
                var i;
                B(this, o);
                var n = z(i = r.call(this, t, e)), s = {
                    states: {
                        IDLE: {
                            enter: function () {
                                n.x = 0, n.y = 0, n.worldX = 0, n.worldY = 0
                            }, exit: function () {
                                var t = n.lastPointer;
                                n.x = t.x, n.y = t.y, n.worldX = t.worldX, n.worldY = t.worldY
                            }
                        }, BEGIN: {
                            enter: function () {
                                n.validDrag = !1
                            }
                        }, RECOGNIZED: {
                            enter: function () {
                                n.start(), n.updateDirectionStates(), n.emit("swipe", n, n.gameObject, n.lastPointer)
                            }, exit: function () {
                                n.stop(), n.clearDirectionStates()
                            }
                        }
                    }, init: function () {
                        this.state = Gf
                    }, eventEmitter: !1
                };
                return i.setRecongizedStateObject(new xd(s)), i.clearDirectionStates(), i
            }

            return m(o, [{
                key: "resetFromJSON", value: function (t) {
                    return C(x(o.prototype), "resetFromJSON", this).call(this, t), this.setDragThreshold(Ff(t, "threshold", 10)), this.setMinDragVelocity(Ff(t, "velocityThreshold", 1e3)), this.setDirectionMode(Ff(t, "dir", "8dir")), this
                }
            }, {
                key: "onDragStart", value: function () {
                    this.state = Hf
                }
            }, {
                key: "onDragEnd", value: function () {
                    this.state = Gf
                }
            }, {
                key: "onDrag", value: function () {
                    this.state === Hf && (this.validDrag || (this.validDrag = 0 === this.dragThreshold || this.pointer.getDistance() >= this.dragThreshold), this.validDrag && this.dragVelocity > this.minDragVelocity && (this.state = Uf))
                }
            }, {
                key: "postUpdate", value: function () {
                    this.state === Uf && (this.state = Gf)
                }
            }, {
                key: "isSwiped", get: function () {
                    return this.state === Uf
                }
            }, {
                key: "dragVelocity", get: function () {
                    var t;
                    switch (this.dirMode) {
                        case 0:
                            t = this.getVelocityY();
                            break;
                        case 1:
                            t = this.getVelocityX();
                            break;
                        default:
                            t = this.getVelocity()
                    }
                    return t
                }
            }, {
                key: "setDragThreshold", value: function (t) {
                    return this.dragThreshold = t, this
                }
            }, {
                key: "setMinDragVelocity", value: function (t) {
                    return this.minDragVelocity = t, this
                }
            }, {
                key: "setDirectionMode", value: function (t) {
                    return "string" == typeof t && (t = Yf[t]), this.dirMode = t, this
                }
            }, {
                key: "updateDirectionStates", value: function () {
                    return function (t, e, i) {
                        switch (void 0 === i ? i = {} : !0 === i && (i = Af), i.left = !1, i.right = !1, i.up = !1, i.down = !1, t = (t + 360) % 360, e) {
                            case 0:
                                t < 180 ? i.down = !0 : i.up = !0;
                                break;
                            case 1:
                                90 < t && t <= 270 ? i.left = !0 : i.right = !0;
                                break;
                            case 2:
                                45 < t && t <= 135 ? i.down = !0 : 135 < t && t <= 225 ? i.left = !0 : 225 < t && t <= 315 ? i.up = !0 : i.right = !0;
                                break;
                            case 3:
                                22.5 < t && t <= 67.5 ? (i.down = !0, i.right = !0) : 67.5 < t && t <= 112.5 ? i.down = !0 : 112.5 < t && t <= 157.5 ? (i.down = !0, i.left = !0) : 157.5 < t && t <= 202.5 ? i.left = !0 : 202.5 < t && t <= 247.5 ? (i.left = !0, i.up = !0) : 247.5 < t && t <= 292.5 ? i.up = !0 : (292.5 < t && t <= 337.5 && (i.up = !0), i.right = !0)
                        }
                    }(Wf(this.getVelocityAngle()), this.dirMode, this), this
                }
            }, {
                key: "clearDirectionStates", value: function () {
                    return this.left = !1, this.right = !1, this.up = !1, this.down = !1, this
                }
            }]), o
        }();
    Object.assign(Vf.prototype, If);

    function Xf(t, e) {
        t.setInteractive(), function (e) {
            e.on("pointerdown", function (t) {
                cf(this.eventEmitter, "cell.down", e, t.x, t.y, t)
            }, this).on("pointerup", function (t) {
                cf(this.eventEmitter, "cell.up", e, t.x, t.y, t)
            }, this)
        }.call(this, t, e), function (t) {
            t.on("pointermove", pf, this).on("pointerover", pf, this).on("pointerout", vf, this)
        }.call(this, t, e), function (t, e) {
            var i = gf(e, "button", void 0);
            !1 !== i && (void 0 === i && (i = {}), i.threshold = 10, t._click = new Qu(t, i), t._click.on("click", function (t, e, i) {
                cf(this.eventEmitter, "cell.click", e, i.x, i.y, i)
            }, this))
        }.call(this, t, e), function (t, e) {
            var i = Mf(e, "tap", void 0);
            !1 !== i && (t._tap = new Sf(t, i), t._tap.on("tap", function (t, e, i) {
                var n = "cell.".concat(t.tapsCount, "tap");
                cf(this.eventEmitter, n, t.gameObject, t.x, t.y, i)
            }, this))
        }.call(this, t, e), function (n, t) {
            var e = Rf(t, "press", void 0);
            !1 !== e && (n._press = new Ef(n, e), n._press.on("pressstart", function (t, e, i) {
                cf(this.eventEmitter, "cell.pressstart", n, t.x, t.y, i)
            }, this).on("pressend", function (t, e, i) {
                cf(this.eventEmitter, "cell.pressend", n, t.x, t.y, i)
            }, this))
        }.call(this, t, e), function (s, t) {
            var e = Nf(t, "swipe", void 0);
            !1 !== e && (void 0 === e && (e = {}), e.dir = "4dir", s._swipe = new Vf(s, e), s._swipe.on("swipe", function (t, e, i) {
                var n = t.left ? "left" : t.right ? "right" : t.up ? "up" : "down";
                cf(this.eventEmitter, "cell.swipe".concat(n), s, t.x, t.y, i)
            }, this))
        }.call(this, t, e)
    }

    var Gf = "IDLE", Hf = "BEGIN", Uf = "RECOGNIZED", Nf = Phaser.Utils.Objects.GetValue,
        Jf = Phaser.Utils.Objects.GetValue, Kf = function () {
            b(g, Dd);
            var v = w(g);

            function g(t, e) {
                var i;
                B(this, g), void 0 === e && (e = {});
                var n = kd(e), s = Jf(e, "table", void 0);
                void 0 === s && (s = {}), s.scrollMode = n, s.clamplTableOXY = Jf(e, "clamplChildOY", !1);
                var r, o, a, h = Jf(s, "width", void 0), l = Jf(s, "height", void 0), u = new uf(t, 0, 0, h, l, s);
                t.add.existing(u), o = 0 === n ? (r = void 0 === h ? 1 : 0, void 0 === l) : (r = void 0 === l ? 1 : 0, void 0 === h), a = u, Object.defineProperty(a, "childOY", {
                    configurable: !0,
                    get: function () {
                        return a.tableOY
                    },
                    set: function (t) {
                        a.tableOY = t
                    }
                }), Object.defineProperty(a, "topChildOY", {
                    get: function () {
                        return a.topTableOY
                    }
                }), Object.defineProperty(a, "bottomChildOY", {
                    get: function () {
                        return a.bottomTableOY
                    }
                }), e.type = "rexGridTable", e.child = {gameObject: u, proportion: r, expand: o};
                var c = Jf(e, "space", void 0);
                c && (c.child = c.table), (i = v.call(this, t, e)).addChildrenMap("table", u), i.eventEmitter = Jf(e, "eventEmitter", z(i));
                var d = Jf(e, "createCellContainerCallback", gt), f = Jf(e, "createCellContainerCallbackScope", void 0);
                i.setCreateCellContainerCallback(d, f), function (t) {
                    t.on("cellvisible", function (t, e, i) {
                        var n = this.createCellContainerCallback, s = this.createCellContainerCallbackScope;
                        t.item = this.items[t.index], (e = s ? n.call(s, t, e, i) : n(t, e, i)) && (e.setOrigin && e.setOrigin(0), e.isRexSizer && e.layout()), t.item = void 0, t.setContainer(e)
                    }, this)
                }.call(z(i), u), i.resizeControllerFlag = !1;
                var p = 0 === n ? "cellheightchange" : "cellwidthchange";
                return u.on(p, function () {
                    this.resizeControllerFlag = !0
                }, z(i)), Jf(s, "interactive", !0) && Xf.call(z(i), u, s), i.setItems(Jf(e, "items", [])), t.game.events.on("poststep", i.onPostStep, z(i)), i
            }

            return m(g, [{
                key: "destroy", value: function (t) {
                    this.scene && (this.scene.game.events.off("poststep", this.onPostStep, this), C(x(g.prototype), "destroy", this).call(this, t))
                }
            }, {
                key: "setCreateCellContainerCallback", value: function (t, e) {
                    return this.createCellContainerCallback = t, this.createCellContainerCallbackScope = e, this
                }
            }, {
                key: "refresh", value: function () {
                    return this.setItems(this.items), this
                }
            }, {
                key: "getCellContainer", value: function (t) {
                    return this.childrenMap.child.getCellContainer(t)
                }
            }, {
                key: "updateVisibleCell", value: function (t) {
                    return this.childrenMap.child.updateVisibleCell(t)
                }
            }, {
                key: "onPostStep", value: function () {
                    this.resizeControllerFlag && (this.resizeController(), this.resizeControllerFlag = !1)
                }
            }]), g
        }(), Zf = {
            setItems: function (t) {
                void 0 === t ? this.items.length = 0 : this.items = t;
                var e = this.childrenMap.child;
                return e.setCellsCount(this.items.length), e.updateTable(!0), this.resizeController(), this
            }
        };
    Object.assign(Kf.prototype, Zf), u.register("gridTable", function (t) {
        var e = new Kf(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.GridTable", Kf);

    function qf(t, e) {
        return t.sameOrientation ? t.orientation = e.orientation : t.orientation = 0 === e.orientation ? 1 : 0, t
    }

    var $f = {
        expandSubMenu: function (t, e) {
            var i;
            this.collapseSubMenu(), i = this.root.toggleOrientation ? 0 === this.orientation ? 1 : 0 : this.orientation;
            var n = new this.constructor(this.scene, {
                items: e,
                orientation: i,
                createBackgroundCallback: this.root.createBackgroundCallback,
                createBackgroundCallbackScope: this.root.createBackgroundCallbackScope,
                createButtonCallback: this.root.createButtonCallback,
                createButtonCallbackScope: this.root.createButtonCallbackScope,
                easeIn: this.root.easeIn,
                easeOut: this.root.easeOut,
                _rootMenu: this.root,
                _parentMenu: this,
                _parentButton: t
            });
            return this.pin(n), this.childrenMap.subMenu = n, this.root.emit("expand", n, t, this), this
        }, collapse: function () {
            return this.root.emit("collapse", this, this.parentButton, this.root), this.scaleDownDestroy(qf(this.root.easeOut, this)), this.collapseSubMenu(), this
        }, collapseSubMenu: function () {
            if (void 0 === this.childrenMap.subMenu) return this;
            var t = this.childrenMap.subMenu;
            return this.childrenMap.subMenu = void 0, this.remove(t), t.collapse(), this
        }
    }, Qf = Phaser.Utils.Objects.GetValue, tp = function () {
        b(P, xc);
        var S = w(P);

        function P(t, e) {
            var i;
            B(this, P), void 0 === e && (e = {}), e.hasOwnProperty("orientation") || (e.orientation = 1);
            var n, s, r, o, a, h = e._rootMenu, l = e._parentMenu, u = e._parentButton, c = Qf(e, "items", void 0),
                d = Qf(e, "createBackgroundCallback", void 0), f = Qf(e, "createBackgroundCallbackScope", void 0);
            e.background = (n = t, s = c, o = f, (r = d) && (s.scene = n, a = o ? r.call(o, s) : r(s), s.scene = void 0), a);
            var p = Qf(e, "createButtonCallback", void 0), v = Qf(e, "createButtonCallbackScope", void 0);
            e.buttons = function (t, e, i, n) {
                var s, r, o = [];
                if (e && i) for (var a = 0, h = e.length; a < h; a++) (s = e[a]).scene = t, r = n ? i.call(n, s, a, e) : i(s, a, e), s.scene = void 0, o.push(r);
                return o
            }(t, c, p, v), (i = S.call(this, t, e)).type = "rexMenu", i.items = c, i.root = void 0 === h ? z(i) : h, i.parentMenu = l, i.parentButton = u;
            var g = i.root === z(i);
            if (g) {
                var y = e.bounds;
                void 0 === y && (y = ca(t)), i.bounds = y, i.subMenuSide = [i.y < y.centerY ? rp : sp, i.x < y.centerX ? np : ip], void 0 !== (w = Qf(e, "subMenuSide", void 0)) && ("string" == typeof w && (w = op[w]), i.subMenuSide[i.orientation] = w), i.toggleOrientation = Qf(e, "toggleOrientation", !1), i.expandEventName = Qf(e, "expandEvent", "button.click"), i.easeIn = ep(z(i), Qf(e, "easeIn", 0)), i.easeOut = ep(z(i), Qf(e, "easeOut", 0)), i.createBackgroundCallback = d, i.createBackgroundCallbackScope = f, i.createButtonCallback = p, i.createButtonCallbackScope = v, i._isPassedEvent = !1
            }
            var k, m = 0, b = 0;
            if (!i.root.easeIn.sameOrientation) {
                var x = qf(i.root.easeIn, z(i)).orientation, C = l ? l.orientation : i.orientation,
                    w = i.root.subMenuSide[C];
                0 === x && w === ip && (m = 1), 1 === x && w === sp && (b = 1)
            }
            if (i.setOrigin(m, b).layout(), !g) switch (w = i.root.subMenuSide[l.orientation]) {
                case ip:
                    i.alignTop(u.top).alignRight(u.left);
                    break;
                case np:
                    i.alignTop(u.top).alignLeft(u.right);
                    break;
                case sp:
                    i.alignLeft(u.left).alignBottom(u.top);
                    break;
                case rp:
                    i.alignLeft(u.left).alignTop(u.bottom)
            }
            return i.pushIntoBounds(i.root.bounds), (k = z(i)).on(k.root.expandEventName, function (t, e) {
                if (!this._isPassedEvent) {
                    var i = this.items[e].children;
                    i && this.expandSubMenu(t, i)
                }
            }, k).on("button.click", function (t, e, i, n) {
                this !== this.root && (this.root._isPassedEvent = !0, this.root.emit("button.click", t, e, i, n), this.root._isPassedEvent = !1)
            }, k).on("button.over", function (t, e, i, n) {
                this !== this.root && (this.root._isPassedEvent = !0, this.root.emit("button.over", t, e, i, n), this.root._isPassedEvent = !1)
            }, k).on("button.out", function (t, e, i, n) {
                this !== this.root && (this.root._isPassedEvent = !0, this.root.emit("button.out", t, e, i, n), this.root._isPassedEvent = !1)
            }, k), i.popUp(qf(i.root.easeIn, z(i))), i.once("popup.complete", function () {
                this !== this.root && this.root.emit("popup.complete", this)
            }, z(i)), i
        }

        return m(P, [{
            key: "isInTouching", value: function (t) {
                return !!C(x(P.prototype), "isInTouching", this).call(this, t) || !!this.childrenMap.subMenu && this.childrenMap.subMenu.isInTouching(t)
            }
        }]), P
    }(), ep = function (t, e) {
        return "number" == typeof e && (e = {duration: e}), e.hasOwnProperty("orientation") && void 0 !== e.orientation ? e.sameOrientation = au(e.orientation) === t.orientation : e.sameOrientation = !0, e
    }, ip = 2, np = 0, sp = 3, rp = 1, op = {up: sp, down: rp, left: ip, right: np};
    Object.assign(tp.prototype, $f), u.register("menu", function (t) {
        var e = new tp(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.Menu", tp);

    function ap(t) {
        return t instanceof lp
    }

    function hp(t) {
        return t instanceof up
    }

    var lp = Phaser.GameObjects.Text, up = Phaser.GameObjects.BitmapText, cp = Phaser.Utils.Objects.GetValue,
        dp = Phaser.Math.Clamp, fp = function () {
            function i(t, e) {
                B(this, i), this.gameObject = t, this.scene = Fr(t), this.setTextObjectType(), this.lines = void 0, this.totalLinesCount = 0, this.resetFromJSON(e), this.boot()
            }

            return m(i, [{
                key: "resetFromJSON", value: function (t) {
                    return this.setMaxLines(cp(t, "maxLines", void 0)), this.setText(cp(t, "text", "")), this.setStartIdx(cp(t, "start", 0)), this.setPageIdx(cp(t, "page", -1)), this
                }
            }, {
                key: "toJSON", value: function () {
                    return {
                        maxLines: this.maxLines,
                        text: this.text,
                        start: this.startLineIdx,
                        page: this.pageIndex,
                        pageCount: this.pageCount
                    }
                }
            }, {
                key: "boot", value: function () {
                    this.gameObject.on("destroy", this.destroy, this)
                }
            }, {
                key: "shutdown", value: function () {
                    if (void 0 !== this.lines) switch (this.textObjectType) {
                        case 0:
                            this.lines.length = 0;
                            break;
                        case 1:
                            this.lines.destroy();
                            break;
                        case 2:
                            this.lines.length = 0
                    }
                    return this.gameObject = void 0, this.scene = void 0, this
                }
            }, {
                key: "destroy", value: function () {
                    this.shutdown()
                }
            }, {
                key: "setTextObjectType", value: function () {
                    return this.textObjectType = hp(this.gameObject) ? 2 : ap(this.gameObject) ? 0 : 1, this
                }
            }, {
                key: "isFirstPage", get: function () {
                    return this.pageIndex <= 0
                }
            }, {
                key: "isLastPage", get: function () {
                    return this.pageIndex >= this.pageCount - 1
                }
            }, {
                key: "setText", value: function (t, e) {
                    switch (void 0 === e && (e = !0), this.text = pp(t), this.textObjectType) {
                        case 0:
                            this.lines = this.gameObject.getWrappedText(this.text), this.totalLinesCount = this.lines.length;
                            break;
                        case 1:
                            this.lines = this.gameObject.getPenManager(this.text, this.lines), this.totalLinesCount = this.lines.linesCount;
                            break;
                        case 2:
                            this.lines = this.gameObject.setText(t).getTextBounds().wrappedText.split("\n"), this.totalLinesCount = this.lines.length
                    }
                    return this.pageCount = Math.ceil(this.totalLinesCount / this.pageLinesCount), e && this.resetPageIdx(), this
                }
            }, {
                key: "setMaxLines", value: function (t) {
                    return this.maxLines = t, this
                }
            }, {
                key: "appendText", value: function (t) {
                    return this.setText(this.text.concat(pp(t))), this
                }
            }, {
                key: "getPage", value: function (t) {
                    return void 0 === t && (t = this.pageIndex), this.setPageIdx(t).getLines()
                }
            }, {
                key: "getNextPage", value: function () {
                    return this.getPage(this.pageIndex + 1)
                }
            }, {
                key: "getPreviousPage", value: function () {
                    return this.getPage(this.pageIndex - 1)
                }
            }, {
                key: "showPage", value: function () {
                    return this.displayText(this.getPage()), this
                }
            }, {
                key: "showNextPage", value: function () {
                    return this.displayText(this.getNextPage()), this
                }
            }, {
                key: "showPreviousPage", value: function () {
                    return this.displayText(this.getPreviousPage()), this
                }
            }, {
                key: "show", value: function () {
                    return this.displayText(this.getLines()), this
                }
            }, {
                key: "showNextLine", value: function () {
                    return this.displayText(this.setStartIdx(this.startLineIdx + 1).getLines()), this
                }
            }, {
                key: "showPreviousLine", value: function () {
                    return this.displayText(this.setStartIdx(this.startLineIdx - 1).getLines()), this
                }
            }, {
                key: "setStartIdx", value: function (t) {
                    return t = dp(t, 0, this.totalLinesCount - 1), this.startLineIdx = t, this
                }
            }, {
                key: "resetPageIdx", value: function () {
                    this.pageIndex = -1
                }
            }, {
                key: "setPageIdx", value: function (t) {
                    return t = dp(t, 0, this.pageCount - 1), this.pageIndex = t, this.setStartIdx(this.pageIndex * this.pageLinesCount), this
                }
            }, {
                key: "pageLinesCount", get: function () {
                    if (void 0 !== this.maxLines) return this.maxLines;
                    var t;
                    switch (this.textObjectType) {
                        case 0:
                        case 1:
                            var e = this.gameObject.style.maxLines;
                            t = 0 < e ? e : this.totalLinesCount;
                            break;
                        case 2:
                            t = this.totalLinesCount
                    }
                    return t
                }
            }, {
                key: "getLines", value: function (t) {
                    void 0 === t && (t = this.startLineIdx);
                    var e, i = t + this.pageLinesCount;
                    switch (this.textObjectType) {
                        case 0:
                            e = this.lines.slice(t, i).join("\n");
                            break;
                        case 1:
                            var n = this.lines.getLineStartIndex(t), s = this.lines.getLineEndIndex(i - 1);
                            e = this.lines.getSliceTagText(n, s, !0);
                            break;
                        case 2:
                            e = this.lines.slice(t, i).join("\n")
                    }
                    return e
                }
            }, {
                key: "displayText", value: function (t) {
                    this.gameObject.setText(t)
                }
            }]), i
        }(), pp = function (t) {
            return Array.isArray(t) ? t = t.join("\n") : "number" == typeof t && (t = t.toString()), t
        }, vp = Phaser.Utils.Objects.GetFastValue, gp = Phaser.Utils.Objects.GetValue, yp = function () {
            function i(t, e) {
                B(this, i), this.gameObject = t, this.scene = Fr(t), this.setEventEmitter(gp(e, "eventEmitter", void 0)), this.timer = null, this.resetFromJSON(e), this.boot()
            }

            return m(i, [{
                key: "resetFromJSON", value: function (t) {
                    this.setTypeMode(gp(t, "typeMode", 0)), this.setTypeSpeed(gp(t, "speed", 333)), this.setTextCallback = vp(t, "setTextCallback", null), this.setTextCallbackScope = vp(t, "setTextCallbackScope", null), this.typingIdx = vp(t, "typingIdx", 0), this.text = kp(vp(t, "text", "")), this.textLen = vp(t, "textLen", 0), this.insertIdx = vp(t, "insertIdx", null);
                    var e = vp(t, "elapsed", null);
                    return null !== e && this.start(void 0, void 0, this.typingIdx, e), this
                }
            }, {
                key: "toJSON", value: function () {
                    var t, e = this.getTimer();
                    return t = e ? e.elapsed : null, {
                        typeMode: this.typeMode,
                        speed: this.speed,
                        setTextCallback: this.setTextCallback,
                        setTextCallbackScope: this.setTextCallbackScope,
                        typingIdx: this.typingIdx,
                        text: this.text,
                        textLen: this.textLen,
                        insertIdx: this.insertIdx,
                        elapsed: t
                    }
                }
            }, {
                key: "boot", value: function () {
                    return this.gameObject.once && this.gameObject.on("destroy", this.destroy, this), this
                }
            }, {
                key: "shutdown", value: function () {
                    return this.destroyEventEmitter(), this.freeTimer(), this.gameObject = void 0, this.scene = void 0, this
                }
            }, {
                key: "destroy", value: function () {
                    return this.shutdown(), this
                }
            }, {
                key: "setTypeMode", value: function (t) {
                    return "string" == typeof t && (t = mp[t]), this.typeMode = t, this
                }
            }, {
                key: "setTypeSpeed", value: function (t) {
                    return this.speed = t, this
                }
            }, {
                key: "isTyping", get: function () {
                    return null !== this.getTimer()
                }
            }, {
                key: "isLastChar", get: function () {
                    return this.typingIdx === this.textLen
                }
            }, {
                key: "start", value: function (t, e, i, n) {
                    return void 0 !== t && this.setTypingContent(t), void 0 !== e && (this.speed = e), void 0 === i && (i = 0), this.typingIdx = i + 1, 0 === this.speed ? this.stop(!0) : this.startTimer(n), this
                }
            }, {
                key: "appendText", value: function (t) {
                    var e = this.text.concat(kp(t));
                    return this.isTyping ? this.setTypingContent(e) : this.start(e, void 0, this.textLen), this
                }
            }, {
                key: "stop", value: function (t) {
                    return this.getTimer() && this.freeTimer(), t && (this.typingIdx = this.textLen, this.setText(this.text), this.emit("type"), this.emit("complete", this, this.gameObject)), this
                }
            }, {
                key: "pause", value: function () {
                    var t = this.getTimer();
                    return t && (t.paused = !0), this
                }
            }, {
                key: "resume", value: function () {
                    var t = this.getTimer();
                    return t && (t.paused = !1), this
                }
            }, {
                key: "setTypingContent", value: function (t) {
                    return this.text = kp(t), this.textLen = this.getTextLength(this.text), this
                }
            }, {
                key: "onTyping", value: function () {
                    var t = this.getTypingString(this.text, this.typingIdx, this.textLen, this.typeMode);
                    this.setText(t), this.emit("type"), this.isLastChar ? (this.freeTimer(), this.emit("complete", this, this.gameObject)) : (this.timer.delay = this.speed, this.typingIdx++)
                }
            }, {
                key: "getTypingString", value: function (t, e, i, n) {
                    var s;
                    if (0 === n) {
                        var r = 0, o = e;
                        this.insertIdx = o, s = this.getSubString(t, r, o)
                    } else if (1 === n) {
                        r = (o = i) - e;
                        this.insertIdx = 0, s = this.getSubString(t, r, o)
                    } else if (2 === n) {
                        var a = i / 2;
                        o = (r = Math.floor(a - e / 2)) + e;
                        this.insertIdx = e % 2 ? e : 0, s = this.getSubString(t, r, o)
                    } else if (3 === n) {
                        var h, l = Math.floor(e / 2);
                        if (0 < l) {
                            r = (o = i) - l;
                            h = this.getSubString(t, r, o)
                        } else h = "";
                        var u, c = e - l;
                        if (0 < c) {
                            o = (r = 0) + c;
                            this.insertIdx = o, u = this.getSubString(t, r, o)
                        } else u = "", this.insertIdx = 0;
                        s = u + h
                    }
                    return s
                }
            }, {
                key: "startTimer", value: function (t) {
                    var e;
                    return this.timer && this.freeTimer(), e = void 0 === t ? 0 : t, this.timer = this.scene.time.addEvent({
                        delay: 0,
                        startAt: e,
                        loop: !0,
                        callback: this.onTyping,
                        callbackScope: this
                    }), this
                }
            }, {
                key: "getTimer", value: function () {
                    return this.timer
                }
            }, {
                key: "freeTimer", value: function () {
                    return this.timer && (this.timer.remove(), this.timer = null), this
                }
            }, {
                key: "setText", value: function (t) {
                    this.setTextCallback && (t = this.setTextCallbackScope ? this.setTextCallback.call(this.setTextCallbackScope, t, this.isLastChar, this.insertIdx) : this.setTextCallback(t, this.isLastChar, this.insertIdx)), this.gameObject.setText(t)
                }
            }, {
                key: "getTextLength", value: function (t) {
                    var e = this.gameObject;
                    return e.getPlainText ? e.getPlainText(t).length : t.length
                }
            }, {
                key: "getSubString", value: function (t, e, i) {
                    var n = this.gameObject;
                    return n.getSubString ? n.getSubString(t, e, i) : t.slice(e, i)
                }
            }]), i
        }();
    Object.assign(yp.prototype, Gn);
    var kp = function (t) {
            return Array.isArray(t) ? t = t.join("\n") : "number" == typeof t && (t = t.toString()), t
        }, mp = {"left-to-right": 0, "right-to-left": 1, "middle-to-sides": 2, "sides-to-middle": 3},
        bp = Phaser.Utils.Objects.GetValue, xp = function () {
            b(r, Zu);
            var s = w(r);

            function r(t, e) {
                var i;
                B(this, r), void 0 === e && (e = {text: Cp(t)}), (i = s.call(this, t, e)).type = "rexTextBox";
                var n = i.childrenMap.text;
                return i.page = new fp(n, bp(e, "page", void 0)), i.typing = new yp(n, bp(e, "type", void 0)), i.typing.on("complete", i.onPageEnd, z(i)).on("type", i.onType, z(i)), i.textWidth = n.width, i.textHeight = n.height, i
            }

            return m(r, [{
                key: "start", value: function (t, e) {
                    return this.page.setText(t), void 0 !== e && this.setTypeSpeed(e), this.typeNextPage(), this
                }
            }, {
                key: "typeNextPage", value: function () {
                    if (this.page.isLastPage) this.emit("complete"); else {
                        var t = this.page.getNextPage();
                        this.typing.start(t)
                    }
                    return this
                }
            }, {
                key: "pause", value: function () {
                    return this.typing.pause(), this
                }
            }, {
                key: "resume", value: function () {
                    return this.typing.resume(), this
                }
            }, {
                key: "stop", value: function (t) {
                    return this.typing.stop(t), this
                }
            }, {
                key: "setTypeSpeed", value: function (t) {
                    return this.typing.setTypeSpeed(t), this
                }
            }, {
                key: "isTyping", get: function () {
                    return this.typing.isTyping
                }
            }, {
                key: "isLastPage", get: function () {
                    return this.page.isLastPage
                }
            }, {
                key: "isFirstPage", get: function () {
                    return this.page.isFirstPage
                }
            }, {
                key: "pageCount", get: function () {
                    return this.page.pageCount
                }
            }, {
                key: "pageIndex", get: function () {
                    return this.page.pageIndex
                }
            }, {
                key: "onType", value: function () {
                    var t = this.childrenMap.text;
                    this.textWidth === t.width && this.textHeight === t.height || (this.textWidth = t.width, this.textHeight = t.height, this.getTopmostSizer().layout()), this.emit("type")
                }
            }, {
                key: "onPageEnd", value: function () {
                    this.emit("pageend")
                }
            }]), r
        }(), Cp = function (t) {
            return t.add.text(0, 0, "", {wordWrap: {width: 200}, maxLines: 5})
        };
    u.register("textBox", function (t) {
        var e = new xp(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.TextBox", xp);
    var wp = Phaser.Utils.Objects.GetValue, Sp = function () {
        b(g, cu);
        var v = w(g);

        function g(t, e) {
            var i;
            B(this, g), (i = v.call(this, t, e)).type = "rexNumberBar";
            var n, s = wp(e, "background", void 0), r = wp(e, "icon", void 0), o = wp(e, "iconMask", void 0),
                a = wp(e, "slider", void 0), h = wp(e, "text", void 0), l = wp(e, "space.icon", 0),
                u = wp(e, "space.slider", 0);
            s && i.addBackground(s), r && (0 === i.orientation ? (a || h) && (c = {right: l}) : (a || h) && (c = {bottom: l}), i.add(r, 0, "center", c), o = o && i.addChildMask(r, r, 1));
            if (a) {
                var c, d;
                if (a.orientation = i.orientation, a.eventEmitter = z(i), a.value = null, a.hasOwnProperty("input") || (a.input = -1), n = new vd(t, a), 0 === i.orientation ? h && (c = {right: u}) : h && (c = {bottom: u}), 0 === i.orientation) d = void 0 === wp(a, "width", void 0) ? 1 : 0; else d = void 0 === wp(a, "height", void 0) ? 1 : 0;
                i.add(n, d, "center", c)
            }
            h && i.add(h), i.addChildrenMap("background", s), i.addChildrenMap("icon", r), i.addChildrenMap("iconMask", o), i.addChildrenMap("slider", n), i.addChildrenMap("text", h);
            var f = wp(e, "valuechangeCallback", null);
            if (null !== f) {
                var p = wp(e, "valuechangeCallbackScope", void 0);
                i.on("valuechange", f, p)
            }
            return i.setEnable(wp(e, "enable", void 0)), i.setValue(wp(e, "value", 0)), i
        }

        return m(g, [{
            key: "setEnable", value: function (t) {
                return this.childrenMap.slider && this.childrenMap.slider.setEnable(t), this
            }
        }, {
            key: "value", get: function () {
                return this.childrenMap.slider ? this.childrenMap.slider.value : 0
            }, set: function (t) {
                this.childrenMap.slider && (this.childrenMap.slider.value = t)
            }
        }, {
            key: "setValue", value: function (t, e, i) {
                return this.childrenMap.slider && this.childrenMap.slider.setValue(t, e, i), this
            }
        }, {
            key: "addValue", value: function (t, e, i) {
                return this.childrenMap.slider && this.childrenMap.slider.addValue(t, e, i), this
            }
        }, {
            key: "getValue", value: function (t, e) {
                return this.childrenMap.slider ? this.childrenMap.slider.getValue(t, e) : 0
            }
        }, {
            key: "easeValueTo", value: function (t, e, i) {
                return this.childrenMap.slider && this.childrenMap.slider.easeValueTo(t, e, i), this
            }
        }, {
            key: "text", get: function () {
                var t = this.childrenMap.text;
                return void 0 === t ? "" : t.text ? t.text : t.getData("text")
            }, set: function (t) {
                var e = this.childrenMap.text;
                void 0 !== e && (e.setText ? e.setText(t) : e.setData("text", t))
            }
        }, {
            key: "setText", value: function (t) {
                return this.text = t, this
            }
        }]), g
    }(), Pp = {addChildMask: Hu};
    Object.assign(Sp.prototype, Pp), u.register("numberBar", function (t) {
        var e = new Sp(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.NumberBar", Sp);
    var Tp = Phaser.Utils.Objects.GetValue, Op = {
        leftTop: "left-top",
        centerTop: "center-top",
        rightTop: "right-top",
        leftCenter: "left-center",
        center: "center",
        rightCenter: "right-center",
        leftBottom: "left-bottom",
        centerBottom: "center-bottom",
        rightBottom: "right-bottom"
    }, Mp = function () {
        b(h, nl);
        var a = w(h);

        function h(t, e) {
            var i;
            B(this, h), (i = a.call(this, t, e)).type = "rexBadge";
            var n = Tp(e, "background", void 0);
            n && i.addBackground(n), i.addChildrenMap("background", n);
            var s = Tp(e, "main", void 0);
            for (var r in s && i.add(s, {key: "main", align: "center", expand: !1}), i.addChildrenMap("main", s), Op) {
                var o = Tp(e, r, void 0);
                o && (i.add(o, {key: r, align: Op[r], expand: !1}), i.addChildrenMap(r, o))
            }
            return i
        }

        return h
    }();
    u.register("badgeLabel", function (t) {
        var e = new Mp(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.BadgeLabel", Mp);
    var _p = Ni.prototype.setChildVisible, Ep = {
        addPage: function (t, e, i, n, s) {
            return t.setVisible(!1), this.add(t, e, i, n, s), this
        }, getPage: function (t) {
            return void 0 !== t && this.sizerChildren.hasOwnProperty(t) ? this.sizerChildren[t] : null
        }, swapPage: function (t) {
            this._previousKey = this._currentKey;
            var e = this.previousPage;
            e && (0 === this.swapMode ? (_p.call(this, e, !1), this.emit("pageinvisible", e, this._previousKey, this)) : e.destroy()), t && !this.sizerChildren.hasOwnProperty(t) && this.emit("createpage", t, this), this._currentKey = t;
            var i = this.currentPage;
            return i && (_p.call(this, i, !0), this.emit("pagevisible", i, this._currentKey, this)), this
        }
    }, Bp = Phaser.Utils.Objects.GetValue, zp = function () {
        b(s, nl);
        var n = w(s);

        function s(t, e) {
            var i;
            return B(this, s), (i = n.call(this, t, e)).type = "rexPages", i.childrenMap = i.sizerChildren, i._previousKey = void 0, i._currentKey = void 0, i.setSwapMode(Bp(e, "swapMode", 0)), i
        }

        return m(s, [{
            key: "setSwapMode", value: function (t) {
                return "string" == typeof t && (t = jp[t]), this.swapMode = t, this
            }
        }, {
            key: "previousKey", get: function () {
                return this._previousKey
            }
        }, {
            key: "currentKey", get: function () {
                return this._currentKey
            }, set: function (t) {
                this.swapPage(t)
            }
        }, {
            key: "currentPage", get: function () {
                return this.getPage(this.currentKey)
            }
        }, {
            key: "previousPage", get: function () {
                return this.getPage(this.previousKey)
            }
        }, {
            key: "keys", get: function () {
                return Object.keys(this.sizerChildren)
            }
        }]), s
    }();
    Object.assign(zp.prototype, Ep);
    var jp = {invisible: 0, destroy: 1};
    u.register("pages", function (t) {
        var e = new zp(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.Pages", zp);

    function Rp(t) {
        return (t - this.textLineSpacing) / (this.textLineHeight + this.textLineSpacing)
    }

    function Dp(t) {
        return t * (this.textLineHeight + this.textLineSpacing) - this.textLineSpacing
    }

    function Lp() {
        var t = this.textObject.rexSizer;
        this.textObject.y += t.offsetY - t.preOffsetY, t.preOffsetY = t.offsetY, this.resetChildPositionState(this.textObject)
    }

    var Ip = {
            addChildMask: Hu, setText: function (t) {
                switch (void 0 !== t && (this.text = t), this.textObjectType) {
                    case 0:
                        this.lines = this.textObject.getWrappedText(this.text), this.linesCount = this.lines.length;
                        break;
                    case 1:
                        this.lines = this.textObject.getPenManager(this.text, this.lines), this.linesCount = this.lines.linesCount;
                        break;
                    case 2:
                        this.lines = this.textObject.setText(this.text).getTextBounds().wrappedText.split("\n"), this.linesCount = this.lines.length
                }
                return this._textHeight = void 0, this._textVisibleHeight = void 0, this.updateTextObject(), this
            }, updateTextObject: function () {
                var t = Math.max(Math.floor(Rp.call(this, -this.textOY)), 0), e = Dp.call(this, t) + this.textOY;
                return this.textObject.setText(function (t) {
                    var e, i = t + this.visibleLinesCount;
                    switch (this.textObjectType) {
                        case 0:
                            e = this.lines.slice(t, i).join("\n");
                            break;
                        case 1:
                            var n = this.lines.getLineStartIndex(t), s = this.lines.getLineEndIndex(i - 1);
                            e = this.lines.getSliceTagText(n, s, !0);
                            break;
                        case 2:
                            e = this.lines.slice(t, i).join("\n")
                    }
                    return e
                }.call(this, t)), this.textObject.rexSizer.offsetY = e, Lp.call(this), this
            }, preLayout: function () {
                return this._textLineHeight = void 0, this._textLineSpacing = void 0, this._visibleLinesCount = void 0, this._textHeight = void 0, this._textVisibleHeight = void 0, Ga.call(this), this
            }, layoutChildren: function () {
                var t, e, i, n, s, r, o, a = this.left, h = this.top;
                (t = this.textObject).rexSizer.hidden || (n = a + (i = (e = t.rexSizer).padding).left, s = h + i.top, r = this.width - i.left - i.right, o = this.height - i.top - i.bottom, function (t, e, i) {
                    if (i += this.textLineHeight + this.textLineSpacing, this.textObjectWidth !== e || this.textObjectHeight !== i) {
                        switch (this.textObjectWidth = e, this.textObjectHeight = i, this.textObjectType) {
                            case 0:
                            case 1:
                                t.setFixedSize(e, i);
                                var n = t.style, s = Math.max(e, 0);
                                0 === this.textObjectType ? n.wordWrapWidth = s : (0 === n.wrapMode && (n.wrapMode = 1), n.wrapWidth = s);
                                break;
                            case 2:
                                t.setMaxWidth(e)
                        }
                        this.setText()
                    }
                }.call(this, t, r, o), va.setPosition(n, s).setSize(r, o), Aa(t, va, e.align), e.preOffsetY = 0, Lp.call(this), this.textMask && (this.textMask.setPosition().resize(), this.resetChildPositionState(this.textMask)))
            }
        }, Yp = Phaser.Utils.Objects.IsPlainObject, Ap = Phaser.Utils.Objects.GetValue, Fp = Phaser.Display.Align.TOP_LEFT,
        Wp = function () {
            b(d, Hh);
            var c = w(d);

            function d(t, e, i, n, s, r) {
                var o;
                B(this, d), Yp(e) ? (e = Ap(r = e, "x", 0), i = Ap(r, "y", 0), n = Ap(r, "width", void 0), s = Ap(r, "height", void 0)) : Yp(n) && (n = Ap(r = n, "width", void 0), s = Ap(r, "height", void 0)), (o = c.call(this, t, e, i, n, s, r)).type = "rexTextBlock", o.textObject = void 0, o.linesCount = 0, o.textMask = void 0, o.textObjectType = void 0, o._textLineHeight = void 0, o._textLineSpacing = void 0, o._visibleLinesCount = void 0, o._textHeight = void 0, o._textVisibleHeight = void 0, o.lines = void 0, o.text = Ap(r, "content", ""), o._textOY = 0, o.execeedTopState = !1, o.execeedBottomState = !1, o.setClampMode(Ap(r, "clamplTextOY", !0));
                var a = Ap(r, "background", void 0), h = Ap(r, "text", void 0);
                void 0 === h && (h = Vp(t));
                var l = Ap(r, "textMask", !0);
                a && o.addBackground(a), o.add(h), o.sizerChildren = [h];
                var u = o.getSizerConfig(h);
                return u.align = Fp, u.padding = Fa(0), u.expand = !0, o.textObject = h, o.textObjectType = hp(h) ? 2 : ap(h) ? 0 : 1, u.preOffsetY = 0, u.offsetY = 0, l && (o.textMask = o.addChildMask(o.textObject, z(o))), o.addChildrenMap("background", a), o.addChildrenMap("text", h), o
            }

            return m(d, [{
                key: "destroy", value: function (t) {
                    if (this.scene) {
                        if (this.textObject = void 0, (this.textMask = void 0) !== this.lines) switch (this.textObjectType) {
                            case 0:
                                this.lines.length = 0;
                                break;
                            case 1:
                                this.lines.destroy();
                                break;
                            case 2:
                                this.lines.length = 0
                        }
                        C(x(d.prototype), "destroy", this).call(this, t)
                    }
                }
            }, {
                key: "setClampMode", value: function (t) {
                    return void 0 === t && (t = !0), this.clampTextOY = t, this
                }
            }, {
                key: "textLineHeight", get: function () {
                    if (void 0 === this._textLineHeight) {
                        var t;
                        switch (this.textObjectType) {
                            case 0:
                            case 1:
                                var e = this.textObject.style;
                                t = e.metrics.fontSize + e.strokeThickness;
                                break;
                            case 2:
                                var i = this.textObject.fontSize / this.textObject.fontData.size;
                                t = this.textObject.fontData.lineHeight * i
                        }
                        this._textLineHeight = t
                    }
                    return this._textLineHeight
                }
            }, {
                key: "textLineSpacing", get: function () {
                    if (void 0 === this._textLineSpacing) {
                        var t;
                        switch (this.textObjectType) {
                            case 0:
                            case 1:
                                t = this.textObject.lineSpacing;
                                break;
                            case 2:
                                t = 0
                        }
                        this._textLineSpacing = t
                    }
                    return this._textLineSpacing
                }
            }, {
                key: "visibleLinesCount", get: function () {
                    return void 0 === this._visibleLinesCount && (this._visibleLinesCount = Math.floor(Rp.call(this, this.textObjectHeight))), this._visibleLinesCount
                }
            }, {
                key: "topTextOY", get: function () {
                    return 0
                }
            }, {
                key: "bottomTextOY", get: function () {
                    return -this.textVisibleHeight
                }
            }, {
                key: "textHeight", get: function () {
                    return void 0 === this._textHeight && (this._textHeight = Dp.call(this, this.linesCount)), this._textHeight
                }
            }, {
                key: "textVisibleHeight", get: function () {
                    if (void 0 === this._textVisibleHeight) {
                        var t, e = this.textHeight,
                            i = this.textObjectHeight - this.textLineHeight - this.textLineSpacing;
                        t = i < e ? e - i : 0, this._textVisibleHeight = t
                    }
                    return this._textVisibleHeight
                }
            }, {
                key: "textOYExceedTop", value: function (t) {
                    return void 0 === t && (t = this.textOY), t > this.topTextOY
                }
            }, {
                key: "textOYExeceedBottom", value: function (t) {
                    return void 0 === t && (t = this.textOY), t < this.bottomTextOY
                }
            }, {
                key: "textOY", get: function () {
                    return this._textOY
                }, set: function (t) {
                    var e = this.topTextOY, i = this.bottomTextOY, n = this.textOYExceedTop(t),
                        s = this.textOYExeceedBottom(t);
                    this.clampTextOY && (this.visibleLinesCount > this.linesCount ? t = 0 : n ? t = e : s && (t = i)), this._textOY !== t && (this._textOY = t, this.updateTextObject()), n && (this.execeedTopState || this.emit("execeedtop", this, t, e)), this.execeedTopState = n, s && (this.execeedBottomState || this.emit("execeedbottom", this, t, i)), this.execeedBottomState = s
                }
            }, {
                key: "setTextOY", value: function (t) {
                    return this.textOY = t, this
                }
            }, {
                key: "t", get: function () {
                    var t = this.textVisibleHeight;
                    return 0 === t ? 0 : this.textOY / -t
                }, set: function (t) {
                    this.textOY = -this.textVisibleHeight * t
                }
            }, {
                key: "setTextOYByPercentage", value: function (t) {
                    return this.t = t, this
                }
            }]), d
        }(), Vp = function (t) {
            return t.add.text(0, 0, "")
        };
    Object.assign(Wp.prototype, Ip);
    var Xp = Phaser.Utils.Objects.GetValue, Gp = function () {
        b(p, Dd);
        var f = w(p);

        function p(t, e) {
            var i;
            B(this, p), void 0 === e && (e = {});
            var n = Xp(e, "text", void 0), s = Xp(e, "textWidth", void 0), r = Xp(e, "textHeight", void 0),
                o = Xp(e, "textMask", !0), a = Xp(e, "content", ""), h = new Wp(t, {
                    width: s,
                    height: r,
                    text: n,
                    textMask: o,
                    content: a,
                    clamplTextOY: Xp(e, "clamplChildOY", !1)
                });
            t.add.existing(h);
            var l, u = void 0 === s ? 1 : 0, c = void 0 === r;
            l = h, Object.defineProperty(l, "childOY", {
                configurable: !0, get: function () {
                    return l.textOY
                }, set: function (t) {
                    l.textOY = t
                }
            }), Object.defineProperty(l, "topChildOY", {
                get: function () {
                    return l.topTextOY
                }
            }), Object.defineProperty(l, "bottomChildOY", {
                get: function () {
                    return l.bottomTextOY
                }
            }), e.scrollMode = 0, e.type = "rexTextArea", e.child = {gameObject: h, proportion: u, expand: c};
            var d = Xp(e, "space", void 0);
            return d && (d.child = d.text), (i = f.call(this, t, e)).addChildrenMap("text", n), i
        }

        return m(p, [{
            key: "text", get: function () {
                return this.childrenMap.child.text
            }
        }, {
            key: "linesCount", get: function () {
                return this.childrenMap.child.linesCount
            }
        }, {
            key: "contentHeight", get: function () {
                return this.childrenMap.child.textHeight
            }
        }]), p
    }(), Hp = {
        setText: function (t) {
            return this.childrenMap.child.setText(t), this.resizeController(), this
        }, appendText: function (t) {
            return this.setText(this.text + t), this
        }
    };
    Object.assign(Gp.prototype, Hp), u.register("textArea", function (t) {
        var e = new Gp(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.TextArea", Gp);
    var Up = {update: 0, everyTick: 1}, Np = {
        setMaskUpdateMode: function (t) {
            return "string" == typeof t && (t = Up[t]), this.maskUpdateMode = t, this
        }, startMaskUpdate: function () {
            this.scene.game.events.on("poststep", this.maskChildren, this)
        }, stopMaskUpdate: function () {
            this.scene.game.events.off("poststep", this.maskChildren, this)
        }, addChildMask: Hu, enableChildrenMask: function (t) {
            var e = this.addChildMask(null, this, 0, t);
            return this.childrenMask = e.createGeometryMask(), this
        }, setMaskChildrenFlag: function (t) {
            return void 0 === t && (t = !0), this.maskChildrenFlag = t, this
        }, maskChildren: function () {
            return this.childrenMask && this.maskChildrenFlag && 0 !== this.alpha && this.visible && (Ad(this, this.childrenMask, this.getAllChildren()), 0 === this.maskUpdateMode && (this.maskChildrenFlag = !1)), this
        }, layoutChildrenMask: function () {
            if (void 0 === this.childrenMask) return this;
            var t = Yd(this.childrenMask);
            return t.setPosition().resize(), this.resetChildPositionState(t), this
        }
    }, Jp = {
        getChildrenWidth: function () {
            if (this.rexSizer.hidden) return 0;
            var t = this.child;
            return !t.rexSizer.hidden && 0 === this.scrollMode ? this.getChildWidth(t) : 0
        }, getChildrenHeight: function () {
            if (this.rexSizer.hidden) return 0;
            var t = this.child;
            return t.rexSizer.hidden || 0 === this.scrollMode ? 0 : t.isRexSizer ? Math.max(t.minHeight, t.childrenHeight) : t.hasOwnProperty("minHeight") ? t.minHeight : ya(t)
        }, getChildrenSizers: function (t) {
            return void 0 === t && (t = []), this.child && this.child.isRexSizer && t.push(this.child), t
        }, resetChildPosition: function () {
            var t = this.left, e = this.top;
            0 === this.scrollMode ? e += this.childOY : t += this.childOY, this.child.setPosition(t, e), this.resetChildPositionState(this.child), this.setMaskChildrenFlag()
        }, layoutChildren: function () {
            var t, e, i = this.child;
            i.rexSizer.hidden || (0 === this.scrollMode ? t = this.width : e = this.height, i.isRexSizer ? i.runLayout(this, t, e) : eh(i, t, e), this.layoutChildrenMask(), this.resetChildPosition(), this.maskChildren())
        }
    };
    Object.assign(Jp, Np);
    var Kp = Phaser.Utils.Objects.IsPlainObject, Zp = Phaser.Utils.Objects.GetValue, qp = Phaser.Display.Align.TOP_LEFT,
        $p = function () {
            b(v, Hh);
            var p = w(v);

            function v(t, e, i, n, s, r) {
                var o;
                B(this, v), Kp(e) ? (e = Zp(r = e, "x", 0), i = Zp(r, "y", 0), n = Zp(r, "width", void 0), s = Zp(r, "height", void 0)) : Kp(n) && (n = Zp(r = n, "width", void 0), s = Zp(r, "height", void 0)), (o = p.call(this, t, e, i, n, s, r)).type = "rexScrollableBlock", o.child = void 0, o.childrenMask = void 0, o._childOY = 0, o.execeedTopState = !1, o.execeedBottomState = !1, o.setScrollMode(Zp(r, "scrollMode", !0)), o.setClampMode(Zp(r, "clamplChildOY", !0));
                var a = Zp(r, "child", void 0), h = Zp(r, "expand", !0), l = Zp(r, "mask", void 0);
                a.setOrigin && a.setOrigin(0), o.add(a), o.sizerChildren = [a];
                var u, c, d, f = o.getSizerConfig(a);
                return f.align = qp, f.expand = h, o.child = a, !0 === l ? (u = !0, d = c = 0) : !1 === l ? u = !1 : (u = Zp(l, "mask", !0), c = Zp(l, "padding", 0), d = Zp(r, "updateMode", 0)), u && (o.setMaskUpdateMode(d), o.enableChildrenMask(c), o.startMaskUpdate()), o
            }

            return m(v, [{
                key: "destroy", value: function (t) {
                    this.scene && (this.childrenMask && this.stopMaskUpdate(), this.child = void 0, this.childrenMask && (this.childrenMask.destroy(), this.childrenMask = void 0), C(x(v.prototype), "destroy", this).call(this, t))
                }
            }, {
                key: "setScrollMode", value: function (t) {
                    return "string" == typeof t && (t = md[t.toLowerCase()]), this.scrollMode = t, this
                }
            }, {
                key: "setClampMode", value: function (t) {
                    return void 0 === t && (t = !0), this.clampChildOY = t, this
                }
            }, {
                key: "instHeight", get: function () {
                    return 0 === this.scrollMode ? this.height : this.width
                }
            }, {
                key: "instWidth", get: function () {
                    return 0 === this.scrollMode ? this.width : this.height
                }
            }, {
                key: "childHeight", get: function () {
                    return (0 === this.scrollMode ? ya : ga)(this.child)
                }
            }, {
                key: "childWidth", get: function () {
                    return (0 === this.scrollMode ? ga : ya)(this.child)
                }
            }, {
                key: "topChildOY", get: function () {
                    return 0
                }
            }, {
                key: "bottomChildOY", get: function () {
                    return -this.visibleHeight
                }
            }, {
                key: "visibleHeight", get: function () {
                    var t = this.childHeight, e = this.instHeight;
                    return e < t ? t - e : 0
                }
            }, {
                key: "childOYExceedTop", value: function (t) {
                    return void 0 === t && (t = this.childOY), t > this.topChildOY
                }
            }, {
                key: "childOYExeceedBottom", value: function (t) {
                    return void 0 === t && (t = this.childOY), t < this.bottomChildOY
                }
            }, {
                key: "childOY", get: function () {
                    return this._childOY
                }, set: function (t) {
                    var e = this.topChildOY, i = this.bottomChildOY, n = this.childOYExceedTop(t),
                        s = this.childOYExeceedBottom(t);
                    this.clampChildOY && (this.instHeight > this.childHeight ? t = 0 : n ? t = e : s && (t = i)), this._childOY !== t && (this._childOY = t, this.resetChildPosition()), n && (this.execeedTopState || this.emit("execeedtop", this, t, e)), this.execeedTopState = n, s && (this.execeedBottomState || this.emit("execeedbottom", this, t, i)), this.execeedBottomState = s
                }
            }, {
                key: "setChildOY", value: function (t) {
                    return this.childOY = t, this
                }
            }, {
                key: "t", get: function () {
                    var t = this.visibleHeight;
                    return 0 === t ? 0 : this.childOY / -t
                }, set: function (t) {
                    this.childOY = -this.visibleHeight * t
                }
            }, {
                key: "setChildOYByPercentage", value: function (t) {
                    return this.t = t, this
                }
            }]), v
        }();
    Object.assign($p.prototype, Jp);
    var Qp = Phaser.Utils.Objects.GetValue, tv = function () {
        b(d, Dd);
        var c = w(d);

        function d(t, e) {
            var i;
            B(this, d), void 0 === e && (e = {});
            var n = kd(e), s = Qp(e, "panel", void 0);
            void 0 === s && (s = {}), s.scrollMode = n, s.clamplChildOY = Qp(e, "clamplChildOY", !1);
            var r = new $p(t, s);
            t.add.existing(r);
            var o, a, h = Qp(s, "width", void 0), l = Qp(s, "height", void 0);
            a = 0 === n ? (o = void 0 === h ? 1 : 0, void 0 === l) : (o = void 0 === l ? 1 : 0, void 0 === h), e.type = "rexScrollablePanel", e.child = {
                gameObject: r,
                proportion: o,
                expand: a
            };
            var u = Qp(e, "space", void 0);
            return u && (u.child = u.panel), (i = c.call(this, t, e)).addChildrenMap("panel", i.childrenMap.child.child), i
        }

        return d
    }();
    u.register("scrollablePanel", function (t) {
        var e = new tv(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.ScrollablePanel", tv);

    function ev(t, e, i, n) {
        void 0 === i && (i = 0), void 0 === n && (n = e.length), t.length = n - i;
        for (var s = 0, r = t.length; s < r; s++) t[s] = e[s + i];
        return t
    }

    function iv(t, e, i) {
        var n, s = hv(i, "reverse", !1);
        if (Pi(t[0])) if (s) for (r = (o = t.length) - 1; 0 <= r; r--) n = iv(t[r], e, i); else for (var r = 0, o = t.length; r < o; r++) n = iv(t[r], e, i); else n = lv(t, e, i);
        return n
    }

    var nv = {popUp: 0, fadeIn: 1, scaleDown: 0, fadeOut: 1}, sv = function (t, e) {
        t.popUp(e)
    }, rv = function (t, e) {
        t.scaleDown(e)
    }, ov = function (t, e) {
        t.fadeIn(e)
    }, av = function (t, e) {
        t.fadeOut(e)
    }, hv = Phaser.Utils.Objects.GetValue, lv = function (t, e, i) {
        var n, s = hv(i, "argsConvert", void 0), r = hv(i, "argsConvertScope", void 0), o = t[0];
        if (uv = ev(uv, t, 1), s) {
            !0 === s && (s = Vn, r = void 0);
            for (var a = 0, h = uv.length; a < h; a++) uv[a] = r ? s.call(r, uv[a], t) : s(uv[a], t)
        }
        return "string" == typeof o ? null == (n = e[o]) && (n = hv(e, o, null)) : n = o, n.apply(e, uv)
    }, uv = [], cv = Phaser.Utils.Objects.GetValue, dv = function () {
        function n(t, e) {
            B(this, n), this.parent = t, this.scene = Fr(t), this.setEventEmitter(cv(e, "eventEmitter", void 0));
            var i = cv(e, "clockClass", Ur);
            this.clock = new i(t, {eventEmitter: this.getEventEmitter()}), this.clock.on("update", this.update, this), this.resetFromJSON(e), this.boot()
        }

        return m(n, [{
            key: "resetFromJSON", value: function (t) {
                return this.clock.resetFromJSON(cv(t, "clock", void 0)), this.state = cv(t, "state", 0), this.commands = cv(t, "commands", []), this.scope = cv(t, "scope", void 0), this.setTimeUnit(cv(t, "timeUnit", 0)), this.setDtMode(cv(t, "dtMode", 0)), this.index = cv(t, "index", 0), this.nextTime = cv(t, "nextTime", 0), this
            }
        }, {
            key: "toJSON", value: function () {
                return {
                    clock: this.clock.toJSON(),
                    state: this.state,
                    commands: this.commands,
                    scope: this.scope,
                    timeUnit: this.timeUnit,
                    dtMode: this.dtMode,
                    index: this.index,
                    nextTime: this.nextTime
                }
            }
        }, {
            key: "boot", value: function () {
                var t = Wr(this.parent);
                t && t.on("destroy", this.destroy, this)
            }
        }, {
            key: "shutdown", value: function () {
                this.clock.shutdown(), this.parent = void 0, this.scene = void 0, this.commands = void 0
            }
        }, {
            key: "destroy", value: function () {
                this.shutdown()
            }
        }, {
            key: "load", value: function (t, e, i) {
                this.stop();
                var n = cv(i, "timeUnit", void 0);
                void 0 !== n && this.setTimeUnit(n);
                var s = cv(i, "dtMode", void 0);
                return void 0 !== s && this.setDtMode(s), t = t.filter(function (t) {
                    var e = t[0];
                    return !isNaN(e)
                }).map(function (t) {
                    return "string" == typeof t[0] && (t[0] = parseFloat(t[0])), t
                }), 0 === this.dtMode && t.sort(function (t, e) {
                    var i = t[0], n = e[0];
                    return n < i ? 1 : i < n ? -1 : 0
                }), this.commands = t, this.scope = e, this
            }
        }, {
            key: "start", value: function (t) {
                return void 0 === t && (t = 0), this.stop(), this.index = 0, this.state = 1, this.nextTime = this.getNextDt(0), this.clock.start(t), this.update(t), this
            }
        }, {
            key: "pause", value: function () {
                return this.clock.pause(), this
            }
        }, {
            key: "resume", value: function () {
                return this.clock.resume(), this
            }
        }, {
            key: "stop", value: function () {
                return this.clock.stop(), this.state = 0, this
            }
        }, {
            key: "seek", value: function (t) {
                return this.clock.seek(t), this
            }
        }, {
            key: "isPlaying", get: function () {
                return this.clock.isRunning
            }
        }, {
            key: "completed", get: function () {
                return 2 === this.state
            }
        }, {
            key: "setTimeScale", value: function (t) {
                return this.clock.timeScale = t, this
            }
        }, {
            key: "update", value: function (t) {
                if (this.nextTime > t) return this;
                for (var e = this.commands.length - 1; ;) {
                    var i = this.commands[this.index], n = i[1];
                    if (Pi(n) || (n = ev(fv, i, 1)), iv(n, this.scope), this.emit("runcommand", n, this.scope), this.index === e) return this.complete(), this;
                    if (this.index++, this.nextTime = this.getNextDt(this.nextTime), this.nextTime > t) return this
                }
            }
        }, {
            key: "complete", value: function () {
                this.clock.complete(), this.state = 2
            }
        }, {
            key: "getNextDt", value: function (t) {
                var e = this.commands[this.index][0];
                return 1 === this.timeUnit && (e *= 1e3), 1 === this.dtMode && (e += t), e
            }
        }, {
            key: "setDtMode", value: function (t) {
                return "string" == typeof t && (t = vv[t]), this.dtMode = t, this
            }
        }, {
            key: "setTimeUnit", value: function (t) {
                return "string" == typeof t && (t = pv[t]), this.timeUnit = t, this
            }
        }]), n
    }();
    Object.assign(dv.prototype, Gn);
    var fv = [], pv = {ms: 0, s: 1, sec: 1}, vv = {abs: 0, absolute: 0, inc: 1, increment: 1},
        gv = Phaser.Utils.Objects.GetValue, yv = function () {
            b(s, Zu);
            var n = w(s);

            function s(t, e) {
                var i;
                return B(this, s), void 0 === e && (e = {text: createDefaultTextObject(t)}), (i = n.call(this, t, e)).type = "rexToast", i.setTransitInTime(gv(e, "duration.in", 200)), i.setDisplayTime(gv(e, "duration.hold", 1200)), i.setTransitOutTime(gv(e, "duration.out", 200)), i.setTransitInCallback(gv(e, "transitIn", nv.popUp)), i.setTransitOutCallback(gv(e, "transitOut", nv.scaleDown)), i.player = new dv(z(i), {dtMode: 1}), i.messages = [], i.setVisible(!1), i
            }

            return m(s, [{
                key: "destroy", value: function (t) {
                    this.scene && (this.player.destroy(), this.player = void 0, this.messages = void 0, C(x(s.prototype), "destroy", this).call(this, t))
                }
            }, {
                key: "setDisplayTime", value: function (t) {
                    return this.displayTime = t, this
                }
            }, {
                key: "setTransitOutTime", value: function (t) {
                    return this.transitOutTime = t, this
                }
            }, {
                key: "setTransitInTime", value: function (t) {
                    return this.transitInTime = t, this
                }
            }, {
                key: "setTransitInCallback", value: function (t) {
                    switch ("string" == typeof t && (t = nv[t]), t) {
                        case nv.popUp:
                            t = sv;
                            break;
                        case nv.fadeIn:
                            t = ov
                    }
                    return this.transitInCallback = t, this
                }
            }, {
                key: "setTransitOutCallback", value: function (t) {
                    switch ("string" == typeof t && (t = nv[t]), t) {
                        case nv.scaleDown:
                            t = rv;
                            break;
                        case nv.fadeOut:
                            t = av
                    }
                    return this.transitOutCallback = t, this
                }
            }, {
                key: "show", value: function (t) {
                    if (void 0 === t) {
                        if (0 === this.messages.length) return this;
                        t = this.messages.shift()
                    }
                    if (this.player.isPlaying) return this.messages.push(t), this;
                    this.setScale(1, 1).setVisible(!0), "string" == typeof t ? this.setText(t) : t(this), this.layout();
                    var e = [[0, [this.transitInCallback, this, this.transitInTime]], [this.transitInTime, [gt]], [this.displayTime, [this.transitOutCallback, this, this.transitOutTime]], [this.transitOutTime, [this.setVisible, !1]], [30, [gt]]];
                    return this.player.load(e, this).once("complete", function () {
                        this.show()
                    }, this).start(), this
                }
            }]), s
        }();
    u.register("toast", function (t) {
        var e = new yv(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.Toast", yv);

    function kv(s, r) {
        return function (t, e, i, n) {
            "panel" !== e && i.moveChild(t, n ? 0 : s, r)
        }
    }

    function mv(s, r) {
        return function (t, e, i, n) {
            "panel" === e && i.moveChild(t, n ? 0 : s, r)
        }
    }

    var bv = {
        visible: {
            show: function () {
                return function (t, e, i, n) {
                    "panel" !== e && i.setChildVisible(t, !0)
                }
            }, hide: function () {
                return function (t, e, i, n) {
                    "panel" !== e && i.setChildVisible(t, !1)
                }
            }
        }, fade: {
            show: function (s, r) {
                return void 0 === r && (r = 1), function (t, e, i, n) {
                    "panel" !== e && i.fadeChild(t, n ? 0 : s, r)
                }
            }, hide: function (s, r) {
                return void 0 === r && (r = 0), function (t, e, i, n) {
                    "panel" !== e && i.fadeChild(t, n ? 0 : s, r)
                }
            }
        }, move: {show: kv, hide: kv}, "move-panel": {show: mv, hide: mv}
    }, xv = Ni.prototype.setChildVisible, Cv = {
        setChildVisible: function (t, e) {
            if ("string" == typeof t) {
                var i = t;
                t = this.sizerChildren[i]
            } else i = tl(this.sizerChildren, t);
            return void 0 === e && (e = this.currentChildKey === i), xv.call(this, t, e), this
        }
    }, wv = {
        fadeChild: function (t, e, i) {
            var n;
            return "string" == typeof t ? (n = t, t = this.sizerChildren[n]) : n = tl(this.sizerChildren, t), void 0 === e && (e = 500), void 0 === i && (i = this.currentChildKey === n ? 1 : 0), t.fadeIn(e, {
                start: t.alpha,
                end: i
            }), this
        }, fadeChildPromise: function (t, e, i) {
            return "string" == typeof t && (t = this.sizerChildren[key]), this.fadeChild(t, e, i), t._fade ? es(t._fade) : Promise.resolve()
        }
    }, Sv = {
        moveChild: function (t, e, i, n) {
            var s;
            "string" == typeof t ? (s = t, t = this.sizerChildren[s]) : s = tl(this.sizerChildren, t), void 0 === e && (e = 500);
            var r, o, a, h, l = this.currentChildKey === s;
            if (void 0 === n) switch (s) {
                case"leftSide":
                case"rightSide":
                    n = ga(t);
                    break;
                case"topSide":
                case"bottomSide":
                    n = ya(t);
                    break;
                default:
                    if (l) switch (this.previousChildKey) {
                        case"leftSide":
                        case"rightSide":
                            n = ga(this.sizerChildren[this.previousChildKey]);
                            break;
                        case"topSide":
                        case"bottomSide":
                            n = ya(this.sizerChildren[this.previousChildKey]);
                            break;
                        default:
                            n = 0
                    } else switch (this.currentChildKey) {
                        case"leftSide":
                        case"rightSide":
                            n = ga(this.sizerChildren[this.currentChildKey]);
                            break;
                        case"topSide":
                        case"bottomSide":
                            n = ya(this.sizerChildren[this.currentChildKey]);
                            break;
                        default:
                            n = 0
                    }
            }
            if (l) switch (s) {
                case"panel":
                    switch (this.previousChildKey) {
                        case"leftSide":
                            r = !0;
                            break;
                        case"rightSide":
                            o = !0;
                            break;
                        case"topSide":
                            a = !0;
                            break;
                        case"bottomSide":
                            h = !0
                    }
                    break;
                case"leftSide":
                    o = !0;
                    break;
                case"rightSide":
                    r = !0;
                    break;
                case"topSide":
                    h = !0;
                    break;
                case"bottomSide":
                    a = !0
            } else switch (s) {
                case"panel":
                    switch (this.currentChildKey) {
                        case"leftSide":
                            o = !0;
                            break;
                        case"rightSide":
                            r = !0;
                            break;
                        case"topSide":
                            h = !0;
                            break;
                        case"bottomSide":
                            a = !0
                    }
                    break;
                case"leftSide":
                    r = !0;
                    break;
                case"rightSide":
                    o = !0;
                    break;
                case"topSide":
                    a = !0;
                    break;
                case"bottomSide":
                    h = !0
            }
            return r ? t.moveTo(e, "-=".concat(n), void 0, i) : o ? t.moveTo(e, "+=".concat(n), void 0, i) : a ? t.moveTo(e, void 0, "-=".concat(n), i) : h ? t.moveTo(e, void 0, "+=".concat(n), i) : t.moveTo(0), this
        }, moveChildPromise: function (t, e, i, n) {
            return "string" == typeof t && (t = this.sizerChildren[key]), this.moveChild(t, e, i, n), t._easeMove ? es(t._easeMove) : Promise.resolve()
        }
    }, Pv = {};
    Object.assign(Pv, Cv, wv, Sv);
    var Tv = Phaser.Utils.Objects.GetValue, Ov = function () {
        b(C, nl);
        var x = w(C);

        function C(t, e) {
            var i;
            B(this, C), (i = x.call(this, t, e)).type = "rexSides", i.childrenMap = i.sizerChildren, i.previousChildKey = void 0, i.currentChildKey = void 0;
            var n, s, r, o, a, h, l = Tv(e, "showChildCallback", void 0);
            if (l) if ($a(l)) {
                var u = Tv(e, "showChildCallbackScope", void 0);
                i.on("showchild", l, u);
                var c = Tv(e, "hideChildCallback", void 0), d = Tv(e, "hideChildCallbackScope", void 0);
                i.on("hidechild", c, d)
            } else {
                var f = (h = S("string" == typeof (n = l) ? [n] : n), s = h[0], r = h.slice(1), a = bv.hasOwnProperty(s) ? (o = bv[s].show.apply(null, r), bv[s].hide.apply(null, r)) : o = gt, {
                    show: o,
                    hide: a
                });
                i.on("showchild", f.show), i.on("hidechild", f.hide)
            }
            var p = Tv(e, "background", void 0), v = Tv(e, "panel", void 0), g = Tv(e, "leftSide", void 0),
                y = Tv(e, "rightSide", void 0), k = Tv(e, "topSide", void 0), m = Tv(e, "bottomSide", void 0);
            if (p && i.addBackground(p), v && i.add(v, "panel", "center", 0, !0), g) {
                var b = Tv(e, "expand.left", !0);
                i.add(g, "leftSide", "left-top", 0, {height: b})
            }
            if (y) {
                b = Tv(e, "expand.right", !0);
                i.add(y, "rightSide", "right-top", 0, {height: b})
            }
            if (k) {
                b = Tv(e, "expand.top", !0);
                i.add(k, "topSide", "left-top", 0, {width: b})
            }
            if (m) {
                b = Tv(e, "expand.bottom", !0);
                i.add(m, "bottomSide", "left-bottom", 0, {width: b})
            }
            return i
        }

        return m(C, [{
            key: "reset", value: function () {
                return this.previousChildKey = void 0, this.currentChildKey = "panel", this.showChild("panel", !0), this.hideChild("leftSide", !0), this.hideChild("rightSide", !0), this.hideChild("topSide", !0), this.hideChild("bottomSide", !0), this
            }
        }]), C
    }();
    Object.assign(Ov.prototype, {
        showChild: function (t, e) {
            var i = this.sizerChildren[t];
            return i && (this.emit("showchild", i, t, this, e), this.resetChildState(i)), this
        }, hideChild: function (t, e) {
            var i = this.sizerChildren[t];
            return i && (this.emit("hidechild", i, t, this, e), this.resetChildState(i)), this
        }, swapChild: function (t, e) {
            return this.currentChildKey === t || ("panel" === this.currentChildKey || "panel" === t ? (this.previousChildKey = this.currentChildKey, this.currentChildKey = t, this.hideChild(this.previousChildKey, e), this.showChild(this.currentChildKey, e)) : (this.swapChild("panel", e), this.swapChild(t, e))), this
        }, showPanel: function (t) {
            return this.swapChild("panel", t), this
        }, showLeftSide: function () {
            return this.swapChild("leftSide"), this
        }, showRightSide: function () {
            return this.swapChild("rightSide"), this
        }, showTopSide: function () {
            return this.swapChild("topSide"), this
        }, showBottomSide: function () {
            return this.swapChild("bottomSide"), this
        }, hideLeftSide: function () {
            return "leftSide" == this.currentChildKey && this.showPanel(), this
        }, hideRightSide: function () {
            return "rightSide" == this.currentChildKey && this.showPanel(), this
        }, hideTopSide: function () {
            return "topSide" == this.currentChildKey && this.showPanel(), this
        }, hideBottomSide: function () {
            return "bottomSide" == this.currentChildKey && this.showPanel(), this
        }, toggleLeftSide: function () {
            var t = "panel" !== this.currentChildKey ? "panel" : "leftSide";
            return this.swapChild(t), this
        }, toggleRightSide: function () {
            var t = "panel" !== this.currentChildKey ? "panel" : "rightSide";
            return this.swapChild(t), this
        }, toggleTopSide: function () {
            var t = "panel" !== this.currentChildKey ? "panel" : "topSide";
            return this.swapChild(t), this
        }, toggleBottomSide: function () {
            var t = "panel" !== this.currentChildKey ? "panel" : "bottomSide";
            return this.swapChild(t), this
        }
    }, Pv), u.register("sides", function (t) {
        var e = new Ov(this.scene, t);
        return this.scene.add.existing(e), e
    }), H(window, "RexPlugins.UI.Sides", Ov), u.register("click", function (t, e) {
        return no(t) || (e = t, t = this.scene), new Qu(t, e)
    }), H(window, "RexPlugins.UI.Click", Qu), u.register("tap", function (t, e) {
        return no(t) || (e = t, t = this.scene), new Sf(t, e)
    }), H(window, "RexPlugins.UI.Tap", Sf), u.register("press", function (t, e) {
        return no(t) || (e = t, t = this.scene), new Ef(t, e)
    }), H(window, "RexPlugins.UI.Press", Ef), u.register("swipe", function (t, e) {
        return no(t) || (e = t, t = this.scene), new Vf(t, e)
    }), H(window, "RexPlugins.UI.Swipe", Vf);
    var Mv = Phaser.Utils.Objects.GetValue, _v = function () {
        b(o, kf);
        var r = w(o);

        function o(t, e) {
            var i;
            B(this, o);
            var n = z(i = r.call(this, t, e)), s = {
                states: {
                    IDLE: {}, BEGIN: {
                        enter: function () {
                            var t = n.pointer;
                            n.startX = t.x, n.startY = t.y, n.startWorldX = t.worldX, n.startWorldY = t.worldY
                        }
                    }, RECOGNIZED: {
                        enter: function () {
                            n.emit("panstart", n, n.gameObject, n.lastPointer)
                        }, exit: function () {
                            var t = n.lastPointer;
                            n.endX = t.x, n.endY = t.y, n.endWorldX = t.worldX, n.endWorldY = t.worldY, n.emit("panend", n, n.gameObject, n.lastPointer)
                        }
                    }
                }, init: function () {
                    this.state = Ev
                }, eventEmitter: !1
            };
            return i.setRecongizedStateObject(new xd(s)), i
        }

        return m(o, [{
            key: "resetFromJSON", value: function (t) {
                return C(x(o.prototype), "resetFromJSON", this).call(this, t), this.setDragThreshold(Mv(t, "threshold", 10)), this
            }
        }, {
            key: "onDragStart", value: function () {
                this.state = Bv, 0 === this.dragThreshold && (this.state = zv)
            }
        }, {
            key: "onDragEnd", value: function () {
                this.state = Ev
            }
        }, {
            key: "onDrag", value: function () {
                switch (this.state) {
                    case Bv:
                        this.pointer.getDistance() >= this.dragThreshold && (this.state = zv);
                        break;
                    case zv:
                        var t = this.pointer.position, e = this.pointer.prevPosition;
                        this.dx = t.x - e.x, this.dy = t.y - e.y;
                        var i = this.pointer;
                        this.x = i.x, this.y = i.y, this.worldX = i.worldX, this.worldY = i.worldY, this.emit("pan", this, this.gameObject, this.lastPointer)
                }
            }
        }, {
            key: "isPan", get: function () {
                return this.state === zv
            }
        }, {
            key: "setDragThreshold", value: function (t) {
                return this.dragThreshold = t, this
            }
        }]), o
    }(), Ev = "IDLE", Bv = "BEGIN", zv = "RECOGNIZED";
    u.register("pan", function (t, e) {
        return no(t) || (e = t, t = this.scene), new _v(t, e)
    }), H(window, "RexPlugins.UI.Pan", _v);
    var jv = Phaser.Utils.Objects.GetValue, Rv = Phaser.Utils.Array.SpliceOne, Dv = Phaser.Math.Distance.Between,
        Lv = Phaser.Math.Angle.Between, Iv = function () {
            function n(t, e) {
                B(this, n);
                var i = t.input.manager.pointersTotal - 1;
                i < 2 && t.input.addPointer(2 - i), this.scene = t, this.setEventEmitter(jv(e, "eventEmitter", void 0)), this._enable = void 0, this.pointers = [], this.movedState = {}, this.resetFromJSON(e), this.boot()
            }

            return m(n, [{
                key: "resetFromJSON", value: function (t) {
                    return this.setEnable(jv(t, "enable", !0)), this.bounds = jv(t, "bounds", void 0), this.tracerState = Av, this.pointers.length = 0, pt(this.movedState), this
                }
            }, {
                key: "boot", value: function () {
                    this.scene.input.on("pointerdown", this.onPointerDown, this), this.scene.input.on("pointerup", this.onPointerUp, this), this.scene.input.on("pointermove", this.onPointerMove, this), this.scene.events.once("shutdown", this.destroy, this)
                }
            }, {
                key: "shutdown", value: function () {
                    this.destroyEventEmitter(), this.pointers.length = 0, pt(this.movedState), this.scene && (this.scene.input.off("pointerdown", this.onPointerDown, this), this.scene.input.off("pointerup", this.onPointerUp, this), this.scene.input.off("pointermove", this.onPointerMove, this), this.scene.events.off("destroy", this.destroy, this), this.scene = void 0), this.scene = void 0
                }
            }, {
                key: "destroy", value: function () {
                    this.shutdown()
                }
            }, {
                key: "enable", get: function () {
                    return this._enable
                }, set: function (t) {
                    if (this._enable !== t) return t || this.dragCancel(), this._enable = t, this
                }
            }, {
                key: "setEnable", value: function (t) {
                    return void 0 === t && (t = !0), this.enable = t, this
                }
            }, {
                key: "toggleEnable", value: function () {
                    return this.setEnable(!this.enable), this
                }
            }, {
                key: "onPointerDown", value: function (t) {
                    if (this.enable && (2 !== this.pointers.length && (!this.bounds || this.bounds.contains(t.x, t.y)) && -1 === this.pointers.indexOf(t))) switch (this.movedState[t.id] = !1, this.pointers.push(t), this.tracerState) {
                        case Av:
                            this.tracerState = Fv, this.onDrag1Start();
                            break;
                        case Fv:
                            this.tracerState = Wv, this.onDrag2Start()
                    }
                }
            }, {
                key: "onPointerUp", value: function (t) {
                    if (this.enable && (!this.bounds || this.bounds.contains(t.x, t.y))) {
                        var e = this.pointers.indexOf(t);
                        if (-1 !== e) switch (delete this.movedState[t.id], Rv(this.pointers, e), this.tracerState) {
                            case Fv:
                                this.tracerState = Av, this.onDrag1End();
                                break;
                            case Wv:
                                this.tracerState = Fv, this.onDrag2End(), this.onDrag1Start()
                        }
                    }
                }
            }, {
                key: "onPointerMove", value: function (t) {
                    if (this.enable && t.isDown) {
                        var e = !this.bounds || this.bounds.contains(t.x, t.y), i = -1 !== this.pointers.indexOf(t);
                        if (i || !e) if (i && !e) this.onPointerUp(t); else if (this.movedState[t.id] || (this.movedState[t.id] = t.x !== t.downX || t.y !== t.downY), this.movedState[t.id]) switch (this.tracerState) {
                            case Fv:
                                this.onDrag1();
                                break;
                            case Wv:
                                this.onDrag2()
                        }
                    }
                }
            }, {
                key: "dragCancel", value: function () {
                    return this.tracerState === Wv && this.onDrag2End(), this.pointers.length = 0, pt(this.movedState), this.tracerState = Av, this
                }
            }, {
                key: "onDrag1Start", value: function () {
                    this.emit("drag1start", this)
                }
            }, {
                key: "onDrag1End", value: function () {
                    this.emit("drag1end", this)
                }
            }, {
                key: "onDrag1", value: function () {
                    this.emit("drag1", this)
                }
            }, {
                key: "onDrag2Start", value: function () {
                    this.emit("drag2start", this)
                }
            }, {
                key: "onDrag2End", value: function () {
                    this.emit("drag2end", this)
                }
            }, {
                key: "onDrag2", value: function () {
                    this.emit("drag2", this)
                }
            }, {
                key: "distanceBetween", get: function () {
                    if (this.tracerState !== Wv) return 0;
                    var t = this.pointers[0], e = this.pointers[1];
                    return Dv(t.x, t.y, e.x, e.y)
                }
            }, {
                key: "angleBetween", get: function () {
                    if (this.tracerState !== Wv) return 0;
                    var t = this.pointers[0], e = this.pointers[1];
                    return Lv(t.x, t.y, e.x, e.y)
                }
            }, {
                key: "drag1Vector", get: function () {
                    var t = this.pointers[0];
                    if (t && this.movedState[t.id]) {
                        var e = t.position, i = t.prevPosition;
                        Yv.x = e.x - i.x, Yv.y = e.y - i.y
                    } else Yv.x = 0, Yv.y = 0;
                    return Yv
                }
            }, {
                key: "centerX", get: function () {
                    if (this.tracerState !== Wv) return 0;
                    var t = this.pointers[0].position, e = this.pointers[1].position;
                    return (t.x + e.x) / 2
                }
            }, {
                key: "centerY", get: function () {
                    if (this.tracerState !== Wv) return 0;
                    var t = this.pointers[0].position, e = this.pointers[1].position;
                    return (t.y + e.y) / 2
                }
            }, {
                key: "prevCenterX", get: function () {
                    if (this.tracerState !== Wv) return 0;
                    var t = this.movedState[this.pointers[0].id] ? this.pointers[0].prevPosition : this.pointers[0].position,
                        e = this.movedState[this.pointers[1].id] ? this.pointers[1].prevPosition : this.pointers[1].position;
                    return (t.x + e.x) / 2
                }
            }, {
                key: "prevCenterY", get: function () {
                    if (this.tracerState !== Wv) return 0;
                    var t = this.movedState[this.pointers[0].id] ? this.pointers[0].prevPosition : this.pointers[0].position,
                        e = this.movedState[this.pointers[1].id] ? this.pointers[1].prevPosition : this.pointers[1].position;
                    return (t.y + e.y) / 2
                }
            }, {
                key: "movementCenterX", get: function () {
                    return this.centerX - this.prevCenterX
                }
            }, {
                key: "movementCenterY", get: function () {
                    return this.centerY - this.prevCenterY
                }
            }, {
                key: "setRecongizedStateObject", value: function (t) {
                    return this.recongizedState = t, this
                }
            }, {
                key: "state", get: function () {
                    return this.recongizedState.state
                }, set: function (t) {
                    this.recongizedState.state = t
                }
            }, {
                key: "cancel", value: function () {
                    return this.state = Vv, this
                }
            }]), n
        }();
    Object.assign(Iv.prototype, Gn);
    var Yv = {}, Av = 0, Fv = 1, Wv = 2, Vv = "IDLE", Xv = Phaser.Utils.Objects.GetValue, Gv = function () {
        b(o, Iv);
        var r = w(o);

        function o(t, e) {
            var i;
            B(this, o);
            var n = z(i = r.call(this, t, e)), s = {
                states: {
                    IDLE: {
                        enter: function () {
                            n.prevDistance = void 0, n.scaleFactor = 1
                        }
                    }, BEGIN: {}, RECOGNIZED: {
                        enter: function () {
                            n.emit("pinchstart", n)
                        }, exit: function () {
                            n.emit("pinchend", n)
                        }
                    }
                }, init: function () {
                    this.state = Hv
                }, eventEmitter: !1
            };
            return i.setRecongizedStateObject(new xd(s)), i
        }

        return m(o, [{
            key: "resetFromJSON", value: function (t) {
                return C(x(o.prototype), "resetFromJSON", this).call(this, t), this.setDragThreshold(Xv(t, "threshold", 0)), this
            }
        }, {
            key: "onDrag2Start", value: function () {
                this.scaleFactor = 1, this.prevDistance = this.distanceBetween, this.state = Uv, 0 === this.dragThreshold && (this.state = Nv)
            }
        }, {
            key: "onDrag2End", value: function () {
                this.state = Hv
            }
        }, {
            key: "onDrag2", value: function () {
                switch (this.state) {
                    case Uv:
                        if (this.pointers[0].getDistance() >= this.dragThreshold && this.pointers[1].getDistance() >= this.dragThreshold) {
                            var t = this.distanceBetween;
                            this.scaleFactor = t / this.prevDistance, this.prevDistance = t, this.state = Nv
                        }
                        break;
                    case Nv:
                        t = this.distanceBetween;
                        this.scaleFactor = t / this.prevDistance, this.emit("pinch", this), this.prevDistance = t
                }
            }
        }, {
            key: "isPinch", get: function () {
                return this.state === Nv
            }
        }, {
            key: "setDragThreshold", value: function (t) {
                return this.dragThreshold = t, this
            }
        }]), o
    }(), Hv = "IDLE", Uv = "BEGIN", Nv = "RECOGNIZED";
    u.register("pinch", function (t) {
        return new Gv(this.scene, t)
    }), H(window, "RexPlugins.UI.Pinch", Gv);

    function Jv(t, e, i, n) {
        return Kv(t, e, i, n), t.rotation += n, t
    }

    var Kv = Phaser.Math.RotateAround, Zv = {}, qv = Phaser.Utils.Objects.GetValue, $v = Phaser.Math.Angle.WrapDegrees,
        Qv = Phaser.Math.Angle.ShortestBetween, tg = Phaser.Math.RadToDeg, eg = Phaser.Math.DegToRad, ig = function () {
            b(o, Iv);
            var r = w(o);

            function o(t, e) {
                var i;
                B(this, o);
                var n = z(i = r.call(this, t, e)), s = {
                    states: {
                        IDLE: {
                            enter: function () {
                                n.prevAngle = void 0, n.angle = 0
                            }
                        }, BEGIN: {}, RECOGNIZED: {
                            enter: function () {
                                n.emit("rotatestart", n)
                            }, exit: function () {
                                n.emit("rotateend", n)
                            }
                        }
                    }, init: function () {
                        this.state = sg
                    }, eventEmitter: !1
                };
                return i.setRecongizedStateObject(new xd(s)), i
            }

            return m(o, [{
                key: "resetFromJSON", value: function (t) {
                    return C(x(o.prototype), "resetFromJSON", this).call(this, t), this.setDragThreshold(qv(t, "threshold", 0)), this
                }
            }, {
                key: "onDrag2Start", value: function () {
                    this.prevAngle = $v(tg(this.angleBetween)), this.state = rg, 0 === this.dragThreshold && (this.state = og)
                }
            }, {
                key: "onDrag2End", value: function () {
                    this.state = sg
                }
            }, {
                key: "onDrag2", value: function () {
                    switch (this.state) {
                        case rg:
                            if (this.pointers[0].getDistance() >= this.dragThreshold && this.pointers[1].getDistance() >= this.dragThreshold) {
                                var t = $v(tg(this.angleBetween));
                                this.angle = Qv(this.prevAngle, t), this.prevAngle = t, this.state = og
                            }
                            break;
                        case og:
                            t = $v(tg(this.angleBetween));
                            this.angle = Qv(this.prevAngle, t), this.prevAngle = t, this.emit("rotate", this)
                    }
                }
            }, {
                key: "isRotation", get: function () {
                    return this.state === og
                }
            }, {
                key: "rotation", get: function () {
                    return eg(this.angle)
                }
            }, {
                key: "setDragThreshold", value: function (t) {
                    return this.dragThreshold = t, this
                }
            }]), o
        }(), ng = {
            spinObject: function (t, e) {
                if (!this.isRotation) return this;
                void 0 === e && (e = this.pointers[0].camera);
                var i = this.movementCenterX, n = this.movementCenterY;
                e.getWorldPoint(this.centerX, this.centerY, Zv);
                var s = Zv.x, r = Zv.y, o = this.rotation;
                if (Array.isArray(t)) for (var a = t, h = 0, l = a.length; h < l; h++) (t = a[h]).x += i, t.y += n, Jv(t, s, r, o); else t.x += i, t.y += n, Jv(t, s, r, o);
                return this
            }
        };
    Object.assign(ig.prototype, ng);
    var sg = "IDLE", rg = "BEGIN", og = "RECOGNIZED";
    u.register("rotate", function (t) {
        return new ig(this.scene, t)
    }), H(window, "RexPlugins.UI.Rotate", ig);

    function ag(e, i, t) {
        var n;
        if (void 0 === e) e = t.texture.key, i = t.frame.name; else if (hg(e)) {
            var s = e;
            e = lg(s, "key", t.texture.key), i = lg(s, "frame", t.frame.name)
        } else "string" == typeof e || (n = e);
        return void 0 === n && (n = function (t) {
            t.setTexture(e, i)
        }), n
    }

    var hg = Phaser.Utils.Objects.IsPlainObject, lg = Phaser.Utils.Objects.GetValue, ug = Phaser.Utils.Objects.GetValue,
        cg = Phaser.Utils.Objects.GetAdvancedValue, dg = function () {
            b(s, oo);
            var n = w(s);

            function s(t, e) {
                var i;
                return B(this, s), (i = n.call(this, t, {eventEmitter: !0})).gameObject = t, i.resetFromJSON(e), i
            }

            return m(s, [{
                key: "resetFromJSON", value: function (t) {
                    return this.setOrientation(ug(t, "orientation", 0)), this.setDelay(cg(t, "delay", 0)), this.setDuration(cg(t, "duration", 500)), this.setEase(ug(t, "ease", "Sine")), this.setFrontFace(ug(t, "front", void 0)), this.setBackFace(ug(t, "back", void 0)), this.setFace(ug(t, "face", 0)), this
                }
            }, {
                key: "shutdown", value: function () {
                    return C(x(s.prototype), "shutdown", this).call(this), this.gameObject = void 0, this
                }
            }, {
                key: "setOrientation", value: function (t) {
                    return "string" == typeof t && (t = fg[t]), this.orientation = t, this
                }
            }, {
                key: "setDelay", value: function (t) {
                    return this.delay = t, this
                }
            }, {
                key: "setDuration", value: function (t) {
                    return this.duration = t, this
                }
            }, {
                key: "setEase", value: function (t) {
                    return void 0 === t && (t = "Linear"), this.ease = t, this
                }
            }, {
                key: "face", get: function () {
                    return this._face
                }, set: function (t) {
                    "string" == typeof t && (t = pg[t]), 0 === (this._face = t) && this.frontFaceCallback ? this.frontFaceCallback(this.gameObject) : 1 === t && this.backFaceCallback && this.backFaceCallback(this.gameObject)
                }
            }, {
                key: "setFace", value: function (t) {
                    return this.face = t, this
                }
            }, {
                key: "toggleFace", value: function () {
                    var t = 0 === this.face ? 1 : 0;
                    return this.setFace(t), this
                }
            }, {
                key: "setFrontFace", value: function (t, e) {
                    return this.frontFaceCallback = ag(t, e, this.gameObject), this
                }
            }, {
                key: "setBackFace", value: function (t, e) {
                    return this.backFaceCallback = ag(t, e, this.gameObject), this
                }
            }, {
                key: "start", value: function () {
                    if (this.isRunning) return this;
                    var t = {
                        targets: this.gameObject,
                        delay: this.delay,
                        duration: this.duration / 2,
                        ease: this.ease,
                        yoyo: !0,
                        repeat: 0,
                        onYoyo: this.toggleFace,
                        onYoyoScope: this
                    };
                    return t[0 === this.orientation ? "scaleX" : "scaleY"] = {
                        start: 1,
                        to: 0
                    }, C(x(s.prototype), "start", this).call(this, t), this
                }
            }, {
                key: "flip", value: function (t) {
                    return this.isRunning || (void 0 !== t && this.setDuration(t), this.start()), this
                }
            }]), s
        }(), fg = {x: 0, horizontal: 0, y: 1, vertical: 1}, pg = {front: 0, back: 1};
    u.register("flip", function (t, e) {
        return new dg(t, e)
    }), H(window, "RexPlugins.UI.Flip", dg);

    function vg(t) {
        var e = t.gameObjects, i = t.renderTexture;
        if (0 === e.length) return i && i.setSize(1, 1).clear(), i;
        var n, s, r = Ig(t, "x", void 0), o = Ig(t, "y", void 0), a = Ig(t, "width", void 0),
            h = Ig(t, "height", void 0), l = Ig(t, "originX", 0), u = Ig(t, "originY", 0);
        if (void 0 === a || void 0 === h || void 0 === r || void 0 === o) {
            var c = function (t, e) {
                var i;
                void 0 === e ? e = new Dg : !0 === e && (void 0 === yg && (yg = new Dg), e = yg);
                for (var n = !0, s = 0, r = t.length; s < r; s++) (i = t[s]).getBounds && (gg = i.getBounds(gg), n ? (e.setTo(gg.x, gg.y, gg.width, gg.height), n = !1) : Lg(gg, e, e));
                return e
            }(e, !0);
            u = l = void 0 !== r && void 0 !== o ? (a = 2 * Math.max(r - c.left, c.right - r), h = 2 * Math.max(o - c.top, c.bottom - o), .5) : (r = c.x, o = c.y, a = c.width, h = c.height, 0), n = c.x, s = c.y
        } else n = r + (0 - l) * a, s = o + (0 - u) * h;
        return i ? (i.setPosition(r, o), i.width === a && i.height === h || i.setSize(a, h)) : i = e[0].scene.add.renderTexture(r, o, a, h), i.setOrigin(l, u), i.camera.setScroll(n, s), e = function (t, e) {
            if (0 === t.length) return t;
            void 0 === e && (e = !1);
            var i = t[0].scene.sys.displayList;
            return i.depthSort(), e ? t.sort(function (t, e) {
                return i.getIndex(e) - i.getIndex(t)
            }) : t.sort(function (t, e) {
                return i.getIndex(t) - i.getIndex(e)
            }), t
        }(vt(e)), i.draw(e), i
    }

    var gg, yg, kg = Phaser.Math.Vector3, mg = Phaser.Math.Matrix4, bg = new kg, xg = new kg, Cg = new mg,
        wg = Phaser.GameObjects.Mesh, Sg = Phaser.Utils.Objects.IsPlainObject, Pg = Phaser.Utils.Objects.GetValue,
        Tg = Phaser.Geom.Mesh.GenerateGridVerts, Og = Phaser.Math.RadToDeg, Mg = Phaser.Math.DegToRad,
        _g = 1 + 1 / Math.sin(Mg(45)), Eg = function () {
            b(u, wg);
            var l = w(u);

            function u(t, e, i, n, s, r) {
                var o;
                B(this, u), Sg(e) && (e = Pg(r = e, "x", 0), i = Pg(r, "y", 0), n = Pg(r, "key", null), s = Pg(r, "frame", null)), (o = l.call(this, t, e, i, n, s)).type = "rexPerspectiveImage", o.setSizeToFrame(), o.resetPerspective(), o.panZ(_g), o.hideCCW = Pg(r, "hideCCW", !0);
                var a = Pg(r, "gridWidth", 32), h = Pg(r, "girdHeight", a);
                return o.resetVerts(a, h), o
            }

            return m(u, [{
                key: "resetPerspective", value: function () {
                    return this.setPerspective(this.width, this.height, 45), this
                }
            }, {
                key: "resetVerts", value: function (t, e) {
                    if (void 0 !== t && (this.girdWidth = t), void 0 !== e && (this.girdHeight = e), this.clear(), this.dirtyCache[9] = -1, 0 === this.width || 0 === this.height) return this;
                    var i = this.frame.cutWidth, n = this.frame.cutHeight;
                    return Tg({
                        mesh: this,
                        texture: this.texture.key,
                        frame: this.frame.name,
                        width: i / this.height,
                        height: n / this.height,
                        widthSegments: Math.ceil(i / this.girdWidth),
                        heightSegments: Math.ceil(n / this.girdHeight),
                        flipY: this.frame.source.isRenderTexture
                    }), this
                }
            }, {
                key: "syncSize", value: function () {
                    return this.setSizeToFrame(), this.resetPerspective(), this.resetVerts(), this
                }
            }, {
                key: "rotationX", get: function () {
                    return this.modelRotation.x
                }, set: function (t) {
                    this.modelRotation.x = t
                }
            }, {
                key: "angleX", get: function () {
                    return Og(this.rotationX)
                }, set: function (t) {
                    this.rotationX = Mg(t)
                }
            }, {
                key: "rotationY", get: function () {
                    return this.modelRotation.y
                }, set: function (t) {
                    this.modelRotation.y = t
                }
            }, {
                key: "angleY", get: function () {
                    return Og(this.rotationY)
                }, set: function (t) {
                    this.rotationY = Mg(t)
                }
            }, {
                key: "rotationZ", get: function () {
                    return this.modelRotation.z
                }, set: function (t) {
                    this.modelRotation.z = t
                }
            }, {
                key: "angleZ", get: function () {
                    return Og(this.rotationZ)
                }, set: function (t) {
                    this.rotationZ = Mg(t)
                }
            }, {
                key: "transformVerts", value: function (t, e, i, n, s, r) {
                    return function (t, e, i, n, s, r, o) {
                        void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === s && (s = 0), void 0 === r && (r = 0), void 0 === o && (o = 0), bg.set(e, i, n), xg.set(s, r, o), Cg.fromRotationXYTranslation(xg, bg, !0);
                        for (var a = 0, h = t.vertices.length; a < h; a++) t.vertices[a].transformMat4(Cg)
                    }(this, t, e, i, n, s, r), this
                }
            }, {
                key: "forceUpdate", value: function () {
                    return this.dirtyCache[10] = 1, this
                }
            }]), u
        }(), Bg = Phaser.GameObjects.RenderTexture, zg = Phaser.Utils.Objects.IsPlainObject,
        jg = Phaser.Utils.Objects.GetValue, Rg = function () {
            b(l, Eg);
            var h = w(l);

            function l(t, e, i, n, s, r) {
                var o;
                B(this, l), zg(e) && (e = jg(r = e, "x", 0), i = jg(r, "y", 0), n = jg(r, "width", 32), s = jg(r, "height", 32));
                var a = new Bg(t, e, i, n, s).setOrigin(.5);
                return (o = h.call(this, t, e, i, a.texture.key, null, r)).type = "rexPerspectiveRenderTexture", o.rt = a, o
            }

            return m(l, [{
                key: "destroy", value: function (t) {
                    C(x(l.prototype), "destroy", this).call(this, t), this.rt.destroy(t), this.rt = null
                }
            }]), l
        }(), Dg = Phaser.Geom.Rectangle, Lg = Phaser.Geom.Rectangle.Union, Ig = Phaser.Utils.Objects.GetValue,
        Yg = Ni.prototype.add, Ag = Phaser.Utils.Objects.GetValue, Fg = function () {
            b(r, Rg);
            var s = w(r);

            function r(t, e) {
                var i;
                B(this, r);
                var n = t.scene;
                return i = s.call(this, n, t.x, t.y, 1, 1, e), n.add.existing(z(i)), i.setVisible(!1), Yg.call(t, z(i)), i.visibleSibling = [], i.perspectiveState = !1, i.useParentBounds = Ag(e, "useParentBounds", !1), i.boot(), i
            }

            return m(r, [{
                key: "boot", value: function () {
                    this.rexContainer.parent.on("destroy", this.destroy, this)
                }
            }, {
                key: "destroy", value: function (t) {
                    this.exit(), C(x(r.prototype), "destroy", this).call(this, t)
                }
            }, {
                key: "enter", value: function () {
                    this.exit();
                    var e = this.rexContainer.parent;
                    return vg({
                        gameObjects: e.getAllVisibleChildren(),
                        renderTexture: this.rt,
                        x: this.x,
                        y: this.y,
                        width: this.useParentBounds ? e.displayWidth : void 0,
                        height: this.useParentBounds ? e.displayHeighth : void 0,
                        originX: this.useParentBounds ? e.originX : void 0,
                        originY: this.useParentBounds ? e.originY : void 0
                    }), this.syncSize(), e.setChildVisible(this, !0), e.children.forEach(function (t) {
                        t !== this && (e.setChildVisible(t, !1), this.visibleSibling.push(t))
                    }, this), this.perspectiveState = !0, this
                }
            }, {
                key: "exit", value: function () {
                    var e = this.rexContainer.parent;
                    return this.visibleSibling.forEach(function (t) {
                        e.setChildVisible(t, !0)
                    }, this), this.visibleSibling.length = 0, e.setChildVisible(this, !1), this.perspectiveState = !1, this
                }
            }]), r
        }();
    u.register("perspective", function (t, e) {
        return new Fg(t, e)
    }), H(window, "RexPlugins.UI.Perspective", Fg);

    function Wg(t, e, i) {
        var n, s;
        for (var r in void 0 === i && (i = {}), t) n = t[r], void 0 !== (s = Hg(e, r, n[1])) && (i[n[0]] = s);
        return i
    }

    function Vg(i, t, n) {
        function e(e) {
            t[n[e]] = function (t) {
                i.emit(e, i, t)
            }
        }

        for (var s in n) e(s)
    }

    var Xg = mi, Gg = bi, Hg = Phaser.Utils.Objects.GetValue, Ug = function (t) {
            t.stopPropagation()
        }, Ng = Phaser.GameObjects.DOMElement, Jg = Phaser.Utils.Objects.IsPlainObject, Kg = Phaser.Utils.Objects.GetValue,
        Zg = function () {
            b(p, Ng);
            var f = w(p);

            function p(t, e, i, n, s, r) {
                var o, a;
                B(this, p), Jg(e) ? (e = Kg(r = e, "x", 0), i = Kg(r, "y", 0), n = Kg(r, "width", 0), s = Kg(r, "height", 0)) : Jg(n) && (n = Kg(r = n, "width", 0), s = Kg(r, "height", 0)), void 0 === r && (r = {});
                var h = Kg(r, "type", "text");
                "textarea" === h ? (a = document.createElement("textarea")).style.resize = "none" : (a = document.createElement("input")).type = h, Wg(ty, r, a);
                var l = Kg(r, "style", void 0);
                l = Wg(ey, r, l);
                var u, c = a.style;
                for (var d in r) d in ty || d in ey || d in c && (l[d] = r[d]);
                return l["box-sizing"] = "border-box", (o = f.call(this, t, e, i, a, l)).type = "rexInputText", o.resize(n, s), Vg(z(o), a, iy), (u = a).addEventListener("touchstart", Ug, !1), u.addEventListener("touchmove", Ug, !1), u.addEventListener("touchend", Ug, !1), u.addEventListener("mousedown", Ug, !1), u.addEventListener("mouseup", Ug, !1), u.addEventListener("mousemove", Ug, !1), Kg(r, "selectAll", !1) && o.selectAll(), o
            }

            return m(p, [{
                key: "text", get: function () {
                    return this.node.value
                }, set: function (t) {
                    this.node.value = t
                }
            }, {
                key: "setText", value: function (t) {
                    return this.text = t, this
                }
            }, {
                key: "maxLength", get: function () {
                    return this.node.maxLength
                }, set: function (t) {
                    this.node.maxLength = t
                }
            }, {
                key: "setMaxLength", value: function (t) {
                    return this.maxLength = t, this
                }
            }, {
                key: "minLength", get: function () {
                    return this.node.minLength
                }, set: function (t) {
                    this.node.minLength = t
                }
            }, {
                key: "setMinLength", value: function (t) {
                    return this.minLength = t, this
                }
            }, {
                key: "placeholder", get: function () {
                    return this.node.placeholder
                }, set: function (t) {
                    this.node.placeholder = t
                }
            }, {
                key: "setPlaceholder", value: function (t) {
                    return this.placeholder = t, this
                }
            }, {
                key: "selectText", value: function () {
                    return this.node.select(), this
                }
            }, {
                key: "tooltip", get: function () {
                    return this.node.title
                }, set: function (t) {
                    this.node.title = t
                }
            }, {
                key: "setTooltip", value: function (t) {
                    return this.tooltip = t, this
                }
            }, {
                key: "setTextChangedCallback", value: function (t) {
                    return this.onTextChanged = t, this
                }
            }, {
                key: "readOnly", get: function () {
                    return this.node.readOnly
                }, set: function (t) {
                    this.node.readOnly = t
                }
            }, {
                key: "setReadOnly", value: function (t) {
                    return void 0 === t && (t = !0), this.readOnly = t, this
                }
            }, {
                key: "spellCheck", get: function () {
                    return this.node.spellcheck
                }, set: function (t) {
                    this.node.spellcheck = t
                }
            }, {
                key: "setSpellCheck", value: function (t) {
                    return this.spellCheck = t, this
                }
            }, {
                key: "fontColor", get: function () {
                    return this.node.style.color
                }, set: function (t) {
                    this.node.style.color = t
                }
            }, {
                key: "setFontColor", value: function (t) {
                    return this.fontColor = t, this
                }
            }, {
                key: "setStyle", value: function (t, e) {
                    return this.node.style[t] = e, this
                }
            }, {
                key: "getStyle", value: function (t) {
                    return this.node.style[t]
                }
            }, {
                key: "scrollToBottom", value: function () {
                    return this.node.scrollTop = this.node.scrollHeight, this
                }
            }, {
                key: "setEnabled", value: function (t) {
                    return void 0 === t && (t = !0), this.node.disabled = !t, this
                }
            }, {
                key: "setBlur", value: function () {
                    return this.node.blur(), this
                }
            }, {
                key: "setFocus", value: function () {
                    return this.node.focus(), this
                }
            }, {
                key: "selectAll", value: function () {
                    return this.node.select(), this
                }
            }]), p
        }(), qg = {
            resize: function (t, e) {
                if (this.scene.scale.autoRound && (t = Math.floor(t), e = Math.floor(e)), this.width === t && this.height === e) return this;
                var i = this.node.style;
                return i.width = "".concat(t, "px"), i.height = "".concat(e, "px"), this.updateSize(), this
            }
        };
    Object.assign(Zg.prototype, qg);

    function $g(t, e, i) {
        for (var n, s = 0, r = t.length; s < r; s++) if (n = t[s], Qa(n, e, i)) return n.pointToChild(e, i);
        return null
    }

    function Qg(t, e, i, n, s, r) {
        var o;
        (o = void 0 === s ? n : $g(i, n, s)) && t.emit(e, o, r)
    }

    var ty = {
            id: ["id", void 0],
            text: ["value", void 0],
            maxLength: ["maxLength", void 0],
            minLength: ["minLength", void 0],
            placeholder: ["placeholder", void 0],
            tooltip: ["title", void 0],
            readOnly: ["readOnly", !1],
            spellCheck: ["spellcheck", !1],
            autoComplete: ["autocomplete", "off"]
        }, ey = {
            align: ["textAlign", void 0],
            paddingLeft: ["padding-left", void 0],
            paddingRight: ["padding-right", void 0],
            paddingTop: ["padding-top", void 0],
            paddingBottom: ["padding-bottom", void 0],
            fontFamily: ["fontFamily", void 0],
            fontSize: ["font-size", void 0],
            color: ["color", "#ffffff"],
            backgroundColor: ["backgroundColor", "transparent"],
            border: ["border", 0],
            borderColor: ["borderColor", "transparent"],
            outline: ["outline", "none"]
        }, iy = {textchange: "oninput", click: "onclick", dblclick: "ondblclick", focus: "onfocus", blur: "onblur"},
        ny = Phaser.Utils.Objects.GetValue, sy = function (t) {
            return t.hasOwnProperty("align") ? t.align : t.hasOwnProperty("halign") ? t.halign : "left"
        }, ry = Phaser.Utils.Objects.GetValue, oy = function () {
            function e(t) {
                B(this, e), this.gameObject = t, this.scene = Fr(t), this.inputText = void 0, this.onClose = void 0, this.delayCall = void 0, this.boot()
            }

            return m(e, [{
                key: "boot", value: function () {
                    return this.gameObject.on("destroy", this.destroy, this), this
                }
            }, {
                key: "shutdown", value: function () {
                    return this.close(), this.gameObject = void 0, this.scene = void 0, ay === this && (ay = void 0), this
                }
            }, {
                key: "destroy", value: function () {
                    return this.shutdown(), this
                }
            }, {
                key: "open", value: function (t, e) {
                    void 0 !== ay && ay.close(), ay = this, $a(t) && (e = t, t = void 0), void 0 === e && (e = ry(t, "onClose", void 0));
                    var i = ry(t, "onOpen", void 0), n = ry(t, "onTextChanged", void 0);
                    return this.inputText = function (t, e) {
                        void 0 === e && (e = {});
                        var i = t.scene, n = t.style, s = ny(e, "backgroundColor", n.backgroundColor);
                        null === s && (s = "transparent"), e.text = ny(e, "text", t.text), e.fontFamily = ny(e, "fontFamily", n.fontFamily), e.fontSize = ny(e, "fontSize", n.fontSize), e.color = ny(e, "color", n.color), e.backgroundColor = s, e.align = ny(e, "align", sy(n));
                        var r = new Zg(i, t.x, t.y, ny(e, "width", t.width), ny(e, "height", t.height), e);
                        return r.setOrigin(t.originX, t.originY), i.add.existing(r), r
                    }(this.gameObject, t).on("textchange", function (t) {
                        var e = t.text;
                        n ? n(this.gameObject, e) : this.gameObject.text = e
                    }, this).setFocus(), this.gameObject.setVisible(!1), this.onClose = e, ry(t, "enterClose", !0) && this.scene.input.keyboard.once("keydown-ENTER", this.close, this), this.delayCall = this.scene.time.delayedCall(0, function () {
                        this.scene.input.once("pointerdown", this.close, this), i && i(this.gameObject)
                    }, [], this), this
                }
            }, {
                key: "close", value: function () {
                    return ay = void 0, this.inputText && (this.gameObject.setVisible(!0), this.inputText.destroy(), this.inputText = void 0, this.delayCall && (this.delayCall.remove(), this.delayCall = void 0), this.scene.input.keyboard.off("keydown-ENTER", this.close, this), this.scene.input.off("pointerdown", this.close, this), this.onClose && this.onClose(this.gameObject)), this
                }
            }, {
                key: "isOpened", get: function () {
                    return void 0 !== this.inputText
                }
            }, {
                key: "text", get: function () {
                    return this.isOpened ? this.inputText.text : this.gameObject.text
                }
            }]), e
        }(), ay = void 0, hy = Phaser.Utils.Objects.GetValue, ly = Phaser.Utils.Objects.GetValue, uy = function (t) {
            var e = $g(this.input.targetSizers, t.x, t.y), i = this.input.lastOverChild;
            e && i && e === i || (this.input.lastOverChild = e, Qg(this.eventEmitter, "".concat(this.input.eventNamePrefix, "out"), this.input.targetSizers, i, void 0, t), Qg(this.eventEmitter, "".concat(this.input.eventNamePrefix, "over"), this.input.targetSizers, e, void 0, t))
        }, cy = function (t) {
            var e = this.input.lastOverChild;
            this.input.lastOverChild = null, Qg(this.eventEmitter, "".concat(this.input.eventNamePrefix, "out"), this.input.targetSizers, e, void 0, t)
        }, dy = Phaser.Utils.Objects.GetValue, fy = Phaser.Utils.Objects.GetValue, py = Phaser.Utils.Objects.GetValue,
        vy = Phaser.Utils.Objects.GetValue, gy = function () {
            b(s, Phaser.Plugins.ScenePlugin);
            var n = w(s);

            function s(t, e) {
                var i;
                return B(this, s), (i = n.call(this, t, e)).add = new u(t), i
            }

            return m(s, [{
                key: "start", value: function () {
                    this.scene.events.on("destroy", this.destroy, this)
                }
            }, {
                key: "isInTouching", value: function (t, e, i, n) {
                    return !!t.visible && qa(t, e, i, n)
                }
            }, {
                key: "viewport", get: function () {
                    return Ua(this.scene, !0)
                }
            }]), s
        }(), yy = {
            getParentSizer: Xg, getTopmostSizer: Gg, hide: Ja, show: Na, isShown: Ka, edit: function (t, e, i) {
                return t._edit || (t._edit = new oy(t)), t._edit.open(e, i), t._edit
            }, wrapExpandText: function (t, e) {
                var s, i, n;
                return void 0 === e && (e = 0), t.minWidth = e, t.runWidthWrap = t instanceof Fn ? (n = t, function (t) {
                    return n.setFixedSize(t, 0).runWordWrap(), n
                }) : hp(t) ? (i = t, function (t) {
                    return i.setMaxWidth(t), i
                }) : (s = t, function (t) {
                    var e = s.padding, i = t - e.left - e.right, n = s.style;
                    return ap(s) ? n.wordWrapWidth = i : (0 === n.wrapMode && (n.wrapMode = 1), n.wrapWidth = i), n.maxLines = 0, s.setFixedSize(t, 0), s
                }), t
            }, waitEvent: ts, waitComplete: es, setChildrenInteractive: function (t, e) {
                return t.setInteractive(), t.eventEmitter = vy(e, "eventEmitter", t), t.input.targetSizers = vy(e, "targets", [t]), t.input.eventNamePrefix = vy(e, "inputEventPrefix", "child."), function (t) {
                    var e = hy(t, "click", void 0);
                    !1 !== e && (void 0 === e && (e = {}), e.hasOwnProperty("threshold") || (e.threshold = 10), this._click = new Qu(this, e), this._click.on("click", function (t, e, i) {
                        Qg(this.eventEmitter, "".concat(this.input.eventNamePrefix, "click"), this.input.targetSizers, i.x, i.y, i)
                    }, this))
                }.call(t, e), function (t) {
                    !1 !== ly(t, "over", void 0) && this.on("pointermove", uy, this).on("pointerover", uy, this).on("pointerout", cy, this)
                }.call(t, e), function (t) {
                    var e = dy(t, "tap", void 0);
                    !1 !== e && (this._tap = new Sf(this, e), this._tap.on("tap", function (t, e, i) {
                        Qg(this.eventEmitter, "".concat(this.input.eventNamePrefix).concat(t.tapsCount, "tap"), this.input.targetSizers, t.x, t.y, i)
                    }, this))
                }.call(t, e), function (t) {
                    var e = fy(t, "press", void 0);
                    !1 !== e && (this._press = new Ef(this, e), this._press.on("pressstart", function (t, e, i) {
                        Qg(this.eventEmitter, "".concat(this.input.eventNamePrefix, "pressstart"), this.input.targetSizers, t.x, t.y, i)
                    }, this).on("pressend", function (t, e, i) {
                        Qg(this.eventEmitter, "".concat(this.input.eventNamePrefix, "pressend"), this.input.targetSizers, t.x, t.y, i)
                    }, this))
                }.call(t, e), function (t) {
                    var e = py(t, "swipe", void 0);
                    !1 !== e && (void 0 === e && (e = {}), e.dir = "4dir", this._swipe = new Vf(this, e), this._swipe.on("swipe", function (t, e, i) {
                        var n = t.left ? "left" : t.right ? "right" : t.up ? "up" : "down";
                        Qg(this.eventEmitter, "".concat(this.input.eventNamePrefix, "swipe").concat(n), this.input.targetSizers, t.x, t.y, i)
                    }, this))
                }.call(t, e), t
            }
        };
    return Object.assign(gy.prototype, yy), gy
});