document.getElementById('search-btn').addEventListener('click', () => {
  const playerTag = document.getElementById('player-tag').value.trim().toUpperCase(); // Normalizza il tag a maiuscolo
  if (!playerTag.startsWith('#')) {
    alert('Inserisci un Player Tag valido che inizi con #!');
    return;
  }

  // Cerca il giocatore nei dati locali
  const player = findPlayerByTag(playerTag);

  if (player) {
    showPlayerInfo(player);
  } else {
    alert('Giocatore non trovato. Verifica il Player Tag e riprova.');
  }
});

function findPlayerByTag(tag) {
  // Cerca nei dati il giocatore con il tag specificato
  return data.tag === tag ? data : null; // Modifica se hai più giocatori in una lista
}

function showPlayerInfo(player) {
  const playerInfoDiv = document.getElementById('player-info');
  playerInfoDiv.innerHTML = ''; // Pulisce le informazioni precedenti

  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.textContent = player.name || 'Sconosciuto';

  const details = document.createElement('p');
  details.innerHTML = `
    <strong>Tag:</strong> ${player.tag}<br>
    <strong>Nome:</strong> ${player.name}<br>
    <strong>Colore Nome:</strong> ${player.nameColor}<br>
    <strong>Icon ID:</strong> ${player.icon.id}<br>
    <strong>Trofei:</strong> ${player.trophies}<br>
    <strong>Trofei Massimi:</strong> ${player.highestTrophies}<br>
    <strong>Livello Esperienza:</strong> ${player.expLevel}<br>
    <strong>Punti Esperienza:</strong> ${player.expPoints}<br>
    <strong>Qualificato per il Campionato:</strong> ${player.isQualifiedFromChampionshipChallenge ? 'Sì' : 'No'}<br>
    <strong>Vittorie 3vs3:</strong> ${player["3vs3Victories"]}<br>
    <strong>Vittorie in Solitario:</strong> ${player.soloVictories}<br>
    <strong>Vittorie in Duo:</strong> ${player.duoVictories}<br>
    <strong>Miglior Tempo Robo Rumble:</strong> ${player.bestRoboRumbleTime}<br>
    <strong>Miglior Tempo Big Brawler:</strong> ${player.bestTimeAsBigBrawler}<br>
    <strong>Club:</strong> ${player.club?.name || 'Nessun club'} (${player.club?.tag || 'N/A'})<br>
  `;

  const brawlers = document.createElement('p');
  brawlers.innerHTML = '<strong>Brawlers:</strong><br>' + player.brawlers.map(brawler => `
    <strong>${brawler.name}:</strong>
    Power: ${brawler.power}, Rank: ${brawler.rank}, Trofei: ${brawler.trophies}<br>
  `).join('<br>');

  card.appendChild(title);
  card.appendChild(details);
  card.appendChild(brawlers);

  playerInfoDiv.appendChild(card);
}