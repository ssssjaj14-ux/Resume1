import { saveAs } from 'file-saver';

export interface PortfolioData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin?: string;
    github?: string;
  };
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link?: string;
    image?: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
}

const portfolioTemplates = {
  modern: {
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    backgroundColor: '#F8FAFC',
    textColor: '#1E293B',
    cardBackground: '#FFFFFF',
    animations: 'fadeInUp, slideIn, bounce'
  },
  creative: {
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    backgroundColor: '#0F0F23',
    textColor: '#F1F5F9',
    cardBackground: '#1E1E3F',
    animations: 'morphing, colorShift, pulse'
  },
  developer: {
    primaryColor: '#10B981',
    secondaryColor: '#06B6D4',
    backgroundColor: '#111827',
    textColor: '#F9FAFB',
    cardBackground: '#1F2937',
    animations: 'typewriter, codeHighlight, matrix'
  },
  pixelport: {
    primaryColor: '#FF6B6B',
    secondaryColor: '#4ECDC4',
    backgroundColor: '#F8F9FA',
    textColor: '#2C3E50',
    cardBackground: '#FFFFFF',
    animations: 'pixelTransition, glitch, retro'
  },
  neowave: {
    primaryColor: '#667EEA',
    secondaryColor: '#764BA2',
    backgroundColor: '#0F0F23',
    textColor: '#FFFFFF',
    cardBackground: '#1E1E3F',
    animations: 'waveEffect, neon, flow'
  },
  aurastack: {
    primaryColor: '#00D4FF',
    secondaryColor: '#5B73FF',
    backgroundColor: '#0A0A0A',
    textColor: '#FFFFFF',
    cardBackground: '#1F2937',
    animations: 'auraGlow, stackEffect, hologram'
  },
  glintlab: {
    primaryColor: '#718096',
    secondaryColor: '#4A5568',
    backgroundColor: '#FFFFFF',
    textColor: '#2D3748',
    cardBackground: '#F7FAFC',
    animations: 'metallic, reflection, precision'
  },
  craftfolio: {
    primaryColor: '#D69E2E',
    secondaryColor: '#B7791F',
    backgroundColor: '#FFFAF0',
    textColor: '#2D3748',
    cardBackground: '#FFFFFF',
    animations: 'handcrafted, organic, artistic'
  },
  skytrail: {
    primaryColor: '#3182CE',
    secondaryColor: '#2C5282',
    backgroundColor: '#EBF8FF',
    textColor: '#2D3748',
    cardBackground: '#FFFFFF',
    animations: 'cloudFloat, skyGradient, horizon'
  },
  vantaport: {
    primaryColor: '#805AD5',
    secondaryColor: '#6B46C1',
    backgroundColor: '#1A202C',
    textColor: '#F7FAFC',
    cardBackground: '#2D3748',
    animations: 'vantaWaves, particle, dynamic'
  }
};

