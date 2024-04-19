import React, { useState } from 'react';
import pdf from '../../types.s';
import CreateProduct from './CreateProduct';

const jobs = [
    {
        title: "Java Backend Engineer - Zurich",
        date: "08/2022 to Present",
        company: "Fintama",
        description: [
            "Spearheaded the migration of a legacy monolithic application to a microservices architecture.",
            "Designed and implemented a real-time data processing module using Apache Kafka.",
            "Automated deployment processes using Docker and Kubernetes.",
            "Resolved critical production issues promptly."
        ]
    },
    {
        title: "Java Backend Engineer - Lenovo",
        date: "04/2021 to 08/2022",
        company: "Lenovo (Remote)",
        description: [
            "Implemented continuous integration and continuous deployment (CI/CD) pipelines using Jenkins.",
            "Worked on micro-service based software solution, license payment management.",
            "Maintained Security of Web application (Spring Security) via KeyCloak.",
            "Worked on the implementation of a message queuing system with Kafka."
        ]
    },
    {
        title: "Java FullStack Developer - IBM",
        date: "09/2020 to 04/2021",
        company: "IBM (Remote)",
        description: [
            "Created solutions for clients’ business projects and provided technical insights during the product development lifecycle.",
            "Implemented an application from scratch for a large enterprise, involving setting up Jenkins pipelines, developing reporting tools, managing Docker image builds, and streamlining deployment processes for new environments.",
            "Collaborated closely with product managers to translate business requirements into technical solutions, ensuring alignment with project goals.",
            "Actively participated in Agile development processes, contributing to sprint planning, daily stand-ups, and retrospectives to ensure project success."
        ]
    },
    {
        title: "Java Backend Developer - X",
        date: "04/2019 to 09/2020",
        company: "X (Ukraine)",
        description: [
            "Internship with deep learning of algorithms and Java Core/Servlet API.",
            "Developed a cross-platform chat-bot using IBM Assistant and worked on the front-end and back-end development of a content management system (CMS), improving user interface responsiveness.",
            "Contributed to a tenant application built on the internal framework based on Spring, focusing on robust business logic implementation and seamless integration with third-party APIs.",
            "Extended to offering software solutions and consulting services to US hospitals systems, assisted in the development of RESTful APIs for customer registration and order processing, contributing to the expansion of the platform’s functionality."
        ]
    }
];

const skills = [
    {
        title: "JAVA",
        description: "Java SE | Java EE | Spring Framework (Boot, Security, MVC) | Hibernate | Apache | Micronaut"
    },
    {
        title: "QA",
        description: "JUnit | WireMock | Mockito"
    },
    {
        title: "DB",
        description: "MySQL | PostgreSQL | Oracle | MongoDB | MSQL"
    },
    {
        title: "UI",
        description: "JavaScript | TypeScript | HTML/CSS | React | Angular"
    },
    {
        title: "CI/CD",
        description: "Jenkins | GitLab CI/CD | GitHub Actions"
    },
    {
        title: "DevOps",
        description: "Docker | Kubernetes | Helm | Scotty | AWS | Azure"
    },
    {
        title: "DevSec",
        description: "Spring Security | OAuth2 Client/Resource Server | Json Web Token | LDAP"
    },
    {
        title: "DevOps Tools",
        description: "Infrastructure as code (IaC) | Dynatrace | Prometheus | Grafana"
    },
];

<div className="skill-group">
    <h3>DevOps Tools</h3>
    <p>Infrastructure as code (IaC), automation, monitoring tools (Prometheus, Grafana)</p>
</div>
const HelloComponent = () => {
    const [showWork, setShowWork] = useState<boolean>(false)
    const [showSkill, setShowSkill] = useState<boolean>(false)
    const resumePdf = pdf("cv.pdf");

    const downloadCV = () => {
        window.open(resumePdf)
    }

    const handleShowWork = () => {
        setShowWork(!showWork)
    }

    const handleShowSkill = () => {
        setShowSkill(!showSkill)
    }


    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="px-5 container hover:cursor-default sm:min-w-full sm:p-1">
                <header className='flex flex-col justify-between align-middle min-h-40 items-stretch'>
                    <div className='flex justify-center items-center font-bold text-4xl tracking-wide min-h-28 '>Dmitry Yeshenko</div>
                    <div className='flex justify-center items-center font-mono text-xl tracking-wide min-h-20 sm:text-center'>Java Developer with expertise in designing, developing, and maintaining software applications.</div>
                    <div className='flex justify-between items-center font-mono text-xl tracking-wide min-h-20 sm:flex-col sm:min-h-96 sm:justify-around'>
                        <div className='basis-1/4 px-5 text-3xl'>Contact me:</div>
                        <div className='basis-1/4 bg-teal-500 min-h-20 flex items-center px-5 rounded-full text-white hover:cursor-pointer hover:bg-teal-400 sm:min-w-full sm:justify-center'
                            onClick={() => window.location.href = "mailto:yeshenkodmit@gmail.com"}
                        >yeshenkodmit@gmail.com</div>
                        <div className='basis-1/4 bg-teal-500 min-h-20 flex justify-center items-center px-5 rounded-full text-white hover:cursor-pointer hover:bg-teal-400 sm:min-w-full sm:justify-center'
                            onClick={downloadCV}
                        >View CV</div>
                    </div>
                </header>
                <section className="shadow-xl grid gap-5 bg-slate-100 sm:text-center ">
                    <div className={`rounded-t-lg px-5 min-h-24 flex justify-center items-center hover:cursor-pointer hover:bg-slate-300 ${showWork ? 'bg-slate-300 sticky top-0 left-0 right-0' : "bg-slate-100"}`}
                        onClick={handleShowWork}>
                        <div className='text-3xl'>Work Experience</div>
                    </div>
                    {showWork && jobs.map((job, index) => (
                        <div key={index} className="px-5 bg-slate-100 grid gap-4">
                            <div className='text-3xl'>{job.title}</div>
                            <div className='text-2xl'>{job.date}</div>
                            <div className='text-xl'>{job.company}</div>
                            <ul>
                                {job.description.map((point, i) => (
                                    <li key={i} className='leading-loose text-lg'>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
                <section className="shadow-xl grid gap-5 bg-slate-100 sm:text-center">
                    <div className={`rounded-t-lg px-5 min-h-24 flex justify-center items-center hover:cursor-pointer hover:bg-slate-300 ${showSkill ? 'bg-slate-300 sticky top-0 left-0 right-0' : "bg-slate-100"}`}
                        onClick={handleShowSkill}>
                        <div className='text-3xl'>Skills</div>
                    </div>
                    {showSkill &&
                        <div className='grid grid-cols-2 gap-4 sm:grid-cols-1'>

                            {skills.map((skill, index) => (
                                <div key={index} className="px-5 bg-slate-100 grid gap-4 min-h-40 p-7 rounded-md hover:cursor-default">
                                    <div className='text-3xl'>{skill.title}</div>
                                    <div className='text-2xl'>{skill.description}</div>
                                </div>))}
                        </div>

                    }
                </section>
                <section className="shadow-xl grid gap-5">
                    <CreateProduct />
                </section>
            </div>
        </div >
    );
}


export default HelloComponent;