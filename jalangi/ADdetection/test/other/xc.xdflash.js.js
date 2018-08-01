function openWindow(url, nActiveMode){
	try{
		parent.parent.MDIOpen(url, nActiveMode);
		return;
	}catch(e){}
	try{
		var win = window.open(url);
		if(!nActiveMode && win)win.blur();
	}catch(e){}
}
//!--AdStreem
function XAdFlash(url, linkurl, l, t, w, h){
	this.url = url;
	this.linkurl = linkurl;
	this.left = l;
	this.top = t;
	this.width = w;
	this.height = h;
}

function getFlashMovieObject(movieName)
{
  if (window.document[movieName])
  {
      return window.document[movieName];
  }
  if (navigator.appName.indexOf("Microsoft Internet")==-1)
  {
    if (document.embeds && document.embeds[movieName])
      return document.embeds[movieName];
  }
  else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
  {
    return document.getElementById(movieName);
  }
}

function XAdStreem(AdStreem){
	var self = this;
	this.AdStreem = AdStreem;
	this.closemovie = function(){
		//document.getElementById(this.AdStreem + '_may5_streemFlash').Rewind();
		//document.getElementById(this.AdStreem + '_may5_streemFlash').Stop();
		document.getElementById(this.AdStreem + '_may5_floatDiv').style.display='block';
		document.getElementById(this.AdStreem + '_may5_streemDiv').style.display='none';
	}
	this.PlayAdStreem = function(b){
		//if(navigator.appName == "Microsoft Internet Explorer"){
			//if(b) getFlashMovieObject(this.AdStreem + '_may5_streemFlash').Play();
			document.getElementById(this.AdStreem + '_may5_streemDiv').style.display = 'block';
			document.getElementById(this.AdStreem + '_may5_floatDiv').style.display = 'none';
		//}
		var s = setInterval(function(){
			if(!document.getElementById(AdStreem + '_may5_streemFlash').IsPlaying()){
				clearInterval(s);
				self.closemovie();
			}
		},200);

	}
	this.closebtn = function(){
		var flashDiv = document.getElementById(this.AdStreem + '_may5_streemFlashDiv');
		if(flashDiv){
			flashDiv.innerHTML = '';
		}
		var floatDiv = document.getElementById(this.AdStreem + '_may5_floatDiv');
		if(floatDiv){
			floatDiv.innerHTML = '';
		}
	}

	this.AutoMove = function(){
		var bdy = (document.documentElement && document.documentElement.clientWidth)?document.documentElement:document.body;
		var scroll_top = 0;
		if (document.documentElement && document.documentElement.scrollTop) {
			scroll_top = document.documentElement.scrollTop;
		} else if (document.body) {
			scroll_top = document.body.scrollTop;
		}
		var bigad = document.getElementById(this.AdStreem + '_may5_streemDiv');
		if(bigad){
			// bigad.style.left = (bdy.offsetWidth-this.StreemFlash.width)/2 + "px";
			// bigad.style.top = scroll_top + (bdy.clientHeight-this.StreemFlash.height)/2 + "px";
			bigad.style.left = "50%";
			bigad.style.top = "50%";
			bigad.style.marginLeft = '-' + (parseInt(this.StreemFlash.width)/2) + 'px';
			bigad.style.marginTop = (scroll_top - parseInt(this.StreemFlash.height)/2) + 'px';
		}

		document.getElementById(this.AdStreem + '_may5_floatDiv').style.left = (this.FloatFlash.left >= 0)? (bdy.scrollLeft + this.FloatFlash.left):(bdy.offsetWidth + bdy.scrollLeft - this.FloatFlash.width + this.FloatFlash.left - 20) + "px";
		document.getElementById(this.AdStreem + '_may5_floatDiv').style.top = scroll_top + bdy.clientHeight - this.FloatFlash.height - this.FloatFlash.top - 40 + "px";
		setTimeout(this.AdStreem +'.AutoMove()', 50);
	}

	this.showStreemDiv = function(){
		document.write('<div id="' + this.AdStreem + '_may5_streemDiv" style=\"z-index:999;overflow:visible;position:absolute;left:0px;top:0px;width:'+ this.StreemFlash.width +'px;height:'+ (this.StreemFlash.height) +'px\" align=\"right\">'

			+ '	<a style=\"display:block;height:100%;width:100%;z-index:98;position:absolute;\" href=\"' + this.StreemFlash.linkurl + '\" target=\"_blank\"><img src=\"http://imgs.xici.net/_img/1x1.gif\" width=\"100%\" height=\"100%\" border=\"0\"></a>'
			+ ' <EMBED name="'+ this.AdStreem + '_may5_streemFlash" id="'+ this.AdStreem + '_may5_streemFlash" src="'+ this.StreemFlash.url +'" type=\"application/x-shockwave-flash\" wmode=\"transparent\" loop="false" quality=\"high\" allowScriptAccess=\"always\" width='+ this.StreemFlash.width +' height='+ this.StreemFlash.height +' ></EMBED>'
			+ '	<img style=\"z-index:99;position:absolute;right:0;top:0;\" src=\"http://imgs.xici.net/_img/tab_close.gif\" onMouseOver=\"this.src=\'http://imgs.xici.net/_img/tab_close_over.gif\';\" onMouseOut=\"this.src=\'http://imgs.xici.net/_img/tab_close.gif\';\" onMouseDown=\"this.src=\'http://imgs.xici.net/_img/tab_close_down.gif\';\" onMouseUp=\"this.src=\'http://imgs.xici.net/_img/tab_close_over.gif\';\" onClick=\"eval(\'' + this.AdStreem + '.closemovie();\');\" width=15 height=15 border=0>'
			+ '</div>');

		document.write('<div id="' + this.AdStreem + '_may5_floatDiv" style=\"z-index:10;display:none;overflow:visible;position:absolute;left:0px;top:0px;width:'+ this.FloatFlash.width +'px;height:'+ (this.FloatFlash.height + 17) +'px\">'
			+ ' <div style="position:absolute;left:0px;top:0px;width:100%;height:'+ this.FloatFlash.height +';z-index:1000;">'
			+ '		<a href="' + this.FloatFlash.linkurl + '" target=_blank><img src="http://imgs.xici.net/_img/1x1.gif" width="100%" height="'+ this.FloatFlash.height +'" border="0"></a>'
			+ ' </div>');

		if(this.FloatFlash.url.substr(this.FloatFlash.url.length-4).toLowerCase() == ".swf")
			writehtml("<EMBED src='"+this.FloatFlash.url+"' type='application/x-shockwave-flash' wmode='transparent' quality='high' allowScriptAccess='always' width="+ this.FloatFlash.width +" height="+ this.FloatFlash.height +"></EMBED>");
		else
			document.write("<a href='"+this.FloatFlash.linkurl+"' target='_blank'><img src='"+this.FloatFlash.url+"' width='100%' height='100%' border='0' /></a>");

		document.write(
			  '<table bgcolor="#cccccc" border="0" cellpadding="0" cellspacing="0" width="100%">'
			+ '	<tr>'
			+ '		<td style=\"padding-top:2px\" align=\"center\" width=\"50%\">'
			+ '			<span style=\"font-size:12px;color:#000000;cursor:default;\" onclick=\"javascript:eval(\'' + this.AdStreem + '.closebtn();\');return false;\">πÿ ±’</span>'
			+ '		</td>'
			//+ '		<td style=\"padding-top:2px\" align=\"center\" width=\"50%\" bgcolor=\"#000000\">'
			//+ '			<a style=\"font-size:12px;color:#cccccc;text-decoration:none;\" onclick=\"javascript:eval(\'' + this.AdStreem + '.PlayAdStreem(true);\');return false;\" href="javascript:;">÷ÿ ≤•</a>'
			//+ '		</td>'
			+ '	</tr>'
			+ '	</table>'
			+ '</div>'
			+ "<SCR"+"IPT language=JavaScript event=FSCommand(command,args) for="+ this.AdStreem + "_may5_streemFlash>"
			+ this.AdStreem + "_may5_floatDiv.style.display='block';"
			+ this.AdStreem + "_may5_streemDiv.style.display='none';"
			+ 'document.getElementById(\"' + this.AdStreem + '_may5_streemFlash\").Stop();'
			+"</SCR"+"IPT>");

		this.AutoMove();
		this.PlayAdStreem();
	}
}
function writehtml(s){document.write(s);}
//AdStreem--
function adfloat()
{
	var x, y, width, height, bClose, x_width, x_height, lTimeout, doTime, html;

	if(typeof(float_x) == 'undefined')x = 20;
	else x = float_x;
	if(typeof(float_y) == 'undefined')y = 20;
	else y = float_y;

	if(typeof(float_width) == 'undefined')width = 80;
	else width = float_width;
	if(typeof(float_height) == 'undefined')height = 80;
	else height = float_height;

	if(typeof(float_x_width) == 'undefined')x_width = 200;
	else x_width = float_x_width;
	if(typeof(float_x_height) == 'undefined')x_height = 200;
	else x_height = float_x_height;

	if(typeof(float_close) == 'undefined')bClose = 1;
	else bClose = float_close;

	if(typeof(float_timeout) == 'undefined')lTimeout = 0;
	else lTimeout = float_timeout;
	doTime = (new Date()).getTime();

	var f_small_div = document.createElement('div');
	f_small_div.style.position = 'absolute';
	f_small_div.style.zIndex = 11;
	f_small_div.style.lineHeight = 1.8;
	f_small_div.style.width = width;
	if(x < 0)f_small_div.style.textAlign = 'right';

	if(float_src.substr(float_src.length-4).toLowerCase()!=".swf")
		html = "<a href='" + float_url + "' target = '_blank'><img src='" + float_src + "' WIDTH='" + width + "' HEIGHT='" + height + "'  border = 0></a>";
	else
		html = "<EMBED src='" + float_src + "' FlashVars='" + float_url + "' quality=high WIDTH='" + width + "' HEIGHT='" + height + "' TYPE='application/x-shockwave-flash' wmode=transparent allowScriptAccess=always></EMBED>";

	if(bClose)html += "<br><span style='color:#333;font-size:12px;cursor:pointer;'>πÿ±’</span>";

	f_small_div.innerHTML = html;

	document.body.insertBefore(f_small_div, document.body.childNodes[0]);

	if(bClose)f_small_div.childNodes[f_small_div.childNodes.length-1].onclick = function()
	{
		f_small_div.innerHTML = '';
		return false;
	}

	var f_big_div;
	if(typeof(float_x_src) != 'undefined')
	{
		if(float_x_src != '')
		{
			f_big_div = document.createElement('div');
			f_big_div.style.position = 'absolute';
			f_big_div.style.zIndex = 12;
			f_big_div.style.width = x_width;
			f_big_div.style.height = x_height;
			f_big_div.style.display = "none";

			if(float_x_src.substr(float_x_src.length-4).toLowerCase()!=".swf")
				f_big_div.innerHTML = "<a href='" + float_url + "' target = '_blank'><img src='" + float_x_src + "' WIDTH='" + x_width + "' HEIGHT='" + x_height + "'  border = 0></a>";
			else
				f_big_div.innerHTML  = "<EMBED src='" + float_x_src + "' FlashVars='" + float_url + "' quality=high WIDTH='" + x_width + "' HEIGHT='" + x_height + "' TYPE='application/x-shockwave-flash' wmode=transparent></EMBED>";

			document.body.insertBefore(f_big_div, document.body.childNodes[0]);

			f_small_div.childNodes[0].onmouseover = function()
			{
				f_big_div.style.display = '';
			}

			f_big_div.childNodes[0].onmouseout = function()
			{
				f_big_div.style.display = 'none';
			}
		}
	}

	function move() {
	    var bdy = (document.documentElement && document.documentElement.clientWidth)?document.documentElement:document.body;

	    if(lTimeout > 0 && lTimeout <= (new Date()).getTime() - doTime){
            f_small_div.parentNode.removeChild(f_small_div);
            return;
	    }

		if(y > 0) {
			f_small_div.style.top=bdy.scrollTop+y+'px';
			if(f_big_div)
				f_big_div.style.top=bdy.scrollTop+y+'px';
		} else {
			f_small_div.style.top=bdy.scrollTop + bdy.clientHeight+y-height-20+'px';
			if(f_big_div)
				f_big_div.style.top=bdy.scrollTop + bdy.clientHeight+y-x_height-20+'px';
		}

		if(x > 0) {
			f_small_div.style.left=bdy.scrollLeft+x+'px';
			if(f_big_div)
				f_big_div.style.left=bdy.scrollLeft+x+'px';
		} else {
			f_small_div.style.left=bdy.offsetWidth + bdy.scrollLeft+x-width-20+'px';
			if(f_big_div)
				f_big_div.style.left=bdy.offsetWidth + bdy.scrollLeft+x-x_width-20+'px';
		}
		setTimeout(move,10);
	}
	move();
} 
