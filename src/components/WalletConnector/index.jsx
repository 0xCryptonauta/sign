/* import { createConfig, http } from "@wagmi/core";
import { mainnet, sepolia, polygon, optimism } from "@wagmi/core/chains";
import { injected, walletConnect } from "@wagmi/connectors";


// 0. Setup queryClient
//const queryClient = new QueryClient()

// 1. Your Reown Cloud project ID
const projectId = "ebd0ab86ed45dcd28ff826b06b19eea1";

// 2. Create wagmiConfig
const metadata = {
  name: "sign",
  description: "Sign intro",
  url: "https://sign.inbytes.xyz", // origin must match your domain & subdomain
  icons: ["/IB_icon.png"],
};

const chains = [mainnet, optimism];

export const config = createConfig({
  chains: chains,
  connectors: [
    injected(),
    walletConnect({
      projectId: projectId,
      isNewChainsStale: false,
      qrModalOptions: {
        themeMode: "dark",
      },
      metadata: metadata,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
}); */

import PropTypes from "prop-types"; // Import PropTypes

import { WagmiProvider } from "wagmi";
//import { optimism, mainnet, sepolia } from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createAppKit } from "@reown/appkit/react";

import { optimism, mainnet, sepolia } from "@reown/appkit/networks";

import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const optimism2 = {
  ...optimism,
  rpcUrls: {
    default: {
      http: ["https://mainnet.optimism.io"],
    },
  },
};

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Your Reown Cloud project ID
const projectId = "ebd0ab86ed45dcd28ff826b06b19eea1";

// 2. Create wagmiConfig
const metadata = {
  name: "sign",
  description: "Sign intro",
  url: "https://localhost:5173", // origin must match your domain & subdomain
  icons: ["/IB_icon.png"],
};

const networks = [mainnet, optimism2, sepolia];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    swaps: false,
    onramp: false,
    email: false, // default to true
    socials: ["google", "x"],
    emailShowWallets: true, // default to true
  },
  defaultNetwork: mainnet,
  featuredWalletIds: [
    "6adb6082c909901b9e7189af3a4a0223102cd6f8d5c39e39f3d49acb92b578bb",
    "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
  ],
  allowUnsupportedChain: false,

  //allWallets: "SHOW", // default to SHOW
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

// Add PropTypes validation
AppKitProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is required and should be a React node
};
