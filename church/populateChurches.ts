import { churchDB } from './db';
import { churchDirectory } from '../frontend/data/churchDirectory';

export async function populateChurches() {
  try {
    for (const church of churchDirectory) {
      // Check for duplicates
      const existing = await churchDB.queryAll<any>`
        SELECT id FROM locations WHERE name = ${church.name} OR address = ${church.address}
      `;

      if (existing.length > 0) {
        console.log(`Skipping duplicate church: ${church.name}`);
        continue;
      }

      // Transform service times
      const serviceTimes: { [key: string]: string[] } = {};
      if (church.serviceTimes) {
        for (const st of church.serviceTimes) {
          const day = st.day.toLowerCase();
          const timeStr = `${st.time} ${st.ampm}`;
          if (!serviceTimes[day]) {
            serviceTimes[day] = [];
          }
          serviceTimes[day].push(timeStr);
        }
      }

      // Insert the church
      await churchDB.queryRow<any>`
        INSERT INTO locations (
          name, address, city, state, country, postal_code,
          latitude, longitude, phone, email, website, service_times
        ) VALUES (
          ${church.name}, ${church.address}, ${church.city}, ${church.state}, 'Australia', ${church.postcode},
          ${church.coordinates.lat}, ${church.coordinates.lng}, ${church.phone || null}, ${church.email || null},
          ${church.website || null}, ${Object.keys(serviceTimes).length > 0 ? JSON.stringify(serviceTimes) : null}
        )
      `;

      console.log(`Inserted church: ${church.name}`);
    }

    console.log('Church population completed successfully');
  } catch (error) {
    console.error('Error populating churches:', error);
    throw error;
  }
}