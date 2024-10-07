import { open } from 'node:fs/promises';
import { join } from 'node:path';
import { ErrorToShow } from './libs.js';

const content = 'I am fresh and young';
const fileName = "fresh.txt"
const fileDirectory = join(import.meta.dirname, '/files');
const fileForCreating = join(fileDirectory, fileName);

const create = async () => {
    let fileHandler;
    try {
        fileHandler = await open(fileForCreating, 'wx');
        await fileHandler.writeFile(content);
    } catch (error) {
        let existingError = ErrorToShow[error.code];
        if (existingError) {
            throw new Error(existingError);
        }
        console.log(error);
    } finally {
        fileHandler?.close();
    }
};

await create();