export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='min-h-screen flex justify-center items-center bg-linear-120 from-20% from-sky-200 to-sky-900'>
      {children}
    </main>
  );
}
