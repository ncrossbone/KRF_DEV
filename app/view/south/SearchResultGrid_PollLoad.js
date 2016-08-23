Ext.define('KRF_DEV.view.south.SearchResultGrid_PoolLoad', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'searchResultPoolLoad',
	
	id: 'searchResultPoolLoad_container',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			cls: 'khLee-x-column-header-text',
			//plugins: ['bufferedrenderer', 'gridfilters'],
			plugins: ['gridfilters'], // bufferedrenderer 쓰면 그리드 스크롤링(gridCtl.getView().getRow(rowIdx).scrollIntoView();)이 잘 안먹음, rowindex가 높을때..(한강, 한강서울 검색확인) -- 임시
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
					////console.info(parentCtl);
					me.setWidth(parentCtl.getWidth() - 10);
					me.setHeight(parentCtl.getHeight() - 110);
				});
				
			},
			
			columns: [{
				text      : '집수구역코드',
				dataIndex : 'CAT_DID',
				width: 150,
				filter: {type: 'numeric'}
			}, {
				text      : '집수면적 (㎥)',
				dataIndex : '',
				width: 150,
				filter: {type: 'numeric'}
			}, {
				text      : '연도',
				dataIndex : 'YYYY',
				width: 150,
				filter: {type: 'numeric'}
			}, { 
				text      : '발생유량-합계',
				width: 150,
				filter: {type: 'numeric'}
			}, { 
				text      : '발생BOD합계',
				dataIndex : 'GNR_BOD_SUM',
				width: 150,
				hidden: true,
				filter: {type: 'numeric'},
				renderer: function(val){
					return Ext.util.Format.number(val / 1000, '0.0');
			}, { 
				text      : '발생TN합계',
				dataIndex : 'GNR_TN_SUM',
				width: 150,
				hidden: true,
				filter: {type: 'numeric'},
				renderer: function(val){
					return Ext.util.Format.number(val / 1000, '0.0');
				}
			}, { 
				text      : '개별배출유량합계',
				dataIndex : 'OUT_FLOW_SUM',
				width: 150,
				hidden: true,
				filter: {type: 'numeric'},
				renderer: function(val){
					return Ext.util.Format.number(val / 1000, '0.0');
				}
			}, { 
				text      : '배출BOD합계',
				dataIndex : 'OUT_BOD_SUM',
				width: 150,
				hidden: true,
				filter: {type: 'numeric'},
				renderer: function(val){
					return Ext.util.Format.number(val / 1000, '0.0');
				}
			}, { 
				text      : '배출유량합계',
				dataIndex : 'OUT_FLOW_SUM',
				width: 150,
				hidden: true,
				filter: {type: 'numeric'},
				renderer: function(val){
					return Ext.util.Format.number(val / 1000, '0.0');
				}
			}, { 
				text      : 'OUT_BOD_SUM',
				dataIndex : '배출BOD합계',
				width: 150,
				hidden: true,
				filter: {type: 'numeric'},
				renderer: function(val){
					return Ext.util.Format.number(val / 1000, '0.0');
				}
			}, { 
				text      : '배출TN합계',
				dataIndex : 'OUT_TB_SUM',
				width: 150,
				hidden: true,
				filter: {type: 'numeric'},
				renderer: function(val){
					return Ext.util.Format.number(val / 1000, '0.0');
				}
			}, { 
				text      : '배출TP합계',
				dataIndex : 'OUT_TP_SUM',
				width: 150,
				hidden: true,
				filter: {type: 'numeric'},
				renderer: function(val){
					return Ext.util.Format.number(val / 1000, '0.0');
				}
			}]
		}]
	}]
});