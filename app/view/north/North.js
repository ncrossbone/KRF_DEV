Ext.define('KRF_DEV.view.north.North', {
	
	xtype: 'app-default-north',
	
	extend: 'Ext.panel.Panel',
	//extend: 'Ext.toolbar.Toolbar',
	
	requires: [
	    'KRF_DEV.view.north.NorthController'
   ],
	
	controller: 'north',
	
	//padding: 10,
	
	height: 64,
	
	//padding: 0,
	
	cls: 'khLee-box-inner',
	//style: 'background-image:url(./resources/images/button/top_bg.png) !important;',
	
	layout: {
		type: 'hbox',
		align: 'middle',
		pack: 'left'
	},
	
	items: [{
    	xtype: 'container',
    	width: 10
    }, {
		xtype: 'image',
		id: 'top-logo-khLee',
		width: 273,
		height: 37,
		//cls: 'khLee-x-box-item',
		src: './resources/images/button/top_logo.png'
	}, {
		xtype: 'container',
		flex: 1
	}, {
		xtype: 'button',
    	text: '리포트',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				
    				var boardCtl = Ext.getCmp("clipButton");
    				
    				
    				
    				console.info(boardCtl);
    				if (boardCtl == undefined){
    					clipButton = Ext.create('KRF_DEV.view.map.ClipButton');
    					var clipChart = Ext.getCmp("clipChart");
    					console.info(clipChart);
    				}
    				
    				boardCtl.show();
    				
    			}
    		}
    	},
    	src: './resources/images/button/top_btn5_off.png'			
	},{
    	xtype: 'container',
    	width: 5
    }, {
		text: '_DivImgSave',
		listeners: {
			el: {
				click: function(){
					
					var mapDivId = "_mapDiv_";
					
					var mapObj = $("#" + mapDivId);
					var arrImg = $("#" + mapDivId + " img");
					//var arrImg = document.querySelector("img");
					var arrSvg = $("#" + mapDivId + " svg");
					//var arrImg = document.querySelector("svg");
					
					var outObjInfos = [];
					
					//getImageInfos(arrImg, outObjInfos, function(outObjInfos){

						getImageInfos(arrSvg, outObjInfos, function(outObjInfos){
						
							postCall(outObjInfos, mapObj.width(), mapObj.height(), null);
						});
					//});
					
					/*console.info(JSON.stringify(outObjInfos));
					
					var obj = {imageInfos:JSON.stringify(outObjInfos), width:mapObj.width(), height:mapObj.height()};

					$.post("./resources/jsp/_DivImgSave.jsp", obj, function(data){
						console.info(data);
			   		},"json").error(function(e){
			   			console.info(e);
			   		});*/
				}
			}
		}
	}, {
		xtype: 'button',
		text: 'CustomPrintTask',
		listeners: {
			el: {
				click: function(){
					
					var me = GetCoreMap();
					//console.info(me.mapDivId);
					me.mapDivId = "_mapDiv_";
					var svgInfo = $('#'+me.mapDivId+' svg').parent().html();
					var layerIds = me.map.layerIds;
					var imageInfos = [];
					for(var i=0; i<layerIds.length; i++){	
						if($('#'+me.mapDivId+'_'+layerIds[i]).css('display')=="none"){
							continue;
						}	
						
						var div = $('#'+me.mapDivId+'_'+layerIds[i]);
						var pTranslateInfo = {};
						
						//if(isNaN(parseInt(div.css('left')))){
							if(div.css('transform')){
								var arr = div.css('transform').split(',');
								if(arr.length>11){
									pTranslateInfo.translateX = parseInt(arr[12]);
									pTranslateInfo.translateY = parseInt(arr[13]);
								}else{
									pTranslateInfo.translateX = parseInt(arr[4]);
									pTranslateInfo.translateY = parseInt(arr[5]);
								}
							}else if(div.css('-webkit-transform')){
								var arr = div.css('-webkit-transform').split(',');
								pTranslateInfo.translateX = parseInt(arr[4]);
								pTranslateInfo.translateY = parseInt(arr[5]);
							}
						/*}else{
							pTranslateInfo.translateX = parseInt(div.css('left'));
							pTranslateInfo.translateY = parseInt(div.css('top'));
						}*/
						//alert("aa");
							
						var imgs = $('#'+me.mapDivId+'_'+layerIds[i]+' img');
						for(var k=0; k<imgs.length; k++){
							
							var img = $(imgs[k]);
							var info = {};
							if(img.attr('src')){
								info.src = img.attr('src');
							}
							info.width = img.width();
							info.height = img.height();
							info.opacity = img.parent().css('opacity');
							
							var translateInfo = null;
							//if(isNaN(parseInt(img.css('left')))){
								if(translateInfo = img.css('transform')){
									var arr = translateInfo.split(',');
									if(arr.length>11){
										info.translateX = parseInt(arr[12]) + pTranslateInfo.translateX;
										info.translateY = parseInt(arr[13]) + pTranslateInfo.translateY;
									}else{
										info.translateX = parseInt(arr[4]) + pTranslateInfo.translateX;
										info.translateY = parseInt(arr[5]) + pTranslateInfo.translateY;
									}
								}else if(translateInfo = img.css('-webkit-transform')){
									var arr = translateInfo.split(',');
									info.translateX = parseInt(arr[4]) + pTranslateInfo.translateX;
									info.translateY = parseInt(arr[5]) + pTranslateInfo.translateY;
								}
							/*}else{
								info.translateX = parseInt(img.css('left')) + pTranslateInfo.translateX;
								info.translateY = parseInt(img.css('top')) + pTranslateInfo.translateY;
							}*/
							var obj = info;
							obj.src = "./resources/jsp/proxy.jsp?" + obj.src;
							imageInfos.push(obj);
						}
					}
					
					var me = this;
					var loadCnt = 0;
					var imageInfosCnt = imageInfos.length;
					for(var i=0; i<imageInfosCnt; i++){	
						
						var imageInfo = imageInfos[i];
						var canvas = document.createElement('CANVAS');
						var ctx = canvas.getContext('2d');
						var img = new Image;
						img.crossOrigin = 'Anonymous';
						img.src = imageInfo.src;
						
						canvas.height = img.height;
						canvas.width = img.width;
						ctx.drawImage(img,0,0);
						var dataURL = canvas.toDataURL('image/png');
						console.info(dataURL);
						var base64Img = dataURL;
						
						imageInfo.base64 = base64Img;
						loadCnt++;
						
						canvas = null; 
						
						/*img.onload = function(){
							
							console.info("ss");
							canvas.height = img.height;
							canvas.width = img.width;
							ctx.drawImage(img,0,0);
							var dataURL = canvas.toDataURL('image/png');
							
							var base64Img = dataURL;
							
							imageInfo.base64 = base64Img;
							loadCnt++;
							
							canvas = null; 
						};*/
						//img.src = imageInfo.src;
					}
					var timerId = window.setInterval(function(){
						
						//if(loadCnt == imageInfosCnt){
//console.info($('#'+me.mapDivId).width);
							var obj = {imageInfos:JSON.stringify(imageInfos), svgInfo:svgInfo, width:2100, height:1000, arcServiceUrl:me.arcServiceUrl, mode:"capture"};
							//console.info(obj);
							$.post("./resources/jsp/CustomPrintTask_New.jsp", obj, function(data){
								/*if(mode=="print"){
									var popup = window.open(data.url, 'newWindow', "width=1000,height=700");
									//console.info(data.url);
									popup.focus(); //required for IE
									popup.print();
								}else if(mode=="capture"){
									$('#__fileDownloadIframe__').remove();
									$('body').append('<iframe src='+data.url+' id="__fileDownloadIframe__" name="__fileDownloadIframe__" width="0" height="0" style="display:none;"/>');
								}*/
								
								//me.onComplete("complete");
								console.info("suc");
					   		},"json").error(function(e){
					   			console.info(e);
					   		});
							
							window.clearInterval(timerId);
						//}
					}, 1000);
				}
			}
		}
	}, { 
>>>>>>> f865fae69c16d42e05795ceea3883c31aaba7d9c
		xtype: 'image',
		//id: 'btnReachLayer',
		layerId: 'baseMap',
		groupId: 'grpBase',
    	title: '배경맵',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickBaseLayer' } },
    	btnOnOff: 'on',
    	btnOnImg: './resources/images/button/btn_top_05_on.png',
    	btnOffImg: './resources/images/button/btn_top_05_off.png',
    	src: './resources/images/button/btn_top_05_on.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnReachLayer',
		layerId: '46',
		groupId: 'grpReach',
    	title: '리치라인',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickReachLayer' } },
    	btnOnOff: 'on',
    	btnOnImg: './resources/images/button/btn_top_01_on.png',
    	btnOffImg: './resources/images/button/btn_top_01_off.png',
    	src: './resources/images/button/btn_top_01_on.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnAreaLayer',
		groupId: 'grpArea',
    	title: '집수구역',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickAreaLayer' } },
    	btnOnOff: 'off',
    	btnOnImg: './resources/images/button/btn_top_02_on.png',
    	btnOffImg: './resources/images/button/btn_top_02_off.png',
    	src: './resources/images/button/btn_top_02_off.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnFlowLayer',
		groupId: 'grpFlow',
    	title: '리치흐름',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickFlowLayer' } },
    	btnOnOff: 'off',
    	btnOnImg: './resources/images/button/btn_top_04_on.png',
    	btnOffImg: './resources/images/button/btn_top_04_off.png',
    	src: './resources/images/button/btn_top_04_off.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnLayerReset',
		groupId: 'grpReset',
    	title: '초기화',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickReset' } },
    	btnOnOff: 'off',
    	btnOnImg: './resources/images/button/btn_top_03_on.png',
    	btnOffImg: './resources/images/button/btn_top_03_off.png',
    	src: './resources/images/button/btn_top_03_off.png'
    }, {
    	xtype: 'container',
    	width: 50
    }, {
		xtype: 'image',
    	title: '공지사항',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				
    				var boardCtl = Ext.getCmp("boardNotice");
    				if(boardCtl == undefined){
	    				boardCtl = Ext.create("Ext.window.Window", {
				    					id: "boardNotice",
				    					title: "공지사항",
				    					width: 660,
				    					height: 600,
				    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./resources/jsp/board/GetBoard.jsp?boardType=2"></iframe>'
				    				});
    				}
    				
    				boardCtl.show();
    				
    			}
    		}
    	},
    	src: './resources/images/button/top_btn4_off.png'			
	},{
	xtype: 'image',
	title: '공지사항',
	width: 69,
	height: 37,
	listeners: {
		el: {
			click: function(){
				
				var boardCtl = Ext.getCmp("boardCLIP");
				if(boardCtl == undefined){
    				boardCtl = Ext.create("Ext.window.Window", {
			    					id: "boardCLIP",
			    					title: "공지사항",
			    					width: 660,
			    					height: 600,
			    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./ClipReport4/test.jsp?boardType=2"></iframe>'
			    				});
				}
				
				boardCtl.show();
				
			}
		}
	},
	src: './resources/images/button/top_btn4_off.png'			
}, {
		xtype: 'image',
    	title: 'Q&A',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				
    				var boardCtl = Ext.getCmp("boardQNA");
    				if(boardCtl == undefined){
	    				boardCtl = Ext.create("Ext.window.Window", {
				    					id: "boardQNA",
				    					title: "Q&A",
				    					width: 660,
				    					height: 600,
				    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./resources/jsp/board/GetBoard.jsp?boardType=1"></iframe>'
				    				});
    				}
    				
    				boardCtl.show();
    				
    			}
    		}
    	},
    	src: './resources/images/button/top_btn5_off.png'			
	},/*, {
		xtype: 'image',
    	title: '인쇄',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				GetCoreMap().print();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn1_off.png'			
	}*/, {
		xtype: 'image',
    	title: '저장',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				GetCoreMap().capture();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn2_off.png'
	}/*, {
		xtype: 'image',
    	title: '로그아웃',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				Ext.Ajax.request({
						//session out-hyeok
						url : "./resources/jsp/SessionOut.jsp",
						async:true,						
						method : "GET",
						success : function(result, request) {
							window.location = './index.html';
						},
						failure : function(result, request) {
							Ext.Msg.alert("Failed", "Connection Failed");
						}

					});
    				
    				
    				
    			}
    		}
    	},
    	src: './resources/images/button/top_btn3_off.png'
	}*/, {
		xtype: 'image',
    	title: '매뉴얼',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				/*
    				Ext.create("Ext.window.Window", {
    					title: 'test',
    					width: 300,
    					height: 300,
    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0"  src="./resources/menual/KRF_Menual.html"></iframe>'
    				}).show();
    				*/
    				OpenMenualPop();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn6_off.png'
	}, {
		xtype: 'container',
		width: 50
	}]
  
});