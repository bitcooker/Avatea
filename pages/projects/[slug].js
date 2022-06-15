import axios from "axios";
import { useWallet } from "use-wallet";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import helper from "../../src/helpers";
import { ethers } from "ethers";
import {
  AVATEA_TOKEN_ADDRESS,
  CLOUD_2_TOKEN_ADDRESS,
} from "../../src/helpers/constants";

// core components
import InputEmpty from "../../src/components/core/Input/InputEmpty";
import InputWithIconSubmit from "../../src/components/core/Input/InputWithIconSubmit";
import InputApproveWithIconSubmit from "../../src/components/core/Input/InputApproveWithIconSubmit";
import Button from "../../src/components/core/Button/Button";
import ButtonOutline from "../../src/components/core/Button/ButtonOutline";
import RangeSlider from "../../src/components/core/RangeSlider/RangeSlider";
import Radio from "../../src/components/core/Radio/Radio";
import Tab from "../../src/components/core/Tab/Tab";

// project detail components
import Banner from "../../src/components/pages/projectDetail/Banner/Banner";
import Card from "../../src/components/pages/projectDetail/Card/Card";
import Feed from "../../src/components/pages/projectDetail/Feed/Feed";
import marketMaker from "../../src/helpers/web3/marketMaker";

const tabItems = ["Vault(News)", "Market Making", "Vesting"];

