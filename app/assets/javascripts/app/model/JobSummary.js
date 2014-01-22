Ext.define('AM.model.JobSummary', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
			{ name: 'job_code' , type : 'string'},
			{ name: 'banner_code' , type : 'string'},
			{ name: 'banner_code_description' , type : 'string'},
			{ name: 'description' , type : 'string'},
			{ name: 'revision_count' , type : 'string'},
			{ name: 'job_dispatched_at' , type : 'string'},
			{ name: 'draft_dispatched_at' , type : 'string'},
			{ name: 'finished_at' , type : 'string'},
			{ name: 'submitted_at' , type : 'string'},
			{ name: 'cleared_at' , type : 'string'},
			
    
  	],

 


   
  	idProperty: 'id' ,

		proxy: {
			url: 'api/job_summaries',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'job_summaries',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { job_summary : record.data };
				}
			}
		}
	
  
});
