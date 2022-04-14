exports.run = async (bot, message, args) => {
    if (message.channel.name !== "rvbmo-spam") {
	    return;
    }
    const sender = message.channel
    const guild = message.guild
    const regex = /([Tt]eam[- ]\d+(-support-requests)?)/;

    sender.send("Finding teams...");
    guild.channels.cache.forEach((channel) => {
	    if (regex.test(channel.name)) {
	    	sender.send("Deleting channel: \`"+channel.name+"\`");
		channel.delete();
	    }
    });
    guild.roles.cache.forEach((role) => {
	    if (regex.test(role.name)) {
	        sender.send("Deleting role: \`"+role.name+"\`");
		role.delete();
	    }
    });
    sender.send("Done!")
}

exports.help = {
    name:"deleteall"
}
