Ext.define('KRF_DEV.store.east.SiteInfoPanel', {
    extend  : 'Ext.data.Store',
    
    fields: [
        'column',
        'cont'
    ],
    
    autoLoad: true,

	remoteSort: true,
	
	
	//constructor: function() {
	listeners: {
		load: function(store) {
			
			var jsonData = "";
			
			Ext.Ajax.request({
        		url: './resources/jsp/GetRWMDT.jsp',    // To Which url you wanna POST.
        		//params: { siteCodes: siteCodes, measureDate: measureDate, layerDate: layerDate },
        		async: false, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			
        			// JSON Object로 변경
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			store.setData(jsonData.data);
        			
        		},
        		failure: function(form, action) {
        			//alert(form.responseText);
        			alert("오류가 발생하였습니다.");
        		}
        	});
		}
    }
    
	/*listeners: {
		beforeload: function(store) {
			console.info(store);
			var queryTask = new esri.tasks.QueryTask('http://112.218.1.243:20002/arcgis/rest/services/reach/MapServer/1'); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = "1=1 and 권역 ='한강권역' and 중권역명 ='의암댐'";
			query.outFields = ["*"];
			queryTask.execute(query, function(result){
				console.info(result);
				console.info(result.features.length);
				//console.info(result.features[0].attributes."측정소명");
				//console.info(result.features[0].attributes.권역);
				
				for(i=0 ; i<result.features.length ; i++){
					var a = result.features[i].attributes.측정소명;
					var b = result.features[i].attributes.측정소코드;
					var c = result.features[i].attributes.수계;
					var d = result.features[i].attributes.중역권명;
					var e = result.features[i].attributes.조사기관;
					var f = result.features[i].attributes.채수지점;					
					var g = result.features[i].attributes.설치년도;
					
					var test = [];
					test.push(	{column:'측정소명', 	cont:a},
								{column:'측정소코드', 	cont:b},
								{column:'수계', 		cont:c},
								{column:'중역권명', 	cont:d},
								{column:'조사기관', 	cont:e},
								{column:'채수지점', 	cont:f},
								{column:'설치년도', 	cont:g});
					
				}
				console.log("aaa");
				console.info(test);
				console.log("aaa");
				store.setData(test);
				
				//Ext.each(result.layers, function(objLayer, idx, objLayers){});
				
				//var test = [];
				
				//teas.push({column: '중권역명', cont: 'dfd'}, {})
				
		
			
				//store.setData(jsonStr);
				//store.setData(JSON.parse(jsonStr));
				
	        });
	  	}
    }*/
    
    /*data : [{ 
    	'column': '지점명',	'cont' : '남이섬'
    }, { 
    	'column': '지점코드',	'cont' : '1013A96'
    }, { 
    	'column': '수계명',	'cont' : '한강'
    }, { 
    	'column': '중권역명',	'cont' : '의암댐'
    }, { 
    	'column': '기관명',	'cont' : '한강유역환경청'
    }, { 
    	'column': '주소',	'cont' : '경기도 가평군 가평읍 복장리'
    }, { 
    	'column': '상세지점',	'cont' : '복장초교앞'
    }, { 
    	'column': '설치년도',	'cont' : '2007'
    }]*/
    /* 랜덤 데이터 셋팅
    data: (function() {
        var result = [],
            i,
            generateSequence = function(count, min, max) {
                var j,
                    sequence = [];

                if (count == null) {
                    count = 20;
                }
                if (min == null) {
                    min = -10;
                }
                if (max == null) {
                    max = 10;
                }
                for (j = 0; j < count; j++) {
                    sequence.push(Ext.Number.randomInt(min, max));
                }
                //alert(sequence);
                return sequence;
            };

        for (i = 0; i < 8; i++) {
            result.push([i + 1, 'Record ' + (i + 1), Ext.Number.randomInt(0, 100) / 100, generateSequence(), generateSequence(), generateSequence(), generateSequence(20, 1, 10), generateSequence(4, 10, 20), generateSequence(), generateSequence(20, -1, 1)]);
        }
        //alert(result);
        console.info(result);
        return result;
    })()
    */
});