Ext.define('AM.view.operation.draft.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.draftlist',

  	store: 'Drafts', 
 

	initComponent: function() {
		this.columns = [
			// { header: 'ID_NUMBER', dataIndex: 'id_number'},
		 
			
			
			{	header: 'Code', dataIndex: 'code', flex: 1 },
			{	header: 'Dispatch', dataIndex: 'dispatched_at', flex: 1 },
			{	header: 'Description', dataIndex: 'description', flex: 1 },  
			{	header: 'Finish', dataIndex: 'finished_at', flex: 1 },
			{	header: 'Submit', dataIndex: 'submitted_at', flex: 1 },
			{	header: 'Clear', dataIndex: 'cleared_at', flex: 1 },
			{	header: 'Status', dataIndex: 'clearance_status_text', flex: 1 },
			 
			
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete',
			action: 'deleteObject',
			disabled: true
		});
		
		this.finishObjectButton = new Ext.Button({
			text: 'Finish',
			action: 'finishObject',
			disabled: true
		});
		
		this.submitObjectButton = new Ext.Button({
			text: 'Submit',
			action: 'submitObject',
			disabled: true
		});
		
		this.clearObjectButton = new Ext.Button({
			text: 'Clear',
			action: 'clearObject',
			disabled: true
		});
		
		
	  



		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton,
		  		'->',
					this.finishObjectButton,
					'-',
					this.submitObjectButton,
					'-',
					this.clearObjectButton,
						
		];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		this.deleteObjectButton.enable();
		
		this.finishObjectButton.enable(); 
		this.submitObjectButton.enable(); 
		this.clearObjectButton.enable(); 
		
		
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable();
		 
		this.finishObjectButton.disable();
		this.submitObjectButton.disable();
		this.clearObjectButton.disable(); 
		
	}
});
