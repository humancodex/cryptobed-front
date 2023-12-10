import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const chains = [mainnet, polygon, optimism];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

export const appWagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});

// 3. Configure modal ethereum client
export const appEthereumClient = new EthereumClient(appWagmiConfig, chains);
