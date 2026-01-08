import {Post} from "./Post";

const Posts = () => {
    return (
        <section className="bg-white">
            <div className="mx-auto  max-w:lg container ">
                <div className="grid grid-cols-1">
                    <Post title="Article 1" desc="description 1..."/>
                    <Post title="Article 2" desc="description 2..."/>
                    <Post title="Article 3" desc="description 3..."/>
                </div>
            </div>
        </section>
    )
};

export {Posts};
