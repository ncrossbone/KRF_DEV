drawKRADEvtGrp = function(rchIds, evt, drawOption){
	
	var coreMap = GetCoreMap();
	coreMap.kradLayerAdmin.clearLayer();
	
	//console.info(_kradInfo);
	//var rchId = "10071017";
	var extDataId = "OBS_WQ_STR_EV";
	// <== 리치검색 됐다고 치고..
	showKRADEvtPop(rchIds, evt, drawOption);
}

showKRADEvtPop = function(rchIds, evt, drawOption){
	
	var cursorX = _cursorX;
	var cursorY = _cursorY;
	var bodyWidth = Ext.getBody().getWidth();
	var bodyHeight = Ext.getBody().getHeight();
	var popWidth = 80;
	var popHeight = 120;
	
	if(_cursorX > bodyWidth - popWidth){
		cursorX = bodyWidth - popWidth;
	}
	if(_cursorY > bodyHeight - popHeight){
		cursorY = bodyHeight - popHeight;
	}
	
	var popupMenu = Ext.getCmp("kradEvtPop");
	if(popupMenu == undefined){
		popupMenu = Ext.create("KRF_DEV.view.krad.kradEvtPop", {
			width: popWidth,
			height: popHeight,
			x: cursorX,
			y: cursorY,
			rchIds: rchIds,
			evt: evt,
			drawOption: drawOption,
			style:"background-image: url(./resources/images/button/option_bg1.png); border:0px;"
		}).show();
	}
	else{
		popupMenu.setX(cursorX);
		popupMenu.setY(cursorY);
		popupMenu.rchIds = rchIds;
		popupMenu.evt = evt;
		popupMenu.drawOption = drawOption;
	}
}

drawKRADLayer = function(){
	
	var coreMap = GetCoreMap();
	
	var kradStRchId = coreMap.kradLayerAdmin.stRchId;
	var kradEdRchId = coreMap.kradLayerAdmin.edRchId;
	
	var reachLineGraphics = coreMap.reachLayerAdmin_v3_New.lineGrpLayer.graphics;
	
	for(var i = 0; i < reachLineGraphics.length; i++){
		
		var rchId = reachLineGraphics[i].attributes.RCH_ID;
		if(rchId == kradStRchId || rchId == kradEdRchId){
			
			coreMap.reachLayerAdmin_v3_New.removeLine(reachLineGraphics[i], "lineGrpLayer");
		}
	}
	
	coreMap.kradLayerAdmin.drawKRADLayer();
}