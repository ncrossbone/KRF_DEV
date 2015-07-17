Ext.define('KRF_DEV.view.common.Window', {
	extend : 'Ext.window.Window',
	
	xtype : 'app-common-window',
	
	initComponent : function() {
		
		var tab_panel = Ext.getCmp('datawindow-tabpanel');
		
		if(tab_panel == null || tab_panel == undefined){
			CreateWindow(this.params);
		}
		else{
			AddTab(tab_panel, this.params);
		}
		
		this.callParent();
	}
});

function AddTab(parent, params){
	
	var ctl = Ext.getCmp(params.id);
	
	if(ctl == null || ctl == undefined){
		parent.add({
			xtype: params.xtype,
			//store: params.store,
			title: params.title,
			id: params.id
			//columns: params.columns,
			//height: params.height
		});
		
		//console.info(parent.items.items);
		ctl = parent.items.items[parent.items.items.length - 1];
	}
	
	parent.setActiveTab(ctl);
}

var windowWidth = 0;
var windowHeight = 0;
var windowX = 0;
var windowY = 0;
var windowCollapsed = false;

function CreateWindow(params){
	var north = Ext.getCmp('north_container');
	var center = Ext.getCmp('center_container');

	center.add({
		xtype: 'window',
		id: 'datawindow-container',
		title: 'Tab Window',
		height: 300,
		width: center.getWidth(),
        frame: false,
		x: 0,
		y: Ext.getBody().getViewSize().height - north.height - 300,
		closable: true,
		tools: [{
			type: 'restore',
			handler: function(evt, toolEl, owner, tool){
				if(windowWidth != 0){
					var window = owner.up('window');
					//console.log(window.collapsed);
					
					window.setWidth(windowWidth);
					window.setHeight(windowHeight);
					window.setX(windowX);
					window.setY(windowY);
					
					if(windowCollapsed == true)
						window.expand('', false);
					
					window.alignTo('center-panel', 'bl-bl');
				}
			}
		}, {
			type: 'maximize',
			handler: function(evt, toolEl, owner, tool){
				var window = owner.up('window');

				windowWidth = window.getWidth();
				windowHeight = window.getHeight();
				windowX = window.getX();
				windowY = window.getY();
				centerX = center.getX();
				centerY = center.getY();
				windowCollapsed = false;
				
				console.log('maximize XY setting -- ' + 'window width : ' + windowWidth + ', window X : ' + windowX + ', window Y : ' + windowY);
				console.log('maximize XY setting -- ' + 'center width : ' + center.getWidth() + ', center X : ' + center.getX() + ', center Y : ' + center.getY());
				
				window.expand('', false);
				
				//window.collapse();
				window.setWidth(center.getWidth());
				window.setHeight(center.getHeight());
				window.setX(centerX);
				window.setY(centerY);
				
				window.alignTo('center-panel', 'bl-bl');
			}
		}, {
			type: 'minimize',
			handler: function(evt, toolEl, owner, tool){
				
				if(windowCollapsed == false){
					var window = owner.up('window');
					
					windowWidth = window.getWidth();
					windowHeight = window.getHeight();
					windowX = window.getX();
					windowY = window.getY();
					windowCollapsed = true;
					
					console.log('minimize XY setting -- ' + 'window width : ' + windowWidth + ', window X : ' + windowX + ', window Y : ' + windowY);
					
					window.collapse();
					window.setWidth(150);
					window.alignTo('center-panel', 'bl-bl');
				}
			}
		}],
		items: [{
			xtype: 'tabpanel',
			id: 'datawindow-tabpanel',
			title: params.title,
			header: false,
			items: [{
				xtype: params.xtype,
				//store: params.store,
				title: params.title,
				id: params.id
				//columns: params.columns,
				//height: params.height
			}]
		}]
	}).show();
}