import { getBrewery, type Brewery } from "~/beer";
import type { Route } from "../+types/root";
import { Route } from "react-router";

export async function loader({params}: Route.LoaderArgs) {
    const brewery = await getBrewery(params.id) as Brewery;
    return {
        brewery
    }
}

export default async function({loaderData}: Route.ComponentProps) {
    return (
        <div>
            <pre className="text-gray-900">{JSON.stringify(loaderData.brewery, null, 2)}</pre>
        </div>
    )
} 