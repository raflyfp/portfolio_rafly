import Navbar from '../Components/Navbar';

export default function PortfolioLayout({ children, cvFiles = [] }) {
    return (
        <div className="min-h-screen overflow-hidden bg-[#050506] text-white antialiased">
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute right-[-10rem] top-[20rem] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
                <div className="absolute bottom-[-12rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_32%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px]" />
            </div>

            <Navbar cvFiles={cvFiles} />
            <main className="relative z-10">{children}</main>
        </div>
    );
}
