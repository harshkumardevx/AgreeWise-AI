import { Link } from "react-router-dom";
import { Home, LayoutDashboard } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">

      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-extrabold text-primary">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-foreground">
          Page Not Found
        </h2>

        <p className="mt-3 text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90 transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-foreground font-medium hover:bg-secondary transition"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;