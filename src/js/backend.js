import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // Remplacez par l'URL de votre instance PocketBase

// Vérifier si un utilisateur est déjà connecté
if (pb.authStore.isValid) {
    console.log("Utilisateur connecté :", pb.authStore.model);
}

// Fonction pour récupérer un enregistrement spécifique
export async function getRecord(collection, id) {
    try {
        return await pb.collection(collection).getOne(id);
    } catch (error) {
        console.error("Erreur lors de la récupération du record :", error);
        return null;
    }
}

// Fonction pour récupérer l'URL d'un fichier
export function getFileUrl(record, field, options = {}) {
    if (!record || !record[field]) return null;
    return pb.files.getUrl(record, record[field], options);
}

// Exporter `pb` pour l'utiliser ailleurs
export { pb };
