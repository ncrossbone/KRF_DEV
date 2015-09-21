Ext.define('KRF_DEV.store.east.SiteListWindow', {
	
	//extend: 'Ext.data.Store',
	extend: 'Ext.data.TreeStore',/*
	proxy: {
	    type: 'ajax',
	    url: 'resources/data/east/SiteListWindow.json',
	    reader: {
	        type: 'json',
	        root: 'result'
	    }
	},*/

	autoLoad: true,

	remoteSort: true,

	listeners: {
		beforeload: function(store) {
			
			var queryTask = new esri.tasks.QueryTask('http://112.218.1.243:20002/arcgis/rest/services/reach/MapServer/84'); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = "CAT_ID like '1001%'";
			query.outFields = ["*"];
			queryTask.execute(query, function(result){
				console.info(result);
				var jsonStr = "[";
				Ext.each(result.features, function(objLayer, idx, objLayers){
					// 상위 node일때
					
					
					
						jsonStr += "{\n";
						jsonStr += "	\"id\": \"하천수\",\n";
						jsonStr += "	\"text\": \"하천수\",\n";
						jsonStr += "	\"cls\": "+'"'+"khLee-x-tree-node-text-bold"+'"'+",\n";
						jsonStr += "	\"iconCls\": 'layerNoneImg',\n";
						jsonStr += "	\"checked\": false,\n";
						
						// children node가 있을때
						if(objLayer != null){
							jsonStr += "	\"expanded\": false,\n"; // 펼치기..
							jsonStr += "\n	\"children\": [";
							for(i = 0; i < result.features.length; i++){
								jsonStr += "{\n";
								jsonStr += "		\"id\": \"" + result.features[i].attributes.CAT_ID + "\",\n";
								jsonStr += "		\"text\": \"" + result.features[i].attributes.JIJUM_NM + "\",\n";
								jsonStr += "		\"cls\": "+'"'+"khLee-x-tree-node-text-small-nounder"+'"'+",\n";
								jsonStr += "		\"iconCls\": "+'"'+"layerIconSize layer"+result.features[i].attributes.CAT_ID+'"'+",\n";
								jsonStr += "		\"leaf\": true,\n";
								jsonStr += "		\"checked\": false\n";
								jsonStr += "	}, ";
								if(i == result.features.length - 1){
									jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
									jsonStr += "]\n}, ";
								}
							}
						}
						// children node가 없을때
						else{
							jsonStr += "	\"leaf\": true"; 
							jsonStr += "\n}, "
						}
					
					
					
					/*if(objLayer.parentLayerId == -1){
						jsonStr += "{\n";
						jsonStr += "	\"id\": \"" + objLayer.id + "\",\n";
						jsonStr += "	\"text\": \"" + objLayer.name + "\",\n";
						jsonStr += "	\"cls\": "+'"'+"khLee-x-tree-node-text-bold"+'"'+",\n";
						jsonStr += "	\"iconCls\": 'layerNoneImg',\n";
						jsonStr += "	\"checked\": false,\n";
						
						// children node가 있을때
						if(objLayer.subLayerIds != null){
							jsonStr += "	\"expanded\": false,\n"; // 펼치기..
							jsonStr += "\n	\"children\": [";
							for(i = 0; i < objLayer.subLayerIds.length; i++){
								jsonStr += "{\n";
								jsonStr += "		\"id\": \"" + objLayers[objLayer.subLayerIds[i]].id + "\",\n";
								jsonStr += "		\"text\": \"" + objLayers[objLayer.subLayerIds[i]].name + "\",\n";
								jsonStr += "		\"cls\": "+'"'+"khLee-x-tree-node-text-small-nounder"+'"'+",\n";
								jsonStr += "		\"iconCls\": "+'"'+"layerIconSize layer"+objLayers[objLayer.subLayerIds[i]].id+'"'+",\n";
								jsonStr += "		\"leaf\": true,\n";
								jsonStr += "		\"checked\": false\n";
								jsonStr += "	}, ";
								if(i == objLayer.subLayerIds.length - 1){
									jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
									jsonStr += "]\n}, ";
								}
							}
						}
						// children node가 없을때
						else{
							jsonStr += "	\"leaf\": true"; 
							jsonStr += "\n}, "
						}
					}
					*/
				});
				
				jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
				jsonStr += "]";
				
				var jsonData = "";
				jsonData = Ext.util.JSON.decode(jsonStr);
				store.setData(jsonData);
				//store.setData(JSON.parse(jsonStr));
				console.info("khLee");
	        });
	  	}
	}
});
