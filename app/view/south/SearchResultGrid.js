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
			columns: [{
				text      : '측정소명',
				dataIndex : 'PT_NM',
				width: 100,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
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
				text      : '회차',
				dataIndex : 'WMWK',
				width: 50,
				filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
			}, {
				text : 'BOD',
				columns: [{
					text     : '측정값',
					dataIndex: 'CURR_BOD',
					width: 60,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'CHART_BOD',
					xtype: 'widgetcolumn',
					widget: {
						xtype: 'sparklineline',
						tipTpl: 'Value: {y:number("0.00")}'
					}
				}]
			}, {
				text : 'DO',
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
						tipTpl: 'Value: {y:number("0.00")}'
					}
				}]
			}, {
				text : 'COD',
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
						tipTpl: 'Value: {y:number("0.00")}'
					}
				}]
			}, {
				text : 'T-N',
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
						tipTpl: 'Value: {y:number("0.00")}'
					}
				}]
			}, {
				text : 'T-P',
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
						tipTpl: 'Value: {y:number("0.00")}'
					}
				}]
			}, {
				text : '수온',
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
						tipTpl: 'Value: {y:number("0.00")}'
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
						tipTpl: 'Value: {y:number("0.00")}'
					}
				}]
			}, {
				text : 'SS',
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
						tipTpl: 'Value: {y:number("0.00")}'
					}
				}]
			}, {
				text : '클로로필a',
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
						tipTpl: 'Value: {y:number("0.00")}'
					}
				}]
			}]
		}]
	}]
});