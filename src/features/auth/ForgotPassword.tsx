import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function ForgotPassword() {
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
            Forgot Password
          </Text>
        </Flex>
        <VStack gap={4} align="stretch">
          <Box>
            <Input
              placeholder="Email *"
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
            Send Instruction
          </Button>
          <Text textAlign="center" fontSize="sm" color="white" mt={4}>
            Already have an account?{" "}
            <Link style={{color:'green', fontWeight:'bold'}}
              to="/login"
            >
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
