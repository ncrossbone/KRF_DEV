/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.SearchConfig', {
    extend: 'Ext.window.Window',
    
    xtype: 'searchConfig',
    id: 'searchConfig',
    title: '검색설정',
    
    width: 310,
    height: 250,
    
    cls: 'khLee-window-panel-header khLee-x-window-default ',
    
    items: [{
    	xtype: 'container',
    	width: '100%',
    	height: '100%',
    	layout: {
    		type: 'vbox',
    		align: 'strech'
    	},
    	items: [{
    		xtype: 'container',
    		height: 10
    	}, {
    		xtype: 'panel',
    		title: {
    			text: '상하류선택',
    			style: 'color: #000;'
    		},
    		header: {
    			style: 'background: #ecf5fa; border-top: 1px solid #c0d6e4; border-bottom: 1px solid #c0d6e4; height: 30px; padding-top: 7px; padding-left: 12px; color: #000 !important; top: -3px;'
    		},
    		width: '100%',
    		height: '120',
    		items: [{
            	xtype: 'checkboxgroup',
            	id: 'chkGroup1',
            	width: '100%',
            	columns: 4,
            	allowBlank: false,
            	style: 'margin-bottom: 30px;',
            	items: [{
            		xtype: 'checkbox',
            		boxLabel: '상류',
            		checked: true,
            		inputValue: 'isUpDraw',
            		style: 'margin-right: 15px;'
            	}, {
            		xtype: 'checkbox',
            		boxLabel: '하류',
            		checked: false,
            		inputValue: 'isDownDraw',
            		style: 'margin-right: 15px;'
            	}, {
            		xtype: 'checkbox',
            		boxLabel: '본류',
            		checked: false,
            		inputValue: 'isBonDraw',
            		style: 'margin-right: 15px;'
            	}, {
            		xtype: 'checkbox',
            		boxLabel: '지류',
            		checked: false,
            		inputValue: 'isJiDraw',
            		style: 'margin-right: 15px;'
            	}]
            }]
    	}, {
    		xtype: 'panel',
    		title: {
    			text: '경계기준선택',
    			style: 'color: #000;'
    		},
    		header: {
    			style: 'background: #ecf5fa; border-top: 1px solid #c0d6e4; border-bottom: 1px solid #c0d6e4; height: 30px; padding-top: 7px; padding-left: 12px; color: #000 !important; top: -3px;'
    		},
    		width: '100%',
    		height: '120',
    		items: [{
            	xtype: 'checkboxgroup',
            	id: 'chkGroup2',
            	columns: 2,
            	allowBlank: false,
            	style: 'margin-bottom: 30px;',
            	items: [{
            		xtype: 'checkbox',
            		boxLabel: '해당중권역만',
            		checked: true,
            		inputValue: 'isAMDraw',
            		style: 'margin-right: 15px;'
            	}, {
            		xtype: 'checkbox',
            		boxLabel: '댐이있는경우',
            		checked: false,
            		inputValue: 'isDemDraw',
            		style: 'margin-right: 15px;'
            	}]
            }]
    	}, {
    		xtype: 'container',
    		width: '100%',
    		height: 100,
    		//style: 'align: center;',
    		//align: 'middle',
    		layout: {
    			type: 'vbox',
    			align: 'middle'
    		},
    		items: [{
        		xtype: 'image',
        		//text: '적용',
        		width: 56,
        		height: 25,
        		src: './resources/images/button/btn_app.gif',
        		listeners: {
        			el: {
        				click: function(){
        					
        					var me = GetCoreMap();
        					me.reachLayerAdmin.startLineReDraw();
        					
        					/*
        					Ext.Ajax.request({
        		        		url: './resources/jsp/SetSearchConfig.jsp',
        		        		params: { chkGroup1Value: chkGroup1Value, chkGroup2Value: chkGroup2Value},
        		        		async: true, // 비동기 = async: true, 동기 = async: false
        		        		success : function(response, opts) {
        		        			
        		        			console.info(response.responseText);
        		        			
        		        		},
        		        		failure: function(form, action) {
        		        			alert(form.responseText);
        		        			alert("오류가 발생하였습니다.");
        		        		}
        		        	});
        		        	*/
        					
        				}
        			}
        		}
        	}]
    	}]
    }]
});