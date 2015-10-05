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
            	var chkText = record.id;
            	//console.info(record);
            	//console.info(grid+" : "+rowIndex+" : "+colIndex+" : "+actionItem+" : "+event+" : "+record+" : "+row);
            	ShowWindowSiteNChart(1, chkText);
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
            	/*var titleText = record.parentNode.data.text + " > " + record.data.text;
            	ShowWindowSiteNChart(0, titleText);*/
            	var chkText = record.id;
            	ShowWindowSiteNChart(0, chkText);
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
            	Ext.ShowSearchResult("grid-tab-2", "하천수");
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
				//console.info(node.record.data.leaf);
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