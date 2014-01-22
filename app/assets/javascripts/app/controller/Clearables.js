Ext.define('AM.controller.Clearables', {
  extend: 'Ext.app.Controller',

  stores: ['JobSummaries'],
  models: ['JobSummary'],

  views: [
    'operation.clearable.List' 
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'clearablelist'
		} 
	],

  init: function() {
    this.control({
      'clearablelist': {
				afterrender : this.loadObjectList,
      },
       
			'clearablelist textfield[name=searchField]': {
				change: this.liveSearch
			}
		
    });
  },

	liveSearch : function(grid, newValue, oldValue, options){
		var me = this;

		me.getJobSummariesStore().getProxy().extraParams = {
		    livesearch: newValue
		};
	 
		me.getJobSummariesStore().load();
	},
 

	loadObjectList : function(me){
		// console.log("************* IN THE USERS CONTROLLER: afterRENDER");
		me.getStore().getProxy().extraParams = {
		    is_clearable: true
		};
		me.getStore().load();
	},
 
});
