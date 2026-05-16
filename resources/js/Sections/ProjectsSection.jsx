import ProjectCard from '../Components/ProjectCard';
import SectionHeader from '../Components/SectionHeader';

export default function ProjectsSection({ projects, content, skillLogos }) {
    return (
        <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    eyebrow={content.projects_eyebrow}
                    title={content.projects_title}
                    description={content.projects_description}
                />

                <div className="grid gap-6 lg:grid-cols-2">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.name} project={project} index={index} skillLogos={skillLogos} />
                    ))}
                </div>
            </div>
        </section>
    );
}
