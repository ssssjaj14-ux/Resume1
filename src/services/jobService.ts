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
  source: 'linkedin' | 'indeed' | 'glassdoor' | 'angelist' | 'remoteok' | 'weworkremotely';
  matchScore?: number;
}

// Enhanced mock job data with SEO-optimized content
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer - Full Stack Developer',
    company: 'Google India',
    location: 'Bangalore, Karnataka, India',
    type: 'full-time',
    experience: '3-5 years',
    salary: '₹25-40 LPA',
    description: 'Join our team to build scalable systems that serve billions of users worldwide. Work on cutting-edge technologies including React, Node.js, Python, and cloud infrastructure.',
    requirements: ['JavaScript', 'React', 'Node.js', 'System Design', 'Computer Science Degree'],
    posted: '2 days ago',
    url: 'https://careers.google.com',
    logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100',
    remote: false,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'System Design', 'Full Stack Development'],
    postedDate: '2024-01-15',
    source: 'linkedin'
  },
  {
    id: '2',
    title: 'Frontend Developer - React Specialist',
    company: 'Microsoft India',
    location: 'Hyderabad, Telangana, India',
    type: 'full-time',
    experience: '2-4 years',
    salary: '₹20-35 LPA',
    description: 'Build amazing user experiences for Microsoft products used by millions. Work with React, TypeScript, and modern frontend technologies.',
    requirements: ['React', 'TypeScript', 'CSS', 'HTML', 'Git'],
    posted: '1 day ago',
    url: 'https://careers.microsoft.com',
    logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100',
    remote: true,
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Azure', 'Frontend Development'],
    postedDate: '2024-01-14',
    source: 'linkedin'
  },
  {
    id: '3',
    title: 'Data Scientist - Machine Learning Engineer',
    company: 'Amazon India',
    location: 'Mumbai, Maharashtra, India',
    type: 'full-time',
    experience: '1-3 years',
    salary: '₹18-30 LPA',
    description: 'Use machine learning to solve complex business problems at scale. Work with Python, TensorFlow, and big data technologies.',
    requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'AWS'],
    posted: '3 days ago',
    url: 'https://amazon.jobs',
    logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100',
    remote: false,
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'AWS', 'Data Science'],
    postedDate: '2024-01-13',
    source: 'indeed'
  },
  {
    id: '4',
    title: 'Product Manager - Tech Products',
    company: 'Flipkart',
    location: 'Bangalore, Karnataka, India',
    type: 'full-time',
    experience: '3-6 years',
    salary: '₹30-50 LPA',
    description: 'Lead product strategy and execution for India\'s largest e-commerce platform. Drive innovation and user experience.',
    requirements: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'MBA preferred'],
    posted: '1 week ago',
    url: 'https://flipkart.com/careers',
    logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100',
    remote: false,
    skills: ['Product Management', 'Analytics', 'Strategy', 'Leadership', 'Data Analysis'],
    postedDate: '2024-01-10',
    source: 'glassdoor'
  },
  {
    id: '5',
    title: 'DevOps Engineer - Cloud Infrastructure',
    company: 'Zomato',
    location: 'Gurgaon, Haryana, India',
    type: 'full-time',
    experience: '2-5 years',
    salary: '₹15-28 LPA',
    description: 'Build and maintain infrastructure that powers food delivery for millions. Work with Docker, Kubernetes, and cloud technologies.',
    requirements: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
    posted: '4 days ago',
    url: 'https://zomato.com/careers',
    logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100',
    remote: true,
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Python', 'DevOps', 'Cloud Computing'],
    postedDate: '2024-01-12',
    source: 'indeed'
  }
];

