Ext.define('Rest.CooksGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'cooksgrid',
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
        },
        {
          type: 'plus',
          tooltip: 'Добавить',
          scope: this,
          handler: this.addPosition
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
      text: 'Получено',
      sortable: true,
      width: 120,
      dataIndex: 'received'
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
              grid.grid.createEditWin(grid.grid.savePosition.bind(grid.grid), grid.grid.getStore().getAt(rowIndex));

            }
          },
          {
//            iconCls: 'sell-col',
            tooltip: 'Удалить',
            icon: 'icons/del.gif',
            handler: function(grid, rowIndex, colIndex)
            {
              grid.grid.delOrder(rowIndex).bind(grid.grid);

            }
          }

        ]
    }
  ],
  addPosition: function(){
    if (!this.orderDate){
      showInfo("Сначала надо открыть список заказов на день!");
      return;
    }
    this.createEditWin(this.savePosition.bind(this));
  },
  savePosition: function(){
    ExecQuery('povar/add', {userid: user.id, orderdate: this.orderDate, goodsid: this.win.cmbGoods.getValue(), amount:this.win.numAmount.getValue()}, this.savePositionComplete.bind(this),  this.savePositionError.bind(this));
    this.win.mask("Загрузка");
  },
  savePositionComplete: function(data){
    this.win.close();
    if (data.isexists){
      this.loadPositions(null,null,null,null,null,true);
      return;
    }
    this.getStore().add(data);
  },
  savePositionError: function(){
    this.win.unmask();
    showInfo("Ошибка добавления");
  },
  loadPositions: function(a,b,c,d,e,reload){
    if (!reload){
      var tmpVal = this.dateOrder.getValue();
      if (!tmpVal){
        showInfo("Не задана дата!");
        return;
      }
      this.orderDate = tmpVal;
    }
    ExecQuery('povar/getlist', {userid: user.id, orderdate: this.orderDate}, this.loadPositionsComplete.bind(this),  this.loadPositionsError.bind(this));
    this.mask("Загрузка");
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
  createEditWin: function(callBack, data){
    if (data)
      this.curData = data.data;
    else
      this.curData = undefined;
    this.win = Ext.create('Ext.window.Window', {
      title: 'Добавить товар',
      width: 320,
      height: 133,
      layout: 'vbox',
      modal: true,
      listeners:{
        close: function() {
          this.win = null;
        }.bind(this)
      },
      items:[
        {
          xtype:'customspinner',
          width: '100%',
          name: 'numAmount',
          value: 1,
          step:1,
          minValue: 0.001,
          margin: '5 5 5 5',
          labelWidth: 120,
          fieldLabel: 'Количество'
        },
        {
          xtype: 'combo',
          width: '100%',
          name: 'cmbGoods',
          queryMode: 'local',
          displayField: 'name',
          valueField: 'if',
          editable: false,
          margin: '5 5 5 5',
          labelWidth: 120,
          fieldLabel: 'Продукт'
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
    this.win.numAmount = this.win.down('[name=numAmount]');
    this.win.cmbGoods = this.win.down('[name=cmbGoods]');
    this.win.show();
    this.win.loadComplete = function(data){
      this.win.unmask();
      var store1 = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        storeID: 'id',
        data : data
      });

      this.win.cmbGoods.clearValue();
      this.win.cmbGoods.valueField = 'id';
      this.win.cmbGoods.displayField = 'name';

      this.win.cmbGoods.bindStore(store1);
      if (this.curData){
        this.win.cmbGoods.setValue(parseInt(this.curData.goodsid));
        this.win.numAmount.setValue(parseFloat(this.curData.ordered));
      }
      else
        this.cmbGoods.setValue(store1.getAt(0).data["id"]);
    };
    this.win.loadError = function(){
      showInfo("Ошибка загрузки списка товаров");
      this.unmask();
    };
    ExecQuery('goods/getlist', [], this.win.loadComplete.bind(this), this.win.loadError.bind(this.win));
    this.win.mask("Загрузка");
  },
  delOrder: function(rowIndex){
    var tmpID = this.getStore().getAt(rowIndex).data.matid;
    ExecQuery('povar/del',{matid:tmpID}, this.delOrderComplete.bind(this), this.delOrderError.bind(this), rowIndex)
    this.mask("Удаление...");
  },
  delOrderComplete: function(data, rowIndex){
    if (data){
      this.getStore().removeAt(rowIndex);
    }
    this.unmask();
  },
  delOrderError: function(data){
    showInfo("Ошибка удаления!");
    this.unmask();
  }

});
