Ext.define('KRF_DEV.view.west.SearchArea_ADMController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_ADMController',
	
	control: {
		'#cmbArea1': {
			afterrender: 'onCombo1Render',
			select: 'onAreaChange'
		},
		'#cmbArea2': {
			select: 'onAreaChange'
		},
		'#cmbArea3': {
			select: 'onAreaChange'
		},
		'#btnSearch1': {
			click: 'onAreaSearch'
		},
		'#btnSearch2': {
			click: 'onAreaSearch'
		},
		'#btnSearch3': {
			click: 'onAreaSearch'
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
	
	setComboData: function(comboId, admCD){
		
		var combo = Ext.getCmp(comboId);
		var store = combo.getStore();
		
		store.layerId = combo.layerId; // 타겟 콤보 레이어 아이디
		store.parentADMCD = admCD;
		
		store.load(); // 데이터 로드
		combo.reset();
		
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
			combo.setDisabled(true);
			
		}
	},
	
	onAreaSearch: function(button, eOpts){
		var combo = Ext.getCmp(button.lnkCmbId);
		var searchLayerId = combo.layerId;
		var searchText = combo.getValue();
		KRF_DEV.getApplication().fireEvent('areaSelect', {admCd: searchText, layerId: searchLayerId});
	}
	
});
