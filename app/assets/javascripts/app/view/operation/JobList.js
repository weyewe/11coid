Ext.define('AM.view.operation.JobList' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.operationjobList',

  	store: 'Jobs', 
   

		allowAdd : true , 
		allowEdit : true , 
		allowLiveSearch : true,

	initComponent: function() {
		this.columns = [
		
			{
				xtype : 'templatecolumn',
				// text : "Job",
				flex : 1,
				tpl : '<b>{code}</b>' + '<br />' + 
							'Banner Code: <b>{job_code_code}</b>' +   
							'<p style="padding-left: 4px;">{job_code_description}</p>' + '<br />'  + 
							'Employee: <b>{user_name}</b>'+ '<br />'  + '<br />'  +
							
							'Mulai: <b>{dispatched_at }</b>'+ '<br />'  + '<br />'  +
							'{description}'
			}, 
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
		
		
		this.searchField = new Ext.form.field.Text({
			name: 'searchField',
			hideLabel: true,
			width: 150,
			emptyText : "Search",
			checkChangeBuffer: 300
		});


		var me = this;
		me.tbar = [];
		// me.tbar = [ this.addObjectButton, this.editObjectButton,'->', this.searchField ];
		
		if( me.allowAdd){
			me.tbar.push( me.addObjectButton );
		}
		
		if( me.allowEdit){
			me.tbar.push( me.editObjectButton );
		}
		
		if( me.allowLiveSearch){
			me.tbar.push( '->' );
			me.tbar.push( me.searchField );
		}
		
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: "N/A" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		// this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		// this.deleteObjectButton.disable();
	}
});
