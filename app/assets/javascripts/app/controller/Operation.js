Ext.define("AM.controller.Operation", {
	extend : "AM.controller.BaseTreeBuilder",
	views : [
		"operation.OperationProcessList",
		'OperationProcessPanel',
		'Viewport'
	],

	 
	
	refs: [
		{
			ref: 'operationProcessPanel',
			selector: 'operationProcessPanel'
		} ,
		{
			ref: 'operationProcessList',
			selector: 'operationProcessList'
		}  
	],
	

	 
	init : function( application ) {
		var me = this; 
		 
		// console.log("starting the init in Operation.js");
		me.control({
			"operationProcessPanel" : {
				activate : this.onActiveProtectedContent,
				deactivate : this.onDeactivated
			} 
			
		});
		
	},
	
	onDeactivated: function(){
		// console.log("Operation process panel is deactivated");
		var worksheetPanel = Ext.ComponentQuery.query("operationProcessPanel #operationWorksheetPanel")[0];
		worksheetPanel.setTitle(false);
		// worksheetPanel.setHeader(false);
		worksheetPanel.removeAll();		 
		var defaultWorksheet = Ext.create( "AM.view.operation.Default");
		worksheetPanel.add(defaultWorksheet); 
	},
	
	 

	setupFolder : {
		text 			: "Management", 
		viewClass : '',
		iconCls		: 'text-folder', 
    expanded	: true,
		children 	: [
        
			{ 
				text:'Job', 
				viewClass:'AM.view.operation.Job', 
				leaf:true, 
				iconCls:'text',
				conditions : [
				{
					controller : 'users',
					action : 'index'
				}
				]
			}, 
			{ 
				text:'Employee', 
				viewClass:'AM.view.operation.Employee', 
				leaf:true, 
				iconCls:'text',
				conditions : [
				{
					controller : 'drafts',
					action : 'index'
				}
				]
			},
			{ 
				text:'Pending Clearance', 
				viewClass:'AM.view.operation.Clearable', 
				leaf:true, 
				iconCls:'text',
				conditions : [
				{
					controller : 'drafts',
					action : 'index'
				}
				]
			},
    ]
	},
	
	personalFolder : {
		text 			: "Personal", 
		viewClass : '',
		iconCls		: 'text-folder', 
    expanded	: true,
		children 	: [
			{ 
				text:'Assigned Job', 
				viewClass:'AM.view.operation.AssignedJob', 
				leaf:true, 
				iconCls:'text',
				conditions : [
				{
					controller : 'users',
					action : 'index'
				}
				]
			} 
    ]
	},
	   
	 
	onActiveProtectedContent: function( panel, options) {
		var me  = this; 
		var currentUser = Ext.decode( localStorage.getItem('currentUser'));
		var email = currentUser['email'];
		
		me.folderList = [
			this.setupFolder,
			this.personalFolder
			// this.inventoryFolder,
			// this.reportFolder,
			// this.projectReportFolder
		];
		
		var processList = panel.down('operationProcessList');
		processList.setLoading(true);
	
		var treeStore = processList.getStore();
		treeStore.removeAll(); 
		
		treeStore.setRootNode( this.buildNavigation(currentUser) );
		processList.setLoading(false);
	},
});