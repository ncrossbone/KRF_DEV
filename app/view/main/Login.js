Ext.define("KRF_DEV.view.main.Login", {
	extend : 'Ext.panel.Panel',
	alias : 'widget.login',
	requires : [ 'Ext.form.Panel' ],
	xtype : 'app-login',

	title : 'Login',
	closable : false,
	modal : true,

	/*
	 * header: false, border: 0,
	 * 
	 * bodyStyle: 'background:url("./resources/images/button/LoginBg.jpg")
	 * no-repeat;', width: 650, height: 328,
	 */

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype : 'form',

			bodyPadding : 10,
			items : [ {
				xtype : 'textfield',
				id : 'username',
				name : 'username',
				fieldLabel : 'Username'
					// allowBlank: false,
					// 'inputAttrTpl': ['autocomplete="on"']
			}, {
				xtype : 'textfield',
				inputType : 'password',
				id : 'password',
				name : 'password',
				fieldLabel : 'Password'
					// allowBlank: false,
					// 'inputAttrTpl': ['autocomplete="on"']
			} ],

			buttons : [ {
				itemId : 'loginButton',
				id : 'btnLogin',
				type : 'button',
				text : 'Login',
				formBind : true,
				handler : function() {
					var id = Ext.getCmp('username').getValue();
					var pw = Ext.getCmp('password').getValue();
					var isIdCheck = "";
					var getPwd="";
					var encPw="";

//hyeok
					Ext.Ajax.request({

						url : "./resources/jsp/IsIdCheck.jsp?id=" + id,
						method : "GET",
						success : function(result, request) {

							isIdCheck = result.responseText;
							// 아이디 유무 여부 검사
							if (isIdCheck == 1) {
								//암호화 된 password 가져오기
								Ext.Ajax.request({

									url : "./resources/jsp/GetPassword.jsp?id="+id,
									method : "GET",
									success : function(result, request) {
										getPwd=result.responseText;
										Ext.Ajax.request({
											//입력한 password 암호화
											url : "./resources/jsp/SHA_256.jsp?pwd="+pw,
											method : "GET",
											success : function(result, request) {

												encPw=result.responseText;
												
												//dbpwd와 입력한pwd가 다를 때
												if(getPwd.trim()==encPw.trim()){
													Ext.Ajax.request({
														//session에 id저장 및 log기록
														url : "./resources/jsp/LogSession.jsp?id="+id,
														method : "GET",
														success : function(result, request) {
															window.location = './index.html';
														},
														failure : function(result, request) {
															Ext.Msg.alert("Failed", "Connection Failed");
														}

													});
												}else{
													Ext.Msg.alert("Failed", "비밀번호가 일치하지 않습니다.");
												}
											},
											failure : function(result, request) {
												Ext.Msg.alert("Failed", "Connection Failed");
											}

										});
										

									},
									failure : function(result, request) {
										Ext.Msg.alert("Failed", "Connection Failed");
									}

								});


							} else {

								Ext.Msg.alert("Failed", "등록되지 않은 아이디 입니다.");
							}

						},
						failure : function(result, request) {
							Ext.Msg.alert("Failed", "Connection Failed");
						}

					});
					// //console.info(Ext.MapserviceUrl);
					// //return;
					// var queryTask = new
					// esri.tasks.QueryTask(Ext.MapserviceUrl + "/" +
					// Ext.loginLayerId);
					// //var queryTask = new
					// esri.tasks.QueryTask(Ext.MapserviceUrl + "/15");
					// var query = new esri.tasks.Query();
					// query.returnGeometry = true;
					// query.outSpatialReference = {"wkid":102100};
					//
					// var id = Ext.getCmp('username').getValue();
					// var pw = Ext.getCmp('password').getValue();
					//					
					//					
					//					
					// //console.info(id + ", " + pw);
					// query.where = "ID = '" + id + "'";
					// query.outFields = ["*"];
					// queryTask.execute(query, function(results){
					// //console.info(results.features.length);

					//
					// Ext.each(results.features, function(obj, index) {
					// // console.info(obj.attributes.ID);
					// // console.info(obj.attributes.PW);
					// decPw = Ext.Decrypt(obj.attributes.PW); // 패스워드
					// 복호화
					// // alert(decPw);
					// if(pw != decPw){
					// // if(pw != obj.attributes.PW){
					// alert("password가 일치하지 않습니다.");
					// return;
					// }
					//
					// Ext.Ajax.request({
					// url: './resources/jsp/main.jsp', // To Which
					// // url you
					// // wanna
					// // POST.
					// // async: false,
					// success : function(response, opts) {
					// // alert(response.responseText);
					// if(response.responseText.trim() == 'success')
					// window.location = './main.html';
					// },
					// failure: function(form, action) {
					// alert(form.responseText);
					// alert("오류가 발생하였습니다.");
					// },
					// params: { id: id, pw: pw } // Put your json
					// // data here or just
					// // enter the JSON
					// // object you wannat
					// // post
					// });
					// });
					// });
					//
					// dojo.connect(queryTask, "onError", function(err)
					// {
					// console.info(err);
					// });
					//
					// }
				}
			}, {
				itemId : 'resetButton',
				text : 'Reset',
				handler : function(btn) {
					btn.up('form').getForm().reset();
				}
			} ]
		} ]

		me.callParent(arguments);
	}
});