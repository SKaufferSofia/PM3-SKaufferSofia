import { CredentialModel } from "../config/data-source";
import CredentialDto from "../dtos/CredentialDto";

export const createCredentialsService = async (credentialData: CredentialDto)=> {
    const credential = await CredentialModel.create(credentialData)
    await CredentialModel.save(credential)
    return credential
    
}

export const validateCredentialsService = async (credentialData: CredentialDto)=> {
    const credential = await CredentialModel.findOne({
        where: { username: credentialData.username, password: credentialData.password },
        relations: {user : true}
    });

    if (!credential) {
        throw new Error('Los campos están incorrectos');
    }
    return credential;
}