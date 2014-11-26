(function (window, undefined)
{
  var userID, userType, triplex;

  var app = Ext.application({
    name: 'rstmvn',
    launch: function ()
    {
      var tabs = Ext.create('Ext.tab.Panel', {
        id: 'resttabs',
        defaults: {
          autoScroll: true
        },
        items: [
        ]
      });

      triplex = Ext.create('Ext.container.Viewport', {
        title: 'Ресторан. Тестовое задание.',
        layout: 'fit',
        items: [
          tabs
        ]
      });
      var loadMask = new Ext.LoadMask({
        target: triplex,
        msg: 'Идет загрузка...'
      });

//        triplex.add({
//          xtype: 'login_win',
//          id: 'login_win',
//          loadMask: undefined
//        });


      triplex.show();
      var win = Ext.create('widget.window', { // создание окна
        title: 'Авторизация',
        autoHeight: true,
        bodyCls: 'red',
        bodyPadding: '10px',
        shadow: true,
        draggable: true,
        closable: false,
        modal: true,
        headerPosition: 'top',
        layout: {
          type: 'vbox',
          align: 'middle'
        },
        items: [
          {
            xtype: 'textfield',
            width: '300',
            id: 'txtLogin',
            margin: '0 0 5 0',
            labelWidth: 50,
            fieldLabel: 'Логин'
          },
          {
            xtype: 'textfield',
            width: '300',
            inputType: 'password',
            id: 'txtPassword',
            margin: '0 0 5 0',
            labelWidth: 50,
            fieldLabel: 'Пароль'
          },
          {
            xtype: 'button',
            id: 'btnOk',
            text: 'OK',
            scope: this,
            margin: '0 0 0 20',
            width: 60,
            handler: function ()
            {
              var txtLogin = Ext.getCmp('txtLogin');
              var txtPassword = Ext.getCmp('txtPassword');
              var btnOk = Ext.getCmp('btnOk');
              btnOk.setDisabled(true);
              ExecQuery("user/login", {name: txtLogin.getValue(), pass: txtPassword.getValue()}, loginComplete, loginError);
            }
          }

        ]
      });


      win.show();
//      CreateUsersTab(tabs);
//      CreateGoodsTab(tabs);
//      CreateMerchTab(tabs);
//      CreateCooksTab(tabs);
//      CreatePraporTab(tabs);
      function loginComplete(data)
      {
        userID = data.id;
        userType = data.type;

        if ((userID == -1) || (userType == -1)) {
          var btnOk = Ext.getCmp('btnOk');
          btnOk.setDisabled(false);
          showInfo("Ошибка авторизации!");
          return;
        }
        win.close();
        var txtRole = '';
        switch (userType) {
          case 0:
            txtRole = 'повар';
            CreateCooksTab(tabs);
            CreateGoodsTab(tabs);
            break;
          case 1:
            txtRole = 'снабженец';
            CreateMerchTab(tabs);
            break;
          case 2:
            txtRole = 'кладовщик';
            CreatePraporTab(tabs);
            break;
          case 3:
            txtRole = 'администратор';
            CreateUsersTab(tabs);
            CreateGoodsTab(tabs);
            break;
        }
        showInfo("Авторизация прошла успешно, роль: " + txtRole + ".");
      }

      function loginError(data)
      {
        showInfo("Ошибка авторизации!");
        var btnOk = Ext.getCmp('btnOk');
        btnOk.setDisabled(false);
      }

//        var win = Ext.getCmp('login_win');

      $(document).bind('keydown', {scope: win}, onKeyPress);

      function onKeyPress(event)
      {
//          me = event.data.scope;
        var needHandle = true;

        if (event.which === 13) {
          needHandle = doEnterAction(event);

          if (!needHandle)
            return false;
        }

        if (event.which === 27) {

        }
      }
    }
  });

  function CreateUsersTab(pTabs)
  {
    pTabs.add({
      title: 'Пользователи',
      layout: 'fit',
      items: [
        {
          xtype: 'usersgrid'
        }
      ]
    });
  }

  function CreateGoodsTab(pTabs)
  {
    pTabs.add({
      title: 'Товары, справочник',
      layout: 'fit',
      items: [
        {
          xtype: 'goodsgrid'
        }
      ]
    });
  }

  function CreateCooksTab(pTabs)
  {
    pTabs.add({
      title: 'Кухня, заказ продуктов',
      layout: 'fit',
      items: [
        {
          xtype: 'cooksgrid'
        }
      ]
    });
  }

  function CreateMerchTab(pTabs)
  {
    pTabs.add({
      title: 'Отдел снабжения, закупить продукты',
      layout: 'fit',
      items: [ {
        xtype: 'merchgrid'
      }
      ]

    });
  }

  function CreatePraporTab(pTabs)
  {
    pTabs.add({
      title: 'Кладовщик, отпуск продуктов',
      layout: 'fit',
      items: [
        {
          xtype: 'praporgrid'
        }
      ]
    });
  }
})(window);

