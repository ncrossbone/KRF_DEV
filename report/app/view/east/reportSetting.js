Ext.define('Report.view.east.reportSetting', {
	
	extend: 'Ext.panel.Panel',
	
	//requires:['KRF_DEV.store.east.ReportListWindow'],
	
	xtype : 'rpt-east-reportSetting',
		
	id: 'reportSetting',
	
	//controller: 'pollListWindowController',
	
	title: '리포트 세팅',
	
	layout: {
		type: 'vbox'
	},
	width: 1172,
	height: 650,

	items: [{
    	xtype: 'container',
    	y: 10,
    	x: 10,
    	layout: {
    		type: 'hbox',
    		align: 'left',
    		pack: 'middle'
    	},
    	items: [{
    		xytpe:'container',
    		layout:{
    			type:'vbox'
    		},
    		items:[{
    			xtype: 'label',
				text : '기   간'
    		},{
    			xtype: 'container',
				layout :{
					type: 'hbox'
				},
				items:[{
					xtype:'combo',
					value: '2015'
				},{
					xtype:'label',
					text: '년 ' 
				},{
					xtype:'combo',
					value: '08'
				},{
					xtype:'label',
					text: '월 ' 
				},{
					xtype:'container',
					width: 10
				},{
					xtype:'label',
					text: '~'
				},{
					xtype:'container',
					width: 10
				},{
					xtype:'combo',
					value: '2015'
				},{
					xtype:'label',
					text: '년 ' 
				},{
					xtype:'combo',
					value: '10'
				},{
					xtype:'label',
					text: '월 ' 
				}]
    		},{
    			xtype: 'container',
    			layout: 'hbox',
    			items:[{
    				xtype: 'label',
    				text: '항목'
    			},{
    				xtype: 'label',
    				text: ':'
    			},{
    				xtype: 'checkbox',
    				boxLabel: 'BOD'
    			},{
    				xtype: 'checkbox',
    				boxLabel: 'TP'
    			}]
    		},{

    			xtype: 'container',
    			layout: 'hbox',
    			items:[{
    				xtype: 'label',
    				text: '지점속성'
    			},{
    				xtype: 'label',
    				text: ':'
    			},{
    				xtype: 'checkbox',
    				boxLabel: '주요지점'
    			},{
    				xtype: 'checkbox',
    				boxLabel: '대표지점'
    			},{
    				xtype: 'checkbox',
    				boxLabel: '수질지점'
    			},{
    				xtype: 'checkbox',
    				boxLabel: '총량지점'
    			}]
    		
    		},{

    			xtype: 'container',
    			layout: 'hbox',
    			items:[{
    				xtype: 'label',
    				text: '지점'
    			},{
    				xtype: 'label',
    				text: ':'
    			},{

    				xtype: 'treepanel',
    				//id: 'siteListTree',
    				rootVisible:false,
    			    
    				//store: Ext.create('KRF_DEV.store.east.SiteListWindow')
    				//store: Ext.create('KRF_DEV.store.east.ReportListWindow'),
    				columns: [{
    		            xtype: 'treecolumn', //this is so we know which column will show the tree
    		            width: 380,
    		            sortable: true,
    		            dataIndex: 'text',
    		            checked: true,
    		            locked: true
    		        }]
    			
    			}]
    		
    		}]
    	}]
    }]
});