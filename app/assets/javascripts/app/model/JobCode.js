Ext.define('AM.model.JobCode', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'code', type: 'string' },
			{ name: 'description', type: 'string' }  ,
			{ name: 'total_job', type: 'int' }  
  	],

	 


   
  	idProperty: 'id' ,

		proxy: {
			url: 'api/job_codes',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'job_codes',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { job_code : record.data };
				}
			}
		}
	
  
});
