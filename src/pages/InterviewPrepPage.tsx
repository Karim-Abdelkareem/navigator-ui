import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageSquare, RefreshCw, Lightbulb, Clock, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InterviewQuestion {
  id: string;
  type: 'behavioral' | 'technical' | 'situational';
  question: string;
  tips: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function InterviewPrepPage() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'behavioral' | 'technical' | 'situational'>('all');
  const { t } = useTranslation();

  const generateQuestions = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockQuestions: InterviewQuestion[] = [
        {
          id: '1',
          type: 'behavioral',
          question: 'Tell me about a time when you had to work with a difficult team member. How did you handle the situation?',
          tips: [
            'Use the STAR method (Situation, Task, Action, Result)',
            'Focus on your problem-solving skills',
            'Show emotional intelligence and diplomacy',
            'Highlight the positive outcome'
          ],
          difficulty: 'medium'
        },
        {
          id: '2',
          type: 'technical',
          question: 'Explain the difference between let, const, and var in JavaScript. When would you use each?',
          tips: [
            'Explain scope differences clearly',
            'Mention hoisting behavior',
            'Discuss block vs function scope',
            'Give practical examples of when to use each'
          ],
          difficulty: 'easy'
        },
        {
          id: '3',
          type: 'situational',
          question: 'How would you prioritize tasks if you had multiple urgent deadlines approaching simultaneously?',
          tips: [
            'Mention frameworks like Eisenhower Matrix',
            'Show communication with stakeholders',
            'Demonstrate time management skills',
            'Discuss delegation if applicable'
          ],
          difficulty: 'medium'
        },
        {
          id: '4',
          type: 'technical',
          question: 'Design a system to handle 1 million concurrent users. What are the key considerations?',
          tips: [
            'Discuss load balancing strategies',
            'Mention database scaling (vertical/horizontal)',
            'Talk about caching layers',
            'Consider microservices architecture'
          ],
          difficulty: 'hard'
        },
        {
          id: '5',
          type: 'behavioral',
          question: 'Describe a project you led from conception to completion. What challenges did you face?',
          tips: [
            'Show leadership and initiative',
            'Highlight project management skills',
            'Discuss problem-solving abilities',
            'Quantify the results and impact'
          ],
          difficulty: 'medium'
        },
        {
          id: '6',
          type: 'situational',
          question: 'If you disagreed with your manager\'s technical decision, how would you approach the situation?',
          tips: [
            'Show respect for hierarchy',
            'Demonstrate data-driven thinking',
            'Highlight communication skills',
            'Show willingness to learn'
          ],
          difficulty: 'medium'
        }
      ];
      
      setQuestions(mockQuestions);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  const filteredQuestions = selectedType === 'all' 
    ? questions 
    : questions.filter(q => q.type === selectedType);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'default';
      case 'medium': return 'secondary';
      case 'hard': return 'destructive';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'behavioral': return '👤';
      case 'technical': return '🔧';
      case 'situational': return '🎯';
      default: return '❓';
    }
  };

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gradient">{t('interviewPrep')}</h1>
          <p className="text-lg text-muted-foreground">
            Practice with AI-generated interview questions tailored to your profile
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold">{questions.length}</div>
              <div className="text-sm text-muted-foreground">Questions Generated</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="mx-auto h-8 w-8 text-success mb-2" />
              <div className="text-2xl font-bold">
                {questions.filter(q => q.type === 'behavioral').length}
              </div>
              <div className="text-sm text-muted-foreground">Behavioral</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-warning mb-2" />
              <div className="text-2xl font-bold">
                {questions.filter(q => q.type === 'technical').length}
              </div>
              <div className="text-sm text-muted-foreground">Technical</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Lightbulb className="mx-auto h-8 w-8 text-accent mb-2" />
              <div className="text-2xl font-bold">
                {questions.filter(q => q.type === 'situational').length}
              </div>
              <div className="text-sm text-muted-foreground">Situational</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Interview Questions</span>
              <Button onClick={generateQuestions} disabled={isLoading} variant="outline">
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Generating...' : 'New Questions'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as any)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Types</TabsTrigger>
                <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="situational">Situational</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedType} className="mt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="space-y-3">
                            <div className="h-4 bg-muted rounded w-1/4"></div>
                            <div className="h-6 bg-muted rounded w-3/4"></div>
                            <div className="h-4 bg-muted rounded w-1/2"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredQuestions.map((question, index) => (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover-lift">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-xl">{getTypeIcon(question.type)}</span>
                                <Badge variant="outline" className="capitalize">
                                  {question.type}
                                </Badge>
                                <Badge variant={getDifficultyBadgeVariant(question.difficulty)}>
                                  {question.difficulty}
                                </Badge>
                              </div>
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            </div>

                            <h3 className="text-lg font-medium mb-4 leading-relaxed">
                              {question.question}
                            </h3>

                            <div className="space-y-2">
                              <div className="flex items-center mb-2">
                                <Lightbulb className="h-4 w-4 text-primary mr-2" />
                                <span className="font-medium text-sm">Answer Tips:</span>
                              </div>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                {question.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex items-start">
                                    <span className="text-primary mr-2 mt-1">•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>General Interview Tips</CardTitle>
            <CardDescription>
              Best practices to ace your next interview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <span className="mr-2">🎯</span>
                  Preparation
                </h4>
                <p className="text-sm text-muted-foreground">
                  Research the company, role, and interviewer. Practice common questions and prepare specific examples.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <span className="mr-2">💬</span>
                  Communication
                </h4>
                <p className="text-sm text-muted-foreground">
                  Speak clearly, maintain eye contact, and use the STAR method for behavioral questions.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <span className="mr-2">❓</span>
                  Questions
                </h4>
                <p className="text-sm text-muted-foreground">
                  Prepare thoughtful questions about the role, team, and company culture to show genuine interest.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <span className="mr-2">👔</span>
                  Appearance
                </h4>
                <p className="text-sm text-muted-foreground">
                  Dress appropriately for the company culture and arrive 10-15 minutes early.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <span className="mr-2">🤝</span>
                  Follow-up
                </h4>
                <p className="text-sm text-muted-foreground">
                  Send a thank-you email within 24 hours, reiterating your interest and key qualifications.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <span className="mr-2">💪</span>
                  Confidence
                </h4>
                <p className="text-sm text-muted-foreground">
                  Stay positive, be yourself, and remember that the interview is a two-way conversation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}