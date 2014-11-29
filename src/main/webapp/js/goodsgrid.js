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
                Ext.MessageBox.prompt('Редактировать товар', 'Введите наиманование товара:', function(btn, text) {
                    if (text && btn=='ok'){
                        var tmpID = this.getStore().getAt(rowIndex).data.id;
                        if (!tmpID)
                            return;
                        var tmpObj = {id: tmpID, name: text};
                        ExecQuery("goods/upd", tmpObj, this.updGoodsComplete.bind(this), this.updGoodsError.bind(this), {rowIndex:rowIndex, name: text});
                    }
                }.bind(grid.grid));
            }
          },
          {
//            iconCls: 'sell-col',
            tooltip: 'Удалить',
            icon: 'icons/del.gif',
            handler: function(grid, rowIndex, colIndex)
            {
                grid.grid.delGoods.bind(grid.grid)(rowIndex);
            }
          }

        ]
    }
  ],
  updGoodsComplete: function(data, tmpObj){
      if (data.id<1){
          showInfo("Ошибка обновления!");
          return;
      }
      var tmpItem = this.getStore().getAt(tmpObj.rowIndex);
      tmpItem.set('name', tmpObj.name, {dirty: false});
  },
  updGoodsError: function(){
    showInfo("Ошибка обновления!");
  },
  reloadGoods: function(){
    this.startLoad();
  },
  addGoods: function(){
      Ext.MessageBox.prompt('Новый товар', 'Введите наиманование товара:', function(btn, text) {
          if (text && btn=='ok'){
              ExecQuery("goods/add", {name: text}, this.addGoodsComplete.bind(this), this.addGoodsError.bind(this));
          }
      }.bind(this));
  },
  addGoodsComplete: function(data){
    this.getStore().add(data);
  },
  addGoodsError: function(){
    showInfo("При добавлении товара произошла ошибка!");
  },
  delGoods: function(rowIndex){
      this.myRowIndex = rowIndex;
      Ext.MessageBox.confirm('Удаление', 'Вы действительно хотите удалить запись?', function(btn) {
              if (btn=='yes') {
                  var id = this.getStore().getAt(this.myRowIndex).data.id;
                  ExecQuery("goods/del", {id: id}, this.delGoodsComplete.bind(this), this.delGoodsError.bind(this));
              }
              }.bind(this));
  },
  delGoodsComplete: function(data){
      if (data){
          this.getStore().removeAt(this.myRowIndex);
      }
  },
  delGoodsError: function(a,b,c){
    showInfo("Ошибка удаления");
  },
  loadListComplete: function(data){
    var tmpStore = makeStore(data);
    this.reconfigure(tmpStore, this.columnsList);
  },
  loadListError: function(a,b,c){
      showInfo("Ошибка загрузки");
  }
});
