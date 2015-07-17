Ext.define('KRF_DEV.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'KRF Portal',
        app_title: 'KRF 물환경정보시스템',
        nier_logo: './resources/images/nier_logo.png',
        testText: '주제도'
    },
    
    initComponent: function(){
    	console.info("mainModel");
    }
});