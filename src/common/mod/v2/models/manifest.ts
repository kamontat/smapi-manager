interface ContentPackFor {
  UniqueID: string;
}

interface Manifest {
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

export type { Manifest, ContentPackFor };
