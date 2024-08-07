export const replaceEndpointsToQuery = (
  url: string,
  params: Record<string, string | number>
) => {
  let currUrl = url;
  for (const [key, value] of Object.entries(params)) {
    const regex = new RegExp(`:${key}`, 'g');
    currUrl = currUrl.replace(regex, value as string | any);
  }
  return currUrl;
};

export const getSafeValue = (
  o: { [key: string]: any } = {},
  key: string,
  defaultValue?: unknown
): any => {
  try {
    if (Object.keys(o).length === 0) return undefined;

    let r = o;

    for (const k of key.split('.')) {
      if (o && typeof o === 'object' && k in o) {
        r = r[k];
      }
    }

    if (!r?.[key] && defaultValue) {
      return defaultValue;
    }
    return r;
  } catch {}
};

export const areObjectValuesEmpty = (o: Record<string, string>) =>
  Object.values(o).every((x) => x === null || x === '');
