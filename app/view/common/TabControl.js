Ext.define('KRF_DEV.view.common.TabControl', {
	
	extend : 'Ext.panel.Panel',
	
	xtype : 'common-tabcontrol',
	
	controller: 'tabControlController',
	//controller: ['searchArea_ADMController','searchArea_WaterController'],
	//controller: 'searchArea_ADMController',
	
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
			id: 'resultTab',
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
				id: 'cmbStartMonth',
				store: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
				value: '08',
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
				value: '10',
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
							tabCtl = tabCtl.items.items[1];
							var activeTab = tabCtl.getActiveTab();
							var gridContainer = activeTab.items.items[0];
							var gridCtl = gridContainer.items.items[0];
							if(gridCtl.parentIds[0].parentId == undefined){
								var parentId =  gridCtl.parentIds
							}else{
								var parentId = gridCtl.parentIds[0].parentId
							}
							
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
						
						var gridId = activeTab.id.replace("_container", ""); // _container는 common.ShowSearchResult 에서 붙이는걸로...
						
						ShowSearchResult(gridCtl.siteIds, parentId, "", gridId,fName.value);
					}
				}
			
					
			}]
		},{
			xtype: 'container',
			width: 10
		},{ //방유량 검색 조건 / 집수구역
			xtype: 'container',
			id: 'pollResultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			//flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollLoadSelect',
				valueField: 'id',
				displayField: 'name',
				//id: 'cmbStartYear',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: '11', name: '총괄표'}
						,{id: '22', name: '표준유역단위 보기'}
						,{id: '33', name: '집수구역단위 보기'}
						,{id: '44', name: '집수구역단위 상세보기'}]
				}),
				value: '총괄표',
				width: 170,
				height: 25
			}]
		},{
			xtype: 'container',
			width: 10
		}/*,{
			 //방유량 검색 조건 / 행정구역별
			xtype: 'container',
			id: 'pollResultTab2',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				id: 'pollcmbArea1',
				layerId: _admSidoLayerId,
				xtype: 'combo',
				tarCmbId: 'pollcmbArea2',
				lnkBtnId: 'btnSearch1',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 120,
				editable: false,
				//labelSeparator: '', // Defaults to: ':'
				store: Ext.create('KRF_DEV.store.west.SearchArea_ADM'),
				displayField: 'name',
				valueField: 'id'
			}, {
				xtype: 'container',
				width: 10
			},{
				id: 'pollcmbArea2',
				layerId: _admSigunguLayerId,
				xtype: 'combo',
				tarCmbId: 'pollcmbArea3',
				lnkBtnId: 'btnSearch2',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 120,
				editable: false,
				//labelSeparator: '', // Defaults to: ':'
				store: Ext.create('KRF_DEV.store.west.SearchArea_ADM'),
				displayField: 'name',
				valueField: 'id',
				disabled: true
			
			},{
				xtype: 'container',
				width: 10
			},{
				id: 'pollcmbArea3',
				layerId: _admDongLayerId,
				xtype: 'combo',
				tarCmbId: '',
				lnkBtnId: 'btnSearch3',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 120,
				editable: false,
				//labelSeparator: '', // Defaults to: ':'
				store: Ext.create('KRF_DEV.store.west.SearchArea_ADM'),
				displayField: 'name',
				valueField: 'id',
				disabled: true
			
			}]
		
		},{
			xtype: 'container',
			width: 10
		},{
			 //방유량 검색 조건  /총량단위유역별
			xtype: 'container',
			id: 'pollResultTab3',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items:[{
				id : 'pollcmbWater1',
				layerId : '54',
				xtype : 'combo',
				tarCmbId : 'pollcmbWater2',
				lnkBtnId : 'btnWater1',
				labelWidth : 60,
				labelAlign : 'right',
				labelPad : 10,
				width : 120,
				editable : false,
				// labelSeparator: '', //
				// Defaults to: ':'
				store : Ext.create('KRF_DEV.store.west.SearchArea_Water'),
				displayField : 'name',
				valueField : 'id'
			},{
				xtype: 'container',
				width: 10
			},{

				id : 'pollcmbWater2',
				layerId : '55',
				xtype : 'combo',
				tarCmbId : 'pollcmbWater3',
				lnkBtnId : 'btnWater2',
				labelWidth : 60,
				labelAlign : 'right',
				labelPad : 10,
				width : 120,
				editable : false,
				// labelSeparator: '', //
				// Defaults to: ':'
				store : Ext.create('KRF_DEV.store.west.SearchArea_Water'),
				displayField : 'name',
				valueField : 'id',
				disabled : true
			
			},{
				xtype: 'container',
				width: 10
			},{

				id : 'pollcmbWater3',
				layerId : '56',
				xtype : 'combo',
				tarCmbId : '',
				lnkBtnId : 'btnWater3',
				labelWidth : 60,
				labelAlign : 'right',
				labelPad : 10,
				width : 120,
				editable : false,
				// labelSeparator: '', //
				// Defaults to: ':'
				store : Ext
						.create('KRF_DEV.store.west.SearchArea_Water'),
				displayField : 'name',
				valueField : 'id',
				disabled : true
			
			}]
		}*/,{
			//방유량  (년도/검색)버튼
			xtype: 'container',
			id: 'pollSearchTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollYear',
				store: ['2013', '2012', '2011', '2010'],
				value: '2013',
				width: 80,
				height: 25
			},  {
				xtype: 'container',
				width: 10
			},{

				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function(){
							//pdj
							var pollLoadSelect = Ext.getCmp("pollLoadSelect");
							PollLoadSearchResult(pollLoadSelect.lastValue);
							
							//PollLoadSearchResult();
						}
					}
				}
			
			}/*, {
				xtype: 'combo',
				id: 'saveList',
				//store: ['항목선택', 'BOD', 'DO', 'COD', 'T-N', 'T-P', '수온'],
				store: Ext.create('KRF_DEV.store.south.LoadList'),
				displayField: 'S_NM',
				valueField: 'S_NM',
				width: 100,
				height: 25,
				editable : false,
				listeners:{
					change: function(combo, newVal, oldVal){
						var saveList = Ext.getCmp("saveList");
						saveList = saveList.getStore();
						
						var list = [];
						
						for(i=0; i < saveList.data.items.length ; i++){
							if(newVal == saveList.data.items[i].data.S_NM){
								
								list.push(saveList.data.items[i].data.C_0);
								list.push(saveList.data.items[i].data.C_1);
								list.push(saveList.data.items[i].data.C_2);
								list.push(saveList.data.items[i].data.C_3);
								list.push(saveList.data.items[i].data.C_4);
								list.push(saveList.data.items[i].data.C_5);
								list.push(saveList.data.items[i].data.C_6);
								list.push(saveList.data.items[i].data.C_7);
								list.push(saveList.data.items[i].data.C_8);
								list.push(saveList.data.items[i].data.C_9);
								list.push(saveList.data.items[i].data.C_10);
								list.push(saveList.data.items[i].data.C_11);
								list.push(saveList.data.items[i].data.C_12);
								list.push(saveList.data.items[i].data.C_13);
								list.push(saveList.data.items[i].data.C_14);
								list.push(saveList.data.items[i].data.C_15);
								list.push(saveList.data.items[i].data.C_16);
								list.push(saveList.data.items[i].data.C_17);
								list.push(saveList.data.items[i].data.C_18);
								list.push(saveList.data.items[i].data.C_19);
								list.push(saveList.data.items[i].data.C_20);
								list.push(saveList.data.items[i].data.C_21);
								list.push(saveList.data.items[i].data.C_22);
								list.push(saveList.data.items[i].data.C_23);
								list.push(saveList.data.items[i].data.C_24);
								list.push(saveList.data.items[i].data.C_25);
								list.push(saveList.data.items[i].data.C_26);
								list.push(saveList.data.items[i].data.C_27);
								list.push(saveList.data.items[i].data.C_28);
								list.push(saveList.data.items[i].data.C_29);
								list.push(saveList.data.items[i].data.C_30);
								list.push(saveList.data.items[i].data.C_31);
								list.push(saveList.data.items[i].data.C_32);
								list.push(saveList.data.items[i].data.C_33);
								list.push(saveList.data.items[i].data.C_34);
								list.push(saveList.data.items[i].data.C_35);
								list.push(saveList.data.items[i].data.C_36);
								list.push(saveList.data.items[i].data.C_37);
								list.push(saveList.data.items[i].data.C_38);
								list.push(saveList.data.items[i].data.C_39);
								list.push(saveList.data.items[i].data.C_40);
								list.push(saveList.data.items[i].data.C_41);
								list.push(saveList.data.items[i].data.C_42);
								list.push(saveList.data.items[i].data.C_43);
								list.push(saveList.data.items[i].data.C_44);
								list.push(saveList.data.items[i].data.C_45);
								list.push(saveList.data.items[i].data.C_46);
								list.push(saveList.data.items[i].data.C_47);
								list.push(saveList.data.items[i].data.C_48);
								list.push(saveList.data.items[i].data.C_49);
								list.push(saveList.data.items[i].data.C_50);
								list.push(saveList.data.items[i].data.C_51);
								list.push(saveList.data.items[i].data.C_52);
								list.push(saveList.data.items[i].data.C_53);
								list.push(saveList.data.items[i].data.C_54);
								list.push(saveList.data.items[i].data.C_55);
								list.push(saveList.data.items[i].data.C_56);
								list.push(saveList.data.items[i].data.C_57);
								list.push(saveList.data.items[i].data.C_58);
								list.push(saveList.data.items[i].data.C_59);
								list.push(saveList.data.items[i].data.C_60);
								list.push(saveList.data.items[i].data.C_61);
								
								
								//list.push(saveList.data.items[i].data);
							}
						}
						
						console.info(list);
						
						var pollgrdContainer = Ext.getCmp("searchResultPollLoad_container");
						
						var pollgrdCtl = pollgrdContainer.items.items[0]; // 그리드 컨테이너
						pollgrdCtl = pollgrdCtl.items.items[0];
						
						for(i=0; i < pollgrdCtl.columns.length ;i++){
							pollgrdCtl.columns[i].setHidden(true);
						}
						
						for(j=0; j < list.length ;j++){
							if(list[j] == "false"){
								console.info(false);
								pollgrdCtl.columns[j].setHidden(false);
							}
						}
						
						
					}
				}
			},{

				xtype: 'textfield',
				width: 104,
				height: 19,
				id: 'saveName',
				name: 'saveName',
				style: 'cursor:pointer;border:0px !important;',
				inputType: "text"
			
			},{

				xtype: 'image',
				src: './resources/images/button/btn_save_old.gif', //저장
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function(){
							var saveName = Ext.getCmp("saveName").value;
							var check = confirm("저장 하시겠습니까?");
					      	  if(check){
					      		  if(saveName == ""){
					      			  alert("이름을 입력하세요.");
					      			  return;
					      		  }else{
					      			  alert("저장이 완료 되었습니다.");
					      		  }
					      		
					      	  }else{
					      		  alert("저장을 취소하였습니다");
					      		  return;
					      	  }
							
							SaveResultOnOff(saveName);
						}
					}
				}
			
			},{

				xtype: 'image',
				src: './resources/images/button/btn_date_old.gif', //설정
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function(){
							
							
							var PollListWindow = Ext.getCmp("PollListWindow");
							if(PollListWindow == null){
								PollListWindow = Ext.create('KRF_DEV.view.common.PollListWindow');
							}
							
							
							PollListWindow.show();

						}
					}
				}
			
			}*/]
		
		
		},{
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
					//KRF_DEV.getApplication().fireEvent('Reach_TestOnOff', "DynamicLayerAdmin_ReachTest", newVal, 1);
					KRF_DEV.getApplication().fireEvent('selectMapDisplayType',  newVal, 1);
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
				
				// 로딩바 띄우기
				var winCtl = Ext.getCmp("searchResultWindow");
				winCtl.mask("loading", "loading...");
				
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
					// khLee 수정 값 변경
					var strData = JSON.stringify(dataArr[i].data);
					strData = strData.replace(/888888888/gi, "\"\"");
					strData = strData.replace(/999999999/gi, "\"정량한계미만\"");
					var convertData = JSON.parse(strData);
					//datas.push(dataArr[i].data);
					datas.push(convertData);
				}
				
				var removeMem = []
				if(datas.length>0){
					var data = datas[0];
					for(var mem in data){
						if(data[mem] instanceof Array){
							removeMem.push(mem);
						}
					}
					
					// khLee parentId (레이어코드) 제외
					removeMem.push("parentId");
					
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
						
						// 로딩바 숨김
						winCtl.unmask();
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
		cls: 'khLee-tab-active khLee-tab-unselectable khLee-tab',
		listeners:{
			'tabchange': function (tabPanel, tab){
				
				//
				if(tab.parentId != "F"){
					var hiddenGrid = Ext.getCmp("F_CHANGE");
					hiddenGrid.setHidden(true);
				}else{
					var hiddenGrid = Ext.getCmp("F_CHANGE");
					hiddenGrid.setHidden(false);
				}
				
				
				var resultTab = Ext.getCmp("resultTab"); 		 //일반 검색pollResultTab
				var pollSearchTab = Ext.getCmp("pollSearchTab"); //방유량 (년도/검색)
				var pollResultTab = Ext.getCmp("pollResultTab"); //방유량 집수구역별 검색조건
				
				//방유량 or 일반검색시 tab change
				if(tab.id == "searchResultPollLoad_container"){
					resultTab.setHidden(true);		//일반 검색pollResultTab
					pollSearchTab.setHidden(false);
					pollResultTab.setHidden(false);	//방유량 검색조건
					
				}else{
					resultTab.setHidden(false);		//일반 검색pollResultTab
					pollSearchTab.setHidden(true);	//방유량 (년도/검색)
					pollResultTab.setHidden(true);	//방유량 검색조건
				}
				
				
				
				
								
				
			}
		}
	}]
		
});