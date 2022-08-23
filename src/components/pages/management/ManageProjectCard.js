import {useEffect, useState} from "react";
import {useWallet} from "@albs1/use-wallet";
import {useRouter} from "next/router";

import helpers from "../../../helpers";

// core components
import Modal from "../../core/modal/Modal";
import Button from "../../core/Button/Button";
import InputEmpty from "../../core/Input/InputEmpty";
import FileInput from "../../core/Input/FileInput";

// page components
import RichEditor from "../../core/RichEditor/RichEditor";
import HomeCard from "../../pages/Home/HomeCard";

export default function ManageProjectCard({project}) {

    const wallet = useWallet();
    const router = useRouter();
    const [visibleEditProjectModal, setVisibleEditProjectModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openEditProject, setOpenEditProject] = useState(false);
    const [projectDescription, setProjectDescription] = useState(project.description);
    const [whitepaper, setWhitepaper] = useState(project.whitepaper);
    const [website, setWebsite] = useState(project.website);
    const [audit, setAudit] = useState(project.audit);
    const [banner, setBanner] = useState(project.banner);
    const [image, setImage] = useState(project.image);
    const [linkedIn, setLinkedIn] = useState(project.social_linkedin);
    const [facebook, setFacebook] = useState(project.social_facebook);
    const [github, setGithub] = useState(project.social_github);
    const [telegram, setTelegram] = useState(project.social_telegram);
    const [discord, setDiscord] = useState(project.social_discord);
    const [medium, setMedium] = useState(project.social_medium);
    const [twitter, setTwitter] = useState(project.social_twitter);
    const [bannerUrl, setBannerUrl] = useState(project.banner);
    const [imageUrl, setImageUrl] = useState(project.image);
    const isFile = input => 'File' in window && input instanceof File;

    useEffect(() => {
        if (isFile(banner)) setBannerUrl(URL.createObjectURL(banner))
    }, [banner])

    useEffect(() => {
        if (isFile(image)) setImageUrl(URL.createObjectURL(image))
    }, [image])

    useEffect(() => {
        setTimeout(() => {
            setVisibleEditProjectModal(true)
        }, 600)
    })

    const updateProjectInfo = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("slug", project.slug);
            formData.append("description", projectDescription);
            formData.append("whitepaper", whitepaper);
            formData.append("website", website);
            if (isFile(banner)) formData.append("banner", banner);
            if (isFile(image)) formData.append("image", image);
            formData.append("social_linkedin", linkedIn);
            formData.append("social_github", github);
            formData.append("social_facebook", facebook);
            formData.append("social_twitter", twitter);
            formData.append("social_telegram", telegram);
            formData.append("social_discord", discord);
            formData.append("social_medium", medium);
            formData.append("user_address", wallet.account);
            await helpers.project.updateProjectInformation(formData, project.slug, wallet);
            setIsLoading(false);
        } catch(e) {
            setIsLoading(false);
        }
    }

    return (
        <>
            {visibleEditProjectModal && 
                <Modal title="Edit Project Information" open={openEditProject}
                    handleClose={() => setOpenEditProject(false)}>
                    <div className="card-content grid lg:grid-cols-2 gap-3.75">
                        {/* left */}
                        <div className="w-full flex flex-col space-y-3.75">
                            {/* Project name */}
                            <div className="w-full space-y-3.5">
                                <span className="text-base">Website</span>
                                <InputEmpty
                                    id="website"
                                    name="website"
                                    type="text"
                                    placeholder={'Project URL'}
                                    value={website}
                                    icon="fa-solid fa-globe"
                                    setValue={setWebsite}
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col grow space-y-3.75">
                                <h1 className="text-base">Description</h1>
                                <RichEditor value={projectDescription} setValue={setProjectDescription}/>

                            </div>
                        </div>
                        <div className="w-full space-y-3.75">
                            <div className="flex gap-2.5">
                                <div className="flex flex-col gap-3.75">
                                    <span className="text-base">Whitepaper</span>
                                    <InputEmpty
                                        id="whitepaper"
                                        name="whitepaper"
                                        type="text"
                                        placeholder={'Whitepaper URL'}
                                        value={whitepaper}
                                        icon="fa-solid fa-file-code"
                                        setValue={setWhitepaper}
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-3.75">
                                    <span className="text-base">Audit</span>
                                    <InputEmpty
                                        id="audit"
                                        name="audit"
                                        type="text"
                                        placeholder={'Audit URL'}
                                        value={audit}
                                        icon="fa-solid fa-check-double"
                                        setValue={setAudit}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-3.75">
                                <span className="text-base">Socials</span>
                                <div>
                                    <InputEmpty
                                        id="facebook"
                                        name="facebook"
                                        type="text"
                                        placeholder={'Facebook'}
                                        value={facebook}
                                        icon="fa-brands fa-facebook-f"
                                        setValue={setFacebook}
                                    />
                                </div>
                                <div>
                                    <InputEmpty
                                        id="linkedin"
                                        name="linkedin"
                                        type="text"
                                        placeholder={'LinkedIn'}
                                        value={linkedIn}
                                        icon="fa-brands fa-linkedin"
                                        setValue={setLinkedIn}
                                    />
                                </div>
                                <div>
                                    <InputEmpty
                                        id="github"
                                        name="github"
                                        type="text"
                                        placeholder={'GitHub'}
                                        value={github}
                                        icon="fa-brands fa-github"
                                        setValue={setGithub}
                                    />
                                </div>
                                <div>
                                    <InputEmpty
                                        id="telegram"
                                        name="telegram"
                                        type="text"
                                        placeholder={'Telegram'}
                                        value={telegram}
                                        icon="fa-brands fa-telegram"
                                        setValue={setTelegram}
                                    />
                                </div>
                                <div>
                                    <InputEmpty
                                        id="discord"
                                        name="discord"
                                        type="text"
                                        placeholder={'Discord'}
                                        value={discord}
                                        icon="fa-brands fa-discord"
                                        setValue={setDiscord}
                                    />
                                </div>
                                <div>
                                    <InputEmpty
                                        id="medium"
                                        name="medium"
                                        type="text"
                                        placeholder={'Medium'}
                                        value={medium}
                                        icon="fa-brands fa-medium"
                                        setValue={setMedium}
                                    />
                                </div>
                                <div>
                                    <InputEmpty
                                        id="twitter"
                                        name="twitter"
                                        type="text"
                                        placeholder={'Twitter'}
                                        value={twitter}
                                        icon="fa-brands fa-twitter"
                                        setValue={setTwitter}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="w-full mt-3.75 space-y-3.75">
                        <div className="w-full gap-2.5 grid grid-cols-2">
                            <FileInput id="bannerImage" image={bannerUrl} label="Replace Banner Image" setValue={setBanner} type={"image/*"}/>
                            <FileInput id="tokenImage" image={imageUrl} label="Replace Token Image" setValue={setImage} type={"image/*"}/>
                        </div>

                        <Button
                            isLoading={isLoading}
                            disabled={isLoading}
                            name="Update Information"
                            handleClick={updateProjectInfo}
                        />
                    </div>
                </Modal>
            }
            <div className="grid grid-cols-1 md-lg:grid-cols-3 gap-5">
                <HomeCard 
                    icon={<i className="fa-solid fa-money-check-pen text-2xl text-indigo-500"></i>} 
                    title="Edit Information" 
                    content="Step-by-step guides to setting up your system and installing the library."
                    handleClick={() => setOpenEditProject(true)}
                />

                <HomeCard 
                    icon={<i className="fa-solid fa-pen-paintbrush text-2xl text-indigo-500"></i>} 
                    title="Edit Articles" 
                    content="Step-by-step guides to setting up your system and installing the library."
                    handleClick={(e) => { router.push(`${project.slug}/news`) }}
                />

                <HomeCard 
                    icon={<i className="fa-solid fa-comments-question-check text-2xl text-indigo-500"></i>} 
                    title="Contact Support" 
                    content="Step-by-step guides to setting up your system and installing the library."
                />

                <div className="col-span-1 md-lg:col-span-3 grid grid-cols-1 md-lg:grid-cols-2 gap-5">
                    <HomeCard 
                        icon={<i className="fa-solid fa-message-pen text-2xl text-indigo-500"></i>} 
                        title="Send Message" 
                        content="Step-by-step guides to setting up your system and installing the library."
                        handleClick={(e) => { router.push(`${project.slug}/message`) }}
                    />

                    <HomeCard 
                        icon={<i className="fa-solid fa-messages text-2xl text-indigo-500"></i>} 
                        title="Message History" 
                        content="Step-by-step guides to setting up your system and installing the library."
                        handleClick={(e) => { router.push(`${project.slug}/message/history`) }}
                    />
                </div>
            </div>
        </>
    )
}