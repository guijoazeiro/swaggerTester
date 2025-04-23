import SwaggerParser from "swagger-parser";

export async function parseSwagger(url) {
  try {
    const api = await SwaggerParser.parse(url);
    return api;
  } catch (error) {
    console.log("Erro ao parsear o swagger", error);
  }
}
