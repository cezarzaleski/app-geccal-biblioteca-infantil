export function errorHandler(err, msgErro, apenasMsg?) {
  if (err && (err as any).error) {
    if (err.status === 400) {
      err.error.message = err.error.mensagem;
      if (apenasMsg) { return err.error.message; }
      throw((err as any).error);
    } else if (err.status === 500 && err.error.detail && !msgErro) {
      err.error.message = err.error.detail;
      if (apenasMsg) { return err.error.message; }
      throw((err as any).error);
    }
    err.error.message = msgErro;
    if (apenasMsg) { return err.error.message; }
    throw((err as any).error);
  }
  return err;
}
