let forfun = true;
function command(msg, command, commandContent) {
  let channel = msg.channel;
  console.log(command, commandContent);
  if (command == "!cn") {
    channel
      .setName(commandContent)
      .then((newChannel) => {
        console.log(`Channel's new name is ${newChannel.name}`);
        msg.reply("channel name has been modified my lord");
      })
      .catch(msg.reply("lo oved ze zain tohna"));
  } else if (command == "!c") {
    channel.clone().then((channel) => {
      console.log(`channel cloned with name ${channel.name}`);
    });
  } else if (command == "!cid") {
    getAllChannels(msg);
  } else if (command == "!bmr") {
    let role = checkRole(msg, commandContent);
    if (role) {
      msg.channel.permissionOverwrites.edit(role.id, { SEND_MESSAGES: forfun });
    }
    forfun = !forfun;
  }
}

function getAllChannels(msg) {
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
  console.log(fixedCategories);
  // console.log("text channels:");
  // for(let channel of textChannels)
  // {
  //   console.log(channel);
  // }
  // console.log("voice channels:");
  // for(let channel of voiceChannels)
  // {
  //   console.log(channel);
  // }
  // console.log("categories:");
  // for(let channel of categories)
  // {
  //   console.log(channel);
  // }
  //console.log(`voice:${voiceChannelIds}, text:${textChannelIds}`);
  //console.log(channels);
}

function filterCatChilds(textChannels, voiceChannels, categories) {
  //console.log(textChannels);
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

function checkRole(msg, content) {
  let roleid,
    role = null;
  if (content) {
    roleid = content.slice(3, -1);
  }
  if (roleid && roleid.length == 18) {
    role = msg.guild.roles.cache.get(roleid);
    console.log(role.name);
  } else {
    msg.reply("invalid argument, please insert @role");
  }
  return role;
}
module.exports = { command };

// client.on("messageCreate", (msg) => {
//   if (msg.author != "987439876720971796") console.log(msg.author.tag + ": " + msg.content);
//   if (msg.author == "313605730357870592" || msg.author == "832955145725542441") {
//     if (msg.content[0] == "!") {
//       let [commandarg, ...commandContent] = msg.content.split(" ");
//       command(msg, commandarg, commandContent[0]);
//     }
//   }
// });
