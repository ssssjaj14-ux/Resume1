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
}

// Enhanced job database with real Indian companies and positions
const generateAdvancedJobs = (): Job[] => {
  const indianCompanies = [
    // Tech Giants
    { name: 'Google India', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'tier1' },
    { name: 'Microsoft India', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'tier1' },
    { name: 'Amazon India', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'tier1' },
    { name: 'Meta India', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'tier1' },
    { name: 'Apple India', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'tier1' },
    
    // Indian Unicorns
    { name: 'Flipkart', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'unicorn' },
    { name: 'Paytm', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'unicorn' },
    { name: 'Zomato', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'unicorn' },
    { name: 'Swiggy', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'unicorn' },
    { name: 'Ola', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'unicorn' },
    { name: 'PhonePe', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'unicorn' },
    { name: 'Razorpay', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'unicorn' },
    { name: 'BYJU\'S', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'unicorn' },
    
    // Service Companies
    { name: 'Tata Consultancy Services', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'service' },
    { name: 'Infosys', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'service' },
    { name: 'Wipro', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'service' },
    { name: 'HCL Technologies', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'service' },
    { name: 'Tech Mahindra', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'service' },
    
    // Startups
    { name: 'Freshworks', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'startup' },
    { name: 'Zoho', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'startup' },
    { name: 'InMobi', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'startup' },
    { name: 'Unacademy', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100', tier: 'startup' }
  ];

  const jobTitles = [
    // Software Engineering
    { title: 'Senior Software Engineer', category: 'engineering', experience: '3-5 years', skills: ['JavaScript', 'React', 'Node.js', 'System Design'] },
    { title: 'Full Stack Developer', category: 'engineering', experience: '2-4 years', skills: ['React', 'Node.js', 'MongoDB', 'Express.js'] },
    { title: 'Frontend Developer', category: 'engineering', experience: '1-3 years', skills: ['React', 'TypeScript', 'CSS', 'HTML'] },
    { title: 'Backend Developer', category: 'engineering', experience: '2-5 years', skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS'] },
    { title: 'DevOps Engineer', category: 'engineering', experience: '2-6 years', skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'] },
    { title: 'Mobile App Developer', category: 'engineering', experience: '2-4 years', skills: ['React Native', 'Flutter', 'iOS', 'Android'] },
    
    // Data & AI
    { title: 'Data Scientist', category: 'data', experience: '1-4 years', skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'] },
    { title: 'Machine Learning Engineer', category: 'data', experience: '2-5 years', skills: ['Python', 'PyTorch', 'MLOps', 'AWS'] },
    { title: 'Data Analyst', category: 'data', experience: '0-3 years', skills: ['SQL', 'Python', 'Tableau', 'Excel'] },
    { title: 'AI Research Engineer', category: 'data', experience: '3-7 years', skills: ['Deep Learning', 'Research', 'Python', 'Publications'] },
    
    // Product & Design
    { title: 'Product Manager', category: 'product', experience: '3-6 years', skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile'] },
    { title: 'UI/UX Designer', category: 'design', experience: '2-5 years', skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'] },
    { title: 'Product Designer', category: 'design', experience: '2-4 years', skills: ['Design Thinking', 'Figma', 'User Testing', 'Prototyping'] },
    
    // Business & Marketing
    { title: 'Digital Marketing Manager', category: 'marketing', experience: '2-5 years', skills: ['SEO', 'Google Ads', 'Analytics', 'Content Marketing'] },
    { title: 'Business Analyst', category: 'business', experience: '1-4 years', skills: ['Analytics', 'SQL', 'Business Intelligence', 'Excel'] },
    { title: 'Sales Executive', category: 'sales', experience: '0-3 years', skills: ['Sales', 'CRM', 'Communication', 'Negotiation'] },
    
    // Operations
    { title: 'Operations Manager', category: 'operations', experience: '3-6 years', skills: ['Operations', 'Process Improvement', 'Team Management', 'Analytics'] },
    { title: 'Quality Assurance Engineer', category: 'engineering', experience: '1-4 years', skills: ['Testing', 'Automation', 'Selenium', 'API Testing'] },
    { title: 'Technical Writer', category: 'content', experience: '1-3 years', skills: ['Technical Writing', 'Documentation', 'API Documentation', 'Content Strategy'] }
  ];

  const locations = [
    'Bangalore, Karnataka', 'Mumbai, Maharashtra', 'Delhi, NCR', 'Hyderabad, Telangana',
    'Chennai, Tamil Nadu', 'Pune, Maharashtra', 'Kolkata, West Bengal', 'Ahmedabad, Gujarat',
    'Noida, Uttar Pradesh', 'Gurgaon, Haryana', 'Kochi, Kerala', 'Indore, Madhya Pradesh',
    'Jaipur, Rajasthan', 'Coimbatore, Tamil Nadu', 'Thiruvananthapuram, Kerala', 'Bhubaneswar, Odisha'
  ];

  const getSalaryRange = (tier: string, experience: string, category: string) => {
    const baseRanges = {
      'tier1': { min: 25, max: 80 },
      'unicorn': { min: 15, max: 50 },
      'startup': { min: 8, max: 30 },
      'service': { min: 4, max: 25 }
    };

    const experienceMultiplier = {
      '0-1 years': 0.6,
      '0-2 years': 0.7,
      '0-3 years': 0.8,
      '1-3 years': 0.9,
      '1-4 years': 1.0,
      '2-4 years': 1.1,
      '2-5 years': 1.3,
      '2-6 years': 1.4,
      '3-5 years': 1.5,
      '3-6 years': 1.6,
      '3-7 years': 1.8,
      '5+ years': 2.0
    };

    const categoryMultiplier = {
      'engineering': 1.2,
      'data': 1.3,
      'product': 1.1,
      'design': 1.0,
      'marketing': 0.9,
      'business': 0.8,
      'sales': 0.7,
      'operations': 0.8,
      'content': 0.7
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
  for (const company of indianCompanies) {
    for (const jobTitle of jobTitles) {
      for (let i = 0; i < (company.tier === 'tier1' ? 3 : company.tier === 'unicorn' ? 2 : 1); i++) {
        const location = locations[Math.floor(Math.random() * locations.length)];
        const isRemote = Math.random() > 0.7;
        const isUrgent = Math.random() > 0.85;
        const isFeatured = Math.random() > 0.9;
        const isVerified = company.tier === 'tier1' || company.tier === 'unicorn';
        
        const postedDaysAgo = Math.floor(Math.random() * 30) + 1;
        const postedDate = new Date(Date.now() - postedDaysAgo * 24 * 60 * 60 * 1000);

        jobs.push({
          id: `job-${jobId++}`,
          title: jobTitle.title,
          company: company.name,
          location: isRemote ? 'Remote, India' : location,
          type: Math.random() > 0.8 ? 'contract' : 'full-time',
          experience: jobTitle.experience,
          salary: getSalaryRange(company.tier, jobTitle.experience, jobTitle.category),
          description: `Join ${company.name} as a ${jobTitle.title} and work on cutting-edge projects that impact millions of users. We're looking for passionate professionals who want to make a difference in the tech industry. This role offers excellent growth opportunities, competitive compensation, and the chance to work with world-class teams.`,
          requirements: jobTitle.skills,
          posted: `${postedDaysAgo} day${postedDaysAgo > 1 ? 's' : ''} ago`,
          url: `https://careers.${company.name.toLowerCase().replace(/\s+/g, '').replace(/'/g, '')}.com`,
          logo: company.logo,
          remote: isRemote,
          skills: jobTitle.skills,
          postedDate: postedDate.toISOString().split('T')[0],
          source: ['linkedin', 'indeed', 'glassdoor', 'naukri', 'angellist'][Math.floor(Math.random() * 5)] as Job['source'],
          matchScore: 75 + Math.floor(Math.random() * 25),
          featured: isFeatured,
          urgent: isUrgent,
          verified: isVerified
        });
      }
    }
  }

  return jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
};

const allJobs = generateAdvancedJobs();

export const searchJobs = async (query: string, filters: {
  location?: string;
  type?: string;
  experience?: string;
  remote?: boolean;
  skills?: string[];
  salary?: string;
}): Promise<Job[]> => {
  // Simulate realistic API delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
  
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
  
  // Sort by relevance: featured > urgent > verified > recent
  filteredJobs.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
    if (a.verified !== b.verified) return a.verified ? -1 : 1;
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
  });
  
  return filteredJobs.slice(0, 50);
};

const calculateRelevanceScore = (job: Job, searchTerms: string[]): number => {
  let score = 0;
  const searchableText = `${job.title} ${job.company} ${job.description} ${job.skills.join(' ')}`.toLowerCase();
  
  searchTerms.forEach(term => {
    if (job.title.toLowerCase().includes(term)) score += 20;
    if (job.company.toLowerCase().includes(term)) score += 15;
    if (job.skills.some(skill => skill.toLowerCase().includes(term))) score += 18;
    if (job.description.toLowerCase().includes(term)) score += 8;
    if (job.location.toLowerCase().includes(term)) score += 5;
  });
  
  // Boost score for quality indicators
  if (job.featured) score += 10;
  if (job.urgent) score += 8;
  if (job.verified) score += 5;
  
  return score;
};

export const getRecommendedJobs = async (userSkills: string[], experience: string): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
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
      
      // Prioritize featured and verified jobs
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      
      return bMatches - aMatches;
    })
    .slice(0, 20);
  
  return recommendedJobs;
};

export const getJobById = async (id: string): Promise<Job | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return allJobs.find(job => job.id === id) || null;
};

export const getFeaturedJobs = async (): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return allJobs.filter(job => job.featured).slice(0, 10);
};

export const getUrgentJobs = async (): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return allJobs.filter(job => job.urgent).slice(0, 8);
};

