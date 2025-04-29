import { authCredentials } from "../config/envConfig.js";
import specialRoutes from "../config/specialRoutes.json" assert { type: "json" };

export function getRequestBody(route, methodData) {
  const requestBody = methodData.requestBody;
  if (requestBody?.content?.["application/json"]?.example) {
    return requestBody.content["application/json"].example;
  }

  if (route.includes("/auth/login")) {
    return {
      username: authCredentials.username,
      password: authCredentials.password,
    };
  }
  if (route.includes("/register")) {
    return {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };
  }

  if (specialRoutes[route]) {
    return specialRoutes[route];
  }

  return undefined;
}
