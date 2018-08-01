(function (window, $) {
	//	导航下拉菜单
	$('.topNav .last').on('mouseenter', function () {
		$(this).find('ul').show();
	}).on('mouseleave', function () {
		$(this).find('ul').hide();
	});

	//显示日期
	var myDate = new Date(),
		day = myDate.getDay(),
		week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"),
		str = myDate.getFullYear() + '年' + (myDate.getMonth() + 1) + '月' + myDate.getDate() + '日 ';
	$('#time').html(str);

	//频道导航
	$('.subNav li').each(function () {
		$(this).find('a:first').css({
			'font-weight': 'bold'
		});
	});

	//网上直播
	var liveSum = $('.live li').size(),
		liveW = 0,
		liveCur = 0,
		liveAuto = null,
		liveArr = [];

	$('.live li').each(function (idx, el) {
		var l = $(el).position().left;
		var w = $(el).width
		liveArr[idx] = l;
		liveW += w;
	});
	$('.live2').css('width', liveW * 2);
	$('.live ul').append($('.live li:lt(2)').clone());

	function liveRoll() {
		liveCur += 1;
		$('.live2 ul').stop(true, true).animate({
			'margin-left': -liveArr[liveCur]
		}, 1000, function () {
			if (liveCur == liveSum - 1) {
				$('.live2 ul').css('margin-left', '0px');
				liveCur = 0;
			}
		});
	}

	liveAuto = window.setInterval(liveRoll, 5000);
	$('.live2').on('mouseenter', function () {
		window.clearInterval(liveAuto);
	}).on('mouseleave', function () {
		liveAuto = window.setInterval(liveRoll, 5000);
	});

	//	要闻区
	$('.leftNews div:lt(2)').addClass('pb11');
	$('.leftNews p:first-child').addClass('keyNew');
	$('.sedNews div:lt(3)').addClass('pb15');
	$('.sedPic ul').first().addClass('pb25');
	$('.sedPic p').fadeTo(0, 0.6);

	// 要闻图片
	var npSum = $('.rightPic li').size(),
		npCur = 0,
		npAuto = null;

	$('.rightPic li').first().show();
	$('.rightPic p').fadeTo(0, 0.7);
	$('.plr img').fadeTo(0, 0.4).on('mouseenter', function () {
		$(this).fadeTo(100, 1);
	}).on('mouseleave', function () {
		$(this).fadeTo(100, 0.4);
	});
	$('.pmenu').html('<span>' + (npCur + 1) + '</span>' + ' / ' + npSum);
	$('#npl').on('click', function () {
		npCur -= 1;
		if( npCur < 0 ) {
			npCur = npSum - 1;
		}
		
		newpicAdd();
	});
	$('#npr').on('click', function () {
		npCur = (npCur + 1) % npSum;
		newpicAdd();
	});

	function newpicAuto() {
		npCur = (npCur + 1) % npSum;
		newpicAdd();
	}

	function newpicAdd() {
		$('.rightPic li').hide();
		$('.rightPic li').eq(npCur).fadeTo(200, 1);
		$('.pmenu span').text(npCur + 1);
	}

	npAuto = window.setInterval(newpicAuto, 5000);
	$('.rightPic').on('mouseenter', function () {
		window.clearInterval(npAuto);
	}).on('mouseleave', function () {
		npAuto = window.setInterval(newpicAuto, 5000);
	});

	//	推荐点击
	$('.cmp span').fadeTo(0, 0.3).on('mouseenter', function () {
		$(this).fadeTo(0, 0.7);
	}).on('mouseleave', function () {
		$(this).fadeTo(0, 0.3);
	});

	var cmSum = $('.commend1 li').size() + 1,
		cmCur = 0,
		cmAuto = null;

	$('.commend1 ul').css('width', 625 * cmSum).append($('.commend1 li').first().clone());

	$('.cmr').on('click', function () {
		cmCur += 1;
		cmRoll();
	});

	$('.cml').on('click', function () {
		cmCur -= cmCur > 0 ? 1 : 0;
		cmRoll();
	});

	function cmRoll() {
		$('.commend1 ul').stop(true, true).animate({
			'margin-left': -625 * cmCur
		}, function () {
			if (cmCur >= cmSum - 1) {
				$('.commend1 ul').css('margin-left', '0px');
				cmCur = 0;
			}
		});
	}

	//	国情and观点栏目
	$('.gd1 .pic p').fadeTo(0, 0.6);
	$('.gd2 .pic p').fadeTo(0, 0.6);
	$('.gd3 .pic p').fadeTo(0, 0.6);
	$('.gdadv1 p').fadeTo(0, 0.6);
	$('#gqlm1 span').on('mouseenter',function(){
		$(this).addClass('gdblue');	
	}).on('mouseleave',function(){
		$(this).removeClass('gdblue');	
	});
	$('#gdlm1 .pic').first().show();
	$('#gdlm1 .list').first().show();
	$('#gdlm1 .gdmenu span').on('mouseenter',function(){
		$('#gdlm1 .gdmenu span').removeClass('gdblue');
		$(this).addClass('gdblue');
		var gdCur = $(this).index();
		$('#gdlm1 .pic,#gdlm1 .list').hide();
		$('#gdlm1 .pic').eq(gdCur).fadeTo(200,1);
		$('#gdlm1 .list').eq(gdCur).fadeTo(200,1);
	});
	$('.gd3 .gdkey span').on('mouseenter',function(){
			var hdCur = $(this).index();
			if( hdCur < 5 ){
				$('.gd3 .gdkey span').removeClass('kfirst');
				$(this).addClass('kfirst');
			}
	}).on('mouseleave',function(){
			$('.gd3 .gdkey span').removeClass('kfirst');
	});

	//	中国政务
	$('.gdblk li').each(function (idx, el) {
		idx += 1;
		$(el).addClass('blk' + idx);
	});
	
	// 财经中心板块
	$('#r-btn li').mouseover(function(){
		$('#r-btn li').removeClass("on");
		$('div.r-data p').css('display','none');
		$(this).addClass('on');
		$('div.r-data p').eq($(this).index()).css('display','block')
	});
	
	//互动中国 议库
	$('#hdyk .fr p:first,#hdyk .hdyk:first').show();
	$('#hdyk .fl span').on('mouseenter', function(){
			$('#hdyk .fl span').removeClass('blue');
			$(this).addClass('blue');
			var hk = $(this).index();
			$('#hdyk .fr p').hide();
			$('#hdyk .fr p').eq(hk).show();
			$('#hdyk .hdyk').hide();
			$('#hdyk .hdyk').eq(hk).show();
	});
	
	// 下部N个板块
	$('.boxma1 h1 span:last-child a').css('margin','0 4px');



}(window, window.jQuery));


(function($) {
	//解决BIG5下导航和广告问题
	var navStr = $('#china').attr('href');
	var navTxt = navStr.match('big5.china.com.cn/gate/big5/big5.china.com.cn/');
	if(navTxt) {
		$('#china').attr('href','http' + '://www.china.com.cn').html('中文简体');
	}
	
	$('iframe').each(function() {
		var str = $(this).attr('src');
		var t = str.match('big5.china.com.cn/2016ads');
		if(t) {
			$(this).attr('src',str.replace(/big5/, "www"));
		}
	});
})(jQuery);


//设置为主页 
function setHome(obj, vrl) {
	try {
		obj.style.behavior = 'url(#default#homepage)';
		obj.setHomePage(vrl);
	} catch (e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', vrl);
		} else {
			alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入：" + vrl + "点击确定。");
		}
	}
}

// 加入收藏 兼容360和IE6 
function shoucang(sTitle, sURL) {
	try {
		window.external.addFavorite(sURL, sTitle);
	} catch (e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		} catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}