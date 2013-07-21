/*   Kyler Schroeder
	 ASD 1307
	 Full Sail University */

$('#home').on('pageinit', function() {
	//code needed for home page goes here
});

$('#addItem').on('pageinit', function() {

		var id = id;
		var myForm = $('#addPills'),
			errorsLink = $('#errorsLink');

			// starting form validation
		    myForm.validate( {
				invalidHandler: function(form, validator) {
					errorsLink.click();
					var html = '';
					
					for(var key in validator.submitted) {
						var label = $('label[for^="'+ key +'"]').not('.error');;
						var legend = label.closest('fieldset').find('.ui-controlgroup-label');
						var fieldName = legend.length ? legend.text() : label.text();
						html += '<li>'+ fieldName +'</li>';
					};
					$("#errorPop ul").html(html);

				},
				submitHandler: function() {
					var data = myForm.serializeArray();
					storeData(data);
		}
	});

	//any other code needed for addItem page goes here

	// display stored data
	$('#displayLink').on("click", function() {
		getData();
	});

	// clear stored data
	$('#clearLink').on("click", function() {
		clearLocal();
	});

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

	var go = function go(x) {
		var theElement = document.getElementById(x);
		return theElement;
	};

	function toggleControls(n) {
		switch(n) {
			case "on":
			$('#addPills').css('display','none');
			$('#displayLink').css('display','none');
			$('#clearLink').css('display','inline');
			$('#addNew').css('display','inline');
				break;
			case "off":
			$('#addPills').css('display','block');
			$('#displayLink').css('display','inline');
			$('#clearLink').css('display','inline');
			$('#addNew').css('display','none');
			$('#items').css('display','none');			
				break;
			default:
				return false;
		}
	}

	// get image for category from img folder
	function grabImage(catName, makeSubList) {
		var imgLi = document.createElement('li');
		makeSubList.appendChild(imgLi);
		var imgTag = document.createElement('img');
		var imgSrc = imgTag.setAttribute("src", "img/" + catName + ".png");
		imgLi.appendChild(imgTag);
	}

	// make item links
	// create edit and delete links for each stored item when displayed
	function createItemLinks(key, linksLi) {
		// add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Record /";
		editLink.addEventListener("click", editEntry);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		// add delete single item links
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "/ Delete Record";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}

	function enterDummyData() {
		// store json data into localStorage
		for(var n in json) {
			var id = Math.floor(Math.random()*1000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

	function editEntry() {
		// grab data from localStorage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		// show form
		toggleControls("off");

		// populate form fields with current stored data
		go('date').value = item.date[1];
		go('sugarLevel').value = item.sugar[1];
		go('pillName').value = item.pillName[1];
		go('notes').value = item.notes[1];
		var editSubmit = go('submit');
		editSubmit.addEventListener("click");
		editSubmit.key = this.key;
	}

var autofillData = function () {

};

var getData = function() {
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("There is no data to clear, entering dummyData.");
			enterDummyData();
		}


		// write data from localStorage to browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "showLS");
		makeDiv.setAttribute("data-role", "page");
		makeDiv.setAttribute("data-theme", "b");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		go('showLS').style.display = "block";
		for (var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// convert string from localStorage value to object using JSON.parse
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			grabImage(obj.sugar[1], makeSubList);
			//grabImage(makeSubList);
			for (var n in obj) {
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			createItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons or links for each item in localstorage
		}
};

var storeData = function(data, key) {
	console.log(data);
		// if no key, create new key
		if(!key) {
			// get a random number for localStorage key
			var id			= Math.floor(Math.random()*1000001);

		} else {
			// if it has a key already, set it to the existing key to overwrite
			id = key;
		}

		// build JSON object to store
		var item			= {};
		item.date			= ["Date:", $('#date').val];
		item.sugar			= ["Sugar Level:", $('#sugarLevel').value];
		item.pillName		= ["Pill Name:", $('#pillName').value];
		item.pillQuantity	= ["Pill Quantity:", $('#pillQuantity').value];
		item.notes			= ["Notes:", $('#notes').value];

		// save into LocalStorage with stringify
		localStorage.setItem(id, JSON.stringify(item));
		alert("Save Successfull!");
		window.location.reload();
	};

var	deleteItem = function () {
		var ask = confirm("Are you sure you want to delete this entry?");
		if(ask) {
			localStorage.removeItem($(this).attr('key'));
			alert("Entry was deleted!");
			window.location.reload();
		} else {
			alert("Contact was not deleted.");
		}
};

var clearLocal = function() {
		if(localStorage.length === 0) {
			alert("There is no data to clear.");
		} else {
			localStorage.clear();
			alert("All data has been cleared.");
			window.location.reload();
			return false;
		}
};

$('#toJSON').on("click", function() {

	$.ajax({
		url:		'xhr/entries.json',
		type:		'GET',
		dataType:	'json',
		success:	function(goGetThe) {
					for (var i in goGetThe.entry) {
					var entry = goGetThe.entry[i];
						$('<section data-role="content" data-theme="b">' + '<ul style="list-style-type:none;"' + 
							'<li data-role="list-divider">' + 
							'Date: ' + entry.date + '</li>' +
							'<li>' + 
							'Blood Sugar Level: ' + entry.sugar + '</li>' +
							'<li>' + 
							'Pill Name: ' + entry.pillName + '</li>' +  
							'<li>' + 
							'Quantity: ' + entry.quantity + '</li>' +
							'<li>' + 
							'Notes: ' + entry.notes + '</li>' + 
							'</ul>' + '</section>').appendTo('#viewJSON');
					};
	}
	});
});

$('#toXML').on('click', function() {

	$.ajax( {
		url:		'xhr/entries.xml',
		type:		'GET',
		dataType:	'xml',
		success:	function(word) {
						$(word).find("entry").each(function(){ 

							var date = $(this).find('date').text(),
								sugar = $(this).find('sugar').text(),
								pillName = $(this).find('pillName').text(),
								quantity = $(this).find('quantity').text(),
								notes = $(this).find('notes').text();

							$('<section data-role="content" data-theme="b">' + '<ul style="list-style-type:none;"' + 
							'<li data-role="list-divider">' + 
								'Date: ' + date + '</li>' +
								'<li>' + 
								'Blood Sugar Level: ' + sugar + '</li>' +
								'<li>' + 
								'Pill Name: ' + pillName + '</li>' +  
								'<li>' + 
								'Quantity: ' + quantity + '</li>' +
								'<li>' + 
								'Notes: ' + notes + '</li>' +  
								'</ul>' + '</section>').appendTo('#viewXML');
						});
					}
	});
});

$('#view').on('pageinit', function() {
	//code needed for view page goes here
});

$('#about').on('pageinit', function() {
	//code needed for about page goes here
});