/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.west.West', {
    //extend: 'Ext.tab.Panel',
	extend: 'Ext.panel.Panel',
    
    xtype: 'app-default-west',

    width: 300,

//    tabPosition: 'left',
//    tabRotation: 0,
//    
//    tabBar: {
//        border: false
//    },
    
    //bind: {title: '<img width="32" height="32" src="./resources/images/temp/1_on.png" /><br>{testText}'},
    title: '화면 제어판',
    collapsible: true,
    split: true,
    header: false,
    //collapseMode: 'undefined',
    //hideCollapseTool: true,
    //preventHeader: false,
    //placeholder: false,
    //placeholderCollapseHideMode: Ext.Element.OFFSETS,
    placeholder: new Object(undefined), // 패널 닫혔을때 제목 없애기..
    
    listeners: {
    	collapse: function(){
    		Ext.get("west_container-splitter-collapseEl").dom.innerHTML = "<img src='./resources/images/button/btn_arrow_open.png' />";
    	},
    	expand: function(){
    		Ext.get("west_container-splitter-collapseEl").dom.innerHTML = "<img src='./resources/images/button/btn_arrow_close.png' />";
    	}
    },
    
    cls: 'khLee-x-body khLee-x-spliter-collapse',
    
    layout: {
    	type: 'border'
    },
    
    items: [/*{
    	xtype: 'west-buttonpanel',
    	region: 'west'
    }, */{
    	xtype: 'container',
    	id: 'westContents',
    	activeItem: 1,
    	region: 'center',
    	layout: {
    		type: 'card'
    	},
    	items: [{
    		xtype: 'west-Layer01'
    	}, {
    		xtype: 'west-searchArea'
    	}]
    }],

    initComponent: function(){
    	this.callParent();
    	Ext.defer(function(){
        	Ext.get("west_container-splitter-collapseEl").dom.innerHTML = "<img src='./resources/images/button/btn_arrow_close.png' />";
    	}, 1, this);
    }
    
});