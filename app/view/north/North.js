Ext.define('KRF_DEV.view.north.North', {
	
	xtype: 'app-default-north',
	
	extend: 'Ext.panel.Panel',
	//extend: 'Ext.toolbar.Toolbar',
	
	requires: [
	    'KRF_DEV.view.north.NorthController'
   ],
	
	controller: 'north',
	
	//padding: 10,
	
	height: 64,
	
	//padding: 0,
	
	cls: 'khLee-box-inner',
	//style: 'background-image:url(./resources/images/button/top_bg.png) !important;',
	
	layout: {
		type: 'hbox',
		align: 'middle',
		pack: 'left'
	},
	
	items: [{
    	xtype: 'container',
    	width: 10
    }, {
		xtype: 'image',
		id: 'top-logo-khLee',
		width: 273,
		height: 37,
		//cls: 'khLee-x-box-item',
		src: './resources/images/button/top_logo.png'
	}, {
		xtype: 'container',
		flex: 1
	}, {
		xtype: 'button',
    	text: 'Report',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				
    				/*var boardCtl = Ext.getCmp("clipButton");
    				
    				
    				
    				console.info(boardCtl);
    				if (boardCtl == undefined){
    					clipButton = Ext.create('KRF_DEV.view.map.ClipButton');
    					var clipChart = Ext.getCmp("clipChart");
    					console.info(clipChart);
    				}
    				boardCtl.show();*/
    				//document.URL.substring(document.domain.length + 12, document.URL.lastIndexOf("/") + 1);
    				var paramCode = "'" + "1001A15" + "','" + "1001A60" + "','" + "1001A85" + "','" + "1016A10" + "'";
    				var startYear = "2008";
    				var endYear = "2010";
    				
    				window.open("./ClipReport4/test.jsp?paramCode=" + paramCode + "&startYear=" + startYear + "&endYear=" + endYear,"","width=1000,height=1000,status=no,toolbar=no,scrollbars=no");

    			}
    		}
    	},
    	src: './resources/images/button/top_btn5_off.png'
	},{
    	xtype: 'container',
    	width: 5
    }, {
    	xtype: 'button',
		text: '리포트 테스트',
		listeners: {
			el: {
				click: function(){
					
					var coreMap = GetCoreMap();
					var center = coreMap.map.extent.getCenter();
					var level = coreMap.map.getLevel();
					var width = coreMap.getWidth();
					var height = coreMap.getHeight();
					//console.info(width);
					//console.info(height);
					//console.info(coreMap.map.extent.getCenter());
					//console.info(coreMap.map.getLevel());
					
					var url = "./report/rptExtView.html?l=" + level + "&x=" + center.x + "&y=" + center.y +
					"&w=" + width + "&h=" + height;
					window.open(url, "리포트 설정", "width=1400,height=900,menubar=no,status=no,toolbar=no,location=no,resizable=no,fullscreen=no,scrollbars=no");
					
					/*width : 팝업창 가로길이
					height : 팝업창 세로길이
					toolbar=no : 단축도구창(툴바) 표시안함
					menubar=no : 메뉴창(메뉴바) 표시안함
					location=no : 주소창 표시안함
					scrollbars=no : 스크롤바 표시안함
					status=no : 아래 상태바창 표시안함
					resizable=no : 창변형 하지않음
					fullscreen=no : 전체화면 하지않음
					channelmode=yes : F11 키 기능이랑 같음
					left=0 : 왼쪽에 창을 고정(ex. left=30 이런식으로 조절)
					top=0 : 위쪽에 창을 고정(ex. top=100 이런식으로 조절)*/
				}
			}
		}
	}, {
		xtype: 'image',
		//id: 'btnReachLayer',
		layerId: 'baseMap',
		groupId: 'grpBase',
    	title: '배경맵',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickBaseLayer' } },
    	btnOnOff: 'on',
    	btnOnImg: './resources/images/button/btn_top_05_on.png',
    	btnOffImg: './resources/images/button/btn_top_05_off.png',
    	src: './resources/images/button/btn_top_05_on.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnReachLayer',
		layerId: '46',
		groupId: 'grpReach',
    	title: '리치라인',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickReachLayer' } },
    	btnOnOff: 'on',
    	btnOnImg: './resources/images/button/btn_top_01_on.png',
    	btnOffImg: './resources/images/button/btn_top_01_off.png',
    	src: './resources/images/button/btn_top_01_on.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnAreaLayer',
		groupId: 'grpArea',
    	title: '집수구역',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickAreaLayer' } },
    	btnOnOff: 'on',
    	btnOnImg: './resources/images/button/btn_top_02_on.png',
    	btnOffImg: './resources/images/button/btn_top_02_off.png',
    	src: './resources/images/button/btn_top_02_on.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnFlowLayer',
		groupId: 'grpFlow',
    	title: '리치흐름',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickFlowLayer' } },
    	btnOnOff: 'off',
    	btnOnImg: './resources/images/button/btn_top_04_on.png',
    	btnOffImg: './resources/images/button/btn_top_04_off.png',
    	src: './resources/images/button/btn_top_04_off.png'
    }, {
    	xtype: 'container',
    	width: 5
    }, { 
		xtype: 'image',
		id: 'btnLayerReset',
		groupId: 'grpReset',
    	title: '초기화',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickReset' } },
    	btnOnOff: 'off',
    	btnOnImg: './resources/images/button/btn_top_03_on.png',
    	btnOffImg: './resources/images/button/btn_top_03_off.png',
    	src: './resources/images/button/btn_top_03_off.png'
    }, {
    	xtype: 'container',
    	width: 50
    }, {
		xtype: 'image',
    	title: '공지사항',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				
    				var boardCtl = Ext.getCmp("boardNotice");
    				if(boardCtl == undefined){
	    				boardCtl = Ext.create("Ext.window.Window", {
				    					id: "boardNotice",
				    					title: "공지사항",
				    					width: 660,
				    					height: 600,
				    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./resources/jsp/board/GetBoard.jsp?boardType=2"></iframe>'
				    				});
    				}
    				
    				boardCtl.show();
    				
    			}
    		}
    	},
    	src: './resources/images/button/top_btn4_off.png'			
	},/*{
		//----확인 후 제거-----
	xtype: 'image',
	title: '공지사항',
	width: 69,
	height: 37,
	listeners: {
		el: {
			click: function(){
				
				var boardCtl = Ext.getCmp("boardCLIP");
				if(boardCtl == undefined){
    				boardCtl = Ext.create("Ext.window.Window", {
			    					id: "boardCLIP",
			    					title: "공지사항",
			    					width: 660,
			    					height: 600,
			    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./ClipReport4/test.jsp?boardType=2"></iframe>'
			    				});
				}
				
				boardCtl.show();
				
			}
		}
	},
	src: './resources/images/button/top_btn4_off.png'			
}, */{
		xtype: 'image',
    	title: 'Q&A',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				
    				var boardCtl = Ext.getCmp("boardQNA");
    				if(boardCtl == undefined){
	    				boardCtl = Ext.create("Ext.window.Window", {
				    					id: "boardQNA",
				    					title: "Q&A",
				    					width: 660,
				    					height: 600,
				    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./resources/jsp/board/GetBoard.jsp?boardType=1"></iframe>'
				    				});
    				}
    				
    				boardCtl.show();
    				
    			}
    		}
    	},
    	src: './resources/images/button/top_btn5_off.png'			
	},/*, {
		xtype: 'image',
    	title: '인쇄',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				GetCoreMap().print();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn1_off.png'			
	}*/, {
		xtype: 'image',
    	title: '저장',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				GetCoreMap().capture();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn2_off.png'
	}/*, {
		xtype: 'image',
    	title: '로그아웃',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				Ext.Ajax.request({
						//session out-hyeok
						url : "./resources/jsp/SessionOut.jsp",
						async:true,						
						method : "GET",
						success : function(result, request) {
							window.location = './index.html';
						},
						failure : function(result, request) {
							Ext.Msg.alert("Failed", "Connection Failed");
						}

					});
    				
    				
    				
    			}
    		}
    	},
    	src: './resources/images/button/top_btn3_off.png'
	}*/, {
		xtype: 'image',
    	title: '매뉴얼',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				/*
    				Ext.create("Ext.window.Window", {
    					title: 'test',
    					width: 300,
    					height: 300,
    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0"  src="./resources/menual/KRF_Menual.html"></iframe>'
    				}).show();
    				*/
    				OpenMenualPop();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn6_off.png'
	}, {
		xtype: 'container',
		width: 50
	}]
  
});