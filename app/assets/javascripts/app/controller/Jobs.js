Ext.define('AM.controller.Jobs', {
  extend: 'Ext.app.Controller',

  stores: ['Jobs', 'Drafts'],
  models: ['Job'],

  views: [
		'operation.draft.List',
		'operation.draft.Form',
		'operation.draft.FinishDraftForm',
	
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
			selector: 'operationjobList textfield[name=searchField]'
		}
	],

  init: function() {
    this.control({
			'jobProcess operationjobList' : {
				afterrender : this.loadParentObjectList,
				selectionchange: this.parentSelectionChange,
				destroy : this.onDestroy,
				// beforeremove : this.onDeactivatePanel,
				// beforehide : this.onRemovePanel,
				// disable : this.onBeforeHide 
			},
	
      

			'operationjobList button[action=addObject]': {
        click: this.addObject
      },

			'jobform button[action=save]': {
        click: this.updateObject
      },
  
      
			'jobProcess operationjobList textfield[name=searchField]': {
        change: this.liveSearch
      },
 
			
			'draftlist button[action=addObject]': {
        click: this.addChildObject
      },
			'draftlist button[action=editObject]': {
        click: this.editChildObject
      },

			'draftform button[action=save]': {
        click: this.updateChildObject
      },

			'draftlist': {
				selectionchange: this.selectionChange, 
			},

			'draftlist button[action=deleteObject]': {
        click: this.deleteChildObject
      },

			'draftlist button[action=finishObject]': {
        click: this.finishChildObject
      },

			'finishdraftform button[action=save]' : {
				click : this.executeFinishDraft
			},
			
			'draftlist button[action=submitObject]': {
			        click: this.submitChildObject
			      },
			
			'submitdraftform button[action=save]' : {
				click : this.executeSubmitDraft
			},
			
			'draftlist button[action=clearObject]': {
			        click: this.clearChildObject
			      },
			
			'cleardraftform button[action=save]' : {
				click : this.executeClearDraft
			},
			 
    });
  },

	onDeactivatePanel: function(){
		console.log("On deactivate panel");
	},
	
	onRemovePanel : function(){
		console.log("on remove panel");
	},
	
	onBeforeHide: function(){
		console.log("on before hide");
	},

	onDestroy: function(){
		// console.log("on Destroy the savings_entries list ");
		// this.getJobsStore().loadData([],false);
		this.getJobsStore().loadData([],false);
		this.getDraftsStore().loadData([], false);
		this.getParentList().getStore().getProxy().extraParams = {};
		this.getList().getStore().getProxy().extraParams = {};
		
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
		this.cleanUp();
		// console.log("Jobs controller: after render the jobs controller list");
		me.getStore().getProxy().extraParams = {};
		me.getStore().load(); 
	},
	
	addObject: function() {
    var view = Ext.widget('jobform');
    view.show();
  },

	addChildObject: function(){
		// console.log("Adding child object");
		// var view = Ext.widget('draftform');
		//     view.show();

		var parentObject  = this.getParentList().getSelectedObject();
		if( parentObject) {
			var view = Ext.widget('draftform');
			view.show();
			view.setParentData(parentObject);
		}
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

	updateChildObject: function(button) {
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getDraftsStore();
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
			var newObject = new AM.model.Draft( values ) ;
			
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


	editChildObject: function() {
		var me = this; 
    var record = me.getList().getSelectedObject();
		var parentObject  = me.getParentList().getSelectedObject();
 

		
		if( parentObject) {
			var view = Ext.widget('draftform');
			view.show();
			view.down('form').loadRecord(record);
			view.setParentData(parentObject);
		}
  },

	

	deleteChildObject: function() {
    var record = this.getList().getSelectedObject();

    if (record) {
      var store = this.getDraftsStore();
      store.remove(record);
      store.sync();
// to do refresh programmatically
			this.getList().query('pagingtoolbar')[0].doRefresh();
    }

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
		var me = this; 
    var grid = me.getList();
		var parentList = me.getParentList();
		var wrapper = me.getWrapper();
		
		 

    if (selections.length > 0) {
			// grid.enableAddButton();
      parentList.enableRecordButtons();
    } else {
			// grid.disableAddButton();
      parentList.disableRecordButtons();
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
	
	
/*
	Change draft status
*/

	finishChildObject : function(){
		
		var me = this; 
    var record = me.getList().getSelectedObject();
		var parentObject  = me.getParentList().getSelectedObject();
 
		if( parentObject && record) {
			var view = Ext.widget('finishdraftform');
			view.show();
			view.down('form').loadRecord(record);
			// view.setParentData(parentObject);
		}
	},
	
	executeFinishDraft : function(button){
		var me = this; 
		var win = button.up('window');
    var form = win.down('form');

		// var parentRecord = this.getParentList().getSelectedObject();
	
    var store = this.getDraftsStore();
		var record = this.getList().getSelectedObject();
    // var record = form.getRecord();
    var values = form.getValues();

		// console.log("The record");
		// console.log( record ) ;
		// 
		// console.log("The values");
		// console.log( values ) ;

		form.setLoading( true ) ;
 
		
		if(record){
			var rec_id = record.get("id");
			record.set( values );
			 
			// form.query('checkbox').forEach(function(checkbox){
			// 	record.set( checkbox['name']  ,checkbox['checked'] ) ;
			// });
			// 
			form.setLoading(true);
			record.save({
				params : {
					update_finished_at: true 
				},
				success : function(record){
					// console.log("SUccess update");
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					// form.fireEvent('item_quantity_changed');
					store.load({
						params: {
							draft_id : rec_id
						}
					});
					
					win.close();
				},
				failure : function(record,op ){
					// console.log("Fail update");
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					
					this.reject(); 
				}
			});
		}
	},
	
	
	submitChildObject : function(){
		
		var me = this; 
    var record = me.getList().getSelectedObject();
		var parentObject  = me.getParentList().getSelectedObject();
 
		if( parentObject && record) {
			var view = Ext.widget('submitdraftform');
			view.show();
			view.down('form').loadRecord(record);
			// view.setParentData(parentObject);
		}
	},
	
	executeSubmitDraft : function(button){
		var me = this; 
		var win = button.up('window');
    var form = win.down('form');

		// var parentRecord = this.getParentList().getSelectedObject();
	
    var store = this.getDraftsStore();
		var record = this.getList().getSelectedObject();
    // var record = form.getRecord();
    var values = form.getValues();

		// console.log("The record");
		// console.log( record ) ;
		// 
		// console.log("The values");
		// console.log( values ) ;

		form.setLoading( true ) ;
 
		
		if(record){
			var rec_id = record.get("id");
			record.set( values );
			 
			// form.query('checkbox').forEach(function(checkbox){
			// 	record.set( checkbox['name']  ,checkbox['checked'] ) ;
			// });
			// 
			form.setLoading(true);
			record.save({
				params : {
					update_submitted_at: true 
				},
				success : function(record){
					// console.log("SUccess update");
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					// form.fireEvent('item_quantity_changed');
					store.load({
						params: {
							draft_id : rec_id
						}
					});
					
					win.close();
				},
				failure : function(record,op ){
					// console.log("Fail update");
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					
					this.reject(); 
				}
			});
		}
	},
	
	
	
	clearChildObject : function(){
		
		var me = this; 
    var record = me.getList().getSelectedObject();
		var parentObject  = me.getParentList().getSelectedObject();
 
		if( parentObject && record) {
			var view = Ext.widget('cleardraftform');
			view.show();
			view.down('form').loadRecord(record);
			// view.setParentData(parentObject);
		}
	},
	
	executeClearDraft : function(button){
		var me = this; 
		var win = button.up('window');
    var form = win.down('form');

		// var parentRecord = this.getParentList().getSelectedObject();
	
    var store = this.getDraftsStore();
		var record = this.getList().getSelectedObject();
    // var record = form.getRecord();
    var values = form.getValues();

		// console.log("The record");
		// console.log( record ) ;
		// 
		// console.log("The values");
		// console.log( values ) ;

		form.setLoading( true ) ;
 
		
		if(record){
			var rec_id = record.get("id");
			record.set( values );
			 
			// form.query('checkbox').forEach(function(checkbox){
			// 	record.set( checkbox['name']  ,checkbox['checked'] ) ;
			// });
			// 
			form.setLoading(true);
			record.save({
				params : {
					update_cleared_at: true 
				},
				success : function(record){
					// console.log("SUccess update");
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					// form.fireEvent('item_quantity_changed');
					store.load({
						params: {
							draft_id : rec_id
						}
					});
					
					win.close();
				},
				failure : function(record,op ){
					// console.log("Fail update");
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					
					this.reject(); 
				}
			});
		}
	},

});
