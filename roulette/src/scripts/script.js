
(function () {

    function Lottery() {

        return this._init.apply(this, arguments);

    }

    Lottery.prototype = {

        _init: function (oCanvas, options) {

            if (!oCanvas) return false;

            this.oCanvas = oCanvas;

            this.options = this._setOptions(options);

            this.size = (this.options.products || []).length;

            this.angle = 2 * Math.PI / this.size;

            this.sAngle = 1.5 * Math.PI - this.angle / 2;

            this.ctx = oCanvas.getContext("2d");

            this.rotate = 0;

            this.oImages = [];

            this.imgUrl = [];

            this.isOver = true;

            this._setLayout();

            this._fixOptions();

            this._draw();

            this._start();

        },



        _fixOptions: function () {

            this.outerRadius = parseInt(this.options.outerRadius) || this.radius;

            this.innerRadius = parseInt(this.options.innerRadius) * this.options.scale || 0;

            this.options.speed = Math.min(Math.max(1, this.options.speed), 30);



            if (String(this.options.font.y).indexOf('%') > 0) {

                this.options.font.y = this.outerRadius * parseInt(this.options.font.y) / 100;

            }



            if (String(this.options.images.y).indexOf('%') > 0) {

                this.options.images.y = this.outerRadius * parseInt(this.options.images.y) / 100;

            }

        },



        _setLayout: function () {

            var oCanvas = this.oCanvas;

            var diameter = oCanvas.offsetWidth || oCanvas.clientWidth || oCanvas.width;



            oCanvas.style.height = diameter + 'px';

            oCanvas.style.width = diameter + 'px';



            diameter = diameter * this.options.scale;



            this.diameter = oCanvas.width = oCanvas.height = diameter;

            this.radius = diameter / 2;

        },



        _getFontStyle: function () {

            var scale = this.options.scale;

            var fontStyle = this.options.font;

            return '{{style}} {{weight}} {{size}}/{{lineHeight}} {{family}}'.replace(/\{\{([^}]*)\}\}/g, function (a, b) {

                return b == 'size' ? parseInt(fontStyle[b]) * scale + 'px' : fontStyle[b];

            })

        },



        _drawArc: function () {

            this.ctx.save();

            var fillStyle = this.options.fillStyle;

            if (!fillStyle) return;



            for (var i = 0; i < this.size; i++) {

                var sAngle = this.sAngle + this.angle * i;

                this.ctx.beginPath();

                this.ctx.fillStyle = fillStyle[i % fillStyle.length];

                this.ctx.arc(this.radius, this.radius, this.innerRadius, sAngle, sAngle + this.angle, false);

                this.ctx.arc(this.radius, this.radius, this.outerRadius, sAngle + this.angle, sAngle, true);

                this.ctx.closePath();

                this.ctx.fill();

            }

            this.ctx.restore();

        },

        isArray: function (arr) {

            return arr && Object.prototype.toString.call(arr) == '[object Array]';

        },



        _drawText: function () {

            var fonts = this.options.font;

            var scale = this.options.scale;

            for (var i = 0; i < this.size; i++) {

                var textArr = this._cleverBreak(this.options.products[i].name);

                this.ctx.save();

                this.ctx.translate(this.radius, this.radius);

                this.ctx.rotate(this.angle * i);

                this.ctx.fillStyle = this.isArray(fonts.color) ? fonts.color[i % fonts.color.length] : fonts.color;

                this.ctx.font = this._getFontStyle();

                this.ctx.fillText(textArr[0], -this.ctx.measureText(textArr[0]).width / 2, - fonts.y);



                if (textArr[1]) {

                    var y = -(fonts.y - (parseInt(fonts.size) * scale * this.options.font.lineHeight));

                    this.ctx.fillText(textArr[1], -this.ctx.measureText(textArr[1]).width / 2, y);

                }

                this.ctx.restore();



                this.options.products[i].imgUrl && this.imgUrl.push(this.options.products[i].imgUrl);

            }

        },



        _cleverBreak: function (str) {

            var res, keys = this.options.breakText;

            if (!str) { return res }

            for (var i = 0; i < keys.length; i++) {

                var idx = str.indexOf(keys[i]);

                if (idx > -1) {

                    res = [str.substr(0, idx), str.substr(idx)];

                    break;

                }

            }

            return res || [str];

        },



        _drawImg: function () {

            var self = this,

                width = this.options.images.width,

                height = this.options.images.height;



            this._loadImg(this.imgUrl, function (img) {

                var scale = self.options.scale;

                for (var i = 0; i < img.length; i++) {

                    var ret = img[i],

                        w = (width || ret.width) * scale,

                        h = (height || ret.height) * scale;



                    self.ctx.save();

                    self.ctx.translate(self.radius, self.radius);

                    self.ctx.rotate(self.angle * i);

                    self.ctx.drawImage(ret, -w / 2, -self.options.images.y, w, h);

                    self.ctx.restore();

                };

            });

        },



        _draw: function () {

            var options = this.options,

                products = options.products,

                cx = this.cx, imgArr = [];



            this.ctx.clearRect(0, 0, this.diameter, this.diameter);

            this._drawArc();

            this._drawText();

            this._drawImg();

        },



        _loadImg: function (srcArr, callback) {

            var img = document.createElement('img');

            var cur = cur || 0;

            var self = this;



            if (!self.cur) {

                self.cur = 0;

                self.oImages = [];

            }



            var src = srcArr[self.cur++];

            img.src = src + '?' + self.cur;



            img.onload = function () {

                self.oImages.push(this);

                if (self.cur < srcArr.length) {

                    self._loadImg(srcArr, callback);

                } else {

                    self.cur = false;

                    callback(self.oImages);

                }

                this.onload = false;

            };



            img.onerror = function () {

                //console.log(this.src);

            }

        },



        _beginRotate: function () {

            var self = this, cSpeed = 0, is = 0,

                iSpeed = this.options.speed;



            self.cSpeed = 0;

            self.isOver = false;

            clearInterval(self.timer);



            self.timer = setInterval(function () {

                is = (iSpeed - cSpeed) / iSpeed;

                is = is > 0 ? Math.ceil(is) : Math.floor(is);

                cSpeed += is;

                if (cSpeed > iSpeed) {

                    is = iSpeed;

                }

                self.cSpeed = cSpeed;

                self.rotate += cSpeed;

                self.setRotateStyle(self.rotate);

            }, 30);

        },



        _start: function () {

            var self = this;

            if (!this.options.handler) return;

            this._fastClick(this.options.handler, function (ev) {

                if (self.hasClass(this, 'disabled')) return;

                if (self.isOver) {

                    self.sTime = self.now();

                    self._beginRotate();

                    typeof self.options.handlerCallback === 'function' && self.options.handlerCallback.call(this, self);

                }

            });

        },

        _off: function (elemet, eventType, callback) {

            elemet.removeEventListener(eventType, callback, false);

        },

        _fastClick: function (elemet, callback) {

            if ('ontouchstart' in document) {

                elemet.addEventListener('touchstart', callback, false);

            } else {

                elemet.addEventListener('click', callback, false);

            }
        },
        extend: function (source, distance) {
            for (var attr in distance) {
                if (distance[attr] !== undefined) {
                    source[attr] = distance[attr];
                }
            }
            return source;
        },
        setRotateStyle: function (rotate) {
            this.prefix('transform', 'rotate(' + rotate + 'deg)');
        },
        prefix: function (attr, val) {
            if (!val) return;
            var _fix = ['moz', 'o', 'webkit'], self = this;
            _fix.map(function (item) {
                self.oCanvas.style[item + self.capitalize(attr)] = val;
            });
            self.oCanvas.style[attr] = val;
        },
        capitalize: function (str) {
            return str.substr(0, 1).toUpperCase() + str.substr(1);
        },
        hasClass: function (elemet, className) {
            var cls = elemet.className;
            return !!cls.match(new RegExp('\\b' + className + '\\b'));
        },
        stop: function (idx, callback) {
            var iTime = Math.max(0, this.options.duration - this.now() + this.sTime);
            var self = this, durTimer = null;
            durTimer = setTimeout(function () {
                if (self.options.interval > 0) {
                    self._stop(idx, function (_interface) {
                        _interface.isOver = false;
                        _interface.intervalTimer = setTimeout(function () {
                            _interface.isOver = true;
                            clearTimeout(_interface.intervalTimer);
                            callback && callback(_interface);
                        }, _interface.options.interval)
                    });
                } else {
                    self._stop.apply(self, arguments);
                }
                clearTimeout(durTimer);
            }, iTime);
        },
        _stop: function (idx, callback) {
            var stopTimer = null, self = this, iAngle = 360 / self.size;
            var iTarget = self.rotate + 360 * 4 + (self.size - idx - self.rotate % 360 / iAngle) * iAngle;
            var iSpeed = this.options.speed;
            this.timer && clearInterval(this.timer);
            function move() {
                var cSpeed = (iTarget - self.rotate) / iSpeed;
                cSpeed = cSpeed > 0 ? Math.ceil(cSpeed) : Math.floor(cSpeed);
                if (cSpeed > self.cSpeed) {
                    cSpeed = self.cSpeed;
                }
                self.rotate += cSpeed;
                self.rotate >= iTarget && (self.rotate = iTarget, self.isOver = true);
                self.setRotateStyle(self.rotate);
                if (self.isOver) { clearInterval(stopTimer); callback && callback(self); }
            }
            stopTimer = setInterval(move, 30);
        },
        now: function () {
            return new Date() - 0;
        },
        ua: {
            isIos: /iphone|ipad/i.test(navigator.userAgent),
            isAndroid: /android/i.test(navigator.userAgent)
        },
        /*設定*/
        _setOptions: function (options) {
            /*默認設定*/
            var config = {
                /*點擊抽獎元素*/
                handler: '',
                /*點擊抽獎的回呼函式*/
                handlerCallback: function (_interface) { },
                outerRadius: '',
                innerRadius: 0,
                /*循環填充數組顏色*/
                fillStyle: ['#ffdf8a', '#fffdc9'],
                /*重複觸發的間距時間*/
                interval: 1000,
                /*速度越大越快*/
                speed: 12,
                /*運動最少持續時間*/
                duration: 500,
                /*字體位置與樣式*/
                /*畫面顯示縮放比例，值為1，Android模糊*/
                scale: this.ua.isIos ? 2 : 2,
                /*字體樣式，需整個font對象傳入*/
                font: {
                    y: '50%',
                    color: '#ee6500',
                    /*循環填充字體顏色*/
                    //color: ['#f00', '#ee6500'],
                    style: 'normal',
                    weight: 500,
                    size: '9px',
                    lineHeight: 1,
                    family: 'Arail'
                },
                /*圖片位置與尺寸*/
                images: {
                    y: '88%',
                    width: 32,
                    height: 32
                },
                /*打斷文字換行*/
                breakText: ['隨', '去', '幹', '受', '甜', '形', '大', '猛', '決', '生', '奇'],
                /*禮物*/
                products: [
                    /*{
 
                        imgUrl: 'http://',
 
                        text: '苹果手机',
 
                    }*/
                ]
            };
            return this.extend(config, options);
        }
    };
    window.Lottery = Lottery;
}());

