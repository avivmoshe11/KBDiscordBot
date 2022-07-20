module.exports.run = (client, msg, args) => {
  let channels = msg.guild.channels.cache;
  let voiceChannels = [];
  let textChannels = [];
  let categories = [];
  for (let channel of channels) {
    if (channel[1].type == "GUILD_TEXT") {
      textChannels.push({ name: channel[1].name, id: channel[0], channel_type: "text", parent_id: channel[1].parentId, pointer: channel[1] });
    } else if (channel[1].type == "GUILD_VOICE") {
      voiceChannels.push({ name: channel[1].name, id: channel[0], channel_type: "voice", parent_id: channel[1].parentId, pointer: channel[1] });
    } else if (channel[1].type == "GUILD_CATEGORY") {
      categories.push({ name: channel[1].name, id: channel[0], channel_type: "category", pointer: channel[1], children: [] });
    }
  }
  let fixedCategories = filterCatChilds(textChannels, voiceChannels, categories);
  return fixedCategories;
};

function filterCatChilds(textChannels, voiceChannels, categories) {
  for (let k = 0; k < categories.length; k++) {
    for (let i = 0; i < textChannels.length; i++) {
      if (textChannels[i].parent_id == categories[k].id) {
        categories[k].children.push(textChannels[i]);
      }
    }
    for (let j = 0; j < voiceChannels.length; j++) {
      if (voiceChannels[j].parent_id == categories[k].id) {
        categories[k].children.push(voiceChannels[j]);
      }
    }
  }
  return categories;
}
module.exports.help = {
  name: "mapServer",
  description: "function for the Dev",
  aliases: ["map"],
};
