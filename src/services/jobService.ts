export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary?: string;
  description: string;
  requirements: string[];
  posted: string;
  url: string;
  logo?: string;
  remote: boolean;
  skills: string[];
  postedDate: string;
  applicationUrl?: string;
  source: 'linkedin' | 'indeed' | 'glassdoor' | 'naukri' | 'angellist' | 'remoteok';
  matchScore?: number;
  featured?: boolean;
  urgent?: boolean;
  verified?: boolean;
  companyRating?: number;
  benefits?: string[];
  teamSize?: string;
  fundingStage?: string;
}

// Enhanced job database with real Indian companies and global opportunities
const generateWorldClassJobs = (): Job[] => {
  const companies = [
    // Global Tech Giants in India
    { 
      name: 'Google India', 
      tier: 'faang', 
      rating: 4.8,
      benefits: ['Health Insurance', 'Stock Options', 'Learning Budget', 'Flexible Hours'],
      teamSize: '10,000+',
      fundingStage: 'Public'
    },
    { 
      name: 'Microsoft India', 
      tier: 'faang', 
      rating: 4.7,
      benefits: ['Health Insurance', 'Stock Options', 'Remote Work', 'Professional Development'],
      teamSize: '10,000+',
      fundingStage: 'Public'
    },
    { 
      name: 'Amazon India', 
      tier: 'faang', 
      rating: 4.6,
      benefits: ['Health Insurance', 'Stock Options', 'Career Growth', 'Global Opportunities'],
      teamSize: '10,000+',
      fundingStage: 'Public'
    },
    { 
      name: 'Meta India', 
      tier: 'faang', 
      rating: 4.5,
      benefits: ['Health Insurance', 'Stock Options', 'Innovation Time', 'World-class Facilities'],
      teamSize: '5,000+',
      fundingStage: 'Public'
    },
    { 
      name: 'Apple India', 
      tier: 'faang', 
      rating: 4.9,
      benefits: ['Health Insurance', 'Stock Options', 'Product Discounts', 'Premium Benefits'],
      teamSize: '1,000+',
      fundingStage: 'Public'
    },
    
    // Indian Unicorns & Decacorns
    { 
      name: 'Flipkart', 
      tier: 'unicorn', 
      rating: 4.4,
      benefits: ['Health Insurance', 'ESOPs', 'Learning Budget', 'Flexible Work'],
      teamSize: '50,000+',
      fundingStage: 'Unicorn'
    },
    { 
      name: 'Paytm', 
      tier: 'unicorn', 
      rating: 4.2,
      benefits: ['Health Insurance', 'ESOPs', 'Meal Allowance', 'Transport'],
      teamSize: '20,000+',
      fundingStage: 'Public'
    },
    { 
      name: 'Zomato', 
      tier: 'unicorn', 
      rating: 4.3,
      benefits: ['Health Insurance', 'ESOPs', 'Food Credits', 'Flexible Hours'],
      teamSize: '5,000+',
      fundingStage: 'Public'
    },
    { 
      name: 'Swiggy', 
      tier: 'unicorn', 
      rating: 4.4,
      benefits: ['Health Insurance', 'ESOPs', 'Food Allowance', 'Learning Budget'],
      teamSize: '10,000+',
      fundingStage: 'Unicorn'
    },
    { 
      name: 'BYJU\'S', 
      tier: 'unicorn', 
      rating: 4.1,
      benefits: ['Health Insurance', 'ESOPs', 'Education Benefits', 'Career Growth'],
      teamSize: '50,000+',
      fundingStage: 'Unicorn'
    },
    { 
      name: 'Razorpay', 
      tier: 'unicorn', 
      rating: 4.6,
      benefits: ['Health Insurance', 'ESOPs', 'Learning Budget', 'Remote Work'],
      teamSize: '3,000+',
      fundingStage: 'Unicorn'
    },
    { 
      name: 'PhonePe', 
      tier: 'unicorn', 
      rating: 4.5,
      benefits: ['Health Insurance', 'ESOPs', 'Wellness Programs', 'Flexible Work'],
      teamSize: '5,000+',
      fundingStage: 'Unicorn'
    },
    
    // High-Growth Startups
    { 
      name: 'Freshworks', 
      tier: 'startup', 
      rating: 4.5,
      benefits: ['Health Insurance', 'ESOPs', 'Learning Budget', 'Global Exposure'],
      teamSize: '5,000+',
      fundingStage: 'Public'
    },
    { 
      name: 'Zoho', 
      tier: 'startup', 
      rating: 4.3,
      benefits: ['Health Insurance', 'Profit Sharing', 'Learning Budget', 'Work-Life Balance'],
      teamSize: '12,000+',
      fundingStage: 'Bootstrapped'
    },
    { 
      name: 'InMobi', 
      tier: 'startup', 
      rating: 4.2,
      benefits: ['Health Insurance', 'ESOPs', 'Innovation Time', 'Global Opportunities'],
      teamSize: '1,500+',
      fundingStage: 'Series D'
    },
    { 
      name: 'Unacademy', 
      tier: 'startup', 
      rating: 4.1,
      benefits: ['Health Insurance', 'ESOPs', 'Education Benefits', 'Flexible Hours'],
      teamSize: '3,000+',
      fundingStage: 'Unicorn'
    },
    
    // Service Giants
    { 
      name: 'Tata Consultancy Services', 
      tier: 'service', 
      rating: 4.0,
      benefits: ['Health Insurance', 'Provident Fund', 'Training Programs', 'Global Projects'],
      teamSize: '500,000+',
      fundingStage: 'Public'
    },
    { 
      name: 'Infosys', 
      tier: 'service', 
      rating: 4.1,
      benefits: ['Health Insurance', 'Provident Fund', 'Learning Platform', 'Global Opportunities'],
      teamSize: '300,000+',
      fundingStage: 'Public'
    },
    { 
      name: 'Wipro', 
      tier: 'service', 
      rating: 3.9,
      benefits: ['Health Insurance', 'Provident Fund', 'Skill Development', 'Career Growth'],
      teamSize: '250,000+',
      fundingStage: 'Public'
    }
  ];

  const jobRoles = [
    // Software Engineering
    { 
      title: 'Senior Software Engineer', 
      category: 'engineering', 
      experience: '3-5 years', 
      skills: ['JavaScript', 'React', 'Node.js', 'System Design', 'AWS'],
      description: 'Build scalable systems that serve millions of users. Work with cutting-edge technologies and collaborate with world-class engineers to solve complex problems.',
      requirements: ['5+ years experience', 'Strong system design skills', 'Experience with microservices', 'Cloud platforms knowledge']
    },
    { 
      title: 'Full Stack Developer', 
      category: 'engineering', 
      experience: '2-4 years', 
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript'],
      description: 'Develop end-to-end web applications using modern technologies. Join a fast-paced team building products that impact millions of users.',
      requirements: ['3+ years full-stack experience', 'React/Node.js expertise', 'Database design skills', 'API development']
    },
    { 
      title: 'Frontend Developer', 
      category: 'engineering', 
      experience: '1-3 years', 
      skills: ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript'],
      description: 'Create beautiful, responsive user interfaces that delight users. Work closely with designers and product teams to bring ideas to life.',
      requirements: ['2+ years React experience', 'Strong CSS skills', 'Responsive design expertise', 'Performance optimization']
    },
    { 
      title: 'Backend Developer', 
      category: 'engineering', 
      experience: '2-5 years', 
      skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
      description: 'Build robust, scalable backend systems and APIs. Design and implement microservices architecture for high-traffic applications.',
      requirements: ['3+ years backend experience', 'Database design skills', 'API development', 'Cloud platforms']
    },
    { 
      title: 'DevOps Engineer', 
      category: 'engineering', 
      experience: '2-6 years', 
      skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
      description: 'Automate deployment pipelines and manage cloud infrastructure. Ensure high availability and performance of production systems.',
      requirements: ['3+ years DevOps experience', 'Container orchestration', 'CI/CD pipelines', 'Infrastructure as Code']
    },
    { 
      title: 'Mobile App Developer', 
      category: 'engineering', 
      experience: '2-4 years', 
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'JavaScript'],
      description: 'Build cross-platform mobile applications that provide exceptional user experiences. Work on apps used by millions of users.',
      requirements: ['2+ years mobile development', 'Cross-platform frameworks', 'App store deployment', 'Performance optimization']
    },
    
    // Data & AI
    { 
      title: 'Data Scientist', 
      category: 'data', 
      experience: '1-4 years', 
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics'],
      description: 'Extract insights from large datasets to drive business decisions. Build machine learning models that power product features.',
      requirements: ['2+ years data science experience', 'ML/AI expertise', 'Statistical analysis', 'Python/R proficiency']
    },
    { 
      title: 'Machine Learning Engineer', 
      category: 'data', 
      experience: '2-5 years', 
      skills: ['Python', 'PyTorch', 'MLOps', 'AWS', 'Deep Learning'],
      description: 'Deploy and scale machine learning models in production. Work on cutting-edge AI projects that shape the future.',
      requirements: ['3+ years ML experience', 'Production ML systems', 'MLOps practices', 'Deep learning frameworks']
    },
    { 
      title: 'Data Analyst', 
      category: 'data', 
      experience: '0-3 years', 
      skills: ['SQL', 'Python', 'Tableau', 'Excel', 'Statistics'],
      description: 'Analyze business data to uncover trends and insights. Create dashboards and reports that guide strategic decisions.',
      requirements: ['1+ years analytics experience', 'SQL proficiency', 'Data visualization', 'Business acumen']
    },
    
    // Product & Design
    { 
      title: 'Product Manager', 
      category: 'product', 
      experience: '3-6 years', 
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'SQL'],
      description: 'Drive product strategy and roadmap for features used by millions. Collaborate with engineering, design, and business teams.',
      requirements: ['3+ years product management', 'Technical background', 'Data-driven approach', 'User-centric mindset']
    },
    { 
      title: 'UI/UX Designer', 
      category: 'design', 
      experience: '2-5 years', 
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Adobe Creative Suite'],
      description: 'Design intuitive user experiences that solve real problems. Create design systems and conduct user research.',
      requirements: ['3+ years design experience', 'Portfolio of work', 'User research skills', 'Design system experience']
    },
    { 
      title: 'Product Designer', 
      category: 'design', 
      experience: '2-4 years', 
      skills: ['Design Thinking', 'Figma', 'User Testing', 'Prototyping', 'Research'],
      description: 'Own the end-to-end design process from research to implementation. Work closely with product and engineering teams.',
      requirements: ['2+ years product design', 'End-to-end design process', 'User research', 'Prototyping skills']
    },
    
    // Business & Marketing
    { 
      title: 'Digital Marketing Manager', 
      category: 'marketing', 
      experience: '2-5 years', 
      skills: ['SEO', 'Google Ads', 'Analytics', 'Content Marketing', 'Social Media'],
      description: 'Drive digital marketing strategy across multiple channels. Optimize campaigns for maximum ROI and user acquisition.',
      requirements: ['3+ years digital marketing', 'Performance marketing', 'Analytics tools', 'Growth mindset']
    },
    { 
      title: 'Business Analyst', 
      category: 'business', 
      experience: '1-4 years', 
      skills: ['Analytics', 'SQL', 'Business Intelligence', 'Excel', 'Tableau'],
      description: 'Analyze business processes and identify improvement opportunities. Work with stakeholders to drive data-driven decisions.',
      requirements: ['2+ years business analysis', 'SQL proficiency', 'Process improvement', 'Stakeholder management']
    },
    { 
      title: 'Sales Executive', 
      category: 'sales', 
      experience: '0-3 years', 
      skills: ['Sales', 'CRM', 'Communication', 'Negotiation', 'Lead Generation'],
      description: 'Drive revenue growth through strategic sales initiatives. Build relationships with enterprise clients and close deals.',
      requirements: ['1+ years sales experience', 'CRM tools', 'Communication skills', 'Target achievement']
    }
  ];

  const locations = [
    'Bangalore, Karnataka', 'Mumbai, Maharashtra', 'Delhi NCR', 'Hyderabad, Telangana',
    'Chennai, Tamil Nadu', 'Pune, Maharashtra', 'Kolkata, West Bengal', 'Ahmedabad, Gujarat',
    'Noida, Uttar Pradesh', 'Gurgaon, Haryana', 'Kochi, Kerala', 'Indore, Madhya Pradesh',
    'Remote, India', 'Jaipur, Rajasthan', 'Coimbatore, Tamil Nadu', 'Bhubaneswar, Odisha'
  ];

  const getSalaryRange = (tier: string, experience: string, category: string) => {
    const baseRanges = {
      'faang': { min: 30, max: 100 },
      'unicorn': { min: 20, max: 60 },
      'startup': { min: 12, max: 40 },
      'service': { min: 6, max: 30 }
    };

    const experienceMultiplier = {
      '0-1 years': 0.6,
      '0-2 years': 0.7,
      '0-3 years': 0.8,
      '1-3 years': 0.9,
      '1-4 years': 1.0,
      '2-4 years': 1.2,
      '2-5 years': 1.4,
      '2-6 years': 1.5,
      '3-5 years': 1.6,
      '3-6 years': 1.8,
      '5+ years': 2.2
    };

    const categoryMultiplier = {
      'engineering': 1.3,
      'data': 1.4,
      'product': 1.2,
      'design': 1.1,
      'marketing': 1.0,
      'business': 0.9,
      'sales': 0.8
    };

    const base = baseRanges[tier as keyof typeof baseRanges] || baseRanges.startup;
    const expMult = experienceMultiplier[experience as keyof typeof experienceMultiplier] || 1.0;
    const catMult = categoryMultiplier[category as keyof typeof categoryMultiplier] || 1.0;

    const min = Math.round(base.min * expMult * catMult);
    const max = Math.round(base.max * expMult * catMult);

    return `₹${min}-${max} LPA`;
  };

  const jobs: Job[] = [];
  let jobId = 1;

  // Generate comprehensive job listings
  for (const company of companies) {
    for (const role of jobRoles) {
      // Generate multiple positions per company
      const positionsCount = company.tier === 'faang' ? 4 : company.tier === 'unicorn' ? 3 : 2;
      
      for (let i = 0; i < positionsCount; i++) {
        const location = locations[Math.floor(Math.random() * locations.length)];
        const isRemote = Math.random() > 0.6;
        const isUrgent = Math.random() > 0.85;
        const isFeatured = Math.random() > 0.8;
        const isVerified = company.tier === 'faang' || company.tier === 'unicorn';
        
        const postedDaysAgo = Math.floor(Math.random() * 21) + 1;
        const postedDate = new Date(Date.now() - postedDaysAgo * 24 * 60 * 60 * 1000);

        jobs.push({
          id: `job-${jobId++}`,
          title: role.title,
          company: company.name,
          location: isRemote ? 'Remote, India' : location,
          type: Math.random() > 0.85 ? 'contract' : 'full-time',
          experience: role.experience,
          salary: getSalaryRange(company.tier, role.experience, role.category),
          description: role.description,
          requirements: role.requirements,
          posted: `${postedDaysAgo} day${postedDaysAgo > 1 ? 's' : ''} ago`,
          url: `https://careers.${company.name.toLowerCase().replace(/\s+/g, '').replace(/'/g, '')}.com/jobs/${role.title.toLowerCase().replace(/\s+/g, '-')}`,
          logo: `https://logo.clearbit.com/${company.name.toLowerCase().replace(/\s+/g, '').replace(/'/g, '')}.com`,
          remote: isRemote,
          skills: role.skills,
          postedDate: postedDate.toISOString().split('T')[0],
          source: ['linkedin', 'indeed', 'glassdoor', 'naukri', 'angellist'][Math.floor(Math.random() * 5)] as Job['source'],
          matchScore: 70 + Math.floor(Math.random() * 30),
          featured: isFeatured,
          urgent: isUrgent,
          verified: isVerified,
          companyRating: company.rating,
          benefits: company.benefits,
          teamSize: company.teamSize,
          fundingStage: company.fundingStage
        });
      }
    }
  }

  return jobs.sort((a, b) => {
    // Sort by: featured > urgent > verified > recent
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
    if (a.verified !== b.verified) return a.verified ? -1 : 1;
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
  });
};

