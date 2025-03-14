import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

// films triés par date de projection
export async function getFilms() {
    const records = await pb.collection('Film').getFullList({
        sort: 'date_projection',
    });
    return records;
}

// 2) activités triées par date
export async function getActivites() {
    const records = await pb.collection('Activite').getFullList({
        sort: 'date_heure',
    });
    return records;
}

// 3) acteurs et réalisateurs triés par ordre alphabétique
export async function getInvites() {
    const records = await pb.collection('Invite').getFullList({
        sort: 'nom',
    });
    return records;
}

// 4) infos d'un film par son ID
export async function getFilmById(id) {
    const record = await pb.collection('Film').getOne(id);
    return record;
}

// 5) infos d'une activité par son ID
export async function getActiviteById(id) {
    const record = await pb.collection('Activite').getOne(id);
    return record;
}

// 6) infos d'un acteur et réalisateur par son ID
export async function getInviteById(id) {
    const record = await pb.collection('Invite').getOne(id);
    return record;
}

// 7) activités d’un animateur donné par son ID
export async function getActivitesByInviteId(id) {
    const records = await pb.collection('Activite').getFullList({
        filter: `anime_par = '${id}'`,
    });
    return records;
}

// 8) activités d’un animateur donné par son nom
export async function getActivitesByInviteNom(nom) {
    const invites = await pb.collection('Invite').getFullList({
        filter: `nom = '${nom}'`,
    });
    if (invites.length === 0) return [];
    return await getActivitesByInviteId(invites[0].id);
}

// 9) ajouter ou modifier un film, une activité ou un invité
export async function createOrUpdate(collection, data, id = null) {
    if (id) {
        const updatedRecord = await pb.collection(collection).update(id, data);
        return updatedRecord;
    } else {
        const newRecord = await pb.collection(collection).create(data);
        return newRecord;
    }
}
