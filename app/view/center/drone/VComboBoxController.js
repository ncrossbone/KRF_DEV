Ext.define('KRF_DEV.view.center.drone.VComboBoxController', {
	
	extend: 'Ext.app.ViewController',

	id: "VComboBoxController",
	alias: 'controller.VComboBoxController',
	
	//기본 배열
	layer: ["0","1","3","2","4","10","11","12","13"],
	onlayer: [],
	clickItemId: "",
    centerPointTemp:{
        "R01_1":{x:14177081.816509107,y:4537988.1965055},// 북한강 
        "R01_2":{x:14116237.941994082,y:4518420.317264488},// 한강하류
        "R02":{x:14295100.153866833,y:4268778.720143207},// 낙동강
        "R04":{x:14159807.04811665,y:4358514.054091838},// 금강
        "R05":{x:14088109.11558513,y:4153051.3220612053}//영산강
    },
	//초기화 버튼
	onClickResetButton: function(){

		KRF_DEV.global.DroneFn.onClickResetButton();
		//KRF_DEV.global.DroneFn.LayerVisibility();
	},
	// 수계선택 Change Event
	onAreaChange: function(item, newValue, oldValue, evt){
		
		var me = this;
		
		
		
		
		
		/* 항공영상 바인딩 */
		var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
		this.comboBind(newValue, cboDroneDate, "DroneLayerId", "DESC");
		cboDroneDate.setValue(""); //동일데이터가 있을수 있음 
//		cboDroneDate.emptyText = "선택하세요";
		
		/* 클로로필a 바인딩 */
		var cboDroneChla = Ext.getCmp("cboDroneChla").down("combo");
		this.comboBind(newValue, cboDroneChla, "ChlaLayerId", "DESC");
		cboDroneChla.setValue("");
		
		/* 조류측정자료 바인딩 */
		var cboDroneWBSite = Ext.getCmp("cboDroneWBSite").down("combo");
		this.comboBind(newValue, cboDroneWBSite, "MeasureDate", "DESC");
		cboDroneWBSite.setValue("");
		
		/* 피코시안 바인딩 */
		var cboDronePhy = Ext.getCmp("cboDronePhy").down("combo");
		this.comboBind(newValue, cboDronePhy, "PhyLayerId", "DESC");
		cboDronePhy.setValue("");
		
		
		/* 지점목록 바인딩 */
		var cboDroneSiteList = Ext.getCmp("cboDroneSiteList").down("combo");
		cboDroneSiteList.value = "선택하세요";
		
		
		var cboDroneLayer =Ext.getCmp("cboDroneLayer").down("combo");
		//cboDroneLayer.emptyText = "선택하세요";
		
		var siteListStore = "";
		//cboDroneSiteList.setValue("선택하세요.");
		
		//지점목록 분기
		if(newValue == "R02"){
			siteListStore = Ext.create("KRF_DEV.store.drone.FeatureStoreLayerAdmin1");
		}else if(newValue == "R01_1"){
			siteListStore = Ext.create("KRF_DEV.store.drone.FeatureStoreLayerAdmin2");
		}else if(newValue == "R01_2"){
			siteListStore = Ext.create("KRF_DEV.store.drone.FeatureStoreLayerAdmin3");
		}else if(newValue == "R04"){
			siteListStore = Ext.create("KRF_DEV.store.drone.FeatureStoreLayerAdmin4");
		}else{
			siteListStore = Ext.create("KRF_DEV.store.drone.FeatureStoreLayerAdmin5");
		}
		//console.info(siteListStore);
		siteListStore.load();
		cboDroneSiteList.setStore(siteListStore);
		
		
		
		this.SetInitialExtent(newValue);
		
		var droneLayerId = "";
		var drone = "";
		var measureDate = "";
		var phyLayerId = "";
		
		Ext.defer(function(){
			
			var store = cboDroneDate.getStore();
			droneLayerId = store.data.items[0].data.DroneLayerId;
			drone = store.data.items[0].data;
			measureDate = store.data.items[0].data.MeasureDate;
			phyLayerId = store.data.items[0].data.PhyLayerId;
			/*for(var i = 0 ; i<store.data.items.length ; i++){
				if(i == store.data.items.length-1){
					droneLayerId = store.data.items[0].data.DroneLayerId;
					drone = store.data.items[0].data;
					measureDate = store.data.items[0].data.MeasureDate;
				}
			}*/
			
			me.defaultDate(droneLayerId,measureDate,drone,phyLayerId);
		}, 100);
		
	},
	
	onBoChange: function(item, newValue, oldValue, evt){
		var tmX = item.lastSelectedRecords[0].data.tmX;
		var tmY = item.lastSelectedRecords[0].data.tmY;

		this.SetCenter(tmX,tmY);
	},
	
	/* Default Event */
	defaultDate: function(droneLayerId,measureDate,drone,phyLayerId){
		
		if(droneLayerId != null && droneLayerId != ""){
			/* 클로로필a Set Value */
			var chlaLayerId = "";
			var cboDroneChla = Ext.getCmp("cboDroneChla").down("combo");
			this.comboChange(droneLayerId, cboDroneChla, chlaLayerId);
			
			
			/* 조류측정자료 Set Value */
			var measureDate = measureDate;
			var cboDroneWBSite = Ext.getCmp("cboDroneWBSite").down("combo");
			this.comboChange(droneLayerId, cboDroneWBSite, measureDate);
			
			
			
			// featurelayer on/off
			this.SetFeatureLayer(drone);
			
			
			KRF_DEV.global.DroneFn.LayerVisibility();
		    
			
			
		}
	},
	/* 항공영상 Change Event */
	onDroneDateChange: function(item, newValue, oldValue, evt){
		if(newValue != null && newValue != ""){
			/* 클로로필a Set Value */
			var chlaLayerId = item.lastSelectedRecords[0].data.ChlaLayerId;
			var cboDroneChla = Ext.getCmp("cboDroneChla").down("combo");
			this.comboChange(newValue, cboDroneChla, chlaLayerId);
			
			/* 피코시안 Set Value */
			var phyLayerId = item.lastSelectedRecords[0].data.PhyLayerId;
			var cboDronePhy = Ext.getCmp("cboDronePhy").down("combo");
			this.comboChange(newValue, cboDronePhy, phyLayerId);
			
			/* 조류측정자료 Set Value */
			var measureDate = item.lastSelectedRecords[0].data.MeasureDate;
			var cboDroneWBSite = Ext.getCmp("cboDroneWBSite").down("combo");
			this.comboChange(newValue, cboDroneWBSite, measureDate);
			
			var dateValue = item.lastSelectedRecords[0].data;
			
			
			// featurelayer on/off
			this.SetFeatureLayer(dateValue);
			
			
			KRF_DEV.global.DroneFn.LayerVisibility();
		    
			
			
		}
	},
	/* 클로로필a Change Event */
	onDroneChlaChange: function(item, newValue, oldValue, evt){
		
		if(newValue != null && newValue != ""){
			
			/* 항공영상 Set Value */
			var droneLayerId = item.lastSelectedRecords[0].data.DroneLayerId;
			var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
			this.comboChange(newValue, cboDroneDate, droneLayerId);
			
			/* 피코시안 Set Value */
			var phyLayerId = item.lastSelectedRecords[0].data.PhyLayerId;
			var cboDronePhy = Ext.getCmp("cboDronePhy").down("combo");
			this.comboChange(newValue, cboDronePhy, phyLayerId);
			
			/* 조류측정자료 Set Value */
			var measureDate = item.lastSelectedRecords[0].data.MeasureDate;
			var cboDroneWBSite = Ext.getCmp("cboDroneWBSite").down("combo");
			this.comboChange(newValue, cboDroneWBSite, measureDate);
			
		}
	},
	
	/* 피코시안 Change Event */
	onDronePhyChange: function(item, newValue, oldValue, evt){
		if(newValue != null && newValue != ""){
			
			/* 항공영상 Set Value */
			var droneLayerId = item.lastSelectedRecords[0].data.DroneLayerId;
			var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
			this.comboChange(newValue, cboDroneDate, droneLayerId);
			
			/* 조류측정자료 Set Value */
			var measureDate = item.lastSelectedRecords[0].data.MeasureDate;
			var cboDroneWBSite = Ext.getCmp("cboDroneWBSite").down("combo");
			this.comboChange(newValue, cboDroneWBSite, measureDate);
			
			/* 클로로필a Set Value */
			var chlaLayerId = item.lastSelectedRecords[0].data.ChlaLayerId;
			var cboDroneChla = Ext.getCmp("cboDroneChla").down("combo");
			this.comboChange(newValue, cboDroneChla, chlaLayerId);
			
		}
	},
	
	/* 조류측정자료 Change Event */
	onDroneWBSiteChange: function(item, newValue, oldValue, evt){
		
		if(newValue != null && newValue != ""){
			
			/* 항공영상 Set Value */
			var droneLayerId = item.lastSelectedRecords[0].data.DroneLayerId;
			var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
			this.comboChange(newValue, cboDroneDate, droneLayerId);
			
			/* 클로로필a Set Value */
			var chlaLayerId = item.lastSelectedRecords[0].data.ChlaLayerId;
			var cboDroneChla = Ext.getCmp("cboDroneChla").down("combo");
			this.comboChange(newValue, cboDroneChla, chlaLayerId);
			
			/* 피코시안 Set Value */
			var phyLayerId = item.lastSelectedRecords[0].data.PhyLayerId;
			var cboDronePhy = Ext.getCmp("cboDronePhy").down("combo");
			this.comboChange(newValue, cboDronePhy, phyLayerId);
		}
	},
	
	// Combo Change 시 아무것도 안하는 펑션..
	onComboChangeEmpty: function(){
		
	},
	
	// 레이어 선택 Combo Item Click Event
	onDroneLayerClick: function(list, record, liEm, index, divEm){
		var layerNum = "";
		layerNum = record.data.layerId;
		
		var me = Ext.getCmp('_mapDiv_');
		var cboDroneArea = Ext.getCmp("cboDroneArea").down("combo");
		
		var activeLayer= "";
		
		
		
		if(record.data.layerOnOff == "on"){
			record.data.layerOnOff = "off";
			
			record.data.image1 = record.data.image1.replace("_on", "_off");
			
			if(cboDroneArea.rawValue != ""){
				if(layerNum == "3"){
					if(cboDroneArea.lastValue == "R02"){
						activeLayer = me.map.getLayer("DroneFeatureLayer1");
						activeLayer.setVisibility(false);
					}else if(cboDroneArea.lastValue == "R01_1"){
						activeLayer = me.map.getLayer("DroneFeatureLayer2");
						activeLayer.setVisibility(false);
					}else if(cboDroneArea.lastValue == "R01_2"){
						activeLayer = me.map.getLayer("DroneFeatureLayer3");
						activeLayer.setVisibility(false);
					}else if(cboDroneArea.lastValue == "R04"){
						activeLayer = me.map.getLayer("DroneFeatureLayer4");
						activeLayer.setVisibility(false);
					}else{
						activeLayer = me.map.getLayer("DroneFeatureLayer5");
						activeLayer.setVisibility(false);
					}
				}

			}
			
		}else{
			record.data.layerOnOff = "on";
			record.data.image1 = record.data.image1.replace("_off", "_on");
			if(cboDroneArea.rawValue != ""){
				if(layerNum == "3"){
					if(cboDroneArea.lastValue == "R02"){
						activeLayer = me.map.getLayer("DroneFeatureLayer1");
					}else if(cboDroneArea.lastValue == "R01_1"){
						activeLayer = me.map.getLayer("DroneFeatureLayer2");
					}else if(cboDroneArea.lastValue == "R01_2"){
						activeLayer = me.map.getLayer("DroneFeatureLayer3");
					}else if(cboDroneArea.lastValue == "R04"){
						activeLayer = me.map.getLayer("DroneFeatureLayer4");
					}else{
						activeLayer = me.map.getLayer("DroneFeatureLayer5");
					}
					activeLayer.setVisibility(true);
				}
			}	
		}
		
		var cboDroneLayer = Ext.getCmp("cboDroneLayer").down("combo");
		var store = cboDroneLayer.getStore();
		
		if(record.data.layerId == "Phy"){
			
			store.data.items[3].data.layerOnOff = "off";
			store.data.items[3].data.image1 = "<img src='./resources/images/drone/chk_off.png' style='vertical-align: middle; margin-bottom: 0.25em;' />";
			store.insert(index-1, store.data.items[3].data);
			store.insert(index, record);
		}else if(record.data.layerId == "Chla"){
			store.data.items[4].data.layerOnOff = "off";
			store.data.items[4].data.image1 = "<img src='./resources/images/drone/chk_off.png' style='vertical-align: middle; margin-bottom: 0.25em;' />";
			store.insert(index+1, store.data.items[4].data);
			store.insert(index, record);
		}else{
			store.insert(index, record);
			
		}

		KRF_DEV.global.DroneFn.LayerVisibility();
	},
	
	// Combo Item Click 시 아무것도 안하는 펑션..
	onItemClickEmpty: function(item,record){
	
		var cboDroneLayer = Ext.getCmp("cboDroneLayer").down("combo");
		var layerStore = cboDroneLayer.getStore();
		
		var index = -1;
		
		layerStore.each(function(obj, cnt){
			
			if(item.itemId == "cboDroneChla" || item.itemId == "cboDroneArea"){
				if(obj.data.layerId == "Chla"){
					index = cnt;
					obj.data.layerOnOff = "on";
					obj.data.image1 = obj.data.image1.replace("_off", "_on");
					layerStore.insert(index,obj);
				}else if(obj.data.layerId == "Phy"){
					index = cnt;
					obj.data.layerOnOff = "off";
					obj.data.image1 = obj.data.image1.replace("_on", "_off");
					layerStore.insert(index,obj);
				}
			}else if(item.itemId == "cboDronePhy"){
				if(obj.data.layerId == "Chla"){
					index = cnt;
					obj.data.layerOnOff = "off";
					obj.data.image1 = obj.data.image1.replace("_on", "_off");
					layerStore.insert(index,obj);
				}else if(obj.data.layerId == "Phy"){
					index = cnt;
					obj.data.layerOnOff = "on";
					obj.data.image1 = obj.data.image1.replace("_off", "_on");
					layerStore.insert(index,obj);
				}
			} 
		});
		
        KRF_DEV.global.DroneFn.LayerVisibility();
		/*var store = cboDroneLayer.getStore();
		store.insert(index, record);*/
		
	},
	
	// 콤보 데이터 바인딩
	comboBind: function(dataRoot, comboCtl, keyName, sort){
		
		var fields = ["layerId", "layerName", "layerOnOff", "layerImg", "layerOnImg", "layerOffImg",
		              "DroneDate", "MeasureDate", "ChlaLayerId", "ChlaDate", "layerNm", "PhyData", "PhyLayerId"];
		var jsonUrl = "./resources/data/drone/LayerMapper.json";
		
		var sorters = [];
		
		if(sort != undefined && sort != null){
			
			sorters.push({
				property: comboCtl.displayField,
				direction: sort
			});
		}
		
		var comboStore = Ext.create("Ext.data.Store", {
			fields: fields,
			proxy: {
				type: "ajax",
				url: jsonUrl,
				reader: {type: "json", root: dataRoot}
			},
			sorters: sorters
		});
		
		comboStore.load();
		
		comboStore.filterBy(function(record){
			
			if(record.get(keyName) != ""){
				
				return record;
			}
		});
		comboCtl.setStore(comboStore);
	},
	
		
	
	
	// 콤보 체인지 시 데이터 연결
	comboChange: function(newValue, comboCtl, keyValue){
		
		if(newValue != null && newValue != ""){
			comboCtl.setValue(keyValue);
		}
		else{
			comboCtl.setValue("");
		}
	},
	
	
	
	//featureLayer on / off
	SetFeatureLayer: function(itemValue){
		
		
		var cboDroneArea = Ext.getCmp("cboDroneArea").down("combo");
		
		var mapCtl = Ext.getCmp('_mapDiv_');

		
		//수계확인
    	if(cboDroneArea.lastValue == "R02"){//낙동강 수계
    		var mapCtl = Ext.getCmp('_mapDiv_');
    		if(mapCtl != undefined && mapCtl.map != undefined && mapCtl.map != null){
            	var layer = mapCtl.map.getLayer("DroneFeatureLayer1");
            	if(layer != undefined){
            		mapCtl.map.removeLayer(layer);
            	}
            	var layer = mapCtl.map.getLayer("labels");
            	if(layer != undefined){
            		mapCtl.map.removeLayer(layer);
            	}
            	mapCtl.featureLayerAdmin = Ext.create('KRF_DEV.view.drone.map.DroneFeatureLayerAdmin1', mapCtl.map,itemValue);
    		}
    		
    		
    		
    		var activeLayer = mapCtl.map.getLayer("DroneFeatureLayer1");
    		
    	}else if(cboDroneArea.lastValue == "R01_1"){//북한강 수계
    		var mapCtl = Ext.getCmp('_mapDiv_');
        	if(mapCtl != undefined && mapCtl.map != undefined && mapCtl.map != null){
            	var layer = mapCtl.map.getLayer("DroneFeatureLayer2");
            	if(layer != undefined){
            		mapCtl.map.removeLayer(layer);
            	}
            	var layer = mapCtl.map.getLayer("labels");
            	if(layer != undefined){
            		mapCtl.map.removeLayer(layer);
            	}
            	mapCtl.featureLayerAdmin = Ext.create('KRF_DEV.view.drone.map.DroneFeatureLayerAdmin2', mapCtl.map,itemValue);
        	}
    	}else if(cboDroneArea.lastValue == "R01_2"){//한강하류
    		var mapCtl = Ext.getCmp('_mapDiv_');
        	if(mapCtl != undefined && mapCtl.map != undefined && mapCtl.map != null){
            	var layer = mapCtl.map.getLayer("DroneFeatureLayer3");
            	if(layer != undefined){
            		mapCtl.map.removeLayer(layer);
            	}
            	var layer = mapCtl.map.getLayer("labels");
            	if(layer != undefined){
            		mapCtl.map.removeLayer(layer);
            	}
            	mapCtl.featureLayerAdmin = Ext.create('KRF_DEV.view.drone.map.DroneFeatureLayerAdmin3', mapCtl.map,itemValue);
        	}
    	}else if(cboDroneArea.lastValue == "R04"){//금강
    		var mapCtl = Ext.getCmp('_mapDiv_');
        	if(mapCtl != undefined && mapCtl.map != undefined && mapCtl.map != null){
            	var layer = mapCtl.map.getLayer("DroneFeatureLayer4");
            	if(layer != undefined){
            		mapCtl.map.removeLayer(layer);
            	}
            	var layer = mapCtl.map.getLayer("labels");
            	if(layer != undefined){
            		mapCtl.map.removeLayer(layer);
            	}
            	mapCtl.featureLayerAdmin = Ext.create('KRF_DEV.view.drone.map.DroneFeatureLayerAdmin4', mapCtl.map,itemValue);
        	}
    	}else{// 영산강 수계
    		var mapCtl = Ext.getCmp('_mapDiv_');
        	if(mapCtl != undefined && mapCtl.map != undefined && mapCtl.map != null){
            	var layer = mapCtl.map.getLayer("DroneFeatureLayer5");
            	if(layer != undefined){
            		mapCtl.map.removeLayer(layer);
            	}
            	var layer = mapCtl.map.getLayer("labels");
            	if(layer != undefined){
            		mapCtl.map.removeLayer(layer);
            	}
            	mapCtl.featureLayerAdmin = Ext.create('KRF_DEV.view.drone.map.DroneFeatureLayerAdmin5', mapCtl.map,itemValue);
        	}
    	}
    	
	},
	
	//수계 선택시 해당지점 이동
	SetInitialExtent: function (areaNmae){
		var me = Ext.getCmp("_mapDiv_");
        me.map.centerAndZoom(new esri.geometry.Point($.extend({type:'point', spatialReference:{wkid:102100}}, this.centerPointTemp[areaNmae])), 10);
	},
	
	SetCenter: function(tmX,tmY){
        var mapCtl = Ext.getCmp('_mapDiv_');
        mapCtl.map.centerAndZoom(new esri.geometry.Point({ x: tmX, y: tmY, spatialReference: { wkid: 4326} }), 13);
	},
	
	ChloPhycoOnOff: function(){
		var cboDroneLayer = Ext.getCmp("cboDroneLayer").down("combo");
		var layerStore = cboDroneLayer.getStore();
		
//		console.info(layerStore);
			
	}
	
});
