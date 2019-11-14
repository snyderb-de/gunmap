/* eslint-disable import/no-extraneous-dependencies */
import csvToJson from 'convert-csv-to-json';

const input = './data.csv';
const output = './public/gundata.json';

csvToJson
    .fieldDelimiter(',')
    .formatValueByType()
    .generateJsonFileFromCsv(input, output);
