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
	height: 300,

	items: [{
		xtype: 'treepanel',
		id: 'siteListTree',
		y: 8,
		rootVisible:false,
		//store: Ext.create('KRF_DEV.store.east.SiteListWindow')
		store: Ext.create('KRF_DEV.store.east.SiteListWindow'),
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
            	console.info(record.parentNode.data.text);
            	console.info(record.data.text);
            	var test = record.data.text;
            	//console.info(record.data.text);
            	var chkText = record.id;
            	//console.info(record);
            	//console.info(grid+" : "+rowIndex+" : "+colIndex+" : "+actionItem+" : "+event+" : "+record+" : "+row);
            	ShowWindowSiteNChart(1, chkText, test);
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
            	console.info(record.parentNode.data.text);
            	console.info(record.data.text);
            	var test = record.data.text;
            	/*var titleText = record.parentNode.data.text + " > " + record.data.text;
            	ShowWindowSiteNChart(0, titleText);*/
            	var chkText = record.id;
            	ShowWindowSiteNChart(0, chkText, test);
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
            	//console.info(treeCtl.getStore().data.items[0].data.children);
            	//console.info(record.data.children);
            	var siteIds = "";
            	
            	if(record.data.children != null && record.data.children != undefined){
            		
            		for(var i = 0; i < record.data.children.length; i++){
            			
            			siteIds += "'" + record.data.children[i].id + "', ";
            			
            		}
            		
            		siteIds = siteIds.substring(0, siteIds.length - 2);
            		
            	}
            	else{
            		
            		siteIds = "'" + record.data.id + "'";
            		ShowWindowSiteNChart(1, record.data.id);
            		
            	}
            	
            	if(ChkSearchCondition("지점코드찾기", siteIds)){
            		
            		// 버튼 On/Off
    				currCtl = Ext.getCmp("btnSearchResult");
    				if(currCtl.btnOnOff == "off"){
    					SetBtnOnOff("btnSearchResult");
    				}
    				
    				// 검색결과창 띄우기
    				ShowSearchResult();
            		
            	}
            },
        }]
	}],
	
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
				console.info(node.record.data.leaf);
				if(node.record.data.leaf == true){
					//console.info(node.record.data.siteCode);
					if(node.record.data.siteCode != undefined){
						// 피처 레이어 생성/갱신
						KRF_DEV.getApplication().fireEvent('setSelectedSite', 1, node.record.data.siteCode);
					}
				}
			});
		}, 1, this);
	}
});