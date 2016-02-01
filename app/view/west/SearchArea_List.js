/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('KRF_DEV.view.west.SearchArea_List', {
	
	extend: 'Ext.panel.Panel',
	
	xtype: 'west-searchArea-list',
	id: 'searchAreaList',
	//width: 300,
	width: '100%',
	height: '100%',
	cls: 'dj-searchAreaList',   //검색결과 body 부분에 css를 먹임
	//autoScroll: true,
	layout: {
		type: 'accordion'
	}
	/*,items: [{
		xtype: 'panel',
		layout: {
			type: 'vbox'
		},
		title: '하천수',
		cls: 'dj_result_info',
		items: [{
			xtype: 'label',
			html: '&nbsp;&nbsp;테스트1<br>  주소'
		}, {
			xtype: 'label',
			html: '&nbsp;&nbsp;테스트2'
		}]
	}, {
		xtype: 'panel',
		layout: {
			type: 'vbox'
		},
		title: '하수종말처리시설',
		items: [{
			xtype: 'label',
			html: '&nbsp;&nbsp;테스트1'
		}, {
			xtype: 'label',
			html: '&nbsp;&nbsp;테스트2'
		}]
	}]*/

});