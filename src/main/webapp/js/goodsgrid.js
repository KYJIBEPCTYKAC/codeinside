Ext.define('Rest.GoodsGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'goodsgrid',
  margins: '0 5 0 0',
  initComponent: function(){
    Ext.apply(this, {
      viewConfig: {
        emptyText: 'Нет данных для отображения',
        deferEmptyText: false
      },
      tools: [
        {
          type: 'plus',
          tooltip: 'Добавить',
          scope: this,
          handler: this.addGoods.bind(this)
        },
        {
          type: 'refresh',
          tooltip: 'Обновить',
          scope: this,
          handler: this.reloadGoods.bind(this)
        }
      ]

    });
    this.callParent();
    setTimeout(this.startLoad.bind(this),100);

  },
  startLoad: function(){
     ExecQuery('goods/getlist', [], this.loadListComplete.bind(this), this.loadListError.bind(this));

  },
  columnsList:[
    {
      flex:1,
      text: 'Товар',
      flex: 1,
      sortable: true,
      minWidth: 80,
      dataIndex: 'name'
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
  reloadGoods: function(){
    this.startLoad();
  },
  addGoods: function(){

  },
  loadListComplete: function(data){
    var tmpStore = makeStore(data);
    this.reconfigure(tmpStore, this.columnsList);
  },
  loadListError: function(a,b,c){
      showInfo("Ошибка загрузки");
  }
});
