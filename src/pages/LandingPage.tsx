import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Search, 
  Brain, 
  BarChart3, 
  MessageSquare, 
  Users,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-bg.jpg';

export default function LandingPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: t('aiAnalysis'),
      description: t('aiAnalysisDesc'),
    },
    {
      icon: Search,
      title: t('smartMatching'),
      description: t('smartMatchingDesc'),
    },
    {
      icon: MessageSquare,
      title: t('interviewPrepTitle'),
      description: t('interviewPrepDesc'),
    },
    {
      icon: BarChart3,
      title: t('hrReports'),
      description: t('hrReportsDesc'),
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      avatar: '👩‍💻',
      content: 'TalentMatch helped me find my dream job in just 2 weeks. The AI matching was incredibly accurate!',
    },
    {
      name: 'Michael Chen',
      role: 'HR Director',
      avatar: '👨‍💼',
      content: 'The analytics and candidate insights have revolutionized our hiring process. Highly recommended!',
    },
    {
      name: 'Emma Davis',
      role: 'Marketing Manager',
      avatar: '👩‍💼',
      content: 'The interview prep feature boosted my confidence. I aced all my interviews thanks to the AI questions.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center bg-gradient-subtle overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="hero" asChild>
                <Link to="/upload">
                  <Upload className="mr-2 h-5 w-5" />
                  {t('uploadCV')}
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/jobs">
                  <Search className="mr-2 h-5 w-5" />
                  {t('findJobs')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4 text-gradient"
            >
              Powerful Features for Modern Recruitment
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Discover how our AI-powered platform transforms the way you find jobs and hire talent
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-primary">
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '5K+', label: 'Jobs Matched' },
              { number: '95%', label: 'Success Rate' },
              { number: '500+', label: 'Companies' },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What Our Users Say
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground"
            >
              Join thousands of satisfied users who found success with TalentMatch
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join TalentMatch today and discover opportunities that match your skills perfectly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="ghost" className="text-white border-white/20 hover:bg-white/10" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}