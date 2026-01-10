import {Post} from "./Post";
import {useEffect, useState} from "react";
import {Spinner} from "./Spinner";

const Posts = ({isHome}) => {
    let [posts, setPosts] = useState([]);
    let [loading, setLoading] = useState(true);
    const url = isHome ? "/api/posts?num=3" : "/api/posts";
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();  
                
                setPosts(data);
            } catch (err) {
                console.log("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section className="bg-zinc-900">
            <div className="mx-auto  max-w:lg container ">
                <div className="grid grid-cols-1 gap-4 sm:px-15 lg:px-65">
                {loading ? <Spinner loading={loading}/> : <>
                    {posts.map((post) => (
                        <Post key={post.id} post={post}/>
                    ))}
                    </>}
                </div>
            </div>
        </section>
    )
};

export {Posts};
