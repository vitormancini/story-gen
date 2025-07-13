export type Brewery = {
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
  
export async function getBrewery(id: string) {
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
    const brewery = await response.json() as Brewery;
    return brewery;
}