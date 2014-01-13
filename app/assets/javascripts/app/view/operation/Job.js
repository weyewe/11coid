Ext.define('AM.view.operation.Job', {
    extend: 'AM.view.Worksheet',
    alias: 'widget.jobProcess',
	 
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
				flex : 1
			},
			
			{
				xtype : 'draftlist',
				// html: "another shite",
				flex : 2
			}, 
			
			// maybe another
			// {
			// 	xtype : 'joblist',
			// 	flex : 2
			// },
			
		]
});