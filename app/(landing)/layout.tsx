export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-screen flex">{children}</main>;
}
