/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.west.West', {
    //extend: 'Ext.tab.Panel',
	extend: 'Ext.panel.Panel',
    
    xtype: 'app-default-west',
    
    requires: [
		'KRF_DEV.view.west.WestController'
	],
    
    controller: 'west',

    width: 400,

//    tabPosition: 'left',
//    tabRotation: 0,
//    
//    tabBar: {
//        border: false
//    },
    
    //bind: {title: '<img width="32" height="32" src="/resources/images/temp/1_on.png" /><br>{testText}'},
    title: '화면 제어판',
    collapsible: true,
    split: true,
    header: false,
    
    layout: {
    	type: 'border'
    },
    
    items: [{
    	xtype: 'west-buttonpanel',
    	region: 'west'
    }, {
    	xtype: 'container',
    	id: 'westContents',
    	region: 'center',
    	layout: {
    		type: 'card'
    	},
    	items: [{
    		xtype: 'west-Layer01'
    	}, {
    		xtype: 'west-searchArea'
    	}]
    }]

//    defaults: {
//        textAlign: 'center',
//        bodyPadding: 5
//    },
/*
    initComponent: function(){
    	this.items = [{
            title: '<img width="32" height="32" src="/resources/images/temp/1_on.png" /><br>' + KRF_DEV.app.ServiceUrl,
            //bind: {title: '<img width="32" height="32" src="/resources/images/temp/1_on.png" /><br>{testText}'},
            collapsible: true,
            items: [{
            	xtype: 'app-westTabLayer'
            }]
        }, {
            title: '<img width="32" height="32" src="/resources/images/temp/1_off.png" /><br>위치검색',
            items: [{
            	xtype: 'button',
    			text: '그리드 탭',
    			params: {
    				xtype: 'app-common-grid_test',
    				id: 'grid-tab-1',
    				title: '위젯그리드탭테스트',
    				height: '100%'
    			},
    			handler: 'onClickButton'
            }, {
            	xtype: 'button',
    			text: '패널 탭',
    			params: {xtype: 'panel', id: 'panel-tab-1', title: '패널탭테스트'},
    			handler: 'onClickButton'
            }, {
            	xtype: 'button',
    			text: '차트 탭',
    			params: {
    				xtype: 'app-common-grid',
    				id: 'chart-tab-1',
    				title: '차트테스트'
    			},
    			handler: 'onClickButton'
            }]
        }, {
            title: '<img width="32" height="32" src="/resources/images/temp/1_on.png" /><br>일반모드',
            collapsible: true,
            layout: {
            	type: 'accordion',
            	fill: true,
            	titleCollapse: true,
            	multi: false,
            	animate: true
            },
            items: [{
            	title: '영향권역',
            	html: '영향권역 Contents',
            	collapsed: true
            }, {
            	title: '권역검색결과',
            	html: '권역검색결과 Contents',
            	collapsed: true
            }, {
            	title: '사용자검색',
            	html: '사용자검색 Contents',
            	collapsed: true
            }, {
            	title: '검색결과리스트',
            	html: '검색결과리스트 Contents',
            	collapsed: true
            }, {
            	title: '행정구역검색',
            	//html: '행정구역검색 Contents',
            	xtype: 'app-westTabSearch_ADM',
            	collapsed: true
            }]
        }, {
        	title: '<img width="32" height="32" src="/resources/images/temp/1_off.png" /><br>리치모드',
        }];
    	
    	this.callParent();
    }
    */
});