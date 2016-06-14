/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.drone.VComboBox', {
	extend: 'Ext.container.Container',
    
    xtype: 'drone-vcombo',
    
    layout: {
		type: "absolute"
	},
	
	x: 0,
	y: 14,
	
	labelSrc: '',
	labelHeight: 24,
	
	width: 115,
	
	comboHeight: 24,
	
	onChange: "",
	
	initComponent: function(){
		
		this.items = [{
	    	xtype: 'container',
	    	x: this.x,
	    	y: this.y,
	    	width: this.width,
	    	layout: {
	    		type: "vbox"
	    	},
	    	items: [{
	    		xtype: "image",
	    		src: this.labelSrc,
	    		width: "100%",
	    		height: this.labelHeight
	    	}, {
	    		xtype: 'combo',
	    		width: "100%",
	    		height: this.comboHeight
	    	}]
	    }];
	    
	    this.callParent();
	}
});