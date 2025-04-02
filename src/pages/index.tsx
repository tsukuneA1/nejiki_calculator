import Image from "next/image";
import { MainLayout } from "@/layouts/main/main-layout";
import { useEffect, useState } from "react";

type Move = {
  id: number;
  name: string;
  type: string;
  power: number;
  accuracy: number;
  pp: number;
  super: number;
  
}

export default function Home() {
  const [moves, setMoves] = useState<Move[]>([]);

  useEffect(() => {
    fetch("/api/moves")
      .then((res) => res.json())
      .then((data) => setMoves(data))
      .catch((error) => console.error('Error fetching moves:', error));
  }, []);
  return (
    <MainLayout>
      <h2>hello world</h2>
      <ol>
        {moves.map((move) => (
          <li key={move.id}>
            <strong>{move.name} - Type: {move.type}, Power: {move.power ?? 'N/A'}, Accuracy: {move.accuracy ?? 'N/A'}</strong> 
          </li>
        ))}
      </ol>
    </MainLayout>
  );
}
