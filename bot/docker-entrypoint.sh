#!/bin/bash

# Add shared as a workspace (since it's attached as a volume and not part of the image)
npm i

exec "$@"