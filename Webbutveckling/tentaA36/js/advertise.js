function buyOrSell() {
  if (document.getElementById("buyRadioBtn").checked) {
    console.log("inne i buy");
    document.getElementById("buyorsell").value = "buy";
    document.getElementById("labelComment").style.display = "none";
    document.getElementById("comment").style.display = "none";
  } else {
    console.log("inne i sell");
    document.getElementById("buyorsell").value = "sell";
    document.getElementById("labelComment").style.display = "block";
    document.getElementById("comment").style.display = "block";
  }
  return false;
}
