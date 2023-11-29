import PreviewList from "@/app/_components/previewList/previewList";
import homeCSS from "@/app/(routes)/page.module.css";

const TagFilter = ({ params }: { params: { tag: string } }) => (
  <>
    <img
      className={homeCSS.backgroundImg}
      alt="Let hope this background don't break"
      src="https://wallpapercave.com/wp/akHTqZe.jpg"
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