const allJobs = generateWorldClassJobs();

export const searchJobs = async (query: string, filters: {
  location?: string;
  type?: string;
  experience?: string;
  remote?: boolean;
  skills?: string[];
  salary?: string;
}): Promise<Job[]> => {
  // Simulate realistic API delay
  await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));
  
  let filteredJobs = [...allJobs];
  
  // Advanced search with relevance scoring
  if (query) {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    filteredJobs = filteredJobs.filter(job => {
      const searchableText = `${job.title} ${job.company} ${job.description} ${job.skills.join(' ')} ${job.location}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    }).sort((a, b) => {
      const aScore = calculateRelevanceScore(a, searchTerms);
      const bScore = calculateRelevanceScore(b, searchTerms);
      return bScore - aScore;
    });
  }
  
  // Apply filters
  if (filters.location) {
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }
  
  if (filters.type) {
    filteredJobs = filteredJobs.filter(job => job.type === filters.type);
  }
  
  if (filters.experience) {
    filteredJobs = filteredJobs.filter(job => 
      job.experience.toLowerCase().includes(filters.experience!.toLowerCase())
    );
  }
  
  if (filters.remote !== undefined) {
    filteredJobs = filteredJobs.filter(job => job.remote === filters.remote);
  }
  
  if (filters.skills && filters.skills.length > 0) {
    filteredJobs = filteredJobs.filter(job => 
      filters.skills!.some(skill => 
        job.skills.some(jobSkill => 
          jobSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }
  
  return filteredJobs.slice(0, 60);
};

const calculateRelevanceScore = (job: Job, searchTerms: string[]): number => {
  let score = 0;
  const searchableText = `${job.title} ${job.company} ${job.description} ${job.skills.join(' ')}`.toLowerCase();
  
  searchTerms.forEach(term => {
    if (job.title.toLowerCase().includes(term)) score += 25;
    if (job.company.toLowerCase().includes(term)) score += 20;
    if (job.skills.some(skill => skill.toLowerCase().includes(term))) score += 22;
    if (job.description.toLowerCase().includes(term)) score += 10;
    if (job.location.toLowerCase().includes(term)) score += 8;
  });
  
  // Boost score for quality indicators
  if (job.featured) score += 15;
  if (job.urgent) score += 12;
  if (job.verified) score += 10;
  if (job.companyRating && job.companyRating > 4.5) score += 8;
  
  return score;
};

export const getRecommendedJobs = async (userSkills: string[], experience: string): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const recommendedJobs = allJobs
    .filter(job => {
      const skillMatch = job.skills.some(skill => 
        userSkills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      );
      return skillMatch;
    })
    .sort((a, b) => {
      const aMatches = a.skills.filter(skill => 
        userSkills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase())
        )
      ).length;
      const bMatches = b.skills.filter(skill => 
        userSkills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase())
        )
      ).length;
      
      // Prioritize quality indicators
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      if (a.companyRating !== b.companyRating) return (b.companyRating || 0) - (a.companyRating || 0);
      
      return bMatches - aMatches;
    })
    .slice(0, 25);
  
  return recommendedJobs;
};

export const getAdvancedJobRecommendations = async (userSkills: string[], experience: string): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Advanced matching algorithm
  const scoredJobs = allJobs.map(job => {
    let score = 0;
    
    // Skill matching (40% weight)
    const skillMatches = job.skills.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    ).length;
    score += (skillMatches / Math.max(job.skills.length, 1)) * 40;
    
    // Experience matching (25% weight)
    const jobExpYears = parseInt(job.experience.match(/\d+/)?.[0] || '0');
    const userExpYears = parseInt(experience.match(/\d+/)?.[0] || '0');
    const expDiff = Math.abs(jobExpYears - userExpYears);
    score += Math.max(0, 25 - expDiff * 5);
    
    // Company quality (20% weight)
    if (job.verified) score += 10;
    if (job.featured) score += 8;
    if (job.companyRating && job.companyRating > 4.5) score += 10;
    if (job.companyRating && job.companyRating > 4.0) score += 5;
    
    // Recency (10% weight)
    const daysAgo = parseInt(job.posted.match(/\d+/)?.[0] || '30');
    score += Math.max(0, 10 - daysAgo * 0.5);
    
    // Salary attractiveness (5% weight)
    const salaryNum = parseInt(job.salary?.match(/\d+/)?.[0] || '0');
    if (salaryNum > 25) score += 5;
    else if (salaryNum > 15) score += 3;
    
    return { ...job, matchScore: Math.round(score) };
  });
  
  return scoredJobs
    .filter(job => job.matchScore > 30)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 20);
};

export const getJobById = async (id: string): Promise<Job | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return allJobs.find(job => job.id === id) || null;
};

export const getFeaturedJobs = async (): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return allJobs.filter(job => job.featured).slice(0, 15);
};

export const getUrgentJobs = async (): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return allJobs.filter(job => job.urgent).slice(0, 12);
};

export const getJobsByCompany = async (companyName: string): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 250));
  return allJobs.filter(job => 
    job.company.toLowerCase().includes(companyName.toLowerCase())
  ).slice(0, 25);
};

export const getJobMarketAnalytics = () => {
  const totalJobs = allJobs.length;
  const featuredJobs = allJobs.filter(job => job.featured).length;
  const remoteJobs = allJobs.filter(job => job.remote).length;
  const urgentJobs = allJobs.filter(job => job.urgent).length;
  const verifiedJobs = allJobs.filter(job => job.verified).length;
  
  const skillCounts = new Map<string, number>();
  const companyCounts = new Map<string, number>();
  const locationCounts = new Map<string, number>();
  const salaryCounts = new Map<string, number>();
  
  allJobs.forEach(job => {
    job.skills.forEach(skill => {
      skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
    });
    companyCounts.set(job.company, (companyCounts.get(job.company) || 0) + 1);
    locationCounts.set(job.location, (locationCounts.get(job.location) || 0) + 1);
    
    if (job.salary) {
      const salaryRange = job.salary.split('-')[0].replace('₹', '').replace('LPA', '').trim();
      salaryCounts.set(salaryRange, (salaryCounts.get(salaryRange) || 0) + 1);
    }
  });
  
  const topSkills = Array.from(skillCounts.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 15);
    
  const topCompanies = Array.from(companyCounts.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 15);
    
  const topLocations = Array.from(locationCounts.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 12);
  
  return {
    totalJobs,
    featuredJobs,
    remoteJobs,
    urgentJobs,
    verifiedJobs,
    topSkills,
    topCompanies,
    topLocations,
    averageSalary: '₹18-45L',
    growthRate: '+28%',
    newJobsThisWeek: Math.floor(totalJobs * 0.15),
    faangJobs: allJobs.filter(job => job.company.includes('Google') || job.company.includes('Microsoft') || job.company.includes('Amazon') || job.company.includes('Meta') || job.company.includes('Apple')).length,
    unicornJobs: allJobs.filter(job => job.fundingStage === 'Unicorn').length
  };
};

// Enhanced job search with better algorithms
export const searchJobsAdvanced = async (
  query: string, 
  filters: any,
  sortBy: 'relevance' | 'date' | 'salary' | 'company' | 'rating' = 'relevance'
): Promise<Job[]> => {
  const results = await searchJobs(query, filters);
  
  switch (sortBy) {
    case 'date':
      return results.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    case 'salary':
      return results.sort((a, b) => {
        const aSalary = parseInt(a.salary?.match(/\d+/)?.[0] || '0');
        const bSalary = parseInt(b.salary?.match(/\d+/)?.[0] || '0');
        return bSalary - aSalary;
      });
    case 'company':
      return results.sort((a, b) => a.company.localeCompare(b.company));
    case 'rating':
      return results.sort((a, b) => (b.companyRating || 0) - (a.companyRating || 0));
    default:
      return results; // Already sorted by relevance
  }
};

// User interaction tracking
export const recordUserJobSearch = (query: string, location?: string) => {
  const searchData = {
    query,
    location,
    timestamp: new Date().toISOString(),
    userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 'anonymous'
  };
  
  const searches = JSON.parse(localStorage.getItem('jobSearchHistory') || '[]');
  searches.push(searchData);
  localStorage.setItem('jobSearchHistory', JSON.stringify(searches.slice(-50))); // Keep last 50 searches
};

export const getUserSearchHistory = () => {
  return JSON.parse(localStorage.getItem('jobSearchHistory') || '[]');
};

// Mock external API functions (for Vercel compatibility)
export const fetchJobsFromRapidAPI = async (params: any): Promise<{ data: any[] }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return subset of our local jobs formatted as external API response
  const relevantJobs = allJobs
    .filter(job => 
      job.title.toLowerCase().includes(params.jobTitle?.toLowerCase() || '') ||
      job.location.toLowerCase().includes(params.location?.toLowerCase() || '')
    )
    .slice(0, 20);
  
  return {
    data: relevantJobs.map(job => ({
      job_id: job.id,
      job_title: job.title,
      employer_name: job.company,
      job_city: job.location,
      job_employment_type: job.type,
      job_required_experience: job.experience,
      estimated_salary: job.salary,
      job_description: job.description,
      job_required_skills: job.skills,
      job_posted_at_datetime_utc: job.postedDate,
      job_apply_link: job.url,
      employer_logo: job.logo,
      job_is_remote: job.remote
    }))
  };
};

export const fetchSmartJobsFromInternet = async (): Promise<any[]> => {
  // Simulate smart job fetching
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return enhanced job data
  return allJobs
    .filter(job => job.featured || job.verified)
    .slice(0, 15)
    .map(job => ({
      job_id: job.id,
      job_title: job.title,
      employer_name: job.company,
      job_city: job.location,
      job_employment_type: job.type,
      job_required_experience: job.experience,
      estimated_salary: job.salary,
      job_description: job.description,
      job_required_skills: job.skills,
      job_posted_at_datetime_utc: job.postedDate,
      job_apply_link: job.url,
      employer_logo: job.logo,
      job_is_remote: job.remote,
      company_rating: job.companyRating,
      benefits: job.benefits,
      team_size: job.teamSize,
      funding_stage: job.fundingStage
    }));
};