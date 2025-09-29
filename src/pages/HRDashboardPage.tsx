import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Users, 
  Download, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  TrendingUp,
  Star,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: string;
  education: string;
  matchScore: number;
  appliedDate: string;
  status: 'new' | 'reviewing' | 'interviewed' | 'rejected' | 'hired';
}

export default function HRDashboardPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCandidates: Candidate[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Python'],
          experience: '5+ years in Full Stack Development',
          education: 'Master of Computer Science',
          matchScore: 95,
          appliedDate: '2024-01-15',
          status: 'new',
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.chen@email.com',
          phone: '+1 (555) 234-5678',
          location: 'New York, NY',
          skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Docker'],
          experience: '4+ years in Data Science',
          education: 'PhD in Data Science',
          matchScore: 92,
          appliedDate: '2024-01-14',
          status: 'reviewing',
        },
        {
          id: '3',
          name: 'Emma Davis',
          email: 'emma.davis@email.com',
          phone: '+1 (555) 345-6789',
          location: 'Austin, TX',
          skills: ['React', 'Vue.js', 'CSS', 'JavaScript', 'Figma'],
          experience: '3+ years in Frontend Development',
          education: 'Bachelor of Design',
          matchScore: 88,
          appliedDate: '2024-01-13',
          status: 'interviewed',
        },
        {
          id: '4',
          name: 'David Wilson',
          email: 'david.wilson@email.com',
          phone: '+1 (555) 456-7890',
          location: 'Seattle, WA',
          skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes', 'Docker'],
          experience: '6+ years in Backend Development',
          education: 'Bachelor of Computer Science',
          matchScore: 85,
          appliedDate: '2024-01-12',
          status: 'new',
        },
        {
          id: '5',
          name: 'Lisa Anderson',
          email: 'lisa.anderson@email.com',
          phone: '+1 (555) 567-8901',
          location: 'Los Angeles, CA',
          skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping', 'User Research'],
          experience: '4+ years in UX Design',
          education: 'Master of Design',
          matchScore: 82,
          appliedDate: '2024-01-11',
          status: 'hired',
        },
      ];
      setCandidates(mockCandidates);
      setFilteredCandidates(mockCandidates);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = candidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = !statusFilter || candidate.status === statusFilter;
      const matchesSkill = !skillFilter || candidate.skills.some(skill => 
        skill.toLowerCase().includes(skillFilter.toLowerCase())
      );

      return matchesSearch && matchesStatus && matchesSkill;
    });

    // Sort by match score
    filtered = filtered.sort((a, b) => b.matchScore - a.matchScore);
    
    setFilteredCandidates(filtered);
  }, [candidates, searchTerm, statusFilter, skillFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'reviewing': return 'bg-yellow-500';
      case 'interviewed': return 'bg-purple-500';
      case 'rejected': return 'bg-red-500';
      case 'hired': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'reviewing': return 'secondary';
      case 'interviewed': return 'outline';
      case 'rejected': return 'destructive';
      case 'hired': return 'default';
      default: return 'outline';
    }
  };

  const handleDownloadReport = () => {
    // Simulate report generation
    toast({
      title: t('success'),
      description: 'Candidate report generated successfully!',
    });
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  const stats = {
    totalCandidates: candidates.length,
    newApplications: candidates.filter(c => c.status === 'new').length,
    interviewed: candidates.filter(c => c.status === 'interviewed').length,
    hired: candidates.filter(c => c.status === 'hired').length,
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">{t('hrDashboard')}</h1>
            <p className="text-lg text-muted-foreground">
              Manage candidates and track hiring progress
            </p>
          </div>
          <Button onClick={handleDownloadReport} variant="gradient">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Candidates</p>
                  <p className="text-3xl font-bold">{stats.totalCandidates}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Applications</p>
                  <p className="text-3xl font-bold">{stats.newApplications}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interviewed</p>
                  <p className="text-3xl font-bold">{stats.interviewed}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hired</p>
                  <p className="text-3xl font-bold">{stats.hired}</p>
                </div>
                <Star className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filter Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewing">Reviewing</SelectItem>
                  <SelectItem value="interviewed">Interviewed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Filter by skill..."
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Candidates ({filteredCandidates.length})</CardTitle>
            <CardDescription>
              Comprehensive view of all candidate applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-muted h-12 w-12"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">{candidate.education}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {candidate.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {candidate.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {candidate.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`text-lg font-bold ${getMatchScoreColor(candidate.matchScore)}`}>
                            {candidate.matchScore}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(candidate.status)} className="capitalize">
                          {candidate.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {new Date(candidate.appliedDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}