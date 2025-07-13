import { Link, Outlet } from "react-router";
import type { Route } from "../+types/root";
import type { Brewery } from "~/beer";

export async function loader() {
  const response = await fetch("https://api.openbrewerydb.org/v1/breweries");
  const breweries = (await response.json()) as Brewery[];

  return {
    title: "Breweries PAGE",
    data: breweries,
  };
}

export default function breweries({ loaderData }: Route.ComponentProps) {
  // Type assertion to handle the loader data
  const data = loaderData as { title: string; data: Brewery[] } | undefined;
  
  if (!data) {
    return <div className="p-8 text-center">Loading breweries...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
          <p className="text-lg text-gray-600">Discover amazing craft breweries from around the world</p>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <Outlet />
          </div>

          {/* Breweries Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.data.map((brewery: Brewery) => (
            <li key={brewery.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <Link to={`/breweries/${brewery.id}`} className="text-xl font-semibold text-blue-700 hover:text-green-700 mb-2 line-clamp-2">{brewery.name}</Link>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {brewery.brewery_type}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-3">
                {/* Address Section */}
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-700">Address</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {brewery.address_1 && <p>{brewery.address_1}</p>}
                    {brewery.address_2 && <p>{brewery.address_2}</p>}
                    {brewery.address_3 && <p>{brewery.address_3}</p>}
                    <p>{brewery.city}, {brewery.state_province} {brewery.postal_code}</p>
                    <p>{brewery.country}</p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-700">Contact</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {brewery.phone && (
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {brewery.phone}
                      </p>
                    )}
                    {brewery.website_url && (
                      <a 
                        href={brewery.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>

                {/* Location Section */}
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-700">Location</h3>
                  <div className="text-sm text-gray-600">
                    <p>Coordinates: {brewery.latitude}, {brewery.longitude}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        </div>
        
      </div>
    </div>
  );
}
