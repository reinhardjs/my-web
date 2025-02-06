import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import FloatingNav from '../components/FloatingNav';
import Modal from '../components/Modal';
import { IoIosArrowDown } from 'react-icons/io';
import { GiArtificialIntelligence } from "react-icons/gi";
import { SiKubernetes } from "react-icons/si";
import { FaCross } from "react-icons/fa6";
import { IoServer } from "react-icons/io5";

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showExperience, setShowExperience] = useState(false);

  const scrollToLearning = () => {
    document.getElementById('learning-journey').scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Full Height Hero Section */}
      <section className="h-[calc(100vh-128px)] flex flex-col justify-center items-center bg-white relative">
        <div className="text-center mt-[-96px] md:mt-[-86px]">
          <h1 className="text-xl md:text-4xl font-semibold text-black py-4">Hello 👋 I&apos;m</h1>
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 mt-0">Reinhard Jonathan Silalahi</h2>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto px-4">
            Software Engineer specializing in Backend Development, Cloud-native solution, and Artificial Intelligence Engineering
          </p>
        </div>

        {/* Bouncing Arrow */}
        <button
          onClick={scrollToLearning}
          className="absolute bottom-5 lg:bottom-8 animate-bounce p-2 rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Scroll to Learning Journey"
        >
          <IoIosArrowDown className="w-10 h-10 text-gray-600" />
        </button>
      </section>

      {/* Learning Journey Categories */}
      <section id="learning-journey" className="min-h-screen py-8 lg:py-14 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Learning Journey</h2>
        <div className="flex flex-wrap gap-8 max-w-6xl mx-auto justify-center">
          {/* <div className={styles.grid}> */}
          {categories.map((category) => (
            <Link href={category.href} key={category.title}>
              <div className="w-full sm:w-1/3 md:w-1/4 border rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                {/* <div className={styles.card}> */}
                <div className="flex flex-col items-center text-center">
                  {category.icon}
                  <h3 className="text-xl font-bold mb-2 mt-4">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* <FloatingNav
        setShowPortfolio={setShowPortfolio}
        setShowExperience={setShowExperience}
      /> */}

      {/* Experience Modal */}
      <Modal
        isOpen={showExperience}
        onClose={() => setShowExperience(false)}
        title="Work Experience"
      >
        <div className="grid gap-6">
          {workExperience.map((job, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={job.logo}
                    alt={job.company}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{job.company}</h3>
                  <p className="text-gray-600">{job.position}</p>
                  <p className="text-gray-500 text-sm">{job.period}</p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {job.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Portfolio Modal */}
      <Modal
        isOpen={showPortfolio}
        onClose={() => setShowPortfolio(false)}
        title="Portfolio Projects"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Project →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

const categories = [
  {
    title: "Jesus",
    description: "Come to know that Jesus the savior",
    href: "/learn-jesus",
    icon: <FaCross className="w-12 h-12 text-gray-600" />
  },
  {
    title: "Backend",
    description: "Learn about API design, databases, and server architecture",
    href: "/learn-backend",
    icon: <IoServer className="w-12 h-12 text-gray-600" />
  },
  {
    title: "Kubernetes",
    description: "Explore container orchestration and cloud-native technologies",
    href: "/learn-kubernetes",
    icon: <SiKubernetes className="w-12 h-12 text-gray-600" />
  },
  {
    title: "Machine Learning",
    description: "Dive into AI, data science, and predictive modeling",
    href: "/learn-machine-learning",
    icon: <GiArtificialIntelligence className="w-12 h-12 text-gray-600" />
  }
];

const projects = [
  {
    title: "AI-Powered Analytics Platform",
    description: "A machine learning platform that analyzes user behavior and provides actionable insights.",
    image: "/images/project1.jpg",
    technologies: ["Python", "TensorFlow", "React", "AWS"],
    link: "https://github.com/yourusername/project1"
  },
  {
    title: "Kubernetes Management Tool",
    description: "A web-based tool for managing and monitoring Kubernetes clusters.",
    image: "/images/project2.jpg",
    technologies: ["Go", "Kubernetes", "Vue.js", "Docker"],
    link: "https://github.com/yourusername/project2"
  },
  {
    title: "Microservices Backend Framework",
    description: "A scalable backend framework for building microservices applications.",
    image: "/images/project3.jpg",
    technologies: ["Node.js", "gRPC", "Redis", "MongoDB"],
    link: "https://github.com/yourusername/project3"
  },
];

const workExperience = [
  {
    company: "Company Name 1",
    position: "Senior Software Engineer",
    period: "Jan 2022 - Present",
    logo: "/images/company1-logo.png",
    responsibilities: [
      "Led backend development team of 5 engineers",
      "Implemented microservices architecture using Node.js and Kubernetes",
      "Reduced system latency by 40% through optimization",
    ],
    technologies: ["Node.js", "Kubernetes", "MongoDB", "AWS"]
  },
  {
    company: "Company Name 2",
    position: "Software Engineer",
    period: "Jun 2020 - Dec 2021",
    logo: "/images/company2-logo.png",
    responsibilities: [
      "Developed RESTful APIs for mobile applications",
      "Implemented CI/CD pipelines using Jenkins",
      "Collaborated with cross-functional teams for product delivery",
    ],
    technologies: ["Python", "Django", "PostgreSQL", "Docker"]
  },
];

