Ext.define("KRF_DEV.view.map.KRADLayerAdmin", {
	
	map: null,
	kradLayerAdmin: null,
	kradInfo: null,
	
	drawSymbol_P: null,
	drawSymbol_L: null,
	
	mapClickObj: null,
	mOverObj: null,
	mOutObj: null,
	mClickObj: null,
	
	drawOption: null,
	mapClickEvt: null,
	rchId: null,
	
	tmpGrpLayer: null,
	kradGrpLayer: null,
	
	stSymbol: null,
	edSymbol: null,
	
	stRchIdArr: [],
	edRchIdArr: [],
	stEvtArr: [],
	edEvtArr: [],
	stDownLineArr: [],
	edDownLineArr: [],
	commDownLineArr: [],
	stSiteNm: null,
	edSiteNm: null,
	
	constructor: function(map) {
		
		var me = this;
        me.map = map;
        
		me.setKRADInfo();
		me.setDynamicLayer();
		
		require(["esri/symbols/SimpleMarkerSymbol",
		         "esri/symbols/SimpleLineSymbol",
		         "esri/symbols/SimpleFillSymbol",
		         "dojo/_base/Color",
		         "esri/layers/GraphicsLayer",
		         "esri/symbols/PictureMarkerSymbol"],
				function(SimpleMarkerSymbol,
						SimpleLineSymbol,
						SimpleFillSymbol,
						Color,
						GraphicsLayer,
						PictureMarkerSymbol){
			
			me.drawSymbol_P = new SimpleMarkerSymbol();
			me.drawSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.drawSymbol_P.setSize(10);
			me.drawSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.overSymbol_P = new SimpleMarkerSymbol();
			me.overSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.overSymbol_P.setSize(30);
			me.overSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.clickSymbol_P = new SimpleMarkerSymbol();
			me.clickSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.clickSymbol_P.setSize(20);
			me.clickSymbol_P.setColor(new Color([255,255,0,1]));
			
			me.drawSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 5);
			
			me.stSymbol = new PictureMarkerSymbol({
	 		    "angle": 0,
	 		    "yoffset": 14,
	 		    "type": "esriPMS",
	 		    "url": "./resources/images/symbol/btn_start01.png",
	 		    "contentType": "image/png",
	 		    "width": 20,
	 		    "height": 28
	 		});
			
			me.edSymbol = new PictureMarkerSymbol({
			    "angle": 0,
			    "yoffset": 14,
			    "type": "esriPMS",
			    "url": "./resources/images/symbol/btn_end01.png",
			    "contentType": "image/png",
			    "width": 20,
			    "height": 28
			});
			
			me.tmpGrpLayer = new GraphicsLayer();
			me.tmpGrpLayer.id = "tmpGrpLayer";
			me.tmpGrpLayer.visible = true;
			me.map.addLayer(me.tmpGrpLayer);
			
			me.kradGrpLayer = new GraphicsLayer();
			me.kradGrpLayer.id = "kradGrpLayer";
			me.kradGrpLayer.visible = true;
			me.map.addLayer(me.kradGrpLayer);
		});
    },
    setKRADInfo: function(){
    	
    	var me = this;
    	
    	/* khLee Test 임시 설정 개발완료 후 삭제할것.. */
		me.kradInfo = [{
			EXT_DATA_ID: "OBS_WQ_STR_EV",
			TITLE: "하천 수질 관측소",
			CHECKED: true,
			EVENT_TYPE: "Point",
			PD_LAYER_ID: 6,
			PE_LAYER_ID: 7,
			LO_LAYER_ID: null,
			LD_LAYER_ID: null,
			LE_LAYER_ID: 8,
			AE_LAYER_ID: 9,
			AO_LAYER_ID: null
		}, {
			EXT_DATA_ID: "ACCD_1024_EV",
			TITLE: "오염사고경로",
			CHECKED: true,
			EVENT_TYPE: "Line",
			PD_LAYER_ID: null,
			PE_LAYER_ID: 0,
			LO_LAYER_ID: 2,
			LD_LAYER_ID: 3,
			LE_LAYER_ID: 1,
			AO_LAYER_ID: 4,
			AE_LAYER_ID: 5
		}, {
			EXT_DATA_ID: "FAC_1026_EV",
			TITLE: "하수종말처리시설",
			CHECKED: true,
			EVENT_TYPE: "Point",
			PD_LAYER_ID: 16,
			PE_LAYER_ID: 17,
			LO_LAYER_ID: null,
			LD_LAYER_ID: null,
			LE_LAYER_ID: 18,
			AE_LAYER_ID: 19,
			AO_LAYER_ID: null
		}];
		/* khLee Test 임시 설정 개발완료 후 삭제할것.. 끝 */
    },
    setDynamicLayer: function(){
    	
    	var me = this;
    	
    	me.kradLayerAdmin = new esri.layers.ArcGISDynamicMapServiceLayer(_kradInfo.kradServiceUrl);
		me.kradLayerAdmin.id = "kradLayerAdmin"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.kradLayerAdmin.visible = true;
		me.map.addLayer(me.kradLayerAdmin);
		
		var visibleLayers = [];
		
		for(var i = 0; i < me.kradInfo.length; i++){
			
			if(me.kradInfo[i].CHECKED == true){
				
				if(me.kradInfo[i].EVENT_TYPE == "Point" && me.kradInfo[i].PD_LAYER_ID != null){
					
					visibleLayers.push(me.kradInfo[i].PD_LAYER_ID);
				}
				
				if(me.kradInfo[i].EVENT_TYPE == "Line" && me.kradInfo[i].LO_LAYER_ID != null){
					
					visibleLayers.push(me.kradInfo[i].LO_LAYER_ID);
				}
			}
		}
		
		me.kradLayerAdmin.setVisibleLayers(visibleLayers);
    },
    /* 이벤트(클릭, 드래그 등)로 리치라인에서 리치아이디 가져오기
     * 이벤트에 리치라인이 포함되지 않으면 집수구역 조회
     * evt: 이벤트 */
    setRchIdWithEvent: function(evt, drawOption){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	me.mapClickEvt = evt;
    	me.drawOption = drawOption;
    	me.rchId = "";
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/geometry/Point",
    	         "esri/geometry/Extent"], function(Query, QueryTask, Point, Extent){
    		
	    	var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL
			var query = new Query();
			query.returnGeometry = false;
			query.outFields = ["*"];
			
			if(evt.type == "point"){
				
	        	var centerPoint = new Point(evt.x, evt.y, evt.spatialReference);
	        	var mapWidth = coreMap.map.extent.getWidth();
	        	var pixelWidth = mapWidth / coreMap.map.width;
	        	var tolerance = 10 * pixelWidth;
	        	
	        	var queryExtent = new Extent(1, 1, tolerance, tolerance, evt.spatialReference);
	        	query.geometry = queryExtent.centerAt(centerPoint);
	    	}
			else{
				
				query.geometry = evt;
			}
			
			// 이벤트로 리치라인 조회
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length > 0){
					
					me.rchId = featureSet.features[0].attributes.RCH_ID;
				}
				else{
					
					var areaQueryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachAreaLayerId); // 집수구역 URL
					var areaQuery = new Query();
					areaQuery.returnGeometry = false;
					areaQuery.outFields = ["*"];
					areaQuery.geometry = query.geometry;
					
					// 이벤트로 집수구역 조회
					areaQueryTask.execute(areaQuery, function(areaFS){
						
						if(areaFS.features.length > 0){
							
							var lineQueryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL
							var lineQuery = new Query();
							lineQuery.returnGeometry = false;
							lineQuery.outFields = ["*"];
							lineQuery.where = "CAT_DID IN (";
							
							for(var i = 0; i < areaFS.features.length; i++){
								
								lineQuery.where += "'" + areaFS.features[i].attributes.CAT_DID + "', ";
							}
							
							lineQuery.where = lineQuery.where.substring(0, lineQuery.where.length - 2) + ")";
							
							// 조건으로 리치라인 조회
							lineQueryTask.execute(lineQuery, function(lineFS){
								
								if(lineFS.features.length > 0){
									
									me.rchId = lineFS.features[0].attributes.RCH_ID;
								}
								else{
									
									alert("해당 구역에 리치라인을 찾을 수 없습니다.");
								}
							});
						}
					});
				}
			});
    	});
    	
    	// 이벤트 선택 팝업 띄우기
    	me.showKRADEvtPop();
    },
    // KRAD 점, 선, 면 선택 팝업 열기
    showKRADEvtPop: function(){
    	
    	var cursorX = _cursorX;
    	var cursorY = _cursorY;
    	var bodyWidth = Ext.getBody().getWidth();
    	var bodyHeight = Ext.getBody().getHeight();
    	var popWidth = 80;
    	var popHeight = 120;
    	
    	if(_cursorX > bodyWidth - popWidth){
    		cursorX = bodyWidth - popWidth;
    	}
    	if(_cursorY > bodyHeight - popHeight){
    		cursorY = bodyHeight - popHeight;
    	}
    	
    	var popupMenu = Ext.getCmp("kradEvtPop");
    	
    	if(popupMenu == undefined){
    		
    		popupMenu = Ext.create("KRF_DEV.view.krad.kradEvtPop", {
    			width: popWidth,
    			height: popHeight,
    			x: cursorX,
    			y: cursorY
    		}).show();
    	}
    	else{
    		
    		popupMenu.setX(cursorX);
    		popupMenu.setY(cursorY);
    	}
    },
    // KRAD 점, 선, 면 선택 팝업 닫기
    closeKRADEvtPop: function(){
    	
    	var popupMenu = Ext.getCmp("kradEvtPop");
    	
    	if(popupMenu != undefined){
    		
    		popupMenu.close();
    	}
    },
    drawKRADEvtGrp: function(){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	var extDataId = "OBS_WQ_STR_EV";
    	
    	me.tmpGrpLayer.clear();
    	
    	require(["esri/tasks/QueryTask",
		         "esri/tasks/query",
		         "esri/layers/GraphicsLayer",
		         "dojo/on"],
		         function(QueryTask,
		        		 Query,
		        		 GraphicsLayer,
		        		 on){
    		
	    	for(var i = 0; i < me.kradInfo.length; i++){
	    		
	    		if(me.kradInfo[i].CHECKED == true){
	
	    			var extDataId = me.kradInfo[i].EXT_DATA_ID;
	    			var eventType = me.kradInfo[i].EVENT_TYPE;
	    			var layerId = "";
	    			var qWhere = "";
	    			
	    			if(eventType == "Point"){
	    				layerId = me.kradInfo[i].PD_LAYER_ID;
	    				qWhere = "RCH_ID = '" + me.rchId + "' AND EXT_DATA_ID = '" + extDataId + "'";
					}
	
					if(eventType == "Line"){
						layerId = me.kradInfo[i].LO_LAYER_ID;
						qWhere = "EXT_DATA_ID = '" + extDataId + "'";
					}
					
					var queryTask = new QueryTask(_kradInfo.kradServiceUrl + "/" + layerId);
					var query = new Query();
					query.returnGeometry = true;
					query.outFields = ["*"];
					query.where = qWhere;
					
					queryTask.execute(query, function(featureSet){
						
						var features = featureSet.features;
						
						if(features != undefined && features.length > 0){
							
							for(var fCnt = 0; fCnt < features.length; fCnt++){
								
								var graphic = features[fCnt];
								
								if(graphic.geometry.type == "point"){
									
									graphic.setSymbol(me.drawSymbol_P);
									me.tmpGrpLayer.add(graphic);
								}
							}
						}
					});
				}
	    	}
    	});
    	
    	// KRAD 이벤트 생성
		me.createEvent();
    },
    // 맵 클릭 이벤트 생성
    createMapClickEvt: function(drawType){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	require(["dojo/on"],
				function(on){
	    	
	    	me.mapClickObj = on(coreMap.map, "click", function(evt){
	    		
	    		me.setRchIdWithEvent(evt.mapPoint, drawType);
	    	});
    	});
    },
    // 맵 클릭 이벤트 생성
    clearMapClickEvt: function(){
    	
    	var me = this;
    	
    	// 맵 클릭 이벤트 삭제
		if(me.mapClickObj != null){
			
			me.mapClickObj.remove();
		}
    },
    createEvent: function(){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	require(["esri/tasks/QueryTask",
		         "esri/tasks/query",
		         "esri/layers/GraphicsLayer",
		         "dojo/on",
		         "esri/InfoTemplate"],
		         function(QueryTask,
		        		 Query,
		        		 GraphicsLayer,
		        		 on,
		        		 InfoTemplate){
    		
	    	me.mOverObj = on(me.tmpGrpLayer, "mouse-over", function(evt){
				
	    		console.info(evt.graphic);
	    		var infoIdx = me.kradInfo.map(function(obj){
	    			return obj.EXT_DATA_ID;
	    		}).indexOf(evt.graphic.attributes.EXT_DATA_ID);
	    		//console.info(infoIdx);
	    		var siteNm = evt.graphic.attributes.지점명 != undefined ? evt.graphic.attributes.지점명 : (evt.graphic.attributes.시설명 != undefined ? evt.graphic.attributes.시설명 : "");
	    		var infoTitle = "";
	    		if(infoIdx > -1){
	    			infoTitle = me.kradInfo[infoIdx].TITLE;
	    		}
	    		var infoContent = "지점명 : " + siteNm;
	    		
	    		var template = new InfoTemplate(infoTitle, infoContent);
	    		evt.graphic.setInfoTemplate(template)
	    		
	    		coreMap.map.infoWindow.setContent(evt.graphic.getContent());
	    		coreMap.map.infoWindow.setTitle(evt.graphic.getTitle());
	    		coreMap.map.infoWindow.show(evt.screenPoint,
	    				coreMap.map.getInfoWindowAnchor(evt.screenPoint));
	    		
	    		evt.graphic.setSymbol(me.overSymbol_P);
	    	});
		
			me.mOutObj = on(me.tmpGrpLayer, "mouse-out", function(evt){
				
				coreMap.map.infoWindow.hide();
	    		evt.graphic.setSymbol(me.drawSymbol_P);
	    	});
		
			me.mClickObj = on(me.tmpGrpLayer, "click", function(evt){
				
				coreMap.map.infoWindow.hide();
	    		evt.graphic.setSymbol(me.clickSymbol_P);
	    		me.clearEvent();
	    		
				me.drawSymbol(evt.graphic.geometry); // 심볼 그리기
				me.closeKRADEvtPop(); // KRAD 점, 선, 면 선택 팝업 닫기
				
				me.tmpGrpLayer.clear();
				
				var siteNm = evt.graphic.attributes.지점명 != undefined ? evt.graphic.attributes.지점명 : (evt.graphic.attributes.시설명 != undefined ? evt.graphic.attributes.시설명 : "");
				
				if(me.drawOption == "startPoint"){
	    			
					// 시작위치 하천명 셋팅
					SetStEdSiteName("start", siteNm);
	    			me.stRchIdArr.push(me.rchId);
	    			me.stEvtArr.push(evt.graphic);
	    		}
	    		
	    		if(me.drawOption == "endPoint"){
	    			
	    			// 시작위치 하천명 셋팅
					SetStEdSiteName("end", siteNm);
	    			me.edRchIdArr.push(me.rchId);
	    			me.edEvtArr.push(evt.graphic);
	    		}
				
				console.info(me.stRchIdArr);
	    		console.info(me.edRchIdArr);
	    		
	    		if(me.stRchIdArr.length > 0 && me.edRchIdArr.length > 0){
	    			
	    			for(var i = 0; i < me.stRchIdArr.length; i++){
	    				console.info(me.stRchIdArr[i]);
	    				me.selectDownLine(me.stRchIdArr[i], "startPoint", 0);
	    			}
	    			
	    			for(var i = 0; i < me.edRchIdArr.length; i++){
	    				console.info(me.edRchIdArr[i]);
	    				me.selectDownLine(me.edRchIdArr[i], "endPoint", 0);
	    			}
	    		}
	    	});
    	});
    },
    clearEvent: function(){
    	
    	var me = this;
    	
    	if(me.mOverObj != undefined && me.mOverObj != null){
    		me.mOverObj.remove();
    	}
    	
    	if(me.mOutObj != undefined && me.mOutObj != null){
    		me.mOutObj.remove();
    	}
    	
    	if(me.mClickObj != undefined && me.mClickObj != null){
    		me.mClickObj.remove();
    	}
    },
    /* 심볼그리기 */
    drawSymbol: function(evt){
    	
    	var me = this;
    	
    	require(["esri/graphic"], function(Graphic){
    		
    		var graphic = null;
    		var btnId = null;
    		
    		if(me.drawOption == "startPoint"){
    			btnId = "btnMenu04";
    			graphic = new Graphic(evt, me.stSymbol);
    		}
    		if(me.drawOption == "endPoint"){
    			btnId = "btnMenu05";
    			graphic = new Graphic(evt, me.edSymbol);
    		}
    		console.info(me.kradGrpLayer);
    		me.kradGrpLayer.add(graphic); // 그래픽 추가
    		
    		// 커서 디폴트
        	Ext.get('_mapDiv__gc').setStyle('cursor','default');
        	// 버튼 off
        	SetBtnOnOff(btnId, "off");
    	});
    },
    /* 하류 리치라인 조회
     * curRchDid: 검색될 리치 아이디(DID)
     * drawOption: 옵션("startPoint", "endPoint"...)
     * cnt: 하류검색 카운트 */
    selectDownLine: function(rchId, drawOption, cnt){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	rchId = rchId.replace(/ /gi, "");
    	
    	if(rchId != ""){
    		
	    	require(["esri/tasks/query",
	    	         "esri/tasks/QueryTask",
	    	         "esri/geometry/Point",
	    	         "esri/geometry/Extent"], function(Query, QueryTask, Point, Extent){
	    		
		    	var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL
				var query = new Query();
				query.returnGeometry = true;
				query.outFields = ["*"];
				
				if(cnt == 0){
					query.where = "RCH_ID = '" + rchId + "'";
				}
				else{
					query.where = "RCH_DID = '" + rchId + "'";
				}
				
				//console.info(cnt);
				
				// 리치라인 조회
				queryTask.execute(query, function(featureSet){
					
					if(featureSet.features.length > 0){
						
						for(var fCnt = 0; fCnt < featureSet.features.length; fCnt++){
							
							var feature = featureSet.features[fCnt];
							var rchDid = feature.attributes.RCH_DID;
							
							var stCommIdx = -1;
							
							if(drawOption == "startPoint"){
								
								var stIdx = me.stDownLineArr.map(function(obj){
									return obj.attributes.RCH_DID;
								}).indexOf(rchDid);
								
								if(stIdx == -1){
									// 시작위치 하류 배열 push
									me.stDownLineArr.push(feature);
								}
								
								// 시작위치 하류 배열 길이만큼 루프
								for(var stIdx = 0; stIdx < me.stDownLineArr.length; stIdx++){
									
									var stRchDid = me.stDownLineArr[stIdx].attributes.RCH_DID;
									stCommIdx = me.edDownLineArr.map(function(obj){
										return obj.attributes.RCH_DID;
									}).indexOf(stRchDid);
								}
							}
							
							var edCommIdx = -1;
							
							if(drawOption == "endPoint"){
								
								var edIdx = me.edDownLineArr.map(function(obj){
									return obj.attributes.RCH_DID;
								}).indexOf(rchDid);
								
								if(edIdx == -1){
									// 끝위치 하류 배열 push
									me.edDownLineArr.push(feature);
								}
								
								// 끝위치 하류 배열 길이만큼 루프
								for(var edIdx = 0; edIdx < me.edDownLineArr.length; edIdx++){
									
									var edRchDid = me.edDownLineArr[edIdx].attributes.RCH_DID;
									edCommIdx = me.stDownLineArr.map(function(obj){
										return obj.attributes.RCH_DID;
									}).indexOf(edRchDid);
								}
							}
							
							if(stCommIdx == -1 && edCommIdx == -1){
								
								cnt += 1; // 하류검색 카운트 증가
								
				    			// 좌측 하류 검색 (재귀호출)
					    		var ldRchDid = feature.attributes.LD_RCH_DID;
					    		
					    		if(ldRchDid != undefined && ldRchDid.trim() != ""){
						    		
						    		me.selectDownLine(ldRchDid, drawOption, cnt);
					    		}
					    		
					    		// 우측 하류 검색 (재귀호출)
					    		var rdRchDid = feature.attributes.RD_RCH_DID;
					    		
					    		if(rdRchDid != undefined && rdRchDid.trim() != ""){
						    		
						    		me.selectDownLine(rdRchDid, drawOption, cnt);
					    		}
							}
							else{
								
								me.commDownLineArr.push(feature);
								
								var dnGeoTrib = feature.attributes.GEO_TRIB;
					    		
					    		/** 검색설정(본류, 지류) 체크 **/
								var confInfo = localStorage['_searchConfigInfo_'];
								
								if(confInfo != undefined && confInfo != null){
									
									var jsonConf = JSON.parse(confInfo);
									
									// 지류검색이 아닐때
									if(jsonConf.isJiDraw == false){
										
										if(dnGeoTrib != 0){
											
											alert("선택된 시작위치, 끝위치 사이에 본류가 흐르지 않습니다.\r\n검색설정을 확인하세요.");
											return;
										}
									}
								}
								/** 검색설정(본류, 지류) 체크 끝 **/
								
								//Ext.defer(function(){
									
									// 상류 검색
						    		//me.selectUpLine(rchDid, dnGeoTrib, drawOption, 0); // 처음 호출시 마지막 0파라메터 주의..
						    		//alert("하류 만나는 지점 하천차수 : " + dnGeoTrib);
						    		
						    		// 검색 종료 체크
						    		//me.isStopCheck();
									
									//me.defaultDate(droneLayerId,measureDate,drone);
								//}, 1);
								
								console.info(me.commDownLineArr);
								var stRch = me.stDownLineArr.map(function(obj){
									return obj.attributes.RCH_DID;
								});
								console.info(stRch);
								
								var edRch = me.edDownLineArr.map(function(obj){
									return obj.attributes.RCH_DID;
								});
								console.info(edRch);
								
								console.info(rchDid);
								console.info(drawOption);
								console.info(stCommIdx);
								console.info(edCommIdx);
							}
						}
					}
				});
	    	});
    	}
    },
    /* 상류 리치라인 조회 및 그리기
     * curRchDid: 검색될 리치 아이디(DID)
     * dnGeoTrib: 공통된(최하위) 하류 object 하천차수(본류:0, 지류:1,2,3,...)
     * cnt: 상류검색 카운트 */
    selectUpLine: function(curRchDid, dnGeoTrib, drawOption, cnt){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	me.searchCnt += 1; // 검색 카운트 증가

    	curRchDid = curRchDid.replace(/ /gi, "");
    	
    	if(curRchDid == ""){
    		
    		return;
    	}
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/geometry/Point",
    	         "esri/geometry/Extent"], function(Query, QueryTask, Point, Extent){
    		
	    	var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			query.where = "RCH_DID = '" + curRchDid + "'";
			
			//console.info(_mapServiceUrl_v3 + "/" + _reachLineLayerId);
			//console.info(query.where);
			
			// 리치라인 조회
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length > 0){
					
					var isUpSearch = true; // 현재 feature 상류 검색 여부
    				var isDraw = true; // 현재 feature그릴지 여부
    				
    				
					
					/** 검색설정(본류, 지류) 체크 **/
					var feature = featureSet.features[0];
					// 현재 feature 하천 차수
					var curGeoTrib = feature.attributes.GEO_TRIB;
					var confInfo = localStorage['_searchConfigInfo_'];
					
					if(confInfo != undefined && confInfo != null){
						
						var jsonConf = JSON.parse(confInfo);
						
						// 지류검색이 아닐때
						if(jsonConf.isJiDraw == false){
							
							// 현재 object가 본류가 아니면
							if(curGeoTrib != 0){
								
								isUpSearch = false;
								isDraw = false;
							}
							else{
								
								isUpSearch = true;
								isDraw = true;
							}
						}
						else{
							
							isUpSearch = true;
							isDraw = true;
						}
					}
					/** 검색설정(본류, 지류) 체크 끝 **/
					
					if(isDraw == true){
						
						// 라인 그린다
						coreMap.reachLayerAdmin_v3_New.drawLine(feature, coreMap.reachLayerAdmin_v3_New.upLineSymbol, "lineGrpLayer");
					}
    				
    				if(isUpSearch == true){
    					
    					// 카운트 증가시켜 주자.. 꼭!! (처음 호출때만 0이면됨..)
    					cnt += 1;
    	    			
	    				// 좌측 상류 검색 (재귀호출)
	    				var luRchDid = feature.attributes.LU_RCH_DID;
	    				if(luRchDid != undefined && luRchDid.trim() != ""){
	    					me.selectUpLine(luRchDid, dnGeoTrib, drawOption, cnt);
	    				}
						
	    				// 우측 상류 검색 (재귀호출)
	    				var ruRchDid = feature.attributes.RU_RCH_DID;
	    				if(ruRchDid != undefined && ruRchDid.trim() != ""){
	    					me.selectUpLine(ruRchDid, dnGeoTrib, drawOption, cnt);
	    				}
    				}
				}
			});
    	});
    }
});