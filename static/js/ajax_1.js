/*
* @Author: W.D
* @Date:   2018-11-11 23:08:13
* @Last Modified by:   W.D
* @Last Modified time: 2018-11-12 10:36:09
*/

$(function() {
$.ajax({
	url:'https://api.douban.com/v2/movie/top250',
	data:{
		'start':0,
		'count':5,
	},
	dataType:'jsonp',
	success:function(data){
		console.log(data);
		var title = data.title;
		var lists  = data.subjects;
		var str = '';
		for(var i =0; i<lists.length;i++){
		str +='<div class="media">';
		str += '<div class="media-left">'; 
		str += '<a href="'+lists[i].alt+'">';
		str += '<img class="media-object" data-src="holder.js/64x64" alt="64x64" src="' + lists[i].images.small + '" data-holder-rendered="true" style="width: 100px; height: 100px;" />';
		str += '</a>';
		str += '</div>';
		str += '<div class="media-body">';
		str += '<h4 class="media-heading">' + lists[i].title + '</h4>';
		str += lists[i].genres.join(",");
		str += '<p>评分：'+ lists[i].rating.average +'</p>';
		str += '</div></div>';	
		}
		$("#top250").find("h3").text(title).parent().append(str);
	}

})

})
$(function(){

	// 默认电影数据
	var options = {
				city:"广州",
				start:0,
				count:12,
			};
	// 默认调用数据
	getMovieData(options);


	// 搜索功能
	$("#search").click(function(){
		var MovieName = $("#searchInp").val();
		// 判断是否有数据
		if(MovieName == "请输入城市。。。"){
			return false;
		}

		options.city = MovieName;
		getMovieData(options);

	})

	// 分页功能
	$(".pagination").children().click(function(){
		var i = $(this).index();
		var len = $(".pagination").children().length;
		//1-5按钮功能
		if(i != 0 && i != len-1){
			options.start = (i-1) * 10;
			getMovieData(options);
		}
		// 下一页功能
		if(i == len-1){
			options.start += 10;
			getMovieData(options);
		}
		// 上一页功能
		if(i == 0){
			options.start -= 10;
			options.start >= 0 ? options.start:options.start=0; 
			getMovieData(options);	
		}
	})


	// // 热门电影
	function getMovieData(options){
		$.ajax({
			url:"https://api.douban.com/v2/movie/in_theaters",
			data:options,
			dataType:"jsonp",
			success:function(data){
				console.log(options);
				var lists = data.subjects;  //数据

				// 没有数据时中断
				if(lists.length <2){
					$("#hotLists").empty().html("<h1>没有数据。。。</h1>");
					return false;
				}

				$(".page-header h3").text(data.title);

				var str = "";
				for (var i = 0; i < lists.length; i++) {
					str += '<div class="col-sm-6 col-md-4">';
					str += '<div class="thumbnail">';
					str += '<img data-src="holder.js/100%x200" alt="100%x200" src="' + lists[i].images.small + '" data-holder-rendered="true" style="height: 200px;margin-top:20px; display: block;">';
					str += '<div class="caption">';
					str += '<h3>' + lists[i].title + '</h3>';
					str += '<h4>' + lists[i].original_title + '</h4>';
					str += '<p>类型：' + lists[i].genres.join(",") + '</p>';
					str += '<p>评价：' + lists[i].rating.average + '</p>';
					str += '<p><a href="subject.html?id=' + lists[i].id + '" class="btn btn-primary" role="button">链接</a> </p>';
					str += '</div>';
					str += '</div>';
					str += '</div>';
				};
				$("#hotLists").empty().append(str);
			}
		})
	}

})


