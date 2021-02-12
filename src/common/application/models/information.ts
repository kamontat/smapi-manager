interface PathInformation {
  app: string;
  user: string;
  data: string;
  log: string;
  temp: string;
}

interface AuthorInformation {
  name: string;
  email: string;
  url: string;
}

interface Information {
  name: string;
  version: string;
  author: AuthorInformation;
  build: string;
  path: PathInformation;
  os: string;
  env: string;
  license: string;
}

export type { Information, PathInformation, AuthorInformation };
