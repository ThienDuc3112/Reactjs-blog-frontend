import { useEffect, useState } from "react";
import { TUseEffectMethod } from "../_interfaces/useFetch";

export const useFetch = (
  url: string,
  withCredential: boolean = false,
  method: TUseEffectMethod = "GET",
  body?: any
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null as any);
  const [err, setErr] = useState(null as any);
  useEffect(() => {
    const options: RequestInit = {
      method,
    };
    if (method != "GET") {
      options.headers = {
        "Content-type": "application/json",
      };
      options.body = JSON.stringify(body);
    }
    if (withCredential) {
      options.credentials = "include";
    }
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          setErr({ code: res.status });
          setLoading(false);
        }
        if (typeof res.json == "function") {
          res.json().then((json) => {
            setData(json);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      })
      .catch((err: any) => {
        setErr(err);
        setLoading(false);
      });
  }, []);
  return { loading, err, data };
};
