Ext.define('AM.view.operation.AssignedJob', {
    extend: 'AM.view.Worksheet',
    alias: 'widget.assignedJobProcess',
	 
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		header: false, 
		headerAsText : false,
		selectedParentId : null,
		
		items : [
		// just the list
			{
				xtype : 'operationjobList',
				flex : 1,
				allowAdd : false , 
				allowEdit : false , 
				allowLiveSearch : false,
			},
			
			{
				xtype : 'draftlist',
				// html: "another shite",
				flex : 2,
				allowAdd : false, 
				allowEdit : false , 
				allowDelete : false,
				allowFinish : false, 
				allowSubmit : false,
				allowClear : false ,
			}, 
			
			// maybe another
			// {
			// 	xtype : 'joblist',
			// 	flex : 2
			// },
			
		]
});