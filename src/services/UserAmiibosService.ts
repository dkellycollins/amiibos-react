export class UserAmiibosService {

  public static readonly instance: UserAmiibosService = new UserAmiibosService();

  private readonly collectedAmiibos: Record<string, boolean>;

  public constructor() {
    this.collectedAmiibos = this.load();
  }

  public getCollectedAmiibos(): Array<string> {
    return Object.entries(this.collectedAmiibos)
      .filter(([_, collected]) => collected)
      .map(([slug]) => slug);
  }

  public isCollected(slug: string): boolean {
    return !!this.collectedAmiibos[slug];    
  }

  public toggleAmiibo(slug: string, collected: boolean) {
    this.collectedAmiibos[slug] = collected;
    this.save(this.collectedAmiibos);
  }

  private save(collectedAmiibos: Record<string, boolean>) {
    try {
      localStorage.setItem('UserAmiibosService.collectedAmiibos', JSON.stringify(collectedAmiibos));
    } catch (error) {
      console.error(error);
    }
  }

  private load(): Record<string, boolean> {
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