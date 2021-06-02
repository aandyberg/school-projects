function changeColor() {
  if (document.getElementById("aside-text").style.color == "pink") {
    document.getElementById("aside").style.color = "white";
    document.getElementById("aside-text").style.color = "black";
  } else {
    document.getElementById("aside").style.color = "pink";
    document.getElementById("aside-text").style.color = "pink";
  }
}

function showText(id) {
  console.log(window.location.href);
  if (document.getElementById("article-text" + id).style.display == "block") {
    document.getElementById("article-text" + id).style.display = "none";
  } else {
    document.getElementById("article-text" + id).style.display = "block";
  }
}

function emailReport() {
  console.log(window.location.href);
  document.getElementById("currentSide").value = window.location.href;
}
