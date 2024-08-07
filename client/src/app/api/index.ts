export type RequestBody = {
  [key: string]: string;
};

export type QueryParams = {
  [key: string]: any;
};

const apiCaller = async <T = unknown>(
  url: string,
  method: string,
  opts?: RequestInit
): Promise<T | null> => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...opts,
    });
    if (!res.ok) {
      console.error(`[apiCaller][error] HTTP Status: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data as T;
  } catch (error) {
    return null;
  }
};
const api = {
  get: async <T = unknown>(url: string): Promise<T | null> => {
    return apiCaller<T>(url, 'GET');
  },

  delete: async <T = unknown>(url: string): Promise<T | null> => {
    return apiCaller<T>(url, 'DELETE');
  },

  create: async <T = unknown>(
    url: string,
    body: RequestBody
  ): Promise<T | null> => {
    return apiCaller<T>(url, 'POST', {
      body: JSON.stringify(body),
    });
  },

  update: async <T = unknown>(
    url: string,
    body?: RequestBody
  ): Promise<T | null> => {
    return apiCaller<T>(url, 'PUT', {
      ...(body && { body: JSON.stringify(body) }),
    });
  },
};

export { api };
