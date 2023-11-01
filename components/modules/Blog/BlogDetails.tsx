import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { BlogDetailProps } from "./interface";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Badge from "@/components/elements/Badge";
import Loader from "@/components/elements/Loader";

const BlogDetails: React.FC<BlogDetailProps> = ({
	isLoading,
	commentsData,
	userData,
	postDetails,
}) => {
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};

	return (
		<Flex flexDir="column" gap={3}>
			<Flex cursor="pointer" alignItems="center" w="fit-content">
				<ArrowBackIcon />
				<Text fontSize="md" fontWeight="semibold" onClick={handleBack}>
					Back
				</Text>
			</Flex>
			<Flex
				justifyContent="space-between"
				gap={5}
				flexDir={{ base: "column", md: "row" }}
			>
				<Flex w={{ base: "full", md: "50%" }}>
					<Flex flexDir="column" gap={3}>
						<Heading as="h5" size="md">
							Description
						</Heading>
						<Text>{postDetails?.body ?? "No description!"}</Text>
						<Flex flexDir="column" gap={2}>
							<Heading as="h5" size="md">
								Made By
							</Heading>
							{isLoading ? (
								<Loader />
							) : userData?.name ? (
								<>
									<Box rounded="md" bg="gray.300" w="fit-content" p={2}>
										<Text as="h5" size="sm">
											Name: {userData.name}
										</Text>
										<Text as="h5" size="sm">
											Email: {userData.email}
										</Text>
										<Text as="h5" size="sm">
											Gender: {userData.gender}
										</Text>
										<Text as="h5" size="sm">
											Status: <Badge status={userData.status} />
										</Text>
									</Box>
								</>
							) : (
								<Text as="h5" size="md">
									Unknown
								</Text>
							)}
						</Flex>
					</Flex>
				</Flex>

				<Flex w={{ base: "full", md: "50%" }} gap={3} flexDir="column">
					<Heading as="h5" size="md">
						Comments
					</Heading>
					{isLoading ? (
						<Loader />
					) : commentsData?.length ? (
						commentsData.map((item, index) => (
							<Flex flexDir="column" key={item.id}>
								<Text fontSize="md">
									{index + 1}. {item.body}
								</Text>
								<Text
									fontSize="sm"
									fontWeight="semibold"
									color="gray.500"
									textAlign="right"
								>
									created by {item.name}
								</Text>
							</Flex>
						))
					) : (
						<Text fontSize="xl">No comments in this post!</Text>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default BlogDetails;
