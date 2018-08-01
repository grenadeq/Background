$(function() {
	$('.mobile_logo').hover(function() {
		$('.mobile_hover').show();
	}, function() {
		$('.mobile_hover').hide();
	});

	$('.b_top li:first').addClass('hover');

	$('.b_top li').hover(function() {
		$(this).click();
	});

	$('.b_top li').click(function() {
		var tab = $(this).data('tab');
		$(this).addClass('hover').siblings().removeClass('hover');
		if (tab === 'hot') {
			$('.style_list.hot').show();
			$('.style_list.fresh').hide()
		} else {
			$('.style_list.fresh').show();
			$('.style_list.hot').hide();
		}
		return false;
	});

	$('.guide_list li').mouseenter(function() {
		$(this).click();
	});

	$('.guide_list li').click(function() {
		$(this).addClass('hover').siblings().removeClass('hover');
		var index = $(this).index();
		$('.guide_content').hide().eq(index).show();
	});
		$('img.lazy').lazyload({
		effect: 'fadeIn',
		threshold : 200
	});
	
	$('#commkind').click(function(){
		var tar = $('#communitykind').offset().top;
		var target = parseInt(tar) - 50;
		$('html,body').animate({scrollTop:target},300);
	})


	var ie=!!window.ActiveXObject;
	var ie6=ie&&!window.XMLHttpRequest;
	if (ie){if (ie6){
			$('.ie6note').html('<div class="mask"></div><div class="remindpos"><div class="remind"><span class="quit">&times;</span><p class="verl">����������汾���ͣ�</p><p>Ϊ�˱���������Ϣ��ȫ��������ȷ��ʾ�������������������</p><a target="_blank" href="https://www.microsoft.com/china/windows/IE/upgrade/index.aspx" class="goupdate">ȥ����</a><a class="cec">ȡ��</a></div></div>')
		}}
	$(".quit").on("click",function(){
		$('.mask').css('display','none');
		$('.remindpos').css('display','none');
	})
	$('.cec').on("click",function(){
		$('.mask').css('display','none');
		$('.remindpos').css('display','none');
	})

});