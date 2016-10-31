Ext.define('KRF_DEV.store.east.KradListWindow', {
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
	catDid: [],
	
	listeners: {
		
		load: function(store) {
			console.info(store.param);
				
			
				var confInfo = localStorage['_kradExtInfo_'];
				var jsonConf = JSON.parse(confInfo);
				console.info(jsonConf);
			
				
				var jsonStr = "{\n";
				jsonStr += "	\"id\": \"0\", \n";
				jsonStr += "	\"text\":  \"root\", \n";
				jsonStr += "	\"cls\": 'khLee-x-tree-node-text-bold', \n";
				jsonStr += "	\"checked\": true, \n";
				jsonStr += "	\"expanded\": true, \n";
				jsonStr += "	\"children\": [";
				jsonStr += "{\n";
				jsonStr += "	\"id\": \"krad\",\n";
				jsonStr += "	\"text\": \"krad\",\n";
				jsonStr += "	\"cls\": \"khLee-x-tree-node-text-bold\",\n";
				jsonStr += "	\"expanded\": false,\n";
				jsonStr += "	\"checked\": null,\n";
				jsonStr += "	\"infoBtnDisabled\": true,\n";
				jsonStr += "	\"chartBtnDisabled\": true,\n";
				jsonStr += "	\"srchBtnDisabled\": false,\n";
				jsonStr += "	\"children\": [\n";
				for(var i =0 ;i < jsonConf.length;i++){
					console.info(i);
					console.info(jsonConf[i].TITLE);
					jsonStr += "		{ ";
					jsonStr += "		\"id\": \"" + jsonConf[i].EXT_DATA_ID + "\",\n";
					jsonStr += "		\"text\": \"" + jsonConf[i].TITLE + "\",\n"; // 집수구역별 조회 개수 집어넣자.. 아래서..
					jsonStr += "		\"expanded\": false,\n";
					jsonStr += "		\"infoBtnDisabled\": true,\n";
					jsonStr += "		\"chartBtnDisabled\": true,\n";
					jsonStr += "		\"srchBtnDisabled\": true,\n";
					jsonStr += "		\"children\": false\n";
					jsonStr += "}\n";
					if(i != jsonConf.length-1){
						jsonStr += ",\n";
					}
				}
				
				jsonStr += "]\n";
				jsonStr += "}]}";
				
				console.info(jsonStr);
				
				var jsonData = "";
				jsonData = Ext.util.JSON.decode(jsonStr);
				store.setRootNode(jsonData);
	        }
	  	}
});