/*模擬ajax請求數據返回*/
function _ajax(callback) {
    // jQuery.ajax({
    // 	url: url,
    // 	data: data,
    // 	success: function(response){
    // 		callback && callback(response);
    // 	}
    // })
    setTimeout(function () {
        var _index = Math.floor(Math.random() * products.length);
        var response = { id: 1, name: products[_index].name, index: _index, url: products[_index].url };
        callback && callback(response);
    }, 100);
}

var products = [
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "全場隨你看",
        "url": "https://smartcinema.pse.is/R45DM"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "我出去醫下",
        "url": "https://smartcinema.pse.is/S6NW4"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "巴爾幹防線",
        "url": "https://smartcinema.pse.is/RAMPS"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "華特",
        "url": "https://smartcinema.pse.is/RP2RD"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "岳父受死吧",
        "url": "https://smartcinema.pse.is/RXAAM"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "盜匪甜心",
        "url": "https://smartcinema.pse.is/RE35C"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "大整形家",
        "url": "https://smartcinema.pse.is/NX3MH"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "絕命大平台",
        "url": "http://user74608.psee.io/QG3PT"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "狂暴猛獅",
        "url": "https://smartcinema.pse.is/PR9U4"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "舞力決戰",
        "url": "http://user74608.psee.io/QZ9LU"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "枯樹生花",
        "url": "https://smartcinema.pse.is/PGPDB"
    },
    {
        "imgUrl": "https://smartcinematw.neocities.org/images/redpacket.png",
        "name": "吹哨奇案",
        "url": "https://smartcinema.pse.is/QZ74B"
    }
];

new Lottery(document.getElementById('lottery'), {
    handler: document.getElementById('lottery-handler'),
    handlerCallback: function (_interface) {
        /*ajax獲取中獎結果*/
        _ajax(function (response) {
            console.log(response);
            /*指定停止的位置:索引*/
            _interface.stop(response.index, function () {
                swal({
                    title: '恭喜你獲得：' + response.name,
                    text: "點擊下方按鈕索取電影觀影券",
                    icon: "success",
                    button: "立即索取",
                }).then(function () { window.location.href = response.url });
                // alert('恭喜你獲得：' + response.name);
                // window.location.href= response.url 
            });
        });
    },
    images: {
        width: 22,
        height: 29,
        y: '88%',
    },
    products: products
});