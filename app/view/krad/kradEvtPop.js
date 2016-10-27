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
		
		require(["esri/symbols/SimpleMarkerSymbol",
		         "dojo/_base/Color"],
				function(SimpleMarkerSymbol,
						Color){
			
			var overSymbol = new SimpleMarkerSymbol();
			overSymbol.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			overSymbol.setSize(30);
			overSymbol.setColor(new Color([255,0,0,1]));
			
			var outSymbol = new SimpleMarkerSymbol();
			outSymbol.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			outSymbol.setSize(10);
			outSymbol.setColor(new Color([255,0,0,1]));
		
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
					
					coreMap.kradLayerAdmin.drawDataGrp(me.rchIds, "Point", me.drawOption, me.evt);
					
					return;
					
					var kradPELayer = coreMap.map.getLayer("kradPELayer");
					
					kradPELayer.setVisibility(true);
					
					require(["dojo/on"],
							function(on){
						
						var kradPELayer_mouseover = on(kradPELayer, "mouse-over", function(evt){
			        		
							evt.graphic.setSymbol(overSymbol);
			        	});
						
						var kradPELayer_mouseout = on(kradPELayer, "mouse-out", function(evt){
			        		
							evt.graphic.setSymbol(outSymbol);
			        	});
						
			        	var kradPELayer_click = on(kradPELayer, "click", function(evt){
			        		
			        		if(me.drawOption == "startPoint" || me.drawOption == "start"){
			        			// 그래픽 레이어에 선택된 Attribute 셋팅 (시작위치)
				        		kradPELayer.ST_EXT_DATA_ID = evt.graphic.attributes.EXT_DATA_ID;
				        		kradPELayer.ST_POINT_EVENT_ID = evt.graphic.attributes.POINT_EVENT_ID;
				        		kradPELayer.ST_EVENT_ORDER = evt.graphic.attributes.EVENT_ORDER;
				        		kradPELayer.ST_RCH_ID = evt.graphic.attributes.RCH_ID;
			    			}
			    			if(me.drawOption == "endPoint" || me.drawOption == "end"){
			    				// 그래픽 레이어에 선택된 Attribute 셋팅 (끝위치)
				        		kradPELayer.ED_EXT_DATA_ID = evt.graphic.attributes.EXT_DATA_ID;
				        		kradPELayer.ED_POINT_EVENT_ID = evt.graphic.attributes.POINT_EVENT_ID;
				        		kradPELayer.ED_EVENT_ORDER = evt.graphic.attributes.EVENT_ORDER;
				        		kradPELayer.ED_RCH_ID = evt.graphic.attributes.RCH_ID;
			    			}
			        		
			        		coreMap.reachLayerAdmin_v3_New.drawEnd(btnId);
							coreMap.reachLayerAdmin_v3_New.drawSymbol(evt.graphic.geometry, symbol, me.drawOption); // 심볼 그리기
							coreMap.reachLayerAdmin_v3_New.selectLineWithWhere(where, me.drawOption); // 라인 검색
							
							kradPELayer_mouseout.remove();
							kradPELayer_mouseover.remove();
							kradPELayer_click.remove();
							
							evt.graphic.setSymbol(outSymbol);
							kradPELayer.setVisibility(false);
							
							me.close();
			        	});
					});
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
		});
		
		me.callParent();
	}

});