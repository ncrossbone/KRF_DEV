Ext.define('KRF_DEV.store.drone.FeatureStoreLayerAdmin4', {
	//extend: 'Ext.data.Store',
	extend: 'Ext.data.Store',
	
	fields: [
	         'layerNm',
	         'layerCd',
	         'tmX',
	         'tmY'
	     ],

	//autoLoad: true,

	searchType: '',
	remoteSort: true,
	
	listeners: {
		load: function(map) {
			var me = this;
		    me.map = map;
		    console.info();
		    //console.info("dd");
		 // store에서 맵서비스 URL 가져오기
	        var store = Ext.create('KRF_DEV.store.drone.AppVariable');
	    	store.load(function(){
			    this.each(function(record, cnt, totCnt){
			    
				var queryTask = new esri.tasks.QueryTask(record.get('MapserviceUrl1') + "/" + Ext.featureLayerId); // 레이어 
				var query = new esri.tasks.Query();
				query.returnGeometry = true;
				
				query.where = "수계코드 = 30";
				query.outFields = ["*"];
				
				queryTask.execute(query,  function(results){
					//console.info(results);
					
					var jsonStr = "";
						jsonStr += "	 {\"data\": [	";
							for(var layerNum = 0 ; layerNum < results.features.length ; layerNum++ ){
								//console.info(layerNum);
								jsonStr +=  " {  \"layerNm\"  :	 \""+results.features[layerNum].attributes.측정소명+ "\" ,  	\n";
								jsonStr +=  "   \"layerCd\"  :	 \""+results.features[layerNum].attributes.측정소코드+ "\" ,  	\n";
								jsonStr +=  "   \"tmX\"  :	 \""+results.features[layerNum].attributes.TM_X+ "\" ,  	\n";
								jsonStr +=  "   \"level\"  :	 \"30\" ,  	\n";
								jsonStr +=  "   \"tmY\"  :	 \""+results.features[layerNum].attributes.TM_Y+ "\" }  	\n";
								
								if(results.features.length != layerNum){
									if(results.features.length - 1 == layerNum){
										jsonStr += " ";
									}else{
										jsonStr += " , ";
									}
									
								}
								
							}
							
						jsonStr += "]}";
						
						var jsonData = "";
						jsonData = Ext.util.JSON.decode(jsonStr);
						me.map.setData(jsonData.data);
						for(var i = 0 ;  i < jsonData.data.length ; i++){
							Ext.goldBoListStore.push(jsonData.data[i]);
							Ext.goldBoListStores.push(jsonData.data[i].layerNm)
						}
						var cmbDrone5 = Ext.getCmp('cmbDrone5');
						cmbDrone5.setStore(Ext.goldBoListStores);
				});
				
			    
				queryTask.on("complete", function(featureSet) {
					
				 });
			   });
	    	});
		}
	}
});//
