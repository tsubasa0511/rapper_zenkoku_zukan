
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRappersData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Youtube, Instagram, Twitter, Music } from 'lucide-react';
import { regionMapping } from '@/lib/regions';

import LikeButton from '@/components/LikeButton';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function RapperPage({ params }: PageProps) {
    const { id } = await params;
    const rapper = getRappersData().find(r => r.id === id);

    if (!rapper) {
        notFound();
    }

    // Find the slug for the back link
    const regionSlug = Object.keys(regionMapping).find(key => regionMapping[key] === rapper.region);
    const backLink = regionSlug ? `/region/${regionSlug}` : '/';

    return (
        <div className="min-h-screen bg-black text-white p-6 flex justify-center">
            <div className="max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header Image / Placeholder */}
                <div className="h-64 relative bg-zinc-900 overflow-hidden">
                    {rapper.image ? (
                        <img
                            src={rapper.image}
                            alt={rapper.name}
                            className="w-full h-full object-cover opacity-50"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-zinc-800 to-zinc-900" />
                    )}

                    <Button variant="ghost" asChild className="absolute top-6 left-6 text-white hover:bg-black/50 backdrop-blur-sm z-10">
                        <Link href={backLink}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to {rapper.region}
                        </Link>
                    </Button>

                    <div className="absolute -bottom-16 left-8 flex items-end">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-zinc-900 border-4 border-black flex items-center justify-center text-4xl md:text-5xl font-bold z-20 overflow-hidden shadow-xl">
                            {rapper.image ? (
                                <img
                                    src={rapper.image}
                                    alt={rapper.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span>{rapper.name.charAt(0)}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-20 pb-10 px-8 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">{rapper.name}</h1>
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="bg-white text-black hover:bg-zinc-200 text-base py-1 px-3">{rapper.region}</Badge>
                                {rapper.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-zinc-400 border-zinc-700">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2 mt-6 md:mt-0 items-center">
                            <div className="mr-4">
                                <LikeButton rapperId={rapper.id} initialLikes={rapper.likes || 0} />
                            </div>
                            {rapper.social?.youtube && (
                                <Button size="icon" variant="outline" asChild className="border-zinc-700 hover:bg-zinc-800 hover:text-red-500">
                                    <Link href={rapper.social.youtube} target="_blank"><Youtube /></Link>
                                </Button>
                            )}
                            {rapper.social?.twitter && (
                                <Button size="icon" variant="outline" asChild className="border-zinc-700 hover:bg-zinc-800 hover:text-blue-400">
                                    <Link href={rapper.social.twitter} target="_blank"><Twitter /></Link>
                                </Button>
                            )}
                            {rapper.social?.instagram && (
                                <Button size="icon" variant="outline" asChild className="border-zinc-700 hover:bg-zinc-800 hover:text-pink-500">
                                    <Link href={rapper.social.instagram} target="_blank"><Instagram /></Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    <Separator className="my-8 bg-zinc-800" />

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white border-l-4 border-white pl-3">
                                Profile
                            </h2>
                            <p className="text-zinc-300 leading-loose text-lg whitespace-pre-line">
                                {rapper.bio}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white border-l-4 border-zinc-500 pl-3">
                                <Music className="w-5 h-5 text-zinc-400" /> Discography
                            </h2>
                            <ul className="space-y-3">
                                {rapper.discography.length > 0 ? rapper.discography.map((song, i) => (
                                    <li key={i} className="flex items-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900 transition-colors">
                                        <span className="w-8 text-zinc-600 text-sm font-mono">0{i + 1}</span>
                                        <span className="font-medium text-zinc-200">{song}</span>
                                    </li>
                                )) : (
                                    <li className="text-zinc-500 italic">No discography listed.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
