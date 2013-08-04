
function (doc) {
	if (doc._id.substr(0,5) === "pill:") {
		emit(doc._id.substr(5), {
			"key": doc.key,
			"date": doc.date,
			"sugar": doc.sugar,
			"pillName": doc.pillName,
			"quantity": doc.quantity,
			"notes": doc.notes
		});
	} 
};