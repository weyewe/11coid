Ext.define('AM.model.Draft', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'job_id', type: 'int' },
			{ name: 'job_code', type: 'string' }  ,
			 
			
			{ name: 'description', type: 'string' } ,
			
			{ name: 'code', type: 'string' } ,
			
			{ name: 'dispatched_at', type: 'string' } ,
			
			{ name: 'is_submitted', type: 'boolean' } ,
			{ name: 'submitted_at', type: 'string' } ,
		 
			{ name: 'is_finished', type: 'boolean' } ,
			{ name: 'finished_at', type: 'string' } ,
			
			{ name: 'is_cleared', type: 'boolean' } ,
			{ name: 'cleared_at', type: 'string' } ,
			{ name: 'clearance_status', type: 'int' } ,
			{ name: 'clearance_status_text', type: 'string' } ,
			
  	],

  	idProperty: 'id' ,

		proxy: {
			url: 'api/drafts',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'drafts',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { draft : record.data };
				}
			}
		}
	
  
});
