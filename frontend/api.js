function getData() {
    fetch('http://10.8.0.1:9008/api/simulation')  // Appel vers le backend Node.js
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultat').textContent = 'Résultat: ' + data.resultat;
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}
