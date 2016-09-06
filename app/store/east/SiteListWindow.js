Ext.define('KRF_DEV.store.east.SiteListWindow', {
	//extend: 'Ext.data.Store',
	extend: 'Ext.data.TreeStore',
	/*
	proxy: {
	    type: 'ajax',
	    url: 'resources/data/east/SiteListWindow.json',
	    reader: {
	        type: 'json',
	        root: 'result'
	    }
	},*/

	//autoLoad: true,

	searchType: '',
	remoteSort: true,
	
	listeners: {
		
		load: function(store) {
			
			var a = Ext.getCmp("btnADMSelect");
			
			var nameInfo = Ext.getCmp("textSearchText");
			
			//대권역
			var buttonInfo1 = Ext.getCmp("cmbWater1");
			
			//중권역
			var buttonInfo2 = Ext.getCmp("cmbWater2");
			
			//소권역
			var buttonInfo3 = Ext.getCmp("cmbWater3");
			
			//시도
			var amdBtn1 = Ext.getCmp("cmbArea1");
			
			//시군구
			var amdBtn2 = Ext.getCmp("cmbArea2");
			
			//읍변동
			var amdBtn3 = Ext.getCmp("cmbArea3");
			
			var startPoint = Ext.getCmp("textSearchText_Start");
			var endPoint = Ext.getCmp("textSearchText_End");
			
			
			//http://cetech.iptime.org:6080/arcgis/rest/services/Layer2/MapServer
			//var queryTask = new esri.tasks.QueryTask('http://112.218.1.243:20002/arcgis/rest/services/reach/MapServer/84'); // 레이어 URL
			//var queryTask = new esri.tasks.QueryTask('http://cetech.iptime.org:6080/arcgis/rest/services/reach/MapServer/84'); // 레이어 URL
			//var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + '/' + _siteInfoLayerId); // 레이어 URL v2
			var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + '/' + _siteInfoLayerId); // 레이어 URL v3
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			
			if(buttonInfo1.lastValue != null){
				if(buttonInfo3.lastValue == null || buttonInfo3.lastValue == "" ){
					query.where = "CAT_DID like '"+buttonInfo2.lastValue+"%'";
				}else{
					query.where = "CAT_DID like '"+buttonInfo3.lastValue+"%'";
				}

			}else if(buttonInfo1.lastValue == null && startPoint.rawValue == "" && endPoint.rawValue == "" && nameInfo.rawValue == "" ){
				if(amdBtn2.lastValue == null){
					query.where = "ADM_CD like '"+amdBtn1.lastValue+"%'";
				}else if(amdBtn2.lastValue != null && amdBtn3.lastValue == null){
					query.where = "ADM_CD like '"+amdBtn2.lastValue.substring(0,5)+"%'";
				}else{    
					query.where = "ADM_CD like '"+amdBtn3.lastValue.substring(0,7)+"%'";

				}
				//query.where = "JIJUM_NM like '"+start.rawValue+"%'";
			}else if(buttonInfo1.lastValue == null && amdBtn1.lastValue == null  && startPoint.rawValue == "" && endPoint.rawValue == "" ){
				query.where = "JIJUM_NM like '"+nameInfo.rawValue+"%'";
			}else{
				if(endPoint.rawValue == ""){
					query.where = "JIJUM_NM like '"+startPoint.rawValue+"%'";
				}else{
					query.where = "JIJUM_NM like '"+endPoint.rawValue+"%'";
				}

			}
			
			if(store.searchType == "selectReach"){
				/* 리치모드 지점목록 조건 설정 */
				var me = GetCoreMap();
				
				if(me.reachLayerAdmin_v3_New.arrAreaGrp.length > 0){
					var reachBtn = Ext.getCmp("btnModeReach");
					
						
						query.where = "CAT_DID IN ("; 
						
						for(var i = 0; i < me.reachLayerAdmin_v3_New.arrAreaGrp.length; i++){
							
							//console.info(me.reachLayerAdmin_v3_New.arrAreaGrp[i].attributes.CAT_DID);
							query.where += "'" + me.reachLayerAdmin_v3_New.arrAreaGrp[i].attributes.CAT_DID + "', ";
						}
						
						query.where = query.where.substring(0, query.where.length - 2);
						query.where += ")";
					//}
				}
				else{
					return;
				}
			}
			
			query.outFields = ["*"];
			
			queryTask.execute(query, function(result){
				
				var jsonStr = "{\n";
				jsonStr += "	\"id\": \"0\", \n";
				jsonStr += "	\"text\":  \"root\", \n";
				jsonStr += "	\"cls\": 'khLee-x-tree-node-text-bold', \n";
				jsonStr += "	\"checked\": true, \n";
				jsonStr += "	\"expanded\": true, \n";
				jsonStr += "	\"children\": [";
				
				// 부하량 Json String 가져오기 khLee 20160823 추가
				var pollLoadString = store.getPollLoadString();
				
				if(result.features.length == 0){
					
					if(pollLoadString != ""){
						
						jsonStr += pollLoadString;
						jsonStr += "]\n";
						jsonStr += "}";
						
						var jsonData = "";
						jsonData = Ext.util.JSON.decode(jsonStr);
						store.setRootNode(jsonData);
					}
					
					return;
				}

				/* 중복 제거한 그룹 코드 배열에 넣기 (arrGroupCodes) */
				var arrGroupCodes = [];
				
				$.each(result.features, function(cnt, feature){
					
					// "==="연산자 값과 타입이 정확하게 일치하는지 판단
					if($.inArray(feature.attributes.GROUP_CODE, arrGroupCodes) === -1){
						
						arrGroupCodes.push(feature.attributes.GROUP_CODE);
					}
				});
				
				//console.info(arrGroupCodes);
				/* 중복 제거한 그룹 코드 배열에 넣기 (arrGroupCodes) 끝 */
				
				// 그룹 코드 루프 시작
				$.each(arrGroupCodes, function(cnt, groupCode){
				
					/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) */
					var groupFeature = result.features.filter(function(feature){
						
						if(feature.attributes.GROUP_CODE === groupCode)
							return feature;
					});
					
					//console.info(groupFeature);
					/* 필터링된 그룹 코드 각각에 해당하는 feature가져오기 (groupFeature) 끝 */
					
					jsonStr += "{\n";
					jsonStr += "		\"id\": \"" + groupFeature[0].attributes.GROUP_CODE + "\",\n";
					jsonStr += "		\"text\": \"" + groupFeature[0].attributes.GROUP_NM + "(" + groupFeature.length + ")\",\n";
					jsonStr += "		\"cls\": \"khLee-x-tree-node-text-bold\",\n";
					if(cnt == 0){
						jsonStr += "		\"expanded\": true,\n";
					}else{
						jsonStr += "		\"expanded\": false,\n";
					}
					jsonStr += "		\"checked\": null,\n";
					jsonStr += "		\"children\": [";
					
					/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) */
					var arrLayerCodes = [];
					
					$.each(groupFeature, function(cnt, feature){
						
						if($.inArray(feature.attributes.LAYER_CODE, arrLayerCodes) === -1){
							
							arrLayerCodes.push(feature.attributes.LAYER_CODE);
						}
					});
					/* 해당 그룹코드 내에서 중복제거한 레이어코드 배열에 넣기 (arrLayerCodes) 끝 */
					
					// 레이어 코드 루프 시작
					$.each(arrLayerCodes, function(cnt, layerCode){
						
						var layerFeatures = groupFeature.filter(function(feature){
							
							if(feature.attributes.LAYER_CODE === layerCode){
								
								return feature;
							}
						});
						
						//console.info(layerFeatures);
						
						jsonStr += "{\n";
						jsonStr += "			\"id\": \"" + layerFeatures[0].attributes.LAYER_CODE + "\",\n";
						jsonStr += "			\"text\": \"" + layerFeatures[0].attributes.LAYER_NM + "(" + layerFeatures.length + ")\",\n";
						if(cnt == 0 ){
							jsonStr += "			\"expanded\": true,\n"; // 펼치기..
						}else{
							jsonStr += "			\"expanded\": false,\n"; // 펼치기..
						}
						jsonStr += "			\"children\": [";
						
						$.each(layerFeatures, function(cnt, layerFeature){
							
							jsonStr += "{\n";
							jsonStr += "				\"id\": \"" + layerFeature.attributes.JIJUM_CODE + "\",\n";
							jsonStr += "				\"text\": \"" + layerFeature.attributes.JIJUM_NM + "\",\n";
							jsonStr += "				\"catDId\": \"" + layerFeature.attributes.CAT_DID + "\",\n";
							jsonStr += "				\"cls\": \"khLee-x-tree-node-text-small\",\n";
							jsonStr += "				\"iconCls\": \"layerNoneImg\",\n";
							jsonStr += "				\"leaf\": true,\n";
							jsonStr += "				\"checked\": null\n";
							jsonStr += "			}, ";
						});
						
						jsonStr = jsonStr.substring(0, jsonStr.length - 2);
						
						jsonStr += "]\n";
						jsonStr += "		}, ";
					}); // 레이어 코드 루프 끝
					
					jsonStr = jsonStr.substring(0, jsonStr.length - 2);
					
					jsonStr += "]\n";
					jsonStr += "	}, ";
				}); // 그룹 코드 루프 끝
				
				if(pollLoadString != ""){
					
					jsonStr += pollLoadString;
				}
				else{
					
					jsonStr = jsonStr.substring(0, jsonStr.length - 2);
				}
				
				jsonStr += "]\n";
				jsonStr += "}";
				
				//console.info(jsonStr);
				
				var jsonData = "";
				jsonData = Ext.util.JSON.decode(jsonStr);
				store.setRootNode(jsonData);
	        });
	  	}
	},
	
	getPollLoadString: function(){
		
		//alert("dd");
		//, {\"id\": \"Z001\", \"text\": \"부하량\", \"expanded\": false, \"children\": [{\"id\": \"111111111\", \"text\": \"111111111\", \"catDId\": \"111111111\", \"cls\": \"khLee-x-tree-node-text-small\", \"iconCls\": \"layerNoneImg\", \"leaf\": true, \"checked\": null}]}
		var me = GetCoreMap();
		
		if(me.reachLayerAdmin_v3_New.arrAreaGrp.length > 0){
			//showTmdlTMLayer
			var pollLoadString = "{\n";
			pollLoadString += "	\"id\": \"pollLoad\",\n";
			pollLoadString += "	\"text\": \"<span style='vertical-align:top;'>부하량</span>";
			pollLoadString += " <span style='vertical-align:middle;'>&nbsp;&nbsp;";
			pollLoadString += " <a style='vertical-align:bottom;' href='javascript:catTMLayerOnOff();'>";
			pollLoadString += " <img id='catTMOnOff' width='28' height='15' src='./resources/images/button/tmPollLoad_on.png' />";
			pollLoadString += " </a>";
			pollLoadString += " </span>\",\n";
			pollLoadString += "	\"cls\": \"khLee-x-tree-node-text-bold\",\n";
			pollLoadString += "	\"expanded\": false,\n";
			pollLoadString += "	\"checked\": null,\n";
			pollLoadString += "	\"infoBtnDisabled\": true,\n";
			pollLoadString += "	\"chartBtnDisabled\": true,\n";
			pollLoadString += "	\"srchBtnDisabled\": false,\n";
			pollLoadString += "	\"children\": [{\n";
			
			pollLoadString += "		\"id\": \"pollLoadCat\",\n";
			pollLoadString += "		\"text\": \"집수구역별(" + me.reachLayerAdmin_v3_New.arrAreaGrp.length + ")\",\n"; // 집수구역별 조회 개수 집어넣자.. 아래서..
			pollLoadString += "		\"expanded\": false,\n";
			pollLoadString += "		\"infoBtnDisabled\": true,\n";
			pollLoadString += "		\"chartBtnDisabled\": true,\n";
			pollLoadString += "		\"srchBtnDisabled\": true,\n";
			pollLoadString += "		\"children\": [";
			
			pollLoadString += "#pollLoadChildString#"; // 조회된 집수구역 문자열 집어넣자.. 아래서..
			
			pollLoadString += "]\n";
			
			pollLoadString += "	}]\n";
			pollLoadString += "}";
			
			var pollLoadChildString = "";
			
			for(var i = 0; i < me.reachLayerAdmin_v3_New.arrAreaGrp.length; i++){
				
				//console.info( me.reachLayerAdmin_v3_New.arrAreaGrp.length);
				
				pollLoadChildString += "{\n";
				pollLoadChildString += "			\"id\": \"" + me.reachLayerAdmin_v3_New.arrAreaGrp[i].attributes.CAT_DID + "\",\n";
				pollLoadChildString += "			\"text\": \"" + me.reachLayerAdmin_v3_New.arrAreaGrp[i].attributes.CAT_DID + "\",\n";
				pollLoadChildString += "			\"catDId\": \"" + me.reachLayerAdmin_v3_New.arrAreaGrp[i].attributes.CAT_DID + "\",\n";
				pollLoadChildString += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
				pollLoadChildString += "			\"iconCls\": \"layerNoneImg\",\n";
				pollLoadChildString += "			\"leaf\": true,\n";
				pollLoadChildString += "			\"checked\": null,\n";
				pollLoadChildString += "			\"infoBtnDisabled\": true,\n";
				pollLoadChildString += "			\"chartBtnDisabled\": true,\n";
				pollLoadChildString += "			\"srchBtnDisabled\": true,\n";
				pollLoadChildString += "		}, ";
			}
			
			pollLoadChildString = pollLoadChildString.substring(0, pollLoadChildString.length - 2);
			
			pollLoadString = pollLoadString.replace("#pollLoadChildString#", pollLoadChildString);
			
			//console.info(pollLoadString);
			
			return pollLoadString;
		}
		else{
			
			return "";
		}
	},
});
