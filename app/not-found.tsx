import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', background: '#0a0a0c', color: '#fff' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 900, color: '#00A859', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '2rem', margin: '15px 0' }}>Oops! Page Not Found</h2>
      <p style={{ color: '#8b949e', fontSize: '1rem', maxWidth: '500px', marginBottom: '30px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/" className="btn" style={{ padding: '12px 30px', borderRadius: '50px', textDecoration: 'none' }}>
        Back to Home <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
      </Link>
    </div>
  );
}