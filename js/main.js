$('#home').on('pageinit', function() {
	//code needed for home page goes here
});	

$('#addItem').on('pageinit', function() {

		var myForm = $('#addPills'),
			errorsLink = $('#errorsLink');

		    myForm.validate( {
				invalidHandler: function(form, validator) {
					errorsLink.click();
					var html = '';
					//console.log(validator.submitted);
					for(var key in validator.submitted) {
						var label = $('label[for^="'+ key +'"]').not('.error');;
						//console.log(label.text());
						var legend = label.closest('fieldset').find('.ui-controlgroup-label');
						var fieldName = legend.length ? legend.text() : label.text();
						html += '<li>'+ fieldName +'</li>';
						console.log(fieldName);
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
	var displayLink = go('displayLink');
	displayLink.addEventListener("click", getData);

	// clear stored data
	var clearLink = go('clearLink');
	clearLink.addEventListener("click", clearLocal);

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

	var go = function go(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}

	function toggleControls(n) {
		switch(n) {
			case "on":
			go('addPills').style.display = "none";
			go('displayLink').style.display = "none";
			go('clearLink').style.display = "inline";
			go('addNew').style.display = "inline";
				break;
			case "off":
			go('addPills').style.display = "block";
			go('displayLink').style.display = "inline";
			go('clearLink').style.display = "inline";
			go('addNew').style.display = "none";
			go('items').style.display = "none";				
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
		//go('quantity').value = item.quantity[1];
		/*if(item.required[1] == "Yes") {
			go('req').setAttribute("checked", "checked");
		}*/
		go('notes').value = item.notes[1];

		// remove initial eventListener from save button
		//saveBtn.removeEventListener("click", storeData);

		// change submit button value to 'edit button'
		//go('submit').value = "Update Record";
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
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		go('items').style.display = "block";
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
//	function storeData(key) {
		// if no key, create new key
		if(!key) {
			// get a random number for localStorage key
			var id			= Math.floor(Math.random()*1000001);

		} else {
			// if it has a key already, set it to the existing key to overwrite
			id = key;
		}console.log(key);



		// run function to find if req checkbox is checked or not
		//isRequired();

		// build JSON object to store
		var item			= {};
		item.date			= ["Date:", go('date').value];
		item.sugar			= ["Sugar Level:", go('sugarLevel').value];
		item.pillName		= ["Pill Name:", go('pillName').value];
		item.pillQuantity	= ["Pill Quantity:", go('pillQuantity').value];
		//item.required		= ["Is Required:", requiredPill];
		item.notes			= ["Notes:", go('notes').value];

		// save into LocalStorage with stringify
		localStorage.setItem(id, JSON.stringify(item));
		alert("Save Successfull!");
		window.location.reload();
	}
//}; 

var	deleteItem = function () {
		var ask = confirm("Are you sure you want to delete this entry?");
		if(ask) {
			localStorage.removeItem(this.key);
			alert("Entry was deleted!")
			window.location.reload();
		} else {
			alert("Contact was not deleted.")
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

/* save data
	var saveBtn = go('submit');
	saveBtn.addEventListener("click", storeData);
*/