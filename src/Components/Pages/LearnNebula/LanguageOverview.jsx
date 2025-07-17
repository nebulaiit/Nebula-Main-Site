import React, { useEffect, useRef, useState } from 'react';
import './LanguageOverview.css';
import { useSelector } from 'react-redux';

const LanguageOverview = () => {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);
    const darkMode = useSelector((state) => state.darkMode.enabled);    


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const language = {
        name: 'Python',
        briefHistory: 'Python was created by Guido van Rossum in 1991...',
        realLifeUses: ['Web Development', 'Machine Learning', 'Data Analysis'],
        useCases: ['AI Systems', 'Web APIs', 'Automation Tools'],
        careerPaths: ['Backend Developer', 'Data Scientist'],
        frameworks: ['Django', 'Flask'],
        libraries: ['NumPy', 'Pandas'],
        companies: ['Google', 'Netflix'],
        roadmap: [
            { level: 'Beginner', details: 'Syntax, Variables' },
            { level: 'Intermediate', details: 'OOP, File Handling' },
            { level: 'Advanced', details: 'Async IO, ML' }
        ],
        communityLinks: [
            { name: 'StackOverflow', url: 'https://stackoverflow.com' },
            { name: 'Reddit', url: 'https://reddit.com' }
        ],
        projects: [
            { name: 'Django Blog', url: 'https://github.com/user/blog' }
        ]
    };

    return (
        <div className={`language-overview ${inView ? 'in-view' : ''} ${darkMode ? 'dark' : ''}`} ref={sectionRef}>
            {/* About Section */}
            <section className="overview-section">
                <h2>💡 About {language.name}</h2>
                <p>{language.briefHistory}</p>
                <div className="card-row">
                    {[
                        { title: '🧩 Real-life Applications', items: language.realLifeUses },
                        { title: '🚀 Best Use Cases', items: language.useCases },
                        { title: '💼 Career Paths', items: language.careerPaths }
                    ].map((card, idx) => (
                        <div
                            className="info-card"
                            key={idx}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            <h3>{card.title}</h3>
                            <ul>{card.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
                        </div>
                    ))} </div>
            </section>

            {/* Tools */}
            <section className="overview-section">
                <h2>🛠️ Tools & Ecosystem</h2>
                <div className="card-row">
                    <div className="info-card"><h3>Frameworks</h3><ul>{language.frameworks.map((fw, i) => <li key={i}>{fw}</li>)}</ul></div>
                    <div className="info-card"><h3>Popular Libraries</h3><ul>{language.libraries.map((lib, i) => <li key={i}>{lib}</li>)}</ul></div>
                    <div className="info-card"><h3>Companies Using {language.name}</h3><ul>{language.companies.map((comp, i) => <li key={i}>{comp}</li>)}</ul></div>
                </div>
            </section>

            {/* Roadmap */}
            <section className="overview-section">
                <h2>🧭 Learning Roadmap</h2>
                <div className="roadmap">
                    {language.roadmap.map((step, i) => (
                        <div
                            className="roadmap-step"
                            key={i}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <h4>{step.level}</h4>
                            <p>{step.details}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Community */}
            <section className="overview-section">
                <h2>🌐 Community & Real Projects</h2>
                <div className="card-row">
                    <div className="info-card">
                        <h3>Community Links</h3>
                        <ul>
                            {language.communityLinks.map((link, i) => (
                                <li key={i}><a href={link.url} target="_blank" rel="noreferrer">{link.name}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="info-card">
                        <h3>Featured Projects</h3>
                        <ul>
                            {language.projects.map((proj, i) => (
                                <li key={i}><a href={proj.url} target="_blank" rel="noreferrer">{proj.name}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LanguageOverview;
