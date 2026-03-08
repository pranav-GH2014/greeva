import { signup } from '@/app/signup/actions'

export default function Signup({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] p-4 bg-[#FAF9F6]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Join Greeva</h2>
        
        {/* Show errors from the URL if signup fails */}
        {searchParams?.error && (
          <p className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm text-center">
            {searchParams.error}
          </p>
        )}

        <form action={signup} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-lg border border-gray-200 text-black outline-none focus:border-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Create Password"
            required
            className="w-full p-3 rounded-lg border border-gray-200 text-black outline-none focus:border-blue-500"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full p-3 rounded-lg border border-gray-200 text-black outline-none focus:border-blue-500"
          />
          <button 
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition shadow-lg"
          >
            Create Account
          </button>
        </form>
      </div>
    </section>
  )
}