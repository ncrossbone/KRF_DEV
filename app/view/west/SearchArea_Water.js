/*
 * 수계로 찾기 검색 페이지
 */
Ext
		.define(
				'KRF_DEV.view.west.SearchArea_Water',
				{

					extend : 'Ext.panel.Panel',

					xtype : 'west-searchArea_Water',

					controller : 'searchArea_WaterController',

					title : '수계로 찾기',

					autoScroll : true,

					// bodyPadding: 10,
					// border: 0,
					cls : 'khLee-x-searcharea-water',

					layout : {
						type : 'vbox',
						align : 'stretch'
					},

					items : [ {
						xtype : 'form',
						cls : 'khLee-x-form',
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						items : [
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									items : [
											{
												id : 'cmbWater1',
												layerId : '54',
												xtype : 'combo',
												tarCmbId : 'cmbWater2',
												lnkBtnId : 'btnWater1',
												cls : 'khLee-x-form-item-label-default',
												fieldLabel : '<img src="./resources/images/button/blit_st_01.png" /> <b>대권역</b> ',
												labelWidth : 60,
												labelAlign : 'right',
												labelPad : 10,
												width : 200,
												editable : false,
												// labelSeparator: '', //
												// Defaults to: ':'
												store : Ext
														.create('KRF_DEV.store.west.SearchArea_Water'),
												displayField : 'name',
												valueField : 'id'
											}, {
												xtype : 'container',
												width : 10
											}, {
												xtype : 'button',
												id : 'btnWater1',
												lnkCmbId : 'cmbWater1',
												// text: '이동',
												// width: 55,
												// height: 25,
												disabled : true,
												cls : 'khLee-x-button-move'
											} ]
								},
								{
									xtype : 'container',
									height : 7
								},
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									items : [
											{
												id : 'cmbWater2',
												layerId : '55',
												xtype : 'combo',
												tarCmbId : 'cmbWater3',
												lnkBtnId : 'btnWater2',
												cls : 'khLee-x-form-item-label-default',
												fieldLabel : '<img src="./resources/images/button/blit_st_01.png" /> <b>중권역</b> ',
												labelWidth : 60,
												labelAlign : 'right',
												labelPad : 10,
												width : 200,
												editable : false,
												// labelSeparator: '', //
												// Defaults to: ':'
												store : Ext
														.create('KRF_DEV.store.west.SearchArea_Water'),
												displayField : 'name',
												valueField : 'id',
												disabled : true
											}, {
												xtype : 'container',
												width : 10
											}, {
												xtype : 'button',
												id : 'btnWater2',
												lnkCmbId : 'cmbWater2',
												// text: '이동',
												// width: 55,
												// height: 25,
												cls : 'khLee-x-button-move'
											} ]
								},
								{
									xtype : 'container',
									height : 7
								},
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									items : [
											{
												id : 'cmbWater3',
												layerId : '56',
												xtype : 'combo',
												tarCmbId : '',
												lnkBtnId : 'btnWater3',
												cls : 'khLee-x-form-item-label-default',
												fieldLabel : '<img src="./resources/images/button/blit_st_01.png" /> <b>소권역</b> ',
												labelWidth : 60,
												labelAlign : 'right',
												labelPad : 10,
												width : 200,
												editable : false,
												// labelSeparator: '', //
												// Defaults to: ':'
												store : Ext
														.create('KRF_DEV.store.west.SearchArea_Water'),
												displayField : 'name',
												valueField : 'id',
												disabled : true
											}, {
												xtype : 'container',
												width : 10
											}, {
												xtype : 'button',
												id : 'btnWater3',
												lnkCmbId : 'cmbWater3',
												// text: '이동',
												// width: 55,
												// height: 25,
												cls : 'khLee-x-button-move'
											} ]
								}, {
									xtype : 'container',
									height : 17
								}, {
									xtype : 'container',
									layout : {
										type : 'hbox',
										align : 'end',
										pack : 'middle'
									},
									items : [ {
										xtype : 'button',
										id : 'btnWaterReset',
										// text: '초기화',
										cls : 'khLee-x-button-reset'
									}, {
										xtype : 'container',
										width : 10
									}, {
										xtype : 'button',
										id : 'btnWaterSelect',
										// text: '선택',
										cls : 'khLee-x-button-select'
									} ]
								} 
								
								
								,
								{
									xtype : 'container',
									height : 7
								},
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									items : [
											{
												id : 'cmbDrone1',
												layerId : '54',
												xtype : 'combo',
												lnkBtnId : 'btnDrone1',
												cls : 'khLee-x-form-item-label-default',
												fieldLabel : '<img src="./resources/images/button/blit_st_01.png" /> <b>수계</b> ',
												labelWidth : 60,
												labelAlign : 'right',
												labelPad : 10,
												width : 200,
												editable : false,
												// labelSeparator: '', //
												// Defaults to: ':'
												store : Ext.create('Ext.data.Store', {
													fields: ['id', 'name'],
													data: [{id: 'nakdongriver', name: '낙동강 수계'}
														,{id: 'northriver', name: '북한강 수계'}
														,{id: 'hanriver', name: '한강하류'}
														,{id: 'goldriver', name: '금강 수계'}]
												}),
												displayField : 'name',
												valueField : 'id',
												listeners: {
													render:function(fildId){
														
													},
													select: function() {
														
										            	Ext.defer(function(){
										            		
										            		var cmbDrone1 = Ext.getCmp('cmbDrone1');
										            		var cmbDrone2 = Ext.getCmp('cmbDrone2');
										            		var cmbDrone3 = Ext.getCmp('cmbDrone3');
										            		var cmbDrone4 = Ext.getCmp('cmbDrone4');
										            		
										            		Ext.bolist();
															if(cmbDrone1.lastMutatedValue == "낙동강 수계"){
																cmbDrone2.setStore(Ext.nakdongDroneDate);
																cmbDrone3.setStore(Ext.nakdongChlDate);
																cmbDrone4.setStore(Ext.nakdongWMCYMW);
																
																var cboDate2 = cmbDrone2.getStore();
																cmbDrone2.setValue(cboDate2.data.items[cboDate2.data.items.length-1].data.field1);
																
															}else if(cmbDrone1.lastMutatedValue == "북한강 수계"){
																cmbDrone2.setStore(Ext.northHanDroneDate);
																cmbDrone3.setStore(Ext.northHanChlDate);
																cmbDrone4.setStore(Ext.northHanWMCYMW);
																
																var cboDate2 = cmbDrone2.getStore();
																cmbDrone2.setValue(cboDate2.data.items[cboDate2.data.items.length-1].data.field1);
																
															}else if(cmbDrone1.lastMutatedValue == "한강하류"){
																cmbDrone2.setStore(Ext.hangangDroneDate);
																cmbDrone3.setStore(Ext.hangangChlDate);
																cmbDrone4.setStore(Ext.hangangWMCYMW);
																
																var cboDate2 = cmbDrone2.getStore();
																cmbDrone2.setValue(cboDate2.data.items[cboDate2.data.items.length-1].data.field1);
																
															}else{
																cmbDrone2.setStore(Ext.geumDroneDate);
																cmbDrone3.setStore(Ext.geumChlDate);
																cmbDrone4.setStore(Ext.geumWMCYMW);
																
																var cboDate2 = cmbDrone2.getStore();
																cmbDrone2.setValue(cboDate2.data.items[cboDate2.data.items.length-1].data.field1);
																
															}
															//수계로 이동
															Ext.SetInitialExtent(cmbDrone1.value);
															
															
										            		
										            	}, 10, this);
														
													}
												}
											}, {
												xtype : 'container',
												width : 10
											}, {
												xtype : 'button',
												id : 'btnDrone',
												cls : 'khLee-x-button-move'
											} ]
								},
								{
									xtype : 'container',
									height : 7
								},
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									items : [
											{
												id : 'cmbDrone2',
												layerId : '54',
												xtype : 'combo',
												lnkBtnId : 'btnDrone2',
												cls : 'khLee-x-form-item-label-default',
												fieldLabel : '<img src="./resources/images/button/blit_st_01.png" /> <b>항공영상</b> ',
												labelWidth : 60,
												labelAlign : 'right',
												labelPad : 10,
												width : 200,
												listeners:{
											        change: function (field, newValue, oldValue) {
											        	
											        	var cmbDrone1 = Ext.getCmp('cmbDrone1');
											        	var droneDate = Ext.nakdongDroneDate;
											        	var chlDate = Ext.nakdongChlDate;
											        	var wmcymw = Ext.nakdongWMCYMW;
											        	var riverName = "";
											        	
											        	if(cmbDrone1.lastMutatedValue == "낙동강 수계"){
											        		droneDate = Ext.nakdongDroneDate;
											        		wmcymw = Ext.nakdongWMCYMW;
											        		chlDate = Ext.nakdongChlDate;
														}else if(cmbDrone1.lastMutatedValue == "북한강 수계"){
															droneDate = Ext.northHanDroneDate;
															wmcymw = Ext.northHanWMCYMW;
															chlDate = Ext.northHanChlDate;
														}else if(cmbDrone1.lastMutatedValue == "한강하류"){
															droneDate = Ext.hangangDroneDate;
															wmcymw = Ext.hangangWMCYMW;
															chlDate = Ext.hangangChlDate;
														}else{
															droneDate = Ext.geumDroneDate;
															wmcymw = Ext.geumWMCYMW;
															chlDate = Ext.geumChlDate;
														}
											        	
											        	
											        	comboIdx = droneDate.indexOf(newValue);
											        	
											        	var measureCombo = Ext.getCmp("cmbDrone4");
											        	if(wmcymw[comboIdx] == "")
											        		measureCombo.setValue("선택하세요.");
											        	else
											        		measureCombo.setValue(wmcymw[comboIdx]);
											        	
											        	var chlCombo = Ext.getCmp("cmbDrone3");
											        	if(chlDate[comboIdx] == "" || chlDate[comboIdx] == undefined)
											        		chlCombo.setValue("선택하세요.");
											        	else
											        		chlCombo.setValue(chlDate[comboIdx]);
											        	
											        	LayerOnOffBtn(Ext.getCmp('_mapDiv_'), "DynamicLayer3");
											        },
											        scope: this
											    
													
												}
											}, {
												xtype : 'container',
												width : 10
											}, {
												xtype : 'button',
												id : 'btnDrone2',
												cls : 'khLee-x-button-move'
											} ]
								},
								{
									xtype : 'container',
									height : 7
								},
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									items : [
											{
												id : 'cmbDrone3',
												layerId : '54',
												xtype : 'combo',
												lnkBtnId : 'btnDrone3',
												cls : 'khLee-x-form-item-label-default',
												fieldLabel : '<img src="./resources/images/button/blit_st_01.png" /> <b>클로로필a</b> ',
												labelWidth : 60,
												labelAlign : 'right',
												labelPad : 10,
												width : 200,
												editable : false,
												// labelSeparator: '', //
												// Defaults to: ':'
												displayField : 'name',
												valueField : 'id',
												listeners: {
											        change: function (field, newValue, oldValue) {
											        	
											        	
											        	var cmbDrone1 = Ext.getCmp('cmbDrone1');
											        	var droneDate = Ext.nakdongDroneDate;
											        	var chlDate = Ext.nakdongChlDate;
											        	var wmcymw = Ext.nakdongWMCYMW;
											        	
											        	if(cmbDrone1.lastMutatedValue == "낙동강 수계"){
											        		droneDate = Ext.nakdongDroneDate;
											        		wmcymw = Ext.nakdongWMCYMW;
											        		chlDate = Ext.nakdongChlDate;
														}else if(cmbDrone1.lastMutatedValue == "북한강 수계"){
															droneDate = Ext.northHanDroneDate;
															wmcymw = Ext.northHanWMCYMW;
															chlDate = Ext.northHanChlDate;
														}else if(cmbDrone1.lastMutatedValue == "한강하류"){
															droneDate = Ext.hangangDroneDate;
															wmcymw = Ext.hangangWMCYMW;
															chlDate = Ext.hangangChlDate;
														}else{
															droneDate = Ext.geumDroneDate;
															wmcymw = Ext.geumWMCYMW;
															chlDate = Ext.geumChlDate;
														}
											        	
											        	
											        	comboIdx = chlDate.indexOf(newValue);

											        	var measureCombo = Ext.getCmp("cmbDrone4");
											        	var layerCombo = Ext.getCmp("cmbDrone2");
											        	
											        	if(newValue != "선택하세요."){
											        		measureCombo.setValue(wmcymw[comboIdx]);
											        		layerCombo.setValue(droneDate[comboIdx]);
											        	}
											        	
											        	LayerOnOffBtn(Ext.getCmp('_mapDiv_'), "DynamicLayer3");
											        },
											        scope: this
											    }
											}, {
												xtype : 'container',
												width : 10
											}, {
												xtype : 'button',
												id : 'btnDrone3',
												cls : 'khLee-x-button-move'
											} ]
								},
								{
									xtype : 'container',
									height : 7
								},
								{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									items : [
											{
												id : 'cmbDrone4',
												layerId : '54',
												xtype : 'combo',
												lnkBtnId : 'btnDrone5',
												cls : 'khLee-x-form-item-label-default',
												fieldLabel : '<img src="./resources/images/button/blit_st_01.png" /> <b>조류측정자료</b> ',
												labelWidth : 60,
												labelAlign : 'right',
												labelPad : 10,
												width : 200,
												editable : false,
												// labelSeparator: '', //
												// Defaults to: ':'
												displayField : 'name',
												valueField : 'id',
												listeners: {
											        change: function (field, newValue, oldValue) {
											        	
											        	
											        	var cmbDrone1 = Ext.getCmp('cmbDrone1');
											        	var droneDate = Ext.nakdongDroneDate;
											        	var chlDate = Ext.nakdongChlDate;
											        	var wmcymw = Ext.nakdongWMCYMW;
											        	if(cmbDrone1.lastMutatedValue == "낙동강 수계"){
											        		droneDate = Ext.nakdongDroneDate;
											        		wmcymw = Ext.nakdongWMCYMW;
											        		chlDate = Ext.nakdongChlDate;
														}else if(cmbDrone1.lastMutatedValue == "북한강 수계"){
															droneDate = Ext.northHanDroneDate;
															wmcymw = Ext.northHanWMCYMW;
															chlDate = Ext.northHanChlDate;
														}else if(cmbDrone1.lastMutatedValue == "한강하류"){
															droneDate = Ext.hangangDroneDate;
															wmcymw = Ext.hangangWMCYMW;
															chlDate = Ext.hangangChlDate;
														}else{
															droneDate = Ext.geumDroneDate;
															wmcymw = Ext.geumWMCYMW;
															chlDate = Ext.geumChlDate;
														}
											        	
											        	
											        	comboIdx = wmcymw.indexOf(newValue);
											        	
											        	var layerCombo = Ext.getCmp("cmbDrone2");
											        	if(droneDate[comboIdx] == "")
											        		layerCombo.setValue("선택하세요.");
											        	else
											        		layerCombo.setValue(droneDate[comboIdx]);
											        	
											        	var chlCombo = Ext.getCmp("cmbDrone3");
											        	if(chlDate[comboIdx] == "")
											        		chlCombo.setValue("선택하세요.");
											        	else
											        		chlCombo.setValue(chlDate[comboIdx]);
											        	
											        	
											        	LayerOnOffBtn(Ext.getCmp('_mapDiv_'), "DynamicLayer3");

											        	
											        	Ext.setFeatureLayer();
											        },
											        scope: this
												}
											}, {
												xtype : 'container',
												width : 10
											}, {
												xtype : 'button',
												id : 'btnDrone4',
												cls : 'khLee-x-button-move'
											} ]
								},{

									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									items : [
											{
												id : 'cmbDrone5',
												layerId : '54',
												xtype : 'combo',
												lnkBtnId : 'btnDrone5',
												cls : 'khLee-x-form-item-label-default',
												fieldLabel : '<img src="./resources/images/button/blit_st_01.png" /> <b>지점목록</b> ',
												labelWidth : 60,
												labelAlign : 'right',
												labelPad : 10,
												width : 200,
												editable : false,
												// labelSeparator: '', //
												// Defaults to: ':'
												listeners: {
													select: function(tblView, el, rowCnt, colCnt, row){
														
														var riverName = Ext.getCmp('cmbDrone1').value;
														console.info(riverName);
														if(riverName == "nakdongriver"){
															for(var i = 0 ;  i < Ext.nakdongBoListStore.length ; i++){
																if(Ext.nakdongBoListStore[i].layerNm == tblView.lastValue){
																	Ext.setCenter(Ext.nakdongBoListStore[i].tmX,Ext.nakdongBoListStore[i].tmY);
																}	
															}
														}else if(riverName == "northriver"){
															for(var i = 0 ;  i < Ext.northBoListStore.length ; i++){
																if(Ext.northBoListStore[i].layerNm == tblView.lastValue){
																	Ext.setCenter(Ext.northBoListStore[i].tmX,Ext.northBoListStore[i].tmY);
																}	
															}
														}else if(riverName == "hanriver"){
															for(var i = 0 ;  i < Ext.hanBoListStore.length ; i++){
																if(Ext.hanBoListStore[i].layerNm == tblView.lastValue){
																	Ext.setCenter(Ext.hanBoListStore[i].tmX,Ext.hanBoListStore[i].tmY);
																}	
															}
														}else{
															console.info("#");
															for(var i = 0 ;  i < Ext.goldBoListStore.length ; i++){
																console.info(i);
																if(Ext.goldBoListStore[i].layerNm == tblView.lastValue){
																	console.info(i);
																	Ext.setCenter(Ext.goldBoListStore[i].tmX,Ext.goldBoListStore[i].tmY);
																}	
															}
														}
															
														
													}
												}
											}, {
												xtype : 'container',
												width : 10
											}, {
												xtype : 'button',
												id : 'btnDrone5',
												cls : 'khLee-x-button-move'
											} ]
								
								}]
					} ]

				});