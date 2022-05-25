import IFilesRepository from "../IFilesRepository";

export default class FakeFilesRepository implements IFilesRepository{
    private storage: string[] = [];

    constructor(){}

    public async save(file: string): Promise<string> {
        this.storage.push(file);

        return file;
    }

    public async delete(file: string): Promise<void> {
        const findIndex = this.storage.findIndex(storageFile => storageFile === file);

        this.storage.splice(findIndex, 1);
    }
}