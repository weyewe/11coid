Ext.define('AM.view.operation.clearable.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.clearablelist',

  	store: 'JobSummaries', 
 

	initComponent: function() {
		this.columns = [
			// { header: 'ID_NUMBER', dataIndex: 'id_number'},
		 
			// { name: 'id', type: 'int' },
			// 		{ name: 'job_code' , type : 'string'},
			// 		{ name: 'description' , type : 'string'},
			// 		{ name: 'revision_count' , type : 'string'},
			// 		{ name: 'job_dispatched_at' , type : 'string'},
			// 		{ name: 'draft_dispatched_at' , type : 'string'},
			// 		{ name: 'finished_at' , type : 'string'},
			// 		{ name: 'submitted_at' , type : 'string'},
			// 		// { name: 'cleared_at' , type : 'string'},
			
			{
				xtype : 'templatecolumn',
				flex : 1,
				tpl : '<b>{job_code}</b>' + '<br />' + 
							'<b>{banner_code}</b>' + 
							'<p>{banner_code_description}</p'
			},
			{	header: 'Banner Code', dataIndex: 'banner_code', flex: 1 },
			{	header: 'Description', dataIndex: 'description', flex: 1 },  
			{	header: 'Revision Code', dataIndex: 'revision_count', flex: 1 },
			{	header: 'Job Dispatch', dataIndex: 'job_dispatched_at', flex: 1 },
			{	header: 'Draft Dispatch', dataIndex: 'draft_dispatched_at', flex: 1 },
			{	header: 'Submit Time', dataIndex: 'submitted_at', flex: 1 },
			 
			
		];
 
		this.searchField = new Ext.form.field.Text({
			name: 'searchField',
			hideLabel: true,
			width: 200,
			emptyText : "Search",
			checkChangeBuffer: 300
		});
		 


		this.tbar = [ 
		 				'->',
						this.searchField 
						
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
	 
	},

	disableRecordButtons: function() {
	 
	}
});
