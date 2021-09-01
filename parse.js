const fs = require('fs');
const parse = require('csv-parse');

/**
 *
 * @param {string} filePath - path to csv file
 * @returns {Object[]} - array of parsed records
 */
const processFile = async (filePath) => {
	records = [];
	const parser = fs.createReadStream(filePath).pipe(parse({ columns: true }));

	for await (const record of parser) {
		records.push(record);
	}

	return records;
};

(async () => {
	const records = await processFile(`${__dirname}/data/songs.csv`);
	const json = records.map(JSON.stringify).join(',\n');
	const writeStream = fs.createWriteStream(`${__dirname}/data/songs.json`);
	writeStream.write('[' + json + ']');
})();
