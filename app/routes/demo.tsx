import type { Route } from "../+types/root";

type brewery = {
  id: string;
  name: string;
  brewery_type: string;
  address_1: string;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: number;
  latitude: number;
  phone: string | null;
  website_url: string;
  state: string;
  street: string;
};

export async function loader() {
  const response = await fetch("https://api.openbrewerydb.org/v1/breweries");
  const breweries = (await response.json()) as brewery[];

  console.log(breweries);
  return {
    title: "Página DEMO",
    data: breweries,
  };
}

export default function ({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>{loaderData.title}</h1>

      <ul className="grid grid-cols-2">
        {loaderData.data.map((brewery) => (
          <li key={brewery.id} className="border p-4">
            <h2>{brewery.name}</h2>
            <p>{brewery.brewery_type}</p>
            <p>{brewery.address_1}</p>
            <p>{brewery.address_2}</p>
            <p>{brewery.address_3}</p>
            <p>{brewery.city}</p>
            <p>{brewery.state_province}</p>
            <p>{brewery.postal_code}</p>
            <p>{brewery.country}</p>
            <p>{brewery.longitude}</p>
            <p>{brewery.latitude}</p>
            <p>{brewery.phone}</p>
            <p>{brewery.website_url}</p>
            <p>{brewery.state}</p>
            <p>{brewery.street}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
