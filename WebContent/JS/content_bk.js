window.onload = function() {
	
	downloadtext();


	list_item = document.getElementsByClassName("list-item");

	document.getElementById("sea-btn").onclick = function() {
		not_hide_list_item("sea-item");
	};


	document.getElementById("eat-btn").onclick = function() {
		not_hide_list_item("eat-item");
	};

	document.getElementById("gwangsan").onclick = function() {
		not_hide_list_item("gwangsan-item");
	};

	document.getElementById("seogu").onclick = function() {
		not_hide_list_item("seogu-item");
	};

	document.getElementById("namgu").onclick = function() {
		not_hide_list_item("namgu-item");
	};

	document.getElementById("donggu").onclick = function() {
		not_hide_list_item("donggu-item");
	};

	document.getElementById("bukgu").onclick = function() {
		not_hide_list_item("bukgu-item");
	};

	document.getElementById("up").onclick = function() {
		window.scrollTo(0,0);
	};

	document.getElementById("down").onclick = function() {
		var logo = document.getElementById("logo");
		window.scrollTo(0,document.body.offsetHeight);
	};
};

function not_hide_list_item(str) {
	console.log(str);
	for(var i=0;i<list_item.length;i++) {
		var class_list = list_item[i].className.split(' ');

		// 해당하는 클래스가 아닐경우
		if(class_list.indexOf(str)==-1) {
			// hide클래스가없으면 추가
			if(class_list.indexOf('hide')==-1) {
				list_item[i].className += " " + 'hide';
			}
		}
		else {
			//hide클래스가 있으면 제거
			if(class_list.indexOf('hide')!=-1) {
				var check = new RegExp("(\\s|^)" + 'hide' + "(\\s|$)"); 
				list_item[i].className = list_item[i].className.replace(check, " ").trim();

			}
		}
	}
}

async function downloadtext() {
	const res = await fetch('./img/볼거리먹거리.txt');
	const text = await res.text();
	arr = text.split('\n');
	
	create_div();
}

function create_div() {
	var list = document.getElementById("list");
	for(var i=0;i<arr.length;i++) {
		brr = arr[i].split('|');

		var item_div = document.createElement('div');
		item_div.setAttribute('class','list-item');
		if(brr[0]=="광산구") item_div.className += " " + "gwangsan-item";
		else if(brr[0]=="동구") item_div.className += " " + "donggu-item";
		else if(brr[0]=="서구") item_div.className += " " + "seogu-item";
		else if(brr[0]=="남구") item_div.className += " " + "namgu-item";
		else if(brr[0]=="북구") item_div.className += " " + "bukgu-item";

		if(brr[1]=='먹거리') item_div.className += " " + "eat-item";
		else if(brr[1] == '볼거리') item_div.className += " " + "sea-item";
		var img_div = document.createElement('div');
		img_div.setAttribute('class','list-img');

		var str = brr[0] + "_";
		if(brr[1]=='먹거리') str += "먹_";
		str+=brr[2].replace(' ','') + ".jpg";

		var img = document.createElement('img');
		img.setAttribute('src','./img/' +str);
		img_div.appendChild(img);

		var item_info_div = document.createElement('div');
		item_info_div.setAttribute('class','list-info');


		for(var j=0;j<brr.length;j++) {
			var p = document.createElement('p');
			p.innerHTML = brr[j];
			item_info_div.appendChild(p);
		}

		item_div.appendChild(img_div);
		item_div.appendChild(item_info_div);
		list.appendChild(item_div);

	}
}