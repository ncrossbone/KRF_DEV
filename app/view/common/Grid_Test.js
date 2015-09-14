Ext.define('KRF_DEV.view.common.Grid_Test', {
	extend : 'Ext.grid.Panel',
	
	xtype: 'app-common-grid_test',
	
	plugins: 'gridfilters',
	
	id: 'grid-tab-1',
	
	title: '위젯그리드탭테스트',
	store: 'KRF_DEV.store.dev_test.GridStoreTest',
	columns: [{ text      : 'Name2',  dataIndex : 'name', filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}} },
	          { text      : 'Email', dataIndex : 'email', flex : 1 },
	          { text      : 'Phone', dataIndex : 'phone' },
	          {
	        	  text     : 'Progress',
		          xtype    : 'widgetcolumn',
		          width    : 120,
		          dataIndex: 'progress',
		          widget: {
		              xtype: 'progressbarwidget',
		              textTpl: [
		                  '{percent:number("0")}% done'
		              ]
		          }
	          },
	          {
	              text: 'Line',
	              width: 100,
	              dataIndex: 'chartvalues',
	              xtype: 'widgetcolumn',
	              widget: {
	                  xtype: 'sparklineline',
	                  tipTpl: 'Value: {y:number("0.00")}'
	              }
	          }],
	height: '100%'
});