export const getJobsByCompany = async (companyName: string): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return allJobs.filter(job => 
    job.company.toLowerCase().includes(companyName.toLowerCase())
  ).slice(0, 20);
};

export const getJobMarketAnalytics = () => {
  const totalJobs = allJobs.length;
  const featuredJobs = allJobs.filter(job => job.featured).length;
  const remoteJobs = allJobs.filter(job => job.remote).length;
  const urgentJobs = allJobs.filter(job => job.urgent).length;
  
  const skillCounts = new Map<string, number>();
  const companyCounts = new Map<string, number>();
  const locationCounts = new Map<string, number>();
  
  allJobs.forEach(job => {
    job.skills.forEach(skill => {
      skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
    });
    companyCounts.set(job.company, (companyCounts.get(job.company) || 0) + 1);
    locationCounts.set(job.location, (locationCounts.get(job.location) || 0) + 1);
  });
  
  const topSkills = Array.from(skillCounts.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
    
  const topCompanies = Array.from(companyCounts.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
    
  const topLocations = Array.from(locationCounts.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
  
  return {
    totalJobs,
    featuredJobs,
    remoteJobs,
    urgentJobs,
    topSkills,
    topCompanies,
    topLocations,
    averageSalary: '₹15-35 LPA',
    growthRate: '+23%',
    newJobsThisWeek: Math.floor(totalJobs * 0.1)
  };
};

// Enhanced job search with better algorithms
export const searchJobsAdvanced = async (
  query: string, 
  filters: any,
  sortBy: 'relevance' | 'date' | 'salary' | 'company' = 'relevance'
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
    default:
      return results; // Already sorted by relevance
  }
};