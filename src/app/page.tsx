import JapanMap from "@/components/JapanMap";
import RapperSearch from "@/components/RapperSearch";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black z-0" />
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <main className="w-full relative z-10 flex flex-col items-center justify-center p-4">
        <div className="mb-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2">
            ラッパー全国図鑑
          </h1>
          <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4">
            JAPANESE HIPHOP ARTIST ARCHIVE
          </p>
          <Button variant="outline" size="sm" asChild className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900">
            <Link href="/register">
              + Add New Rapper
            </Link>
          </Button>
        </div>

        <div className="mb-4 w-full flex justify-center">
          <RapperSearch />
        </div>

        <div className="w-full h-[85vh] flex items-center justify-center">
          <JapanMap />
        </div>
      </main>

      <footer className="mt-8 text-zinc-600 text-xs text-center z-10">
        &copy; 2026 Rapper National Encyclopedia
      </footer>
    </div>
  );
}
