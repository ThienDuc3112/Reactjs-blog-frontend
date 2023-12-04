import Image from "next/image";
import PreviewList from "../_components/previewList/previewList";
import styles from "./page.module.css";
import background from "@/app/_assets/backgroundApp.jpg";

export default function Home() {
  return (
    <>
      <div>
        <Image
          className={styles.backgroundImg}
          alt="Let hope this bocchi background don't break"
          src={background}
          width={1280}
          height={540}
        />
        <div className={styles.title}>
          <h1>
            Console.log({'"'}Hello world{'"'})
          </h1>
          <p>Welcome to my little corner on the internet</p>
          <p>I{"'"}m Duc, NUS Computer Engineering student (AY23/24)</p>
          <p>
            Feel free to look around, you{"'"}re most likely not gonna see it
            again (lol)
          </p>
          <p>If you haven{"'"}t realize, Bocchi is literally me</p>
        </div>
      </div>
      <PreviewList link={`${process.env.NEXT_PUBLIC_API_URL}/post/preview`} />
    </>
  );
}
