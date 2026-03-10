import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OTPEmailProps {
  otp: string;
  userName?: string;
}

export function OTPEmail({ otp, userName }: OTPEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Flik verification code: {otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <div style={logo}>F</div>
            <Text style={logoText}>Flik</Text>
          </Section>

          <Heading style={heading}>Verification Code</Heading>

          <Text style={paragraph}>
            {userName ? `Hi ${userName},` : "Hi there,"}
          </Text>

          <Text style={paragraph}>
            Enter the following code to verify your identity:
          </Text>

          <Section style={codeSection}>
            <Text style={code}>{otp}</Text>
          </Section>

          <Text style={paragraph}>
            This code expires in 10 minutes. If you didn't request this code,
            you can safely ignore this email.
          </Text>

          <Text style={footer}>
            © {new Date().getFullYear()} Flik. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  borderRadius: "8px",
  maxWidth: "465px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const logo = {
  display: "inline-block",
  width: "40px",
  height: "40px",
  backgroundColor: "#7c3aed",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  lineHeight: "40px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const logoText = {
  display: "inline-block",
  marginLeft: "8px",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1a1a1a",
  verticalAlign: "middle",
};

const heading = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const codeSection = {
  backgroundColor: "#f4f4f5",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const code = {
  color: "#7c3aed",
  fontSize: "36px",
  fontWeight: "bold",
  letterSpacing: "8px",
  margin: "0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "32px",
};

export default OTPEmail;
