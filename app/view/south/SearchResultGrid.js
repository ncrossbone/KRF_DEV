Ext.define('KRF_DEV.view.south.SearchResultGrid', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		//title: 'test',
		layout: {
			type: 'hbox',
			align: 'middle',
			pack: 'end'
		},
		height: 30,
		items: [{
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbStartYear',
				store: ['', '2015', '2014', '2013', '2012', '2011', '2010'],
				value: '2014',
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbStartMonth',
				store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				value: '09',
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'label',
				text: '~'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbEndYear',
				store: ['', '2015', '2014', '2013', '2012', '2011', '2010'],
				value: '2015',
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbEndMonth',
				store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				value: '09',
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				text: '월'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function(){
							ShowSearchResult(_searchType);
						}
					}
				}
			}]
		}, {
			xtype: 'image',
			width: 48,
			height: 14,
			src: './resources/images/button/btn01.gif' // 라벨
		}, {
			xtype: 'container',
			width: 10
		}, {
			xtype: 'combo',
			store: ['항목선택', 'BOD', 'DO', 'COD', 'T-N', 'T-P', '수온'],
			value: '항목선택',
			listeners: {
				change: function(combo, newVal, oldVal){
					// 피처 레이어 생성/갱신
					KRF_DEV.getApplication().fireEvent('Reach_TestOnOff', "DynamicLayerAdmin_ReachTest", newVal, 1);
				}
			},
			width: 100,
			height: 25
		}, {
			xtype: 'container',
			width: 10
		}, {
			xtype: 'image',
			width: 83,
			height: 25,
			src: './resources/images/button/btn_exl.gif' // 엑셀 다운
		}, {
			xtype: 'container',
			width: 10
		}]
	}, {
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			//id: 'grdSearchResult',
			//id: this.up('container').up('container'),
			plugins: 'gridfilters',
			cls: 'khLee-x-column-header-text',
			height: 215,
			//height: '100%',
			header: {
				height: 5
			},
			title: '검색결과',
			//store: 'KRF_DEV.store.south.SearchResultGrid',
			store: Ext.create('KRF_DEV.store.south.SearchResultGrid'),
			beforeRender: function(){
				
				var me = this;
				var parentCtl = this.findParentByType("window");
				
				parentCtl.on("resize", function(){
					//console.info(parentCtl);
					me.setWidth(parentCtl.getWidth());
					me.setHeight(parentCtl.getHeight() - 90);
				});
				
			},
			columns: [{
				text      : '측정소명',
				dataIndex : 'PT_NM',
				width: 100,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
				listeners: {
					dblClick: function(tblView, el, rowCnt, colCnt, row){
						console.info(row.record.data.parentId);
						console.info(row.record.data.PT_NO);
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
			}, {
				text: '레이어코드',
				dataIndex: 'parentId',
				width: 0
			}, {
				text : 'BOD (㎎/L)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_BOD',
					width: 60,
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
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '수온 (℃)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_TEMP',
					width: 60, filter: {type: 'numeric'/*, fields: {}*/}
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
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : 'pH',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_PH',
					width: 60, filter: {type: 'numeric'/*, fields: {}*/}
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
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : 'SS (㎎/L)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_SS',
					width: 60, filter: {type: 'numeric'/*, fields: {}*/}
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
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}, {
				text : '클로로필a (㎎/㎥)',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_CLOA',
					width: 60, filter: {type: 'numeric'/*, fields: {}*/}
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
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			}]
		}]
	}]
});