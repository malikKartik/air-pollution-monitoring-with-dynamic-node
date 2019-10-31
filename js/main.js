var database = firebase.database();
var currentContent = 40
var currentContent1 = 60
var longi
var lati
var address
var color

navigator.geolocation.getCurrentPosition((pos)=>{
	lati=pos.coords.latitude
	longi=pos.coords.longitude
	// console.log(lati)
	// console.log(longi)
	address = Math.floor(lati/0.0002)+"_"+Math.floor(longi/0.0002)
	// console.log(address)
  var locRef = database.ref('locations/'+address) 
  locRef.once("value").then((snapshot)=>{
  // console.log(snapshot.exists())
  if(snapshot.exists()){
    var temp = snapshot.val().content
    temp = (temp + currentContent1)/2
    locRef.set({
      content: temp
    })
    if(temp>55){
      color = 'red'
    }
    else{
      color = 'green'
    }
  }
  else{
    locRef.set({
      content: currentContent
    })
    if(currentContent>55){
      color = 'red'
    }
    else{
      color = 'green'
    }
  }

  
	var mymap = L.map('mapid').setView([lati, longi], 20);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2FydGlrbWFsaWsiLCJhIjoiY2sxdnNubXJrMGkwcTNibzZrNWkyMm9waiJ9.U-3RSbfauGFCAhzy415Lrg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);
  
  var marker = L.marker([lati, longi]).addTo(mymap);
  var circle = L.circle([lati, longi], {
    color: color,
    fillColor: color,
    fillOpacity: 0.5,
    radius: 3
  }).addTo(mymap);
  })
})
