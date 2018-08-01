(function ($) {
    var tipAdder = {
        //广告容器默认class标识
        containerCssSelector: '.xici-a-add-tip',
        //广告标识HTML
        tipHTML: '<img width="30" height="17" style="height:17px;" alt="广告" src="http://imgs.xici.net/_img/ad.png">',

        //获取所有广告容器的jquery对象
        getJElems: function (classSelector) {
            var $elems = null;
            if(classSelector){
                $elems = $(classSelector);
            }else{
                $elems = $(this.containerCssSelector);
            }
            return $elems;
        },

        //判断容器是否是非定位元素
        isPositionStatic: function ($elem) {
            var isStatic = false;
            if($elem.css('position') === 'static'){
                isStatic = true;
            }
            return isStatic;
        },

        //设置容器元素样式，主要是定位，如果原来是static定位，则设置成 relative，否则不变
        setElemStyle: function ($elem) {
            if(this.isPositionStatic($elem)){
                $elem.css({
                    "position": "relative"
                });
            }
        },

        //添加广告标识
        addTip: function ($elem) {
            //如果容器内没有广告,则不添加标识
            if($elem.children().size() === 0){
                return false;
            }

            var $tip = $(this.tipHTML);
            var customerStyleString = $elem.attr('data-atip-style');
            this.setStyle($tip, customerStyleString);
            $elem.append($tip);
        },

        parseCSSObj: function (cssString) {
            var styleObj = {};
            var strArr = cssString.split(';');
            var itemArr, key, val;
            for(var i = 0; i < strArr.length; i++){
                itemArr = strArr[i].split(':');
                key = itemArr[0] && itemArr[0].replace(/['"\s]/g, '');
                val = itemArr[1] && itemArr[1].replace(/['"\s]/g, '');
                if(key && val){
                    styleObj[key] = val;
                }
            }
            return styleObj;
        },
        
        //根据容器上的data-atip-style设置广告标识的 style
        setStyle: function ($tip, customerStyleString) {
            var styleObj = this.parseCSSObj(customerStyleString || '');
            var defaultCss = {
                position: 'absolute',
                right: '0',
                bottom: '0'
            };
            var cssRes = $.extend({}, defaultCss, styleObj);
            if('left' in cssRes){
                cssRes.right = 'auto';
            }
            if('top' in cssRes){
                cssRes.bottom = 'auto';
            }

            $tip.css(cssRes);
        },
        
        //执行方法
        add: function (classSelector) {
            var that = this;
            var $elems = this.getJElems(classSelector);
            $elems.each(function (index, elem) {
                var $elem = $(elem);
                //设置容器样式
                that.setElemStyle($elem);
                //添加标识,方法内部包含样式设置
                that.addTip($elem);
            });
        }
    };

    $.xiciAdAddTip = function (classSelector) {
        tipAdder.add(classSelector);
    };

    $.xiciAdAddTip();
})(jQuery);