import InputField from "./InputField";
import {useState} from "react";

const UpdateArticleForm = ({ post, setEditMode }) => {
    const [title, setTitle] = useState(post.title)
    const [desc, setDesc] = useState(post.description)
    const [content, setContent] = useState(post.content)

    const postData = async () => {
        let url = `/api/post/update?id=${post.id}`
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                id: post.id,
                title: title,
                description: desc,
                content: content,
            }),
            headers: {
                "Content-Type":"application/json"
            }
        });
        window.location.reload()
    } 
    
    return (
    <section className="bg-zinc-900 min-h-screen h-auto flex justify-center">
            <form  className="absolute container grid grid-cols-1 px-25 py-20 bg-zinc-800 max-h-lg max-w-3xl gap-5 ">
                <h1 className="text-white text-2xl font-extrabold">Article Editor</h1>

                <InputField id="Title" value={title} setValue={setTitle}/>
                <div className="text-zinc-500 flex flex-col gap-2 min-w-xl">
                    <label htmlFor="description" className="ml-2 text-lg text-white ">Description: </label>
                    <textarea 
                        className="w-xl border border-zinc-500 px-3 py-1 text-lg "
                        id="description"
                        placeholder="Description: "
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                        rows="5"

                    />

                </div>
                <div className="text-zinc-500 flex flex-col gap-2 min-w-xl">
                    <label htmlFor="content" className="ml-2 text-lg text-white ">Content: </label>
                    <textarea 
                        className="w-xl border border-zinc-500 px-3 py-1 text-lg "
                        id="content"
                        placeholder="Content: "
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                        rows="10"

                    />

                </div>

                    
                <div className="flex justify-between mt-5">
                    <label onClick={()=>setEditMode(false)} className="text-xl text-blue-500 font-bold hover:text-blue-500/80"> Back </label>
                    <label onClick={() => postData()} className="text-xl text-blue-500 font-bold hover:text-blue-500/80"> Submit </label>
                </div>
            </form>
    </section>
    );
}

export default UpdateArticleForm;
