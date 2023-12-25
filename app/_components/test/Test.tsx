import { get } from "@/app/_helper/get";

const Test = async () => {
  const [data, err] = await get<{ token: any }>(
    `${process.env.NEXT_PUBLIC_API_URL}/test/token`
  );
  if (err) return <div>I tried</div>;
  return <div>{`${data}`}</div>;
};

export default Test;
