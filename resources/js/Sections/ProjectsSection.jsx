import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SectionHeader from '../Components/SectionHeader';

const ProjectCard = lazy(() => import('../Components/ProjectCard'));

function ProjectSkeleton() {
    return (
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="aspect-video bg-white/[0.04]" />
            <div className="p-6 sm:p-7">
                <div className="h-6 w-2/3 rounded-full bg-white/[0.08]" />
                <div className="mt-5 grid gap-3">
                    <div className="h-3 rounded-full bg-white/[0.06]" />
                    <div className="h-3 w-5/6 rounded-full bg-white/[0.06]" />
                    <div className="h-3 w-3/4 rounded-full bg-white/[0.06]" />
                </div>
            </div>
        </div>
    );
}

export default function ProjectsSection({ projects, content, skillLogos }) {
    const sectionRef = useRef(null);
    const [shouldRenderProjects, setShouldRenderProjects] = useState(false);

    useEffect(() => {
        if (shouldRenderProjects || !sectionRef.current) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRenderProjects(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '420px 0px' },
        );

        observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, [shouldRenderProjects]);

    return (
        <section ref={sectionRef} id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[96rem]">
                <SectionHeader
                    eyebrow={content.projects_eyebrow}
                    title={content.projects_title}
                    description={content.projects_description}
                />

                <div className="grid gap-6 lg:grid-cols-2">
                    {shouldRenderProjects ? (
                        <Suspense fallback={projects.map((project) => <ProjectSkeleton key={project.name} />)}>
                            {projects.map((project, index) => (
                                <ProjectCard key={project.name} project={project} index={index} skillLogos={skillLogos} />
                            ))}
                        </Suspense>
                    ) : (
                        projects.map((project) => <ProjectSkeleton key={project.name} />)
                    )}
                </div>
            </div>
        </section>
    );
}