$(function(){
	// 详细页内容
	// 
	// 获取urlId
	var url = window.location.href ;//当前url链接
	// var url = "subject.html?id=26942674";
	var param = url.split("?")[1].split("=")[1];//获取参数


	if(param != ""){
		Dataxiangxi(param);
	}

	// var data = {"rating": {"max": 10, "average": 7.7, "stars": "40", "min": 0}, "reviews_count": 3922, "wish_count": 34424, "douban_site": "", "year": "2017", "images": {"small": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2508925590.jpg", "large": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2508925590.jpg", "medium": "https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2508925590.jpg"}, "alt": "https:\/\/movie.douban.com\/subject\/26942674\/", "id": "26942674", "mobile_url": "https:\/\/movie.douban.com\/subject\/26942674\/mobile", "title": "\u795e\u79d8\u5de8\u661f", "do_count": null, "share_url": "https:\/\/m.douban.com\/movie\/subject\/26942674", "seasons_count": null, "schedule_url": "", "episodes_count": null, "countries": ["\u5370\u5ea6"], "genres": ["\u5267\u60c5", "\u97f3\u4e50"], "collect_count": 288206, "casts": [{"alt": "https:\/\/movie.douban.com\/celebrity\/1373292\/", "avatars": {"small": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1494080264.12.jpg", "large": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1494080264.12.jpg", "medium": "https://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1494080264.12.jpg"}, "name": "\u585e\u4f0a\u62c9\u00b7\u6c83\u897f", "id": "1373292"}, {"alt": "https:\/\/movie.douban.com\/celebrity\/1383897\/", "avatars": {"small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1510229457.27.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1510229457.27.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1510229457.27.jpg"}, "name": "\u6885\u00b7\u7ef4\u8d3e", "id": "1383897"}, {"alt": "https:\/\/movie.douban.com\/celebrity\/1031931\/", "avatars": {"small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p13628.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p13628.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p13628.jpg"}, "name": "\u963f\u7c73\u5c14\u00b7\u6c57", "id": "1031931"}, {"alt": "https:\/\/movie.douban.com\/celebrity\/1383898\/", "avatars": {"small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1510229759.29.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1510229759.29.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1510229759.29.jpg"}, "name": "\u62c9\u6770\u00b7\u963f\u6676", "id": "1383898"}], "current_season": null, "original_title": "Secret Superstar", "summary": "\u5c11\u5973\u4f0a\u897f\u4e9a\uff08\u585e\u4f0a\u62c9\u00b7\u6c83\u897f Zaira Wasim \u9970\uff09\u62e5\u6709\u7740\u4e00\u526f\u5929\u751f\u7684\u597d\u55d3\u5b50\uff0c\u5bf9\u5531\u6b4c\u5145\u6ee1\u4e86\u70ed\u7231\u7684\u5979\u505a\u68a6\u90fd\u60f3\u6210\u4e3a\u4e00\u540d\u6b4c\u661f\u3002\u7136\u800c\uff0c\u4f0a\u897f\u4e9a\u751f\u6d3b\u5728\u4e00\u4e2a\u4e0d\u81ea\u7531\u7684\u5bb6\u5ead\u4e4b\u4e2d\uff0c\u6bcd\u4eb2\u5a1c\u5409\u739b\uff08\u6885\u00b7\u7ef4\u8d3e Meher Vij \u9970\uff09\u5e38\u5e38\u906d\u5230\u6027\u683c\u7206\u88c2\u72ec\u65ad\u4e13\u6a2a\u7684\u7236\u4eb2\u6cd5\u9c81\u514b\uff08\u62c9\u6770\u00b7\u963f\u6676 Raj Arjun \u9970\uff09\u7684\u62f3\u811a\u76f8\u5411\uff0c\u4f0a\u897f\u4e9a\u77e5\u9053\uff0c\u60f3\u8ba9\u7236\u4eb2\u652f\u6301\u81ea\u5df1\u7684\u97f3\u4e50\u68a6\u60f3\u662f\u5b8c\u5168\u4e0d\u53ef\u80fd\u7684\u4e8b\u60c5\u3002\n\u67d0\u65e5\uff0c\u6bcd\u4eb2\u5356\u6389\u4e86\u91d1\u9879\u94fe\u7ed9\u4f0a\u897f\u4e9a\u4e70\u4e86\u4e00\u53f0\u7535\u8111\uff0c\u5f88\u5feb\uff0c\u4f0a\u897f\u4e9a\u4fbf\u53d1\u73b0\uff0c\u867d\u7136\u65e0\u6cd5\u518d\u73b0\u5b9e\u91cc\u5b9e\u73b0\u68a6\u60f3\uff0c\u4f46\u662f\u7f51\u7edc\u4e2d\u5b58\u5728\u7740\u66f4\u5e7f\u9614\u7684\u821e\u53f0\u3002\u4f0a\u897f\u4e9a\u5f55\u5236\u4e86\u4e00\u6bb5\u8499\u7740\u8138\u81ea\u5f39\u81ea\u5531\u7684\u89c6\u5c4f\u4e0a\u4f20\u5230\u4e86\u4f18\u5154\u7f51\u4e0a\uff0c\u6ca1\u60f3\u5230\u6536\u83b7\u4e86\u5f02\u5e38\u70ed\u70c8\u7684\u53cd\u54cd\uff0c\u8457\u540d\u97f3\u4e50\u4eba\u590f\u514b\u63d0\uff08\u963f\u7c73\u5c14\u00b7\u6c57 Aamir Khan \u9970\uff09\u4ea6\u5411\u5979\u629b\u51fa\u4e86\u6a44\u6984\u679d\u3002\u00a9\u8c46\u74e3", "subtype": "movie", "directors": [{"alt": "https:\/\/movie.douban.com\/celebrity\/1379532\/", "avatars": {"small": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1509423054.09.jpg", "large": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1509423054.09.jpg", "medium": "https://img1.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1509423054.09.jpg"}, "name": "\u963f\u5fb7\u74e6\u00b7\u9999\u767b", "id": "1379532"}], "comments_count": 88550, "ratings_count": 255826, "aka": ["\u79d8\u5bc6\u5de8\u661f", "\u9690\u85cf\u7684\u5927\u660e\u661f(\u53f0)", "\u6253\u6b7b\u4e0d\u79bb\u6b4c\u661f\u68a6(\u6e2f)", "\u0938\u0940\u0915\u094d\u0930\u0947\u091f \u0938\u0941\u092a\u0930\u0938\u094d\u091f\u093e\u0930"]};
	// console.log(data);




	function Dataxiangxi(Idname){
		$.ajax({
			url:"https://api.douban.com/v2/movie/subject/" + Idname,
			dataType:"jsonp",
			success:function(data){
				console.log(data);
				console.log(dataMovie);
				var dataMovie = {
					"title":data.title,
					"original_title":data.original_title,
					"countries":data.countries.join(","),
					"average":data.rating.average,
					"genres":data.genres.join(","),
					"year":data.year,
					"aka":data.aka.join(","),
					"summary":data.summary,
					"images":data.images.large,
				}
				for(var key in dataMovie){
					if(key == "images"){
						$("#" + key).attr("src",dataMovie[key]);
						continue;
					}
					var text = $("#"+key).text(); //获取原本数据
					$("#"+key).text(text + dataMovie[key]);
				}

				// 明星介绍
				var casts = data.casts;
				var str = "";
				for(var i= 0; i< casts.length;i++){
					str+= '<div class="col-sm-6 col-md-3">';
					str+= '<div class="thumbnail">';
					str+= '<img src="' + casts[i].avatars.large + '" alt="">';
					str+= '<div class="caption">';
					str+= '<h3>' + casts[i].name + '</h3>';
					str+= '</div>';
					str+= '</div>';
					str+= '</div>';
				}
				$("#casts").append(str);
			}
		})
	}
})