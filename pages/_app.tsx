import type { AppProps } from "next/app";
import { GenieUiProvider } from "@/genie-ui/GenieUiProvider";

// styles
import '@/genie-ui/globals.css'
import '@/genie-ui/tokens.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GenieUiProvider>
      <Component {...pageProps} />
    </GenieUiProvider>
  );
}
