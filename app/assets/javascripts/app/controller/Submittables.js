Ext.define('AM.controller.Submittables', {
  extend: 'Ext.app.Controller',

  stores: ['JobSummaries'],
  models: ['JobSummary'],

  views: [
    'operation.submittable.List' 
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'submittablelist'
		} 
	],

  init: function() {
    this.control({
      'submittablelist': {
				afterrender : this.loadObjectList,
      },
       
			'submittablelist textfield[name=searchField]': {
				change: this.liveSearch
			}
		
    });
  },

	liveSearch : function(grid, newValue, oldValue, options){
		var me = this;

		me.getJobSummariesStore().getProxy().extraParams = {
		    livesearch: newValue,
				is_submittable : true 
		};
	 
		me.getJobSummariesStore().load();
	},
 

	loadObjectList : function(me){
		// console.log("************* IN THE USERS CONTROLLER: afterRENDER");
		me.getStore().getProxy().extraParams = {
		    is_submittable: true
		};
		me.getStore().load();
	},
 
});
