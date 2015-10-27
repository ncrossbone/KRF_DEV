Ext.define('KRF_DEV.view.south.SearchResultGrid', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			//id: 'grdSearchResult',
			//id: this.up('container').up('container'),
			plugins: 'gridfilters',
			cls: 'khLee-x-column-header-text',
			//height: 195,
			loadMask: true, // 로딩 표시 할라구 한건데.. 안먹네..-_-;
			plugins: 'bufferedrenderer',
			siteIds: "",
			parentIds: [],
			//height: '100%',
			header: {
				height: 5
			},
			title: '검색결과',
			siteId: '',
			//store: 'KRF_DEV.store.south.SearchResultGrid',
			//store: Ext.create('KRF_DEV.store.south.SearchResultGrid'),
			beforeRender: function(){
				
				var me = this;
				var parentCtl = this.findParentByType("window");
				
				me.setWidth(parentCtl.getWidth() - 10);
				me.setHeight(parentCtl.getHeight() - 110);
				
				parentCtl.on("resize", function(){
					//console.info(parentCtl);
					me.setWidth(parentCtl.getWidth() - 10);
					me.setHeight(parentCtl.getHeight() - 110);
				});
				
			},
			columns: [{
				text      : '측정소코드',
				dataIndex : 'PT_NO',
				hidden: true,
				hideable: false, // filter Columns영역에 보이지 않기
				width: 0
			}, {
				text      : '측정소명',
				dataIndex : 'PT_NM',
				width: 100,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
				listeners: {
					click: function(tblView, el, rowCnt, colCnt, row){
						//console.info(this.findParentByType("grid").parentIds);
						var gridCtl = this.findParentByType("grid")
						var parentIds = gridCtl.parentIds;
						var siteId = row.record.data.PT_NO;
						var parentId = "";
						
						for(var i = 0; i < parentIds.length; i++){
							if(siteId == parentIds[i].siteId){
								parentId = parentIds[i].parentId;
							}
						}
						
						siteMovePoint(parentId, siteId);
					}
				}
			}, {
				text      : '년도',
				dataIndex : 'WMYR',
				width: 50,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, { 
				text      : '월',
				dataIndex : 'WMOD',
				width: 50,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, { 
				text      : '측정일자',
				dataIndex : 'WMCYMD',
				width: 90,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			},{ 
				text      : '회차',
				dataIndex : 'WMWK',
				width: 90,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			},{ 
				text      : '수심',
				dataIndex : 'WMDEP',
				hidden: true,
				hideable: false, // filter Columns영역에 보이지 않기
				width: 90,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			},{
				text: '레이어코드',
				dataIndex: 'parentId',
				hidden: true,
				hideable: false, // filter Columns영역에 보이지 않기
				width: 0
			}, {
				text : 'BOD (㎎/L)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_BOD',
					width: 60,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'CHART_BOD',
					//data: [4, 3, 4, 6, 2],
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						//values: [[2, 4], [3, 3], [4, 5], [5, 2], [6, 3]],
						//xvalues: [2, 3, 4, 5, 6],
						/*tooltipFormatter: function (sparkline, options, fields) {
							console.info(fields.x.substring(1, 9));
							//console.info(options);
							//console.info(sparkline);
							return "test";
						},*/
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						chartRangeMax: 5.8,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : 'DO (㎎/L)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_DO',
					width: 60,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'CHART_DO',
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
						chartRangeMax: 15.5,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : 'COD (㎎/L)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_COD',
					width: 60,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'CHART_COD',
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
						chartRangeMax: 11.2,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : 'T-N (㎎/L)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_TN',
					width: 60,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.000');
					},
					filter: 'number'
				}, {
					text: '추이변화',
					dataIndex: 'CHART_TN',
					width: 80,
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
						chartRangeMax: 6.628,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : 'T-P (㎎/L)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_TP',
					width: 60,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.000');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'CHART_TP',
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
						chartRangeMax: 0.237,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '수온 (℃)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_TEMP',
					width: 60,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'CHART_TEMP',
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ℃</p>',
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
						chartRangeMax: 28.8,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : 'pH',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_PH',
					width: 60,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'CHART_PH',
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
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
						chartRangeMax: 9.5,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : 'SS (㎎/L)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_SS',
					width: 60,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'CHART_SS',
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
						chartRangeMax: 27.7,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '클로로필a (㎎/㎥)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_CLOA',
					width: 60,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'CHART_CLOA',
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: new Ext.XTemplate(
						    '<tpl for=".">',
						        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
						        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/㎥</p>',
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
						chartRangeMax: 30.4,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : 'TOC (㎎/L)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_TOC',
					width: 60,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'CHART_TOC',
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
						chartRangeMax: 6.2,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}]
		}]
	}]
});