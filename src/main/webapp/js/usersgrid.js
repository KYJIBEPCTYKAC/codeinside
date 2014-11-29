Ext.define('Rest.UsersGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'usersgrid',
  margins: '0 5 0 0',
  initComponent: function(){
    Ext.apply(this, {
      viewConfig: {
        emptyText: 'Нет данных для отображения',
        deferEmptyText: false
      },
      columns: this.columnsList,
      tools: [
        {
          type: 'plus',
          tooltip: 'Добавить',
          scope: this,
          handler: function (){
            this.createEditWin('Создать пользователя', null, 0, this.addUser);
          }
        },
        {
          type: 'refresh',
          tooltip: 'Обновить',
          scope: this,
          handler: this.reloadUsers.bind(this)
        }
      ]

    });
    this.callParent();
      setTimeout(this.startLoad.bind(this),100);
  },
  startLoad: function(){
    this.mask('Загрузка...');
    ExecQuery('user/getlist', [], this.loadListComplete.bind(this), this.loadListError.bind(this));

  },
  columnsList: [
    {
      flex:1,
      text: 'Пользователь',
      flex: 2,
      sortable: true,
      minWidth: 80,
      dataIndex: 'name'
    },
    {
      flex:1,
      text: 'Роль',
      flex: 1,
      sortable: true,
      minWidth: 80,
      dataIndex: 'type',
      renderer: function (value){
        return getUserType(value);
      }

    },
    {
      sortable: false,
      xtype: 'actioncolumn',
      width: 60,
      items:
        [
          {
            tooltip: 'Редактировать',
            icon: 'icons/pen.png',
            handler: function(grid, rowIndex, colIndex)
            {
              var tmpItem = grid.grid.getStore().getAt(rowIndex).data;
              grid.grid.curItem = tmpItem;
              grid.grid.curRow = rowIndex;
              grid.grid.createEditWin.bind(grid.grid)('Редактировать пользователя', tmpItem, 1, grid.grid.updUser.bind(grid.grid));
            }
          },
          {
            tooltip: 'Сменить пароль',
            icon: 'icons/pass.png',
            handler: function(grid, rowIndex, colIndex)
            {
              var tmpItem = grid.grid.getStore().getAt(rowIndex).data;
              grid.grid.curItem = tmpItem;
              grid.grid.curRow = rowIndex;
              grid.grid.createEditWin.bind(grid.grid)('Сменить пароль', tmpItem, 2, grid.grid.updUserPass.bind(grid.grid));

            }
          },
          {
//            iconCls: 'sell-col',
            tooltip: 'Удалить',
            icon: 'icons/del.gif',
            getClass: function(v, meta, rec) {
                var varID = rec.get('id');
                if ((typeof varID == 'undefined') || (varID == user.id)) return 'x-hide-display';
            },	// --- getClass
                handler: function(grid, rowIndex, colIndex)
            {
                grid.grid.delUser(rowIndex).bind(grid.grid);
            }
          }

        ]
    }
  ],
  delUser: function(rowIndex){
    var tmpID = this.getStore().getAt(rowIndex).data.id;
    ExecQuery('user/del',{id:tmpID}, this.delUserComplete.bind(this), this.delUserError.bind(this), rowIndex)
  },
  delUserComplete: function(data, rowIndex){
    if (data){
      this.getStore().removeAt(rowIndex);
    }
  },
  delUserError: function(data){
    showInfo("Ошибка удаления!");
  },
  reloadUsers: function(){
    this.startLoad();
  },
  addUser: function(){
    var pass1 = this.win.txtPassword1.getValue(), pass2 = this.win.txtPassword2.getValue(), login = this.win.txtLogin.getValue(), role = this.win.cmbRole.getValue();
    if (pass1!=pass2){
      showInfo("Пароли не совпадают!");
      return;
    }
    if (role == null){
      showInfo("Роль не выбрана!");
      return;
    }
    ExecQuery('user/add', {name: login, pass: pass1, type: role}, this.addUserComplete.bind(this), this.addUserError.bind(this));
    this.win.mask("Сохранение...");
  },
  addUserComplete: function(data) {
    this.win.close();
    this.getStore().add(data);
  },
  addUserError: function() {
    this.win.unmask();
    showInfo("Ошибка сохранения");
  },
  loadListComplete: function(data){
    var tmpStore = makeStore(data);
    this.reconfigure(tmpStore, this.columnsList);
    this.unmask();
  },
  loadListError: function(a,b,c){
    showInfo("Ошибка загрузки");
    this.unmask();
  },
  /**
   *
   * @param title
   * @param data
   * @param mode 0-new, 1 - edit, 2 - password
   */
  createEditWin: function(title, data, mode, callBack){
    var initLogin = "", initRole = null;
    if (data){
      initLogin = data.name;
      initRole = data.type;
    }
    this.win = Ext.create('Ext.window.Window', {
      title: title,
      width: 320,
      height: 196,
      layout: 'vbox',
      modal: true,
      listeners:{
        close: function() {
          this.win = null;
        }.bind(this)
      },
      items:[
        {
          xtype:'textfield',
          width: '100%',
          name: 'txtLogin',
          value: initLogin,
          disabled: (mode==2),
          margin: '5 5 5 5',
          labelWidth: 120,
          fieldLabel: 'Логин'
        },
        {
          xtype: 'textfield',
          width: '100%',
          inputType: 'password',
          disabled: (mode==1),
          name: 'txtPassword1',
          margin: '5 5 5 5',
          labelWidth: 120,
          fieldLabel: 'Пароль'
        },
        {
          xtype: 'textfield',
          width: '100%',
          inputType: 'password',
          disabled: (mode==1),
          name: 'txtPassword2',
          margin: '5 5 5 5',
          labelWidth: 120,
          fieldLabel: 'Пароль (проверка)'
        },
        {
          xtype: 'combo',
          width: '100%',
          name: 'cmbRole',
          store: Ext.create('Ext.data.Store', {
            fields: ['type', 'name'],
            data : [
              {"type":0, "name":"Повар"},
              {"type":1, "name":"Снабженец"},
              {"type":2, "name":"Кладовщик"},
              {"type":3, "name":"Администратор"}
            ]
          }),
          queryMode: 'local',
          displayField: 'name',
          valueField: 'type',
          disabled: (mode==2),
          editable: false,
          margin: '5 5 5 5',
          labelWidth: 120,
          fieldLabel: 'Роль пользователя'
        },
        {
          xtype: 'panel',
          width: '100%',
          layout: {
            type: 'hbox',
            align: 'stretch',
            pack: 'center'
          },
          items:[
            {
              xtype: 'button',
              name: 'buttonOK',
              text: 'Сохранить',
              scope: this,
              margin: 5,
              handler: callBack.bind(this)
            },
            {
              xtype: 'button',
              name: 'buttonCancel',
              text: 'Отмена',
              scope: this,
              margin: 5,
              handler: function () {
                this.win.close();
              }
            }]
        }

      ]
    });
    this.win.txtLogin = this.win.down('[name=txtLogin]');
    this.win.txtPassword1 = this.win.down('[name=txtPassword1]');
    this.win.txtPassword2 = this.win.down('[name=txtPassword2]');
    this.win.cmbRole = this.win.down('[name=cmbRole]');
    this.win.cmbRole.setValue(parseInt(initRole));
    this.win.show();
  },
  updUserPass: function(){
    var pass1 = this.win.txtPassword1.getValue(), pass2 = this.win.txtPassword2.getValue();
    if (pass1!=pass2){
      showInfo("Пароли не совпадают!");
      return;
    }
    var tmpObj = {id: this.curItem.id, pass: pass1};
    ExecQuery('user/updpass', tmpObj, this.updUserPassComplete.bind(this), this.updUserError.bind(this), tmpObj);
    this.win.mask("Сохранение...");

  },
  updUserPassComplete: function(data, tmpObj) {
    if (!data){
      this.updUserError();
      return;
    }
    this.win.close();
  },
  updUser: function(){
    var tmpObj = {id: this.curItem.id, name: this.win.txtLogin.getValue(), type: this.win.cmbRole.getValue()};
    ExecQuery('user/upd', tmpObj, this.updUserComplete.bind(this), this.updUserError.bind(this), tmpObj);
    this.win.mask("Сохранение...");
  },
  updUserComplete: function(data, tmpObj) {
    if (!data){
      this.updUserError();
      return;
    }
    var tmpItem = this.getStore().getAt(this.curRow);
    tmpItem.set('name', tmpObj.name, {dirty: false});
    tmpItem.set('type', tmpObj.type, {dirty: false});
    this.win.close();
  },
  updUserError: function() {
    showInfo("Ошибка обновления!");
    this.win.unmask();
  }
});
