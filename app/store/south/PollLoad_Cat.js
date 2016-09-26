Ext.define('KRF_DEV.store.south.PollLoad_Cat', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	//autoLoad: true, // controller(onAreaChange)에서 store.load();
	async : false,
	//remoteSort: true,
	
	
	listeners: {
		// beforeload, load, afterload
		load: function(store) {
				var catDids = [];
				
				console.info(store.swNm);
				
				
			var queryTask = new esri.tasks.QueryTask("http://112.217.167.123:20002/arcgis/rest/services/reach_V3_TM/MapServer/1"); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = "SB_NM = '"+store.swNm+"'";
			query.outFields = ["*"];
			
			queryTask.execute(query,  function(results){
				
				for(var i = 0 ; i < results.features.length ; i++){
					console.info(results.features[i].attributes.CAT_DID);
					catDids.push(results.features[i].attributes.CAT_DID);
				}
				
				var data = results.features;
				
			});
				
			console.info(catDids);
				
        }
    }
});
