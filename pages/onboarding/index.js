import * as React from "react";
import Image from "next/image";

// core components
import InputEmpty from "../../src/components/core/Input/InputEmpty";
import Select from "../../src/components/core/Select/Select";
import TextArea from "../../src/components/core/TextArea/TextArea";

// step components
import Step from "../../src/components/pages/Linked/Step";
import ImageDropdown from "../../src/components/pages/Linked/ImageDropdown";
import SocialItem from "../../src/components/pages/Linked/SocialItem";

// social icons without background
import {
    socialFacebookWithOutBG,
    socialTwitterWithOutBG,
    socialLinkedInWithOutBG,
    socialTelegramWithOutBG,
} from "../../src/components/SVG";

import Button from "../../src/components/core/Button/Button";
import helpers from "../../src/helpers";
import axios from "axios";
import {API_URL} from "../../src/helpers/constants";
import {useWallet} from "use-wallet";

const SOCIALDATA = [
    {name: "LinkedIn", value: "social_linkedin", "icon": socialLinkedInWithOutBG, "color": "bg-indigo-400"},
    {name: "Facebook", value: "social_facebook", "icon": socialFacebookWithOutBG, "color": "bg-indigo-400"},
    {name: "Github", value: "social_github", "icon": socialLinkedInWithOutBG, "color": "bg-indigo-400"},
    {name: "Telegram", value: "social_telegram", "icon": socialTelegramWithOutBG, "color": "bg-sky-400"},
    {name: "Discord", value: "social_discord", "icon": socialLinkedInWithOutBG, "color": "bg-indigo-400"},
    {name: "Medium", value: "social_medium", "icon": socialLinkedInWithOutBG, "color": "bg-indigo-400"},
    {name: "Twitter", value: "social_twitter", "icon": socialTwitterWithOutBG, "color": "bg-sky-400"},
]

