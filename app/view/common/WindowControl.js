Ext.define('KRF_DEV.view.common.WindowControl', {
	
	extend : 'Ext.window.Window',
	xtype : 'common-windowcontrol',
	cls: 'khLee-x-tab-active',
	
	/* option으로 받아올 부분
	 * 없으면 아래 기본값 */
	id: 'windowControl',
	title: 'Window',
	restore: true, // 이전크기 tool icon 표시
	maximize: true, // 최대화 tool icon 표시
	minimize: true, // 최소화 tool icon 표시
	width: 300,
	height: 300,
	/* option으로 받아올 부분 끝 */
	
	/* window 크기 및 위치 관련 */
	winSizeMode: 'normal', // size mode ex) normal, minimize, maximize
	preWidth: null,
	preHeight: null,
	preX: null,
	preY: null,
	/* window 크기 및 위치 관련 끝 */
	
	//renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'common-tabcontrol',
		autoReSize: true // window크기 조절시 자동 resize 여부
	}],
	
	initComponent: function(){
		
		var me = this;
		
		this.callParent();
		
		var toolCtl = [];
		
		// 이전크기 툴 추가
		if(this.restore == true){
			
			toolCtl.push({
				type: 'restore',
				hidden: true,
				handler: function(evt, toolEl, owner, tool){
					
					var window = owner.up('window');
					
					if(window != undefined && window.tools != undefined && window.tools.length > 0){
					
						for(var i = 0; i < window.tools.length; i++){
							if(window.tools[i].type == "restore"){
								window.tools[i].setHidden(true);
							}
							if(window.tools[i].type == "minimize"){
								window.tools[i].setHidden(false);
							}
							if(window.tools[i].type == "maximize"){
								window.tools[i].setHidden(false);
							}
						}
						
						if(me.winSizeMode == "minimize"){
							window.expand('', false);
						}
						
						me.winSizeMode = "normal";
						
						window.setWidth(me.preWidth);
						window.setHeight(me.preHeight);
						window.setX(me.preX);
						window.setY(me.preY);
						
						//console.info(me.items.items[0]);
						
						// window 아이템 resize
						if(me.items.items != undefined && me.items.items.length > 0){
							for(var i = 0; i < me.items.items.length; i++){
								if(me.items.items[i].autoReSize == true){
									me.items.items[i].setWidth(me.preWidth);
									me.items.items[i].setHeight(me.preWidth);
								}
							}
						}
						
					}
					
				}
			});
			
		}
		
		// 최소화 툴 추가
		if(this.minimize == true){
			
			toolCtl.push({
				type: 'minimize',
				handler: function(evt, toolEl, owner, tool){
					
					var window = owner.up('window');
					
					if(window != undefined && window.tools != undefined && window.tools.length > 0){
						
						for(var i = 0; i < window.tools.length; i++){
							if(window.tools[i].type == "restore"){
								window.tools[i].setHidden(false);
							}
							if(window.tools[i].type == "minimize"){
								window.tools[i].setHidden(true);
							}
							if(window.tools[i].type == "maximize"){
								window.tools[i].setHidden(true);
							}
						}
						
						if(me.winSizeMode == "normal"){
							me.preWidth = window.getWidth();
							me.preHeight = window.getHeight();
							me.preX = window.getX();
							me.preY = window.getY();
						}
						
						me.winSizeMode = "minimize";
						
						var centerContainer = KRF_DEV.getApplication().centerContainer;
						
						window.collapse();
						window.setWidth(150);
						window.alignTo(centerContainer, 'bl-bl');
						
					}
				}
			});
			
		}
		
		// 최대화 툴 추가
		if(this.maximize == true){
			
			toolCtl.push({
				type: 'maximize',
				handler: function(evt, toolEl, owner, tool){
					console.info(this.type);
					return;
					
					var window = owner.up('window');

					if(windowMode == "normal"){
						windowWidth = window.getWidth();
						windowHeight = window.getHeight();
						windowX = window.getX();
						windowY = window.getY();
					}
					
					windowMode = "maximize";
					
					console.info(this);
					
					window.expand('', false);
					window.setWidth(center.getWidth());
					window.setHeight(center.getHeight());
					window.setX(centerX);
					window.setY(centerY);
					
					//window.alignTo('center-panel', 'tl-br');
				}
			});
			
		}
		
		this.tools = toolCtl;
	}
		
});