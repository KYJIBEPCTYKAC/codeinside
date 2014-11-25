(function (window, undefined)
{


    var app = Ext.application({
      name: 'rstmvn',
      launch: function() {
        triplex = Ext.create('Ext.container.Viewport', {
          title: 'Ресторан. Тестовое задание.',
          layout: 'fit',
          items:
            [
            ]
        });

    var loadMask = new Ext.LoadMask({
      target: triplex,
      msg:'Идет загрузка...'
    });

//        triplex.add({
//          xtype: 'login_win',
//          id: 'login_win',
//          loadMask: undefined
//        });

              
    triplex.show();
    var win = Ext.create('widget.window',{ // создание окна
    title: 'Авторизация',
    autoHeight: true,
//    autoScroll: true,           // скроллинг если текст не влезает.
//    maximizable: true,          // значок «раскрыть окно на весь экран»
    bodyCls:'red',              // установка класса для содержимого окна.
                                //Здесь .css1 {background:#fff;color:red;}
    bodyPadding:'10px',         // установка паддинга для содержимого.
                                // Лучше конечно через bodyCls
    bodyStyle: 'background-color:#fff', // прямое указание стиля для содержимого окна
    closeAction: 'hide',        // !!! Важно. Указание на то, что окно при закрывании
                                // не удаляется вместе с содержимым,

    shadow: true,               // тень
    draggable: true,            // возможность перетаскивания окна.
    closable:  false,            // спрятать иконку закрытия окна в заголовке
    modal: false,                //  modal задает модальное окно.
                                // При открсытии делает недоступными все остальные окна
    headerPosition: 'top', //  заголовок  и кнопку закрытия разместим
                                //справа {left, top, right, bottom}
    layout: {
        type: 'vbox',
        align: 'middle'
    },                                
    items:[              
            {
                xtype: 'textfield',
                width: '300',
                name: 'txt_login',
                margin: '0 0 5 0',
                labelWidth: 50,
                fieldLabel: 'Логин'
            },
            {
                xtype: 'textfield',
                width: '300',
                name: 'txt_password',
                margin: '0 0 5 0',
                labelWidth: 50,
                fieldLabel: 'Пароль'
            },
            {
                xtype: 'button',
                name: 'btn_ok',
                text: 'OK',
//                scope: this,
                margin: '0 0 0 20',
                width: 60
//                handler: this.onAdd
            },

    ]
    });
//    var loginWin = Ext.create('rstmvn.view.LoginWindow', {renderTo: triplex});
//    loginWin.show();
    win.show();
//        var win = Ext.getCmp('login_win');

        $(document).bind('keydown', {scope: win}, onKeyPress);

        function onKeyPress(event){
//          me = event.data.scope;
          var needHandle = true;

          if(event.which === 13){
            needHandle = doEnterAction(event);

            if (!needHandle)
              return false;
          }

          if (!me.defaultControl)
            return;

          if(event.which === 27){

            }
        }
        
            showInfo("Загрузка завершена");
      }
    });

})(window);

