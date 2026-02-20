
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Rapper } from "@/types/rapper";

interface RapperSearchProps {
    rappers: Rapper[];
}

export default function RapperSearch({ rappers }: RapperSearchProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredRappers = useMemo(() => {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        return rappers.filter((rapper) =>
            rapper.name.toLowerCase().includes(lowerQuery) ||
            rapper.region.toLowerCase().includes(lowerQuery) ||
            rapper.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        ).slice(0, 10); // Limit to 10 results
    }, [query, rappers]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelect = (id: string) => {
        router.push(`/rapper/${id}`);
        setIsOpen(false);
        setQuery("");
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md mx-auto z-50">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors">
                    <Search className="h-4 w-4" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-9 pr-9 py-2 bg-zinc-900/80 border border-zinc-700 rounded-full text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-zinc-500 transition-all backdrop-blur-sm"
                    placeholder="ラッパー名、地域、タグで検索..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {isOpen && filteredRappers.length > 0 && (
                <div className="absolute mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto backdrop-blur-md">
                    <ul>
                        {filteredRappers.map((rapper) => (
                            <li
                                key={rapper.id}
                                onClick={() => handleSelect(rapper.id)}
                                className="px-4 py-3 hover:bg-zinc-800/80 cursor-pointer flex items-center gap-3 transition-colors border-b border-zinc-800/50 last:border-0"
                            >
                                {rapper.image ? (
                                    <div className="h-8 w-8 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
                                        <img src={rapper.image} alt={rapper.name} className="h-full w-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-xs font-bold text-zinc-500">
                                        {rapper.name.charAt(0)}
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <div className="text-white font-medium truncate">{rapper.name}</div>
                                    <div className="text-xs text-zinc-400 truncate">
                                        <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 mr-2">{rapper.region}</span>
                                        {rapper.tags.join(", ")}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isOpen && query && filteredRappers.length === 0 && (
                <div className="absolute mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-4 text-center text-zinc-500 backdrop-blur-md">
                    見つかりませんでした
                </div>
            )}
        </div>
    );
}
