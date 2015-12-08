Ext.define('KRF_DEV.view.west.SearchArea_ButtonController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_ButtonController',

	onClickButton: function(evtArgs, el) {
		var currCtl = Ext.getCmp(el.id);
		
		// 이미지 셋팅
		//Ext.SetSrc(currCtl);
		var currCtl = SetBtnOnOff(el.id, "on");
		
		var westContents = Ext.getCmp("searchAreaContents");
		//var westContents_1 = Ext.getCmp("searchAreaContents_1");
		
		// 수계로 찾기
		if(el.id == "btnWaterSearch"){
			//westContents_1.getEl().hide();
			westContents.setActiveItem(0);
		}
		
		// 행정구역으로 찾기
		if(el.id == "btnADMSearch"){
			//westContents_1.getEl().hide();
			westContents.setActiveItem(1);
		}
		
		// 명칭으로 찾기
		if(el.id == "btnNameSearch"){
			//westContents_1.getEl().show();
			var btnNomal = Ext.getCmp("btnModeNomal");
			if(btnNomal.btnOnOff == "on")
				westContents.setActiveItem(2);
			
			var btnReach = Ext.getCmp("btnModeReach");
			if(btnReach.btnOnOff == "on")
				westContents.setActiveItem(3);
		}
	}
});
