Ext.define('KRF_DEV.view.west.Layer01', {
	
	//extend: 'Ext.tab.Panel',
	extend: 'Ext.panel.Panel',
	
	xtype: 'west-Layer01',
	
	id: 'westLayer01', // view.west.WestTabLayerController에서 사용
	
	requires: [
		'KRF_DEV.view.west.Layer01Controller'
	],

	title: 'KRF 레이어',
	header: false,
	
	//autoScroll: true,
	
	tabBar: {
        border: false
    },
    
    width: '100%',
    height: '100%',
    
    defaults: {
        textAlign: 'center',
        bodyPadding: 5
    },
	
	items: [{
		title: '주제도 선택',
		xtype: 'treepanel',
		scroll: false,
		cls: 'khLee-x-tab-header',
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store : Ext.create('KRF_DEV.store.west.Layer01Store'),
		controller: 'layer01Controller',
		id: 'layer01', // view.map.DynamicLayerAdmin의 layer.id와 일치시키자..
		rootVisible: false,
		useArrows: true,
		border: 0,
		bufferedRenderer: false,
		height: Ext.getBody().getViewSize().height - 70 // size 조절기능 추가요함.
		//rowLines: true
	}/*, {
		title: 'Layer2',
		xtype: 'treepanel',
		store : Ext.create('KRF_DEV.store.west.WestTabLayerStore2'),
		controller: 'westTabLayerController',
		id: 'DynamicLayer2', // view.map.DynamicLayerAdmin의 layer.id와 일치시키자..
		rootVisible: false,
		useArrows: true,
		border: 0,
		bufferedRenderer: false
		//rowLines: true
	}*/]
});

Ext.on('resize', function(){
	// 레이어 트리 패널 높이 조절 (스크롤)
	var treeCtl = Ext.getCmp('westLayer01').items.items[0];
    //console.info(treeCtl);
    if(treeCtl == undefined)
    	return;

    treeCtl.setHeight(Ext.getBody().getViewSize().height - 70);
});