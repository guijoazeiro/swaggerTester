import axios from "axios";
import { formatResult } from "./formatResult.js";

export async function requestWithFormat({
  method,
  url,
  data = {},
  route,
  headers = {},
  schema,
}) {
  const start = Date.now();
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    const duration = Date.now() - start;

    let validation = { valid: true, errors: [] };

    if (schema) {
      validation = validateSchema(response.data, schema);
    }
    return formatResult({
      method: method.toUpperCase(),
      route,
      status: response.status,
      success: true,
      responseTime: duration,
      validBody: validation.valid,
      validationErrors: validation.errors,
    });
  } catch (err) {
    const duration = Date.now() - start;
    return formatResult({
      method: method.toUpperCase(),
      route,
      status: err.response?.status ?? "unknown",
      success: false,
      error: err.message,
      responseTime: duration,
    });
  }
}
