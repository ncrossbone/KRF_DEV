/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.SearchConfig', {

	extend: 'Ext.window.Window',
	xtype: 'win-searchConfig',
	id: 'searchConfig',
	
	width: 303,
	height: 110,
	x: 387,
	y: 200,
	
	header: false,
	closable: false,
	
	style: "border: 0px;",
	layout: {
		type: 'vbox'
	},
	
	items: [{
		xtype: "panel",
		title: "검색설정",
		layout: {
			type: "vbox"
		},
		width: "100%",
		items: [{
			xtype: 'container',
			style:"margin-top:5px; margin-left:30px;",
			layout: {
				type: 'hbox'
			},
			width: "100%",
			height: 30,
			items:[{
				xtype: 'checkbox',
				boxLabel: '상류',
				checked: false,
				width:50,
				handler: function(obj, checked){
					
					if(checked == true){
						
						//this.up("container").query("#chkMWDraw").enable();
					}
					
					// 로컬 스토리지 셋팅
					this.up("win-searchConfig").setLocalStorage();
				},
				inputValue: 'isUpDraw'
			},{
				xtype: 'checkbox',
				itemId: "chkMWDraw",
				boxLabel: '중권역',
				checked: false,
				disabled: true,
				width:80,
				handler: function(obj, checked){
					
					// 로컬 스토리지 셋팅
					this.up("win-searchConfig").setLocalStorage();
				},
				inputValue: 'isMWDraw'
			}]
		}, {
			xtype: 'container',
			style:"margin-top:5px; margin-left:30px;",
			layout: {
				type: 'hbox'
			},
			width: "100%",
			height: 30,
			items:[{
				xtype: 'checkbox',
				boxLabel: '본류',
				checked: true,
				width:50,
				handler: function(obj, checked){
					
					if(checked == false){
						
						obj.setValue(true);
					}
				},
				inputValue: 'isBonDraw'
			},{
				xtype: 'checkbox',
				boxLabel: '지류',
				checked: true,
				width:50,
				handler: function(obj, checked){
					
					// 로컬 스토리지 셋팅
					this.up("win-searchConfig").setLocalStorage();
				},
				inputValue: 'isJiDraw'
			}]
		}]
	}],
	
	initComponent: function(){
		
		this.callParent();
		
		// 체크박스 셋팅
		this.setCheckBox();
	},
	// 체크박스 셋팅
	setCheckBox: function(){
		
		// 로컬 스토리지
		var searchConfigInfo = localStorage['_searchConfigInfo_'];
		// 체크박스 컨트롤 배열
		var chkCtls = this.query("checkbox");
		console.info(searchConfigInfo);
		if(chkCtls != undefined && chkCtls != null){
			
			// 로컬 스토리지 존재하면
			if(searchConfigInfo != undefined && searchConfigInfo != null){
			
				var searchConfigInfoJson = JSON.parse(searchConfigInfo);
				
				// 체크박스 셋팅
				for(var i = 0; i < chkCtls.length; i++){
					
					if(chkCtls[i].inputValue != undefined && chkCtls[i].inputValue != null){
						
						var checked = eval("searchConfigInfoJson." + chkCtls[i].inputValue);
						chkCtls[i].setValue(checked);
					}
				}
			}
			else{
				
				// 로컬 스토리지 셋팅
				this.setLocalStorage();
			}
		}
	},
	// 로컬 스토리지 셋팅
	setLocalStorage: function(){
		
		var chkCtls = this.query("checkbox");
		var jsonObj = {};
		
		for(var i = 0; i < chkCtls.length; i++){
			
			if(chkCtls[i].inputValue != undefined && chkCtls[i].inputValue != null){
				
				eval("jsonObj." + chkCtls[i].inputValue + " = " + chkCtls[i].checked);
			}
		}
		
		localStorage['_searchConfigInfo_'] = JSON.stringify(jsonObj);
		console.info(localStorage['_searchConfigInfo_']);
	}
});