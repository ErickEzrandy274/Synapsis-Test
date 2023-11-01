import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/modules/Layout";
import { useRouter } from "next/router";
import { EntityDetailsContextProvider } from "@/components/utils/context/EntityDetailContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();

	return (
		<>
			<Head>
				<title>Blog App | Erick Ezrandy</title>
			</Head>
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
		</>
	);
}