export default function Linked(props) {
    const wallet = useWallet();

    const [step, setStep] = React.useState(1);
    const [projectName, setProjectName] = React.useState("");
    const [website, setWebsite] = React.useState("");
    const [whitepaper, setWhitepaper] = React.useState("");
    const [audit, setAudit] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [tokenTicker, setTokenTicker] = React.useState("");
    const [tokenAddress, setTokenAddress] = React.useState("");
    const [socials, setSocials] = React.useState([]);
    const [socialIndex, setSocialIndex] = React.useState(0);
    const [companyName, setCompanyName] = React.useState("");
    const [streetAddress, setStreetAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [companyState, setCompanyState] = React.useState("");
    const [postalCode, setPostalCode] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [telegram, setTelegram] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [image, setImage] = React.useState("");
    const [banner, setBanner] = React.useState("");

    const postProject = async (event) => {

        event.preventDefault()
        const signature = await helpers.web3.authentication.getSignature(wallet);

        const formData = new FormData();
        formData.append("signature", signature);
        formData.append("name", projectName);
        formData.append("slug", helpers.formatting.slugify(projectName));
        formData.append("owner", wallet.account);
        formData.append("token", tokenAddress);
        formData.append("ticker", tokenTicker);
        formData.append("description", description);
        formData.append("website", website);
        formData.append("whitepaper", whitepaper);
        formData.append("audit", audit);
        formData.append("image", image);
        formData.append("banner", banner);
        formData.append("contact_name", firstName + ' ' + lastName);
        formData.append("contact_email", email);
        formData.append("contact_phone", phoneNumber);
        formData.append("contact_telegram", telegram);
        formData.append("contact_company", companyName);
        formData.append("contact_street", streetAddress);
        formData.append("contact_city", city);
        formData.append("contact_state", companyState);
        formData.append("contact_postal", postalCode);
        formData.append("contact_country", country);
        socials.map(e => formData.append(e.value, e.URL))

        try {
            const response = await axios({
                method: "post",
                url: `${API_URL}Project/`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            });

        } catch (error) {
            console.log(error)
        }
    }

    const addSocial = async () => {
        if (socials.some(e => e.name === SOCIALDATA[socialIndex].name)) return
        let value = SOCIALDATA[socialIndex]
        value["URL"] = url
        let newArray = [...socials, value];
        setSocials(newArray)
        setUrl("")
    };

    const removeSocial = async (name) => {
        let array = []
        for (var i = 0; i < socials.length; i++) {
            if (socials[i].name !== name) {
                array.push(socials[i])
            }
        }
        setSocials(array)
    };

    return (
        <div className="flex flex-row w-full min-h-[80vh] md-lg:h-[85vh] bg-white rounded-3xl">
            {/* Background */}
            <div className="hidden md-lg:block md-lg:relative md-lg:w-1/2 md-lg:h-full">
                <div className="absolute w-full h-full">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100% 100%"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22.8714 0C7.5 0 0 8.5 0 23.8714V418.283H2.45327V193.416C2.45327 87.9498 87.9498 2.45327 193.416 2.45327L559.792 2.00719L559.346 0L22.8714 0Z"
                            fill="#E6E6E6"
                        />
                    </svg>
                </div>
                <img src="/linked/bg.svg" style={{height: "100%"}}/>
                <div className="absolute bottom-0 flex justify-center w-full">
                    <svg
                        width="90%"
                        height="3"
                        viewBox="0 0 90% 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.689453 1.57147C0.689453 2.36372 1.32567 2.99987 2.11792 2.99987H486.2C486.993 2.99987 487.629 2.36372 487.629 1.57147C487.629 0.779282 486.993 0.143066 486.2 0.143066H2.11792C1.32567 0.143066 0.689453 0.779282 0.689453 1.57147Z"
                            fill="#CCCCCC"
                        />
                    </svg>
                </div>
            </div>
            {/* Step */}
            <div className="flex flex-col w-full md-lg:w-1/2 px-6.25 py-7.5">
                {/* Step header */}
                <h1 className="text-2xl mb-10">Create a New Project</h1>
                {/* Step 1 */}
                {step == 1 && (
                    <Step title="Create Your Project" step={step} setStep={setStep}>
                        <div className="flex flex-col space-y-6.25">

                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Project Name</h1>
                                <InputEmpty
                                    id="projectName"
                                    name="projectName"
                                    type="text"
                                    placeholder="Enter Your Project Name"
                                    value={projectName}
                                    setValue={setProjectName}
                                />
                            </div>
                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Token Ticker</h1>
                                <InputEmpty
                                    id="tokenTicker"
                                    name="tokenTicker"
                                    placeholder="Token Ticker"
                                    value={tokenTicker}
                                    setValue={setTokenTicker}
                                />
                            </div>
                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Token Address</h1>
                                <InputEmpty
                                    id="tokenAddress"
                                    name="tokenAddress"
                                    placeholder="Token Address"
                                    value={tokenAddress}
                                    setValue={setTokenAddress}
                                />
                            </div>
                        </div>
                    </Step>
                )}
                {/* Step 2 */}
                {step == 2 && (
                    <Step title="Create Your Project" step={step} setStep={setStep}>
                        <div className="flex flex-col space-y-6.25">
                            <div className="grid md-lg:grid-cols-2 gap-5">
                                <ImageDropdown label="Token Image" setValue={setImage}/>
                                <ImageDropdown label="Banner Image" setValue={setBanner}/>
                            </div>
                        </div>
                    </Step>
                )}
                {/* Step 3 */}
                {step == 3 && (
                    <Step
                        title="Add Your Project Information"
                        step={step}
                        setStep={setStep}
                    >
                        <div className="flex flex-col space-y-6.25">
                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Website</h1>
                                <InputEmpty
                                    id="website"
                                    name="website"
                                    placeholder="Enter Your Website"
                                    value={website}
                                    setValue={setWebsite}
                                />
                            </div>
                            <div className="grid md-lg:grid-cols-2 gap-5">
                                <div className="flex flex-col space-y-3.75">
                                    <h1 className="text-xl">Whitepaper</h1>
                                    <InputEmpty
                                        id="Whitepager"
                                        name="Whitepager"
                                        placeholder="Whitepager"
                                        value={whitepaper}
                                        setValue={setWhitepaper}
                                    />
                                </div>
                                <div className="flex flex-col space-y-3.75">
                                    <h1 className="text-xl">Audit</h1>
                                    <InputEmpty
                                        id="Audit"
                                        name="Audit"
                                        placeholder="Audit"
                                        value={audit}
                                        setValue={setAudit}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Description</h1>
                                <TextArea
                                    id="description"
                                    name="description"
                                    placeholder="Type here"
                                    value={description}
                                    setValue={setDescription}
                                />
                            </div>
                        </div>
                    </Step>
                )}
                {step == 4 && (
                    <Step
                        title="Add Your Social Information"
                        step={step}
                        setStep={setStep}
                    >
                        <div className="flex flex-col space-y-6.25">
                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Add Social Information</h1>
                                <Select
                                    id="socialName"
                                    name="socialName"
                                    placeholder="Social Name"
                                    options={SOCIALDATA}
                                    setValue={setSocialIndex}
                                />
                                <InputEmpty
                                    id="URL"
                                    name="URL"
                                    placeholder="URL"
                                    value={url}
                                    setValue={setUrl}
                                />
                                <Button
                                    name="Add"
                                    handleClick={addSocial}
                                />
                            </div>
                            <div className="flex flex-row gap-3.75">
                                {socials.map(social =>
                                    <SocialItem
                                        icon={social.icon}
                                        bgColor={social.color}
                                        key={social.name}
                                        name={social.name}
                                        deleteValue={removeSocial}
                                    />)}
                            </div>
                        </div>
                    </Step>
                )}
                {step == 5 && (
                    <Step
                        title="Add Contact Information"
                        step={step}
                        setStep={setStep}
                    >
                        <div className="flex flex-col space-y-6.25">

                            <div className="grid md-lg:grid-cols-2 gap-5">
                                <div className="flex flex-col space-y-3.75">
                                    <h1 className="text-xl">First Name</h1>
                                    <InputEmpty
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={firstName}
                                        setValue={setFirstName}
                                    />
                                </div>
                                <div className="flex flex-col space-y-3.75">
                                    <h1 className="text-xl">Last Name</h1>
                                    <InputEmpty
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={lastName}
                                        setValue={setLastName}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Email</h1>
                                <InputEmpty
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    setValue={setEmail}
                                />
                            </div>

                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Phone Number</h1>
                                <InputEmpty
                                    id="website"
                                    name="website"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    setValue={setPhoneNumber}
                                />
                            </div>

                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Telegram</h1>
                                <InputEmpty
                                    id="telegram"
                                    name="telegram"
                                    placeholder="Telegram"
                                    value={telegram}
                                    setValue={setTelegram}
                                />
                            </div>

                        </div>
                    </Step>
                )}
                {step == 6 && (
                    <Step
                        title="Add Company Information"
                        step={step}
                        setStep={setStep}
                        handleClick={postProject}
                    >
                        <div className="flex flex-col space-y-6.25">
                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Company Name</h1>
                                <InputEmpty
                                    id="companyName"
                                    name="companyName"
                                    placeholder="Company Name"
                                    value={companyName}
                                    setValue={setCompanyName}
                                />
                            </div>
                            <div className="flex flex-col space-y-3.75">
                                <h1 className="text-xl">Street Address</h1>
                                <InputEmpty
                                    id="streetAddress"
                                    name="streetAddress"
                                    placeholder="Street Address"
                                    value={streetAddress}
                                    setValue={setStreetAddress}
                                />
                            </div>

                            <div className="grid md-lg:grid-cols-2 gap-5">
                                <div className="flex flex-col space-y-3.75">
                                    <h1 className="text-xl">City</h1>
                                    <InputEmpty
                                        id="city"
                                        name="city"
                                        placeholder="City"
                                        value={city}
                                        setValue={setCity}
                                    />
                                </div>
                                <div className="flex flex-col space-y-3.75">
                                    <h1 className="text-xl">State</h1>
                                    <InputEmpty
                                        id="State"
                                        name="State"
                                        placeholder="State"
                                        value={companyState}
                                        setValue={setCompanyState}
                                    />
                                </div>
                            </div>


                            <div className="grid md-lg:grid-cols-2 gap-5">
                                <div className="flex flex-col space-y-3.75">
                                    <h1 className="text-xl">Postal Code</h1>
                                    <InputEmpty
                                        id="postalCode"
                                        name="postalCode"
                                        placeholder="Postal Code"
                                        value={postalCode}
                                        setValue={setPostalCode}
                                    />
                                </div>
                                <div className="flex flex-col space-y-3.75">
                                    <h1 className="text-xl">Country</h1>
                                    <InputEmpty
                                        id="country"
                                        name="country"
                                        placeholder="Country"
                                        value={country}
                                        setValue={setCountry}
                                    />
                                </div>
                            </div>
                        </div>
                    </Step>
                )}
            </div>
        </div>
    );
}
