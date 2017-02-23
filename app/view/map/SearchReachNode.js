/* 검색설정 상류 체크 시 이벤트지점부터 상류 무조건 검색
 * 중권역, 댐/보 체크 */
Ext.define("KRF_DEV.view.map.SearchReachNode", {
	getFeaturesWithWhere: function(where, callbackMethod){
		
		require(["esri/tasks/query",
	         "esri/tasks/QueryTask"], function(Query, QueryTask){
			
			var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachNodeLayerId); // 집수구역 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			query.where = where;
			
			// 리치라인 조회
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length == 0){
					
					//console.info("해당 조건의 리치노드가 존재하지 않습니다. 하단 조건을 확인하세요.");
					//console.info(where);
				}
				
				callbackMethod(featureSet.features);
			});
		});
	}
});