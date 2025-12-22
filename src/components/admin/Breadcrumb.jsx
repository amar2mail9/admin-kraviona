import { Link, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

const Breadcrumb = () => {
    const location = useLocation();

    const pathnames = location.pathname
        .split("/")
        .filter(Boolean);

    // Home only
    if (pathnames.length === 0) {
        return (
            <Dashboard />
        );
    }

    return (
        <nav className="flex items-center text-sm text-gray-400">
            <Link to="/" className="hover:text-white font-medium">
                Dashboard
            </Link>

            {pathnames.map((value, index) => {
                const to = "/" + pathnames.slice(0, index + 1).join("/");
                const isLast = index === pathnames.length - 1;

                const label = value
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, c => c.toUpperCase());

                return (
                    <span key={to} className="flex items-center">
                        <span className="mx-2">›</span>

                        {isLast ? (
                            <span className="font-semibold text-white">
                                {label}
                            </span>
                        ) : (
                            <Link
                                to={to}
                                className="hover:text-white font-medium"
                            >
                                {label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
