import { Damage } from "@/components/domain/damage/damage";

export const MainFooter = () => {
  return (
    <footer className="fixed bottom-2 left-1/2 z-50 w-[calc(100%_-_1rem)] max-w-5xl -translate-x-1/2 rounded-lg border-2 border-gray-200 bg-white px-5 py-5 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:bottom-4 sm:w-[calc(100%_-_2.5rem)]">
      <Damage />
    </footer>
  );
};
