const Discord = require('discord.js');
const client = new Discord.Client();
client.disabledMembers = new Map();
client.login('Ms-SafeToken-abcdefghijklmnopqrstuvwxyz1234567890');

client.on('ready', async () => {
        console.log('I am ready!');
        setTimeout( () => client.user.setPresence({ status: 'online', game: { name: `with my ${client.users.array().length} kids` } }), 60000);
});

client.on('message', async (message) => {
        if(message.author.bot) return;
        const args = message.content.trim().split(/ +/g);
        if((args[0].toLowerCase() == 'i\'m' || args[0].toLowerCase() == 'im') && (args[1]) && !client.disabledMembers.has(message.author.id)){
                client.user.setPresence({ status: 'online', game: { name: `with my ${client.users.array().length} kids` } });
                message.channel.send(`Hi ${args.slice(1).join(' ')}, I'm dad`);
        }
        if(message.isMemberMentioned(client.user)){
                client.user.setPresence({ status: 'online', game: { name: `with my ${client.users.array().length} kids` } });
                if(message.content.indexOf('stop') !== -1) client.disabledMembers.set(message.author.id, message.guild.id)
                else if (message.content.indexOf('go') !== -1 && client.disabledMembers.has(message.author.id)) client.disabledMembers.delete(message.author.id);
        }
});