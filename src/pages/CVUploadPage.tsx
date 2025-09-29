import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface CVAnalysis {
  skills: string[];
  experience: string;
  education: string;
  score: number;
}

export default function CVUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const { t } = useTranslation();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        toast({
          title: t('error'),
          description: 'Please upload a PDF or DOCX file only.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    // Simulate API call for CV analysis
    setTimeout(() => {
      const mockAnalysis: CVAnalysis = {
        skills: [
          'JavaScript', 'React', 'TypeScript', 'Node.js', 'Python',
          'Machine Learning', 'Data Analysis', 'SQL', 'Git', 'AWS'
        ],
        experience: '3+ years in Software Development',
        education: 'Bachelor of Computer Science',
        score: 85,
      };

      setAnalysis(mockAnalysis);
      setIsUploading(false);

      toast({
        title: t('success'),
        description: t('uploadSuccess'),
      });
    }, 2000);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        toast({
          title: t('error'),
          description: 'Please upload a PDF or DOCX file only.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gradient">{t('cvUpload')}</h1>
          <p className="text-lg text-muted-foreground">
            Upload your CV and get instant AI-powered analysis and skill extraction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                Upload Your CV
              </CardTitle>
              <CardDescription>
                Supported formats: PDF, DOCX (Max size: 10MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  selectedFile
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {selectedFile ? (
                  <div className="space-y-4">
                    <CheckCircle className="mx-auto h-12 w-12 text-success" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={handleUpload}
                        disabled={isUploading}
                        variant="gradient"
                      >
                        {isUploading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          'Analyze CV'
                        )}
                      </Button>
                      <Button
                        onClick={() => setSelectedFile(null)}
                        variant="outline"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium">Drop your CV here</p>
                      <p className="text-muted-foreground">or click to browse</p>
                    </div>
                    <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
                      Choose File
                    </Button>
                    <input
                      id="file-input"
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                CV Analysis Results
              </CardTitle>
              <CardDescription>
                AI-powered insights from your CV
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysis ? (
                <div className="space-y-6">
                  {/* Score */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {analysis.score}
                      </span>
                    </div>
                    <p className="font-medium">CV Completeness Score</p>
                  </div>

                  {/* Experience & Education */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Experience</h4>
                      <p className="text-sm text-muted-foreground">{analysis.experience}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Education</h4>
                      <p className="text-sm text-muted-foreground">{analysis.education}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="font-medium mb-3">Extracted Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 space-y-2">
                    <Button variant="gradient" className="w-full" asChild>
                      <a href="/jobs">Find Matching Jobs</a>
                    </Button>
                    <Button variant="outline" className="w-full">
                      Download Analysis Report
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Upload your CV to see analysis results
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Better Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium">Clear Structure</h4>
                  <p className="text-sm text-muted-foreground">
                    Use clear headings for sections like Experience, Education, Skills
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium">Keywords</h4>
                  <p className="text-sm text-muted-foreground">
                    Include relevant industry keywords and technical skills
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium">Format</h4>
                  <p className="text-sm text-muted-foreground">
                    Use PDF format for best results and compatibility
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}