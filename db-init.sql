-- This file is used to set up the tables in the Postgres database

-- Servers that Polaroids has been added to
CREATE TABLE guild (
    -- The server id, supplied by the Discord API
    guild_id VARCHAR(255),
    added_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY (guild_id)
);

COMMENT ON TABLE guild
    IS 'Servers that Polaroids has been added to';
COMMENT ON COLUMN guild.guild_id
    IS 'The server id, supplied by Discord API';

-- Albums that correspond to existing albums in PhotoStation6
CREATE TABLE album (
    -- The album id, supplied by the PhotoStation API
    album_id VARCHAR(255),
    guild_id VARCHAR(255),
    album_name VARCHAR(255) NOT NULL,
    deleted_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (album_id),
    FOREIGN KEY (guild_id) 
        REFERENCES guild(guild_id) 
);

COMMENT ON TABLE album
    IS 'Albums that correspond to existing albums in PhotoStation6';
COMMENT ON COLUMN album.album_id
    IS 'The album id, supplied by the PhotoStation API';

-- Channels within Discord servers that Polaroids is subscribed to for changes
CREATE TABLE subscribed_channel (
    -- The channel id, supplied by the Discord API
    channel_id VARCHAR(255),
    guild_id VARCHAR(255),
    PRIMARY KEY (channel_id),
    -- The guild that this channel is in
    FOREIGN KEY (guild_id) 
        REFERENCES guild(guild_id)
);

COMMENT ON TABLE subscribed_channel
    IS 'Channels within Discord servers that Polaroids is subscribed to for changes';
COMMENT ON COLUMN subscribed_channel.guild_id
    IS 'The guild that this channel is in';

-- Images that correspond to to images saved to PhotoStation6
CREATE TABLE image (
    -- The image's id, provided by the PhotoStation6 API
    image_id VARCHAR(255),
    album_id VARCHAR(255),
    deleted_at TIMESTAMP WITHOUT TIME ZONE,
    description VARCHAR(255),
    PRIMARY KEY (image_id),
    FOREIGN KEY (album_id)
        REFERENCES album(album_id)
);

COMMENT ON TABLE image
    IS 'Images that correspond to to images saved to PhotoStation6';
COMMENT ON COLUMN image.image_id
    IS 'The image''s id, provided by the PhotoStation6 API';

-- Comments added by users under images
-- CREATE TABLE image_comment (
--     comment_id UUID DEFAULT uuid_generate_v4(),
--     parent_id UUID,
--     deleted_at TIMESTAMP WITHOUT TIME ZONE,
--     PRIMARY KEY (comment_id)
--     FOREIGN KEY (image_id)
--         REFERENCES image(image_id)
-- );