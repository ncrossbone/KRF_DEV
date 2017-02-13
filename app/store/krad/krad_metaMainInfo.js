Ext.define('KRF_DEV.store.krad.krad_metaMainInfo', {
	
	//extend: 'Ext.data.TreeStore',
	extend : 'Ext.data.Store',
	fields: [
				'title',
				'expireDay',
				'desc'
	    ],
	autoLoad: true,
	
	listeners: {
		// beforeload, load, afterload
		load: function(store) {
	
			var queryTask = new esri.tasks.QueryTask(_kradMapserviceUrl+"/"+_kradCatExtDataInfo); // METADATA
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = "EXT_DATA_ID =  '"+store.extDataId+"'"; //+store.extDataId+"'"
			query.outFields = ["*"];
			//console.info(_kradMapserviceUrl+"/"+_kradCatExtDataInfo);
			//console.info(query.where);
			queryTask.execute(query, function(result){

				if(result.features.length == 0){
					return;
				}
				
				var kradMetaData = []; 
				var data = result.features[0].attributes;
				
				
				
				kradMetaData.push({title:data.TITLE, expireDay: data.EXPIRE_DAY, desc: data.DESC});
				
				
				store.setData(kradMetaData);
			})
			
		}
	}
});
