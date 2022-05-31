import utilities from './utilities';
import avateaToken from './web3/avateaToken';
import marketMaker from './web3/marketMaker';
import vault from './web3/vault';
import marketMaking from "./marketMaking";
import project from "./project";
import token from "./token";
import user from './user';
import vaultRest from './vault';
import callback from "./callback";


// @TODO Cleanup all to Web3 object for now keep it as it is without breaking the current code
export default {
    utilities,
    avateaToken,
    marketMaker,
    vault,
    marketMaking,
    web3: {
        avateaToken,
        marketMaker,
        vault
    },
    project,
    token,
    user,
    vaultRest,
    callback
}