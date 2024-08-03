const fs = require("fs");
const DOMParser = require('xmldom').DOMParser;
const path = require('path');
const toGeoJSON = require('@mapbox/togeojson');
const geojsonMerge = require('@mapbox/geojson-merge');
const tokml = require("tokml");

let _users = [];

class User {
    constructor(name, dir) {
        this.username = name;
        this.dir = dir;
        this.source = `${dir}/source`;
    }

    async convert() {
        if (!fs.existsSync(this.source)) return

        const geojsons = getGeoJsons(this.source)
        for (const file of geojsons) {
            await fs.readFile(file, "utf8", async (error, data) => {
                if (error) console.log(error);
                let kml = tokml(JSON.parse(data));
                let newPath = file.replace("geojson", "kml");
                await fs.writeFile(newPath, kml, "utf8", (error) => {
                    if (error) console.log(error); else {
                        fs.chmodSync(newPath, 0o777)
                        console.log(file)
                        fs.unlink(file, (error) => {
                            if (error) console.log(error);
                        })
                    }
                })
            })
        }
    }

    async merge() {
        if (!fs.existsSync(this.source)) return

        const kmls = fs.readdirSync(this.source)
            .filter(file => file.endsWith(".kml"))
            .map(file => path.join(this.source, file))
        await mergeKMLs(kmls, path.join(this.dir, `${this.username}.kml`))
    }

    get kml() {
        this.convert().then(result => {
            //console.log(`converted ${this.username}`);
            this.merge().then()
        });
        return path.join(this.dir, `${this.username}.kml`);
    }
}


function createUsers(directoryPath) {
    try {
        const folderNames = fs.readdirSync(directoryPath)
            .filter(dir => fs.existsSync(path.join(directoryPath, dir, 'source')) || fs.existsSync(path.join(directoryPath, dir, `${dir}.kml`)));

        return folderNames.map((folderName) => {
            const folderPath = path.join(directoryPath, folderName);
            return new User(folderName, folderPath);
        });
    } catch (error) {
        console.error(`Error reading directory: ${error.message}`);
        return [];
    }
}

function getKmls() {
    return _users.map(user => user.kml)
}

function getGeoJsons(dir) {
    return fs.readdirSync(dir)
        .filter((file) => file.endsWith('.geojson'))
        .map((file) => path.join(dir, file));
}

function mergeKMLs(kmlFilePaths, outputFilePath) {
    try {
        const geoJSONs = kmlFilePaths.map(filePath => {
            const kml = fs.readFileSync(filePath, 'utf8');
            return toGeoJSON.kml(new DOMParser().parseFromString(kml, 'utf8'));
        });

        const mergedGeoJSON = geojsonMerge.merge(geoJSONs);

        const kml = tokml(mergedGeoJSON);
        fs.writeFileSync(outputFilePath, kml, 'utf8');

        console.log(`Merged KML written to: ${outputFilePath}`);
    } catch (error) {
        console.error(`Error processing and merging KML files: ${error.message}`);
    }
}

async function process() {
    const dir = "/var/www/html/nimby/map/data"
    _users = createUsers(dir)

    await mergeKMLs(getKmls(), path.join(dir, "NRR.kml"))
}

process().then();