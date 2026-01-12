import {Post} from "../components/Post";
import {useState, useEffect} from "react";
import {Spinner} from "../components/Spinner";
const ArticlePage = () => {
    let [loading, setLoading] = useState(true);
    let [post, setPost] = useState({});
    let id = window.location.pathname.split("/").pop();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                let res = await fetch(`/api/post?id=${id}`);
                let data = await res.json();
                setPost(data);
                console.log(data);
            } catch(error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [])

    return (
        <section className="bg-zinc-900 h-screen">
            <div className="mx-auto  max-w:lg container ">
                <div className="grid grid-cols-1 sm:px-15 lg:px-65 pt-15">
                    {loading ?  <Spinner loading={loading}/> : 
                        <Post post={post} isPreview={false}/>
                    }
                </div>
            </div>
        </section>
    );
}

export {ArticlePage};
