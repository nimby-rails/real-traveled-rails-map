import * as fs from 'fs/promises';
import { Controller, Get } from '@nestjs/common';
import { KmlToGeojson } from 'kml-to-geojson';
import { pathUtil } from '../utils/pathUtil';

@Controller("api/data")
export class DataController {
  kmlToGeojson: KmlToGeojson;

  constructor() {
    this.kmlToGeojson = new KmlToGeojson();
  }

  @Get("global")
  async getGlobalGeojson(): Promise<string> {
    const filePath = pathUtil.getFilePath('NRR.geojson');
    return await fs.readFile(filePath, 'utf8');
  }

  @Get("global-from-kml")
  async getGlobalGeojsonFromKml(): Promise<any> {
    const filePath = pathUtil.getFilePath('NRR.kml');

    const fileContents = await fs.readFile(filePath, 'utf8');
    const { geojson } = this.kmlToGeojson.parse(fileContents);

    return geojson;
  }
}
