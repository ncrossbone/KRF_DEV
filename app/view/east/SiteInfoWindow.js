Ext.define('KRF_DEV.view.east.SiteInfoWindow', {
	extend : 'Ext.window.Window',
	
	xtype : 'east-siteinfoindow',
	
	id: 'siteInfoWindow',
	
	title: '지점 정보',
	
	layout: {
		type: 'fit'
	},
	
	//bodyStyle: 'background-color: white;',
	cls: 'khLee-window-panel-header khLee-x-window-default ',
	
	width: 400,
	height: 163,

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
				html: '10160508',
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
				html: '번천',
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
				html: '경안천하류',
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
				html: '경안천',
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
				html: '2',
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
				html: '2',
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
				html: '7761.7',
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
				html: '13113.4',
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
				html: '120889.1',
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
				html: '345966.0',
				//width: 85,
				flex: 1,
				cls: 'khLee-infowin-cont',
				//padding: '2 5 2 5' // 'top right bottom left'
			}]
		}]
	}]
});