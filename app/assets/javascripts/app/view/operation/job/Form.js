Ext.define('AM.view.operation.job.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.jobform',

  title : 'Add / Edit Job',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
		
		// search the user to be assigned to the job
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
		
		// search the job code to be assigned to the job
		var remoteJobCodeJsonStore = Ext.create(Ext.data.JsonStore, {
			storeId : 'job_code_search',
			fields	: [
			 				{
						name : 'job_code_code',
						mapping : "code"
					},
					{
						name : 'job_code_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_job_code',
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
					fieldLabel: 'User',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'user_name',
					valueField : 'user_id',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : remoteUserJsonStore , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{user_name}">' +  
													'<div class="combo-name">{user_name}</div>' + 
							 					'</div>';
						}
					},
					name : 'user_id' 
				},
				{
					fieldLabel: 'Job Code',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'job_code_code',
					valueField : 'job_code_id',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : remoteJobCodeJsonStore , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{job_code_code}">' +  
													'<div class="combo-name">{job_code_code}</div>' + 
							 					'</div>';
						}
					},
					name : 'job_code_id' 
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

	setSelectedJobCode: function( job_code_id ){
		var comboBox = this.down('form').getForm().findField('job_code_id'); 
		var me = this; 
		var store = comboBox.store; 
		// console.log( 'setSelectedMember');
		// console.log( store ) ;
		store.load({
			params: {
				selected_id : job_code_id 
			},
			callback : function(records, options, success){
				me.setLoading(false);
				comboBox.setValue( job_code_id );
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
		me.setSelectedJobCode( record.get("job_code_id")  ) ;
		me.setSelectedUser( record.get("user_id")  ) ;
	}
});

