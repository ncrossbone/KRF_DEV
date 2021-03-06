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
				value: '11',
				width: 170,
				height: 25
			}]
		},{
			xtype: 'container',
			width: 10
		},{
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
			
			}]
		},
		
		
		//오염원  (년도/검색)버튼
		{ 
			xtype: 'container',
			id: 'pollutionResultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			//flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollutionSelect',
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
				value: '11',
				width: 170,
				height: 25
			}]
		},{
			xtype: 'container',
			width: 10
		},{
			xtype: 'container',
			id: 'pollutionSearchTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollutionYear',
				store: ['2013', '2012', '2011'],
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
							
							
							
							var tabCtl = Ext.getCmp("searchResultTab");
							tabCtl = tabCtl.items.items[1];
							var activeTab = tabCtl.getActiveTab();
							
							var pollutionYear = Ext.getCmp("pollutionYear").value;
							//pdj
							var pollutionSelect = Ext.getCmp("pollutionSelect");
							PollutionSearchResult(pollutionSelect.lastValue,activeTab.recordId,activeTab.title,activeTab.storeNm,pollutionYear);
						}
					}
				}
			
			}]
		
			
			
		
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
				
				//console.info(colArr);
				var tabpanels = Ext.getCmp("tabpanels");
				//console.info(tabpanels);
				
				if(tabpanels.activeTab.id == "searchResultPollLoad_container"){
					var value = Ext.getCmp("pollLoadSelect").value;
					
					if(value == "11" ){
						colArr.splice(3,4);
					}else if(value == "22"){
						colArr.splice(3,3);
					}else if(value == "33"){
						colArr.splice(4,2);
					}else{
						colArr = colArr;
					}
				}
				
				
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
					//console.info(colArr);
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
					//(kg/일)
					for(var i = 0; i < headName.length; i++){
						if(headName[i].indexOf("(kg/일)") > -1)
							headName[i] = headName[i].replace("(kg/일)", "") + " (kg/일)";
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
		id: 'tabpanels',
		//title: 'tab1',
		style: 'background-color: #157fcb;',
		//header: false
		//closable: true,
	    
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
				var pollSearchTab = Ext.getCmp("pollSearchTab"); //부하량 (년도/검색)
				var pollResultTab = Ext.getCmp("pollResultTab"); //부하량 집수구역별 검색조건
				
				var pollutionSearchTab = Ext.getCmp("pollutionSearchTab"); //방유량 (년도/검색)
				var pollutionResultTab = Ext.getCmp("pollutionResultTab"); //방유량 집수구역별 검색조건

				
				//부하량 or 일반검색시 tab change
				if(tab.id == "searchResultPollLoad_container"){
					resultTab.setHidden(true);		//일반 검색pollResultTab
					pollSearchTab.setHidden(false);
					pollResultTab.setHidden(false);	//부하량 검색조건
					
					pollutionSearchTab.setHidden(true);
					pollutionResultTab.setHidden(true);	//방유량 검색조건
					
				}else if(tab.id == "searchResultpollution_01_container"
					||tab.id == "searchResultpollution_02_container"
					||tab.id == "searchResultpollution_03_container"
					||tab.id == "searchResultpollution_04_container"
					||tab.id == "searchResultpollution_05_container"
					||tab.id == "searchResultpollution_06_container"
					||tab.id == "searchResultpollution_07_container"){
					
					//일반 검색
					resultTab.setHidden(true);		
					
					//부하량 검색조건
					pollSearchTab.setHidden(true);
					pollResultTab.setHidden(true);	
					
					//오염원 검색조건
					pollutionSearchTab.setHidden(false);
					pollutionResultTab.setHidden(false);	
					
				}else{
					resultTab.setHidden(false);		//일반 검색pollResultTab
					
					pollSearchTab.setHidden(true);	//방유량 (년도/검색)
					pollResultTab.setHidden(true);	//방유량 검색조건
					
					//오염원 검색조건
					pollutionSearchTab.setHidden(true);
					pollutionResultTab.setHidden(true);	
				}
				
				
				
				var storevalue = Ext.getCmp(tab.id);
				if(storevalue != undefined){
					var pollutiongrdCtl = storevalue.items.items[0]; // 그리드 컨테이너
					pollutiongrdCtl = pollutiongrdCtl.items.items[0]; // 그리드 컨트롤
					
					
					
					var pollutionSelect = Ext.getCmp("pollutionSelect");
					
					if(pollutiongrdCtl.store.selectValue == undefined || pollutiongrdCtl.store.selectValue == ""){
						pollutionSelect.setValue("11");
					}else{
						pollutionSelect.setValue(pollutiongrdCtl.store.selectValue);
					}
					
					
					var pollutionYear = Ext.getCmp("pollutionYear");
					if(pollutiongrdCtl.store.year == undefined || pollutiongrdCtl.store.year == ""){
						pollutionYear.setValue("2013");
					}else{
						pollutionYear.setValue(pollutiongrdCtl.store.year);
					}
					
					
					
				}
				
				
				
								
				
			}
		}
	}]
		
});