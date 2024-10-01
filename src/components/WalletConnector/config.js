import { createConfig, http } from "@wagmi/core";
import { mainnet } from "@wagmi/core/chains";
import { injected, walletConnect } from "@wagmi/connectors";

const mainnet2 = {
  ...mainnet,
  rpcUrls: {
    default: {
      http: ["https://eth.llamarpc.com"],
    },
  },
};

// 1. Your Reown Cloud project ID
const projectId = "ebd0ab86ed45dcd28ff826b06b19eea1";

// 2. Create wagmiConfig
const metadata = {
  name: "sign",
  description: "Sign intro",
  url: "https://sign.inbytes.xyz",
  icons: ["/IB_icon.png"],
};

const chains = [mainnet2];

export const config = createConfig({
  chains: chains,
  connectors: [
    injected(),
    walletConnect({
      projectId: projectId,
      customStoragePrefix: "wagmi",
      isNewChainsStale: false,
      showQrModal: false,
      qrModalOptions: {
        themeMode: "dark",
      },
      metadata: metadata,
    }),
  ],
  transports: {
    [mainnet2.id]: http(),
  },
});
