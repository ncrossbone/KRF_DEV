kradMetaInfo = function(rowData){
	var metaInfo = Ext.getCmp("kradMetaInfo");
	if(metaInfo != undefined){
		metaInfo.close();
	}
	
	var metaMainStore = Ext.create("KRF_DEV.store.krad.krad_metaMainInfo",{
		extDataId: rowData.record.data.EXT_DATA_ID
	});
	
	var metaStore = Ext.create("KRF_DEV.store.krad.krad_metaInfo",{
		extDataId: rowData.record.data.EXT_DATA_ID
	});
	
	var timerCnt = 0;
	var timerId = window.setInterval(function(){
		
		if(metaStore.data.items.length > 0 && metaMainStore.data.items.length > 0){
			
			window.clearInterval(timerId);
			
			var parsData = metaStore.data.items[0].data;
			var parsMainData = metaMainStore.data.items[0].data;
        	
			//parsData
        	
			var metaInfo = Ext.getCmp("kradMetaInfo");
        	if(metaInfo == undefined){
        		metaInfo = Ext.create("KRF_DEV.view.krad.kradMetaInfo");
        	}
        	metaInfo.show();
        	
			$.each(parsData, function(id, data){
				
				var elm = eval("Ext.get("+id+")");
				if(elm != undefined){
					elm.dom.textContent = data;
				}
                
				
			});
			$.each(parsMainData, function(id, data){
				
				var elm = eval("Ext.get("+id+")");
				if(elm != undefined){
					elm.dom.textContent = data;
				}
				
			});
			
		}
		else{
			
			timerCnt++;
			
			if(timerCnt > 5){
				alert("데이터가 없습니다");
				window.clearInterval(timerId);
			}
		}
	}, 500);
}

initKradEvt = function(){
	
	//SetBtnOnOff("btnMenu04", "off");
	//SetBtnOnOff("btnMenu05", "off");
	
	// 그래픽 레이어 초기화
	_krad.tmpGrpLayer.clear();
	// 이벤트 초기화
	_krad.offMapClickEvt();
	_krad.offTmpGrpEvt();
	_krad.offMapDragEvt();
	
	// 커서 디폴트
	Ext.get('_mapDiv__gc').setStyle('cursor','default');
}