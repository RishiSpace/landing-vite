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
    technologies: ["Python", "OpenAI , Groq , Gemini API", "NLP"]
  },
  {
    id: "osfm-markdown",
    title: "OSFM Markdown Editor",
    description: "An AI-Enhanced Open-Source Markdown Editor with a focus on Cloud-Sync and User Productivity.",
    technologies: ["React", "TypeScript", "Cloud Storage API"]
  },
  {
    id: "osfm-ata",
    title: "OSFM AI Terminal Assistant",
    description: "An AI-Enhanced Open-Source tool that leverages Natural Language Processing (NLP) to generate terminal commands.",
    technologies: ["React", "TypeScript", "Groq API"]
  },
  {
    id: "osfm-creds",
    title: "OSFM Credentials Manager",
    description: "A Local-first web-app designed to store various credentials such as API SSH GPG and Passwords",
    technologies: ["React", "TypeScript", "Groq API"]
  },
  {
    id: "universal-mute",
    title: "Universal Micropphone Mute for Windows",
    description: "A simple tool to mute/unmute your microphone globally on Windows.",
    technologies: ["C++", "Python", "Windows API"]
  },
  {
    id: "handwriting-recognition",
    title: "Handwriting Recognition",
    description: "A neural network-based system to classify and recognize handwritten characters.",
    technologies: ["Python", "TensorFlow", "Computer Vision"]
  }
];

export default projects;