Ext.define('KRF_DEV.view.common.PollListWindow', {
	extend : 'Ext.window.Window',
	
	xtype : 'common-polllistindow',
	
	id: 'PollListWindow',
	
	//controller: 'pollListWindowController',
	requires: [
	   		'KRF_DEV.view.common.PollListWindowController',
	   		'Ext.slider.*'
	   	],
	
	title: '부하량 측정항목',
	
	layout: {
		type: 'vbox'
	},
	width: 450,
	height: 455,

	items: [{
		xtype: 'treepanel',
		id: 'pollListTree',
		rootVisible:false,
		store: Ext.create('KRF_DEV.store.south.PollListWindow'),
		controller: 'pollListWindowController',
		cls: 'khLee-x-grid-cell',
		//header: false,
		autoScroll:true,
		height:400,
		columns: [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            //text: '부하량 측정항목',
            //header: false,
            width: 350,
            //sortable: true,
            dataIndex: 'text',
            locked: true
        }]
	},{
		xtype: 'button',
		text: '저장',
		listeners: {
			el: {
				click: function(){
					
					var pollgrdContainer = Ext.getCmp("searchResultPollLoad_container");
					
					var pollgrdCtl = pollgrdContainer.items.items[0]; // 그리드 컨테이너
					pollgrdCtl = pollgrdCtl.items.items[0];
					
					for(i=0; i < pollgrdCtl.columns.length ;i++){
						pollgrdCtl.columns[i].setHidden(true);
					}
					
					var pollListTree = Ext.getCmp("pollListTree");
					var store = pollListTree.getStore();
					
					//store 에 체크된 항목 hidden false
					for(j=0; j < store.data.items.length ; j++){
						if(store.data.items[j].childNodes.length == 0){
							if(store.data.items[j].data.checked == true){
								pollgrdCtl.columns[store.data.items[j].data.id].setHidden(false);
							}
						}
					}
					
					
					for(k=0;k<6;k++){
						pollgrdCtl.columns[k].setHidden(false);
					}
					
					
					var PollListWindow = Ext.getCmp("PollListWindow");
					PollListWindow.hide();
					
				}
			}
		}
	}],
	
	initComponent: function(){
    	
    	var me = this;
    	
		this.on("beforeclose", function windSitreNChartClose(){
			var polllistindow = Ext.getCmp("polllistindow");
			if(polllistindow != undefined){
				//windowSiteNChart.close();
				polllistindow.hide();
			}
			//btnSiteListWindow
			
			//160704 pdj x = hide
			var currCtl = SetBtnOnOff("btnSiteListWindow");
			me.hide();
			
			
			return false;
		});
		this.callParent();
		
	}
});