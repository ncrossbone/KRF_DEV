/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.SearchConfig', {
	extend: 'Ext.window.Window',

	xtype: 'searchConfig',
	id: 'searchConfig',
	title: '검색설정',

	width: 100,
	height: 20,
	
	x: 387,
	y: 172,

	style: 'border-style: none !important; background: url("./resources/images/popup/txtFieldBg.png") !important;',
	
	header: false,
	layout: {
		type: 'hbox',
    	align: 'top',
    	pack: 'middle'
	},
	
	items: [{
		xtype: 'checkbox',
		boxLabel: '본류',
		checked: true,
		handler: function(obj, checked){
			var chkGroup1 = this.findParentByType("checkboxgroup");
			var chkGroup1Items = chkGroup1.items.items;
			for(var i = 0; i < chkGroup1Items.length; i++){
				if(chkGroup1Items[i].inputValue == "isUpDraw"){
					chkGroup1Items[i].setValue(checked);
				}
				if(chkGroup1Items[i].inputValue == "isUpJiDraw"){
					if(checked == false){
						chkGroup1Items[i].setValue(checked);
					}
				}
			}
		},
		inputValue: 'isBonDraw'
		
	}, {
		xtype: 'checkbox',
		boxLabel: '지류',
		checked: true,
		handler: function(obj, checked){
			var chkGroup1 = this.findParentByType("checkboxgroup");
			var chkGroup1Items = chkGroup1.items.items;
			for(var i = 0; i < chkGroup1Items.length; i++){
				if(chkGroup1Items[i].inputValue == "isUpDraw"){
					chkGroup1Items[i].setValue(checked);
				}
				if(chkGroup1Items[i].inputValue == "isUpJiDraw"){
					if(checked == false){
						chkGroup1Items[i].setValue(checked);
					}
				}
			}
		},
		inputValue: 'isJiDraw'
		
	}],

	initComponent: function(){
		this.callParent();
		//console.info(this.items.items[0].items.items[1].items.items[0]);

		// khLee 임시 - DB연결 해제
		return;

		//체크 박스 변수 저장
		var upBon = Ext.getCmp('upBon');
		var upJi = Ext.getCmp('upJi');
		var downBon = Ext.getCmp('downBon');
		var downJi = Ext.getCmp('downJi');
		var configInfo="";
//체크 박스 컨트롤
		Ext.Ajax.request({

			url : "./resources/jsp/GetConfig.jsp",
				method : "GET",
				async:true,
				success : function(result, request) {
					configInfo=result.responseText;
					if(configInfo.trim()=="upBon"){
						upBon.setValue(true);
						upJi.setValue(false);
						downBon.setValue(false);
						downJi.setValue(false);
					}
					if(configInfo.trim()=="upBonupJi"){
						upBon.setValue(true);
						upJi.setValue(true);
						downBon.setValue(false);
						downJi.setValue(false);
					}
					if(configInfo.trim()=="downBon"){
						upBon.setValue(false);
						upJi.setValue(false);
						downBon.setValue(true);
						downJi.setValue(false);
					}
					if(configInfo.trim()=="downBondownJi"){
						upBon.setValue(false);
						upJi.setValue(false);
						downBon.setValue(true);
						downJi.setValue(true);
					}
					if(configInfo.trim()=="upBondownBon"){
						upBon.setValue(true);
						upJi.setValue(false);
						downBon.setValue(true);
						downJi.setValue(false);
					}
					if(configInfo.trim()=="upBonupJidownBon"){
						upBon.setValue(true);
						upJi.setValue(true);
						downBon.setValue(true);
						downJi.setValue(false);
					}
					if(configInfo.trim()=="upBonupJidownBondownJi"){
						upBon.setValue(true);
						upJi.setValue(true);
						downBon.setValue(true);
						downJi.setValue(true);
					}
					if(configInfo.trim()=="upBondownBondownJi"){
						upBon.setValue(true);
						upJi.setValue(false);
						downBon.setValue(true);
						downJi.setValue(true);
					}
					
				},
				failure : function(result, request) {
					Ext.Msg.alert("Failed", "Connection Failed");
				}

		});	
		

	},

	/*
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		layout: {
			type: 'vbox',
			align: 'strech'
		},
		items: [{
			xtype: 'container',
			height: 10
		}, {
			xtype: 'panel',
			title: {
				text: '상하류선택',
				style: 'color: #000;'
			},
			header: {
				style: 'background: #ecf5fa; border-top: 1px solid #c0d6e4; border-bottom: 1px solid #c0d6e4; height: 30px; padding-top: 7px; padding-left: 12px; color: #000 !important; top: -3px;'
			},
			width: '100%',
			height: '120',
			items: [{
				xtype: 'checkboxgroup',
				id: 'chkGroup1',
				width: '100%',
				columns: 3,
				allowBlank: false,
				style: 'margin-bottom: 30px;',
				cls: 'khLee-checkboxgroup-body',
				items: [{
					//각각check box에 id - hyeok
					id:'upBon',
					xtype: 'checkbox',
					boxLabel: '상류',
					checked: true,
					handler: function(obj, checked){
						var chkGroup1 = this.findParentByType("checkboxgroup");
						var chkGroup1Items = chkGroup1.items.items;
						for(var i = 0; i < chkGroup1Items.length; i++){
							if(chkGroup1Items[i].inputValue == "isUpBonDraw"){
								chkGroup1Items[i].setValue(checked);
							}
							if(chkGroup1Items[i].inputValue == "isUpJiDraw"){
								if(checked == false){
									chkGroup1Items[i].setValue(checked);
								}
							}
						}
					},
					inputValue: 'isUpDraw',
					style: 'margin-right: 15px;'
				}, {

					xtype: 'checkbox',
					boxLabel: '본류',
					checked: true,
					handler: function(obj, checked){
						var chkGroup1 = this.findParentByType("checkboxgroup");
						var chkGroup1Items = chkGroup1.items.items;
						for(var i = 0; i < chkGroup1Items.length; i++){
							if(chkGroup1Items[i].inputValue == "isUpDraw"){
								chkGroup1Items[i].setValue(checked);
							}
							if(chkGroup1Items[i].inputValue == "isUpJiDraw"){
								if(checked == false){
									chkGroup1Items[i].setValue(checked);
								}
							}
						}
					},
					inputValue: 'isUpBonDraw',
					style: 'margin-right: 15px;'
				}, {
					id:'upJi',
					xtype: 'checkbox',
					boxLabel: '지류',
					checked: true,
					handler: function(obj, checked){
						var chkGroup1 = this.findParentByType("checkboxgroup");
						var chkGroup1Items = chkGroup1.items.items;
						if(checked == true){
							for(var i = 0; i < chkGroup1Items.length; i++){
								if(chkGroup1Items[i].inputValue == "isUpDraw"){
									chkGroup1Items[i].setValue(checked);
								}
								if(chkGroup1Items[i].inputValue == "isUpBoneDraw"){
									chkGroup1Items[i].setValue(checked);
								}
							}
						}
					},
					inputValue: 'isUpJiDraw',
					style: 'margin-right: 15px;'
				}, {
					id:'downBon',
					xtype: 'checkbox',
					boxLabel: '하류',
					checked: true,
					handler: function(obj, checked){
						var chkGroup1 = this.findParentByType("checkboxgroup");
						var chkGroup1Items = chkGroup1.items.items;
						for(var i = 0; i < chkGroup1Items.length; i++){
							if(chkGroup1Items[i].inputValue == "isDownBonDraw"){
								chkGroup1Items[i].setValue(checked);
							}
							if(chkGroup1Items[i].inputValue == "isDownJiDraw"){
								if(checked == false){
									chkGroup1Items[i].setValue(checked);
								}
							}
						}
					},
					inputValue: 'isDownDraw',
					style: 'margin-right: 15px;'
				}, {

					xtype: 'checkbox',
					boxLabel: '본류',
					checked: true,
					handler: function(obj, checked){
						var chkGroup1 = this.findParentByType("checkboxgroup");
						var chkGroup1Items = chkGroup1.items.items;
						for(var i = 0; i < chkGroup1Items.length; i++){
							if(chkGroup1Items[i].inputValue == "isDownDraw"){
								chkGroup1Items[i].setValue(checked);
							}
							if(chkGroup1Items[i].inputValue == "isDownJiDraw"){
								if(checked == false){
									chkGroup1Items[i].setValue(checked);
								}
							}
						}
					},
					inputValue: 'isDownBonDraw',
					style: 'margin-right: 15px;'
				}, {
					id:'downJi',
					xtype: 'checkbox',
					boxLabel: '지류',
					checked: true,
					handler: function(obj, checked){
						var chkGroup1 = this.findParentByType("checkboxgroup");
						var chkGroup1Items = chkGroup1.items.items;
						if(checked == true){
							for(var i = 0; i < chkGroup1Items.length; i++){
								if(chkGroup1Items[i].inputValue == "isDownDraw"){
									chkGroup1Items[i].setValue(checked);
								}
								if(chkGroup1Items[i].inputValue == "isDownBoneDraw"){
									chkGroup1Items[i].setValue(checked);
								}
							}
						}
					},
					inputValue: 'isDownJiDraw',
					style: 'margin-right: 15px;'
				}]
			}]
		}, {
			xtype: 'panel',
			title: {
				text: '경계기준선택',
				style: 'color: #000;'
			},
			header: {
				style: 'background: #ecf5fa; border-top: 1px solid #c0d6e4; border-bottom: 1px solid #c0d6e4; height: 30px; padding-top: 7px; padding-left: 12px; color: #000 !important; top: -3px;'
			},
			width: '100%',
			height: '120',
			items: [{
				xtype: 'checkboxgroup',
				id: 'chkGroup2',
				columns: 1,
				allowBlank: false,
				style: 'margin-bottom: 30px;',
				items: [{
					xtype: 'checkbox',
					boxLabel: '해당중권역만',
					checked: false,
					inputValue: 'isAMDraw',
					style: 'margin-right: 15px;'
				}//, {
            		//xtype: 'checkbox',
            		//boxLabel: '댐이있는경우',
            		//checked: false,
            		//inputValue: 'isDemDraw',
            		//style: 'margin-right: 15px;'
            	//}
				]
			}]
		}, {
			xtype: 'container',
			width: '100%',
			height: 100,
			//style: 'align: center;',
			//align: 'middle',
			layout: {
				type: 'vbox',
				align: 'middle'
			},
			items: [{
				xtype: 'image',
				//text: '적용',
				width: 56,
				height: 25,
				src: './resources/images/button/btn_app.gif',
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function(){
							//check박스 아이디 변수에 저장.
							var upBon = Ext.getCmp('upBon');
							var upJi = Ext.getCmp('upJi');
							var downBon = Ext.getCmp('downBon');
							var downJi = Ext.getCmp('downJi');
							var upBonText="";
							var upJiText="";
							var downBonText="";
							var downJiText="";
							if(upBon.getValue()==true){
								upBonText="upBon";
							}
							if(upJi.getValue()==true){
								upJiText="upJi";
							}
							if(downBon.getValue()==true){
								downBonText="downBon";
							}
							if(downJi.getValue()==true){
								downJiText="downJi";
							}
							//db에 저장할 값 setting
							var configValue=upBonText+upJiText+downBonText+downJiText;
							

							Ext.Ajax.request({
								//DB에 저장
								url : "./resources/jsp/setConfig.jsp?value="+configValue,
								method : "GET",
								async:true,
								success : function(result, request) {
									Ext.Msg.alert("", "설정이 저장되었습니다.");
								},
								failure : function(result, request) {
									Ext.Msg.alert("Failed", "Connection Failed");
								}

							});





							var me = GetCoreMap();
							me.reachLayerAdmin.startLineReDraw();

        					//Ext.Ajax.request({
        		        		//url: './resources/jsp/SetSearchConfig.jsp',
        		        		//params: { chkGroup1Value: chkGroup1Value, chkGroup2Value: chkGroup2Value},
        		        		//async: true, // 비동기 = async: true, 동기 = async: false
        		        		//success : function(response, opts) {

        		        			//console.info(response.responseText);

        		        		//},
        		        		//failure: function(form, action) {
        		        			//alert(form.responseText);
        		        			//alert("오류가 발생하였습니다.");
        		        		//}
        		        	//});

						}
					}
				}
			}]
		}]
	}]
	*/

});