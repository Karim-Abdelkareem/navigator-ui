import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Heart,
  ExternalLink,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requiredSkills: string[];
  matchPercentage: number;
  postedDays: number;
}

export default function JobMatchingPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockJobs: Job[] = [
        {
          id: "1",
          title: "Senior Frontend Developer",
          company: "TechCorp Inc.",
          location: "San Francisco, CA",
          salary: "$120k - $150k",
          type: "Full-time",
          description:
            "Join our team to build next-generation web applications using React and TypeScript.",
          requiredSkills: ["React", "TypeScript", "JavaScript", "CSS", "Git"],
          matchPercentage: 95,
          postedDays: 2,
        },
        {
          id: "2",
          title: "Full Stack Engineer",
          company: "StartupXYZ",
          location: "Remote",
          salary: "$100k - $130k",
          type: "Full-time",
          description:
            "Build scalable web applications from frontend to backend using modern technologies.",
          requiredSkills: ["Node.js", "React", "Python", "AWS", "Docker"],
          matchPercentage: 87,
          postedDays: 5,
        },
        {
          id: "3",
          title: "Data Scientist",
          company: "DataFlow Analytics",
          location: "New York, NY",
          salary: "$110k - $140k",
          type: "Full-time",
          description:
            "Analyze large datasets and build machine learning models for business insights.",
          requiredSkills: [
            "Python",
            "Machine Learning",
            "SQL",
            "Pandas",
            "TensorFlow",
          ],
          matchPercentage: 82,
          postedDays: 1,
        },
        {
          id: "4",
          title: "DevOps Engineer",
          company: "CloudSystems",
          location: "Austin, TX",
          salary: "$95k - $125k",
          type: "Contract",
          description:
            "Manage cloud infrastructure and implement CI/CD pipelines.",
          requiredSkills: ["AWS", "Docker", "Kubernetes", "Git", "Linux"],
          matchPercentage: 78,
          postedDays: 3,
        },
        {
          id: "5",
          title: "UI/UX Designer",
          company: "Design Studio Pro",
          location: "Los Angeles, CA",
          salary: "$80k - $100k",
          type: "Part-time",
          description:
            "Create beautiful and intuitive user interfaces for web and mobile applications.",
          requiredSkills: [
            "Figma",
            "Adobe XD",
            "Prototyping",
            "User Research",
            "CSS",
          ],
          matchPercentage: 65,
          postedDays: 7,
        },
      ];
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requiredSkills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLocation =
        locationFilter === "all" ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesType = typeFilter === "all" || job.type === typeFilter;

      return matchesSearch && matchesLocation && matchesType;
    });

    // Sort by match percentage
    filtered = filtered.sort((a, b) => b.matchPercentage - a.matchPercentage);

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 75) return "text-warning";
    return "text-muted-foreground";
  };

  const getMatchBadgeVariant = (percentage: number) => {
    if (percentage >= 90) return "default";
    if (percentage >= 75) return "secondary";
    return "outline";
  };

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gradient">
            {t("jobMatching")}
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover jobs that perfectly match your skills and experience
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Search & Filter Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san francisco">
                    San Francisco, CA
                  </SelectItem>
                  <SelectItem value="new york">New York, NY</SelectItem>
                  <SelectItem value="austin">Austin, TX</SelectItem>
                  <SelectItem value="los angeles">Los Angeles, CA</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All job types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All job types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Results */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="h-6 bg-muted rounded w-2/3"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">
                                {job.title}
                              </h3>
                              <p className="text-muted-foreground font-medium">
                                {job.company}
                              </p>
                            </div>
                            <Badge
                              variant={getMatchBadgeVariant(
                                job.matchPercentage
                              )}
                              className="ml-4"
                            >
                              {job.matchPercentage}% match
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.salary}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {job.type}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {job.postedDays} days ago
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-3">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {job.requiredSkills.map((skill, skillIndex) => (
                              <Badge
                                key={skillIndex}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 lg:ml-4">
                          <Button
                            variant="gradient"
                            className="w-full lg:w-auto"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Apply Now
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full lg:w-auto"
                          >
                            <Heart className="mr-2 h-4 w-4" />
                            Save Job
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find more
                  opportunities
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Summary */}
        {!isLoading && filteredJobs.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Showing {filteredJobs.length} of {jobs.length} jobs
                </span>
                <span>Sorted by best match</span>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
