Ext.define('AM.view.master.user.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.userform',

  title : 'Add / Edit User',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
	
		var remoteJsonStore = Ext.create(Ext.data.JsonStore, {
			storeId : 'role_search',
			fields	: [
	 				{
						name : 'role_name',
						mapping : "name"
					},
					{
						name : 'role_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_role',
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
	      },{
	        xtype: 'textfield',
	        name : 'name',
	        fieldLabel: ' Name'
	      },{
					xtype: 'textfield',
					name : 'email',
					fieldLabel: 'Email'
				},
				{
					fieldLabel: 'Role',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'role_name',
					valueField : 'role_id',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : remoteJsonStore , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{role_name}">' +  
													'<div class="combo-name">{role_name}</div>' +  
							 					'</div>';
						}
					},
					name : 'role_id' 
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

	setComboBoxData : function( record){
	
		var role_id = record.get("role_id");
		var comboBox = this.down('form').getForm().findField('role_id'); 
		var me = this; 
		var store = comboBox.store; 
		store.load({
			params: {
				selected_id : role_id 
			},
			callback : function(records, options, success){
				me.setLoading(false);
				comboBox.setValue( role_id );
			}
		});
	}
});

Ext.define('AM.view.master.user.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.userlist',

  	store: 'Users', 
 

	initComponent: function() {
		this.columns = [
			{ header: 'ID', dataIndex: 'id'},
			{ header: 'Nama',  dataIndex: 'name', flex: 1},
			{	header: 'Email', dataIndex: 'email', flex: 1 }
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add User',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit User',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete User',
			action: 'deleteObject',
			disabled: true
		});
		
		this.searchField = new Ext.form.field.Text({
			name: 'searchField',
			hideLabel: true,
			width: 200,
			emptyText : "Search",
			checkChangeBuffer: 300
		});



		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton, this.searchField ];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable();
	}
});
