import PreviewList from "@/app/_components/previewList/previewList";
import homeCSS from "@/app/(routes)/page.module.css";
import Image from "next/image";

const TagFilter = ({ params }: { params: { tag: string } }) => (
  <>
    <Image
      className={homeCSS.backgroundImg}
      alt="Let hope this background don't break"
      src="https://wallpapercave.com/wp/akHTqZe.jpg"
      width={1920}
      height={1080}
      unoptimized
    />
    <div className={homeCSS.title}>
      <h1>Tag: {params.tag}</h1>
      <p>Showing all post with {params.tag} tag</p>
    </div>
    <PreviewList
      link={`${process.env.NEXT_PUBLIC_API_URL}/post/preview/${params.tag}`}
    />
  </>
);

export default TagFilter;
