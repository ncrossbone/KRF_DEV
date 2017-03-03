Ext.define('KRF_DEV.store.south.SearchResultGrid_B001', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    
    fields: [
        'RIVER_ID',
        'SITE_NAME',
        'MSR_DATE',
        'F02',
		'F03',
		'F04',
		'F05',
		'F06',
		'F07',
		'F08',
		'F09',
		'F10',
		'F11',
		'F12',
		'F13',
		'F14',
		'F15',
		'F16',
		'F17',
		'F18',
		'F19',
		'F20',
		'F21',
		'F22',
		'F23',
		'F24',
		'F25',
		'F26',
		'F27',
		'F28',
		'F29',
		'F30',
		'F31',
		'F32',
		'F33',
		'F34',
		'F35',
		'F36',
		'F37',
		'F38',
		'F39',
		'F40',
		'F41',
		'F42',
		'F43',
		'F44',
		'F45',
		'F46',
		'F47',
		'F48',
		'F49',
		'F50',
		'F51',
		'F52',
		'F53',
		'F54',
		'F55',
		'F56',
		'F57',
		'F58',
		'F59',
		'F60',
		'F61',
		'F62',
		'F63',
		'F64',
		'F65',
		'F66',
		'F67',
		'F68',
		'F69',
		'F70',
		'F71',
		'F72',
		'F73',
		'F74',
		'F75',
		'F76',
		'F77',
		'F78',
		'F79',
		'F80',
		'F81',
		'F82',
		'F83',
		'F84',
		'F85',
		'F86',
		'F87',
		'F88',
		'F89',
		'F90',
		'F91',
		'F92',
		'F93',
		'F94',
		'F95',
		'F96',
		'F97',
		'F98',
		'F99',
		'F100',
		'F101',
		'F102',
		'F103',
		'F104',
		'F105',
		'F106',
		'F107',
		'F108',
		'F109'],
    
    siteId: '',
    
    autoLoad: true,
    
    buffered: true,
    pageSize: 100,

	remoteSort: true,
	
	siteIds: "",
	parentIds: [],
	
	listeners: {
		load: function(store) {
			
			var firstSearch =  KRF_DEV.getApplication().btnFlag;
			
			var startYear = startMonth = endYear = endMonth = "";
			
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			
			
			var jsonData = "";
			var arrData = [];
			
			// 로딩바 표시
			var winCtl = Ext.getCmp("searchResultWindow");
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();
			Ext.getCmp("searchResultContainer_B001_Id").removeCls("dj-mask-noneimg");
			Ext.getCmp("searchResultContainer_B001_Id").addCls("dj-mask-withimg");
			Ext.getCmp("searchResultContainer_B001_Id").mask("loading", "loading...");
			
			var con = Ext.getCmp("select_B001").value;
			var url ="";
			
			if(con=="01"){
				url = './resources/jsp/GetSearchResultData_B001.jsp';
			}else{
				url = './resources/jsp/GetSearchResultData_B001_fix.jsp';
			}
			
			Ext.Ajax.request({
        		url: url,
        		/*params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},*/
				params:{startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth, siteIds: store.siteIds},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			
        			jsonData = Ext.util.JSON.decode( response.responseText );
					if(jsonData.data.length == 0){
						Ext.getCmp("searchResultContainer_B001_Id").addCls("dj-mask-noneimg");
						Ext.getCmp("searchResultContainer_B001_Id").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
					}else{
						if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
									store.setData(jsonData.data);
									// 로딩바 숨김
									Ext.getCmp("searchResultContainer_B001_Id").unmask();
								}else{
									Ext.getCmp("searchResultContainer_B001_Id").addCls("dj-mask-noneimg");
									Ext.getCmp("searchResultContainer_B001_Id").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
								}
					}
        			
        			
        		},
        		failure: function(form, action) {
        			// 로딩바 숨김
        			activeTab.unmask();
        			
        			alert("오류가 발생하였습니다.");
        		}
        	});
			
		}
    }
});