Ext.define('KRF_DEV.view.center.CenterController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.center',
	
	// 일반모드 버튼 클릭
	onClickNormalMode: function(obj, el, evt){
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
	},
	
	// 리치모드 버튼 클릭
	onClickReachMode: function(obj, el, evt){
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
	}
	
});
