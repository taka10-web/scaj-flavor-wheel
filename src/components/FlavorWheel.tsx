import React, { useState, useRef, useEffect, useCallback } from "react";
import { flavorWheel, countLeaves, getFlavorId, type FlavorNode } from "../data/flavors";
import FlavorSegment from "./FlavorSegment";
import type { Lang } from "../types/note";

interface FlavorWheelProps {
  selectedFlavors: Set<string>;
  onToggleFlavor: (id: string) => void;
  lang: Lang;
}

const CX = 500;
const CY = 500;
const TIER_RADII = [
  { inner: 100, outer: 190 },
  { inner: 190, outer: 310 },
  { inner: 310, outer: 420 },
];
const GAP = 0.5;
const EXPAND_FACTOR = 8;
const LERP_SPEED = 0.18;

function isLeafUnderHover(
  hoveredId: string | null,
  t1Idx: number,
  t2Idx: number,
  t3Idx: number
): boolean {
  if (!hoveredId) return false;
  const t1Id = `${t1Idx}`;
  const t2Id = `${t1Idx}-${t2Idx}`;
  const t3Id = `${t1Idx}-${t2Idx}-${t3Idx}`;
  return hoveredId === t3Id || hoveredId === t2Id || hoveredId === t1Id;
}

function computeTargetWeights(hoveredId: string | null): number[] {
  const weights: number[] = [];
  flavorWheel.forEach((tier1, t1Idx) => {
    tier1.children?.forEach((tier2, t2Idx) => {
      tier2.children?.forEach((_, t3Idx) => {
        weights.push(
          isLeafUnderHover(hoveredId, t1Idx, t2Idx, t3Idx) ? EXPAND_FACTOR : 1
        );
      });
    });
  });
  return weights;
}

function weightsToAngles(weights: number[]): number[] {
  const total = weights.reduce((s, w) => s + w, 0);
  const angles: number[] = [];
  let cur = 0;
  for (const w of weights) {
    angles.push(cur);
    cur += (w / total) * 360;
  }
  angles.push(360);
  return angles;
}

interface LeafMeta {
  t1Idx: number;
  t2Idx: number;
  t3Idx: number;
  node: FlavorNode;
  tier2Node: FlavorNode;
  tier1Node: FlavorNode;
}

function buildLeafList(): LeafMeta[] {
  const list: LeafMeta[] = [];
  flavorWheel.forEach((tier1, t1Idx) => {
    tier1.children?.forEach((tier2, t2Idx) => {
      tier2.children?.forEach((tier3, t3Idx) => {
        list.push({ t1Idx, t2Idx, t3Idx, node: tier3, tier2Node: tier2, tier1Node: tier1 });
      });
    });
  });
  return list;
}

const LEAF_LIST = buildLeafList();
const INITIAL_WEIGHTS = LEAF_LIST.map(() => 1);

export default function FlavorWheel({ selectedFlavors, onToggleFlavor, lang }: FlavorWheelProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const currentWeightsRef = useRef<number[]>([...INITIAL_WEIGHTS]);
  const targetWeightsRef = useRef<number[]>([...INITIAL_WEIGHTS]);
  const rafRef = useRef<number>(0);
  const [animatedAngles, setAnimatedAngles] = useState<number[]>(() =>
    weightsToAngles(INITIAL_WEIGHTS)
  );

  useEffect(() => {
    targetWeightsRef.current = computeTargetWeights(hoveredId);
  }, [hoveredId]);

  useEffect(() => {
    let active = true;
    const animate = () => {
      if (!active) return;
      const cur = currentWeightsRef.current;
      const tgt = targetWeightsRef.current;
      let needsUpdate = false;
      for (let i = 0; i < cur.length; i++) {
        const diff = tgt[i] - cur[i];
        if (Math.abs(diff) > 0.01) {
          cur[i] += diff * LERP_SPEED;
          needsUpdate = true;
        } else {
          cur[i] = tgt[i];
        }
      }
      if (needsUpdate) {
        setAnimatedAngles(weightsToAngles([...cur]));
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleHoverEnter = useCallback((id: string) => {
    setHoveredId(id);
  }, []);

  const handleHoverLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  const segments: React.ReactElement[] = [];
  let leafIdx = 0;

  flavorWheel.forEach((tier1, t1Idx) => {
    const t1LeafStart = leafIdx;
    const t1LeafCount = countLeaves(tier1);

    tier1.children?.forEach((tier2, t2Idx) => {
      const t2LeafStart = leafIdx;
      const t2LeafCount = countLeaves(tier2);

      tier2.children?.forEach((tier3, t3Idx) => {
        const t3Id = getFlavorId(t1Idx, t2Idx, t3Idx);
        const startAngle = animatedAngles[leafIdx];
        const endAngle = animatedAngles[leafIdx + 1];
        segments.push(
          <FlavorSegment
            key={t3Id}
            id={t3Id}
            cx={CX} cy={CY}
            innerR={TIER_RADII[2].inner}
            outerR={TIER_RADII[2].outer}
            startAngle={startAngle + GAP / 2}
            endAngle={endAngle - GAP / 2}
            color={tier3.color}
            nameJa={tier3.nameJa}
            nameEn={tier3.nameEn}
            isSelected={selectedFlavors.has(t3Id)}
            onToggle={onToggleFlavor}
            isHovered={hoveredId === t3Id}
            onHoverEnter={handleHoverEnter}
            onHoverLeave={handleHoverLeave}
            tier={2}
            lang={lang}
          />
        );
        leafIdx++;
      });

      const t2Id = getFlavorId(t1Idx, t2Idx);
      const t2Start = animatedAngles[t2LeafStart];
      const t2End = animatedAngles[t2LeafStart + t2LeafCount];
      segments.push(
        <FlavorSegment
          key={t2Id}
          id={t2Id}
          cx={CX} cy={CY}
          innerR={TIER_RADII[1].inner}
          outerR={TIER_RADII[1].outer}
          startAngle={t2Start + GAP / 2}
          endAngle={t2End - GAP / 2}
          color={tier2.color}
          nameJa={tier2.nameJa}
          nameEn={tier2.nameEn}
          isSelected={selectedFlavors.has(t2Id)}
          onToggle={onToggleFlavor}
          isHovered={hoveredId === t2Id}
          onHoverEnter={handleHoverEnter}
          onHoverLeave={handleHoverLeave}
          tier={1}
          lang={lang}
        />
      );
    });

    const t1Id = getFlavorId(t1Idx);
    const t1Start = animatedAngles[t1LeafStart];
    const t1End = animatedAngles[t1LeafStart + t1LeafCount];
    segments.push(
      <FlavorSegment
        key={t1Id}
        id={t1Id}
        cx={CX} cy={CY}
        innerR={TIER_RADII[0].inner}
        outerR={TIER_RADII[0].outer}
        startAngle={t1Start + GAP / 2}
        endAngle={t1End - GAP / 2}
        color={tier1.color}
        nameJa={tier1.nameJa}
        nameEn={tier1.nameEn}
        isSelected={selectedFlavors.has(t1Id)}
        onToggle={onToggleFlavor}
        isHovered={hoveredId === t1Id}
        onHoverEnter={handleHoverEnter}
        onHoverLeave={handleHoverLeave}
        tier={0}
        lang={lang}
      />
    );
  });

  return (
    <div id="flavor-wheel-container">
      <svg viewBox="50 50 900 900" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <circle cx={CX} cy={CY} r={98} fill="#fff" />
        {segments}
      </svg>
    </div>
  );
}
