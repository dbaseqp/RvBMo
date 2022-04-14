const Discord = require('discord.js');
exports.run = async (bot, message, args) => {
    if (message.channel.name !== "rvbmo-spam") {
	    return;
    }
    const sender = message.channel;
    const guild = message.guild;
    const team_count = args[0];
    const green_team = guild.roles.cache.find(role => role.name === "Green Team"); 
    sender.send(`Building ${team_count} teams...`);
    for (let i = 1; i <= team_count; i++) {
	    sender.send(`Building team ${i}...`);
	    let team_name = `Team ${i}`;
	    let blue_team = await guild.roles.create({
			    name: team_name,
			    color: 'BLUE',
	    });
	    sender.send(`Creating category for team ${i}...`);
	    let category = await guild.channels.create(team_name, { 
		    type: "GUILD_CATEGORY",
		});
	    sender.send("Category Name: "+category.name)
	    
	    category.permissionOverwrites.edit(green_team, {
		    VIEW_CHANNEL: true
	    })
	    
	    category.permissionOverwrites.edit(blue_team, {
		    VIEW_CHANNEL: true
	    })
	    category.permissionOverwrites.edit(guild.roles.everyone, {
		    VIEW_CHANNEL: false
	    })
	    
	    sender.send("Category has permissions set: "+category.name)

	    let support = await guild.channels.create(`${team_name}-support-requests`, {
		    type: "GUILD_TEXT",
	    });
	    let text = await guild.channels.create(team_name, {
		    type: "GUILD_TEXT",
	    });
	    let voice = await guild.channels.create(team_name, {
		    type: "GUILD_VOICE",
	    });

	    support.setParent(category.id);
	    text.setParent(category.id);
	    voice.setParent(category.id);
    }
    sender.send(`Done! Built ${team_count} teams.`)
}


exports.help = {
    name:"buildteams"
}
