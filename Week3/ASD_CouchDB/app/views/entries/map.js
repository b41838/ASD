function (doc) {
	if (doc._id.substr(0,16) === "entries:history:") {
		emit(doc._id.substr(16), {
			"date": doc.date,
			"sugar": doc.sugar,
			"pillName": doc.pillName,
			"quantity": doc.quantity,
			"notes": doc.notes
		});
	}
};