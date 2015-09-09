Ext.define('KRF_DEV.view.east.WindowSiteNChart', {
    extend: 'Ext.window.Window',
    xtype: 'east-windowsitenchart',
    id: 'windowSiteNChart',
    //renderTo: Ext.getBody(),
    
    //title: '지점및차트정보',
    //header: false,
    header: {
    	titlePosition: 2,
    	items: [{
    		xtype: 'image',
			//title: '차트정보',
			id: 'tabChart',
			src: './resources/images/tab/tap_01_ov.gif',
			onImg: './resources/images/tab/tap_01_ov.gif',
			offImg: './resources/images/tab/tap_01_off.gif',
			style: 'cursor:pointer; border:0px !important;',
			width: 95,
			height: 28,
			listeners: {
		        el: {
		        	click: function(obj, el, evt){
		        		ChangeTabIndex(0);
		            }
		        }
		    }
    	}, {
			xtype: 'image',
			id: 'tabSite',
			//title: '지점정보',
			src: './resources/images/tab/tap_02_off.gif',
			onImg: './resources/images/tab/tap_02_ov.gif',
			offImg: './resources/images/tab/tap_02_off.gif',
			style: 'cursor:pointer; border:0px !important;',
			width: 95,
			height: 28,
			listeners: {
		        el: {
		        	click: function(obj, el, evt){
		        		ChangeTabIndex(1);
		            }
		        }
		    }
		}]
    },
    
    layout: {
		type: 'vbox'
	},
	
	width: 400,
	height: 350,
	
	draggable: true,
	
	cls: 'khLee-window-panel-header khLee-x-window-default ',

	items: [{
		xtype: 'container',
		id: 'infoContents',
		layout: {
			type: 'card'
		},
		items: [{
			xtype: 'east-chartpanel'
		}, {
			xtype: 'east-siteinfopanel',
		}]
	}]
});