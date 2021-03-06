Ext.define('AM.model.Job', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'job_code_id', type: 'int' },
			{ name: 'job_code_code', type: 'string' }  ,
			{ name: 'job_code_description', type: 'string' }  ,
			{ name: 'user_id', type: 'int' } ,
			{ name: 'user_name', type: 'string' } ,
			{ name: 'description', type: 'string' } ,
			
			{ name: 'code', type: 'string' } ,
			
			{ name: 'dispatched_at', type: 'string' } ,
		 
			{ name: 'is_finished', type: 'boolean' } ,
			{ name: 'finished_at', type: 'string' } ,
  	],

	 


   
  	idProperty: 'id' ,

		proxy: {
			url: 'api/jobs',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'jobs',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { job : record.data };
				}
			}
		}
	
  
});
