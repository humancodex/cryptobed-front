"use client";

import { createWeb3Modal } from "@web3modal/wagmi1/react";
import { EIP6963Connector, walletConnectProvider } from "@web3modal/wagmi1";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygon, polygonMumbai } from "viem/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
// 2. Create wagmiConfig
const { chains, publicClient } = configureChains(
  [polygon, polygonMumbai],
  [walletConnectProvider({ projectId }), publicProvider()]
);

const metadata = {
  name: "CryptoBed",
  description: "The Web3 travel community",
  url: "https://cryptobed.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } }),
  ],
  publicClient,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

interface Web3ModalProps {
  children: React.ReactNode;
}

export function Web3ModalProvider({ children }: Web3ModalProps) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
