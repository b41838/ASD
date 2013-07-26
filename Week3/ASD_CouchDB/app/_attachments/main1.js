/*   Kyler Schroeder
	 ASD 1307
	 Full Sail University */

$('document').ready(function() {
	
	$.ajax({
		"url":		"_view/entries",
		"dataType":	'json',
		"success":	function(data) {
					$.each(data.rows, function(index, history) {
						var date = history.value.date;
						var sugar = history.value.sugar;
						var pillName = history.value.pillName;
						var quantity = history.value.quantity;
						var notes = history.value.notes;
						
						$('#pillsList').append(
							$('<li>').append(
								$('<a>').attr("href", "#")
									.text(date)
							)
						);
					});
					$('#pillsList').listview('refresh');
		}
	});
});