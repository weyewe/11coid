Ext.define('AM.view.operation.draft.FinishDraftForm', {
  extend: 'Ext.window.Window',
  alias : 'widget.finishdraftform',

  title : 'Finish Draft',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
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
	        name : 'finished_at',
	        fieldLabel: 'Selesai Internal',
					dateCfg : {
						format: 'Y-m-d',
					},
					timeCfg : {
						increment : 15
					}
				}
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
