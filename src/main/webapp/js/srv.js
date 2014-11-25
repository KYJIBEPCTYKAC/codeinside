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
