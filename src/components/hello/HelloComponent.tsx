import React, { useState } from 'react';
import './display-styles.css'
import { Link } from "react-router-dom";
import pdf from '../../types.s';

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
        <div>
            <div className="landing-page">
                <header className='hello-header'>
                    <h1 className='hello-name'>Dmitry Yeshenko</h1>
                    <p className='hello-info'>Java Developer with expertise in designing, developing, and maintaining software applications.</p>
                    <p className='hello-info'>Contact me: <Link
                        to='#'
                        onClick={(e) => {
                            window.location.href = "mailto:yeshenkodmit@gmail.com";
                            e.preventDefault();
                        }}
                    >
                        yeshenkodmit@gmail.com
                    </Link></p>
                    <p className='hello-cv' onClick={downloadCV}>View CV</p>

                </header>
                <section className="work-experience">
                    <div className="hello-acc-header" onClick={handleShowWork}>
                        <h2>Work Experience</h2>
                    </div>
                    {showWork && jobs.map((job, index) => (
                        <div key={index} className="hello-job">
                            <h3>{job.title}</h3>
                            <p>{job.date}</p>
                            <p>{job.company}</p>
                            <ul>
                                {job.description.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
                <section className="skills">
                    <div className="hello-acc-header" onClick={handleShowSkill}>
                        <h2>Skills</h2>
                    </div>
                    {showSkill && <div className="skills-list">
                        <div className="skill-group">
                            <h3>Java</h3>
                            <p>Java SE, Java EE, Spring Framework (Boot, Security, MVC), Hibernate, Apache, Micronaut</p>
                        </div>
                        <div className="skill-group">
                            <h3>Testing</h3>
                            <p>JUnit, WireMock, Mockito</p>
                        </div>
                        <div className="skill-group">
                            <h3>Databases</h3>
                            <p>MySQL, PostgreSQL, Oracle, MongoDB</p>
                        </div>
                        <div className="skill-group">
                            <h3>Front-end</h3>
                            <p>JavaScript, HTML, CSS, React, Angular</p>
                        </div>
                        <div className="skill-group">
                            <h3>CI/CD</h3>
                            <p>Jenkins, GitLab CI/CD</p>
                        </div>
                        <div className="skill-group">
                            <h3>DevOps</h3>
                            <p>Docker, Kubernetes, AWS, Azure</p>
                        </div>
                        <div className="skill-group">
                            <h3>Security</h3>
                            <p>Basic, JWT, Oauth2, LDAP</p>
                        </div>
                        <div className="skill-group">
                            <h3>Performance Optimization</h3>
                            <p>Profiling, load testing, code refactoring</p>
                        </div>
                        <div className="skill-group">
                            <h3>DevOps Tools</h3>
                            <p>Infrastructure as code (IaC), automation, monitoring tools (Prometheus, Grafana)</p>
                        </div>
                    </div>}
                </section>
            </div>
        </div >
    );
}

export default HelloComponent;