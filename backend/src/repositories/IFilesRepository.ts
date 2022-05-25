export default interface IFilesRepository{
    save(file: string): Promise<string>;
    delete(file: string): Promise<void>;
}