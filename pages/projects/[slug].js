import axios from "axios";
import { useWallet } from "use-wallet";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import helper from "../../src/helpers";
import { ethers } from "ethers";
import {
  AVATEA_TOKEN_ADDRESS,
  CLOUD_2_TOKEN_ADDRESS,
} from "../../src/helpers/constants";

// core components
import Input from "../../src/components/core/Input/Input";
import InputWithIcon from "../../src/components/core/Input/InputWithIcon";
import ButtonOutline from "../../src/components/core/Button/ButtonOutline";

// project detail components
import Banner from "../../src/components/pages/projectDetail/Banner/Banner";
import Card from "../../src/components/pages/projectDetail/Card/Card";
import Feed from "../../src/components/pages/projectDetail/Feed/Feed";

export default function ProjectDetail({ projectDetail }) {
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
  const [amountToVaultStake, setAmountToVaultStake] = useState(0);
  const [vaultBalance, setVaultBalance] = useState(0);
  const [marketMakingType, setMarketMakingType] = useState(null);
  const [amountSettings, setAmountSetting] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [priceLimit, setPriceLimit] = useState(null);
  const [fresh, setFresh] = useState(false);
  const [marketMakingSettingsId, setMarketMakingSettingsId] = useState(null);

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
    if (wallet.isConnected()) {
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
          setMarketMakingType(market_making_type);
          setAmountSetting(amount);
          setPressure(buy_sell_pressure);
          setPriceLimit(priceLimit);
        }
        setAmountBaseToken(
          (
            await helper.marketMaker.available(
              wallet,
              marketMakingPool.address,
              wallet.account
            )
          ).toString()
        );
        setAmountPairToken(
          (
            await helper.marketMaker.getWithdrawablePairedTokens(
              wallet,
              marketMakingPool.address,
              wallet.account
            )
          ).toString()
        );
        setVaultBalance(
          (
            await helper.vault.balanceOf(wallet, vault.address, wallet.account)
          ).toString()
        );
      };
      initWalletConnected();
    }
  }, [wallet, marketMakingPool]);

  const stakeMarketMaker = async () => {
    const wei = ethers.utils.parseEther(amountToStake);
    await helper.marketMaker.stake(wallet, marketMakingPool.address, wei);
  };

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
    await helper.marketMaker.withdrawBaseToken(
      wallet,
      marketMakingPool.address,
      amountBaseToken
    );
  };

  const withdrawPairToken = async () => {
    await helper.marketMaker.withdrawPairToken(
      wallet,
      marketMakingPool.address,
      amountPairToken
    );
  };

  const stakeVault = async () => {
    console.log(amountToVaultStake);
    const wei = ethers.utils.parseEther(amountToVaultStake);
    await helper.vault.stake(wallet, vault.address, wei);
  };

  const withdrawVault = async () => {
    await helper.vault.withdraw(wallet, vault.address, vaultBalance);
  };

  const updateSettings = async () => {
    console.log(fresh);
    const marketMakingSettings = {
      marketMakingType,
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

  return (
    <div className="space-y-7.5">
      <Banner />

      {/* Staked Avatea in vaults & News Feed */}
      <div className="grid md-lg:grid-cols-2 gap-7.5">
        <Card>
          <div className="divide-y">
            {/* Card Header */}
            <div className="card-header">
              <h1 className="text-2xl">Staked Avatea in vaults</h1>

              <div className="py-5.5 space-y-4.5">
                <div className="flex justify-between">
                  <span className="text-sm">Total Transaction</span>
                  <span className="text-base font-medium">2,345.56</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Expected APY</span>
                  <span className="text-base font-medium">1234</span>
                </div>
              </div>
            </div>

            <div className="card-content pt-5 space-y-3.75">
              <div className="space-y-2.5">
                <span className="text-base">Amount</span>
                <Input
                  id="max"
                  name="max"
                  type="number"
                  value="15"
                  submitName="Max"
                />
              </div>
              <div className="grid md-lg:grid-cols-2 gap-3.75">
                <div>
                  <span className="text-base">Withdraw Rewards</span>
                  <Input
                    id="withdrawRewards"
                    name="withdrawRewards"
                    type="number"
                    value="0"
                    submitName="Withdraw"
                  />
                </div>
                <div>
                  <span className="text-base">Withdraw Avatea</span>
                  <Input
                    id="withdrawAvatea"
                    name="withdrawAvatea"
                    type="number"
                    value="0"
                    submitName="Withdraw"
                  />
                </div>
              </div>
              <div className="space-y-2.5">
                <span className="text-base">Withdraw Both</span>
                <Input
                  id="withdrawBoth"
                  name="withdrawBoth"
                  type="number"
                  value="0"
                  submitName="Withdraw"
                />
              </div>
            </div>
          </div>
        </Card>
        <Card title="News Feed">
          {/* Card Header */}
          <div className="card-header">
            <h1 className="text-2xl">News Feed</h1>
          </div>

          <div className="pt-5.5">
            <Feed />
          </div>
        </Card>
      </div>

      {/* Activity & Settings */}
      <div className="grid md-lg:grid-cols-2 gap-7.5">
        <Card title="Activity">
          {/* Card Header */}
          <div className="card-header">
            <h1 className="text-2xl">Activity</h1>

            <div className="py-5.5 space-y-4.5">
              <div className="flex justify-between">
                <span className="text-sm">Sold</span>
                <span className="flex text-base font-medium">
                  <img src="/coins/maticIcon.png" className="w-6 h-6 mr-2.5" />
                  100.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Bought</span>
                <span className="flex text-base font-medium">
                  <img src="/coins/maticIcon.png" className="w-6 h-6 mr-2.5" />
                  100.00
                </span>
              </div>
            </div>
          </div>

          <div className="card-content space-y-5">
            <div className="grid md-lg:grid-cols-2 gap-3.75">
              <ButtonOutline name="Bought" />
              <ButtonOutline name="Amount Bought" />
            </div>
            <div className="space-y-3.75">
              <div className="space-y-2.5">
                <span className="text-base">Cash: 100.000</span>
                <InputWithIcon
                  id="withdrawCash"
                  name="withdrawCash"
                  type="number"
                  placeholder="Input amount to withdraw"
                  submitName="Withdraw"
                />
              </div>
              <div className="space-y-2.5">
                <span className="text-base">Tokens: 100.000</span>
                <InputWithIcon
                  id="withdrawToken"
                  name="withdrawToken"
                  type="number"
                  placeholder="Input amount to withdraw"
                  submitName="Withdraw"
                />
              </div>
            </div>

            <div className="vesting-content !mt-7.5">
              <div className="vesting-header">
                <h1 className="text-2xl">Vesting</h1>

                <div className="py-5.5 space-y-4.5">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Vested</span>
                    <span className="flex text-base font-medium">
                      <img
                        src="/coins/maticIcon.png"
                        className="w-6 h-6 mr-2.5"
                      />
                      100.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Releasable</span>
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

              <div className="grid md-lg:grid-cols-2 gap-3.75">
                <ButtonOutline name="Total Amount(1000.00)" />
                <ButtonOutline name="Amount of Tokens" />
              </div>
            </div>
          </div>
        </Card>
        <Card title="Settings" />
      </div>
    </div>
  );
}

// ProjectDetail.getInitialProps = async (ctx) => {
//     console.log(ctx);
//     // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     // const json = await res.json()
//      return { test: 'test' }
// }

export async function getServerSideProps(context) {
  const { slug } = context.query;
  let projectDetails;
  try {
    projectDetails = await helper.project.getProject(slug);
    console.log(projectDetails);
  } catch (e) {
    console.log(e);
    projectDetails = {};
  }
  return {
    // props: {
    //     projectDetail: projectDetails?.project,
    //     marketMakingPool: projectDetails?.marketMakingPool,
    //     vault: projectDetails?.vault
    // }
    props: {
      projectDetail: null,
      marketMakingPool: null,
      vault: null,
    },
  };
}
