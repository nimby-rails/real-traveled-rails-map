import { Injectable } from '@nestjs/common';
import { DataService } from './data.service';
import { User } from '../auth/user';

@Injectable()
export class GeoFilesService extends DataService {
  async getUserFiles(user: User): Promise<string[]> {
    const userDirectory = this.getUserDirectoryPath(user, 'source');
    console.log(userDirectory);

    throw new Error('not implemented');
  }
}
