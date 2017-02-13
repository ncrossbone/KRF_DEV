Ext.define('KRF_DEV.view.center.RptInitWindow', {
	
	extend: 'Ext.window.Window',
	
	id:"rptinitwindow",
	width:560,
	height:300,
	title:"리포트 유형 선택",
	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	bodyStyle:"background:url('./resources/images/rpt/report_bg.gif')",
	style:"border:solid 10px #E6E6E6;",
	closable: false,
	header:{
		items:[{
			xtype:'image',
			src:'./resources/images/button/btn_close.png',
			style:'padding-right :13px; cursor:pointer;',
			listeners:{
				el:{
					click:function(){
						Ext.getCmp("rptinitwindow").close();
					}
				}
			}
		}]
	}, 
	items:[{
			xtype:"button",
			id:"rptBtn",
			style:"margin-left:120px; background : #333d46; border: 1px solid#000; position:absolute;  top: 240px; z-index:20000;",
			text:"리포트 보기",
			handler:function(){
				
				//리포트 보기
				var easySelect = Ext.ComponentQuery.query("#easySelect")[0];
				var detailSelect = Ext.ComponentQuery.query("#detailSelect")[0];
				
				var coreMap = GetCoreMap();
					var center = coreMap.map.extent.getCenter();
					var level = coreMap.map.getLevel();
					var width = coreMap.getWidth();
					var height = coreMap.getHeight();
				
				if(easySelect.lastValue.rb==undefined){
					
					
				
					var url = "./report/rptExtView.html?print=N&l=" + level + "&x=" + center.x + "&y=" + center.y + "&w=" + width + "&h=" + height;
					window.open(url, "리포트 설정", "width=1350,height=900,menubar=no,status=no,toolbar=no,location=no,resizable=no,fullscreen=no,scrollbars=no");
				
				}
				
				if(detailSelect.lastValue.rb==undefined){
					
						
					var url = "./report/rptExtView.html?print=Y&l=" + level + "&x=" + center.x + "&y=" + center.y + "&w=" + width + "&h=" + height;
					
					//console.info(document.getElementById("rptHidden"));
					var rptHidden = document.getElementById("rptHidden");
					rptHidden.src = url;
					
					//var myWindow = window.open(url,"리포트 설정", 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=10, height=10, visible=none', '');
						
						
						
						//setTimeout(function(){ myWindow.close(); }, 6000);
				}
			}
		},{
		xtype:"panel",
		bodyStyle:"background:transparent;",
		layout:{
				type:"hbox"
		},
		items:[{
		xtype:"panel",
		border:false,
		bodyStyle:"background:transparent; margin-left:15px; margin-top:10px;",
		height:300,
		layout:{
				type:"vbox"
		},
		items:[{
			xtype:"image",
			src:"./resources/images/rpt/report_1.png",
			width:142,
			height:204
		},{
			xtype:"radiogroup",
			itemId:"easySelect",
			width:150,
			style:"margin-left:30px",
			items: [
			{boxLabel: '간편선택', name: 'rb', inputValue: '1', checked: true}]
		}]
	},{
		xtype:"panel",
		border:false,
		height:240,
		bodyStyle:"background:transparent; margin-top:10px;",
		layout:{
				type:"vbox"
		},
		items:[{
			xtype:"image",
			src:"./resources/images/rpt/report_2.png",
			width:142,
			height:204
		},{
			xtype:"radiogroup",
			itemId:"detailSelect",
			width:150,
			style:"margin-left:30px;",
			align:'center',
			items: [
			{boxLabel: '상세선택', name: 'rb', inputValue: '2'}]
		}]
	},{
		xtype:"image",
		style:"margin-left:-15px; margin-top:15px;",
		src:"./resources/images/rpt/report_3.png",
		width:192,
		height:249
	}]
	}]
	});