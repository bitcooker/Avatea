import { useWallet } from "use-wallet";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import helper from "../../src/helpers";
import { ethers } from "ethers";
import { AVATEA_TOKEN_ADDRESS } from "../../src/helpers/constants";

// core components
import InputEmpty from "../../src/components/core/Input/InputEmpty";
import InputWithIconSubmit from "../../src/components/core/Input/InputWithIconSubmit";
import InputApproveWithIconSubmit from "../../src/components/core/Input/InputApproveWithIconSubmit";
import Button from "../../src/components/core/Button/Button";
import RangeSlider from "../../src/components/core/RangeSlider/RangeSlider";
import Radio from "../../src/components/core/Radio/Radio";
import Tab from "../../src/components/core/Tab/Tab";

// project detail components
import Banner from "../../src/components/pages/projectDetail/Banner/Banner";
import Card from "../../src/components/pages/projectDetail/Card/Card";
import Feed from "../../src/components/pages/projectDetail/Feed/Feed";
import MaxButton from "../../src/components/pages/projects/Button/MaxButton";
import formatting from "../../src/helpers/formatting";
import Vault from "../../src/components/pages/projects/Vault";

const tabItems = ["Vault", "Market Making", "Vesting"];

export default function ProjectDetail(props) {
  //@Todo add min buy limit and max buy limit fields (stop-loss)
  const wallet = useWallet();
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState({});
  const [vault, setVault] = useState({});
  const [marketMakingPool, setMarketMakingPool] = useState({});
  const [amountToStake, setAmountToStake] = useState(0);
  const [amountBaseToken, setAmountBaseToken] = useState(0);
  const [amountPairToken, setAmountPairToken] = useState(0);
  const [amountPairTokenToStake, setAmountPairTokenToStake] = useState(0);
  const [amountSettings, setAmountSetting] = useState(null);
  const [pressure, setPressure] = useState(0);
  const [priceLimit, setPriceLimit] = useState(null);
  const [fresh, setFresh] = useState(false);
  const [marketMakingSettingsId, setMarketMakingSettingsId] = useState(null);
  const [mode, setMode] = useState("hold");
  const [tab, setTab] = useState(0); // 0 - Vault(News), 1 - Market Making, 2 - Vesting
  const [amountPairTokenBalance, setAmountPairTokenBalance] = useState(0);
  const [amountBaseTokenBalance, setAmountBaseTokenBalance] = useState(0);
  const [pairedTokenWalletBalance, setPairedTokenWalletBalance] = useState(0);
  const [projectTokenBalance, setProjectTokenBalance] = useState(0);
  const [releaseAbleAmount, setReleaseAbleAmount] = useState(0);
  const [amountVested, setAmountVested] = useState(0);
  const [amountReleased, setAmountReleased] = useState(0);
  const [baseAmountBought, setBaseAmountBought] = useState('0')
  const [pairedAmountBought, setPairedAmountBought] = useState('0')
  const [baseAmountSold, setBaseAmountSold] = useState('0')
  const [pairedAmountSold, setPairedAmountSold] = useState('0')
  const [cliff, setCliff] = useState('0')
  const [start, setStart] = useState('0')
  const [duration, setDuration] = useState('0')
  const [slicePeriodSeconds, setSlicePeriodSeconds] = useState('0')


  useEffect(() => {
    if (props.projectDetail) setProject(props.projectDetail);
    if (props.marketMakingPool) setMarketMakingPool(props.marketMakingPool);
    if (props.vault) setVault(props.vault);
    else {
      const fetchProject = async () => {
        const result = await helper.project.getProject(slug);
        setProject(result?.project);
        setMarketMakingPool(result?.marketMakingPool);
        setVault(result?.vault);
      };
      fetchProject();
    }
  }, []);

  useEffect(() => {
    //@TODO Error handling if empty market making pool or vault
    if (Object.keys(project).length !== 0) {
      const fetchProject = async () => {
        const result = await helper.project.getProject(project.slug);

        setMarketMakingPool(result?.marketMakingPool);
        setVault(result?.vault);
      };
      fetchProject();
    }
  }, [props.projectDetail]);

  useEffect(() => {
    if (wallet.status === "connected") {
      const initWalletConnected = async () => {
        //@TODO Wire Chain ID for production
        const marketMakingSettings =
          await helper.marketMaking.getMarketMakingSettings({
            slug: project.slug,
            user_address: wallet.account,
          });
        if (marketMakingSettings) {
          const {
            market_making_type,
            amount,
            buy_sell_pressure,
            price_limit,
            id,
          } = marketMakingSettings;
          if (!market_making_type) setFresh(true);
          setMarketMakingSettingsId(id);
          setMode(market_making_type === null ? "hold" : market_making_type);
          setAmountSetting(amount === null ? "0" : amount);
          setPressure(buy_sell_pressure === null ? 0 : buy_sell_pressure);
          setPriceLimit(price_limit === null ? 0 : price_limit);
        }
      };
      initWalletConnected();
    }
  }, [wallet]);

  useEffect(() => {
    if (wallet.status === "connected" && marketMakingPool.paired_token) {
      const initWalletConnected = async () => {
        setAmountPairTokenBalance(
          helper.formatting.web3Format(
            await helper.web3.marketMaker.getWithdrawablePairedTokens(
              wallet,
              marketMakingPool.address,
              wallet.account
            )
          )
        );

        setPairedTokenWalletBalance(
          helper.formatting.web3Format(
            await helper.token.balanceOf(wallet, marketMakingPool.paired_token)
          )
        );
        setProjectTokenBalance(
          helper.formatting.web3Format(
            await helper.token.balanceOf(wallet, project.token)
          )
        );

        setReleaseAbleAmount(
          helper.formatting.web3Format(
            await helper.web3.marketMaker.computeReleasableAmount(
              wallet,
              marketMakingPool.address
            ))
        );

        const {
          available,
          amountVested,
          released,
          baseAmountBought,
          pairedAmountBought,
          baseAmountSold,
          pairedAmountSold,
          cliff,
          start,
          duration,
          slicePeriodSeconds,
          projectOwner,
          revocable
        } =
            await helper.web3.marketMaker.fetchHoldersMapping(
                wallet,
                marketMakingPool.address
            );
        setAmountBaseTokenBalance(helper.formatting.web3Format(available));
        setAmountReleased(helper.formatting.web3Format(released));
        setAmountVested(helper.formatting.web3Format(amountVested));
        setBaseAmountBought(helper.formatting.web3Format(baseAmountBought));
        setPairedAmountBought(helper.formatting.web3Format(pairedAmountBought));
        setBaseAmountSold(helper.formatting.web3Format(baseAmountSold));
        setPairedAmountSold(helper.formatting.web3Format(pairedAmountSold));
        setCliff(helper.formatting.web3Format(cliff));
        setStart(helper.formatting.web3Format(start));
        setDuration(helper.formatting.web3Format(duration));
        setSlicePeriodSeconds(helper.formatting.web3Format(slicePeriodSeconds));
      };
      initWalletConnected();
    }
  }, [wallet, vault, marketMakingPool]);

  const withdrawBaseToken = async () => {
    let full_withdrawal =
      parseFloat(amountBaseToken) === parseFloat(amountBaseTokenBalance) &&
      parseFloat(amountPairTokenBalance) === 0;
    const wei = ethers.utils.parseEther(amountBaseToken);
    await helper.marketMaker.withdrawBaseToken(
      wallet,
      marketMakingPool.address,
      wei,
      full_withdrawal
    );
  };

  const withdrawPairToken = async () => {
    let full_withdrawal =
      parseFloat(amountPairToken) === parseFloat(amountPairTokenBalance) &&
      parseFloat(amountBaseTokenBalance) === 0;
    const wei = ethers.utils.parseEther(amountPairToken);
    await helper.web3.marketMaker.withdrawPairToken(
      wallet,
      marketMakingPool.address,
      wei,
      full_withdrawal
    );
  };


  const stakePairedToken = async () => {
    const wei = ethers.utils.parseEther(amountPairTokenToStake);
    await helper.web3.marketMaker.stakePairedToken(
      wallet,
      marketMakingPool.address,
      wei
    );
  };

  const stakeMarketMaker = async () => {
    const wei = ethers.utils.parseEther(amountToStake);
    await helper.marketMaker.stake(wallet, marketMakingPool.address, wei);
  };

  const releaseVesting = async () => {
    await helper.marketMaker.release(
      wallet,
      marketMakingPool.address,
      releaseAbleAmount
    );
  };

  const updateSettings = async () => {
    const marketMakingSettings = {
      marketMakingType: mode,
      amountSettings,
      pressure,
      priceLimit,
      marketMakingPoolId: marketMakingPool.id,
      id: marketMakingSettingsId ? marketMakingSettingsId : "",
    };
    await helper.marketMaking.updateMarketMakingSettings({
      marketMakingSettings,
      wallet,
      fresh,
    });
  };

  const setMax = async (amount, setter) => {
    setter(amount);
  };

  const handleSetMode = useCallback((mode) => {
    setMode(mode);
  }, []);

  return (
    <div className="space-y-7.5">
      <Banner {...project} />
      {/* Tab menu */}
      <div className="flex justify-center">
        <Tab items={tabItems} tab={tab} setTab={setTab} />
      </div>
      {/* Staked Avatea in vaults & News Feed */}
      {tab == 0 && (
            <Vault vault={vault} wallet={wallet} project={project} marketMakingPool={marketMakingPool}/>
      )}

      {/* Activity & Settings */}
      {tab == 1 && (
        <div className="grid md-lg:grid-cols-2 gap-7.5">
          <Card title="Activity">
            {/* Card Header */}
            <div className="card-header">
              <h1 className="text-2xl">Activity</h1>

              <div className="py-5.5 space-y-4.5">
                <div className="flex justify-between">
                  <span className="text-sm">Sold</span>
                  <span className="flex text-base font-medium">
                    <img
                      src="/coins/maticIcon.png"
                      className="w-6 h-6 mr-2.5"
                    />
                    100.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Bought</span>
                  <span className="flex text-base font-medium">
                    <img
                      src="/coins/maticIcon.png"
                      className="w-6 h-6 mr-2.5"
                    />
                    100.00
                  </span>
                </div>
              </div>
            </div>

            <div className="card-content space-y-5">
              <div className="space-y-3.75">
                <div className="space-y-2.5">
                  <div className="flex flex-row items-center justify-between text-base">
                    <div>
                      <i className="fa-regular fa-money-bills-simple mr-1"></i>
                      Cash: 100.000
                    </div>
                    <span>
                      {amountPairTokenBalance} &nbsp;
                      <MaxButton
                        handleClick={() =>
                          setMax(amountPairTokenBalance, setAmountPairToken)
                        }
                      />
                    </span>
                  </div>
                  <InputWithIconSubmit
                    id="withdrawCash"
                    name="withdrawCash"
                    type="number"
                    placeholder="Input amount to withdraw"
                    submitName="Withdraw"
                    icon="fa-light fa-circle-minus"
                    value={amountPairToken}
                    setValue={setAmountPairToken}
                    submitFunction={withdrawPairToken}
                  />
                </div>
                <div className="space-y-2.5">
                  <div className="flex flex-row items-center justify-between text-base">
                    <div>
                      <i className="fa-regular fa-hexagon-vertical-nft mr-1"></i>
                      Tokens: 100.000
                    </div>
                    <span>
                      {amountBaseTokenBalance} &nbsp;
                      <MaxButton
                        handleClick={() =>
                          setMax(amountBaseTokenBalance, setAmountBaseToken)
                        }
                      />
                    </span>
                  </div>
                  <InputWithIconSubmit
                    id="withdrawToken"
                    name="withdrawToken"
                    type="number"
                    placeholder="Input amount to withdraw"
                    submitName="Withdraw"
                    icon="fa-light fa-circle-minus"
                    value={amountBaseToken}
                    setValue={setAmountBaseToken}
                    submitFunction={withdrawBaseToken}
                  />
                </div>
              </div>
            </div>
          </Card>
          <Card title="Settings">
            {/* Card Header */}
            <div className="card-header">
              <h1 className="text-2xl">Settings</h1>
            </div>

            <div className="card-content pt-5.5 space-y-5">
              <div className=" grid md-lg:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-10">
                  <span className="text-sm">Pressure Slider</span>
                  <RangeSlider setPercent={setPressure} percent={pressure} />
                </div>
                <div className="space-y-2.5">
                  <span className="text-sm">Estimation</span>
                  <InputEmpty placeholder="7 Days" readOnly />
                </div>
              </div>

              <div className="space-y-2.5">
                <span className="text-sm">Mode</span>
                <div className="grid grid-cols-2 md-lg:grid-cols-3 gap-x-4 gap-y-2.5">
                  <Radio
                    name="mode"
                    label="Buy"
                    value={"buy"}
                    checked={mode === "buy" ? true : false}
                    handleSetMode={handleSetMode}
                  />
                  <Radio
                    name="mode"
                    label="Hold"
                    value={"hold"}
                    checked={mode === "hold" ? true : false}
                    handleSetMode={handleSetMode}
                  />
                  <Radio
                    name="mode"
                    label="Sell"
                    value={"sell"}
                    checked={mode === "sell" ? true : false}
                    handleSetMode={handleSetMode}
                  />
                </div>
              </div>
              {mode !== "hold" ? (
                <div className="space-y-2.5">
                  <span className="text-sm">
                    {mode === "buy"
                      ? "Maximum Buying Price"
                      : "Minimum Selling Price"}
                  </span>
                  <InputWithIconSubmit
                    id="priceLimit"
                    name="priceLimit"
                    type="number"
                    placeholder="Enter price"
                    icon="fa-light fa-circle-minus"
                    hideButton={true}
                    value={priceLimit}
                    setValue={setPriceLimit}
                  />
                </div>
              ) : (
                ""
              )}

              <Button name="Save Settings" handleClick={updateSettings} />

              <div className="card-content pt-1 space-y-3.75">
                {mode == "buy" && (
                  <div className="space-y-2.5">
                    <div className="flex flex-row items-center justify-between text-base">
                      <div>
                        <i className="fa-regular fa-money-bills-simple mr-1"></i>
                        Cash
                      </div>
                      <span>
                        {Number(pairedTokenWalletBalance).toFixed(2)} &nbsp;
                        <MaxButton
                          handleClick={() =>
                            setMax(
                              pairedTokenWalletBalance,
                              setAmountPairTokenToStake
                            )
                          }
                        />
                      </span>
                    </div>
                    <InputApproveWithIconSubmit
                      id="cash"
                      name="cash"
                      type="number"
                      icon="fa-light fa-circle-plus"
                      submitName="Deposit"
                      submitFunction={stakePairedToken}
                      value={amountPairTokenToStake}
                      setValue={setAmountPairTokenToStake}
                      address={marketMakingPool.address}
                      token={marketMakingPool.paired_token}
                    />
                  </div>
                )}

                {mode == "sell" && (
                  <div className="space-y-2.5">
                    <div className="flex flex-row items-center justify-between text-base">
                      <div>
                        <i className="fa-regular fa-hexagon-vertical-nft mr-1"></i>
                        Token
                      </div>
                      <span>
                        {Number(projectTokenBalance).toFixed(2)} &nbsp;
                        <MaxButton
                          handleClick={() =>
                            setMax(projectTokenBalance, setAmountToStake)
                          }
                        />
                      </span>
                    </div>
                    <InputApproveWithIconSubmit
                      id="token"
                      name="token"
                      type="number"
                      icon="fa-light fa-circle-plus"
                      submitName="Deposit"
                      submitFunction={stakeMarketMaker}
                      value={amountToStake}
                      setValue={setAmountToStake}
                      address={marketMakingPool.address}
                      token={project.token}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab == 2 && (
        <Card>
          <div className="vesting-header">
            <h1 className="text-2xl">Vesting</h1>

            <div className="py-5.5 space-y-4.5">
              <div className="flex justify-between">
                <span className="text-sm">Total Vested</span>
                <span className="flex text-base font-medium">
                  <img src="/coins/maticIcon.png" className="w-6 h-6 mr-2.5" />
                  {amountVested}
                </span>
              </div>
              <div className="py-5.5 space-y-4.5">
                <div className="flex justify-between">
                  <span className="text-sm">Released</span>
                  <span className="flex text-base font-medium">
                    <img
                      src="/coins/maticIcon.png"
                      className="w-6 h-6 mr-2.5"
                    />
                    {amountReleased}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Releaseable Amount</span>
                <span className="flex text-base font-medium">
                  <img src="/coins/maticIcon.png" className="w-6 h-6 mr-2.5" />
                  {releaseAbleAmount}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-9">
            <Button name="Release Tokens" handleClick={releaseVesting} />
          </div>
        </Card>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  if (slug !== "undefined") {
    let projectDetails;
    try {
      projectDetails = await helper.project.getProject(slug);
    } catch (e) {
      console.log(e);
      projectDetails = null;
    }
    return {
      props: {
        projectDetail: projectDetails?.project,
        marketMakingPool: projectDetails?.marketMakingPool,
        vault: projectDetails?.vault,
      },
    };
  } else {
    return {
      props: {
        projectDetail: null,
        marketMakingPool: null,
        vault: null,
      },
    };
  }
}
