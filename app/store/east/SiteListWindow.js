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
				if(result.features.length == 0){
					return;
				}
				
				var jsonStr = " { \"id\": \"0\", \n";
					jsonStr += "\"text\":  \"root\", \n";
					jsonStr += "\"cls\": 'khLee-x-tree-node-text-bold', \n";
					//jsonStr += "\"iconCls\": 'layerNoneImg', \n";
					jsonStr += "\"checked\": true, \n";
					jsonStr += "\"expanded\": true, \n";
					jsonStr += "\"children\":  \n";
				jsonStr += "[\n";

				var groupCnt = 0;
				var layerCnt = 0;
				
				Ext.each(result, function(objLayer, idx, objLayers){

					var preGubun = "";
					var groupGubun ="";
					var cnt = 0;
					var aa = "";
					//jsonStr += "	\"expanded\": false,\n"; // 펼치기..
					//jsonStr += "\n	\"children\": [";
					
					for(i = 0; i < result.features.length; i++){
						if(result.features[i].attributes.GROUP_CODE != "E"){
							if(result.features[i].attributes.GROUP_CODE != groupGubun ){
								
								if(i != "0"){
									aa = i;
									jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
									jsonStr += "\n]}]}, ";
									
									jsonStr = jsonStr.replace("#groupCnt#", groupCnt); // 그룹 카운트 설정
									groupCnt = 0; // 그룹 카운트 초기화
								}
								
								var queryGroup = new esri.tasks.Query();
								queryGroup.returnGeometry = false;
								//var groupCnt = "0";
								
								jsonStr += "{	\"id\": \"" + result.features[i].attributes.GROUP_CODE + "\",\n";
								jsonStr += "	\"text\": \"" + result.features[i].attributes.GROUP_NM + "(#groupCnt#)\",\n";
								jsonStr += "	\"cls\": 'khLee-x-tree-node-text-bold',\n";
								if(i == 0){
									jsonStr += "	\"expanded\": true,\n";
								}else{
									jsonStr += "	\"expanded\": false,\n";
								}
								//jsonStr += "	\"expanded\": true,\n";
								jsonStr += "	\"checked\": null,\n";
								jsonStr += "	\"children\": [ \n";
							
							}
							
							if(result.features[i].attributes.LAYER_CODE != preGubun){
								if(i > 0){
									if(aa == i){
										jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
									}else{
										jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
										jsonStr += "\n]}, ";
										cnt = i;
									}
	
									jsonStr = jsonStr.replace("#layerCnt#", layerCnt); // 레이어 카운트 설정
									layerCnt = 0; // 레이어 카운트 초기화
								}
								
								jsonStr += "{\n";
								jsonStr += "	\"id\": \"" + result.features[i].attributes.LAYER_CODE + "\",\n";
								jsonStr += "	\"text\": \"" + result.features[i].attributes.LAYER_NM + "(#layerCnt#)\",\n";
								
								if(i == 0 ){
									jsonStr += "	\"expanded\": true,\n"; // 펼치기..
								}else{
									jsonStr += "	\"expanded\": false,\n"; // 펼치기..
								}
								
								jsonStr += "	\"children\": [";
								preGubun = result.features[i].attributes.LAYER_CODE;
								groupGubun = result.features[i].attributes.GROUP_CODE;
							}
							jsonStr += "{\n";
							jsonStr += "		\"id\": \"" + result.features[i].attributes.JIJUM_CODE + "\",\n";
							jsonStr += "		\"text\": \"" + result.features[i].attributes.JIJUM_NM + "\",\n";
							jsonStr += "		\"catDId\": \"" + result.features[i].attributes.CAT_DID + "\",\n";
							jsonStr += "		\"cls\": \"khLee-x-tree-node-text-small\",\n";
							jsonStr += "		\"iconCls\": \"layerNoneImg\",\n";
							jsonStr += "		\"leaf\": true,\n";
							jsonStr += "		\"checked\": null\n";
							jsonStr += "	}, ";
							
							groupCnt++;
							layerCnt++;
						}
					}
				});
				
				jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
				jsonStr += "]}]}]}";
				
				jsonStr = jsonStr.replace("#groupCnt#", groupCnt); // 그룹 카운트 설정
				jsonStr = jsonStr.replace("#layerCnt#", layerCnt); // 레이어 카운트 설정
				
				var jsonData = "";
				jsonData = Ext.util.JSON.decode(jsonStr);
				store.setRootNode(jsonData);

	        });
	  	}
	}
});
