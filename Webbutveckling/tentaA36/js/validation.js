function validateAdvertiseForm() {
  var title = document.getElementById("title").value;
  var price = document.getElementById("price").value;
  var isbn = document.getElementById("isbn").value;
  var sellerName = document.getElementById("sellerName").value;
  var number = document.getElementById("number").value;
  returnValue = false;
  if (
    title.trim() == "" ||
    price.trim() == "" ||
    isbn.trim() == "" ||
    sellerName.trim() == "" ||
    number.trim() == ""
  ) {
    alert("Fyll i alla obligatoriska fält.");
  } else if (/^[0-9]+(-?[0-9]+)+$/.test(isbn) == false) {
    alert(
      "Fel isbn nummer. Bara siffror och bindesstreck. Måste sluta och börja med siffra"
    );
  } else if (/[0-9]/.test(number) == false) {
    alert("Endast siffror i telenummret.");
  } else {
    returnValue = true;
  }
  return returnValue;
}

function validateFranchiseForm() {
  var name = document.getElementById("franName").value;
  var nbr = document.getElementById("franNbr").value;
  var mail = document.getElementById("franEmail").value;
  returnValue = false;
  if (name.trim() == "" || nbr.trim() == "" || mail.trim() == "") {
    alert("Fyll i alla obligatoriska fält.");
  } else if (/[0-9]/.test(nbr) == false) {
    alert("Endast siffror i telenummret.");
  } else if (/@/.test(mail) == false) {
    alert("Skriv en giltig email.");
  } else {
    returnValue = true;
  }
  return returnValue;
}
