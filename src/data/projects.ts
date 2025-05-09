export interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: "osfm",
    title: "OSFM",
    description: "An efficient server-client tool with a modern UI to manage installations, RDP, and more.",
    technologies: ["Python", "React", "Socket.IO"]
  },
  {
    id: "fastwrite",
    title: "FastWrite",
    description: "A python package for generating AI-based code documentation and data flow diagrams with support for Various LLM Providers.",
    technologies: ["Python", "OpenAI API", "NLP"]
  },
  {
    id: "osfm-markdown",
    title: "OSFM Markdown Editor",
    description: "An AI-Enhanced Open-Source Markdown Editor with a focus on Cloud-Sync and User Productivity.",
    technologies: ["React", "TypeScript", "Cloud Storage API"]
  },
  {
    id: "handwriting-recognition",
    title: "Handwriting Recognition",
    description: "A neural network-based system to classify and recognize handwritten characters.",
    technologies: ["Python", "TensorFlow", "Computer Vision"]
  },
  {
    id: "project-5",
    title: "AI Research Tool",
    description: "A tool that uses natural language processing to help researchers find relevant papers and citations.",
    technologies: ["Python", "NLP", "React"]
  },
  {
    id: "project-6",
    title: "Smart Home System",
    description: "An IoT system for monitoring and controlling home devices with voice commands and mobile app.",
    technologies: ["IoT", "React Native", "Node.js"]
  },
  {
    id: "project-7",
    title: "Blockchain Wallet",
    description: "A secure digital wallet for cryptocurrency transactions with multi-factor authentication.",
    technologies: ["Blockchain", "React", "Cryptography"]
  },
  {
    id: "project-8",
    title: "Health Monitoring App",
    description: "A mobile application that tracks health metrics and provides personalized recommendations.",
    technologies: ["React Native", "Machine Learning", "Health APIs"]
  }
];

export default projects;