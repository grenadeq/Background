//document.domain = "www.xici.net";
(function(window) {
    _URLS_CONFIG = {
        reg: 'http://account.xici.net/register?refer=' + encodeURIComponent(location.href),  // 注册地址
        login_modal: 'http://account.xici.net/login/modal?refer=' + encodeURIComponent(location.href), // 登录框iframe地址
        logout: 'http://account.xici.net/logout?refer=' + encodeURIComponent(location.href), // 登出地址
        login: 'http://account.xici.net/login?refer=' + encodeURIComponent(location.href), // 登录
        user_setting: 'http://account.xici.net', //个人设置
        account_mgr: 'http://account.xici.net', //账号管理
        msg_setting: 'http://account.xici.net', //消息设置
        phone_bind: 'http://account.xici.net/account/phone' // 手机绑定
    }

    //console hack！
    window.console = window.console || {
        log: function() {},
        warn: function() {}
    };
    //json2 definition
    "object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
    
    /**
     *@name Class
     * @namespace Class
     * @type {{create: Function, extend: Function}}
     */
    var Class = {
        /**
         * @name Class.create
         * @description 创建一个构造函数，继承自上一级构造函数，或者一个对象
         * @function
         * @example
         * var a=Class.create({method:function(){}})
         * @param {Function} fn
         * @param {Object} obj
         * @returns {Function}
         */
        create: function(fn, obj) {
            var f = function() {};
            if (typeof fn === "function") {
                f.prototype = new fn();
                if (obj) {
                    Class.extend(f.prototype, obj);
                }
                //fn.call(f);
            }
            if (Object.prototype.toString.call(fn) === "[object Object]") {
                f.prototype = fn;
            }
            return f;
        },
        /**
         * @name Class.extend
         * @function
         * @example
         * var c=Class.extend({a:1},{b:2})
         * @description 扩展对象，将属性和方法合并
         * @param a {Object} 被扩展的对象
         * @param b {Object} 扩展的源
         * @returns {Object} 返回扩展后的对象
         */
        extend: function(a, b) {
            for (var i in b) {
                a[i] = b[i];
            }
            return a;
        }
    };
    
    /**
     * @namespace XICI
     * @description 创建XICI对象，作为构造函数返回
     * @type {Object}
     */
    var XICI = {
        name: "XICI",
        version: "0.1",
        /**
         * @namespace XICI.String
         * @name XICI.String
         * @description String操作的一些方法
         */
        String: {
            /**
             * @name XICI.String.trim
             * @description trim方法，将字符串两端的空格去除
             * @function
             * @example
             * var str=" 34 ";
             * var d=XICI.String.trim(str);
             * //return "34"
             * @param str {String} 需要被trim的字符串
             * @returns {String}
             */
            trim: function(str) {
                return str.trim ? str.trim() : str.replace(/(^\s*)|(\s*$)/g, "")
            },
            /**
             * @name XICI.String.toInt
             * @description toInt方法，讲字符串转化为整型
             * @function
             * @example
             * var a="13";
             * toInt(a)
             * //return 13
             * @param str {String}
             * @returns {Number}
             */
            toInt: function(str) {
                return str >> 0;
            },
            /**
             * @name XICI.String.getLength
             * @description 获取字符串长度
             * @function
             * @example
             * var d="13";
             * getLength(d)
             * //return 2
             * @param str {String}
             * @returns {Number}
             */
            getLength: function(str) {
                return str.length;
            },
            /**
             * @name XICI.String.getByteLength
             * @description 获取字符串的字节长度，汉字2字节
             * @function
             * @example
             * var str="你1";
             * getByteLength(str);
             * //return 3
             * @param str {String}
             * @returns {number}
             */
            getByteLength: function(str) {
                var len = 0;
                for (var i = 0; i < str.length; i++) {
                    var c = str.charCodeAt(i);
                    //单字节加1
                    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                        len++;
                    } else {
                        len += 2;
                    }
                }
                return len;
            },
            /**
             * @name XICI.String#cutByte
             * @description 根据字节数来截取字符串，汉字为2字节
             * @function
             * @example
             * var str="你1";
             * cutByte(str,2);
             * //return "你"
             * @param str {String}
             * @param byteLength {Number}
             * @returns {string}
             */
            cutByte: function(str, byteLength) {
                var re = "",
                    start = byteLength / 2 >> 0;
                for (var i = start; i < str.length; i++) {
                    if (XICI.String.getByteLength(str.slice(0, i)) > byteLength) {
                        return re;
                    }
                    re = str.slice(0, i);
                }
                return re;
            }
        },
        /**
         * @name XICI.Array
         * @class
         * @description 数组的一些方法
         * @namespace
         */
        Array: {
            /**
             * @name XICI.Array.getIndex
             * @function
             * @description 获取某个元素在数组中的下标
             * @example
             * var arr=[1,2,3];
             * XICI.Array.getIndex(arr,2);
             * //return 1
             * @param  {Array} arr 目标数组
             * @param  {*} o 被查找的元素
             * @returns {number} 如果该元素不在数组中，返回-1
             */
            getIndex: function(arr, o) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] === o) {
                        return i;
                    }
                }
                return -1;
            },
            /**
             * @name XICI.Array.remove
             * @description 讲元素从所在的数组中移除
             * @function
             * @example
             * var arr=[7,8,9];
             * XICI.Array.remove(8);
             * //return true;
             * console.log(arr);
             * //[7,9]
             * var  arr2=[7,8,9];
             * XICI.Array.remove(10);
             * //return false;
             * console.log(arr2);
             * //[7,8,9]
             * @param arr {Array} 目标数组
             * @param o {*} 需要被移除的元素
             * @returns {boolean} 删除成功，则返回true，如果找不到该元素，返回false
             */
            remove: function(arr, o) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] === o) {
                        arr.splice(i, 1);
                        return true;
                    }
                }
                return false;
            }

        },
        /**
         * @name XICI.BOM
         * @description 浏览器BOM的一些方法
         * @namespace
         */
        BOM: {
            /**
             * @name XICI.BOM.getBrower
             * @description 返回浏览器的navigator对象
             * @function
             * @returns {WorkerNavigator|Navigator}
             */
            getBrowser: function() {
                var n = window.navigator;
                return n;

            },
            /**
             * @name XICI.BOM.isIE
             * @description 判断浏览器是否为IE ,注意，该方法不能检测IE11
             * @function
             * @example
             * if(XICI.BOM.isIE){
             *     alert("i am IE!");
             * }
             * //如果浏览器是IE，则弹出i am IE！
             * @returns {boolean}
             */
            isIE: function() {
                return !!/msie/i.test(window.navigator.userAgent);
            },
            /**
             * @name XICI.BOM.getIEVersion
             * @description 获取IE的版本
             * @function
             * @example
             * var ieVersion=XICI.BOM.getIEVersion();
             * if(ieVersion==6){
             *     alert("你使用的是IE6浏览器")
             * }
             * //如果你使用的是IE6浏览器，则弹出  你使用的是IE6浏览器
             * @returns {*} 非IE或IE11，返回false，其他IE浏览器返回版本
             */
            getIEVersion: function() {
                if (!/msie/i.test(window.navigator.userAgent)) {
                    return false;
                }
                var v = 3,
                    div = document.createElement('div'),
                    all = div.getElementsByTagName('i');
                while (
                    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );
                return v > 4 ? v : 10;
            },
            /**
             * @name XICI.BOM.getCookie
             * @description 根据cookie的名字，获取cookie的值
             * @function
             * @example
             * XICI.BOM.getCookie("uname")
             * //如果cookie中有uname，则返回uname的值，否则返回null
             * @param key {String}
             * @returns {String}
             */
            getCookie: function(key) {
                var c = document.cookie;
                if (c.indexOf(key + "=") == -1) {
                    return null;
                }
                var start = c.indexOf(key + "=");
                var end = c.indexOf(";", start);
                if (end == -1) {
                    end = c.length;
                }
                return decodeURIComponent(c.substring(start + key.length + 1, end));
            },
            /**
             * @name XICI.BOM.setCookie
             * @description 设定cookie
             * @function
             * @example
             * setCookie("key",2,{
             *     expires:1,
             *     path:"/",
             *     domain:"xici.net",
             *     secure:true
             * })
             * @param key {String}
             * @param value {String|Null} 设置为null，则值设置为空
             * @param options {Object}
             * @param options.expires {Number} 有效期几天
             * @param options.path {String} path
             * @param options.domain {String} domain
             * @param options.secure {String} secure
             */
            setCookie: function(key, value, options) {
                if (typeof value != 'undefined') { // name and value given, set cookie
                    options = options || {};
                    if (value === null) {
                        value = '';
                        options.expires = -1;
                    }
                    var expires = '';
                    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                        var date;
                        if (typeof options.expires == 'number') {
                            date = new Date();
                            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                        } else {
                            date = options.expires;
                        }
                        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                    }
                    var path = options.path ? '; path=' + options.path : '';
                    var domain = options.domain ? '; domain=' + options.domain : '';
                    var secure = options.secure ? '; secure' : '';
                    document.cookie = [key, '=', encodeURIComponent(value), expires, path, domain, secure].join('');

                }
            },
            copy: function(text) {

            }
        },
        /**
         * @name XICI.DOM
         * @memberOf XICI
         * @namespace
         * @description 常用的DOM操作
         */
        DOM: {
            /**
             * @name XICI.DOM.contains
             * @description 判断两个DOM对象是否是包含的关系
             * @function
             * @example
             * var c=document.getElementById("cc");
             * var b=document.body;
             * if(XICI.DOM.contains(b,c){
             *     alert("c在body中！")
             * }
             * //如果id为cc的元素在body中，则弹出信息
             * @param parent {HTMLElement} 父元素
             * @param child {HTMLElement} 子元素
             * @returns {Boolean} 包含则返回true，否则返回false
             */
            contains: function(parent, child) {
                if (parent && child && parent.nodeName && child.nodeName) {
                    return parent.contains ? parent.contains(child) : parent.compareDocumentPosition(child) >= 16;
                }
                return false;
            },
            /**
             * @name XICI.DOM.getElement
             * @description 通过ID获取一个元素
             * @function
             * @example
             * var c=XICI.DOM.getElement("cc");
             * console.log(c);
             * //如果参数为字符串，返回id为cc的元素
             * var c=XICI.DOM.getElement(document.body);
             * console.log(c);
             * //如果参数为dom对象，返回dom对象本身
             * @param id {String|HTMLElement} 输入字符串
             * @returns {*} 如果输入的是字符串，则返回DOM元素，如果输入的是DOM元素，则返回其本身
             */
            getElement: function(id) {
                if (typeof id === "string") {
                    return document.getElementById(id);
                }
                return id;
            },
            /**
             * @name XICI.DOM.getXY
             * @description 获取一个DOM元素的坐标
             * @function
             * @example
             * var cc=document.getElementById("cc");
             * var position=XICI.DOM.getXY(cc);
             * console.log(positon.x);
             * //获得元素cc的x坐标
             * console.log(position.y);
             * //获取元素cc的y坐标
             * @param obj {HTMLElement}
             * @returns {{x: number, y: number}}
             */
            getXY: function(obj) {
                var x = 0,
                    y = 0;
                if (obj.getBoundingClientRect) {
                    var box = obj.getBoundingClientRect();
                    var D = document.documentElement;
                    x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
                    y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop;
                } else {
                    for (; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent) {}
                }
                return {
                    x: x,
                    y: y
                };
            },
            /**
             * @name XICI.DOM.innerText
             * @description 获取元素的innerText
             * @function
             * @example
             * var c=document.createElement("div");
             * c.innerHTML="<span>1</span>楼";
             * console.log(XICI.DOM.innerText(c);
             * //输出 1楼
             * @param node {HTMLElement}
             * @returns {string}
             */
            innerText: function(node) {
                return node.innerText || node.textContent;
            },
            /**
             * @name XICI.DOM.newElement
             * @description 创建一个DOM元素,并赋予它属性,注意该方法并没有对IE下的INPUT元素进行兼容
             * @function
             * @example
             * var c=XICI.DOM.newElement("div",{
             *     className:"cc",
             *     innerHTML:"786"
             * };
             * //创建一个div元素，并且它的class是cc，innerHTML为786
             * var input=XICI.DOM.newElement("input",{
             *     type:"checkbox",
             *     value:"786"，
             *     checked:"checked"
             * }
             * //预期:创建一个input元素，type为文本域，value为786,选中状态
             * //在IE下，checked属性进行设置失败
             * @param tag {String} 元素的标签
             * @param prop {Object} 元素的属性
             * @returns {HTMLElement} 返回创建的元素，属性由输入的对象决定
             */
            newElement: function(tag, prop) {
                var node = document.createElement(tag);
                for (var i in prop) {
                    node[i] = prop[i];
                }
                return node;
            },
            /**
             * @edit by Eking on 2014/2/18, 解决兼容性
             * @name XICI.DOM.domReady
             * @description 类似于Jquery.ready();让脚本在文档内容加载完执行
             * @function
             * @example
             * XICI.DOM.domReady(function(){
             *     alert(1);
             * });
             * //在图片等其他资源加载完之前，在dom解析完成之后，弹出 1
             * @param fn {Function}
             * @returns {Object}
             */
            domReady: function(fn) {
                return setTimeout(fn, 0);
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", fn, false);
                    return this;
                } else if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", function() {
                        if (document.readyState == "complete") {
                            fn();
                        }
                    });
                    return this;
                }
            }
        },
        /**
         * @namespace
         * @name XICI.URL
         * @description 常用的URL生成
         */
        URL: {
            /**
             * @name XICI.URL.getBoardURLFromId
             * @description 根据版id，获取版的URL
             * @function
             * @example
             * var boardUrl=XICI.URL.getBoardURLFromId(76878)
             * //返回版id为76878的版首页的url地址
             * @param bid {string|number}
             * @returns {string}
             */
            getBoardURLFromId: function(bid) {
                return "http://labs.xici.net/b" + bid + "/";
            },
            /**
             * @name XICI.URL.getThreadURLFromId
             * @description 通过帖子id获取帖子的url
             * @function
             * @example
             * var threadURL=XICI.URL.getThreadURLFromId(8669999);
             * //获取id为8669999的帖子url地址
             * @param did {string|number}
             * @returns {string}
             */
            getThreadURLFromId: function(did) {
                return "http://labs.xici.net/d" + did + ".htm";
            },
            /**
             * @name XICI.URL.getAvatarURLFromId
             * @description 通过用户id获取头像的url
             * @function
             * @example
             * var avatarURL=XICI.URL.getAvatarURLFromId(70445);
             * //获取id为70445的用户头像的url地址
             * @param uid {string|number}
             * @returns {string}
             */
            getAvatarURLFromId: function(uid) {
                return "http://icons.xici.net/u" + uid + "/files/photo_m.pic";
            },
            getBoardCodeFromId: function(id) {

            },
            /**
             * @name XICI.URL.getThreadCodeFromId
             * @description 通过帖子id获取二维码的url
             * @function
             * @example
             * var threadCode=XICI.URL.getThreadCodeFromId(8888888);
             * //获取id为8888888的帖子的二维码图片的url地址
             * @param did {string|number}
             * @returns {string}
             */
            getThreadCodeFromId: function(did) {
                return "http://store.xici800.com/qrcode/xici/d" + did;
            },
            /**
             * @name XICI.URL.getBoardAvatarFromId
             * @description 通过版id获取版标图片的url
             * @function
             * @example
             * var boardAvatar=XICI.URL.getBoardAvatarFromId(8888888);
             * //获取id为8888888的版的版标url地址
             * @param bid {string|number}
             * @returns {string}
             */
            getBoardAvatarFromId: function(bid) {
                return "http://xiciimgs.xici800.com/board_" + bid + ".jpg"
            }
        }
    };
    
    // UI Event definition
    Class.extend(XICI, {
        /**
         * @nameSpace
         * @name XICI.UI
         * @description 常用的UI组件
         */
        UI: {
        },
        /**
         * @namespace
         * @name XICI.Event
         * @description Event操作
         */
        Event: {
            /**
             * @name XICI.Event.getEvent
             * @function
             * @description 获取event对象
             * @example
             * document.body.onclick=function(e){
             *     var event=XICI.Event.getEvent(e);
             *     //获取event对象
             * }
             * @param e {Event|Undefind} 非IE浏览器，输入event对象
             * @returns {*|Event} 返回event
             */
            getEvent: function(e) {
                return e || window.event;
            },
            /**
             * @name XICI.Event.getTarget
             * @function
             * @description 获取事件触发的元素
             * @example
             * document.body.onclick=function(e){
             *     var tar=XICI.Event.getTarget(e);
             *     //获取事件响应的最内层元素
             * }
             * @param e {Event|Undefined} 输入的event
             * @returns {EventTarget|Object}
             */
            getTarget: function(e) {
                e = this.getEvent(e);
                return e.target || e.srcElement;
            },
            /**
             * @name XICI.Event.addEvent
             * @function
             * @description 通用的事件绑定方法,没有对IE下的this指向问题做出兼容处理，要注意！！！
             * @example
             * XICI.Event.addEvent(document.body,"click",function(e){
             *     var tar=XICI.Event.getTarget(e);
             *     //事件绑定后，一样可以获得事件响应的元素
             *     alert(this);
             *     //for ie6,ie7,ie8 this会指向window
             * })
             * @param dom {HTMLElement}
             * @param eventName {string}
             * @param handle {function}
             */
            addEvent: function(dom, eventName, handle) {
                //for browsers except ie6 ie7 ie8
                if (document.addEventListener) {
                    dom.addEventListener(eventName, handle, false);
                    return;
                }
                //for ie6 ie7 ie8
                if (document.attachEvent) {
                    dom.attachEvent("on" + eventName, handle);
                }
            },
            /**
             * @name XICI.Event.removeEvent
             * @function
             * @description 通用的事件解除绑定方法
             * @example
             * XICI.Event.removeEvent(document.body,"click",method);
             * @param dom {HTMLElement}
             * @param eventName {string}
             * @param handle {function}
             */
            removeEvent: function(dom, eventName, handle) {
                if (document.removeEventListener) {
                    dom.removeEventListener(eventName, handle, false);
                    return;
                }
                if (document.detachEvent) {
                    dom.detachEvent("on" + eventName, handle);
                }
            },
            /**
             * @name XICI.Event.stopPropagation
             * @function
             * @description 阻止事件冒泡
             * @example
             * XICI.Event.addEvent(document.body,"click",function(e){
             *     XICI.Event.stopPropagation(e);
             *     //阻止事件冒泡
             * });
             * @param e {Event} 事件对象
             */
            stopPropagation: function(e) {
                e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
            },
            /**
             * @name XICI.Event.preventDefault
             * @function
             * @description 阻止事件的默认事件
             * @example
             * XICI.Event.addEvent(document.body,"click",function(e){
             *     var tar=XICI.Event.getTarget(e);
             *     if(tar.nodeName=="A"){
             *         XICI.Event.preventDefault(e);
             *     }
             *     //阻止所有a链接的跳转
             * });
             * @param e {Event} 事件对象
             */
            preventDefault: function(e) {
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            }
        }
    });

    // UI login definition
    Class.extend(XICI.UI, {
        /**
         * @name XICI.UI.login
         * @constructor
         * @description 登录组件
         * @require XICI.UI.art
         * @example
         * var login=new XICI.UI.login();
         * login.show();
         */
        login: Class.create(
            /**
             * @lends XICI.UI.login.prototype
             */
            {
                /**
                 * @private
                 * @function
                 * @description 初始化
                 * @param callback {function} 回调函数，未实现
                 */
                init: function(callback) {
                    this.callback = callback || function() {};
                },
                initSocket: function(socket) {
                    this.userInfo = {
                        username: XICI.BOM.getCookie("uname"),
                        password: XICI.BOM.getCookie("pwd"),
                        uid: XICI.BOM.getCookie("uidd")
                    };
                    /*
                    if (socket) {
                        this.socket = socket;
                        return;
                    }
                    this.socket = new XICI.socketIO();
                    this.socket.connect();
                    */
                },
                /**
                 * @function
                 * @description 显示登录
                 *
                 */
                show: function() {
                    var _ = this;
                    XICI.UI.art.dialog.open(_URLS_CONFIG.login_modal, {
                        title: false,
                        'lock': true,
                        'fixed': true,
                        width: 500,
                        height: 370
                    }, false);
                }
            })
    });
    
    // Ajax JSON JSONP definition
    Class.extend(XICI, {
        /**
         * @name XICI.Ajax
         * @class Ajax组件，支持then方法
         * @constructor
         * @requires XICI
         * @requires Class
         * @param o.url {String} 传入的请求地址
         * @param o.type {String} 请求的方式 "get|post"
         * @param o.data {String} 请求方式为post时可选，requestBody数据
         * @param o.success {Function} 请求成功，200时的回调函数，this指向o
         * @param o.error {Function} 请求失败的回调函数，函数第一个参数为ajax的status，第二个参数为返回的text,this指向o
         * @param o.beforeSend {Function} 请求前的函数，this指向o
         * @example
         * var ajax=new XICI.Ajax({
         *     url:"/post",
         *     data:"abc=7",
         *     type:"post",
         *     success:function(o){
         *         console.log(o);
         *     }
         * });
         */
        Ajax: function(o) {
            var _ = this;
            Class.extend(_, {
                finished: false,
                requestQueue: []
            });
            _.def = {
                url: "",
                type: "get",
                data: "",
                contentType: "json",
                timeStamp: "",
                success: function() {

                },
                beforeSend: function() {},
                async: true,
                error: function(status, response) {

                }
            }
            if (o && o.url) {
                _.requestQueue.push(o);
                _.startRequest();
            }
        },
        /**
         * @name XICI.JSONP
         * @function
         * @requires XICI
         * @requires Class
         * @param o.url {String} 传入的请求地址
         * @param o.success {Function} 请求成功，200时的回调函数，this指向o
         * @example
         * XICI.JSONP({
         *     url:"http://www.xici.net/abc.asp?callback=_", //以下划线标定callback
         *     success:function(o){
         *         console.log(o);
         *     }
         * });
         */
        JSONP: function(o) {
            var _ = this;
            var functionName = "xici" + (Math.random() * 10000 >> 0);
            window[functionName] = o.success;
            var url = o.url.replace(/_/g, functionName);
            var s = document.createElement("script");
            s.async = true;
            s.onload = s.onreadystatechange = function() {
                if (!s.readyState || /loaded|complete/.test(s.readyState)) {
                    s.onload = s.onreadystatechange = null;
                    if (s.parentNode) {
                        s.parentNode.removeChild(s);
                    }
                    s = null;
                }
            };
            s.src = url;
            document.getElementsByTagName("head")[0].appendChild(s);
        },
        /**
         * @namespace
         * @name XICI.JSON
         * @description 常用的JSON处理方法
         */
        JSON: {
            /**
             * @name XICI.JSON.toJSONString
             * @function
             * @desription 讲json格式化为字符串
             * @param o {object} 目标json
             * @returns {*}
             */
            toJSONString: function(o) {
                return JSON.stringify(o);
            }
        }
    });
    Class.extend(XICI.Ajax.prototype, {
        /**
         * @private
         * @function
         * @description 创建一个xmlHttpRequest对象
         * @returns {window.XMLHttpRequest}
         */
        createAjax: function() {
            return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        },
        /**
         * @private
         * @function
         * @description ajax请求的主线程
         */
        startRequest: function() {
            var _ = this;
            _.XHR = _.createAjax();
            var d = new Date();

            if (_.requestQueue.length == 0) {
                _.finished = true;
                return;
            }
            Class.extend(_.def, _.requestQueue[0]);
            var o = _.def;
            o.beforeSend.call(_.def);
            _.requestQueue.shift();
            o.data.v = "labs";
            // console.log(o.data.method || o.url);
            if (o.data instanceof Object) {
                o.data = _.makeRequestString(o.data);
            }

            if (o.type == "get") {
                _.XHR.onreadystatechange = callback;
                if (o.url.indexOf("?") > 0) {
                    _.XHR.open(o.type, o.url + "&now=" + new Date().valueOf() + o.data, o.async);
                } else {
                    _.XHR.open(o.type, o.url + "?now=" + new Date().valueOf() + o.data, o.async);
                }
                _.XHR.send();
            }
            if (o.type == "post") {
                _.XHR.onreadystatechange = callback;
                _.XHR.open(o.type, o.url, o.async);
                _.XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                _.XHR.send(o.data);
            }

            function callback() {

                if (_.XHR.readyState == 4) {
                    if (_.XHR.status == 200) {
                        var databack = _.XHR.responseText;
                        if (o.contentType == "json") {
                            if (databack) {
                                databack = eval("(" + databack + ")");
                            } else {
                                o.success.call(o, {});
                            }
                        }
                        o.success.call(o, databack);
                    } else {
                        o.error.call(o, _.XHR.status, _.XHR.responseText);
                    }
                    _.startRequest();
                }


            }
        },
        /**
         * @private
         * @function
         * @description 将对象转化为URI字符串
         * @param o {object}
         * @returns {string}
         */
        makeRequestString: function(o) {
            var arr = [];
            for (var i in o) {
                arr.push("" + i + "=" + encodeURIComponent(o[i]));
            }
            return arr.join("&");
        },
        /**
         * @function
         * @description 终止ajax连接
         */
        abort: function() {
            this.XHR.abort();
        },
        /**
         * @function
         * @description 将新的ajax请求压入队列
         * @param o {Object} 新的设置
         */

        then: function(o) {
            var _ = this;
            _.requestQueue.push(o);
            if (_.finished) {
                _.startRequest();
            }

        }
    });
    /*!
     * artDialog 4.16
     */
    (function(g, h) {
        function n(b) {
            var d = c.expando,
                e = b === g ? 0 : b[d];
            e === h && (b[d] = e = ++c.uuid);
            return e;
        }

        function p() {
            if (!c.isReady) {
                try {
                    document.documentElement.doScroll("left");
                } catch (b) {
                    setTimeout(p, 1);
                    return;
                }
                c.ready();
            }
        }

        var c = g.art = function(b, d) {
            return new c.fn.init(b, d)
        }, v = !1,
            r = [],
            s, l = "opacity" in document.documentElement.style,
            t = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
            m = /[\n\t]/g,
            q = /alpha\([^)]*\)/i,
            z = /opacity=([^)]*)/,
            x = /^([+-]=)?([\d+-.]+)(.*)$/;
        if (g.$ === h) g.$ = c;
        c.fn = c.prototype = {
            constructor: c,
            ready: function(b) {
                c.bindReady();
                c.isReady ? b.call(document, c) : r && r.push(b);
                return this
            },
            hasClass: function(b) {
                return -1 < (" " + this[0].className + " ").replace(m, " ").indexOf(" " + b + " ") ? !0 : !1
            },
            addClass: function(b) {
                this.hasClass(b) || (this[0].className += " " + b);
                return this
            },
            removeClass: function(b) {
                var d = this[0];
                if (b) {
                    if (this.hasClass(b)) d.className = d.className.replace(b, " ")
                } else d.className = "";
                return this
            },
            css: function(b, d) {
                var e, a = this[0];
                if ("string" === typeof b) {
                    if (d === h) return c.css(a, b);
                    "opacity" === b ? c.opacity.set(a, d) : a.style[b] = d
                } else
                    for (e in b) "opacity" === e ? c.opacity.set(a, b[e]) : a.style[e] = b[e];
                return this
            },
            show: function() {
                return this.css("display", "block")
            },
            hide: function() {
                return this.css("display", "none")
            },
            offset: function() {
                var b = this[0],
                    d = b.getBoundingClientRect(),
                    c = b.ownerDocument,
                    b = c.body,
                    c = c.documentElement;
                return {
                    left: d.left + (self.pageXOffset || c.scrollLeft) - (c.clientLeft || b.clientLeft || 0),
                    top: d.top + (self.pageYOffset || c.scrollTop) - (c.clientTop || b.clientTop || 0)
                }
            },
            html: function(b) {
                var d = this[0];
                if (b === h) return d.innerHTML;
                c.cleanData(d.getElementsByTagName("*"));
                d.innerHTML = b;
                return this
            },
            remove: function() {
                var b = this[0];
                c.cleanData(b.getElementsByTagName("*"));
                c.cleanData([b]);
                b.parentNode.removeChild(b);
                return this
            },
            bind: function(b, d) {

                c.event.add(this[0], b, d);
                return this;
            },
            unbind: function(b, d) {
                c.event.remove(this[0], b, d);
                return this;
            }
        };
        c.fn.init = function(b, d) {
            var e, d = d || document;
            if (!b) return this;
            if (b.nodeType) return this[0] = b, this;
            if ("body" === b && d.body) return this[0] = d.body, this;
            if ("head" === b || "html" === b) return this[0] = d.getElementsByTagName(b)[0], this;
            if ("string" === typeof b && (e = t.exec(b)) && e[2]) return (e = d.getElementById(e[2])) && e.parentNode && (this[0] = e), this;
            if ("function" === typeof b) return c(document).ready(b);
            this[0] = b;
            return this
        };
        c.fn.init.prototype = c.fn;
        c.noop = function() {};
        c.isWindow = function(b) {
            return b && "object" === typeof b && "setInterval" in b
        };
        c.isArray = function(b) {
            return "[object Array]" === Object.prototype.toString.call(b)
        };
        c.fn.find = function(b) {
            var d = this[0],
                e = b.split(".")[1];
            if (e)
                if (document.getElementsByClassName) e = d.getElementsByClassName(e);
                else {
                    for (var a = b = 0, f = [], d = (d || document).getElementsByTagName("*"), k = d.length, e = RegExp("(^|\\s)" + e + "(\\s|$)"); b < k; b++) e.test(d[b].className) && (f[a] = d[b], a++);
                    e = f
                } else e = d.getElementsByTagName(b);
            return c(e[0])
        };
        c.each = function(b, d) {
            var c, a = 0,
                f = b.length;
            if (f === h)
                for (c in b) {
                    if (!1 === d.call(b[c], c, b[c])) break
                } else
                    for (c = b[0]; a < f && !1 !== d.call(c, a, c); c = b[++a]);
            return b
        };
        c.data = function(b, d, e) {
            var a = c.cache,
                b = n(b);
            if (d === h) return a[b];
            a[b] || (a[b] = {});
            e !== h && (a[b][d] = e);
            return a[b][d]
        };
        c.removeData = function(b, d) {
            var e = !0,
                a = c.expando,
                f = c.cache,
                k = n(b),
                w = k && f[k];
            if (w)
                if (d) {
                    delete w[d];
                    for (var y in w) e = !1;
                    e && delete c.cache[k]
                } else delete f[k], b.removeAttribute ? b.removeAttribute(a) : b[a] = null
        };
        c.uuid = 0;
        c.cache = {};
        c.expando = "@cache" + +new Date;
        c.event = {
            add: function(b, d, e) {
                var i;
                var a, f = c.event;
                a = c.data(b, "@events") || c.data(b, "@events", {});
                i = a[d] = a[d] || {}, a = i;
                (a.listeners = a.listeners || []).push(e);
                if (!a.handler) a.elem = b, a.handler = f.handler(a), b.addEventListener ? b.addEventListener(d, a.handler, !1) : b.attachEvent("on" + d, a.handler)
            },
            remove: function(b, d, e) {
                var a, f, k;
                f = c.event;
                var w = !0,
                    y = c.data(b, "@events");
                if (y)
                    if (d) {
                        if (f = y[d]) {
                            k = f.listeners;
                            if (e)
                                for (a = 0; a < k.length; a++) k[a] === e && k.splice(a--, 1);
                            else f.listeners = [];
                            if (0 === f.listeners.length) {
                                b.removeEventListener ? b.removeEventListener(d, f.handler, !1) : b.detachEvent("on" + d, f.handler);
                                delete y[d];
                                f = c.data(b, "@events");
                                for (var i in f) w = !1;
                                w && c.removeData(b, "@events")
                            }
                        }
                    } else
                        for (a in y) f.remove(b, a)
            },
            handler: function(b) {
                return function(d) {
                    for (var d = c.event.fix(d || g.event), e = 0, a = b.listeners, f; f = a[e++];)!1 === f.call(b.elem, d) && (d.preventDefault(), d.stopPropagation())
                }
            },
            fix: function(b) {
                if (b.target) return b;
                var c = {
                    target: b.srcElement || document,
                    preventDefault: function() {
                        b.returnValue = !1
                    },
                    stopPropagation: function() {
                        b.cancelBubble = !0
                    }
                }, e;
                for (e in b) c[e] = b[e];
                return c
            }
        };
        c.cleanData = function(b) {
            for (var d = 0, e, a = b.length, f = c.event.remove, k = c.removeData; d < a; d++) e = b[d], f(e), k(e)
        };
        c.isReady = !1;
        c.ready = function() {
            if (!c.isReady) {
                if (!document.body) return setTimeout(c.ready, 13);
                c.isReady = !0;
                if (r) {
                    for (var b, d = 0; b = r[d++];) b.call(document, c);
                    r = null
                }
            }
        };
        c.bindReady = function() {
            if (!v) {
                v = !0;
                if ("complete" === document.readyState) return c.ready();
                if (document.addEventListener) document.addEventListener("DOMContentLoaded", s, !1), window.addEventListener("load", c.ready, !1);
                else if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", s);
                    window.attachEvent("onload", c.ready);
                    var b = !1;
                    try {
                        b = null == g.frameElement
                    } catch (d) {}
                    document.documentElement.doScroll && b && p()
                }
            }
        };
        document.addEventListener ? s = function() {
            document.removeEventListener("DOMContentLoaded", s, !1);
            c.ready()
        } : document.attachEvent && (s = function() {
            "complete" === document.readyState && (document.detachEvent("onreadystatechange", s), c.ready())
        });
        c.css = "defaultView" in document && "getComputedStyle" in document.defaultView ? function(b, c) {
            return document.defaultView.getComputedStyle(b, !1)[c]
        } : function(b, d) {
            return ("opacity" === d ? c.opacity.get(b) : b.currentStyle[d]) || ""
        };
        c.opacity = {
            get: function(b) {
                return l ? document.defaultView.getComputedStyle(b, !1).opacity : z.test((b.currentStyle ? b.currentStyle.filter : b.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : 1
            },
            set: function(b, c) {
                if (l) return b.style.opacity = c;
                var e = b.style;
                e.zoom = 1;
                var a = "alpha(opacity=" + 100 * c + ")",
                    f = e.filter || "";
                e.filter = q.test(f) ? f.replace(q, a) : e.filter + " " + a
            }
        };
        c.each(["Left", "Top"], function(b, d) {
            var e = "scroll" + d;
            c.fn[e] = function() {
                var a = this[0],
                    f;
                return (f = c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1) ? "pageXOffset" in f ? f[b ? "pageYOffset" : "pageXOffset"] : f.document.documentElement[e] || f.document.body[e] : a[e]
            }
        });
        c.each(["Height", "Width"], function(b, d) {
            var e = d.toLowerCase();
            c.fn[e] = function(a) {
                var f = this[0];
                return !f ? null == a ? null : this : c.isWindow(f) ? f.document.documentElement["client" + d] || f.document.body["client" + d] : 9 === f.nodeType ? Math.max(f.documentElement["client" + d], f.body["scroll" + d], f.documentElement["scroll" + d], f.body["offset" + d], f.documentElement["offset" + d]) : null
            }
        });
        c.ajax = function(b) {
            var d = g.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
                e = b.url;
            if (!1 === b.cache) var a = +new Date,
            f = e.replace(/([?&])_=[^&]*/, "$1_=" + a), e = f + (f === e ? (/\?/.test(e) ? "&" : "?") + "_=" + a : "");
            d.onreadystatechange = function() {
                if (4 === d.readyState && 200 === d.status) b.success && b.success(d.responseText), d.onreadystatechange = c.noop
            };
            d.open("GET", e, 1);
            d.send(null)
        };
        c.fn.animate = function(b, d, e, a) {
            "function" === typeof e && (a = e);
            var e = e && c.easing[e] ? e : "swing",
                f = this[0],
                k, w, y, i, j, u, o = {
                    speed: d || 400,
                    easing: e,
                    callback: function() {
                        if (null != k) f.style.overflow = "";
                        a && a()
                    },
                    curAnim: {}
                };
            c.each(b, function(a, f) {
                o.curAnim[a] = f
            });
            c.each(b, function(a, b) {
                w = new c.fx(f, o, a);
                y = x.exec(b);
                i = parseFloat("opacity" === a || f.style && null != f.style[a] ? c.css(f, a) : f[a]);
                j = parseFloat(y[2]);
                u = y[3];
                if ("height" === a || "width" === a) j = Math.max(0, j), k = [f.style.overflow, f.style.overflowX, f.style.overflowY];
                w.custom(i, j, u)
            });
            if (null != k) f.style.overflow = "hidden";
            return this
        };
        c.timers = [];
        c.fx = function(b, c, e) {
            this.elem = b;
            this.options = c;
            this.prop = e
        };
        c.fx.prototype = {
            custom: function(b, d, e) {
                function a() {
                    return f.step()
                }

                var f = this;
                f.startTime = c.fx.now();
                f.start = b;
                f.end = d;
                f.unit = e;
                f.now = f.start;
                f.state = f.pos = 0;
                a.elem = f.elem;
                a();
                c.timers.push(a);
                if (!c.timerId) c.timerId = setInterval(c.fx.tick, 13)
            },
            step: function() {
                var b = c.fx.now(),
                    d = !0;
                if (b >= this.options.speed + this.startTime) {
                    this.now = this.end;
                    this.state = this.pos = 1;
                    this.update();
                    this.options.curAnim[this.prop] = !0;
                    for (var e in this.options.curAnim)!0 !== this.options.curAnim[e] && (d = !1);
                    d && this.options.callback.call(this.elem);
                    return !1
                }
                b -= this.startTime;
                this.state = b / this.options.speed;
                this.pos = c.easing[this.options.easing](this.state, b, 0, 1, this.options.speed);
                this.now = this.start + (this.end - this.start) * this.pos;
                this.update();
                return !0
            },
            update: function() {
                "opacity" === this.prop ? c.opacity.set(this.elem, this.now) : this.elem.style && null != this.elem.style[this.prop] ? this.elem.style[this.prop] = this.now + this.unit : this.elem[this.prop] = this.now
            }
        };
        c.fx.now = function() {
            return +new Date
        };
        c.easing = {
            linear: function(b, c, e, a) {
                return e + a * b
            },
            swing: function(b, c, e, a) {
                return (-Math.cos(b * Math.PI) / 2 + 0.5) * a + e
            }
        };
        c.fx.tick = function() {
            for (var b = c.timers, d = 0; d < b.length; d++)!b[d]() && b.splice(d--, 1);
            !b.length && c.fx.stop()
        };
        c.fx.stop = function() {
            clearInterval(c.timerId);
            c.timerId = null
        };
        c.fn.stop = function() {
            for (var b = c.timers, d = b.length - 1; 0 <= d; d--) b[d].elem === this[0] && b.splice(d, 1);
            return this
        };
        return c;
    })(XICI.UI);

    (function(g, h, n) {
        g.noop = g.noop || function() {};
        var p, c, v, r, s = 0,
            l = g(h),
            t = g(document),
            m = g("html");
        v = document.documentElement;
        var q = h.VBArray && !h.XMLHttpRequest,
            z = "createTouch" in document && !("onmousemove" in v) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
            x = "artDialog" + +new Date,
            b = function(a, f, c) {
                a = a || {};
                if ("string" === typeof a || 1 === a.nodeType) a = {
                    content: a,
                    fixed: !z
                };
                var d;
                d = b.defaults;
                var e = a.follow = 1 === this.nodeType && this || a.follow,
                    i;
                for (i in d) a[i] === n && (a[i] = d[i]);
                g.each({
                    ok: "yesFn",
                    cancel: "noFn",
                    close: "closeFn",
                    init: "initFn",
                    okVal: "yesText",
                    cancelVal: "noText"
                }, function(f, b) {
                    a[f] = a[f] !== n ? a[f] : a[b]
                });
                "string" === typeof e && (e = g(e)[0]);
                a.id = e && e[x + "follow"] || a.id || x + s;
                d = b.list[a.id];
                if (e && d) return d.follow(e).zIndex().focus();
                if (d) return d.zIndex().focus();
                if (z) a.fixed = !1;
                if (!g.isArray(a.button)) a.button = a.button ? [a.button] : [];
                if (f !== n) a.ok = f;
                if (c !== n) a.cancel = c;
                a.ok && a.button.push({
                    name: a.okVal,
                    callback: a.ok,
                    focus: !0
                });
                a.cancel && a.button.push({
                    name: a.cancelVal,
                    callback: a.cancel
                });
                b.defaults.zIndex = a.zIndex;
                s++;
                return b.list[a.id] = p ? p._init(a) : new b.fn._init(a)
            };
        b.fn = b.prototype = {
            version: "4.1.6",
            closed: !0,
            _init: function(a) {
                var f, b = a.icon,
                    c = b && (q ? {
                        png: "icons/" + b + ".png"
                    } : {
                        backgroundImage: "url('" + a.path + "/skins/icons/" + b + ".png')"
                    });
                this.closed = !1;
                this.config = a;
                this.DOM = f = this.DOM || this._getDOM();
                f.wrap.addClass(a.skin);
                f.close[!1 === a.cancel ? "hide" : "show"]();
                f.icon[0].style.display = b ? "" : "none";
                f.iconBg.css(c || {
                    background: "none"
                });
                f.se.css("cursor", a.resize ? "se-resize" : "auto");
                f.title.css("cursor", a.drag ? "move" : "auto");
                f.content.css("padding", a.padding);
                this[a.show ? "show" : "hide"](!0);
                this.button(a.button).title(a.title).content(a.content, !0).size(a.width, a.height).time(a.time);
                a.follow ? this.follow(a.follow) : this.position(a.left, a.top);
                this.zIndex().focus();
                a.lock && this.lock();
                this._addEvent();
                this._ie6PngFix();
                p = null;
                a.init && a.init.call(this, h);
                return this
            },
            content: function(a, b) {
                var c, d, e, i, j = this,
                    u = j.DOM,
                    o = u.wrap[0],
                    g = o.offsetWidth,
                    t = o.offsetHeight,
                    h = parseInt(o.style.left),
                    q = parseInt(o.style.top),
                    m = o.style.width,
                    u = u.content,
                    l = u[0];
                j._elemBack && j._elemBack();
                o.style.width = "auto";
                if (a === n) return l;
                if ("string" === typeof a) u.html(a);
                else if (a && 1 === a.nodeType) i = a.style.display, c = a.previousSibling, d = a.nextSibling, e = a.parentNode, j._elemBack = function() {
                    c && c.parentNode ? c.parentNode.insertBefore(a, c.nextSibling) : d && d.parentNode ? d.parentNode.insertBefore(a, d) : e && e.appendChild(a);
                    a.style.display = i;
                    j._elemBack = null
                }, u.html(""), l.appendChild(a), a.style.display = "block";
                if (!b) {
                    j.config.follow ? j.follow(j.config.follow) : (g = o.offsetWidth - g, t = o.offsetHeight - t, q -= t / 2, o.style.left = Math.max(h - g / 2, 0) + "px", o.style.top = Math.max(q, 0) + "px");
                    if (m && "auto" !== m) o.style.width = o.offsetWidth + "px";
                    j._autoPositionType()
                }
                j._ie6SelectFix();
                j._runScript(l);
                return j
            },
            title: function(a) {
                var b = this.DOM,
                    c = b.wrap,
                    b = b.title;
                if (a === n) return b[0];
                !1 === a ? (b.hide().html(""), c.addClass("aui_state_noTitle")) : (b.show().html(a || ""), c.removeClass("aui_state_noTitle"));
                return this
            },
            position: function(a, b) {
                var c = this.config,
                    d = this.DOM.wrap[0],
                    e = q ? !1 : c.fixed,
                    c = q && this.config.fixed,
                    i = t.scrollLeft(),
                    j = t.scrollTop(),
                    g = e ? 0 : i,
                    e = e ? 0 : j,
                    o = l.width(),
                    h = l.height(),
                    m = d.offsetWidth,
                    p = d.offsetHeight,
                    d = d.style;
                if (a || 0 === a)
                    if (this._left = -1 !== a.toString().indexOf("%") ? a : null, a = this._toNumber(a, o - m), "number" === typeof a) a = c ? a += i : a + g, d.left = Math.max(a, g) + "px";
                    else
                if ("string" === typeof a) d.left = a;
                if (b || 0 === b)
                    if (this._top = -1 !== b.toString().indexOf("%") ? b : null, b = this._toNumber(b, h - p), "number" === typeof b) b = c ? b += j : b + e, d.top = Math.max(b, e) + "px";
                    else
                if ("string" === typeof b) d.top = b;
                if (a !== n && b !== n) this._follow = null, this._autoPositionType();
                return this
            },
            size: function(a, b) {
                var c, d, e = this.DOM;
                d = e.wrap;
                var i = e.main,
                    g = d[0].style,
                    e = i[0].style;
                if (a)
                    if (this._width = -1 !== a.toString().indexOf("%") ? a : null, c = l.width() - d[0].offsetWidth + i[0].offsetWidth, a = c = this._toNumber(a, c), "number" === typeof a) g.width = "auto", e.width = Math.max(this.config.minWidth, a) + "px", g.width = d[0].offsetWidth + "px";
                    else
                if ("string" === typeof a) e.width = a, "auto" === a && d.css("width", "auto");
                if (b)
                    if (this._height = -1 !== b.toString().indexOf("%") ? b : null, d = l.height() - d[0].offsetHeight + i[0].offsetHeight, b = d = this._toNumber(b, d), "number" === typeof b) e.height = Math.max(this.config.minHeight, b) + "px";
                    else
                if ("string" === typeof b) e.height = b;
                this._ie6SelectFix();
                return this
            },
            follow: function(a) {
                var b, c = this.config;
                if ("string" === typeof a || a && 1 === a.nodeType) b = g(a), a = b[0];
                if (!a || !a.offsetWidth && !a.offsetHeight) return this.position(this._left, this._top);
                var d = x + "follow",
                    e = l.width(),
                    i = l.height(),
                    j = t.scrollLeft(),
                    u = t.scrollTop(),
                    o = b.offset();
                b = a.offsetWidth;
                var h = q ? !1 : c.fixed,
                    m = h ? o.left - j : o.left,
                    o = h ? o.top - u : o.top,
                    n = this.DOM.wrap[0],
                    p = n.style,
                    r = n.offsetWidth,
                    n = n.offsetHeight,
                    s = m - (r - b) / 2,
                    z = o + a.offsetHeight,
                    j = h ? 0 : j,
                    u = h ? 0 : u;
                p.left = (s < j ? m : s + r > e && m - r > j ? m - r + b : s) + "px";
                p.top = (z + n > i + u && o - n > u ? o - n : z) + "px";
                this._follow && this._follow.removeAttribute(d);
                this._follow = a;
                a[d] = c.id;
                this._autoPositionType();
                return this
            },
            button: function() {
                var a = this,
                    b = arguments,
                    c = a.DOM.buttons,
                    d = c[0],
                    e = a._listeners = a._listeners || {}, i = g.isArray(b[0]) ? b[0] : [].slice.call(b);
                if (b[0] === n) return d;
                g.each(i, function(b, c) {
                    var f = c.name,
                        k = !e[f],
                        i = !k ? e[f].elem : document.createElement("button");
                    e[f] || (e[f] = {});
                    if (c.callback) e[f].callback = c.callback;
                    if (c.className) i.className = c.className;
                    if (c.focus) a._focus && a._focus.removeClass("aui_state_highlight"), a._focus = g(i).addClass("aui_state_highlight"), a.focus();
                    i.setAttribute("type", "button");
                    i[x + "callback"] = f;
                    i.disabled = !! c.disabled;
                    if (k) i.innerHTML = f, e[f].elem = i, d.appendChild(i)
                });
                c[0].style.display = i.length ? "" : "none";
                a._ie6SelectFix();
                return a
            },
            show: function(a) {
                this.DOM.wrap.show();
                !a && this._lockMaskWrap && this._lockMaskWrap.show();
                return this
            },
            hide: function(a) {
                this.DOM.wrap.hide();
                !a && this._lockMaskWrap && this._lockMaskWrap.hide();
                return this
            },
            close: function() {
                if (this.closed) return this;
                var a = this.DOM,
                    c = a.wrap,
                    d = b.list,
                    e = this.config.close,
                    g = this.config.follow;
                this.time();
                if ("function" === typeof e && !1 === e.call(this, h)) return this;
                this.unlock();
                this._elemBack && this._elemBack();
                c[0].className = c[0].style.cssText = "";
                a.title.html("");
                a.content.html("");
                a.buttons.html("");
                if (b.focus === this) b.focus = null;
                g && g.removeAttribute(x + "follow");
                delete d[this.config.id];
                this._removeEvent();
                this.hide(!0)._setAbsolute();
                for (var i in this) this.hasOwnProperty(i) && "DOM" !== i && delete this[i];
                p ? c.remove() : p = this;
                return this
            },
            time: function(a) {
                var b = this,
                    c = b.config.cancelVal,
                    d = b._timer;
                d && clearTimeout(d);
                if (a) b._timer = setTimeout(function() {
                    b._click(c)
                }, 1E3 * a);
                return b
            },
            focus: function() {
                try {
                    var a = this._focus && this._focus[0] || this.DOM.close[0];
                    a && a.focus()
                } catch (b) {}
                return this
            },
            zIndex: function() {
                var a = this.DOM.wrap,
                    c = b.focus,
                    d = b.defaults.zIndex++;
                a.css("zIndex", d);
                this._lockMask && this._lockMask.css("zIndex", d - 1);
                c && c.DOM.wrap.removeClass("aui_state_focus");
                b.focus = this;
                a.addClass("aui_state_focus");
                return this
            },
            lock: function() {
                if (this._lock) return this;
                var a = this,
                    c = b.defaults.zIndex - 1,
                    d = a.DOM.wrap,
                    e = a.config,
                    h = t.width(),
                    i = t.height(),
                    j = a._lockMaskWrap || g(document.body.appendChild(document.createElement("div"))),
                    m = a._lockMask || g(j[0].appendChild(document.createElement("div"))),
                    h = z ? "width:" + h + "px;height:" + i + "px" : "width:100%;height:100%",
                    i = q ? "position:absolute;left:expression((document).documentElement.scrollLeft);top:expression((document).documentElement.scrollTop);width:expression((document).documentElement.clientWidth);height:expression((document).documentElement.clientHeight)" : "";
                a.zIndex();
                d.addClass("aui_state_lock");
                j[0].style.cssText = h + ";position:fixed;z-index:" + c + ";top:0;left:0;overflow:hidden;" + i;
                m[0].style.cssText = "height:100%;background:" + e.background + ";filter:alpha(opacity=0);opacity:0";
                q && m.html('<iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1;filter:alpha(opacity=0)"></iframe>');
                m.stop();
                m.bind("click", function() {

                    a._reset()
                }).bind("dblclick", function() {

                    a._click(a.config.cancelVal)
                });
                0 === e.duration ? m.css({
                    opacity: e.opacity
                }) : m.animate({
                    opacity: e.opacity
                }, e.duration);
                a._lockMaskWrap = j;
                a._lockMask = m;
                a._lock = !0;
                return a
            },
            unlock: function() {
                var a = this._lockMaskWrap,
                    b = this._lockMask;
                if (!this._lock) return this;
                var c = a[0].style,
                    d = function() {
                        q && (c.removeExpression("width"), c.removeExpression("height"), c.removeExpression("left"), c.removeExpression("top"));
                        c.cssText = "display:none";
                        p && a.remove()
                    };
                b.stop().unbind();
                this.DOM.wrap.removeClass("aui_state_lock");
                this.config.duration ? b.animate({
                    opacity: 0
                }, this.config.duration, d) : d();
                this._lock = !1;
                return this
            },
            _getDOM: function() {
                var a = document.createElement("div"),
                    c = document.body;
                a.style.cssText = "position:absolute;left:0;top:0";
                a.innerHTML = b._templates;
                c.insertBefore(a, c.firstChild);
                for (var c = 0, d = {
                        wrap: g(a)
                    }, e = a.getElementsByTagName("*"), h = e.length; c < h; c++)(a = e[c].className.split("aui_")[1]) && (d[a] = g(e[c]));
                return d
            },
            _toNumber: function(a, b) {
                if (!a && 0 !== a || "number" === typeof a) return a;
                var c = a.length - 1;
                a.lastIndexOf("px") === c ? a = parseInt(a) : a.lastIndexOf("%") === c && (a = parseInt(b * a.split("%")[0] / 100));
                return a
            },
            _ie6PngFix: q ? function() {
                for (var a = 0, c, d, e = b.defaults.path + "/skins/", g = this.DOM.wrap[0].getElementsByTagName("*"); a < g.length; a++)
                    if (c = g[a], d = c.currentStyle.png) d = e + d, c = c.runtimeStyle, c.backgroundImage = "none", c.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + d + "',sizingMethod='crop')"
            } : g.noop,
            _ie6SelectFix: q ? function() {
                var a = this.DOM.wrap,
                    b = a[0],
                    c = x + "iframeMask",
                    d = a[c],
                    e = b.offsetWidth,
                    i = b.offsetHeight,
                    e = e + "px",
                    i = i + "px";
                d ? (d.style.width = e, d.style.height = i) : (d = b.appendChild(document.createElement("iframe")), a[c] = d, d.src = "about:blank", d.style.cssText = "position:absolute;z-index:-1;left:0;top:0;filter:alpha(opacity=0);width:" + e + ";height:" + i)
            } : g.noop,
            _runScript: function(a) {
                for (var b, c = b = 0, a = a.getElementsByTagName("script"), d = a.length, e = []; b < d; b++)
                    if ("text/dialog" === a[b].type) e[c] = a[b].innerHTML, c++;
                e.length && (e = e.join(""), b = new Function(e), b.call(this))
            },
            _autoPositionType: function() {
                this[this.config.fixed ? "_setFixed" : "_setAbsolute"]()
            },
            _setFixed: function() {
                q && g(function() {
                    "fixed" !== m.css("backgroundAttachment") && "fixed" !== g("body").css("backgroundAttachment") && m.css({
                        zoom: 1,
                        backgroundImage: "url(about:blank)",
                        backgroundAttachment: "fixed"
                    })
                });
                return function() {
                    var a = this.DOM.wrap,
                        b = a[0].style;
                    if (q) {
                        var c = parseInt(a.css("left")),
                            a = parseInt(a.css("top")),
                            d = t.scrollLeft(),
                            e = t.scrollTop();
                        this._setAbsolute();
                        b.setExpression("left", "eval((document.documentElement).scrollLeft + " + (c - d) + ') + "px"');
                        b.setExpression("top", "eval((document.documentElement).scrollTop + " + (a - e) + ') + "px"')
                    } else b.position = "fixed"
                }
            }(),
            _setAbsolute: function() {
                var a = this.DOM.wrap[0].style;
                q && (a.removeExpression("left"), a.removeExpression("top"));
                a.position = "absolute"
            },
            _click: function(a) {
                a = this._listeners[a] && this._listeners[a].callback;
                return "function" !== typeof a || !1 !== a.call(this, h) ? this.close() : this
            },
            _reset: function(a) {
                var b = this._winSize || l.width() * l.height(),
                    c = this._follow,
                    d = this._width,
                    e = this._height,
                    i = this._left,
                    g = this._top;
                if (a && (a = this._winSize = l.width() * l.height(), b === a)) return;
                (d || e) && this.size(d, e);
                c ? this.follow(c) : (i || g) && this.position(i, g)
            },
            _addEvent: function() {
                var a, b = this,
                    c = b.config,
                    d = "CollectGarbage" in h,
                    e = b.DOM;
                b._winResize = function() {

                    a && clearTimeout(a);
                    a = setTimeout(function() {
                        b._reset(d)
                    }, 40)
                };
                l.bind("resize", b._winResize);
                e.wrap.bind("click", function(a) {

                    a = a.target;
                    if (a.disabled) return !1;
                    if (a === e.close[0]) return b._click(c.cancelVal), !1;
                    (a = a[x + "callback"]) && b._click(a);
                    b._ie6SelectFix()
                }).bind("mousedown", function() {

                    b.zIndex()
                })
            },
            _removeEvent: function() {
                this.DOM.wrap.unbind();
                l.unbind("resize", this._winResize)
            }
        };
        b.fn._init.prototype = b.fn;
        g.fn.dialog = g.fn.artDialog = function() {
            var a = arguments;
            this[this.live ? "live" : "bind"]("click", function() {

                b.apply(this, a);
                return !1
            });
            return this
        };
        b.focus = null;
        b.get = function(a) {
            return a === n ? b.list : b.list[a]
        };
        b.list = {};

        t.bind("keydown", function(a) {
            var c = a.target.nodeName,
                d = /^INPUT|TEXTAREA$/,
                e = b.focus,
                a = a.keyCode;
            e && e.config.esc && !d.test(c) && 27 === a && e._click(e.config.cancelVal)
        });

        r = h._artDialog_path || function(a, b, d) {
            for (b in a) a[b].src && -1 !== a[b].src.indexOf("artDialog") && (d = a[b]);
            c = d || a[a.length - 1];
            d = c.src.replace(/\\/g, "/");
            return 0 > d.lastIndexOf("/") ? "." : d.substring(0, d.lastIndexOf("/"))
        }(document.getElementsByTagName("script"));
        if (v = c.src.split("skin=")[1]) {
            var d = document.createElement("link");
            d.rel = "stylesheet";
            d.href = r + "/skins/" + v + ".css?" + b.fn.version;
            c.parentNode.insertBefore(d, c)
        }

        l.bind("load", function() {

            setTimeout(function() {
                s || b({
                    left: "-9999em",
                    time: 9,
                    fixed: !1,
                    lock: !1,
                    focus: !1
                })
            }, 150)
        });

        try {
            document.execCommand("BackgroundImageCache", !1, !0)
        } catch (e) {}
        b._templates = '<div class="aui_outer"><table class="aui_border"><tbody><tr><td class="aui_nw"></td><td class="aui_n"></td><td class="aui_ne"></td></tr><tr><td class="aui_w"></td><td class="aui_c"><div class="aui_inner"><table class="aui_dialog"><tbody><tr><td colspan="2" class="aui_header"><div class="aui_titleBar"><div class="aui_title"></div><a class="aui_close" href="javascript:;">&times;</a></div></td></tr><tr><td class="aui_icon"><div class="aui_iconBg"></div></td><td class="aui_main"><div class="aui_content"></div></td></tr><tr><td colspan="2" class="aui_footer"><div class="aui_buttons"></div></td></tr></tbody></table></div></td><td class="aui_e"></td></tr><tr><td class="aui_sw"></td><td class="aui_s"></td><td class="aui_se"></td></tr></tbody></table></div>';
        b.defaults = {
            content: '<div class="aui_loading"><span>loading..</span></div>',
            title: "\u6d88\u606f",
            button: null,
            ok: null,
            cancel: null,
            init: null,
            close: null,
            okVal: "\u786e\u5b9a",
            cancelVal: "\u53d6\u6d88",
            width: "auto",
            height: "auto",
            minWidth: 96,
            minHeight: 32,
            padding: "15px 0",
            skin: "",
            icon: null,
            time: null,
            esc: !0,
            focus: !0,
            show: !0,
            follow: null,
            path: r,
            lock: !1,
            background: "#000",
            opacity: 0.3,
            duration: 300,
            fixed: !1,
            left: "50%",
            top: "38.2%",
            zIndex: 1987,
            resize: !0,
            drag: !0
        };
        g.dialog = g.artDialog = b
    })(XICI.UI.art, window);

    window.XICI = XICI;
    window.Class = Class;

    (function(g) {
        var artDialog = g.artDialog;
        var h, n, p = g(window),
            c = g(document),
            v = document.documentElement,
            r = !("minWidth" in v.style),
            s = "onlosecapture" in v,
            l = "setCapture" in v;
        artDialog.dragEvent = function() {
            var c = this,
                g = function(g) {
                    var h = c[g];
                    c[g] = function() {
                        return h.apply(c, arguments)
                    }
                };
            g("start");
            g("move");
            g("end");
        };
        artDialog.dragEvent.prototype = {
            onstart: g.noop,
            start: function(g) {
                c.bind("mousemove", this.move).bind("mouseup", this.end);
                this._sClientX = g.clientX;
                this._sClientY = g.clientY;
                this.onstart(g.clientX, g.clientY);
                return !1
            },
            onmove: g.noop,
            move: function(c) {
                this._mClientX = c.clientX;
                this._mClientY = c.clientY;
                this.onmove(c.clientX - this._sClientX, c.clientY - this._sClientY);
                return !1
            },
            onend: g.noop,
            end: function(g) {
                c.unbind("mousemove", this.move).unbind("mouseup", this.end);
                this.onend(g.clientX, g.clientY);
                return !1
            }
        };
        n = function(g) {
            var m, q, n, x, b, d, e = artDialog.focus,
                a = e.DOM,
                f = a.wrap,
                k = a.title,
                w = a.main,
                v = "getSelection" in window ? function() {
                    window.getSelection().removeAllRanges()
                } : function() {
                    try {
                        document.selection.empty()
                    } catch (a) {}
                };
            h.onstart = function() {
                d ? (q = w[0].offsetWidth, n = w[0].offsetHeight) : (x = f[0].offsetLeft, b = f[0].offsetTop);
                c.bind("dblclick", h.end);
                !r && s ? k.bind("losecapture", h.end) : p.bind("blur", h.end);
                l && k[0].setCapture();
                f.addClass("aui_state_drag");
                e.focus()
            };
            h.onmove = function(a, c) {
                if (d) {
                    var g = f[0].style,
                        h = w[0].style,
                        k = a + q,
                        l = c + n;
                    g.width = "auto";
                    h.width = Math.max(0, k) + "px";
                    g.width = f[0].offsetWidth + "px";
                    h.height = Math.max(0, l) + "px"
                } else h = f[0].style, g = Math.max(m.minX, Math.min(m.maxX, a + x)), k = Math.max(m.minY, Math.min(m.maxY, c + b)), h.left = g + "px", h.top = k + "px";
                v();
                e._ie6SelectFix()
            };
            h.onend = function() {
                c.unbind("dblclick", h.end);
                !r && s ? k.unbind("losecapture", h.end) : p.unbind("blur", h.end);
                l && k[0].releaseCapture();
                r && !e.closed && e._autoPositionType();
                f.removeClass("aui_state_drag")
            };
            d = g.target === a.se[0] ? !0 : !1;
            m = function() {
                var a = e.DOM.wrap[0],
                    b = "fixed" === a.style.position,
                    d = a.offsetWidth,
                    a = a.offsetHeight,
                    f = p.width(),
                    g = p.height(),
                    h = b ? 0 : c.scrollLeft(),
                    b = b ? 0 : c.scrollTop();
                return {
                    minX: h,
                    minY: b,
                    maxX: f - d + h,
                    maxY: g - a + b
                }
            }();
            h.start(g)
        };
        c.bind("mousedown", function(c) {
            var g = artDialog.focus;
            if (g) {
                var l = c.target,
                    p = g.config,
                    g = g.DOM;
                if (!1 !== p.drag && l === g.title[0] || !1 !== p.resize && l === g.se[0]) return h = h || new artDialog.dragEvent, n(c), !1
            }
        })
    })(XICI.UI.art);
    /*!
     * artDialog iframeTools
     */
    (function(E, C, D, A) {
        var B, $, _, J = "@ARTDIALOG.DATA",
            K = "@ARTDIALOG.OPEN",
            H = "@ARTDIALOG.OPENER",
            I = C.name = C.name || "@ARTDIALOG.WINNAME" + (new Date).getTime(),
            F = C.VBArray && !C.XMLHttpRequest;
        E(function() {
            !C.jQuery && document.compatMode === "BackCompat" && alert("artDialog Error: document.compatMode === \"BackCompat\"")
        });
        var G = D.top = function() {
            var _ = C,
                $ = function(A) {
                    try {
                        var _ = C[A].document;
                        _.getElementsByTagName
                    } catch ($) {
                        return !1
                    }
                    return C[A].artDialog && _.getElementsByTagName("frameset").length === 0
                };
            return $("top") ? _ = C.top : $("parent") && (_ = C.parent), _
        }();

        D.parent = G, B = G.XICI.UI.art.artDialog, _ = function() {
            return B.defaults.zIndex
        }, D.data = function(C, B) {
            var _ = D.top,
                $ = _[J] || {};
            _[J] = $;
            if (B !== A) $[C] = B;
            else return $[C];
            return $
        }, D.removeData = function(_) {
            var $ = D.top[J];
            $ && $[_] && delete $[_]
        }, D.through = $ = function() {
            var $ = B.apply(this, arguments);
            return G !== C && (D.list[$.config.id] = $), $
        }, G !== C && E(C).bind("unload", function() {
            var A = D.list,
                _;
            for (var $ in A) A[$] && (_ = A[$].config, _ && (_.duration = 0), A[$].close(), delete A[$])
        }), D.open = function(B, P, O) {
            P = P || {};
            var N, L, M, X, W, V, U, T, S, R = D.top,
                Q = "position:absolute;left:-9999em;top:-9999em;border:none 0;background:transparent",
                a = "width:100%;height:100%;border:none 0";
            if (O === !1) {
                var Z = (new Date).getTime(),
                    Y = B.replace(/([?&])_=[^&]*/, "$1_=" + Z);
                B = Y + (Y === B ? (/\?/.test(B) ? "&" : "?") + "_=" + Z : "")
            }
            var G = function() {
                var B, C, _ = L.content.find(".aui_loading"),
                    A = N.config;
                M.addClass("aui_state_full"), _ && _.hide();
                try {
                    T = W.contentWindow, U = E(T.document), S = T.document.body
                } catch ($) {
                    W.style.cssText = a, A.follow ? N.follow(A.follow) : N.position(A.left, A.top), P.init && P.init.call(N, T, R), P.init = null;
                    return
                }
                B = A.width === "auto" ? U.width() + (F ? 0 : parseInt(E(S).css("marginLeft"))) : A.width, C = A.height === "auto" ? U.height() : A.height, setTimeout(function() {
                    W.style.cssText = a
                }, 0), N.size(B, C), A.follow ? N.follow(A.follow) : N.position(A.left, A.top), P.init && P.init.call(N, T, R), P.init = null
            }, I = {
                    zIndex: _(),
                    init: function() {
                        N = this, L = N.DOM, X = L.main, M = L.content, W = N.iframe = R.document.createElement("iframe"), W.src = B, W.name = "Open" + N.config.id, W.style.cssText = Q, W.setAttribute("frameborder", 0, 0), W.setAttribute("allowTransparency", !0), V = E(W), N.content().appendChild(W), T = W.contentWindow;
                        try {
                            T.name = W.name, D.data(W.name + K, N), D.data(W.name + H, C)
                        } catch ($) {}
                        V.bind("load", G)
                    },
                    close: function() {
                        V.css("display", "none").unbind("load", G);
                        if (P.close && P.close.call(this, W.contentWindow, R) === !1) return !1;
                        M.removeClass("aui_state_full"), V[0].src = "about:blank", V.remove();
                        try {
                            D.removeData(W.name + K), D.removeData(W.name + H)
                        } catch ($) {}
                    }
                };
            typeof P.ok == "function" && (I.ok = function() {
                return P.ok.call(N, W.contentWindow, R)
            }), typeof P.cancel == "function" && (I.cancel = function() {
                return P.cancel.call(N, W.contentWindow, R)
            }), delete P.content;
            for (var J in P) I[J] === A && (I[J] = P[J]);
            return $(I)
        }, D.open.api = D.data(I + K), D.opener = D.data(I + H) || C, D.open.origin = D.opener, D.close = function() {
            var $ = D.data(I + K);
            return $ && $.close(), !1
        }, G != C && E(document).bind("mousedown", function() {
            var $ = D.open.api;
            $ && $.zIndex()
        }), D.load = function(C, D, B) {
            B = B || !1;
            var G = D || {}, H = {
                    zIndex: _(),
                    init: function(A) {
                        var _ = this,
                            $ = _.config;
                        E.ajax({
                            url: C,
                            success: function($) {
                                _.content($), G.init && G.init.call(_, A)
                            },
                            cache: B
                        })
                    }
                };
            delete D.content;
            for (var F in G) H[F] === A && (H[F] = G[F]);
            return $(H)
        }, D.alert = function(B, A) {
            return $({
                id: "Alert",
                zIndex: _(),
                icon: "warning",
                fixed: !0,
                lock: !0,
                content: B,
                ok: !0,
                close: A
            })
        }, D.confirm = function(C, A, B) {
            return $({
                id: "Confirm",
                zIndex: _(),
                icon: "question",
                fixed: !0,
                lock: !0,
                opacity: 0.1,
                content: C,
                ok: function($) {
                    return A.call(this, $)
                },
                cancel: function($) {
                    return B && B.call(this, $)
                }
            })
        }, D.prompt = function(D, B, C) {
            C = C || "";
            var A;
            return $({
                id: "Prompt",
                zIndex: _(),
                fixed: !0,
                lock: !0,
                opacity: 0.1,
                width: 300,
                content: ["<div style=\"margin-bottom:5px;font-size:12px\">", D, "</div>", "<div>", "<input value=\"", C, "\" style=\"width:18em;padding:6px 4px\" />", "</div>"].join(""),
                init: function() {
                    A = this.DOM.content.find("input")[0], A.select(), A.focus()
                },
                ok: function($) {
                    return B && B.call(this, A.value, $)
                },
                cancel: !0
            })
        }, D.tips = function(B, A) {
            return $({
                id: "Tips",
                zIndex: _(),
                title: !1,
                cancel: !1,
                fixed: !0,
                lock: !1
            }).content("<div style=\"padding: 0 1em;\">" + B + "</div>").time(A || 1.5)
        }, E(function() {
            var A = D.dragEvent;
            if (!A) return;
            var B = E(C),
                $ = E(document),
                _ = F ? "absolute" : "fixed",
                H = A.prototype,
                I = document.createElement("div"),
                G = I.style;
            G.cssText = "display:none;position:" + _ + ";left:0;top:0;width:100%;height:100%;" + "cursor:move;filter:alpha(opacity=0);opacity:0;background:#FFF", document.body.appendChild(I), H._start = H.start, H._end = H.end, H.start = function() {
                var E = D.focus.DOM,
                    C = E.main[0],
                    A = E.content[0].getElementsByTagName("iframe")[0];
                H._start.apply(this, arguments), G.display = "block", G.zIndex = D.defaults.zIndex + 3, _ === "absolute" && (G.width = B.width() + "px", G.height = B.height() + "px", G.left = $.scrollLeft() + "px", G.top = $.scrollTop() + "px"), A && C.offsetWidth * C.offsetHeight > 307200 && (C.style.visibility = "hidden")
            }, H.end = function() {
                var $ = D.focus;
                H._end.apply(this, arguments), G.display = "none", $ && ($.DOM.main[0].style.visibility = "visible")
            }
        })
    })(XICI.UI.art || this.jQuery, window, XICI.UI.art.artDialog);
})(window);