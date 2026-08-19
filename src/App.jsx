import { useState } from "react";

const C = {
  gold: "#d4aa40", goldLight: "#c8a030", text: "#2a2418",
  muted: "#b0985a", teal: "#2a7a6a", bg: "#faf6ee",
  borderGold: "#d4aa40",
};

const SAMPLE = {
  name: "田中 花子", birth: "1985年 5月 3日", type: "発信型",
  honshitsu: "伝え導く魔法のパワー", keiji: "地球への警告",
  dobutsu: "虹", animalEmoji: "🌈", animalType: "サポートチーム",
  konjoKadai: "自己愛", kadaiWord: "受容", tamashiiAge: 20,
  shadowKonjoKadai: "自己表現", shadowKadaiWord: "試練",
  kakoTeemas: ["直感", "挑戦"], guardians: ["花", "太陽"],
  kishitsu: ["リズム型", "探求型"], tokusei: ["合意"],
  kanjo: ["断捨離", "感動"],
  pwData: { 表: "使命・ビジョン", 裏: "現実・試練" },
  cycles: [
    { year: 2024, rhythm: "準備", label: "種まき" },
    { year: 2025, rhythm: "実行", label: "開花" },
    { year: 2026, rhythm: "観察", label: "収穫", isNow: true },
    { year: 2027, rhythm: "決断", label: "選択" },
    { year: 2028, rhythm: "準備", label: "種まき" },
  ],
  balance: { 行動: 0, 対人: 0, 自立: 1, 愛情: 2, 身体: 1 },
  muVal: 0, shadowVal: 4,
};

const RHYTHM_COLOR = { 準備: "#a87820", 実行: "#c04070", 観察: "#2a7a6a", 決断: "#7a4a9a" };
const RHYTHM_EMO = { 準備: "🌱", 実行: "🌸", 観察: "🍂", 決断: "⭐" };

function Section({ title, children, style = {} }) {
  return (
    <div style={{ marginBottom: "8px", breakInside: "avoid", pageBreakInside: "avoid", ...style }}>
      <div style={{
        fontSize: "7pt", fontWeight: "700", color: "#fff",
        background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
        padding: "2px 8px", borderRadius: "3px", marginBottom: "5px",
        letterSpacing: "0.15em", display: "inline-block",
      }}>{title}</div>
      <div style={{
        border: `1px solid ${C.borderGold}40`,
        borderRadius: "4px", padding: "6px 8px",
        background: "rgba(255,255,255,0.6)",
      }}>
        {children}
      </div>
    </div>
  );
}

function Label({ children }) {
  return <span style={{ fontSize: "6pt", color: C.muted, display: "block", marginBottom: "1px" }}>{children}</span>;
}

function Value({ children, large }) {
  return <span style={{ fontSize: large ? "10pt" : "8pt", fontWeight: "700", color: C.text }}>{children}</span>;
}

