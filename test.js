const Discord = require('discord.js');
const client = new Discord.Client();
const cheerio = require('cheerio');
const { commands } = require('./ping');
const token = 'NzE2NTE5NzU0NDAzMjgzMDA1.XtM9BQ.eCr5Gx2hYrgmsJbADXhKd-fD8fw';
const prefix = '.';


let GreenColourHex = '#1fff0a';
let OrangeColourHex = '#FF7400';
let RedColourHex = '#FF0000';
let PurpleColourHex = '8C00FF';
let LightBlueColourHex = '#00FFEA';
let BlueColourHex = '#369BFF';
let DarkBlueColourHex = '#0003FF';
let PinkColourHex = '#FB55E4';
let YellowColourHex = '#FFE700';
let BlackColourHex = '#000000';
let WhiteColourHex = '#FFFFFF';
var Version = 'V1.9';
var currentDate = new Date();
var date = currentDate.getDate();
var month = currentDate.getMonth();
var year = currentDate.getFullYear();
var Footer = `BusyCoding Bot#5330 ` + Version + ' BusyCoding, Founded by Jacob10080#0001';

client.once('ready', () => {
    console.log(`${client.user.tag} is successfully online!`)
    client.user.setActivity('All commands', { type: 'WATCHING' }).catch(console.error);
})

const channelId = '759298200221515798' // welcome channel
const targetChannelId = '759298200221515798' // rules and info

client.on('guildMemberAdd', (member) => {
    const message = `Please welcome <@${member.id}> to the server! Please check out ${member.guild.channels.cache.get(targetChannelId).toString()}`

    const channel = member.guild.channels.cache.get(channelId)
    channel.send(message)
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/)

    // ADMIN COMMANDS

    if (message.content === `${prefix}ban`) {
        const tag = `<@${message.author.id}>`
        const tag1 = message.author.tag

        if (!message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('BAN_MEMBERS')
        ) {
            const target = message.mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                let Reason = args.slice(2).join(' ');
                if (!Reason) Reason = "No reason provided";

                const ban1 = new Discord.MessageEmbed()
                    .setTitle('User Ban Report')
                    .addField(`<a:approved:744169077614051478> ${message.author.tag} has been struct by the ban hammer`, `Reason: ${Reason}`)
                    .setThumbnail('https://tenor.com/view/bane-no-banned-and-you-are-explode-gif-16047504')
                    .setTimestamp()
                    .setFooter(`Ban made by ${message.author.tag}`);

                message.channel.send(ban1);
            } else {
                message.channel.send(`${tag} Please specify someone to ban.`)
            }
        } else {
            message.channel.send(
                `${tag} You do not have permission to use this command.`
            )
        }
        console.log(`${tag1} banned a person from ${message.guild.name}`)
    }

    // NON-EMBED COMMANDS CATEGORY BELOW

    if (message.content === `${prefix}ping`) {
        message.reply('Calculating ping...').then((resultMessage) => {
            const ping1 = resultMessage.createdTimestamp - message.createdTimestamp

            resultMessage.edit(`Bot latency: ${ping1}, API Latency: ${client.ws.ping}`)
        })
    }

    if (message.content === `${prefix}<@!716519754403283005>`) {
        message.reply('The prefix for me is **' + prefix + `**\n Need help? **${prefix}help**.`)
    }

    // EMBED COMMANDS BELOW

    if (message.content === `${prefix}commands`) {
        const help = new Discord.MessageEmbed()
            .setTitle('Commands')
            .addField(`${prefix}ping`, `Shows API ping latency`)
            .addField(`${prefix}user-info`, `Shows info for that user`)
            .addField(`${prefix}server-info`, `Shows server info`)
        message.channel.send(help)
    }

    if (message.content === `${prefix}`) {

    }

    if (message.content === `${prefix}partners`) {
        const partners = new Discord.MessageEmbed()
            .setTitle('BusyCoding Partners')
            .addField('`' + prefix + 'williewoo`', 'Shows info for WillieWoo\'s links')
            message.channel.send(partners)
    }

    if (message.content === `${prefix}`) {

    }

    if (message.content === `${prefix}user-info`) {
        const user1 = message.mentions.users.first() || message.member.user
        const member1 = message.guild.members.cache.get(user1.id)

        console.log(member1)

        const userinfo = new Discord.MessageEmbed()
            .setAuthor(`User info for ${user1.username}`, user1.displayAvatarURL())
            .addFields(
                {
                    inline: true,
                    name: 'User tag',
                    value: user1.tag,
                },
                {
                    name: 'Is a',
                    value: user1.bot || 'Person',
                },
                {
                    inline: true,
                    name: 'User ID',
                    value: user1.id,
                },
                {
                    name: 'Discriminator',
                    value: '#' + user1.discriminator,
                },
                {
                    name: 'Nickname',
                    value: member1.nickname || 'No Set Nickname',
                },
                {
                    name: 'Joined Server',
                    value: new Date(member1.joinedTimestamp).toLocaleDateString(),
                },
                {
                    name: 'Joined Discord',
                    value: new Date(user1.createdTimestamp).toLocaleDateString(),
                },
                {
                    name: 'Roles',
                    value: member1.roles.cache.size - 1,
                })
            .setImage(user1.displayAvatarURL())
            .setTimestamp()
            .setFooter('LAST UPDATED')

        message.channel.send(userinfo)
    }

    if (message.content === `${prefix}server-info`) {
        const { guild } = message

        const { name, region, memberCount, owner, afkTimeout } = guild
        const icon = guild.iconURL()

        const serverinfo = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: 'Region',
                    value: region,
                },
                {
                    name: 'Members',
                    value: memberCount,
                },
                {
                    name: 'Owner',
                    value: owner.user.tag,
                },
                {
                    name: 'AFK Timeout',
                    value: afkTimeout / 60,
                }
            )
        message.channel.send(serverinfo)
    }

    if (message.content === `${prefix}bot-info`) {
        const botinfo = new Discord.MessageEmbed()
            .setColor(PinkColourHex)
            .setTitle('Bot Info')
            .setThumbnail('https://cdn.discordapp.com/attachments/749557100098617425/772351136479838238/Busy_Coding_Bot_Icon.png')
            .addFields(
                {
                    name: 'Bot Repository',
                    value: '[Click Here](https://github.com/jacob10080/BusyCoding-Bot) Note: It\'s a WIP',
                    inline: true,
                },
                {
                    name: 'Bot Tag',
                    value: 'BusyCoding Bot#5330 (<@!716519754403283005>)',
                    inline: true,
                },
                {
                    name: 'Bot ID',
                    value: '716519754403283005',
                    inline: true,
                },
                {
                    name: 'Bot Permissions',
                    value: 'Administrator',
                    inline: true,
                },
                {
                    name: 'Bot Owner',
                    value: '<@!691560662425403432>',
                    inline: true,
                }
            )
            .setFooter(Footer)

        message.channel.send(botinfo);
    }

})
client.login(token);