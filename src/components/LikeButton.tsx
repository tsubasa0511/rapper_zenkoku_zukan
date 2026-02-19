'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { incrementLike } from '@/actions/rapper';
import { cn } from '@/lib/utils'; // Assuming you have a utility for merging classes

interface LikeButtonProps {
    rapperId: string;
    initialLikes: number;
}

export default function LikeButton({ rapperId, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if inside a Link
        e.stopPropagation();

        if (isUpdating) return;

        // Optimistic update
        setLikes(prev => prev + 1);
        setIsLiked(true);
        setIsUpdating(true);

        const result = await incrementLike(rapperId);

        if (!result.success) {
            console.error("Like failed:", result.error);
            // Revert on failure
            setLikes(prev => prev - 1);
            setIsLiked(false);
        }

        setIsUpdating(false);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
                "group flex items-center gap-1 hover:bg-zinc-800",
                isLiked && "text-pink-500"
            )}
            disabled={isUpdating}
        >
            <Heart
                className={cn(
                    "w-4 h-4 transition-all",
                    isLiked ? "fill-current scale-110" : "group-hover:scale-110"
                )}
            />
            <span className="text-xs font-mono">{likes}</span>
        </Button>
    );
}
