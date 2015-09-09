Ext.define('KRF_DEV.view.east.ReachInfoWindow', {
	extend : 'Ext.window.Window',
	
	xtype : 'east-reachInfoWindow',
	
	id: 'reachInfoWindow',
	
	title: '리치정보',
	
	layout: {
		type: 'fit'
	},
	
	//bodyStyle: 'background-color: white;',
	cls: 'khLee-window-panel-header khLee-x-window-default ',
	
	width: 400,
	height: 160,

	items: [{
		xtype: 'form',
		//padding: '10 10 10 10', // 'top right bottom left'
		//border: 0,
		y: 7,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'container',
				html: '리치코드',
				style: 'background-color: #256ecb; color: white;',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-title',
				//padding: '2 5 2 5' // 'top right bottom left'
			},{
				xtype: 'container',
				id: 'RCH_ID',
				//html: '10160508',
				html: ' ',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
			}, {
				xtype: 'container',
				html: '하천명',
				style: 'background-color: #256ecb; color: white;',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-title',
				//padding: '2 5 2 5' // 'top right bottom left'
			},{
				xtype: 'container',
				id: 'RIV_NM',
				//html: '번천',
				html: '',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
				//padding: '2 5 2 5' // 'top right bottom left'
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'container',
				html: '표준유역명',
				style: 'background-color: #256ecb; color: white;',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-title',
				//padding: '2 5 2 5' // 'top right bottom left'
			},{
				xtype: 'container',
				id: 'SB_NM',
				//html: '경안천하류',
				html: '',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
			}, {
				xtype: 'container',
				html: '연결하천명',
				style: 'background-color: #256ecb; color: white;',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-title',
				//padding: '2 5 2 5' // 'top right bottom left'
			},{
				xtype: 'container',
				id: 'LO_RIV_NM',
				//html: '경안천',
				html: '',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'container',
				html: '순차번호',
				style: 'background-color: #256ecb; color: white;',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-title',
				//padding: '2 5 2 5' // 'top right bottom left'
			},{
				xtype: 'container',
				id: 'SN',
				//html: '2',
				html: '',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
			}, {
				xtype: 'container',
				html: '하천차수',
				style: 'background-color: #256ecb; color: white;',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-title',
				//padding: '2 5 2 5' // 'top right bottom left'
			},{
				xtype: 'container',
				id: 'GEO_TRIB',
				//html: '2',
				html: '',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'container',
				html: '리치길이(m)',
				style: 'background-color: #256ecb; color: white;',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-title',
				//padding: '2 5 2 5' // 'top right bottom left'
			},{
				xtype: 'container',
				id: 'RCH_LEN',
				//html: '7761.7',
				html: '',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
			}, {
				xtype: 'container',
				html: '누적거리(m)',
				style: 'background-color: #256ecb; color: white;',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-title',
				//padding: '2 5 2 5' // 'top right bottom left'
			},{
				xtype: 'container',
				id: 'CUM_LEN',
				//html: '13113.4',
				html: '',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'container',
				html: '집수면적(㎡)', // 위첨자 <sup>, 아래첨자 <sub>
				style: 'background-color: #256ecb; color: white;',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-title',
				//padding: '2 5 2 5' // 'top right bottom left'
			},{
				xtype: 'container',
				id: 'CAT_AREA',
				//html: '120889.1',
				html: '',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
			}, {
				xtype: 'container',
				html: '상류면적(㎡)',
				style: 'background-color: #256ecb; color: white;',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-title',
				//padding: '2 5 2 5' // 'top right bottom left'
			},{
				xtype: 'container',
				//html: '345966.0',
				html: '',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
			}]
		}]
	}]
});