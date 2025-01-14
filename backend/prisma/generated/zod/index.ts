import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const GuildScalarFieldEnumSchema = z.enum(['guildId','createdAt']);

export const RelationLoadStrategySchema = z.enum(['query','join']);

export const AlbumScalarFieldEnumSchema = z.enum(['albumId','albumName','description','createdAt']);

export const SubscribedChannelScalarFieldEnumSchema = z.enum(['channelId','createdAt','guildId','albumId']);

export const FileScalarFieldEnumSchema = z.enum(['discordId','uploaderId','fileName','description','createdAt','albumId']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sid','data','expiresAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const GuildOrderByRelevanceFieldEnumSchema = z.enum(['guildId']);

export const NullsOrderSchema = z.enum(['first','last']);

export const AlbumOrderByRelevanceFieldEnumSchema = z.enum(['albumId','albumName','description']);

export const SubscribedChannelOrderByRelevanceFieldEnumSchema = z.enum(['channelId','guildId','albumId']);

export const FileOrderByRelevanceFieldEnumSchema = z.enum(['discordId','uploaderId','fileName','description','albumId']);

export const SessionOrderByRelevanceFieldEnumSchema = z.enum(['id','sid','data']);
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
})

export type Guild = z.infer<typeof GuildSchema>

/////////////////////////////////////////
// ALBUM SCHEMA
/////////////////////////////////////////

/**
 * Albums that correspond to existing folders in FileStation.
 */
export const AlbumSchema = z.object({
  albumId: z.string(),
  /**
   * The name of the folder on FileStation
   */
  albumName: z.string(),
  /**
   * The album's description
   */
  description: z.string().nullable(),
  /**
   * When the file was uploaded
   */
  createdAt: z.coerce.date(),
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
  albumId: z.string(),
})

export type SubscribedChannel = z.infer<typeof SubscribedChannelSchema>

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
   * The id of the album the photo/video is in
   */
  albumId: z.string(),
})

export type File = z.infer<typeof FileSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

/**
 * Session objects
 */
