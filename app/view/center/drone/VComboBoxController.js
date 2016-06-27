Ext.define('KRF_DEV.view.center.drone.VComboBoxController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.VComboBoxController',
	
	//기본 배열
	layer: ["0","1","3","2","4","10","11","12","13"],
	onlayer: [],
	
	// 수계선택 Change Event
	onAreaChange: function(item, newValue, oldValue, evt){
		/* 항공영상 바인딩 */
		var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
		this.comboBind(newValue, cboDroneDate, "DroneLayerId");
		cboDroneDate.setValue("");
		cboDroneDate.emptyText = "선택하세요";
		
		/* 클로로필a 바인딩 */
		var cboDroneChla = Ext.getCmp("cboDroneChla").down("combo");
		this.comboBind(newValue, cboDroneChla, "ChlaLayerId");
		cboDroneChla.emptyText = "선택하세요";
		//cboDroneChla.setValue("");
		
		/* 조류측정자료 바인딩 */
		var cboDroneWBSite = Ext.getCmp("cboDroneWBSite").down("combo");
		this.comboBind(newValue, cboDroneWBSite, "MeasureDate");
		//cboDroneWBSite.setValue("");
		cboDroneWBSite.emptyText = "선택하세요";
		
		
		/* 지점목록 바인딩 */
		var cboDroneSiteList = Ext.getCmp("cboDroneSiteList").down("combo");
		cboDroneSiteList.value = "선택하세요";
		
		var siteListStore = "";
		//cboDroneSiteList.setValue("선택하세요.");
		
		//지점목록 분기
		if(newValue == "R02"){
			siteListStore = Ext.create("KRF_DEV.store.drone.FeatureStoreLayerAdmin1");
		}else if(newValue == "R01_1"){
			siteListStore = Ext.create("KRF_DEV.store.drone.FeatureStoreLayerAdmin2");
		}else if(newValue == "R01_2"){
			siteListStore = Ext.create("KRF_DEV.store.drone.FeatureStoreLayerAdmin3");
		}else{
			siteListStore = Ext.create("KRF_DEV.store.drone.FeatureStoreLayerAdmin4");
		}
		
		siteListStore.load();
		cboDroneSiteList.setStore(siteListStore);
		
		
		
		this.SetInitialExtent(newValue);
		
	},
	
	onBoChange: function(item, newValue, oldValue, evt){
		var tmX = item.lastSelectedRecords[0].data.tmX;
		var tmY = item.lastSelectedRecords[0].data.tmY;

		this.SetCenter(tmX,tmY);
	},
	
	/* 항공영상 Change Event */
	onDroneDateChange: function(item, newValue, oldValue, evt){
		if(newValue != null && newValue != ""){
			/* 클로로필a Set Value */
			var chlaLayerId = item.lastSelectedRecords[0].data.ChlaLayerId;
			var cboDroneChla = Ext.getCmp("cboDroneChla").down("combo");
			this.comboChange(newValue, cboDroneChla, chlaLayerId);
			
			/* 조류측정자료 Set Value */
			var measureDate = item.lastSelectedRecords[0].data.MeasureDate;
			var cboDroneWBSite = Ext.getCmp("cboDroneWBSite").down("combo");
			this.comboChange(newValue, cboDroneWBSite, measureDate);
			
			var dateValue = item.lastSelectedRecords[0].data
			
			//레이어 on / off
			this.layer.push(newValue);
			console.info(this.layer);
			
			//이전 레이어 삭제
			if(KRF_DEV.getApplication().delValue != null){
				this.layer.splice(this.layer.indexOf(KRF_DEV.getApplication().delValue),1);
			}
			
			//이전 선택된 레이어 삭제하기 위해서 전역변수 설정  ** 수계를 변경하면 oldValue에 데이더가 남지 않음
			KRF_DEV.getApplication().delValue = newValue;
			
			
			var cboDroneLayer = Ext.getCmp("cboDroneLayer").down("combo");
			var store = cboDroneLayer.getStore();
			console.info(store.data.items[5].data.layerOnOff);
			
			var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
			//record.data.layerId
			
			for(var i = 0; i < cboDroneDate.getStore().data.items.length ; i++){
				console.info(cboDroneDate.getStore().data.items[i].data.DroneLayerId);
				console.info(KRF_DEV.getApplication().delValue);
				if(cboDroneDate.getStore().data.items[i].data.DroneLayerId == KRF_DEV.getApplication().delValue){
					if(store.data.items[5].data.layerOnOff == "on"){
						this.layer.push(cboDroneDate.getStore().data.items[i].data.ChlaLayerId);
						this.layer.splice(this.layer.indexOf(KRF_DEV.getApplication().chalLayerId),1);
					}else{
						if(KRF_DEV.getApplication().chalLayerId != undefined){
							console.info(KRF_DEV.getApplication().chalLayerId);
							this.layer.splice(this.layer.indexOf(KRF_DEV.getApplication().chalLayerId),1);
						}
					}
				}
			}
			
			
			
			// featurelayer on/off
			this.SetFeatureLayer(dateValue);
			
			
			this.LayerVisibility();
		    
			
			
		}
	},
	/* 클로로필a Change Event */
	onDroneChlaChange: function(item, newValue, oldValue, evt){
		
		if(newValue != null && newValue != ""){
			
			/* 항공영상 Set Value */
			var droneLayerId = item.lastSelectedRecords[0].data.DroneLayerId;
			var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
			this.comboChange(newValue, cboDroneDate, droneLayerId);
			
			/* 조류측정자료 Set Value */
			var measureDate = item.lastSelectedRecords[0].data.MeasureDate;
			var cboDroneWBSite = Ext.getCmp("cboDroneWBSite").down("combo");
			this.comboChange(newValue, cboDroneWBSite, measureDate);
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
		}
	},
	
	// Combo Change 시 아무것도 안하는 펑션..
	onComboChangeEmpty: function(){
		
	},
	
	// 레이어 선택 Combo Item Click Event
	onDroneLayerClick: function(list, record, liEm, index, divEm){
		
		console.info(this.layer);
		
		var layerNum = "";
		layerNum = record.data.layerId;
		
		
		var me = Ext.getCmp('_mapDiv_');
		var cboDroneArea = Ext.getCmp("cboDroneArea").down("combo");
		var activeLayer= "";
		
		
		
		
		
		if(record.data.layerOnOff == "on"){
			record.data.layerOnOff = "off";
			record.data.image1 = record.data.image1.replace("_on", "_off");
			
			if(layerNum == "Drone"){
				console.info(KRF_DEV.getApplication().delValue);
				this.layer.splice(this.layer.indexOf(KRF_DEV.getApplication().delValue),1);
			}else if(layerNum == "Chla"){
				var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
				//record.data.layerId
				for(var i = 0; i < cboDroneDate.getStore().data.items.length ; i++){
					if(cboDroneDate.getStore().data.items[i].data.DroneLayerId == KRF_DEV.getApplication().delValue){
						console.info(cboDroneDate.getStore().data.items[i].data);
						this.layer.splice(this.layer.indexOf(KRF_DEV.getApplication().chalLayerId),1);
					}
				}
			}else if(layerNum == "3"){
				if(cboDroneArea.lastValue == "R02"){
					activeLayer = me.map.getLayer("DroneFeatureLayer1");
					activeLayer.setVisibility(false);
				}else if(cboDroneArea.lastValue == "R01_1"){
					activeLayer = me.map.getLayer("DroneFeatureLayer2");
					activeLayer.setVisibility(false);
				}else if(cboDroneArea.lastValue == "R01_2"){
					activeLayer = me.map.getLayer("DroneFeatureLayer3");
					activeLayer.setVisibility(false);
				}else{
					activeLayer = me.map.getLayer("DroneFeatureLayer4");
					activeLayer.setVisibility(false);
				}
				this.layer.splice(this.layer.indexOf(layerNum),1);
			}else{
				this.layer.splice(this.layer.indexOf(layerNum),1);
			}
			
		}else{
			record.data.layerOnOff = "on";
			record.data.image1 = record.data.image1.replace("_off", "_on");
			
			if(layerNum == "Drone"){
				this.layer.push(KRF_DEV.getApplication().delValue);
			}else if(layerNum == "Chla"){
				var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
				//record.data.layerId
				for(var i = 0; i < cboDroneDate.getStore().data.items.length ; i++){
					if(cboDroneDate.getStore().data.items[i].data.DroneLayerId == KRF_DEV.getApplication().delValue){
						console.info(cboDroneDate.getStore().data.items[i].data);
						this.layer.push(cboDroneDate.getStore().data.items[i].data.ChlaLayerId);
						KRF_DEV.getApplication().chalLayerId = cboDroneDate.getStore().data.items[i].data.ChlaLayerId;
					}
				}
				//console.info(cboDroneDate.getStore());
			}else if(layerNum == "3"){
				if(cboDroneArea.lastValue == "R02"){
					activeLayer = me.map.getLayer("DroneFeatureLayer1");
					activeLayer.setVisibility(true);
				}else if(cboDroneArea.lastValue == "R01_1"){
					activeLayer = me.map.getLayer("DroneFeatureLayer2");
					activeLayer.setVisibility(true);
				}else if(cboDroneArea.lastValue == "R01_2"){
					activeLayer = me.map.getLayer("DroneFeatureLayer3");
					activeLayer.setVisibility(true);
				}else{
					activeLayer = me.map.getLayer("DroneFeatureLayer4");
					activeLayer.setVisibility(true);
				}
				this.layer.push(record.data.layerId);
			}else{
				this.layer.push(record.data.layerId);
			}
			
			
		}
		console.info(this.layer);
		var cboDroneLayer = Ext.getCmp("cboDroneLayer").down("combo");
		var store = cboDroneLayer.getStore();
		console.info(store);
		
		store.insert(index, record);
		
		
		this.LayerVisibility();
		
		
		
		
		//console.info();
		
	},
	
	// Combo Item Click 시 아무것도 안하는 펑션..
	onItemClickEmpty: function(){
		
	},
	
	// 콤보 데이터 바인딩
	comboBind: function(dataRoot, comboCtl, keyName){
		
		var fields = ["layerId", "layerName", "layerOnOff", "layerImg", "layerOnImg", "layerOffImg",
		              "DroneDate", "MeasureDate", "ChlaLayerId", "ChlaDate", "layerNm"];
		var jsonUrl = "./resources/data/drone/LayerMapper.json";
		
		var comboStore = Ext.create("Ext.data.Store", {
			fields: fields,
			proxy: {
				type: "ajax",
				url: jsonUrl,
				reader: {type: "json", root: dataRoot}
			}
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
	
	
	LayerVisibility: function(){
		
		var me = Ext.getCmp('_mapDiv_');
		if(me.map == null){
			return;
		}
		
		//맵 불러오기
		var activeLayer = me.map.getLayer("DynamicLayer3");
		
		if(this.layer.length > 0)
			activeLayer.setVisibility(true);
		else
			activeLayer.setVisibility(false);
		
		var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
		var cboDroneChla = Ext.getCmp("cboDroneChla").down("combo");
		
		var layers = [];
		
		var cboDroneLayer = Ext.getCmp("cboDroneLayer").down("combo");
		var layerStore = cboDroneLayer.getStore();
		
		var droneOnOff = "";
		var chlOnOff = "";
		var wbSiteOnOff = "";
		
		layerStore.each(function(obj){
			//console.info(obj);
			if(obj.data.layerId == "Drone"){
				droneOnOff = obj.data.layerOnOff;
			}
			
			if(obj.data.layerId == "Chla"){
				chlOnOff = obj.data.layerOnOff;
			}
		});
		
		if(droneOnOff == "on"){
			if(cboDroneDate.value != null)
				layers.push(cboDroneDate.value)
		}
		
		if(chlOnOff == "on"){
			if(cboDroneChla.value != null)
				layers.push(cboDroneChla.value)
		}
		
		activeLayer.setVisibleLayers([-1]);
		if(layers.length > 0)
			activeLayer.setVisibleLayers(layers);
		
	},
	
	//featureLayer on / off
	SetFeatureLayer: function(itemValue){
		
		
		var cboDroneArea = Ext.getCmp("cboDroneArea").down("combo");
		
		var mapCtl = Ext.getCmp('_mapDiv_');

		console.info(itemValue);
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
    		console.info(activeLayer);
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
    	}else{// 금강 수계
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
    	}
    	
	},
	
	//수계 선택시 해당지점 이동
	SetInitialExtent: function (areaNmae){
		
		var me = Ext.getCmp("_mapDiv_");
	    
	    var varXmin, varXmax, varYmin, varYmax, level;
	    
	    if(areaNmae == "R02"){
	    	varXmin = 14162864.094933428;
	    	varYmin = 4185768.1074254746;
	    	varXmax = 14567980.344845016;
	    	varYmax = 4353929.569652926;
	    	level = 10;
	    }
	    
	    if(areaNmae == "R01_1"){
	    	varXmin = 14060591.785402454;
	    	varYmin = 4442594.7852055635;
	    	varXmax = 14465708.035314042;
	    	varYmax = 4610756.247433016;
	    	level = 10;
	    }
	    
	    if(areaNmae == "R01_2"){
	    	varXmin = 14005404.250980537;
	    	varYmin = 4424402.772473685;
	    	varXmax = 14410520.500892125;
	    	varYmax = 4592564.234701138;
	    	level = 10;
	    	
	    }
	    
	    if(areaNmae == "R04"){
	    	varXmin = 14033380.203332923;
	    	varYmin = 4263426.390905042;
	    	varXmax = 14438496.453244511;
	    	varYmax = 4431587.853132495;
	    	level = 10;
	    }
	    
		var extent = new esri.geometry.Extent({
			xmin: varXmin,
			ymin: varYmin,
			xmax: varXmax,
			ymax: varYmax,
	        spatialReference: {
	      	  wkid: 102100
	        }
	    });
		
		me.map.centerAndZoom(extent.getCenter(), level);
	},
	
	SetCenter: function(tmX,tmY){
		
		
		var mapCtl = Ext.getCmp('_mapDiv_');
		
		var point = new esri.geometry.Point({ "x": tmX, "y": tmY, " spatialReference": { " wkid": 102100} });
		mapCtl.map.centerAndZoom(point, 15);
		
		
	}
	
});
