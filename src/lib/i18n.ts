import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      cvUpload: 'CV Upload',
      jobMatching: 'Job Matching',
      interviewPrep: 'Interview Prep',
      hrDashboard: 'HR Dashboard',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      
      // Hero Section
      heroTitle: 'Find Your Dream Job with AI-Powered Matching',
      heroSubtitle: 'Upload your CV, get matched with perfect opportunities, and prepare for success with our intelligent recruitment platform.',
      uploadCV: 'Upload CV',
      findJobs: 'Find Jobs',
      
      // Features
      aiAnalysis: 'AI CV Analysis',
      aiAnalysisDesc: 'Advanced AI analyzes your skills and experience',
      smartMatching: 'Smart Job Matching',
      smartMatchingDesc: 'Get matched with jobs that fit your profile perfectly',
      interviewPrepTitle: 'Interview Preparation',
      interviewPrepDesc: 'Practice with AI-generated interview questions',
      hrReports: 'HR Analytics',
      hrReportsDesc: 'Comprehensive candidate analysis and reporting',
      
      // Forms
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      confirmPassword: 'Confirm Password',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      
      // Common
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      download: 'Download',
      refresh: 'Refresh',
      
      // Notifications
      loginSuccess: 'Successfully logged in!',
      logoutSuccess: 'Successfully logged out!',
      uploadSuccess: 'CV uploaded successfully!',
      uploadError: 'Failed to upload CV. Please try again.',
    }
  },
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      cvUpload: 'رفع السيرة الذاتية',
      jobMatching: 'مطابقة الوظائف',
      interviewPrep: 'التحضير للمقابلة',
      hrDashboard: 'لوحة الموارد البشرية',
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      logout: 'تسجيل الخروج',
      
      // Hero Section
      heroTitle: 'اعثر على وظيفة أحلامك بمطابقة مدعومة بالذكاء الاصطناعي',
      heroSubtitle: 'ارفع سيرتك الذاتية، واحصل على مطابقة مع الفرص المثالية، واستعد للنجاح مع منصتنا الذكية للتوظيف.',
      uploadCV: 'رفع السيرة الذاتية',
      findJobs: 'البحث عن وظائف',
      
      // Features
      aiAnalysis: 'تحليل السيرة الذاتية بالذكاء الاصطناعي',
      aiAnalysisDesc: 'يحلل الذكاء الاصطناعي المتقدم مهاراتك وخبرتك',
      smartMatching: 'مطابقة الوظائف الذكية',
      smartMatchingDesc: 'احصل على مطابقة مع الوظائف التي تناسب ملفك الشخصي بشكل مثالي',
      interviewPrepTitle: 'التحضير للمقابلة',
      interviewPrepDesc: 'تدرب مع أسئلة المقابلة المولدة بالذكاء الاصطناعي',
      hrReports: 'تحليلات الموارد البشرية',
      hrReportsDesc: 'تحليل شامل للمرشحين وإعداد التقارير',
      
      // Forms
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      name: 'الاسم الكامل',
      confirmPassword: 'تأكيد كلمة المرور',
      signIn: 'تسجيل الدخول',
      signUp: 'التسجيل',
      
      // Common
      loading: 'جاري التحميل...',
      success: 'نجح',
      error: 'خطأ',
      submit: 'إرسال',
      cancel: 'إلغاء',
      save: 'حفظ',
      edit: 'تحرير',
      delete: 'حذف',
      download: 'تحميل',
      refresh: 'تحديث',
      
      // Notifications
      loginSuccess: 'تم تسجيل الدخول بنجاح!',
      logoutSuccess: 'تم تسجيل الخروج بنجاح!',
      uploadSuccess: 'تم رفع السيرة الذاتية بنجاح!',
      uploadError: 'فشل في رفع السيرة الذاتية. يرجى المحاولة مرة أخرى.',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;