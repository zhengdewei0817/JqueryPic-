# JqueryPic-
JqueryPic轮转

这是我用Jquery制作的图片轮转插件

制作思路：加载图片后，程序生成img并调整宽高确保比例

          将第一张与第二张图片生成两份，其中一份排在整个图片列表的最后
          
          执行从第二张开始，如果跳到第一张图片，则执行直接跳转到倒数第二张
          
          同理，如果执行到最后一张图片（就是重复生成的第二张图片）时，则直接跳转到第二张
          
          在视觉上呈现出轮转效果
          
          然后使用Animation进行切换
          
  如有Bug或者不懂的地方，可与我联系 452202586



使用方法很简单

首先在html中引入jquery  这里我用的版本是1.11.3

然后引入PicMove。js



然后用jquery选择要加入轮转图的div容器，并初始化

例如：

$(function(){

				var arr = new Array();
				
				var arr2 = new Array();
				
				for(var i = 1;i<=6;i++){
				
					arr.push("img/"+i+".jpg");
					
					arr2.push("http://www.baidu.com")
					
				}
				
				$("#show").zdw_initPic({
				
					picurl:arr,
					
					openurl:arr2,
					
					isClickPic:false,
					
				});
				
			})

传入的参数为对象

picurl为图片路径

openurl为点击图片打开的网址数组

isClickPic为是否可点击

至于其他属性跟参数，请参照插件中的注释






