const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState } = require("@discordjs/voice");
let play = require("../commands/play");
//pause
module.exports.run = async (client, msg, args) => {
  let server_queue = await play.help.queue.get(msg.guild.id);
  // let player = await server_queue.connection._state.subscription.player;
  // //console.log(server_queue.connection._state.subscription.player);
  // if (!player || !server_queue) return msg.channel.send("bot is not in a voice channel");

  if (!server_queue) {
    return msg.channel.send(`💤 already sleeping... `);
  }
  let player = await server_queue.connection._state.subscription.player;
  if (!player) return msg.channel.send("bot is not in a voice channel");
  if (!msg.member.voice.channel) return msg.channel.send("You need to be in a channel to execute this command!");
  if (msg.member.voice.channel.id != server_queue.connection.joinConfig.channelId)
    return msg.channel.send("you must be in the same channel as the bot");
  if (player._state.status == "playing") {
    player.pause();
    msg.channel.send("👌 paused!");
  }
};

module.exports.help = {
  name: "pause",
  description: "pauses the song, if played",
  aliases: [""],
};
