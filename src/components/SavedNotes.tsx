import { useState } from "react";
import { useApp } from "../context/AppContext";
import { t } from "../data/i18n";
import { resolveFlavorName } from "../utils/flavorHelpers";

export default function SavedNotes() {
  const { lang, savedNotes, deleteNote, loadNote } = useApp();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const sorted = [...savedNotes].sort((a, b) => b.createdAt - a.createdAt);

  if (sorted.length === 0) {
    return (
      <div className="saved-notes">
        <h2 className="sn-title">{t("savedNotesTitle", lang)}</h2>
        <p className="ss-empty">{t("noNotesYet", lang)}</p>
      </div>
    );
  }

  return (
    <div className="saved-notes">
      <h2 className="sn-title">
        {t("savedNotesTitle", lang)} ({sorted.length})
      </h2>
      <div className="sn-list">
        {sorted.map((note) => (
          <div key={note.id} className="sn-card">
            <div className="sn-card-header">
              <h3 className="sn-card-name">{note.bean.name}</h3>
              <span className="sn-card-date">{note.date}</span>
            </div>

            <div className="sn-card-score">
              {note.totalScore.toFixed(2)} <span className="sn-pts">{t("points", lang)}</span>
            </div>

            {note.bean.origin && (
              <div className="sn-card-meta">
                {[note.bean.origin, note.bean.variety, note.bean.process, note.bean.roastLevel]
                  .filter(Boolean)
                  .join(" / ")}
              </div>
            )}

            {note.selectedFlavors.length > 0 && (
              <div className="sn-card-flavors">
                {note.selectedFlavors.map((id) => (
                  <span key={id} className="ss-flavor-tag-static">
                    {resolveFlavorName(id, lang)}
                  </span>
                ))}
              </div>
            )}

            {note.comment && <p className="sn-card-comment">{note.comment}</p>}

            <div className="sn-card-actions">
              <button className="btn btn-sm" onClick={() => loadNote(note)}>
                {t("loadNote", lang)}
              </button>
              {confirmId === note.id ? (
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    deleteNote(note.id);
                    setConfirmId(null);
                  }}
                >
                  {t("confirmDelete", lang)}
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-danger-outline"
                  onClick={() => setConfirmId(note.id)}
                >
                  {t("deleteNote", lang)}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
