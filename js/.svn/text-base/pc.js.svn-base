$(function(){
	$('.news_list .news').click(function(){
		var title=$(this).find('p').text();
		var ct=$(this).find('.content');
		var time=$(ct).attr('time');
		var content=$(ct).text();
		$('.news_content .news_title').text(title);
		$('.news_content .news_time').text(time);
		$('.news_content .news_text').text(content);
	});
	$('.news_list .news').eq(0).trigger('click');
	
	$('.case_url').click(function(){
		var url=$(this).attr('url');
		window.open(url);
	});
});