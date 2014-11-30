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
      columns: this.columnsList,
      tools: [
        {
          xtype: 'datefield',
          format: 'd-m-Y',
          listeners: {
            boxready: function ( me, width, height, eOpts ){
              this.dateOrder = me;
            },
            scope:this
          }

        },
        {
          type: 'next',
          tooltip: 'Загрузить',
          scope: this,
          handler: this.loadPositions
        }
      ]

    });
    this.callParent();
  },
  columnsList: [
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
      dataIndex: 'ordered'
    },
    {
      text: 'Есть',
      sortable: true,
      width: 120,
      dataIndex: 'in_store'
    },
    {
      text: 'Заказ',
      sortable: true,
      width: 120,
      dataIndex: 'buy'
    },
    {
      sortable: false,
      xtype: 'actioncolumn',
      width: 40,
      items:
        [
          {
            tooltip: 'Редактировать',
            icon: 'icons/pen.png',
            handler: function(grid, rowIndex, colIndex)
            {
              grid.grid.editRow.bind(grid.grid)(grid, rowIndex, colIndex);

            }
          }

        ]
    }
  ],
  addPosition: function(){

  },
  loadPositions: function(){
    var tmpVal = this.dateOrder.getValue();
    if (!tmpVal){
      showInfo("Не выбрана дата!");
    }
    this.orderDate = tmpVal;
    this.reloadPositions();
  },
  loadPositionsComplete: function(data) {
    this.unmask();
    if (!data.length){
      tmpStore = this.getStore();
      if (tmpStore)
        tmpStore.removeAll();
    }
    var tmpStore = makeStore(data);
    this.reconfigure(tmpStore, this.columnsList);

  },
  loadPositionsError: function() {
    showInfo("Ошибка загрузки");
    this.unmask();
  },
  editRow: function(grid, rowIndex, colIndex){
    Ext.MessageBox.prompt('Редактировать количество', 'Введите количество товара:', function(btn, text) {
      if (text && btn=='ok'&& parseFloat(text)){
        var tmpItem = this.getStore().getAt(rowIndex).data;
        ExecQuery('merch/add', {
          userid: user.id,
          orderdate: this.orderDate,
          goodsid: tmpItem.goodsid,
          amount: parseFloat(text),
          matid: tmpItem.matid
        }, this.editRowComplete.bind(this),  this.editRowError.bind(this));
      }
    }.bind(this), false, false,this.getStore().getAt(rowIndex).data.buy);


  },
  editRowComplete: function(data){
    if (data){
      this.reloadPositions();
    }
    else{
      this.editRowError();
    }
  },
  editRowError: function(){
    showInfo("Ошибка редактирования");
  },
  reloadPositions: function(){
    ExecQuery('merch/getlist', {orderdate: this.orderDate, userid: user.id}, this.loadPositionsComplete.bind(this),  this.loadPositionsError.bind(this));
    this.mask("Загрузка");

  }

});
