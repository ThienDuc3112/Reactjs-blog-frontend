import Link from "next/link";
import tagsListingCSS from "./tag.module.css";
import TAGS from "../../_assets/tags.json";

const Tags = () => {
  return (
    <div>
      <h1 className={tagsListingCSS.title}>Tags listing</h1>
      <div className={tagsListingCSS.tagsContainer}>
        {TAGS.map((tag) => (
          <Link className={tagsListingCSS.tag} href={`/tags/${tag}`} key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tags;
