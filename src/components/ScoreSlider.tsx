interface ScoreSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function ScoreSlider({ label, value, onChange }: ScoreSliderProps) {
  return (
    <div className="score-slider">
      <div className="score-slider-header">
        <span className="score-slider-label">{label}</span>
        <span className="score-slider-value">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        step={0.25}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="score-slider-input"
      />
    </div>
  );
}
