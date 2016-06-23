var isHidden = false;

Ext.define('KRF_DEV.view.drone.LayerButtonHeader', {
	
	extend: 'Ext.panel.Panel',
	id: 'LayerButtonHeader',
	xtype: 'layerbutton-header',
	
	height: 21,
	width: 100,
	
	title: '촬영일자 선택',
	header: false,
	
	layout: {
		type: 'fit',
		align: 'strech'
	},
	
	cls: 'khLee-x-panel-body-default',
	
	items: [{
		xtype: 'image',
		id: 'imgHeader',
		style: 'border:0px',
		src: './resources/images/button/images01.gif',
		style: 'cursor:pointer;border:0px',
		listeners: {
	        el: {
	            click: function(){
	            	var ctlHeader = Ext.getCmp('imgHeader');
	            	var ctl = Ext.getCmp('LayerButtonPanel');
	            	if(isHidden == false){
	            		ctl.hide();
	            		isHidden = true;
	            		ctlHeader.setSrc('./resources/images/button/images01open.gif');
	            	}
	            	else{
	            		ctl.show();
	            		isHidden = false;
	            		ctlHeader.setSrc('./resources/images/button/images01.gif');
	            	}
	            }
	        }
	    }
	}]
	
});