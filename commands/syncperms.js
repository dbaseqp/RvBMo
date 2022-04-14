const Discord = require('discord.js');
exports.run = async (bot, message, args) => {
    if (message.channel.name !== "rvbmo-spam") {
	    return;
    }
    const sender = message.channel;
    const guild = message.guild;
    sender.send("Syncing channels to categories")
    const regex = /[Tt]eam[- ]\d+/
    guild.channels.cache.forEach( category =>
	    {
		    if (category.type === "GUILD_CATEGORY" && regex.test(category.name)) {
			    sender.send(`Syncing channels under ${category.name}...`)
			    category.children.forEach( channel => { channel.lockPermissions()} )
		    }
	    })
    sender.send(`Done! Synced teams.`)
}


exports.help = {
    name:"syncperms"
}
