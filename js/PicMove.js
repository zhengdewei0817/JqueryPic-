;
//@郑德伟
//@452202586
//这是一个图片轮转的Jq插件
/**
 *获取html中要插入的标签，然后执行zdw_initPic方法，传入参数
 * 主要参数为图片宽度，图片高度，图片路径，点击图片地址等。。。
 * 
 * Jquery的版本为1.11.3
 * 纯练习，如有瑕疵，尽请谅解。。。。。
 */
(function($) {
	$.fn.extend({
		/**
		 * picW为展示窗口的宽度
		 * picH为展示界面的高度
		 * speed为图片移动速度，移动一次需要一秒钟（这里不是移动间隔）
		 * intervalTime为图片移动时间间隔，单位毫秒
		 * curpicid获取当前图片的ID
		 * ns:SVG的命名空间定义
		 * openurl:点击图片打开的链接
		 * isClickPic:图片是否可以点击
		 */
		zdw_initPic: function(opts) {
			var defines = {
				picurl: [],
				openurl:[],
				isClickPic:true,
				picW: 600,
				picH: 400,
				speed: "1s",
				intervalTime: 1000,
				curpicid: 1,
				ns:"http://www.w3.org/2000/svg",
				isMove:false,
				isanimate:false,
				MouseMove:"mousemove",
				MouseOut:"mouseout",
				MouseClick:"click"
			}

			var opts = $.extend(defines, opts);
			var conSp = this;


			this.each(function() {
				createUI();
				createSVGBtn();
			});

			//创建SVG按钮
			function createSVGBtn(){
				createOneSVGBtn(1,10,(opts.picH-80)/2,40,80,30,20,15,40,30,60,5,"rgba(250,250,250,0.5)","rgba(250,250,250,0.2)");
				createOneSVGBtn(-1,(opts.picW-50),(opts.picH-80)/2,40,80,15,20,30,40,15,60,5,"rgba(250,250,250,0.5)","rgba(250,250,250,0.2)");
			}
			
			//创建单个上下按钮
			/**
			 * bgw为背景的宽   bgh为背景的高   p1x为第一点的X坐标	  p1y为第一点的Y坐标
			 * stroke为线的宽度  
			 * @param {Object} bgw
			 * @param {Object} bgh
			 * @param {Object} p1x
			 * @param {Object} p1y
			 * @param {Object} p2x
			 * @param {Object} p2y
			 * @param {Object} p3x
			 * @param {Object} p3y
			 * @param {Object} stroke
			 * @param {Object} strokecolor
			 * @param {Object} backgroundcolor
			 */
			function createOneSVGBtn(fangxiang,x,y,bgw,bgh,p1x,p1y,p2x,p2y,p3x,p3y,stroke,strokecolor,backgroundcolor){
				var btn = document.createElementNS(opts.ns,"svg");
				
				$(btn).css({
					"position": "absolute",
					"z-index":100,
					"top":y,
					"left":x,
					"opacity": 0,
					"transition": "all " + "0.5s" + " ease",
					"-webkit-transition": "all " + "0.5s"  + " ease",
					"-moz-transition": "all " + "0.5s"  + " ease",
				})
				$(btn).attr({
					"width":bgw,
					"height":bgh,
					"version":"1.1"
				})
				
				$(conSp).append(btn);
				var ret = document.createElementNS(opts.ns,"rect");
				btn.appendChild(ret);
				$(ret).attr({
					"width":bgw,
					"height":bgh,
				})
				$(ret).css({
					"fill":backgroundcolor
				})
				var lin = document.createElementNS(opts.ns,"polyline")
				btn.appendChild(lin);
				$(lin).attr({
					"points":p1x+","+p1y+","+p2x+","+p2y+","+p3x+","+p3y,
				})
				$(lin).css({
					"fill":"rgba(255,255,255,0)",
					"stroke":strokecolor,
					"stroke-width":stroke
				})
				
				$(conSp).bind(opts.MouseMove,function(){
					$(btn).css({"opacity": 1,})
					opts.isMove = true;
				})
				$(conSp).bind(opts.MouseOut,function(){
					$(btn).css({"opacity": 0,})
					opts.isMove = false;
				})
				$(btn).bind(opts.MouseClick,function(){
					if(!opts.isanimate){
						MovPic(fangxiang)
					}
				})
			}
			
			
			


			/**
			 *ul为要移动的UL标签
			 * @param {Object} ul
			 */
			//			var interval;
			function EventMove(ul) {
				interval = setInterval(function() {
					//$(ul).css({"left":"-"+opts.picW+"px"})
					if(!opts.isMove ){
						MovPic(-1)
					}
					
				}, opts.intervalTime)

			}



			function MovPic(fangxiang) {	
				opts.curpicid += fangxiang;
				
				if(opts.curpicid==0&&fangxiang==-1){
					opts.curpicid = opts.picurl.length+1;
					$(".zdw_ul").stop(true,true).css({"left": "-"+opts.picW * (opts.curpicid) + "px"})
					opts.curpicid += fangxiang;
				}
				
				if(opts.curpicid>opts.picurl.length&&fangxiang==1){
					opts.curpicid = 0;
					$(".zdw_ul").stop(true,true).css({"left":"-"+opts.picW*opts.curpicid+"px"});
					opts.curpicid+=fangxiang;
				}
				opts.isanimate = true;
				$(".zdw_ul").animate({	"left": "-"+opts.picW * opts.curpicid + "px"}, opts.speed,function(){
					opts.isanimate = false;
				})
			}


			/**
			 *创建DOM方法
			 */
			function createUI() {
				var ul = document.createElement("ul");
				$(conSp).append(ul);
				$(ul).attr("class", "zdw_ul")
				$(conSp).css({
					"width": opts.picW + "px",
					"height": opts.picH + "px",
					"overflow": "hidden",
					"position": "relative",
				})
				$(ul).css({
					"padding": 0,
					"margin": 0,
					"list-style-type": "none",
					"width": opts.picW + "px",
					"height": opts.picH + "px",
					"position": "absolute",
					//					"transition": "all " + opts.speed + " ease",
					//					"-webkit-transition": "all " + opts.speed + " ease",
					//					"-moz-transition": "all " + opts.speed + " ease",
					"left": "-" + opts.picW + "px",
				});
				for (var i = 0; i < opts.picurl.length; i++) {
					createOneDom(i, ul, true)
				}
				//在最后面添加两个图片，分别为第一个跟第二个
				createOneDom(0, ul, opts.picurl.length)
				createOneDom(1, ul, (opts.picurl.length + 1))

				EventMove(ul);

			}


			//创建单个DOM
			/**
			 * i表示夹在数组的第几位
			 * ul为要添加的ul标签
			 * movx如果为true，则生成的标签left为i＊picW
			 * 如为数字，则生成的标签为left＝movx＊picW
			 */
			function createOneDom(i, ul, movx) {
				var li = document.createElement("li");
				ul.appendChild(li);
				var leftx;
				if (movx == true) {
					leftx = opts.picW * i;
				} else {
					leftx = opts.picW * movx;
				}

				//设置LI的CSS样式
				$(li).css({
					"position": "absolute",
					"overflow": "hidden",
					"width": opts.picW + "px",
					"height": opts.picH + "px",
					"left": leftx + "px",
					"padding": 0,
					"margin": 0,
					"list-style-type": "none",
				})

				var a = document.createElement("a");
				li.appendChild(a);
				if(opts.isClickPic){
					$(a).attr({
						"href":opts.openurl[i],
						"target":"_blank"
					})
				}
				
				$(a).css({
					"display": "block",
					"width": opts.picW + "px",
					"height": opts.picH + "px",
					"left": 0,
					"top":0,
					"padding": 0,
					"margin": 0,
				})
				var img = document.createElement("img");
				a.appendChild(img);
				$(img).css({
					 "-moz-user-select":"none",//不可被选中
   					 "-webkit-user-select":"none",
  					  "-ms-user-select":"none",
   					 "-khtml-user-select":"none",
   					  "user-select":"none",
				})
				img.src = opts.picurl[i];
				img.onload = function() {
					var bili = this.width / this.height;
					if (this.width * opts.picH / opts.picW >= this.height) {
						//证明高度小，则以高度为准
						this.height = opts.picH;
						this.width = bili * opts.picH;
					} else {
						this.width = opts.picW;
						this.height = opts.picW / bili;
					}
				}
			}


			return this;
		}
	})

})(jQuery)