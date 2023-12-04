import PreviewList from "@/app/_components/previewList/previewList";
import homeCSS from "@/app/(routes)/page.module.css";
import Image from "next/image";
import background from "@/app/_assets/tagBG.jpg";

const TagFilter = ({ params }: { params: { tag: string } }) => (
  <>
    <Image
      className={homeCSS.backgroundImg}
      alt="Let hope this background don't break"
      src={background}
      width={1280}
      height={540}
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
