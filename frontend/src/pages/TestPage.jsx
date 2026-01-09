const TestPage = () => {
    return (
    <>
           <div className="flex min-h-screen bg-indigo-100 flex-col">
                <div className="flex flex-row bg-indigo-500 px-6 py-4 text-indigo-100 justify-between mb-8">
                    <h1 className="text-lg font-bold">MySiteName</h1>    
                    <nav className="flex gap-4">
                        <a href="#">Home</a>
                        <a href="#">Blog</a>
                        <a href="#">Contact</a>
                    </nav>
                </div>
                <div className="space-y-8 flex-grow">
                    <section className="text-center">
                        <h2 className="mb-4 text-xl font-semibold "> Welcome </h2>
                        <p> This is the main content area of the site. </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-xl font-semibold text-center"> Features </h2>
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 px-6">
                           <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg"> 
                                Feature1 
                           </div> 
                            <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg">
                                Feature2
                            </div>
                            <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg">
                                Feature3 
                            </div>
                           <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg"> 
                                Feature1 
                           </div> 
                            <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg">
                                Feature2
                            </div>
                            <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg">
                                Feature3 
                            </div>
                           <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg"> 
                                Feature1 
                           </div> 
                            <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg">
                                Feature2
                            </div>
                            <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg">
                                Feature3 
                            </div>
                           <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg"> 
                                Feature1 
                           </div> 
                            <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg">
                                Feature2
                            </div>
                            <div className="rounded bg-indigo-400 p-10 hover:bg-indigo-700 hover:text-white hover:shadow-lg">
                                Feature3 
                            </div>
                        </div>
                    </section>
                </div>
                    <div className="bg-indigo-500 text-center text-sm text-indigo-100 py-8 mt-4">&copy; 2025 MyWebsite All rights reserved</div>
           </div> 
    </>
    )
}

export {TestPage};
