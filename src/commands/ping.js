module.exports.run = (client, msg, args) => {
  msg.channel.send("pong");
};

module.exports.help = {
  name: "ping",
  description: "this function returns a pong",
  aliases: ["pingi"],
};
