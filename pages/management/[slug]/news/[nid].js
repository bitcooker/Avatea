import * as React from "react";
import { useRouter } from "next/router";
import {useWallet} from "@albs1/use-wallet";
import {useEffect, useState} from "react";

// core components
import ButtonFit from "../../../../src/components/core/Button/ButtonFit";
import ButtonOutlineFit from "../../../../src/components/core/Button/ButtonOutlineFit";
import InputEmpty from "../../../../src/components/core/Input/InputEmpty";
import RichEditor from "../../../../src/components/core/RichEditor/RichEditor";
import FileInput from "../../../../src/components/core/Input/FileInput";

// onboarding components
import helper from "../../../../src/helpers";
import ManagementAuthentication from "../../../../src/components/pages/management/ManagementAuthentication";


export default function News(props) {
    const router = useRouter();
    const wallet = useWallet();
    const [project, setProject] = useState({});
    const { slug, nid } = router.query;
    const [newsImage, setNewsImage] = useState("");
    const [newsImageURL, setNewsImageURL] = useState("");
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [link,setLink] = useState("");
    const isFile = input => 'File' in window && input instanceof File;

    useEffect(() => {
        if (isFile(newsImage)) setNewsImageURL(URL.createObjectURL(newsImage))
    }, [newsImage])

    useEffect(() => {
        if (props.projectDetail) setProject(props.projectDetail);
        else {
            (async () => {
                const result = await helper.project.getProject(slug);
                setProject(result?.project);
            })();
        }
    }, [props, slug]);

    useEffect(() => {
        (async() => {
            const data = await helper.article.getArticle(nid);
            setTitle(data.title);
            setDescription(data.description);
            setLink(data.link);
            setNewsImageURL(data.image);
        })()
    },[nid])

    const updateArticle = async() => {
        await helper.article.updateArticle({
            id: nid,
            title,
            description,
            project: slug,
            ...(newsImage ? { image: newsImage } : "" ),
            link,
            wallet
        })
    }

  return (
      <ManagementAuthentication project={project} wallet={wallet}>

          <div className="flex flex-col min-h-[80vh] md-lg:min-h-[85vh] space-y-7.5">
              <div className="flex flex-row items-center justify-between">
                  <h1 className="text-2xl">Update Article</h1>
              </div>
              <div className="grow flex flex-col p-7.5 bg-white gap-5 rounded-2xl overflow-hidden hover:scrollbar-thin hover:scrollbar-thumb-gray-200">
                  <div className="flex flex-col space-y-3.75">
                      <div className="flex flex-row">
                      </div>
                      <div className="grid md:grid-cols-2 gap-2.5">
                          <div>
                              <h1 className="text-base md:text-xl mr-2">Title</h1>
                              <InputEmpty id="title" name="title" placeholder="Enter News title" setValue={setTitle} value={title}/>
                          </div>
                          <div>
                              <h2 className="text-base md:text-xl mr-2">Link</h2>
                              <InputEmpty id="Link" name="link" placeholder="Enter Link" setValue={setLink} value={link}/>

                          </div>

                      </div>
                      <FileInput id="newsImage" label="News Image" image={newsImageURL} setValue={setNewsImage} type={"image/*"} />
                  </div>
                  <div className="grow flex flex-col">
                      <h2 className={'text-xl mb-2.5'}>Description</h2>
                      <RichEditor value={description} setValue={setDescription}/>
                  </div>
                  <div className="flex flex-row justify-end gap-3.75">
                      <ButtonFit name="Update" icon="fa-regular fa-plus" handleClick={() => updateArticle()} />
                      <ButtonOutlineFit name="Cancel" icon="fa-regular fa-xmark" handleClick={() => router.back()} />
                  </div>
              </div>
          </div>
      </ManagementAuthentication>

  );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}