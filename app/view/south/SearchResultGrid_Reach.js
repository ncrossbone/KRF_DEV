Ext.define('KRF_DEV.view.south.SearchResultGrid_Reach', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'searchResultReach',
	
	id: 'searchResultReach',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			cls: 'khLee-x-column-header-text',
			plugins: ['bufferedrenderer', 'gridfilters'],
			siteIds: "",
			parentIds: [],
			header: {
				height: 5
			},
			title: '검색결과',
			siteId: '',
			beforeRender: function(){
				
				var me = this;
				var parentCtl = this.findParentByType("window");
				
				me.setWidth(parentCtl.getWidth() - 10);
				me.setHeight(parentCtl.getHeight() - 110);
				
				parentCtl.on("resize", function(){
					//console.info(parentCtl);
					me.setWidth(parentCtl.getWidth() - 10);
					me.setHeight(parentCtl.getHeight() - 110);
				});
				
			},
			
			columns: [{
				text      : '리치ID',
				dataIndex : 'RCH_DID',
				width: 100,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
				listeners: {
					click: function(tblView, el, rowCnt, colCnt, row){
						//console.info(row);
						var catDId = row.record.data.CAT_DID;
						
						siteMovePoint("Cat", catDId);
					}
				},
				renderer: function(val, a, b, rowIdx, colIdx){
					if(rowIdx == 0)
						return "<b>" + val + "</b>";
					else
						return "<a href='#'>" + val + "</a>";
				}
			}, {
				text      : '리치길이 (km)',
				dataIndex : 'RCH_LEN',
				width: 150,
				filter: {type: 'numeric'},
				renderer: function(val, a, b, rowIdx, colIdx){
					if(rowIdx == 0)
						//return "<b>" + Ext.util.Format.number(val / 1000, '0.0') + "</b>";
						return "<b>" + val + "</b>";
					else
						//return Ext.util.Format.number(val / 1000, '0.0');
						return val;
				}
			}, {
				text      : '집수구역ID',
				dataIndex : 'CAT_DID',
				width: 150,
				filter: {type: 'numeric'}
			}, { 
				text      : '집수구역면적 (㎥)',
				//dataIndex : 'CAT_AREA',
				dataIndex : 'CUM_AREA',
				width: 150,
				filter: {type: 'numeric'},
				renderer: function(val, a, b, rowIdx, colIdx){
					var retVal = "";
					if(val != 0)
						retVal = val;
					if(rowIdx == 0)
						return "<b>" + Ext.util.Format.number(retVal, '0.0') + "</b>";
					else
						return Ext.util.Format.number(retVal, '0.0');
				}
			}, { 
				text      : '하천명',
				dataIndex : 'RIV_NM',
				width: 150,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			}, { 
				text      : '하천 총 거리 (km)',
				dataIndex : 'CUM_LEN',
				width: 150,
				hidden: true,
				filter: {type: 'numeric'},
				renderer: function(val){
					return Ext.util.Format.number(val / 1000, '0.0');
				}
			}, { 
				text      : '하천등급',
				dataIndex : 'GEO_TRIB',
				width: 150,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			}]
		}]
	}]
});