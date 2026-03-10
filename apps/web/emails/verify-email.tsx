import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  url: string;
  userName?: string;
}

export function VerifyEmail({ url, userName }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your Flik email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <div style={logo}>F</div>
            <Text style={logoText}>Flik</Text>
          </Section>

          <Heading style={heading}>Verify Your Email</Heading>

          <Text style={paragraph}>
            {userName ? `Hi ${userName},` : "Hi there,"}
          </Text>

          <Text style={paragraph}>
            Thanks for signing up for Flik! Please verify your email address by
            clicking the button below.
          </Text>

          <Section style={buttonSection}>
            <Button href={url} style={button}>
              Verify Email
            </Button>
          </Section>

          <Text style={smallText}>Or copy and paste this link:</Text>
          <Link href={url} style={link}>
            {url}
          </Link>

          <Text style={smallText}>
            This link expires in 24 hours. If you didn't sign up for Flik, you
            can safely ignore this email.
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

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  padding: "14px 32px",
  borderRadius: "8px",
  display: "inline-block",
};

const smallText = {
  color: "#525f7f",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const link = {
  color: "#7c3aed",
  fontSize: "14px",
  wordBreak: "break-all" as const,
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "32px",
};

export default VerifyEmail;
