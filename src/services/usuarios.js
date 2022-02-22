import { getDataFromBackend } from '../config/config';
import { usuariosFijos } from './fakeData/usuarios';
import { getJsonFromApi } from './utils';

export async function getTodosLosUsuarios() {
    return getDataFromBackend ? getTodosLosUsuariosReal() : getTodosLosUsuariosFake();
}

async function getTodosLosUsuariosReal() {
    const apiResponse = await getJsonFromApi('usuarios');
    return apiResponse.data;
}

async function getTodosLosUsuariosFake() {
    return Promise.resolve(usuariosFijos);
}

export async function getUsuarioPorId(id) {
    return getDataFromBackend ? getUsuarioPorIdReal(id) : getUsuarioPorIdFake(id);
}

async function getUsuarioPorIdReal(id) {
    const apiResponse = await getJsonFromApi(`usuarios/${id}`);
    return apiResponse.data;
}

async function getUsuarioPorIdFake(id) {
    const elUsuario = usuariosFijos.find((usu) => usu.id === Number(id));
    if (!elUsuario) {
        throw new Error(`Le usuarie ${id} no existe`);
    }
    return Promise.resolve(elUsuario);
}
