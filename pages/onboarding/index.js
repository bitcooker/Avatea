import * as React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import useLocalStorage from "use-local-storage";
import ReactFlagsSelect from "react-flags-select";

// core components
import InputEmpty from "../../src/components/core/Input/InputEmpty";
import Select from "../../src/components/core/Select/Select";
import TextArea from "../../src/components/core/TextArea/TextArea";

// step components
import Step from "../../src/components/pages/Linked/Step";
import FileInput from "../../src/components/pages/Linked/fileInput";
import SocialItem from "../../src/components/pages/Linked/SocialItem";

import Button from "../../src/components/core/Button/Button";
import helpers from "../../src/helpers";
import axios from "axios";
import { API_URL } from "../../src/helpers/constants";
import { useWallet } from "use-wallet";
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import NoSsr from "../../src/components/NoSsr";

const SOCIALDATA = [
  {
    name: "LinkedIn",
    value: "social_linkedin",
    icon: "linkedin",
    color: "bg-indigo-400",
  },
  {
    name: "Facebook",
    value: "social_facebook",
    icon: "facebook",
    color: "bg-indigo-400",
  },
  {
    name: "Github",
    value: "social_github",
    icon: "github",
    color: "bg-indigo-400",
  },
  {
    name: "Telegram",
    value: "social_telegram",
    icon: "telegram",
    color: "bg-sky-400",
  },
  {
    name: "Discord",
    value: "social_discord",
    icon: "discord",
    color: "bg-indigo-400",
  },
  {
    name: "Medium",
    value: "social_medium",
    icon: "medium",
    color: "bg-indigo-400",
  },
  {
    name: "Twitter",
    value: "social_twitter",
    icon: "twitter",
    color: "bg-sky-400",
  },
];

