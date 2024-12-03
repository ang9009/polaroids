import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const GuildScalarFieldEnumSchema = z.enum(['guildId','addedAt']);

export const RelationLoadStrategySchema = z.enum(['query','join']);

export const AlbumScalarFieldEnumSchema = z.enum(['name','description']);

export const SubscribedChannelScalarFieldEnumSchema = z.enum(['channelId','guildId','albumName']);

export const MediaScalarFieldEnumSchema = z.enum(['mediaId','description','albumName']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
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
  addedAt: z.coerce.date(),
})

export type Guild = z.infer<typeof GuildSchema>

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
})

export type Album = z.infer<typeof AlbumSchema>

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
   * The id of the guild this channel is associated with
   */
  guildId: z.string(),
  /**
   * The id of the album this channel is associated with
   */
  albumName: z.string(),
})

export type SubscribedChannel = z.infer<typeof SubscribedChannelSchema>

/////////////////////////////////////////
// MEDIA SCHEMA
/////////////////////////////////////////

/**
 * Corresponds to images/videos saved to FileStation
 */
export const MediaSchema = z.object({
  /**
   * The media's id
   */
  mediaId: z.string(),
  /**
   * A description of the media
   */
  description: z.string().nullable(),
  /**
   * The name of the album the media is in
   */
  albumName: z.string(),
})

export type Media = z.infer<typeof MediaSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// GUILD
//------------------------------------------------------

