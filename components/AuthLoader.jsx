// components/AuthLoader.jsx
import { Loader2, ShieldCheck } from "lucide-react";

export default function AuthLoader({ status = "loading" }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
      {status === "loading" && (
        <>
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-gray-600 text-sm">
            Checking authentication…
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <ShieldCheck className="h-12 w-12 text-green-600 animate-pulse" />
          <p className="text-green-600 font-medium">
            Authentication successful
          </p>
        </>
      )}
    </div>
  );
}
