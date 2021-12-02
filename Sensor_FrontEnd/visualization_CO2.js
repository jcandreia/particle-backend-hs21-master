var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001

// initialise server-sent events
function initSSE() {
    if (typeof (EventSource) !== "undefined") {
        var url = rootUrl + "/api/events";
        var source = new EventSource(url);
        source.onmessage = (event) => {
            updateVariables(JSON.parse(event.data));
        };
    } else {
        alert("Your browser does not support server-sent events.");
    }
}
initSSE();


// Array, in dem alle empfangenen Lux-Werte gespeichert werden.
var allMeasurements = [];

// Maximaler Lux Level für die Berechnung des Prozentwerts und als maximaler Wert für das Chart.
var maxLevel = 2500;

// Diese Funktion wird immer dann ausgeführt, wenn ein neues Event empfangen wird.
function updateVariables(data) {

    if (data.eventName === "CO2_Level") {
        // Erhaltenen Wert in der Variable 'CO2' speichern
        var CO2 = Number(data.eventData);
        //console.log(lux);

        // Wert am Ende des Arrays 'allMeasurements' hinzufügen
        allMeasurements.push(CO2);

        // Wert in Prozent umrechnen und in 'level' speichern
        var level = CO2 * (100 / maxLevel);

        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        if (level < 800) {
            color = "Green";
        } else if (level < 1100){
            color = "Orange";
        }
        else if (level > 1100){
            color = "Red";
        }

        
        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + level + "%;"

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
        document.getElementById("CO2level-bar").style = colorStyle + widthStyle;

        // Text unterhalb des Balkens aktualisieren
        document.getElementById("CO2level-text").innerHTML = CO2 + " ppm"

         // Durchschnitt aller bisherigen Messungen berechnen und in 'luxAverage' speichern
        // var luxSum = 0;
        // for (var measurement of allMeasurements) {
        //     luxSum = luxSum + measurement;
        // }
        // var luxAverage = luxSum / allMeasurements.length;
        // //console.log(luxAverage);

        // // Durchschnittlichen Lux-Wert in Prozent umrechnen und als Balken und Text anzeigen
        // var levelAverage = luxAverage * (100 / maxLevel);
        // var widthStyleAverage = "width: " + levelAverage + "%;"
        // document.getElementById("luxlevel-average-bar").style = widthStyleAverage;
        // document.getElementById("luxlevel-average-text").innerHTML = luxAverage.toFixed(2) + " Lux"; // Auf 2 Nachkommastellen reduzieren

         // Wert im Chart hinzufügen
        addData(CO2);
    } 
   
}   

//////////////////////////////////
/////   Code für das Chart   /////
//////////////////////////////////

// Chart und Variablen 
var chartData, chartOptions, chart;
google.charts.load('current', { packages: ['line','corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Chart initialisieren. Diese Funktion wird einmalig aufgerufen, wenn die Page geladen wurde.
// function drawChart() {
//     // Daten mit dem Dummy-Wert ["", 0] initialisieren. 
//     // (Dieser Dummy-Wert ist nötig, damit wir das Chart schon anzeigen können, bevor 
//     // wir Daten erhalten. Es können keine Charts ohne Daten gezeichnet werden.)
//     chartData = google.visualization.arrayToDataTable([['Time', 'CO2',"Temp"], ["", 400,0]]);
//     // Chart Options festlegen
//     chartOptions = {
//         title: 'CO2 Gehalt',
//         hAxis: { title: 'Time' },
//         vAxis: { title: 'CO2' },
//         animation: {
//             duration: 300, // Dauer der Animation in Millisekunden
//             easing: 'out',
//         },
//         curveType: 'function', // Werte als Kurve darstellen (statt mit Strichen verbundene Punkte)
//         legend: 'none',
//         vAxis: {
//             // Range der vertikalen Achse
//             viewWindow: {
//                 min: 0,
//                 max: maxLevel
//             },
//         }
//     };
//     // LineChart initialisieren
//     chart = new google.visualization.LineChart(document.getElementById('CO2level-chart'));
//     chartData.removeRow(0); // Workaround: ersten (Dummy-)Wert löschen, bevor das Chart zum ersten mal gezeichnet wird.
//     chart.draw(chartData, chartOptions); // Chart zeichnen
// }

function drawChart() {

    // var button = document.getElementById('change-chart');
    // var chartDiv = document.getElementById('chart_div');

     chartData = google.visualization.arrayToDataTable([['Time', 'CO2',"Schwellwert"], ["", 400,1100]]);
    // chartData  = new google.visualization.DataTable();
    // chartData.addColumn('timeofday', 'localTime');
    // chartData.addColumn('number', 'CO2');
    // chartData.addColumn('number', 'Temp');

    // chartData.addRow([new Date().toLocaleTimeString(), 400, 0]);

    var chartOptions = {
        chart: {
          title: 'CO2'
        },
        width: 900,
        height: 500,
        series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'CO2'},
          1: {axis: 'Schwellwert'}
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            CO2: {label: 'CO2 (ppm)'},
            Temp: {label: 'Schwellwert'}
          }
        }
        //curveType: 'function'
      };

    // var classicOptions = {
    //   title: 'CO2 & Temperatur',
    //   width: 900,
    //   height: 500,
    //   // Gives each series an axis that matches the vAxes number below.
    //   series: {
    //     0: {targetAxisIndex: 0},
    //     1: {targetAxisIndex: 1}
    //   },
    //   vAxes: {
    //     // Adds titles to each axis.
    //     0: {title: 'CO2 (ppm)'},
    //     1: {title: 'Temp (Celsius)'}
    //   },
    //   hAxis: { title: 'Time' },
    //   vAxis: {
    //     viewWindow: {
    //     min: 0,
    //     max: maxLevel
    //     }
    //   }
    // };

    // LineChart initialisieren
    chart = new google.visualization.LineChart(document.getElementById('CO2level-chart'));
    //chart = new google.charts.Line(document.getElementById('CO2level-chart'));
    chart.draw(chartData, chartOptions); // Chart zeichnen
    chartData.removeRow(0); // Workaround: ersten (Dummy-)Wert löschen, bevor das Chart zum ersten mal gezeichnet wird.
//     chart = new google.visualization.LineChart(document.getElementById('CO2level-chart'));
//     chartData.removeRow(0); // Workaround: ersten (Dummy-)Wert löschen, bevor das Chart zum ersten mal gezeichnet wird.
//     chart.draw(chartData, chartOptions); // Chart zeichnen

  }

// Eine neuen Wert ins Chart hinzufügen
function addData(CO2) {

    if (allMeasurements.length > 1000) {
        // Älteste Messung in den Chartdaten entfernen 
        chartData.removeRow(0);
    }

    // aktuelles Datum/Zeit
    var date = new Date();
    // aktuelle Zeit in der Variable 'localTime' speichern
    var localTime = date.toLocaleTimeString();

    // neuen Wert zu den Chartdaten hinzufügen
    chartData.addRow([localTime, CO2, 1100]);

    // Chart neu rendern
    chart.draw(chartData, chartOptions);
}