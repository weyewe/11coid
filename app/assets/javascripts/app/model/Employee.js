Ext.define('AM.model.Employee', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' }, 
    	{ name: 'name', type: 'string' } ,
			{ name: 'on_progress', type: 'int' } ,
			{ name: 'pending_submit', type: 'int' } ,
			{ name: 'pending_clearance', type: 'int' } ,
  	],
   
  	idProperty: 'id' ,proxy: {
			url: 'api/employees',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'employees',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { employee : record.data };
				}
			}
		}
	
  
});
