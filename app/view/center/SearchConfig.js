/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.SearchConfig', {
    extend: 'Ext.window.Window',
    
    xtype: 'searchConfig',
    id: 'searchConfig',
    title: '검색설정',
    
    width: 310,
    height: 300,
    
    cls: 'khLee-window-panel-header khLee-x-window-default ',
    
    initComponent: function(){
    	this.callParent();
    	var me = this;
    	var chkBox = Ext.create('Ext.form.CheckboxGroup', {
    	    //renderTo: me.el.getElement(),
    	    id: 'mycheckboxgroup',
    	    columns: 1,
    	    items: [{
    	        xtype: 'checkboxfield',
    	        boxLabel: 'Test1',
    	        name: 'test1',
    	        inputValue: 'true',
    	        uncheckedValue: 'false',
    	        formBind: false
    	    }, {
    	        xtype: 'checkboxfield',
    	        boxLabel: 'Test2',
    	        name: 'test2',
    	        inputValue: 'true',
    	        uncheckedValue: 'false',
    	        formBind: false
    	    }, {
    	        xtype: 'checkboxfield',
    	        boxLabel: 'Test3',
    	        name: 'test3',
    	        inputValue: 'true',
    	        uncheckedValue: 'false',
    	        formBind: false
    	    }]
    	});
    	
    	me.add(chkBox);
    }
});