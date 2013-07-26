function (doc) {
	if (doc._id.substr(0,14) === "entries:pills:") {
		emit(doc._id.substr(14), {
			"date": doc.date,
			"sugar": doc.sugar,
			"pillName": doc.pillName,
			"quantity": doc.quantity,
			"notes": doc.notes
		});
	}
};