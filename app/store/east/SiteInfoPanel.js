Ext.define('KRF_DEV.store.east.SiteInfoPanel', {
    extend  : 'Ext.data.Store',
    
    fields: [
        'column',
        'cont'
    ],
    
    autoLoad: true,

	remoteSort: true,
    
    listeners: {
		beforeload: function(store) {
			
			var queryTask = new esri.tasks.QueryTask('http://112.218.1.242:20002/arcgis/rest/services/reach/MapServer/1'); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = "1=1 and 권역 ='한강권역' and 중권역명 ='의암댐'";
			query.outFields = ["*"];
			queryTask.execute(query, function(result){
				console.info(result);
				console.info(result.features.length);
				//console.info(result.features[0].attributes."측정소명");
				console.info(result.features[0].attributes);
				
				Ext.each(result.layers, function(objLayer, idx, objLayers){});
				
		
			
				//store.setData(jsonStr);
				//store.setData(JSON.parse(jsonStr));
				
	        });
	  	}
    }
    
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