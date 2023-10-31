import {
	Box,
	Flex,
	HStack,
	IconButton,
	useDisclosure,
	useColorModeValue,
	Stack,
	Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
	route: string;
	pathname: string;
	onClose?: () => void
}

const Links = ["Blogs", "Users"];

const NavLink = ({ route, pathname, onClose }: NavLinkProps) => {
	const isActive = pathname.slice(1) === route.toLowerCase()
	return (
		<Link href={`/${route.toLowerCase()}`} onClick={onClose}>
			<Box
				px={2}
				py={1}
				rounded={"md"}
				_hover={{
					bg: "gray.600",
					color: "white",
					fontWeight: "semibold"
				}}
				bg={isActive ? "gray.600" : ""}
				color={isActive ? "white" : ""}
				fontWeight={isActive ? "semibold" : "normal"}
			>
				{route}
			</Box>
		</Link>
	);
};

export default function Navbar() {
	const { pathname } = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<IconButton
					size={"md"}
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label={"Open Menu"}
					display={{ md: "none" }}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems={"center"}>
					<Link href="/">
						<Heading as="h1" size="lg" color="teal.600">
							Blog App
						</Heading>
					</Link>
					<HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
						{Links.map((link) => (
							<NavLink key={link} route={link} pathname={pathname} />
						))}
					</HStack>
				</HStack>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: "none" }}>
					<Stack as={"nav"} spacing={2}>
						{Links.map((link) => (
							<NavLink key={link} route={link} pathname={pathname} onClose={onClose} />
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
	);
}
