Ext.define('AM.view.operation.draft.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.draftform',

  title : 'Add / Edit Draft',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
		
		// search the user to be assigned to the draft
		var remoteUserJsonStore = Ext.create(Ext.data.JsonStore, {
			storeId : 'user_search',
			fields	: [
			 				{
						name : 'user_name',
						mapping : "name"
					},
					{
						name : 'user_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_user',
				reader : {
					type : 'json',
					root : 'records', 
					totalProperty  : 'total'
				}
			},
			autoLoad : false 
		});
		
		// search the draft code to be assigned to the draft
		var remoteDraftCodeJsonStore = Ext.create(Ext.data.JsonStore, {
			storeId : 'draft_code_search',
			fields	: [
			 				{
						name : 'draft_code_code',
						mapping : "code"
					},
					{
						name : 'draft_code_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_draft_code',
				reader : {
					type : 'json',
					root : 'records', 
					totalProperty  : 'total'
				}
			},
			autoLoad : false 
		});
		
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
	      },
				{
	        xtype: 'hidden',
	        name : 'job_id',
	        fieldLabel: 'job_id'
	      },
				{
					xtype: 'displayfield',
					fieldLabel: 'Job:',
					name: 'job_code' ,
					value : '10' 
				},
				{
	        xtype: 'customdatetimefield',
	        name : 'dispatched_at',
	        fieldLabel: 'Mulai',
					dateCfg : {
						format: 'Y-m-d',
					},
					timeCfg : {
						increment : 15
					}
				},
				{
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

	setSelectedDraftCode: function( draft_code_id ){
		var comboBox = this.down('form').getForm().findField('draft_code_id'); 
		var me = this; 
		var store = comboBox.store; 
		// console.log( 'setSelectedMember');
		// console.log( store ) ;
		store.load({
			params: {
				selected_id : draft_code_id 
			},
			callback : function(records, options, success){
				me.setLoading(false);
				comboBox.setValue( draft_code_id );
			}
		});
	},
	
	setSelectedUser: function( user_id ){
		var comboBox = this.down('form').getForm().findField('user_id'); 
		var me = this; 
		var store = comboBox.store; 
		// console.log( 'setSelectedMember');
		// console.log( store ) ;
		store.load({
			params: {
				selected_id : user_id 
			},
			callback : function(records, options, success){
				me.setLoading(false);
				comboBox.setValue( user_id );
			}
		});
	},

	setComboBoxData : function( record){
		// console.log("gonna set combo box data");
		var me = this; 
		me.setLoading(true);
		
		
		
		// console.log("member_id: "+ record.get("member_id") );
		// console.log( "glp_id: " + record.get("group_loan_product_id") );
		me.setSelectedDraftCode( record.get("draft_code_id")  ) ;
		me.setSelectedUser( record.get("user_id")  ) ;
	},
	
	setParentData: function( record ){
		this.down('form').getForm().findField('job_code').setValue(record.get('code'));
		this.down('form').getForm().findField('job_id').setValue(record.get('id')); 
	},
});

