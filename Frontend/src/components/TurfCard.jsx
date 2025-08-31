// src/components/VenueCard.jsx
import React from "react";

function TurfCard({ image, name, location, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group relative w-full overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-gray-200 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
                {/* Top gradient gloss */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-white/10" />
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                  {/* tiny location pin (no extra lib) */}
                    <svg
                        className="h-4 w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                    <path d="M21 10.5C21 16 12 22 12 22S3 16 3 10.5a9 9 0 1 1 18 0Z" />
                    <circle cx="12" cy="10.5" r="2.5" />
                    </svg>
                    <span className="line-clamp-1">{location}</span>
                </div>
            </div>

            {/* Hover sheen */}
            <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background:"radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.15), transparent 40%)",
                }}
            />
        </button>
    );
}

export default TurfCard;
