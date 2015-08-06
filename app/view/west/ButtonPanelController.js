Ext.define('KRF_DEV.view.west.ButtonPanelController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.buttonpanel',

	onClickButton: function(evtArgs, el) {
		var currCtl = Ext.getCmp(el.id);
		
		console.info(evtArgs);
		
		// 이미지 셋팅
		Ext.SetSrc(currCtl);
		
		// 주제도선택
		if(el.id == "btnLayer"){
			Ext.WestTabChange(0);
		}
		
		// 위치검색
		if(el.id == "btnSearchArea"){
			Ext.WestTabChange(1);
		}
		
		// 정보 창
		if(currCtl.id == "btnSiteListWindow"){
			//console.info(currCtl.src.indexOf("_on"));
			if(currCtl.src.indexOf("_on") == -1){
				Ext.HideSiteListWindow(currCtl);
				Ext.HideSiteInfoWindow();
				Ext.HideChartResult();
			}
			else{
				Ext.ShowSiteListWindow("test");
			}
		}
		
		// 검색결과 창
		if(el.id == "btnSearchResult"){
			if(currCtl.src.indexOf("_on") == -1){
				Ext.HideSearchResult();
			}
			else{
				Ext.ShowSearchResult("grid-tab-2", "west 검색결과");
			}
		}
		
		if(el.id == "btnModeReach" || el.id == "btnModeReach_center"){
			Ext.ShowReachToolbar(evtArgs, el);
			Ext.HideSiteListWindow();
			Ext.HideSiteInfoWindow();
			Ext.HideChartResult();
			Ext.HideSearchResult();
		}
		
		if(el.id == "btnModeNomal" || el.id == "btnModeNomal_center"){
			Ext.HideReachToolbar(evtArgs, el);
		}
	}
});
