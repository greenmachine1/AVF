// this is the main java script file for the web-app


// Author: Cory Green
// Date: 05/30/2012
// project: ASD



// function used to split the url to retrieve the id name :D



var urlVars = function(urlData){
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	// splitting the url first by the ? symbol then the &
	// urlParts [1] is the second half of the split while
	// urlParts [0] is the first half.
	
	//split again at the & symbol
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for(var pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};

// When passing the data from the #news page to this newBandPage, upon loading, do this!
$('#newBandPage').live("pageshow", function(){
	var newBandPage = urlVars()["newBandPage"];
	console.log(newBandPage);
	$.couch.db("gigbag").view("plugin/Bands", {
		key: newBandPage,
	})
	
	// works to retreive the object!
	$.couch.db("gigbag").openDoc("Band:"+ newBandPage, {
		success: function(data) {

			var bandName = data.bname[1];
			var nameOfPerson = data.fname[1];
			var genre = data.groups[1];
			var email = data.email[1];
			
			
			$('#nameFirst1').val(nameOfPerson);
			$('#bandNameFirst1').val(bandName);
			$('#genreFirst1').val(genre);
			$('#emailFirst1').val(email);
			
		},
		error: function(status){
			console.log(status);
	}
	
	});	
	
// my delete function	
 var deleteEntry = function(){
	 
	 var nameOfPerson1 = $('#nameFirst').val();
	 var nameOfBand = $('#bandNameFirst').val();
	 var nameOfGenre = $('#genreFirst').val();
	 var nameOfEmail = $('#emailFirst').val(); 
	 
	// used to get the rev id 
	$.couch.db("gigbag").openDoc("Band:"+ newBandPage,{
		success: function(data) {
			var rev = data._rev;
	
	 
	 var doc = {
		_id: "Band:"+nameOfBand,
		_rev: rev,
		bname: ["Band Name:", nameOfBand],
		email: ["Email:", nameOfEmail],
		fname: ["First name:", nameOfPerson1],
		groups: ["Genre", nameOfGenre]
	 };
	 		// request to delete data
	 		$.couch.db("gigbag").removeDoc(doc, {
	 			success: function(data){
	 				alert("This band Has been deleted!");
	 			}
	 		});
		}
	});
	
 }
 	$('#deleteInfoButton').bind('click', deleteEntry);
 
	// the saveInfo button click event
	$('#saveInfoButton1').bind('click', saveInfoEdit);
	
	$('#newBandPageItems').listview('refresh');
});

//setting up to fill in my input fields with the JSON data
var saveInfo = function(){

var nameOfPerson1 = $('#nameFirst').val();
var nameOfBand = $('#bandNameFirst').val();
var nameOfGenre = $('#genreFirst').val();
var nameOfEmail = $('#emailFirst').val(); 
		
	// creation of a new document object to hold all my variable json data
	var doc = {
		_id: "Band:"+nameOfBand, //nameOfBand
		bname: ["Band Name:", nameOfBand],
		email: ["Email:", nameOfEmail],
		fname: ["first name:", nameOfPerson1],
		groups: ["Genre:", nameOfGenre]
	 }; // object closer
				
	// calling on the saveDoc function
	// then alerting the user on success or failure
	$.couch.db("gigbag").saveDoc(doc, {
		success: function(data) {
			alert("Document saved");
			
				        
		}, // function success closer
		error: function(status) {
			console.log(status);
			
		} // error closer
		
	}); // total couch.db closer
	
	
} // total save info function closer 



// save info for my edit page
var saveInfoEdit = function(){
	
	// get values from updated edits page!
	var nameOfPerson1 = $('#nameFirst1').val();
	var nameOfBand = $('#bandNameFirst1').val();
	var nameOfGenre = $('#genreFirst1').val();
	var nameOfEmail = $('#emailFirst1').val(); 
			
	
	// goes through the data base so I can get the rev number
	$.couch.db("gigbag").openDoc("Band:"+ nameOfBand,{
		success: function(data) { 
			
		// need to get the band name back, if the person enters in a new band name, it messes up
			
		// creation of a new document object to hold all my variable json data
		var doc = {
			_id: "Band:"+nameOfBand,
			_rev: data._rev,
			bname: ["Band Name:", nameOfBand],
			email: ["Email:", nameOfEmail],
			fname: ["first name:", nameOfPerson1],
			groups: ["Genre:", nameOfGenre]
		 }; // object closer
					
		// calling on the saveDoc function
		// then alerting the user on success or failure
		$.couch.db("gigbag").saveDoc(doc, {
			success: function(data) {
				alert("Document saved");
				
					        
			}, // function success closer
			error: function(status) {
				console.log(status);
				
			} // error closer
			
		}); // total couch.db closer
		}
	});
		
		
} // total save info function closer 




// this function upon loading of the #news page retrieves the id of all the objects
$('#news').live("pageshow", function(){
	$.couch.db("gigbag").view("plugin/Bands", {
		success:function(data){
		
			$('#localBandList').empty();
			$('#nameFirst').empty();
			
			$.each(data.rows, function(index,value){
				var item = (value.value || value.doc);
				$('#localBandList').append(
						$('<li>').append(
								$('<a>')
								.attr("href", "newBandPage.html?newBandPage=" + item.band)
								.text(item.band)
						)
				);
			});
			$('#localBandList').listview('refresh');
			
			
			$('#saveInfoButton').bind('click', saveInfo);
		}
		
	});
	
});


// note, this code will not run at its current state it is mearly here as a backup
// and to show how I am progressing on my work.