export const GuildIncludeSchema: z.ZodType<Prisma.GuildInclude> = z.object({
  subscribedChannels: z.union([z.boolean(),z.lazy(() => SubscribedChannelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GuildCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GuildArgsSchema: z.ZodType<Prisma.GuildDefaultArgs> = z.object({
  select: z.lazy(() => GuildSelectSchema).optional(),
  include: z.lazy(() => GuildIncludeSchema).optional(),
}).strict();

export const GuildCountOutputTypeArgsSchema: z.ZodType<Prisma.GuildCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GuildCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GuildCountOutputTypeSelectSchema: z.ZodType<Prisma.GuildCountOutputTypeSelect> = z.object({
  subscribedChannels: z.boolean().optional(),
}).strict();

export const GuildSelectSchema: z.ZodType<Prisma.GuildSelect> = z.object({
  guildId: z.boolean().optional(),
  addedAt: z.boolean().optional(),
  subscribedChannels: z.union([z.boolean(),z.lazy(() => SubscribedChannelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GuildCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ALBUM
//------------------------------------------------------

export const AlbumIncludeSchema: z.ZodType<Prisma.AlbumInclude> = z.object({
  media: z.union([z.boolean(),z.lazy(() => MediaFindManyArgsSchema)]).optional(),
  channels: z.union([z.boolean(),z.lazy(() => SubscribedChannelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AlbumCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AlbumArgsSchema: z.ZodType<Prisma.AlbumDefaultArgs> = z.object({
  select: z.lazy(() => AlbumSelectSchema).optional(),
  include: z.lazy(() => AlbumIncludeSchema).optional(),
}).strict();

export const AlbumCountOutputTypeArgsSchema: z.ZodType<Prisma.AlbumCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AlbumCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AlbumCountOutputTypeSelectSchema: z.ZodType<Prisma.AlbumCountOutputTypeSelect> = z.object({
  media: z.boolean().optional(),
  channels: z.boolean().optional(),
}).strict();

export const AlbumSelectSchema: z.ZodType<Prisma.AlbumSelect> = z.object({
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  media: z.union([z.boolean(),z.lazy(() => MediaFindManyArgsSchema)]).optional(),
  channels: z.union([z.boolean(),z.lazy(() => SubscribedChannelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AlbumCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SUBSCRIBED CHANNEL
//------------------------------------------------------

export const SubscribedChannelIncludeSchema: z.ZodType<Prisma.SubscribedChannelInclude> = z.object({
  guild: z.union([z.boolean(),z.lazy(() => GuildArgsSchema)]).optional(),
  album: z.union([z.boolean(),z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict()

export const SubscribedChannelArgsSchema: z.ZodType<Prisma.SubscribedChannelDefaultArgs> = z.object({
  select: z.lazy(() => SubscribedChannelSelectSchema).optional(),
  include: z.lazy(() => SubscribedChannelIncludeSchema).optional(),
}).strict();

export const SubscribedChannelSelectSchema: z.ZodType<Prisma.SubscribedChannelSelect> = z.object({
  channelId: z.boolean().optional(),
  guildId: z.boolean().optional(),
  albumName: z.boolean().optional(),
  guild: z.union([z.boolean(),z.lazy(() => GuildArgsSchema)]).optional(),
  album: z.union([z.boolean(),z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict()

// MEDIA
//------------------------------------------------------

export const MediaIncludeSchema: z.ZodType<Prisma.MediaInclude> = z.object({
  album: z.union([z.boolean(),z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict()

export const MediaArgsSchema: z.ZodType<Prisma.MediaDefaultArgs> = z.object({
  select: z.lazy(() => MediaSelectSchema).optional(),
  include: z.lazy(() => MediaIncludeSchema).optional(),
}).strict();

export const MediaSelectSchema: z.ZodType<Prisma.MediaSelect> = z.object({
  mediaId: z.boolean().optional(),
  description: z.boolean().optional(),
  albumName: z.boolean().optional(),
  album: z.union([z.boolean(),z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const GuildWhereInputSchema: z.ZodType<Prisma.GuildWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GuildWhereInputSchema),z.lazy(() => GuildWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GuildWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GuildWhereInputSchema),z.lazy(() => GuildWhereInputSchema).array() ]).optional(),
  guildId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  addedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict();

export const GuildOrderByWithRelationInputSchema: z.ZodType<Prisma.GuildOrderByWithRelationInput> = z.object({
  guildId: z.lazy(() => SortOrderSchema).optional(),
  addedAt: z.lazy(() => SortOrderSchema).optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelOrderByRelationAggregateInputSchema).optional()
}).strict();

export const GuildWhereUniqueInputSchema: z.ZodType<Prisma.GuildWhereUniqueInput> = z.object({
  guildId: z.string()
})
.and(z.object({
  guildId: z.string().optional(),
  AND: z.union([ z.lazy(() => GuildWhereInputSchema),z.lazy(() => GuildWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GuildWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GuildWhereInputSchema),z.lazy(() => GuildWhereInputSchema).array() ]).optional(),
  addedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict());

export const GuildOrderByWithAggregationInputSchema: z.ZodType<Prisma.GuildOrderByWithAggregationInput> = z.object({
  guildId: z.lazy(() => SortOrderSchema).optional(),
  addedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GuildCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GuildMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GuildMinOrderByAggregateInputSchema).optional()
}).strict();

export const GuildScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GuildScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GuildScalarWhereWithAggregatesInputSchema),z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GuildScalarWhereWithAggregatesInputSchema),z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  guildId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  addedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AlbumWhereInputSchema: z.ZodType<Prisma.AlbumWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AlbumWhereInputSchema),z.lazy(() => AlbumWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AlbumWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AlbumWhereInputSchema),z.lazy(() => AlbumWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  media: z.lazy(() => MediaListRelationFilterSchema).optional(),
  channels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict();

export const AlbumOrderByWithRelationInputSchema: z.ZodType<Prisma.AlbumOrderByWithRelationInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  media: z.lazy(() => MediaOrderByRelationAggregateInputSchema).optional(),
  channels: z.lazy(() => SubscribedChannelOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AlbumWhereUniqueInputSchema: z.ZodType<Prisma.AlbumWhereUniqueInput> = z.object({
  name: z.string()
})
.and(z.object({
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => AlbumWhereInputSchema),z.lazy(() => AlbumWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AlbumWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AlbumWhereInputSchema),z.lazy(() => AlbumWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  media: z.lazy(() => MediaListRelationFilterSchema).optional(),
  channels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict());

export const AlbumOrderByWithAggregationInputSchema: z.ZodType<Prisma.AlbumOrderByWithAggregationInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AlbumCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AlbumMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AlbumMinOrderByAggregateInputSchema).optional()
}).strict();

export const AlbumScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AlbumScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema),z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema),z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SubscribedChannelWhereInputSchema: z.ZodType<Prisma.SubscribedChannelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubscribedChannelWhereInputSchema),z.lazy(() => SubscribedChannelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscribedChannelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscribedChannelWhereInputSchema),z.lazy(() => SubscribedChannelWhereInputSchema).array() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guildId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  albumName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guild: z.union([ z.lazy(() => GuildRelationFilterSchema),z.lazy(() => GuildWhereInputSchema) ]).optional(),
  album: z.union([ z.lazy(() => AlbumRelationFilterSchema),z.lazy(() => AlbumWhereInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelOrderByWithRelationInputSchema: z.ZodType<Prisma.SubscribedChannelOrderByWithRelationInput> = z.object({
  channelId: z.lazy(() => SortOrderSchema).optional(),
  guildId: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional(),
  guild: z.lazy(() => GuildOrderByWithRelationInputSchema).optional(),
  album: z.lazy(() => AlbumOrderByWithRelationInputSchema).optional()
}).strict();

export const SubscribedChannelWhereUniqueInputSchema: z.ZodType<Prisma.SubscribedChannelWhereUniqueInput> = z.object({
  channelId: z.string()
})
.and(z.object({
  channelId: z.string().optional(),
  AND: z.union([ z.lazy(() => SubscribedChannelWhereInputSchema),z.lazy(() => SubscribedChannelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscribedChannelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscribedChannelWhereInputSchema),z.lazy(() => SubscribedChannelWhereInputSchema).array() ]).optional(),
  guildId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  albumName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guild: z.union([ z.lazy(() => GuildRelationFilterSchema),z.lazy(() => GuildWhereInputSchema) ]).optional(),
  album: z.union([ z.lazy(() => AlbumRelationFilterSchema),z.lazy(() => AlbumWhereInputSchema) ]).optional(),
}).strict());

export const SubscribedChannelOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubscribedChannelOrderByWithAggregationInput> = z.object({
  channelId: z.lazy(() => SortOrderSchema).optional(),
  guildId: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SubscribedChannelCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SubscribedChannelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SubscribedChannelMinOrderByAggregateInputSchema).optional()
}).strict();

export const SubscribedChannelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubscribedChannelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  channelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  guildId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  albumName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MediaWhereInputSchema: z.ZodType<Prisma.MediaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  mediaId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  albumName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  album: z.union([ z.lazy(() => AlbumRelationFilterSchema),z.lazy(() => AlbumWhereInputSchema) ]).optional(),
}).strict();

export const MediaOrderByWithRelationInputSchema: z.ZodType<Prisma.MediaOrderByWithRelationInput> = z.object({
  mediaId: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional(),
  album: z.lazy(() => AlbumOrderByWithRelationInputSchema).optional()
}).strict();

export const MediaWhereUniqueInputSchema: z.ZodType<Prisma.MediaWhereUniqueInput> = z.object({
  mediaId: z.string()
})
.and(z.object({
  mediaId: z.string().optional(),
  AND: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  albumName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  album: z.union([ z.lazy(() => AlbumRelationFilterSchema),z.lazy(() => AlbumWhereInputSchema) ]).optional(),
}).strict());

export const MediaOrderByWithAggregationInputSchema: z.ZodType<Prisma.MediaOrderByWithAggregationInput> = z.object({
  mediaId: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MediaCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MediaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MediaMinOrderByAggregateInputSchema).optional()
}).strict();

export const MediaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MediaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  mediaId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  albumName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const GuildCreateInputSchema: z.ZodType<Prisma.GuildCreateInput> = z.object({
  guildId: z.string(),
  addedAt: z.coerce.date().optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelCreateNestedManyWithoutGuildInputSchema).optional()
}).strict();

export const GuildUncheckedCreateInputSchema: z.ZodType<Prisma.GuildUncheckedCreateInput> = z.object({
  guildId: z.string(),
  addedAt: z.coerce.date().optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelUncheckedCreateNestedManyWithoutGuildInputSchema).optional()
}).strict();

export const GuildUpdateInputSchema: z.ZodType<Prisma.GuildUpdateInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelUpdateManyWithoutGuildNestedInputSchema).optional()
}).strict();

export const GuildUncheckedUpdateInputSchema: z.ZodType<Prisma.GuildUncheckedUpdateInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutGuildNestedInputSchema).optional()
}).strict();

export const GuildCreateManyInputSchema: z.ZodType<Prisma.GuildCreateManyInput> = z.object({
  guildId: z.string(),
  addedAt: z.coerce.date().optional()
}).strict();

export const GuildUpdateManyMutationInputSchema: z.ZodType<Prisma.GuildUpdateManyMutationInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GuildUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GuildUncheckedUpdateManyInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AlbumCreateInputSchema: z.ZodType<Prisma.AlbumCreateInput> = z.object({
  name: z.string(),
  description: z.string(),
  media: z.lazy(() => MediaCreateNestedManyWithoutAlbumInputSchema).optional(),
  channels: z.lazy(() => SubscribedChannelCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumUncheckedCreateInputSchema: z.ZodType<Prisma.AlbumUncheckedCreateInput> = z.object({
  name: z.string(),
  description: z.string(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutAlbumInputSchema).optional(),
  channels: z.lazy(() => SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumUpdateInputSchema: z.ZodType<Prisma.AlbumUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutAlbumNestedInputSchema).optional(),
  channels: z.lazy(() => SubscribedChannelUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const AlbumUncheckedUpdateInputSchema: z.ZodType<Prisma.AlbumUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional(),
  channels: z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const AlbumCreateManyInputSchema: z.ZodType<Prisma.AlbumCreateManyInput> = z.object({
  name: z.string(),
  description: z.string()
}).strict();

export const AlbumUpdateManyMutationInputSchema: z.ZodType<Prisma.AlbumUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AlbumUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AlbumUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelCreateInputSchema: z.ZodType<Prisma.SubscribedChannelCreateInput> = z.object({
  channelId: z.string(),
  guild: z.lazy(() => GuildCreateNestedOneWithoutSubscribedChannelsInputSchema),
  album: z.lazy(() => AlbumCreateNestedOneWithoutChannelsInputSchema)
}).strict();

export const SubscribedChannelUncheckedCreateInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedCreateInput> = z.object({
  channelId: z.string(),
  guildId: z.string(),
  albumName: z.string()
}).strict();

export const SubscribedChannelUpdateInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guild: z.lazy(() => GuildUpdateOneRequiredWithoutSubscribedChannelsNestedInputSchema).optional(),
  album: z.lazy(() => AlbumUpdateOneRequiredWithoutChannelsNestedInputSchema).optional()
}).strict();

export const SubscribedChannelUncheckedUpdateInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelCreateManyInputSchema: z.ZodType<Prisma.SubscribedChannelCreateManyInput> = z.object({
  channelId: z.string(),
  guildId: z.string(),
  albumName: z.string()
}).strict();

export const SubscribedChannelUpdateManyMutationInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateManyMutationInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateManyInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaCreateInputSchema: z.ZodType<Prisma.MediaCreateInput> = z.object({
  mediaId: z.string(),
  description: z.string().optional().nullable(),
  album: z.lazy(() => AlbumCreateNestedOneWithoutMediaInputSchema)
}).strict();

export const MediaUncheckedCreateInputSchema: z.ZodType<Prisma.MediaUncheckedCreateInput> = z.object({
  mediaId: z.string(),
  description: z.string().optional().nullable(),
  albumName: z.string()
}).strict();

export const MediaUpdateInputSchema: z.ZodType<Prisma.MediaUpdateInput> = z.object({
  mediaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  album: z.lazy(() => AlbumUpdateOneRequiredWithoutMediaNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateInput> = z.object({
  mediaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaCreateManyInputSchema: z.ZodType<Prisma.MediaCreateManyInput> = z.object({
  mediaId: z.string(),
  description: z.string().optional().nullable(),
  albumName: z.string()
}).strict();

export const MediaUpdateManyMutationInputSchema: z.ZodType<Prisma.MediaUpdateManyMutationInput> = z.object({
  mediaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MediaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyInput> = z.object({
  mediaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SubscribedChannelListRelationFilterSchema: z.ZodType<Prisma.SubscribedChannelListRelationFilter> = z.object({
  every: z.lazy(() => SubscribedChannelWhereInputSchema).optional(),
  some: z.lazy(() => SubscribedChannelWhereInputSchema).optional(),
  none: z.lazy(() => SubscribedChannelWhereInputSchema).optional()
}).strict();

export const SubscribedChannelOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SubscribedChannelOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GuildCountOrderByAggregateInputSchema: z.ZodType<Prisma.GuildCountOrderByAggregateInput> = z.object({
  guildId: z.lazy(() => SortOrderSchema).optional(),
  addedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GuildMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GuildMaxOrderByAggregateInput> = z.object({
  guildId: z.lazy(() => SortOrderSchema).optional(),
  addedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GuildMinOrderByAggregateInputSchema: z.ZodType<Prisma.GuildMinOrderByAggregateInput> = z.object({
  guildId: z.lazy(() => SortOrderSchema).optional(),
  addedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const MediaListRelationFilterSchema: z.ZodType<Prisma.MediaListRelationFilter> = z.object({
  every: z.lazy(() => MediaWhereInputSchema).optional(),
  some: z.lazy(() => MediaWhereInputSchema).optional(),
  none: z.lazy(() => MediaWhereInputSchema).optional()
}).strict();

export const MediaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MediaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlbumCountOrderByAggregateInputSchema: z.ZodType<Prisma.AlbumCountOrderByAggregateInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlbumMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AlbumMaxOrderByAggregateInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlbumMinOrderByAggregateInputSchema: z.ZodType<Prisma.AlbumMinOrderByAggregateInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GuildRelationFilterSchema: z.ZodType<Prisma.GuildRelationFilter> = z.object({
  is: z.lazy(() => GuildWhereInputSchema).optional(),
  isNot: z.lazy(() => GuildWhereInputSchema).optional()
}).strict();

export const AlbumRelationFilterSchema: z.ZodType<Prisma.AlbumRelationFilter> = z.object({
  is: z.lazy(() => AlbumWhereInputSchema).optional(),
  isNot: z.lazy(() => AlbumWhereInputSchema).optional()
}).strict();

export const SubscribedChannelCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubscribedChannelCountOrderByAggregateInput> = z.object({
  channelId: z.lazy(() => SortOrderSchema).optional(),
  guildId: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscribedChannelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubscribedChannelMaxOrderByAggregateInput> = z.object({
  channelId: z.lazy(() => SortOrderSchema).optional(),
  guildId: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscribedChannelMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubscribedChannelMinOrderByAggregateInput> = z.object({
  channelId: z.lazy(() => SortOrderSchema).optional(),
  guildId: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const MediaCountOrderByAggregateInputSchema: z.ZodType<Prisma.MediaCountOrderByAggregateInput> = z.object({
  mediaId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MediaMaxOrderByAggregateInput> = z.object({
  mediaId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaMinOrderByAggregateInputSchema: z.ZodType<Prisma.MediaMinOrderByAggregateInput> = z.object({
  mediaId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const SubscribedChannelCreateNestedManyWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelCreateNestedManyWithoutGuildInput> = z.object({
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema).array(),z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema),z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscribedChannelCreateManyGuildInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscribedChannelUncheckedCreateNestedManyWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedCreateNestedManyWithoutGuildInput> = z.object({
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema).array(),z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema),z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscribedChannelCreateManyGuildInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const SubscribedChannelUpdateManyWithoutGuildNestedInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateManyWithoutGuildNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema).array(),z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema),z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutGuildInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscribedChannelCreateManyGuildInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutGuildInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutGuildInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscribedChannelScalarWhereInputSchema),z.lazy(() => SubscribedChannelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubscribedChannelUncheckedUpdateManyWithoutGuildNestedInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateManyWithoutGuildNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema).array(),z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema),z.lazy(() => SubscribedChannelCreateOrConnectWithoutGuildInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutGuildInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscribedChannelCreateManyGuildInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutGuildInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutGuildInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscribedChannelScalarWhereInputSchema),z.lazy(() => SubscribedChannelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MediaCreateNestedManyWithoutAlbumInputSchema: z.ZodType<Prisma.MediaCreateNestedManyWithoutAlbumInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutAlbumInputSchema),z.lazy(() => MediaCreateWithoutAlbumInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => MediaUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => MediaCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyAlbumInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscribedChannelCreateNestedManyWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelCreateNestedManyWithoutAlbumInput> = z.object({
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema).array(),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscribedChannelCreateManyAlbumInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MediaUncheckedCreateNestedManyWithoutAlbumInputSchema: z.ZodType<Prisma.MediaUncheckedCreateNestedManyWithoutAlbumInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutAlbumInputSchema),z.lazy(() => MediaCreateWithoutAlbumInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => MediaUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => MediaCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyAlbumInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInput> = z.object({
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema).array(),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscribedChannelCreateManyAlbumInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MediaUpdateManyWithoutAlbumNestedInputSchema: z.ZodType<Prisma.MediaUpdateManyWithoutAlbumNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutAlbumInputSchema),z.lazy(() => MediaCreateWithoutAlbumInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => MediaUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => MediaCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaUpsertWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => MediaUpsertWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyAlbumInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaUpdateWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => MediaUpdateWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaUpdateManyWithWhereWithoutAlbumInputSchema),z.lazy(() => MediaUpdateManyWithWhereWithoutAlbumInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubscribedChannelUpdateManyWithoutAlbumNestedInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateManyWithoutAlbumNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema).array(),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscribedChannelCreateManyAlbumInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutAlbumInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscribedChannelScalarWhereInputSchema),z.lazy(() => SubscribedChannelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MediaUncheckedUpdateManyWithoutAlbumNestedInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutAlbumNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutAlbumInputSchema),z.lazy(() => MediaCreateWithoutAlbumInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => MediaUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => MediaCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaUpsertWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => MediaUpsertWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyAlbumInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaUpdateWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => MediaUpdateWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaUpdateManyWithWhereWithoutAlbumInputSchema),z.lazy(() => MediaUpdateManyWithWhereWithoutAlbumInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubscribedChannelUncheckedUpdateManyWithoutAlbumNestedInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateManyWithoutAlbumNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema).array(),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscribedChannelCreateManyAlbumInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUpdateManyWithWhereWithoutAlbumInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubscribedChannelScalarWhereInputSchema),z.lazy(() => SubscribedChannelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GuildCreateNestedOneWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildCreateNestedOneWithoutSubscribedChannelsInput> = z.object({
  create: z.union([ z.lazy(() => GuildCreateWithoutSubscribedChannelsInputSchema),z.lazy(() => GuildUncheckedCreateWithoutSubscribedChannelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GuildCreateOrConnectWithoutSubscribedChannelsInputSchema).optional(),
  connect: z.lazy(() => GuildWhereUniqueInputSchema).optional()
}).strict();

export const AlbumCreateNestedOneWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumCreateNestedOneWithoutChannelsInput> = z.object({
  create: z.union([ z.lazy(() => AlbumCreateWithoutChannelsInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutChannelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlbumCreateOrConnectWithoutChannelsInputSchema).optional(),
  connect: z.lazy(() => AlbumWhereUniqueInputSchema).optional()
}).strict();

export const GuildUpdateOneRequiredWithoutSubscribedChannelsNestedInputSchema: z.ZodType<Prisma.GuildUpdateOneRequiredWithoutSubscribedChannelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GuildCreateWithoutSubscribedChannelsInputSchema),z.lazy(() => GuildUncheckedCreateWithoutSubscribedChannelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GuildCreateOrConnectWithoutSubscribedChannelsInputSchema).optional(),
  upsert: z.lazy(() => GuildUpsertWithoutSubscribedChannelsInputSchema).optional(),
  connect: z.lazy(() => GuildWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GuildUpdateToOneWithWhereWithoutSubscribedChannelsInputSchema),z.lazy(() => GuildUpdateWithoutSubscribedChannelsInputSchema),z.lazy(() => GuildUncheckedUpdateWithoutSubscribedChannelsInputSchema) ]).optional(),
}).strict();

export const AlbumUpdateOneRequiredWithoutChannelsNestedInputSchema: z.ZodType<Prisma.AlbumUpdateOneRequiredWithoutChannelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AlbumCreateWithoutChannelsInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutChannelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlbumCreateOrConnectWithoutChannelsInputSchema).optional(),
  upsert: z.lazy(() => AlbumUpsertWithoutChannelsInputSchema).optional(),
  connect: z.lazy(() => AlbumWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AlbumUpdateToOneWithWhereWithoutChannelsInputSchema),z.lazy(() => AlbumUpdateWithoutChannelsInputSchema),z.lazy(() => AlbumUncheckedUpdateWithoutChannelsInputSchema) ]).optional(),
}).strict();

export const AlbumCreateNestedOneWithoutMediaInputSchema: z.ZodType<Prisma.AlbumCreateNestedOneWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => AlbumCreateWithoutMediaInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutMediaInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlbumCreateOrConnectWithoutMediaInputSchema).optional(),
  connect: z.lazy(() => AlbumWhereUniqueInputSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const AlbumUpdateOneRequiredWithoutMediaNestedInputSchema: z.ZodType<Prisma.AlbumUpdateOneRequiredWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => AlbumCreateWithoutMediaInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutMediaInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlbumCreateOrConnectWithoutMediaInputSchema).optional(),
  upsert: z.lazy(() => AlbumUpsertWithoutMediaInputSchema).optional(),
  connect: z.lazy(() => AlbumWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AlbumUpdateToOneWithWhereWithoutMediaInputSchema),z.lazy(() => AlbumUpdateWithoutMediaInputSchema),z.lazy(() => AlbumUncheckedUpdateWithoutMediaInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SubscribedChannelCreateWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelCreateWithoutGuildInput> = z.object({
  channelId: z.string(),
  album: z.lazy(() => AlbumCreateNestedOneWithoutChannelsInputSchema)
}).strict();

export const SubscribedChannelUncheckedCreateWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedCreateWithoutGuildInput> = z.object({
  channelId: z.string(),
  albumName: z.string()
}).strict();

export const SubscribedChannelCreateOrConnectWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelCreateOrConnectWithoutGuildInput> = z.object({
  where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema) ]),
}).strict();

export const SubscribedChannelCreateManyGuildInputEnvelopeSchema: z.ZodType<Prisma.SubscribedChannelCreateManyGuildInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubscribedChannelCreateManyGuildInputSchema),z.lazy(() => SubscribedChannelCreateManyGuildInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SubscribedChannelUpsertWithWhereUniqueWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUpsertWithWhereUniqueWithoutGuildInput> = z.object({
  where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubscribedChannelUpdateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUncheckedUpdateWithoutGuildInputSchema) ]),
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutGuildInputSchema) ]),
}).strict();

export const SubscribedChannelUpdateWithWhereUniqueWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateWithWhereUniqueWithoutGuildInput> = z.object({
  where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubscribedChannelUpdateWithoutGuildInputSchema),z.lazy(() => SubscribedChannelUncheckedUpdateWithoutGuildInputSchema) ]),
}).strict();

export const SubscribedChannelUpdateManyWithWhereWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateManyWithWhereWithoutGuildInput> = z.object({
  where: z.lazy(() => SubscribedChannelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubscribedChannelUpdateManyMutationInputSchema),z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutGuildInputSchema) ]),
}).strict();

export const SubscribedChannelScalarWhereInputSchema: z.ZodType<Prisma.SubscribedChannelScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubscribedChannelScalarWhereInputSchema),z.lazy(() => SubscribedChannelScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscribedChannelScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscribedChannelScalarWhereInputSchema),z.lazy(() => SubscribedChannelScalarWhereInputSchema).array() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guildId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  albumName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const MediaCreateWithoutAlbumInputSchema: z.ZodType<Prisma.MediaCreateWithoutAlbumInput> = z.object({
  mediaId: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const MediaUncheckedCreateWithoutAlbumInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutAlbumInput> = z.object({
  mediaId: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const MediaCreateOrConnectWithoutAlbumInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutAlbumInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutAlbumInputSchema),z.lazy(() => MediaUncheckedCreateWithoutAlbumInputSchema) ]),
}).strict();

export const MediaCreateManyAlbumInputEnvelopeSchema: z.ZodType<Prisma.MediaCreateManyAlbumInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MediaCreateManyAlbumInputSchema),z.lazy(() => MediaCreateManyAlbumInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SubscribedChannelCreateWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelCreateWithoutAlbumInput> = z.object({
  channelId: z.string(),
  guild: z.lazy(() => GuildCreateNestedOneWithoutSubscribedChannelsInputSchema)
}).strict();

export const SubscribedChannelUncheckedCreateWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedCreateWithoutAlbumInput> = z.object({
  channelId: z.string(),
  guildId: z.string()
}).strict();

export const SubscribedChannelCreateOrConnectWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelCreateOrConnectWithoutAlbumInput> = z.object({
  where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema) ]),
}).strict();

export const SubscribedChannelCreateManyAlbumInputEnvelopeSchema: z.ZodType<Prisma.SubscribedChannelCreateManyAlbumInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubscribedChannelCreateManyAlbumInputSchema),z.lazy(() => SubscribedChannelCreateManyAlbumInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MediaUpsertWithWhereUniqueWithoutAlbumInputSchema: z.ZodType<Prisma.MediaUpsertWithWhereUniqueWithoutAlbumInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MediaUpdateWithoutAlbumInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutAlbumInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutAlbumInputSchema),z.lazy(() => MediaUncheckedCreateWithoutAlbumInputSchema) ]),
}).strict();

export const MediaUpdateWithWhereUniqueWithoutAlbumInputSchema: z.ZodType<Prisma.MediaUpdateWithWhereUniqueWithoutAlbumInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MediaUpdateWithoutAlbumInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutAlbumInputSchema) ]),
}).strict();

export const MediaUpdateManyWithWhereWithoutAlbumInputSchema: z.ZodType<Prisma.MediaUpdateManyWithWhereWithoutAlbumInput> = z.object({
  where: z.lazy(() => MediaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MediaUpdateManyMutationInputSchema),z.lazy(() => MediaUncheckedUpdateManyWithoutAlbumInputSchema) ]),
}).strict();

export const MediaScalarWhereInputSchema: z.ZodType<Prisma.MediaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
  mediaId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  albumName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUpsertWithWhereUniqueWithoutAlbumInput> = z.object({
  where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubscribedChannelUpdateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUncheckedUpdateWithoutAlbumInputSchema) ]),
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema) ]),
}).strict();

export const SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateWithWhereUniqueWithoutAlbumInput> = z.object({
  where: z.lazy(() => SubscribedChannelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubscribedChannelUpdateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUncheckedUpdateWithoutAlbumInputSchema) ]),
}).strict();

export const SubscribedChannelUpdateManyWithWhereWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateManyWithWhereWithoutAlbumInput> = z.object({
  where: z.lazy(() => SubscribedChannelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubscribedChannelUpdateManyMutationInputSchema),z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutAlbumInputSchema) ]),
}).strict();

