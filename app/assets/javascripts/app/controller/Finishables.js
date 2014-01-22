Ext.define('AM.controller.Finishables', {
  extend: 'Ext.app.Controller',

  stores: ['JobSummaries'],
  models: ['JobSummary'],

  views: [
    'operation.finishable.List' 
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'finishablelist'
		} 
	],

  init: function() {
    this.control({
      'finishablelist': {
				afterrender : this.loadObjectList,
      },
       
			'finishablelist textfield[name=searchField]': {
				change: this.liveSearch
			}
		
    });
  },

	liveSearch : function(grid, newValue, oldValue, options){
		var me = this;

		me.getJobSummariesStore().getProxy().extraParams = {
		    livesearch: newValue,
				is_finishable : true 
		};
	 
		me.getJobSummariesStore().load();
	},
 

	loadObjectList : function(me){
		// console.log("************* IN THE USERS CONTROLLER: afterRENDER");
		me.getStore().getProxy().extraParams = {
		    is_finishable: true
		};
		me.getStore().load();
	},
 
});
