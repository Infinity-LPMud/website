export function renderTopPlayers(dataUrl, containerId) {
  fetch(dataUrl)
    .then((response) => response.json())
    .then((players) => {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = ""; // Clear loading text

      players.forEach((player) => {
        if (!player.Name) return;
        const div = document.createElement("div");
        div.className = "p-4 rounded-lg   text-justify";
        div.textContent = `${player.Name} (${player.Level})`;
        container.appendChild(div);
      });

      // Padding cell if needed
      if (players.length % 2 !== 0) {
        const div = document.createElement("div");
        div.className = "p-4 invisible";
        div.textContent = " ";
        container.appendChild(div);
      }
    })
    .catch((error) => {
      console.error("Failed to load player data:", error);
      const container = document.getElementById(containerId);
      if (container)
        container.textContent =
          "Some sorcery prevents us from loading the top players.";
    });
}

export function renderTopPlayer(dataUrl, containerId) {
  fetch(dataUrl)
    .then((response) => response.json())
    .then((players) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      const topPlayer = players[0];
      if (!topPlayer) return;
      container.textContent = `${topPlayer.Name}`;
    })
    .catch((error) => {
      console.error("Failed to load player data:", error);
      const container = document.getElementById(containerId);
      if (container)
        container.textContent =
          "Some sorcery prevents us from loading the top players.";
    });
}
