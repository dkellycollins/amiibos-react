export class UserAmiibosService {

  public static readonly instance: UserAmiibosService = new UserAmiibosService();

  public save(collectedAmiibos: Record<string, boolean>) {
    try {
      localStorage.setItem('UserAmiibosService.collectedAmiibos', JSON.stringify(collectedAmiibos));
    } catch (error) {
      console.error(error);
    }
  }

  public load(): Record<string, boolean> {
    try {
      const data = localStorage.getItem('UserAmiibosService.collectedAmiibos');

      if (!data) {
        return {};
      }
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}

export default UserAmiibosService;