Ext.define('AM.store.JobSummaries', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.JobSummary'],
  	model: 'AM.model.JobSummary',
  	// autoLoad: {start: 0, limit: this.pageSize},
		autoLoad : false, 
  	autoSync: false,
	pageSize : 20, 
	
	
		
		
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	], 

	listeners: {

	} 
});
