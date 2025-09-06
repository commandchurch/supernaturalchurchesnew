import { api } from "encore.dev/api";
import { churchDB } from "./db";

interface FindChurchesRequest {
  lat: number;
  lng: number;
  radius: number;
  filters?: {
    serviceType?: string;
    day?: string;
    time?: string;
    verifiedStatus?: boolean;
  };
}

interface ChurchResult {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  serviceTimes: any;
  isActive: boolean;
  distance: number;
}

interface FindChurchesResponse {
  churches: ChurchResult[];
}

export const findChurches = api<FindChurchesRequest, FindChurchesResponse>(
  {
    expose: true,
    method: "GET",
    path: "/church/find"
  },
  async (req: FindChurchesRequest) => {
    const { lat, lng, radius, filters } = req;

    if (lat == null || lng == null) {
      return { churches: [] };
    }

    let query = `
      SELECT
        id, name, address, city, state, country, postal_code,
        latitude, longitude, phone, email, website, service_times, is_active,
        ST_DistanceSphere(ST_Point(longitude, latitude), ST_Point($1, $2)) / 1000 AS distance
      FROM locations
      WHERE latitude IS NOT NULL AND longitude IS NOT NULL
        AND ST_DistanceSphere(ST_Point(longitude, latitude), ST_Point($1, $2)) / 1000 <= $3
    `;

    const params: any[] = [lng, lat, radius];

    if (filters?.verifiedStatus !== undefined) {
      query += ` AND is_active = $${params.length + 1}`;
      params.push(filters.verifiedStatus);
    }

    if (filters?.day) {
      query += ` AND service_times ? $${params.length + 1}`;
      params.push(filters.day);
    }

    // For time, it's more complex since service_times[day] is an array
    // For simplicity, we'll skip time filter for now, or assume it's handled client-side
    // If needed, can add more complex JSON querying

    query += ` ORDER BY distance`;

    const results = await churchDB.queryAll`
      SELECT
        id, name, address, city, state, country, postal_code,
        latitude, longitude, phone, email, website, service_times, is_active,
        ST_DistanceSphere(ST_Point(longitude, latitude), ST_Point(${lng}, ${lat})) / 1000 AS distance
      FROM locations
      WHERE latitude IS NOT NULL AND longitude IS NOT NULL
        AND ST_DistanceSphere(ST_Point(longitude, latitude), ST_Point(${lng}, ${lat})) / 1000 <= ${radius}
      ${filters?.verifiedStatus !== undefined ? `AND is_active = ${filters.verifiedStatus}` : ''}
      ${filters?.day ? `AND service_times ? ${filters.day}` : ''}
      ORDER BY distance
    `;

    const churches: ChurchResult[] = results.map((row: any) => ({
      id: row.id,
      name: row.name,
      address: row.address,
      city: row.city,
      state: row.state,
      country: row.country,
      postalCode: row.postal_code,
      latitude: row.latitude,
      longitude: row.longitude,
      phone: row.phone,
      email: row.email,
      website: row.website,
      serviceTimes: row.service_times,
      isActive: row.is_active,
      distance: row.distance
    }));

    return { churches };
  }
);