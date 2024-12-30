
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { PasswordInput } from "components/ui/password-input";

function ResetPassword() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="gray.900"
      minH="100vh"
      pt={10}
    >
      <Box width={"350px"} p={6} rounded="md" shadow="md">
        <Flex direction={"column"} align={"flex-start"}>
          <Text fontSize="4xl" fontWeight="bold" color="green" mb={4}>
            circle
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" color="white" mb={6}>
            Reset Password
          </Text>
        </Flex>
        <VStack gap={4} align="stretch">
          <Box>
            <PasswordInput
              placeholder="New Password *"
              color={"white"}
              borderWidth="1px"
              borderColor="gray.300"
              padding={2}
            />
          </Box>
          <Box>
            <PasswordInput
              placeholder="Confirm New Password *"
              color={"white"}
              borderWidth="1px"
              borderColor="gray.300"
              padding={2}
            />
          </Box>
          <Button
            bg="green"
            color="white"
            _hover={{ bg: "green.600" }}
            size="lg"
            borderRadius="full"
          >
            Create New Password
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default ResetPassword;
