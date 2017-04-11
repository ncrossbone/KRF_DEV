Ext.define('KRF_DEV.view.west.Layer01Controller', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.layer01Controller',

	control: {
		'treepanel': {
			checkchange: 'onCheckChanged'
		}
	},
	
	onCheckChanged: function(node, checked, btnId) {
		var me = this;
		me.node = node;
		me.checked = checked;
		
		//me.northLink(node);
		
		if(btnId == undefined || btnId == null){
			// 레이어 연결 버튼 셋팅 (버튼클릭 시 btnId넘겨주자.)
			//this.setLinkBtn(btnId);
		}
		
		if(!node.get('leaf')) {
			this.checkAllChildren(node, checked);
		}else{
			if(checked == false){
				var parentNode = node.parentNode;
				if(parentNode != undefined){
					parentNode.set('checked', false);
				}
			}
			console.info(this.getView().getChecked());
			KRF_DEV.getApplication().fireEvent('dynamicLayerOnOff', this.getView().getChecked());
		}
	},
	
	checkAllChildren: function(node, checked) {
		var me = this;
		var children = node.childNodes;
		Ext.each(children, function(child, index, eObjs) {
			child.set('checked', checked);
			if(index==children.length-1){
				KRF_DEV.getApplication().fireEvent('dynamicLayerOnOff', me.getView().getChecked());
			}
		});
	},
	
	// 레이어 연결된 버튼 셋팅 (버튼클릭 시 btnId넘겨주자.)
	setLinkBtn: function(btnId){
		var me = this;
		var btnCtl = null;
		
		if(me.node.data.layerBtnId != undefined){
			if(typeof(me.node.data.layerBtnId) == "object"){
				if(me.node.data.layerBtnId.length != undefined){
					for(var i = 0; i < me.node.data.layerBtnId.length; i++){
						// 버튼 On/Off
						btnCtl = SetBtnOnOff(me.node.data.layerBtnId[i]);
					}
				}
			}
			else if(typeof(me.node.data.layerBtnId) == "string"){
				// 버튼 On/Off
				btnCtl = SetBtnOnOff(me.node.data.layerBtnId);
			}
		}
	}
});
