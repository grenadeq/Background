
Class.extend(XICI.String, {
	cutString: function(str, num) {
		num = num || 8;
		var byteLen = num * 2;
		var theByteLen = XICI.String.getByteLength(str);
		return theByteLen > byteLen ? XICI.String.cutByte(str, byteLen) + '..' : str;
	}
});

Class.extend(XICI.DOM, {
	parents: function(target, classname) {
		var pName = target.parentNode.nodeName;
		if (pName === 'HTML' || pName === '#document')
			return null;
		if (target.parentNode.className.indexOf(classname) != -1) {
			return target.parentNode;
		} else {
			return XICI.DOM.parents(target.parentNode, classname);
		}
	}
});

Class.extend(XICI.BOM, {
	getWindowSize: function() {
		var back = {};
		back.w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		back.h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		return back;
	},
	getWindowScrollTop: function() {
		var top = (document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
		return top;
	}
});
XICI.BOM.ieVersion = XICI.BOM.getIEVersion();
XICI.BOM.isChrome = XICI.BOM.getBrowser().userAgent.indexOf('Chrome') != -1 ? true : false;
if (XICI.BOM.ieVersion && XICI.BOM.ieVersion <= 8) {
	var origin = document.body.className;
	var iev = 'ie' + XICI.BOM.ieVersion + ' lt8';
	if (origin) {
		document.body.className = document.body.className + ' ' + iev;
	} else {
		document.body.className = iev;
	}
}

XICI.Event.mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x

/**
 * localstorage utils based on localstorage api & xici.bom.getCookie, setCookie & json2 lib
 */
XICI.LocalStorage = {
	set: function(key, value) {
		if (localStorage) {
			localStorage.setItem(key, JSON.stringify(value));
		} else {
			XICI.BOM.setCookie(key, JSON.stringify(value), {
				path: '/',
				domain: 'xici.net'
			});
		}
	},
	get: function(key) {
		if (localStorage) {
			return JSON.parse(localStorage.getItem(key));
		} else {
			return JSON.parse(XICI.BOM.getCookie(key));
		}
	}
};

XICI.FormUtil = {
	hackPlaceholder: function(inputDomObject) {
		if (XICI.BOM.ieVersion && XICI.BOM.ieVersion < 10) {
			var defaultVal = inputDomObject.getAttribute('placeholder');
			inputDomObject.value = inputDomObject.getAttribute('placeholder');
			XICI.Event.addEvent(inputDomObject, 'blur', function() {
				if (inputDomObject.value === '') {
					inputDomObject.value = defaultVal;
				}
			});
			XICI.Event.addEvent(inputDomObject, 'focus', function() {
				if (inputDomObject.value === defaultVal) {
					inputDomObject.value = '';
				}
			});
		}
	}
};
XICI.UI.header = Class.create({
	// 初始化
	init: function(option) {
		this.self = this;
		var _ = this;
		_.xd = XICI.DOM;
		_.xb = XICI.BOM;
		_.store.self = _.tpl.self = _;

		var glbCfg = option.glbCfg;
		_.usrInfo = {
			id: glbCfg.userId,
			uname: glbCfg.userName,
			level: glbCfg.userLevel,
			role: glbCfg.userLevelName,
			cityName: glbCfg.cityName,
			cityId: glbCfg.cityId
		};
		_.pingPause = option.ping;

		_.glbHd = XICI.DOM.newElement('div', {
			className: 'public_header'
		});
		document.body.insertBefore(_.glbHd, document.body.firstChild);
		_.wrap = _.xd.newElement('div', {
			className: 'wrap clearfix'
		});
		_.glbHd.appendChild(_.wrap);

		_.tpl.createLogo();
		_.tpl.createHeaderNav();
		_.tpl.createSearch();
		_.tpl.createUsrNav();

		// if(_.usrInfo.id){// 只有登录之后才去ping
		_.tpl.createFeiyuBub();
		// }

		_.bindMainHandler();
	},
	// 绑定鼠标悬浮,展开submenu
	bindMainHandler: function() {
		var _ = this;
		var list = _.wrap.getElementsByTagName('li');
		var showsm = function(e) {
			var tar = XICI.Event.getTarget(e);
			var bub = XICI.DOM.parents(tar, 'header_bub');
			var ctn = this;
			if (tar.className.indexOf('header_bub') != -1 || bub) {
				return;
			}
			if (tar.className !== 'root' || this.className.indexOf('fromsubmenu') != -1) {
				ctn.className = 'header_with_submenu active';
				return;
			}
			clearTimeout(_.showsm);
			_.showsm = setTimeout(function() {
				ctn.className = 'header_with_submenu active';
			}, 300);
		};
		var hidesm = function(e) {
			clearTimeout(_.showsm);
			var tar = XICI.Event.getTarget(e);
			var submenu = XICI.DOM.parents(tar, 'header_submenu');
			var ctn = this;
			if (tar.className.indexOf('header_submenu') != -1 || submenu) {
				this.className = 'header_with_submenu fromsubmenu';
				clearTimeout(_.clearTrigger);
				_.clearTrigger = setTimeout(function() {
					ctn.className = ctn.className.replace(/fromsubmenu/g, '');
				});
			} else {
				this.className = 'header_with_submenu';
			}
		};
		for (var i = 0, l = list.length; i < l; i++) {
			var item = list[i];
			if (item.className === 'header_with_submenu') {
				item.onmouseover = showsm;
				item.onmouseout = hidesm;
			}
		}
		// hack for ie6 position fixed
		if (XICI.BOM.ieVersion === 6) {
			XICI.Event.addEvent(window, 'scroll', function(e) {
				var top = document.documentElement.scrollTop;
				_.glbHd.style.top = top;
			});
		}
		// scroll event listen for very min browser
		function hackMinWin() {
			function detect() {
				var winW = XICI.BOM.getWindowSize()['w'];
				if (winW < 980) {
					_.glbHd.style.position = 'absolute';
				} else if (XICI.BOM.ieVersion !== 6) {
					_.glbHd.style.position = 'fixed';
					_.glbHd.style.top = '0';
				}
			}
			detect();
			XICI.Event.addEvent(window, 'resize', detect);
			XICI.Event.addEvent(window, 'scroll', function() {
				var w = XICI.BOM.getWindowSize()['w'],
					sT = XICI.BOM.getWindowScrollTop();
				if (w < 980 && sT >= 0) {
					_.glbHd.style.position = 'absolute';
					_.glbHd.style.top = sT + 'px';
				}
			});
		}
		hackMinWin();

	},
	tpl: {
		self: null,
		createLogo: function() {
			var _ = this.self;
			_.wrap.innerHTML = '<h1 node-type="globalheader-LOGO" data-type="ga" class="header_logo l"><a href="//www.xici.net">西祠胡同</a></h1>';
		},
		createHeaderNav: function() {
			var _ = this.self;

			var div = _.xd.newElement('div');

			var inHTML = '';
			inHTML += '<ul class="header_nav l">';
			inHTML += '	<li node-type="globalheader-胡同口" data-type="ga"><a href="//www.xici.net">胡同口</a></li>';
			inHTML += '	<li node-type="globalheader-讨论版" data-type="ga" class="header_with_submenu">';
			inHTML += '		<a id="J_HeaderCity" class="root"></a> <i>&nbsp;</i>';
			inHTML += '		<div class="header_submenu">';
			inHTML += '			<div><a href="//www.xici.net/board/newbd.asp?from=topnav">新建讨论版</a></div>';
			inHTML += '			<div><a href="//www.xici.net/clubsort.asp?from=topnav">热门讨论版</a></div>';
			inHTML += '			<hr />';
			inHTML += '			<div>';
			inHTML += '				<ul id="J_HeaderHot">';
			inHTML += '				</ul>';
			inHTML += '			</div>';
			inHTML += '			<hr />';
			inHTML += '			<div><a href="//www.xici.net/zone/city.asp">切换城市</a></div>';
			inHTML += '		</div>';
			inHTML += '	</li>';
			// inHTML += '	<li node-type="globalheader-游戏" data-type="ga" id="J_HeaderGame" class="header_with_submenu">';
			// inHTML += '		<a class="root">游戏</a><i>&nbsp;</i>';
			// //inHTML += ' 	<div id="J_HeaderGameBub" class="header_bub">';
			// //inHTML += '			<div class="header_close_wrap"><a href="" class="close">x</a></div>';
			// //inHTML += '			<p>';
			// //inHTML += '				<span>大妈玩掼蛋，三缺一！</span>';
			// //inHTML += '			</p>';
			// //inHTML += '		</div>';
			// inHTML += '		<div class="header_submenu">';
			// inHTML += '			<ul>';
			// inHTML += '				<li><a href="//youxi.xici.net" target="_blank">游戏频道</a></li>';
			// inHTML += '				<li><a href="//qipai.xici.6998.com/" target="_blank">网页棋牌</a></li>';
			// inHTML += '				<li><a href="//www.xici.net/b1449976/" target="_blank">安卓游戏</a></li>';
			// inHTML += '			</ul>';
			// inHTML += '		</div>';
			// inHTML += '	</li>';
			inHTML += '	<li id="menu_phone_vesion" node-type="globalheader-手机版" data-type="ga"><a href="//www.xici.net/app.asp">手机版</a></li>';
			inHTML += '</ul>';

			div.innerHTML = inHTML;
			_.wrap.appendChild(div.children[0]);
			_.hotBoardList = document.getElementById('J_HeaderHot');
			_.cityWrap = document.getElementById('J_HeaderCity');
			// _.gameBub = document.getElementById('J_HeaderGameBub');

			_.renderHot();
			_.renderCity();
			// _.renderGlbBub();

        setTimeout(function(){
            var phoneVersion=document.getElementById('menu_phone_vesion');
            if(!phoneVersion||phoneVersion.childNodes.length>1){
                return;
            }
            var newChild=document.createElement('div');
            //newChild.style.backgroundColor='#229ee3';
            newChild.style.position='absolute';
            newChild.style.display='none';
            newChild.style.opacity='0.9';
            newChild.innerHTML='<img src="http://pan.xici.com/group5/M03/E7/61/rBABqFlZ_ceEFB90AAAAADFvbLo570.png">';
            phoneVersion.appendChild(newChild);
            phoneVersion.onmouseover=function(){
                newChild.style.display='block';
            }
            phoneVersion.onmouseout=function(){
                newChild.style.display='none';
            }
        },500);
		},
		createUsrNav: function() {
			var _ = this.self;
			var inHTML = '';
			if (_.usrInfo.id) {
				inHTML += '<ul class="header_nav r">';
				inHTML += ' <li node-type="globalheader-我的首页" data-type="ga"><a href="//www.xici.net/myhome.asp?type=myhome">我的首页</a></li>';
				inHTML += ' <li node-type="globalheader-居委会" data-type="ga"><a href="//www.xici.net/b2488/">居委会</a></li>';
				inHTML += ' <li id="J_HeaderFeiyu" class="header_with_submenu">';
				inHTML += '		<a class="root">飞语</a><i>&nbsp;</i>';
				inHTML += '		<div node-type="globalheader-飞语" data-type="ga" class="header_submenu right">';
				inHTML += '			<ul>';
				inHTML += '				<li><a href="//www.xici.net/u' + _.usrInfo.id + '/messages.asp">查看飞语 <span id="J_HeaderSubMenuFeiyu"></span></a></li>';
				inHTML += '				<li><a href="//www.xici.net/u' + _.usrInfo.id + '/blogAdmin.asp?t=31&gname=%u6211%u7684%u7C89%u4E1D">查看粉丝 <span id="J_HeaderSubMenuFans"></span></a></li>';
				inHTML += '				<li><a href="//www.xici.net/blog/shownotice.asp?type=follow">查看跟帖 <span id="J_HeaderSubMenuGentie"></span></a></li>';
				inHTML += '				<li><a href="//www.xici.net/blog/shownotice.asp?type=atme">查看@我 <span id="J_HeaderSubMenuAtme"></span></a></li>';
				inHTML += '				<li><a href="//www.xici.net/blog/shownotice.asp?type=invite">查看邀请 <span id="J_HeaderSubMenuYaoqing"></span></a></li>';
				inHTML += '				<li><a href="//www.xici.net/blog/shownotice.asp?type=notice">查看通知 <span id="J_HeaderSubMenuTongzhi"></span></a></li>';
				inHTML += '			</ul>';
				inHTML += '		</div>';
				inHTML += ' 	<div class="header_bub right"><div class="header_close_wrap"><a href="javascript:;" class="close">&times;</a></div><p id="J_MsgBub"></p></div>';
				inHTML += ' </li>';
				inHTML += ' <li class="header_with_submenu">';
				inHTML += '		<a class="root">' + XICI.String.cutString(_.usrInfo.uname, 10) + '</a><i>&nbsp;</i>';
				inHTML += '		<div node-type="globalheader-个人中心" data-type="ga" class="header_submenu right">';
				inHTML += ' 		<div class="header_usrpro">';
				inHTML += '				<a href="//www.xici.net/u' + _.usrInfo.id + '/" title="我的角落">';
				inHTML += '					<img src="//icons.xici.net/u' + _.usrInfo.id + '/files/photo_m.pic" alt="">';
				inHTML += '				</a>';
				inHTML += '				<div>';
				inHTML += '					<p>ID号：' + _.usrInfo.id + '</p>';
				inHTML += '					<p>' + _.usrInfo.role + '';
				if (_.usrInfo.level === 8) {
					inHTML += '<a href="' + _URLS_CONFIG.phone_bind + '" class="header_validate">&nbsp;</a></p>';
				} else {
					inHTML += '				</p>';
				}
				inHTML += '				</div>';
				inHTML += '			</div>';
				inHTML += '			<hr />';
				inHTML += '			<ul>';
				inHTML += '				<li><a href="//www.xici.net/u' + _.usrInfo.id + '/blogAdmin.asp?t=41" title="收藏管理">收藏管理</a></li>';
				inHTML += '				<li><a href="//www.xici.net/u' + _.usrInfo.id + '/blogAdmin.asp?t=31" title="好友管理">好友管理</a></li>';
				inHTML += '				<li><a href="//www.xici.net/u' + _.usrInfo.id + '/blogAdmin.asp?t=13" title="文章管理">文章管理</a></li>';
				inHTML += '				<li><a href="//www.xici.net/u' + _.usrInfo.id + '/blogAdmin.asp?t=1" title="角落设置">角落设置</a></li>';
				inHTML += '				<li><a href="' + _URLS_CONFIG.user_setting + '" title="个人设置">个人设置</a></li>';
				// inHTML += '				<li><a href="' + _URLS_CONFIG.account_mgr + '" title="账号管理">账号管理</a></li>';
				inHTML += '				<li><a title="退出登录" href="' + _URLS_CONFIG.logout + '">退出登录</a></li>';
				inHTML += '			</ul>';
				inHTML += '		</div>';
				inHTML += '	</li>';
				inHTML += '</ul>';
			} else {
				inHTML += '<ul class="header_nav r">';
				inHTML += '	<li node-type="globalheader-居委会" data-type="ga"><a href="//www.xici.net/b2488/">居委会</a></li>';
				inHTML += '	<li node-type="globalheader-登录" data-type="ga"><a id="J_HeaderBtnLogin" href="javascript:;">登录</a></li>';
				inHTML += '	<li node-type="globalheader-注册" data-type="ga"><a href="'+_URLS_CONFIG.reg+'">注册</a></li>';
				inHTML += '</ul>';
			}
			var div = _.xd.newElement('div');
			div.innerHTML = inHTML;
			_.wrap.appendChild(div.children[0]);

			_.msgBub = document.getElementById('J_MsgBub');
			_.btnLogin = document.getElementById('J_HeaderBtnLogin');
			_.btnLogout = document.getElementById('J_HeaderBtnLogout');
			_.subFans = document.getElementById('J_HeaderSubMenuFans');
			_.subGentie = document.getElementById('J_HeaderSubMenuGentie');
			_.subAtme = document.getElementById('J_HeaderSubMenuAtme');
			_.subYaoqing = document.getElementById('J_HeaderSubMenuYaoqing');
			_.subTongzhi = document.getElementById('J_HeaderSubMenuTongzhi');
			_.subFeiyu = document.getElementById('J_HeaderSubMenuFeiyu');

			if (_.btnLogin) {
				_.btnLogin.onclick = function() {
					var href = encodeURI(location.href);
					if (href.indexOf('www.xici.net') == -1) {
						window.location.href = _URLS_CONFIG.login;
						return false;
					}

					var login = new XICI.UI.login();
					login.show();
					return false;
				};
			}

			if (_.btnLogout) {
				_.btnLogout.onclick = function() {
					_.store.clearCookie(function() {
						window.location.reload();
					});
					return false;
				};
			}

			if (_.msgBub) {
				var btnClsMsgBub = _.msgBub.previousSibling.children[0];
				XICI.Event.addEvent(btnClsMsgBub, 'click', function() {
					_.msgBub.parentNode.style.display = 'none';
					// 当前页刷新前不再显示
					_.hideMsgBub = 1;
					return false;
				});
			}
		},
		createSearch: function() {
			var _ = this.self;
			var inHTML = ' <div class="header_search l">';
			inHTML += '  <form id="J_HeaderSearchForm" action="http://ss.xici.net" method="get" target="_blank">';
			inHTML += '		<input id="J_HeaderSearchIpt" type="text" name="q" class="search_txt" placeholder="搜索版名、版号、关键词"/>';
			inHTML += '		<input type="hidden" name="charset" value="gbk" />';
			// inHTML += '		<input type="hidden" name="s" value="11800334043319024933" />';
			// inHTML += '		<input type="hidden" name="from" value="topnav" />';
			// inHTML += '		<input type="hidden" name="sti" value="43200"/>';
			// inHTML += '		<input type="hidden" name="nsid" value="0"/>';
			inHTML += '		<input type="submit" class="search_btn"/>';
			inHTML += ' </form>';
			inHTML += '</div>';

			var div = _.xd.newElement('div');
			div.innerHTML = inHTML;
			_.wrap.appendChild(div.children[0]);
			var searchIpt = document.getElementById('J_HeaderSearchIpt');
			XICI.FormUtil.hackPlaceholder(searchIpt);
			document.getElementById('J_HeaderSearchForm').onsubmit = function() {
				return /\S/.test(searchIpt.value);
			}
		},
		createFeiyuBub: function() {
			// 页面加载时将lastPingTime重置
			XICI.BOM.setCookie('lastPingTime', 2);

			var _ = this.self;

			var callback = function(result) {
				if (_.msgBub && !_.hideMsgBub) {
					_.renderTipBub(result);
				}
			};

			setInterval(function() {
				_.store.keepOln(callback);
			}, _.pingPause);
		}
	},
	/* 渲染城市 */
	renderCity: function() {
		this.cityWrap.innerHTML = this.usrInfo.cityName;
	},
	/* 渲染热门讨论版 */
	renderHot: function() {
		var _ = this;
		_.store.fetchHot(function(json) {
			var html = '',
				temp,
				arr = json.Result;
			for (var i = 0, l = arr.length; i < l; i++) {
				temp = arr[i];
				html += '<li><a href="//www.xici.net/b' + temp.bd_id + '">' + XICI.String.cutString(temp.bd_name, 8) + ' <span>+' + temp.stats + '</span></a></li>';
				if (i == 9)
					break;
			}
			_.hotBoardList.innerHTML = html;
		});
	},
	/* 循环调用并显示飞语bubble */
	renderTipBub: function(result) {
		var inHTML = '',
			_ = this,
			notifyResult = result.Notification.Result;

		if (notifyResult.atme > 0) {
			inHTML += '<a href="//www.xici.net/blog/shownotice.asp?type=atme">你有 ' + notifyResult.atme + ' 条@我</a>';
			_.subAtme.innerHTML = notifyResult.atme;
		} else {
			_.subAtme.innerHTML = '';
		}
		if (notifyResult.fans > 0) {
			inHTML += '<a href="//www.xici.net/u' + this.usrInfo.id + '/blogAdmin.asp?t=54">你有 ' + notifyResult.fans + ' 个新粉丝</a>';
			_.subFans.innerHTML = notifyResult.fans;
		} else {
			_.subFans.innerHTML = '';
		}
		if (result.newmail > 0) {
			inHTML += '<a href="//www.xici.net/u' + this.usrInfo.id + '/messages.asp">你有 ' + result.newmail + ' 条新飞语</a>';
			_.subFeiyu.innerHTML = result.newmail;
		} else {
			_.subFeiyu.innerHTML = '';
		}
		if (notifyResult.follow > 0) {
			inHTML += '<a href="//www.xici.net/blog/shownotice.asp?type=follow">你有 ' + notifyResult.follow + ' 条新跟帖</a>';
			_.subGentie.innerHTML = notifyResult.follow;
		} else {
			_.subGentie.innerHTML = '';
		}
		if (notifyResult.invite > 0) {
			inHTML += '<a href="//www.xici.net/blog/shownotice.asp?type=invite">你有 ' + notifyResult.invite + ' 条新邀请</a>';
			_.subYaoqing.innerHTML = notifyResult.invite;
		} else {
			_.subYaoqing.innerHTML = '';
		}
		if (notifyResult.notice > 0) {
			inHTML += '<a href="//www.xici.net/blog/shownotice.asp?type=notice">你有 ' + notifyResult.notice + ' 条新通知</a>';
			_.subTongzhi.innerHTML = notifyResult.notice;
		} else {
			_.subTongzhi.innerHTML = '';
		}
		if (inHTML) {
			this.msgBub.innerHTML = inHTML;
			this.msgBub.parentNode.style.display = 'block';
		} else {
			this.msgBub.parentNode.style.display = 'none';
		}
	},
	/* 渲染返回顶部 */
	renderBTP: function() {

	},
	/* 显示游戏气泡 */
	renderGlbBub: function() {

	},
	store: {
		self: null,
		/* 获取用户信息 - 暂时废弃、用G_CONFIG */
		fetchUsrinfo: function(callback) {
			new XICI.Ajax({
				type: 'get',
				url: 'json.usrinfo.json',
				success: function(json) {
					callback(json);
				}
			});
		},
		/* 获取热门讨论版 */
		fetchHot: function(callback) {
			XICI.JSONP({
				url: 'http://www.xici.net/apps/wedding/?method=wedding.board.clubsort&jsoncallback=_',
				success: function(json) {
					callback(json);
				}
			});
		},
		/* ping操作 */
		keepOln: function(callback) {
			var _ = this.self,
				pingUrl;

			var sessionId = XICI.BOM.getCookie('SessionID');
			var interval = (new Date).getTime() - XICI.BOM.getCookie('lastPingTime');

			if (sessionId != -1 && interval > 60000) {
				XICI.BOM.setCookie('lastPingTime', (new Date).getTime());
				if (_.usrInfo.id) {
					pingUrl = 'http://www.xici.net/xiciservice/ping.asp?userid=' + _.usrInfo.id + '&t=2&now=' + new Date();
				} else {
					pingUrl = 'http://www.xici.net/xiciservice/ping.asp?now=' + new Date();
				}

				// 非主域下使用jsonp来ping
				if (location.href.indexOf('www.xici.net') === -1) {
					XICI.JSONP({
						url: pingUrl + '&jsoncallback=_',
						success: function(json) {
							callback(json);
							XICI.LocalStorage.set('pingMsg', json);
						}
					});
					return;
				}

				new XICI.Ajax({
					url: pingUrl,
					type: 'get',
					success: function(json) {
						callback(json);
						XICI.LocalStorage.set('pingMsg', json);
					}
				});
			} else {
				callback(XICI.LocalStorage.get('pingMsg'));
			}
		},
		/* 是否展示bubble */
		hideBub: function() {
			return XICI.BOM.getCookie('hideBug');
		},
		/* 不再显示bubble */
		disableBub: function() {
			XICI.BOM.setCookie('hideBug', 1, {
				path: '/',
				domain: 'xici.net'
			});
		},
		/* 清空用户登录cookie */
		clearCookie: function(callback) {
			if (location.href.indexOf('www.xici.net') === -1) {
				XICI.JSONP({
					url: 'http://www.xici.net/apps/wedding/?method=wedding.token.navlogout&jsoncallback=_',
					success: function() {
						// if (XICI.BOM.getCookie('autologon') > 0) {
						XICI.BOM.setCookie('uid', null, {
							expires: -1,
							path: '/',
							domain: 'xici.net'
						});
						XICI.BOM.setCookie('uname', null, {
							expires: -1,
							path: '/',
							domain: 'xici.net'
						});
						XICI.BOM.setCookie('pwd', null, {
							expires: -1,
							path: '/',
							domain: 'xici.net'
						});
						XICI.BOM.setCookie('sid', null, {
							expires: -1,
							path: '/',
							domain: 'xici.net'
						});
						XICI.BOM.setCookie('autologon', null, {
							expires: -1,
							path: '/',
							domain: 'xici.net'
						});
						XICI.BOM.setCookie('token', null, {
							expires: -1,
							path: '/',
							domain: 'xici.net'
						});
						// }
						callback();
					}
				});
				return;
			}

			new XICI.Ajax({
				type: 'post',
				url: 'http://www.xici.net/api.asp?method=xici.token.logout',
				success: function() {
					// if (XICI.BOM.getCookie('autologon') > 0) {
					XICI.BOM.setCookie('uid', null, {
						expires: -1,
						path: '/',
						domain: 'xici.net'
					});
					XICI.BOM.setCookie('uname', null, {
						expires: -1,
						path: '/',
						domain: 'xici.net'
					});
					XICI.BOM.setCookie('pwd', null, {
						expires: -1,
						path: '/',
						domain: 'xici.net'
					});
					XICI.BOM.setCookie('sid', null, {
						expires: -1,
						path: '/',
						domain: 'xici.net'
					});
					XICI.BOM.setCookie('autologon', null, {
						expires: -1,
						path: '/',
						domain: 'xici.net'
					});
					XICI.BOM.setCookie('token', null, {
						expires: -1,
						path: '/',
						domain: 'xici.net'
					});
					// }
					callback();
				}
			});
		}
	}
});
XICI.header = new XICI.UI.header();
XICI.header.init({
	ping: 6000,
	glbCfg: G_CONFIG
});
XICI.UI.ScrollBar = function(option) {
	var _ = this;
	_.renderTo = option.renderTo;
	_.box = option.box;
	_.barWidth = option.barWidth ? option.barWidth : 7;
	_.barColor = option.barColor || "#9E9E9E";
	_.minTop = option.minTop;

	_.bindBar();
	_.refresh();
	_.bindMouse();
	_.bindScroll();
	XICI.Event.addEvent(window, 'resize', function() {
		_.refresh();
	});
}
XICI.UI.ScrollBar.prototype = {
	bindBar: function() {
		var _ = this;
		_.bar = document.createElement('div');
		_.bar.className = 'xc_scrollbar show';
		_.bar.style.cssText = 'position: absolute; height: 30px; right: 2px; top: 0; z-index: 1000; margin-top: 3px; border-radius: 4px;';
		_.bar.style.width = _.barWidth + 'px';
		_.bar.style.backgroundColor = _.barColor;
		_.bar.style.marginTop = _.minTop + 'px';
		_.renderTo.appendChild(_.bar);

		// 鼠标悬浮显示scroll
		XICI.Event.addEvent(_.box.parentNode, 'mouseenter', function() {
			_.bar.className = 'xc_scrollbar show';
		});
		XICI.Event.addEvent(_.box.parentNode, 'mouseleave', function() {
			_.bar.className = 'xc_scrollbar hide';
		});
	},
	refresh: function() {
		var _ = this;
		// 获取inner的高度，获取box的高度，相除得比例
		_.oH = _.box.offsetHeight;
		_.bili = 1;
		_.iH = _.box.children[0].offsetHeight;
		// 如果ih < oh 就不显示滚动条
		if (_.iH < _.oH) {
			_.bar.style.display = 'none';
		} else {
			// bar 与容器的高度比
			_.bili = (_.oH / _.iH - 0.01).toFixed(2);
			_.bar.style.display = 'block';
			_.bar.style.height = ((_.oH * _.bili) - _.minTop) + 'px';
			// 然后判断当前的box scrolltop，同时设定
			_.bar.style.top = (_.box.scrollTop * _.bili) + 'px';
		}
	},
	bindMouse: function() {
		var _ = this;
		_.bar.onmousedown = function(e) {
			var evt = e || window.event;
			var top = parseInt(_.bar.style.top);
			var mouseY = evt.clientY;
			var s = _.box.offsetHeight - _.bar.offsetHeight - _.minTop;
			document.onmousemove = function(e) {
				var evt = e || window.event;
				var t = top + evt.clientY - mouseY;
				if (t > s)
					t = s;
				if (t < 0)
					t = 0;
				_.box.scrollTop = t / _.bili;
				_.bar.style.top = t + "px";
			}
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
			}
		}
	},
	bindScroll: function() {
		var _ = this;

		var displaywheel = function(e) {
			var evt = window.event || e;
			var delta = evt.detail ? evt.detail * (-40) : evt.wheelDelta;
			delta = Math.floor(delta / 3);
			var s = _.box.offsetHeight - _.bar.offsetHeight - _.minTop;
			var t = parseInt(_.bar.style.top) - delta;
			if (t > s)
				t = s;
			if (t < 0)
				t = 0;
			_.box.scrollTop = t / _.bili;
			_.bar.style.top = t + "px";

			e.preventDefault && e.preventDefault();
			return false;
		}

		XICI.Event.addEvent(_.box, XICI.Event.mousewheelevt, displaywheel);
	}
}

