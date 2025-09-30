import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  LogOut,
  User,
  Briefcase,
  Upload,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { useThemeStore } from "@/hooks/useTheme";
import { toast } from "@/hooks/use-toast";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: t("success"),
      description: t("logoutSuccess"),
    });
    navigate("/");
  };

  const toggleLanguage = () => {
    const newLng = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLng);
    document.documentElement.dir = newLng === "ar" ? "rtl" : "ltr";
  };

  const navItems = [
    { key: "home", href: "/", icon: Briefcase },
    { key: "cvUpload", href: "/upload", icon: Upload, auth: true },
    { key: "jobMatching", href: "/jobs", icon: Briefcase, auth: true },
    {
      key: "interviewPrep",
      href: "/interview",
      icon: MessageSquare,
      auth: true,
    },
    {
      key: "hrDashboard",
      href: "/hr",
      icon: BarChart3,
      auth: true,
      role: "admin",
    },
  ];

  const filteredNavItems = navItems.filter((item) => {
    if (item.auth && !isAuthenticated) return false;
    if (item.role && user?.role !== item.role) return false;
    return true;
  });

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">TalentMatch</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {filteredNavItems.map(({ key, href, icon: Icon }) => (
            <Link
              key={key}
              to={href}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary ${
                isActivePath(href)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{t(key)}</span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="h-9 w-9"
          >
            <Globe className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Auth Actions */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 rounded-md bg-muted">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {user?.username || user?.name || user?.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t("logout")}
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">{t("login")}</Link>
              </Button>
              <Button variant="gradient" asChild>
                <Link to="/register">{t("register")}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-2">
            {filteredNavItems.map(({ key, href, icon: Icon }) => (
              <Link
                key={key}
                to={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActivePath(href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-accent"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{t(key)}</span>
              </Link>
            ))}

            <div className="pt-4 border-t">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-muted">
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {user?.username || user?.name || user?.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    {t("logout")}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("login")}
                    </Link>
                  </Button>
                  <Button variant="gradient" className="w-full" asChild>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("register")}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
