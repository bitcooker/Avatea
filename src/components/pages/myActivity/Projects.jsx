import * as React from "react";

// core components
import Spinner from "../../core/Spinner";

// activity components
import MyActivityCardItem from "./MyActivityCardItem";


export default function Projects({projects, loaded}) {
    return <div className="mb-10">
                {projects?.length === 0 && loaded === false ? (
                    <div className="flex items-center justify-center w-full h-[85vh]">
                        <Spinner size={5} />
                    </div>
                ) : (projects.length === 0 && loaded === true ? "No active projects" :
                        <div className="flex flex-col space-y-5">
                            <h2 className={'text-2xl col-span-full'}>Active in these projects</h2>
                            <div className="w-full flex snap-x snap-mandatory overflow-x-auto scrollbar-none sm-md:grid sm-md:grid-cols-2 xl-2xl:grid-cols-2 gap-5 py-5">
                                {projects.map((project, index) =>
                                    <div className="w-full snap-center shrink-0" key={index}>
                                        <MyActivityCardItem {...project}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
}