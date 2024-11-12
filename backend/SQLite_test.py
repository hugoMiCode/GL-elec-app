# main.py
from fastapi import FastAPI
import sqlite3
from pydantic import BaseModel

# Initialise FastAPI
app = FastAPI()

# Modèle pour les données d'utilisateur
class Utilisateur(BaseModel):
    nom: str
    email: str

# Crée ou connecte la base de données SQLite
conn = sqlite3.connect('ma_base.db', check_same_thread=False)
cursor = conn.cursor()

# Crée la table si elle n'existe pas déjà
cursor.execute('''
    CREATE TABLE IF NOT EXISTS utilisateurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        email TEXT NOT NULL
    )
''')
conn.commit()

@app.post("/utilisateurs/")
async def creer_utilisateur(utilisateur: Utilisateur):
    cursor.execute("INSERT INTO utilisateurs (nom, email) VALUES (?, ?)", (utilisateur.nom, utilisateur.email))
    conn.commit()
    return {"message": "Utilisateur ajouté avec succès"}

@app.get("/utilisateurs/")
async def lire_utilisateurs():
    cursor.execute("SELECT * FROM utilisateurs")
    utilisateurs = cursor.fetchall()
    return utilisateurs

