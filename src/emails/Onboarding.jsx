import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Button,
} from "@react-email/components";

export const OnboardingEmail = ({ token = "123456", name = "User" }) => (
  <Html>
    <Head />
    <Preview>Welcome to PulseAI - Your health journey begins!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://pulsehealthcare.ai/pulse-ai.svg`}
          width="120"
          height="35"
          alt="PulseAI Logo"
          style={logo}
        />
        <Heading style={h1}>Welcome to PulseAI, {name}!</Heading>
        <Text style={text}>
          We're excited to have you on board. Let's get you started with
          PulseAI, your smart health companion.
        </Text>
        <Section style={tokenContainer}>
          <Text style={tokenText}>Your activation token:</Text>
          <Text style={tokenStyle}>{token}</Text>
        </Section>
        <Hr style={hr} />
        <Heading style={h2}>Quick Start:</Heading>
        <ol style={list}>
          <li>Download the PulseAI app</li>
          <li>Sign in with your email and token</li>
          <li>Complete your health profile</li>
          <li>Connect your devices</li>
        </ol>
        <Section style={ctaContainer}>
          <Row>
            <Column align="center">
              <Row>
                <Text className="text-[18px] font-bold leading-[28px] text-indigo-500">
                  Try now
                </Text>
                <Text className="text-gray-900">
                  The app all cheese enthusiasts have been waiting for
                </Text>
              </Row>
              <Row>
                <td align="center">
                  <table>
                    <tr>
                      <td className="pr-[16px]">
                        <Button href="https://react.email">
                          <Img
                            alt="Get it on Google Play button"
                            height={54}
                            src="https://react.email/static/get-it-on-google-play.png"
                          />
                        </Button>
                      </td>
                      <td className="pl-[16px]">
                        <Button href="https://react.email">
                          <Img
                            alt="Download on the App Store button"
                            height={54}
                            src="https://react.email/static/download-on-the-app-store.png"
                          />
                        </Button>
                      </td>
                    </tr>
                  </table>
                </td>
              </Row>
            </Column>
          </Row>
        </Section>
        <Text style={text}>
          Questions? Contact us at{" "}
          <Link href="mailto:support@pulseai.com" style={link}>
            support@pulseai.com
          </Link>
        </Text>
        <Text style={signature}>The PulseAI Team</Text>
      </Container>
    </Body>
  </Html>
);

export default OnboardingEmail;

const violet = {
  50: "#f5f3ff",
  100: "#ede9fe",
  500: "#8b5cf6",
  700: "#6d28d9",
  900: "#4c1d95",
};

const main = {
  backgroundColor: violet[50],
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  maxWidth: "465px",
};

const logo = {
  margin: "0 auto 20px",
  display: "block",
};

const h1 = {
  color: violet[900],
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  margin: "0 0 20px",
};

const h2 = {
  color: violet[700],
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 12px",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
};

const tokenContainer = {
  backgroundColor: violet[100],
  borderRadius: "6px",
  padding: "12px",
  margin: "20px 0",
  textAlign: "center",
};

const tokenText = {
  ...text,
  margin: "0 0 8px",
};

const tokenStyle = {
  color: violet[700],
  fontSize: "28px",
  fontWeight: "bold",
};

const hr = {
  borderColor: violet[100],
  margin: "20px 0",
};

const list = {
  ...text,
  paddingLeft: "20px",
  margin: "0 0 20px",
};

const ctaContainer = {
  textAlign: "center",
  margin: "20px 0",
};

const ctaButton = {
  backgroundColor: violet[500],
  borderRadius: "4px",
  color: "#fff",
  fontSize: "14px",
  textDecoration: "none",
  textAlign: "center",
  padding: "10px 20px",
  margin: "0 8px",
  display: "inline-block",
};

const link = {
  color: violet[500],
  textDecoration: "underline",
};

const signature = {
  color: violet[700],
  fontSize: "16px",
  fontWeight: "bold",
  margin: "20px 0 0",
};
