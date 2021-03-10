$(function() {
	var currentPosition = parseInt($("#floatMenu").css("top"));
	$(window).scroll(function() {
		var position = $(window).scrollTop();
		$("#floatMenu").stop().animate({"top":position+currentPosition+"px"},1000);
	});
	$("#header").load("header.html"); 
	$("#footer").load("footer.html"); 

	$.ajax({
		url: "img/볼거리먹거리json.json",
		type: "GET",
		dataType : 'json',
		success:function(response) {
			create_div2(response);
		},
		error:function(xhr,status,msg) {
			console.log("상태값 : " + status + " Http에러메시지 : " + msg);
		}
	});

	$("#sea-btn").click(function() {
		not_hide_list_item("sea-item");
	});

	$("#eat-btn").click(function() {
		not_hide_list_item("eat-item");
	});

	$(".gu-btn").each(function() {
		$(this).click(function() {
			not_hide_list_item($(this).attr("id")+"-item");
		});
	});

	// $(".btn_list").each(function() {
	// 	$(this).click(function() {
	// 		not_hide_list_item($(this).attr("id").slice(0,4)+"item");
	// 	});
	// });

	$("#up").click(function() {
		window.scrollTo(0,0);
	});

	$("#down").click(function() {
		window.scrollTo(0,document.body.offsetHeight);		
	});
});

function not_hide_list_item(str) {
	$(".hide").each(function() {
		$(this).removeClass('hide');
	});

	$(".list-item").not("."+str).each(function() {
		$(this).addClass('hide');
	});
}

function create_div2(data) {
	$.each(data,function(index,item) {
		var $new_div = $(`<div class="list-item"></div>`).appendTo("#list");
		if(item.gu=="광산구") $new_div.addClass("gwangsan-item");
		else if(item.gu=="동구") $new_div.addClass("donggu-item");
		else if(item.gu=="서구") $new_div.addClass("seogu-item");
		else if(item.gu=="남구") $new_div.addClass("namgu-item");
		else if(item.gu=="북구") $new_div.addClass("bukgu-item");

		if(item.category=='먹거리') $new_div.addClass("eat-item");
		else if(item.category == '볼거리') $new_div.addClass("sea-item");

		var $list_img = $('<div>',{
			class: 'list-img'
		}).appendTo($new_div);

		var str = item.gu + "_";
		if(item.category=='먹거리') str += "먹_";
		str+=item.title.replace(' ','') + ".jpg";
		$('<img>',{
			src : './img/' + str
		}).appendTo($list_img);


		var $list_info = $('<div>', {
			class : 'list-info'
		}).appendTo($new_div);
		
		var $title = $('<p class="item-title">').text(item.title);

		//var $category = $('<span class="badge">').html(item.category[0]);
		var $category = $('<span class="badge">').html(String.fromCodePoint(0x1F60E));
		if(item.category=='먹거리') {
			var $category = $('<span class="badge">').html(String.fromCodePoint(0x1F370));
			$category.addClass('badge-info');
		}
		else if(item.category=='볼거리') {
			var $category = $('<span class="badge">').html(String.fromCodePoint(0x1F60E));
			$category.addClass('badge-warning');
		}
		$title.append($category).appendTo($list_info);
	

		$('<p class="item-gu">').html(item.gu).appendTo($list_info);

		if("" != item.star) {
			var $star = $('<p class="grade row">');
			$('<div class="star">').text(String.fromCodePoint(0x1F496)).appendTo($star);
			$star.html($star.html() + item.star.slice(1));
			$star.appendTo($list_info);
		}
		$('<p class="item-place">').html(item.place).appendTo($list_info);
		$('<p class="item-waytogo">').html(item.waytogo).appendTo($list_info);


		var hash_list = item.hashtag.split(',')
		var $hash_tag_p = $('<p class="hash_list">');
		var instagram_search_url = 'https://www.instagram.com/explore/tags/';
		if("" != hash_list) {
			$.each(hash_list,function(index,item) {
				$hash_item = $('<a class="hashtag">').text("#" + item);
				$hash_item.attr('href', instagram_search_url + item.replaceAll(' ',''));
				$hash_item.attr('target','_blank');
				$hash_item.appendTo($hash_tag_p);
			});
		}
		$hash_tag_p.appendTo($list_info);
	});
}