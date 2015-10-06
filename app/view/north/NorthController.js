/**
 *   작성자 : khLee <ncrossbone@gmail.com>
 *   작성일 : 2015-06-10
 * 수정이력 : 날짜		내용
 */
Ext.define('KRF_DEV.view.north.NorthController', {
	extend: 'Ext.app.ViewController',

    alias: 'controller.north',

    onButtonClick: function (button, e) {
    	if(button.params.msgBox == 'alert')
    		Ext.Msg.alert(button.params.title, button.params.contents);
    	else if(button.params.msgBox == 'confirm')
    		Ext.Msg.confirm(button.params.title, button.params.contents, 'onConfirm', this);
    },
    onConfirm: function (choice){
    	console.log(choice);
    	if (choice === 'yes') {
            console.log(choice);
        }
    },
    
    // 리치 버튼 클릭
	onClickReachLayer: function(obj, el, evt){
		
		// 리치레이어 On/Off
		//ReachLayerOnOff(el.id, "46");
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		var me = GetCoreMap();
		
		if(currCtl.btnOnOff == "on")
			me.reachLayerAdmin.reachLineGraphics.setVisibility(true);
		else
			me.reachLayerAdmin.reachLineGraphics.setVisibility(false);
		
	},
	
	// 집수구역 버튼 클릭
	onClickAreaLayer: function(obj, el, evt){
		
		// 리치레이어 On/Off
		ReachLayerOnOff(el.id, "47");
		
	},
	
	// 초기화 버튼 클릭
	onClickReset: function(obj, el, evt){
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
	}
});