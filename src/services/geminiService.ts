const GEMINI_API_KEY = 'AIzaSyBS9GMNth3NocYCEABb3maGb0xWD1aemjQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface GeminiAnalysis {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  jobMatches: string[];
  skillGaps: string[];
  industryTrends: string[];
  salaryInsights: string;
  keywords: string[];
  overallRating: number;
}

export interface JobRecommendation {
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  description: string;
  requirements: string[];
  url: string;
}

export const analyzeResumeWithGemini = async (resumeData: any): Promise<GeminiAnalysis> => {
  try {
    const prompt = `Analyze this resume data and provide detailed feedback:

Personal Info: ${JSON.stringify(resumeData.personalInfo)}
Experience: ${JSON.stringify(resumeData.experience)}
Education: ${JSON.stringify(resumeData.education)}
Skills: ${JSON.stringify(resumeData.skills)}
Projects: ${JSON.stringify(resumeData.projects)}

Please provide analysis in this exact JSON format:
{
  "atsScore": number (0-100),
  "strengths": ["strength1", "strength2", ...],
  "weaknesses": ["weakness1", "weakness2", ...],
  "suggestions": ["suggestion1", "suggestion2", ...],
  "jobMatches": ["job1", "job2", ...],
  "skillGaps": ["skill1", "skill2", ...],
  "industryTrends": ["trend1", "trend2", ...],
  "salaryInsights": "salary range and insights",
  "keywords": ["keyword1", "keyword2", ...],
  "overallRating": number (0-10)
}

Focus on Indian job market and provide actionable insights.`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text;

    if (!aiResponse) {
      throw new Error('No response from Gemini API');
    }

    // Extract JSON from the response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Fallback to local analysis if JSON parsing fails
    return generateLocalAnalysis(resumeData);

  } catch (error) {
    console.error('Gemini API error:', error);
    // Fallback to local analysis
    return generateLocalAnalysis(resumeData);
  }
};

export const getJobRecommendationsWithAI = async (skills: string[]): Promise<JobRecommendation[]> => {
  try {
    const prompt = `Based on these skills: ${skills.join(', ')}, recommend 10 relevant jobs in the Indian market.

Provide response in this exact JSON format:
{
  "jobs": [
    {
      "title": "job title",
      "company": "company name",
      "location": "city, state",
      "salary": "₹X-Y LPA",
      "matchScore": number (0-100),
      "description": "brief description",
      "requirements": ["req1", "req2", ...],
      "url": "application url"
    }
  ]
}

Focus on real companies and realistic salary ranges for India.`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text;

    if (!aiResponse) {
      throw new Error('No response from Gemini API');
    }

    // Extract JSON from the response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.jobs || [];
    }

    // Fallback to local recommendations
    return generateLocalJobRecommendations(skills);

  } catch (error) {
    console.error('Gemini job recommendations error:', error);
    // Fallback to local recommendations
    return generateLocalJobRecommendations(skills);
  }
};

const generateLocalAnalysis = (resumeData: any): GeminiAnalysis => {
  let atsScore = 70;
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];
  const jobMatches: string[] = [];
  const skillGaps: string[] = [];

  // Calculate ATS score
  if (resumeData.personalInfo?.name) atsScore += 5;
  if (resumeData.personalInfo?.email) atsScore += 5;
  if (resumeData.personalInfo?.phone) atsScore += 5;
  if (resumeData.personalInfo?.summary?.length > 50) atsScore += 10;
  if (resumeData.skills?.length >= 5) atsScore += 10;
  if (resumeData.experience?.length >= 2) atsScore += 5;

  // Analyze strengths
  if (resumeData.skills?.length > 5) strengths.push('Diverse skill set');
  if (resumeData.experience?.length > 2) strengths.push('Strong work experience');
  if (resumeData.projects?.length > 0) strengths.push('Practical project experience');

  // Analyze weaknesses
  if (!resumeData.personalInfo?.summary || resumeData.personalInfo.summary.length < 50) {
    weaknesses.push('Weak professional summary');
  }
  if (resumeData.skills?.length < 5) weaknesses.push('Limited skills section');

  // Generate suggestions
  suggestions.push('Add quantifiable achievements');
  suggestions.push('Include relevant certifications');
  suggestions.push('Optimize keywords for ATS');

  // Job matching
  if (resumeData.skills?.includes('React')) jobMatches.push('Frontend Developer');
  if (resumeData.skills?.includes('Python')) jobMatches.push('Backend Developer');
  if (resumeData.skills?.includes('Data Science')) jobMatches.push('Data Scientist');

  return {
    atsScore: Math.min(atsScore, 100),
    strengths,
    weaknesses,
    suggestions,
    jobMatches,
    skillGaps: ['Cloud platforms', 'DevOps tools', 'Modern frameworks'],
    industryTrends: ['AI/ML integration', 'Remote work', 'Cloud-first approach'],
    salaryInsights: 'Based on your skills, expect ₹8-25 LPA in India',
    keywords: [...(resumeData.skills || []), 'software engineer', 'developer'],
    overallRating: Math.min(atsScore / 10, 10)
  };
};

const generateLocalJobRecommendations = (skills: string[]): JobRecommendation[] => {
  const jobTemplates = [
    {
      title: 'Senior Software Engineer',
      company: 'Google India',
      location: 'Bangalore, Karnataka',
      salary: '₹25-40 LPA',
      description: 'Build scalable systems for billions of users',
      requirements: ['JavaScript', 'React', 'System Design'],
      url: 'https://careers.google.com'
    },
    {
      title: 'Full Stack Developer',
      company: 'Microsoft India',
      location: 'Hyderabad, Telangana',
      salary: '₹20-35 LPA',
      description: 'Develop end-to-end solutions',
      requirements: ['React', 'Node.js', 'TypeScript'],
      url: 'https://careers.microsoft.com'
    },
    {
      title: 'Data Scientist',
      company: 'Amazon India',
      location: 'Mumbai, Maharashtra',
      salary: '₹18-30 LPA',
      description: 'Use ML to solve business problems',
      requirements: ['Python', 'Machine Learning', 'SQL'],
      url: 'https://amazon.jobs'
    }
  ];

  return jobTemplates.map((job, index) => ({
    ...job,
    matchScore: 85 + Math.floor(Math.random() * 15)
  }));
};