Ext.define('KRF_DEV.store.south.PrototypeGrid', {
    extend  : 'Ext.data.Store',
    
    fields: [
        'name',
        'year',
        'month',
        'temp_value',
        'temp_chart'
    ],
    
    data : [{ 
		'name'  : ['남이섬'],  
		'year' : '2015',
		'month' : '05',
		'temp_value' : 19.2,
		'temp_chart' : [2.3, 2.3, 3.1, 6.4, 14.9],
		'DO_value' : 11,
		'DO_chart' : [14.9, 13.1, 13.8, 12.8, 11.3],
		'BOD_value' : 1.3,
		'BOD_chart' : [0.6, 0.5, 0.6, 0.5, 0.6],
		'COD_value' : 3.7,
		'COD_chart' : [3.1, 2.7, 2.4, 2.9, 3.2],
    }, { 
    	'name'  : ['가평천1'],  
        'year' : '2015',
        'month' : '05',
        'temp_value' : 14.6,
        'temp_chart' : [0.4, 0.1, 0.6, 0.4, 9.7],
        'DO_value' : 10.7,
        'DO_chart' : [17.2, 15.1, 15.2, 16.6, 10.1],
        'BOD_value' : 0.2,
        'BOD_chart' : [1.2, 0.6, 1.3, 0.8, 1.4],
        'COD_value' : 1.1,
        'COD_chart' : [1.3, 1, 1, 1.1, 1.4],
    }, { 
    	'name'  : ['가평천2'],  
        'year' : '2015',
        'month' : '05',
        'temp_value' : 14.3,
        'temp_chart' : [2.8, 2.9, 3.2, 3.7, 10.9],
        'DO_value' : 10.3,
        'DO_chart' : [15.5, 15.5, 14.1, 14.7, 10.3],
        'BOD_value' : 0.3,
        'BOD_chart' : [1.3, 0.5, 1.1, 0.9, 1.7],
        'COD_value' : 1.4,
        'COD_chart' : [1.7, 0.9, 1.1, 1.2, 1.8],
    }, { 
    	'name'  : ['가평천3'],  
        'year' : '2015',
        'month' : '05',
        'temp_value' : 22.1,
        'temp_chart' : [3.2, 1.9, 3.7, 7.8, 15.2],
        'DO_value' : 10.8,
        'DO_chart' : [14.4, 16.3, 16.5, 13.2, 12.1],
        'BOD_value' : 1.1,
        'BOD_chart' : [0.5, 0.7, 0.7, 0.8, 0.8],
        'COD_value' : 2.8,
        'COD_chart' : [1.5, 1.7, 2, 2.5, 2.3],
    }, { 
    	'name'  : ['춘성교'],  
        'year' : '2015',
        'month' : '05',
        'temp_value' : 16.1,
        'temp_chart' : [4.8, 2.1, 3.1, 5.4, 11.8],
        'DO_value' : 11.6,
        'DO_chart' : [12.8, 13.9, 13.5, 12.5, 13],
        'BOD_value' : 1.5,
        'BOD_chart' : [0.9, 0.6, 0.8, 0.9, 1.3],
        'COD_value' : 3.1,
        'COD_chart' : [2.9, 2.4, 2.7, 2.8, 3.1],
    }, { 
    	'name'  : ['의암'],  
        'year' : '2015',
        'month' : '05',
        'temp_value' : 13.7,
        'temp_chart' : [8.4, 3.9, 4.7, 5.2, 11],
        'DO_value' : 6.6,
        'DO_chart' : [11.2, 15.5, 14, 12.9, 11.1],
        'BOD_value' : 1.6,
        'BOD_chart' : [1.4, 1.1, 0.7, 0.8, 1.6],
        'COD_value' : 3.2,
        'COD_chart' : [2.7, 3.7, 1.7, 3.8, 3.4],
    }, { 
    	'name'  : ['의암댐'],  
        'year' : '2015',
        'month' : '05',
        'temp_value' : 14.9,
        'temp_chart' : [4.5, 3.4, 3.6, 6.2, 11.8],
        'DO_value' : 12.2,
        'DO_chart' : [13.6, 14.6, 13.8, 13.4, 11.5],
        'BOD_value' : 1.5,
        'BOD_chart' : [1.1, 1.4, 1.1, 1.3, 1.3],
        'COD_value' : 3.3,
        'COD_chart' : [3.1, 3.4, 2.7, 3.2, 3.7],
    }, { 
    	'name'  : ['공지천1'],  
        'year' : '2015',
        'month' : '05',
        'temp_value' : 18.7,
        'temp_chart' : [4.1, 3.8, 7.5, 9.6, 11.1],
        'DO_value' : 12.6,
        'DO_chart' : [12.5, 14.6, 11.9, 12.3, 10.6],
        'BOD_value' : 1.2,
        'BOD_chart' : [0.7, 1.6, 1.2, 2.6, 0.5],
        'COD_value' : 3.7,
        'COD_chart' : [2.3, 2.9, 3, 4.9, 3.1],
    }]
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