Ext.define('KRF_DEV.store.south.SearchPollLoadResultGrid', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    /* {name: 'OUT_FLOW_SUM', type 'number'}*/
    fields: [
	'WS_NM', //대권역
	'AM_NM',	//중권역
	'SW_NAME',	//표준유역(소권역)
	'CAT_DID',	//집수구역
	'ADDR',	//법정동리
	{name: 'PERCENTAGE', type : 'number'}, //점유율
	'GUBUN',	//구분
	
	{name: 'GNR_FLOW_SUM', type : 'number'},
	{name:	'GNR_BOD_SUM',type:'number'},
	{name:	'GNR_TN_SUM',type:'number'},
	{name:	'GNR_TP_SUM',type:'number'},
	{name:	'IND_OUT_FLOW_SUM',type:'number'},
	{name:	'IND_OUT_BOD_SUM',type:'number'},
	{name:	'IND_OUT_TN_SUM',type:'number'},
	{name:	'IND_OUT_TP_SUM',type:'number'},
	{name:	'GNR_FLOW_ANI',type:'number'},
	{name:	'GNR_FLOW_IND',type:'number'},
	{name:	'GNR_FLOW_LAND',type:'number'},
	{name:	'GNR_FLOW_FISH',type:'number'},
	{name:	'GNR_FLOW_LANDFILL',type:'number'},
	{name:	'GNR_BOD_POP',type:'number'},
	{name:	'GNR_BOD_ANI',type:'number'},
	{name:	'GNR_BOD_IND',type:'number'},
	{name:	'GNR_BOD_LAND',type:'number'},
	{name:	'GNR_BOD_FISH',type:'number'},
	{name:	'GNR_BOD_LANDFILL',type:'number'},
	{name:	'GNR_TN_POP',type:'number'},
	{name:	'GNR_TN_ANI',type:'number'},
	{name:	'GNR_TN_IND',type:'number'},
	{name:	'GNR_TN_LAND',type:'number'},
	{name:	'GNR_TN_FISH',type:'number'},
	{name:	'GNR_TN_LANDFILL',type:'number'},
	{name:	'GNR_TP_POP',type:'number'},
	{name:	'GNR_TP_ANI',type:'number'},
	{name:	'GNR_TP_IND',type:'number'},
	{name:	'GNR_TP_LAND',type:'number'},
	{name:	'GNR_TP_FISH',type:'number'},
	{name:	'GNR_TP_LANDFILL',type:'number'},
	{name:	'DRT_FLOW_SUM',type:'number'},
	{name:	'DRT_FLOW_POP',type:'number'},
	{name:	'DRT_FLOW_ANI',type:'number'},
	{name:	'DRT_FLOW_IND',type:'number'},
	{name:	'DRT_FLOW_LAND',type:'number'},
	{name:	'DRT_FLOW_FISH',type:'number'},
	{name:	'DRT_FLOW_LANDFILL',type:'number'},
	{name:	'DRT_BOD_SUM',type:'number'},
	{name:	'DRT_BOD_POP',type:'number'},
	{name:	'DRT_BOD_ANI',type:'number'},
	{name:	'DRT_BOD_IND',type:'number'},
	{name:	'DRT_BOD_LAND',type:'number'},
	{name:	'DRT_BOD_FISH',type:'number'},
	{name:	'DRT_BOD_LANDFILL',type:'number'},
	{name:	'DRT_TN_SUM',type:'number'},
	{name:	'DRT_TN_POP',type:'number'},
	{name:	'DRT_TN_ANI',type:'number'},
	{name:	'DRT_TN_IND',type:'number'},
	{name:	'DRT_TN_LAND',type:'number'},
	{name:	'DRT_TN_FISH',type:'number'},
	{name:	'DRT_TN_LANDFILL',type:'number'},
	{name:	'DRT_TP_SUM',type:'number'},
	{name:	'DRT_TP_POP',type:'number'},
	{name:	'DRT_TP_ANI',type:'number'},
	{name:	'DRT_TP_IND',type:'number'},
	{name:	'DRT_TP_LAND',type:'number'},
	{name:	'DRT_TP_FISH',type:'number'},
	{name:	'DRT_TP_LANDFILL',type:'number'},
	{name:	'IND_CUT_FLOW_SUM',type:'number'},
	{name:	'IND_CUT_FLOW_POP',type:'number'},
	{name:	'IND_CUT_FLOW_ANI',type:'number'},
	{name:	'IND_CUT_FLOW_IND',type:'number'},
	{name:	'IND_CUT_FLOW_LAND',type:'number'},
	{name:	'IND_CUT_FLOW_FISH',type:'number'},
	{name:	'IND_CUT_FLOW_LANDFILL',type:'number'},
	{name:	'IND_CUT_BOD_SUM',type:'number'},
	{name:	'IND_CUT_BOD_POP',type:'number'},
	{name:	'IND_CUT_BOD_ANI',type:'number'},
	{name:	'IND_CUT_BOD_IND',type:'number'},
	{name:	'IND_CUT_BOD_LAND',type:'number'},
	{name:	'IND_CUT_BOD_FISH',type:'number'},
	{name:	'IND_CUT_BOD_LANDFILL',type:'number'},
	{name:	'IND_CUT_TN_SUM',type:'number'},
	{name:	'IND_CUT_TN_POP',type:'number'},
	{name:	'IND_CUT_TN_ANI',type:'number'},
	{name:	'IND_CUT_TN_IND',type:'number'},
	{name:	'IND_CUT_TN_LAND',type:'number'},
	{name:	'IND_CUT_TN_FISH',type:'number'},
	{name:	'IND_CUT_TN_LANDFILL',type:'number'},
	{name:	'IND_CUT_TP_SUM',type:'number'},
	{name:	'IND_CUT_TP_POP',type:'number'},
	{name:	'IND_CUT_TP_ANI',type:'number'},
	{name:	'IND_CUT_TP_IND',type:'number'},
	{name:	'IND_CUT_TP_LAND',type:'number'},
	{name:	'IND_CUT_TP_FISH',type:'number'},
	{name:	'IND_CUT_TP_LANDFILL',type:'number'},
	{name:	'PIT_IN_FLOW_SUM',type:'number'},
	{name:	'PIT_IN_FLOW_POP',type:'number'},
	{name:	'PIT_IN_FLOW_ANI',type:'number'},
	{name:	'PIT_IN_FLOW_IND',type:'number'},
	{name:	'PIT_IN_FLOW_LAND',type:'number'},
	{name:	'PIT_IN_FLOW_FISH',type:'number'},
	{name:	'PIT_IN_FLOW_LANDFILL',type:'number'},
	{name:	'PIT_IN_BOD_SUM',type:'number'},
	{name:	'PIT_IN_BOD_POP',type:'number'},
	{name:	'PIT_IN_BOD_ANI',type:'number'},
	{name:	'PIT_IN_BOD_IND',type:'number'},
	{name:	'PIT_IN_BOD_LAND',type:'number'},
	{name:	'PIT_IN_BOD_FISH',type:'number'},
	{name:	'PIT_IN_BOD_LANDFILL',type:'number'},
	{name:	'PIT_IN_TN_SUM',type:'number'},
	{name:	'PIT_IN_TN_POP',type:'number'},
	{name:	'PIT_IN_TN_ANI',type:'number'},
	{name:	'PIT_IN_TN_IND',type:'number'},
	{name:	'PIT_IN_TN_LAND',type:'number'},
	{name:	'PIT_IN_TN_FISH',type:'number'},
	{name:	'PIT_IN_TN_LANDFILL',type:'number'},
	{name:	'PIT_IN_TP_SUM',type:'number'},
	{name:	'PIT_IN_TP_POP',type:'number'},
	{name:	'PIT_IN_TP_ANI',type:'number'},
	{name:	'PIT_IN_TP_IND',type:'number'},
	{name:	'PIT_IN_TP_LAND',type:'number'},
	{name:	'PIT_IN_TP_FISH',type:'number'},
	{name:	'PIT_IN_TP_LANDFILL',type:'number'},
	{name:	'IND_OUT_FLOW_POP',type:'number'},
	{name:	'IND_OUT_FLOW_ANI',type:'number'},
	{name:	'IND_OUT_FLOW_IND',type:'number'},
	{name:	'IND_OUT_FLOW_LAND',type:'number'},
	{name:	'IND_OUT_FLOW_FISH',type:'number'},
	{name:	'IND_OUT_FLOW_LANDFILL',type:'number'},
	{name:	'IND_OUT_BOD_POP',type:'number'},
	{name:	'IND_OUT_BOD_ANI',type:'number'},
	{name:	'IND_OUT_BOD_IND',type:'number'},
	{name:	'IND_OUT_BOD_LAND',type:'number'},
	{name:	'IND_OUT_BOD_FISH',type:'number'},
	{name:	'IND_OUT_BOD_LANDFILL',type:'number'},
	{name:	'IND_OUT_TN_POP',type:'number'},
	{name:	'IND_OUT_TN_ANI',type:'number'},
	{name:	'IND_OUT_TN_IND',type:'number'},
	{name:	'IND_OUT_TN_LAND',type:'number'},
	{name:	'IND_OUT_TN_FISH',type:'number'},
	{name:	'IND_OUT_TN_LANDFILL',type:'number'},
	{name:	'IND_OUT_TP_POP',type:'number'},
	{name:	'IND_OUT_TP_ANI',type:'number'},
	{name:	'IND_OUT_TP_IND',type:'number'},
	{name:	'IND_OUT_TP_LAND',type:'number'},
	{name:	'IND_OUT_TP_FISH',type:'number'},
	{name:	'IND_OUT_TP_LANDFILL',type:'number'},
	{name:	'PIT_OUT_FLOW_SUM',type:'number'},
	{name:	'PIT_OUT_FLOW_POP',type:'number'},
	{name:	'PIT_OUT_FLOW_ANI',type:'number'},
	{name:	'PIT_OUT_FLOW_IND',type:'number'},
	{name:	'PIT_OUT_FLOW_LAND',type:'number'},
	{name:	'PIT_OUT_FLOW_FISH',type:'number'},
	{name:	'PIT_OUT_FLOW_LANDFILL',type:'number'},
	{name:	'PIT_OUT_BOD_SUM',type:'number'},
	{name:	'PIT_OUT_BOD_POP',type:'number'},
	{name:	'PIT_OUT_BOD_ANI',type:'number'},
	{name:	'PIT_OUT_BOD_IND',type:'number'},
	{name:	'PIT_OUT_BOD_LAND',type:'number'},
	{name:	'PIT_OUT_BOD_FISH',type:'number'},
	{name:	'PIT_OUT_BOD_LANDFILL',type:'number'},
	{name:	'PIT_OUT_TN_SUM',type:'number'},
	{name:	'PIT_OUT_TN_POP',type:'number'},
	{name:	'PIT_OUT_TN_ANI',type:'number'},
	{name:	'PIT_OUT_TN_IND',type:'number'},
	{name:	'PIT_OUT_TN_LAND',type:'number'},
	{name:	'PIT_OUT_TN_FISH',type:'number'},
	{name:	'PIT_OUT_TN_LANDFILL',type:'number'},
	{name:	'PIT_OUT_TP_SUM',type:'number'},
	{name:	'PIT_OUT_TP_POP',type:'number'},
	{name:	'PIT_OUT_TP_ANI',type:'number'},
	{name:	'PIT_OUT_TP_IND',type:'number'},
	{name:	'PIT_OUT_TP_LAND',type:'number'},
	{name:	'PIT_OUT_TP_FISH',type:'number'},
	{name:	'PIT_OUT_TP_LANDFILL',type:'number'},
	{name:	'DIS_FLOW_SUM',type:'number'},
	{name:	'DIS_FLOW_POP',type:'number'},
	{name:	'DIS_FLOW_ANI',type:'number'},
	{name:	'DIS_FLOW_IND',type:'number'},
	{name:	'DIS_FLOW_LAND',type:'number'},
	{name:	'DIS_FLOW_FISH',type:'number'},
	{name:	'DIS_FLOW_LANDFILL',type:'number'},
	{name:	'DIS_BOD_SUM',type:'number'},
	{name:	'DIS_BOD_POP',type:'number'},
	{name:	'DIS_BOD_ANI',type:'number'},
	{name:	'DIS_BOD_IND',type:'number'},
	{name:	'DIS_BOD_LAND',type:'number'},
	{name:	'DIS_BOD_FISH',type:'number'},
	{name:	'DIS_BOD_LANDFILL',type:'number'},
	{name:	'DIS_TN_SUM',type:'number'},
	{name:	'DIS_TN_POP',type:'number'},
	{name:	'DIS_TN_ANI',type:'number'},
	{name:	'DIS_TN_IND',type:'number'},
	{name:	'DIS_TN_LAND',type:'number'},
	{name:	'DIS_TN_FISH',type:'number'},
	{name:	'DIS_TN_LANDFILL',type:'number'},
	{name:	'DIS_TP_SUM',type:'number'},
	{name:	'DIS_TP_POP',type:'number'},
	{name:	'DIS_TP_ANI',type:'number'},
	{name:	'DIS_TP_IND',type:'number'},
	{name:	'DIS_TP_LAND',type:'number'},
	{name:	'DIS_TP_FISH',type:'number'},
	{name:	'DIS_TP_LANDFILL',type:'number'},
	{name:	'OUT_FLOW_SUM',type:'number'},
	{name:	'OUT_FLOW_POP',type:'number'},
	{name:	'OUT_FLOW_ANI',type:'number'},
	{name:	'OUT_FLOW_IND',type:'number'},
	{name:	'OUT_FLOW_LAND',type:'number'},
	{name:	'OUT_FLOW_FISH',type:'number'},
	{name:	'OUT_FLOW_LANDFILL',type:'number'},
	{name:	'OUT_BOD_SUM',type:'number'},
	{name:	'OUT_BOD_POP',type:'number'},
	{name:	'OUT_BOD_ANI',type:'number'},
	{name:	'OUT_BOD_IND',type:'number'},
	{name:	'OUT_BOD_LAND',type:'number'},
	{name:	'OUT_BOD_FISH',type:'number'},
	{name:	'OUT_BOD_LANDFILL',type:'number'},
	{name:	'OUT_TN_SUM',type:'number'},
	{name:	'OUT_TN_POP',type:'number'},
	{name:	'OUT_TN_ANI',type:'number'},
	{name:	'OUT_TN_IND',type:'number'},
	{name:	'OUT_TN_LAND',type:'number'},
	{name:	'OUT_TN_FISH',type:'number'},
	{name:	'OUT_TN_LANDFILL',type:'number'},
	{name:	'OUT_TP_SUM',type:'number'},
	{name:	'OUT_TP_POP',type:'number'},
	{name:	'OUT_TP_ANI',type:'number'},
	{name:	'OUT_TP_IND',type:'number'},
	{name:	'OUT_TP_LAND',type:'number'},
	{name:	'OUT_TP_FISH',type:'number'},
	{name:	'OUT_TP_LANDFILL',type:'number'}
	/* {name: 'OUT_FLOW_SUM', type 'number'}*/
    ],
    
    siteId: '',
    
    autoLoad: true,
    
    buffered: true, // 버퍼드 스토어 지정
    leadingBufferZone: 300,
    pageSize: 100,
    selectValue: '',
	
	listeners: {
		load: function(store, a, b, c, d, e) {
			

			/*
			11 : 총괄표                : SearchResultGrid_PollLoad_Total
			22 : 표준유역단위 보기     : SearchResultGrid_PollLoad_Standard_Basin
			33 : 집수구역단위 보기     : SearchResultGrid_PollLoad_CAT
			44 : 집수구역단위 상세보기 : SearchResultGrid_PollLoad_CAT_Detail
			*/
			
			var pollYear = Ext.getCmp("pollYear").value;
			
			if(store.selectValue == 11 ){
				url= './resources/jsp/GetSearchPollLoadResultData_Total.jsp';
				params= {pollYear: pollYear, catDid:store.catDid }
			}else if(store.selectValue == 22){
				url= './resources/jsp/GetSearchPollLoadResultData_Standard_Basin.jsp';
				params= {pollYear: pollYear, catDid:store.catDid }
			}else if( store.selectValue == 33 || store.selectValue == ""){ 
				url= './resources/jsp/GetSearchPollLoadResultData_CAT.jsp';
				params= {pollYear: pollYear, catDid:store.catDid }
			}else{
				url= './resources/jsp/GetSearchPollLoadResultData_CAT_Detail.jsp';
				params= {pollYear: pollYear, catDid:store.catDid }
			}
			
			Ext.Ajax.request({
        		//url: url,
				url: url,
        		params: params,
        		//params: { adm1: WS_CD},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			//console.info(response.responseText);
        			// JSON Object로 변경
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			store.setData(jsonData.data);
        			
        			
        			
        		},
        		failure: function(form, action) {
        			// 로딩바 숨김
        			//Ext.getCmp("searchResultWindow").unmask();
        			//activeTab.unmask();
        			alert("오류가 발생하였습니다.");
        		}
        	});
			
			//store.setData(jsonData.items);
			//store.data.items.add(jsonData.data);
			//store.data.items = jsonData.items;
			//console.info(store.data);
		}
    }
});