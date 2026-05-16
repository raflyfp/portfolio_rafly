export default function Footer({ content }) {
    return (
        <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                <p>{content.footer_left}</p>
                <p>{content.footer_right}</p>
            </div>
        </footer>
    );
}
