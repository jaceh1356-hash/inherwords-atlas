import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Story - Join the Global Women's Rights Movement",
  description: "Share your experience, inspire others, and contribute to positive change for women's rights. Connect with organizations and amplify your voice in our safe, supportive community.",
  keywords: [
    "women's stories",
    "share your experience", 
    "women's rights advocacy",
    "gender equality stories",
    "women empowerment",
    "female voices",
    "women's experiences",
    "gender equality movement",
    "women's advocacy platform",
    "inspire women",
    "women's community",
    "gender equality activism"
  ],
  openGraph: {
    title: "Share Your Story - Join the Global Women's Rights Movement",
    description: "Share your experience, inspire others, and contribute to positive change for women's rights. Your voice matters.",
    url: "https://inherwords.org/submit",
  },
  alternates: {
    canonical: "https://inherwords.org/submit",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
