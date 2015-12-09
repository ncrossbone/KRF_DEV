/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('KRF_DEV.view.west.SearchArea_List_Total', {
	
	extend: 'Ext.panel.Panel',
	
	xtype: 'west-searchArea-list_Total',
	id: 'searchAreaList_Total',
	width: 300,
	
	layout: {
		type: 'vbox'
	},
	items: [{
		xtype: 'label',
		html: '검색결과'
		
	}]

});