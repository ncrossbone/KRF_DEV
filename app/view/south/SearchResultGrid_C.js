Ext.define('KRF_DEV.view.south.SearchResultGrid_C', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer_C',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		id: 'searchResultContainer_C_Id',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			//id: 'grdSearchResult',
			//id: this.up('container').up('container'),
			plugins: ['bufferedrenderer', 'gridfilters'],
			cls: 'khLee-x-column-header-text',
			height: 215,
			loadMask: true,
			//plugins: 'bufferedrenderer',
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
					////console.info(parentCtl);
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
						////console.info(this.findParentByType("grid").parentIds);
						var gridCtl = this.findParentByType("grid")
						var parentIds = gridCtl.parentIds;
						var siteId = row.record.data.PT_NO;
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
				text      : '년도',
				dataIndex : 'WMYR',
				width: 110,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, { 
				text      : '월',
				dataIndex : 'WMOM',
				width: 70,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, { 
				text      : '측정일자',
				dataIndex : 'WMCYMD_VAL',
				width: 110,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			},{ 
				text      : '회차',
				dataIndex : 'MCNT',
				width: 110,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			}, { 
				text      : '조사기관',
				dataIndex : 'JOSANAME',
				width: 110,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			}, {
				text : '최고수심',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_DOW_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_DOW_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '표층-수심',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_DOW_SURF_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_DOW_SURF_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '표층 수온',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_TEMP_SURF_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_TEMP_SURF_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '표층-DO',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_DO_SURF_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_DO_SURF_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '표층-ph',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_PH_SURF_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_PH_SURF_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '표층-전기전도도',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_EC_SURF_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_EC_SURF_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '저층-수심',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_DOW_LOW_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_DOW_LOW_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '저층-수온',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_TEMP_LOW_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_TEMP_LOW_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '저층-DO',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_DO_LOW_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_DO_LOW_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '저층-ph',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_PH_LOW_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_PH_LOW_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '저층-전기전도도',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_EC_LOW_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_EC_LOW_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '투명도',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_TRANSPARENCY_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_TRANSPARENCY_GRAPH',
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
						//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			},{

				text : '입도-모래(%)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_FSD_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_FSD_GRAPH',
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
						chartRangeMax: 110.0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : '입도-실트(%)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_FST_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_FST_GRAPH',
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
						chartRangeMax: 49.5,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : '입도-점토(%)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_FCL_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_FCL_GRAPH',
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
						chartRangeMax: 5.5,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : '함수율(%)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_WTC_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_WTC_GRAPH',
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
						chartRangeMax: 33.0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : '완전연소가능량(%)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_PCA_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.00');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_PCA_GRAPH',
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
						chartRangeMax: 4.7,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'COD(%)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_COD_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_COD_GRAPH',
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
						chartRangeMax: 0.8,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'TOC(%)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_TOC_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_TOC_GRAPH',
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
						chartRangeMax: 1.1,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'T-N(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_TN_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.000');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_TN_GRAPH',
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
						        	yVal = Ext.util.Format.number(yVal, '0.000');
						            return yVal;
						        }
						    }
						),
						//tipTpl: 'Value: {y:number("0.00")}',
						chartRangeMax: 1430.0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'T-P(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_TP_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.000');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_TP_GRAPH',
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
						        	yVal = Ext.util.Format.number(yVal, '0.000');
						            return yVal;
						        }
						    }
						),
						//tipTpl: 'Value: {y:number("0.00")}',
						chartRangeMax: 790.0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'SRP(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_SRP_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_SRP_GRAPH',
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
						chartRangeMax: 7.8,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'Pb(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_PB_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_PB_GRAPH',
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
						chartRangeMax: 41.0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'Zn(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_ZN_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_ZN_GRAPH',
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
						chartRangeMax: 146.3,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'Cu(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_CU_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_CU_GRAPH',
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
						chartRangeMax: 35.2,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'Cr(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_CR_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_CR_GRAPH',
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
						chartRangeMax: 82.5,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'Ni(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_NI_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_NI_GRAPH',
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
						chartRangeMax: 33.0,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'As(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_AS_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_AS_GRAPH',
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
						chartRangeMax: 10.7,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'Cd(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_CD_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.00');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_CD_GRAPH',
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
						chartRangeMax: 0.4,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'Hg(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_HG_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.000');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_HG_GRAPH',
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
						        	yVal = Ext.util.Format.number(yVal, '0.000');
						            return yVal;
						        }
						    }
						),
						//tipTpl: 'Value: {y:number("0.00")}',
						chartRangeMax: 0.1,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'Al(%)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_AL_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.00');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_AL_GRAPH',
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
						chartRangeMax: 10.5,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			},{

				text : 'Li(㎎/㎏)',
				columns: [{
					text     : '측정값',
					dataIndex: 'ITEM_LI_VAL',
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'ITEM_LI_GRAPH',
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
						chartRangeMax: 63.8,
						chartRangeMin: 0,
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			}]
		}]
	}]
});