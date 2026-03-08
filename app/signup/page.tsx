import Signup from '@/components/Signup';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Await the searchParams before passing them to the component
  const resolvedParams = await searchParams;

  return (
    <main className="bg-[#FAF9F6] min-h-screen">
      {/* Pass the resolved searchParams to the component */}
      <Signup searchParams={resolvedParams} />
    </main>
  );
}