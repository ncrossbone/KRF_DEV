Ext.define('KRF_DEV.view.map.LabelLayerAdmin', {
	map:null, 
	graphicsLayer:null,
	bodDatas:null,
	codDatas:null,
	
	constructor: function(map) {
		var me = this;
		me.map = map;
		me.graphicsLayer = new esri.layers.GraphicsLayer();
		me.graphicsLayer.id = 'labelGraphics';
		
		var queryTask = new esri.tasks.QueryTask("http://112.218.1.243:20002/arcgis/rest/services/reach_test/MapServer/16");
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		query.where = "1=1";
		query.outFields = ["*"];
		queryTask.execute(query,  function(results){
			bodDatas = results.features;
		});
		
		var queryTask2 = new esri.tasks.QueryTask("http://112.218.1.243:20002/arcgis/rest/services/reach_test/MapServer/17");
		var query2 = new esri.tasks.Query();
		query2.returnGeometry = false;
		query2.where = "1=1";
		query2.outFields = ["*"];
		queryTask2.execute(query2,  function(results){
			codDatas = results.features;
		});
		
		dojo.connect(me.map, "onExtentChange", function(extent){
			me.graphicsLayer.clear();
			if(me.map.getLevel()>8){
				var queryTask = new esri.tasks.QueryTask("http://112.218.1.243:20002/arcgis/rest/services/reach/MapServer/1");
				var query = new esri.tasks.Query();
				query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
				query.returnGeometry = true;
				query.outSpatialReference = {"wkid":102100};
				query.geometry = extent;
				query.outFields = ["측정소코드"];
				queryTask.execute(query,  function(results){
					console.log(results.features.length);
				});
				dojo.connect(queryTask, "onError", function(err) {
					finishMode();
				});
			}
			
		});
	}
});