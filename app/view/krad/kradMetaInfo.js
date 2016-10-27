Ext.define('KRF_DEV.view.krad.kradMetaInfo', {
	
	extend: 'Ext.window.Window',

	xtype: 'krad-kradMetaInfo',
	id: 'kradMetaInfo',
	title: '메타상세정보',
	header: true,
    frame: true,
	width: 470,
	height: 559,
	x: 687,
	y: 226,

	plain: true, // 요게 있어야 background: transparent 먹음..
	//cls: 'dj_toolbarConf',
	
	items:[{
		xtype : 'container',
		width: 470,
		height: 559,
		items:[{
			html: '<!doctype html>																																																						'+	
			'<html lang=\"ko\">                                                                                                           '+
			'<head>                                                                                                                     '+
			'<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />                                                      '+
			'<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />                                                          '+
			'<title>KRF-TOOLTIP</title>                                                                                                 '+
			'<!--[if lt ie 9]>                                                                                                          '+
			'<script src=\"js/html5shiv.js\"></script>                                                                                    '+
			'<![endif]-->                                                                                                               '+
			'<link href=\"./resources/css/BasicSet.css\" rel=\"stylesheet\" type=\"text/css\" />                                                          '+
			'<style type=\"text/css\">                                                                                                    '+
			'table.meta { width: 450px; border-top: 2px solid #366be4; }                                                 '+
			'table.meta> tbody> tr> th { background: #f3f3f2; font-weight: bold; text-align: left !important;  }                                                     '+
			'table.meta> tbody> tr> td { }                                                                                              '+
			'table.meta> tbody> tr> th, table.meta> tbody> tr> td { padding: 10px 0px 10px 10px; border-bottom: 1px solid #d4d1cc; font-size: 12px!important; }    '+
			'</style>                                                                                                                   '+
			'</head>                                                                                                                    '+
			'<body>                                                                                                                     '+
			'<table class=\"meta\" summary=\"\">                                                                                            '+
			'	<colgroup>                                                                                                                '+
			'    	<col width=\"110\" />                                                                                                   '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'    </colgroup>                                                                                                            '+
			'    <tbody>                                                                                                                '+
			'    	<tr>                                                                                                                  '+
			'        	<th>지도명</th>                                                                                                      '+
			'            <td colspan=\"5\">대분류토지피복지도 : 추가</td>                                                                            '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>도엽명</th>                                                                                                      '+
			'            <td>추자</td>                                                                                                    '+
			'            <th>도엽번호</th>                                                                                                  '+
			'            <td>33602</td>                                                                                                 '+
			'            <th>축척</th>                                                                                                    '+
			'            <td>1:50,000</td>                                                                                              '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>제작/갱신일자</th>                                                                                                  '+
			'            <td colspan=\"5\">20010725</td>                                                                                  '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>자료포맷명</th>                                                                                                    '+
			'            <td colspan=\"5\">TIF</td>                                                                                       '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>관리/배포기관</th>                                                                                                  '+
			'            <td colspan=\"5\">환경부 정보화담당관실(044-201-6422)</td>                                                                 '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>홈페이지</th>                                                                                                     '+
			'            <td colspan=\"5\">http://egis.me.go.kr</td>                                                                      '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>책임기관명</th>                                                                                                    '+
			'            <td colspan=\"5\">환경부 정보화담당관실(044-201-6422, biolmj@korea.kr)</td>                                                '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>요약설명</th>                                                                                                     '+
			'            <td colspan=\"5\">환경부에서 2001년 제작된 토지피복도</td>                                                                     '+
			'        </tr>                                                                                                              '+
			'    </tbody>                                                                                                               '+
			'</table>                                                                                                                   '+
			'                                                                                                                           '+
			'<br />                                                                                                                     '+
			'                                                                                                                           '+
			'                                                                                                                           '+
			'<table class=\"meta\" summary=\"\">                                                                                            '+
			'	<colgroup>                                                                                                                '+
			'    	<col width=\"110\" />                                                                                                   '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'        <col />                                                                                                            '+
			'    </colgroup>                                                                                                            '+
			'    <tbody>                                                                                                                '+
			'    	<tr>                                                                                                                  '+
			'        	<th>기준계명칭</th>                                                                                                    '+
			'            <td colspan=\"5\">평명직각좌표계(TM)(중부원점)</td>                                                                         '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>기준타원체</th>                                                                                                    '+
			'            <td>Bessel</td>                                                                                                '+
			'            <th>기준좌표계</th>                                                                                                 '+
			'            <td>측지학적기준계</td>                                                                                               '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>동쪽경계</th>                                                                                                     '+
			'            <td>126.2480291</td>                                                                                           '+
			'            <th>서쪽경계</th>                                                                                                  '+
			'            <td>126.4980058</td>                                                                                           '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>남쪽경계</th>                                                                                                     '+
			'            <td>33.7532267</td>                                                                                            '+
			'            <th>북쪽경계</th>                                                                                                  '+
			'            <td>34.0031973</td>                                                                                            '+
			'        </tr>                                                                                                              '+
			'        <tr>                                                                                                               '+
			'        	<th>행정지역범위</th>                                                                                                   '+
			'            <td colspan=\"3\"></td>                                                                                          '+
			'        </tr>                                                                                                              '+
			'</table>                                                                                                                   '+
			'</body>                                                                                                                    '+
			'</html>                                                                                                                    '
			
		}]
	}],
	initComponent: function(){
		console.info(this);
		//store : Ext.create('KRF_DEV.store.krad.krad_tmp'),
		
		//localStorage['_kradGroupInfo_']
		//[{id: kk, name: kk, checked: true}, {{id: kk, name: kk, checked: true}]
		this.callParent();
		
		//console.info(localStorage['_searchConfigInfo_']);
		/*if(localStorage['_searchConfigInfo_'] != null && localStorage['_searchConfigInfo_'] != undefined){
			
			confInfo = localStorage['_searchConfigInfo_'];
			
			if(confInfo != undefined && confInfo != null){
				//console.info(JSON.parse(confInfo));
				var jsonConf = JSON.parse(confInfo);
				this.items.items[1].setValue(jsonConf.isJiDraw);
			}
			else{
				//console.info(checked);
				var saveObj = {isBonDraw:true, isJiDraw:true};
				localStorage['_searchConfigInfo_'] = JSON.stringify(saveObj);
			}
		}*/
	}

});