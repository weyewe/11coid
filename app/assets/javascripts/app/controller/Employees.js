Ext.define('AM.controller.Employees', {
  extend: 'Ext.app.Controller',

  stores: ['Employees'],
  models: ['Employee'],

  views: [
    'operation.employee.List' 
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'employeelist'
		} 
	],

  init: function() {
    this.control({
      'employeelist': {
        selectionchange: this.selectionChange,
				afterrender : this.loadObjectList,
      },  
		
    });
  },

	liveSearch : function(grid, newValue, oldValue, options){
		var me = this;

		me.getEmployeesStore().getProxy().extraParams = {
		    livesearch: newValue
		};
	 
		me.getEmployeesStore().load();
	},
 

	loadObjectList : function(me){
		// console.log("************* IN THE USERS CONTROLLER: afterRENDER");
		me.getStore().load();
	},
   

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();

    if (selections.length > 0) {
      // grid.enableRecordButtons();
    } else {
      // grid.disableRecordButtons();
    }
  }

});
