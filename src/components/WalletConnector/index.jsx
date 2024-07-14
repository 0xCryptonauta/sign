import { createConfig, http } from "@wagmi/core";
import {
  mainnet,
  sepolia,
  polygon,
  arbitrum,
  optimism,
  evmos,
} from "@wagmi/core/chains";
import { injected, walletConnect } from "@wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum, optimism, evmos],
  connectors: [
    injected(),
    walletConnect({
      projectId: "bb1dfdf56d35ce419d54a9fe40df3ae0",
      isNewChainsStale: false,
      qrModalOptions: {
        themeMode: "dark",
      },
      metadata: {
        name: "Sign & Verify",
        description: "Sign and verify any message",
        /* url: "https://sign.inBytes.xyz", */
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
});
