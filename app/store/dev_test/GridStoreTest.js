Ext.define('KRF_DEV.store.dev_test.GridStoreTest', {
    extend  : 'Ext.data.Store',

    requires : [
        'KRF_DEV.model.dev_test.GridModelTest'
    ],
    
    storeId : 'GridStoreTest',
    model   : 'KRF_DEV.model.dev_test.GridModelTest',
    
    data : [
        { 
            'name'  : ['Lisa', 'Lisa2'],  
            'email' : 'lisa@simpsons.com',
            'phone' : '555-111-1224',
            'progress' : 0.1,
            'chartvalues' : [25, 78, 11]
        },
        { 
            'name'  : 'Bart',  
            'email' : 'bart@simpsons.com',
            'phone' : '555-222-1234',
            'progress' : 0.35,
            'chartvalues' : [15, 23, 11]
        },
        { 
            'name'  : 'Homer', 
            'email' : 'homer@simpsons.com',
            'phone' : '555-222-1244',
            'progress' : 0.90,
            'chartvalues' : [25, 23, 11]
        },
        { 
            'name'  : 'Marge', 
            'email' : 'marge@simpsons.com',
            'phone' : '555-222-1254',
            'progress' : 0.44,
            'chartvalues' : [25, 30, 15]
        }
    ]
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