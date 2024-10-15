export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full bg-[url('/img/books.jpg')] bg-cover flex flex-col justify-center items-center">
      {children}
    </main>
  );
}
