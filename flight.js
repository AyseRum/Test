/*
   https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2018&dateTo=12/12/2018&partner=picky
 */

function changeElements(f, t, p, d, i) {

        document.getElementsByClassName("from")[i].innerHTML = f;
        document.getElementsByClassName("to")[i].innerHTML = t;
        document.getElementsByClassName("pr")[i].innerHTML = p;
        document.getElementsByClassName("duration")[i].innerHTML = d;
    
}


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
    var prefer = document.getElementById("prefer");
    var layOvers = prefer.options[prefer.selectedIndex].value;
    var flyFrom = document.getElementById('flyFrom').value;
    var to = document.getElementById('flyTo').value;
    var dateFrom = parseDate(document.getElementById('dateFrom').value);
    var dateTo = parseDate(document.getElementById('dateTo').value);
    var stops = ""; 
    
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
            if(layOvers>0){
                for(let j = 0; j<layOvers; j++){
                    if(j>0){
                        stops = stops +"; ";
                    }
                    stops = stops + obj.data[flights[i]].route[j].cityTo;
                }
                document.getElementsByClassName("layover")[i].innerHTML = stops;
                coord.push(obj.data[flights[i]].route[layOvers-1].lngTo);
                coord.push(obj.data[flights[i]].route[layOvers-1].latTo);
                
            } else {
                document.getElementsByClassName("layover")[i].innerHTML = "-";
                coord.push(obj.data[flights[i]].route[layOvers].lngTo);
                coord.push(obj.data[flights[i]].route[layOvers].latTo);
            }
            document.getElementsByClassName("from")[i].innerHTML = obj.data[flights[i]].route[0].cityFrom;
            document.getElementsByClassName("to")[i].innerHTML = obj.data[flights[i]].route[layOvers].cityTo;
            document.getElementsByClassName("pr")[i].innerHTML = obj.data[flights[i]].price + " " + obj.currency;
            document.getElementsByClassName("duration")[i].innerHTML = obj.data[flights[i]].fly_duration;
        }
        
        document.getElementById("table1").style.display = "inline-block";

        getSuggestions(coord[0], coord[1]);
        
    }
    
}

function getSuggestions(long, lat){
    var platform = new H.service.Platform({
        'app_id': 'S97jeaUVRp7Ub3RdeEor',
        'app_code': 'q3tH8KknwEzicV193HT-8A'
    });    
}
