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
    	'name': ['공지천'],	'year' : '2015',	'month' : '06',	'temp_value' : 23.9,	'temp_chart' : [15.6,13.4,12.4,8.3,3.8],	'DO_value' : 9,	'DO_chart' : [12.9,12,14.6,14.8,15],	'BOD_value' : 1.4,	'BOD_chart' : [1.1,0.8,1.3,1,1.7],	'COD_value' : 6.1,	'COD_chart' : [2.9,3.6,3.4,2.4,4.6],	'tn_value' : 1.918,	'tn_chart' : [3.832,4.826,3.831,4.31,4.776],	'tp_value' : 0.032,	'tp_chart' : [0.014,0.025,0.008,0.011,0.011]
    }, { 
    	'name': ['공지천1'],	'year' : '2015',	'month' : '06',	'temp_value' : 23.1,	'temp_chart' : [18.7,11.1,9.6,7.5,3.8],	'DO_value' : 11.8,	'DO_chart' : [12.6,10.6,12.3,11.9,14.6],	'BOD_value' : 2.1,	'BOD_chart' : [1.2,0.5,2.6,1.2,1.6],	'COD_value' : 3.6,	'COD_chart' : [3.7,3.1,4.9,3,2.9],	'tn_value' : 1.803,	'tn_chart' : [3.496,3.941,3.354,3.731,3.143],	'tp_value' : 0.034,	'tp_chart' : [0.013,0.024,0.065,0.029,0.039]
    }, { 
    	'name': ['의암댐'],	'year' : '2015',	'month' : '06',	'temp_value' : 22.3,	'temp_chart' : [21.1,18.4,19,17,16],	'DO_value' : 8.3,	'DO_chart' : [9.4,10.5,10.9,11,11.3],	'BOD_value' : 1.9,	'BOD_chart' : [1.2,1.5,1.3,1.5,1.3],	'COD_value' : 4,	'COD_chart' : [3.3,3.2,2.5,2.9,3.6],	'tn_value' : 1.934,	'tn_chart' : [1.843,1.923,1.803,1.97,2.064],	'tp_value' : 0.009,	'tp_chart' : [0.006,0.015,0.008,0.014,0.011]
    }, { 
    	'name': ['의암'],	'year' : '2015',	'month' : '06',	'temp_value' : 15.7,	'temp_chart' : [13.7,11,5.2,4.7,3.9],	'DO_value' : 11.5,	'DO_chart' : [6.6,11.1,12.9,14,15.5],	'BOD_value' : 1.2,	'BOD_chart' : [1.6,1.6,0.8,0.7,1.1],	'COD_value' : 4.4,	'COD_chart' : [3.2,3.4,3.8,1.7,3.7],	'tn_value' : 1.934,	'tn_chart' : [1.692,2.125,2.084,2.192,2.87],	'tp_value' : 0.013,	'tp_chart' : [0.012,0.008,0.013,0.005,0.008]
    }, { 
    	'name': ['춘성교'],	'year' : '2015',	'month' : '06',	'temp_value' : 22.3,	'temp_chart' : [22.6,17,16.8,17.4,16.5],	'DO_value' : 7,	'DO_chart' : [8.6,9.6,10.9,10.9,12],	'BOD_value' : 1.2,	'BOD_chart' : [1.3,0.9,0.8,1.8,1.2],	'COD_value' : 2.7,	'COD_chart' : [3.7,2.8,2.8,2.9,3],	'tn_value' : 1.453,	'tn_chart' : [1.513,1.79,2.128,1.686,1.596],	'tp_value' : 0.013,	'tp_chart' : [0.012,0.015,0.017,0.013,0.012]
    }, { 
    	'name': ['가평천1'],	'year' : '2015',	'month' : '06',	'temp_value' : 20.1,	'temp_chart' : [14.6,9.7,0.4,0.6,0.1],	'DO_value' : 8.9,	'DO_chart' : [10.7,10.1,16.6,15.2,15.1],	'BOD_value' : 0.2,	'BOD_chart' : [0.2,1.4,0.8,1.3,0.6],	'COD_value' : 2.9,	'COD_chart' : [1.1,1.4,1.1,1,1],	'tn_value' : 2.427,	'tn_chart' : [2.545,3.085,2.959,3.024,2.934],	'tp_value' : 0.011,	'tp_chart' : [0.026,0.016,0.005,0.009,0.013]
    }, {
    	'name': ['가평천2'],	'year' : '2015',	'month' : '06',	'temp_value' : 22.3,	'temp_chart' : [14.3,10.9,3.7,3.2,2.9],	'DO_value' : 8.8,	'DO_chart' : [10.3,10.3,14.7,14.1,15.5],	'BOD_value' : 1.6,	'BOD_chart' : [0.3,1.7,0.9,1.1,0.5],	'COD_value' : 2.8,	'COD_chart' : [1.4,1.8,1.2,1.1,0.9],	'tn_value' : 3.04,	'tn_chart' : [2.971,2.826,2.992,2.848,2.76],	'tp_value' : 0.007,	'tp_chart' : [0.027,0.013,0.005,0.003,0.009]
    }, { 
    	'name': ['가평천3'],	'year' : '2015',	'month' : '06',	'temp_value' : 29.2,	'temp_chart' : [28.2,27.5,25.3,26.3,21.9],	'DO_value' : 8.6,	'DO_chart' : [10.2,9.3,10,11.1,10.7],	'BOD_value' : 1.2,	'BOD_chart' : [1.2,1.4,1.2,1.8,0.9],	'COD_value' : 3.5,	'COD_chart' : [3.7,3.2,3.3,2.8,3.1],	'tn_value' : 1.149,	'tn_chart' : [1.285,1.884,2.256,2.366,2.72],	'tp_value' : 0.02,	'tp_chart' : [0.013,0.02,0.022,0.018,0.023]
    }, { 
    	'name': ['남이섬'],	'year' : '2015',	'month' : '06',	'temp_value' : 24,	'temp_chart' : [19.2,14.9,6.4,3.1,2.3],	'DO_value' : 10.3,	'DO_chart' : [11,11.3,12.8,13.8,13.1],	'BOD_value' : 0.5,	'BOD_chart' : [1.3,0.6,0.5,0.6,0.5],	'COD_value' : 3.5,	'COD_chart' : [3.7,3.2,2.9,2.4,2.7],	'tn_value' : 1.638,	'tn_chart' : [2.214,2.245,2.223,1.735,1.997],	'tp_value' : 0.014,	'tp_chart' : [0.025,0.031,0.03,0.007,0.006]
    }, { 
    	'name': ['공지천'],	'year' : '2015',	'month' : '05',	'temp_value' : 15.6,	'temp_chart' : [13.4,12.4,8.3,3.8,2.3],	'DO_value' : 12.9,	'DO_chart' : [12,14.6,14.8,15,14.9],	'BOD_value' : 1.1,	'BOD_chart' : [0.8,1.3,1,1.7,1.8],	'COD_value' : 2.9,	'COD_chart' : [3.6,3.4,2.4,4.6,3],	'tn_value' : 3.832,	'tn_chart' : [4.826,3.831,4.31,4.776,4.272],	'tp_value' : 0.014,	'tp_chart' : [0.025,0.008,0.011,0.011,0.017]
    }, { 
    	'name': ['공지천1'],	'year' : '2015',	'month' : '05',	'temp_value' : 18.7,	'temp_chart' : [11.1,9.6,7.5,3.8,4.1],	'DO_value' : 12.6,	'DO_chart' : [10.6,12.3,11.9,14.6,12.5],	'BOD_value' : 1.2,	'BOD_chart' : [0.5,2.6,1.2,1.6,0.7],	'COD_value' : 3.7,	'COD_chart' : [3.1,4.9,3,2.9,2.3],	'tn_value' : 3.496,	'tn_chart' : [3.941,3.354,3.731,3.143,3.287],	'tp_value' : 0.013,	'tp_chart' : [0.024,0.065,0.029,0.039,0.022]
    }, { 
    	'name': ['의암'],	'year' : '2015',	'month' : '05',	'temp_value' : 13.7,	'temp_chart' : [11,5.2,4.7,3.9,8.4],	'DO_value' : 6.6,	'DO_chart' : [11.1,12.9,14,15.5,11.2],	'BOD_value' : 1.6,	'BOD_chart' : [1.6,0.8,0.7,1.1,1.4],	'COD_value' : 3.2,	'COD_chart' : [3.4,3.8,1.7,3.7,2.7],	'tn_value' : 1.692,	'tn_chart' : [2.125,2.084,2.192,2.87,1.878],	'tp_value' : 0.012,	'tp_chart' : [0.008,0.013,0.005,0.008,0.009]
    }, { 
    	'name': ['가평천1'],	'year' : '2015',	'month' : '05',	'temp_value' : 14.6,	'temp_chart' : [9.7,0.4,0.6,0.1,0.4],	'DO_value' : 10.7,	'DO_chart' : [10.1,16.6,15.2,15.1,17.2],	'BOD_value' : 0.2,	'BOD_chart' : [1.4,0.8,1.3,0.6,1.2],	'COD_value' : 1.1,	'COD_chart' : [1.4,1.1,1,1,1.3],	'tn_value' : 2.545,	'tn_chart' : [3.085,2.959,3.024,2.934,2.887],	'tp_value' : 0.026,	'tp_chart' : [0.016,0.005,0.009,0.013,0.013]
    }, { 
    	'name': ['가평천2'],	'year' : '2015',	'month' : '05',	'temp_value' : 14.3,	'temp_chart' : [10.9,3.7,3.2,2.9,2.8],	'DO_value' : 10.3,	'DO_chart' : [10.3,14.7,14.1,15.5,15.5],	'BOD_value' : 0.3,	'BOD_chart' : [1.7,0.9,1.1,0.5,1.3],	'COD_value' : 1.4,	'COD_chart' : [1.8,1.2,1.1,0.9,1.7],	'tn_value' : 2.971,	'tn_chart' : [2.826,2.992,2.848,2.76,2.664],	'tp_value' : 0.027,	'tp_chart' : [0.013,0.005,0.003,0.009,0.02]
    }, { 
    	'name': ['남이섬'],	'year' : '2015',	'month' : '05',	'temp_value' : 19.2,	'temp_chart' : [14.9,6.4,3.1,2.3,2.3],	'DO_value' : 11,	'DO_chart' : [11.3,12.8,13.8,13.1,14.9],	'BOD_value' : 1.3,	'BOD_chart' : [0.6,0.5,0.6,0.5,0.6],	'COD_value' : 3.7,	'COD_chart' : [3.2,2.9,2.4,2.7,3.1],	'tn_value' : 2.214,	'tn_chart' : [2.245,2.223,1.735,1.997,2.006],	'tp_value' : 0.025,	'tp_chart' : [0.031,0.03,0.007,0.006,0.006]
    }, { 
    	'name': ['공지천'],	'year' : '2015',	'month' : '04',	'temp_value' : 13.4,	'temp_chart' : [12.4,8.3,3.8,2.3,11.7],	'DO_value' : 12,	'DO_chart' : [14.6,14.8,15,14.9,15.7],	'BOD_value' : 0.8,	'BOD_chart' : [1.3,1,1.7,1.8,1.5],	'COD_value' : 3.6,	'COD_chart' : [3.4,2.4,4.6,3,2.4],	'tn_value' : 4.826,	'tn_chart' : [3.831,4.31,4.776,4.272,4.097],	'tp_value' : 0.025,	'tp_chart' : [0.008,0.011,0.011,0.017,0.013]
    }, { 
    	'name': ['공지천1'],	'year' : '2015',	'month' : '04',	'temp_value' : 11.1,	'temp_chart' : [9.6,7.5,3.8,4.1,12.9],	'DO_value' : 10.6,	'DO_chart' : [12.3,11.9,14.6,12.5,13],	'BOD_value' : 0.5,	'BOD_chart' : [2.6,1.2,1.6,0.7,1.5],	'COD_value' : 3.1,	'COD_chart' : [4.9,3,2.9,2.3,2.6],	'tn_value' : 3.941,	'tn_chart' : [3.354,3.731,3.143,3.287,2.93],	'tp_value' : 0.024,	'tp_chart' : [0.065,0.029,0.039,0.022,0.043]
    }, { 
    	'name': ['의암'],	'year' : '2015',	'month' : '04',	'temp_value' : 11,	'temp_chart' : [5.2,4.7,3.9,8.4,14],	'DO_value' : 11.1,	'DO_chart' : [12.9,14,15.5,11.2,11.1],	'BOD_value' : 1.6,	'BOD_chart' : [0.8,0.7,1.1,1.4,0.7],	'COD_value' : 3.4,	'COD_chart' : [3.8,1.7,3.7,2.7,3.2],	'tn_value' : 2.125,	'tn_chart' : [2.084,2.192,2.87,1.878,2.185],	'tp_value' : 0.008,	'tp_chart' : [0.013,0.005,0.008,0.009,0.008]
    }, { 
    	'name': ['가평천1'],	'year' : '2015',	'month' : '04',	'temp_value' : 9.7,	'temp_chart' : [0.4,0.6,0.1,0.4,8.5],	'DO_value' : 10.1,	'DO_chart' : [16.6,15.2,15.1,17.2,13.6],	'BOD_value' : 1.4,	'BOD_chart' : [0.8,1.3,0.6,1.2,1.4],	'COD_value' : 1.4,	'COD_chart' : [1.1,1,1,1.3,1.3],	'tn_value' : 3.085,	'tn_chart' : [2.959,3.024,2.934,2.887,2.211],	'tp_value' : 0.016,	'tp_chart' : [0.005,0.009,0.013,0.013,0.003]
    }, { 
    	'name': ['가평천2'],	'year' : '2015',	'month' : '04',	'temp_value' : 10.9,	'temp_chart' : [3.7,3.2,2.9,2.8,11.7],	'DO_value' : 10.3,	'DO_chart' : [14.7,14.1,15.5,15.5,12.3],	'BOD_value' : 1.7,	'BOD_chart' : [0.9,1.1,0.5,1.3,1.2],	'COD_value' : 1.8,	'COD_chart' : [1.2,1.1,0.9,1.7,1.5],	'tn_value' : 2.826,	'tn_chart' : [2.992,2.848,2.76,2.664,2.224],	'tp_value' : 0.013,	'tp_chart' : [0.005,0.003,0.009,0.02,0.001]
    }, { 
    	'name': ['남이섬'],	'year' : '2015',	'month' : '04',	'temp_value' : 14.9,	'temp_chart' : [6.4,3.1,2.3,2.3,11.7],	'DO_value' : 11.3,	'DO_chart' : [12.8,13.8,13.1,14.9,11.2],	'BOD_value' : 0.6,	'BOD_chart' : [0.5,0.6,0.5,0.6,1.2],	'COD_value' : 3.2,	'COD_chart' : [2.9,2.4,2.7,3.1,3.5],	'tn_value' : 2.245,	'tn_chart' : [2.223,1.735,1.997,2.006,1.874],	'tp_value' : 0.031,	'tp_chart' : [0.03,0.007,0.006,0.006,0.016]
    }, { 
    	'name': ['공지천'],	'year' : '2015',	'month' : '03',	'temp_value' : 12.4,	'temp_chart' : [8.3,3.8,2.3,11.7,15.8],	'DO_value' : 14.6,	'DO_chart' : [14.8,15,14.9,15.7,10.5],	'BOD_value' : 1.3,	'BOD_chart' : [1,1.7,1.8,1.5,1.3],	'COD_value' : 3.4,	'COD_chart' : [2.4,4.6,3,2.4,1.6],	'tn_value' : 3.831,	'tn_chart' : [4.31,4.776,4.272,4.097,3.728],	'tp_value' : 0.008,	'tp_chart' : [0.011,0.011,0.017,0.013,0.016]
    }, { 
    	'name': ['공지천1'],	'year' : '2015',	'month' : '03',	'temp_value' : 9.6,	'temp_chart' : [7.5,3.8,4.1,12.9,15.8],	'DO_value' : 12.3,	'DO_chart' : [11.9,14.6,12.5,13,7.5],	'BOD_value' : 2.6,	'BOD_chart' : [1.2,1.6,0.7,1.5,1.3],	'COD_value' : 4.9,	'COD_chart' : [3,2.9,2.3,2.6,1.9],	'tn_value' : 3.354,	'tn_chart' : [3.731,3.143,3.287,2.93,3.579],	'tp_value' : 0.065,	'tp_chart' : [0.029,0.039,0.022,0.043,0.034]
    }, { 
    	'name': ['의암'],	'year' : '2015',	'month' : '03',	'temp_value' : 5.2,	'temp_chart' : [4.7,3.9,8.4,14,17.2],	'DO_value' : 12.9,	'DO_chart' : [14,15.5,11.2,11.1,8.8],	'BOD_value' : 0.8,	'BOD_chart' : [0.7,1.1,1.4,0.7,2],	'COD_value' : 3.8,	'COD_chart' : [1.7,3.7,2.7,3.2,2.8],	'tn_value' : 2.084,	'tn_chart' : [2.192,2.87,1.878,2.185,1.958],	'tp_value' : 0.013,	'tp_chart' : [0.005,0.008,0.009,0.008,0.011]
    }, { 
    	'name': ['가평천1'],	'year' : '2015',	'month' : '03',	'temp_value' : 0.4,	'temp_chart' : [0.6,0.1,0.4,8.5,16.2],	'DO_value' : 16.6,	'DO_chart' : [15.2,15.1,17.2,13.6,10.2],	'BOD_value' : 0.8,	'BOD_chart' : [1.3,0.6,1.2,1.4,0.5],	'COD_value' : 1.1,	'COD_chart' : [1,1,1.3,1.3,1.1],	'tn_value' : 2.959,	'tn_chart' : [3.024,2.934,2.887,2.211,2.04],	'tp_value' : 0.005,	'tp_chart' : [0.009,0.013,0.013,0.003,0.014]
    }, { 
    	'name': ['가평천2'],	'year' : '2015',	'month' : '03',	'temp_value' : 3.7,	'temp_chart' : [3.2,2.9,2.8,11.7,17.3],	'DO_value' : 14.7,	'DO_chart' : [14.1,15.5,15.5,12.3,9.4],	'BOD_value' : 0.9,	'BOD_chart' : [1.1,0.5,1.3,1.2,1],	'COD_value' : 1.2,	'COD_chart' : [1.1,0.9,1.7,1.5,1.5],	'tn_value' : 2.992,	'tn_chart' : [2.848,2.76,2.664,2.224,1.969],	'tp_value' : 0.005,	'tp_chart' : [0.003,0.009,0.02,0.001,0.005]
    }, { 
    	'name': ['남이섬'],	'year' : '2015',	'month' : '03',	'temp_value' : 6.4,	'temp_chart' : [3.1,2.3,2.3,11.7,17.9],	'DO_value' : 12.8,	'DO_chart' : [13.8,13.1,14.9,11.2,10.9],	'BOD_value' : 0.5,	'BOD_chart' : [0.6,0.5,0.6,1.2,1.8],	'COD_value' : 2.9,	'COD_chart' : [2.4,2.7,3.1,3.5,4.5],	'tn_value' : 2.223,	'tn_chart' : [1.735,1.997,2.006,1.874,1.708],	'tp_value' : 0.03,	'tp_chart' : [0.007,0.006,0.006,0.016,0.016]
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