Ext.define('KRF_DEV.view.map.FeatureLayerAdmin1', {
	map:null, 
	layerId: null,
	siteId: null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        // 지점 이동 그래픽 레이어
        me.moveGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveGraphicLayer.id="moveGraphicLayer";
		me.map.addLayer(me.moveGraphicLayer);
		
		// 집수구역 이동 그래픽 레이어
		me.moveCatGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveCatGraphicLayer.id = "moveCatGraphicLayer";
		me.map.addLayer(me.moveCatGraphicLayer);
		
		// 리치라인 이동 그래픽 레이어
		me.moveRchGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveRchGraphicLayer.id = "moveRchGraphicLayer";
		me.map.addLayer(me.moveRchGraphicLayer);
		
		me.movePopGraphicLayer = new esri.layers.GraphicsLayer();
		me.movePopGraphicLayer.id = "movePopGraphicLayer";
		me.map.addLayer(me.movePopGraphicLayer);
        
        KRF_DEV.getApplication().addListener('setSelectedSite', me.setSelectedSiteHandler, me);
        KRF_DEV.getApplication().addListener('setSelectedCatArea', me.setSelectedCatAreaHandler, me);
        KRF_DEV.getApplication().addListener('setSelectedRchLine', me.setSelectedRchLineHandler, me);
        
        KRF_DEV.getApplication().addListener('setSelectedPopSite', me.setSelectedPopSiteHandler, me);
    },
    
    
    
    
    setSelectedPopSiteHandler: function(layerId, siteId){
    	
    	var me = this;
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		/* 레이어 정보(Layer01Data.json) 가져와서 쿼리 조건 설정 */
		var layer01Info = getLayer01Info("id", layerId, null, null);
		
		if(layer01Info != undefined && layer01Info != null && layer01Info.length > 0){
			
			query.where = layer01Info[0].siteIdCol + " = '" + siteId + "'";
		}
		else{
			console.info(layerId + "에 해당하는 siteIdCol(이)가 없습니다. Layer01Data.json 확인 요함.")
		}
		
		if(query.where == undefined){
			
			console.info("쿼리 조건이 설정되지 않았습니다.");
			return;
		}
		/* 레이어 정보(Layer01Data.json) 가져와서 쿼리 조건 설정 끝 */
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				//me.map.on("click", function(evt){
				
				
				Ext.create("Ext.window.Window", {
						//renderTo: Ext.getBody(),
						header: true,
						shadow: false,
						//frame: true,
						plain: true, // 요게 있어야 background: transparent 먹음..
						//cls: 'khLee-x-window-default',
						//style: 'border-style: none !important; background: transparent none !important; height: 500px;',
						//style: "position: absolute; top: 300px; left: 500px; width: 377px; font: normal normal normal 10pt Helvetica;z-index:100",
						layout: {
							type: 'absolute'
						},
						//x: evt.pageX,
						//y: evt.pageY,
						html: 
							"<!doctype html>																																									"+
							"<html lang=\"ko\">                                                                                                                                                                 "+
							"<head>                                                                                                                                                                             "+
							"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />                                                                                                          "+
							"<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />                                                                                                              "+
							"<title>KRF-TOOLTIP</title>                                                                                                                                                         "+
							"<!--[if lt ie 9]>                                                                                                                                                                  "+
							"<script src=\"./resources/js/html5shiv.js\"></script>                                                                                                                                          "+
							"<![endif]-->                                                                                                                                                                       "+
							"<link href=\"./resources/css/BasicSet.css\" rel=\"stylesheet\" type=\"text/css\" />                                                                                                            "+
							"<style type=\"text/css\">                                                                                                                                                          "+
							"#toolTip { width: 342px; height: 199px; padding: 10px 15px; background: url(./resources/images/popup/Tooltip.png) no-repeat; position: relative; font-size: 12px; font-family:'NanumGothic'; }       "+
							"#toolTip> h1 { font-family: 'malgunbd'; font-size: 20px; margin: 0px; padding: 0px; letter-spacing: -1px; }                                                                        "+
							"#toolTip> dl { margin: 20px 0px 5px 0px; }                                                                                                                                         "+
							"#toolTip> dl:after { content:\"\"; clear:both; display:block; *zoom:1;}                                                                                                            "+
							"#toolTip> dl dt { float: left; font-weight: bold; color: #000; }                                                                                                                   "+
							"#toolTip> dl dd { margin: 0px; color: #434343; text-indent: 5px; }                                                                                                                 "+
							"#toolTip> ul { width: 362px; position: absolute; left: 15px; top: 143px;}                                                                                                          "+
							"#toolTip> ul> li { }                                                                                                                                                               "+
							"#toolTip> ul> li> a { float: left; }                                                                                                                                               "+
							"</style>                                                                                                                                                                           "+
							"</head>                                                                                                                                                                            "+
							"<body>                                                                                                                                                                             "+
							"<div id=\"toolTip\">                                                                                                                                                               "+
							"	<h1>"+obj.attributes.측정소명+"</h1>                                                                                                                                                                  "+
							"	<dl>                                                                                                                                                                              "+
							"    	<dt>분류 :</dt>                                                                                                                                                               "+
							"        <dd>수질측정지점 > 하천수</dd>                                                                                                                                             "+
							"        <dt>주소 :</dt>                                                                                                                                                            "+
							"        <dd>"+obj.attributes.채수지점+"</dd>                                                                                       "+
							"    </dl>                                                                                                                                                                          "+
							"    <a href=\"#\"><img src=\"./resources/images/popup/btn_detailView.gif\" /></a>                                                                                                                    "+
							"    <ul>                                                                                                                                                                           "+
							"    	<li style=\"float: left;\">                                                                                                                                                   "+
							"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_chart.gif\" /></a>                                                                                                                    "+
							"            <a href=\"#\"><img src=\"./resources/images/popup/btn_data.gif\" /></a>                                                                                                                  "+
							"        </li>                                                                                                                                                                      "+
							"        <li style=\"float: right; padding-right: 25px;\">                                                                                                                          "+
							"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_startSpot.gif\" /></a>                                                                                                                "+
							"            <a href=\"#\"><img src=\"./resources/images/popup/btn_endSpot.gif\" /></a>                                                                                                               "+
							"        </li>                                                                                                                                                                      "+
							"    </ul>                                                                                                                                                                          "+
							"</div>                                                                                                                                                                             "+
							"</body>                                                                                                                                                                            "+
							"</html>                                                                                                                                                                            "
					}).show();
				//});
				
				
				me.movePopGraphicLayer.clear();
//				me.movePopGraphicLayer.id = "moveGraphicLayer" + siteId;
//				
//				if(me.map.getLevel() < 12)
//					me.map.setLevel(12);
//				
//				//obj.setSymbol(selectedSymbol);
//				
//				var dialog, highlightSymbol;
//				
//				require(["dijit/TooltipDialog"], function(TooltipDialog){
//					dialog = new TooltipDialog({
//			          //id: "tooltipDialog",
//			          style: "position: absolute; top: 300px; left: 500px; width: 377px; font: normal normal normal 10pt Helvetica;z-index:100"
//			        });
//			        dialog.startup();
//				});
//				
//				
//				var t = "testetestewtetet";
//				/*me.map.infoWindow =
//					setInfo*/
//				
//				
//				
//				var content, highlightGraphic;
//		          
//		          require(["esri/lang"], function(esriLang){
//		        	 content = esriLang.substitute(obj.attributes,t);
//		        	 console.info(obj);
//		        	 console.info(obj.attributes);
//		          });
//				    
//				//me.movePopGraphicLayer.add(obj);
//				dialog.setContent(content);
					
					
					require(["esri/symbols/TextSymbol"], function(TextSymbol) { /* code goes here */ });
//				
				var x = obj.geometry.x;
				var y = obj.geometry.y;
				
				var tileInfo = KRF_DEV.getApplication().coreMap.tileInfo;
				var curLevel = me.map.getLevel();
				var resolution = tileInfo.lods[curLevel].resolution;
				
				x = x + ((1920 - Ext.getBody().getWidth()) / 2 * resolution);
				y = y - ((1080 - Ext.getBody().getHeight()) / 4 * resolution);
				
				var point = new esri.geometry.Point(x, y, obj.geometry.spatialReference);
				me.map.centerAt(point);

			});
			
		});
		
    },
    
    setSelectedSiteHandler: function(layerId, siteId, clickValue){
    	
    	var me = this;
    	
    	//	시작지점 끝지점 선택시 --- 명칭찾기,toolbar지점이름 변경
    	var reachNameToolbar = Ext.getCmp("reachNameToolbar");
    	var textSearchText_Start = Ext.getCmp("textSearchText_Start");
    	var textSearchText_End = Ext.getCmp("textSearchText_End");
    	//  reachNameToolbar (툴바 id)  , textSearchText_Start,textSearchText_End( 명칭찾기 id )
    	
    	var url , width, height = "";
    	if(clickValue == "none"){
    		url = "./resources/images/symbol/spot_09.png";
    		width = 25;
    		height= 61;
    	}else if(clickValue == "start"){
    		url = "./resources/images/symbol/btn_start01.png";
    		width = 26;
    		height = 38;
    		
    	}else if(clickValue == "end"){
    		url = "./resources/images/symbol/btn_end01.png";
    		width = 26;
    		height = 38;
    	}
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		/* 레이어 정보(Layer01Data.json) 가져와서 쿼리 조건 설정 */
		var layer01Info = getLayer01Info("id", layerId, null, null);
		
		if(layer01Info != undefined && layer01Info != null && layer01Info.length > 0){
			
			query.where = layer01Info[0].siteIdCol + " = '" + siteId + "'";
		}
		else{
			console.info(layerId + "에 해당하는 siteIdCol(이)가 없습니다. Layer01Data.json 확인 요함.")
		}
		
		if(query.where == undefined){
			
			console.info("쿼리 조건이 설정되지 않았습니다.");
			return;
		}
		/* 레이어 정보(Layer01Data.json) 가져와서 쿼리 조건 설정 끝 */
		//console.info(query);
		queryTask.execute(query,  function(results){
			//console.info(layerId);
			Ext.each(results.features, function(obj, index) {
				
				
				var parentCheck = "";	//지점구분
				var jijum = obj.attributes; //지점정보
				var jijum_Name = "";	//지점명
				var jijum_Addr = "";	//주소
				var jijum_Cd = "";		//지점토드
				var jijum_Gubun = "";
				
				if(layer01Info != undefined && layer01Info != null && layer01Info.length > 0){
					
					parentCheck = layer01Info[0].layerCode;
					if(layer01Info[0].siteNmCol != undefined && layer01Info[0].siteNmCol != ""){
						jijum_Name = eval("jijum." + layer01Info[0].siteNmCol);
					}
					if(layer01Info[0].siteAddrCol != undefined &&layer01Info[0].siteAddrCol != ""){
						jijum_Addr = eval("jijum." + layer01Info[0].siteAddrCol);
					}
					if( layer01Info[0].siteIdCol != undefined &&  layer01Info[0].siteIdCol != ""){
						jijum_Cd = eval("jijum." + layer01Info[0].siteIdCol);
					}
					if(layer01Info[0].text != undefined && layer01Info[0].text != ""){
						jijum_Gubun = layer01Info[0].text;
					}
					//jijum_Addr = eval("jijum." + layer01Info[0].siteAddrCol);
					//jijum_Cd = eval("jijum." + layer01Info[0].siteIdCol);
					//jijum_Gubun = layer01Info[0].text;
				}
				
				//시작지점 끝지점 처리및 지점명 삽입
				if(clickValue == "start"){
					reachNameToolbar.items.items[0].setValue(jijum_Name);
					textSearchText_Start.setValue(jijum_Name);
					//console.info("start");
				}
				if(clickValue == "end"){
					reachNameToolbar.items.items[1].setValue(jijum_Name);
					textSearchText_End.setValue(jijum_Name);
					//console.info("end");
				}
				
				me.moveGraphicLayer.clear();
				me.moveGraphicLayer.id = "moveGraphicLayer" + siteId;
				//console.info(url);
				if(clickValue == "none"){
					var selectedSymbol = new esri.symbol.PictureMarkerSymbol({
					    "angle": 0,
					    //"xoffset": 10,
					    //"yoffset": 35,
					    "type": "esriPMS",
					    //"url": "./resources/images/symbol/symbol_"+layerId+"_42x42.gif",
					    //"url": "./resources/images/symbol/spot_09.png",
					    "url": url,
					    "contentType": "image/png",
					    "width": width,
					    "height": height,
					    "yoffset": 16,
					    "xoffset": 4
					});
					
					obj.setSymbol(selectedSymbol);
					me.moveGraphicLayer.add(obj);
				}
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
				
				// 지점 포인트 정보
				var point = new esri.geometry.Point(obj.geometry.x, obj.geometry.y, obj.geometry.spatialReference);
				
				// 센터 이동
				centerAtWithOffset(obj.geometry.x, obj.geometry.y, obj.geometry.spatialReference);
				
				var popWidth = 370;
				var popHeight = 230;
				
				/* 사이트 정보 팝업 띄우기 */
				var popCtl = Ext.getCmp("popSiteInfo");
				
				// 팝업 띄워져있으면 닫기
				if(popCtl != undefined){
					
					popCtl.close();
				}
				//console.info(xyObj);
				Ext.create("Ext.window.Window", {
					//renderTo: Ext.getBody(),
					header: false,
					id: 'popSiteInfo',
					shadow: false,
					//frame: true,
					plain: true, // 요게 있어야 background: transparent 먹음..
					point: point, // 지점 포인트 정보
					width: 380,
					height: 215,
					//x: xyObj.x,
					//y: xyObj.y,
					isMove: false,
					//style: ' background: transparent none !important; height: 500px;',
					style: 'border-style: none !important; background: transparent none !important; height: 700px;',
					//style: "position: absolute; top: 300px; left: 500px; width: 377px; font: normal normal normal 10pt Helvetica;z-index:100",
					layout: {
						type: 'absolute'
					},
					html: 
						"<!doctype html>																																									"+
						"<html lang=\"ko\">                                                                                                                                                                 "+
						"<head>                                                                                                                                                                             "+
						"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />                                                                                                          "+
						"<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />                                                                                                              "+
						"<title>KRF-TOOLTIP</title>                                                                                                                                                         "+
						"<!--[if lt ie 9]>                                                                                                                                                                  "+
						"<script src=\"./resources/js/html5shiv.js\"></script>                                                                                                                                          "+
						"<![endif]-->                                                                                                                                                                       "+
						"<link href=\"./resources/css/BasicSet.css\" rel=\"stylesheet\" type=\"text/css\" />                                                                                                            "+
						"<style type=\"text/css\">                                                                                                                                                          "+
						"#toolTip { width: 370px; height: 230px; padding: 15px 15px 15px 10px; background: url(./resources/images/popup/Tooltip.png) no-repeat; position: relative; font-size: 12px; font-family:'NanumGothic'; }       "+
						"#toolTip> a.close { width: 25px; height: 25px; background: #FFF url(./resources/images/button/btn_close.png) center center no-repeat; position: absolute; right: 15px; top: 15px; border: 1px solid #aaa; } "+
						"#toolTip> h1 { font-family: 'malgunbd'; font-size: 20px; margin: 0px; padding: 0px; letter-spacing: -1px; }                                                                        "+
						"#toolTip> dl { margin: 30px 0px 5px 0px; }                                                                                                                                         "+
						"#toolTip> dl:after { content:\"\"; clear:both; display:block; *zoom:1;}                                                                                                            "+
						"#toolTip> dl dt { float: left; font-weight: bold; color: #000; }                                                                                                                   "+
						"#toolTip> dl dd { margin: 0px; color: #434343; text-indent: 5px; }                                                                                                                 "+
						"#toolTip> ul { width: 362px; position: absolute; left: 15px; top: 143px; margin: 0px; padding: 0px; list-style: none; list-position: inside; }                                                                                                          "+
						"#toolTip> ul> li { }                                                                                                                                                               "+
						"#toolTip> ul> li> a { float: left; }                                                                                                                                          "+
						"</style>                                                                                                                                                                           "+
						"</head>                                                                                                                                                                            "+
						"<body>                                                                                                                                                                             "+
						"<div id=\"toolTip\">                                                                                                                                                               "+
						"	<h1>"+jijum_Name+"</h1>"+
						"   <a class=\"close\" onclick=\"closePopSiteInfo();\" href=\"#\"></a>" +
						"<dl>                                                                                                                                                                              "+
						"    	<dt>분류 :</dt>                                                                                                                                                               "+
						"        <dd>"+jijum_Gubun+"</dd>                                                                                                                                             "+
						"        <dt>주소 :</dt>                                                                                                                                                            "+
						"        <dd>"+jijum_Addr+"</dd>                                                                                       "+
						"    </dl>                                                                                                                                                                          "+
						"    <a href=\"#\"><img src=\"./resources/images/popup/btn_detailView.gif\"  onClick=\"ShowWindowSiteNChart(1,'"+jijum_Cd+"','"+jijum_Name+"','"+parentCheck+"');\" /></a>"+
						"    <ul>                                                                                                                                                                           "+
						"    	<li style=\"float: left;\">                                                                                                                                                   "+
						"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_chart.gif\"  onClick=\"ShowWindowSiteNChart(0,'"+jijum_Cd+"','"+jijum_Name+"','"+parentCheck+"');\" /></a>                                                                                                                    "+
						"            <a href=\"#\"><img src=\"./resources/images/popup/btn_data.gif\" onClick=\"ShowSearchResult('"+jijum_Cd+"','','"+jijum_Name+"','grid_"+jijum_Cd+"','','"+parentCheck+"');\" /></a>                                                                                                                  "+
						"        </li>                                                                                                                                                                   "+
						"        <li id =\"reachTable\"  style=\"float: right; padding-right: 25px;\">                                                                                                                          "+
						"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_startSpot.gif\"  onClick=\"siteMovePoint('"+parentCheck+"','"+jijum_Cd+"' , 'start' );\"  /></a>                                                                                                                "+
						"            <a href=\"#\"><img src=\"./resources/images/popup/btn_endSpot.gif\"   onClick=\"siteMovePoint('"+parentCheck+"','"+jijum_Cd+"' , 'end' );\"  /></a>                                                                                                               "+
						"        </li>                                                                                                                                                                      "+
						"    </ul>                                                                                                                                                                          "+
						"</div>                                                                                                                                                                             "+
						"</body>                                                                                                                                                                            "+
						"</html>                                                                                                                                                                            "
				}).show();
				
				// 툴팁 XY 셋팅
				setTooltipXY();
				
				var btnNomal = Ext.getCmp("btnModeNomal");
				if(btnNomal.btnOnOff == "on"){
					var aEl = Ext.get('reachTable');
					aEl.dom.hidden = true;
				}
				
				if(clickValue == "start" || clickValue == "end"){
					
					var coreMap = GetCoreMap();
					var option = "";
					var btnId = "";
					var symbol = null;
					
					if(clickValue == "start"){
						btnId = "btnMenu04";
						_krad.drawOption = "startPoint";
					}
					if(clickValue == "end"){
						btnId = "btnMenu05";
						_krad.drawOption = "endPoint";
					}
					
					initKradEvt();
					me.btnObj = SetBtnOnOff(btnId, "off");
					_krad.mapClickEvt = {mapPoint: point};
					// 검색설정 JSON 셋팅 (_krad.searchConfigInfoJson)
					_krad.getSearchConfigInfo();
	    			
	    			/* 검색설정 "상류" 체크 시 */
	    			if(_krad.searchConfigInfoJson.isUpDraw == true){
	    				
	    				_rchUpSearch.searchWithEvent(point);
	    			}
	    			else{ /* 검색설정 "상류" 체크 시 끝 */
			    			
	    				_krad.setRchIdsWithEvent();
	    			}
					
					closePopSiteInfo(); // 툴팁 닫기
				}
			});
			
		});
		
    },
    
    // 집수구역 선택
    setSelectedCatAreaHandler: function(layerId, catDId){
    	var me = this;
    	
    	// 집수구역 심볼 설정
		var selectedSymbol = new esri.symbol.SimpleFillSymbol(
			esri.symbol.SimpleFillSymbol.STYLE_SOLID,
			me.smpLineSymbol,
			new dojo.Color([255,0,0,0.5])
		);
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		if(catDId.length == 10)
			query.where =  "CAT_DID='" + catDId + "'";
		if(catDId.length == 8)
			query.where =  "CAT_ID='" + catDId + "'";
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveCatGraphicLayer.clear();
				me.moveCatGraphicLayer.id = "moveCatGraphicLayer" + catDId;
				
				obj.setSymbol(selectedSymbol);
				me.moveCatGraphicLayer.add(obj);
				
				var extent = esri.geometry.Polygon(obj.geometry).getExtent();
				//alert(extent);
				//console.info(extent);
				//me.map.centerAt(extent.getCenter());
				// 센터 이동
				centerAtWithOffset(extent.getCenter().x, extent.getCenter().y, extent.spatialReference);
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveCatGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
			});
		});
    },
    
    // 리치라인 선택
    setSelectedRchLineHandler: function(layerId, catDId){
    	var me = this;
    	
    	// 집수구역 심볼 설정
		var selectedSymbol = new esri.symbol.SimpleLineSymbol(
			esri.symbol.SimpleLineSymbol.STYLE_SOLID,
			new dojo.Color([0, 0, 0, 1]),
			5
		);
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		query.where =  "CAT_DID='" + catDId + "'";
		
		
		queryTask.execute(query,  function(results){
			
			me.moveRchGraphicLayer.clear();
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveRchGraphicLayer.id = "moveRchGraphicLayer" + catDId;
				
				obj.setSymbol(selectedSymbol);
				me.moveRchGraphicLayer.add(obj);
				
				//var extent = esri.geometry.Polygon(obj.geometry).getExtent();
				//me.map.setExtent(extent, true);
				//me.map.centerAt(extent.getCenter());
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveRchGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
			});
		});
    }
});