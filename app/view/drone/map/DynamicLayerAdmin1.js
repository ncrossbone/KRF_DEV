Ext.define('KRF_DEV.view.drone.map.DynamicLayerAdmin1', {
	map:null, 
	layer:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        me.layer = new esri.layers.ArcGISDynamicMapServiceLayer(Ext.mapServiceUrl);
    	
		me.layer.id = "DynamicLayer3";
		me.layer.visible = true;
		me.map.addLayer(me.layer);
		
		me.layer.setVisibility(false);
		//console.info(Ext.visibleLayers);
		
		var visibleLayerIds = [];
		
		for(var i = 0; i < Ext.visibleLayers.length; i++){
				visibleLayerIds.push(Ext.visibleLayers[i]);
			
			
		}
		//var visibleLayerIds = Ext.visibleLayers;
		if(Ext.nakdongDroneLayerId != undefined && Ext.nakdongDroneLayerId.length > 0){
			for(var i = 0; i < Ext.nakdongDroneLayerId.length; i++){
				//2015-10-06
				/*var nakdongDroneDate = "2015-10-06";
				//var nakdongDroneDate = Ext.getCmp("cboDate1").value;
				console.info(Ext.nakdongDroneDate[i]);
				if(nakdongDroneDate == Ext.nakdongDroneDate[i])*/
					visibleLayerIds.push(Ext.nakdongDroneLayerId[i]);
			}
		}
		if(Ext.northHanDroneLayerId != undefined && Ext.northHanDroneLayerId.length > 0){
			for(var i = 0; i < Ext.northHanDroneLayerId.length; i++){
				//var northHanDroneDate = Ext.getCmp("cboDate2").value;
				//var northHanDroneDate = Ext.getCmp("cboDate2").value;
				/*var northHanDroneDate = Ext.getCmp("cmbDrone2").value;
				//var northHanDroneDate = "2015-09-17";
				if(northHanDroneDate == Ext.northHanDroneDate[i])*/
					visibleLayerIds.push(Ext.northHanDroneLayerId[i]);
			}
		}
		
		if(Ext.hangangDroneLayerId != undefined && Ext.hangangDroneLayerId.length > 0){
			for(var i = 0; i < Ext.hangangDroneLayerId.length; i++){
				visibleLayerIds.push(Ext.hangangDroneLayerId[i]);
				//var hangangDroneDate = Ext.getCmp("cboDate4").value;
				/*var hangangDroneDate = "2015-09-21";
				if(hangangDroneDate == Ext.hangangDroneDate[i]){
					
				}*/
			}
		}
		if(Ext.geumDroneLayerId != undefined && Ext.geumDroneLayerId.length > 0){
			for(var i = 0; i < Ext.geumDroneLayerId.length; i++){
				visibleLayerIds.push(Ext.geumDroneLayerId[i]);
				//var geumDroneDate = Ext.getCmp("cboDate3").value;
				/*var geumDroneDate = "2015-10-07";
				if(geumDroneDate == Ext.geumDroneDate[i]){
					
					//console.info(Ext.geumDroneLayerId[i]);
				}*/
			}
		}
		//console.info(Ext.visibleLayers);
		me.layer.setVisibleLayers(visibleLayerIds);
    }
});