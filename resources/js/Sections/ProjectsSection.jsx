import ProjectCard from '../Components/ProjectCard';
import SectionHeader from '../Components/SectionHeader';

export default function ProjectsSection({ projects }) {
    return (
        <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    eyebrow="Projects"
                    title="Showcase project dengan preview video."
                    description="Kumpulan project fullstack yang menonjolkan dashboard, automation, data processing, dan management system."
                />

                <div className="grid gap-6 lg:grid-cols-2">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.name} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