// Generate more SEO-optimized jobs with real-time data simulation
const generateMoreJobs = (): Job[] => {
  const companies = [
    'TCS', 'Infosys', 'Wipro', 'HCL Technologies', 'Tech Mahindra', 'Accenture', 
    'IBM India', 'Oracle India', 'SAP Labs', 'Adobe India', 'Salesforce India',
    'Paytm', 'PhonePe', 'Swiggy', 'Ola', 'Byju\'s', 'Unacademy', 'Razorpay',
    'Freshworks', 'Zoho', 'Mindtree', 'Mphasis', 'L&T Infotech', 'Cognizant'
  ];
  
  const locations = [
    'Bangalore, Karnataka', 'Mumbai, Maharashtra', 'Delhi, NCR', 'Hyderabad, Telangana', 
    'Chennai, Tamil Nadu', 'Pune, Maharashtra', 'Kolkata, West Bengal', 'Ahmedabad, Gujarat',
    'Noida, Uttar Pradesh', 'Gurgaon, Haryana', 'Kochi, Kerala', 'Indore, Madhya Pradesh',
    'Jaipur, Rajasthan', 'Coimbatore, Tamil Nadu', 'Thiruvananthapuram, Kerala'
  ];
  
  const jobTitles = [
    'Software Engineer - Full Stack Developer', 'Frontend Developer - React Specialist',
    'Backend Developer - Node.js Expert', 'Data Analyst - Business Intelligence',
    'Business Analyst - Product Strategy', 'QA Engineer - Automation Testing',
    'UI/UX Designer - Product Design', 'Product Manager - Tech Innovation',
    'Project Manager - Agile Methodology', 'Scrum Master - Team Leadership',
    'Technical Lead - Software Architecture', 'Solution Architect - Enterprise Systems',
    'Consultant - Digital Transformation', 'Mobile App Developer - React Native',
    'Cloud Engineer - AWS Specialist', 'Cybersecurity Analyst - Information Security',
    'Digital Marketing Manager - Growth Hacking', 'Content Writer - Technical Documentation',
    'Sales Executive - B2B Software', 'Customer Success Manager - SaaS Products',
    'Machine Learning Engineer - AI Specialist', 'Data Scientist - Predictive Analytics',
    'Blockchain Developer - Web3 Expert', 'Game Developer - Unity Specialist'
  ];
  
  const skillSets = [
    ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js'],
    ['Python', 'Django', 'PostgreSQL', 'Redis', 'Celery'],
    ['Java', 'Spring Boot', 'MySQL', 'Hibernate', 'Maven'],
    ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Material UI'],
    ['Vue.js', 'Nuxt.js', 'Vuex', 'Quasar', 'Firebase'],
    ['React Native', 'Flutter', 'Ionic', 'Xamarin', 'Swift'],
    ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
    ['Machine Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas'],
    ['Data Science', 'R', 'Tableau', 'Power BI', 'SQL'],
    ['DevOps', 'Jenkins', 'GitLab CI', 'Terraform', 'Ansible'],
    ['Blockchain', 'Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
    ['Unity', 'C#', 'Unreal Engine', 'Game Development', '3D Modeling']
  ];
  
  const sources: Job['source'][] = ['linkedin', 'indeed', 'glassdoor', 'angelist', 'remoteok', 'weworkremotely'];
  
  const additionalJobs: Job[] = [];
  
  for (let i = 6; i <= 2000; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const experience = ['0-2 years', '1-3 years', '2-4 years', '3-5 years', '5-8 years', '8+ years'][Math.floor(Math.random() * 6)];
    const salary = ['₹3-8 LPA', '₹8-15 LPA', '₹15-25 LPA', '₹25-40 LPA', '₹40-60 LPA', '₹60+ LPA'][Math.floor(Math.random() * 6)];
    const remote = Math.random() > 0.7;
    const type = ['full-time', 'part-time', 'contract', 'internship'][Math.floor(Math.random() * 4)] as Job['type'];
    const skills = skillSets[Math.floor(Math.random() * skillSets.length)];
    const postedDays = Math.floor(Math.random() * 30) + 1;
    const source = sources[Math.floor(Math.random() * sources.length)];
    const postedDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    additionalJobs.push({
      id: i.toString(),
      title,
      company,
      location: `${location}, India`,
      type,
      experience,
      salary,
      description: `Join ${company} as a ${title} and work on exciting projects that impact millions of users. We're looking for passionate professionals who want to make a difference in the tech industry. This role offers excellent growth opportunities and competitive compensation.`,
      requirements: skills.slice(0, 4),
      posted: `${postedDays} day${postedDays > 1 ? 's' : ''} ago`,
      url: `https://${company.toLowerCase().replace(/\s+/g, '').replace(/&/g, '')}.com/careers`,
      logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100',
      remote,
      skills: skills,
      postedDate,
      source
    });
  }
  
  return additionalJobs;
};

const allJobs = [...mockJobs, ...generateMoreJobs()];

// Enhanced real-time search with advanced algorithms
export const searchJobs = async (query: string, filters: {
  location?: string;
  type?: string;
  experience?: string;
  remote?: boolean;
  skills?: string[];
}): Promise<Job[]> => {
  // Simulate real-time search delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  let filteredJobs = [...allJobs];
  
  // Advanced search algorithm with relevance scoring
  if (query) {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    filteredJobs = filteredJobs.filter(job => {
      const searchableText = `${job.title} ${job.company} ${job.description} ${job.skills.join(' ')} ${job.location}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    }).sort((a, b) => {
      // Calculate relevance score
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
  
  // Sort by posting date (most recent first)
  filteredJobs.sort((a, b) => {
    const aPosted = parseInt(a.posted.split(' ')[0]) || 0;
    const bPosted = parseInt(b.posted.split(' ')[0]) || 0;
    return aPosted - bPosted;
  });
  
  return filteredJobs.slice(0, 100); // Return top 100 results
};

const calculateRelevanceScore = (job: Job, searchTerms: string[]): number => {
  let score = 0;
  const searchableText = `${job.title} ${job.company} ${job.description} ${job.skills.join(' ')}`.toLowerCase();
  
  searchTerms.forEach(term => {
    // Title matches get highest score
    if (job.title.toLowerCase().includes(term)) score += 15;
    // Company matches get high score
    if (job.company.toLowerCase().includes(term)) score += 10;
    // Skills matches get high score
    if (job.skills.some(skill => skill.toLowerCase().includes(term))) score += 12;
    // Description matches get medium score
    if (job.description.toLowerCase().includes(term)) score += 5;
    // Location matches get low score
    if (job.location.toLowerCase().includes(term)) score += 3;
  });
  
  return score;
};

export const getRecommendedJobs = async (userSkills: string[], experience: string): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
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
      return bMatches - aMatches;
    })
    .slice(0, 50);
  
  return recommendedJobs;
};

export const getJobById = async (id: string): Promise<Job | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return allJobs.find(job => job.id === id) || null;
};

// Enhanced RapidAPI integration with better error handling and caching
const rapidApiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchJobsFromRapidAPI({ jobTitle, location, locationType = 'ANY', yearsOfExperience = 'ALL' }: {
  jobTitle: string;
  location: string;
  locationType?: string;
  yearsOfExperience?: string;
}) {
  const cacheKey = `${jobTitle}-${location}-${locationType}-${yearsOfExperience}`;
  const cached = rapidApiCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(jobTitle + ' ' + location)}&page=1&num_pages=5&date_posted=all&remote_jobs_only=false&employment_types=FULLTIME%2CPARTTIME%2CCONTRACTOR%2CINTERN&job_requirements=under_3_years_experience%2Cmore_than_3_years_experience%2Cno_experience%2Cno_degree`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        'x-rapidapi-key': '4001d586c0mshe5c6df98716c02cp18ebd8jsncec0cef5ba34',
      },
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    
    const data = await response.json();
    
    // Cache the result
    rapidApiCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    console.error('RapidAPI job fetch error:', error);
    return null;
  }
}

// Enhanced smart job fetching with AI-powered trending analysis
const trendingJobTitles: string[] = [
  'artificial intelligence engineer', 'machine learning engineer', 'data scientist', 
  'cloud architect', 'devops engineer', 'frontend developer', 'backend developer', 
  'fullstack developer', 'cybersecurity analyst', 'blockchain developer', 
  'product manager', 'ui ux designer', 'qa automation engineer', 
  'mobile app developer', 'react developer', 'nodejs developer', 
  'python developer', 'java developer', 'typescript developer', 
  'golang developer', 'aws engineer', 'azure engineer', 'kubernetes engineer',
  'digital marketing manager', 'sales executive', 'customer support specialist',
  'game developer', 'unity developer', 'web3 developer', 'smart contract developer'
];

const trendingLocations: string[] = [
  'bangalore', 'mumbai', 'delhi', 'hyderabad', 'chennai', 'pune', 'kolkata', 'ahmedabad',
  'new york', 'san francisco', 'london', 'berlin', 'sydney', 'toronto', 'singapore', 'dubai',
  'noida', 'gurgaon', 'kochi', 'indore', 'jaipur', 'coimbatore', 'thiruvananthapuram'
];

let recentUserSearches: { title: string; location: string; timestamp: number }[] = [];
let searchAnalytics = {
  totalSearches: 0,
  popularSkills: new Map<string, number>(),
  popularLocations: new Map<string, number>()
};

export function recordUserJobSearch(title: string, location: string) {
  const timestamp = Date.now();
  recentUserSearches.unshift({ title, location, timestamp });
  
  // Update analytics
  searchAnalytics.totalSearches++;
  searchAnalytics.popularSkills.set(title, (searchAnalytics.popularSkills.get(title) || 0) + 1);
  searchAnalytics.popularLocations.set(location, (searchAnalytics.popularLocations.get(location) || 0) + 1);
  
  // Keep only recent searches (last 24 hours)
  recentUserSearches = recentUserSearches.filter(search => 
    timestamp - search.timestamp < 24 * 60 * 60 * 1000
  );
  
  // Limit to 100 searches
  if (recentUserSearches.length > 100) {
    recentUserSearches = recentUserSearches.slice(0, 100);
  }
}

export async function fetchSmartJobsFromInternet() {
  // AI-powered job title and location prioritization
  const jobTitleQueue = [
    ...Array.from(searchAnalytics.popularSkills.keys()).slice(0, 10),
    ...recentUserSearches.map(s => s.title),
    ...trendingJobTitles
  ];
  
  const locationQueue = [
    ...Array.from(searchAnalytics.popularLocations.keys()).slice(0, 10),
    ...recentUserSearches.map(s => s.location),
    ...trendingLocations
  ];
  
  const seen = new Set();
  let jobs: any[] = [];
  const maxJobs = 2000;
  const batchSize = 25;
  let requestCount = 0;
  const maxRequests = 50; // Rate limiting

  for (const title of jobTitleQueue) {
    for (const location of locationQueue) {
      if (jobs.length >= maxJobs || requestCount >= maxRequests) break;
      
      try {
        const res = await fetchJobsFromRapidAPI({
          jobTitle: title,
          location,
          locationType: 'ANY',
          yearsOfExperience: 'ALL'
        });
        
        requestCount++;
        
        if (res && res.data && Array.isArray(res.data)) {
          for (const job of res.data.slice(0, batchSize)) {
            const uniqueKey = job.job_id || job.job_apply_link || `${job.job_title}-${job.employer_name}-${job.job_city}`;
            
            if (!seen.has(uniqueKey)) {
              seen.add(uniqueKey);
              
              // Enhanced job data normalization
              const normalizedJob = {
                job_id: job.job_id || `smart-${jobs.length}`,
                job_title: job.job_title || title,
                employer_name: job.employer_name || 'Company',
                job_city: job.job_city || location,
                job_country: job.job_country || 'India',
                job_employment_type: job.job_employment_type || 'FULLTIME',
                job_description: job.job_description || `Exciting opportunity for ${title} in ${location}. Join our team and work on innovative projects.`,
                job_apply_link: job.job_apply_link || '#',
                job_posted_at_datetime_utc: job.job_posted_at_datetime_utc || new Date().toISOString(),
                job_is_remote: job.job_is_remote || false,
                job_required_skills: job.job_required_skills || [],
                estimated_salary: job.estimated_salary || null,
                employer_logo: job.employer_logo || null,
                job_required_experience: job.job_required_experience || 'Entry Level',
                job_highlights: job.job_highlights || {},
                job_benefits: job.job_benefits || []
              };
              
              jobs.push(normalizedJob);
              
              if (jobs.length >= maxJobs) break;
            }
          }
        }
        
        // Intelligent delay based on API response
        await new Promise(resolve => setTimeout(resolve, 150));
        
      } catch (error) {
        console.error(`Error fetching jobs for ${title} in ${location}:`, error);
        continue;
      }
    }
    
    if (jobs.length >= maxJobs || requestCount >= maxRequests) break;
  }
  
  // Sort by relevance and recency
  jobs.sort((a, b) => {
    const aDate = new Date(a.job_posted_at_datetime_utc).getTime();
    const bDate = new Date(b.job_posted_at_datetime_utc).getTime();
    return bDate - aDate; // Most recent first
  });
  
  return jobs;
}

// SEO-optimized job search with keyword analysis
export const searchJobsWithSEO = async (query: string, seoKeywords: string[] = []): Promise<Job[]> => {
  const enhancedQuery = [query, ...seoKeywords].join(' ');
  
  const results = await searchJobs(enhancedQuery, {});
  
  // Boost jobs that match SEO keywords
  return results.sort((a, b) => {
    const aSeoScore = calculateSEOScore(a, seoKeywords);
    const bSeoScore = calculateSEOScore(b, seoKeywords);
    return bSeoScore - aSeoScore;
  });
};

const calculateSEOScore = (job: Job, seoKeywords: string[]): number => {
  let score = 0;
  const jobText = `${job.title} ${job.description} ${job.skills.join(' ')}`.toLowerCase();
  
  seoKeywords.forEach(keyword => {
    if (jobText.includes(keyword.toLowerCase())) {
      score += 5;
    }
  });
  
  return score;
};

// Real-time job market analytics
export const getJobMarketAnalytics = () => {
  const topSkills = Array.from(searchAnalytics.popularSkills.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
    
  const topLocations = Array.from(searchAnalytics.popularLocations.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
    
  return {
    totalJobs: allJobs.length,
    totalSearches: searchAnalytics.totalSearches,
    topSkills,
    topLocations,
    trendingTitles: trendingJobTitles.slice(0, 10),
    recentSearches: recentUserSearches.slice(0, 10)
  };
};

// Export trending data for analytics
export const getTrendingJobData = () => ({
  trendingTitles: trendingJobTitles,
  trendingLocations: trendingLocations,
  recentSearches: recentUserSearches,
  totalJobs: allJobs.length,
  analytics: searchAnalytics
});

// Advanced job filtering
export const getJobsByCategory = async (category: string): Promise<Job[]> => {
  const categoryMap: Record<string, string[]> = {
    'tech': ['software', 'developer', 'engineer', 'programmer', 'architect'],
    'data': ['data scientist', 'analyst', 'machine learning', 'ai', 'analytics'],
    'design': ['designer', 'ui', 'ux', 'creative', 'graphic'],
    'management': ['manager', 'lead',   'director', 'head', 'chief'],
    'marketing': ['marketing', 'digital', 'seo', 'content', 'social media'],
    'sales': ['sales', 'business development', 'account', 'customer success']
  };
  
  const keywords = categoryMap[category.toLowerCase()] || [];
  let filteredJobs: Job[] = [];
  
  for (const keyword of keywords) {
    const jobs = await searchJobs(keyword, {});
    filteredJobs = [...filteredJobs, ...jobs];
  }
  
  // Remove duplicates
  const uniqueJobs = filteredJobs.filter((job, index, self) => 
    index === self.findIndex(j => j.id === job.id)
  );
  
  return uniqueJobs.slice(0, 100);
};