/*
 * Complete the function below.
   Instead of returning the answer, log the answer to the console.
   https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2018&dateTo=12/12/2018&partner=picky
 */

function getFlights(flyFrom, to, dateFrom, dateTo) {
    const HTTP = new XMLHttpRequest();
    var url = 'https://api.skypicker.com/flights?flyFrom=' + flyFrom + '&to=' + to + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;
    HTTP.open("GET", url);
    HTTP.send();
    
    HTTP.onreadystatechange=(e)=>{
        var response = HTTP.responseText;
        obj = JSON.parse(response);
        console.log(obj[1]);
    }
}

getFlights('PRG', 'LGW', '18/11/2018', '12/12/2018');