import { query, connect, close } from '../config/db.js';


class UtilisateurService{
        constructor() {
            this.database = db;
        }
        // Méthode pour créer un nouvel utilisateur
        async createUser(userData) {
            try {
                connect();
                // Code pour insérer un nouvel utilisateur dans la base de données
                const newUser = await query('INSERT INTO utilisateur (pseudo, email, mdp) VALUES ($1, $2, $3) RETURNING *', [userData.pseudo, userData.email, userData.mdp]);
                close();
                return newUser;
            } catch (error) {
                console.error('Erreur lors de la création de l\'utilisateur :', error);
                throw error;
            }
        }
    
        // Méthode pour récupérer un utilisateur par son ID
        async getUserById(userId) {
            try {
                connect();
                // Code pour récupérer un utilisateur à partir de son ID dans la base de données
                const user = await query('SELECT * FROM utilisateur WHERE id = $1', [userId]);
                close();
                return user[0]; // Supposons que la requête retourne un seul utilisateur
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur :', error);
                throw error;
            }
        }
    
        // Méthode pour mettre à jour les informations d'un utilisateur
        async updateUser(userId, userData) {
            try {
                connect();
                // Code pour mettre à jour les informations de l'utilisateur dans la base de données
                const updatedUser = await query('UPDATE utilisateur SET pseudo = $1, email = $2, mdp = $3 WHERE id = $4 RETURNING *', [userData.pseudo, userData.email, userData.mdp, userId]);
                close();
                return updatedUser;
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
                throw error;
            }
        }
    
        // Méthode pour supprimer un utilisateur
        async deleteUser(userId) {
            try {
                connect();
                // Code pour supprimer un utilisateur de la base de données
                await query('DELETE FROM utilisateur WHERE id = $1', [userId]);
                close();
                return 'Utilisateur supprimé avec succès';
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur :', error);
                throw error;
            }
        }
}
export default UtilisateurService;
