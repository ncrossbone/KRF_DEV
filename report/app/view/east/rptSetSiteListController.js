Ext.define('Report.view.east.rptSetSiteListController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.rptSetSiteListController',

	control: {
		'treepanel': {
			checkchange: 'onCheckChanged'
		}
	},
	
	onCheckChanged: function(node, checked, btnId) {
		
		var me = this;
		me.node = node;
		me.checked = checked;
		
		if(!node.get('leaf')) {
			this.checkAllChildren(node, checked);
		}else{
			if(checked == false){
				var parentNode = node.parentNode;
				if(parentNode != undefined){
					parentNode.set('checked', false);
				}
			}
		}
	},
	
	checkAllChildren: function(node, checked) {
		var me = this;
		var children = node.childNodes;
		Ext.each(children, function(child, index, eObjs) {
			child.set('checked', checked);
		});
	}
});
