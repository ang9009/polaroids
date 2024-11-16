import { ChannelType, EmbedBuilder, Guild, TextChannel } from "discord.js";
import { PrimaryColors } from "../../../data/primaryColors";
import { EventData } from "../../../types/eventData";

const guildCreate: EventData<Guild> = {
  name: "guildCreate",
  once: false,
  async execute(guild: Guild) {
    const welcomeMsg = new EmbedBuilder()
      .setTitle("Hello, I'm polaroids")
      .setColor(PrimaryColors.PRIMARY_BLUE)
      .setDescription(
        "- Use `/setup` to get started\n- Once you're done, type `/help` for a list of other commands\n\nFor more information, feel free to visit my [documentation](https://github.com/ang9009/polaroids/tree/main)!\n",
      )
      .setFooter({
        text: "📸 polaroids v1.0 | by dalfie",
      });

    // Find a channel where the welcome message can be sent
    const channel = guild.channels.cache.find((channel) => {
      return (
        channel.type === ChannelType.GuildText &&
        channel.permissionsFor(guild.members.me!).has("SendMessages")
      );
    }) as TextChannel;

    if (!channel) {
      throw new Error("Could not find a channel to send messages in");
    }
    channel.send({ embeds: [welcomeMsg] });
  },
};

export default guildCreate;