export const GuildCreateWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildCreateWithoutSubscribedChannelsInput> = z.object({
  guildId: z.string(),
  addedAt: z.coerce.date().optional()
}).strict();

export const GuildUncheckedCreateWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildUncheckedCreateWithoutSubscribedChannelsInput> = z.object({
  guildId: z.string(),
  addedAt: z.coerce.date().optional()
}).strict();

export const GuildCreateOrConnectWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildCreateOrConnectWithoutSubscribedChannelsInput> = z.object({
  where: z.lazy(() => GuildWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GuildCreateWithoutSubscribedChannelsInputSchema),z.lazy(() => GuildUncheckedCreateWithoutSubscribedChannelsInputSchema) ]),
}).strict();

export const AlbumCreateWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumCreateWithoutChannelsInput> = z.object({
  name: z.string(),
  description: z.string(),
  media: z.lazy(() => MediaCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumUncheckedCreateWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumUncheckedCreateWithoutChannelsInput> = z.object({
  name: z.string(),
  description: z.string(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumCreateOrConnectWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumCreateOrConnectWithoutChannelsInput> = z.object({
  where: z.lazy(() => AlbumWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AlbumCreateWithoutChannelsInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutChannelsInputSchema) ]),
}).strict();

export const GuildUpsertWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildUpsertWithoutSubscribedChannelsInput> = z.object({
  update: z.union([ z.lazy(() => GuildUpdateWithoutSubscribedChannelsInputSchema),z.lazy(() => GuildUncheckedUpdateWithoutSubscribedChannelsInputSchema) ]),
  create: z.union([ z.lazy(() => GuildCreateWithoutSubscribedChannelsInputSchema),z.lazy(() => GuildUncheckedCreateWithoutSubscribedChannelsInputSchema) ]),
  where: z.lazy(() => GuildWhereInputSchema).optional()
}).strict();

export const GuildUpdateToOneWithWhereWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildUpdateToOneWithWhereWithoutSubscribedChannelsInput> = z.object({
  where: z.lazy(() => GuildWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GuildUpdateWithoutSubscribedChannelsInputSchema),z.lazy(() => GuildUncheckedUpdateWithoutSubscribedChannelsInputSchema) ]),
}).strict();

export const GuildUpdateWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildUpdateWithoutSubscribedChannelsInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GuildUncheckedUpdateWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildUncheckedUpdateWithoutSubscribedChannelsInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AlbumUpsertWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumUpsertWithoutChannelsInput> = z.object({
  update: z.union([ z.lazy(() => AlbumUpdateWithoutChannelsInputSchema),z.lazy(() => AlbumUncheckedUpdateWithoutChannelsInputSchema) ]),
  create: z.union([ z.lazy(() => AlbumCreateWithoutChannelsInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutChannelsInputSchema) ]),
  where: z.lazy(() => AlbumWhereInputSchema).optional()
}).strict();

export const AlbumUpdateToOneWithWhereWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumUpdateToOneWithWhereWithoutChannelsInput> = z.object({
  where: z.lazy(() => AlbumWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AlbumUpdateWithoutChannelsInputSchema),z.lazy(() => AlbumUncheckedUpdateWithoutChannelsInputSchema) ]),
}).strict();

