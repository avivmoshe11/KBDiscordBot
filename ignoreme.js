// let player = await server_queue.connection._state.subscription.player;
// //console.log(server_queue.connection._state.subscription.player);
// if (!player || !server_queue) return msg.channel.send("bot is not in a voice channel");

//let commandName = msg.content.slice(prefix.modules.prefix.length).trim().split(/ +/g).shift().toLowerCase();
//if (commandName == "play") {

//old system

// .on("finish", () => {
//   song_queue.songs.shift();
//   video_player(guild, song_queue.songs[0]);
// });

// if (commandName == "pause") {
//   if (!player) return msg.channel.send("bot is not in a voice channel");
//   if (!msg.member.voice.channel) return msg.channel.send("You need to be in a channel to execute this command!");
//   if (msg.member.voice.channel.id != server_queue.connection.joinConfig.channelId)
//     return msg.channel.send("you must be in the same channel as the bot");
//   if (player._state.status == "playing") {
//     player.pause();
//     msg.channel.send("👌 paused!");
//   }
// }
// if (commandName == "unpause") {
//   if (!player) return msg.channel.send("bot is not in a voice channel");
//   if (!msg.member.voice.channel) return msg.channel.send("You need to be in a channel to execute this command!");
//   if (msg.member.voice.channel.id != server_queue.connection.joinConfig.channelId)
//     return msg.channel.send("you must be in the same channel as the bot");

//   if (player._state.status == "paused") {
//     player.unpause();
//     msg.channel.send("👌 unpaused!");
//   }
// }
// if (commandName == "leave") {
//   if (!player) return msg.channel.send("bot is not in a voice channel");
//   if (!server_queue) {
//     return msg.channel.send(`💤 already sleeping... `);
//   }
//   if (!msg.member.voice.channel) return msg.channel.send("You need to be in a channel to execute this command!");
//   if (msg.member.voice.channel.id != server_queue.connection.joinConfig.channelId)
//     return msg.channel.send("you must be in the same channel as the bot");
//   server_queue.connection.destroy();
//   server_queue = null;
//   queue.delete(msg.guild.id);
//   player = null;
//   msg.channel.send("💔 cya soon");
// }
// if (commandName == "skip") {
//   if (!player) return msg.channel.send("bot is not in a voice channel");
//   if (!server_queue) {
//     return msg.channel.send(`There are no songs in queue 😔`);
//   }
//   if (!msg.member.voice.channel) return msg.channel.send("You need to be in a channel to execute this command!");
//   if (msg.member.voice.channel.id != server_queue.connection.joinConfig.channelId)
//     return msg.channel.send("you must be in the same channel as the bot");
//   server_queue.songs.shift();
//   msg.channel.send("👌 skipped!");
//   video_player(msg.guild, server_queue.songs[0], player);
// }

// let server_queue = await play.help.queue.get(msg.guild.id);
// let player = await server_queue.connection._state.subscription.player;
// console.log(server_queue);
// //console.log(player);
// if (!server_queue) {
//   return msg.channel.send(`There are no songs in queue 😔`);
// }
// if (!player) return msg.channel.send("bot is not in a voice channel");
