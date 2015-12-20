Ext.define('KRF_DEV.store.west.SearchArea_Water', {

	extend : 'Ext.data.Store',

	fields : [ 'id', 'name' ],

	// autoLoad: true, // controller(onAreaChange)에서 store.load();
	// data: [{id: 'ss', name: 'dd'}],

	remoteSort : true,

	listeners : {
		// beforeload, load, afterload
		beforeload : function(store) {
			// Ext.defer(function() {
			// defer : 미루다, 연기하다
			// Ext.defer(function(){...}, 1000, this); // function 내 코드를
			// 1초(1000ms)후에 실행한다.

			var idColumn, nameColumn, whereStr, pId;
			// console.info(store);
			idColumn = "";

			// console.info(store.parentId);

			if (store.layerId == '54') {
				idColumn = "WS_CD";
				nameColumn = "대권역";
				whereStr = "1=1";
			}
			if (store.layerId == '55') {
				idColumn = "MW_CODE";
				nameColumn = "MW_NAME";
				whereStr = "WS_CD = '" + store.parentId + "'";
			}
			if (store.layerId == '56') {
				idColumn = "SW_CODE";
				nameColumn = "SW_NAME";
				whereStr = "MBSNCD = '" + store.parentId + "'";
			}

			// if(store.layerId == '54' || store.layerId == '55'){ pId =
			// store.parentId; }

			// alert(store.layerId);
			// id, name 셋팅이 안돼있으면 리턴
			if (idColumn == undefined || nameColumn == undefined
					|| whereStr == undefined)
				return;
			// console.info(whereStr);
			var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + "/" + store.layerId); // 레이어 URL
			//console.info(_mapServiceUrl);
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = whereStr;
			query.outFields = [ "*" ];

			queryTask.execute(query, function(results) {
				var data = results.features;
				data.sort(function(a, b) {

					var aVal = eval('a.attributes.' + nameColumn);
					var bVal = eval('b.attributes.' + nameColumn);

					if (aVal > bVal) {
						return 1;
					} else if (aVal < bVal) {
						return -1;
					} else {
						return 0;
					}

				});

				var receiveData = [];

				Ext.each(data, function(media, index) {

					var idVal = eval('media.attributes.' + idColumn);
					var nameVal = eval('media.attributes.' + nameColumn);
					/*
					 * if(store.layerId == '54' || store.layerId == '55'){ var
					 * middleVal = eval('media.attributes.' + pId);
					 * console.info(pId); console.info(middleVal); }
					 * receiveData.push({id: idVal, name: nameVal, mval:
					 * middleVal});
					 */
					receiveData.push({
						id : idVal,
						name : nameVal
					});

					// console.info(receiveData);
					if (data.length == index + 1) {
						store.setData(receiveData);
					}

					// console.info(store.data);

				});

				// console.info(receiveData);
			});
			/*
			 * dojo.connect(queryTask, "onError", function(err) { alert(err);
			 * });
			 */
			// }, 1, this);
		}
	}
});
