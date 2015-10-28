Ext.define('KRF_DEV.view.east.FavoriteWindow', {
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
        		this.gridStore.loadData(this.favoriteInfo);
        	}else{
        		localStorage['_waterFavoriteInfo_'] = JSON.stringify([]);
        		this.favoriteInfo = JSON.parse(localStorage['_waterFavoriteInfo_']);
        	}
        	require(["dojox/uuid/generateRandomUuid"], function() {});
        }
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
								var date = new Date()
								var yyyymmdd = date.yyyymmdd();
								var saveObj = {UID:dojo.dojox.uuid.generateRandomUuid(), NAME:val, DATE:yyyymmdd, EXTENT:extent, LEVEL:level}
								self.favoriteInfo.push(saveObj);
								localStorage['_waterFavoriteInfo_'] = JSON.stringify(self.favoriteInfo);
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
									var extent = grid.selection.data.EXTENT;
									var sendExtent = new esri.geometry.Extent(extent.xmin, extent.ymin, extent.xmax, extent.ymax, new esri.SpatialReference(extent.spatialReference.wkid))
									var level = grid.selection.data.LEVEL;
									self.coreMap.extentMove(sendExtent, level);
								}
							},
					    }
				    ]
				}]
			}
		]
	}]
});