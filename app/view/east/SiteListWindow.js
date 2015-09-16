Ext.define('KRF_DEV.view.east.SiteListWindow', {
	extend : 'Ext.window.Window',
	
	xtype : 'east-sitelistindow',
	
	id: 'siteListWindow',
	
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
		//store: aaa
		//store: Ext.create('KRF_DEV.store.east.SiteListWindow')
		//store: Ext.create('KRF_DEV.store.east.SiteListWindow'),

		store: new Ext.data.TreeStore({
			root: {
				text: 'root',
				expanded: true,
				children: [{
					text: '수질측정지점(16)',
					cls: 'khLee-x-tree-node-text-bold',
					"iconCls": "layerNoneImg",
					checked: false,
					expanded: true,
					children: [{
						text: '하천수(10)',
						"iconCls": "layerIconSize layer1",
						checked: false,
						expanded: false,
						children: [{
							text: '가평천1',
							siteCode: '1013A70',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '가평천2',
							siteCode: '1013A80',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '가평천3',
							siteCode: '1013A90',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '공지천',
							siteCode: '1013A05',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '공지천1',
							siteCode: '1013A10',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '공지천2',
							siteCode: '1013A20',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '남이섬',
							siteCode: '1013A95',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '의암',
							siteCode: '1013A50',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '의암댐',
							siteCode: '1013A40',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '춘성교',
							siteCode: '1013A60',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}]
					}, {
						text: '호소수(3)',
						"iconCls": "layerIconSize layer2",
						checked: false,
						expanded: false,
						children: [{
							text: '의암댐1',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '의암댐2',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '의암댐3',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}]
					}, {
						text: '농업용수(3)',
						"iconCls": "layerIconSize layer3",
						checked: false,
						expanded: false,
						children: [{
							text: '원창저수지',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '소법저수지',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '탄부저수지',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}]
					}]
				}, {
					text: '환경기초시설(13)',
					cls: 'khLee-x-tree-node-text-bold',
					"iconCls": "layerNoneImg",
					checked: false,
					expanded: false,
					children: [{
						text: '하수종말처리장(5)',
						"iconCls": "layerIconSize layer26",
						checked: false,
						expanded: false,
						children: [{
							text: '춘천하수종말처리장',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '서면하수종말처리장',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '북면하수종말처리장',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '강촌하수종말처리장',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '가평하수종말처리장',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}]
					}, {
						text: '분뇨처리시설(1)',
						"iconCls": "layerIconSize layer28",
						checked: false,
						expanded: false,
						children: [{
							text: '춘천분뇨처리시설',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}]
					}, {
						text: '매립장침출수 처리(4)',
						"iconCls": "layerIconSize layer29",
						checked: false,
						expanded: false,
						children: [{
							text: '혈동리매립장',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '춘천온의동매립장',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '가평군상색리매립장',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '가평군(상색리)쓰레기위생매립장',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}]
					}, {
						text: '마을 하수도(3)',
						"iconCls": "layerIconSize layer30",
						checked: false,
						expanded: false,
						children: [{
							text: '안반지마을하수도',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '이화소규모하수도',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}, {
							text: '수동와룡마을하수도',
							cls: 'khLee-x-tree-node-text-small',
							"iconCls": "layerNoneImg",
							checked: false,
							leaf: true
						}]
					}]
				}]
			}
		}),
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
            	ShowWindowSiteNChart(1, "");
            },
            // Only leaf level tasks may be edited
            isDisabled: function(view, rowIdx, colIdx, item, record) {
                return !record.data.leaf;
            }
        }, {
            text: '차트',
            width: 50,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '차트정보',
            align: 'center',
            icon: './resources/images/button/icon_chart.gif',
            iconCls: ' khLee-x-default-btn',
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            	var titleText = record.parentNode.data.text + " > " + record.data.text;
            	ShowWindowSiteNChart(0, titleText);
            	//Ext.ShowChartResult("test", titleText);
                //Ext.Msg.alert('Editing' + (record.get('done') ? ' completed task' : '') , record.get('task'));
            },
            // Only leaf level tasks may be edited
            isDisabled: function(view, rowIdx, colIdx, item, record) {
                return !record.data.leaf;
            }
        }, {
            text: '검색',
            width: 50,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '검색결과',
            align: 'center',
            icon: './resources/images/button/icon_seah.gif',
            iconCls: ' khLee-x-serch-btn', // 앞에 한칸 띄워야 함!!
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            	Ext.ShowSearchResult("grid-tab-2", "하천수");
                //Ext.Msg.alert('Editing' + (record.get('done') ? ' completed task' : '') , record.get('task'));
            },
            // Only leaf level tasks may be edited
            /*
            isDisabled: function(view, rowIdx, colIdx, item, record) {
                return !record.data.leaf;
            }
            */
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
		//console.info(stror);
		//this.items.items[0].setSrore(stroe);
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