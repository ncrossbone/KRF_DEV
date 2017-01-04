Ext.define('KRF_DEV.store.krad.krad_metaInfo', {
	
	//extend: 'Ext.data.TreeStore',
	extend : 'Ext.data.Store',
	fields: [
				'initOrganization',
				'initOriginator',
				'initDay',
				'initContact',
				'updOrganization',
				'updOriginator',
				'updDay',
				'updContact'
	    ],
	autoLoad: true,
	
	listeners: {
		// beforeload, load, afterload
		load: function(store) {
	
			var queryTask = new esri.tasks.QueryTask(_kradMapserviceUrl+"/"+_kradCatExtMetaData); // EXT_METADATA
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = "EXT_DATA_ID =  '"+store.extDataId+"'"; //+store.extDataId+"'"
			query.outFields = ["*"];
			queryTask.execute(query, function(result){
				
				
				if(result.features.length == 0){
					return;
				}
				
				var kradMetaData = []; 
				var data = result.features[0].attributes;
				
				
				kradMetaData.push({initOrganization : data.INIT_ORGANIZATION, initOriginator: data.INIT_ORIGINATOR,
					initDay: data.INIT_DAY, updOrganization: data.UPD_ORGANIZATION, updOriginator: data.UPD_ORIGINATOR, updDay: data.UPD_DAY,
					updContact: data.UPD_CONTACT, initContact: data.INIT_CONTACT});
				
				
				store.setData(kradMetaData);
			})
			
		}
	}
});
