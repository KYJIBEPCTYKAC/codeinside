Ext.define('Rest.PraporGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'praporgrid',
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
      sortable: true,
      width: 80,
      dataIndex: 'goodsname'
    },
    {
      flex:1,
      text: 'Повар',
      sortable: true,
      width: 80,
      dataIndex: 'povarname'
    },
    {
      text: 'Требуется',
      sortable: true,
      width: 120,
      dataIndex: 'ordered'
    },
    {
      text: 'Получено',
      sortable: true,
      width: 120,
      dataIndex: 'consumed'
    },
    {
      text: 'В наличии',
      sortable: true,
      width: 120,
      dataIndex: 'in_store'
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
  reloadPositions: function(){
    ExecQuery('prap/getlist', {orderdate: this.orderDate, userid: user.id}, this.loadPositionsComplete.bind(this),  this.loadPositionsError.bind(this));
    this.mask("Загрузка");

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
        if (parseFloat(text)>(parseFloat(tmpItem.in_store)+parseFloat(tmpItem.consumed))){
          showInfo("Нельзя отпустить продуктов больше, чем есть в наличии!");
          return;
        }
        ExecQuery('prap/add', {
          userid: user.id,
          povarid: tmpItem.povarid,
          orderdate: this.orderDate,
          goodsid: tmpItem.goodsid,
          amount: parseFloat(text),
          matid: tmpItem.consid
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
  }

});
