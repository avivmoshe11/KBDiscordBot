//added by me
require("dotenv").config();
const { Client, Intents, Collection, Guild, GuildChannel, GuildMember, TextChannel, Message } = require("discord.js");
//const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_VOICE_STATES]});
const client = new Client({ intents: new Intents(32767) });
//allowedMentions: ["users"],
const fs = require("fs");

client.commands = new Collection();
client.aliases = new Collection();

const commands = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js"));
console.log(`loading...`);
for (file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${commandName}`);
  client.commands.set(command.help.name, command);
  command.help.aliases.forEach((alias) => {
    client.aliases.set(alias, command.help.name);
  });
  console.log(`${file} has been loaded`);
}
const prefix = "!!";
const version = "1.3";

client.on("ready", () => {
  console.log("ready!");
  client.user.setActivity(`${client.guilds.cache.size} Servers`, { type: "WATCHING" });
  client.user.setStatus("online");
});

client.on("messageCreate", (msg) => {
  if (msg.content.startsWith(prefix) && !msg.author.bot) {
    console.log(msg.author.tag + ": " + msg.content);
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    // const command = client.commands.get(commandName);
    // if (!command) {
    //   return msg.channel.send({ content: "That Command doesn't exist" });
    // }
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    } else {
      return msg.channel.send({ content: "That Command doesn't exist" });
    }

    command.run(client, msg, args);
  }
});

client.login(process.env.TOKEN);

exports.modules = {
  prefix: prefix,
};
