import { MainLayout } from "@/layouts/main/main-layout";
import { useEffect, useState } from "react";
import { Move } from "@/types/move";
import { MoveCard } from "@/components/move-card";

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
            <MoveCard move={move} />
          </li>
        ))}
      </ol>
    </MainLayout>
  );
}
