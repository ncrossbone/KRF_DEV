Ext.define("KRF_DEV.view.map.KRADLayerAdmin", {
	
	id: "kradLayerAdmin",
	
	map: null,
	kradInfo: null,
	
<<<<<<< HEAD
	kradPointLayer: null,
	kradLineLayer: null,
	kradAreaLayer: null,
	
	mouseOverObj_P: null,
	mouseOutObj_P: null,
	mouseClickObj_P: null,
=======
	drawSymbol_P: null,
	drawSymbol_L: null,
	drawSymbol_A: null,
>>>>>>> 5165b9be51e28276e772139bdb8f6266dcc2fc6c
	
	mouseOverObj_L: null,
	mouseOutObj_L: null,
	mouseClickObj_L: null,
	
	drawOption: null,
	rchMouseEvt: null,
	mouseSymbol: null,
	rchIds: null,
	stRchId: null,
	edRchId: null,
	stEvtType: null,
	edEvtType: null,
	btnId: null,
	stExtDataId: null,
	edExtDataId: null,
	
	arrStLineGrp: [],
    arrStLDGrp: [],
    arrStAreaGrp: [],
    arrEdLineGrp: [],
    arrEdLDGrp: [],
    arrEdAreaGrp: [],
	
	/* Point Symbol */
	basicSymbol_P: null,
	mouseOverSymbol_P: null,
	mouseOutSymbol_P: null,
	drawSymbol_P: null,
	
	/* Line Symbol */
	basicSymbol_L: null,
	mouseOverSymbol_L: null,
	mouseoutSymbol_L: null,
	drawSymbol_L:null,
	
	/* Area Symbol */
	basicSymbol_A: null,
	mouseOverSymbol_A: null,
	mouseoutSymbol_A: null,
	drawSymbol_A:null,
	
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
			me.drawSymbol_P.setSize(20);
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
			
			me.drawSymbol_A = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2), new Color([0, 0, 255, 0.3]));
			
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
>>>>>>> 5165b9be51e28276e772139bdb8f6266dcc2fc6c
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
		}];
		/* khLee Test 임시 설정 개발완료 후 삭제할것.. 끝 */
		
		require(["esri/symbols/SimpleMarkerSymbol",
		         "esri/symbols/SimpleLineSymbol",
		         "esri/symbols/SimpleFillSymbol",
		         "dojo/_base/Color",
		         "esri/layers/GraphicsLayer"],
				function(SimpleMarkerSymbol,
						SimpleLineSymbol,
						SimpleFillSymbol,
						Color,
						GraphicsLayer){
			
			/* 심볼 설정 */
			me.basicSymbol_P = new SimpleMarkerSymbol();
			me.basicSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.basicSymbol_P.setSize(10);
			me.basicSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.mouseOverSymbol_P = new SimpleMarkerSymbol();
			me.mouseOverSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.mouseOverSymbol_P.setSize(30);
			me.mouseOverSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.mouseOutSymbol_P = new SimpleMarkerSymbol();
			me.mouseOutSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.mouseOutSymbol_P.setSize(10);
			me.mouseOutSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.drawSymbol_P = new SimpleMarkerSymbol();
			me.drawSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.drawSymbol_P.setSize(10);
			me.drawSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.basicSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 5);
			me.mouseOverSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 8);
			me.mouseOutSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 5);
			me.drawSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 5);
			
			me.drawSymbol_A = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2), new Color([0, 0, 255, 0.5]));
			/* 심볼 설정 끝 */
			
			me.kradPointLayer = new GraphicsLayer();
			me.kradPointLayer.id = "kradPointLayer";
			me.kradPointLayer.visible = true;
			me.map.addLayer(me.kradPointLayer);
			
			me.kradLineLayer = new GraphicsLayer();
			me.kradLineLayer.id = "kradLineLayer";
			me.kradLineLayer.visible = true;
			me.map.addLayer(me.kradLineLayer);
			
			me.kradAreaLayer = new GraphicsLayer();
			me.kradAreaLayer.id = "kradAreaLayer";
			me.kradAreaLayer.visible = true;
			me.map.addLayer(me.kradAreaLayer);
		});
    },
    drawDataGrp: function(rchIds, evtType, drawOption, rchMouseEvt){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	// 레이어 및 이벤트 클리어
		//me.clearLayer();
		me.clearEvent();
    	
    	me.drawOption = drawOption;
    	me.rchMouseEvt = rchMouseEvt;
    	me.rchIds = rchIds;
    	
    	if(me.drawOption == "startPoint"){
    		me.mouseSymbol = coreMap.reachLayerAdmin_v3_New.startSymbol;
    		me.btnId = "btnMenu04";
    	}
    	if(me.drawOption == "endPoint"){
    		me.mouseSymbol = coreMap.reachLayerAdmin_v3_New.endSymbol;
    		me.btnId = "btnMenu05";
    	}
    	
    	var where = "";
    	
    	if(rchIds.length == 1){
			where = "RCH_ID = #RCH_ID#";
		}
		else{
			where = "RCH_ID IN (#RCH_ID#)";
		}
    	
    	var strRchId = "";
		
		for(var i = 0; i < rchIds.length; i++){
			strRchId += "'" + rchIds[i] + "', ";
		}
		
		strRchId = strRchId.substring(0, strRchId.length - 2);
		
		where = where.replace("#RCH_ID#", strRchId);
    	
		if(evtType == "Reach"){
			
			if(me.drawOption == "startPoint"){
				me.stEvtType = "Reach";
			}
			if(me.drawOption == "endPoint"){
				me.edEvtType = "Reach";
			}
			
			coreMap.reachLayerAdmin_v3_New.drawEnd(me.btnId);
			coreMap.reachLayerAdmin_v3_New.drawSymbol(me.rchMouseEvt, me.mouseSymbol, me.drawOption); // 심볼 그리기
			coreMap.reachLayerAdmin_v3_New.selectLineWithWhere(where, me.drawOption); // 라인 검색
			
			me.closeKradPop();
		}
		else{
	    	require(["esri/tasks/QueryTask",
			         "esri/tasks/query",
			         "esri/symbols/SimpleMarkerSymbol",
			         "dojo/_base/Color",
			         "esri/layers/GraphicsLayer"],
			         function(QueryTask,
			        		 Query,
			        		 SimpleMarkerSymbol,
			        		 Color,
			        		 GraphicsLayer){
	    		
		    	for(var i = 0; i < me.kradInfo.length; i++){
		    		
		    		if(me.kradInfo[i].CHECKED == true && evtType == me.kradInfo[i].EVENT_TYPE){
	
		    			var originLayerId = me.kradInfo[i].LO_LAYER_ID;
		    			var peLayerId = me.kradInfo[i].PE_LAYER_ID;
		    			var extDataId = me.kradInfo[i].EXT_DATA_ID;
		    			var layerId = "";
		    			
		    			if(evtType == "Point"){
		    				layerId = me.kradInfo[i].PD_LAYER_ID;
						}
	
						if(evtType == "Line"){
							layerId = me.kradInfo[i].LD_LAYER_ID
						}
		    			
	    				var queryTask = new QueryTask(_kradInfo.kradServiceUrl + "/" + layerId);
	    				var query = new Query();
	    				query.returnGeometry = true;
	    				query.outFields = ["*"];
	    				query.where = where + " AND EXT_DATA_ID = '" + me.kradInfo[i].EXT_DATA_ID + "'";
	    				
	    				queryTask.execute(query, function(featureSet){
	    					
	    					if(featureSet.features.length > 0){
	    						
	    						if(evtType == "Point"){
		    						
		    						me.drawGraphic(featureSet, evtType);
		    						
		    						if(evtType == "Point"){
		    				    		me.onMouseClick_P(evtType);
		    				    	}
		    					}
	
		    					if(evtType == "Line"){
		    						
		    						var qTaskOrigin = new QueryTask(_kradInfo.kradServiceUrl + "/" + originLayerId);
		    						var qOrigin = new Query();
		    						qOrigin.returnGeometry = true;
		    						qOrigin.outFields = ["*"];
		    						qOrigin.where = "EXT_DATA_ID = '" + extDataId + "' AND ORG_ID = " + featureSet.features[0].attributes.ORG_ID;
		    						
		    						qTaskOrigin.execute(qOrigin, function(fOrigin){
		    							
		    							me.drawGraphic(fOrigin, evtType);
		    							
		    							var queryTaskPE = new QueryTask(_kradInfo.kradServiceUrl + "/" + peLayerId);
		    							var queryPE = new Query();
		    							queryPE.returnGeometry = true;
		    							queryPE.outFields = ["*"];
		    							queryPE.where = "EXT_DATA_ID = '" + extDataId + "'";
		    							queryTaskPE.execute(queryPE, function(fSetPE){
		    								
		    								//console.info(fSetPE);
		    								var wherePE1 = "RCH_ID = '" + fSetPE.features[0].attributes.RCH_ID + "'";
		    								//coreMap.reachLayerAdmin_v3_New.selectLineWithWhere(wherePE, "startPoint");
		    								var wherePE2 = "RCH_ID = '" + fSetPE.features[1].attributes.RCH_ID + "'";
		    								//coreMap.reachLayerAdmin_v3_New.selectLineWithWhere(wherePE, "endPoint");
		    								
		    								if(evtType == "Line"){
		    						    		me.onMouseClick_L(evtType, wherePE1, wherePE2);
		    						    	}
		    							});
		    						});
		    					}
	    					}
	    				});
	    			}
	    		}
		    	
		    	me.onMouseOver(evtType);
		    	me.onMouseOut(evtType);
	    	});
		}
    },
    drawGraphic: function(featureSet, evtType, symbol){
    	
    	var me = this;
    	
    	for(var i = 0; i < featureSet.features.length; i++){
			
			var graphic = featureSet.features[i];
			
			if(evtType == "Point"){
				graphic.setSymbol(me.drawSymbol_P);
				me.kradPointLayer.add(graphic);
			}
			
			if(evtType == "Line"){
				
				graphic.setSymbol(me.drawSymbol_L);
				me.kradLineLayer.add(graphic);
			}
			
			if(evtType == "Area"){
				
				graphic.setSymbol(me.drawSymbol_A);
				me.kradAreaLayer.add(graphic);
			}
		}
    },
    onMouseOver: function(evtType){
    	
    	var me = this;
    	
    	require(["dojo/on"],
				function(on){
	    		
    		if(evtType == "Point"){
    			
		    	me.mouseOverObj_P = on(me.kradPointLayer, "mouse-over", function(evt){
		    			
		    		evt.graphic.setSymbol(me.mouseOverSymbol_P);
		    	});
    		}
    		
    		if(evtType == "Line"){
    			
    			me.mouseOverObj_L = on(me.kradLineLayer, "mouse-over", function(evt){
	    				
		    		evt.graphic.setSymbol(me.mouseOverSymbol_L);
		    	});
    		}
    	});
    },
    onMouseOut: function(evtType){
    	
    	var me = this;
    	
    	require(["dojo/on"],
				function(on){
	    		
    		if(evtType == "Point"){
    			
		    	me.mouseOutObj_P = on(me.kradPointLayer, "mouse-out", function(evt){
		    		
		    		evt.graphic.setSymbol(me.mouseOutSymbol_P);
		    	});
    		}
    		
    		if(evtType == "Line"){
    			
		    	me.mouseOutObj_L = on(me.kradLineLayer, "mouse-out", function(evt){
		    			
		    		evt.graphic.setSymbol(me.mouseOutSymbol_L);
		    	});
    		}
    	});
    },
    onMouseClick_P: function(evtType){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	var where = "";
		if(me.rchIds.length == 1){
			where = "RCH_ID = #RCH_ID#";
		}
		else{
			where = "RCH_ID IN (#RCH_ID#)";
		}
		
		var strRchId = "";
		for(var i = 0; i < me.rchIds.length; i++){
			strRchId += "'" + me.rchIds[i] + "', ";
		}
		
		strRchId = strRchId.substring(0, strRchId.length - 2);
		
		where = where.replace("#RCH_ID#", strRchId);
    	
    	require(["dojo/on"],
				function(on){
    		
    		me.mouseClickObj_P = on(me.kradPointLayer, "click", function(evt){
	    		
	    		if(me.drawOption == "startPoint"){
	    			me.stEvtType = "point";
	    			me.stRchId = evt.graphic.attributes.RCH_ID;
	    			me.stExtDataId = evt.graphic.attributes.EXT_DATA_ID;
	    			me.stEventOrder = evt.graphic.attributes.EVENT_ORDER;
	    		}
	    		if(me.drawOption == "endPoint"){
	    			me.edEvtType = "point";
	    			me.edRchId = evt.graphic.attributes.RCH_ID;
	    			me.edExtDataId = evt.graphic.attributes.EXT_DATA_ID;
	    			me.edEventOrder = evt.graphic.attributes.EVENT_ORDER;
	    		}
	    		
		    	coreMap.reachLayerAdmin_v3_New.drawEnd(me.btnId);
				coreMap.reachLayerAdmin_v3_New.drawSymbol(evt.graphic.geometry, me.mouseSymbol, me.drawOption); // 심볼 그리기
				coreMap.reachLayerAdmin_v3_New.selectLineWithWhere(where, me.drawOption); // 라인 검색
				
				// 레이어 및 이벤트 클리어
				//me.clearLayer();
				me.clearEvent();
				
				me.closeKradPop();
	    	});
    	});
    },
    onMouseClick_L: function(evtType, wherePE1, wherePE2){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	require(["dojo/on"],
				function(on){
    		
    		me.mouseClickObj_L = on(me.kradLineLayer, "click", function(evt){
    			console.info(evt);
    			coreMap.reachLayerAdmin_v3_New.drawEnd(me.btnId);
				coreMap.reachLayerAdmin_v3_New.drawSymbol(evt.mapPoint, me.mouseSymbol, me.drawOption); // 심볼 그리기
				coreMap.reachLayerAdmin_v3_New.selectLineWithEvent(evt.mapPoint, me.drawOption); // 라인 검색
    			
				var extDataId = evt.graphic.attributes.EXT_DATA_ID;
				var orgId = evt.graphic.attributes.ORG_ID;
				var dataLayerId = "";
				var leLayerId = "";
				var aeLayerId = "";
				var aoLayerId = "";
				
				for(var i = 0; i < me.kradInfo.length; i++){
					
					if(me.kradInfo[i].EXT_DATA_ID == extDataId){
						
						dataLayerId = me.kradInfo[i].LD_LAYER_ID;
						leLayerId = me.kradInfo[i].LE_LAYER_ID;
						ldLayerId = me.kradInfo[i].LD_LAYER_ID;
						aeLayerId = me.kradInfo[i].AE_LAYER_ID;
						aoLayerId = me.kradInfo[i].AO_LAYER_ID;
					}
				}
				
				if(dataLayerId != ""){
					
					require(["esri/tasks/QueryTask",
					         "esri/tasks/query"],
					         function(QueryTask,
					        		 Query){
						
						var queryTask = new QueryTask(_kradInfo.kradServiceUrl + "/" + aoLayerId);
	    				var query = new Query();
	    				query.returnGeometry = true;
	    				query.outFields = ["*"];
	    				query.where = "ORG_ID = " + orgId;
	    				
	    				queryTask.execute(query, function(featureSet){
	    					
	    					// 레이어 및 이벤트 클리어
	    					//me.clearLayer();
	    					me.clearEvent();
	    					
	    					evt.graphic.setSymbol(me.drawSymbol_L);
	    					
	    					if(me.drawOption == "startPoint"){
	    						me.stEvtType = "Line";
	    						me.arrStLineGrp.push(evt.graphic);
	    					}
	    					if(me.drawOption == "endPoint"){
	    						me.edEvtType = "Line";
	    						me.arrEdLineGrp.push(evt.graphic);
	    					}
	    					
	    					// LD 데이터 셋팅
	    					var queryTaskLD = new QueryTask(_kradInfo.kradServiceUrl + "/" + ldLayerId);
	    					query.where = "ORG_ID = " + orgId;
	    					queryTaskLD.execute(query, function(featureSetLD){
	    						
	    						for(var ldCnt = 0; ldCnt < featureSetLD.features.length; ldCnt++){
	    							
		    						if(me.drawOption == "startPoint"){
		    							me.arrStLDGrp.push(featureSetLD.features[ldCnt]);
		    						}
		    						if(me.drawOption == "endPoint"){
		    							me.arrEdLDGrp.push(featureSetLD.features[ldCnt]);
		    						}
	    						}
	    					});
	    					// LD 데이터 셋팅 끝
	    					
	    					//coreMap.reachLayerAdmin_v3_New.addGraphics(evt.graphic, "lineGrpLayer");
	    					
	    					for(var i = 0; i < featureSet.features.length; i++){
	    						
	    						featureSet.features[i].setSymbol(me.drawSymbol_A);
	    						if(me.drawOption == "startPoint"){
		    						me.arrStAreaGrp.push(featureSet.features[i]);
		    					}
	    						if(me.drawOption == "endPoint"){
		    						me.arrEdAreaGrp.push(featureSet.features[i]);
		    					}
	    						//coreMap.reachLayerAdmin_v3_New.addGraphics(featureSet.features[i], "areaGrpLayer");
	    					}
	    					
	    					me.drawGraphic(featureSet, "Area", me.drawSymbol_A);
	    					
	    					// 리치레이어 일단 숨기기
	    					coreMap.reachLayerAdmin_v3_New.lineGrpLayer.setVisibility(false);
	    					coreMap.reachLayerAdmin_v3_New.areaGrpLayer.setVisibility(false);
	    					
	    					// 라인 사이 상류 검색
							coreMap.reachLayerAdmin_v3_New.selectLineWithWhere(wherePE1, "startPoint");
							coreMap.reachLayerAdmin_v3_New.selectLineWithWhere(wherePE2, "endPoint");
	    				});
					});
				}
				
				me.closeKradPop();
	    	});
    	});
    },
    drawKRADLayer: function(){
    	
    	this.drawKRADrchLayer(this.stRchId, this.stExtDataId, this.stEventOrder);
    	this.drawKRADrchLayer(this.edRchId, this.edExtDataId, this.edEventOrder);
    },
    drawKRADrchLayer: function(rchId, extDataId, eventOrder){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	// 레이어 및 이벤트 클리어
		//me.clearLayer();
		me.clearEvent();
    	
    	require(["esri/tasks/QueryTask",
    	         "esri/tasks/query"],
    	         function(QueryTask,
    	        		 Query){
    		
<<<<<<< HEAD
	    	var comDownRchId = coreMap.reachLayerAdmin_v3_New.grpCommDownLine.attributes.RCH_ID;
	    	
	    	if(rchId != null && extDataId != null){
	    	
	    		for(var i = 0; i < me.kradInfo.length; i++){
=======
	    	me.mOverObj = on(me.tmpGrpLayer, "mouse-over", function(evt){
				
	    		//console.info(evt.graphic);
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
	    		
	    		me.map.infoWindow.setContent(evt.graphic.getContent());
	    		me.map.infoWindow.setTitle(evt.graphic.getTitle());
	    		me.map.infoWindow.show(evt.screenPoint,
	    				me.map.getInfoWindowAnchor(evt.screenPoint));
	    		
	    		evt.graphic.setSymbol(me.overSymbol_P);
	    	});
		
			me.mOutObj = on(me.tmpGrpLayer, "mouse-out", function(evt){
				
				me.map.infoWindow.hide();
	    		evt.graphic.setSymbol(me.drawSymbol_P);
	    	});
		
			me.mClickObj = on(me.tmpGrpLayer, "click", function(evt){
				//console.info(coreMap.map);
				me.map.infoWindow.hide();
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
				
	    		if(me.stRchIdArr.length > 0 && me.edRchIdArr.length > 0){
	    			
	    			for(var i = 0; i < me.stRchIdArr.length; i++){
	    				console.info(me.stRchIdArr[i]);
	    				me.selectDownLine(me.stRchIdArr[i], "startPoint", 0);
	    			}
>>>>>>> 5165b9be51e28276e772139bdb8f6266dcc2fc6c
	    			
	    			if(me.kradInfo[i].EVENT_TYPE == "Point"){
	    				
	    				if(extDataId == me.kradInfo[i].EXT_DATA_ID){
	    				
		    				var leLayerId = me.kradInfo[i].LE_LAYER_ID;
		    				var aeLayerId = me.kradInfo[i].AE_LAYER_ID;
		    				
		    				var where = "RCH_ID = '" + rchId + "' AND EXT_DATA_ID = '" + extDataId + "'";
		    				
		    				if(eventOrder != null && eventOrder != undefined){
		    					
			    				if(rchId == comDownRchId){
			    					
			    					where += " AND EVENT_ORDER <= " + eventOrder;
			    				}
			    				else{
			    					
			    					where += " AND EVENT_ORDER > " + eventOrder;
			    				}
		    				}
		    				
		    				var queryTaskLE = new esri.tasks.QueryTask(_kradInfo.kradServiceUrl + "/" + leLayerId);
		    				var queryLE = new esri.tasks.Query();
		    				queryLE.returnGeometry = true;
		    				queryLE.outFields = ["*"];
		    				queryLE.where = where;
		    				queryTaskLE.execute(queryLE, function(featureSet){
		    					
		    					for(var fCnt = 0; fCnt < featureSet.features.length; fCnt++){
		    						
		    						var graphic = featureSet.features[fCnt];
		    						graphic.setSymbol(me.drawSymbol_L);
		    						coreMap.reachLayerAdmin_v3_New.addGraphics(graphic, "lineGrpLayer");
		    					}
		    				});
		    				
		    				var queryTaskAE = new esri.tasks.QueryTask(_kradInfo.kradServiceUrl + "/" + aeLayerId);
		    				var queryAE = new esri.tasks.Query();
		    				queryAE.returnGeometry = true;
		    				queryAE.outFields = ["*"];
		    				queryAE.where = where;
		    				
		    				queryTaskAE.execute(queryAE, function(featureSet){
		    					
		    					for(var fCnt = 0; fCnt < featureSet.features.length; fCnt++){
		    						
		    						var graphic = featureSet.features[fCnt];
		    						graphic.setSymbol(me.drawSymbol_A);
		    						coreMap.reachLayerAdmin_v3_New.addGraphics(graphic, "areaGrpLayer");
		    					}
		    				});
	    				}
	    			}
	    			else if(me.kradInfo[i].EVENT_TYPE == "Line"){
    					
    					for(var arrCnt = 0; arrCnt < me.arrStLineGrp.length; arrCnt++){
    						
    						coreMap.reachLayerAdmin_v3_New.addGraphics(me.arrStLineGrp[arrCnt], "lineGrpLayer");
    					}
    					
    					for(var arrCnt = 0; arrCnt < me.arrStAreaGrp.length; arrCnt++){
    						
    						coreMap.reachLayerAdmin_v3_New.addGraphics(me.arrStAreaGrp[arrCnt], "areaGrpLayer");
    					}
    					
    					for(var arrCnt = 0; arrCnt < me.arrEdLineGrp.length; arrCnt++){
    						
    						coreMap.reachLayerAdmin_v3_New.addGraphics(me.arrEdLineGrp[arrCnt], "lineGrpLayer");
    					}
    					
    					for(var arrCnt = 0; arrCnt < me.arrEdAreaGrp.length; arrCnt++){
    						
    						coreMap.reachLayerAdmin_v3_New.addGraphics(me.arrEdAreaGrp[arrCnt], "areaGrpLayer");
    					}
    				}
	    		}
	    	}
    	});
    },
    clearLayer: function(){
    	
    	var me = this;
    	
    	if(me.kradPointLayer != undefined && me.kradPointLayer != null){
    		me.kradPointLayer.clear();
    	}
    	
    	if(me.kradLineLayer != undefined && me.kradLineLayer != null){
    		me.kradLineLayer.clear();
    	}
    	
    	if(me.kradAreaLayer != undefined && me.kradAreaLayer != null){
    		me.kradAreaLayer.clear();
    	}
    },
    clearEvent: function(){
    	
    	var me = this;
    	
<<<<<<< HEAD
    	if(me.mouseOverObj_P != undefined && me.mouseOverObj_P != null){
    		me.mouseOverObj_P.remove();
    	}
=======
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
    		console.info(me.drawOption);
    		console.info(graphic);
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
>>>>>>> 5165b9be51e28276e772139bdb8f6266dcc2fc6c
    	
    	if(me.mouseOutObj_P != undefined && me.mouseOutObj_P != null){
    		me.mouseOutObj_P.remove();
    	}
    	
    	if(me.mouseClickObj_P != undefined && me.mouseClickObj_P != null){
    		me.mouseClickObj_P.remove();
    	}
    	
<<<<<<< HEAD
    	if(me.mouseOverObj_L != undefined && me.mouseOverObj_L != null){
    		me.mouseOverObj_L.remove();
    	}
    	
    	if(me.mouseOutObj_L != undefined && me.mouseOutObj_L != null){
    		me.mouseOutObj_L.remove();
    	}
    	
    	if(me.mouseClickObj_L != undefined && me.mouseClickObj_L != null){
    		me.mouseClickObj_L.remove();
=======
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
						    		me.selectUpLine(rchDid, dnGeoTrib, drawOption, 0); // 처음 호출시 마지막 0파라메터 주의..
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
>>>>>>> 5165b9be51e28276e772139bdb8f6266dcc2fc6c
    	}
    },
    closeKradPop: function(){
    	
    	var popCtl = Ext.getCmp("kradEvtPop");
		if(popCtl != undefined){
			popCtl.close();
		}
    },
    clearKRADLayer: function(){
    	
    	var me = this;
    	
    	if(me.kradPointLayer != undefined && me.kradPointLayer != null){
    		me.kradPointLayer.clear();
    	}
    	if(me.kradLineLayer != undefined && me.kradLineLayer != null){
    		me.kradLineLayer.clear();
    	}
    	if(me.kradAreaLayer != undefined && me.kradAreaLayer != null){
    		me.kradAreaLayer.clear();
    	}
    	
    	if(me.mouseOverObj_P != undefined && me.mouseOverObj_P != null){
    		me.mouseOverObj_P.remove();
    	}
    	if(me.mouseOutObj_P != undefined && me.mouseOutObj_P != null){
    		me.mouseOutObj_P.remove();
    	}
    	if(me.mouseClickObj_P != undefined && me.mouseClickObj_P != null){
    		me.mouseClickObj_P.remove();
    	}
    	
<<<<<<< HEAD
    	if(me.mouseOverObj_L != undefined && me.mouseOverObj_L != null){
    		me.mouseOverObj_L.remove();
    	}
    	if(me.mouseOutObj_L != undefined && me.mouseOutObj_L != null){
    		me.mouseOutObj_L.remove();
    	}
    	if(me.mouseClickObj_L != undefined && me.mouseClickObj_L != null){
    		me.mouseClickObj_L.remove();
    	}
    	
    	me.drawOption = null;
    	me.rchMouseEvt = null;
    	me.mouseSymbol = null;
    	me.rchIds = null;
    	me.stRchId = null;
    	me.edRchId = null;
    	me.stEvtType = null;
    	me.edEvtType = null;
    	me.btnId = null;
    	me.stExtDataId = null;
    	me.edExtDataId = null;
    	
    	me.arrStLineGrp = [];
    	me.arrStLDGrp = [];
		me.arrStAreaGrp = [];
		me.arrEdLineGrp = [];
		me.arrEdLDGrp = [];
		me.arrEdAreaGrp = [];
=======
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
					
					var feature = featureSet.features[0];
					// 현재 feature 하천 차수
					var curGeoTrib = feature.attributes.GEO_TRIB;
					var curRchId = feature.attributes.RCH_ID;
					
					var isUpSearch = true; // 현재 feature 상류 검색 여부
    				var isDraw = true; // 현재 feature그릴지 여부
    				var kradUpDown = ""; // KRAD 그래픽 그릴지 여부 ("":안그림, "up":상류, "down":하류)
    				
    				/** 최하위 노드의 지류인 놈들만 검색하기 **/
					// 시작위치 하류에서 현재 feature 인덱스 찾기
    				var stIdx = -1;
					
					for(var i = 0; i < me.stDownLineArr.length; i++){
						
						if(curRchDid == me.stDownLineArr[i].attributes.RCH_DID){
							
							stIdx = i;
							break;
						}
					}
					
					// 끝위치 하류에서 현재 feature 인덱스 찾기
					var edIdx = -1;
					
					for(var i = 0; i < me.edDownLineArr.length; i++){
						
						if(curRchDid == me.edDownLineArr[i].attributes.RCH_DID){
							
							edIdx = i;
							break;
						}
					}
					
					// if(cnt != 0 && stIdx == -1 && edIdx == -1 && curGeoTrib <= dnGeoTrib){
					// 본류이면서 시작위치 하류 배열, 끝위치 하류 배열에 속해있지 않으면 검색 종료 Draw종료
					if(cnt != 0 && stIdx == -1 && edIdx == -1 && curGeoTrib == 0){
						
						isUpSearch = false;
						isDraw = false;
					}
					/** 최하위 노드의 지류인 놈들만 검색하기 끝 **/
					
					/** 검색설정(본류, 지류) 체크 **/
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
						}
					}
					/** 검색설정(본류, 지류) 체크 끝 **/
					
					var stRchIdx = me.stRchIdArr.indexOf(curRchId);
					var edRchIdx = me.edRchIdArr.indexOf(curRchId);
					
					// 시작지점이거나 끝지점이면
					if(stRchIdx > -1 || edRchIdx > -1){
						
						isUpSearch = false;
						isDraw = false;
						kradUpDown = "down"; // 하류 그리기
					}
					
					var commRchIdx = me.commDownLineArr.map(function(obj){
						return obj.attributes.RCH_ID;
					}).indexOf(curRchId);
					
					if(commRchIdx > -1){
						
						isUpSearch = true;
						isDraw = false;
						
						// 시작 또는 끝 하류 라인이 공통하류이면
						if(me.stDownLineArr[0].attributes.RCH_ID == curRchId || me.edDownLineArr[0].attributes.RCH_ID == curRchId){
							kradUpDown = "up"; // 상류 그리기
						}
					}
					
					if(isDraw == true){
						
						// 리치 라인 그린다
						coreMap.reachLayerAdmin_v3_New.drawLine(feature, coreMap.reachLayerAdmin_v3_New.upLineSymbol, "lineGrpLayer");
					}
					
					// KRAD 그래픽 그리기
					if(kradUpDown != ""){
						
						me.drawKRADGrp(curRchId, kradUpDown);
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
    },
    // KRAD 그래픽 그리기
    drawKRADGrp: function(curRchId, kradUpDown){
    	
    	var me = this;
    	
    	console.info(curRchId);
    	console.info(kradUpDown);
		console.info(me.stEvtArr);
		console.info(me.edEvtArr);
		
		var isKradDraw = false;
		var evtArr = null;
		var evtIdx = null;
		
		var stEvtIdx = me.stEvtArr.map(function(obj){
			return obj.attributes.RCH_ID;
		}).indexOf(curRchId);
		
		if(stEvtIdx > -1){
			
			isKradDraw = true;
			evtArr = me.stEvtArr;
			evtIdx = stEvtIdx;
		}
		else{
			
			var edEvtIdx = me.edEvtArr.map(function(obj){
				return obj.attributes.RCH_ID;
			}).indexOf(curRchId);
			
			if(edEvtIdx > -1){
				
				isKradDraw = true;
				evtArr = me.edEvtArr;
				evtIdx = edEvtIdx;
			}
		}
		
		if(isKradDraw == true){
			
			var extDataId = evtArr[evtIdx].attributes.EXT_DATA_ID;
			var eventOrder = evtArr[evtIdx].attributes.EVENT_ORDER;
			
			var kInfoIdx = me.kradInfo.map(function(obj){
				return obj.EXT_DATA_ID;
			}).indexOf(extDataId);
			
			if(kInfoIdx > -1){
				
				var eventType = me.kradInfo[kInfoIdx].EVENT_TYPE;
				var peLayerId = null;
				var leLayerId = null;
				var aeLayerId = null;
				
				if(eventType == "Point"){
					
					peLayerId = me.kradInfo[kInfoIdx].PE_LAYER_ID;
					leLayerId = me.kradInfo[kInfoIdx].LE_LAYER_ID;
					aeLayerId = me.kradInfo[kInfoIdx].AE_LAYER_ID;
					
					require(["esri/tasks/query",
			    	         "esri/tasks/QueryTask"],
			    	         function(Query,
			    	        		 QueryTask){
						
						var queryTaskLE = new QueryTask(_kradInfo.kradServiceUrl + "/" + leLayerId);
						var queryLE = new Query();
						queryLE.returnGeometry = true;
						queryLE.outFields = ["*"];
						queryLE.where = "RCH_ID = '" + curRchId + "'";
						if(kradUpDown == "up"){
							queryLE.where += " AND EVENT_ORDER <= " + eventOrder;
						}
						if(kradUpDown == "down"){
							queryLE.where += " AND EVENT_ORDER > " + eventOrder;
						}
						
						queryTaskLE.execute(queryLE, function(fSetLE){
							
							//console.info(fSetLE);
							var features = fSetLE.features;
							
							if(features != undefined && features.length > 0){
								
								for(var fCnt = 0; fCnt < features.length; fCnt++){
									//console.info(features[fCnt]);
									var graphic = features[fCnt];
									me.drawLine(graphic);
								}
								
								var queryTaskAE = new QueryTask(_kradInfo.kradServiceUrl + "/" + aeLayerId);
								
								queryTaskAE.execute(queryLE, function(fSetAE){
									
									//console.info(fSetAE);
									if(fSetAE.features != undefined && fSetAE.features.length > 0){
										
										for(var faCnt = 0; faCnt < fSetAE.features.length; faCnt++){
											
											var graphic = fSetAE.features[faCnt];
											me.drawArea(graphic);
										}
										
										console.info(GetCoreMap().reachLayerAdmin_v3_New.arrLineGrp);
										console.info(GetCoreMap().reachLayerAdmin_v3_New.arrAreaGrp);
									}
								});
							}
						});
					});
				}
			}
		}
    },
    /* 라인 그리기 */
    drawLine: function(graphic){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	var grpRchId
    	
    	// 그래픽 그린다.
		graphic.setSymbol(me.drawSymbol_L);
		coreMap.reachLayerAdmin_v3_New.addGraphics(graphic, "lineGrpLayer");
		
		// 배열에 넣기
		coreMap.reachLayerAdmin_v3_New.arrLineGrp.push(graphic);
		//console.info(curRchDid);
    	
    	//160705 pdj 그리기 완료후 검색결과 on
    	SetBtnOnOff("btnSearchResult");
    },
    /* 집수구역 그리기 */
    drawArea: function(graphic){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    		
    	// 그래픽 그린다.
    	graphic.setSymbol(me.drawSymbol_A);
    	coreMap.reachLayerAdmin_v3_New.addGraphics(graphic, "areaGrpLayer");
		console.info(graphic);
		// 배열에 넣기
    	coreMap.reachLayerAdmin_v3_New.arrAreaGrp.push(graphic);
    },
    // 전역 변수 초기화
    clearKRADLayerAdmin: function(){
    	
    	var me = this;
    	
    	if(me.map.infoWindow != undefined && me.map.infoWindow != null){
    		me.map.infoWindow.hide();
    	}
    	
    	if(me.mapClickObj != undefined && me.mapClickObj != null){
    		me.mapClickObj.remove();
    		me.mapClickObj = null;
    	}
    	if(me.mOverObj != undefined && me.mOverObj != null){
    		me.mOverObj.remove();
    		me.mOverObj = null;
    	}
    	if(me.mOutObj != undefined && me.mOutObj != null){
    		me.mOutObj.remove();
    		me.mOutObj = null;
    	}
    	if(me.mClickObj != undefined && me.mClickObj != null){
    		me.mClickObj.remove();
    		me.mClickObj = null;
    	}
    	
    	me.drawOption = null;
    	me.mapClickEvt = null;
    	me.rchId = null;
    	
    	if(me.tmpGrpLayer != undefined && me.tmpGrpLayer != null){
    		me.tmpGrpLayer.clear();
    	}
    	if(me.kradGrpLayer != undefined && me.kradGrpLayer != null){
    		me.kradGrpLayer.clear();
    	}
    	
    	me.stRchIdArr = [];
    	me.edRchIdArr = [];
    	me.stEvtArr = [];
    	me.edEvtArr = [];
    	me.stDownLineArr = [];
    	me.edDownLineArr = [];
    	me.commDownLineArr = [];
    	me.stSiteNm = null;
    	me.edSiteNm = null;
>>>>>>> 5165b9be51e28276e772139bdb8f6266dcc2fc6c
    }
});