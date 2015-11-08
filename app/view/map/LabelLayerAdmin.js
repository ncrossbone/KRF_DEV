Ext.define('KRF_DEV.view.map.LabelLayerAdmin', {
	map:null, 
	graphicsLayer:null,
	bodDatas:null,
	codDatas:null,
	font:null,
	selectType:null,
	
	constructor: function(map) {
		var me = this;
		me.map = map;
		me.font = new esri.symbol.Font("12px", esri.symbol.Font.STYLE_NORMAL, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLDER);
		me.graphicsLayer = new esri.layers.GraphicsLayer();
		me.graphicsLayer.id = 'labelGraphics';
		me.map.addLayer(me.graphicsLayer);
		
		//ash rdbms에서 읽어오게 할 수 있습니다.
		var queryTask = new esri.tasks.QueryTask("http://112.218.1.243:20002/arcgis/rest/services/reach_test/MapServer/16");
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		query.where = "1=1";
		query.outFields = ["*"];
		queryTask.execute(query,  function(results){
			me.bodDatas = results.features;
		});
		
		var queryTask2 = new esri.tasks.QueryTask("http://112.218.1.243:20002/arcgis/rest/services/reach_test/MapServer/17");
		var query2 = new esri.tasks.Query();
		query2.returnGeometry = false;
		query2.where = "1=1";
		query2.outFields = ["*"];
		queryTask2.execute(query2,  function(results){
			me.codDatas = results.features;
		});
		
		dojo.connect(me.map, "onExtentChange", function(extent){
			me.renderLabel(extent);
		});
		
		KRF_DEV.getApplication().addListener('selectMapDisplayType', me.selectMapDisplayTypeHandler, me);
	},
	
	selectMapDisplayTypeHandler:function(val){
		var me = this;
		me.selectType = val;
		me.renderLabel();
	},
	
	renderLabel:function(extent){
		var me = this;
		var searchDatas;
		if(!extent){
			extent = me.map.extent;
		}
		me.graphicsLayer.clear();
		if(!me.selectType || (me.selectType!='BOD' && me.selectType!='COD')){
			return;
		}else{
			if(me.selectType=='BOD'){
				searchDatas = me.bodDatas;
			}else if(me.selectType=='COD'){
				searchDatas = me.codDatas;
			}else{
				return;
			}
		}
		
		if(me.map.getLevel()>11){
			var queryTask = new esri.tasks.QueryTask("http://112.218.1.243:20002/arcgis/rest/services/reach/MapServer/1");
			var query = new esri.tasks.Query();
			query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
			query.returnGeometry = true;
			query.outSpatialReference = {"wkid":102100};
			query.geometry = extent;
			query.outFields = ["측정소코드"];
			queryTask.execute(query,  function(results){
				for(var i=0; i<results.features.length; i++){
					var feature = results.features[i];
					var result = JSLINQ(searchDatas)
			    	 .Where(function (item) { 
			    		 if(feature.attributes.측정소코드 == item.attributes.PT_NO){
			    			 return true;
			    		 }
			    	  })
			    	 .ToArray();
					if(result.length>0){
			  			var tsm = new esri.symbol.TextSymbol(result[0].attributes.VAL, me.font).setOffset(0, -22);
			  			tsm.color = new dojo.Color("#ff0000");
			  			feature.setSymbol(tsm);
			  			me.graphicsLayer.add(feature);
					}
				}
				
			});
			dojo.connect(queryTask, "onError", function(err) {
				
			});
		}
	}
});