import {Post} from "../components/Post";
import {useState, useEffect} from "react";
import {Spinner} from "../components/Spinner";
import UpdateArticleForm from "../components/UpdateArticleForm";
const ArticlePage = ({isAdmin}) => {
    let [loading, setLoading] = useState(true);
    let [post, setPost] = useState({});
    const [editMode, setEditMode] = useState(false);
    let id = window.location.pathname.split("/").pop();
    isAdmin && console.log("eto admin servera");
    
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                let res = await fetch(`/api/post?id=${id}`);
                let data = await res.json();
                setPost(data);
            } catch(error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [])


    if (editMode) {
        return <UpdateArticleForm post={post} setEditMode={setEditMode}/>
    } else {
        return (

        <section className="bg-zinc-900 min-h-screen h-auto flex flex-col">
            <div className="mx-auto  max-w:lg container ">
                <div className="grid grid-cols-1 sm:px-15 lg:px-65 pt-15">
                    {loading ?  <Spinner loading={loading}/> : 
                        <Post post={post} isPreview={false}/>
                    } {

                        }
                        {isAdmin && 

                    <div className="z-10 flex flex-row-reverse text-blue-500 font-semibold text-lg px-15">
                        <label onClick={()=>setEditMode(true)} className="pb-20 text-blue-500 text-xl hover:text-blue-500/80">Edit</label>
                    </div>

                        }
                </div>
            </div>
        </section>
        );
    }
}

export {ArticlePage};
