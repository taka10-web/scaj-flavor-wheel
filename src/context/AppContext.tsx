import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type {
  Lang,
  TabId,
  UnifiedNote,
  CuppingScores,
  BeanMetadata,
} from "../types/note";
import { DEFAULT_SCORES, DEFAULT_BEAN, SCORE_KEYS } from "../types/note";

interface DraftNote {
  bean: BeanMetadata;
  date: string;
  scores: CuppingScores;
  comment: string;
  editingId: string | null;
}

interface AppContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;

  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;

  selectedFlavors: Set<string>;
  toggleFlavor: (id: string) => void;
  clearFlavors: () => void;
  setSelectedFlavors: (flavors: Set<string>) => void;

  savedNotes: UnifiedNote[];
  saveNote: () => void;
  deleteNote: (id: string) => void;
  loadNote: (note: UnifiedNote) => void;

  draft: DraftNote;
  updateDraftBean: (field: keyof BeanMetadata, value: string) => void;
  updateDraftScore: (key: keyof CuppingScores, value: number) => void;
  updateDraftComment: (value: string) => void;
  updateDraftDate: (value: string) => void;
  resetDraft: () => void;
  totalScore: number;
  canSave: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

function createDefaultDraft(): DraftNote {
  return {
    bean: { ...DEFAULT_BEAN },
    date: new Date().toISOString().slice(0, 10),
    scores: { ...DEFAULT_SCORES },
    comment: "",
    editingId: null,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLocalStorage<Lang>("wheel-lang", "en");
  const [activeTab, setActiveTab] = useState<TabId>("wheel");
  const [selectedFlavors, setSelectedFlavors] = useState<Set<string>>(new Set());
  const [savedNotes, setSavedNotes] = useLocalStorage<UnifiedNote[]>(
    "cupping-notes",
    []
  );
  const [draft, setDraft] = useState<DraftNote>(createDefaultDraft);

  const toggleFlavor = useCallback((id: string) => {
    setSelectedFlavors((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clearFlavors = useCallback(() => {
    setSelectedFlavors(new Set());
  }, []);

  const totalScore = SCORE_KEYS.reduce(
    (sum, key) => sum + draft.scores[key],
    0
  );

  const canSave = draft.bean.name.trim().length > 0;

  const saveNote = useCallback(() => {
    if (!draft.bean.name.trim()) return;

    const total = SCORE_KEYS.reduce(
      (sum, key) => sum + draft.scores[key],
      0
    );

    if (draft.editingId) {
      setSavedNotes((prev) =>
        prev.map((n) =>
          n.id === draft.editingId
            ? {
                ...n,
                bean: { ...draft.bean },
                date: draft.date,
                scores: { ...draft.scores },
                totalScore: total,
                selectedFlavors: Array.from(selectedFlavors),
                comment: draft.comment,
              }
            : n
        )
      );
    } else {
      const note: UnifiedNote = {
        id: crypto.randomUUID(),
        bean: { ...draft.bean },
        date: draft.date,
        scores: { ...draft.scores },
        totalScore: total,
        selectedFlavors: Array.from(selectedFlavors),
        comment: draft.comment,
        createdAt: Date.now(),
      };
      setSavedNotes((prev) => [...prev, note]);
    }

    setDraft(createDefaultDraft());
    setSelectedFlavors(new Set());
  }, [draft, selectedFlavors, setSavedNotes]);

  const deleteNote = useCallback(
    (id: string) => {
      setSavedNotes((prev) => prev.filter((n) => n.id !== id));
    },
    [setSavedNotes]
  );

  const loadNote = useCallback(
    (note: UnifiedNote) => {
      setDraft({
        bean: { ...note.bean },
        date: note.date,
        scores: { ...note.scores },
        comment: note.comment,
        editingId: note.id,
      });
      setSelectedFlavors(new Set(note.selectedFlavors));
      setActiveTab("score");
    },
    []
  );

  const updateDraftBean = useCallback(
    (field: keyof BeanMetadata, value: string) => {
      setDraft((prev) => ({
        ...prev,
        bean: { ...prev.bean, [field]: value },
      }));
    },
    []
  );

  const updateDraftScore = useCallback(
    (key: keyof CuppingScores, value: number) => {
      setDraft((prev) => ({
        ...prev,
        scores: { ...prev.scores, [key]: value },
      }));
    },
    []
  );

  const updateDraftComment = useCallback((value: string) => {
    setDraft((prev) => ({ ...prev, comment: value }));
  }, []);

  const updateDraftDate = useCallback((value: string) => {
    setDraft((prev) => ({ ...prev, date: value }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(createDefaultDraft());
    setSelectedFlavors(new Set());
  }, []);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        activeTab,
        setActiveTab,
        selectedFlavors,
        toggleFlavor,
        clearFlavors,
        setSelectedFlavors,
        savedNotes,
        saveNote,
        deleteNote,
        loadNote,
        draft,
        updateDraftBean,
        updateDraftScore,
        updateDraftComment,
        updateDraftDate,
        resetDraft,
        totalScore,
        canSave,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
