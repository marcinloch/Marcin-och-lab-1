let whereposition 
let map 
let marker 
let websocket
let imie 

function initMap() {

   whereposition = {
       lat: 52,
       lng: 20
   };//Rynek główny, Adaś

    map = new google.maps.Map(
      document.getElementById('mapa'), {
          zoom: 3, 
          center: whereposition
        });

    marker = new google.maps.Marker({ 
        position: whereposition, 
        map: map,
        icon: 'target.svg'
    });

    navigator.geolocation.getCurrentPosition( udostepnina_lokalizacja ,nie_udestepniona )

   //window.addEventListener( 'keydown', dodajKlawiszIWyswietl )
   //window.addEventListener( 'keyup', function(event) {
   //    przycisnieteKlawisze.delete(event.key || event.keyCode);
   //  });
   ////window.onkeydown = moveMarkerIWyswietl;
   //startWebSocket()
}

function udostepnina_lokalizacja( event ){

    currentPosition = {
        lat: event.coords.latitude,
        lng: event.coords.longitude
    };

    map.setCenter( currentPosition )
    marker.setPosition( currentPosition )

    ustawID()

}
function nie_udestepniona(event){
    document.getElementById(`gps`).style.display=`flex`
}
