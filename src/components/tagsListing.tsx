import { Link } from "react-router-dom"
import TAGS from "../public/tags.json"
import tagsListingCSS from "./tagsListing.module.css"

const Tags = () => {
    return (
        <div>
            <h1 className={tagsListingCSS.title}>Tags listing</h1>
            <div className={tagsListingCSS.tagsContainer}>
                {TAGS.map(tag => <Link className={tagsListingCSS.tag} to={`/tags/${tag}`} key={tag}>{tag}</Link>)}
            </div>
        </div>
    )
}

export default Tags 