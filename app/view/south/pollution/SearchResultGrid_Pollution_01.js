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
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '총인구',
				dataIndex : 'POP_SUM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '하수처리인구',
				dataIndex : 'UPOP_SUM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '하수미처리인구',
				dataIndex : 'SPOP_SUM',
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
				dataIndex : '',
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
				text : '지점내역',
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
						colums:[{
							text: '공공하수처리',
							dataIndex: 'UPOP_A1_SEPARATE_WT_SUM'
						},{
							text: '폐수종말',
							dataIndex: 'UPOP_A1_SEPARATE_IT_SUM'
						}]
					},{ 
						text     : '합류식',
						colums:[{
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
						colums:[{
							text: '공공하수처리',
							dataIndex: 'SPOP_A1_SEPARATE_WT_SUM'
						},{
							text: '폐수종말',
							dataIndex: 'SPOP_A1_SEPARATE_IT_SUM'
						}]
					},{ 
						text     : '합류식',
						colums:[{
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
			}]
		}]
	}]
});