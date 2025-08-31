import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Filter,
  Briefcase,
  Users,
  Star,
  ExternalLink,
  BookmarkPlus,
  Bookmark,
  TrendingUp,
  Award,
  Target,
  Zap,
  Building,
  Globe,
  Heart,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Brain,
  Eye,
  Send,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { searchJobs, getRecommendedJobs, Job, getJobMarketAnalytics, getAdvancedJobRecommendations } from '../services/jobService';
import { ResumeData } from '../utils/pdfGenerator';
import toast from 'react-hot-toast';
import { getJobRecommendationsWithAI, analyzeResumeWithGemini } from '../services/geminiService';

interface CareerPortalProps {
  isLoggedIn: boolean;
  resumeData?: ResumeData;
  onLogin: () => void;
}

const CareerPortal: React.FC<CareerPortalProps> = ({ isLoggedIn, resumeData, onLogin }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [aiJobs, setAiJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    experience: '',
    remote: undefined as boolean | undefined,
    skills: [] as string[]
  });
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'recommended' | 'ai' | 'saved'>('search');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [marketAnalytics, setMarketAnalytics] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  useEffect(() => {
    if (isLoggedIn) {
      loadInitialData();
    }
  }, [isLoggedIn]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Load market analytics
      const analytics = getJobMarketAnalytics();
      setMarketAnalytics(analytics);

      // Load initial jobs
      const initialJobs = await searchJobs('', {});
      setJobs(initialJobs);

      // Load recommended jobs if resume data exists
      if (resumeData?.skills && resumeData.skills.length > 0) {
        const recommended = await getAdvancedJobRecommendations(resumeData.skills, resumeData.experience[0]?.duration || '0-2 years');
        setRecommendedJobs(recommended);

        // Load AI-powered recommendations
        try {
          const aiRecommendations = await getJobRecommendationsWithAI(resumeData.skills);
          setAiJobs(aiRecommendations);
        } catch (error) {
          console.error('AI recommendations failed:', error);
        }
      }

      // Load saved jobs
      const saved = localStorage.getItem('savedJobs');
      if (saved) {
        setSavedJobs(JSON.parse(saved));
      }
    } catch (error) {
      toast.error('Failed to load career data');
      console.error('Career portal loading error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchJobs(searchQuery, filters);
      setJobs(results);
      
      if (results.length === 0) {
        toast.error('No jobs found. Try adjusting your search criteria.');
      } else {
        toast.success(`Found ${results.length} job opportunities!`);
      }
    } catch (error) {
      toast.error('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveJob = (jobId: string) => {
    const newSavedJobs = savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId];
    
    setSavedJobs(newSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    
    toast.success(
      savedJobs.includes(jobId) ? 'Job removed from saved' : 'Job saved successfully!',
      {
        icon: savedJobs.includes(jobId) ? '💔' : '💖',
        style: {
          borderRadius: '16px',
          background: '#1F2937',
          color: '#F9FAFB',
        }
      }
    );
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'part-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'contract': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'internship': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const JobCard: React.FC<{ job: Job | any; isRecommended?: boolean; isAI?: boolean }> = ({ job, isRecommended, isAI }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            <motion.div 
              whileHover={{ rotate: 5 }}
              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Building className="w-7 h-7 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                {job.title || job.jobTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium truncate">
                {job.company}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {isRecommended && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg"
              >
                <Star className="w-3 h-3" />
                <span>TOP MATCH</span>
              </motion.div>
            )}
            {isAI && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg"
              >
                <Brain className="w-3 h-3" />
                <span>AI PICK</span>
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSaveJob(job.id)}
              className={`p-2 rounded-xl transition-all shadow-lg ${
                savedJobs.includes(job.id)
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              {savedJobs.includes(job.id) ? (
                <Heart className="w-5 h-5 fill-current" />
              ) : (
                <BookmarkPlus className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4" />
            <span>{job.posted || 'Recently'}</span>
          </div>
          {job.salary && (
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded-lg font-medium">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
          )}
          {job.remote && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg">
              🌍 REMOTE
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize shadow-sm ${getJobTypeColor(job.type)}`}>
            {(job.type || 'full-time').replace('-', ' ')}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
            {job.experience || 'Any Experience'}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {(job.skills || job.requirements || []).slice(0, 4).map((skill: string, idx: number) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-200 px-3 py-1 rounded-lg text-xs font-medium border border-blue-200/50 dark:border-blue-700/50"
            >
              {skill}
            </motion.span>
          ))}
          {(job.skills || job.requirements || []).length > 4 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
              +{(job.skills || job.requirements || []).length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">4.8 • 1.2k reviews</span>
          </div>
          
          <motion.a
            href={job.url || job.applicationUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Match Score for AI jobs */}
        {isAI && job.matchScore && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Match Score</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${job.matchScore}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  />
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">{job.matchScore}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (!isLoggedIn) {
    return (
      <section id="careers" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Hero Section */}
            <div className="space-y-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Briefcase className="w-16 h-16 text-white" />
              </motion.div>
              
              <div className="space-y-4">
                <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white">
                  Unlock Your
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Dream Career
                  </span>
                </h2>
                
                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Access 500+ premium job opportunities with AI-powered matching, 
                  personalized recommendations, and direct applications to top companies.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: 'AI-Powered Matching',
                  description: 'Advanced algorithms analyze your skills and match you with perfect opportunities',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  icon: Target,
                  title: '500+ Premium Jobs',
                  description: 'Curated opportunities from top Indian companies and global tech giants',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: TrendingUp,
                  title: 'Career Growth Tracking',
                  description: 'Monitor applications, get interview tips, and track your career progress',
                  gradient: 'from-emerald-500 to-teal-500'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { label: 'Active Jobs', value: '500+', icon: Briefcase, color: 'text-blue-600' },
                { label: 'Companies', value: '100+', icon: Building, color: 'text-green-600' },
                { label: 'Success Rate', value: '95%', icon: Award, color: 'text-purple-600' },
                { label: 'Avg Salary', value: '₹25L', icon: TrendingUp, color: 'text-orange-600' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogin}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 mx-auto group"
              >
                <Users className="w-7 h-7" />
                <span>Start Your Career Journey</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.button>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                ✨ Free forever • 🔒 Secure & private • 🚀 Instant access
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="careers" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 px-6 py-3 rounded-full text-sm font-bold text-blue-800 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50 mb-8"
          >
            <Sparkles className="w-5 h-5" />
            <span>AI-Powered Career Portal</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your Dream Job
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Awaits You
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover opportunities that match your skills with our advanced AI matching system.
          </p>
        </motion.div>

        {/* Market Analytics */}
        {marketAnalytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12"
          >
            {[
              { label: 'Active Jobs', value: marketAnalytics.totalJobs, icon: Briefcase, color: 'from-blue-500 to-blue-600' },
              { label: 'New This Week', value: marketAnalytics.newJobsThisWeek, icon: Zap, color: 'from-green-500 to-green-600' },
              { label: 'Remote Jobs', value: marketAnalytics.remoteJobs, icon: Globe, color: 'from-purple-500 to-purple-600' },
              { label: 'Avg Salary', value: marketAnalytics.averageSalary, icon: TrendingUp, color: 'from-orange-500 to-orange-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg text-center border border-gray-100 dark:border-gray-700 group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Advanced Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 mb-12 border border-gray-100 dark:border-gray-700"
        >
          <div className="space-y-6">
            {/* Main Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for your dream job, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 min-w-[140px] text-sm sm:text-base"
              >
                <option value="">All Locations</option>
                <option value="bangalore">Bangalore</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi NCR</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="chennai">Chennai</option>
                <option value="pune">Pune</option>
              </select>

              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 min-w-[120px] text-sm sm:text-base"
              >
                <option value="">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>

              <select
                value={filters.experience}
                onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
                className="border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 min-w-[140px] text-sm sm:text-base"
              >
                <option value="">All Experience</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Search className="w-5 h-5" />
                <span>Search Jobs</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-2xl mb-12 shadow-lg border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto"
        >
          {[
            { id: 'search', label: 'All Jobs', count: jobs.length, icon: Search },
            { id: 'recommended', label: 'Recommended', count: recommendedJobs.length, icon: Target },
            { id: 'ai', label: 'AI Picks', count: aiJobs.length, icon: Brain },
            { id: 'saved', label: 'Saved', count: savedJobs.length, icon: Heart }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === tab.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {tab.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Jobs Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-6"
            >
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
                <div className="absolute inset-0 rounded-full border-4 border-purple-600/20"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Finding Perfect Opportunities</p>
                <p className="text-gray-600 dark:text-gray-400">Our AI is analyzing the best matches for you...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
            >
              {activeTab === 'search' && jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
              
              {activeTab === 'recommended' && recommendedJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <JobCard job={job} isRecommended />
                </motion.div>
              ))}
              
              {activeTab === 'ai' && aiJobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <JobCard job={job} isAI />
                </motion.div>
              ))}
              
              {activeTab === 'saved' && jobs
                .filter(job => savedJobs.includes(job.id))
                .map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {!loading && (
          (activeTab === 'search' && jobs.length === 0) ||
          (activeTab === 'recommended' && recommendedJobs.length === 0) ||
          (activeTab === 'ai' && aiJobs.length === 0) ||
          (activeTab === 'saved' && savedJobs.length === 0)
        ) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center shadow-lg"
            >
              <Search className="w-16 h-16 text-gray-400" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No Jobs Found
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {activeTab === 'saved' 
                ? "You haven't saved any jobs yet. Start exploring and save jobs you're interested in!"
                : "Try adjusting your search criteria or check back later for new opportunities."
              }
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  location: '',
                  type: '',
                  experience: '',
                  remote: undefined,
                  skills: []
                });
                handleSearch();
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Clear Filters & Search Again
            </motion.button>
          </motion.div>
        )}

        {/* AI Insights Panel */}
        {resumeData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border border-purple-200/50 dark:border-purple-700/50"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                AI Career Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Get personalized career recommendations based on your resume and market trends.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  setLoading(true);
                  try {
                    const analysis = await analyzeResumeWithGemini(resumeData);
                    setAiAnalysis(analysis);
                    toast.success('AI analysis complete!');
                  } catch (error) {
                    toast.error('AI analysis failed');
                  } finally {
                    setLoading(false);
                  }
                }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-left group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Resume Analysis</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Get AI-powered feedback on your resume</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  setLoading(true);
                  try {
                    const aiRecommendations = await getJobRecommendationsWithAI(resumeData.skills || []);
                    setAiJobs(aiRecommendations);
                    setActiveTab('ai');
                    toast.success(`Found ${aiRecommendations.length} AI-recommended jobs!`);
                  } catch (error) {
                    toast.error('Failed to get AI recommendations');
                  } finally {
                    setLoading(false);
                  }
                }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-left group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">AI Job Matching</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Get personalized job recommendations</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toast.success('Career insights coming soon!');
                }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-left group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Market Insights</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Understand salary trends and market demand</p>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CareerPortal;