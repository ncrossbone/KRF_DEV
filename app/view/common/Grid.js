Ext.define('KRF_DEV.view.common.Grid', {
	extend : 'Ext.grid.Panel',
	
	xtype: 'app-common-grid',
	
	//plugins: 'gridfilters',
	
	id: 'grid-tab-2',
	
	title: '위젯그리드탭테스트',
	//store: Ext.create('KRF_DEV.store.west.WestTabSearch_ADM_GRID'),
	
	columns: [{ text      : 'id',  dataIndex : 'id' },
	          { text      : 'name', dataIndex : 'name' }],
	
	height: 200,
	//width: 200,
	
	//scroll: false,
	/*
	viewConfig: {
		scroll: false,
		style: {overflow: 'auto', overflowX: 'hidden'}
	},
	*/
	
	initComponent: function(){
		
		//return;
		// Ext.defer(function() { 
		// defer : 미루다, 연기하다
		// Ext.defer(function(){...}, 1000, this); // function 내 코드를 1초(1000ms)후에 실행한다.
		var store = new Ext.data.Store({
				fields: [
					{name: 'id'},
					{name: 'name'}
				]
			});
			
			//var store1 = this.store;
			var idColumn = "ADM_CD";
			var nameColumn = "CTY_NM";
			var whereStr = "ADM_CD LIKE '11%'";
			
			idColumn = "ADM_CD";
			
			//store.layerId = "54";
			/*
			if(store.layerId == '53'){ nameColumn = "DO_NM"; whereStr = "1=1" }
			if(store.layerId == '54'){ nameColumn = "CTY_NM"; whereStr = "ADM_CD LIKE '11%'"}
			if(store.layerId == '55'){ nameColumn = "DONG_NM"; whereStr = "ADM_CD LIKE '1100%'"}
			*/
			// id, name 셋팅이 안돼있으면 리턴
			if(idColumn == undefined || nameColumn == undefined || whereStr == undefined)
				return;
			
			var queryTask = new esri.tasks.QueryTask("http://fireftp.iptime.org:6080/arcgis/rest/services/reach/MapServer/54"); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = whereStr;
			query.outFields = ["*"];
			
			var fieldNames = [];
			queryTask.execute(query,  function(results){
				Ext.each(results.fields, function(objField, index, objFields){
					fieldNames.push(objField.name);
				});
				this.fields = fieldNames;
				
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
					
	   				if(data.length==index+1){ 
	   					//store1.setData(receiveData);
	   					//store1 = receiveData;
	   					//store1.load();
	   					store.loadData(receiveData);
	   					//store1 = store;
	   				}
	   				
				});
				
				//console.info(receiveData);
			});
			this.store = store;
			this.autoScroll = true;
			/*
			dojo.connect(queryTask, "onError", function(err) {
				alert(err);
			});
			*/
		//}, 1, this);
			//this.store.load();
		//this.store = Ext.create('KRF_DEV.store.west.WestTabSearch_ADM_GRID');
		//this.height = 300;
			this.callParent();
	}
});