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
import { createConfig, http } from "@wagmi/core";
import { injected, walletConnect } from "@wagmi/connectors";
import { WagmiProvider } from "wagmi";
//import { optimism, mainnet, sepolia } from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createAppKit } from "@reown/appkit/react";

import { optimism, mainnet, sepolia } from "@reown/appkit/networks";

import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Your Reown Cloud project ID
const projectId = "ebd0ab86ed45dcd28ff826b06b19eea1";

// 2. Create wagmiConfig
const metadata = {
  name: "sign",
  description: "Sign intro",
  url: "https://sign.inbytes.xyz", // origin must match your domain & subdomain
  icons: ["/IB_icon.png"],
};

const networks = [mainnet, optimism, sepolia];
export const config = createConfig({
  chains: networks,
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
    [optimism.id]: http(),
  },
});

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
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
    email: true, // default to true
    socials: ["google", "x"],
    emailShowWallets: true, // default to true
  },
  allWallets: "SHOW", // default to SHOW
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
