Ext.define('AM.view.master.jobcode.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.jobcodeform',

  title : 'Add / Edit JobCode',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
		// 	
		// var remoteJsonStore = Ext.create(Ext.data.JsonStore, {
		// 	storeId : 'role_search',
		// 	fields	: [
		// 	 				{
		// 				name : 'role_name',
		// 				mapping : "name"
		// 			},
		// 			{
		// 				name : 'role_id',
		// 				mapping : 'id'
		// 			}
		// 	],
		// 	proxy  	: {
		// 		type : 'ajax',
		// 		url : 'api/search_role',
		// 		reader : {
		// 			type : 'json',
		// 			root : 'records', 
		// 			totalProperty  : 'total'
		// 		}
		// 	},
		// 	autoLoad : false 
		// });
		
    this.items = [{
      xtype: 'form',
			msgTarget	: 'side',
			border: false,
      bodyPadding: 10,
			fieldDefaults: {
          labelWidth: 165,
					anchor: '100%'
      },
      items: [
				{
	        xtype: 'hidden',
	        name : 'id',
	        fieldLabel: 'id'
	      },{
	        xtype: 'textfield',
	        name : 'code',
	        fieldLabel: 'Code'
	      },{
					xtype: 'textarea',
					name : 'description',
					fieldLabel: 'Description'
				},
	  
			]
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  },

	// setComboBoxData : function( record){
	// 	// console.log("Inside the Form.. edit.. setComboBox data");
	// 	var role_id = record.get("role_id");
	// 	var comboBox = this.down('form').getForm().findField('role_id'); 
	// 	var me = this; 
	// 	var store = comboBox.store; 
	// 	store.load({
	// 		params: {
	// 			selected_id : role_id 
	// 		},
	// 		callback : function(records, options, success){
	// 			me.setLoading(false);
	// 			comboBox.setValue( role_id );
	// 		}
	// 	});
	// }
});

