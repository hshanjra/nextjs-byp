export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-5">
      {children}
    </section>
  );
}
