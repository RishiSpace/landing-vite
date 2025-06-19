import React from 'react';
import projects from '../data/projects';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom'; // <-- Add this import

// Button component
const Button = ({ children, className = '', asChild = false, ...props }: any) =>
  asChild ? React.cloneElement(children, { className }) : <button className={className} {...props}>{children}</button>;

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  children?: React.ReactNode;
}

const ProjectCard = ({
  title,
  subtitle,
  description,
  features,
  liveUrl,
  githubUrl,
  technologies,
  children
}: ProjectCardProps) => {
  return (
    <div className="feature-card flex flex-col min-w-[280px] bg-[#181818] border border-[#232323] rounded-xl p-6 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        {subtitle && <p className="text-blue-500 font-medium mb-4">{subtitle}</p>}
        <p className="text-gray-300 mb-4">{description}</p>
        {children}
      </div>

      {features.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {technologies && technologies.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-500/10 text-blue-500 text-sm rounded-full border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
        {liveUrl && (
          <Button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded flex-1 flex items-center justify-center" asChild>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Try Now
            </a>
          </Button>
        )}
        {githubUrl && (
          <Button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 px-4 rounded flex-1 flex items-center justify-center" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

// OSFM umbrella projects
const osfmProjects = [
  {
    id: "osfm-net",
    title: "OSFM Network Manager",
    url: "https://rishisp.tech/osfm"
  },
  {
    id: "osfm-markdown",
    title: "OSFM Markdown Editor",
    url: "https://osfm-md.rishisp.tech"
  },
  {
    id: "osfm-ata",
    title: "OSFM AI Terminal Assistant",
    url: "https://osfm-ata.rishisp.tech"
  },
  {
    id: "osfm-creds",
    title: "OSFM Credentials Manager",
    url: "https://osfm-creds.rishisp.tech"
  }
];

const projectFeatures: Record<string, string[]> = {
  "osfm-net": [
    "Modern UI for server management",
    "Remote Desktop Protocol (RDP) integration",
    "Efficient client-server communication"
  ],
  fastwrite: [
    "AI-based code documentation",
    "Data flow diagram generation",
    "Supports multiple LLM providers"
  ],
  "osfm-markdown": [
    "Cloud-sync for markdown files",
    "AI-enhanced editing",
    "User productivity features"
  ],
  "osfm-ata": [
    "NLP-powered terminal command generation",
    "Open-source and extensible",
    "Easy integration with terminals"
  ],
  "osfm-creds": [
    "Local-first credential storage",
    "Supports API, SSH, GPG, and passwords",
    "Secure and user-friendly"
  ],
  "universal-mute": [
    "Global microphone mute/unmute",
    "Simple and lightweight",
    "Works on Windows"
  ],
  "handwriting-recognition": [
    "Neural network-based recognition",
    "Supports handwritten characters",
    "Uses TensorFlow and Computer Vision"
  ]
};

const projectLinks: Record<string, { liveUrl?: string; githubUrl?: string }> = {
  "osfm-net": { liveUrl: "https://rishisp.tech/osfm", githubUrl: "https://github.com/RishiSpace/osfm" },
  fastwrite: { liveUrl: "https://fastwrite-py.vercel.app", githubUrl: "https://github.com/RishiSpace/fastwrite" },
  "osfm-markdown": { liveUrl: "https://osfm-md.rishisp.tech", githubUrl: "https://github.com/RishiSpace/osfm-markdown" },
  "osfm-ata": { liveUrl: "https://osfm-ata.rishisp.tech", githubUrl: "https://github.com/RishiSpace/osfm-ata" },
  "osfm-creds": { liveUrl: "https://osfm-creds.rishisp.tech", githubUrl: "https://github.com/RishiSpace/osfm-creds" },
  "universal-mute": { githubUrl: "https://github.com/RishiSpace/universal-mute" },
//   "handwriting-recognition": { githubUrl: "https://github.com/RishiSpace/handwriting-recognition" }
};

const Projects: React.FC = () => {
  return (
    <section className="section min-h-screen bg-[#181818] py-12" id="projects">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-blue-500 mb-10 text-center">My Projects</h2>
        
        {/* OSFM Umbrella Card */}
        <div className="mb-12">
          <ProjectCard
            title="OSFM"
            subtitle="A suite of open-source productivity and management tools"
            description="OSFM is an umbrella of modern, AI-enhanced, and productivity-focused tools for developers and power users. Explore the OSFM ecosystem:"
            features={[
              "Unified design and experience",
              "AI-powered enhancements",
              "Open-source and extensible"
            ]}
            liveUrl="https://osfm.rishisp.tech/"
          >
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Included Projects</h4>
              <ul className="space-y-2">
                {osfmProjects.map((proj) => (
                  <li key={proj.id} className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-osfm-accentBlue hover:underline"
                    >
                      {proj.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ProjectCard>
        </div>

        {/* Other Projects */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {projects
            .filter(
              (project) =>
                !["osfm", "osfm-markdown", "osfm-ata", "osfm-creds"].includes(project.id)
            )
            .map((project) => {
              const id = project.id === "osfm" ? "osfm-net" : project.id;
              return (
                <ProjectCard
                  key={id}
                  title={project.title}
                  subtitle={project.technologies?.join(', ') || ''}
                  description={project.description}
                  features={projectFeatures[id] || []}
                  technologies={project.technologies}
                  liveUrl={projectLinks[id]?.liveUrl}
                  githubUrl={projectLinks[id]?.githubUrl}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Projects;