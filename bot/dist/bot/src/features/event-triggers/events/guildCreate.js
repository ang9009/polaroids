import { ChannelType, EmbedBuilder, Events } from "discord.js";
import { PrimaryColors } from "../../../data/primaryColors";
import { addGuildToDb } from "../api/addGuildToDb";
const guildCreate = {
    event: Events.GuildCreate,
    once: false,
    async execute(guild) {
        const welcomeMsg = new EmbedBuilder()
            .setTitle("Hello, I'm polaroids")
            .setColor(PrimaryColors.PRIMARY_BLUE)
            .setDescription(`- Use \`/subscribe\` in a media-dedicated channel to get started
        \n- Type \`/help\` for a list of other commands
        \n\nFor more information, feel free to visit my [documentation](https://github.com/ang9009/polaroids/tree/main)!\n`)
            .setFooter({
            text: "📸 polaroids v1.0 | by dalfie",
        });
        // Find a channel where the welcome message can be sent
        const channel = guild.channels.cache.find((channel) => {
            return (channel.type === ChannelType.GuildText &&
                channel.permissionsFor(guild.members.me).has("SendMessages"));
        });
        if (!channel) {
            throw new Error("Could not find a channel to send messages in");
        }
        // Add guild id to database
        await addGuildToDb(guild.id);
        console.log("Successfully saved guild id");
        channel.send({ embeds: [welcomeMsg] });
    },
};
export default guildCreate;
//# sourceMappingURL=guildCreate.js.map