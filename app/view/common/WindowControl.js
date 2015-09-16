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
						
						// 아이템 리사이즈
						me.setItemResize(me.items.items);
						
					}
					
				}
			});
			
		}
		
		// 최대화 툴 추가
		if(this.maximize == true){
			
			toolCtl.push({
				type: 'maximize',
				handler: function(evt, toolEl, owner, tool){
					
					var window = owner.up('window');
					
					if(window != undefined && window.tools != undefined && window.tools.length > 0){
						
						for(var i = 0; i < window.tools.length; i++){
							if(window.tools[i].type == "restore"){
								window.tools[i].setHidden(false);
							}
							if(window.tools[i].type == "minimize"){
								window.tools[i].setHidden(false);
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
						
						me.winSizeMode = "maximize";
						
						var centerContainer = KRF_DEV.getApplication().centerContainer;
						
						if(me.winSizeMode == "minimize"){
							window.expand('', false);
						}
						
						window.setWidth(centerContainer.getWidth());
						window.setHeight(centerContainer.getHeight() - centerContainer.header.getHeight());
						window.setX(centerContainer.getX());
						window.setY(centerContainer.getY() + centerContainer.header.getHeight());
						
						// 아이템 리사이즈
						me.setItemResize(me.items.items);
						
					}
				}
			});
			
		}
		
		this.tools = toolCtl;
	},

	// 내부 아이템 리사이즈
	setItemResize: function(items){
		
		var me = this;
		
		if(items != undefined && items.length > 0){
			
			for(var i = 0; i < items.length; i++){
				
				// autoReSize option이 true일 경우만..
				if(items[i].autoReSize == true){
					
					items[i].setWidth(me.preWidth);
					items[i].setHeight(me.preWidth);
					
				}
				
			}
			
		}
		
	}
		
});