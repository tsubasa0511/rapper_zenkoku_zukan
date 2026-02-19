"use client";

import React, { useState } from "react";
import Japan from "@svg-maps/japan";
import { useRouter } from "next/navigation";

// Utility to handle map clicks
interface MapLocation {
    id: string;
    name: string;
    path: string;
}

const JapanMap = () => {
    const router = useRouter();
    const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

    const handleLocationClick = (locationId: string) => {
        // console.log("Clicked location:", locationId);
        router.push(`/region/${locationId}`);
    };

    const handleLocationHover = (locationName: string | null) => {
        setHoveredLocation(locationName);
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center">
            {hoveredLocation && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-zinc-900 text-white border border-zinc-700 px-6 py-2 rounded-lg text-xl font-bold shadow-lg pointer-events-none z-20">
                    {hoveredLocation}
                </div>
            )}

            <svg
                viewBox={Japan.viewBox}
                className="svg-map w-full h-full max-h-[90vh]"
                aria-label={Japan.label}
            >
                {Japan.locations.map((location: MapLocation) => (
                    <path
                        key={location.id}
                        id={location.id}
                        name={location.name}
                        d={location.path}
                        className="svg-map__location"
                        onClick={() => handleLocationClick(location.id)}
                        onMouseEnter={() => handleLocationHover(location.name)}
                        onMouseLeave={() => handleLocationHover(null)}
                        tabIndex={0}
                        role="button"
                        aria-label={location.name}
                    />
                ))}
            </svg>
        </div>
    );
};

export default JapanMap;
