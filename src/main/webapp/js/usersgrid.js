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
          handler: this.addUser.bind(this)
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
      width: 40,
      items:
        [
          {
//            iconCls: 'sell-col',
            tooltip: 'Редактировать',
            icon: 'icons/pen.png',
            handler: function(grid, rowIndex, colIndex)
            {

            }
          },
          {
//            iconCls: 'sell-col',
            tooltip: 'Удалить',
            icon: 'icons/del.gif',
            handler: function(grid, rowIndex, colIndex)
            {

            }
          }

        ]
    }
  ],
  reloadUsers: function(){
      this.startLoad();
  },
  addUser: function(){

  },
  loadListComplete: function(data){
      var tmpStore = makeStore(data);
      this.reconfigure(tmpStore, this.columnsList);
      this.unmask();
  },
  loadListError: function(a,b,c){
      showInfo("Ошибка загрузки");
      this.unmask();
  }

});
