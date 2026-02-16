/**
 * 角度をラジアンに変換
 */
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * 極座標→デカルト座標
 */
export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = degToRad(angleDeg - 90); // 12時方向を0度に
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

/**
 * 円弧セグメント（ドーナツ型）のSVG pathのd属性を生成
 */
export function describeArc(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
): string {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);

  const angleDiff = endAngle - startAngle;
  const largeArcFlag = angleDiff > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

/**
 * セグメント中央の角度を計算
 */
export function midAngle(startAngle: number, endAngle: number): number {
  return (startAngle + endAngle) / 2;
}

/**
 * テキスト配置用：セグメント中央のポイントを取得
 */
export function getSegmentCenter(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
): { x: number; y: number; angle: number } {
  const mid = midAngle(startAngle, endAngle);
  const r = (innerR + outerR) / 2;
  const pos = polarToCartesian(cx, cy, r, mid);
  return { ...pos, angle: mid };
}

/**
 * テキストの回転角度を計算（読みやすい向きに）
 */
export function getTextRotation(angle: number): number {
  // 12時方向=0度、時計回りの角度
  const rot = angle - 90;
  // 下半分にある場合は180度回転して読みやすく
  if (angle > 90 && angle < 270) {
    return rot + 180;
  }
  return rot;
}

/**
 * テキストのアンカー位置を決定
 */
export function getTextAnchor(angle: number): "start" | "end" | "middle" {
  if (angle > 90 && angle < 270) {
    return "end";
  }
  return "start";
}

/**
 * textPath用の円弧パスを生成（下半分は逆方向でテキストが正しく表示される）
 */
export function describeTextArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const mid = (startAngle + endAngle) / 2;
  const isBottom = mid > 90 && mid < 270;
  const angleDiff = endAngle - startAngle;
  const largeArc = angleDiff > 180 ? 1 : 0;

  if (isBottom) {
    const s = polarToCartesian(cx, cy, r, endAngle);
    const e = polarToCartesian(cx, cy, r, startAngle);
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 0 ${e.x} ${e.y}`;
  } else {
    const s = polarToCartesian(cx, cy, r, startAngle);
    const e = polarToCartesian(cx, cy, r, endAngle);
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  }
}

/**
 * Tier3用の放射状テキスト配置情報を計算
 */
export function getRadialTextProps(
  cx: number,
  cy: number,
  outerR: number,
  midAngleDeg: number,
  offset: number = 10
): { x: number; y: number; rotation: number; anchor: "start" | "end" } {
  const pos = polarToCartesian(cx, cy, outerR + offset, midAngleDeg);
  const isLeft = midAngleDeg >= 180;
  const rotation = isLeft ? midAngleDeg + 90 : midAngleDeg - 90;
  const anchor = isLeft ? "end" : "start";
  return { ...pos, rotation, anchor };
}
