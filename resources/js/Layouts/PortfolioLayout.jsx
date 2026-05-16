import Navbar from '../Components/Navbar';
import SpaceBackground from '../Components/SpaceBackground';
import SpaceCursor from '../Components/SpaceCursor';

export default function PortfolioLayout({ children, cvFiles = [] }) {
    return (
        <div className="min-h-screen overflow-hidden bg-[#050506] text-white antialiased">
            <SpaceBackground />
            <SpaceCursor />

            <Navbar cvFiles={cvFiles} />
            <main className="relative z-10">{children}</main>
        </div>
    );
}
