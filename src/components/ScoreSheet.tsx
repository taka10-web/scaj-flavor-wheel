import { useState } from "react";
import { useApp } from "../context/AppContext";
import { t, scoreLabel } from "../data/i18n";
import { resolveFlavorName } from "../utils/flavorHelpers";
import { SCORE_KEYS } from "../types/note";
import type { CuppingScores } from "../types/note";
import ScoreSlider from "./ScoreSlider";
import FlavorWheel from "./FlavorWheel";

const PROCESSES = ["processWashed", "processNatural", "processHoney", "processOther"] as const;
const PROCESS_VALUES = ["Washed", "Natural", "Honey", "Other"];

const ROAST_LEVELS = ["roastLight", "roastMedium", "roastMediumDark", "roastDark"] as const;
const ROAST_VALUES = ["Light", "Medium", "Medium-Dark", "Dark"];

export default function ScoreSheet() {
  const {
    lang,
    draft,
    updateDraftBean,
    updateDraftScore,
    updateDraftComment,
    updateDraftDate,
    resetDraft,
    saveNote,
    totalScore,
    canSave,
    selectedFlavors,
    toggleFlavor,
  } = useApp();

  const [wheelOpen, setWheelOpen] = useState(false);
  const flavorList = Array.from(selectedFlavors);

  return (
    <div className="score-sheet">
      {/* Bean Info */}
      <section className="ss-section">
        <h2 className="ss-section-title">{t("sectionBean", lang)}</h2>

        <div className="ss-field">
          <label className="ss-label">
            {t("beanName", lang)} <span className="ss-required">{t("beanNameRequired", lang)}</span>
          </label>
          <input
            type="text"
            className="ss-input"
            value={draft.bean.name}
            onChange={(e) => updateDraftBean("name", e.target.value)}
            placeholder={t("beanNamePlaceholder", lang)}
          />
        </div>

        <div className="ss-row">
          <div className="ss-field ss-field-half">
            <label className="ss-label">{t("origin", lang)}</label>
            <input
              type="text"
              className="ss-input"
              value={draft.bean.origin}
              onChange={(e) => updateDraftBean("origin", e.target.value)}
              placeholder={t("originPlaceholder", lang)}
            />
          </div>
          <div className="ss-field ss-field-half">
            <label className="ss-label">{t("variety", lang)}</label>
            <input
              type="text"
              className="ss-input"
              value={draft.bean.variety}
              onChange={(e) => updateDraftBean("variety", e.target.value)}
              placeholder={t("varietyPlaceholder", lang)}
            />
          </div>
        </div>

        <div className="ss-field">
          <label className="ss-label">{t("process", lang)}</label>
          <div className="ss-segment-control">
            {PROCESSES.map((key, i) => (
              <button
                key={key}
                className={`ss-segment ${draft.bean.process === PROCESS_VALUES[i] ? "active" : ""}`}
                onClick={() => updateDraftBean("process", draft.bean.process === PROCESS_VALUES[i] ? "" : PROCESS_VALUES[i])}
              >
                {t(key, lang)}
              </button>
            ))}
          </div>
        </div>

        <div className="ss-field">
          <label className="ss-label">{t("roastLevel", lang)}</label>
          <div className="ss-segment-control">
            {ROAST_LEVELS.map((key, i) => (
              <button
                key={key}
                className={`ss-segment ${draft.bean.roastLevel === ROAST_VALUES[i] ? "active" : ""}`}
                onClick={() => updateDraftBean("roastLevel", draft.bean.roastLevel === ROAST_VALUES[i] ? "" : ROAST_VALUES[i])}
              >
                {t(key, lang)}
              </button>
            ))}
          </div>
        </div>

        <div className="ss-field">
          <label className="ss-label">{t("date", lang)}</label>
          <input
            type="date"
            className="ss-input"
            value={draft.date}
            onChange={(e) => updateDraftDate(e.target.value)}
          />
        </div>
      </section>

      {/* Cupping Scores */}
      <section className="ss-section">
        <h2 className="ss-section-title">{t("sectionScores", lang)}</h2>
        <div className="ss-total">
          <span className="ss-total-label">{t("totalScore", lang)}</span>
          <span className="ss-total-value">{totalScore.toFixed(2)}</span>
        </div>
        {SCORE_KEYS.map((key) => (
          <ScoreSlider
            key={key}
            label={scoreLabel(key, lang)}
            value={draft.scores[key as keyof CuppingScores]}
            onChange={(v) => updateDraftScore(key as keyof CuppingScores, v)}
          />
        ))}
      </section>

      {/* Flavors */}
      <section className="ss-section">
        <h2 className="ss-section-title">
          {t("sectionFlavors", lang)}
          {flavorList.length > 0 && <span className="ss-count"> ({flavorList.length})</span>}
        </h2>

        {flavorList.length > 0 && (
          <div className="ss-flavor-tags">
            {flavorList.map((id) => (
              <span key={id} className="ss-flavor-tag">
                {resolveFlavorName(id, lang)}
                <button
                  className="ss-flavor-tag-remove"
                  onClick={() => toggleFlavor(id)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}

        <button
          className="btn btn-outline"
          onClick={() => setWheelOpen(true)}
        >
          {t("openWheel", lang)}
        </button>
      </section>

      {/* Wheel Modal */}
      {wheelOpen && (
        <div className="modal-overlay" onClick={() => setWheelOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">
                {t("sectionFlavors", lang)}
                {flavorList.length > 0 && ` (${flavorList.length})`}
              </span>
              <button className="modal-close" onClick={() => setWheelOpen(false)}>
                {t("modalDone", lang)}
              </button>
            </div>
            <div className="modal-body">
              <FlavorWheel
                selectedFlavors={selectedFlavors}
                onToggleFlavor={toggleFlavor}
                lang={lang}
              />
            </div>
          </div>
        </div>
      )}

      {/* Comment */}
      <section className="ss-section">
        <h2 className="ss-section-title">{t("sectionComment", lang)}</h2>
        <textarea
          className="ss-textarea"
          value={draft.comment}
          onChange={(e) => updateDraftComment(e.target.value)}
          placeholder={t("commentPlaceholder", lang)}
          rows={3}
        />
      </section>

      {/* Actions */}
      <div className="ss-actions">
        <button
          className="btn btn-primary btn-lg"
          onClick={saveNote}
          disabled={!canSave}
        >
          {t("saveNote", lang)}
        </button>
        <button className="btn btn-secondary" onClick={resetDraft}>
          {t("resetForm", lang)}
        </button>
      </div>
    </div>
  );
}
