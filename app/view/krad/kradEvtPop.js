Ext.define('KRF_DEV.view.krad.kradEvtPop', {
	
	extend: 'Ext.window.Window',

	xtype: 'krad-kradEvtPop',
	id: 'kradEvtPop',
	title: 'KRAD Popup Menu',

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	style: "border: 0px;",
	header: true,
	layout: {
		type: 'vbox',
	},
	
	drawOption: null,
	rchIds: null,
	evt: null,

	initComponent: function(){
		
		var me = this;
		var coreMap = GetCoreMap();
		
		var symbol = null;
		var btnId = null;
		
		if(me.drawOption == "startPoint" || me.drawOption == "start"){
			btnId = "btnMenu04";
			symbol = coreMap.reachLayerAdmin_v3_New.startSymbol;
		}
		if(me.drawOption == "endPoint" || me.drawOption == "end"){
			btnId = "btnMenu05";
			symbol = coreMap.reachLayerAdmin_v3_New.endSymbol;
		}
		
		var where = "";
		if(me.rchIds.length == 1){
			where = "RCH_ID = #RCH_ID#";
		}
		else{
			where = "RCH_ID IN (#RCH_ID#)";
		}
		
		var strRchId = "";
		for(var i = 0; i < me.rchIds.length; i++){
			strRchId += "'" + me.rchIds[i] + "', ";
		}
		
		strRchId = strRchId.substring(0, strRchId.length - 2);
		
		where = where.replace("#RCH_ID#", strRchId);
		
		me.items = [{
			xtype: "button",
			text: "Reach",
			width: "100%",
			handler: function(){
				coreMap.reachLayerAdmin_v3_New.drawEnd(btnId);
				coreMap.reachLayerAdmin_v3_New.drawSymbol(me.evt, symbol, me.drawOption); // 심볼 그리기
				coreMap.reachLayerAdmin_v3_New.selectLineWithWhere(where, me.drawOption); // 라인 검색
				me.close();
			}
		}, {
			xtype: "button",
			text: "Point",
			width: "100%",
			handler: function(){
				var coreMap = GetCoreMap();
				var kradPELayer = coreMap.map.getLayer("kradPELayer");
				console.info(kradPELayer);
				kradPELayer.setVisibility(true);
			}
		}, {
			xtype: "button",
			text: "Line",
			width: "100%"
		}, {
			xtype: "button",
			text: "Area",
			width: "100%"
		}];
		
		me.callParent();
	}

});