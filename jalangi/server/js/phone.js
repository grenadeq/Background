/*手机跳转*/
(function(window) {
	function query(params) {
		var param_list = params.split('&');
		var param_set = {};
		var param = '', kv_set = '';
		for (var k in param_list) {
			param = param_list[k];
			kv_set = param.split('=');
			param_set[kv_set[0]] = kv_set[1];
		}
		return param_set;
	}
	var query_str = location.search.substr(1);
	var query_params = query(query_str);
	if (query_params['f'] && 'pad' == query_params['f']) {
		return;
	}
	if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))) {
		location.replace("http://m.china.com.cn")
	}
} (window));