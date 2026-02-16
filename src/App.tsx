import { AppProvider, useApp } from "./context/AppContext";
import { t } from "./data/i18n";
import FlavorWheel from "./components/FlavorWheel";
import ScoreSheet from "./components/ScoreSheet";
import SavedNotes from "./components/SavedNotes";
import BottomTabs from "./components/BottomTabs";
import "./App.css";

function AppContent() {
  const { lang, setLang, activeTab, selectedFlavors, toggleFlavor } = useApp();

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t("appTitle", lang)}</h1>
        <div className="header-actions">
          <div className="lang-toggle">
            <button
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`lang-btn ${lang === "ja" ? "active" : ""}`}
              onClick={() => setLang("ja")}
            >
              JA
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {activeTab === "wheel" && (
          <FlavorWheel
            selectedFlavors={selectedFlavors}
            onToggleFlavor={toggleFlavor}
            lang={lang}
          />
        )}
        {activeTab === "score" && <ScoreSheet />}
        {activeTab === "notes" && <SavedNotes />}
      </main>

      <BottomTabs />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
