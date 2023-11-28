import Image from "next/image";
import PreviewList from "../_components/previewList/previewList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div>
        <Image
          className={styles.backgroundImg}
          alt="Let hope this bocchi background don't break"
          src={
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F82a6d857-ee27-4426-b47e-719115cc3fe7%2Fdfww0w1-00952704-a709-47c2-8757-2acef94fc286.png%2Fv1%2Ffill%2Fw_1280%2Ch_540%2Cq_80%2Cstrp%2Fbocchi_runner_2049_by_carlomontie_dfww0w1-fullview.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTQwIiwicGF0aCI6IlwvZlwvODJhNmQ4NTctZWUyNy00NDI2LWI0N2UtNzE5MTE1Y2MzZmU3XC9kZnd3MHcxLTAwOTUyNzA0LWE3MDktNDdjMi04NzU3LTJhY2VmOTRmYzI4Ni5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.w11q8XajyD-6Fc0lbw9N9ERsXIz755tQhOJm17h9a6k&f=1&nofb=1&ipt=fb5eec9d8f4930f4bd3ce7193479da3390e46917b5b1d0bd8dd1da201460a260&ipo=images"
          }
          width={1280}
          height={540}
          unoptimized
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
