export async function getServerSideProps() {
  const res = await fetch('https://clearview-news.vercel.app/api/summary');
  const data = await res.json();

  return {
    props: {
      summary: data.summary || "Keine Zusammenfassung verfügbar.",
    },
  };
}
import React, { useState } from "react";

const date = "1. Oktober 2025";
const topic = "Gaza";

export default function Home({ summary }) {
  const [side, setSide] = useState("neutral");

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">ClearView.News</h1>
      <div className="text-center text-gray-500">{sampleData.date} • Thema: {sampleData.topic}</div>

      <div className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">🧠 Neutrale Tageszusammenfassung</h2>    
<p className="text-base whitespace-pre-line">{summary}</p>
<p className="mt-2 text-sm text-gray-500">
  Quelle: GPT-4 (OpenAI) + NewsAPI.org
</p>  
      </div>

      <div className="flex justify-between gap-4">
        <button onClick={() => setSide("left")}>⬅️ Linke Sicht</button>
        <button onClick={() => setSide("neutral")}>🔁 Neutral</button>
        <button onClick={() => setSide("right")}>Rechte Sicht ➡️</button>
      </div>

      {(side === "left" || side === "right") && (
        <div className="p-4 border rounded space-y-2">
          <h2 className="text-xl font-semibold">
            {side === "left" ? "📰 Linke Artikel" : "📰 Konservative Artikel"}
          </h2>
          {(side === "left" ? sampleData.leftArticles : sampleData.rightArticles).map((a, i) => (
            <div key={i} className="border-b pb-2"><strong>{a.source}</strong>: {a.title}</div>
          ))}
        </div>
      )}

      <div className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">📅 Timetable für heute</h2>
        <ul className="list-disc list-inside space-y-1">
          {sampleData.timetable.map((e, i) => <li key={i}><strong>{e.time}</strong> – {e.event}</li>)}
        </ul>
      </div>

      <footer className="text-center text-sm text-gray-400 mt-8">
        Made with 🧠 by ClearView.Team — Alle Inhalte basieren auf öffentlich zugänglichen Quellen.
      </footer>
    </div>
  );
}
