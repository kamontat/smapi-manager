interface ContentPackFor {
  UniqueID: string;
}

interface ManifestData {
  Name: string;
  UniqueID: string;
  MinimumApiVersion: string;
  UpdateKeys: string[];

  Author?: string;
  Version?: string;
  Description?: string;
  EntryDll?: string;
  ContentPackFor?: ContentPackFor;
}

export default ManifestData;
