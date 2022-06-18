import path from 'path'
import AppError from '../errors/AppError'
import IObjectsRepository from '../repositories/IObjectsRepository';
import IFilesRepository from 'repositories/IFilesRepository';

interface IRequest{
    object_id: string;
    imageFilename?: string;
}

export default class UpdateObjectImageService{
    private objectsRepository: IObjectsRepository;
    private filesRepository: IFilesRepository;

    constructor(objectsRepository: IObjectsRepository, filesRepository: IFilesRepository){
        this.objectsRepository = objectsRepository;
        this.filesRepository = filesRepository;
    }

    public async execute({object_id, imageFilename}: IRequest) {
        if(imageFilename){
            const object = await this.objectsRepository.findById(object_id);

            if(!object){
                throw new AppError('Objecto não encontrado', 401);
            }
           
            if(object.image !== path.resolve(__dirname, '..','tmp', 'interrogation.png')){
                await this.filesRepository.delete(object.image);
            }
            
            const fileName = await this.filesRepository.save(imageFilename);

            object.image = fileName;
    
            await this.objectsRepository.update(object_id, object);

            return {message: 'Imagem alterado com sucesso'};
        }

        throw new AppError('Arquivo não encontrado', 404);
    }
}

