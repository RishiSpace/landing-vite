export interface Certificate {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
}

const certificates: Certificate[] = [
  {
    id: "cpp-fundamentals",
    title: "C++ Fundamentals",
    issuer: "Coursera",
    date: "2021"
  },
  {
    id: "python-data-science",
    title: "Python for Data Science",
    issuer: "Udemy",
    date: "2021"
  },
  {
    id: "azure-active-directory",
    title: "Azure Active Directory",
    issuer: "Microsoft",
    date: "2022"
  },
  {
    id: "accenture-developer",
    title: "Accenture Developer Program",
    issuer: "Accenture",
    date: "2022"
  },
  {
    id: "oracle-ai",
    title: "Oracle AI Certification",
    issuer: "Oracle",
    date: "2022"
  },
  {
    id: "r-programming",
    title: "R Programming",
    issuer: "DataCamp",
    date: "2022"
  },
  {
    id: "data-science-ybi",
    title: "Data Science Course - YBI",
    issuer: "YBI Foundation",
    date: "2023"
  },
  {
    id: "machine-learning-ybi",
    title: "Machine Learning Course - YBI",
    issuer: "YBI Foundation",
    date: "2023"
  }
];

export default certificates;