import Button from "../../core/Button/Button";
import {useWallet} from "use-wallet";
import Card from "../projectDetail/Card/Card";
import {useEffect, useState,useCallback} from "react";
import InputWithIcon from "../../core/Input/InputWithIcon";
import Modal from "../../core/modal/Modal";
import InputEmpty from "../../core/Input/InputEmpty";
import TextArea from "../../core/TextArea/TextArea";
import Select from "../../core/Select/Select";
import SocialItem from "../Linked/SocialItem";
import {socialFacebookWithOutBG, socialLinkedWithOutBG, socialTelegramWithOutBG, socialTwitterWithOutBG} from "../../SVG";
import {useRouter} from "next/router";
import FileInput from "../Linked/fileInput";
import helpers from "../../../helpers";

export default function ManageProjectCard({project}) {

    const wallet = useWallet();
    const router = useRouter();
    const [openEditProject, setOpenEditProject] = useState(false);
    const [projectDescription,setProjectDescription] = useState(project.description);
    const [whitepaper,setWhitepaper] = useState(project.whitepaper);
    const [audit, setAudit] = useState(project.audit);
    const [banner,setBanner] = useState(project.banner);
    const [image,setImage] = useState(project.image);
    const [linkedIn,setLinkedIn] = useState(project.social_linkedin);
    const [facebook,setFacebook] = useState(project.social_facebook);
    const [github,setGithub] = useState(project.social_github);
    const [telegram,setTelegram] = useState(project.social_telegram);
    const [discord,setDiscord] = useState(project.social_discord);
    const [medium,setMedium] = useState(project.social_medium);
    const [twitter,setTwitter] = useState(project.social_twitter);
    const [bannerUrl,setBannerUrl] = useState(project.banner);
    const [imageUrl, setImageUrl] = useState(project.image);
    const isFile = input => 'File' in window && input instanceof File;

    useEffect(() => {
        if (isFile(banner)) setBannerUrl(URL.createObjectURL(banner))
    },[banner])

    useEffect(() => {
       if(isFile(image)) setImageUrl(URL.createObjectURL(image))
    },[image])
    console.log(project)

    const updateProjectInfo = async() => {
        const formData = new FormData();
        formData.append("slug", project.slug);
        formData.append("description", projectDescription);
        formData.append("whitepaper", whitepaper);
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


        await helpers.project.updateProjectInformation(formData,project.slug,wallet);
    }

    return (

        <Card className={'col-span-2'}>
            <Modal title="Edit Project Information" open={openEditProject} handleClose={() => setOpenEditProject(false)}>
                <div className="card-content grid grid-cols-1 md-lg:grid-cols-2 gap-3.75">
                    {/* left */}
                    <div className="w-full space-y-3.75">
                        {/* Project name */}
                        <div className="w-full space-y-2.5">
                            <span className="text-base">Project Name</span>
                            <InputEmpty
                                id="projectName"
                                name="projectName"
                                type="text"
                                value={project.name}
                                readOnly={true}
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col space-y-3.75">
                            <h1 className="text-base">Description</h1>
                            <TextArea
                                id="description"
                                name="description"
                                setValue={setProjectDescription}
                                value={projectDescription}
                            />
                        </div>

                    </div>
                    <div className="w-full space-y-3.75">
                        <div className="w-full  gap-2.5 grid grid-cols-2 grid-row-5">
                            <div className={'col-span-2'}>
                                <span className="text-base">Technical Links</span>
                            </div>
                            <div className={'col-span-1'}>
                                <InputEmpty
                                    id="whitepaper"
                                    name="whitepaper"
                                    type="text"
                                    placeholder={'Whitepaper URL'}
                                    value={whitepaper}
                                    setValue={setWhitepaper}
                                />
                            </div>
                            <div className={'col-span-1'}>
                                <InputEmpty
                                    id="audit"
                                    name="audit"
                                    type="text"
                                    placeholder={'Audit URL'}
                                    value={audit}
                                    setValue={setAudit}
                                />
                            </div>
                        </div>
                        <div className="w-full  gap-2.5 grid grid-cols-2 grid-row-5">
                            <div className={'col-span-2'}>
                                <span className="text-base">Socials</span>
                            </div>
                            <div className={'col-span-1'}>
                                <InputEmpty
                                    id="facebook"
                                    name="facebook"
                                    type="text"
                                    placeholder={'Facebook'}
                                    value={facebook}
                                    setValue={setFacebook}
                                />
                            </div>
                            <div className={'col-span-1'}>
                                <InputEmpty
                                    id="linkedin"
                                    name="linkedin"
                                    type="text"
                                    placeholder={'LinkedIn'}
                                    value={linkedIn}
                                    setValue={setLinkedIn}
                                />
                            </div>
                            <div className={'col-span-1'}>
                                <InputEmpty
                                    id="github"
                                    name="github"
                                    type="text"
                                    placeholder={'GitHub'}

                                    value={github}
                                    setValue={setGithub}
                                />
                            </div>
                            <div className={'col-span-1'}>
                                <InputEmpty
                                    id="telegram"
                                    name="telegram"
                                    type="text"
                                    placeholder={'Telegram'}
                                    value={telegram}
                                    setValue={setTelegram}
                                />
                            </div>
                            <div className={'col-span-1'}>
                                <InputEmpty
                                    id="discord"
                                    name="discord"
                                    type="text"
                                    placeholder={'Discord'}
                                    value={discord}
                                    setValue={setDiscord}
                                />
                            </div>
                            <div className={'col-span-1'}>
                                <InputEmpty
                                    id="medium"
                                    name="medium"
                                    type="text"
                                    placeholder={'Medium'}
                                    value={medium}
                                    setValue={setMedium}
                                />
                            </div>
                            <div className={'col-span-1'}>
                                <InputEmpty
                                    id="twitter"
                                    name="twitter"
                                    type="text"
                                    placeholder={'Twitter'}
                                    value={twitter}
                                    setValue={setTwitter}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="w-full space-y-3.75 col-span-2">
                        <div className="w-full  gap-2.5 grid grid-cols-2">
                            <div className={'col-span-1 w-full grid grid-cols-2'}>
                                <div>
                                    <span className="text-base">Banner</span>
                                    <img src={bannerUrl} className={'w-[300px] h-[300px] mx-auto object-contain object-center'} />
                                </div>
                                <FileInput label="Replace Banner Image" setValue={setBanner} type={"image/*"}/>

                                    </div>
                            <div className={'col-span-1 w-full grid grid-cols-2'}>
                                <div>
                                    <span className="text-base">Token Image</span>
                                    <img src={imageUrl} className={'w-[300px] h-[300px] mx-auto object-contain object-center'}/>
                                </div>
                                <FileInput label="Replace Token Image" setValue={setImage} type={"image/*"}/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full space-y-3.75 col-span-2">
                        <div className="w-full  gap-2.5 grid grid-cols-2">
                            <Button
                                name="Update Information"
                                handleClick={updateProjectInfo}
                            />
                    </div>
                    </div>
                </div>
            </Modal>
            <div className="card-header mb-5">
                <h1 className="text-2xl text-center">Manage Project</h1>
            </div>
            <div className="w-full space-x-3.75 grid grid-cols-2">
                {/* Edit Button */}
                <Button
                    name="Edit Information"
                    handleClick={() => setOpenEditProject(true)}
                />
                <Button name="Edit Articles" handleClick={(e) => {
                    router.push(`${project.slug}/news`)
                }}/>
            </div>
        </Card>
    )
}