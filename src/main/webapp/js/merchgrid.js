Ext.define('Rest.MerchGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'merchgrid',
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
          xtype: 'datefield',
          format: 'd-m-Y'
        },
        {
          xtype: 'button',
          text: 'Загрузить'
        }
      ]

    });
    this.callParent();
  },
  columns: [
    {
      flex:1,
      text: 'Товар',
      flex: 2,
      sortable: true,
      width: 80,
      dataIndex: 'goodsname'
    },
    {
      text: 'Требуется',
      sortable: true,
      width: 120,
      dataIndex: 'goodsneed'
    },
    {
      text: 'Получено',
      sortable: true,
      width: 120,
      dataIndex: 'goodsgot'
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
  addPosition: function(){

  },
  reloadPositions: function(){

  }

});
