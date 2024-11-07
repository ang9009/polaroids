import { ChannelType, EmbedBuilder, Guild, TextChannel } from "discord.js";
import { addGuildToDb } from "../api/addGuildToDb";
import { PrimaryColors } from "../data/primaryColors";

export const event = {
  name: "guildCreate",
  once: false,
  async execute(guild: Guild) {
    const id = guild.id;
    const embed = new EmbedBuilder()
      .setTitle("Hello")
      .setDescription("Hello world!")
      .setColor(PrimaryColors.PRIMARY_BLUE);

    const channel = guild.channels.cache.find((channel) => {
      return (
        channel.type === ChannelType.GuildText &&
        channel.permissionsFor(guild.members.me!).has("SendMessages")
      );
    }) as TextChannel;

    if (!channel) {
      throw new Error("Polaroids can't send messages anywhere!");
    }
    channel.send({ embeds: [embed] });

    try {
      await addGuildToDb(id);
    } catch (err) {
      if (err instanceof Error) {
        const embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(err.message)
          .setColor(PrimaryColors.FAILURE_RED);
        channel.send({ embeds: [embed] });
      }
    }
  },
};
