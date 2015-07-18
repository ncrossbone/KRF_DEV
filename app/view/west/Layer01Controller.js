Ext.define('KRF_DEV.view.west.Layer01Controller', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.layer01Controller',

	control: {
		'treepanel': {
			checkchange: 'onCheckChanged'
		}
	},
	
	onCheckChanged: function(node, checked, a) {
		// view.west.WestTabLayer id로 활성화된 탭 id가져옴
		var tabID = Ext.getCmp('westLayer01').getActiveTab().id;

		if(!node.get('leaf')) {
			this.checkAllChildren(node, checked, tabID);
		}else{
			KRF_DEV.getApplication().fireEvent('dynamicLayerOnOff', this.getView().getChecked(), tabID);
		}
	},
	
	checkAllChildren: function(node, checked, tabID) {
		var me = this;
		var children = node.childNodes;
		Ext.each(children, function(child, index, eObjs) {
			child.set('checked', checked);
			if(index==children.length-1){
				KRF_DEV.getApplication().fireEvent('dynamicLayerOnOff', me.getView().getChecked(), tabID);
			}
		});
	}
});
