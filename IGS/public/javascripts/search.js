function doSearch() {

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.status == 200) {
      var games = this.games;

    }
  };
  xhttp.open("GET", "/api/search", true);
  
  xhttp.send();
}
