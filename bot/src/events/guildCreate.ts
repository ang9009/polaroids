import { ChannelType, EmbedBuilder, Guild, TextChannel } from "discord.js";
import { addGuildToDb } from "../api/addGuildToDb";
import { PrimaryColors } from "../data/primaryColors";
import { EventData } from "../types/discord/eventData";

const guildCreate: EventData<Guild> = {
  name: "guildCreate",
  once: false,
  async execute(guild: Guild) {
    const id = guild.id;
    const welcomeMsg = new EmbedBuilder()
      .setTitle("Hello, I'm polaroids")
      .setColor(PrimaryColors.PRIMARY_BLUE)
      .setDescription(
        "- Use `/setup` to get started\n- Once you're done, type `/help` for a list of other commands\n\nFor more information, feel free to visit my [documentation](https://github.com/ang9009/polaroids/tree/main)!\n",
      )
      .setFooter({
        text: "📸 polaroids v1.0 | by dalfie",
      });

    const channel = guild.channels.cache.find((channel) => {
      return (
        channel.type === ChannelType.GuildText &&
        channel.permissionsFor(guild.members.me!).has("SendMessages")
      );
    }) as TextChannel;

    if (!channel) {
      throw new Error("Polaroids can't send messages anywhere!");
    }
    channel.send({ embeds: [welcomeMsg] });

    try {
      await addGuildToDb(id);
    } catch (err) {
      if (err instanceof Error) {
        const errorMsg = new EmbedBuilder()
          .setTitle("Something went wrong")
          .setDescription(err.message)
          .setColor(PrimaryColors.FAILURE_RED);
        channel.send({ embeds: [errorMsg] });
      }
    }
  },
};

export default guildCreate;
