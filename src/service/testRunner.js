import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL;

export async function runGetTests(paths) {
  const results = [];

  for (const route in paths) {
    if (paths[route].get) {
      const finalRoute = route.replace(/{[^}]+}/g, "1");
      const url = `${baseUrl}${finalRoute}`;

      try {
        const response = await axios.get(url);
        results.push({ route, status: response.status });
      } catch (err) {
        results.push({ route, error: err.message });
      }
    }
  }

  return results;
}
