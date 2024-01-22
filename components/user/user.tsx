import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function UserComponent() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
      {user ? (
        <div className="flow-root">
          <p className="-m-2 block p-2 font-medium text-gray-900">
            {user.email}
          </p>
        </div>
      ) : (
        <>
          <div className="flow-root">
            <Link
              href="/login"
              className="-m-2 block p-2 font-medium text-gray-900"
            >
              Create an account
            </Link>
          </div>
          <div className="flow-root">
            <Link
              href="/login"
              className="-m-2 block p-2 font-medium text-gray-900"
            >
              Sign in
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
