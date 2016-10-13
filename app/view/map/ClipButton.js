Ext.define('KRF_DEV.view.map.ClipButton', {
	extend : 'Ext.window.Window',
	
	xtype : 'clipButton',
	
	id: 'clipButton',
	//params: this.record,
	
	//title: '지점 목록',
	
	title: '클립리포트',
	
	//cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	//bodyStyle: 'border: 0px;',
	
	layout: {
		type: 'fit'
	},
	width: 850,
	height: 605,

	items: [{
		xtype: 'container',
		layout: {
			type: 'vbox'
		},
		items: [{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				width: "100%",
					items: [{
						xtype: 'container',
						width: 10
					},{
						xtype: 'combo',
						id: 'chartYear',
						valueField: 'id',
						displayField: 'name',
						store: Ext.create('Ext.data.Store', {
							fields: ['id', 'name'],
							data: [{id: '1', name: '2010'}
								,{id: '2', name: '2011'}
								,{id: '3', name: '2012'}
								,{id: '4', name: '2013'}]
						}),
						src: './resources/images/button/arrow.gif'
					},{
						xtype: 'button',
						text : '리포트1',
						listeners:{
							el:{
								click: function(){
									
//									var clipChart = Ext.getCmp('clipChart');
//									console.info(clipChart);
//									var chartStore = Ext.create('KRF_DEV.store.east.SiteChartPanel');
//									chartStore.siteCD = "A";
//									chartStore.yFieldName = "1";
//									chartStore.parentId = "A";
//									chartStore.load();
//									clipChart.setStore(chartStore);
									
									//clipChart.setHidden(false);
								}
							}
						}
				}]
		}]
	}]
	
});