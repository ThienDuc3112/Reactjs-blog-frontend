import Image from "next/image";
import pageNotFoundCSS from "./pageNotFound.module.css";

const NotFound = () => {
  return (
    <div className={pageNotFoundCSS.container}>
      <Image
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fbocchi-on-the-rocks-v0-5pgzqswie05a1.png%3Fwidth%3D1080%26crop%3Dsmart%26auto%3Dwebp%26s%3D6e6f80e1e2fba5bd6a402783fafc4a8b14b566ea&f=1&nofb=1&ipt=75e5e4447bd4d1e809da5a69a86e4030449f0760d18b5b1e7590d199b469f96e&ipo=images"
        alt="Page not found"
        unoptimized
        width={300}
        height={256}
      />
      <h1>Page not found</h1>
      <p>The page you{"'"}re looking for does not exist</p>
    </div>
  );
};

export default NotFound;
