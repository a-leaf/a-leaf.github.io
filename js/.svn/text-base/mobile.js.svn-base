$(function(){
	$('body').delegate('.mobile_head_nb','click',function(){
		toggle_menu_view();
	});
	$('body').delegate('.naving_view','click',function(){
		var view = $(this).attr('view');
		$('.view').hide();
		$(view).show();
		toggle_menu_view();
	});
	$('.view').hide();
	$('.view_index').show();
	$('.case_url').click(function(){alert(123);
		var url=$(this).attr('url');
		window.location.href=url;
	});
});

function toggle_menu_view(){
	$('.mobile_nb').toggleClass('menu_show');
}
