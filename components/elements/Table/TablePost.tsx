import React, { useMemo } from "react";
import { TableDataProps } from "./interface";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Button,
	Flex,
	Box,
	Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEntityDetails } from "@/components/utils/context";
import { POST_COLUMNS } from "./columns";

const TablePost: React.FC<TableDataProps> = ({ data }) => {
	const { push, query } = useRouter();
	const { setPostDetails } = useEntityDetails();
	const handleClick = (item: any) => {
		push(`/blogs/detail/${item.id}`);
		setPostDetails(item);
	};
	const header = useMemo(() => POST_COLUMNS, []);

	const handlePageChange = (page: number) => {
		push({ pathname: "/blogs", query: { page } });
	};

	return (
		<Flex flexDir="column" gap={3}>
			<Heading textAlign="center" color="whatsapp.700">List of Posts</Heading>
			
			<TableContainer>
				<Table variant="striped" colorScheme="messenger">
					<Thead>
						<Tr>
							{header.map((item) => (
								<Th key={item} textAlign="center" fontSize="lg">
									{item}
								</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{data.map((item) => (
							<Tr key={item.id}>
								<Td p={1} textAlign="center">
									{item.id}
								</Td>
								<Td p={1} textAlign="center">
									{item.user_id}
								</Td>
								<Td p={1} textAlign="center">
									{item.title}
								</Td>
								<Td p={1} textAlign="center">
									<Button
										my={1}
										size="sm"
										colorScheme="green"
										onClick={() => handleClick(item)}
									>
										Detail
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>

			<Flex gap={2} justifyContent="center" flexWrap="wrap">
				{Array(20)
					.fill(null)
					.map((_, i) => {
						const isActive = +query.page! === i + 1;
						return (
							<Box
								key={i + 1}
								rounded="md"
								bg={isActive ? "gray.600" : ""}
								color={isActive ? "white" : "black"}
								px={2}
								fontWeight={isActive ? "semibold" : "normal"}
								_hover={{
									bg: "gray.600",
									color: "white",
									fontWeight: "semibold",
								}}
								cursor="pointer"
								onClick={() => handlePageChange(i + 1)}
							>
								{i + 1}
							</Box>
						);
					})}
			</Flex>
		</Flex>
	);
};

export default TablePost;
