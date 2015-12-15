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
    	console.info("##");
		
    	var me = this;
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		
		
		if(layerId == "11"){ // 사업장 TMS
			query.where =  "사업장코드='" + siteId + "'";
		}
		else if(layerId == "25" || layerId == "26" || layerId == "27"
			|| layerId == "28" || layerId == "29" || layerId == "30"
			|| layerId == "31" || layerId == "32"){ // 환경기초시설
			query.where = "시설코드='" + siteId + "'";
		}
		else if(layerId == "15" || layerId == "16" || layerId == "17"
			|| layerId == "18" || layerId == "19" || layerId == "20"
			|| layerId == "21"){ // 기타측정지점
			query.where = "관측소코드='" + siteId + "'";
		}
		else if(layerId == "23"){ // 수생태계조사지점
			query.where = "조사지코드='" + siteId + "'";
		}
		else{
			query.where = "측정소코드='" + siteId + "'";
		}
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				console.info(obj);
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
				
				
//				me.movePopGraphicLayer.clear();
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
//				
//				require(["dojo/dom-style", "dijit/popup"], function(domStyle, dijitPopup){
//					
//			        	  domStyle.set(dialog.domNode, "opacity", 1);
//			        	  console.info("open");
//	  		          dijitPopup.open({
//	  		            popup: dialog, 
//	  		            x: 1076,
//	  		            y: 588
//	  		            /*x: results.features[0].attributes.TM_X,
//	  		            y: results.features[0].attributes.TM_Y*/
//	  		          });
//		          });
				
				var tileInfo = KRF_DEV.getApplication().coreMap.tileInfo;
				var curLevel = me.map.getLevel();
				var xOffset = tileInfo.lods[curLevel].resolution;
				
				x = x + ((1920 - Ext.getBody().getWidth()) / 2 * xOffset);
				y = y - ((979 - Ext.getBody().getHeight()) / 2 * xOffset);
				
				var point = new esri.geometry.Point(x, y, obj.geometry.spatialReference);
				me.map.centerAt(point);
				
				console.info(KRF_DEV.getApplication().coreMap.getWidth());
				console.info(Ext.getBody().getHeight());
				
				
			});
			
		});
		
    },
    
    
    
    
    
    
    
    
    
    setSelectedSiteHandler: function(layerId, siteId, clickValue){
		
    	console.info(clickValue);
    	
    	var groupCd = "";
    	if((layerId>=0)&&(layerId<=7)){
    		groupCd = "A";
    	}else if((layerId>=8)&&(layerId<=11)){
    		groupCd = "B";
    	}else if((layerId>=12)&&(layerId<=13)){
    		groupCd = "C";
    	}else if((layerId>=14)&&(layerId<=21)){
    		groupCd = "D";
    	}else if((layerId>=24)&&(layerId<=32)){
    		groupCd = "F";
    	}
    	
    	
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
    		
    	}else{
    		url = "./resources/images/symbol/btn_end01.png";
    		width = 26;
    		height = 38;
    	}
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		console.info(queryTask);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
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
		
		if(layerId == "11"){ // 사업장 TMS
			query.where =  "사업장코드='" + siteId + "'";
		}
		else if(layerId == "25" || layerId == "26" || layerId == "27"
			|| layerId == "28" || layerId == "29" || layerId == "30"
			|| layerId == "31" || layerId == "32"){ // 환경기초시설
			query.where = "시설코드='" + siteId + "'";
		}
		else if(layerId == "15" || layerId == "16" || layerId == "17"
			|| layerId == "18" || layerId == "19" || layerId == "20"
			|| layerId == "21"){ // 기타측정지점
			query.where = "관측소코드='" + siteId + "'";
		}
		else if(layerId == "23"){ // 수생태계조사지점
			query.where = "조사지코드='" + siteId + "'";
		}
		else{
			query.where = "측정소코드='" + siteId + "'";
		}
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				
				
				var parentCheck = "";	//지점구분
				var jijum = obj.attributes; //지점정보
				var jijum_Name = "";	//지점명
				var jijum_Addr = "";	//주소
				var jijum_Cd = "";		//지점토드
				
				
				//layer마다 column값이 달라 분기처리
				if(layerId == "1"){
					parentChcek = "A001";
					jijum_Name = jijum.측정소명;
					jijum_Addr = jijum.채수지점;
					jijum_Cd = jijum.측정소코드;
				}else if(layerId == "2"){
					parentChcek = "A002";
					jijum_Name = jijum.측정소명;
					jijum_Addr = jijum.채수지점;
					jijum_Cd = jijum.측정소코드;
				}else if(layerId == "33"){
					parentChcek = "A003";
					jijum_Name = jijum.측정소명;
					jijum_Addr = jijum.채수지점;
					jijum_Cd = jijum.측정소코드;
				}else if(layerId == "A004"){
					parentChcek = "4";
					jijum_Name = jijum.측정소명;
					jijum_Addr = jijum.채수지점;
					jijum_Cd = jijum.측정소코드;
				}else if(layerId == "5"){
					parentChcek = "A005";
					jijum_Name = jijum.측정소명;
					jijum_Addr = jijum.채수지점;
					jijum_Cd = jijum.측정소코드;
				}else if(layerId == "11"){
					parentChcek = "B002"; // 사업장TMS
					jijum_Name = jijum.사업장명칭;
					jijum_Addr = jijum.사업장주소;
					jijum_Cd = jijum.사업장코드;
				}else if(layerId == "13"){
					parentChcek = "C001"; // 퇴적물
					jijum_Name = jijum.지점명;
					jijum_Addr = jijum.채취지점_;
					jijum_Cd = jijum.측정소코드;
				}else if(layerId == "15"){
					parentChcek = "D001"; // 수위관측소
					jijum_Name = jijum.관측소명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.관측소코드;
				}else if(layerId == "16"){
					parentChcek = "D002"; // 우량관측소
					jijum_Name = jijum.관측소명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.관측소코드;
				}else if(layerId == "17"){
					parentChcek = "D003"; // 유량관측소
					jijum_Name = jijum.관측소명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.관측소코드;
				}else if(layerId == "18"){
					parentChcek = "D004"; // 댐관측소
					jijum_Name = jijum.관측소명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.관측소코드;
				}else if(layerId == "19"){
					parentChcek = "D005"; // AWS기상관측소
					jijum_Name = jijum.관측소명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.관측소코드;
				}else if(layerId == "20"){
					parentChcek = "D006"; // 지상기상관측소
					jijum_Name = jijum.관측소명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.관측소코드;
				}else if(layerId == "21"){
					parentChcek = "D007"; // 보관측소
					jijum_Name = jijum.보명;
					jijum_Addr = "";	// 값없음
					jijum_Cd = "";		// 값없음
				}else if(layerId == "23"){
					parentChcek = "E001"; // 수생태계조사지점
					jijum_Name = jijum.조사지명;
					jijum_Addr = "";//값없음
					jijum_Cd = jijum.조사지코드;
				}else if(layerId == "31"){
					parentChcek = "F001"; // 농공단지처리시설
					jijum_Name = jijum.시설명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.시설코드;
				}else if(layerId == "32"){
					parentChcek = "F002"; // 기타공동처리시설
					jijum_Name = jijum.시설명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.시설코드;
				}else if(layerId == "28"){
					parentChcek = "F003"; // 분뇨처리시설
					jijum_Name = jijum.시설명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.시설코드;
				}else if(layerId == "27"){
					parentChcek = "F004"; // 산업폐수종말처리시설
					jijum_Name = jijum.시설명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.시설코드;
				}else if(layerId == "25"){
					parentChcek = "F006"; // 축산폐수공공처리시설
					jijum_Name = jijum.시설명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.시설코드;
				}else if(layerId == "30"){
					parentChcek = "F007"; // 마을하수도
				}else if(layerId == "26"){
					parentChcek = "F009"; // 하수종말처리시설
					jijum_Name = jijum.시설명;
					jijum_Addr = jijum.주소;
					jijum_Cd = jijum.시설코드;
				}
				
				//시작지점 끝지점 처리및 지점명 삽입
				if(clickValue == "start"){
					reachNameToolbar.items.items[0].setValue(jijum_Name);
					textSearchText_Start.setValue(jijum_Name);
					console.info("start");
				}
				if(clickValue == "end"){
					reachNameToolbar.items.items[1].setValue(jijum_Name);
					textSearchText_End.setValue(jijum_Name);
					console.info("end");
				}
				
				
				
					Ext.create("Ext.window.Window", {
						//renderTo: Ext.getBody(),
						header: true,
						shadow: false,
						//frame: true,
						plain: true, // 요게 있어야 background: transparent 먹음..
						width: 500,
						height: 500,
						//style: ' background: transparent none !important; height: 500px;',
						style: 'border-style: none !important; background: transparent none !important; height: 700px;',
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
							"	<h1>"+jijum_Name+"</h1>                                                                                                                                                                  "+
							"	<dl><br>                                                                                                                                                                              "+
							"    	<dt>분류 :</dt>                                                                                                                                                               "+
							"        <dd>수질측정지점 > 하천수</dd>                                                                                                                                             "+
							"        <dt>주소 :</dt>                                                                                                                                                            "+
							"        <dd>"+jijum_Addr+"</dd>                                                                                       "+
							"    </dl>                                                                                                                                                                          "+
							"    <a href=\"#\"><img src=\"./resources/images/popup/btn_detailView.gif\"  onClick=\"ShowWindowSiteNChart(1,'"+jijum_Cd+"','"+jijum_Name+"',"+groupCd+");\" /></a>                                                                                                                    "+
							"    <ul>                                                                                                                                                                           "+
							"    	<li style=\"float: left;\">                                                                                                                                                   "+
							"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_chart.gif\"  onClick=\"ShowWindowSiteNChart(0,'"+jijum_Cd+"','"+jijum_Name+"',"+groupCd+");\" /></a>                                                                                                                    "+
							"            <a href=\"#\"><img src=\"./resources/images/popup/btn_data.gif\" onClick=\"ShowSearchResultReach('"+obj.attributes.CAT_ID+"');\" /></a>                                                                                                                  "+
							"        </li>                                                                                                                                                                   "+
							"        <li style=\"float: right; padding-right: 25px;\">                                                                                                                          "+
							"        	<a href=\"#\"><img src=\"./resources/images/popup/btn_startSpot.gif\"  onClick=\"siteMovePoint('"+parentChcek+"','"+jijum_Cd+"' , 'start' );\"  /></a>                                                                                                                "+
							"            <a href=\"#\"><img src=\"./resources/images/popup/btn_endSpot.gif\"   onClick=\"siteMovePoint('"+parentChcek+"','"+jijum_Cd+"' , 'end' );\"  /></a>                                                                                                               "+
							"        </li>                                                                                                                                                                      "+
							"    </ul>                                                                                                                                                                          "+
							"</div>                                                                                                                                                                             "+
							"</body>                                                                                                                                                                            "+
							"</html>                                                                                                                                                                            "
					}).show();
					
				var x = obj.geometry.x;
				var y = obj.geometry.y;
				
				var tileInfo = KRF_DEV.getApplication().coreMap.tileInfo;
				var curLevel = me.map.getLevel();
				var xOffset = tileInfo.lods[curLevel].resolution;
				
				x = x + ((1920 - Ext.getBody().getWidth()) / 2 * xOffset);
				y = y - ((979 - Ext.getBody().getHeight()) / 2 * xOffset);

				
				
				
				
				
				
				me.moveGraphicLayer.clear();
				me.moveGraphicLayer.id = "moveGraphicLayer" + siteId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
				obj.setSymbol(selectedSymbol);
				me.moveGraphicLayer.add(obj);
				
				/*var x = obj.geometry.x;
				var y = obj.geometry.y;*/
				var point = new esri.geometry.Point(x, y, obj.geometry.spatialReference);
				console.info(obj.geometry.spatialReference);
				//me.map.centerAndZoom(point, 12);
				me.map.centerAt(point);
				
				//console.info(me.moveGraphicLayer);
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
			});
			
		});
		
    },
    
    // 집수구역 선택
    setSelectedCatAreaHandler: function(layerId, catId){
    	var me = this;
    	
    	// 집수구역 심볼 설정
		var selectedSymbol = new esri.symbol.SimpleFillSymbol(
			esri.symbol.SimpleFillSymbol.STYLE_SOLID,
			me.smpLineSymbol,
			new dojo.Color([255,0,0,0.5])
		);
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		query.where =  "CAT_ID='" + catId + "'";
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveCatGraphicLayer.clear();
				me.moveCatGraphicLayer.id = "moveCatGraphicLayer" + catId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
				obj.setSymbol(selectedSymbol);
				me.moveCatGraphicLayer.add(obj);
				
				var extent = esri.geometry.Polygon(obj.geometry).getExtent();
				//me.map.setExtent(extent, true);
				me.map.centerAt(extent.getCenter());
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveCatGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
			});
		});
    },
    
    // 리치라인 선택
    setSelectedRchLineHandler: function(layerId, catId){
    	var me = this;
    	
    	// 집수구역 심볼 설정
		var selectedSymbol = new esri.symbol.SimpleLineSymbol(
			esri.symbol.SimpleLineSymbol.STYLE_SOLID,
			new dojo.Color([0, 0, 0, 1]),
			5
		);
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		query.where =  "CAT_ID='" + catId + "'";
		
		queryTask.execute(query,  function(results){
			
			me.moveRchGraphicLayer.clear();
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveRchGraphicLayer.id = "moveRchGraphicLayer" + catId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
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