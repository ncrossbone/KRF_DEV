Ext.define('KRF_DEV.view.common.TabControl', {
	
	extend : 'Ext.tab.Panel',
	
	xtype : 'common-tabcontrol',
	
	id: 'tabControl',
	
	//width: '100%',
	//height: '100%',
	
	beforeRender: function(){
		//alert("dd");
		var me = this;
		console.info(this.findParentByType("container"));
		//this.on("resize", this.itemResize);
		var me = this;
		var parentCtl = this.findParentByType("container");
		parentCtl.on("resize", function(){
			//alert("dd");
			me.setWidth(parentCtl.getWidth());
			me.setHeight(parentCtl.getHeight());
			console.info(parentCtl.getWidth());
			console.info(parentCtl.getHeight());
			//this.refresh();
		});
	},
	
	itemResize: function(width, height, oldWidth, oldHeight, eOpts){
		//console.info(this.items.items);
		//alert("dd");
		console.info(width);
		console.info(height);
		console.info(oldWidth);
		console.info(oldHeight);
		console.info(this.getHeight());
		console.info(this.items.items[0]);
		
		if(this.items.items != undefined && this.items.items.length > 0){
			
			for(var i = 0; i < this.items.items.length; i++){
				console.info(this.items.items[i]);
				this.items.items[i].setWidth(300);
				this.items.items[i].setHeight(300);
			}
		}
	}
		
});