Ext.define('AM.view.master.JobCode', {
    extend: 'AM.view.Worksheet',
    alias: 'widget.jobcodeProcess',
	 
		
		items : [
			{
				xtype : 'jobcodelist' ,
				flex : 1 
			} 
		]
});