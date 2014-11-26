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
      columns: this.columns,
      tools: [
        {
          type: 'plus',
          tooltip: 'Добавить',
          scope: this,
          handler: this.addUser
        },
        {
          type: 'refresh',
          tooltip: 'Обновить',
          scope: this,
          handler: this.reloadUsers
        }
      ]

    });
    this.callParent();
  },
  columns: [
    {
      flex:1,
      text: 'Товар',
      flex: 1,
      sortable: true,
      minWidth: 80,
      dataIndex: 'goodsname'
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

  },
  addGoods: function(){

  }

});
