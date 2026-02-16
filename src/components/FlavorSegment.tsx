import { useRef } from "react";
import {
  describeArc,
  describeTextArc,
  getSegmentCenter,
  getRadialTextProps,
} from "../utils/geometry";
import { playClick } from "../utils/sound";
import type { Lang } from "../types/note";

interface FlavorSegmentProps {
  cx: number;
  cy: number;
  innerR: number;
  outerR: number;
  startAngle: number;
  endAngle: number;
  color: string;
  nameJa: string;
  nameEn: string;
  id: string;
  isSelected: boolean;
  isHovered: boolean;
  onToggle: (id: string) => void;
  onHoverEnter: (id: string) => void;
  onHoverLeave: () => void;
  tier: number;
  lang: Lang;
}

export default function FlavorSegment({
  cx,
  cy,
  innerR,
  outerR,
  startAngle,
  endAngle,
  color,
  nameJa,
  nameEn,
  id,
  isSelected,
  isHovered,
  onToggle,
  onHoverEnter,
  onHoverLeave,
  tier,
  lang,
}: FlavorSegmentProps) {
  const wasHoveredRef = useRef(false);
  const d = describeArc(cx, cy, innerR, outerR, startAngle, endAngle);
  const angleDiff = endAngle - startAngle;
  const label = lang === "ja" ? nameJa : nameEn;

  const handleMouseEnter = () => {
    if (!wasHoveredRef.current) playClick();
    wasHoveredRef.current = true;
    onHoverEnter(id);
  };
  const handleMouseLeave = () => {
    wasHoveredRef.current = false;
    onHoverLeave();
  };

  // --- Tier 1/2: curved text along arc ---
  const renderArcText = () => {
    const minAngle = tier === 0 ? 12 : 6;
    if (angleDiff < minAngle) return null;

    const textR = (innerR + outerR) / 2;
    const arcD = describeTextArc(cx, cy, textR, startAngle + 0.5, endAngle - 0.5);
    const arcId = `ta-${id}`;
    const fontSize = tier === 0 ? 20 : 15;
    const isDark =
      color.replace("#", "").match(/.{2}/g)?.reduce((s, c) => s + parseInt(c, 16), 0)! < 384;

    return (
      <>
        <defs>
          <path id={arcId} d={arcD} />
        </defs>
        <text
          fontSize={fontSize}
          fontWeight={tier === 0 ? 700 : 600}
          fill={isDark ? "#fff" : "#333"}
          pointerEvents="none"
          style={{ textShadow: isDark ? "0 0 3px rgba(0,0,0,0.3)" : "none" }}
        >
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            {label}
          </textPath>
        </text>
      </>
    );
  };

  // --- Tier 3: radial text extending outward ---
  const renderRadialText = () => {
    const mid = (startAngle + endAngle) / 2;
    const { x, y, rotation, anchor } = getRadialTextProps(cx, cy, outerR, mid, 8);

    return (
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        dominantBaseline="central"
        fontSize={18}
        fontWeight={700}
        fill="#333"
        transform={`rotate(${rotation}, ${x}, ${y})`}
        pointerEvents="none"
      >
        {label}
      </text>
    );
  };

  return (
    <g
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onToggle(id)}
      style={{ cursor: "pointer" }}
    >
      <path
        d={d}
        fill={color}
        stroke="#fff"
        strokeWidth={tier === 0 ? 2.5 : tier === 1 ? 1.5 : 0.8}
        opacity={isHovered ? 0.88 : 1}
      />
      {isSelected && (
        <path d={d} fill="none" stroke="#1d1d1f" strokeWidth={3} pointerEvents="none" />
      )}
      {tier <= 1 ? renderArcText() : renderRadialText()}
      <title>{`${nameJa} / ${nameEn}`}</title>
      {isSelected && (() => {
        const center = getSegmentCenter(cx, cy, innerR, outerR, startAngle, endAngle);
        return (
          <text
            x={center.x}
            y={center.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={tier === 2 ? 10 : 14}
            fill="#1d1d1f"
            pointerEvents="none"
          >
            ✓
          </text>
        );
      })()}
    </g>
  );
}
