Ext.define('KRF_DEV.view.map.MapToolbar', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	xtype: 'cmm-maptoolbar-body',
	
	//height: 30,
	//width: 500,
	
	items:[{
		xtype: 'image',
    	id: 'btnLayer',
    	groupId: 'group1',
    	title: '주제도선택',
    	width: this.itemWidth,
    	height: this.itemHeight,
    	listeners: this.onClickListener,
    	src: './resources/images/button/left_menu01_on.png'
	}]
  
});