export function formatResult({
  method,
  route,
  status,
  success,
  warning,
  error = null,
  responseTime = null,
}) {
  return {
    method,
    route,
    status,
    success,
    warning,
    error,
    responseTime,
  };
}
