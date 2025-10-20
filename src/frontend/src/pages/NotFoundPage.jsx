import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--gradient-primary)' }}>
            <div className="text-center px-4">
                <h1 className="text-9xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>404</h1>
                <h2 className="text-3xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                    Page Not Found
                </h2>
                <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 text-white rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        style={{ backgroundColor: 'var(--color-primary-start)' }}
                    >
                        Go to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border-2 rounded-lg transition-all hover:scale-105"
                        style={{
                            borderColor: 'var(--color-primary-start)',
                            color: 'var(--color-primary-start)',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
