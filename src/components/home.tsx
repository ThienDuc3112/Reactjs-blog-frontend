import { useContext, useEffect, useState } from "react";
import home from "./home.module.css";
import axios from "axios";
import PostCard from "./postCard";
import { UserContext } from "../App";
import { SERVER_URL } from "../public/constants";

const Home = () => {
  const TITLE = 'Console.log("Hello Internet")';
  const { user } = useContext(UserContext);

  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allPost, setAllPost] = useState([] as any[]);
  let delay = 50;

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/post/previewall`)
      .then((res) => {
        if (res.data.success) {
          setAllPost((res.data.data as Array<any>).reverse());
        }
      })
      .catch((err) => {
        alert("Cannot connect to the server");
      });
  }, []);

  useEffect(() => {
    if (currentIndex < TITLE.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + TITLE[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, TITLE]);
  return (
    <div>
      <img
        className={home.backgroundImg}
        alt="Let hope this bocchi background don't break"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F82a6d857-ee27-4426-b47e-719115cc3fe7%2Fdfww0w1-00952704-a709-47c2-8757-2acef94fc286.png%2Fv1%2Ffill%2Fw_1280%2Ch_540%2Cq_80%2Cstrp%2Fbocchi_runner_2049_by_carlomontie_dfww0w1-fullview.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTQwIiwicGF0aCI6IlwvZlwvODJhNmQ4NTctZWUyNy00NDI2LWI0N2UtNzE5MTE1Y2MzZmU3XC9kZnd3MHcxLTAwOTUyNzA0LWE3MDktNDdjMi04NzU3LTJhY2VmOTRmYzI4Ni5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.w11q8XajyD-6Fc0lbw9N9ERsXIz755tQhOJm17h9a6k&f=1&nofb=1&ipt=fb5eec9d8f4930f4bd3ce7193479da3390e46917b5b1d0bd8dd1da201460a260&ipo=images"
      />
      <div className={home.title}>
        <h1>{currentText}</h1>
        <p>Welcome to my little corner on the internet</p>
        <p>I'm Duc, NUS Computer Engineering student (AY23/24)</p>
        <p>
          Feel free to look around, you're most likely not gonna see it again
          (lol)
        </p>
        <p>If you haven't realize, Bocchi is literally me</p>
      </div>
      <div>
        {allPost
          .filter(
            (post) =>
              post.isPublic ||
              post?.author === user?.username ||
              user?.username == "huyen"
          )
          .map((postPreview) => (
            <PostCard
              key={postPreview.id}
              tags={postPreview.tags}
              id={postPreview.id}
              title={postPreview.title}
              readTime={postPreview.readTime}
              description={postPreview.description}
              time={postPreview.time}
              author={postPreview.author ?? "Anonymous"}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
