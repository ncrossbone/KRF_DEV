Ext.define('KRF_DEV.view.south.SearchResultGrid_F', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer_F',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		id: 'searchResultContainer_F_Id',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			plugins: ['bufferedrenderer', 'gridfilters'],
			cls: 'khLee-x-column-header-text',
			height: 215,
			loadMask: true,
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
				text      : '측정소코드',
				dataIndex : 'FACI_CD',
				hidden: true,
				hideable: false, // filter Columns영역에 보이지 않기
				width: 0
			}, {
				text      : '측정소명',
				dataIndex : 'FACI_NM',
				width: 100,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
				listeners: {
					click: function(tblView, el, rowCnt, colCnt, row){
						////console.info(this.findParentByType("grid").parentIds);
						var gridCtl = this.findParentByType("grid")
						var parentIds = gridCtl.parentIds;
						var siteId = row.record.data.FACI_CD;
						var parentId = "";
						
						for(var i = 0; i < parentIds.length; i++){
							if(siteId == parentIds[i].siteId){
								parentId = parentIds[i].parentId;
							}
						}
						
						if(parentId == ""){
							siteMovePoint(parentIds, siteId);
						}else{
							siteMovePoint(parentId, siteId);
						}
						
					}
				}
			}, {
				text      : '운영일자',
				dataIndex : 'WORK_DT_VAL',
				width: 110,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, { 
				text      : '관거번호',
				dataIndex : 'PIPE_NUM',
				hidden : true,
				width: 90,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, { 
				text      : '관거유형',
				dataIndex : 'PIPE_TYPE',
				hidden : true,
				width: 110,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			},{ 
				text      : '유입원',
				dataIndex : 'IN_PL_TYPE',
				hidden : true,
				width: 110,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			}, { 
				text      : '방류구분번호',
				dataIndex : 'DISCHARGE_NUM',
				hidden : true,
				width: 110,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			}, {
				text : '방류량_물리적(㎥/일)',
				columns: [{
					text     : '측정값',
					dataIndex: 'DISCHARGE_AMT_PHYS_VAL',
					hidden : true,
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'DISCHARGE_AMT_PHYS_GRAPH',
					hidden : true,
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0');
						            return yVal;
						        }
						    }
						),
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						chartRangeMax: 0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '방류량_생물학적(㎥/일)',
				columns: [{
					text     : '측정값',
					dataIndex: 'DISCHARGE_AMT_BIO_VAL',
					hidden : true,
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'DISCHARGE_AMT_BIO_GRAPH',
					hidden : true,
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0');
						            return yVal;
						        }
						    }
						),
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						chartRangeMax: 0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '방류량_고도(㎥/일)',
				columns: [{
					text     : '측정값',
					dataIndex: 'DISCHARGE_AMT_HIGHTEC_VAL',
					hidden : true,
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'DISCHARGE_AMT_HIGHTEC_GRAPH',
					hidden : true,
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0');
						            return yVal;
						        }
						    }
						),
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						chartRangeMax: 0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '유량(㎥/일)',
				columns: [{
					text     : '측정값',
					dataIndex: 'AMT_VAL',
					hidden : true,
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'AMT_GRAPH',
					hidden : true,
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0');
						            return yVal;
						        }
						    }
						),
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						chartRangeMax: 0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : 'BOD(㎎/ℓ)',
				columns: [{
					text     : '측정값',
					dataIndex: 'BOD_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'BOD_GRAPH',
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0.0');
						            return yVal;
						        }
						    }
						),
						//tipTpl: 'Value: {y:number("0.00")}',
						chartRangeMax: 0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			},{

				text : 'COD(㎎/ℓ)',
				columns: [{
					text     : '측정값',
					dataIndex: 'COD_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'COD_GRAPH',
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0.0');
						            return yVal;
						        }
						    }
						),
						//tipTpl: 'Value: {y:number("0.00")}',
						chartRangeMax: 0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'SS(㎎/ℓ)',
				columns: [{
					text     : '측정값',
					dataIndex: 'SS_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'SS_GRAPH',
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0.0');
						            return yVal;
						        }
						    }
						),
						//tipTpl: 'Value: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'TN(㎎/ℓ)',
				columns: [{
					text     : '측정값',
					dataIndex: 'TN_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.00');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'TN_GRAPH',
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0.00');
						            return yVal;
						        }
						    }
						),
						//tipTpl: 'Value: {y:number("0.00")}',
						chartRangeMax: 0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'TP(㎎/ℓ)',
				columns: [{
					text     : '측정값',
					dataIndex: 'TP_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.00');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'TP_GRAPH',
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0.00');
						            return yVal;
						        }
						    }
						),
						//tipTpl: 'Value: {y:number("0.00")}',
						chartRangeMax: 0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : '대장균군수(총대장균군수)',
				columns: [{
					text     : '측정값',
					dataIndex: 'COLI_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'COLI_GRAPH',
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0');
						            return yVal;
						        }
						    }
						),
						//tipTpl: 'Value: {y:number("0.00")}',
						chartRangeMax: 0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : '미처리배제유량(㎥/일)',
				columns: [{
					text     : '측정값',
					dataIndex: 'BYPASS_AMT_VAL',
					hidden : true,
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'BYPASS_AMT_GRAPH',
					hidden : true,
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
						    '</tpl>',
						    {
							    formatX: function(xVal){
							    	xVal = xVal.substring(1, 5) + "." + xVal.substring(5, 7) + "." + xVal.substring(7, 9);
							    	return xVal;
							    },
						        formatY: function(yVal){
						        	yVal = Ext.util.Format.number(yVal, '0');
						            return yVal;
						        }
						    }
						),
						//tipTpl: 'Value: {y:number("0.00")}',
						chartRangeMax: 0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			}, {
				text      : '연계처리시설명',
				dataIndex : 'CONNECT_FACI_NM',
				hidden : true,
				width: 110,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, {
				text      : '방류수소독방법',
				dataIndex : 'DISCHARGE_DISINFECT',
				hidden : true,
				width: 110,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, {
				text      : '연계처리시설명',
				dataIndex : 'DISCHARGE_FACI_NM',
				hidden : true,
				width: 110,
				filter: {type: 'numeric'/*, fields: {}*/}
			}]
		}]
	}],
	initComponent: function(){
		
		this.callParent();
		
		// 검색조건 컨트롤 초기화
		KRF_DEV.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});