export default function Linked(props) {
  const wallet = useWallet();
  const router = useRouter();

  const [step, setStep] = React.useState(1);
  const [projectName, setProjectName] = useLocalStorage("projectName", "");
  const [website, setWebsite] = useLocalStorage("website", "");
  const [whitepaper, setWhitepaper] = useLocalStorage("whitepaper", "");
  const [audit, setAudit] = useLocalStorage("audit", "");
  const [description, setDescription] = useLocalStorage("description", "");
  const [tokenTicker, setTokenTicker] = useLocalStorage("tokenTicker", "");
  const [tokenAddress, setTokenAddress] = useLocalStorage("tokenAddress", "");
  const [socials, setSocials] = useLocalStorage("socials", []);
  const [socialIndex, setSocialIndex] = useLocalStorage("socialIndex", 0);
  const [companyName, setCompanyName] = useLocalStorage("companyName", "");
  const [streetAddress, setStreetAddress] = useLocalStorage(
    "streetAddress",
    ""
  );
  const [city, setCity] = useLocalStorage("city", "");
  const [companyState, setCompanyState] = useLocalStorage("companyState", "");
  const [postalCode, setPostalCode] = useLocalStorage("postalCode", "");
  const [country, setCountry] = React.useState("");
  const [firstName, setFirstName] = useLocalStorage("firstName", "");
  const [lastName, setLastName] = useLocalStorage("lastName", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [phoneNumber, setPhoneNumber] = useLocalStorage("phoneNumber", "");
  const [telegram, setTelegram] = useLocalStorage("telegram", "");
  const [url, setUrl] = useLocalStorage("url", "");
  const [image, setImage] = React.useState("");
  const [banner, setBanner] = React.useState("");
  const [validationClass, setValidationClass] = useState({
    projectName: false,
    tokenTicker: false,
    tokenAddress: false,
    website: false,
    audit: false,
    whitepaper: false,
    description: false,
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    companyName: false,
    streetAddress: false,
    city: false,
    postalCode: false,
    country: false,
    companyState: false,
  });

  const postProject = async () => {
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
    formData.append("contact_name", firstName + " " + lastName);
    formData.append("contact_email", email);
    formData.append("contact_phone", phoneNumber);
    formData.append("contact_telegram", telegram);
    formData.append("contact_company", companyName);
    formData.append("contact_street", streetAddress);
    formData.append("contact_city", city);
    formData.append("contact_state", companyState);
    formData.append("contact_postal", postalCode);
    formData.append("contact_country", country);
    socials.map((e) => formData.append(e.value, e.URL));

    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}Project/`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Your project has been created",
          showConfirmButton: false,
          timer: 3000,
          didClose() {
            router.push(`/management/${response.data.slug}`);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationHelper = useCallback((key, bool) => {
    setValidationClass((prevState) => ({
      ...prevState,
      [key]: bool,
    }));
  }, []);

  const validateFirstStep = useCallback(() => {
    let valueInvalid = false;

    if (!projectName) {
      validationHelper("projectName", true);
      valueInvalid = true;
    } else {
      validationHelper("projectName", false);
    }

    if (!tokenTicker) {
      validationHelper("tokenTicker", true);
      valueInvalid = true;
    } else {
      validationHelper("tokenTicker", false);
    }

    if (!tokenAddress || ethers.utils.isAddress(tokenAddress) === false) {
      validationHelper("tokenAddress", true);
      valueInvalid = true;
    } else {
      validationHelper("tokenAddress", false);
    }

    return valueInvalid;
  }, [projectName, tokenAddress, tokenTicker]);

  const validateSecondStep = useCallback(() => {
    if (!banner || !image) {
      toast.error(`The token image and banner image are both required.`);
      return true;
    }
  }, [banner, image]);

  const validateThirdStep = useCallback(() => {
    let valueInvalid = false;
    if (website) {
      if (!helpers.validator.validateUrl(website)) {
        validationHelper("website", true);
        valueInvalid = true;
      } else {
        validationHelper("website", false);
      }
    } else {
      validationHelper("website", true);
      valueInvalid = true;
    }

    if (whitepaper) {
      if (!helpers.validator.validateUrl(whitepaper)) {
        validationHelper("whitepaper", true);
        valueInvalid = true;
      } else {
        validationHelper("whitepaper", false);
      }
    } else {
      validationHelper("whitepaper", false);
    }

    if (audit) {
      if (!helpers.validator.validateUrl(audit)) {
        validationHelper("audit", true);
        valueInvalid = true;
      } else {
        validationHelper("audit", false);
      }
    } else {
      validationHelper("audit", false);
    }

    if (!description) {
      validationHelper("description", true);
      valueInvalid = true;
    } else {
      validationHelper("description", false);
    }

    return valueInvalid;
  }, [description, website, whitepaper, audit]);

  const validateFifthStep = useCallback(() => {
    let valueInvalid = false;

    if (!firstName) {
      validationHelper("firstName", true);
      valueInvalid = true;
    } else {
      validationHelper("firstName", false);
    }

    if (!lastName) {
      validationHelper("lastName", true);
      valueInvalid = true;
    } else {
      validationHelper("lastName", false);
    }

    if (!email || !helpers.validator.validateEmail(email)) {
      validationHelper("email", true);
      valueInvalid = true;
    } else {
      validationHelper("email", false);
    }

    if (!phoneNumber || !helpers.validator.validatePhoneNumber(phoneNumber)) {
      validationHelper("phoneNumber", true);
      valueInvalid = true;
    } else {
      validationHelper("phoneNumber", false);
    }

    return valueInvalid;
  }, [firstName, lastName, email, phoneNumber, telegram]);

  const validateSixthStep = useCallback(() => {
    let valueInvalid = false;

    if (!companyName) {
      validationHelper("companyName", true);
      valueInvalid = true;
    } else {
      validationHelper("companyName", false);
    }

    if (!companyState) {
      validationHelper("companyState", true);
      valueInvalid = true;
    } else {
      validationHelper("companyState", false);
    }

    if (!streetAddress) {
      validationHelper("streetAddress", true);
      valueInvalid = true;
    } else {
      validationHelper("streetAddress", false);
    }

    if (!city) {
      validationHelper("city", true);
      valueInvalid = true;
    } else {
      validationHelper("city", false);
    }

    if (!postalCode) {
      validationHelper("postalCode", true);
      valueInvalid = true;
    } else {
      validationHelper("postalCode", false);
    }

    if (!country) {
      validationHelper("country", true);
      valueInvalid = true;
    } else {
      validationHelper("country", false);
    }

    return valueInvalid;
  }, [companyName, streetAddress, city, postalCode, country, companyState]);

  const addSocial = useCallback(() => {
    if (socials.some((e) => e.name === SOCIALDATA[socialIndex].name)) return;
    let value = SOCIALDATA[socialIndex];
    value["URL"] = url;
    if (!helpers.validator.validateUrl(url)) {
      toast.error(
        `Enter a valid URL that starts with https:// for your ${SOCIALDATA[socialIndex]["name"]} profile`
      );
      return;
    }
    let newArray = [...socials, value];
    setSocials(newArray);
    setUrl("");
  }, [socials, url]);

  const removeSocial = useCallback(
    (name) => {
      let array = [];
      for (var i = 0; i < socials.length; i++) {
        if (socials[i].name !== name) {
          array.push(socials[i]);
        }
      }
      setSocials(array);
    },
    [socials]
  );

  return (
    <NoSsr>
      <div className="flex flex-row w-full min-h-[80vh] md-lg:min-h-[85vh] bg-white rounded-3xl">
        {/* Background */}
        <div className="hidden md-lg:block md-lg:relative md-lg:w-1/2 md-lg:grow">
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
          <img src="/linked/bg.svg" className="h-[85vh]" />
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
            <Step
              validateStep={validateFirstStep}
              title="Create Your Project"
              step={step}
              setStep={setStep}
            >
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
                    classNames={
                      validationClass.projectName
                        ? "border-2 border-red-600"
                        : ""
                    }
                  />
                  {validationClass.projectName ? (
                    <small className={"text-red-600"}>
                      Project Name is required.
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3.75">
                  <h1 className="text-xl">Token Ticker</h1>
                  <InputEmpty
                    id="tokenTicker"
                    name="tokenTicker"
                    placeholder="Token Ticker"
                    value={tokenTicker}
                    setValue={setTokenTicker}
                    classNames={
                      validationClass.tokenTicker
                        ? "border-2 border-red-600"
                        : ""
                    }
                  />
                  {validationClass.tokenTicker ? (
                    <small className={"text-red-600"}>
                      Token Ticker is required.
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3.75">
                  <h1 className="text-xl">Token Address</h1>
                  <InputEmpty
                    id="tokenAddress"
                    name="tokenAddress"
                    placeholder="Token Address"
                    value={tokenAddress}
                    classNames={
                      validationClass.tokenAddress
                        ? "border-2 border-red-600"
                        : ""
                    }
                    setValue={setTokenAddress}
                  />
                  {validationClass.tokenAddress ? (
                    <small className={"text-red-600"}>
                      Enter a valid token address.
                    </small>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Step>
          )}
          {/* Step 2 */}
          {step == 2 && (
            <Step
              validateStep={validateSecondStep}
              title="Create Your Project"
              step={step}
              setStep={setStep}
            >
              <div className="flex flex-col space-y-6.25">
                <div className="grid md-lg:grid-cols-2 gap-5">
                  <FileInput label="Token Image" setValue={setImage} type={"image/*"} />
                  <FileInput label="Banner Image" setValue={setBanner} type={"image/*"}  />
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
              validateStep={validateThirdStep}
            >
              <div className="flex flex-col space-y-6.25">
                <div className="flex flex-col space-y-3.75">
                  <h1 className="text-xl">Website</h1>
                  <InputEmpty
                    id="website"
                    name="website"
                    placeholder="Enter Your Website"
                    value={website}
                    classNames={
                      validationClass.website ? "border-2 border-red-600" : ""
                    }
                    setValue={setWebsite}
                  />
                </div>
                {validationClass.website ? (
                  <small className={"text-red-600"}>
                    Enter a valid URL starting with https://.
                  </small>
                ) : (
                  ""
                )}
                <div className="grid md-lg:grid-cols-2 gap-5">
                  <div className="flex flex-col space-y-3.75">
                    <h1 className="text-xl">Whitepaper</h1>
                    <InputEmpty
                      id="Whitepager"
                      name="Whitepager"
                      placeholder="Whitepager"
                      value={whitepaper}
                      classNames={
                        validationClass.whitepaper
                          ? "border-2 border-red-600"
                          : ""
                      }
                      setValue={setWhitepaper}
                    />
                  </div>
                  {validationClass.whitepaper ? (
                    <small className={"text-red-600"}>
                      Enter a valid URL starting with https://.
                    </small>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col space-y-3.75">
                    <h1 className="text-xl">Audit</h1>
                    <InputEmpty
                      id="Audit"
                      name="Audit"
                      placeholder="Audit"
                      value={audit}
                      classNames={
                        validationClass.audit ? "border-2 border-red-600" : ""
                      }
                      setValue={setAudit}
                    />
                  </div>
                </div>
                {validationClass.audit ? (
                  <small className={"text-red-600"}>
                    Enter a valid URL starting with https://.
                  </small>
                ) : (
                  ""
                )}
                <div className="flex flex-col space-y-3.75">
                  <h1 className="text-xl">Description</h1>
                  <TextArea
                    id="description"
                    name="description"
                    placeholder="Type here"
                    value={description}
                    setValue={setDescription}
                    classNames={
                      validationClass.description
                        ? "border-2 border-red-600"
                        : ""
                    }
                  />
                  {validationClass.description ? (
                    <small className={"text-red-600"}>
                      Description is required.
                    </small>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Step>
          )}
          {step == 4 && (
            <Step
              title="Add Your Social Information"
              step={step}
              setStep={setStep}
              validateStep={() => false}
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
                  <Button name="Add" handleClick={addSocial} />
                </div>
                <div className="flex flex-row gap-3.75">
                  {socials.map((social) => (
                    <SocialItem
                      icon={social.icon}
                      bgColor={social.color}
                      key={social.name}
                      name={social.name}
                      deleteValue={removeSocial}
                    />
                  ))}
                </div>
              </div>
            </Step>
          )}
          {step == 5 && (
            <Step
              title="Add Contact Information"
              step={step}
              setStep={setStep}
              validateStep={validateFifthStep}
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
                      classNames={
                        validationClass.firstName
                          ? "border-2 border-red-600"
                          : ""
                      }
                    />
                    {validationClass.firstName ? (
                      <small className={"text-red-600"}>
                        First Name is required.
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-col space-y-3.75">
                    <h1 className="text-xl">Last Name</h1>
                    <InputEmpty
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      setValue={setLastName}
                      classNames={
                        validationClass.lastName
                          ? "border-2 border-red-600"
                          : ""
                      }
                    />
                    {validationClass.lastName ? (
                      <small className={"text-red-600"}>
                        Last Name is required.
                      </small>
                    ) : (
                      ""
                    )}
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
                    classNames={
                      validationClass.email ? "border-2 border-red-600" : ""
                    }
                  />
                  {validationClass.email ? (
                    <small className={"text-red-600"}>
                      Valid e-mail is required.
                    </small>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex flex-col space-y-3.75">
                  <h1 className="text-xl">Phone Number</h1>
                  <InputEmpty
                    id="website"
                    name="website"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                    classNames={
                      validationClass.phoneNumber
                        ? "border-2 border-red-600"
                        : ""
                    }
                  />
                  {validationClass.phoneNumber ? (
                    <small className={"text-red-600"}>
                      Valid phone number is required.
                    </small>
                  ) : (
                    ""
                  )}
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
              validateStep={validateSixthStep}
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
                    classNames={
                      validationClass.companyName
                        ? "border-2 border-red-600"
                        : ""
                    }
                  />
                  {validationClass.companyName ? (
                    <small className={"text-red-600"}>
                      Company Name is required.
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-3.75">
                  <h1 className="text-xl">Street Address</h1>
                  <InputEmpty
                    id="streetAddress"
                    name="streetAddress"
                    placeholder="Street Address"
                    value={streetAddress}
                    setValue={setStreetAddress}
                    classNames={
                      validationClass.streetAddress
                        ? "border-2 border-red-600"
                        : ""
                    }
                  />
                  {validationClass.streetAddress ? (
                    <small className={"text-red-600"}>
                      Street Address is required.
                    </small>
                  ) : (
                    ""
                  )}
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
                      classNames={
                        validationClass.city ? "border-2 border-red-600" : ""
                      }
                    />
                    {validationClass.city ? (
                      <small className={"text-red-600"}>
                        City is required.
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-col space-y-3.75">
                    <h1 className="text-xl">State</h1>
                    <InputEmpty
                      id="State"
                      name="State"
                      placeholder="State"
                      value={companyState}
                      setValue={setCompanyState}
                      classNames={
                        validationClass.companyState
                          ? "border-2 border-red-600"
                          : ""
                      }
                    />
                    {validationClass.companyState ? (
                      <small className={"text-red-600"}>
                        State is required.
                      </small>
                    ) : (
                      ""
                    )}
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
                      classNames={
                        validationClass.postalCode
                          ? "border-2 border-red-600"
                          : ""
                      }
                    />
                    {validationClass.postalCode ? (
                      <small className={"text-red-600"}>
                        Postal Code is required.
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-col space-y-3.75">
                    <h1 className="text-xl">Country</h1>
                    <ReactFlagsSelect
                      selected={country}
                      onSelect={(code) => setCountry(code)}
                      placeholder="Select Country"
                      searchable
                      selectButtonClassName={
                        validationClass.country ? "border-2 border-red-600" : ""
                      }
                    />
                    {validationClass.country ? (
                      <small className={"text-red-600"}>
                        Country is required.
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </Step>
          )}
        </div>
      </div>
    </NoSsr>
  );
}
