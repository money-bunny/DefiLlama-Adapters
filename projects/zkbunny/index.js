const sdk = require("@defillama/sdk");

const CARROT_TOKEN_CONTRACT = "";
const CARROT_TOKEN_LP_CONTRACT = "";
const USDC_CONTRACT = "";

const TREASURY_CONTRACT = "";

async function tvl(_, _1, _2, { api }) {
  const balances = {};

  // const lpBalance = await api.call({
  //  abi: "erc20:balanceOf",
  //  target: CARROT_TOKEN_LP_CONTRACT,
  //  params: [TREASURY_CONTRACT],
  //});
  const usdcBalance = await api.call({
    abi: "erc20:balanceOf",
    target: USDC_CONTRACT,
    params: [TREASURY_CONTRACT],
  });
  await sdk.util.sumSingleBalance(
    balances,
    CARROT_TOKEN_CONTRACT,
    usdcBalance,
    api.chain
  );

  return balances;
}

module.exports = {
  timetravel: true,
  misrepresentedTokens: false,
  methodology:
    "Counts the number of CARROT/USDC LP and USDC in the zkBunny treasury",
  era: {
    tvl,
  },
};
