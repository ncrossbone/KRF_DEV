Ext.define('KRF_DEV.view.south.pollution.SearchResultGrid_Pollution_01', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'searchResultGrid_Pollution_01',
	
	id: 'searchResultPollution_01_container',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			cls: 'khLee-x-column-header-text',
			//plugins: ['bufferedrenderer', 'gridfilters'],
			plugins: ['bufferedrenderer', 'gridfilters'],
			siteIds: "",
			parentIds: [],
			header: {
				height: 5
			},
			title: '검색결과',
			siteId: '',
			beforeRender: function(){
				
				var me = this;
				var parentCtl = this.findParentByType("window");
				
				me.setWidth(parentCtl.getWidth() - 10);
				me.setHeight(parentCtl.getHeight() - 110);
				
				parentCtl.on("resize", function(){
					////console.info(parentCtl);
					me.setWidth(parentCtl.getWidth() - 10);
					me.setHeight(parentCtl.getHeight() - 110);
				});
				
			},
			
			columns: [{	 
				text      : '조사년도',
				dataIndex : 'YYYY',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '대권역',
				dataIndex : 'WS_NM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '중권역',
				dataIndex : 'MB_NM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '표준유역',
				dataIndex : 'SB_NM',
				width: 150,
				listeners:{

					click: function(tblView, el, rowCnt, colCnt, row){
						
						var value = Ext.getCmp("pollutionSelect").value;
						console.info(value);
						var coreMap = GetCoreMap();
						var pollutionLayerAdmin = coreMap.pollutionLayerAdmin;
						
						
		        		if(value == 11){
		        			return;
		        		}else if(value == 22){	
		        			var swNm = row.record.data.SB_NM;
		        			
		        			var catStore = null;
		        			
		        			var coreMap = GetCoreMap();
		        			
		        			var catDids = []; 
		        			var catDids_All = [];
		        			for(var i = 0; i < coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics.length ;i++){
		        				catDids_All.push(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        				if(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.SB_NM == swNm){
		        					catDids.push(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        				}
		        			}
		        			
		        			
		        			for(var k = 0; k < catDids_All.length;k++){
		        				var polySymbol = $("#polySymbol_" + catDids_All[k]);
				        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.initOpacity);
		        			}
		        			
		        			
		        			for(var j = 0; j < catDids.length;j++){
		        				var polySymbol = $("#polySymbol_" + catDids[j]);
				        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.mouseOverOpacity);
		        			}
		        			
						}else{
							var cat_did = row.record.data.CAT_DID;
							
							
							var catDids_All = [];
		        			for(var i = 0; i < coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics.length ;i++){
		        				catDids_All.push(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        			}
							
		        			for(var k = 0; k < catDids_All.length;k++){
		        				var polySymbol = $("#polySymbol_" + catDids_All[k]);
				        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.initOpacity);
		        			}
							
							
							var polySymbol = $("#polySymbol_" + cat_did);
			        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.mouseOverOpacity);
						}
						
		        		
		        		
					}
				
				}
					
				//filter: {type: 'numeric'}
			},{	 
				text      : '총인구',
				dataIndex : 'POP_SUM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '하수처리인구',
				dataIndex : 'SPOP_SUM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '하수미처리인구',
				dataIndex : 'UPOP_SUM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '집수구역',
				dataIndex : 'CAT_DID',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '법정동리',
				dataIndex : 'ADDR',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '점유율',
				dataIndex : 'FINAL_PERCENTAGE',
				width: 150
				//filter: {type: 'numeric'}
			},{
				text : '면적',
				columns: [{ 
					text     : '하수처리지역',
					dataIndex: 'AREA_A1',
					width: 100,
					align:'right',
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				},{ 
					text     : '하수미처리지역',
					dataIndex: 'AREA_A2',
					width: 100,
					align:'right',
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				},{ 
					text     : '계(㎢)',
					dataIndex: 'AREA_SUM',
					width: 100,
					align:'right',
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				}]	
			},{
				text : '지정내역',
				columns: [{ 
					text     : '종류',
					dataIndex: 'REGION'
				},{ 
					text     : '편입일자',
					dataIndex: 'REGION_DATE'
				}]	
			},{
				text : '하수처리시설',
				columns: [{ 
					text     : '코드',
					dataIndex: 'U_A1_TP_CODE'
				},{ 
					text     : '편입일자',
					dataIndex: 'U_A1_TP_DATE'
				},{ 
					text     : '시설명',
					dataIndex: 'U_A1_TP_NAME'
				}]	
			},{
				text : '분뇨처리시설',
				columns: [{ 
					text     : '코드',
					dataIndex: 'U_A3_TP_CODE'
				},{ 
					text     : '편입일자',
					dataIndex: 'U_A3_TP_DATE'
				},{ 
					text     : '시설명',
					dataIndex: 'U_A3_TP_NAME',
					width: 100,
					align:'right'
				}]	
			},{	 
				text      : '인구총계',
				dataIndex : 'POP_SUM',
				width: 150
				//filter: {type: 'numeric'}
			},{
				text : '시가지역',
				columns: [{ 
					text     : '합계',
					dataIndex: 'UPOP_SUM',
					width: 100,
					align:'right',
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				},{ 
					text     : '하수처리지역',
					columns: [{ 
						text     : '소계',
						dataIndex: 'UPOP_A1_SUM'
					},{ 
						text     : '분류식',
						columns:[{
							text: '공공하수처리',
							dataIndex: 'UPOP_A1_SEPARATE_WT_SUM'
						},{
							text: '폐수종말',
							dataIndex: 'UPOP_A1_SEPARATE_IT_SUM'
						}]
					},{ 
						text     : '합류식',
						columns:[{
							text: '공공하수처리',
							dataIndex: 'UPOP_A1_COMBINED_WT_SUM'
						},{
							text: '폐수종말',
							dataIndex: 'UPOP_A1_COMBINED_IT_SUM'
						}]
					}]
				},{ 
					text     : '하수미처리지역',
					columns:[{
						text: '소계',
						dataIndex: 'UPOP_A2_SUM'
					},{
						text: '오수',
						dataIndex: 'UPOP_A2_SANITARY'
					},{
						text: '정화조',
						dataIndex: 'UPOP_A2_SEPTIC'
					},{
						text: '수거식',
						dataIndex: 'UPOP_A2_REMOVAL'
					}]
				}]	
			},{
				text : '비시가지역',
				columns: [{ 
					text     : '합계',
					dataIndex: 'SPOP_SUM',
					width: 100,
					align:'right',
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				},{ 
					text     : '하수처리지역',
					columns: [{ 
						text     : '소계',
						dataIndex: 'SPOP_A1_SUM'
					},{ 
						text     : '분류식',
						columns:[{
							text: '공공하수처리',
							dataIndex: 'SPOP_A1_SEPARATE_WT_SUM'
						},{
							text: '폐수종말',
							dataIndex: 'SPOP_A1_SEPARATE_IT_SUM'
						}]
					},{ 
						text     : '합류식',
						columns:[{
							text: '공공하수처리',
							dataIndex: 'SPOP_A1_COMBINED_WT_SUM'
						},{
							text: '폐수종말',
							dataIndex: 'SPOP_A1_COMBINED_IT_SUM'
						}]
					}]
				},{ 
					text     : '하수미처리지역',
					columns:[{
						text: '소계',
						dataIndex: 'SPOP_A2_SUM'
					},{
						text: '오수',
						dataIndex: 'SPOP_A2_SANITARY'
					},{
						text: '정화조',
						dataIndex: 'SPOP_A2_SEPTIC'
					},{
						text: '수거식',
						dataIndex: 'SPOP_A2_REMOVAL'
					}]
				}]	
			}],
			
			viewConfig: {
				 getRowClass: function(record, rowIndex, rowParams, store) {
					 //bold 13px/15px helvetica,arial,verdana,sans-serif
					 if(record.data.SB_NM == "총계"){
						 return 'pdj_total_subTotal';						 
					 }
					 if(record.data.CAT_DID == "소계"){
						 //console.info(record);
						 return 'pdj_total_subTotal';
					 }
					 if(record.data.ADDR == "총계"){
						 return 'pdj_total_subTotal';
					 }
					 if(record.data.FINAL_PERCENTAGE == "소계"){
						 return 'pdj_total_subTotal';
					 }
					 //pdj_total_subTotal
					 
				}
			}
		}]
	}]
});