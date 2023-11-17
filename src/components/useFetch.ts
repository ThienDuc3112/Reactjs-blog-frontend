import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState(undefined as any);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get(url).then((data) => {
      setData(data.data);
      setIsLoading(false);
    });
  }, []);
  return [data, isLoading];
};

export default useFetch;
