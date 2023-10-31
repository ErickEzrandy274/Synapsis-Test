import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/modules/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();

	return (
		<ChakraProvider>
			{pathname === "/" ? (
				<Component {...pageProps} />
			) : (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			)}
		</ChakraProvider>
	);
}
