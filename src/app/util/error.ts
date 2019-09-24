export function errorHandler(err, msgErro) {
  console.log(err);
  if (!(err && (err as any).error)) {
    return err;
  }
  if (err.status === 400) {
    err.error.message = err.error.detail;
    return err.error.message;
  }
  err.error.message = msgErro;
  return err;
}
