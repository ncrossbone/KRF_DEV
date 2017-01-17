Ext.define('KRF_DEV.view.east.SiteListWindow', {
	extend : 'Ext.window.Window',
	
	xtype : 'east-sitelistindow',
	
	id: 'siteListWindow',
	
	//title: '지점 목록',
	
	title: '지점 목록',
	
	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	//bodyStyle: 'border: 0px;',
	
	layout: {
		type: 'fit'
	},
	width: 540,
	height: 305,
	closable: false,
	style:"padding-top:10px",
	header:{
		items:[{
			xtype:'image',
			src:'./resources/images/button/btn_close.png',
			style:'padding-right :13px; cursor:pointer;',
			listeners:{
				el:{
					click:function(){
						Ext.getCmp("siteListWindow").close();
					}
				}
			}
		}]
	}, 
	items: [{
		xtype: 'treepanel',
		id: 'siteListTree',
		rootVisible:false,
		cls: 'khLee-x-grid-cell',
		columns: [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: '지점',
            //header: false,
            width: 220,
            sortable: true,
            dataIndex: 'text',
            locked: true,
            listeners: {
            	click: function(grid, rowIndex, colIndex, actionItem, node, record, row){
            		//console.info(tmBtnId);
            		//console.info($("#catTMOnOff"));
            		
	            	if(node.record.data.leaf == true){
						if(node.record.data.id != undefined){

							// 집수구역, 지점 이동, 리치정보 하이라이트
							var me = this.up("window");
							me.moveCommon(record);
						}
					}
	            }
            }
        }, {
            text: '정보',
            width: 50,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '지점정보',
            align: 'center',
            icon: './resources/images/button/icon_branch.gif',
            iconCls: ' khLee-x-default-btn', // 앞에 한칸 띄워야 함!!
            handler: function(grid, rowIndex, colIndex, actionItem, node, record, row) {
            	var test = record.data.text;
            	var chkText = record.id;
            	var parentId = record.data.parentId;
            	
            	ShowWindowSiteNChart(1, chkText, test, parentId);
            	
            	// 집수구역, 지점 이동, 리치정보 하이라이트
				var me = this.up("window");
				me.moveCommon(record);
            },
            // Only leaf level tasks may be edited
            isDisabled: function(view, rowIdx, colIdx, item, record) {
            	
            	//console.info(record.data.infoBtnDisabled);
            	
            	if(record.data.infoBtnDisabled != undefined){
            		
            		return record.data.infoBtnDisabled;
            	}
            	else{
            		return !record.data.leaf;
            	}
            }
        }, {
            text: '차트',
            width: 50,
            menuDisabled: true,
            tooltip: '차트정보',
            xtype: 'actioncolumn',
            align: 'center',
            icon: './resources/images/button/icon_chart.gif',
            iconCls: ' khLee-x-default-btn',
            handler: function(grid, rowIndex, colIndex, actionItem, node, record, row) {
            	var test = record.data.text;
            	var chkText = record.id;
            	var parentId = record.data.parentId;
            	
            	ShowWindowSiteNChart(0, chkText, test, parentId);
            	
            	// 집수구역, 지점 이동, 리치정보 하이라이트
				var me = this.up("window");
				me.moveCommon(record);
            },
            isDisabled: function(view, rowIdx, colIdx, item, record) {
            	
            	if(record.data.chartBtnDisabled != undefined){
            		
            		return record.data.chartBtnDisabled;
            	}
            	else{
            		return !record.data.leaf;
            	}
            }
        }, {
        	xtype: 'actioncolumn',
            text: '리포트',
            width: 60,
            menuDisabled: true,
            tooltip: '리포트',
            align: 'center',
            dataIndex: 'id',
            icon: "./resources/images/button/icon_report.gif",
            iconCls: ' khLee-x-default-btn',
            isDisabled: function(view, rowIdx, colIdx, item, record) {
            	
            	if(record.data.id == "A"){
            		return false;
            	}
            	else{
            		return true;
            	}
            },
            handler: function(grid, rowIndex, colIndex, actionItem, node, record, row) {
            	
            	var me = this.up("window");
            	
            	var childRecord = record.childNodes;
        		
        		for(var i = 0; i < childRecord.length; i++){
        			
        			var isInit = true;
        			if(i != 0){
        				isInit = false;
        			}
        			me.setSiteIds(childRecord[i], isInit);
        		}
            	
            	var coreMap = GetCoreMap();
				var center = coreMap.map.extent.getCenter();
				var level = coreMap.map.getLevel();
				var width = coreMap.getWidth();
				var height = coreMap.getHeight();
				//console.info(width);
				//console.info(height);
				//console.info(coreMap.map.extent.getCenter());
				//console.info(coreMap.map.getLevel());
				
				var rptwindow = Ext.getCmp("rptinitwindow");
								
				if(rptwindow==undefined){
					var rpt = Ext.create("KRF_DEV.view.center.RptInitWindow");
					rpt.show(); 
				}
				
				//var url = "./report/rptExtView.html?l=" + level + "&x=" + center.x + "&y=" + center.y +
				//"&w=" + width + "&h=" + height;
				//window.open(url, "리포트 설정", //"width=1350,height=900,menubar=no,status=no,toolbar=no,location=no,resizable=no,fullscreen=no,scrollbars=no");
				
				/*width : 팝업창 가로길이
				height : 팝업창 세로길이
				toolbar=no : 단축도구창(툴바) 표시안함
				menubar=no : 메뉴창(메뉴바) 표시안함
				location=no : 주소창 표시안함
				scrollbars=no : 스크롤바 표시안함
				status=no : 아래 상태바창 표시안함
				resizable=no : 창변형 하지않음
				fullscreen=no : 전체화면 하지않음
				channelmode=yes : F11 키 기능이랑 같음
				left=0 : 왼쪽에 창을 고정(ex. left=30 이런식으로 조절)
				top=0 : 위쪽에 창을 고정(ex. top=100 이런식으로 조절)*/
            }
        }, {
            text: '검색',
            width: 50,
            xtype: 'actioncolumn',
            tooltip: '검색결과',
            align: 'center',
            icon: './resources/images/button/icon_seah.gif',
            iconCls: ' khLee-x-serch-btn', // 앞에 한칸 띄워야 함!!
            handler: function(grid, rowIndex, colIndex, actionItem, node, record, row) {
            	//Ext.ShowSearchResult("grid-tab-2", "하천수");
            	KRF_DEV.getApplication().btnFlag = "noDate";
            	var treeCtl = Ext.getCmp("siteListTree");
            	var siteIds = "";
            	var parentId = "";
            	//var gridId = "grid_" + record.data.id;
            	//console.info(childRecord[i].data.text);
            	// 집수구역, 지점 이동, 리치정보 하이라이트
				var me = this.up("window");
				me.moveCommon(record);
            	//PollLoadSearchResult
            	if(record.id.length == 1){
            		var childRecord = record.childNodes;
            		
            		for(var i = 0; i < childRecord.length; i++){
            			var gridId = "grid_" + childRecord[i].data.id;
            			me.setSiteIds(childRecord[i], true);
                    	//console.info(me.parentIds);
            			
                    	//if(ChkSearchCondition("지점코드찾기", siteIds, parentId, record.data.text, gridId)){
                    		
                    		// 버튼 On/Off
            				currCtl = Ext.getCmp("btnSearchResult");
            				if(currCtl.btnOnOff == "off"){
            					SetBtnOnOff("btnSearchResult");
            				}
            				
            				var pNm = me.parentIds[0].parentId;
            				
            				pNm = pNm.substring(0,1);
            				
            				//console.info(childRecord[i].data.text);
            				// 검색결과창 띄우기
            				ShowSearchResult(me.siteIds, me.parentIds, childRecord[i].data.text, gridId , "");
                    		
                    	//}
            		}
            	}
            	else{
            		var gridId = "grid_" + record.data.id;
            		me.setSiteIds(record, true);
                	//console.info(me.parentIds);

                	//if(ChkSearchCondition("지점코드찾기", siteIds, parentId, record.data.text, gridId)){
                		
                		// 버튼 On/Off
        				currCtl = Ext.getCmp("btnSearchResult");
        				if(currCtl.btnOnOff == "off"){
        					SetBtnOnOff("btnSearchResult");
        				}
        				
        				var pNm = me.parentIds[0].parentId;
        				
        				pNm = pNm.substring(0,1);
        				//console.info(record.data.text);
        				// 검색결과창 띄우기
        				ShowSearchResult(me.siteIds, me.parentIds, record.data.text, gridId , "");
        				
        				var coreMap = GetCoreMap();
        				var year = "2013";
        				//검색결과 "검색"시 부하량 표출
        				if(record.id == "pollLoad"){
        					PollLoadSearchResult("");
        				}else if(record.id == "pollution_01"
        						||record.id == "pollution_02"
        						||record.id == "pollution_03"
        						||record.id == "pollution_04"
        						||record.id == "pollution_05"
        						||record.id == "pollution_06"
        						||record.id == "pollution_07"){
        					
        					PollutionSearchResult("",record.id,record.data.title,record.data.storeNm,year);
        				}else if(record.id = "pollution"){
        					
        					for(var i = 0 ; i < record.childNodes.length;i++){
        						PollutionSearchResult("",record.childNodes[i].data.id
        								,record.childNodes[i].data.title
        								,record.childNodes[i].data.storeNm,year);
        					}	
        				}
            	}
            },
            isDisabled: function(view, rowIdx, colIdx, item, record) {
            	
            	if(record.data.srchBtnDisabled != undefined){
            		
            		return record.data.srchBtnDisabled;
            	}
            }
        }, {
            text: '관련리치',
            width: 95,
            //xtype: 'templatecolumn',
            tooltip: '관련리치',
            dataIndex: 'catDId',
            renderer: function(val){
            	var retVal = "";
            	if(val != undefined)
            		retVal = val;
            	return '<a href="#">' + retVal + '</a>';
            },
            align: 'center',/*
            hidden: true*/
            listeners: {
            	click: function(grid, rowIndex, colIndex, actionItem, node, record, row){
	            	if(record.data.leaf == true){
						if(record.data.id != undefined){
							
							currCtl = Ext.getCmp("btnSearchResult");
	        				if(currCtl.btnOnOff == "off"){
	        					SetBtnOnOff("btnSearchResult");
	        				}
							
							// 집수구역, 지점 이동, 리치정보 하이라이트
							var me = this.up("window");
							me.moveCommon(record);
						}
					}
	            }
            }
        }]
	}],
	
	siteIds: '',
	parentIds: [],
	catIds: '',
	
	// 사이트 아이디 셋팅 (record : tree node, isInit : siteIds 변수 초기화 여부)
	setSiteIds: function(record, isInit){
    	
		var me = this;
		if(isInit == true){
			me.parentIds = [];
			me.siteIds = "";
		}
		
		var childRecords = record.childNodes;
		
		if(childRecords != undefined && childRecords.length > 0){
			for(var i = 0; i < childRecords.length; i++){
				me.setSiteIds(childRecords[i], false);
			}
		}
		else{
			;
			if(me.siteIds != ""){
				me.siteIds += ", ";
			}

			me.parentIds.push({parentId: record.parentNode.data.id, siteId: record.data.id}); 
			me.siteIds += "'" + record.data.id + "'";
		}
    	
    },
    
    setCatIds: function(record, isInit){
    	var me = this;
    	var childRecords = undefined;
    	//console.info(record);
    	
    	if(isInit == true){
    		me.catIds = "";
    		var treeCtl = Ext.getCmp("siteListTree");
    		var rootNode = treeCtl.store.root;
    		childRecords = rootNode.childNodes;
    	}
    	else{
    		childRecords = record.childNodes;
    	}
    	
    	/*
    	if(isInit == true){
    		me.catIds = "";
    	}
    	
    	childRecords = record.childNodes;
    	*/
    	
    	if(childRecords != undefined && childRecords.length > 0){
			for(var i = 0; i < childRecords.length; i++){
				me.setCatIds(childRecords[i], false);
			}
		}
		else{
			if(me.catIds != ""){
				me.catIds += ", ";
			}
 
			me.catIds += "'" + record.data.catDId + "'";
		}
    },
	
	listeners:{
        close:function(){
            var currCtl = Ext.getCmp("btnSiteListWindow");
            if(currCtl.btnOnOff == "on"){
            	SetBtnOnOff(currCtl.id);
            }
        }
    },
    
    initComponent: function(){
    	
    	var me = this;
		this.on("beforeclose", function windSitreNChartClose(){
			var windowSiteNChart = Ext.getCmp("windowSiteNChart");
			if(windowSiteNChart != undefined){
				//windowSiteNChart.close();
				windowSiteNChart.hide();
			}
			//btnSiteListWindow
			
			//160704 pdj x = hide
			var currCtl = SetBtnOnOff("btnSiteListWindow");
			me.hide();
			
			
			return false;
		});
		this.callParent();
		
	},
	
	moveCommon: function(record){
		
		var me = this;
		
		// 집수구역 이동
		var nodeId = record.data.catDId;
		siteMovePoint("Cat", nodeId);
		
		// 지점이동
		nodeId = record.data.id;
		var parentNodeId = record.data.parentId;
		siteMovePoint(parentNodeId, nodeId);
		
		// 리치정보 띄우기
		me.setCatIds(record, true);
		ShowSearchResultReach(me.catIds);
		//alert(record.data.catDId);
		Ext.defer(function(){
			ReachSelectedFocus(record.data.catDId);
		}, 1000, this);
	}
});