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
    
    //bind: {title: '<img width="32" height="32" src="./resources/images/temp/1_on.png" /><br>{testText}'},
    title: '화면 제어판',
    collapsible: true,
    split: true,
    header: false,
    //collapsed: true,
    /*
    split: {
        //collapsible: true
    	cls: 'khLee-x-spliter-collapse'
    },
    */
    
    listeners: {
    	collapse: function(){
    		//console.info(Ext.get("west_container-splitter-collapseEl").dom.innerHTML);
    		Ext.get("west_container-splitter-collapseEl").dom.innerHTML = "<img src='./resources/images/button/btn_arrow_open.png' />";
    		//console.info(Ext.get("west_container-splitter-collapseEl").html);
    		//Ext.get("west_container-splitter-collapseEl").el.setStyle({"background-image": "./resources/images/button/btn_arrow_open.png"});
    	},
    	expand: function(){
    		Ext.get("west_container-splitter-collapseEl").dom.innerHTML = "<img src='./resources/images/button/btn_arrow_close.png' />";
    	}
    },
    
    cls: 'khLee-x-body khLee-x-spliter-collapse',
    
    layout: {
    	type: 'border'
    },
    
    items: [{
    	xtype: 'west-buttonpanel',
    	region: 'west'
    }, {
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

//    defaults: {
//        textAlign: 'center',
//        bodyPadding: 5
//    },

    initComponent: function(){
    	this.callParent();
    	Ext.defer(function(){
    		//console.info(Ext.get("west_container-splitter-collapseEl"));
        	Ext.get("west_container-splitter-collapseEl").dom.innerHTML = "<img src='./resources/images/button/btn_arrow_close.png' />";
    	}, 1, this);
    }
    
});