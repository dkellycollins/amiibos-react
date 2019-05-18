import AmiiboModel from "./AmiiboModel";
import * as amiibosData from './lineup.model.json';

export class AmiibosService {

  public static readonly instance: AmiibosService = new AmiibosService();

  /**
   * Gets the list of Amiibos Series available.
   *
   * @returns The series available.
   */
  public getAmiiboSeries(): Array<string> {
    return this.loadAmiibos()
      .map(amiibo => amiibo.series)
      .filter(value => !!value)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
  }

  /**
   * Gets all of the available amiibos.
   *
   * @returns All available amiibos.
   */
  public getAmiibos(): Array<AmiiboModel> {
    return this.loadAmiibos();
  }

  /**
   * Gets the collection of Amiibos that belong to the specified series.
   *
   * @param series - The name of the series to filter by.
   * @returns The Amiibos that belong to specified series.
   */
  public getAmiibosBySeries(series: string): Array<AmiiboModel> {
    return this.loadAmiibos()
      .filter(amiibo => amiibo.series === series);
  }

  /**
   * Finds the Amiibo with the provided slug.
   *
   * @param slug The unique identifier of the Amiibo.
   * @returns The matching Amiibo.
   */
  public getAmiiboBySlug(slug: string): AmiiboModel {
    const result = this.loadAmiibos()
      .find(amiibo => amiibo.slug === slug);

    if (!result) {
      throw new Error(`Unable to find Amiibo with slug [${slug}]`);
    }
    return result;
  }

  /**
   * Loads Amiibos data from the raw data source.
   *
   * @returns The complete collection of Amiibos.
   */
  private loadAmiibos(): Array<AmiiboModel> {
    const { amiiboList } = amiibosData;
    return amiiboList
      .filter((amiibo: any) => amiibo.type === 'Figure')
      .map((amiibo: any) => ({
        slug: amiibo.slug,
        name: amiibo.amiiboName
          .replace('&#8482;', '')
          .replace('&#174;', ''),
        description: amiibo.overviewDescription,
        series: amiibo.series,
        figureUrl: `https://www.nintendo.com/${amiibo.figureURL}`,
        releaseDate: amiibo.releaseDateMask
      }))
      .sort((a: AmiiboModel, b: AmiiboModel) => a.name.localeCompare(b.name));
  }
}

export default AmiibosService;