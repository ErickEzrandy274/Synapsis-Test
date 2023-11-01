import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/modules/Layout";
import { useRouter } from "next/router";
import { EntityDetailsContextProvider } from "@/components/utils/context/EntityDetailContext";

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();

	return (
		<ChakraProvider>
			{pathname === "/" ? (
				<Component {...pageProps} />
			) : (
				<EntityDetailsContextProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</EntityDetailsContextProvider>
			)}
		</ChakraProvider>
	);
}
