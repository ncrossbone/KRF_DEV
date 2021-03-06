Ext.define('KRF_DEV.view.south.SearchResultGrid_F_4', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer_F_4',
	
	height: '100%',
	width: '100%',
	//총유입량
	items: [{
		xtype: 'container',
		id: 'searchResultContainer_F4_Id',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			//id: 'grdSearchResult_F',
			//id: this.up('container').up('container'),
			plugins: ['bufferedrenderer', 'gridfilters'],
			cls: 'khLee-x-column-header-text',
			//id : 'ResultGrid_F',
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
				
				width: 70,
				filter: {type: 'numeric'/*, fields: {}*/}
			}, {
				text : '유량(㎥/일)',
				columns: [{
					text     : '측정값',
					dataIndex: 'AMT_VAL',
					
					width: 100,
					renderer: function(value){
						return Ext.util.Format.number(value, '0');
					},
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text: '추이변화',
					width: 80,
					dataIndex: 'AMT_GRAPH',
					
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
						spotRadius: 1,
						valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
					}
				}]
			
			}]
		}]
	}]
});