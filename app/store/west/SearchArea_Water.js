Ext.define('KRF_DEV.store.west.SearchArea_Water', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	//autoLoad: true, // controller(onAreaChange)에서 store.load();

	remoteSort: true,
	
	parentId: '',
	
	layerId: '', // 레이어 아이디

	listeners: {
		// beforeload, load, afterload
		beforeload: function(store) {
			
			// Ext.defer(function() { 
			// defer : 미루다, 연기하다
			// Ext.defer(function(){...}, 1000, this); // function 내 코드를 1초(1000ms)후에 실행한다.
				
				var idColumn, nameColumn, whereStr;
				console.info(store);
				idColumn = "";
				
				if(store.layerId == '52'){ idColumn = "WS_CD"; nameColumn = "대권역"; whereStr = "1=1" }
				if(store.layerId == '53'){ idColumn = "MBSNCD"; nameColumn = "MBSNNM"; whereStr = idColumn + " = '" + store.parentADMCD + "%'"}
				//if(store.layerId == '54'){ nameColumn = "DONG_NM"; whereStr = "WS_CD LIKE '" + store.parentADMCD.substring(0,4) + "%'"}
				//alert(store.layerId);
				// id, name 셋팅이 안돼있으면 리턴
				if(idColumn == undefined || nameColumn == undefined || whereStr == undefined)
					return;
				
				var queryTask = new esri.tasks.QueryTask(KRF_DEV.app.layer1Url + store.layerId); // 레이어 URL
				var query = new esri.tasks.Query();
				query.returnGeometry = false;
				query.where = whereStr;
				query.outFields = ["*"];
				
				queryTask.execute(query,  function(results){
					var data = results.features;
					data.sort(function(a,b){
						
						var aVal = eval('a.attributes.' + nameColumn);
						var bVal = eval('b.attributes.' + nameColumn);
						
						if(aVal > bVal){ return 1; }
						else if(aVal < bVal){ return -1; }
						else{ return 0; }
						
					});
					
					var receiveData = [];
					
					Ext.each(data, function(media, index) {
						
						var idVal = eval('media.attributes.' + idColumn);
						var nameVal = eval('media.attributes.' + nameColumn);
						
						receiveData.push({id: idVal, name: nameVal});
						
		   				if(data.length==index+1){ store.setData(receiveData); }
		   				
					});
				});
				/*
				dojo.connect(queryTask, "onError", function(err) {
					alert(err);
				});
				*/
			//}, 1, this);
        }
    }
});
