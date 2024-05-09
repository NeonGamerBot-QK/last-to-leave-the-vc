
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('child_process')

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, '..', 'commands');
const commandFolders = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));
for (const file of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	// const commandsPath = path.join(foldersPath, folder);
	// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	// for (const file of commandFiles) {
		const filePath = path.join(foldersPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
            const json = command.data.toJSON()
            json.file_name = filePath.replace(process.cwd(), '')
			commands.push(json);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	// }
}

let md = `## All Commands.\n`
function git(...args) {
    return execFileSync ("git", args).toString();
}
function getRepo() {
   const res = git("remote", "get-url", "origin");
   console.log(res)
   return res.trim()
       .replace(/git@(.+):/, "https://$1/")
       .replace(/\.git$/, "");
}
// console.log(commands)
function getBracket(isReq, back) {
    if(isReq) {
        if (back) {
            return ')'
        } else {
            return '('
        }
    } else {
        if(back) {
            return ']'
        } else {
            return '['
        }
    }
}
function formatOptions(ops) {
    console.log(ops)
let str = ``
ops.forEach((e) => {
    if(ops.type == 1) return; // no subcmds gonna be documented atm
    str += ` ${getBracket(e.required)}${e.name} - ${e.description}${getBracket(e.required, true)}`
})
return str;
}
const repo = getRepo()

commands.forEach(cmd => {
    md += '- '
    //  insert data here
md += `[${cmd.name}](${repo}/main/blob${cmd.file_name}) - ${cmd.description} ${formatOptions(cmd.options)}`
    //end
    md += `\n`
})
console.log(md)
fs.writeFileSync(path.resolve(__dirname, '..', '..','docs', 'COMMANDS.md'), md)
