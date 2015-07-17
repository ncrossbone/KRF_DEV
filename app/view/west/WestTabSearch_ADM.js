/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('KRF_DEV.view.west.WestTabSearch_ADM', {
	
	extend: 'Ext.panel.Panel',
	/*
	requires: [
		'Sgis.view.west.WestTab2Controller'
	],
	*/
	xtype: 'app-westTabSearch_ADM',

	controller: 'westTabSearch_ADMController',
	
	title: '행정구역 검색',
	
	autoScroll: true,
	
	//bodyPadding: 10,
	border: 0,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	items: [{
		xtype: 'form',
		padding: '10 0 10 0', // 'top right bottom left'
		border: 0,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'container',
			layout: {
				type: 'hbox',
			},
			items: [{
				id: 'cmbArea1',
				layerId: '53',
				xtype: 'combo',
				tarCmbId: 'cmbArea2',
				lnkBtnId: 'btnSearch1',
				fieldLabel: '시도 ',
				labelWidth: 50,
				labelAlign: 'right',
				labelPad: 10,
				width: 180,
				//labelSeparator: '', // Defaults to: ':'
				store: Ext.create('KRF_DEV.store.west.WestTabSearch_ADM'),
				displayField: 'name',
				valueField: 'id'
			},{
				id: 'btnSearch1',
				xtype: 'button',
				lnkCmbId: 'cmbArea1',
				width: 40,
				text: '검색'
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
			},
			items: [{
				id: 'cmbArea2',
				layerId: '54',
				xtype: 'combo',
				tarCmbId: 'cmbArea3',
				lnkBtnId: 'btnSearch2',
				fieldLabel: '시군구 ',
				labelWidth: 50,
				labelAlign: 'right',
				labelPad: 10,
				width: 180,
				//labelSeparator: '', // Defaults to: ':'
				store: Ext.create('KRF_DEV.store.west.WestTabSearch_ADM'),
				displayField: 'name',
				valueField: 'id',
				disabled: true
			},{
				id: 'btnSearch2',
				xtype: 'button',
				lnkCmbId: 'cmbArea2',
				width: 40,
				text: '검색',
				disabled: true
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
			},
			items: [{
				id: 'cmbArea3',
				layerId: '55',
				xtype: 'combo',
				tarCmbId: '',
				lnkBtnId: 'btnSearch3',
				fieldLabel: '읍면동 ',
				labelWidth: 50,
				labelAlign: 'right',
				labelPad: 10,
				width: 180,
				//labelSeparator: '', // Defaults to: ':'
				store: Ext.create('KRF_DEV.store.west.WestTabSearch_ADM'),
				displayField: 'name',
				valueField: 'id',
				disabled: true
			},{
				id: 'btnSearch3',
				xtype: 'button',
				lnkCmbId: 'cmbArea3',
				width: 40,
				text: '검색',
				disabled: true
			}]
		}]
	}]

});