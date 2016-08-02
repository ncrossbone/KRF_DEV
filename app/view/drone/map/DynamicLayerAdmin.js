Ext.define('KRF_DEV.view.drone.map.DynamicLayerAdmin', {
	map:null, 
	layer:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        // store에서 맵서비스 URL 가져오기
        var store = Ext.create('KRF_DEV.store.AppVariable');
    	store.load(function(){
    		
    		var visibleLayers = [2];
    		
    		this.each(function(record, cnt, totCnt){
    			//console.info(totCnt);
    			if(cnt == 0){
    				//console.info(record.get('MapserviceUrl1'));
	    			me.layer = new esri.layers.ArcGISDynamicMapServiceLayer(record.get('MapserviceUrl1'));
	    			me.layer.id = "DynamicLayer1";
	    			me.layer.visible = true;
	    			me.map.addLayer(me.layer);
    			}
    			else{
    				var layerDate = record.get('layerDate');
    				var layerId = record.get('layerId');
    				var ctlDate = Ext.getCmp('cboDate').value;
    				//console.info(layerDate);
    				if(layerDate == ctlDate)
    					visibleLayers.push(layerId);
    			}
    			
    			if(totCnt == cnt + 1){
    				//console.info(visibleLayers);
	    			me.layer.setVisibility(true);
    				//me.layer.setVisibility(false);
	    			me.layer.setVisibleLayers(visibleLayers);
	    			btn1Visible = true;
	    			btn4Visible = true;
    			}
    		});
    	});
    }
});