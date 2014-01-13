Ext.define('AM.controller.Jobs', {
  extend: 'Ext.app.Controller',

  stores: ['Jobs', 'Drafts'],
  models: ['Job'],

  views: [
	'operation.draft.List',
    'operation.job.List',
		'operation.job.Form',
		'operation.Job',
		'operation.JobList'
  ],

  	refs: [
		{
			ref : "wrapper",
			selector : "jobProcess"
		},
		{
			ref : 'parentList',
			selector : 'jobProcess operationjobList'
		},
		{
			ref: 'list',
			selector: 'draftlist'
		},
		{
			ref : 'searchField',
			selector: 'joblist textfield[name=searchField]'
		}
	],

  init: function() {
    this.control({
			'jobProcess operationjobList' : {
				afterrender : this.loadParentObjectList,
				selectionchange: this.parentSelectionChange,
			},
	
      'operationjobList': {
        // itemdblclick: this.editObject,
        selectionchange: this.selectionChange,
				destroy : this.onDestroy
				// afterrender : this.loadObjectList,
      }, 

			'operationjobList button[action=addObject]': {
        click: this.addObject
      },

			'jobform button[action=save]': {
        click: this.updateObject
      },
 
      'operationjobList button[action=collectObject]': {
        click: this.collectObject
      },
      'operationjobList button[action=confirmObject]': {
        click: this.confirmObject
      },
      
			'jobProcess operationjobList textfield[name=searchField]': {
        change: this.liveSearch
      },

			'operationjobList button[action=collectObject]': {
        click: this.collectObject
			}	,
		 
			'operationjobList button[action=confirmObject]': {
        click: this.confirmObject
			}	,
			 
    });
  },

	onDestroy: function(){
		// console.log("on Destroy the savings_entries list ");
		this.getJobsStore().loadData([],false);
	},

	liveSearch : function(grid, newValue, oldValue, options){
		// console.log("This is the live search from WeeklyCollectios");
		var me = this;

		me.getGroupLoansStore().getProxy().extraParams = {
		    livesearch: newValue
		};
	 
		me.getGroupLoansStore().load();
	},
 

	loadObjectList : function(me){
		me.getStore().load();
	},
	
	loadParentObjectList: function(me){
		console.log("after render the jobs controller list");
		me.getStore().getProxy().extraParams = {};
		me.getStore().load(); 
	},
	
	addObject: function() {
		console.log("addObject function");
    var view = Ext.widget('jobform');
    view.show();
  },

	updateObject: function(button) {
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getJobsStore();
    var record = form.getRecord();
    var values = form.getValues();

		
		if( record ){
			record.set( values );
			 
			form.setLoading(true);
			record.save({
				success : function(record){
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					store.load();
					win.close();
				},
				failure : function(record,op ){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
				
			 
		}else{
			//  no record at all  => gonna create the new one 
			var me  = this; 
			var newObject = new AM.model.Job( values ) ;
			
			// learnt from here
			// http://www.sencha.com/forum/showthread.php?137580-ExtJS-4-Sync-and-success-failure-processing
			// form.mask("Loading....."); 
			form.setLoading(true);
			newObject.save({
				success: function(record){
					//  since the grid is backed by store, if store changes, it will be updated
					store.load();
					form.setLoading(false);
					win.close();
					
				},
				failure: function( record, op){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
		} 
  },

  

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();
  
    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }
  },

	parentSelectionChange: function(selectionModel, selections) {
		var me = this; 
    var grid = me.getList();
		var parentList = me.getParentList();
		var wrapper = me.getWrapper();
		
		
		// console.log("parent selection change");
		// console.log("The wrapper");
		// console.log( wrapper ) ;

    if (selections.length > 0) {
			// grid.enableAddButton();
      // grid.enableRecordButtons();
    } else {
			// grid.disableAddButton();
      // grid.disableRecordButtons();
    }
		
		 
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

	collectObject: function(){
		var view = Ext.widget('collectjobform');
		var record = this.getList().getSelectedObject();
		view.setParentData( record );
    view.show();
		// this.reloadRecordView( record, view ) ; 
	},
	
	executeCollect: function(button){
		var me = this; 
		var win = button.up('window');
    var form = win.down('form');
		var list = this.getList();

    var store = this.getJobsStore();
		var record = this.getList().getSelectedObject();
    var values = form.getValues();
 
		if(record){
			var rec_id = record.get("id");
			record.set( 'collected_at' , values['collected_at'] );
			 
			// form.query('checkbox').forEach(function(checkbox){
			// 	record.set( checkbox['name']  ,checkbox['checked'] ) ;
			// });
			// 
			form.setLoading(true);
			record.save({
				params : {
					collect: true 
				},
				success : function(record){
					form.setLoading(false);
					
					me.reloadRecord( record ) ; 
					
					
					win.close();
				},
				failure : function(record,op ){
					// console.log("Fail update");
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					record.reject(); 
					// this.reject(); 
				}
			});
		}
	},
	
	confirmObject: function(){
		var view = Ext.widget('confirmjobform');
		var record = this.getList().getSelectedObject();
		view.setParentData( record );
    view.show();
		// this.reloadRecordView( record, view ) ; 
	},
	
	executeConfirm: function(button){
		var me = this; 
		var win = button.up('window');
    var form = win.down('form');
		var list = this.getList();

    var store = this.getJobsStore();
		var record = this.getList().getSelectedObject();
    var values = form.getValues();
 
		if(record){
			var rec_id = record.get("id");
			record.set( 'confirmed_at' , values['confirmed_at'] );
			 
			// form.query('checkbox').forEach(function(checkbox){
			// 	record.set( checkbox['name']  ,checkbox['checked'] ) ;
			// });
			// 
			form.setLoading(true);
			record.save({
				params : {
					confirm: true 
				},
				success : function(record){
					form.setLoading(false);
					
					me.reloadRecord( record ) ; 
					store.load();
					
					win.close();
				},
				failure : function(record,op ){
					// console.log("Fail update");
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					record.reject(); 
					// this.reject(); 
				}
			});
		}
	},
	
	reloadRecord: function(record){
		// console.log("Inside reload record");
		// console.log( record );
		var list = this.getList();
		var store = this.getList().getStore();
		var modifiedId = record.get('id');
		
		AM.model.GroupLoanWeeklyCollection.load( modifiedId , {
		    scope: list,
		    failure: function(record, operation) {
		        //do something if the load failed
		    },
		    success: function(record, operation) {
			
					recToUpdate = store.getById(modifiedId);
					recToUpdate.set(record.getData());
					recToUpdate.commit();
					list.getView().refreshNode(store.indexOfId(modifiedId));
		    },
		    callback: function(record, operation) {
		        //do something whether the load succeeded or failed
		    }
		});
	},

});
