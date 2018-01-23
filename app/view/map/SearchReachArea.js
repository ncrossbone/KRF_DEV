/* 검색설정 상류 체크 시 이벤트지점부터 상류 무조건 검색
 * 중권역, 댐/보 체크 */
Ext.define("KRF_DEV.view.map.SearchReachArea", {
	getFeaturesWithEvent: function(evt, callbackMethod){
		
		require(["esri/tasks/query",
	         "esri/tasks/QueryTask",
	         "esri/geometry/Point",
	         "esri/geometry/Extent"], function(Query, QueryTask, Point, Extent){
			
			if(evt.type == "point"){
				
	        	var centerPoint = new Point(evt.x, evt.y, evt.spatialReference);
	        	var mapWidth = _krad.map.extent.getWidth();
	        	var pixelWidth = mapWidth / _krad.map.width;
	        	var tolerance = 10 * pixelWidth;
	        	
	        	var queryExtent = new Extent(1, 1, tolerance, tolerance, evt.spatialReference);
	        	
	        	evt = queryExtent.centerAt(centerPoint);
	    	}
			
			var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachAreaLayerId); // 집수구역 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			console.info("3");
			query.geometry = evt;
			
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length == 0){
					
					//console.info("해당 위치에 집수구역이 존재하지 않습니다. 하단 query를 확인하세요.");
					//console.info(query);
				}
				
				callbackMethod(featureSet.features);
			});
		});
	},
	getFeaturesWithWhere: function(where, callbackMethod){
		
		require(["esri/tasks/query",
	         "esri/tasks/QueryTask"], function(Query, QueryTask){
			
			var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachAreaLayerId); // 집수구역 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			console.info("4");
			query.where = where;
			
			// 리치라인 조회
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length == 0){
					
					//console.info("해당 조건의 집수구역이 존재하지 않습니다. 하단 조건을 확인하세요.");
					//console.info(where);
				}
				
				callbackMethod(featureSet.features);
			});
		});
	}
});