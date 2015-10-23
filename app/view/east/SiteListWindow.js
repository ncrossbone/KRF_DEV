Ext.define('KRF_DEV.view.east.SiteListWindow', {
	extend : 'Ext.window.Window',
	
	xtype : 'east-sitelistindow',
	
	id: 'siteListWindow',
	
	//params: this.record,
	
	//title: '지점 목록',
	
	title: '지점 목록',
	
	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	//bodyStyle: 'border: 0px;',
	
	layout: {
		type: 'fit'
	},
	
	width: 400,
	height: 305,

	items: [{
		xtype: 'treepanel',
		id: 'siteListTree',
		rootVisible:false,
		//store: Ext.create('KRF_DEV.store.east.SiteListWindow')
		store: Ext.create('KRF_DEV.store.east.SiteListWindow'),
		cls: 'khLee-x-grid-cell',
		columns: [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: '지점',
            //header: false,
            width: 200,
            sortable: true,
            dataIndex: 'text',
            locked: true
        }, {
            text: '정보',
            width: 50,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '지점정보',
            align: 'center',
            icon: './resources/images/button/icon_branch.gif',
            iconCls: ' khLee-x-default-btn', // 앞에 한칸 띄워야 함!!
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            	var test = record.data.text;
            	var chkText = record.id;
            	var parentId = "";
            	parentId = record.data.parentId.substring(0,1);
            	ShowWindowSiteNChart(1, chkText, test, parentId);
            },
            // Only leaf level tasks may be edited
            isDisabled: function(view, rowIdx, colIdx, item, record) {
                return !record.data.leaf;
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
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            	var test = record.data.text;
            	var chkText = record.id;
            	var parentId = "";
            	parentId = record.data.parentId.substring(0,1);
            	ShowWindowSiteNChart(0, chkText, test, parentId);
            },
            isDisabled: function(view, rowIdx, colIdx, item, record) {
                return !record.data.leaf;
            }
        }, {
            text: '검색',
            width: 50,
            xtype: 'actioncolumn',
            tooltip: '검색결과',
            align: 'center',
            icon: './resources/images/button/icon_seah.gif',
            iconCls: ' khLee-x-serch-btn', // 앞에 한칸 띄워야 함!!
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            	//Ext.ShowSearchResult("grid-tab-2", "하천수");
            	
            	var treeCtl = Ext.getCmp("siteListTree");
            	var siteIds = "";
            	var parentId = "";
            	//var gridId = "grid_" + record.data.id;
            	
            	var me = this.findParentByType("window");
            	console.info(record);
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
            				console.info(pNm);
            				
            				
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
        				console.info(pNm);
        				
        				
        				// 검색결과창 띄우기
        				ShowSearchResult(me.siteIds, me.parentIds, record.data.text, gridId , "");
                		
                	//}
            	}
            	
            },
        }]
	}],
	
	siteIds: '',
	parentIds: [],
	
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
			if(me.siteIds != ""){
				me.siteIds += ", ";
			}

			me.parentIds.push({parentId: record.parentNode.data.id, siteId: record.data.id}); 
			me.siteIds += "'" + record.data.id + "'";
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
		this.callParent();
		// 트리 노드 클릭 이벤트
		Ext.defer(function(){
			Ext.getCmp("siteListTree").el.on("click", function(node, el){
				
				if(node.record.data.leaf == true){
					if(node.record.data.id != undefined){
						var nodeId = node.record.data.id;
						var parentNodeId = node.record.data.parentId;
						siteMovePoint(parentNodeId, nodeId);
					}
				}
				
			});
		}, 1, this);
	}
});