import {useWallet} from "use-wallet";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import helper from "../../src/helpers";

// core components
import Tab from "../../src/components/core/Tab/Tab";

// project detail components
import Banner from "../../src/components/pages/projectDetail/Banner/Banner";
import Vault from "../../src/components/pages/projects/Vault";
import MarketMaking from "../../src/components/pages/projects/MarketMaking";
import Vesting from "../../src/components/pages/projects/Vesting";
import NoVesting from "../../src/components/pages/projects/NoVesting";

import SkeletonVault from "../../src/components/pages/projects/Skeleton/SkeletonVault";
import SkeletonMarketMaking from "../../src/components/pages/projects/Skeleton/SkeletonMarketMaking";

const tabItems = ["Vault", "Market Making", "Vesting"];

export default function ProjectDetail(props) {
  //@Todo add min buy limit and max buy limit fields (stop-loss)
  const wallet = useWallet();
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState({});
  const [vault, setVault] = useState({});
  const [marketMakingPool, setMarketMakingPool] = useState({});
  const [tab, setTab] = useState(0); // 0 - Vault(News), 1 - Market Making, 2 - Vesting
  const [holdersMapping, setHoldersMapping] = useState({});
  const [load, setLoad] = useState(false);

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
    }, [props,slug]);

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
    setLoad(false);
    return () => setTimeout(() => setLoad(true), 2000);
  }, [tab])

  useEffect(() => {
    if (wallet.status === "connected" && marketMakingPool.paired_token) {
      const initWalletConnected = async () => {
        const results = await helper.web3.marketMaker.fetchHoldersMapping(
          wallet,
          marketMakingPool.address,
            wallet.account
        );
        setHoldersMapping(results);
      };
      initWalletConnected();
    }
  }, [wallet, marketMakingPool]);

  return (
    <div className="space-y-7.5">
      <Banner {...project} />
      {/* Tab menu */}
      <div className="flex justify-center">
        <Tab items={tabItems} tab={tab} setTab={setTab} />
      </div>
      {/* Staked Avatea in vaults & News Feed */}
      {tab == 0 && 
        (!load ? <SkeletonVault /> : <Vault
        vault={vault}
        wallet={wallet}
        project={project}
        marketMakingPool={marketMakingPool}
      />)
      }

      {/* Activity & Settings */}
      {tab == 1 && (
        !load ? <SkeletonMarketMaking /> : <MarketMaking
        wallet={wallet}
        marketMakingPool={marketMakingPool}
        vault={vault}
        project={project}
      />
      )}

            {tab == 2 &&
                Object.keys(holdersMapping).length !== 0 &&
                holdersMapping?.amountVested.gt(0) && (
                    <Vesting
                        wallet={wallet}
                        marketMakingPool={marketMakingPool}
                        project={project}
                        holdersMapping={holdersMapping}
                    />
                )}
            {tab == 2 &&
                Object.keys(holdersMapping).length !== 0 &&
                holdersMapping?.amountVested.eq(0) && <NoVesting/>}
        </div>
    );
}

export async function getServerSideProps(context) {
    return await helper.project.getProjectServerSide(context);
}
