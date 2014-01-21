Ext.define('AM.controller.AssignedJobs', {
  extend: 'Ext.app.Controller',

  stores: ['Jobs', 'Drafts'],
  models: ['Job'],

  views: [
		'operation.AssignedJob', 
		'operation.draft.List', 
		'operation.JobList'
  ],

  	refs: [
		{
			ref : "wrapper",
			selector : "assignedJobProcess"
		},
		{
			ref : 'parentList',
			selector : 'assignedJobProcess  operationjobList'
		},
		
		{
			ref: 'list',
			selector: 'assignedJobProcess draftlist'
		},
		{
			ref : 'searchField',
			selector: 'assignedJobProcess operationjobList textfield[name=searchField]'
		}
	],

  init: function() {
		// console.log("IN the init of AssignedJobs controller");
    this.control({
			'assignedJobProcess operationjobList' : {
				afterrender : this.loadParentObjectList,
				selectionchange: this.parentSelectionChange,
				'destroy' : this.onDestroy,
			},
	
			 
    });
		
		// console.log("After assigned jobs controller");
  },

	onDestroy: function(){
		// console.log("on Destroy the savings_entries list ");
		this.getJobsStore().loadData([],false);
		this.getDraftsStore().loadData([], false);
		this.getParentList().getStore().getProxy().extraParams = {};
	},

	
 
	liveSearch : function(grid, newValue, oldValue, options){
		// console.log("This is the live search from WeeklyCollectios");
		var me = this;

		me.getJobsStore().getProxy().extraParams = {
		    livesearch: newValue
		};
	 
		me.getJobsStore().load();
	},
 

	loadObjectList : function(me){
		me.getStore().load();
	},
	
	cleanUp: function(){
		this.getJobsStore().loadData([],false);
		this.getDraftsStore().loadData([], false);
		this.getParentList().getStore().getProxy().extraParams = {};
		this.getList().getStore().getProxy().extraParams = {};
	},
	
	loadParentObjectList: function(me){
		// console.log("after render the jobs controller list");
		// this.cleanUp();
		
		this.getJobsStore().loadData([],false);
		this.getDraftsStore().loadData([], false);
		// this.getParentList().getStore().getProxy().extraParams = {};
		// this.getList().getStore().getProxy().extraParams = {};
		
		
		// console.log("AssignedJob controller : Gonna load parent object list");
		me.getStore().getProxy().extraParams = {
			is_assigned_job : true
		};
		me.getStore().load(); 
	},
	 

  

  selectionChange: function(selectionModel, selections) {
	
		// var parentGrid = this.getParentList();
    var grid = this.getList();
  
    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }
  },

	parentSelectionChange: function(selectionModel, selections) {
		// console.log("parent selection change");
		var me = this; 
    var grid = me.getList();
		var parentList = me.getParentList();
		var wrapper = me.getWrapper();
		
		console.log("the parentList");
		console.log( parentList );
		
		console.log("The wrapper");
		console.log( wrapper );
		
	 
		
		 

    // if (selections.length > 0) {
    // 			// grid.enableAddButton();
    //     parentList.enableRecordButtons();
    //   } else {
    // 			// grid.disableAddButton();
    //     parentList.disableRecordButtons();
    //   }

		var parentList = wrapper.query('operationjobList')[0];
		console.log("The parent list ");
		console.log( parentList );
		
		 
		if (parentList.getSelectionModel().hasSelection()) {
			var row = parentList.getSelectionModel().getSelection()[0];
			var id = row.get("id"); 
			
			var title = "";
			if( row ){
				title = "Job : " + row.get("description");
			}else{
				title = "";
			}
			grid.setTitle( title );
			
			wrapper.selectedParentId = id ; 
		}
		
		grid.getStore().getProxy().extraParams.parent_id =  wrapper.selectedParentId ;
		grid.getStore().load(); 
  },
 
	  
	 

});
