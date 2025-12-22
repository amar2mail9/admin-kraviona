import { useLocation, Link } from 'react-router-dom';

const BreadcrumbHeader = () => {
    const location = useLocation();

    // 1. Split path into segments and remove empty strings
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <h1 className='text-2xl font-bold capitalize flex items-center gap-2'>
            {/* Always link to Dashboard */}
            {pathnames.length > 0 ? (
                <Link to="/" className="text-blue-600 hover:underline">Dashboard</Link>
            ) : (
                <span>Dashboard</span>
            )}

            {/* 2. Map through segments to create links */}
            {pathnames.map((name, index) => {
                // Reconstruct the path up to this point
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return (
                    <span key={name} className="flex items-center gap-2">
                        <span>{">"}</span>
                        {isLast ? (
                            // The current page (not clickable)
                            <span className="text-gray-100">
                                {name.replace(/-/g, " ")}
                            </span>
                        ) : (
                            // Parent pages (clickable)
                            <Link to={routeTo} className="text-blue-600 hover:underline">
                                {name.replace(/-/g, " ")}
                            </Link>
                        )}
                    </span>
                );
            })}
        </h1>
    );
};

export default BreadcrumbHeader;