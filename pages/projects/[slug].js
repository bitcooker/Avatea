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

// project detail components
import Banner from "../../src/components/pages/projectDetail/Banner/Banner";

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
    <div>
      <Banner />
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
