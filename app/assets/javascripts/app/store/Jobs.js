Ext.define('AM.store.Jobs', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.Job'],
  	model: 'AM.model.Job',
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
