import { Poppins } from "next/font/google";
import "./globals.css";
import { BaseProvider } from "@/context/base-context";
import Providers from "@/context/query-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appConfig = {
    ServiceBaseUrl: `${process.env.ServiceBaseUrl}/api/v1` || "",
    GoogleClientId: process.env.GoogleClientId || "",
    GoogleMapKey: process.env.GoogleMapKey || "",
  };

  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Providers>
          <BaseProvider appConfig={appConfig}>{children}</BaseProvider>
        </Providers>
      </body>
    </html>
  );
}
