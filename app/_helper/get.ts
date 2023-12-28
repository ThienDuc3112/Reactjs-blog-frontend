export const get = async <T>(
  url: string,
  withCredential: boolean = false,
  options?: RequestInit
): Promise<[T, null] | [null, unknown]> => {
  try {
    const option = options ?? {
      credentials: withCredential ? "include" : "omit",
    };
    const data: T = await fetch(url, option).then((res) => {
      if (!res.ok) {
        const err = new Error("Request fail");
        (err as any).status = res.status;
        throw err;
      }
      return res.json();
    });
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
