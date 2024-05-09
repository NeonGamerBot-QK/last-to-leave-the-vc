const express = require('express');
const fs = require('fs');
const path = require('path');
module.exports = app => {
	try {
		app.use(require('morgan')('dev'));
	}
	catch (e) {
		console.warn('Morgan not installed.');
	}
	app.use(express.json());
	app.set('view engine', 'ejs');

	const eventsPath = path.join(__dirname, '..', 'routes');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const route = require(filePath);
		// if (event.once) {
		//     client.once(event.name, (...args) => event.execute(...args));
		// } else {
		//     client.on(event.name, (...args) => event.execute(...args));
		// }
		route(app);
		console.log(`Loaded route ${route.name ?? 'nameless'} (${file})`);
	}
};