import { useApp } from "../context/AppContext";
import { t } from "../data/i18n";
import type { TabId } from "../types/note";

const TABS: { id: TabId; labelKey: "tabWheel" | "tabScore" | "tabNotes" }[] = [
  { id: "wheel", labelKey: "tabWheel" },
  { id: "score", labelKey: "tabScore" },
  { id: "notes", labelKey: "tabNotes" },
];

function TabIcon({ id, active }: { id: TabId; active: boolean }) {
  const color = active ? "var(--c-accent)" : "var(--c-text-secondary)";
  const size = 22;

  if (id === "wheel") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="22" />
        <line x1="2" y1="12" x2="8" y2="12" />
        <line x1="16" y1="12" x2="22" y2="12" />
      </svg>
    );
  }

  if (id === "score") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    );
  }

  // notes
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export default function BottomTabs() {
  const { activeTab, setActiveTab, lang } = useApp();

  return (
    <nav className="bottom-tabs">
      {TABS.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`bottom-tab ${active ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <TabIcon id={tab.id} active={active} />
            <span className="bottom-tab-label">{t(tab.labelKey, lang)}</span>
          </button>
        );
      })}
    </nav>
  );
}
