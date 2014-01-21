
Ext.define('AM.view.operation.employee.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.employeelist',

  	store: 'Employees', 
 

	initComponent: function() {
		this.columns = [
			{ header: 'ID', dataIndex: 'id'},
			{ header: 'Nama',  dataIndex: 'name', flex: 1}, 
			{ header: 'On Progress',  dataIndex: 'on_progress', flex: 1}, 
			{ header: 'Pending Submit',  dataIndex: 'pending_submit', flex: 1}, 
			{ header: 'Pending Clearance',  dataIndex: 'pending_clearance', flex: 1}, 
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
 
});
