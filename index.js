const tcpp = require('tcp-ping');
const config = require("./server/server.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
bot.commands = new Discord.Collection();
const prefix = "!"


bot.login('');
// bot.on("message", message => {
//     const args = message.content.slice(prefix.length).trim().split(/ +/g);
//     const command = args.shift().toLowerCase();
//     if (command === "setup") {
//         let embed = new Discord.MessageEmbed()
//             .setColor(`YELLOW`)
//             .setTitle(`**Ping en cours...**`)
//         message.channel.send(embed)
//     }
// })

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    console.log('Ready')

    let addr = config.server,
        port = config.port;
    let addr1 = config.server1,
        port1 = config.port1;
    let addr2 = config.server2,
        port2 = config.port2;

    bot.channels.cache.get("929153529204047882").messages.fetch("929155170779168779")
        .then(msg => {
            setInterval(() => {
                tcpp.probe(addr, port, function(err, available) {
                    if (available) {
                        tcpp.ping({ address: addr, port: port }, function(err, data) {
                            tcpp.ping({ address: addr1, port: port1 }, function(err, data1) {
                                tcpp.ping({ address: addr2, port: port2 }, function(err, data2) {
                                    let ping = new Discord.MessageEmbed()
                                        .setTitle(`Our Servers :`)
                                        .setColor(`GREEN`)
                                    if (Math.floor(data.avg) < 1000) {
                                        ping.addField(`🌐 WebSite(sorexproject.eu)`, `<a:881142313731096576:929166557530173521> En ligne - ${Math.floor(data.avg)} ms`)
                                    } else {
                                        ping.addField(`🌐 WebSite(sorexproject.eu)`, ":warning: Hors Ligne")
                                    }
                                    if (Math.floor(data1.avg) < 1000) {
                                        ping.addField(`🎮 Game Panel (panel.sorexproject.eu)`, `<a:881142313731096576:929166557530173521> En ligne - ${Math.floor(data1.avg)} ms`)
                                    } else {
                                        ping.addField(`🎮 Game Panel (panel.sorexproject.eu)`, ":warning: Hors Ligne")
                                    }
                                    if (Math.floor(data2.avg) < 1000) {
                                        ping.addField(`🔶 Big Brother`, `<a:881142313731096576:929166557530173521> En ligne - ${Math.floor(data2.avg)} ms`)
                                    } else {
                                        ping.addField(`🔶 Big Brother`, ":warning: Hors Ligne")
                                    }
                                    ping.addField(`\u200B`, `\u200B`)
                                    ping.setFooter(`Last update ${new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"})} | powered by sorexproject.eu`)
                                    msg.edit(ping)
                                    const status = [`🌐 WebSite : ${Math.floor(data.avg)} ms`, `🎮 Game Panel : ${Math.floor(data1.avg)} ms`, `🔶 Big Brother : ${Math.floor(data2.avg)} ms`];

                                    const rdm = Math.floor(Math.random() * status.length);
                                    bot.user.setPresence({ activity: { name: status[rdm] }, status: 'online' });
                                })
                            })
                        })
                    }
                });
            }, 10000)
        })
});