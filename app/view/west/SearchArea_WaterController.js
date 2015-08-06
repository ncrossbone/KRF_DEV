Ext.define('KRF_DEV.view.west.SearchArea_WaterController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_WaterController',
	
	control: {
		'#cmbWater1': {
			afterrender: 'onCombo1Render',
			select: 'onAreaChange'
		},
		'#cmbWater2': {
			select: 'onAreaChange'
		},
		'#cmbWater3': {
			select: 'onAreaChange'
		},
		'#btnWater1': {
			click: 'onAreaSearch'
		},
		'#btnWater2': {
			click: 'onAreaSearch'
		},
		'#btnWater3': {
			click: 'onAreaSearch'
		},
		'#btnWaterSelect': {
			click: 'onWaterSelect'
		}
	},
	
	// 시도 랜더링 후
	onCombo1Render: function(combo){
		this.setComboData(combo.id, "");
	},
	
	// 콤보 체인지
	onAreaChange: function(combo, record, eOpts) {
		
		if(combo.tarCmbId != undefined && combo.tarCmbId != "")
			this.setComboData(combo.tarCmbId, record.data.id);
		
		var lnkBtn = Ext.getCmp(combo.lnkBtnId);
		lnkBtn.setDisabled(false);
		
	},
	
	setComboData: function(comboId, id){
		var combo = Ext.getCmp(comboId);
		var store = combo.getStore();
		
		store.layerId = combo.layerId; // 타겟 콤보 레이어 아이디
		store.parentId = id;
		
		store.load(); // 데이터 로드
		combo.reset();
		//console.info(store);
		combo.setDisabled(false);
		
		while(true){
			
			// linked button disabled
			var lnkBtn = Ext.getCmp(combo.lnkBtnId);
			lnkBtn.setDisabled(true);
			
			// 하위 콤보 없으면 빠져나가기
			if(combo.tarCmbId == undefined || combo.tarCmbId == "")
				break;
			
			// 하위 콤보 disabled
			combo = Ext.getCmp(combo.tarCmbId);
			combo.reset();
			//combo.setDisabled(true);
			
		}
	},
	
	onAreaSearch: function(button, eOpts, c){
		var combo = Ext.getCmp(button.lnkCmbId);
		var searchLayerId = combo.layerId;
		var searchText = combo.getValue();
		KRF_DEV.getApplication().fireEvent('areaSelect', {idField: 'WS_CD', idValue: searchText, layerId: searchLayerId});
	},
	
	onAreaSearch2: function(a, b){
		console.info(a);
	},
	
	onWaterSelect: function(button, eOpts){
		
		var combo1 = Ext.getCmp('cmbWater1');
		var combo2 = Ext.getCmp('cmbWater2');
		var combo3 = Ext.getCmp('cmbWater3');
		
		var searchLayerId = "54";
		var searchText = "1013";
		
		Ext.ShowInfoWindow("test");
		
	}
	
});
