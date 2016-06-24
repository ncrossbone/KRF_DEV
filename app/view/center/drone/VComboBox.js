/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.drone.VComboBox', {
	extend: 'Ext.container.Container',
    
    xtype: 'drone-vcombo',
    
    id: "cboVCombo", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
    
    layout: {
		type: "absolute"
	},
	
	controller: "VComboBoxController",
	
	x: 0,
	y: 14,
	
	labelSrc: '',
	labelHeight: 24,
	
	width: 115,
	
	comboHeight: 24,
	
	jsonUrl: "",
	dataRoot: "",
	fields: [],
	valueField: "",
	displayField: "",
	onChange: "",
	onItemClick: "",
	noCollapse: false, // 콤보 리스트를 닫히지 않게하려면 true
	
	initComponent: function(){
		
		var me = this;
		
		var comboStore = me.getComboStore();
		
		
		//console.info(comboStore);
		
		this.items = [{
	    	xtype: 'container',
	    	x: me.x,
	    	y: me.y,
	    	width: me.width,
	    	layout: {
	    		type: "vbox"
	    	},
	    	items: [{
	    		xtype: "image",
	    		src: me.labelSrc,
	    		width: "100%",
	    		height: me.labelHeight
	    	}, {
	    		xtype: 'combo',
	    		width: "100%",
	    		height: me.comboHeight,
	    		//store: ["<img src='./resources/images/drone/chk_off.png' /> test1", "<img src='./resources/images/drone/chk_off.png' style='vertical-align: middle; margin-bottom: 0.25em;' /><img src='./resources/images/drone/layer_icon_04.png' style='vertical-align: middle; margin-bottom: 0.25em;' /> 클로로필a"],
	    		store: comboStore,
	    		listConfig: {
	    			id: me.id + "-list", // z-index 주기위해 id 지정 (drone.css .drone-combolist)
	    			getInnerTpl: function(a, b, c, d){
	    				return "{image1}{image2}{" + me.displayField + "}";
	    			},
	    			listeners: {
	    				itemclick: me.onItemClick
	    			}
	    		},
	    		listeners: {
	    			change: me.onChange,
	    			beforeselect: function(combo, record, index){
	    				
	    				// 콤보 리스트가 닫히지 않게 한다.
	    				if(me.noCollapse == true)
	    					return false;
	    			}
	    		},
	    		valueField: me.valueField,
	    		displayField: me.displayField
	    	}]
	    }];
	    
	    this.callParent();
	},
	
	getComboStore: function(){
		
		var me = this;
		
		var comboStore = null;
		
		if(me.dataRoot != ""){
			
			comboStore = Ext.create("Ext.data.Store", {
				fields: me.fields,
				proxy: {
					type: "ajax",
					url: me.jsonUrl,
					reader: {type: "json", root: me.dataRoot}
				}
			});
			
			comboStore.load();
			
			if(me.dataRoot == "layer"){
				
				comboStore.filterBy(function(record){
					
					if(record.get("visible") == "true"){
						
						return record;
					}
				});
			}
		}
		
		return comboStore;
	}
});