'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerRapper } from '@/actions/rapper';
import { regionMapping } from '@/lib/regions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await registerRapper(formData);

        if (result.success) {
            router.push(`/rapper/${result.id}`);
        } else {
            setError(result.error || 'Failed to register rapper.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl">
                <Button variant="ghost" asChild className="mb-6 text-zinc-400 hover:text-white pl-0">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Link>
                </Button>

                <Card className="bg-zinc-950 border-zinc-800 text-zinc-100">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Register New Rapper</CardTitle>
                        <CardDescription>
                            Add a new artist to the dictionary.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                                    Rapper Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent text-white"
                                    placeholder="e.g. Zeebra"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="region" className="text-sm font-medium text-zinc-300">
                                    Region <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="region"
                                    name="region"
                                    required
                                    className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent text-white"
                                >
                                    <option value="" disabled selected>Select a prefecture</option>
                                    {Object.values(regionMapping).map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="tags" className="text-sm font-medium text-zinc-300">
                                    Tags (comma separated)
                                </label>
                                <input
                                    id="tags"
                                    name="tags"
                                    className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent text-white"
                                    placeholder="e.g. Legend, Conscious, 90s"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="bio" className="text-sm font-medium text-zinc-300">
                                    Bio <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    required
                                    rows={4}
                                    className="flex w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent text-white resize-none"
                                    placeholder="Brief biography of the artist..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="youtube" className="text-sm font-medium text-zinc-300">
                                        YouTube URL
                                    </label>
                                    <input
                                        id="youtube"
                                        name="youtube"
                                        type="url"
                                        className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent text-white"
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="twitter" className="text-sm font-medium text-zinc-300">
                                        Twitter URL
                                    </label>
                                    <input
                                        id="twitter"
                                        name="twitter"
                                        type="url"
                                        className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent text-white"
                                        placeholder="https://twitter.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="instagram" className="text-sm font-medium text-zinc-300">
                                        Instagram URL
                                    </label>
                                    <input
                                        id="instagram"
                                        name="instagram"
                                        type="url"
                                        className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent text-white"
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Register Rapper
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
