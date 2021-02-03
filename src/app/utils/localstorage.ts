export class LocalStorageUtils {
  create(tipo: string, data: any) {
    localStorage.setItem(tipo, JSON.stringify(data));
  }

  remove(tipo: string) {
    localStorage.removeItem(tipo);
  }

  get(tipo: string): any {
    let datas = localStorage.getItem(tipo);
    if (datas)
      return JSON.parse(datas);
    else
      return;
  }
}