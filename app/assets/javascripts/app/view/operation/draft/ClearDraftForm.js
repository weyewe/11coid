Ext.define('AM.view.operation.draft.ClearDraftForm', {
  extend: 'Ext.window.Window',
  alias : 'widget.cleardraftform',

  title : 'Clear Draft',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
	
		var localJsonStoreClearanceStatusCase = Ext.create(Ext.data.Store, {
			type : 'array',
			storeId : 'clearance_status_search',
			fields	: [ 
				{ name : "clearance_status"}, 
				{ name : "clearance_status_text"}  
			], 
			data : [
				{ clearance_status : 1, clearance_status_text : "Approved"},
				{ clearance_status : 2, clearance_status_text : "Rejected"}
			] 
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
					xtype: 'displayfield',
					fieldLabel: 'Job',
					name: 'job_code' 
				},
				{
	        xtype: 'customdatetimefield',
	        name : 'cleared_at',
	        fieldLabel: 'Konfirmasi Selesai',
					dateCfg : {
						format: 'Y-m-d',
					},
					timeCfg : {
						increment : 15
					}
				},
				{
					fieldLabel: 'Status Konfirmasi',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'clearance_status_text',
					valueField : 'clearance_status',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : localJsonStoreClearanceStatusCase , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{clearance_status_text}">' +  
													'<div class="combo-name">{clearance_status_text}</div>' +  
							 					'</div>';
						}
					},
					name : 'clearance_status' 
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

	setParentData: function( record ) {
		this.down('form').getForm().findField('job_code').setValue(record.get('code')); 
		// this.down('form').getForm().findField('downpayment_amount').setValue(record.get('downpayment_amount')); 
	}
});
