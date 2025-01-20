export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full bg-amber-50 flex flex-col justify-center items-center">
      {children}
    </main>
  );
}
