dojo.declare("KRF_DEV.view.map.task.CustomPrintTask", null, {
	map:null,
	mapDivId:null,
	printUrl:null,
	arcServiceUrl:null,
	proxyUrl:null,
	imgSaveUrl: null,
	
	constructor:function(map, mapDivId, printUrl, proxyUrl, arcServiceUrl, imgSaveUrl) {
		var me = this;
		me.map = map;
		me.mapDivId = mapDivId;
		me.printUrl = printUrl;
		me.arcServiceUrl = arcServiceUrl;
		me.proxyUrl = proxyUrl;
		me.imgSaveUrl = imgSaveUrl;
	},
	
	onComplete:function(arg){
		
	},
	
	print:function(){
		var me = this;
		me.execute("print");
	},
	
	capture:function(){
		var me = this;
		me.execute("capture");
	},
	
	report: function(paramCode, startYear, endYear){
		
		var me = this;
		
		me.paramCode = paramCode;
		me.startYear = startYear;
		me.endYear = endYear;
		
		//alert("dd");
		me.execute("report");
	},
	
	execute:function(mode){
		
		var me = this;
		
		var svgInfo = $('#'+me.mapDivId+' svg').parent().html();
		var layerIds = me.map.layerIds;
		var imageInfos = [];
		for(var i=0; i<layerIds.length; i++){	
			if($('#'+me.mapDivId+'_'+layerIds[i]).css('display')=="none"){
				continue;
			}	
			
			var div = $('#'+me.mapDivId+'_'+layerIds[i]);
			var pTranslateInfo = {};
			/*console.info(div.css('left'));
			console.info(div.css('transform'));
			console.info(div.css('-webkit-transform').split(','));*/
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
				else{
					pTranslateInfo.translateX = parseInt(div.css('left'));
					pTranslateInfo.translateY = parseInt(div.css('top'));
				}
			/*}else{
				pTranslateInfo.translateX = parseInt(div.css('left'));
				pTranslateInfo.translateY = parseInt(div.css('top'));
			}*/
			
			var imgs = $('#'+me.mapDivId+'_'+layerIds[i]+' img');
			//console.info(imgs);
			for(var k=0; k<imgs.length; k++){	
				var obj = me.imageInfoExtract($(imgs[k]), pTranslateInfo);
				obj.src = me.proxyUrl + "?" + obj.src;
				imageInfos.push(obj);
			}
		}
		//console.info(imageInfos);
		me.convertImgToBase64Exe(imageInfos, function(){
			var obj = {imageInfos:JSON.stringify(imageInfos),
					svgInfo:svgInfo,
					width:$('#'+me.mapDivId).width(),
					height:$('#'+me.mapDivId).height(),
					arcServiceUrl:me.arcServiceUrl,
					imgSaveUrl: me.imgSaveUrl,
					mode:mode};
//			$.post(esri.config.defaults.io.proxyUrl+'?'+me.printUrl, obj, function(data){
//				if(mode=="print"){
//					var popup = window.open(esri.config.defaults.io.proxyUrl+'?'+data.url, 'newWindow', "width=1000,height=700");
//					popup.focus(); //required for IE
//					popup.print();
//				}else if(mode=="capture"){
//					$('#__fileDownloadIframe__').remove();
//					$('body').append('<iframe src='+esri.config.defaults.io.proxyUrl+'?'+data.url+' id="__fileDownloadIframe__" name="__fileDownloadIframe__" width="0" height="0" style="display:none;"/>');
//				}
//				
//				me.onComplete("complete");
//	   		},"json").error(function(){
//	   		});
			
			console.info(obj);
			
			$.post(me.printUrl, obj, function(data){
				if(mode=="print"){
					var popup = window.open(data.url, 'newWindow', "width=1000,height=700");
					//console.info(data.url);
					popup.focus(); //required for IE
					popup.print();
				}else if(mode=="capture"){
					$('#__fileDownloadIframe__').remove();
					$('body').append('<iframe src='+data.url+' id="__fileDownloadIframe__" name="__fileDownloadIframe__" width="0" height="0" style="display:none;"/>');
				}
				else if(mode=="report"){
					// 리포트 뷰어 호출 로직
					//console.info(data);
					
					var imgPath = data.path;
    				window.open("../ClipReport4/test.jsp?imgPath=" + imgPath +
    						"&paramCode=" + me.paramCode +
    						"&startYear=" + me.startYear +
    						"&endYear=" + me.endYear,
    						"",
    						"width=1000,height=1000,status=no,toolbar=no,scrollbars=no");
    				
    				/*setTimeout(function(){
    					me.imageDelete(imgPath);
    				},6000);*/
				}
				//console.info(data);
				me.onComplete("complete");
	   		},"json").error(function(e){
	   			//alert(e)
	   			console.info(e);
	   		});
		});
	},
	
	/*imageDelete:function(imgPath){
		Ext.Ajax.request({
			//session out-hyeok
			url : "../resources/jsp/ImgDelete.jsp",
			async:true,						
			method : "GET",
			success : function(result, request) {
				alert("1");
			},
			failure : function(result, request) {
				Ext.Msg.alert("Failed", "Connection Failed");
			}

		});
	},*/
	
	imageInfoExtract:function(img, pTranslateInfo){
		var info = {};
		if(img.attr('src')){
			info.src = img.attr('src');
		}
		info.width = img.width();
		info.height = img.height();
		info.opacity = img.parent().css('opacity');
		/*console.info(img.css('left'));
		console.info(img.css('transform'));
		console.info(img.css('-webkit-transform'));*/
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
			else{
				info.translateX = parseInt(img.css('left')) + pTranslateInfo.translateX;
				info.translateY = parseInt(img.css('top')) + pTranslateInfo.translateY;
			}
		/*}else{
			info.translateX = parseInt(img.css('left')) + pTranslateInfo.translateX;
			info.translateY = parseInt(img.css('top')) + pTranslateInfo.translateY;
		}*/
		return info;
	},
	
	convertImgToBase64Exe:function(imageInfos, callback){
		var me = this;
		var loadCnt = 0;
		var imageInfosCnt = imageInfos.length;
		for(var i=0; i<imageInfosCnt; i++){	
			me.convertImgToBase64(imageInfos[i], function(base64Img, imageInfo){
				imageInfo.base64 = base64Img;
				loadCnt++;
			});
		}
		var timerId = window.setInterval(function(){
			if(loadCnt == imageInfosCnt){
				callback.call(this);
				window.clearInterval(timerId);
			}
		}, 1000);
	},
	
	convertImgToBase64:function(imageInfo, callback, outputFormat){
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var img = new Image;
		img.crossOrigin = 'Anonymous';
		img.onload = function(){
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img,0,0);
			var dataURL = canvas.toDataURL(outputFormat || 'image/png');
			callback.call(this, dataURL, imageInfo);
			canvas = null; 
		};
		img.src = imageInfo.src;
	}
});