var url = MakeURL(window);
Ext.Date.defaultFormat = "d-m-Y H:i:s";

function doEnterAction(event) {
    var target = event.target;
    var targetEl = Ext.get(target.id),
        fieldEl = targetEl.up('[class*=x-field]') || {},
        field = Ext.getCmp(fieldEl.id);

    if (field && field.isExpanded)
      return true;

    if (event.which === 13 &&
        field &&
        field.isValid() &&
        field.xtype != "textareafield") {
        var next = field.nextNode('[isFormField]'), i = 0;
        while (next && (next.hidden || next.disabled) && i < 100) {
            next = next.nextNode('[isFormField]');
            i++;
        }

        if (next) {
            next.focus();
            event.preventDefault();
            return false;
        }
    }

    return true;
}

function showInfo(infoTxt, opt_IsDebug){
  if (opt_IsDebug){
    console.log(infoTxt);
    return;
  }


  infoTxt = infoTxt ? infoTxt:'undefined';
    toast = Ext.toast({
      html: infoTxt,
      closable: false,
      align: 't',
      slideInDuration: 400,
      autoCloseDelay: 6608,
      minWidth: 400
    });
}

/**
 * Генерирует URL для службы SQL запросов
 * @returns {string} URL до службы
 */
function MakeURL(win) {
    return win.location.protocol + "//"+win.location.host + "/";
}

/**
 @function ExecQuery
 Выполнение запроса на сервере
 @param query - путь до метода
 @param params - параметры запроса
 @param success_func - имя функции-обработчика успешного выполнения запроса
 @param error_func - имя функции-обработчика неудачного выполнения запроса
 @param linkObject - объект, содержащий ссылки на внешние объекты
 */
function ExecQuery(query, params, success_func, error_func, linkObject) {
  function responseProcess(data, xhr){
    success_func(data, linkObject);
  }

  function _error_(a,b,c,d){
    error_func(a, b, c, linkObject);
  }

    $.ajax({
      url: url+query,
      type: 'GET',
      timeout:600000,
      data: params,
      dataType: 'json',
      success: responseProcess,	// --- success
      error: _error_	// --- error
    });
}

/**
 * Создает хранилище по массиву объектов
 * @param data
 * @param opt_storeID
 * @returns {*}
 */
function makeStore(data, opt_storeID){
    if (!data.length){
        return null;
    }
    if (!opt_storeID){
        if (!this.storeIDNum)
            this.storeIDNum = 0;
        this.storeIDNum = this.storeIDNum+1;
        opt_storeID = 'storeID'+this.storeIDNum;
    }
    var fields = [];
    for (key in (data[0])){
        fields.push(key);
    }
    var store1 = Ext.create('Ext.data.Store', {
        fields: fields,
        storeID: opt_storeID,
        data : data
    });
    return store1;
}

function getUserType(numType){
    var txtRole;
    switch (numType) {
        case 0:
            txtRole = 'повар';
            break;
        case 1:
            txtRole = 'снабженец';
            break;
        case 2:
            txtRole = 'кладовщик';
            break;
        case 3:
            txtRole = 'администратор';
            break;
    }
    return txtRole;
}