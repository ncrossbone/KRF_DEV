Ext.define('KRF_DEV.view.south.SearchResultGrid_F', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer_F',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			//id: 'grdSearchResult',
			//id: this.up('container').up('container'),
			plugins: 'gridfilters',
			cls: 'khLee-x-column-header-text',
			//id : 'ResultGrid_F',
			height: 215,
			siteIds: "",
			parentIds: [],
			//height: '100%',
			header: {
				height: 5
			},
			title: '검색결과',
			siteId: '',
			//store: 'KRF_DEV.store.south.SearchResultGrid',
			//store: Ext.create('KRF_DEV.store.south.SearchResultGrid'),
			beforeRender: function(){
				
				var me = this;
				var parentCtl = this.findParentByType("window");
				
				parentCtl.on("resize", function(){
					//console.info(parentCtl);
					me.setWidth(parentCtl.getWidth());
					me.setHeight(parentCtl.getHeight() - 90);
				});
				
			},
			columns: [{
				text      : '측정소코드',
				dataIndex : 'FACI_CD',
				hidden: true,
				hideable: false, // filter Columns영역에 보이지 않기
				width: 0
			}, {
				text      : '측정소명',
				dataIndex : 'FACI_NM',
				width: 100,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
				listeners: {
					click: function(tblView, el, rowCnt, colCnt, row){
						//console.info(this.findParentByType("grid").parentIds);
						var gridCtl = this.findParentByType("grid")
						var parentIds = gridCtl.parentIds;
						var siteId = row.record.data.FACI_CD;
						var parentId = "";
						
						for(var i = 0; i < parentIds.length; i++){
							if(siteId == parentIds[i].siteId){
								parentId = parentIds[i].parentId;
							}
						}
						
						siteMovePoint(parentId, siteId);
					}
				}
			}, {
				text      : '운영일자',
				dataIndex : 'WORK_DT_VAL',
				width: 110,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, { 
				text      : '관거번호',
				dataIndex : 'PIPE_NUM',
				hidden : true,
				width: 70,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, { 
				text      : '관거유형',
				dataIndex : 'PIPE_TYPE',
				hidden : true,
				width: 110,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			},{ 
				text      : '유입원',
				dataIndex : 'IN_PL_TYPE',
				hidden : true,
				width: 110,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			}, { 
				text      : '방류구분번호',
				dataIndex : 'DISCHARGE_NUM',
				hidden : true,
				width: 110,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			}, {
				text     : '방류량_물리적(㎥/일)',
				dataIndex: 'DISCHARGE_AMT_PHYS_VAL',
				hidden : true,
				width: 100,
				filter: {type: 'numeric'/*, fields: {}*/}
			},{
				text     : '방류량_생물학적(㎥/일)',
				dataIndex: 'DISCHARGE_AMT_BIO_VAL',
				hidden : true,
				width: 100,
				filter: {type: 'numeric'/*, fields: {}*/}
			},{
				text     : '방류량_고도(㎥/일)',
				dataIndex: 'DISCHARGE_AMT_HIGHTEC_VAL',
				hidden : true,
				width: 100,
				filter: {type: 'numeric'/*, fields: {}*/}
			},{
				text     : '유량(㎥/일)',
				dataIndex: 'AMT_VAL',
				hidden : true,
				width: 100,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, {
				text     : 'BOD(㎎/ℓ)',
				dataIndex: 'BOD_VAL',
				width: 100, filter: {type: 'numeric'/*, fields: {}*/}
			},{
				text     : 'COD(㎎/ℓ)',
				dataIndex: 'COD_VAL',
				width: 100, filter: {type: 'numeric'/*, fields: {}*/}
			
			},{

				text     : 'SS(㎎/ℓ)',
				dataIndex: 'SS_VAL',
				width: 100, filter: {type: 'numeric'/*, fields: {}*/}
			
			},{

				text     : 'TN(㎎/ℓ)',
				dataIndex: 'TN_VAL',
				width: 100, filter: {type: 'numeric'/*, fields: {}*/}
			
			},{

				text     : 'TP(㎎/ℓ)',
				dataIndex: 'TP_VAL',
				width: 100, filter: {type: 'numeric'/*, fields: {}*/}
			
			},{

				text     : '대장균군수(총대장균군수)',
				dataIndex: 'COLI_VAL',
				width: 100, filter: {type: 'numeric'/*, fields: {}*/}
			
			},{

				text     : '미처리배제유량(㎥/일)',
				dataIndex: 'BYPASS_AMT_VAL',
				hidden : true,
				width: 100, filter: {type: 'numeric'/*, fields: {}*/}
			
			}, {
				text      : '연계처리시설명',
				dataIndex : 'CONNECT_FACI_NM',
				hidden : true,
				width: 110,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, {
				text      : '방류수소독방법',
				dataIndex : 'DISCHARGE_DISINFECT',
				hidden : true,
				width: 110,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, {
				text      : '연계처리시설명',
				dataIndex : 'DISCHARGE_FACI_NM',
				hidden : true,
				width: 110,
				filter: {type: 'numeric'/*, fields: {}*/}
			}]
		}]
	}]
});