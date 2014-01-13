Ext.define('AM.model.Draft', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'job_id', type: 'int' },
			{ name: 'job_code', type: 'string' }  ,
			
			{ name: 'user_name', type: 'string' } ,
			{ name: 'user_id', type: 'int' } ,
			
			{ name: 'description', type: 'string' } ,
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
