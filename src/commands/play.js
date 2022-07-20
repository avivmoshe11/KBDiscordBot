const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const prefix = require("../bot");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, AudioPlayer } = require("@discordjs/voice");
const queue = new Map();
let player;
//play
module.exports.run = async (client, msg, args) => {
  const voice_channel = msg.member.voice.channel;
  if (!voice_channel) return msg.channel.send("you must be in a channel to execute this command!");

  const permissions = voice_channel.permissionsFor(msg.client.user);
  if (!permissions.has("CONNECT")) return msg.channel.send("i don't have permissions to join your channel");
  if (!permissions.has("SPEAK")) return msg.channel.send("i don't have permissions to sing in your channel");

  let server_queue = queue.get(msg.guild.id);

  if (!args.length) return msg.channel.send("you need to add the song you want me to play");
  let song = {};

  if (ytdl.validateURL(args[0])) {
    const song_info = await ytdl.getInfo(args[0]);
    song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url };
    console.log("ytdl:");
    console.log(song);
  } else {
    const video_finder = async (query) => {
      const videoResult = await ytSearch(query);
      return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
    };

    const video = await video_finder(args.join(" "));
    if (video) {
      song = { title: video.title, url: video.url };
      console.log("ytSearch:");
      console.log(song);
    } else {
      msg.channel.send("error finding video");
    }
  }
  if (!server_queue) {
    const queue_constructor = {
      voice_channel: voice_channel,
      text_channel: msg.channel,
      connection: null,
      songs: [],
    };
    player = createAudioPlayer();
    queue.set(msg.guild.id, queue_constructor);
    queue_constructor.songs.push(song);
    try {
      const connection = await joinVoiceChannel({
        channelId: voice_channel.id,
        guildId: voice_channel.guild.id,
        adapterCreator: voice_channel.guild.voiceAdapterCreator,
      });

      queue_constructor.connection = connection;
      video_player(msg.guild, queue_constructor.songs[0], player);
    } catch (err) {
      queue.delete(msg.guild.id);
      msg.channel.send("error connecting");
      throw err;
    }
  } else {
    server_queue.songs.push(song);
    return msg.channel.send(`👍 **${song.title}** added to queue!`);
  }
};

const video_player = async (guild, song, player) => {
  let song_queue = queue.get(guild.id);

  if (!song) {
    if (song_queue) {
      song_queue.connection.destroy();
    }
    song_queue = null;
    queue.delete(guild.id);
    return;
  }
  const stream = ytdl(song.url, { filter: "audioonly" });
  let resource = createAudioResource(stream);
  song_queue.connection.subscribe(player);
  player.on(AudioPlayerStatus.Idle, () => {
    song_queue.songs.shift();
    video_player(guild, song_queue.songs[0], player);
  });

  await song_queue.text_channel.send(`🎶 now playing **${song.title}**`);
  player.play(resource);
};

module.exports.help = {
  name: "play",
  description: "makes the bot sing",
  aliases: ["p"],
  queue: queue,
  player: player,
};
