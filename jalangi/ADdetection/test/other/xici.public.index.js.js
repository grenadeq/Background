//胡同口首页
/*
*Copyright:http://www.xici.net/
*File:xici.public.index.js
*name:XICI.UI.Public.Index
*Description:depend on xici.core.js
*Date:2013.11.18 By Eking
*UpDate:2014.10.27 By Eking
*/
if (!String.prototype.indexOf){
  		String.prototype.indexOf = function(elt /*, from*/){
	    var len = this.length >>> 0;
	    var from = Number(arguments[1]) || 0;
	    from = (from < 0)? Math.ceil(from): Math.floor(from);
	    if (from < 0)
	      from += len;
	    for (; from < len; from++)
	    {
	      if (from in this && this[from] === elt)
	        return from;
	    }
	    return -1;
	  };
	}

XICI.UI.Public = XICI.UI.Public || function () {};
Class.extend(XICI.UI.Public,{
	Index:Class.create({
		init:function(obj){
			var _=this;
			if(!(obj.module && obj.module == "scrollOnly")){
				_.initStage();
			}
			if(obj.module=="scrollOnly"){
				_.doScrollOnly();
			}
			if(obj.area=="nanjing"){
				_.doNanjing();
			}
			if(obj.area=="suzhou"){
				_.doSuzhou();
			}
			if(obj.area=="shengnei"){
				_.doShengnei();
			}
			if(obj.area=="shengwai"){
				_.doShengwai();
			}
			if(obj.area=="315"){
				_.do315();
			}
		},
		initStage:function(){
			var _=this;
			_.autoSize();
			_.goTop("goTop");
			_.showHide("hearts");
			_.showHide("weiXin");
			_.fixIe6();
		},
		do315:function(){
			var _=this;
			_.placeHolder("J_HeaderSearchIpt");
			var scrollBanner=new XICI.UI.Public.Index.ScrollImg();
			scrollBanner.setDelay(3500);
			scrollBanner.init("scrollBanner");
		},
		doNanjing:function(){
			var _=this;
			_.addNewLabel();
			_.placeHolder("J_HeaderSearchIpt");
			_.taobaoAD();
			var scrollChannel=new XICI.UI.Public.Index.ScrollImg();
			scrollChannel.init("scrollChannel");
			
			var scrollBanner=new XICI.UI.Public.Index.ScrollImg();
			scrollBanner.setDelay(3500);
			scrollBanner.init("scrollBanner");

			var scrollWedding=new XICI.UI.Public.Index.ScrollImg();
			scrollWedding.init("scrollWedding");

			var scrollChild=new XICI.UI.Public.Index.ScrollImg();
			scrollChild.init("scrollChild");

			var scrollJia=new XICI.UI.Public.Index.ScrollImg();
			scrollJia.init("scrollJia");

			var scrollFang=new XICI.UI.Public.Index.ScrollImg();
			scrollFang.init("scrollFang");

			var scrollCar=new XICI.UI.Public.Index.ScrollImg();
			scrollCar.init("scrollCar");

			var scrollMoney=new XICI.UI.Public.Index.ScrollImg();
			scrollMoney.init("scrollMoney");

			var scrollFashion=new XICI.UI.Public.Index.ScrollImg();
			scrollFashion.init("scrollFashion");
		},
		doSuzhou:function(){
			var _=this;
			var scrollChannel=new XICI.UI.Public.Index.ScrollImg();
			scrollChannel.init("scrollChannel2");
			var scrollChannel=new XICI.UI.Public.Index.ScrollImg();
			scrollChannel.init("scrollChannel");
			var scrollBanner=new XICI.UI.Public.Index.ScrollImg();
			scrollBanner.setDelay(3500);
			scrollBanner.init("scrollBanner");
		},
		doShengnei:function(){
			var _=this;
			_.addNewLabel();
			_.taobaoAD();
			var scrollChannel=new XICI.UI.Public.Index.ScrollImg();
			scrollChannel.init("scrollChannel");
			var scrollBanner=new XICI.UI.Public.Index.ScrollImg();
			scrollBanner.setDelay(3500);
			scrollBanner.init("scrollBanner");
		},
		doShengwai:function(){
			var _=this;
			_.childMenu("publicMenu");
			_.tabList("infoList");
		},
		doScrollOnly:function(){
			var _=this;
			var scrollBanner=new XICI.UI.Public.Index.ScrollImg();
			scrollBanner.setDelay(3500);
			scrollBanner.init("scrollBanner");
		},
		autoSize:function(){
			var winWidth = document.documentElement.clientWidth;
			//1190加上20像素的滚动条 by xx
			if(winWidth>=1280) {
			    document.body.className="maxfixed";
			/*}else if(winWidth<1280&&winWidth>=1190) {
			    document.body.className="autobar";
			}else if(winWidth<1190&&winWidth>=1180) {
			    document.body.className="autowrap";
			}else if(winWidth<1180&&winWidth>=1110) {
			    document.body.className="middlbox";
			}else if(winWidth<1110&&winWidth>=1080) {
			    document.body.className="transbox";*/
			}else if(winWidth<1280 && winWidth>=1210){
				document.body.className="maxfixed sideBarPos"
			}	
			else{
			    document.body.className="minfixed";
			}
		    if(document.getElementById("mainMenu")){
		    	var menuDemo = document.getElementById("mainMenu");
		    	var menuList = document.getElementById("publicMenu");
		    	var menuAfter = document.getElementById("afterMenu");
		    	var menuWrap = document.getElementById("wrapMenu");
		    	if(winWidth>=1080){
		    		menuWrap.insertBefore(menuList,menuAfter);
		    	}else{
		    		menuDemo.appendChild(menuList);
		    	}
		    }
		},
		showHide:function(id){
			var dom, domClass, time;
			dom = document.getElementById(id);
			if (! dom) {
				return false;
			}
			domClass = dom.className;
			dom.onmouseover=function(){
				clearTimeout(time);
				dom.className = domClass + " hover";
			}
			dom.onmouseout=function(){
				time=setTimeout(function(){
					dom.className = domClass;
				},200);
			}
		},
		childMenu:function (id){
			var oBox = document.getElementById(id);
			var domOn = oBox.getElementsByTagName("ul")[0].getElementsByTagName("li");
			var domBox = oBox.getElementsByTagName("div");
			var len=domOn.length;
			var timer, timer2;
			function changes(){
				for(var i=0;i<len;i++){
					domOn[i].className="";
					domBox[i].style.display="none";
				}
			}
			function hideMenu(){
				oBox.className="public_menu";
			}
			XICI.Event.addEvent(oBox,"mouseover",function(){
				clearTimeout(timer2);
				oBox.className="public_menu public_menu_on";
			});
			XICI.Event.addEvent(oBox,"mouseout",function(){
				timer2=setTimeout(hideMenu,200);
			});
			for(var i=0;i<len;i++){
				domOn[i].setAttribute("index",i);
				domBox[i].setAttribute("index",i);
				domOn[i].onmouseover=function(){
					clearTimeout(timer);
					changes();
					this.className="on";
					var num=this.getAttribute("index");
					domBox[num].style.display="block";
				}
				domBox[i].onmouseover=function(){
					clearTimeout(timer);
					changes();
					this.style.display="block";
					var num=this.getAttribute("index");
					domOn[num].className="on";
				}
				domOn[i].onmouseout=function(){
					timer=setTimeout(changes,200);
				}
				domBox[i].onmouseout=function(){
					timer=setTimeout(changes,200);
				}
			}
		},
		tabList:function(id){
			var dom=document.getElementById(id);
			var lists=dom.getElementsByTagName("li");
			var len=lists.length;
			for(var i=1;i<len;i++){
				if (i%2==0) {
					lists[i].className="even";
				}else{
					lists[i].className="odd";
				};
				var iname=lists[i].getElementsByTagName("span")[2];
				var num=iname.innerHTML;
				if(num>9){
					iname.innerHTML="<strong>"+num+"</strong>"
				}
			}
		},
		tabChange:function(id){
			var oBox = document.getElementById(id);
			var domTab = oBox.getElementsByTagName("ul")[0].getElementsByTagName("li");
			var domBox = oBox.getElementsByTagName("div");
			var len=domTab.length;
			for(var i=0;i<len;i++){
				domTab[i].onmouseover=function(){
					changes(this);
				}
			}
			function changes(obj){
				for(var i=0;i<len;i++){
					if(domTab[i]==obj){
						domTab[i].className="on";
						domBox[i].style.display="block";
					}else{
						domTab[i].className="";
						domBox[i].style.display="none";
					}
				}
			}
		},
		fixIe6:function(id){
			var ieVersion=XICI.BOM.getIEVersion();
            if(ieVersion==6){
				var html = document.getElementsByTagName('html')[0];
				html.style.backgroundImage = 'url(about:blank)';
				html.style.backgroundAttachment = 'fixed';
			};
		},
		goTop:function(id){
			var obj=document.getElementById(id);
			obj.onclick=function(){
		        if(document.documentElement.scrollTop==0){
		        	document.body.scrollTop=0;
		        }else{
		        	document.documentElement.scrollTop=0;
		        }
		    }
			XICI.Event.addEvent(window,"scroll",function(){
				var diff=document.documentElement.scrollTop || document.body.scrollTop;
				if(diff > 100){
					obj.style.display="block";
				}else{
					obj.style.display="none";
				}
				obj.onclick=function(){
			        if(document.documentElement.scrollTop==0){
			        	document.body.scrollTop=0;
			        }else{
			        	document.documentElement.scrollTop=0;
			        }
			    }
			});
		},
		fuckYoubiao : function(){
			var firstLevelDoms = document.body.children;
			for(var i = firstLevelDoms.length-1; i > 0; i--){
				var id = firstLevelDoms[i].getAttribute('id');
				if(id && id.search('flowchange_allyes') > -1){
					firstLevelDoms[i].style.zIndex = 10;
					break;
				}
			}
		},
		addNewLabel : function(){
			var oDiv = document.getElementById("mainNavList");
			var aDom = oDiv.getElementsByTagName("a");
			var aLi;
			for(var i=0,l=aDom.length;i<l;i++){
				aLi = aDom[i].parentNode;
				var inner  = aDom[i].innerText||aDom[i].textContent;
				if (inner=="家装"||inner.indexOf("家装")!=-1
					) {
					aLi.className = "new";
					var icon=document.createElement("i");
					aLi.appendChild(icon);
				};
				if (inner=="生活"||inner=="生活") {
					aLi.className = "hot";
					var icon=document.createElement("i");
					aLi.appendChild(icon);
				};
			}
		},
		placeHolder : function(id){
			var inputDomObject = document.getElementById(id);
			if( XICI.BOM.ieVersion && XICI.BOM.ieVersion < 10 ){
				var defaultVal = inputDomObject.getAttribute('placeholder');
				inputDomObject.value = inputDomObject.getAttribute('placeholder');
				XICI.Event.addEvent(inputDomObject, 'blur', function(){
					if( inputDomObject.value === '' ){
						inputDomObject.value = defaultVal;
					}
				});
				XICI.Event.addEvent(inputDomObject, 'focus', function(){
					if( inputDomObject.value === defaultVal ){
						inputDomObject.value = '';
					}
				});
			}
		},
		taobaoAD : function() {
			var div1190x400 = document.getElementById("hetoo_tb_1190x400");
			if ( div1190x400 == null ) return;
			div1190x400.className = "htb_wrap";
			var headTag = document.getElementsByTagName("head")[0];
			var div1 = document.createElement("div");
			div1.className = "htb_item htb_1";
			var div1_a = document.createElement("a");
			div1_a.className = "htb_href";
			div1_a.id = "tanx-a-mm_50128954_4406826_36944412";
			div1.appendChild(div1_a);
			var div1_script = document.createElement("script");
			div1_script.async = true;
			div1_script.type = "text/javascript";
			div1_script.charset = "gbk";
			div1_script.src = "http://p.tanx.com/ex?i=mm_50128954_4406826_36944412";
			div1_script.id = "tanx-s-mm_50128954_4406826_36944412";
			div1190x400.appendChild(div1);
			headTag.appendChild(div1_script);

			var div2 = document.createElement("div");
			div2.className = "htb_item htb_2";
			var div2_a = document.createElement("a");
			div2_a.className = "htb_href";
			div2_a.id = "tanx-a-mm_50128954_4406826_36936708";
			div2.appendChild(div2_a);
			var div2_script = document.createElement("script");
			div2_script.async = true;
			div2_script.type = "text/javascript";
			div2_script.charset = "gbk";
			div2_script.src = "http://p.tanx.com/ex?i=mm_50128954_4406826_36936708";
			div2_script.id = "tanx-s-mm_50128954_4406826_36936708";
			div1190x400.appendChild(div2);
			headTag.appendChild(div2_script);

			var div3 = document.createElement("div");
			div3.className = "htb_item htb_3";
			var div3_a = document.createElement("a");
			div3_a.className = "htb_href";
			div3_a.id = "tanx-a-mm_50128954_4406826_36930735";
			div3.appendChild(div3_a);
			var div3_script = document.createElement("script");
			div3_script.async = true;
			div3_script.type = "text/javascript";
			div3_script.charset = "gbk";
			div3_script.src = "http://p.tanx.com/ex?i=mm_50128954_4406826_36930735";
			div3_script.id = "tanx-s-mm_50128954_4406826_36930735";
			div1190x400.appendChild(div3);
			headTag.appendChild(div3_script);

			var div4 = document.createElement("div");
			div4.className = "htb_item htb_4";
			var div4_a = document.createElement("a");
			div4_a.className = "htb_href";
			div4_a.id = "tanx-a-mm_50128954_4406826_36948401";
			div4.appendChild(div4_a);
			var div4_script = document.createElement("script");
			div4_script.async = true;
			div4_script.type = "text/javascript";
			div4_script.charset = "gbk";
			div4_script.src = "http://p.tanx.com/ex?i=mm_50128954_4406826_36948401";
			div4_script.id = "tanx-s-mm_50128954_4406826_36948401";
			div1190x400.appendChild(div4);
			headTag.appendChild(div4_script);
		}
	})
});
Class.extend(XICI.UI.Public.Index,{
	ScrollImg:Class.create({
		bigbox:null,//容器
		img:null,//图片(li)
		order:null,//序号|label|缩略图|(li)
		len:0,//图片个数
		prov:0,//前一项
		index:0,//当前项
		play:null,//控制自动播放

		//初始化，id=elementId;time=图片切换时间
		init:function(id,time){
			this.bigbox=document.getElementById(id);
			var boxul=this.bigbox.getElementsByTagName("ul");
			this.img=boxul[0].getElementsByTagName("li");
			this.len=this.img.length;
			if(boxul[1]){
				this.order=boxul[1].getElementsByTagName("li");
			}else{
				if('\v'=='v'){//IE8-
					var ol=document.createElement("<ol class='scroll_order'></ol>");
				}else{
					var ol=document.createElement("ol");
					ol.setAttribute("class","scroll_order");
				}

				this.bigbox.appendChild(ol);
				for(var i=0;i<this.len;i++){
					var li=document.createElement("li");
					ol.appendChild(li);
				}
				this.order=ol.getElementsByTagName("li");
			}
			for(var j=0;j<this.len;j++){
				this.img[j].className="";
				this.order[j].className="";
			}
			if(!this.init.arguments[1]){//时间参数可以不设置，默认3秒
				var time=3000;
			}
			this.img[0].className="on";
			this.order[0].className="on";
			this.autoPlay();
			this.mouse(this.bigbox,this.order);
		},

		//通过添加删除.on来控制图片切换
		imgShow:function(num,order,img){
			this.index=num;
			for(var i=0;i<order.length;i++){
				order[i].className="";
				img[i].className="";
			}
			order[this.index].className="on";
			img[this.index].className="on";
		},
		setDelay:function(time){
			this.time=time;
			return this.time;
		},
		//依次顺序切换（默认顺序切换）
		autoPlay:function(){
			var _=this;
			var time;
			if (!_.setDelay(this.time)) {//如无设置时间方法，默认时间为3秒
				time=3000;
			}else{
				time=_.setDelay(this.time);
			};
			clearInterval(_.play);
			_.play=setInterval(function(){
				_.prov=_.index;
				_.index++;
				if(_.index>_.len-1){_.index=0};
				_.imgShow(_.index,_.order,_.img);
			},time);
		},
		//鼠标事件
		mouse:function(demo,order){
			var _=this;
			//左右按钮点击操作
			var ilabel = _.bigbox.getElementsByTagName("i");
			if (ilabel) {
				// var ilabel=_.bigbox.getElementsByTagName("i");
				if (ilabel.length==2) {
					for(var i=0;i<ilabel.length;i++){
						ilabel[0].onclick=function(){
							_.prov=_.index;
							_.index--;
							if(_.index<0){_.index=_.len-1};
							_.imgShow(_.index,_.order,_.img);
						}
						ilabel[1].onclick=function(){
							_.prov=_.index;
							_.index++;
							if(_.index>_.len-1){_.index=0};
							_.imgShow(_.index,_.order,_.img);
						}
						if('\v'=='v'){
							ilabel[i].onselectstart=function(){
								return false;
							}
						};
					}
				};
			}
			if (_.init.arguments[1]) {
				var time=_.init.arguments[1];
			}else{
				var time=3000;
			};
			demo.onmouseover=function(){
				clearInterval(_.play);
			}
			demo.onmouseout=function(){
				_.autoPlay();
			}
			for(var i=0;i<_.len;i++){
				order[i].index=i;
				order[i].onmouseover=function(){
					_.prov=_.index;
					_.imgShow(this.index,_.order,_.img);
				}
			}
		}
	})
});
//首页GA埋点
function xiciGa(option1){
	var tagName = tagName || '*',
		eles = document.getElementsByTagName(tagName),
		arr = [],
		gas = [];
	for(var i=0,l=eles.length; i<l; i++){
		if(eles[i].getAttribute('data-type')=='ga'){
			arr.push(eles[i]);
		}
	};
	for(var i=0,l=arr.length;i<l;i++){
		if(arr[i].tagName.toLowerCase() == "a"){
			gas.push(arr[i]);
		}else{
			var _a=arr[i].getElementsByTagName("a");
			for(var j=0,m=_a.length;j<m;j++){
				_a[j].setAttribute('node-type',arr[i].getAttribute('node-type'));
				gas.push(_a[j]);
			}
		}
	};
	for(var i=0,l=gas.length;i<l;i++){
		XICI.Event.addEvent(gas[i],"click",(function(i){
		    return function(){
		        var _option = gas[i].getAttribute('node-type');
		        var _title = gas[i].innerText || gas[i].getAttribute("title") || gas[i].getAttribute("alt") || "";
		        var _option3 = _title + "|" + gas[i].getAttribute("href");
		        _gaq.push(['_trackEvent',option1, _option, _option3]);
		    }
		})(i));
	};
}