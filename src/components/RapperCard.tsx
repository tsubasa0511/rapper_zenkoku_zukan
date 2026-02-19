
import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rapper } from "@/types/rapper";

interface RapperCardProps {
    rapper: Rapper;
}

const RapperCard: React.FC<RapperCardProps> = ({ rapper }) => {
    return (
        <Card className="w-full hover:shadow-xl transition-all duration-300 border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden group">
            <div className="h-48 w-full bg-zinc-900 relative overflow-hidden">
                {rapper.image ? (
                    <img
                        src={rapper.image}
                        alt={rapper.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 font-bold text-4xl">
                        {rapper.name.charAt(0)}
                    </div>
                )}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-zinc-950 to-transparent opacity-60" />
            </div>
            <CardHeader className="relative -mt-12 z-10">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{rapper.name}</CardTitle>
                    <Badge variant="outline" className="text-zinc-400 border-zinc-700">{rapper.region}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {rapper.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription className="line-clamp-3 text-zinc-400">
                    {rapper.bio}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/rapper/${rapper.id}`}>
                        View Profile
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default RapperCard;
