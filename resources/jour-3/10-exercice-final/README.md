# 1 - Importer la base de données MFLIX

# 2 - Créer une API répondant en JSON

# 3 - Créer différentes routes :

    > GET /movies/ pour récupérer tous les films

    > GET /movies/?id=number pour récupérer un film précis
    > GET /movies/?id=number&withComments=true pur récupérer un film et ses commentaires
    BONUS : > GET /movies/paginate/?page=P&size=X récupère X films à partir de la position P

    > POST /movies/ pour créer un film
    > PATCH /movies/?id=number pour éditer un film via un body en JSON
    > DELETE /movies/?id=number pour supprimer un film

# 4 - Gérer les erreurs et les Not found si un film n'existe pas par exemple.