export default function ProjectDetail({ projectDetail }) {
  //@Todo add min buy limit and max buy limit fields (stop-loss)
  const wallet = useWallet();
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState({});
  const [vault, setVault] = useState({});
  const [articles,setArticles] = useState([])
  const [marketMakingPool, setMarketMakingPool] = useState({});
  const [amountToStake, setAmountToStake] = useState(0);
  const [amountBaseToken, setAmountBaseToken] = useState(0);
  const [amountPairToken, setAmountPairToken] = useState(0);
  const [amountPairTokenToStake, setAmountPairTokenToStake] = useState(0);
  const [amountToVaultStake, setAmountToVaultStake] = useState(0);
  const [vaultBalance, setVaultBalance] = useState(0);
  const [marketMakingType, setMarketMakingType] = useState(null);
  const [amountSettings, setAmountSetting] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [priceLimit, setPriceLimit] = useState(null);
  const [fresh, setFresh] = useState(false);
  const [marketMakingSettingsId, setMarketMakingSettingsId] = useState(null);
  const [mode, setMode] = useState('hold');
  const [tab, setTab] = useState(0); // 0 - Vault(News), 1 - Market Making, 2 - Vesting
  const [stakedVaultBalance,setStakedVaultBalance] = useState(0);
  const [avateaBalance,setAvateaBalance] = useState(0);
  const [amountPairTokenBalance, setAmountPairTokenBalance] = useState(0);
  const [amountBaseTokenBalance, setAmountBaseTokenBalance] = useState(0);
  const [pairedTokenWalletBalance, setPairedTokenWalletBalance] = useState(0);
  const [projectTokenBalance, setProjectTokenBalance] = useState(0);

  useEffect(() => {
    if (projectDetail) setProject(projectDetail);
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
  }, [project]);

  useEffect(() => {
    if (wallet.isConnected() && marketMakingPool.paired_token) {
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
            priceLimit,
            id,
          } = marketMakingSettings;
          if (!market_making_type) setFresh(true);
          setMarketMakingSettingsId(id);
          setMode(market_making_type);
          setAmountSetting(amount);
          setPressure(buy_sell_pressure);
          setPriceLimit(priceLimit);
        }
        setAmountBaseTokenBalance(
          ethers.utils.formatEther((
            await helper.web3.marketMaker.available(
              wallet,
              marketMakingPool.address,
              wallet.account
            )
          ))
        );
        setAmountPairTokenBalance(
            ethers.utils.formatEther((
            await helper.web3.marketMaker.getWithdrawablePairedTokens(
              wallet,
              marketMakingPool.address,
              wallet.account
            )
          ))
        );
        setStakedVaultBalance(
          ethers.utils.formatEther((await helper.web3.vault.balanceOf(wallet, vault.address, wallet.account)))
        );
        setAvateaBalance(ethers.utils.formatEther((await helper.token.balanceOf(wallet, AVATEA_TOKEN_ADDRESS))))
        setPairedTokenWalletBalance(ethers.utils.formatEther((await helper.token.balanceOf(wallet, marketMakingPool.paired_token))))
        setProjectTokenBalance(ethers.utils.formatEther((await helper.token.balanceOf(wallet, project.token))))

      };
      initWalletConnected();
    }
  }, [wallet, marketMakingPool]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (project) {
        setArticles((await helper.article.getArticles({project: project.slug})))
      }
    }
    fetchArticles()
  })

  const approve = async (address, tokenAddress) => {
    console.log(address);
    const totalSupply = await helper.token.fetchTotalSupply(wallet);
    console.log(totalSupply);
    await helper.token.approveCustomToken(
      wallet,
      address,
      totalSupply,
      tokenAddress
    );
  };

  const withdrawBaseToken = async () => {
    let full_withdrawal = parseFloat(amountBaseToken) === parseFloat(amountBaseTokenBalance) && parseFloat(amountPairTokenBalance) === 0
    const wei = ethers.utils.parseEther(amountBaseToken);
    await helper.marketMaker.withdrawBaseToken(
      wallet,
      marketMakingPool.address,
      wei,
      full_withdrawal
    );
  };

  const withdrawPairToken = async () => {
    let full_withdrawal = parseFloat(amountPairToken) === parseFloat(amountPairTokenBalance) && parseFloat(amountBaseTokenBalance) === 0
    const wei = ethers.utils.parseEther(amountPairToken);
    await helper.web3.marketMaker.withdrawPairToken(
      wallet,
      marketMakingPool.address,
      wei,
      full_withdrawal
    );
  };

  const stakeVault = async () => {
    const wei = ethers.utils.parseEther(amountToVaultStake);
    await helper.web3.vault.stake(wallet, vault.address, wei);
  };

  const withdrawVault = async () => {
    let full_withdrawal = parseFloat(vaultBalance) === parseFloat(stakedVaultBalance)
    const wei = ethers.utils.parseEther(vaultBalance);
    await helper.web3.vault.withdraw(wallet, vault.address, wei, full_withdrawal);
  };

  const claimVaultRewards = async () => {
    await helper.web3.vault.getReward(wallet, vault.address);
  };

  const exitVault = async () => {
    await helper.web3.vault.exit(wallet, vault.address);
  };

  const stakePairedToken = async () => {
    const wei = ethers.utils.parseEther(amountPairTokenToStake);
    console.log(wei);
    console.log(marketMakingPool.address)
    await helper.web3.marketMaker.stakePairedToken(wallet, marketMakingPool.address, wei);
  };

  const stakeMarketMaker = async () => {
    const wei = ethers.utils.parseEther(amountToStake);
    await helper.marketMaker.stake(wallet, marketMakingPool.address, wei);
  };




  const updateSettings = async () => {
    console.log(fresh);
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

  const setMax = async(amount,setter) => {
    setter(amount);
  }

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
        <div className="grid md-lg:grid-cols-2 gap-7.5">
          <Card>
            <div className="divide-y">
              {/* Card Header */}
              <div className="card-header">
                <h1 className="text-2xl">Staked Avatea in vaults</h1>

                <div className="py-5.5 space-y-4.5">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Transaction</span>
                    <span className="text-base font-medium">{vault.num_invested}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Expected APY</span>
                    <span className="text-base font-medium">1234</span>
                  </div>
                </div>
              </div>

              <div className="card-content pt-5 space-y-3.75">
                <div>
                  <span className="text-base">
                    <i className="fa-regular fa-sack-dollar mr-1"></i> Invest
                    <span>Balance: {avateaBalance} - <button onClick={() => setMax(avateaBalance,setAmountToVaultStake)}>Max</button></span>
                  </span>
                  <InputApproveWithIconSubmit
                    id="max"
                    name="max"
                    type="number"
                    submitName="Stake"
                    icon="fa-light fa-gauge-max"
                    submitFunction={stakeVault}
                    value={amountToVaultStake}
                    setValue={setAmountToVaultStake}
                    address={vault.address}
                    token={AVATEA_TOKEN_ADDRESS}
                  />
                </div>
                <div>
                  <span className="text-base">
                    <i className="fa-regular fa-circle-minus mr-1"></i>
                    Withdraw Avatea
                    <span>- Vault Balance: {stakedVaultBalance} - <button onClick={() => setMax(stakedVaultBalance,setVaultBalance)}>Max</button></span>
                  </span>
                  <InputWithIconSubmit
                    id="withdrawAvatea"
                    name="withdrawAvatea"
                    type="number"
                    submitName="Withdraw"
                    icon="fa-light fa-circle-minus"
                    submitFunction={withdrawVault}
                    value={vaultBalance}
                    setValue={setVaultBalance}
                  />
                </div>
                <div className="grid md-lg:grid-cols-2 gap-3.75">
                  <Button name="Withdraw Rewards" handleClick={claimVaultRewards} />
                  <Button name="Withdraw Both" handleClick={exitVault} />
                </div>
              </div>
            </div>
          </Card>
          <Card title="News Feed">
            {/* Card Header */}
            <div className="card-header">
              <h1 className="text-2xl">News Feed</h1>
            </div>

            <div className="card-content pt-5.5">
              <Feed articles={articles} />
            </div>
          </Card>
        </div>
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
                  <span className="text-base">
                    <i className="fa-regular fa-money-bills-simple mr-1"></i>
                    Cash: 100.000
                    <span>- Cash Balance: {amountPairTokenBalance} - <button onClick={() => setMax(amountPairTokenBalance,setAmountPairToken)}>Max</button></span>
                  </span>
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
                  <span className="text-base">
                    <i className="fa-regular fa-hexagon-vertical-nft mr-1"></i>
                    Tokens: 100.000
                    <span>- Tokens Balance: {amountBaseTokenBalance} - <button onClick={() => setMax(amountBaseTokenBalance,setAmountBaseToken)}>Max</button></span>

                  </span>
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
                    value={'buy'}
                    handleSetMode={handleSetMode}
                  />
                  <Radio
                    name="mode"
                    label="Hold"
                    value={'hold'}
                    handleSetMode={handleSetMode}
                  />
                  <Radio
                    name="mode"
                    label="Sell"
                    value={'sell'}
                    handleSetMode={handleSetMode}
                  />
                </div>
              </div>
              {
                  mode !== 'hold' ? (
                      <div className="space-y-2.5">

                        <span className="text-sm">{mode === 'buy' ? "Maximum Buying Price" : "Minimum Selling Price"}</span>
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
                  ) : ""
              }


              <Button name="Save Settings" handleClick={updateSettings} />

              <div className="card-content pt-1 space-y-3.75">
                {mode == 'buy' && (
                  <div className="space-y-2.5">
                    <span className="text-base">
                      <i className="fa-regular fa-money-bills-simple mr-1"></i>
                      Cash
                      <span>Wallet Balance: {Number(pairedTokenWalletBalance).toFixed(2)}  <button onClick={() => setMax(pairedTokenWalletBalance,setAmountPairTokenToStake)}>Max</button></span>
                    </span>
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

                {mode == 'sell' && (
                  <div className="space-y-2.5">
                    <span className="text-base">
                      <i className="fa-regular fa-hexagon-vertical-nft mr-1"></i>
                      Token
                      <span>Wallet Balance: {Number(projectTokenBalance).toFixed(2)}  <button onClick={() => setMax(projectTokenBalance,setAmountToStake)}>Max</button></span>
                    </span>
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
                <span className="text-sm">Total Users</span>
                <span className="flex text-base font-medium">
                  <img src="/coins/maticIcon.png" className="w-6 h-6 mr-2.5" />
                  100.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">TVL</span>
                <span className="flex text-base font-medium">
                  <img src="/coins/maticIcon.png" className="w-6 h-6 mr-2.5" />
                  100.00
                </span>
              </div>
            </div>
          </div>


          <div className="pt-9">
            <Button name="Release Tokens" />
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
      }
    }
  } else {
    return {
      props: {
        projectDetail: null,
        marketMakingPool: null,
        vault: null,
      }
    };
  }
}
