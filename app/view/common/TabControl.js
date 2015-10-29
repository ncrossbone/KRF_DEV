Ext.define('KRF_DEV.view.common.TabControl', {
	
	extend : 'Ext.panel.Panel',
	
	xtype : 'common-tabcontrol',
	
	id: 'tabControl',
	
	//title: 'tab1',
	
	header: false,
	
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
							var fName = Ext.getCmp("F_CHANGE");
							var tabCtl = Ext.getCmp("searchResultTab");
							console.info(tabCtl);
							tabCtl = tabCtl.items.items[1];
							var activeTab = tabCtl.getActiveTab();
							//console.info(activeTab);
							var gridContainer = activeTab.items.items[0];
							var gridCtl = gridContainer.items.items[0];
							//console.info(gridCtl.id);
							if(gridCtl.parentIds[0].parentId == undefined){
								var parentId =  gridCtl.parentIds
							}else{
								var parentId = gridCtl.parentIds[0].parentId
							}
							//console.info(gridCtl.parentIds[0].parentId);
							//console.info(gridCtl.siteIds);
							
							var gridId = activeTab.id.replace("_container", ""); // _container는 common.ShowSearchResult 에서 붙이는걸로...
							
							KRF_DEV.getApplication().btnFlag = "date";
							ShowSearchResult(gridCtl.siteIds, parentId, "", gridId, fName.value);
						}
					}
				}
			},{
				xtype: 'combo',
				id: 'F_CHANGE',
				valueField: 'id',
				displayField: 'name',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: '1', name: '관거이송량'}
						,{id: '2', name: '방류유량'}
						,{id: '3', name: '직접이송량'}
						,{id: '4', name: '총유입량'}]
				}),
				//store: ['', '관거이송량','방류유량','직접이송량','총유입량'],
				value: '관거이송량',
				width: 85,
				height: 19,
				hidden: true,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					change: function(){
						var fName = Ext.getCmp("F_CHANGE");
						var tabCtl = Ext.getCmp("searchResultTab");
						tabCtl = tabCtl.items.items[1];
						var activeTab = tabCtl.getActiveTab();
						var gridContainer = activeTab.items.items[0];
						var gridCtl = gridContainer.items.items[0];
						if(gridCtl.parentIds[0].parentId == undefined){
							var parentId =  gridCtl.parentIds
						}else{
							var parentId = gridCtl.parentIds[0].parentId
						}
						ShowSearchResult(gridCtl.siteIds, parentId, "", gridCtl.id,fName.value);
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
			src: './resources/images/button/btn_exl.gif', // 엑셀 다운
			listeners: { el: { click: function(){
				var tabCtl = Ext.getCmp("searchResultTab");
				tabCtl = tabCtl.items.items[1];
				var activeTab = tabCtl.getActiveTab();
				var gridContainer = activeTab.items.items[0];
				var grid = gridContainer.down('gridpanel');
//				if(!grid.download){
//					grid.download = 'sleep';
//				}
				
				var colArr = grid.getColumnManager().getColumns();
				var hItem = grid.getHeaderContainer().config.items;
				var gItem = [];
				for(var i=0; i<hItem.length; i++){
					var item = hItem[i];
					if(item.columns){
						gItem.push(item);
					}
				}
				
				var headName = [];
				var header = [];
				var datas = [];
				
				var dataArr = grid.getView().store.data.items
				if(!dataArr){
					dataArr = store.data.map[1].value;
				}
				for(var i=0; i<dataArr.length; i++){
					datas.push(dataArr[i].data)
				}
				
				var removeMem = []
				if(datas.length>0){
					var data = datas[0];
					for(var mem in data){
						if(data[mem] instanceof Array){
							removeMem.push(mem);
						}
					}
					for(var i=0; i<colArr.length; i++){
						if(colArr[i].dataIndex!=""){
							var add = true;
							for(var k=0; k<removeMem.length; k++){
								if(removeMem[k]==colArr[i].dataIndex){
									add = false;
									break;
								}
							}
							if(add){
								var preText = '';
								for(var k=0; k<gItem.length; k++){
									var gCols = gItem[k];
									for(var j=0; j<gCols.columns.length; j++){
										var gc = gCols.columns[j];
										if(gc.dataIndex==colArr[i].dataIndex){
											preText = gCols.text;
											break;
										}
									}
								}
								headName.push(preText + colArr[i].text);
								header.push(colArr[i].dataIndex);
							}
						}
					}
				}else{
					for(var i=0; i<colArr.length; i++){
						if(colArr[i].dataIndex!=""){
							var preText = '';
							for(var k=0; k<gItem.length; k++){
								var gCols = gItem[k];
								for(var j=0; j<gCols.columns.length; j++){
									var gc = gCols.columns[j];
									if(gc.dataIndex==colArr[i].dataIndex){
										preText = gCols.text;
										break;
									}
								}
							}
							headName.push(preText + colArr[i].text);
							header.push(colArr[i].dataIndex);
						}
					}
				}
				
				//if(grid.download=='sleep'){
					this.status = 'download';
					$.post("./resources/jsp/excelDown.jsp", {headName:JSON.stringify(headName), header:JSON.stringify(header), datas:JSON.stringify(datas)}, function(data){
						//grid.download = 'download';
						$('#__fileDownloadIframe__').remove();
						$('body').append('<iframe src='+data.url+' id="__fileDownloadIframe__" name="__fileDownloadIframe__" width="0" height="0" style="display:none;"/>');
			   		},"json").error(function(){
			   			//grid.download = 'download';
			   		});
//				}else{
//					alert("다운로드중입니다.");
//				}
				
			} } }
		}, {
			xtype: 'container',
			width: 10
		}]
	}, {
		xtype: 'tabpanel',
		//id: 'tabControl',
		//title: 'tab1',
		style: 'background-color: #157fcb;',
		//header: false
		cls: 'khLee-tab-active khLee-tab-unselectable khLee-tab'
	}]
		
});