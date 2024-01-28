import { walletConnectProvider } from "@web3modal/wagmi1";

import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygon } from "viem/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

// 2. Create wagmiConfig
const { chains, publicClient } = configureChains(
  [polygon],
  [walletConnectProvider({ projectId }), publicProvider()]
);

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
  ],
  publicClient,
});

export const modalConfig = {
  wagmiConfig,
  projectId,
  chains,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
};
