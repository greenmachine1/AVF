var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
       
        // alerts the user of their current location 
        var successfulLocation = function(position){
            
            // taking the latitude and longitude coords and putting them into variables
            var lat = position.coords.latitude;
            var longi = position.coords.longitude;
            { enableHighAccuracy: true };
            
            
           
            var mapFunction = function(){
            // splitting up the main string to allow variables in between
            var urlString = "http://maps.googleapis.com/maps/api/staticmap?center=";
            var secondPortionOfString = "&zoom=13&size=100x100&maptype=roadmap&markers=color:blue%7Clabel:S%7C";
            var thirdPortionOfString = "&sensor=true";
            
            // targetting the img tag and setting its attributes
            var locationElement = document.getElementById("imgOfMap");
            
            // taking the url string, inserting lat variable, then inserting longi variable,
            // then inserting info for the location tag, then the last part of the string.
            locationElement.setAttribute("src", urlString+lat+","+longi+secondPortionOfString+lat+","+longi+thirdPortionOfString);
            }
            // notification of your longitude and latitude
            navigator.notification.alert(lat + '\n' + longi + '\n',mapFunction(),"Your Location", "Location");
        }
        // calls on the navigator.geolocation.getcurrent() function
        var newRoutine = function(){
            navigator.geolocation.getCurrentPosition(successfulLocation);
        }
        
        newRoutine();
        
        console.log("Hello, im ready");
        console.log("hello");
        
    
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
   // report: function(id) {
        console.log("report:" + id);
         hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
    
    
};