module.exports.run = (client, msg, args) => {
  let toSay = args.join(" ");
  if (!toSay) return msg.channel.send({ content: "you have to provide something" });
  msg.channel.send({ content: toSay });
};

module.exports.help = {
  name: "say",
  description: "this function makes the bot say what you told him to",
  aliases: [],
};
