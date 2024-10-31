import * as path from "path";

export const pathUtil = {
  getDataDirectory(): string {
    const distDirectory = path.dirname(require.main.filename);
    return path.join(path.dirname(distDirectory), 'data');
  },

  getFilePath(fileName: string): string {
    return path.join(this.getDataDirectory(), fileName);
  }
}
