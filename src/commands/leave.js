const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState } = require("@discordjs/voice");
let play = require("../commands/play");

module.exports.run = async (client, msg, args) => {
  let server_queue = await play.help.queue.get(msg.guild.id);

  if (!server_queue) {
    return msg.channel.send(`💤 already sleeping... `);
  }
  let player = await server_queue.connection._state.subscription.player;
  if (!player) return msg.channel.send("bot is not in a voice channel");
  if (!msg.member.voice.channel) return msg.channel.send("You need to be in a channel to execute this command!");
  if (msg.member.voice.channel.id != server_queue.connection.joinConfig.channelId)
    return msg.channel.send("you must be in the same channel as the bot");
  server_queue.connection.destroy();
  server_queue = null;
  play.help.queue.delete(msg.guild.id);
  player = null;
  msg.channel.send("💔 cya soon");
};

module.exports.help = {
  name: "leave",
  description: "makes the bot leave",
  aliases: [""],
};
