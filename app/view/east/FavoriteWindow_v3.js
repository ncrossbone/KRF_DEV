Ext.define('KRF_DEV.view.east.FavoriteWindow_v3', {
	extend : 'Ext.window.Window',
	
	xtype : 'east-favoritewindow',
	
	id: 'Favorite',
	
	title: '즐겨찾기',
	
	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	//bodyStyle: 'border: 0px;',
	
	layout: {
		type: 'fit'
	},
	
	coreMap:null,
	gridStore:null,
	favoriteInfo:null,
	
	width: 400,
	height: 305,
	x: 390,
	y: Ext.getBody().getViewSize().height - 305,
	
	listeners:{
        close:function(){
            var currCtl = Ext.getCmp("btnFavorites");
            if(currCtl.btnOnOff == "on"){
            	SetBtnOnOff(currCtl.id);
            }
        },
        afterrender: function(){
        	
        	//self.favoriteInfo = [];
        	//localStorage['_waterFavoriteInfo_'] = [];
        	
        	Date.prototype.yyyymmdd = function() {
    		   var yyyy = this.getFullYear().toString();
    		   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    		   var dd  = this.getDate().toString();
    		   return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
    		};
        	this.coreMap = GetCoreMap();
        	this.gridStore = this.down('gridpanel').getStore();
        	
        	if(localStorage['_waterFavoriteInfo_']){
        		this.favoriteInfo = JSON.parse(localStorage['_waterFavoriteInfo_']);
        		
        		for(var i=0; i<this.favoriteInfo.length; i++){
        			var obj = this.favoriteInfo[i];
        			delete obj.id;
        		}
        		//console.info(this.favoriteInfo);
        		this.gridStore.loadData(this.favoriteInfo);
        	}else{
        		localStorage['_waterFavoriteInfo_'] = JSON.stringify([]);
        		//localStorage['_waterFavoriteInfo_'] = [];
        		this.favoriteInfo = JSON.parse(localStorage['_waterFavoriteInfo_']);
        		//this.favoriteInfo = localStorage['_waterFavoriteInfo_'];
        	}
        	require(["dojox/uuid/generateRandomUuid"], function() {});
        }
    },
    
    cloneGraphicArr:function(arr){
    	var cArr = [];
    	for(var i=0; i<arr.length; i++){
    		cArr.push(JSON.stringify(arr[i]));
    		//console.info(arr[i]);
    		//cArr.push(arr[i]);
    		//console.info(cArr);
    	}
    	return cArr;
    },
    
	items: [{
		xtype: 'form',
		cls: 'khLee-x-form',
		height:100,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [
			{
				xtype: 'container',
				layout: {
					type: 'hbox',
				},
				height:20
			},
			{
				xtype: 'container',
				layout: {
					type: 'hbox',
				},
				items: [{
					
					layerId: '54',
					xtype: 'textfield',
					fieldLabel: '&nbsp;<img src="./resources/images/button/blit_st_01.png" /> <b>저장명:</b> ',
					//labelWidth: 60,
					labelAlign: 'right',
					labelPad: 10,
					//width: 200,
					editable: true,
					
				}, {
					xtype: 'container',
					width: 10
				},{
					xtype: 'button',
			    	text: '저장',
			    	listeners: {
						click: function() {
							var self = this.up('window');
							var val = self.down('textfield').getValue();
							if(val && val!=''){
								var extent = self.coreMap.map.extent;
								var level = self.coreMap.map.getLevel();
								var date = new Date();
								
								var reachLineGArr = [];
								if(self.coreMap.reachLayerAdmin_v3.lineGrpLayer){
									var reachLineGraphicArr = self.coreMap.reachLayerAdmin_v3.lineGrpLayer.graphics;
									for(var i=0; i<reachLineGraphicArr.length; i++){
										console.info(reachLineGraphicArr[i].attributes.CAT_ID);
										console.info(reachLineGraphicArr[i].attributes.RCH_ID);
										reachLineGArr.push(JSON.stringify(reachLineGraphicArr[i].toJson()));
									}
								}
								var reachAreaGArr = [];
								if(self.coreMap.reachLayerAdmin_v3.areaGrpLayer){
									var reachAreaGraphicArr = self.coreMap.reachLayerAdmin_v3.areaGrpLayer.graphics;
									for(var i=0; i<reachAreaGraphicArr.length; i++){
										//console.info(reachAreaGraphicArr[i].attributes.CAT_ID);
										reachAreaGArr.push(JSON.stringify(reachAreaGraphicArr[i].toJson()));
									}
								}
								
								var pointGArr = [];
								if(self.coreMap.reachLayerAdmin_v3.pointGrpLayer){
									var pointGraphicArr = self.coreMap.reachLayerAdmin_v3.pointGrpLayer.graphics;
									for(var i=0; i<pointGraphicArr.length; i++){
										console.info(JSON.stringify(pointGraphicArr[i].toJson()));
										pointGArr.push(JSON.stringify(pointGraphicArr[i].toJson()));
									}
								}
								
								var yyyymmdd = date.yyyymmdd();
								
								var saveObj = {UID:dojo.dojox.uuid.generateRandomUuid(), NAME:val, DATE:yyyymmdd, EXTENT:extent.toJson(), LEVEL:level,
										reachLineGArr:reachLineGArr, reachAreaGArr:reachAreaGArr, pointGArr:pointGArr};
								
								//self.favoriteInfo = [];
								self.favoriteInfo.push(saveObj);
<<<<<<< HEAD
								//console.info(self.favoriteInfo);
=======
>>>>>>> 8621acbdd895049978670866b27cb844c71caeb9
								//console.info(self.favoriteInfo);
								localStorage['_waterFavoriteInfo_'] = JSON.stringify(self.favoriteInfo);
								//localStorage['_waterFavoriteInfo_'] = self.favoriteInfo;
								//console.info(localStorage['_waterFavoriteInfo_']);
								Ext.Ajax.request({
									url : "./resources/jsp/FavoriteInfo.jsp",
									method : "POST",
									success : function(result, request) {
										console.info(result.responseText.trim());
										Ext.Msg.alert("cc", "cc");
									},
									failure : function(result, request) {
										Ext.Msg.alert("Failed", "Connection Failed");
									},
									params:{UID:saveObj.UID.trim(),NAME:saveObj.NAME.trim(),DATE:saveObj.DATE.trim(),
										EXTENT:JSON.stringify(saveObj.EXTENT).trim(),LEVEL:saveObj.LEVEL.toString().trim()}
								});
								
								
								self.gridStore.loadData(self.favoriteInfo);
							}
						}
					},
				}]
			},
			{
				xtype: 'container',
				layout: {
					type: 'hbox',
				},
				height:20
			},
		
			{
				xtype: 'gridpanel',
				flex:1,
				autoScroll : true,
				store : Ext.create('Ext.data.Store',{
					fields : ['UID', 'NAME','DATE', 'EXTENT', 'LEVEL']
				}),
				columns: [
					{
						xtype: 'gridcolumn',
						dataIndex: 'NAME',
						text: '저장명',
						flex:1
					},
					{
						xtype: 'gridcolumn',
						dataIndex: 'DATE',
						text: '저장일'
					}
				],
				dockedItems: [{
				    xtype: 'toolbar',
				    dock: 'bottom',
				    items: [
					    {
					        xtype: 'tbfill'
					    }, {
					        xtype: 'button',
					        text: '삭제',
					        listeners: {
								click: function() {
									var self = this.up('window');
									var grid = self.down('gridpanel');
									var uid = grid.selection.data.UID;
									var gridData = [];
									for(var i=0; i<self.favoriteInfo.length; i++){
										if(self.favoriteInfo[i].UID!=uid){
											gridData.push(self.favoriteInfo[i])
										}
									}
									self.favoriteInfo = gridData;
									localStorage['_waterFavoriteInfo_'] = JSON.stringify(self.favoriteInfo);
									//localStorage['_waterFavoriteInfo_'] = self.favoriteInfo;
									self.gridStore.loadData(self.favoriteInfo);
								}
							}
					    }, {
					        xtype: 'button',
					        text: '불러오기',
					        listeners: {
								click: function() {
									var self = this.up('window');
									var grid = self.down('gridpanel');
//									var extentJson = grid.selection.data.EXTENT;
//									var extent = new esri.geometry.Extent(extentJson);
//									var level = grid.selection.data.LEVEL;
//									self.coreMap.extentMove(extent, level);
									self.coreMap.favoriteExe(grid.selection.data);
								}
							},
					    }
				    ]
				}]
			}
		]
	}]
});