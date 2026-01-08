import {Link} from "react-router-dom";

const Title = ({content="Articles"}) => {
    return (
    <section className="py-10 mb-4">
      <div className="max-w-7xl pr-2 pl-2 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl">
            {content}
          </h1>
          <Link 
            to="/login" 
            className="text-xl text-black hover:text-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
    )
}

export {Title};
