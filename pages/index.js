export async function getServerSideProps() {
  const res = await fetch('https://clearview-news.vercel.app/api/summary');
  const data = await res.json();

  return {
    props: {
      summary: data.summary || "Keine Zusammenfassung verfÃ¼gbar.",
    },
  };
}

import React from "react";

const date = "1. Oktober 2025";
const topic = "Gaza";

export default function Home({ summary }) {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">ClearView.News</h1>
      <div className="text-center text-gray-500">{date} â€¢ Thema: {topic}</div>

      <div className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">ðŸ§  Neutrale Tageszusammenfassung</h2>
        <p className="text-base whitespace-pre-line">{summary}</p>
        <p className="mt-2 text-sm text-gray-500">Quelle: GPT-4 (OpenAI) + NewsAPI.org</p>
      </div>

      <footer className="text-center text-sm text-gray-400 mt-8">
         by Anthony Ewert â€” Alle Inhalte basieren auf Ã¶ffentlich zugÃ¤nglichen Quellen.
      </footer>
    </div>
  );
}
