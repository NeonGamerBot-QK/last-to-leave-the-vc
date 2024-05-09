const fs = require('fs');
const path = require('path');
module.exports = client => {
	const foldersPath = path.join(__dirname, '..', 'commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		// for (const file of commandFiles) {
		// const filePath = path.join(commandsPath, file);
		// console.log(commandFolders)
		const command = require(commandsPath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	// }
	}
};