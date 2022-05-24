import fs from 'fs';
import path from 'path';
import uploadConfig from '../config/uploadConfig';
import IFilesRepository from './IFilesRepository';

export default class FilesRepository implements IFilesRepository{
    constructor(){}

    public async save(file: string): Promise<string>{
        await fs.promises.rename(path.resolve(uploadConfig.tmpFolder, file),
                                path.resolve(uploadConfig.uploadsFolder, file));

        return file;
    }

    public async delete(file: string){
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try{
            await fs.promises.stat(filePath);
        } catch(err){}

        await fs.promises.unlink(filePath);
    }
}