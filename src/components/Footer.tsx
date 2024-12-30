import { Box, HStack, Image, Link, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

interface SocialLinkProps {
  icon: typeof faGithub;
  href: string;
}

const SocialLink = ({ icon, href }: SocialLinkProps) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon color="white" icon={icon} />
  </Link>
);

const socialLinks = [
  { icon: faGithub, href: "" },
  { icon: faLinkedin, href: "" },
  { icon: faInstagram, href: "" },
  { icon: faFacebook, href: "" },
];

const Footer = () => {
  return (
    <Box
      width="352px"
      bg="gray.800"
      color="white"
      mx={6}
      p={3}
      borderRadius="lg"
    >
      <Stack gap={2}>
        <HStack gap={2}>
          <Text fontSize="13px">Developed by Nida Tedilla Manuar</Text>
          <Text as="span" aria-hidden="true">•</Text>
          {socialLinks.map((link, index) => (
            <SocialLink key={index} {...link} />
          ))}
        </HStack>
        
        <HStack gap={1}>
          <Text fontSize="11px" color="whiteAlpha.600">
            Powered by
          </Text>
          <Image
            src="https://dumbways.id/assets/images/brandv2.png"
            alt="DumbWays Logo"
            boxSize="18px"
            objectFit="contain"
          />
          <Text fontSize="11px" color="whiteAlpha.600">
            DumbWays Indonesia • #1 Coding Bootcamp
          </Text>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
