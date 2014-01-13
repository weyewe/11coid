Ext.define('AM.store.Drafts', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.Draft'],
  	model: 'AM.model.Draft',
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
