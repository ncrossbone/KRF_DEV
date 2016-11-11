Ext.define('KRF_DEV.store.krad.krad_tmp', {
	
	//extend: 'Ext.data.TreeStore',
	extend : 'Ext.data.Store',

	autoLoad: true,
	
	fields: [],
	
	proxy: {
		type: 'ajax',
		url: 'resources/data/krad/krad_tmp.json',
		reader: {
			type: 'json'
		}
	},
	
	constructor: function(){
		this.callParent();
	},
	
	listeners: {
		// beforeload, load, afterload
		load: function(store) {
			
			return;
			/*var queryTask = new esri.tasks.QueryTask(_kradMapserviceUrl+"/"+_kradCatExtDataInfo); // 레이어 URL v3 + krad
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = "1=1 ";
			query.outFields = ["*"];
			queryTask.execute(query, function(result){
				var data = result.features;
				var kradData = [];
				
				Ext.each(data, function(media, index) {
					
					//var idVal = eval('media.attributes.' + idColumn);
					
					var extDataId = media.attributes.EXT_DATA_ID;
					var title = media.attributes.TITLE;
					var exdesctDataId = media.attributes.EXDESCT_DATA_ID;
					var cat = media.attributes.CAT;
					var startRchId = media.attributes.START_RCH_ID;
					var endRchId = media.attributes.END_RCH_ID;
					var rchVer = media.attributes.RCH_VER;
					var creationDate = media.attributes.CREATION_DATE;
					var expireDate = media.attributes.EXPIRE_DATE;
					var ulBndrX = media.attributes.UL_BNDR_X;
					var ulBndrY = media.attributes.UL_BNDR_Y;
					var lrBndrX = media.attributes.LR_BNDR_X;
					var lrBndrY = media.attributes.LR_BNDR_Y;
					var coordSys = media.attributes.COORD_SYS;
					var metaId = media.attributes.META_ID;
					var dataSession = media.attributes.DATA_SESSION;
					var shp = media.attributes.SHP;
					var cmd = media.attributes.CMD;
					
					kradData.push({EXT_DATA_ID: extDataId, TITLE: title ,EXDESCT_DATA_ID: exdesctDataId
						,CAT:cat , START_RCH_ID:startRchId , END_RCH_ID:endRchId , RCH_VER:rchVer , 
						CREATION_DATE:creationDate , EXPIRE_DATE:expireDate , UL_BNDR_X:ulBndrX , 
						UL_BNDR_Y:ulBndrY , LR_BNDR_X:lrBndrX , LR_BNDR_Y:lrBndrY , COORD_SYS:coordSys,META_ID:metaId
						,DATA_SESSION:dataSession , CMD: cmd, SHP: shp });
					
					store.setData(kradData);	
				});
				
			})*/
				
		}
	}
});
