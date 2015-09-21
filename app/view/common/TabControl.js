Ext.define('KRF_DEV.view.common.TabControl', {
	
	extend : 'Ext.tab.Panel',
	
	xtype : 'common-tabcontrol',
	
	id: 'tabControl',
	
	title: '결과탭1',
	
	//width: '100%',
	//height: '100%',
	
	beforeRender: function(){
		var me = this;
		var parentCtl = this.findParentByType("container");
		parentCtl.on("resize", function(){
			me.setWidth(parentCtl.getWidth());
			me.setHeight(parentCtl.getHeight());
		});
	}
		
});