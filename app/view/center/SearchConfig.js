/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('KRF_DEV.view.center.SearchConfig', {
    extend: 'Ext.window.Window',
    
    xtype: 'searchConfig',
    id: 'searchConfig',
    title: '검색설정',
    
    width: 310,
    height: 300,
    
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
    		title: '상하류선택',
    		width: '100%',
    		height: '120',
    		items: [{
            	xtype: 'checkboxgroup',
            	id: 'chkGroup1',
            	width: '100%',
            	columns: 4,
            	allowBlank: false,
            	items: [{
            		xtype: 'checkbox',
            		boxLabel: '상류',
            		checked: true,
            		inputValue: 'isUpDraw'
            	}, {
            		xtype: 'checkbox',
            		boxLabel: '하류',
            		checked: false,
            		inputValue: 'isDownDraw'
            	}, {
            		xtype: 'checkbox',
            		boxLabel: '본류',
            		checked: false,
            		inputValue: 'isBonDraw'
            	}, {
            		xtype: 'checkbox',
            		boxLabel: '지류',
            		checked: false,
            		inputValue: 'isJiDraw'
            	}]
            }]
    	}, {
    		xtype: 'panel',
    		title: '영향권역경계기준',
    		width: '100%',
    		height: '120',
    		items: [{
            	xtype: 'checkboxgroup',
            	id: 'chkGroup2',
            	columns: 2,
            	allowBlank: false,
            	items: [{
            		xtype: 'checkbox',
            		boxLabel: '해당중권역만',
            		checked: true,
            		inputValue: 'isAMDraw'
            	}, {
            		xtype: 'checkbox',
            		boxLabel: '댐이있는경우',
            		checked: false,
            		inputValue: 'isDemDraw'
            	}]
            }]
    	}, {
    		xtype: 'button',
    		text: '적용',
    		width: 70,
    		listeners: {
    			//el: {
    				click: function(){
    					
    					// 리치 선택 종료
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
    			//}
    		}
    	}]
    }]
});