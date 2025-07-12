import type { Route } from "../+types/root";

export default function({params}: Route.ComponentProps) {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Id: {params.id}</h1>
        </div>
    )
} 