export const AlbumUpdateWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumUpdateWithoutChannelsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const AlbumUncheckedUpdateWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumUncheckedUpdateWithoutChannelsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const AlbumCreateWithoutMediaInputSchema: z.ZodType<Prisma.AlbumCreateWithoutMediaInput> = z.object({
  name: z.string(),
  description: z.string(),
  channels: z.lazy(() => SubscribedChannelCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.AlbumUncheckedCreateWithoutMediaInput> = z.object({
  name: z.string(),
  description: z.string(),
  channels: z.lazy(() => SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.AlbumCreateOrConnectWithoutMediaInput> = z.object({
  where: z.lazy(() => AlbumWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AlbumCreateWithoutMediaInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export const AlbumUpsertWithoutMediaInputSchema: z.ZodType<Prisma.AlbumUpsertWithoutMediaInput> = z.object({
  update: z.union([ z.lazy(() => AlbumUpdateWithoutMediaInputSchema),z.lazy(() => AlbumUncheckedUpdateWithoutMediaInputSchema) ]),
  create: z.union([ z.lazy(() => AlbumCreateWithoutMediaInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutMediaInputSchema) ]),
  where: z.lazy(() => AlbumWhereInputSchema).optional()
}).strict();

export const AlbumUpdateToOneWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.AlbumUpdateToOneWithWhereWithoutMediaInput> = z.object({
  where: z.lazy(() => AlbumWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AlbumUpdateWithoutMediaInputSchema),z.lazy(() => AlbumUncheckedUpdateWithoutMediaInputSchema) ]),
}).strict();

export const AlbumUpdateWithoutMediaInputSchema: z.ZodType<Prisma.AlbumUpdateWithoutMediaInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channels: z.lazy(() => SubscribedChannelUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const AlbumUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.AlbumUncheckedUpdateWithoutMediaInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channels: z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const SubscribedChannelCreateManyGuildInputSchema: z.ZodType<Prisma.SubscribedChannelCreateManyGuildInput> = z.object({
  channelId: z.string(),
  albumName: z.string()
}).strict();

export const SubscribedChannelUpdateWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateWithoutGuildInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  album: z.lazy(() => AlbumUpdateOneRequiredWithoutChannelsNestedInputSchema).optional()
}).strict();

export const SubscribedChannelUncheckedUpdateWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateWithoutGuildInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelUncheckedUpdateManyWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateManyWithoutGuildInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaCreateManyAlbumInputSchema: z.ZodType<Prisma.MediaCreateManyAlbumInput> = z.object({
  mediaId: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const SubscribedChannelCreateManyAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelCreateManyAlbumInput> = z.object({
  channelId: z.string(),
  guildId: z.string()
}).strict();

export const MediaUpdateWithoutAlbumInputSchema: z.ZodType<Prisma.MediaUpdateWithoutAlbumInput> = z.object({
  mediaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MediaUncheckedUpdateWithoutAlbumInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutAlbumInput> = z.object({
  mediaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MediaUncheckedUpdateManyWithoutAlbumInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutAlbumInput> = z.object({
  mediaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SubscribedChannelUpdateWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateWithoutAlbumInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guild: z.lazy(() => GuildUpdateOneRequiredWithoutSubscribedChannelsNestedInputSchema).optional()
}).strict();

export const SubscribedChannelUncheckedUpdateWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateWithoutAlbumInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelUncheckedUpdateManyWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateManyWithoutAlbumInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const GuildFindFirstArgsSchema: z.ZodType<Prisma.GuildFindFirstArgs> = z.object({
  select: GuildSelectSchema.optional(),
  include: GuildIncludeSchema.optional(),
  where: GuildWhereInputSchema.optional(),
  orderBy: z.union([ GuildOrderByWithRelationInputSchema.array(),GuildOrderByWithRelationInputSchema ]).optional(),
  cursor: GuildWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GuildScalarFieldEnumSchema,GuildScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const GuildFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GuildFindFirstOrThrowArgs> = z.object({
  select: GuildSelectSchema.optional(),
  include: GuildIncludeSchema.optional(),
  where: GuildWhereInputSchema.optional(),
  orderBy: z.union([ GuildOrderByWithRelationInputSchema.array(),GuildOrderByWithRelationInputSchema ]).optional(),
  cursor: GuildWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GuildScalarFieldEnumSchema,GuildScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const GuildFindManyArgsSchema: z.ZodType<Prisma.GuildFindManyArgs> = z.object({
  select: GuildSelectSchema.optional(),
  include: GuildIncludeSchema.optional(),
  where: GuildWhereInputSchema.optional(),
  orderBy: z.union([ GuildOrderByWithRelationInputSchema.array(),GuildOrderByWithRelationInputSchema ]).optional(),
  cursor: GuildWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GuildScalarFieldEnumSchema,GuildScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const GuildAggregateArgsSchema: z.ZodType<Prisma.GuildAggregateArgs> = z.object({
  where: GuildWhereInputSchema.optional(),
  orderBy: z.union([ GuildOrderByWithRelationInputSchema.array(),GuildOrderByWithRelationInputSchema ]).optional(),
  cursor: GuildWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GuildGroupByArgsSchema: z.ZodType<Prisma.GuildGroupByArgs> = z.object({
  where: GuildWhereInputSchema.optional(),
  orderBy: z.union([ GuildOrderByWithAggregationInputSchema.array(),GuildOrderByWithAggregationInputSchema ]).optional(),
  by: GuildScalarFieldEnumSchema.array(),
  having: GuildScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GuildFindUniqueArgsSchema: z.ZodType<Prisma.GuildFindUniqueArgs> = z.object({
  select: GuildSelectSchema.optional(),
  include: GuildIncludeSchema.optional(),
  where: GuildWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const GuildFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GuildFindUniqueOrThrowArgs> = z.object({
  select: GuildSelectSchema.optional(),
  include: GuildIncludeSchema.optional(),
  where: GuildWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const AlbumFindFirstArgsSchema: z.ZodType<Prisma.AlbumFindFirstArgs> = z.object({
  select: AlbumSelectSchema.optional(),
  include: AlbumIncludeSchema.optional(),
  where: AlbumWhereInputSchema.optional(),
  orderBy: z.union([ AlbumOrderByWithRelationInputSchema.array(),AlbumOrderByWithRelationInputSchema ]).optional(),
  cursor: AlbumWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AlbumScalarFieldEnumSchema,AlbumScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const AlbumFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AlbumFindFirstOrThrowArgs> = z.object({
  select: AlbumSelectSchema.optional(),
  include: AlbumIncludeSchema.optional(),
  where: AlbumWhereInputSchema.optional(),
  orderBy: z.union([ AlbumOrderByWithRelationInputSchema.array(),AlbumOrderByWithRelationInputSchema ]).optional(),
  cursor: AlbumWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AlbumScalarFieldEnumSchema,AlbumScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const AlbumFindManyArgsSchema: z.ZodType<Prisma.AlbumFindManyArgs> = z.object({
  select: AlbumSelectSchema.optional(),
  include: AlbumIncludeSchema.optional(),
  where: AlbumWhereInputSchema.optional(),
  orderBy: z.union([ AlbumOrderByWithRelationInputSchema.array(),AlbumOrderByWithRelationInputSchema ]).optional(),
  cursor: AlbumWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AlbumScalarFieldEnumSchema,AlbumScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const AlbumAggregateArgsSchema: z.ZodType<Prisma.AlbumAggregateArgs> = z.object({
  where: AlbumWhereInputSchema.optional(),
  orderBy: z.union([ AlbumOrderByWithRelationInputSchema.array(),AlbumOrderByWithRelationInputSchema ]).optional(),
  cursor: AlbumWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AlbumGroupByArgsSchema: z.ZodType<Prisma.AlbumGroupByArgs> = z.object({
  where: AlbumWhereInputSchema.optional(),
  orderBy: z.union([ AlbumOrderByWithAggregationInputSchema.array(),AlbumOrderByWithAggregationInputSchema ]).optional(),
  by: AlbumScalarFieldEnumSchema.array(),
  having: AlbumScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AlbumFindUniqueArgsSchema: z.ZodType<Prisma.AlbumFindUniqueArgs> = z.object({
  select: AlbumSelectSchema.optional(),
  include: AlbumIncludeSchema.optional(),
  where: AlbumWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const AlbumFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AlbumFindUniqueOrThrowArgs> = z.object({
  select: AlbumSelectSchema.optional(),
  include: AlbumIncludeSchema.optional(),
  where: AlbumWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SubscribedChannelFindFirstArgsSchema: z.ZodType<Prisma.SubscribedChannelFindFirstArgs> = z.object({
  select: SubscribedChannelSelectSchema.optional(),
  include: SubscribedChannelIncludeSchema.optional(),
  where: SubscribedChannelWhereInputSchema.optional(),
  orderBy: z.union([ SubscribedChannelOrderByWithRelationInputSchema.array(),SubscribedChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscribedChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscribedChannelScalarFieldEnumSchema,SubscribedChannelScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SubscribedChannelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubscribedChannelFindFirstOrThrowArgs> = z.object({
  select: SubscribedChannelSelectSchema.optional(),
  include: SubscribedChannelIncludeSchema.optional(),
  where: SubscribedChannelWhereInputSchema.optional(),
  orderBy: z.union([ SubscribedChannelOrderByWithRelationInputSchema.array(),SubscribedChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscribedChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscribedChannelScalarFieldEnumSchema,SubscribedChannelScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SubscribedChannelFindManyArgsSchema: z.ZodType<Prisma.SubscribedChannelFindManyArgs> = z.object({
  select: SubscribedChannelSelectSchema.optional(),
  include: SubscribedChannelIncludeSchema.optional(),
  where: SubscribedChannelWhereInputSchema.optional(),
  orderBy: z.union([ SubscribedChannelOrderByWithRelationInputSchema.array(),SubscribedChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscribedChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscribedChannelScalarFieldEnumSchema,SubscribedChannelScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SubscribedChannelAggregateArgsSchema: z.ZodType<Prisma.SubscribedChannelAggregateArgs> = z.object({
  where: SubscribedChannelWhereInputSchema.optional(),
  orderBy: z.union([ SubscribedChannelOrderByWithRelationInputSchema.array(),SubscribedChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscribedChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SubscribedChannelGroupByArgsSchema: z.ZodType<Prisma.SubscribedChannelGroupByArgs> = z.object({
  where: SubscribedChannelWhereInputSchema.optional(),
  orderBy: z.union([ SubscribedChannelOrderByWithAggregationInputSchema.array(),SubscribedChannelOrderByWithAggregationInputSchema ]).optional(),
  by: SubscribedChannelScalarFieldEnumSchema.array(),
  having: SubscribedChannelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SubscribedChannelFindUniqueArgsSchema: z.ZodType<Prisma.SubscribedChannelFindUniqueArgs> = z.object({
  select: SubscribedChannelSelectSchema.optional(),
  include: SubscribedChannelIncludeSchema.optional(),
  where: SubscribedChannelWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SubscribedChannelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubscribedChannelFindUniqueOrThrowArgs> = z.object({
  select: SubscribedChannelSelectSchema.optional(),
  include: SubscribedChannelIncludeSchema.optional(),
  where: SubscribedChannelWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const MediaFindFirstArgsSchema: z.ZodType<Prisma.MediaFindFirstArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaScalarFieldEnumSchema,MediaScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const MediaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MediaFindFirstOrThrowArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaScalarFieldEnumSchema,MediaScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const MediaFindManyArgsSchema: z.ZodType<Prisma.MediaFindManyArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaScalarFieldEnumSchema,MediaScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const MediaAggregateArgsSchema: z.ZodType<Prisma.MediaAggregateArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MediaGroupByArgsSchema: z.ZodType<Prisma.MediaGroupByArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithAggregationInputSchema.array(),MediaOrderByWithAggregationInputSchema ]).optional(),
  by: MediaScalarFieldEnumSchema.array(),
  having: MediaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MediaFindUniqueArgsSchema: z.ZodType<Prisma.MediaFindUniqueArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const MediaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MediaFindUniqueOrThrowArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const GuildCreateArgsSchema: z.ZodType<Prisma.GuildCreateArgs> = z.object({
  select: GuildSelectSchema.optional(),
  include: GuildIncludeSchema.optional(),
  data: z.union([ GuildCreateInputSchema,GuildUncheckedCreateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const GuildUpsertArgsSchema: z.ZodType<Prisma.GuildUpsertArgs> = z.object({
  select: GuildSelectSchema.optional(),
  include: GuildIncludeSchema.optional(),
  where: GuildWhereUniqueInputSchema,
  create: z.union([ GuildCreateInputSchema,GuildUncheckedCreateInputSchema ]),
  update: z.union([ GuildUpdateInputSchema,GuildUncheckedUpdateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const GuildCreateManyArgsSchema: z.ZodType<Prisma.GuildCreateManyArgs> = z.object({
  data: z.union([ GuildCreateManyInputSchema,GuildCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GuildCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GuildCreateManyAndReturnArgs> = z.object({
  data: z.union([ GuildCreateManyInputSchema,GuildCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GuildDeleteArgsSchema: z.ZodType<Prisma.GuildDeleteArgs> = z.object({
  select: GuildSelectSchema.optional(),
  include: GuildIncludeSchema.optional(),
  where: GuildWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const GuildUpdateArgsSchema: z.ZodType<Prisma.GuildUpdateArgs> = z.object({
  select: GuildSelectSchema.optional(),
  include: GuildIncludeSchema.optional(),
  data: z.union([ GuildUpdateInputSchema,GuildUncheckedUpdateInputSchema ]),
  where: GuildWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const GuildUpdateManyArgsSchema: z.ZodType<Prisma.GuildUpdateManyArgs> = z.object({
  data: z.union([ GuildUpdateManyMutationInputSchema,GuildUncheckedUpdateManyInputSchema ]),
  where: GuildWhereInputSchema.optional(),
}).strict() ;

export const GuildDeleteManyArgsSchema: z.ZodType<Prisma.GuildDeleteManyArgs> = z.object({
  where: GuildWhereInputSchema.optional(),
}).strict() ;

export const AlbumCreateArgsSchema: z.ZodType<Prisma.AlbumCreateArgs> = z.object({
  select: AlbumSelectSchema.optional(),
  include: AlbumIncludeSchema.optional(),
  data: z.union([ AlbumCreateInputSchema,AlbumUncheckedCreateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const AlbumUpsertArgsSchema: z.ZodType<Prisma.AlbumUpsertArgs> = z.object({
  select: AlbumSelectSchema.optional(),
  include: AlbumIncludeSchema.optional(),
  where: AlbumWhereUniqueInputSchema,
  create: z.union([ AlbumCreateInputSchema,AlbumUncheckedCreateInputSchema ]),
  update: z.union([ AlbumUpdateInputSchema,AlbumUncheckedUpdateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const AlbumCreateManyArgsSchema: z.ZodType<Prisma.AlbumCreateManyArgs> = z.object({
  data: z.union([ AlbumCreateManyInputSchema,AlbumCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AlbumCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AlbumCreateManyAndReturnArgs> = z.object({
  data: z.union([ AlbumCreateManyInputSchema,AlbumCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AlbumDeleteArgsSchema: z.ZodType<Prisma.AlbumDeleteArgs> = z.object({
  select: AlbumSelectSchema.optional(),
  include: AlbumIncludeSchema.optional(),
  where: AlbumWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const AlbumUpdateArgsSchema: z.ZodType<Prisma.AlbumUpdateArgs> = z.object({
  select: AlbumSelectSchema.optional(),
  include: AlbumIncludeSchema.optional(),
  data: z.union([ AlbumUpdateInputSchema,AlbumUncheckedUpdateInputSchema ]),
  where: AlbumWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const AlbumUpdateManyArgsSchema: z.ZodType<Prisma.AlbumUpdateManyArgs> = z.object({
  data: z.union([ AlbumUpdateManyMutationInputSchema,AlbumUncheckedUpdateManyInputSchema ]),
  where: AlbumWhereInputSchema.optional(),
}).strict() ;

export const AlbumDeleteManyArgsSchema: z.ZodType<Prisma.AlbumDeleteManyArgs> = z.object({
  where: AlbumWhereInputSchema.optional(),
}).strict() ;

export const SubscribedChannelCreateArgsSchema: z.ZodType<Prisma.SubscribedChannelCreateArgs> = z.object({
  select: SubscribedChannelSelectSchema.optional(),
  include: SubscribedChannelIncludeSchema.optional(),
  data: z.union([ SubscribedChannelCreateInputSchema,SubscribedChannelUncheckedCreateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SubscribedChannelUpsertArgsSchema: z.ZodType<Prisma.SubscribedChannelUpsertArgs> = z.object({
  select: SubscribedChannelSelectSchema.optional(),
  include: SubscribedChannelIncludeSchema.optional(),
  where: SubscribedChannelWhereUniqueInputSchema,
  create: z.union([ SubscribedChannelCreateInputSchema,SubscribedChannelUncheckedCreateInputSchema ]),
  update: z.union([ SubscribedChannelUpdateInputSchema,SubscribedChannelUncheckedUpdateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SubscribedChannelCreateManyArgsSchema: z.ZodType<Prisma.SubscribedChannelCreateManyArgs> = z.object({
  data: z.union([ SubscribedChannelCreateManyInputSchema,SubscribedChannelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SubscribedChannelCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SubscribedChannelCreateManyAndReturnArgs> = z.object({
  data: z.union([ SubscribedChannelCreateManyInputSchema,SubscribedChannelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SubscribedChannelDeleteArgsSchema: z.ZodType<Prisma.SubscribedChannelDeleteArgs> = z.object({
  select: SubscribedChannelSelectSchema.optional(),
  include: SubscribedChannelIncludeSchema.optional(),
  where: SubscribedChannelWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SubscribedChannelUpdateArgsSchema: z.ZodType<Prisma.SubscribedChannelUpdateArgs> = z.object({
  select: SubscribedChannelSelectSchema.optional(),
  include: SubscribedChannelIncludeSchema.optional(),
  data: z.union([ SubscribedChannelUpdateInputSchema,SubscribedChannelUncheckedUpdateInputSchema ]),
  where: SubscribedChannelWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SubscribedChannelUpdateManyArgsSchema: z.ZodType<Prisma.SubscribedChannelUpdateManyArgs> = z.object({
  data: z.union([ SubscribedChannelUpdateManyMutationInputSchema,SubscribedChannelUncheckedUpdateManyInputSchema ]),
  where: SubscribedChannelWhereInputSchema.optional(),
}).strict() ;

export const SubscribedChannelDeleteManyArgsSchema: z.ZodType<Prisma.SubscribedChannelDeleteManyArgs> = z.object({
  where: SubscribedChannelWhereInputSchema.optional(),
}).strict() ;

export const MediaCreateArgsSchema: z.ZodType<Prisma.MediaCreateArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  data: z.union([ MediaCreateInputSchema,MediaUncheckedCreateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const MediaUpsertArgsSchema: z.ZodType<Prisma.MediaUpsertArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
  create: z.union([ MediaCreateInputSchema,MediaUncheckedCreateInputSchema ]),
  update: z.union([ MediaUpdateInputSchema,MediaUncheckedUpdateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const MediaCreateManyArgsSchema: z.ZodType<Prisma.MediaCreateManyArgs> = z.object({
  data: z.union([ MediaCreateManyInputSchema,MediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MediaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MediaCreateManyAndReturnArgs> = z.object({
  data: z.union([ MediaCreateManyInputSchema,MediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MediaDeleteArgsSchema: z.ZodType<Prisma.MediaDeleteArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const MediaUpdateArgsSchema: z.ZodType<Prisma.MediaUpdateArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  data: z.union([ MediaUpdateInputSchema,MediaUncheckedUpdateInputSchema ]),
  where: MediaWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const MediaUpdateManyArgsSchema: z.ZodType<Prisma.MediaUpdateManyArgs> = z.object({
  data: z.union([ MediaUpdateManyMutationInputSchema,MediaUncheckedUpdateManyInputSchema ]),
  where: MediaWhereInputSchema.optional(),
}).strict() ;

export const MediaDeleteManyArgsSchema: z.ZodType<Prisma.MediaDeleteManyArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
}).strict() ;