var i = 0;
var len = 0;
var s = 0;
var h = 0;
var speed = 500;
var old_index=0;
var old_doc_width=0;
$(function(){
	slideInit();
	$('.left-btn,.right-btn').click(function(){
		var c = $(this).hasClass('left-btn');
		slide(c);
	});
	$('.nav .naving').click(function(){
		var view=$(this).attr("view");
		i=$(".slide-item").index($(".slide-item[view='"+view+"']"));
		if(i<0||isNaN(i)||i==old_index) return;
		slideTo(Math.ceil(Math.random()*100)%2==0,i);
		
	});
	old_doc_width=$(document).width();
	window.onresize=function(){
		//$('.slide-item').css("transform", "scale(0.5)");
		var now_doc_width=$(document).width();
		var scale=0;
		if(now_doc_width>old_doc_width) scale=parseFloat(1/parseFloat(now_doc_width/old_doc_width));
		else scale=parseFloat(1/parseFloat(old_doc_width/now_doc_width));
		//alert(scale);
		$('.view').css("transform", "scale("+scale+")");
	};
});

function slide(c){
	var isAnimate = false;
	$('.slide-item').each(function(){
		if($(this).is(':animated')) isAnimate = true;
	});
	if(isAnimate) return false;
	len = $('.slide-item').length - 1;
	if(c){ // LEFT
		h = i;
		i -- ;
		if(i < 0) i = len;
		s = i;
	}else{ // RIGHT
		h = i;
		i ++ ;
		if(i > len) i = 0;
		s = i;
	}
	$('.slide-item').eq(s).addClass('slide-show');
	$('.slide-item').eq(h).addClass('slide-hide');
	$('.slide-item').css({
		zIndex:0
	});
	slideLeft(c);
	slideRight(c);
	setSlideActive(s);
}

function slideTo(c,i){
	var isAnimate = false;
	$('.slide-item').each(function(){
		if($(this).is(':animated')) isAnimate = true;
	});
	if(isAnimate) return false;
	len = $('.slide-item').length - 1;
	s=i;
	h=old_index;
	old_index=s;
	console.log("s:"+s+" h:"+h+" i:"+i);
	$('.slide-item').eq(s).addClass('slide-show');
	$('.slide-item').eq(h).addClass('slide-hide');
	$('.slide-item').css({
		zIndex:0
	});
	slideLeft(c);
	slideRight(c);
	setSlideActive(s);
}

function slideInit(){
	h = $('.slide-item').length - 1;
	s = 0;
	$('.slide-item').eq(s).addClass('slide-show');
	$('.slide-item').eq(h).addClass('slide-hide');
	$('.slide-item').css({
		zIndex:'0'
	});
	slideLeft(true);
	slideRight(true);
	
	addEvent(window, "mousewheel", function(event) {
	    if (event.delta < 0) {
	    	slide(true);
	    }else{
	    	slide(false);
	    }
	});
	
	$(window).keydown(function(e){
		if(e.keyCode === 37 || e.keyCode === 38){
			slide(true);
		}else if(e.keyCode === 39 || e.keyCode === 40){
			slide(false);
		}
	});
}

function slideLeft(c){
	$('.slide-show').css({
		zIndex:'998'
	});
	$('.slide-show').addClass('scale');
	$('.slide-show').stop(true).animate({
		left:(c ? '55%':'-5%'),
		zIndex:'999',
		opacity:'0.8'
	},speed/2,function(){
		$(this).stop(true).animate({
			left:'0%', 
			zIndex:'999',
			opacity:'1'
		});
		$('.slide-show').removeClass('scale');
		$('.slide-item').removeClass('slide-show');
	});
}
function slideRight(c){
	$('.slide-hide').css({
		zIndex:'999'
	});
	$('.slide-hide').addClass('scale');
	$('.slide-hide').stop(true).animate({
		left:(c ? '-5%':'55%'),
		zIndex:'998',
		opacity:'0.8'
	},speed,function(){
		$(this).stop(true).animate({
			left:'0%',
			zIndex:'998',
			opacity:'0'
		});
		$('.slide-hide').removeClass('scale');
		$('.slide-item').removeClass('slide-hide');
	});
}

function setSlideActive(i){
	var view=$(".slide-item").eq(i).attr("view");
	$(".nav .naving").removeClass("active");
	$(".nav .naving[view='"+view+"']").addClass("active");
}

/*
 * 鼠标滚轮事件
 * 2016-7-6 15：35 v.10
 * */
 window.addEvent = (function(window, undefined) {        
    var _eventCompat = function(event) {
        var type = event.type;
        if (type == 'DOMMouseScroll' || type == 'mousewheel') {
            event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
        }
        //alert(event.delta);
        if (event.srcElement && !event.target) {
            event.target = event.srcElement;    
        }
        if (!event.preventDefault && event.returnValue !== undefined) {
            event.preventDefault = function() {
                event.returnValue = false;
            };
        }
        /* 
           ......其他一些兼容性处理 */
        return event;
    };
    if (window.addEventListener) {
        return function(el, type, fn, capture) {
            if (type === "mousewheel" && document.mozHidden !== undefined) {
                type = "DOMMouseScroll";
            }
            el.addEventListener(type, function(event) {
                fn.call(this, _eventCompat(event));
            }, capture || false);
        }
    } else if (window.attachEvent) {
        return function(el, type, fn, capture) {
            el.attachEvent("on" + type, function(event) {
                event = event || window.event;
                fn.call(el, _eventCompat(event));    
            });
        }
    }
    return function() {
    	
    };
})(window); 



/*addEvent(window, "mousewheel", function(event) {
    if (event.delta < 0) {
    	console.log("向上滚动值："+event.delta);
    }else{
    	console.log("向下滚动值："+event.delta);
    }
});*/
