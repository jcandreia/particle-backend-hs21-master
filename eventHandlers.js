const logger = require('./db/logger.js');

exports.sendEvent = null;

exports.registerEventHandlers = function (source) {
    //source.addEventListener('MyEvent', handleMyEvent);
    // Register more event handlers here
    source.addEventListener('CO2_Level',  handleLevel);
    source.addEventListener('CO2_Status', handleStatus);
    source.addEventListener('CO2_Alarm', handleAlarm);
    source.addEventListener('Temperatur', handleTemp);
    source.addEventListener('Empfehlung', handleEmpf);
}

// function handleMyEvent(event) {
//     // read variables from the event
//     var data = {
//         eventName: event.type,
//         eventData: JSON.parse(event.data).data, // the value of the event
//         deviceId: JSON.parse(event.data).coreid,
//         timestamp: JSON.parse(event.data).published_at
//     };

//     //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

//     try {        
//         // you can add more properties to your data object
//         data.myMessage = "Hello World";

//         // TODO: do something meaningful with the data

//         // Log the event in the database
//         logger.logOne("MyDB", "MyEvent", data);

//         // send data to all connected clients
//         exports.sendEvent(data);
//     } catch (error) {
//         console.log("Could not handle event: " + JSON.stringify(event) + "\n");
//         console.log(error)
//     }
// }

function handleLevel(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

    try {        
        // you can add more properties to your data object
        //data.myMessage = "Hello World";

        // TODO: do something meaningful with the data

        // Log the event in the database
        //logger.logOne("MyDB", "CO2 Level", data);

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function handleStatus(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

    try {        
        // you can add more properties to your data object
        //data.myMessage = "Hello World";

        // TODO: do something meaningful with the data

        // Log the event in the database
        //logger.logOne("MyDB", "Kadenz", data);

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function handleAlarm(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

    try {        
        // you can add more properties to your data object
        //data.myMessage = "Hello World";

        // TODO: do something meaningful with the data

        // Log the event in the database
        //logger.logOne("MyDB", "Rep", data);

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}
function handleTemp(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
        };
    
        //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object
    
    try {        
        // you can add more properties to your data object
        //data.myMessage = "Hello World";
    
        // TODO: do something meaningful with the data
   
        // Log the event in the database
        //logger.logOne("MyDB", "Rep", data);
    
        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function handleEmpf(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

    try {        
        // you can add more properties to your data object
        //data.myMessage = "Hello World";

        // TODO: do something meaningful with the data

        // Log the event in the database
        //logger.logOne("MyDB", "Rep", data);

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}