export const SessionSchema = z.object({
  id: z.string(),
  sid: z.string(),
  data: z.string(),
  expiresAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

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
  createdAt: z.boolean().optional(),
  subscribedChannels: z.union([z.boolean(),z.lazy(() => SubscribedChannelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GuildCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ALBUM
//------------------------------------------------------

export const AlbumIncludeSchema: z.ZodType<Prisma.AlbumInclude> = z.object({
  files: z.union([z.boolean(),z.lazy(() => FileFindManyArgsSchema)]).optional(),
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
  files: z.boolean().optional(),
  channels: z.boolean().optional(),
}).strict();

export const AlbumSelectSchema: z.ZodType<Prisma.AlbumSelect> = z.object({
  albumId: z.boolean().optional(),
  albumName: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  files: z.union([z.boolean(),z.lazy(() => FileFindManyArgsSchema)]).optional(),
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
  createdAt: z.boolean().optional(),
  guildId: z.boolean().optional(),
  albumId: z.boolean().optional(),
  guild: z.union([z.boolean(),z.lazy(() => GuildArgsSchema)]).optional(),
  album: z.union([z.boolean(),z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict()

// FILE
//------------------------------------------------------

export const FileIncludeSchema: z.ZodType<Prisma.FileInclude> = z.object({
  album: z.union([z.boolean(),z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict()

export const FileArgsSchema: z.ZodType<Prisma.FileDefaultArgs> = z.object({
  select: z.lazy(() => FileSelectSchema).optional(),
  include: z.lazy(() => FileIncludeSchema).optional(),
}).strict();

export const FileSelectSchema: z.ZodType<Prisma.FileSelect> = z.object({
  discordId: z.boolean().optional(),
  uploaderId: z.boolean().optional(),
  fileName: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  albumId: z.boolean().optional(),
  album: z.union([z.boolean(),z.lazy(() => AlbumArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sid: z.boolean().optional(),
  data: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const GuildWhereInputSchema: z.ZodType<Prisma.GuildWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GuildWhereInputSchema),z.lazy(() => GuildWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GuildWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GuildWhereInputSchema),z.lazy(() => GuildWhereInputSchema).array() ]).optional(),
  guildId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict();

export const GuildOrderByWithRelationInputSchema: z.ZodType<Prisma.GuildOrderByWithRelationInput> = z.object({
  guildId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => GuildOrderByRelevanceInputSchema).optional()
}).strict();

export const GuildWhereUniqueInputSchema: z.ZodType<Prisma.GuildWhereUniqueInput> = z.object({
  guildId: z.string()
})
.and(z.object({
  guildId: z.string().optional(),
  AND: z.union([ z.lazy(() => GuildWhereInputSchema),z.lazy(() => GuildWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GuildWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GuildWhereInputSchema),z.lazy(() => GuildWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict());

export const GuildOrderByWithAggregationInputSchema: z.ZodType<Prisma.GuildOrderByWithAggregationInput> = z.object({
  guildId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GuildCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GuildMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GuildMinOrderByAggregateInputSchema).optional()
}).strict();

export const GuildScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GuildScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GuildScalarWhereWithAggregatesInputSchema),z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GuildScalarWhereWithAggregatesInputSchema),z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  guildId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AlbumWhereInputSchema: z.ZodType<Prisma.AlbumWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AlbumWhereInputSchema),z.lazy(() => AlbumWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AlbumWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AlbumWhereInputSchema),z.lazy(() => AlbumWhereInputSchema).array() ]).optional(),
  albumId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  albumName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  files: z.lazy(() => FileListRelationFilterSchema).optional(),
  channels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict();

export const AlbumOrderByWithRelationInputSchema: z.ZodType<Prisma.AlbumOrderByWithRelationInput> = z.object({
  albumId: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  files: z.lazy(() => FileOrderByRelationAggregateInputSchema).optional(),
  channels: z.lazy(() => SubscribedChannelOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => AlbumOrderByRelevanceInputSchema).optional()
}).strict();

export const AlbumWhereUniqueInputSchema: z.ZodType<Prisma.AlbumWhereUniqueInput> = z.union([
  z.object({
    albumId: z.string(),
    albumName: z.string()
  }),
  z.object({
    albumId: z.string(),
  }),
  z.object({
    albumName: z.string(),
  }),
])
.and(z.object({
  albumId: z.string().optional(),
  albumName: z.string().optional(),
  AND: z.union([ z.lazy(() => AlbumWhereInputSchema),z.lazy(() => AlbumWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AlbumWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AlbumWhereInputSchema),z.lazy(() => AlbumWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  files: z.lazy(() => FileListRelationFilterSchema).optional(),
  channels: z.lazy(() => SubscribedChannelListRelationFilterSchema).optional()
}).strict());

export const AlbumOrderByWithAggregationInputSchema: z.ZodType<Prisma.AlbumOrderByWithAggregationInput> = z.object({
  albumId: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AlbumCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AlbumMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AlbumMinOrderByAggregateInputSchema).optional()
}).strict();

export const AlbumScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AlbumScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema),z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema),z.lazy(() => AlbumScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  albumId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  albumName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SubscribedChannelWhereInputSchema: z.ZodType<Prisma.SubscribedChannelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubscribedChannelWhereInputSchema),z.lazy(() => SubscribedChannelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscribedChannelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscribedChannelWhereInputSchema),z.lazy(() => SubscribedChannelWhereInputSchema).array() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  guildId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  albumId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  guild: z.union([ z.lazy(() => GuildScalarRelationFilterSchema),z.lazy(() => GuildWhereInputSchema) ]).optional(),
  album: z.union([ z.lazy(() => AlbumScalarRelationFilterSchema),z.lazy(() => AlbumWhereInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelOrderByWithRelationInputSchema: z.ZodType<Prisma.SubscribedChannelOrderByWithRelationInput> = z.object({
  channelId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  guildId: z.lazy(() => SortOrderSchema).optional(),
  albumId: z.lazy(() => SortOrderSchema).optional(),
  guild: z.lazy(() => GuildOrderByWithRelationInputSchema).optional(),
  album: z.lazy(() => AlbumOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => SubscribedChannelOrderByRelevanceInputSchema).optional()
}).strict();

export const SubscribedChannelWhereUniqueInputSchema: z.ZodType<Prisma.SubscribedChannelWhereUniqueInput> = z.object({
  channelId: z.string()
})
.and(z.object({
  channelId: z.string().optional(),
  AND: z.union([ z.lazy(() => SubscribedChannelWhereInputSchema),z.lazy(() => SubscribedChannelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscribedChannelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscribedChannelWhereInputSchema),z.lazy(() => SubscribedChannelWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  guildId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  albumId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  guild: z.union([ z.lazy(() => GuildScalarRelationFilterSchema),z.lazy(() => GuildWhereInputSchema) ]).optional(),
  album: z.union([ z.lazy(() => AlbumScalarRelationFilterSchema),z.lazy(() => AlbumWhereInputSchema) ]).optional(),
}).strict());

export const SubscribedChannelOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubscribedChannelOrderByWithAggregationInput> = z.object({
  channelId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  guildId: z.lazy(() => SortOrderSchema).optional(),
  albumId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SubscribedChannelCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SubscribedChannelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SubscribedChannelMinOrderByAggregateInputSchema).optional()
}).strict();

export const SubscribedChannelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubscribedChannelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscribedChannelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  channelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  guildId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  albumId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FileWhereInputSchema: z.ZodType<Prisma.FileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  discordId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uploaderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fileName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  albumId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  album: z.union([ z.lazy(() => AlbumScalarRelationFilterSchema),z.lazy(() => AlbumWhereInputSchema) ]).optional(),
}).strict();

export const FileOrderByWithRelationInputSchema: z.ZodType<Prisma.FileOrderByWithRelationInput> = z.object({
  discordId: z.lazy(() => SortOrderSchema).optional(),
  uploaderId: z.lazy(() => SortOrderSchema).optional(),
  fileName: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  albumId: z.lazy(() => SortOrderSchema).optional(),
  album: z.lazy(() => AlbumOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => FileOrderByRelevanceInputSchema).optional()
}).strict();

export const FileWhereUniqueInputSchema: z.ZodType<Prisma.FileWhereUniqueInput> = z.object({
  discordId: z.string()
})
.and(z.object({
  discordId: z.string().optional(),
  AND: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  uploaderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fileName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  albumId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  album: z.union([ z.lazy(() => AlbumScalarRelationFilterSchema),z.lazy(() => AlbumWhereInputSchema) ]).optional(),
}).strict());

export const FileOrderByWithAggregationInputSchema: z.ZodType<Prisma.FileOrderByWithAggregationInput> = z.object({
  discordId: z.lazy(() => SortOrderSchema).optional(),
  uploaderId: z.lazy(() => SortOrderSchema).optional(),
  fileName: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  albumId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FileCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FileMinOrderByAggregateInputSchema).optional()
}).strict();

export const FileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FileScalarWhereWithAggregatesInputSchema),z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileScalarWhereWithAggregatesInputSchema),z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  discordId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  uploaderId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fileName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  albumId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  data: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sid: z.lazy(() => SortOrderSchema).optional(),
  data: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  _relevance: z.lazy(() => SessionOrderByRelevanceInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    sid: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    sid: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  sid: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  data: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sid: z.lazy(() => SortOrderSchema).optional(),
  data: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  data: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GuildCreateInputSchema: z.ZodType<Prisma.GuildCreateInput> = z.object({
  guildId: z.string(),
  createdAt: z.coerce.date().optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelCreateNestedManyWithoutGuildInputSchema).optional()
}).strict();

export const GuildUncheckedCreateInputSchema: z.ZodType<Prisma.GuildUncheckedCreateInput> = z.object({
  guildId: z.string(),
  createdAt: z.coerce.date().optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelUncheckedCreateNestedManyWithoutGuildInputSchema).optional()
}).strict();

export const GuildUpdateInputSchema: z.ZodType<Prisma.GuildUpdateInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelUpdateManyWithoutGuildNestedInputSchema).optional()
}).strict();

export const GuildUncheckedUpdateInputSchema: z.ZodType<Prisma.GuildUncheckedUpdateInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subscribedChannels: z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutGuildNestedInputSchema).optional()
}).strict();

export const GuildCreateManyInputSchema: z.ZodType<Prisma.GuildCreateManyInput> = z.object({
  guildId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const GuildUpdateManyMutationInputSchema: z.ZodType<Prisma.GuildUpdateManyMutationInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GuildUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GuildUncheckedUpdateManyInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AlbumCreateInputSchema: z.ZodType<Prisma.AlbumCreateInput> = z.object({
  albumId: z.string().optional(),
  albumName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutAlbumInputSchema).optional(),
  channels: z.lazy(() => SubscribedChannelCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumUncheckedCreateInputSchema: z.ZodType<Prisma.AlbumUncheckedCreateInput> = z.object({
  albumId: z.string().optional(),
  albumName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutAlbumInputSchema).optional(),
  channels: z.lazy(() => SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumUpdateInputSchema: z.ZodType<Prisma.AlbumUpdateInput> = z.object({
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  files: z.lazy(() => FileUpdateManyWithoutAlbumNestedInputSchema).optional(),
  channels: z.lazy(() => SubscribedChannelUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const AlbumUncheckedUpdateInputSchema: z.ZodType<Prisma.AlbumUncheckedUpdateInput> = z.object({
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional(),
  channels: z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const AlbumCreateManyInputSchema: z.ZodType<Prisma.AlbumCreateManyInput> = z.object({
  albumId: z.string().optional(),
  albumName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AlbumUpdateManyMutationInputSchema: z.ZodType<Prisma.AlbumUpdateManyMutationInput> = z.object({
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AlbumUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AlbumUncheckedUpdateManyInput> = z.object({
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelCreateInputSchema: z.ZodType<Prisma.SubscribedChannelCreateInput> = z.object({
  channelId: z.string(),
  createdAt: z.coerce.date().optional(),
  guild: z.lazy(() => GuildCreateNestedOneWithoutSubscribedChannelsInputSchema),
  album: z.lazy(() => AlbumCreateNestedOneWithoutChannelsInputSchema)
}).strict();

export const SubscribedChannelUncheckedCreateInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedCreateInput> = z.object({
  channelId: z.string(),
  createdAt: z.coerce.date().optional(),
  guildId: z.string(),
  albumId: z.string()
}).strict();

export const SubscribedChannelUpdateInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  guild: z.lazy(() => GuildUpdateOneRequiredWithoutSubscribedChannelsNestedInputSchema).optional(),
  album: z.lazy(() => AlbumUpdateOneRequiredWithoutChannelsNestedInputSchema).optional()
}).strict();

export const SubscribedChannelUncheckedUpdateInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelCreateManyInputSchema: z.ZodType<Prisma.SubscribedChannelCreateManyInput> = z.object({
  channelId: z.string(),
  createdAt: z.coerce.date().optional(),
  guildId: z.string(),
  albumId: z.string()
}).strict();

export const SubscribedChannelUpdateManyMutationInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateManyMutationInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateManyInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileCreateInputSchema: z.ZodType<Prisma.FileCreateInput> = z.object({
  discordId: z.string(),
  uploaderId: z.string(),
  fileName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  album: z.lazy(() => AlbumCreateNestedOneWithoutFilesInputSchema)
}).strict();

export const FileUncheckedCreateInputSchema: z.ZodType<Prisma.FileUncheckedCreateInput> = z.object({
  discordId: z.string(),
  uploaderId: z.string(),
  fileName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  albumId: z.string()
}).strict();

export const FileUpdateInputSchema: z.ZodType<Prisma.FileUpdateInput> = z.object({
  discordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  album: z.lazy(() => AlbumUpdateOneRequiredWithoutFilesNestedInputSchema).optional()
}).strict();

export const FileUncheckedUpdateInputSchema: z.ZodType<Prisma.FileUncheckedUpdateInput> = z.object({
  discordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileCreateManyInputSchema: z.ZodType<Prisma.FileCreateManyInput> = z.object({
  discordId: z.string(),
  uploaderId: z.string(),
  fileName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  albumId: z.string()
}).strict();

export const FileUpdateManyMutationInputSchema: z.ZodType<Prisma.FileUpdateManyMutationInput> = z.object({
  discordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyInput> = z.object({
  discordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string(),
  sid: z.string(),
  data: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string(),
  sid: z.string(),
  data: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string(),
  sid: z.string(),
  data: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  data: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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
  search: z.string().optional(),
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

export const GuildOrderByRelevanceInputSchema: z.ZodType<Prisma.GuildOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => GuildOrderByRelevanceFieldEnumSchema),z.lazy(() => GuildOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const GuildCountOrderByAggregateInputSchema: z.ZodType<Prisma.GuildCountOrderByAggregateInput> = z.object({
  guildId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GuildMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GuildMaxOrderByAggregateInput> = z.object({
  guildId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GuildMinOrderByAggregateInputSchema: z.ZodType<Prisma.GuildMinOrderByAggregateInput> = z.object({
  guildId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
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
  search: z.string().optional(),
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

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
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
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FileListRelationFilterSchema: z.ZodType<Prisma.FileListRelationFilter> = z.object({
  every: z.lazy(() => FileWhereInputSchema).optional(),
  some: z.lazy(() => FileWhereInputSchema).optional(),
  none: z.lazy(() => FileWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const FileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FileOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlbumOrderByRelevanceInputSchema: z.ZodType<Prisma.AlbumOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => AlbumOrderByRelevanceFieldEnumSchema),z.lazy(() => AlbumOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const AlbumCountOrderByAggregateInputSchema: z.ZodType<Prisma.AlbumCountOrderByAggregateInput> = z.object({
  albumId: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlbumMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AlbumMaxOrderByAggregateInput> = z.object({
  albumId: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AlbumMinOrderByAggregateInputSchema: z.ZodType<Prisma.AlbumMinOrderByAggregateInput> = z.object({
  albumId: z.lazy(() => SortOrderSchema).optional(),
  albumName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
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
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const GuildScalarRelationFilterSchema: z.ZodType<Prisma.GuildScalarRelationFilter> = z.object({
  is: z.lazy(() => GuildWhereInputSchema).optional(),
  isNot: z.lazy(() => GuildWhereInputSchema).optional()
}).strict();

export const AlbumScalarRelationFilterSchema: z.ZodType<Prisma.AlbumScalarRelationFilter> = z.object({
  is: z.lazy(() => AlbumWhereInputSchema).optional(),
  isNot: z.lazy(() => AlbumWhereInputSchema).optional()
}).strict();

export const SubscribedChannelOrderByRelevanceInputSchema: z.ZodType<Prisma.SubscribedChannelOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => SubscribedChannelOrderByRelevanceFieldEnumSchema),z.lazy(() => SubscribedChannelOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const SubscribedChannelCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubscribedChannelCountOrderByAggregateInput> = z.object({
  channelId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  guildId: z.lazy(() => SortOrderSchema).optional(),
  albumId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscribedChannelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubscribedChannelMaxOrderByAggregateInput> = z.object({
  channelId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  guildId: z.lazy(() => SortOrderSchema).optional(),
  albumId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscribedChannelMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubscribedChannelMinOrderByAggregateInput> = z.object({
  channelId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  guildId: z.lazy(() => SortOrderSchema).optional(),
  albumId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileOrderByRelevanceInputSchema: z.ZodType<Prisma.FileOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => FileOrderByRelevanceFieldEnumSchema),z.lazy(() => FileOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const FileCountOrderByAggregateInputSchema: z.ZodType<Prisma.FileCountOrderByAggregateInput> = z.object({
  discordId: z.lazy(() => SortOrderSchema).optional(),
  uploaderId: z.lazy(() => SortOrderSchema).optional(),
  fileName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  albumId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FileMaxOrderByAggregateInput> = z.object({
  discordId: z.lazy(() => SortOrderSchema).optional(),
  uploaderId: z.lazy(() => SortOrderSchema).optional(),
  fileName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  albumId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMinOrderByAggregateInputSchema: z.ZodType<Prisma.FileMinOrderByAggregateInput> = z.object({
  discordId: z.lazy(() => SortOrderSchema).optional(),
  uploaderId: z.lazy(() => SortOrderSchema).optional(),
  fileName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  albumId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelevanceInputSchema: z.ZodType<Prisma.SessionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => SessionOrderByRelevanceFieldEnumSchema),z.lazy(() => SessionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sid: z.lazy(() => SortOrderSchema).optional(),
  data: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sid: z.lazy(() => SortOrderSchema).optional(),
  data: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sid: z.lazy(() => SortOrderSchema).optional(),
  data: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
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

export const FileCreateNestedManyWithoutAlbumInputSchema: z.ZodType<Prisma.FileCreateNestedManyWithoutAlbumInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutAlbumInputSchema),z.lazy(() => FileCreateWithoutAlbumInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyAlbumInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscribedChannelCreateNestedManyWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelCreateNestedManyWithoutAlbumInput> = z.object({
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema).array(),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscribedChannelCreateManyAlbumInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FileUncheckedCreateNestedManyWithoutAlbumInputSchema: z.ZodType<Prisma.FileUncheckedCreateNestedManyWithoutAlbumInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutAlbumInputSchema),z.lazy(() => FileCreateWithoutAlbumInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyAlbumInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInput> = z.object({
  create: z.union([ z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateWithoutAlbumInputSchema).array(),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => SubscribedChannelCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubscribedChannelCreateManyAlbumInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubscribedChannelWhereUniqueInputSchema),z.lazy(() => SubscribedChannelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const FileUpdateManyWithoutAlbumNestedInputSchema: z.ZodType<Prisma.FileUpdateManyWithoutAlbumNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutAlbumInputSchema),z.lazy(() => FileCreateWithoutAlbumInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FileUpsertWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => FileUpsertWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyAlbumInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FileUpdateWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => FileUpdateWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FileUpdateManyWithWhereWithoutAlbumInputSchema),z.lazy(() => FileUpdateManyWithWhereWithoutAlbumInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
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

export const FileUncheckedUpdateManyWithoutAlbumNestedInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutAlbumNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutAlbumInputSchema),z.lazy(() => FileCreateWithoutAlbumInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema),z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema),z.lazy(() => FileCreateOrConnectWithoutAlbumInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FileUpsertWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => FileUpsertWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyAlbumInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FileUpdateWithWhereUniqueWithoutAlbumInputSchema),z.lazy(() => FileUpdateWithWhereUniqueWithoutAlbumInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FileUpdateManyWithWhereWithoutAlbumInputSchema),z.lazy(() => FileUpdateManyWithWhereWithoutAlbumInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
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

export const AlbumCreateNestedOneWithoutFilesInputSchema: z.ZodType<Prisma.AlbumCreateNestedOneWithoutFilesInput> = z.object({
  create: z.union([ z.lazy(() => AlbumCreateWithoutFilesInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutFilesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlbumCreateOrConnectWithoutFilesInputSchema).optional(),
  connect: z.lazy(() => AlbumWhereUniqueInputSchema).optional()
}).strict();

export const AlbumUpdateOneRequiredWithoutFilesNestedInputSchema: z.ZodType<Prisma.AlbumUpdateOneRequiredWithoutFilesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AlbumCreateWithoutFilesInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutFilesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AlbumCreateOrConnectWithoutFilesInputSchema).optional(),
  upsert: z.lazy(() => AlbumUpsertWithoutFilesInputSchema).optional(),
  connect: z.lazy(() => AlbumWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AlbumUpdateToOneWithWhereWithoutFilesInputSchema),z.lazy(() => AlbumUpdateWithoutFilesInputSchema),z.lazy(() => AlbumUncheckedUpdateWithoutFilesInputSchema) ]).optional(),
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
  search: z.string().optional(),
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
  search: z.string().optional(),
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

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
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
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
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
  search: z.string().optional(),
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
  createdAt: z.coerce.date().optional(),
  album: z.lazy(() => AlbumCreateNestedOneWithoutChannelsInputSchema)
}).strict();

export const SubscribedChannelUncheckedCreateWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedCreateWithoutGuildInput> = z.object({
  channelId: z.string(),
  createdAt: z.coerce.date().optional(),
  albumId: z.string()
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  guildId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  albumId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const FileCreateWithoutAlbumInputSchema: z.ZodType<Prisma.FileCreateWithoutAlbumInput> = z.object({
  discordId: z.string(),
  uploaderId: z.string(),
  fileName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FileUncheckedCreateWithoutAlbumInputSchema: z.ZodType<Prisma.FileUncheckedCreateWithoutAlbumInput> = z.object({
  discordId: z.string(),
  uploaderId: z.string(),
  fileName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FileCreateOrConnectWithoutAlbumInputSchema: z.ZodType<Prisma.FileCreateOrConnectWithoutAlbumInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FileCreateWithoutAlbumInputSchema),z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema) ]),
}).strict();

export const FileCreateManyAlbumInputEnvelopeSchema: z.ZodType<Prisma.FileCreateManyAlbumInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FileCreateManyAlbumInputSchema),z.lazy(() => FileCreateManyAlbumInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SubscribedChannelCreateWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelCreateWithoutAlbumInput> = z.object({
  channelId: z.string(),
  createdAt: z.coerce.date().optional(),
  guild: z.lazy(() => GuildCreateNestedOneWithoutSubscribedChannelsInputSchema)
}).strict();

export const SubscribedChannelUncheckedCreateWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedCreateWithoutAlbumInput> = z.object({
  channelId: z.string(),
  createdAt: z.coerce.date().optional(),
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

export const FileUpsertWithWhereUniqueWithoutAlbumInputSchema: z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutAlbumInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FileUpdateWithoutAlbumInputSchema),z.lazy(() => FileUncheckedUpdateWithoutAlbumInputSchema) ]),
  create: z.union([ z.lazy(() => FileCreateWithoutAlbumInputSchema),z.lazy(() => FileUncheckedCreateWithoutAlbumInputSchema) ]),
}).strict();

export const FileUpdateWithWhereUniqueWithoutAlbumInputSchema: z.ZodType<Prisma.FileUpdateWithWhereUniqueWithoutAlbumInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FileUpdateWithoutAlbumInputSchema),z.lazy(() => FileUncheckedUpdateWithoutAlbumInputSchema) ]),
}).strict();

export const FileUpdateManyWithWhereWithoutAlbumInputSchema: z.ZodType<Prisma.FileUpdateManyWithWhereWithoutAlbumInput> = z.object({
  where: z.lazy(() => FileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FileUpdateManyMutationInputSchema),z.lazy(() => FileUncheckedUpdateManyWithoutAlbumInputSchema) ]),
}).strict();

export const FileScalarWhereInputSchema: z.ZodType<Prisma.FileScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
  discordId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uploaderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fileName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  albumId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
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
  createdAt: z.coerce.date().optional()
}).strict();

export const GuildUncheckedCreateWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildUncheckedCreateWithoutSubscribedChannelsInput> = z.object({
  guildId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const GuildCreateOrConnectWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildCreateOrConnectWithoutSubscribedChannelsInput> = z.object({
  where: z.lazy(() => GuildWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GuildCreateWithoutSubscribedChannelsInputSchema),z.lazy(() => GuildUncheckedCreateWithoutSubscribedChannelsInputSchema) ]),
}).strict();

export const AlbumCreateWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumCreateWithoutChannelsInput> = z.object({
  albumId: z.string().optional(),
  albumName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumUncheckedCreateWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumUncheckedCreateWithoutChannelsInput> = z.object({
  albumId: z.string().optional(),
  albumName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutAlbumInputSchema).optional()
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
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GuildUncheckedUpdateWithoutSubscribedChannelsInputSchema: z.ZodType<Prisma.GuildUncheckedUpdateWithoutSubscribedChannelsInput> = z.object({
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  files: z.lazy(() => FileUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const AlbumUncheckedUpdateWithoutChannelsInputSchema: z.ZodType<Prisma.AlbumUncheckedUpdateWithoutChannelsInput> = z.object({
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const AlbumCreateWithoutFilesInputSchema: z.ZodType<Prisma.AlbumCreateWithoutFilesInput> = z.object({
  albumId: z.string().optional(),
  albumName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  channels: z.lazy(() => SubscribedChannelCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumUncheckedCreateWithoutFilesInputSchema: z.ZodType<Prisma.AlbumUncheckedCreateWithoutFilesInput> = z.object({
  albumId: z.string().optional(),
  albumName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  channels: z.lazy(() => SubscribedChannelUncheckedCreateNestedManyWithoutAlbumInputSchema).optional()
}).strict();

export const AlbumCreateOrConnectWithoutFilesInputSchema: z.ZodType<Prisma.AlbumCreateOrConnectWithoutFilesInput> = z.object({
  where: z.lazy(() => AlbumWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AlbumCreateWithoutFilesInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutFilesInputSchema) ]),
}).strict();

export const AlbumUpsertWithoutFilesInputSchema: z.ZodType<Prisma.AlbumUpsertWithoutFilesInput> = z.object({
  update: z.union([ z.lazy(() => AlbumUpdateWithoutFilesInputSchema),z.lazy(() => AlbumUncheckedUpdateWithoutFilesInputSchema) ]),
  create: z.union([ z.lazy(() => AlbumCreateWithoutFilesInputSchema),z.lazy(() => AlbumUncheckedCreateWithoutFilesInputSchema) ]),
  where: z.lazy(() => AlbumWhereInputSchema).optional()
}).strict();

export const AlbumUpdateToOneWithWhereWithoutFilesInputSchema: z.ZodType<Prisma.AlbumUpdateToOneWithWhereWithoutFilesInput> = z.object({
  where: z.lazy(() => AlbumWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AlbumUpdateWithoutFilesInputSchema),z.lazy(() => AlbumUncheckedUpdateWithoutFilesInputSchema) ]),
}).strict();

export const AlbumUpdateWithoutFilesInputSchema: z.ZodType<Prisma.AlbumUpdateWithoutFilesInput> = z.object({
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  channels: z.lazy(() => SubscribedChannelUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const AlbumUncheckedUpdateWithoutFilesInputSchema: z.ZodType<Prisma.AlbumUncheckedUpdateWithoutFilesInput> = z.object({
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  albumName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  channels: z.lazy(() => SubscribedChannelUncheckedUpdateManyWithoutAlbumNestedInputSchema).optional()
}).strict();

export const SubscribedChannelCreateManyGuildInputSchema: z.ZodType<Prisma.SubscribedChannelCreateManyGuildInput> = z.object({
  channelId: z.string(),
  createdAt: z.coerce.date().optional(),
  albumId: z.string()
}).strict();

export const SubscribedChannelUpdateWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateWithoutGuildInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  album: z.lazy(() => AlbumUpdateOneRequiredWithoutChannelsNestedInputSchema).optional()
}).strict();

export const SubscribedChannelUncheckedUpdateWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateWithoutGuildInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelUncheckedUpdateManyWithoutGuildInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateManyWithoutGuildInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  albumId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileCreateManyAlbumInputSchema: z.ZodType<Prisma.FileCreateManyAlbumInput> = z.object({
  discordId: z.string(),
  uploaderId: z.string(),
  fileName: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SubscribedChannelCreateManyAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelCreateManyAlbumInput> = z.object({
  channelId: z.string(),
  createdAt: z.coerce.date().optional(),
  guildId: z.string()
}).strict();

export const FileUpdateWithoutAlbumInputSchema: z.ZodType<Prisma.FileUpdateWithoutAlbumInput> = z.object({
  discordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileUncheckedUpdateWithoutAlbumInputSchema: z.ZodType<Prisma.FileUncheckedUpdateWithoutAlbumInput> = z.object({
  discordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileUncheckedUpdateManyWithoutAlbumInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutAlbumInput> = z.object({
  discordId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelUpdateWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUpdateWithoutAlbumInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  guild: z.lazy(() => GuildUpdateOneRequiredWithoutSubscribedChannelsNestedInputSchema).optional()
}).strict();

export const SubscribedChannelUncheckedUpdateWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateWithoutAlbumInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  guildId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscribedChannelUncheckedUpdateManyWithoutAlbumInputSchema: z.ZodType<Prisma.SubscribedChannelUncheckedUpdateManyWithoutAlbumInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const FileFindFirstArgsSchema: z.ZodType<Prisma.FileFindFirstArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileScalarFieldEnumSchema,FileScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const FileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FileFindFirstOrThrowArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileScalarFieldEnumSchema,FileScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const FileFindManyArgsSchema: z.ZodType<Prisma.FileFindManyArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileScalarFieldEnumSchema,FileScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const FileAggregateArgsSchema: z.ZodType<Prisma.FileAggregateArgs> = z.object({
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FileGroupByArgsSchema: z.ZodType<Prisma.FileGroupByArgs> = z.object({
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithAggregationInputSchema.array(),FileOrderByWithAggregationInputSchema ]).optional(),
  by: FileScalarFieldEnumSchema.array(),
  having: FileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FileFindUniqueArgsSchema: z.ZodType<Prisma.FileFindUniqueArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const FileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FileFindUniqueOrThrowArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  where: SessionWhereUniqueInputSchema,
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

export const updateManyGuildCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyGuildCreateManyAndReturnArgs> = z.object({
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

export const updateManyAlbumCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyAlbumCreateManyAndReturnArgs> = z.object({
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

export const updateManySubscribedChannelCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManySubscribedChannelCreateManyAndReturnArgs> = z.object({
  data: z.union([ SubscribedChannelUpdateManyMutationInputSchema,SubscribedChannelUncheckedUpdateManyInputSchema ]),
  where: SubscribedChannelWhereInputSchema.optional(),
}).strict() ;

export const SubscribedChannelDeleteManyArgsSchema: z.ZodType<Prisma.SubscribedChannelDeleteManyArgs> = z.object({
  where: SubscribedChannelWhereInputSchema.optional(),
}).strict() ;

export const FileCreateArgsSchema: z.ZodType<Prisma.FileCreateArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  data: z.union([ FileCreateInputSchema,FileUncheckedCreateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const FileUpsertArgsSchema: z.ZodType<Prisma.FileUpsertArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
  create: z.union([ FileCreateInputSchema,FileUncheckedCreateInputSchema ]),
  update: z.union([ FileUpdateInputSchema,FileUncheckedUpdateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const FileCreateManyArgsSchema: z.ZodType<Prisma.FileCreateManyArgs> = z.object({
  data: z.union([ FileCreateManyInputSchema,FileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FileCreateManyAndReturnArgs> = z.object({
  data: z.union([ FileCreateManyInputSchema,FileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FileDeleteArgsSchema: z.ZodType<Prisma.FileDeleteArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const FileUpdateArgsSchema: z.ZodType<Prisma.FileUpdateArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  data: z.union([ FileUpdateInputSchema,FileUncheckedUpdateInputSchema ]),
  where: FileWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const FileUpdateManyArgsSchema: z.ZodType<Prisma.FileUpdateManyArgs> = z.object({
  data: z.union([ FileUpdateManyMutationInputSchema,FileUncheckedUpdateManyInputSchema ]),
  where: FileWhereInputSchema.optional(),
}).strict() ;

export const updateManyFileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyFileCreateManyAndReturnArgs> = z.object({
  data: z.union([ FileUpdateManyMutationInputSchema,FileUncheckedUpdateManyInputSchema ]),
  where: FileWhereInputSchema.optional(),
}).strict() ;

export const FileDeleteManyArgsSchema: z.ZodType<Prisma.FileDeleteManyArgs> = z.object({
  where: FileWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
  relationLoadStrategy: RelationLoadStrategySchema.optional(),
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const updateManySessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManySessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;