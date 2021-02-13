interface Cache {
  lastUpdated: number;
}

interface ValidatedResult {
  datetime: number;

  exist: boolean;
  expired: boolean;
}

export const validateCaches = <C extends Cache>(threshold: number, cache: C | undefined): ValidatedResult => {
  const datetime = +new Date();
  const isCacheExist = cache?.lastUpdated !== undefined && cache?.lastUpdated !== -1;
  const isCacheExpired = isCacheExist ? Math.abs(cache.lastUpdated - datetime) > threshold : true;

  return {
    datetime,
    exist: isCacheExist,
    expired: isCacheExpired,
  };
};
