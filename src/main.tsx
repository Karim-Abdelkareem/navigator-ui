import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme on app start
import { useThemeStore } from "./hooks/useTheme";
const { theme } = useThemeStore.getState();
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
