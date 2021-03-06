Ext.define('KRF_DEV.view.east.ChartPanelDate', {
	
	extend: 'Ext.window.Window',
	xtype: 'east-chartpaneldate',
	
	id: 'datePanel1',
    width : 205,
    height : 200,
    header: true,
    title: '기간설정',
    controller: 'chartPanelDateController',
    //x: x,
    cls: 'khLee-window-panel-header khLee-x-window-default ',
    initComponent: function(){
    	this.callParent();
	    	var itemCtl = Ext.getCmp("selectItem");
	    	
	    	var f_Chart = Ext.getCmp("f_Chart");
	    	var f_ChartText = Ext.getCmp("f_ChartText");
	    	
	    	var parentChk = KRF_DEV.getApplication().parentFlag;
			var chartFlag_D = KRF_DEV.getApplication().chartFlag_D;
			if(parentChk == "F"){
	    		//console.info(parentChk);
	    		f_Chart.hidden = false;
	    		f_ChartText.hidden = false;
	    	}else{
	    		//console.info(parentChk);
	    		f_Chart.hidden = true;
	    		f_ChartText.hidden = true;
	    	}
	    	
	    	//console.info(parentChk);
			//console.info(chartFlag_D);
			if(parentChk == "A"){
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{id: 'ITEM_BOD', name: 'BOD'}
					,{id: 'ITEM_DOC', name: 'DO'}
					,{id: 'ITEM_COD', name: 'COD'}
					,{id: 'ITEM_TN', name: 'T-N'}
					,{id: 'ITEM_TP', name: 'T-P'}
					,{id: 'ITEM_TEMP', name: '수온'}
					,{id: 'ITEM_PH', name: 'pH'}
					,{id: 'ITEM_SS', name: 'SS'}
					,{id: 'ITEM_CLOA', name: '클로로필a'}]
			})
			itemCtl.setValue("ITEM_BOD");
			}else if(parentChk == "B"){
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: 'ITEM_BOD', name: 'BOD'}
						,{id: 'ITEM_COD', name: 'COD'}
						,{id: 'ITEM_DOC', name: 'DO'}
						,{id: 'ITEM_TN', name: 'T-N'}
						,{id: 'ITEM_TP', name: 'T-P'}
						,{id: 'ITEM_FLW', name: '적산유량(평균)'}
						,{id: 'ITEM_PH', name: 'pH'}
						,{id: 'ITEM_SS', name: 'SS'}
						,{id: 'ITEM_TOC', name: '총유기탄소'}]
				})	
				itemCtl.setValue("ITEM_BOD");	
			}else if(parentChk == "C"){
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: 'ITEM_DOW', name: '수심'}
						,{id: 'ITEM_TEMP', name: '수온'}
						,{id: 'ITEM_DOC', name: 'DO'}
						,{id: 'ITEM_PH', name: 'pH'}
						,{id: 'ITEM_EC', name: '전기전도도'}
						,{id: 'ITEM_COD', name: 'COD'}
						,{id: 'ITEM_TOC', name: 'TOC'}
						,{id: 'ITEM_TN', name: 'T-N'}
						,{id: 'ITEM_TP', name: 'T-P'}]
				})
				itemCtl.setValue("ITEM_DOW");
			}else if(parentChk == "D"){
				if(chartFlag_D == "D001"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'WL', name: '수위(cm)'}]
					})
					itemCtl.setValue("WL");
				}else if(chartFlag_D == "D002"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'RF', name: '우량자료(mm)'}]
					})
					itemCtl.setValue("RF");
				}else if(chartFlag_D == "D003"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'FW', name: '유량(CMS)'}]
					})
					itemCtl.setValue("FW");
				}else if(chartFlag_D == "D004"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'SWL', name: '저수위(cm)'},
						       {id: 'INF', name: '유입량(cms)'},
						       {id: 'OTF', name: '방류량(cms)'},
						       {id: 'SFW', name: '저수량(만㎥)'},
						       {id: 'ECPC', name: '공용량(백만㎥)'}]
					})
					itemCtl.setValue("SWL");
				}else if(chartFlag_D == "D005"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'WD', name: '풍향(m/s)'},
						       {id: 'WS', name: '풍속(m/s)'},
						       {id: 'TA', name: '기온(℃)'},
						       {id: 'HM', name: '습도'},
						       {id: 'PA', name: '현지기압'},
						       {id: 'PS', name: '해면기압'},
						       {id: 'RNYN', name: '강수감지'},
						       {id: 'RN1HR', name: '강수량(mm)'},
						       {id: 'RNDAY', name: '누적강수량(mm)'}]
					})
					itemCtl.setValue("WD");
				}else if(chartFlag_D == "D006"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'RND', name: '강수량자료(mm)'},
						       {id: 'TA', name: '기온(℃)'},
						       {id: 'SIDAY', name: '일사(MJ/m2)'}]
					})
					itemCtl.setValue("RND");
				}else if(chartFlag_D == "D007"){
					var store = Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'SWL', name: '보 상류수위'},
						       {id: 'OWL', name: '보 하류수위'},
						       {id: 'SFW', name: '저수량'},
						       {id: 'ECPC', name: '공용량'},
						       {id: 'INF', name: '유입량'},
						       {id: 'TOTOTF', name: '총 방류량'},
						       {id: 'EGOTF', name: '발전 방류량'},
						       {id: 'GTOTF', name: '가동보 방류량'},
						       {id: 'CBOTF', name: '고정보 방류량'},
						       {id: 'FWOTF', name: '어도 방류량'},
						       {id: 'ETCOTF', name: '기타 방류량'}]
					})
					itemCtl.setValue("SWL");
				}
			}else if(parentChk == "F"){
				var store = Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: 'AMT_PHYS', name: '방류량_물리적'}
					,{id: 'AMT_BIO', name: '방류량_생물학적'}
					,{id: 'AMT_HIGHTEC', name: '방류량_고도'}
					,{id: 'ITEM_BOD', name: 'BOD'}
					,{id: 'ITEM_COD', name: 'COD'}
					,{id: 'ITEM_SS', name: 'SS'}
					,{id: 'ITEM_TN', name: 'T-N'}
					,{id: 'ITEM_TP', name: 'T-P'}
					,{id: 'ITEM_COLI', name: '대장균군수'}]
				})
				itemCtl.setValue("AMT_PHYS");
			}
			
			itemCtl.bindStore(store);
    	this.on("beforeclose", function chartDateWinClose(){
    	});
    },
    items: [{
    	xtype: 'container',
    	y: 15,
    	x: 5,
    	layout: {
    		type: 'vbox',
    		align: 'left',
    		pack: 'middle'
    	},
    	items: [{
        	xtype: 'container',
        	layout: {
        		type: 'hbox',
        		align: 'left',
        		pack: 'left'
        	},
        	items: [{
				xtype: 'combo',
				id : 'selectYear',
				//..fieldLabel: '<b>년</b> ',
				store: ['', '2010', '2011', '2012', '2013', '2014', '2015'],
				value: '2014',
				//labelWidth: 30,
				//labelAlign: 'right',
				width: 65,
				height: 25
			},{
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width:  10
			},{
				xtype: 'combo',
				id : 'selectMonth',
				//fieldLabel: '<b>월</b> ',
				store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				value: '10',
				//labelWidth: 20,
				//labelAlign: 'right',
				width: 55,
				height: 25
			},{
				xtype: 'label',
				text: '월 부터'
			}]
    	},{
			xtype: 'container',
			height: 5
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'left',
	        		pack: 'left'
	        	},
	        	items: [{
	        		xtype: 'combo',
					id : 'selectYear2',
					//fieldLabel: '<b>년</b> ',
					store: ['', '2010', '2011', '2012', '2013', '2014', '2015'],
					value: '2015',
					//labelWidth: 30,
					//labelAlign: 'right',
					width: 65,
					height: 25
				},{
					xtype: 'label',
					text: '년'
				},{
					xtype: 'container',
					width: 10
						
				},{
					xtype: 'combo',
					id : 'selectMonth2',
					//fieldLabel: '<b>월</b> ',
					store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					value: '10',
					//labelWidth: 20,
					//labelAlign: 'right',
					width: 55,
					height: 25
				},{
					xtype: 'label',
					text: '월 까지'
				}]
    		}]
    	},{
			xtype: 'container',
			height: 5
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'middle',
	        		pack: 'middle'
	        	},
	        	items: [{
					xtype: 'combo',
					id : 'selectItem',
					//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>항목 :</b> ',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'ITEM_BOD', name: 'BOD'}
							,{id: 'ITEM_DOC', name: 'DO'}
							,{id: 'ITEM_COD', name: 'COD'}
							,{id: 'ITEM_TN', name: 'T-N'}
							,{id: 'ITEM_TP', name: 'T-P'}
							,{id: 'ITEM_TEMP', name: '수온'}
							,{id: 'ITEM_PH', name: 'pH'}
							,{id: 'ITEM_SS', name: 'SS'}
							,{id: 'ITEM_CLOA', name: '클로로필a'}]
					}),
					value: '',
					width: 105,
					height: 25
					
	        	},{
					xtype: 'container',
					width: 10
					
	        	},{
					xtype: 'label',
					text: '항목'
				}]
	    	}]
    	},{
			xtype: 'container',
			height: 5
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'middle',
	        		pack: 'middle'
	        	},
	        	items: [{
					xtype: 'combo',
					id : 'f_Chart',
					//fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>항목 :</b> ',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: '1', name: '방류유량'}
							,{id: '2', name: '직접이송량'}
							,{id: '3', name: '총유입량'}
							,{id: '4', name: '관거이송량'}]
					}),
					value: '방류유량',
					width: 115,
					height: 25
				},{
					xtype: 'container',
					width: 10
						
				},{
					xtype: 'label',
					id: 'f_ChartText',
					text: '항목'
				}]
	    	}]
    	},{
			xtype: 'container',
			height: 5
		}, {
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'middle',
	        		pack: 'middle'
        		},
	        	items: [{
					xtype: 'container',
					width: 80
				},{
					xtype: 'image',
					//xtype: 'button',
					id: 'btnSearch',
					listeners: {
						el: {
							click: 'onSearchChartData'
						}
					},
					width: 34,
					height: 19,
					src: './resources/images/button/icon_seah.gif'
				}]
    		}]
		}]
    }]
});