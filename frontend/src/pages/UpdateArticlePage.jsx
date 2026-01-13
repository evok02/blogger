import UpdateArticleForm from "../components/UpdateArticleForm";

const UpdateArticlePage = ({post}) => {
    return (
    <div>
            <UpdateArticleForm 
                initTitle={post.title} 
                initDest={post.description}
                initContent={post.content}
            />
    </div>
    );
}

export default UpdateArticlePage;
