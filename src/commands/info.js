const { MessageEmbed } = require("discord.js");
var prefix = require(`../bot`);

module.exports.run = async (client, msg, args) => {
  const spaces = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ";
  let name = await botname(client, msg);
  name = name ? name : client.user.username;
  const exampleEmbed = new MessageEmbed()
    .setColor("#04a2d5")
    //.setAuthor({ name: "Kunefa Bot", iconURL: "https://i.kym-cdn.com/photos/images/masonry/001/564/945/0cd.png" })
    .setThumbnail("https://i.kym-cdn.com/photos/images/masonry/001/564/945/0cd.png")
    .setTitle(`${name}'s Commands`)
    .setDescription(`full command list: ${spaces}  `)
    //.addField("\u200B", " \u200B")
    .addFields(commandlist(client, prefix.modules.prefix))
    .setImage("https://i.imgur.com/riksGBJ.png")
    .setTimestamp()
    .setFooter({
      text: "made by Aviv#1234",
      iconURL: "https://static.euronews.com/articles/stories/05/79/99/44/2000x1333_cmsv2_292bef7f-8fab-5f0d-bed5-63856832498b-5799944.jpg",
    });
  msg.channel.send({ embeds: [exampleEmbed] });
};

function commandlist(client, prefix) {
  let messageback = [];
  const commands = client.commands;
  for (let value of commands.values()) {
    messageback.push({ name: `${prefix}${value.help.name}`, value: value.help.description });
  }
  return messageback;
}

async function botname(client, msg) {
  let guilds = client.guilds.cache;
  let currentguild = msg.guildId;
  let name;
  for (let [key, value] of guilds) {
    if (key == currentguild) {
      //name = await value.members.guild.members.cache.get("987439876720971796").nickname;
      name = await value.members.cache.get("987439876720971796").nickname;
    }
  }
  return name;
}
module.exports.help = {
  name: "info",
  description: "this function returns full list of commands",
  aliases: ["commands", "cmds"],
};
