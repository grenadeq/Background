var _hmt = _hmt || [];
var _hmt_matcher = document.cookie.match(/uid=(.*?);/);
if (_hmt_matcher && _hmt_matcher[1] != '0') {
	_hmt.push('_setUserId', _hmt_matcher[1]);
}
(function() {
	var hm = document.createElement("script");
	hm.src = "//hm.baidu.com/hm.js?aefe6b1937699307f217175cc526c1e1";
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(hm, s);
})();