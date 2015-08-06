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
	height: 290,

	items: [{
		xtype: 'treepanel',
		y: 8,
		rootVisible:false,
		store: new Ext.data.TreeStore({
			root: {
				text: 'root',
				expanded: true,
				children: [{
					text: '수질측정지점(12)',
					cls: 'khLee-x-tree-node-text-bold',
					checked: false,
					expanded: true,
					children: [{
						text: '하천수(9)',
						checked: false,
						expanded: false,
						children: [{
							text: '남이섬',
							cls: 'khLee-x-tree-node-text-small',
							checked: false,
							leaf: true
						}, {
							text: '가평천1',
							cls: 'khLee-x-tree-node-text-small',
							checked: false,
							leaf: true
						}, {
							text: '가평천2',
							cls: 'khLee-x-tree-node-text-small',
							checked: false,
							leaf: true
						}, {
							text: '가평천3',
							cls: 'khLee-x-tree-node-text-small',
							checked: false,
							leaf: true
						}, {
							text: '춘성교',
							cls: 'khLee-x-tree-node-text-small',
							checked: false,
							leaf: true
						}, {
							text: '의암',
							cls: 'khLee-x-tree-node-text-small',
							checked: false,
							leaf: true
						}, {
							text: '의암댐',
							cls: 'khLee-x-tree-node-text-small',
							checked: false,
							leaf: true
						}, {
							text: '공지천1',
							cls: 'khLee-x-tree-node-text-small',
							checked: false,
							leaf: true
						}, {
							text: '공지천2',
							cls: 'khLee-x-tree-node-text-small',
							checked: false,
							leaf: true
						}]
					}, {
						text: '호소수(3)',
						checked: false,
						expanded: false
					}]
				}, {
					text: '환경기초시설(12)',
					cls: 'khLee-x-tree-node-text-bold',
					checked: false,
					expanded: false
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
            	Ext.ShowSiteInfoWindow("id");
                //Ext.Msg.alert('Editing' + (record.get('done') ? ' completed task' : '') , record.get('task'));
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
            	Ext.ShowChartResult("test", titleText);
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
            	Ext.ShowSearchResult("grid-tab-3", "info 검색결과");
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
            currCtl.setSrc(currCtl.src.replace("_on.png", ".png"));
        }
    },
	initComponent: function(){
		this.callParent();
	}
});