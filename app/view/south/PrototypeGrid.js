Ext.define('KRF_DEV.view.south.PrototypeGrid', {
	extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-prototype',
	
	plugins: 'gridfilters',
	
	id: 'grid-tab-1',
	
	cls: 'khLee-x-column-header-text',
	
	title: '검색결과',
	store: 'KRF_DEV.store.south.PrototypeGrid',
	columns: [{ text      : '측정소명', dataIndex : 'name', width: 100, filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}} },
	          { text      : '년도', dataIndex : 'year', width: 50 },
	          { text      : '월', dataIndex : 'month', width: 50 },
	          {
	        	  text : '수위',
	        	  columns: [
					{ text     : '측정값', dataIndex: 'depth_value', width: 60 },
					{
					    text: '그래프',
					    dataIndex: 'depth_chart',
					    width: 80,
					    xtype: 'widgetcolumn',
					    widget: {
					        xtype: 'sparklineline',
					        tipTpl: 'Value: {y:number("0.00")}'
					    }
					}
	        	  ]
	          },
	          {
	        	  text : '유량',
	        	  columns: [
					{ text     : '측정값', dataIndex: 'flux_value', width: 60 },
					{
					    text: '그래프',
					    width: 80,
					    dataIndex: 'flux_chart',
					    xtype: 'widgetcolumn',
					    widget: {
					        xtype: 'sparklineline',
					        tipTpl: 'Value: {y:number("0.00")}'
					    }
					}
	        	  ]
	          },
	          {
	        	  text : '수온',
	        	  columns: [
					{ text     : '측정값', dataIndex: 'temp_value', width: 60 },
					{
					    text: '그래프',
					    width: 80,
					    dataIndex: 'temp_chart',
					    xtype: 'widgetcolumn',
					    widget: {
					        xtype: 'sparklineline',
					        tipTpl: 'Value: {y:number("0.00")}'
					    }
					}
	        	  ]
	          },
	          {
	        	  text : 'DO',
	        	  columns: [
					{ text     : '측정값', dataIndex: 'DO_value', width: 60 },
					{
					    text: '그래프',
					    width: 80,
					    dataIndex: 'DO_chart',
					    xtype: 'widgetcolumn',
					    widget: {
					        xtype: 'sparklineline',
					        tipTpl: 'Value: {y:number("0.00")}'
					    }
					}
	        	  ]
	          },
	          {
	        	  text : 'BOD',
	        	  columns: [
					{ text     : '측정값', dataIndex: 'BOD_value', width: 60 },
					{
					    text: '그래프',
					    width: 80,
					    dataIndex: 'BOD_chart',
					    xtype: 'widgetcolumn',
					    widget: {
					        xtype: 'sparklineline',
					        tipTpl: 'Value: {y:number("0.00")}'
					    }
					}
	        	  ]
	          },
	          {
	        	  text : 'COD',
	        	  columns: [
					{ text     : '측정값', dataIndex: 'COD_value', width: 60 },
					{
					    text: '그래프',
					    width: 80,
					    dataIndex: 'COD_chart',
					    xtype: 'widgetcolumn',
					    widget: {
					        xtype: 'sparklineline',
					        tipTpl: 'Value: {y:number("0.00")}'
					    }
					}
	        	  ]
	          }],
	height: '100%'
});