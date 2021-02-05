# Mod directory and caches system

Mod collection: The root directory contains all mod directory
Mod directory: individual mod directory (application). Inside mod directory you will find `manifest.json` file contains all information of that mod.
Mod: individual mod directory (application) in term of object in smapi-manager application.

## Caches system

The mod collection shared caches on caching file (encrypted). This will be only cache data for application to load and no need to always read to IO system.