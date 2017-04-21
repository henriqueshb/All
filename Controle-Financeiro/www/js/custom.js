var availableTags = [];
var storage = window.localStorage;

showErrorMessage = function(msg){
  alert(msg);
}

showMessage = function(msg){
  alert(msg);
}

addValue = function() {
  /*var storage = window.localStorage;
  var value = storage.getItem(key); // Pass a key name to get its value.
  storage.setItem(key, value) // Pass a key name and its value to add or update that key.
  storage.removeItem(key) // Pass a key name to remove that key from storage.*/
    var desc = $("#local").val();
    var value = $("#valor").val();    
    var OldValue = 0; // Pass a key name to get its value.
    var newValue = 0;

    if (desc == undefined || desc == null || desc == "")
    {
      showErrorMessage("Selecione o local da dispesa!");
      return;
    }

    if (value == undefined || value == null || value == "" || value == 0)
    {
      showErrorMessage("Selecione o valor gasto!");
      return;
    }

    OldValue = storage.getItem(desc);
    
    if (OldValue == undefined || OldValue == null || OldValue == "" || OldValue == 0)
      OldValue = 0;
    
    newValue = Number(OldValue) + Number(value);
    storage.setItem(desc, newValue.toFixed(2));

    showMessage("Total Gasto até agora: R$" + getTotal());
}

setEventButton = function(){
  $("#addNew").click(function() {
    addValue();
  })
}

loadAutoComplete = function() {
  availableTags = [
    "Supermercado", "Posto de Gasolina", "Lanches", "Jantas", "Presentes", "Pagamentos de Boletos", "Outros"
  ];
  
  $("#local").autocomplete({
    source: availableTags,
    select: function (event, ui) {
      return false;},
    select: function (event, ui) {
      $(this).val(ui.item ? ui.item : " ");
    },
    change: function (event, ui) {
    if (!ui.item) {
        this.value = '';}
    }
  });
}

getTotal = function() {
  var totals = 0;

  for(var cont = 0; cont < availableTags.length; cont++){
    
    var curValue =  currentKey(storage.getItem(availableTags[cont])); 
    
    if(curValue!=null)
      totals += curValue;
  }

  return totals;
}

currentKey = function(){
  var desc = $("#local").val();
  var dtKey = new Date(Date.now());
  return dtKey.getFullYear().toString() + dtKey.getMonth().toString() + desc;
}

currentKey = function(desc){
  var dtKey = new Date(Date.now());
  return dtKey.getFullYear().toString() + dtKey.getMonth().toString() + desc;
}

loadForm = function() {
  setEventButton();
  loadAutoComplete();
}

loadForm();