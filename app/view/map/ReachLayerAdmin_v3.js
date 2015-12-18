Ext.define('KRF_DEV.view.map.ReachLayerAdmin_v3', {
	
	lineGrpLayer: null, // 리치라인 레이어
	areaGrpLayer: null, // 집수구역 레이어
	pointGrpLayer: null, // 포인트 레이어 (시작, 끝...)
	etcGrpLayer: null, // 기타 레이어
	
	selLineSymbol: null, // 선택된 라인 심볼
	upLineSymbol: null, // 상류 라인 심볼
	downLineSymbol: null, // 하류 라인 심볼
	areaSymbol: null, // 집수구역 심볼
	startSymbol: null, // 시작위치 심볼
	endSymbol: null, // 끝위치 심볼
	
	selectionToolbar: null, // Draw 툴바
	
	arrStartGrp: [], // 시작위치 포인트 그래픽 배열
	arrEndGrp: [], // 끝위치 포인트 그래픽 배열
	arrLineGrp: [], // 리치라인 그래픽 배열
	arrAreaGrp: [], // 집수구역 그래픽 배열
		
	constructor: function(map) {
		
		var me = this;
		me.map = map;
		
		require(["esri/symbols/SimpleLineSymbol",
		         "esri/symbols/SimpleFillSymbol",
		         "esri/symbols/PictureMarkerSymbol",
		         "esri/Color",
		         "esri/toolbars/draw"
		], function (SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, Color, Draw) {
			
			me.selLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 5);
			me.upLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5);
			me.downLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 170, 0]), 5);
			me.areaSymbol = 
        		new SimpleFillSymbol(
        							SimpleFillSymbol.STYLE_SOLID,
			        				new SimpleLineSymbol(
						        						SimpleLineSymbol.STYLE_DASHDOT,
									        			new Color([0, 0, 0]),
									        			2
						        						),
			        				new Color([255, 255, 0, 0.3])
        							);
			me.startSymbol = new PictureMarkerSymbol({
	 		    "angle": 0,
	 		    "yoffset": 14,
	 		    "type": "esriPMS",
	 		    "url": "./resources/images/symbol/btn_start01.png",
	 		    "contentType": "image/png",
	 		    "width": 20,
	 		    "height": 28
	 		});
			
			me.endSymbol = new esri.symbol.PictureMarkerSymbol({
			    "angle": 0,
			    "yoffset": 14,
			    "type": "esriPMS",
			    "url": "./resources/images/symbol/btn_end01.png",
			    "contentType": "image/png",
			    "width": 20,
			    "height": 28
			});
		});
    },
    
    getStartSymbolUrl: function(){
    	var me = this;
    	
    	var stCnt = me.arrStartGrp.length;
    	var edCnt = me.arrEndGrp.length;
    	if(stCnt <= edCnt){
    		stCnt = stCnt + 1;
    	}
    	
    	return "./resources/images/symbol/btn_s" + stCnt + ".png";
    },
    
    getEndSymbolUrl: function(){
    	var me = this;
    	
    	var stCnt = me.arrStartGrp.length;
    	var edCnt = me.arrEndGrp.length;
    	if(edCnt <= stCnt){
    		edCnt = edCnt + 1;
    	}
    	
    	return "./resources/images/symbol/btn_e" + edCnt + ".png";
    },
    
    pointDraw: function(option, btnId){
    	me = this;

    	require(["esri/toolbars/draw",
    	         "dojo/i18n!esri/nls/jsapi",
    	         "esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "dojo/on"], function(Draw, bundle, Query, QueryTask, on){
    		
    		me.selectionToolbar = new Draw(me.map, { showTooltips: true });
    		
    		if(option == "STARTPOINT"){
    			// 심볼설정
    			me.startSymbol.url = me.getStartSymbolUrl();
    			me.startSymbol.width = 48;
    			me.startSymbol.height = 38;
    			
    	    	// 커서 이미지 설정
    			Ext.get('_mapDiv__gc').setStyle('cursor','url(' + me.startSymbol.url + ') 24 38,auto');
    			
    			bundle.toolbars.draw.addPoint = "시작위치 리치라인을 클릭하세요.";
    			me.selectionToolbar.activate(Draw.POINT);
    		}
    		else if(option == "ENDPOINT"){
    			// 심볼설정
    			me.endSymbol.url = me.getEndSymbolUrl();
    			me.endSymbol.width = 48;
    			me.endSymbol.height = 38;
    			
    	    	// 커서 이미지 설정
    	    	Ext.get('_mapDiv__gc').setStyle('cursor','url(' + me.endSymbol.url + ') 24 38,auto');
    	    	
    			bundle.toolbars.draw.addPoint = "끝위치 리치라인을 클릭하세요.";
    			me.selectionToolbar.activate(Draw.POINT);
    		}
    		else if(option == "REMOVE"){
    			bundle.toolbars.draw.addPoint = "제거 할 리치라인을 클릭하세요.";
    			me.selectionToolbar.activate(Draw.POINT);
    		}
    		else if(option == "ADD"){
    			bundle.toolbars.draw.addPoint = "추가 할 리치라인을 클릭하세요.";
    			me.selectionToolbar.activate(Draw.POINT);
    		}
    		else if(option == "EXTENT"){
    			bundle.toolbars.draw.addPoint = "추가 할 영역을 드래그하세요.";
    			me.selectionToolbar.activate(Draw.EXTENT);
    		}
    		else if(option == "CIRCLE"){
    			bundle.toolbars.draw.addPoint = "추가 할 영역을 드래그하세요.";
    			me.selectionToolbar.activate(Draw.CIRCLE);
    		}
    		
    		on(me.selectionToolbar, "DrawEnd", function (evt) {
    			
    			/* 시작위치, 끝위치, 리치추가, 구간제거 시 
            	 * 좌측 레이어 및 검색창 크기 변경될때 
            	 * 포인트가 좌측으로 치우치는 현상이 있어 계산 로직 추가 */
            	var tileInfo = KRF_DEV.getApplication().coreMap.tileInfo;
    			var curLevel = me.map.getLevel();
    			var resolution = tileInfo.lods[curLevel].resolution;
    			
            	var initWidth = Ext.getCmp("west_container").initWidth;
    			var leftWidth = Ext.getCmp("west_container").getWidth();
    			var isCollapsed = Ext.getCmp("west_container").collapsed;
    			if(isCollapsed != false)
    				leftWidth = 0;
    			//console.info(evt);
    			var offset = (initWidth - leftWidth) * resolution;
    			
    			// 위에서 계산된 offset 적용
    			if(evt.x != undefined)
    				evt.x = evt.x + offset;
    			if(evt.xmin != undefined)
    				evt.xmin = evt.xmin + offset;
    			if(evt.xmax != undefined)
    				evt.xmax = evt.xmax + offset;
    			/* 계산 끝 */
    			
    			require(["esri/graphic"], function(Graphic){
    				
    				// 시작위치, 끝위치
    				if(option == "STARTPOINT" || option == "ENDPOINT"){
    					me.drawSymbol(option, evt); // 심볼 그리기
    					SetBtnOnOff(btnId); // 버튼 On/Off
    					me.drawEnd(); // 그리기 종료
    					me.runStartEnd(); // 검색 실행
    				}
    				
    				var queryTaskArea = new QueryTask(_mapServiceUrl_v3 + "/" + _reachAreaLayerId); // 집수구역 URL
    	    		var queryArea = new Query();
    	    		queryArea.returnGeometry = true;
    	    		queryArea.outFields = ["*"];
    	    		queryArea.geometry = evt; // point로 조회
    				
    	    		// 시작위치 집수구역 조회
    				queryTaskArea.execute(queryArea, function(featureSet){
    					
    					//console.info(featureSet);
    					for(var i = 0; i < featureSet.features.length; i++){
	    					var feature = featureSet.features[i];
	    					
	    					// 집수구역 그리기
				    		var catId = feature.attributes.CAT_ID;
				    		
				    		if(option == "ADD" || option == "EXTENT" || option == "CIRCLE"){
				    			me.drawAreaGrp(catId);
				    		}
				    		else if(option == "REMOVE"){
				    			me.removeAreaGrp(catId);
				    		}
				    		
				    		// 리치라인 조회
				    		var queryTaskLine = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 집수구역 URL
		    	    		var queryLine = new Query();
		    	    		queryLine.returnGeometry = true;
		    	    		queryLine.outFields = ["*"];
		    	    		queryLine.where = "CAT_ID = '" + catId + "'"; // point로 조회
		    	    		
		    	    		queryTaskLine.execute(queryLine, function(featureSet){
		    	    			
		    	    			for(var i = 0; i < featureSet.features.length; i++){
		    	    				
		    	    				var lineFeature = featureSet.features[i];
		    	    				var rchId = lineFeature.attributes.RCH_ID;
		    	    				var rivNm = lineFeature.attributes.RIV_NM;
		    	    				
		    	    				if(option == "STARTPOINT"){
										SetStEdSiteName("start", rivNm); // 하천명 셋팅
		    	    				}
		    	    				else if(option == "ENDPOINT"){
										SetStEdSiteName("end", rivNm); // 하천명 셋팅
		    	    				}
		    	    				else if(option == "ADD" || option == "EXTENT" || option == "CIRCLE"){
		    	    					me.drawLineGrp(rchId, me.selLineSymbol);
		    	    				}
		    	    				else if(option == "REMOVE"){
		    	    					me.removeLineGrp(rchId);
		    	    				}
		    	    			}
		    	    		});
    					}
    				});
    		 		
    		 	});
            });
    	});
    },
    
    // 심볼그리기
    drawSymbol: function(option, evt){
    	var me = this;
    	var lastStIdx = -1;
    	var lastEdIdx = -1;
    	var lastStGrp = null;
    	var lastEdGrp = null;
    	
    	require(["esri/graphic"], function(Graphic){
    	
	    	// 시작위치 클릭일때
	    	if(option == "STARTPOINT"){
	    		
	    		lastStIdx = me.arrStartGrp.length - 1;
	    		if(lastStIdx > -1){
	    			lastEdGrp = me.arrEndGrp[lastStIdx];
	    			if(lastEdGrp == undefined){
	    				lastStGrp = me.arrStartGrp[lastStIdx];
	    				me.removeGraphics(lastStGrp, "pointGrpLayer"); // 레이어 그래픽 삭제
	    				me.arrStartGrp.splice(lastStIdx, 1); // 시작위치 배열 그래픽 삭제
	    			}
	    		}
	    		
	    		// 그래픽 추가
	    		var graphic = new Graphic(evt, me.startSymbol);
	    		me.arrStartGrp.push(graphic); // 배열에 추가
	    		me.addGraphics(graphic, "pointGrpLayer"); // 레이어에 추가
	    	}
	    	
	    	// 끝위치 클릭일때
	    	if(option == "ENDPOINT"){
	    		
	    		lastEdIdx = me.arrEndGrp.length - 1;
	    		lastEdGrp = me.arrEndGrp[lastEdIdx];
	    		if(lastEdIdx > -1){
	    			lastStGrp = me.arrStartGrp[lastEdIdx];
	    			if(lastStGrp == undefined){
	    				lastEdGrp = me.arrEndGrp[lastEdIdx];
	    				me.removeGraphics(lastEdGrp, "pointGrpLayer"); // 레이어 그래픽 삭제
	    				me.arrEndGrp.splice(lastEdIdx, 1); // 끝위치 배열 그래픽 삭제
	    			}
	    		}
	    		
	    		// 그래픽 추가
	    		var graphic = new Graphic(evt, me.endSymbol);
	    		me.arrEndGrp.push(graphic); // 배열에 추가
	    		me.addGraphics(graphic, "pointGrpLayer"); // 레이어에 추가
	    	}
    	});
    },
    
    // 시작위치, 끝위치 리치검색 실행
    runStartEnd: function(){
    	var me = this;
    	
    	var stLength = me.arrStartGrp.length;
    	var edLength = me.arrEndGrp.length;
    	
    	if(stLength == edLength){
	    	var stLastGrp = me.arrStartGrp[me.arrStartGrp.length - 1];
	    	var edLastGrp = me.arrEndGrp[me.arrEndGrp.length - 1];
	    	
	    	require(["esri/symbols/SimpleLineSymbol",
	    	         "esri/Color",
	    	         "esri/tasks/query",
	    	         "esri/tasks/QueryTask",
	    	         "esri/graphic"], function(SimpleLineSymbol, Color, Query, QueryTask, Graphic){
	    		
	    		var queryTaskArea = new QueryTask(_mapServiceUrl_v3 + "/" + _reachAreaLayerId); // 집수구역 URL
	    		var queryArea = new Query();
	    		queryArea.returnGeometry = true;
	    		queryArea.outFields = ["*"];
	    		queryArea.geometry = stLastGrp.geometry; // start point로 조회
				//console.info(stLastGrp);
	    		// 시작위치 집수구역 조회
				queryTaskArea.execute(queryArea, function(featureSet){
					for(var i = 0; i < featureSet.features.length; i++){
						
						var stAreaFeature = featureSet.features[i];
						var stCatId = stAreaFeature.attributes.CAT_ID;
						
						queryArea.geometry = edLastGrp.geometry; // end point로 조회
						
						// 끝위치 집수구역 조회
						queryTaskArea.execute(queryArea, function(featureSet){
							
							for(var j = 0; j < featureSet.features.length; j++){
							
								var edAreaFeature = featureSet.features[j];
								var edCatId = edAreaFeature.attributes.CAT_ID;
								//console.info(stCatId);
								//console.info(edCatId);
								//me.selectReachLine(stCatId, edCatId);
								
								var queryTaskLine = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL
								var queryLine = new Query();
								queryLine.returnGeometry = true;
								queryLine.outFields = ["*"];
								queryLine.where = "CAT_ID = '" + stCatId + "'";
								
								// 시작위치 리치라인 조회
								queryTaskLine.execute(queryLine, function(featureSet){
									
									for(var k = 0; k < featureSet.features.length; k++){
										
										var stLineFeature = featureSet.features[k];
										
										queryLine.where = "CAT_ID = '" + edCatId + "'";
										
										// 시작위치 하천명 셋팅
										var rivNm = stLineFeature.attributes.RIV_NM;
										if(rivNm != undefined && rivNm != ""){
											SetStEdSiteName("start", rivNm);
										}
										
										// 끝위치 리치라인 조회
										queryTaskLine.execute(queryLine, function(featureSet){
											
											for(var l = 0; l < featureSet.features.length; l++){
												
												var edLineFeature = featureSet.features[l];
												
												// 끝위치 하천명 셋팅
												var rivNm = edLineFeature.attributes.RIV_NM;
												if(rivNm != undefined && rivNm != ""){
													SetStEdSiteName("end", rivNm);
												}
												
												var stRchId = stLineFeature.attributes.RCH_ID;
												var edRchId = edLineFeature.attributes.RCH_ID;
												
												// 시작위치가 상류일때
												if(stRchId < edRchId){
													me.downStartLine(stRchId, stRchId, edRchId);
												}
												// 끝위치가 상류일때
												if(edRchId < stRchId){
													me.downStartLine(edRchId, edRchId, stRchId);
												}
											}
										});
									}
								});
							}
						});
					}
				});
				
	    	});
    	}
    },
    
    // 최하위 하류 리치라인 그리기
    // curRchId: 검색대상, stRchId: 최초시작위치(상류), edRchId: 최초끝위치(하류)
    downStartLine: function(curRchId, stRchId, edRchId){
    	var me = this;
    	
    	require(["esri/symbols/SimpleLineSymbol",
    	         "esri/Color",
    	         "esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/graphic"], function(SimpleLineSymbol, Color, Query, QueryTask, Graphic){
    		
	    	var queryTaskLine = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL
			var queryLine = new Query();
			queryLine.returnGeometry = true;
			queryLine.outFields = ["*"];
			queryLine.where = "RCH_ID = '" + curRchId + "'";
			
			// 리치라인 검색
			queryTaskLine.execute(queryLine, function(featureSet){
				
				// 리치아이디가 같은놈들이 있는거 같음 루프 필수..
				for(var i = 0; i < featureSet.features.length; i++){
					var lineFeature = featureSet.features[i];
					
					if(lineFeature != undefined){
						
						// 검색 대상이 끝위치(하류)보다 상류일때
				    	if(curRchId < edRchId){
							
							var ldRchId = lineFeature.attributes.LD_RCH_ID; // 하류 좌측 유출 ID
							// RCH_ID, LD_RCH_ID 같은놈이 있는거 같아서 조건 (같으면 무한루프)
							if(curRchId != ldRchId){
								// 하류 좌측 유출 ID로 재검색
								me.downStartLine(ldRchId, stRchId, edRchId);
							}
							
							var rdRchId = lineFeature.attributes.RD_RCH_ID; // 하류 우측 유출 ID
							// RCH_ID, RD_RCH_ID 같은놈이 있는거 같아서 조건 (같으면 무한루프)
							if(curRchId != rdRchId){
								// 하류 우측 유출 ID로 재검색
								me.downStartLine(rdRchId, stRchId, edRchId);
							}
						}
				    	// 검색 대상이 끝위치(하류)보다 하류이거나 같을때..
				    	// 시작위치, 끝위치 사이의 최하위 하류일때 그래픽 그리고 거기부터 상류로 검색
				    	else{

				    		// 하류 라인 그리기
				    		me.drawLineGrp(curRchId, me.downLineSymbol);
				    		
				    		// 집수구역 그리기
				    		var catId = lineFeature.attributes.CAT_ID;
				    		me.drawAreaGrp(catId);
				    		
				    		var luRchId = lineFeature.attributes.LU_RCH_ID; // 상류 좌측 유입 ID
				    		// RCH_ID, LU_RCH_ID 같은놈이 있는거 같아서 조건 (같으면 무한루프)
							if(curRchId != luRchId){
								// 상류 좌측 유입 ID로 상류 그래픽 그리기
								me.upDrawLineGrp(luRchId, stRchId, edRchId);
							}
							
							var ruRchId = lineFeature.attributes.RU_RCH_ID; // 상류 우측 유입 ID
							// RCH_ID, RU_RCH_ID 같은놈이 있는거 같아서 조건 (같으면 무한루프)
							if(curRchId != ruRchId){
								// 상류 우측 유입 ID로 상류 그래픽 그리기
								me.upDrawLineGrp(ruRchId, stRchId, edRchId);
							}
				    	}
					}
				};
			});
    	});
    },
    
    // 상류 그래픽 그리기
    // curRchId: 검색대상, stRchId: 최초시작위치(상류), edRchId: 최초끝위치(하류)
    upDrawLineGrp: function(curRchId, stRchId, edRchId){
    	
    	var me = this;
    	
    	require(["esri/symbols/SimpleLineSymbol",
    	         "esri/Color",
    	         "esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/graphic"], function(SimpleLineSymbol, Color, Query, QueryTask, Graphic){
    		
	    	var queryTaskLine = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL v3
			var queryLine = new Query();
			queryLine.returnGeometry = true;
			queryLine.outFields = ["*"];
			queryLine.where = "RCH_ID = '" + curRchId + "'";
			
			// 리치라인 검색
			queryTaskLine.execute(queryLine, function(featureSet){
				
				// 리치아이디가 같은놈들이 있는거 같음 루프 필수..
				for( var i = 0; i < featureSet.features.length; i++){
					//console.info(feature);
					var lineFeature = featureSet.features[i];
					
					if(lineFeature != undefined){
						
						// 상류 라인 그리기
						me.drawLineGrp(curRchId, me.upLineSymbol);
						
						// 집수구역 그리기
			    		var catId = lineFeature.attributes.CAT_ID;
			    		me.drawAreaGrp(catId);
			    		
						// 검색 대상이 최초 시작위치(상류)보다 하류이고 최초 끝위치(하류)가 아닐때
						if(curRchId > stRchId && curRchId != edRchId){
							
				    		var luRchId = lineFeature.attributes.LU_RCH_ID; // 상류 좌측 유입 ID
							//if(curRchId != luRchId && luRchId != preRchId){
							if(curRchId != luRchId){
								me.upDrawLineGrp(luRchId, stRchId, edRchId);
							}
							
							var ruRchId = lineFeature.attributes.RU_RCH_ID; // 상류 우측 유입 ID
							//if(curRchId != ruRchId && ruRchId != preRchId){
							if(curRchId != ruRchId){
								me.upDrawLineGrp(ruRchId, stRchId, edRchId);
							}
						}
					}
				};
			});
    	});
    },
    
    // 집수구역 그리기
    drawAreaGrp: function(catId){
    	
    	var me = this;
    	
    	require(["esri/symbols/SimpleLineSymbol",
    	         "esri/Color",
    	         "esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/graphic"], function(SimpleLineSymbol, Color, Query, QueryTask, Graphic){
    		
	    	var queryTaskArea = new QueryTask(_mapServiceUrl_v3 + "/" + _reachAreaLayerId); // 리치라인 URL v3
			var queryArea = new Query();
			queryArea.returnGeometry = true;
			queryArea.outFields = ["*"];
			queryArea.where = "CAT_ID = '" + catId + "'";
			
			// 리치라인 검색
			queryTaskArea.execute(queryArea, function(featureSet){
				
				for(var i = 0; i < featureSet.features.length; i++){
					
					var areaFeature = featureSet.features[i];
					
					if(areaFeature != undefined){
				    	var val = areaFeature.attributes.CAT_ID;
				    	var idx = me.getGrpArrIdx(i, "CAT_ID", val, me.arrAreaGrp);
				    	if(idx == -1){
				    		areaFeature.setSymbol(me.areaSymbol); // 집수구역 심볼 설정
							me.addGraphics(areaFeature, "areaGrpLayer"); // 그래픽 그리기
							me.arrAreaGrp.push({seq: i, grp: areaFeature}); // 집수구역 그래픽 배열 추가
				    	}
					}
				};
			});
    	});
    },
    
    removeAreaGrp: function(catId){
    	
    	var me = this;
    	
    	require(["esri/symbols/SimpleLineSymbol",
    	         "esri/Color",
    	         "esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/graphic"], function(SimpleLineSymbol, Color, Query, QueryTask, Graphic){
    		
	    	var queryTaskArea = new QueryTask(_mapServiceUrl_v3 + "/" + _reachAreaLayerId); // 리치라인 URL v3
			var queryArea = new Query();
			queryArea.returnGeometry = true;
			queryArea.outFields = ["*"];
			queryArea.where = "CAT_ID = '" + catId + "'";
			
			// 리치라인 검색
			queryTaskArea.execute(queryArea, function(featureSet){
				
				for(var i = 0; i < featureSet.features.length; i++){
					
					var areaFeature = featureSet.features[i];
					
					if(areaFeature != undefined){
				    	var val = areaFeature.attributes.CAT_ID;
				    	var idx = me.getGrpArrIdx(i, "CAT_ID", val, me.arrAreaGrp);
				    	if(idx > -1){
				    		//areaFeature.setSymbol(me.areaSymbol); // 집수구역 심볼 설정
							me.removeGraphics(me.arrAreaGrp[idx].grp, "areaGrpLayer"); // 그래픽 삭제
							me.arrAreaGrp.splice(idx, 1); // 집수구역 그래픽 배열 삭제
				    	}
					}
				};
			});
    	});
    },
    
    // 리치라인 그리기
    drawLineGrp: function(rchId, symbol){
    	
    	var me = this;
    	
    	require(["esri/symbols/SimpleLineSymbol",
    	         "esri/Color",
    	         "esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/graphic"], function(SimpleLineSymbol, Color, Query, QueryTask, Graphic){
    		
	    	var queryTaskLine = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL v3
			var queryLine = new Query();
			queryLine.returnGeometry = true;
			queryLine.outFields = ["*"];
			queryLine.where = "RCH_ID = '" + rchId + "'";
			
			// 리치라인 검색
			queryTaskLine.execute(queryLine, function(featureSet){
				for(var i = 0; i < featureSet.features.length; i++){
					
					var lineFeature = featureSet.features[i];
					lineFeature.setSymbol(symbol); // 상류 심볼 설정
					
					if(lineFeature != undefined){
				    	var val = lineFeature.attributes.RCH_ID;
				    	var idx = me.getGrpArrIdx(i, "RCH_ID", val, me.arrLineGrp);
				    	
				    	var OBJECTID = lineFeature.attributes.OBJECTID;
				    	console.info("OBJECTID: " + OBJECTID);
				    	var Shape  = lineFeature.attributes.Shape ;
				    	console.info("Shape: " + Shape);
				    	var BRU_X = lineFeature.attributes.BRU_X;
				    	console.info("우상단 x좌표: " + BRU_X);
				    	var BRU_Y = lineFeature.attributes.BRU_Y;
				    	console.info("우상단 y좌표: " + BRU_Y);
				    	var BLL_X  = lineFeature.attributes.BLL_X ;
				    	console.info("좌하단 x좌표: " + BLL_X);
				    	var BLL_Y  = lineFeature.attributes.BLL_Y ;
				    	console.info("좌하단 y좌표: " + BLL_Y);
				    	var INODE_ID  = lineFeature.attributes.INODE_ID ;
				    	console.info("유입 노드 아이디: " + INODE_ID);
				    	var ONODE_ID  = lineFeature.attributes.ONODE_ID ;
				    	console.info("유출 노드 아이디: " + ONODE_ID);
				    	var RCH_ID  = lineFeature.attributes.RCH_ID ;
				    	console.info("리치 아이디: " + RCH_ID);
				    	var RIV_ID  = lineFeature.attributes.RIV_ID ;
				    	console.info("하천 코드: " + RIV_ID);
				    	var RIV_NM  = lineFeature.attributes.RIV_NM ;
				    	console.info("하천 명: " + RIV_NM);
				    	var RCH_LEN  = lineFeature.attributes.RCH_LEN ;
				    	console.info("리치 길이: " + RCH_LEN);
				    	var TOTAL_LEN  = lineFeature.attributes.TOTAL_LEN ;
				    	console.info("하천 연장 길이: " + TOTAL_LEN);
				    	var CUM_LEN  = lineFeature.attributes.CUM_LEN ;
				    	console.info("누적 리치 길이: " + CUM_LEN);
				    	var CAT_ID  = lineFeature.attributes.CAT_ID ;
				    	console.info("집수구역 코드: " + CAT_ID);
				    	var CUM_AREA  = lineFeature.attributes.CUM_AREA ;
				    	console.info("집수구역 누적 면적: " + CUM_AREA);
				    	var RCH_DID = lineFeature.attributes.RCH_DID;
				    	console.info("분할코드 아이디: " + RCH_DID);
				    	var RCH_SN  = lineFeature.attributes.RCH_SN ;
				    	console.info("순차코드: " + RCH_SN);
				    	var RCH_DIV  = lineFeature.attributes.RCH_DIV ;
				    	console.info("분할코드: " + RCH_DIV);
				    	var GEO_TRIB  = lineFeature.attributes.GEO_TRIB ;
				    	console.info("하천차수: " + GEO_TRIB);
				    	var O_FLAG  = lineFeature.attributes.O_FLAG ;
				    	console.info("독립 리치 식별: " + O_FLAG);
				    	var E_FLAG  = lineFeature.attributes.E_FLAG ;
				    	console.info("마지막 리치 식별: " + E_FLAG);
				    	var S_FLAG  = lineFeature.attributes.S_FLAG ;
				    	console.info("시작 리치 식별: " + S_FLAG);
				    	var DC_RIV_NM  = lineFeature.attributes.DC_RIV_NM ;
				    	console.info("하류 연결 하천명: " + DC_RIV_NM);
				    	var DC_RIV_ID  = lineFeature.attributes.DC_RIV_ID ;
				    	console.info("하류 연결 하천 코드: " + DC_RIV_ID);
				    	var INODE_DID  = lineFeature.attributes.INODE_DID ;
				    	console.info("유입노드 분할 코드: " + INODE_DID);
				    	var ONODE_DID  = lineFeature.attributes.ONODE_DID ;
				    	console.info("유출노드 분할 코드: " + ONODE_DID);
				    	var U_DIR  = lineFeature.attributes.U_DIR ;
				    	console.info("상류 유입 방향: " + U_DIR);
				    	var LU_RCH_ID  = lineFeature.attributes.LU_RCH_ID ;
				    	console.info("상류 좌측 유입 리치 아이디: " + LU_RCH_ID);
				    	var LU_RCH_DID  = lineFeature.attributes.LU_RCH_DID ;
				    	console.info("상류 좌측 유입 리치 분할코드: " + LU_RCH_DID);
				    	var RU_RCH_ID  = lineFeature.attributes.RU_RCH_ID ;
				    	console.info("상류 우측 유입 리치 아이디: " + RU_RCH_ID);
				    	var RU_RCH_DID  = lineFeature.attributes.RU_RCH_DID ;
				    	console.info("상류 우측 유입 리치 분할코드: " + RU_RCH_DID);
				    	var DI_DIR  = lineFeature.attributes.DI_DIR ;
				    	console.info("하류 유입 방향: " + DI_DIR);
				    	var DI_RCH_ID  = lineFeature.attributes.DI_RCH_ID ;
				    	console.info("하류 유입 리치 아이디: " + DI_RCH_ID);
				    	var DI_RCH_DID  = lineFeature.attributes.DI_RCH_DID ;
				    	console.info("하류 유입 리치 분할코드: " + DI_RCH_DID);
				    	var D_DIR  = lineFeature.attributes.D_DIR ;
				    	console.info("하류 유출 방향: " + D_DIR);
				    	var LD_RCH_ID  = lineFeature.attributes.LD_RCH_ID ;
				    	console.info("하류 좌측 유출 리치 아이디: " + LD_RCH_ID);
				    	var LD_RCH_DID  = lineFeature.attributes.LD_RCH_DID ;
				    	console.info("하류 좌측 유출 리치 분할코드: " + LD_RCH_DID);
				    	var RD_RCH_ID = lineFeature.attributes.RD_RCH_ID;
				    	console.info("하류 우측 유출 리치 아이디: " + RD_RCH_ID);
				    	var RD_RCH_DID  = lineFeature.attributes.RD_RCH_DID ;
				    	console.info("하류 우측 유출 리치 분할코드: " + RD_RCH_DID);
				    	var CAT_DID  = lineFeature.attributes.CAT_DID ;
				    	console.info("집수구역 분할코드: " + CAT_DID);
				    	
				    	if(idx == -1){
				    		me.addGraphics(lineFeature, "lineGrpLayer"); // 라인 그래픽 그리기
				    		me.arrLineGrp.push({seq: i, grp: lineFeature}); // 라인 그래픽 배열 추가
				    	}
					}
				};
			});
    	});
    },
    
    removeLineGrp: function(rchId){
    	
    	var me = this;
    	
    	require(["esri/symbols/SimpleLineSymbol",
    	         "esri/Color",
    	         "esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/graphic"], function(SimpleLineSymbol, Color, Query, QueryTask, Graphic){
    		
	    	var queryTaskLine = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL v3
			var queryLine = new Query();
			queryLine.returnGeometry = true;
			queryLine.outFields = ["*"];
			queryLine.where = "RCH_ID = '" + rchId + "'";
			
			// 리치라인 검색
			queryTaskLine.execute(queryLine, function(featureSet){
				
				for(var i = 0; i < featureSet.features.length; i++){
					
					var lineFeature = featureSet.features[i];
					
					if(lineFeature != undefined){
				    	var val = lineFeature.attributes.RCH_ID;
				    	var idx = me.getGrpArrIdx(i, "RCH_ID", val, me.arrLineGrp);
				    	if(idx > -1){
							me.removeGraphics(me.arrLineGrp[idx].grp, "lineGrpLayer"); // 그래픽 삭제
							me.arrLineGrp.splice(idx, 1); // 리치라인 그래픽 배열 삭제
				    	}
					}
				};
			});
    	});
    },
    
    // 그래픽 그리기
    // graphic: 그래픽 오브젝트, layerId: 그래픽 레이어 아이디
    addGraphics: function(graphic, layerId){
    	var me = this;
    	var corMap = GetCoreMap();
    	require(["esri/layers/GraphicsLayer"], function(GraphicsLayer){
    		var gLayer = eval("me." + layerId);
    		//alert(gLayer);
    		if(gLayer == null || gLayer.graphics == undefined){
    			gLayer = new GraphicsLayer();
	        	gLayer.id = layerId;
	        	me.map.addLayer(gLayer);
	        	eval("me." + layerId + " = gLayer");
    		}
    	
    		if(graphic){
    			
    			gLayer.add(graphic);
    			
				if(me.arrAreaGrp.length > 0){
				
	    			// 지점 목록 창 띄우기
	        		Ext.ShowSiteListWindow("selectReach");
	        		// 검색결과 창 띄우기
	        		ShowSearchResultReach("");
	        		// 위치검색 선택영역 그래픽 삭제
	        		corMap.searchLayerAdmin.sourceGraphicLayer.clear();
				}
    		}
    	});
    },
    
    // 그래픽 삭제
    removeGraphics: function(graphic, layerId){
    	
    	var me = this;
    	
    	require(["esri/layers/GraphicsLayer"], function(GraphicsLayer){
    		
    		var gLayer = eval("me." + layerId);
    		
    		if(gLayer != null && gLayer.graphics != undefined){
    			gLayer.remove(graphic);
    		}
    	});
    },
    
    getGrpArrIdx: function(seq, id, val, grpArr){
    	if(grpArr != null && grpArr != undefined){
	    	for(var i = 0; i < grpArr.length; i++){
	    		
	    		var tmpSeq = grpArr[i].seq;
	    		var tmpId = eval("grpArr[i].grp.attributes." + id);
	    		if(tmpSeq == seq && tmpId == val){
	    			return i;
	    		}
	    	}
    	}
    	
    	return -1;
    },
    
    // 그리기 종료
    drawEnd: function(){
    	me = this;
    	
    	if(me.selectionToolbar != undefined && me.selectionToolbar != null){
	    	me.selectionToolbar.deactivate();
	    	me.map.enablePan();
	    	
	    	Ext.get('_mapDiv__gc').setStyle('cursor','default');
    	}
    },
    
    // 시작위치, 끝위치, 리치라인, 집수구역 그래픽 레이어 초기화 (mode : reset: 초기화, redraw: 적용)
    clearGraphicsLayer: function(mode){
    	
    	var me = this;
    	
    	if(me.lineGrpLayer != null && me.lineGrpLayer != undefined){
    		me.lineGrpLayer.clear(); // 리치라인 초기화
    	}
    	if(me.areaGrpLayer != null && me.areaGrpLayer != undefined){
    		me.areaGrpLayer.clear(); // 집수구역 초기화
    	}
    	
    	me.arrLineGrp = []; // 리치라인 그래픽 배열
    	me.arrAreaGrp = []; // 집수구역 그래픽 배열
    	
    	// 초기화일 경우 시작위치, 끝위치 배열 삭제
    	if(mode == "reset"){
    		if(me.pointGrpLayer != null && me.pointGrpLayer != undefined){
    			me.pointGrpLayer.clear(); // 포인트 레이어 초기화
    		}
    		me.arrStartGrp = []; // 시작위치 포인트 그래픽 배열
        	me.arrEndGrp = []; // 끝위치 포인트 그래픽 배열
    	}
    	
    }
    
});