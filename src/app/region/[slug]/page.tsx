
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { regionMapping } from '@/lib/regions';
import rappersData from '@/data/rappers.json';
import RapperCard from '@/components/RapperCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Rapper } from '@/types/rapper';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function RegionPage({ params }: PageProps) {
    const { slug } = await params;
    const regionName = regionMapping[slug.toLowerCase()];

    if (!regionName) {
        notFound();
    }

    const rappers = (rappersData as Rapper[]).filter(r => r.region === regionName);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" asChild className="text-zinc-400 hover:text-white">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Map
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold text-white">
                        {regionName}
                    </h1>
                </div>

                {rappers.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-900 rounded-xl border border-zinc-800">
                        <p className="text-zinc-500 text-lg">No rappers registered in this region yet.</p>
                        <p className="text-zinc-600 text-sm mt-2">Coming soon...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {rappers.map(rapper => (
                            <RapperCard key={rapper.id} rapper={rapper} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
