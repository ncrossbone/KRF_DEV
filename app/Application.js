/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('KRF_DEV.Application', {
    extend: 'Ext.app.Application',
    
    name: 'KRF_DEV',
    
    //arcServiceUrl:'http://cetech.iptime.org:6080/arcgis',
    arcServiceUrl:'http://fireftp.iptime.org:6080/arcgis',
    layer1Url: 'http://fireftp.iptime.org:6080/arcgis/rest/services/reach/MapServer/',
    //layer1Url: 'http://fireftp.iptime.org:6080/arcgis/rest/services/drone/MapServer',
    
    stores: [
 		'KRF_DEV.store.dev_test.GridStoreTest',
 		'KRF_DEV.store.dev_test.WestTabLayerStore',
 		'KRF_DEV.store.west.WestTabSearch_ADM_GRID'
 	]
});
