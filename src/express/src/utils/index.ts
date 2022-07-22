import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export function hashPassword(password: string){
    let salt = genSaltSync(10);
    let hash = hashSync(password, salt);

    return hash;
}

export function comparePassword(password: string, hash: string){
    return compareSync(password, hash)
}