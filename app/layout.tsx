import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Loader } from "@/components/Loader";
import { ParticleField } from "@/components/ParticleField";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Children's Park Kurnool | Premium Family Destination",
  description:
    "Kurnool's premium family park. Ride, play, relax, and explore world-class attractions including Giant Wheel, Panda Train, Outdoor Mini Gym, and Yoga Zone.",
  keywords: [
    "children's park",
    "Kurnool",
    "family park",
    "amusement park",
    "Andhra Pradesh",
    "Giant Wheel",
    "Panda Train",
  ],
  openGraph: {
    title: "Children's Park Kurnool",
    description: "Where Every Smile Becomes An Adventure",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <ParticleField />
        <Loader />
        <SmoothScroll>
          <ScrollProgress />
          <CursorGlow />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
