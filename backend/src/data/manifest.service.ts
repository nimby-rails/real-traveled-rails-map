import { Injectable } from '@nestjs/common';
import { User } from '../auth/user';
import { Manifest } from './types/Manifest';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

@Injectable()
export class DataService {
  async getOrCreateManifest(user: User): Promise<Manifest> {
    const manifestContents = await this.tryReadFile(this.getManifestPathForUser(user));
    if (manifestContents === null) {
      return await this.createDirectoryForUser(user);
    }
    return JSON.parse(manifestContents) as Manifest;
  }

  async updateManifest(user: User, manifest: Manifest): Promise<void> {
    const manifestPath = await this.getManifestPathForUser(user);
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  }

  private async createDirectoryForUser(user: User): Promise<Manifest> {
    const userDirectory = this.getDirectoryForUser(user);
    const sourceDirectory = path.join(userDirectory, `source`);
    await fs.mkdir(sourceDirectory, { recursive: true });

    const manifest: Manifest = {
      schema: 1,
      identity: {
        platform: user.platform,
        id: user.id,
        username: user.username,
      },
      profile: {
        username: user.username,
      },
    };
    const manifestPath = this.getManifestPathForUser(user);
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    return manifest;
  }

  private getDataDirectory(...dirNames: string[]): string {
    const baseDir = path.dirname(path.dirname(require.main.filename));
    return path.join(baseDir, 'data', ...dirNames);
  }

  private getDirectoryForUser(user: User): string {
    return this.getDataDirectory('members', `${user.platform}_${user.id}`);
  }

  private getManifestPathForUser(user: User): string {
    return path.join(this.getDirectoryForUser(user), 'manifest.json');
  }

  /**
   * Try to read a file
   * @param path path to file
   * @param encoding file encoding
   * @return the file's contents, or null if the file does not exist.
   */
  private async tryReadFile(path: string): Promise<string | null> {
    return new Promise((resolve) => {
      fs.readFile(path, { encoding: 'utf8' })
        .then((contents) => resolve(contents))
        .catch(() => resolve(null));
    });
  }
}