export default function App() {
  const [scale, setScale] = useState(0.85);
  const s = SAMPLE;

  return (
    <div style={{ minHeight: "100vh", background: "#444", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>

      {/* コントロール */}
      <div style={{ background: "#333", padding: "10px 16px", borderRadius: "10px", display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ color: "#aaa", fontSize: "12px" }}>スケール：</span>
        {[0.7, 0.8, 0.85, 0.9, 1.0].map(v => (
          <button key={v} onClick={() => setScale(v)} style={{
            padding: "4px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "11px",
            background: scale === v ? "#c8a030" : "#555", color: "#fff", border: "none",
          }}>{Math.round(v * 100)}%</button>
        ))}
        <span style={{ color: "#888", fontSize: "11px" }}>※スマホ印刷イメージ</span>
      </div>

      {/* A4プレビュー */}
      <div style={{
        width: `${210 * scale}mm`,
        background: "#faf6ee",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        fontFamily: "'Hiragino Mincho ProN','Yu Mincho',Georgia,serif",
        overflow: "hidden",
        border: "1px solid #ccc",
      }}>
        {/* ヘッダー */}
        <div style={{
          background: `linear-gradient(135deg, #2a1a0e, #3a2a1a)`,
          padding: `${6 * scale}mm ${8 * scale}mm`,
          textAlign: "center",
          maxHeight: `${25 * scale}mm`,
          overflow: "hidden",
        }}>
          <div style={{ fontSize: `${8 * scale}pt`, color: C.gold, letterSpacing: "0.4em", marginBottom: "2px" }}>✦ SOUL READING ✦</div>
          <div style={{ fontSize: `${16 * scale}pt`, fontWeight: "700", color: C.gold, letterSpacing: "0.2em", marginBottom: "2px" }}>宇宙星波学</div>
          <div style={{ fontSize: `${7 * scale}pt`, color: "#c8a030aa", letterSpacing: "0.3em" }}>TAMASHII UCHU GAKU</div>
        </div>

        {/* 名前・生年月日 */}
        <div style={{ textAlign: "center", padding: `${3 * scale}mm ${6 * scale}mm ${2 * scale}mm`, borderBottom: `1px solid ${C.borderGold}40` }}>
          <div style={{ fontSize: `${14 * scale}pt`, fontWeight: "700", color: C.text, letterSpacing: "0.15em" }}>{s.name} 様</div>
          <div style={{ fontSize: `${7 * scale}pt`, color: C.muted, marginTop: "2px" }}>{s.birth}生まれ　{s.type}</div>
        </div>

        {/* 2カラム本文 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: `${3 * scale}mm`,
          padding: `${3 * scale}mm ${4 * scale}mm`,
          fontSize: `${8.5 * scale}pt`,
        }}>

          {/* 左カラム */}
          <div>
            <Section title="魂の才能">
              <Value large>{s.honshitsu}</Value>
              <div style={{ marginTop: "3px" }}>
                <Label>魂の役割</Label>
                <Value>{s.keiji}</Value>
              </div>
            </Section>

            <Section title="コミュニケーションタイプ">
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: `${18 * scale}pt` }}>{s.animalEmoji}</span>
                <div>
                  <Value large>{s.dobutsu}</Value>
                  <div><Label>{s.animalType}</Label></div>
                </div>
              </div>
            </Section>

            <Section title="魂の成長テーマ">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px" }}>
                <div>
                  <Label>成長テーマ</Label>
                  <Value>{s.konjoKadai}</Value>
                  <div style={{ fontSize: `${6 * scale}pt`, color: C.muted }}>（{s.kadaiWord}）</div>
                </div>
                <div>
                  <Label>影テーマ</Label>
                  <Value>{s.shadowKonjoKadai}</Value>
                  <div style={{ fontSize: `${6 * scale}pt`, color: C.muted }}>（{s.shadowKadaiWord}）</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Label>魂の年齢</Label>
                  <span style={{ fontSize: `${14 * scale}pt`, fontWeight: "700", color: C.gold }}>{s.tamashiiAge}</span>
                  <span style={{ fontSize: `${7 * scale}pt`, color: C.muted }}>歳</span>
                </div>
              </div>
            </Section>

            <Section title="魂の求め">
              <div style={{ marginBottom: "4px" }}>
                <Label>理想（陽）</Label>
                <Value>☀️ {s.pwData.表}</Value>
              </div>
              <div style={{ borderTop: `1px dashed ${C.borderGold}50`, paddingTop: "4px" }}>
                <Label>課題（陰）</Label>
                <Value>🌙 {s.pwData.裏}</Value>
              </div>
            </Section>
          </div>

          {/* 右カラム */}
          <div>
            <Section title="基本資質">
              {[
                { label: "カルマ", value: s.kakoTeemas.join(" / ") },
                { label: "守護神", value: s.guardians.join(" / ") },
                { label: "魂の個性", value: s.kishitsu.join(" / ") },
                { label: "魂の基準", value: s.tokusei.join(" / ") },
                { label: "インナーチャイルド", value: s.kanjo.join(" / ") },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: "3px" }}>
                  <Label>{item.label}</Label>
                  <Value>{item.value}</Value>
                </div>
              ))}
              <div style={{ borderTop: `1px dashed ${C.borderGold}50`, marginTop: "4px", paddingTop: "3px" }}>
                <span style={{ fontSize: `${6.5 * scale}pt`, color: C.muted }}>無／影　無({s.muVal}) ／ 影({s.shadowVal})</span>
              </div>
            </Section>

            <Section title="魂のサイクル">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {s.cycles.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{
                        width: `${18 * scale}pt`, height: `${18 * scale}pt`,
                        borderRadius: "50%",
                        border: `1.5px solid ${c.isNow ? RHYTHM_COLOR[c.rhythm] : C.borderGold + "60"}`,
                        background: c.isNow ? `${RHYTHM_COLOR[c.rhythm]}20` : "rgba(255,255,255,0.4)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: `${9 * scale}pt`,
                        margin: "0 auto",
                      }}>{RHYTHM_EMO[c.rhythm]}</div>
                      <div style={{ fontSize: `${5.5 * scale}pt`, color: c.isNow ? RHYTHM_COLOR[c.rhythm] : C.muted, fontWeight: c.isNow ? "700" : "400", marginTop: "1px" }}>{c.year}</div>
                      <div style={{ fontSize: `${5.5 * scale}pt`, color: C.muted }}>{c.label}</div>
                      {c.isNow && <div style={{ fontSize: `${5 * scale}pt`, color: RHYTHM_COLOR[c.rhythm], fontWeight: "700" }}>NOW</div>}
                    </div>
                    {i < s.cycles.length - 1 && (
                      <div style={{ fontSize: `${7 * scale}pt`, color: C.gold, margin: `0 ${2 * scale}px`, marginBottom: `${10 * scale}px` }}>→</div>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="魂のバランス">
              <div style={{ fontSize: `${6 * scale}pt`, color: C.muted, display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>不足</span><span style={{ color: C.gold }}>理想ライン</span><span>過多</span>
              </div>
              {[
                { icon: "🏃", label: "行動" }, { icon: "👥", label: "対人" },
                { icon: "🏅", label: "自立" }, { icon: "💖", label: "愛情" }, { icon: "🌿", label: "身体" },
              ].map((item, i) => {
                const val = s.balance[item.label] || 0;
                const pct = val === 0 ? 8 : val === 1 ? 44 : val === 2 ? 70 : 95;
                const col = val === 0 ? "#8080c0" : val === 1 ? C.gold : val === 2 ? "#e09050" : "#d06060";
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
                    <span style={{ fontSize: `${9 * scale}pt`, width: "14px" }}>{item.icon}</span>
                    <div style={{ flex: 1, height: "4px", background: "rgba(0,0,0,0.1)", borderRadius: "2px", overflow: "hidden", position: "relative" }}>
                      <div style={{ position: "absolute", left: "42%", top: 0, bottom: 0, width: "1px", background: C.gold, opacity: 0.4 }} />
                      <div style={{ height: "100%", width: `${pct}%`, background: col, borderRadius: "2px" }} />
                    </div>
                    <span style={{ fontSize: `${5.5 * scale}pt`, color: col, width: "22px", textAlign: "right" }}>
                      {val === 0 ? "不足" : val === 1 ? "best" : val === 2 ? "多め" : "過多"}
                    </span>
                  </div>
                );
              })}
            </Section>
          </div>
        </div>

        {/* フッター */}
        <div style={{
          textAlign: "center", padding: `${2 * scale}mm`,
          borderTop: `1px solid ${C.borderGold}40`,
          fontSize: `${6 * scale}pt`, color: C.muted, letterSpacing: "0.3em",
        }}>
          ✦ 宇宙星波学 ✦ Soul Reading ✦
        </div>
      </div>

      <div style={{ color: "#888", fontSize: "11px", textAlign: "center" }}>
        ※ スマホ印刷時のイメージです。スケールを変えて確認できます。
      </div>
    </div>
  );
}
