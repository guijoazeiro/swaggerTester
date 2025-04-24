export function formatResult({
  method,
  route,
  status,
  success,
  error = null,
  responseTime = null,
}) {
  return {
    method,
    route,
    status,
    success,
    error,
    responseTime,
  };
}
