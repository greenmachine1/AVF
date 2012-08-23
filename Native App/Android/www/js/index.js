var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
    	
    	// note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    	
    	 function checkconnection(){
            
            var networkState = navigator.network.connection.type;

            
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.NONE]     = 'No network connection';

            
            // if user does not have a network connection, tell them to connect to something
            if (states[networkState] === 'No network connection')
            {
                alert("Please connect to either cell connection or Wifi");
            }
           
            alert('Connection type: ' + states[networkState]);

            
        }
       
        // alerts the user of their current location 
        var successfulLocation = function(position){
        	// position
            navigator.geolocation.getCurrentPosition();
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
        
        var destinationType;
        var pictureSource;
        
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;

        // actual camera function
        function cameraFunction(){
                // Take picture using device camera and retrieve image as base64-encoded string
                navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
        }
        
        function onPhotoDataSuccess(imageData){
            // Get image handle
            //
            var smallImage = document.getElementById('smallImage');
            
            // Unhide image elements
            //
            smallImage.style.display = 'block';
            
            // Show the captured photo
            // The inline CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;
        }

        
    
        
        function onPhotoURISuccess(imageURI){
            var largeImage = document.getElementById('largeImage');
            
            // Unhide image elements
            //
            largeImage.style.display = 'block';
            
            // Show the captured photo
            // The inline CSS rules are used to resize the image
            //
            largeImage.src = imageURI;
        }
        
        
        function getPhoto(source) {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                        destinationType: destinationType.FILE_URI,
                                        sourceType: source });
        }

       
        
        function onFail(message) {
            alert('Failed because: ' + message);
        }
        
        // calls on the geolocation portion of the app
        newRoutine();
        
        
        // calls on the check type of connection routine
        checkconnection();
        

        // launches the camera function
        /*var takePhotoButton = document.getElementById('thisButton');
        takePhotoButton.addEventListener('click', cameraFunction,false); */
        
       // document.getElementById('displayPhoto').setAttribute('onclick', 'getPhoto(pictureSource.PHOTOLIBRARY)');
           
        //showPhotoButton.addEventListener('click', getPhoto(pictureSource.PHOTOLIBRARY), false);
        
        
    },
    report: function(id) {
        console.log("report:" + id);
    //     hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    } 
    
    
};