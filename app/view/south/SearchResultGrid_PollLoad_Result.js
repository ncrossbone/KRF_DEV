Ext.define('KRF_DEV.view.south.SearchResultGrid_PollLoad_Result', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'searchResultPollLoad',
	
	id: 'searchResultPollLoad_container',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			cls: 'khLee-x-column-header-text',
			plugins: ['bufferedrenderer', 'gridfilters'],
			//plugins: ['gridfilters'], // bufferedrenderer 쓰면 그리드 스크롤링(gridCtl.getView().getRow(rowIdx).scrollIntoView();)이 잘 안먹음, rowindex가 높을때..(한강, 한강서울 검색확인) -- 임시
			siteIds: "",
			parentIds: [],
			header: {
				height: 5
			},
			title: '검색결과',
			siteId: '',
			beforeRender: function(){
				
				var me = this;
				var parentCtl = this.findParentByType("window");
				
				me.setWidth(parentCtl.getWidth() - 10);
				me.setHeight(parentCtl.getHeight() - 110);
				
				parentCtl.on("resize", function(){
					////console.info(parentCtl);
					me.setWidth(parentCtl.getWidth() - 10);
					me.setHeight(parentCtl.getHeight() - 110);
				});
				
			},
			
			columns: [{	 
				text      : '대권역',
				dataIndex : 'WS_NM',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '중권역',
				dataIndex : 'AM_NM',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '표준유역',
				dataIndex : 'SW_NAME',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '집수구역',
				dataIndex : 'CAT_DID',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '법정동리',
				dataIndex : 'ADDR',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '점유율',
				dataIndex : 'PERCENTAGE',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '구분',
				dataIndex : 'GUBUN',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{
				text : '발생 (kg/일)',
				columns: [{
					text     : 'BOD',
					dataIndex: 'GNR_BOD_SUM',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text     : 'TN',
					dataIndex: 'GNR_TN_SUM',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text     : 'TP',
					dataIndex: 'GNR_TP_SUM',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}]
			
				
			},{
				text : '배출 (kg/일)',
				columns: [{
					text     : 'BOD',
					dataIndex: 'OUT_BOD_SUM',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text     : 'TN',
					dataIndex: 'OUT_TN_SUM',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text     : 'TP',
					dataIndex: 'OUT_TP_SUM',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}]
			}],
			
			//소계 css 적용
			viewConfig: {
				 getRowClass: function(record, rowIndex, rowParams, store) {
					 //bold 13px/15px helvetica,arial,verdana,sans-serif
					 if(record.data.GUBUN == "소계"){
						 if(record.data.CAT_DID == "총계"){
							 return 'pdj_total_subTotal';
						 }else if(record.data.SW_NAME == "총계"){
							 return 'pdj_total_subTotal';
						 }else{
							 return 'pdj_subTotal';
						 }
						 //console.info(record);
						 
					 }
					 
					 if(record.data.CAT_DID == "총계"){
						 //console.info(record);
						 return 'pdj_total';
					 }
					 
					 if(record.data.SW_NAME == "총계"){
						 return 'pdj_total';
					 }
					 
					 //pdj_total_subTotal
					 
				}
			}
		}]
	}]
});