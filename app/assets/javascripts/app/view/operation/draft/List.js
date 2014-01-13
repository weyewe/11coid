Ext.define('AM.view.operation.draft.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.draftlist',

  	store: 'Drafts', 
 

	initComponent: function() {
		this.columns = [
			// { header: 'ID_NUMBER', dataIndex: 'id_number'},
		 
			
			
			{	header: 'Code', dataIndex: 'code', flex: 1 },
			{	header: 'Description', dataIndex: 'description', flex: 1 },  
			{	header: 'Total Draft', dataIndex: 'total_draft', flex: 1 },
			 
			
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
		
	  



		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton  
						
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
		 
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable(); 
	}
});
