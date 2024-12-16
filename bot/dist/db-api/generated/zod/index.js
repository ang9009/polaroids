import { z } from 'zod';
/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////
/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////
export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted', 'ReadCommitted', 'RepeatableRead', 'Serializable']);
export const GuildScalarFieldEnumSchema = z.enum(['guildId', 'createdAt']);
export const RelationLoadStrategySchema = z.enum(['query', 'join']);
export const AlbumScalarFieldEnumSchema = z.enum(['name', 'description', 'createdAt']);
export const SubscribedChannelScalarFieldEnumSchema = z.enum(['channelId', 'createdAt', 'guildId', 'albumName']);
export const FileScalarFieldEnumSchema = z.enum(['discordId', 'uploaderId', 'fileName', 'description', 'createdAt', 'albumName']);
export const SortOrderSchema = z.enum(['asc', 'desc']);
export const QueryModeSchema = z.enum(['default', 'insensitive']);
export const NullsOrderSchema = z.enum(['first', 'last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////
/////////////////////////////////////////
// GUILD SCHEMA
/////////////////////////////////////////
/**
 * Servers that polaroids has been added to
 */
export const GuildSchema = z.object({
    /**
     * The server ID, supplied by Discord API
     */
    guildId: z.string(),
    /**
     * When polaroids was added to the server
     */
    createdAt: z.coerce.date(),
});
/////////////////////////////////////////
// ALBUM SCHEMA
/////////////////////////////////////////
/**
 * Albums that correspond to existing folders in FileStation.
 */
export const AlbumSchema = z.object({
    /**
     * The name of the folder on FileStation
     */
    name: z.string(),
    /**
     * The album's description
     */
    description: z.string(),
    /**
     * When the file was uploaded
     */
    createdAt: z.coerce.date(),
});
/////////////////////////////////////////
// SUBSCRIBED CHANNEL SCHEMA
/////////////////////////////////////////
/**
 * Channels within Discord servers that polaroids watches for updates
 */
export const SubscribedChannelSchema = z.object({
    /**
     * The channel ID, supplied by the Discord API
     */
    channelId: z.string(),
    /**
     * When the file was uploaded
     */
    createdAt: z.coerce.date(),
    /**
     * The id of the guild this channel is associated with
     */
    guildId: z.string(),
    /**
     * The id of the album this channel is associated with
     */
    albumName: z.string(),
});
/////////////////////////////////////////
// FILE SCHEMA
/////////////////////////////////////////
/**
 * Corresponds to images/videos saved to FileStation
 */
export const FileSchema = z.object({
    /**
     * The file's Discord attachment id
     */
    discordId: z.string(),
    /**
     * The Discord user id of the person who sent this file
     */
    uploaderId: z.string(),
    /**
     * The file's name
     */
    fileName: z.string(),
    /**
     * A description of the photo/video
     */
    description: z.string().nullable(),
    /**
     * When the file was uploaded
     */
    createdAt: z.coerce.date(),
    /**
     * The name of the album the photo/video is in
     */
    albumName: z.string(),
});
/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////
// GUILD
//------------------------------------------------------
export const GuildIncludeSchema = z.object({
    subscribedChannels: z.union([z.boolean(), z.lazy(() => SubscribedChannelFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => GuildCountOutputTypeArgsSchema)]).optional(),
}).strict();
export const GuildArgsSchema = z.object({
    select: z.lazy(() => GuildSelectSchema).optional(),
    include: z.lazy(() => GuildIncludeSchema).optional(),
}).strict();
export const GuildCountOutputTypeArgsSchema = z.object({
    select: z.lazy(() => GuildCountOutputTypeSelectSchema).nullish(),
}).strict();
export const GuildCountOutputTypeSelectSchema = z.object({
    subscribedChannels: z.boolean().optional(),
}).strict();
export const GuildSelectSchema = z.object({
    guildId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    subscribedChannels: z.union([z.boolean(), z.lazy(() => SubscribedChannelFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => GuildCountOutputTypeArgsSchema)]).optional(),
}).strict();
// ALBUM
//------------------------------------------------------
export const AlbumIncludeSchema = z.object({
    files: z.union([z.boolean(), z.lazy(() => FileFindManyArgsSchema)]).optional(),
    channels: z.union([z.boolean(), z.lazy(() => SubscribedChannelFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => AlbumCountOutputTypeArgsSchema)]).optional(),
}).strict();
export const AlbumArgsSchema = z.object({
    select: z.lazy(() => AlbumSelectSchema).optional(),
    include: z.lazy(() => AlbumIncludeSchema).optional(),
}).strict();
export const AlbumCountOutputTypeArgsSchema = z.object({
    select: z.lazy(() => AlbumCountOutputTypeSelectSchema).nullish(),
}).strict();
export const AlbumCountOutputTypeSelectSchema = z.object({
    files: z.boolean().optional(),
    channels: z.boolean().optional(),
}).strict();
export const AlbumSelectSchema = z.object({
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    files: z.union([z.boolean(), z.lazy(() => FileFindManyArgsSchema)]).optional(),
    channels: z.union([z.boolean(), z.lazy(() => SubscribedChannelFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => AlbumCountOutputTypeArgsSchema)]).optional(),
}).strict();
// SUBSCRIBED CHANNEL
//------------------------------------------------------
export const SubscribedChannelIncludeSchema = z.object({
    guild: z.union([z.boolean(), z.lazy(() => GuildArgsSchema)]).optional(),
    album: z.union([z.boolean(), z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict();
export const SubscribedChannelArgsSchema = z.object({
    select: z.lazy(() => SubscribedChannelSelectSchema).optional(),
    include: z.lazy(() => SubscribedChannelIncludeSchema).optional(),
}).strict();
export const SubscribedChannelSelectSchema = z.object({
    channelId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    guildId: z.boolean().optional(),
    albumName: z.boolean().optional(),
    guild: z.union([z.boolean(), z.lazy(() => GuildArgsSchema)]).optional(),
    album: z.union([z.boolean(), z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict();
// FILE
//------------------------------------------------------
export const FileIncludeSchema = z.object({
    album: z.union([z.boolean(), z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict();
export const FileArgsSchema = z.object({
    select: z.lazy(() => FileSelectSchema).optional(),
    include: z.lazy(() => FileIncludeSchema).optional(),
}).strict();
export const FileSelectSchema = z.object({
    discordId: z.boolean().optional(),
    uploaderId: z.boolean().optional(),
    fileName: z.boolean().optional(),
    description: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    albumName: z.boolean().optional(),
    album: z.union([z.boolean(), z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict();
/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////
export const GuildWhereInputSchema = z.object({
    AND: z.union([z.lazy(() => GuildWhereInputSchema), z.lazy(() => GuildWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => GuildWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => GuildWhereInputSchema), z.lazy(() => GuildWhereInputSchema).array()]).optional(),
    guildId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    subscribedChannels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict();
export const GuildOrderByWithRelationInputSchema = z.object({
    guildId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    subscribedChannels: z.lazy(() => SubscribedChannelOrderByRelationAggregateInputSchema).optional()
}).strict();
export const GuildWhereUniqueInputSchema = z.object({
    guildId: z.string()
})
    .and(z.object({
    guildId: z.string().optional(),
    AND: z.union([z.lazy(() => GuildWhereInputSchema), z.lazy(() => GuildWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => GuildWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => GuildWhereInputSchema), z.lazy(() => GuildWhereInputSchema).array()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    subscribedChannels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict());
export const GuildOrderByWithAggregationInputSchema = z.object({
    guildId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => GuildCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => GuildMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => GuildMinOrderByAggregateInputSchema).optional()
}).strict();
export const GuildScalarWhereWithAggregatesInputSchema = z.object({
    AND: z.union([z.lazy(() => GuildScalarWhereWithAggregatesInputSchema), z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => GuildScalarWhereWithAggregatesInputSchema), z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array()]).optional(),
    guildId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
}).strict();
export const AlbumWhereInputSchema = z.object({
    AND: z.union([z.lazy(() => AlbumWhereInputSchema), z.lazy(() => AlbumWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => AlbumWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => AlbumWhereInputSchema), z.lazy(() => AlbumWhereInputSchema).array()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    files: z.lazy(() => FileListRelationFilterSchema).optional(),
    channels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict();
export const AlbumOrderByWithRelationInputSchema = z.object({
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    files: z.lazy(() => FileOrderByRelationAggregateInputSchema).optional(),
    channels: z.lazy(() => SubscribedChannelOrderByRelationAggregateInputSchema).optional()
}).strict();
export const AlbumWhereUniqueInputSchema = z.object({
    name: z.string()
})
    .and(z.object({
    name: z.string().optional(),
    AND: z.union([z.lazy(() => AlbumWhereInputSchema), z.lazy(() => AlbumWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => AlbumWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => AlbumWhereInputSchema), z.lazy(() => AlbumWhereInputSchema).array()]).optional(),
    description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    files: z.lazy(() => FileListRelationFilterSchema).optional(),
    channels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict());
export const AlbumOrderByWithAggregationInputSchema = z.object({
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => AlbumCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => AlbumMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => AlbumMinOrderByAggregateInputSchema).optional()
}).strict();
export const AlbumScalarWhereWithAggregatesInputSchema = z.object({
    AND: z.union([z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema), z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema), z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema).array()]).optional(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
}).strict();
export const SubscribedChannelWhereInputSchema = z.object({
    AND: z.union([z.lazy(() => SubscribedChannelWhereInputSchema), z.lazy(() => SubscribedChannelWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => SubscribedChannelWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => SubscribedChannelWhereInputSchema), z.lazy(() => SubscribedChannelWhereInputSchema).array()]).optional(),
    channelId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    guildId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    albumName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    guild: z.union([z.lazy(() => GuildScalarRelationFilterSchema), z.lazy(() => GuildWhereInputSchema)]).optional(),
    album: z.union([z.lazy(() => AlbumScalarRelationFilterSchema), z.lazy(() => AlbumWhereInputSchema)]).optional(),
}).strict();
export const SubscribedChannelOrderByWithRelationInputSchema = z.object({
    channelId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    guildId: z.lazy(() => SortOrderSchema).optional(),
    albumName: z.lazy(() => SortOrderSchema).optional(),
    guild: z.lazy(() => GuildOrderByWithRelationInputSchema).optional(),
    album: z.lazy(() => AlbumOrderByWithRelationInputSchema).optional()
}).strict();
export const SubscribedChannelWhereUniqueInputSchema = z.object({
    channelId: z.string()
})
    .and(z.object({
    channelId: z.string().optional(),
    AND: z.union([z.lazy(() => SubscribedChannelWhereInputSchema), z.lazy(() => SubscribedChannelWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => SubscribedChannelWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => SubscribedChannelWhereInputSchema), z.lazy(() => SubscribedChannelWhereInputSchema).array()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    guildId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    albumName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    guild: z.union([z.lazy(() => GuildScalarRelationFilterSchema), z.lazy(() => GuildWhereInputSchema)]).optional(),
    album: z.union([z.lazy(() => AlbumScalarRelationFilterSchema), z.lazy(() => AlbumWhereInputSchema)]).optional(),
}).strict());
export const SubscribedChannelOrderByWithAggregationInputSchema = z.object({
    channelId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    guildId: z.lazy(() => SortOrderSchema).optional(),
    albumName: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => SubscribedChannelCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => SubscribedChannelMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => SubscribedChannelMinOrderByAggregateInputSchema).optional()
}).strict();
export const SubscribedChannelScalarWhereWithAggregatesInputSchema = z.object({
    AND: z.union([z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema), z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema), z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema).array()]).optional(),
    channelId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    guildId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    albumName: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();
export const FileWhereInputSchema = z.object({
    AND: z.union([z.lazy(() => FileWhereInputSchema), z.lazy(() => FileWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => FileWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => FileWhereInputSchema), z.lazy(() => FileWhereInputSchema).array()]).optional(),
    discordId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    uploaderId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    albumName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    album: z.union([z.lazy(() => AlbumScalarRelationFilterSchema), z.lazy(() => AlbumWhereInputSchema)]).optional(),
}).strict();
export const FileOrderByWithRelationInputSchema = z.object({
    discordId: z.lazy(() => SortOrderSchema).optional(),
    uploaderId: z.lazy(() => SortOrderSchema).optional(),
    fileName: z.lazy(() => SortOrderSchema).optional(),
    description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    albumName: z.lazy(() => SortOrderSchema).optional(),
    album: z.lazy(() => AlbumOrderByWithRelationInputSchema).optional()
}).strict();
export const FileWhereUniqueInputSchema = z.object({
    discordId: z.string()
})
    .and(z.object({
    discordId: z.string().optional(),
    AND: z.union([z.lazy(() => FileWhereInputSchema), z.lazy(() => FileWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => FileWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => FileWhereInputSchema), z.lazy(() => FileWhereInputSchema).array()]).optional(),
    uploaderId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    albumName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    album: z.union([z.lazy(() => AlbumScalarRelationFilterSchema), z.lazy(() => AlbumWhereInputSchema)]).optional(),
}).strict());
export const FileOrderByWithAggregationInputSchema = z.object({
    discordId: z.lazy(() => SortOrderSchema).optional(),
    uploaderId: z.lazy(() => SortOrderSchema).optional(),
    fileName: z.lazy(() => SortOrderSchema).optional(),
    description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    albumName: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => FileCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => FileMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => FileMinOrderByAggregateInputSchema).optional()
}).strict();
export const FileScalarWhereWithAggregatesInputSchema = z.object({
    AND: z.union([z.lazy(() => FileScalarWhereWithAggregatesInputSchema), z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => FileScalarWhereWithAggregatesInputSchema), z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array()]).optional(),
    discordId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    uploaderId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    fileName: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    albumName: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
}).strict();
export const GuildCreateInputSchema = z.object({
    guildId: z.string(),
    createdAt: z.coerce.date().optional(),
    subscribedChannels: z.lazy(() => SubscribedChannelCreateNestedManyWithoutGuildInputSchema).optional()
}).strict();
export const GuildUncheckedCreateInputSchema = z.object({
    guildId: z.string(),
    createdAt: z.coerce.date().optional(),
    subscribedChannels: z.lazy(() => SubscribedChannelUncheckedCreateNestedManyWithoutGuildInputSchema).optional()
}).strict();
export const GuildUpdateInputSchema = z.object({
    guildId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    subscribedChannels: z.lazy(() => SubscribedChannelUpdateManyWithoutGuildNestedInputSchema).optional()
}).strict();
export const GuildUncheckedUpdateInputSchema = z.object({
    guildId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    subscribedChannels: z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutGuildNestedInputSchema).optional()
}).strict();
export const GuildCreateManyInputSchema = z.object({
    guildId: z.string(),
    createdAt: z.coerce.date().optional()
}).strict();
export const GuildUpdateManyMutationInputSchema = z.object({
    guildId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const GuildUncheckedUpdateManyInputSchema = z.object({
    guildId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const AlbumCreateInputSchema = z.object({
    name: z.string(),
    description: z.string(),
    createdAt: z.coerce.date().optional(),
    files: z.lazy(() => FileCreateNestedManyWithoutAlbumInputSchema).optional(),
    channels: z.lazy(() => SubscribedChannelCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();
export const AlbumUncheckedCreateInputSchema = z.object({
    name: z.string(),
    description: z.string(),
    createdAt: z.coerce.date().optional(),
    files: z.lazy(() => FileUncheckedCreateNestedManyWithoutAlbumInputSchema).optional(),
    channels: z.lazy(() => SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();
export const AlbumUpdateInputSchema = z.object({
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    files: z.lazy(() => FileUpdateManyWithoutAlbumNestedInputSchema).optional(),
    channels: z.lazy(() => SubscribedChannelUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();
export const AlbumUncheckedUpdateInputSchema = z.object({
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    files: z.lazy(() => FileUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional(),
    channels: z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();
export const AlbumCreateManyInputSchema = z.object({
    name: z.string(),
    description: z.string(),
    createdAt: z.coerce.date().optional()
}).strict();
export const AlbumUpdateManyMutationInputSchema = z.object({
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const AlbumUncheckedUpdateManyInputSchema = z.object({
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const SubscribedChannelCreateInputSchema = z.object({
    channelId: z.string(),
    createdAt: z.coerce.date().optional(),
    guild: z.lazy(() => GuildCreateNestedOneWithoutSubscribedChannelsInputSchema),
    album: z.lazy(() => AlbumCreateNestedOneWithoutChannelsInputSchema)
}).strict();
export const SubscribedChannelUncheckedCreateInputSchema = z.object({
    channelId: z.string(),
    createdAt: z.coerce.date().optional(),
    guildId: z.string(),
    albumName: z.string()
}).strict();
export const SubscribedChannelUpdateInputSchema = z.object({
    channelId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    guild: z.lazy(() => GuildUpdateOneRequiredWithoutSubscribedChannelsNestedInputSchema).optional(),
    album: z.lazy(() => AlbumUpdateOneRequiredWithoutChannelsNestedInputSchema).optional()
}).strict();
export const SubscribedChannelUncheckedUpdateInputSchema = z.object({
    channelId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    guildId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    albumName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const SubscribedChannelCreateManyInputSchema = z.object({
    channelId: z.string(),
    createdAt: z.coerce.date().optional(),
    guildId: z.string(),
    albumName: z.string()
}).strict();
export const SubscribedChannelUpdateManyMutationInputSchema = z.object({
    channelId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const SubscribedChannelUncheckedUpdateManyInputSchema = z.object({
    channelId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    guildId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    albumName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const FileCreateInputSchema = z.object({
    discordId: z.string(),
    uploaderId: z.string(),
    fileName: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    album: z.lazy(() => AlbumCreateNestedOneWithoutFilesInputSchema)
}).strict();
export const FileUncheckedCreateInputSchema = z.object({
    discordId: z.string(),
    uploaderId: z.string(),
    fileName: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    albumName: z.string()
}).strict();
export const FileUpdateInputSchema = z.object({
    discordId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uploaderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    album: z.lazy(() => AlbumUpdateOneRequiredWithoutFilesNestedInputSchema).optional()
}).strict();
export const FileUncheckedUpdateInputSchema = z.object({
    discordId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uploaderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    albumName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const FileCreateManyInputSchema = z.object({
    discordId: z.string(),
    uploaderId: z.string(),
    fileName: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    albumName: z.string()
}).strict();
export const FileUpdateManyMutationInputSchema = z.object({
    discordId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uploaderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const FileUncheckedUpdateManyInputSchema = z.object({
    discordId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uploaderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    albumName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const StringFilterSchema = z.object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();
export const DateTimeFilterSchema = z.object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();
export const SubscribedChannelListRelationFilterSchema = z.object({
    every: z.lazy(() => SubscribedChannelWhereInputSchema).optional(),
    some: z.lazy(() => SubscribedChannelWhereInputSchema).optional(),
    none: z.lazy(() => SubscribedChannelWhereInputSchema).optional()
}).strict();
export const SubscribedChannelOrderByRelationAggregateInputSchema = z.object({
    _count: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const GuildCountOrderByAggregateInputSchema = z.object({
    guildId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const GuildMaxOrderByAggregateInputSchema = z.object({
    guildId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const GuildMinOrderByAggregateInputSchema = z.object({
    guildId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const StringWithAggregatesFilterSchema = z.object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();
export const DateTimeWithAggregatesFilterSchema = z.object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();
export const FileListRelationFilterSchema = z.object({
    every: z.lazy(() => FileWhereInputSchema).optional(),
    some: z.lazy(() => FileWhereInputSchema).optional(),
    none: z.lazy(() => FileWhereInputSchema).optional()
}).strict();
export const FileOrderByRelationAggregateInputSchema = z.object({
    _count: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const AlbumCountOrderByAggregateInputSchema = z.object({
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const AlbumMaxOrderByAggregateInputSchema = z.object({
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const AlbumMinOrderByAggregateInputSchema = z.object({
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const GuildScalarRelationFilterSchema = z.object({
    is: z.lazy(() => GuildWhereInputSchema).optional(),
    isNot: z.lazy(() => GuildWhereInputSchema).optional()
}).strict();
export const AlbumScalarRelationFilterSchema = z.object({
    is: z.lazy(() => AlbumWhereInputSchema).optional(),
    isNot: z.lazy(() => AlbumWhereInputSchema).optional()
}).strict();
export const SubscribedChannelCountOrderByAggregateInputSchema = z.object({
    channelId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    guildId: z.lazy(() => SortOrderSchema).optional(),
    albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const SubscribedChannelMaxOrderByAggregateInputSchema = z.object({
    channelId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    guildId: z.lazy(() => SortOrderSchema).optional(),
    albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const SubscribedChannelMinOrderByAggregateInputSchema = z.object({
    channelId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    guildId: z.lazy(() => SortOrderSchema).optional(),
    albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const StringNullableFilterSchema = z.object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
}).strict();
export const SortOrderInputSchema = z.object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();
export const FileCountOrderByAggregateInputSchema = z.object({
    discordId: z.lazy(() => SortOrderSchema).optional(),
    uploaderId: z.lazy(() => SortOrderSchema).optional(),
    fileName: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const FileMaxOrderByAggregateInputSchema = z.object({
    discordId: z.lazy(() => SortOrderSchema).optional(),
    uploaderId: z.lazy(() => SortOrderSchema).optional(),
    fileName: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const FileMinOrderByAggregateInputSchema = z.object({
    discordId: z.lazy(() => SortOrderSchema).optional(),
    uploaderId: z.lazy(() => SortOrderSchema).optional(),
    fileName: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();
export const StringNullableWithAggregatesFilterSchema = z.object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();
export const SubscribedChannelCreateNestedManyWithoutGuildInputSchema = z.object({
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema).array(), z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema), z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema).array()]).optional(),
    createMany: z.lazy(() => SubscribedChannelCreateManyGuildInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
}).strict();
export const SubscribedChannelUncheckedCreateNestedManyWithoutGuildInputSchema = z.object({
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema).array(), z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema), z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema).array()]).optional(),
    createMany: z.lazy(() => SubscribedChannelCreateManyGuildInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
}).strict();
export const StringFieldUpdateOperationsInputSchema = z.object({
    set: z.string().optional()
}).strict();
export const DateTimeFieldUpdateOperationsInputSchema = z.object({
    set: z.coerce.date().optional()
}).strict();
export const SubscribedChannelUpdateManyWithoutGuildNestedInputSchema = z.object({
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema).array(), z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema), z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutGuildInputSchema).array()]).optional(),
    createMany: z.lazy(() => SubscribedChannelCreateManyGuildInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutGuildInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutGuildInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => SubscribedChannelScalarWhereInputSchema), z.lazy(() => SubscribedChannelScalarWhereInputSchema).array()]).optional(),
}).strict();
export const SubscribedChannelUncheckedUpdateManyWithoutGuildNestedInputSchema = z.object({
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema).array(), z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema), z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutGuildInputSchema).array()]).optional(),
    createMany: z.lazy(() => SubscribedChannelCreateManyGuildInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutGuildInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutGuildInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => SubscribedChannelScalarWhereInputSchema), z.lazy(() => SubscribedChannelScalarWhereInputSchema).array()]).optional(),
}).strict();
export const FileCreateNestedManyWithoutAlbumInputSchema = z.object({
    create: z.union([z.lazy(() => FileCreateWithoutAlbumInputSchema), z.lazy(() => FileCreateWithoutAlbumInputSchema).array(), z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema), z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema), z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema).array()]).optional(),
    createMany: z.lazy(() => FileCreateManyAlbumInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => FileWhereUniqueInputSchema), z.lazy(() => FileWhereUniqueInputSchema).array()]).optional(),
}).strict();
export const SubscribedChannelCreateNestedManyWithoutAlbumInputSchema = z.object({
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema).array(), z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema).array()]).optional(),
    createMany: z.lazy(() => SubscribedChannelCreateManyAlbumInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
}).strict();
export const FileUncheckedCreateNestedManyWithoutAlbumInputSchema = z.object({
    create: z.union([z.lazy(() => FileCreateWithoutAlbumInputSchema), z.lazy(() => FileCreateWithoutAlbumInputSchema).array(), z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema), z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema), z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema).array()]).optional(),
    createMany: z.lazy(() => FileCreateManyAlbumInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => FileWhereUniqueInputSchema), z.lazy(() => FileWhereUniqueInputSchema).array()]).optional(),
}).strict();
export const SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInputSchema = z.object({
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema).array(), z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema).array()]).optional(),
    createMany: z.lazy(() => SubscribedChannelCreateManyAlbumInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
}).strict();
export const FileUpdateManyWithoutAlbumNestedInputSchema = z.object({
    create: z.union([z.lazy(() => FileCreateWithoutAlbumInputSchema), z.lazy(() => FileCreateWithoutAlbumInputSchema).array(), z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema), z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema), z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => FileUpsertWithWhereUniqueWithoutAlbumInputSchema), z.lazy(() => FileUpsertWithWhereUniqueWithoutAlbumInputSchema).array()]).optional(),
    createMany: z.lazy(() => FileCreateManyAlbumInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => FileWhereUniqueInputSchema), z.lazy(() => FileWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => FileWhereUniqueInputSchema), z.lazy(() => FileWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => FileWhereUniqueInputSchema), z.lazy(() => FileWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => FileWhereUniqueInputSchema), z.lazy(() => FileWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => FileUpdateWithWhereUniqueWithoutAlbumInputSchema), z.lazy(() => FileUpdateWithWhereUniqueWithoutAlbumInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => FileUpdateManyWithWhereWithoutAlbumInputSchema), z.lazy(() => FileUpdateManyWithWhereWithoutAlbumInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => FileScalarWhereInputSchema), z.lazy(() => FileScalarWhereInputSchema).array()]).optional(),
}).strict();
export const SubscribedChannelUpdateManyWithoutAlbumNestedInputSchema = z.object({
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema).array(), z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInputSchema).array()]).optional(),
    createMany: z.lazy(() => SubscribedChannelCreateManyAlbumInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutAlbumInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => SubscribedChannelScalarWhereInputSchema), z.lazy(() => SubscribedChannelScalarWhereInputSchema).array()]).optional(),
}).strict();
export const FileUncheckedUpdateManyWithoutAlbumNestedInputSchema = z.object({
    create: z.union([z.lazy(() => FileCreateWithoutAlbumInputSchema), z.lazy(() => FileCreateWithoutAlbumInputSchema).array(), z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema), z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema), z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => FileUpsertWithWhereUniqueWithoutAlbumInputSchema), z.lazy(() => FileUpsertWithWhereUniqueWithoutAlbumInputSchema).array()]).optional(),
    createMany: z.lazy(() => FileCreateManyAlbumInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => FileWhereUniqueInputSchema), z.lazy(() => FileWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => FileWhereUniqueInputSchema), z.lazy(() => FileWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => FileWhereUniqueInputSchema), z.lazy(() => FileWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => FileWhereUniqueInputSchema), z.lazy(() => FileWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => FileUpdateWithWhereUniqueWithoutAlbumInputSchema), z.lazy(() => FileUpdateWithWhereUniqueWithoutAlbumInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => FileUpdateManyWithWhereWithoutAlbumInputSchema), z.lazy(() => FileUpdateManyWithWhereWithoutAlbumInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => FileScalarWhereInputSchema), z.lazy(() => FileScalarWhereInputSchema).array()]).optional(),
}).strict();
export const SubscribedChannelUncheckedUpdateManyWithoutAlbumNestedInputSchema = z.object({
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema).array(), z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInputSchema).array()]).optional(),
    createMany: z.lazy(() => SubscribedChannelCreateManyAlbumInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => SubscribedChannelWhereUniqueInputSchema), z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutAlbumInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => SubscribedChannelScalarWhereInputSchema), z.lazy(() => SubscribedChannelScalarWhereInputSchema).array()]).optional(),
}).strict();
export const GuildCreateNestedOneWithoutSubscribedChannelsInputSchema = z.object({
    create: z.union([z.lazy(() => GuildCreateWithoutSubscribedChannelsInputSchema), z.lazy(() => GuildUncheckedCreateWithoutSubscribedChannelsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => GuildCreateOrConnectWithoutSubscribedChannelsInputSchema).optional(),
    connect: z.lazy(() => GuildWhereUniqueInputSchema).optional()
}).strict();
export const AlbumCreateNestedOneWithoutChannelsInputSchema = z.object({
    create: z.union([z.lazy(() => AlbumCreateWithoutChannelsInputSchema), z.lazy(() => AlbumUncheckedCreateWithoutChannelsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => AlbumCreateOrConnectWithoutChannelsInputSchema).optional(),
    connect: z.lazy(() => AlbumWhereUniqueInputSchema).optional()
}).strict();
export const GuildUpdateOneRequiredWithoutSubscribedChannelsNestedInputSchema = z.object({
    create: z.union([z.lazy(() => GuildCreateWithoutSubscribedChannelsInputSchema), z.lazy(() => GuildUncheckedCreateWithoutSubscribedChannelsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => GuildCreateOrConnectWithoutSubscribedChannelsInputSchema).optional(),
    upsert: z.lazy(() => GuildUpsertWithoutSubscribedChannelsInputSchema).optional(),
    connect: z.lazy(() => GuildWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => GuildUpdateToOneWithWhereWithoutSubscribedChannelsInputSchema), z.lazy(() => GuildUpdateWithoutSubscribedChannelsInputSchema), z.lazy(() => GuildUncheckedUpdateWithoutSubscribedChannelsInputSchema)]).optional(),
}).strict();
export const AlbumUpdateOneRequiredWithoutChannelsNestedInputSchema = z.object({
    create: z.union([z.lazy(() => AlbumCreateWithoutChannelsInputSchema), z.lazy(() => AlbumUncheckedCreateWithoutChannelsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => AlbumCreateOrConnectWithoutChannelsInputSchema).optional(),
    upsert: z.lazy(() => AlbumUpsertWithoutChannelsInputSchema).optional(),
    connect: z.lazy(() => AlbumWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => AlbumUpdateToOneWithWhereWithoutChannelsInputSchema), z.lazy(() => AlbumUpdateWithoutChannelsInputSchema), z.lazy(() => AlbumUncheckedUpdateWithoutChannelsInputSchema)]).optional(),
}).strict();
export const AlbumCreateNestedOneWithoutFilesInputSchema = z.object({
    create: z.union([z.lazy(() => AlbumCreateWithoutFilesInputSchema), z.lazy(() => AlbumUncheckedCreateWithoutFilesInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => AlbumCreateOrConnectWithoutFilesInputSchema).optional(),
    connect: z.lazy(() => AlbumWhereUniqueInputSchema).optional()
}).strict();
export const NullableStringFieldUpdateOperationsInputSchema = z.object({
    set: z.string().optional().nullable()
}).strict();
export const AlbumUpdateOneRequiredWithoutFilesNestedInputSchema = z.object({
    create: z.union([z.lazy(() => AlbumCreateWithoutFilesInputSchema), z.lazy(() => AlbumUncheckedCreateWithoutFilesInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => AlbumCreateOrConnectWithoutFilesInputSchema).optional(),
    upsert: z.lazy(() => AlbumUpsertWithoutFilesInputSchema).optional(),
    connect: z.lazy(() => AlbumWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => AlbumUpdateToOneWithWhereWithoutFilesInputSchema), z.lazy(() => AlbumUpdateWithoutFilesInputSchema), z.lazy(() => AlbumUncheckedUpdateWithoutFilesInputSchema)]).optional(),
}).strict();
export const NestedStringFilterSchema = z.object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
}).strict();
export const NestedDateTimeFilterSchema = z.object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
}).strict();
export const NestedStringWithAggregatesFilterSchema = z.object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();
export const NestedIntFilterSchema = z.object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
}).strict();
export const NestedDateTimeWithAggregatesFilterSchema = z.object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();
export const NestedStringNullableFilterSchema = z.object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
}).strict();
export const NestedStringNullableWithAggregatesFilterSchema = z.object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();
export const NestedIntNullableFilterSchema = z.object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable(),
}).strict();
export const SubscribedChannelCreateWithoutGuildInputSchema = z.object({
    channelId: z.string(),
    createdAt: z.coerce.date().optional(),
    album: z.lazy(() => AlbumCreateNestedOneWithoutChannelsInputSchema)
}).strict();
export const SubscribedChannelUncheckedCreateWithoutGuildInputSchema = z.object({
    channelId: z.string(),
    createdAt: z.coerce.date().optional(),
    albumName: z.string()
}).strict();
export const SubscribedChannelCreateOrConnectWithoutGuildInputSchema = z.object({
    where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema)]),
}).strict();
export const SubscribedChannelCreateManyGuildInputEnvelopeSchema = z.object({
    data: z.union([z.lazy(() => SubscribedChannelCreateManyGuildInputSchema), z.lazy(() => SubscribedChannelCreateManyGuildInputSchema).array()]),
    skipDuplicates: z.boolean().optional()
}).strict();
export const SubscribedChannelUpsertWithWhereUniqueWithoutGuildInputSchema = z.object({
    where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
    update: z.union([z.lazy(() => SubscribedChannelUpdateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUncheckedUpdateWithoutGuildInputSchema)]),
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema)]),
}).strict();
export const SubscribedChannelUpdateWithWhereUniqueWithoutGuildInputSchema = z.object({
    where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
    data: z.union([z.lazy(() => SubscribedChannelUpdateWithoutGuildInputSchema), z.lazy(() => SubscribedChannelUncheckedUpdateWithoutGuildInputSchema)]),
}).strict();
export const SubscribedChannelUpdateManyWithWhereWithoutGuildInputSchema = z.object({
    where: z.lazy(() => SubscribedChannelScalarWhereInputSchema),
    data: z.union([z.lazy(() => SubscribedChannelUpdateManyMutationInputSchema), z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutGuildInputSchema)]),
}).strict();
export const SubscribedChannelScalarWhereInputSchema = z.object({
    AND: z.union([z.lazy(() => SubscribedChannelScalarWhereInputSchema), z.lazy(() => SubscribedChannelScalarWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => SubscribedChannelScalarWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => SubscribedChannelScalarWhereInputSchema), z.lazy(() => SubscribedChannelScalarWhereInputSchema).array()]).optional(),
    channelId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    guildId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    albumName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();
export const FileCreateWithoutAlbumInputSchema = z.object({
    discordId: z.string(),
    uploaderId: z.string(),
    fileName: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional()
}).strict();
export const FileUncheckedCreateWithoutAlbumInputSchema = z.object({
    discordId: z.string(),
    uploaderId: z.string(),
    fileName: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional()
}).strict();
export const FileCreateOrConnectWithoutAlbumInputSchema = z.object({
    where: z.lazy(() => FileWhereUniqueInputSchema),
    create: z.union([z.lazy(() => FileCreateWithoutAlbumInputSchema), z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema)]),
}).strict();
export const FileCreateManyAlbumInputEnvelopeSchema = z.object({
    data: z.union([z.lazy(() => FileCreateManyAlbumInputSchema), z.lazy(() => FileCreateManyAlbumInputSchema).array()]),
    skipDuplicates: z.boolean().optional()
}).strict();
export const SubscribedChannelCreateWithoutAlbumInputSchema = z.object({
    channelId: z.string(),
    createdAt: z.coerce.date().optional(),
    guild: z.lazy(() => GuildCreateNestedOneWithoutSubscribedChannelsInputSchema)
}).strict();
export const SubscribedChannelUncheckedCreateWithoutAlbumInputSchema = z.object({
    channelId: z.string(),
    createdAt: z.coerce.date().optional(),
    guildId: z.string()
}).strict();
export const SubscribedChannelCreateOrConnectWithoutAlbumInputSchema = z.object({
    where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema)]),
}).strict();
export const SubscribedChannelCreateManyAlbumInputEnvelopeSchema = z.object({
    data: z.union([z.lazy(() => SubscribedChannelCreateManyAlbumInputSchema), z.lazy(() => SubscribedChannelCreateManyAlbumInputSchema).array()]),
    skipDuplicates: z.boolean().optional()
}).strict();
export const FileUpsertWithWhereUniqueWithoutAlbumInputSchema = z.object({
    where: z.lazy(() => FileWhereUniqueInputSchema),
    update: z.union([z.lazy(() => FileUpdateWithoutAlbumInputSchema), z.lazy(() => FileUncheckedUpdateWithoutAlbumInputSchema)]),
    create: z.union([z.lazy(() => FileCreateWithoutAlbumInputSchema), z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema)]),
}).strict();
export const FileUpdateWithWhereUniqueWithoutAlbumInputSchema = z.object({
    where: z.lazy(() => FileWhereUniqueInputSchema),
    data: z.union([z.lazy(() => FileUpdateWithoutAlbumInputSchema), z.lazy(() => FileUncheckedUpdateWithoutAlbumInputSchema)]),
}).strict();
export const FileUpdateManyWithWhereWithoutAlbumInputSchema = z.object({
    where: z.lazy(() => FileScalarWhereInputSchema),
    data: z.union([z.lazy(() => FileUpdateManyMutationInputSchema), z.lazy(() => FileUncheckedUpdateManyWithoutAlbumInputSchema)]),
}).strict();
export const FileScalarWhereInputSchema = z.object({
    AND: z.union([z.lazy(() => FileScalarWhereInputSchema), z.lazy(() => FileScalarWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => FileScalarWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => FileScalarWhereInputSchema), z.lazy(() => FileScalarWhereInputSchema).array()]).optional(),
    discordId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    uploaderId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    albumName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
}).strict();
export const SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInputSchema = z.object({
    where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
    update: z.union([z.lazy(() => SubscribedChannelUpdateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUncheckedUpdateWithoutAlbumInputSchema)]),
    create: z.union([z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema)]),
}).strict();
export const SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInputSchema = z.object({
    where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
    data: z.union([z.lazy(() => SubscribedChannelUpdateWithoutAlbumInputSchema), z.lazy(() => SubscribedChannelUncheckedUpdateWithoutAlbumInputSchema)]),
}).strict();
export const SubscribedChannelUpdateManyWithWhereWithoutAlbumInputSchema = z.object({
    where: z.lazy(() => SubscribedChannelScalarWhereInputSchema),
    data: z.union([z.lazy(() => SubscribedChannelUpdateManyMutationInputSchema), z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutAlbumInputSchema)]),
}).strict();
export const GuildCreateWithoutSubscribedChannelsInputSchema = z.object({
    guildId: z.string(),
    createdAt: z.coerce.date().optional()
}).strict();
export const GuildUncheckedCreateWithoutSubscribedChannelsInputSchema = z.object({
    guildId: z.string(),
    createdAt: z.coerce.date().optional()
}).strict();
export const GuildCreateOrConnectWithoutSubscribedChannelsInputSchema = z.object({
    where: z.lazy(() => GuildWhereUniqueInputSchema),
    create: z.union([z.lazy(() => GuildCreateWithoutSubscribedChannelsInputSchema), z.lazy(() => GuildUncheckedCreateWithoutSubscribedChannelsInputSchema)]),
}).strict();
export const AlbumCreateWithoutChannelsInputSchema = z.object({
    name: z.string(),
    description: z.string(),
    createdAt: z.coerce.date().optional(),
    files: z.lazy(() => FileCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();
export const AlbumUncheckedCreateWithoutChannelsInputSchema = z.object({
    name: z.string(),
    description: z.string(),
    createdAt: z.coerce.date().optional(),
    files: z.lazy(() => FileUncheckedCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();
export const AlbumCreateOrConnectWithoutChannelsInputSchema = z.object({
    where: z.lazy(() => AlbumWhereUniqueInputSchema),
    create: z.union([z.lazy(() => AlbumCreateWithoutChannelsInputSchema), z.lazy(() => AlbumUncheckedCreateWithoutChannelsInputSchema)]),
}).strict();
export const GuildUpsertWithoutSubscribedChannelsInputSchema = z.object({
    update: z.union([z.lazy(() => GuildUpdateWithoutSubscribedChannelsInputSchema), z.lazy(() => GuildUncheckedUpdateWithoutSubscribedChannelsInputSchema)]),
    create: z.union([z.lazy(() => GuildCreateWithoutSubscribedChannelsInputSchema), z.lazy(() => GuildUncheckedCreateWithoutSubscribedChannelsInputSchema)]),
    where: z.lazy(() => GuildWhereInputSchema).optional()
}).strict();
export const GuildUpdateToOneWithWhereWithoutSubscribedChannelsInputSchema = z.object({
    where: z.lazy(() => GuildWhereInputSchema).optional(),
    data: z.union([z.lazy(() => GuildUpdateWithoutSubscribedChannelsInputSchema), z.lazy(() => GuildUncheckedUpdateWithoutSubscribedChannelsInputSchema)]),
}).strict();
export const GuildUpdateWithoutSubscribedChannelsInputSchema = z.object({
    guildId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const GuildUncheckedUpdateWithoutSubscribedChannelsInputSchema = z.object({
    guildId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const AlbumUpsertWithoutChannelsInputSchema = z.object({
    update: z.union([z.lazy(() => AlbumUpdateWithoutChannelsInputSchema), z.lazy(() => AlbumUncheckedUpdateWithoutChannelsInputSchema)]),
    create: z.union([z.lazy(() => AlbumCreateWithoutChannelsInputSchema), z.lazy(() => AlbumUncheckedCreateWithoutChannelsInputSchema)]),
    where: z.lazy(() => AlbumWhereInputSchema).optional()
}).strict();
export const AlbumUpdateToOneWithWhereWithoutChannelsInputSchema = z.object({
    where: z.lazy(() => AlbumWhereInputSchema).optional(),
    data: z.union([z.lazy(() => AlbumUpdateWithoutChannelsInputSchema), z.lazy(() => AlbumUncheckedUpdateWithoutChannelsInputSchema)]),
}).strict();
export const AlbumUpdateWithoutChannelsInputSchema = z.object({
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    files: z.lazy(() => FileUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();
export const AlbumUncheckedUpdateWithoutChannelsInputSchema = z.object({
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    files: z.lazy(() => FileUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();
export const AlbumCreateWithoutFilesInputSchema = z.object({
    name: z.string(),
    description: z.string(),
    createdAt: z.coerce.date().optional(),
    channels: z.lazy(() => SubscribedChannelCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();
export const AlbumUncheckedCreateWithoutFilesInputSchema = z.object({
    name: z.string(),
    description: z.string(),
    createdAt: z.coerce.date().optional(),
    channels: z.lazy(() => SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();
export const AlbumCreateOrConnectWithoutFilesInputSchema = z.object({
    where: z.lazy(() => AlbumWhereUniqueInputSchema),
    create: z.union([z.lazy(() => AlbumCreateWithoutFilesInputSchema), z.lazy(() => AlbumUncheckedCreateWithoutFilesInputSchema)]),
}).strict();
export const AlbumUpsertWithoutFilesInputSchema = z.object({
    update: z.union([z.lazy(() => AlbumUpdateWithoutFilesInputSchema), z.lazy(() => AlbumUncheckedUpdateWithoutFilesInputSchema)]),
    create: z.union([z.lazy(() => AlbumCreateWithoutFilesInputSchema), z.lazy(() => AlbumUncheckedCreateWithoutFilesInputSchema)]),
    where: z.lazy(() => AlbumWhereInputSchema).optional()
}).strict();
export const AlbumUpdateToOneWithWhereWithoutFilesInputSchema = z.object({
    where: z.lazy(() => AlbumWhereInputSchema).optional(),
    data: z.union([z.lazy(() => AlbumUpdateWithoutFilesInputSchema), z.lazy(() => AlbumUncheckedUpdateWithoutFilesInputSchema)]),
}).strict();
export const AlbumUpdateWithoutFilesInputSchema = z.object({
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    channels: z.lazy(() => SubscribedChannelUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();
export const AlbumUncheckedUpdateWithoutFilesInputSchema = z.object({
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    channels: z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();
export const SubscribedChannelCreateManyGuildInputSchema = z.object({
    channelId: z.string(),
    createdAt: z.coerce.date().optional(),
    albumName: z.string()
}).strict();
export const SubscribedChannelUpdateWithoutGuildInputSchema = z.object({
    channelId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    album: z.lazy(() => AlbumUpdateOneRequiredWithoutChannelsNestedInputSchema).optional()
}).strict();
export const SubscribedChannelUncheckedUpdateWithoutGuildInputSchema = z.object({
    channelId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    albumName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const SubscribedChannelUncheckedUpdateManyWithoutGuildInputSchema = z.object({
    channelId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    albumName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const FileCreateManyAlbumInputSchema = z.object({
    discordId: z.string(),
    uploaderId: z.string(),
    fileName: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional()
}).strict();
export const SubscribedChannelCreateManyAlbumInputSchema = z.object({
    channelId: z.string(),
    createdAt: z.coerce.date().optional(),
    guildId: z.string()
}).strict();
export const FileUpdateWithoutAlbumInputSchema = z.object({
    discordId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uploaderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const FileUncheckedUpdateWithoutAlbumInputSchema = z.object({
    discordId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uploaderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const FileUncheckedUpdateManyWithoutAlbumInputSchema = z.object({
    discordId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uploaderId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const SubscribedChannelUpdateWithoutAlbumInputSchema = z.object({
    channelId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    guild: z.lazy(() => GuildUpdateOneRequiredWithoutSubscribedChannelsNestedInputSchema).optional()
}).strict();
export const SubscribedChannelUncheckedUpdateWithoutAlbumInputSchema = z.object({
    channelId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    guildId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
export const SubscribedChannelUncheckedUpdateManyWithoutAlbumInputSchema = z.object({
    channelId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    guildId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
}).strict();
/////////////////////////////////////////
// ARGS
/////////////////////////////////////////
export const GuildFindFirstArgsSchema = z.object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereInputSchema.optional(),
    orderBy: z.union([GuildOrderByWithRelationInputSchema.array(), GuildOrderByWithRelationInputSchema]).optional(),
    cursor: GuildWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([GuildScalarFieldEnumSchema, GuildScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const GuildFindFirstOrThrowArgsSchema = z.object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereInputSchema.optional(),
    orderBy: z.union([GuildOrderByWithRelationInputSchema.array(), GuildOrderByWithRelationInputSchema]).optional(),
    cursor: GuildWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([GuildScalarFieldEnumSchema, GuildScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const GuildFindManyArgsSchema = z.object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereInputSchema.optional(),
    orderBy: z.union([GuildOrderByWithRelationInputSchema.array(), GuildOrderByWithRelationInputSchema]).optional(),
    cursor: GuildWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([GuildScalarFieldEnumSchema, GuildScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const GuildAggregateArgsSchema = z.object({
    where: GuildWhereInputSchema.optional(),
    orderBy: z.union([GuildOrderByWithRelationInputSchema.array(), GuildOrderByWithRelationInputSchema]).optional(),
    cursor: GuildWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const GuildGroupByArgsSchema = z.object({
    where: GuildWhereInputSchema.optional(),
    orderBy: z.union([GuildOrderByWithAggregationInputSchema.array(), GuildOrderByWithAggregationInputSchema]).optional(),
    by: GuildScalarFieldEnumSchema.array(),
    having: GuildScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const GuildFindUniqueArgsSchema = z.object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const GuildFindUniqueOrThrowArgsSchema = z.object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const AlbumFindFirstArgsSchema = z.object({
    select: AlbumSelectSchema.optional(),
    include: AlbumIncludeSchema.optional(),
    where: AlbumWhereInputSchema.optional(),
    orderBy: z.union([AlbumOrderByWithRelationInputSchema.array(), AlbumOrderByWithRelationInputSchema]).optional(),
    cursor: AlbumWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([AlbumScalarFieldEnumSchema, AlbumScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const AlbumFindFirstOrThrowArgsSchema = z.object({
    select: AlbumSelectSchema.optional(),
    include: AlbumIncludeSchema.optional(),
    where: AlbumWhereInputSchema.optional(),
    orderBy: z.union([AlbumOrderByWithRelationInputSchema.array(), AlbumOrderByWithRelationInputSchema]).optional(),
    cursor: AlbumWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([AlbumScalarFieldEnumSchema, AlbumScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const AlbumFindManyArgsSchema = z.object({
    select: AlbumSelectSchema.optional(),
    include: AlbumIncludeSchema.optional(),
    where: AlbumWhereInputSchema.optional(),
    orderBy: z.union([AlbumOrderByWithRelationInputSchema.array(), AlbumOrderByWithRelationInputSchema]).optional(),
    cursor: AlbumWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([AlbumScalarFieldEnumSchema, AlbumScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const AlbumAggregateArgsSchema = z.object({
    where: AlbumWhereInputSchema.optional(),
    orderBy: z.union([AlbumOrderByWithRelationInputSchema.array(), AlbumOrderByWithRelationInputSchema]).optional(),
    cursor: AlbumWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const AlbumGroupByArgsSchema = z.object({
    where: AlbumWhereInputSchema.optional(),
    orderBy: z.union([AlbumOrderByWithAggregationInputSchema.array(), AlbumOrderByWithAggregationInputSchema]).optional(),
    by: AlbumScalarFieldEnumSchema.array(),
    having: AlbumScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const AlbumFindUniqueArgsSchema = z.object({
    select: AlbumSelectSchema.optional(),
    include: AlbumIncludeSchema.optional(),
    where: AlbumWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const AlbumFindUniqueOrThrowArgsSchema = z.object({
    select: AlbumSelectSchema.optional(),
    include: AlbumIncludeSchema.optional(),
    where: AlbumWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const SubscribedChannelFindFirstArgsSchema = z.object({
    select: SubscribedChannelSelectSchema.optional(),
    include: SubscribedChannelIncludeSchema.optional(),
    where: SubscribedChannelWhereInputSchema.optional(),
    orderBy: z.union([SubscribedChannelOrderByWithRelationInputSchema.array(), SubscribedChannelOrderByWithRelationInputSchema]).optional(),
    cursor: SubscribedChannelWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([SubscribedChannelScalarFieldEnumSchema, SubscribedChannelScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const SubscribedChannelFindFirstOrThrowArgsSchema = z.object({
    select: SubscribedChannelSelectSchema.optional(),
    include: SubscribedChannelIncludeSchema.optional(),
    where: SubscribedChannelWhereInputSchema.optional(),
    orderBy: z.union([SubscribedChannelOrderByWithRelationInputSchema.array(), SubscribedChannelOrderByWithRelationInputSchema]).optional(),
    cursor: SubscribedChannelWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([SubscribedChannelScalarFieldEnumSchema, SubscribedChannelScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const SubscribedChannelFindManyArgsSchema = z.object({
    select: SubscribedChannelSelectSchema.optional(),
    include: SubscribedChannelIncludeSchema.optional(),
    where: SubscribedChannelWhereInputSchema.optional(),
    orderBy: z.union([SubscribedChannelOrderByWithRelationInputSchema.array(), SubscribedChannelOrderByWithRelationInputSchema]).optional(),
    cursor: SubscribedChannelWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([SubscribedChannelScalarFieldEnumSchema, SubscribedChannelScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const SubscribedChannelAggregateArgsSchema = z.object({
    where: SubscribedChannelWhereInputSchema.optional(),
    orderBy: z.union([SubscribedChannelOrderByWithRelationInputSchema.array(), SubscribedChannelOrderByWithRelationInputSchema]).optional(),
    cursor: SubscribedChannelWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const SubscribedChannelGroupByArgsSchema = z.object({
    where: SubscribedChannelWhereInputSchema.optional(),
    orderBy: z.union([SubscribedChannelOrderByWithAggregationInputSchema.array(), SubscribedChannelOrderByWithAggregationInputSchema]).optional(),
    by: SubscribedChannelScalarFieldEnumSchema.array(),
    having: SubscribedChannelScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const SubscribedChannelFindUniqueArgsSchema = z.object({
    select: SubscribedChannelSelectSchema.optional(),
    include: SubscribedChannelIncludeSchema.optional(),
    where: SubscribedChannelWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const SubscribedChannelFindUniqueOrThrowArgsSchema = z.object({
    select: SubscribedChannelSelectSchema.optional(),
    include: SubscribedChannelIncludeSchema.optional(),
    where: SubscribedChannelWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const FileFindFirstArgsSchema = z.object({
    select: FileSelectSchema.optional(),
    include: FileIncludeSchema.optional(),
    where: FileWhereInputSchema.optional(),
    orderBy: z.union([FileOrderByWithRelationInputSchema.array(), FileOrderByWithRelationInputSchema]).optional(),
    cursor: FileWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FileScalarFieldEnumSchema, FileScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const FileFindFirstOrThrowArgsSchema = z.object({
    select: FileSelectSchema.optional(),
    include: FileIncludeSchema.optional(),
    where: FileWhereInputSchema.optional(),
    orderBy: z.union([FileOrderByWithRelationInputSchema.array(), FileOrderByWithRelationInputSchema]).optional(),
    cursor: FileWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FileScalarFieldEnumSchema, FileScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const FileFindManyArgsSchema = z.object({
    select: FileSelectSchema.optional(),
    include: FileIncludeSchema.optional(),
    where: FileWhereInputSchema.optional(),
    orderBy: z.union([FileOrderByWithRelationInputSchema.array(), FileOrderByWithRelationInputSchema]).optional(),
    cursor: FileWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FileScalarFieldEnumSchema, FileScalarFieldEnumSchema.array()]).optional(),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const FileAggregateArgsSchema = z.object({
    where: FileWhereInputSchema.optional(),
    orderBy: z.union([FileOrderByWithRelationInputSchema.array(), FileOrderByWithRelationInputSchema]).optional(),
    cursor: FileWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const FileGroupByArgsSchema = z.object({
    where: FileWhereInputSchema.optional(),
    orderBy: z.union([FileOrderByWithAggregationInputSchema.array(), FileOrderByWithAggregationInputSchema]).optional(),
    by: FileScalarFieldEnumSchema.array(),
    having: FileScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const FileFindUniqueArgsSchema = z.object({
    select: FileSelectSchema.optional(),
    include: FileIncludeSchema.optional(),
    where: FileWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const FileFindUniqueOrThrowArgsSchema = z.object({
    select: FileSelectSchema.optional(),
    include: FileIncludeSchema.optional(),
    where: FileWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const GuildCreateArgsSchema = z.object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    data: z.union([GuildCreateInputSchema, GuildUncheckedCreateInputSchema]),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const GuildUpsertArgsSchema = z.object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereUniqueInputSchema,
    create: z.union([GuildCreateInputSchema, GuildUncheckedCreateInputSchema]),
    update: z.union([GuildUpdateInputSchema, GuildUncheckedUpdateInputSchema]),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const GuildCreateManyArgsSchema = z.object({
    data: z.union([GuildCreateManyInputSchema, GuildCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const GuildCreateManyAndReturnArgsSchema = z.object({
    data: z.union([GuildCreateManyInputSchema, GuildCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const GuildDeleteArgsSchema = z.object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const GuildUpdateArgsSchema = z.object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    data: z.union([GuildUpdateInputSchema, GuildUncheckedUpdateInputSchema]),
    where: GuildWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const GuildUpdateManyArgsSchema = z.object({
    data: z.union([GuildUpdateManyMutationInputSchema, GuildUncheckedUpdateManyInputSchema]),
    where: GuildWhereInputSchema.optional(),
}).strict();
export const GuildDeleteManyArgsSchema = z.object({
    where: GuildWhereInputSchema.optional(),
}).strict();
export const AlbumCreateArgsSchema = z.object({
    select: AlbumSelectSchema.optional(),
    include: AlbumIncludeSchema.optional(),
    data: z.union([AlbumCreateInputSchema, AlbumUncheckedCreateInputSchema]),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const AlbumUpsertArgsSchema = z.object({
    select: AlbumSelectSchema.optional(),
    include: AlbumIncludeSchema.optional(),
    where: AlbumWhereUniqueInputSchema,
    create: z.union([AlbumCreateInputSchema, AlbumUncheckedCreateInputSchema]),
    update: z.union([AlbumUpdateInputSchema, AlbumUncheckedUpdateInputSchema]),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const AlbumCreateManyArgsSchema = z.object({
    data: z.union([AlbumCreateManyInputSchema, AlbumCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const AlbumCreateManyAndReturnArgsSchema = z.object({
    data: z.union([AlbumCreateManyInputSchema, AlbumCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const AlbumDeleteArgsSchema = z.object({
    select: AlbumSelectSchema.optional(),
    include: AlbumIncludeSchema.optional(),
    where: AlbumWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const AlbumUpdateArgsSchema = z.object({
    select: AlbumSelectSchema.optional(),
    include: AlbumIncludeSchema.optional(),
    data: z.union([AlbumUpdateInputSchema, AlbumUncheckedUpdateInputSchema]),
    where: AlbumWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const AlbumUpdateManyArgsSchema = z.object({
    data: z.union([AlbumUpdateManyMutationInputSchema, AlbumUncheckedUpdateManyInputSchema]),
    where: AlbumWhereInputSchema.optional(),
}).strict();
export const AlbumDeleteManyArgsSchema = z.object({
    where: AlbumWhereInputSchema.optional(),
}).strict();
export const SubscribedChannelCreateArgsSchema = z.object({
    select: SubscribedChannelSelectSchema.optional(),
    include: SubscribedChannelIncludeSchema.optional(),
    data: z.union([SubscribedChannelCreateInputSchema, SubscribedChannelUncheckedCreateInputSchema]),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const SubscribedChannelUpsertArgsSchema = z.object({
    select: SubscribedChannelSelectSchema.optional(),
    include: SubscribedChannelIncludeSchema.optional(),
    where: SubscribedChannelWhereUniqueInputSchema,
    create: z.union([SubscribedChannelCreateInputSchema, SubscribedChannelUncheckedCreateInputSchema]),
    update: z.union([SubscribedChannelUpdateInputSchema, SubscribedChannelUncheckedUpdateInputSchema]),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const SubscribedChannelCreateManyArgsSchema = z.object({
    data: z.union([SubscribedChannelCreateManyInputSchema, SubscribedChannelCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const SubscribedChannelCreateManyAndReturnArgsSchema = z.object({
    data: z.union([SubscribedChannelCreateManyInputSchema, SubscribedChannelCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const SubscribedChannelDeleteArgsSchema = z.object({
    select: SubscribedChannelSelectSchema.optional(),
    include: SubscribedChannelIncludeSchema.optional(),
    where: SubscribedChannelWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const SubscribedChannelUpdateArgsSchema = z.object({
    select: SubscribedChannelSelectSchema.optional(),
    include: SubscribedChannelIncludeSchema.optional(),
    data: z.union([SubscribedChannelUpdateInputSchema, SubscribedChannelUncheckedUpdateInputSchema]),
    where: SubscribedChannelWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const SubscribedChannelUpdateManyArgsSchema = z.object({
    data: z.union([SubscribedChannelUpdateManyMutationInputSchema, SubscribedChannelUncheckedUpdateManyInputSchema]),
    where: SubscribedChannelWhereInputSchema.optional(),
}).strict();
export const SubscribedChannelDeleteManyArgsSchema = z.object({
    where: SubscribedChannelWhereInputSchema.optional(),
}).strict();
export const FileCreateArgsSchema = z.object({
    select: FileSelectSchema.optional(),
    include: FileIncludeSchema.optional(),
    data: z.union([FileCreateInputSchema, FileUncheckedCreateInputSchema]),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const FileUpsertArgsSchema = z.object({
    select: FileSelectSchema.optional(),
    include: FileIncludeSchema.optional(),
    where: FileWhereUniqueInputSchema,
    create: z.union([FileCreateInputSchema, FileUncheckedCreateInputSchema]),
    update: z.union([FileUpdateInputSchema, FileUncheckedUpdateInputSchema]),
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const FileCreateManyArgsSchema = z.object({
    data: z.union([FileCreateManyInputSchema, FileCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const FileCreateManyAndReturnArgsSchema = z.object({
    data: z.union([FileCreateManyInputSchema, FileCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const FileDeleteArgsSchema = z.object({
    select: FileSelectSchema.optional(),
    include: FileIncludeSchema.optional(),
    where: FileWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const FileUpdateArgsSchema = z.object({
    select: FileSelectSchema.optional(),
    include: FileIncludeSchema.optional(),
    data: z.union([FileUpdateInputSchema, FileUncheckedUpdateInputSchema]),
    where: FileWhereUniqueInputSchema,
    relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict();
export const FileUpdateManyArgsSchema = z.object({
    data: z.union([FileUpdateManyMutationInputSchema, FileUncheckedUpdateManyInputSchema]),
    where: FileWhereInputSchema.optional(),
}).strict();
export const FileDeleteManyArgsSchema = z.object({
    where: FileWhereInputSchema.optional(),
}).strict();
//# sourceMappingURL=index.js.map