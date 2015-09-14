var toolbarShow;
var toolbarHide;
var toolbarBody;

Ext.define('KRF_DEV.view.common.MapToolbar.Body', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	xtype: 'cmm-maptoolbar-body',
	
	height: 30,
	width: 500,
	
	items: [{
		xtype: 'button',
		text: '전체',
		handler: 'onClickFullExtent'
	}, {
		xtype: 'button',
		text: '이동',
		handler: 'onClickMove'
	}, {
		xtype: 'button',
		text: '확대',
		handler: 'onClickZoomIn'
	}, {
		xtype: 'button',
		text: '축소',
		handler: 'onClickZoomOut'
	}, {
		xtype: 'button',
		text: '이전',
		handler: 'onClickPrev'
	}, {
		xtype: 'button',
		text: '다음',
		handler: 'onClickNext'
	}, {
		xtype: 'button',
		text: '삭제',
		handler: 'onClickDelete'
	}, {
		xtype: 'button',
		text: '측정',
		handler: 'onClickMeasure'
	}, {
		xtype: 'button',
		text: '인쇄',
		handler: 'onClickPrint'
	}, {
		xtype: 'button',
		text: '저장',
		handler: 'onClickSave'
	}, '->', {
		id: 'mapmode',
		xtype: 'cycle',
		showText: true,
		menu : {
			items: [{
				text: '위성',
				checked: true
			}, {
				text: '단색'
			}]
		},
		handler: 'onClickMapMode'
	}]
  
});

Ext.define('KRF_DEV.view.common.MapToolbar.Show', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	xtype: 'cmm-maptoolbar-show',
	
	padding: 5,
	
	height: 30,
	width: 30,
	
	items: [{
            type: 'left',
            xtype: 'tool',
            listeners:{
            	click:function(eObj, e){
            		toolbarBody.show();
            		toolbarHide.show();
            		toolbarShow.hide();
            	}
            }
        }]
  
});

Ext.define('KRF_DEV.view.common.MapToolbar.Hide', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	xtype: 'cmm-maptoolbar-hide',
	
	padding: 5,
	
	height: 30,
	width: 30,
	
	items: [{
            type: 'right',
            xtype: 'tool',
            listeners:{
            	click:function(eObj, e){
            		toolbarBody.hide();
            		toolbarHide.hide();
            		toolbarShow.show();
            	}
            }
        }]
  
});

Ext.define('KRF_DEV.view.common.MapToolbar', {
	
	extend: 'Ext.panel.Panel',
	
	xtype: 'cmm-maptoolbar',
	id: 'cmm-maptoolbar',
	renderTo: Ext.getBody(),
	
	layout: {
		type: 'absolute'
	},
	
	requires: [
	   		'KRF_DEV.view.common.MapToolbarController'
	   	],
	       
	       controller: 'maptoolbarcontroller',
	
	frame: false,
	border: false,
	bodyStyle: 'background:transparent;',
	
	initComponent: function(){
		
		toolbarShow = Ext.create('KRF_DEV.view.common.MapToolbar.Show');
		toolbarHide = Ext.create('KRF_DEV.view.common.MapToolbar.Hide');
		toolbarBody = Ext.create('KRF_DEV.view.common.MapToolbar.Body');
		
		this.x = Ext.getBody().getViewSize().width - toolbarBody.width - toolbarShow.width - 10;
		this.y = 60;
		
		this.items = [{
	        items: toolbarBody,
	        bodyStyle: 'background:transparent;',
	        border: false
		}, {
			x: toolbarBody.width,
	        y: 0,
	        items: toolbarShow,
	        bodyStyle: 'background:transparent;',
	        border: false
		}, {
	        x: toolbarBody.width,
	        y: 0,
	        items: toolbarHide,
	        bodyStyle: 'background:transparent;',
	        border: false
		}];
		
		toolbarBody.show();
		toolbarHide.show();
		toolbarShow.hide();
		
		this.callParent(); // 요게 있어야 Panel 및 item이 그려짐..
	}
  
});

Ext.EventManager.onWindowResize(function(w, h){
    var ctl = Ext.getCmp('cmm-maptoolbar');
    
    if(ctl == undefined)
    	return;
    
    ctl.setX(Ext.getBody().getViewSize().width - toolbarBody.width - toolbarShow.width - 10, false);
    ctl.setY(60, false);
});