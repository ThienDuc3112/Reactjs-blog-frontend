export const post = async <T>(
  url: string,
  body: any,
  withCredential: boolean = false
): Promise<[T, null] | [null, unknown]> => {
  try {
    const data: T = await fetch(url, {
      credentials: withCredential ? "include" : "omit",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
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