XICI.UI.LeftDrawer = Class.create({
	init: function(option) {
		if (option.token == 0) return;

		if (option.req_url){
			this.req_url = option.req_url;
		}

		this.headerHeight = option.headerHeight;

		var _ = this;

		_.tplDrawer = XICI.DOM.newElement('div', {
			className: 'xici_comm_left_drawer close',
			onselectstart: function() {
				return false;
			}
		});

		var inHTML = '<div class="ld_inner">';
		inHTML += '		<div class="ld_toggle">';
		inHTML += '			<i class="ld_icon_star">&nbsp;</i>';
		inHTML += '			<a href="javascript:;" data-ga="社区综合|公共功能|我的讨论版-点击">我的讨论版</a>';
		inHTML += '		</div>';
		inHTML += '		<div class="ld_panel">';
		inHTML += '			<div>';
		inHTML += '				<div style="height:' + _.headerHeight + 'px;"></div>';
		inHTML += '				<div class="ld_search_wrap">';
		inHTML += '					<input type="text" value="" placeholder="搜我的讨论版">';
		inHTML += '					<div class="ld_auto_complete">';
		inHTML += '					</div>';
		inHTML += '				</div>';
		inHTML += '				<div class="ld_board_list_wrap">';
		inHTML += '					<img style="margin:70px;" src="//imgs.xici.net/_img/loading.gif"/>';
		inHTML += '				</div>';
		inHTML += '			</div>';
		inHTML += '		</div>';
		inHTML += '</div>';

		_.tplDrawer.innerHTML = inHTML;
		document.body.insertBefore(_.tplDrawer, document.body.children[1]);

		_.tplDrwrTog = _.tplDrawer.children[0].children[0];
		_.tplGaClick = _.tplDrwrTog.children[1];

		_.tplPanel = _.tplDrawer.children[0].children[1];
		var panelInner = _.tplPanel.children[0];
		_.iptSearch = panelInner.getElementsByTagName('input')[0];
		_.tplAutoComp = panelInner.children[1].children[1];
		_.tplBoardWrap = panelInner.children[2];

		_.hackPlaceholder(); // under ie9
		_.hackWinResize(); // under ie6

		_.bindMainEventHandler();

		_.eventCenter = {
			'groupClick': []
		}; // 事件中心
	},
	utils: XICI.String, // 只用到了一个扩展的 cutString 方法
	fireEvent: function(eventName) {
		var handlers = this.eventCenter[eventName];
		for (var i = 0, l = handlers.length; i < l; i++) {
			handlers[i].call(this);
		}
	},
	regEvent: function(eventName, func) {
		this.eventCenter[eventName].push(func);
	},
	/**
	 * @function
	 * @description 渲染ajax结果
	 */
	renderBoards: function(resp) {
		var _ = this;
		var boardList = resp['xici.user.favlist']['Result'];
		var boardGroupList = resp['xici.user.getgroup']['Result'];
		_.myBoards = {
			'未分组': []
		};

		for (var i = 0, l = boardGroupList.length; i < l; i++) {
			_.myBoards['' + boardGroupList[i]] = [];
		}

		for (var i2 = 0, l2 = boardList.length; i2 < l2; i2++) {
			var group;
			if (boardList[i2]['gpName']) {
				group = _.myBoards[boardList[i2]['gpName']];
			} else {
				group = _.myBoards['未分组'];
			}
			if (group) {
				var tmpBoard = boardList[i2];
				var tmpActNum = tmpBoard.Stats.F + tmpBoard.Stats.G;
				group.push({
					id: tmpBoard.boardUrl,
					name: unescape(tmpBoard.boardName),
					type: tmpBoard.boardType,
					actNum: tmpActNum > 999 ? '999+' : tmpActNum,
					f: tmpBoard.Stats.F,
					g: tmpBoard.Stats.G
				});
			}
		}

		var inHTML = '';

		for (var k in _.myBoards) {
			var tmpBoards = _.myBoards[k];
			if (tmpBoards.length == 0) continue;
			if (k == '未分组') {
				inHTML += '<div class="ld_group open">';
			} else {
				inHTML += '<div class="ld_group close">';
			}
			inHTML += '		<h5>' + _.utils.cutString(k) + '</h5>';
			inHTML += '		<ul>';
			for (var i3 = 0, l3 = tmpBoards.length; i3 < l3; i3++) {
				var tmpBoard = tmpBoards[i3];
				inHTML += '		<li>';
				inHTML += '			<a href="http://www.xici.net/b' + tmpBoard.id + '/?from=fav" target="_blank" title="' + tmpBoard.name + '(最近发帖' + tmpBoard.f + '/跟帖' + tmpBoard.g + ')">';
				inHTML += '				<img src="http://xiciimgs.xici800.com/board_' + tmpBoard.id + '.jpg" alt="" />';
				inHTML += '				<p>' + _.utils.cutString(tmpBoard.name) + '<br /><span>' + tmpBoard.actNum + '</span></p>';
				inHTML += ' 		</a>';
				inHTML += '		</li>';
			}
			inHTML += '		</ul>';
			inHTML += '</div>';
		}

		_.tplBoardWrap.innerHTML = inHTML;
		_.hackScroll();
	},
	/**
	 * @function
	 * @description
	 * 点击讨论版组名展开或隐藏讨论版组
	 * 点击我的讨论版展开抽屉，点击非抽屉位置隐藏抽屉
	 * input search改变检索当前的讨论版
	 */
	bindMainEventHandler: function() {
		var _ = this;
		_.hasFetched = false;
		// 点击抽屉开关
		XICI.Event.addEvent(_.tplDrwrTog, 'click', function(t) {
			if (_.tplDrawer.className.indexOf('close') != -1) {
				_.tplDrawer.className = 'xici_comm_left_drawer open';
				if (!_.hasFetched) {
					_.fetchBoards();
					_.hasFetched = true;
				}
			}else{
				_.tplDrawer.className = 'xici_comm_left_drawer close';
			}
		});
		XICI.Event.addEvent(_.tplGaClick, 'click', function(t) {
			if (_.tplDrawer.className.indexOf('close') != -1) {
				_.tplDrawer.className = 'xici_comm_left_drawer open';
				if (!_.hasFetched) {
					_.fetchBoards();
					_.hasFetched = true;
				}
			}else{
				_.tplDrawer.className = 'xici_comm_left_drawer close';
			}
		});
		// 点击其他区域关闭抽屉关闭auto complete
		XICI.Event.addEvent(document, 'click', function(e) {
			var target = e.target || e.srcElement;
			if (XICI.DOM.parents(target, 'xici_comm_left_drawer') == null) {
				_.tplDrawer.className = 'xici_comm_left_drawer close';
			}
			if (XICI.DOM.parents(target, 'ld_search_wrap') == null) {
				_.tplAutoComp.className = 'ld_auto_complete';
				if (XICI.BOM.ieVersion && XICI.BOM.ieVersion < 10) {
					_.iptSearch.value = '搜我的讨论版';
				} else {
					_.iptSearch.value = '';
				}
				XICI.Event.removeEvent(document, 'keydown', _.keyboardCtrl);
			}
		});
		// 定义一个键盘控制回调函数。
		_.keyboardCtrl = function(e) {
			var items = _.tplAutoComp.children[0].children;
			var autoCompLen = items.length;
			if (e.keyCode == 38) { // up
				if (_.currentAutoCompItem == null) {
					_.currentAutoCompItem = items[autoCompLen - 1];
				} else {
					_.currentAutoCompItem = _.currentAutoCompItem.previousSibling || items[autoCompLen - 1];
				}
			} else if (e.keyCode == 40) { // down
				if (_.currentAutoCompItem == null) {
					_.currentAutoCompItem = items[0];
				} else {
					_.currentAutoCompItem = _.currentAutoCompItem.nextSibling || items[0];
				}
			} else if (e.keyCode == 13) {
				return true;
			} else {
				return;
			}
			for (var i = 0; i < autoCompLen; i++) {
				items[i].className = '';
			}
			_.currentAutoCompItem.className = 'active';
			_.currentAutoCompItem.focus();

			e.preventDefault && e.preventDefault();
			return false;
		}
		// 当前的 focus auto complete 对象
		_.currentAutoCompItem = null;

		// input search 改变
		_.searchTask = null;
		XICI.Event.addEvent(_.iptSearch, 'keyup', function(t) {
			var searchVal = _.iptSearch.value;
			_.searchTask && clearTimeout(_.searchTask);
			if (!searchVal) {
				_.tplAutoComp.className = 'ld_auto_complete';
				return;
			}
			_.searchTask = setTimeout(function() {
				var inHTML = '';
				for (var i in _.myBoards) {
					var boards = _.myBoards[i];
					for (var j = 0, l = boards.length; j < l; j++) {
						if (boards[j]['name'].toLowerCase().indexOf(searchVal.toLowerCase()) != -1) {
							inHTML += '<a href="http://www.xici.net/b' + boards[j]['id'] + '/?from=find" target="_blank" title="' + boards[j]['name'] + '(最近发帖' + boards[j].f + '/跟帖' + boards[j].g + ')">' + _.utils.cutString(boards[j]['name'], 10) + '</a>';
						}
					}
				}
				if (inHTML) {
					_.tplAutoComp.innerHTML = '<div>' + inHTML + '</div>';
					_.tplAutoComp.className = 'ld_auto_complete active';
					XICI.Event.removeEvent(document, 'keydown', _.keyboardCtrl);
					XICI.Event.addEvent(document, 'keydown', _.keyboardCtrl);
				} else {
					_.tplAutoComp.className = 'ld_auto_complete';
					XICI.Event.removeEvent(document, 'keydown', _.keyboardCtrl);
				}
			}, 50);
		});
		// 点击讨论版组名
		XICI.Event.addEvent(_.tplBoardWrap, 'click', function(t) {
			var target = t.target ? t.target : t.srcElement;
			if (target.nodeName == 'H5') {
				var group = target.parentNode;
				if (group.className.indexOf('open') == -1) {
					group.className = 'ld_group open';
				} else {
					group.className = 'ld_group close';
				}
			}
			_.fireEvent('groupClick');
		});
		// 在autocomp中滚动要禁止冒泡
		XICI.Event.addEvent(_.tplAutoComp, XICI.Event.mousewheelevt, function(e) {
			var delta = e.detail ? e.detail * (-40) : e.wheelDelta;
			if (_.tplAutoComp.scrollTop == 0 && delta > 0) {
				e.preventDefault && e.preventDefault();
				return false;
			}

			var childHeight = _.tplAutoComp.children[0].offsetHeight;
			if (_.tplAutoComp.scrollTop + _.tplAutoComp.offsetHeight >= childHeight && delta < 0) {
				XICI.Event.stopPropagation(e);
				e.preventDefault && e.preventDefault();
				return false;
			}

			XICI.Event.stopPropagation(e);
		});
	},
	/** 
	 * @function
	 * @description 获取用户的讨论版数据
	 */
	fetchBoards: function() {
		var _ = this;
		new XICI.Ajax({
			url: _.req_url,
			//url : 'json/leftdrawer.json',
			type: 'get',
			success: function(back) {
				_.renderBoards(back.Result);
			},
			error: function(status) {
				alert('获取讨论版数据失败, 错误代码: ' + status);
			}
		});
	},
	/** 
	 * @function
	 * @description 为ie9及以下做 placeHolder hack
	 */
	hackPlaceholder: function() {
		var _ = this;
		if (XICI.BOM.ieVersion && XICI.BOM.ieVersion < 10) {
			var defaultVal = _.iptSearch.getAttribute('placeholder');
			_.iptSearch.value = _.iptSearch.getAttribute('placeholder');
			XICI.Event.addEvent(_.iptSearch, 'blur', function() {
				if (_.iptSearch.value == '') {
					_.iptSearch.value = defaultVal;
				}
			});
			XICI.Event.addEvent(_.iptSearch, 'focus', function() {
				if (_.iptSearch.value == defaultVal) {
					_.iptSearch.value = '';
				}
			});
		}
	},
	/** 
	 * @function
	 * @description 为ie6做高度hack
	 */
	hackWinResize: function() {
		var _ = this;
		if (XICI.BOM.ieVersion && XICI.BOM.ieVersion < 7) {
			_.tplDrawer.style.height = XICI.BOM.getWindowSize()['h'] + 'px';
			XICI.Event.addEvent(window, 'resize', function() {
				_.tplDrawer.style.height = XICI.BOM.getWindowSize()['h'] + 'px';
			});
			// hack for position:fixed
			XICI.Event.addEvent(window, 'scroll', function(e) {
				var top = document.documentElement.scrollTop;
				_.tplDrawer.style.top = top;
			});
		}
	},
	/**
	 * @funtion
	 * @description hack滚动条 except chrome
	 */
	hackScroll: function() {
		var _ = this;
		//if( XICI.BOM.ieVersion < 10 && !XICI.BOM.isChrome ){
		_.tplPanel.style.overflow = 'hidden';
		_.scroll = new XICI.UI.ScrollBar({
			box: _.tplPanel,
			renderTo: _.tplPanel.parentNode,
			minTop: 36
		});
		_.regEvent('groupClick', function() {
			_.scroll.refresh();
		});
		//}
	}
});
// 非主域或非新账户中心下不构造收藏夹
if (location.href.indexOf('http://www.xici.net') != -1 || location.href.indexOf('http://account.xici.net') != -1) {
	XICI.leftdrawer = new XICI.UI.LeftDrawer();
	
	if(location.href.indexOf('http://www.xici.net') != -1){
		XICI.leftdrawer.init({
			headerHeight: 32,
			token: G_CONFIG.userId,
			req_url : '/api.asp?method=xici.api.batchget&pkg={"xici.user.favlist":{"gpType":1,"itemType":2,"Stats":1},"xici.user.getgroup":{}}'
		});
	}else if(location.href.indexOf('http://account.xici.net') != -1){
		XICI.leftdrawer.init({
			headerHeight: 32,
			token: G_CONFIG.userId,
			req_url : 'http://account.xici.net/squid/favlist'
		});
	}
}