export const generatePortfolioHTML = (data: PortfolioData, template: string = 'modern'): string => {
  const theme = portfolioTemplates[template as keyof typeof portfolioTemplates] || portfolioTemplates.modern;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name} - Professional Portfolio</title>
    <meta name="description" content="${data.personalInfo.name} - ${data.personalInfo.summary || 'Professional Portfolio showcasing skills, projects, and experience'}">
    <meta name="keywords" content="${data.skills.join(', ')}, portfolio, ${data.personalInfo.name}, developer, professional">
    <meta name="author" content="${data.personalInfo.name}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${data.personalInfo.name} - Professional Portfolio">
    <meta property="og:description" content="${data.personalInfo.summary || 'Professional Portfolio showcasing skills, projects, and experience'}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.personalInfo.name.toLowerCase().replace(/\s+/g, '')}.github.io">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${data.personalInfo.name} - Professional Portfolio">
    <meta name="twitter:description" content="${data.personalInfo.summary || 'Professional Portfolio showcasing skills, projects, and experience'}">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "${data.personalInfo.name}",
      "jobTitle": "${data.experience[0]?.title || 'Professional'}",
      "email": "${data.personalInfo.email}",
      "telephone": "${data.personalInfo.phone}",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${data.personalInfo.location}"
      },
      "sameAs": [
        "${data.personalInfo.linkedin || ''}",
        "${data.personalInfo.github || ''}"
      ],
      "knowsAbout": [${data.skills.map(skill => `"${skill}"`).join(', ')}]
    }
    </script>
    
    <style>
        :root {
            --primary-color: ${theme.primaryColor};
            --secondary-color: ${theme.secondaryColor};
            --background-color: ${theme.backgroundColor};
            --text-color: ${theme.textColor};
            --card-background: ${theme.cardBackground};
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Enhanced Hero Section */
        .hero {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            padding: 120px 0;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            animation: grain 20s linear infinite;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
        }
        
        .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            margin-bottom: 1rem;
            animation: heroSlideUp 1s ease-out;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .hero .subtitle {
            font-size: clamp(1rem, 2.5vw, 1.5rem);
            opacity: 0.95;
            max-width: 600px;
            margin: 0 auto 2rem;
            animation: heroSlideUp 1s ease-out 0.2s both;
        }
        
        .contact-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            flex-wrap: wrap;
            animation: heroSlideUp 1s ease-out 0.4s both;
        }
        
        .contact-links a {
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            background: rgba(255,255,255,0.1);
        }
        
        .contact-links a:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        
        /* Enhanced Sections */
        .section {
            padding: 100px 0;
            position: relative;
        }
        
        .section h2 {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 700;
            text-align: center;
            margin-bottom: 4rem;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
        }
        
        .section h2::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 2px;
        }
        
        /* Enhanced Skills Grid */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .skill-tag {
            background: var(--card-background);
            padding: 2rem 1.5rem;
            border-radius: 20px;
            text-align: center;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.4s ease;
            border: 1px solid rgba(255,255,255,0.1);
            position: relative;
            overflow: hidden;
        }
        
        .skill-tag::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.5s ease;
        }
        
        .skill-tag:hover::before {
            left: 100%;
        }
        
        .skill-tag:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        /* Enhanced Projects Grid */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 3rem;
            margin-top: 3rem;
        }
        
        .project-card {
            background: var(--card-background);
            border-radius: 25px;
            padding: 2.5rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            transition: all 0.4s ease;
            border: 1px solid rgba(255,255,255,0.1);
            overflow: hidden;
            position: relative;
        }
        
        .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        }
        
        .project-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 30px 60px rgba(0,0,0,0.15);
        }
        
        .project-card h3 {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
        
        .project-card p {
            margin-bottom: 2rem;
            opacity: 0.8;
            line-height: 1.7;
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-bottom: 2rem;
        }
        
        .tech-tag {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 0.5rem 1.25rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .project-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            padding: 0.75rem 1.5rem;
            border: 2px solid var(--primary-color);
            border-radius: 30px;
            background: transparent;
        }
        
        .project-link:hover {
            background: var(--primary-color);
            color: white;
            transform: translateX(5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        
        /* Enhanced Experience Timeline */
        .experience-timeline {
            position: relative;
            margin-top: 3rem;
        }
        
        .experience-timeline::before {
            content: '';
            position: absolute;
            left: 30px;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
            border-radius: 2px;
        }
        
        .experience-item {
            background: var(--card-background);
            padding: 3rem;
            border-radius: 25px;
            margin-bottom: 3rem;
            margin-left: 80px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            border-left: 5px solid var(--primary-color);
            transition: all 0.4s ease;
            position: relative;
        }
        
        .experience-item::before {
            content: '';
            position: absolute;
            left: -88px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            border: 4px solid var(--background-color);
            box-shadow: 0 0 0 3px var(--primary-color);
        }
        
        .experience-item:hover {
            transform: translateX(15px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        
        .experience-item h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        
        .experience-item .company {
            font-weight: 600;
            font-size: 1.2rem;
            opacity: 0.8;
            margin-bottom: 0.5rem;
        }
        
        .experience-item .duration {
            font-size: 0.95rem;
            opacity: 0.7;
            margin-bottom: 1.5rem;
            padding: 0.5rem 1rem;
            background: rgba(var(--primary-color), 0.1);
            border-radius: 20px;
            display: inline-block;
        }
        
        /* Enhanced Education Grid */
        .education-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2.5rem;
            margin-top: 3rem;
        }
        
        .education-card {
            background: var(--card-background);
            padding: 2.5rem;
            border-radius: 25px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            transition: all 0.4s ease;
            border-top: 5px solid var(--secondary-color);
            position: relative;
            overflow: hidden;
        }
        
        .education-card::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, var(--secondary-color), transparent);
            opacity: 0.1;
            border-radius: 0 0 0 100px;
        }
        
        .education-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        
        .education-card h3 {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--secondary-color);
            margin-bottom: 0.5rem;
        }
        
        /* Enhanced Footer */
        .footer {
            background: var(--card-background);
            padding: 5rem 0 3rem;
            text-align: center;
            margin-top: 5rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            position: relative;
        }
        
        .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
        }
        
        .footer p {
            opacity: 0.7;
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }
        
        .footer-links a {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            padding: 0.5rem 1rem;
            border-radius: 10px;
        }
        
        .footer-links a:hover {
            background: rgba(var(--primary-color), 0.1);
            transform: translateY(-2px);
        }
        
        /* Enhanced Animations */
        @keyframes heroSlideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes grain {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -5%); }
            20% { transform: translate(-10%, 5%); }
            30% { transform: translate(5%, -10%); }
            40% { transform: translate(-5%, 15%); }
            50% { transform: translate(-10%, 5%); }
            60% { transform: translate(15%, 0%); }
            70% { transform: translate(0%, 15%); }
            80% { transform: translate(-15%, 10%); }
            90% { transform: translate(10%, 5%); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        /* Template-specific animations */
        ${template === 'pixelport' ? `
        @keyframes pixelGlitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
        }
        .skill-tag:hover { animation: pixelGlitch 0.3s ease-in-out; }
        ` : ''}
        
        ${template === 'neowave' ? `
        @keyframes neonPulse {
            0%, 100% { box-shadow: 0 0 20px var(--primary-color); }
            50% { box-shadow: 0 0 40px var(--primary-color), 0 0 60px var(--secondary-color); }
        }
        .project-card:hover { animation: neonPulse 2s ease-in-out infinite; }
        ` : ''}
        
        ${template === 'aurastack' ? `
        @keyframes auraGlow {
            0%, 100% { filter: drop-shadow(0 0 20px var(--primary-color)); }
            50% { filter: drop-shadow(0 0 40px var(--secondary-color)); }
        }
        .hero { animation: auraGlow 4s ease-in-out infinite; }
        ` : ''}
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .container { padding: 0 15px; }
            .hero { padding: 80px 0; }
            .section { padding: 60px 0; }
            .projects-grid { grid-template-columns: 1fr; }
            .education-grid { grid-template-columns: 1fr; }
            .skills-grid { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
            .experience-item { margin-left: 40px; padding: 2rem; }
            .experience-timeline::before { left: 15px; }
            .experience-item::before { left: -48px; }
            .contact-links { flex-direction: column; align-items: center; }
            .footer-links { flex-direction: column; gap: 1rem; }
        }
        
        @media (max-width: 480px) {
            .hero h1 { font-size: 2rem; }
            .hero .subtitle { font-size: 1rem; }
            .section h2 { font-size: 1.8rem; }
            .project-card, .education-card, .experience-item { padding: 1.5rem; }
            .skills-grid { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
        }
        
        /* Print Styles */
        @media print {
            .hero { background: white !important; color: black !important; }
            .contact-links a { border-color: black !important; color: black !important; }
            .section { page-break-inside: avoid; }
            .project-card, .education-card, .experience-item { 
                box-shadow: none !important; 
                border: 1px solid #ccc !important; 
            }
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
            .skill-tag, .project-card, .education-card, .experience-item {
                border: 2px solid var(--text-color) !important;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            :root {
                --background-color: #0f172a;
                --text-color: #f1f5f9;
                --card-background: #1e293b;
            }
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>${data.personalInfo.name}</h1>
                <p class="subtitle">${data.personalInfo.summary}</p>
                <div class="contact-links">
                    <a href="mailto:${data.personalInfo.email}" aria-label="Send email">
                        <i class="fas fa-envelope"></i>
                        <span>Email</span>
                    </a>
                    <a href="tel:${data.personalInfo.phone}" aria-label="Call phone number">
                        <i class="fas fa-phone"></i>
                        <span>Call</span>
                    </a>
                    ${data.personalInfo.linkedin ? `
                    <a href="${data.personalInfo.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                        <i class="fab fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </a>
                    ` : ''}
                    ${data.personalInfo.github ? `
                    <a href="${data.personalInfo.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                        <i class="fab fa-github"></i>
                        <span>GitHub</span>
                    </a>
                    ` : ''}
                    <a href="#" onclick="window.print()" aria-label="Download portfolio">
                        <i class="fas fa-download"></i>
                        <span>Download</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    ${data.skills.length > 0 ? `
    <!-- Skills Section -->
    <section class="section" id="skills">
        <div class="container">
            <h2>Skills & Expertise</h2>
            <div class="skills-grid">
                ${data.skills.map(skill => `
                    <div class="skill-tag" data-skill="${skill}">${skill}</div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.projects.length > 0 ? `
    <!-- Projects Section -->
    <section class="section" id="projects">
        <div class="container">
            <h2>Featured Projects</h2>
            <div class="projects-grid">
                ${data.projects.map(project => `
                    <article class="project-card">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        ${project.technologies ? `
                        <div class="tech-tags">
                            ${project.technologies.split(',').map(tech => `
                                <span class="tech-tag">${tech.trim()}</span>
                            `).join('')}
                        </div>
                        ` : ''}
                        ${project.link ? `
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            <span>View Project</span>
                        </a>
                        ` : ''}
                    </article>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.experience.length > 0 ? `
    <!-- Experience Section -->
    <section class="section" id="experience">
        <div class="container">
            <h2>Work Experience</h2>
            <div class="experience-timeline">
                ${data.experience.map(exp => `
                    <article class="experience-item">
                        <h3>${exp.title}</h3>
                        <div class="company">${exp.company}</div>
                        <div class="duration">${exp.duration}</div>
                        <p>${exp.description}</p>
                    </article>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.education.length > 0 ? `
    <!-- Education Section -->
    <section class="section" id="education">
        <div class="container">
            <h2>Education</h2>
            <div class="education-grid">
                ${data.education.map(edu => `
                    <article class="education-card">
                        <h3>${edu.degree}</h3>
                        <div class="company">${edu.institution}</div>
                        <div class="duration">${edu.year}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
                    </article>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${data.personalInfo.name}. All rights reserved.</p>
            <p>Built with ResumeFlow - AI-Powered Resume & Portfolio Builder</p>
            <div class="footer-links">
                <a href="mailto:${data.personalInfo.email}">Contact</a>
                <a href="${data.personalInfo.linkedin || '#'}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                ${data.personalInfo.github ? `<a href="${data.personalInfo.github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#experience">Experience</a>
            </div>
        </div>
    </footer>

    <script>
        // Enhanced smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Enhanced scroll animations with Intersection Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation for grid items
                    if (entry.target.classList.contains('skills-grid') || 
                        entry.target.classList.contains('projects-grid') ||
                        entry.target.classList.contains('education-grid')) {
                        const items = entry.target.children;
                        Array.from(items).forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.skill-tag, .project-card, .experience-item, .education-card, .skills-grid, .projects-grid, .education-grid').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });

        // Enhanced typing effect for hero
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Performance optimization
        let ticking = false;
        function updateOnScroll() {
            // Add scroll-based animations here
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });

        // Accessibility improvements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Template-specific enhancements
        ${template === 'developer' ? `
        // Code typing effect for developer template
        const codeElements = document.querySelectorAll('.tech-tag');
        codeElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.fontFamily = 'JetBrains Mono, monospace';
                el.style.animation = 'fadeInUp 0.5s ease forwards';
            }, index * 100);
        });
        ` : ''}

        ${template === 'creative' ? `
        // Creative animations
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) rotateY(5deg)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0deg)';
            });
        });
        ` : ''}

        // SEO and Analytics
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: '${data.personalInfo.name} - Portfolio',
                page_location: window.location.href
            });
        }

        // Service Worker for offline functionality
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(console.error);
        }

        console.log('Portfolio loaded successfully! Built with ResumeFlow.');
    </script>
</body>
</html>`;
};

export const downloadPortfolio = (data: PortfolioData, template: string = 'modern'): void => {
  const htmlContent = generatePortfolioHTML(data, template);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const fileName = `${data.personalInfo.name.replace(/\s+/g, '_')}_Portfolio_${template}.html` || 'Portfolio.html';
  saveAs(blob, fileName);
};

export const generateGitHubPages = (data: PortfolioData, template: string = 'modern'): string => {
  const htmlContent = generatePortfolioHTML(data, template);
  
  // Enhanced instructions for GitHub Pages deployment
  const instructions = `
# 🚀 GitHub Pages Deployment Instructions

## Quick Setup (5 minutes)
1. Create a new repository: \`${data.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-portfolio\`
2. Upload the generated HTML file as \`index.html\`
3. Go to Settings > Pages > Deploy from branch > main
4. Your portfolio will be live at: https://yourusername.github.io/${data.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-portfolio

## Advanced Setup
- Add custom domain in Settings > Pages
- Enable HTTPS for security
- Add Google Analytics for tracking
- Optimize images for faster loading

## SEO Optimization Included
✅ Meta tags for social sharing
✅ Structured data for search engines
✅ Responsive design for mobile
✅ Fast loading optimizations
✅ Accessibility features

Generated with ResumeFlow - AI-Powered Portfolio Builder
Template: ${template.charAt(0).toUpperCase() + template.slice(1)}
`;

  console.log('Enhanced portfolio generated successfully!');
  console.log(instructions);
  
  return htmlContent;
};

// Enhanced portfolio analytics
export const getPortfolioAnalytics = (data: PortfolioData) => {
  const analytics = {
    completeness: 0,
    seoScore: 0,
    recommendations: [] as string[],
    strengths: [] as string[],
    improvements: [] as string[]
  };

  // Calculate completeness
  let completenessScore = 0;
  if (data.personalInfo.name) completenessScore += 15;
  if (data.personalInfo.email) completenessScore += 10;
  if (data.personalInfo.summary && data.personalInfo.summary.length > 50) completenessScore += 20;
  if (data.skills.length >= 5) completenessScore += 15;
  if (data.projects.length >= 2) completenessScore += 20;
  if (data.experience.length >= 1) completenessScore += 15;
  if (data.education.length >= 1) completenessScore += 5;

  analytics.completeness = Math.min(completenessScore, 100);

  // Calculate SEO score
  let seoScore = 0;
  if (data.personalInfo.name) seoScore += 20;
  if (data.personalInfo.summary && data.personalInfo.summary.length > 100) seoScore += 25;
  if (data.skills.length >= 8) seoScore += 20;
  if (data.projects.length >= 3) seoScore += 20;
  if (data.personalInfo.linkedin) seoScore += 10;
  if (data.personalInfo.github) seoScore += 5;

  analytics.seoScore = Math.min(seoScore, 100);

  // Generate recommendations
  if (analytics.completeness < 80) {
    analytics.recommendations.push('Add more sections to improve portfolio completeness');
  }
  if (data.skills.length < 8) {
    analytics.recommendations.push('Add more skills to showcase your expertise');
  }
  if (data.projects.length < 3) {
    analytics.recommendations.push('Add more projects to demonstrate your work');
  }
  if (!data.personalInfo.linkedin) {
    analytics.recommendations.push('Add LinkedIn profile for better networking');
  }

  // Identify strengths
  if (data.skills.length >= 10) analytics.strengths.push('Diverse skill set');
  if (data.projects.length >= 3) analytics.strengths.push('Strong project portfolio');
  if (data.experience.length >= 2) analytics.strengths.push('Good work experience');
  if (data.personalInfo.summary && data.personalInfo.summary.length > 150) {
    analytics.strengths.push('Comprehensive professional summary');
  }

  return analytics;
};