/*   Kyler Schroeder
	 ASD 1307
	 Full Sail University */

$(document).on('pageinit', '#home', function() {
	$('#toPill').on("click", function() {
		$.couch.db("asdproject").view("asd/pill", {
			success: function(data) {
				//console.log(data);
				$('#pillList').empty();
				$.each(data.rows, function(index, pill) {
					var item = (pill.value || value.doc);
				
					$('#pillList').append(
						$('<li>').append(
							$('<a>')
								.attr("href", "pill.html?pill=" + item._id)
								.text(item.pillName)
						)
					);
				});
				$('#pillList').listview('refresh');
			}	
		});
	})
});

$(document).on('pageinit', '#pill', function() {
	var urlData = $(this).data("url");
	console.log(urlData);
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	console.log(urlValues);
});

// save data to CouchDB
function storeData() {
	// create an object
	var item = {};
		item._id            = "pill:" + Math.floor(Math.random()*100000001);
		item.date			= $('#date').val();
		item.sugar			= $('#sugarLevel').val();
		item.pillName		= $('#pillName').val();
		item.pillQuantity	= $('#pillQuantity').val();
		item.notes			= $('#notes').val();
	
	// store data into CouchDB
	$.couch.db("asdproject").saveDoc(item, {
		success: function(item) {
			alert("Save complete!");
		},
		error: function(status) {
			alert("Save failed, please try again.");
		}
	});
	window.location.reload();
};


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
		var imgSrc = imgTag.setAttribute("src", catName + ".png");
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

//	function enterDummyData() {
//		// store json data into localStorage
//		for(var n in json) {
//			var id = Math.floor(Math.random()*1000001);
//			localStorage.setItem(id, JSON.stringify(json[n]));
//		}
//	}

//	function editEntry() {
//		// grab data from localStorage
//		var value = localStorage.getItem(this.key);
//		var item = JSON.parse(value);
//
//		// show form
//		toggleControls("off");
//
//		// populate form fields with current stored data
//		go('date').value = item.date[1];
//		go('sugarLevel').value = item.sugar[1];
//		go('pillName').value = item.pillName[1];
//		go('notes').value = item.notes[1];
//		var editSubmit = go('submit');
//		editSubmit.addEventListener("click");
//		editSubmit.key = this.key;
//	}
	
	var update = function() {
		var doc = {
			_id: "d12ee5ea1df6baa2b06451f44a019ab9",
			_rev: "1-967a00dff5e02add41819138abb3284d",
			foo: "bar"
			};
		
			$.couch.db("asdproject").saveDoc(doc, {
				success: function(data) {
					console.log(data);
			},
			error: function(status) {
				console.log(status);
			}
		});	
	}

	var saveNew = function() {
		var doc = {};
		$.couch.db("asdproject").saveDoc(doc, {
			success: function(data) {
				console.log(data);
			},
			error: function(status) {
				console.log(status);
			}
		});
	}

	var deleteItem = function() {
		var doc = {
			_id: "d12ee5ea1df6baa2b06451f44a019ab9",
			_rev: "2-13839535feb250d3d8290998b8af17c3"
		};
	
		$.couch.db("asdproject").removeDoc(doc, {
			success: function(data) {
			console.log(data);
			},
		
			error: function(status) {
			console.log(status);
			}
		});	
	}

	var deleteAll = function() {
		var docs = [
    		{
        		_id: "d12ee5ea1df6baa2b06451f44a01a0d8",
        		_rev: "1-967a00dff5e02add41819138abb3284d"
		    },
    		{
        		_id: "d12ee5ea1df6baa2b06451f44a01a75a",
			    _rev: "1-967a00dff5e02add41819138abb3284d"
    		}
		];
		
		$.couch.db("asdproject").bulkRemove({"docs": docs}, {
    		success: function(data) {
        		console.log(data);
    	},
	    error: function(status) {
		        console.log(status);
    		}
		});	
	}

//var	deleteItem = function () {
//		var ask = confirm("Are you sure you want to delete this entry?");
//		if(ask) {
//			localStorage.removeItem($(this).attr('key'));
//			alert("Entry was deleted!");
//			window.location.reload();
//		} else {
//			alert("Contact was not deleted.");
//		}
//};

//var clearLocal = function() {
//		if(localStorage.length === 0) {
//			alert("There is no data to clear.");
//		} else {
//			localStorage.clear();
//			alert("All data has been cleared.");
//			window.location.reload();
//			return false;
//		}
//};

$('#view').on('pageinit', function() {
	//code needed for view page goes here
});

$('#about').on('pageinit', function() {
	//code needed for about page goes here
});