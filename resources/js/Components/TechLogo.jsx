import { Code2 } from 'lucide-react';

export default function TechLogo({ name, logoUrl, className = 'h-5 w-5' }) {
    if (logoUrl) {
        return <img src={logoUrl} alt={`${name} logo`} className={`${className} object-contain`} loading="lazy" />;
    }

    return <Code2 className={className} />;
}
