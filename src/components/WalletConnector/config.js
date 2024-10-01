import { createConfig, http } from "@wagmi/core";
import { injected, walletConnect } from "@wagmi/connectors";
import { optimism, mainnet, sepolia } from "@reown/appkit/networks";

const optimism2 = {
  ...optimism,
  rpcUrls: {
    default: {
      http: ["https://mainnet.optimism.io"],
    },
  },
};

const mainnet2 = {
  ...mainnet,
  rpcUrls: {
    default: {
      http: ["https://eth.llamarpc.com"],
    },
  },
};

const networks = [mainnet2, optimism2, sepolia];

const projectId = "ebd0ab86ed45dcd28ff826b06b19eea1";

const metadata = {
  name: "sign",
  description: "Sign intro",
  url: "https://sign.inbytes.xyz", // origin must match your domain & subdomain
  icons: ["/IB_icon.png"],
};

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
    [optimism2.id]: http(),
  },
});
