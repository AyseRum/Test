/*
   https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2018&dateTo=12/12/2018&partner=picky
 */



function parseDate(date){
var year = ""; 
var day = ""; 
var month = ""; 

for(let i = 0; i<4; i++){
    year = year + date[i]; 
}
for(let i = 5; i<7; i++){
    month = month + date[i]; 
}
for(let i = 8; i<10; i++){
    day = day + date[i]; 
}

var newDate = day+"/"+month+"/"+year;
return newDate;
}

function getFlights() {
var flights = [];
var coord = [];
var prefer = document.getElementById("layoversId");
var layOvers = prefer.options[prefer.selectedIndex].value;
var flyFrom = document.getElementById('cityFromId').value;
var to = document.getElementById('cityToId').value;
var dateFrom = parseDate(document.getElementById('dateFromId').value);
var dateTo = parseDate(document.getElementById('dateToId').value);
var stops = ""; 
var flightnos = "";
const HTTP = new XMLHttpRequest();
var url = 'https://api.skypicker.com/flights?flyFrom=' + flyFrom + '&fly_to=' + to + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&max_stopovers=' + layOvers;


HTTP.open("GET", url);
HTTP.send();

HTTP.onreadystatechange=(e)=>{
    var response = HTTP.responseText;
    obj = JSON.parse(response);

    for(let i = 0; i<obj.data.length; i++){
        if(obj.data[i].route.length-1==layOvers){
            flights.push(i);
        }
    }
    
    for (let i = 0; i<10; i++){
        stops = "";
        flightnos = "";
        if(layOvers>0){
            for(let j = 0; j<layOvers; j++){
                if(j>0){
                    stops = stops +"; ";
                    flightnos = flightnos + "-> ";
                }
                stops = stops + obj.data[flights[i]].route[j].cityTo;
                document.getElementsByClassName("layover")[i].innerHTML = stops;
                flightnos = flightnos + obj.data[flights[i]].route[j].flight_no;
                document.getElementsByClassName("flightno")[i].innerHTML = flightnos;
            }
            
            
        } else {
            document.getElementsByClassName("layover")[i].innerHTML = "-";
            document.getElementsByClassName("flightno")[i].innerHTML = obj.data[flights[i]].route[0].flight_no;
        }
        
        
//        coord.push(obj.data[flights[i]].route[0].lngFrom);
//        coord.push(obj.data[flights[i]].route[0].latFrom);
//        coord.push(obj.data[flights[i]].route[0].lngTo);
//        coord.push(obj.data[flights[i]].route[0].latTo);
        
        document.getElementsByClassName("from")[i].innerHTML = obj.data[flights[i]].route[0].cityFrom;
        
        document.getElementsByClassName("to")[i].innerHTML = obj.data[flights[i]].route[layOvers].cityTo;
        document.getElementsByClassName("pr")[i].innerHTML = obj.data[flights[i]].price + " " + obj.currency;
        document.getElementsByClassName("duration")[i].innerHTML = obj.data[flights[i]].fly_duration;
        
    }
    
    document.getElementById("table1").style.display = "inline-block";


    //getSuggestions(coord[0], coord[1], coord[2], coord[3]);
}
 //getSuggestions(coord[0], coord[1], coord[2], coord[3]);
}

//function getSuggestions(longFrom, latFrom, longTo, latTo){
//    var platform = new H.service.Platform({
//        'app_id': 'S97jeaUVRp7Ub3RdeEor',
//        'app_code': 'q3tH8KknwEzicV193HT-8A'
//    });    
//
//    // Retrieve the target element for the map:
//    var targetElement = document.getElementById('mapContainer');
//    
//    // Get the default map types from the platform object:
//    var defaultLayers = platform.createDefaultLayers();
//    
//    // Instantiate the map:
//    var map = new H.Map(
//        document.getElementById('mapContainer'),
//        defaultLayers.normal.map, {
//            zoom: 10,
//            center: {
//                lat: coord[0],
//                lng: coord[1]
//            }
//        });
//    
//    // Create the parameters for the routing request:
//    var routingParameters = {
//        // The routing mode:
//        'mode': 'fastest;car',
//        // The start point of the route:
//        'waypoint0': 'geo!50.1120423728813,8.68340740740811',
//        // The end point of the route:
//        'waypoint1': 'geo!52.5309916298853,13.3846220493377',
//        // To retrieve the shape of the route we choose the route
//        // representation mode 'display'
//        'representation': 'display'
//    };
//    
//    // Define a callback function to process the routing response:
//    var onResult = function (result) {
//        var route,
//            routeShape,
//            startPoint,
//            endPoint,
//            linestring;
//        if (result.response.route) {
//            // Pick the first route from the response:
//            route = result.response.route[0];
//            // Pick the route's shape:
//            routeShape = route.shape;
//    
//            // Create a linestring to use as a point source for the route line
//            linestring = new H.geo.LineString();
//    
//            // Push all the points in the shape into the linestring:
//            routeShape.forEach(function (point) {
//                var parts = point.split(',');
//                linestring.pushLatLngAlt(parts[0], parts[1]);
//            });
//    
//            // Retrieve the mapped positions of the requested waypoints:
//            startPoint = route.waypoint[0].mappedPosition;
//            endPoint = route.waypoint[1].mappedPosition;
//    
//            // Create a polyline to display the route:
//            var routeLine = new H.map.Polyline(linestring, {
//                style: {
//                    strokeColor: 'blue',
//                    lineWidth: 10
//                }
//            });
//    
//            // Create a marker for the start point:
//            var startMarker = new H.map.Marker({
//                lat: startPoint.latitude,
//                lng: startPoint.longitude
//            });
//    
//            // Create a marker for the end point:
//            var endMarker = new H.map.Marker({
//                lat: endPoint.latitude,
//                lng: endPoint.longitude
//            });
//    
//            // Add the route polyline and the two markers to the map:
//            map.addObjects([routeLine, startMarker, endMarker]);
//    
//            // Set the map's viewport to make the whole route visible:
//            map.setViewBounds(routeLine.getBounds());
//        }
//    };
//    
//    // Get an instance of the routing service:
//    var router = platform.getRoutingService();
//    
//    // Call calculateRoute() with the routing parameters,
//    // the callback and an error callback function (called if a
//    // communication error occurs):
//    router.calculateRoute(routingParameters, onResult,
//        function (error) {
//            alert(error.message);
//        });
//}
//
//}
