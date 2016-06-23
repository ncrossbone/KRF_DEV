Ext.define('KRF_DEV.view.drone.BoList', {
	extend : 'Ext.window.Window',
	//extend : 'Ext.panel.Panel',
	
	xtype : 'center-BoList',
	
	id: 'BoList',
	
	//params: this.record,
	
	//title: '지점 목록',
	
	//title: '지점 목록',
	
	//cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	//bodyStyle: 'border: 0px;',
	
	layout: {
		type: 'fit'
	},
	
	width: 128,
	height: 305,
	
	//header: false,
	header: {
		style: "cursor: default;",
		listeners: {
			click: function(){
				var winCtl = this.up("window");
				//alert(item.collapsed);
				if(winCtl.collapsed == false){
					winCtl.collapse();
					winCtl.removeCls("khLee-window-panel-header-expand");
					winCtl.addCls("khLee-window-panel-header-collapse");
				}
				else{
					winCtl.expand();
					winCtl.removeCls("khLee-window-panel-header-collapse");
					winCtl.addCls("khLee-window-panel-header-expand");
				}
			}
		}
	},
	shadow: false,
	closable: false,
	collapsable: true,
	plain: true,
	cls: 'khLee-window-panel-header-expand',
	//style: 'border-style: none !important; background: transparent none !important;',
	style: 'border-width: 1px !important; background: #fff !important;',

	items: [{
		xtype: 'grid',
		id: 'BoListTest',
		plugins: 'gridfilters',
		cls: 'khLee-x-column-header-text',
		style: 'border-style: solid !important; border-width: 1px !important; border-color: #000 !important;',
		width: '100%',
		height: '100%',
		filter: {
	            value:1,    // 0 is false, 1 is true
	            active:true // turn on the filter
	    },
	    header: false,
		title: '검색결과',
		//store: Ext.create('WaterBloomDrone.store.FeatureStoreLayerAdmin2'),
		columns: [{
			text      : '지점명',
			dataIndex : 'layerNm',
			//menuDisabled: true,
			//width: 150
			width: "100%",
			listeners: {
				'click': function(tblView, el, rowCnt, colCnt, row){
					var x = row.record.data.tmX;
					var y = row.record.data.tmY;
					
					var waterName = row.record.data.level;
					
					Ext.setCenter(x,y,waterName);
				}
			}
		}]
	}]
});