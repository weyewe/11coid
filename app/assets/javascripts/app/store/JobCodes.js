Ext.define('AM.store.JobCodes', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.JobCode'],
  	model: 'AM.model.JobCode',
  	// autoLoad: {start: 0, limit: this.pageSize},
		autoLoad : false, 
  	autoSync: false,
	pageSize : 40, 
	
	
		
		
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	], 

	listeners: {

	} 
});
