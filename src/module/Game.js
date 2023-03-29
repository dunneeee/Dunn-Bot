export class Player {
  constructor(id, threadID) {
    this.id = id;
    this.threadID = threadID;
  }
}

export class Response {
  constructor({ type, data, message }) {
    this.type = type;
    this.data = data;
    this.message = message;
  }
}

export class ManagerPlayer {
  constructor(players = []) {
    this.players = players || [];
    this.clearPlayerTime = 15 * 60 * 1000;
  }
  hasPlayer(id, threadID) {
    return !!this.players.find(
      (player) => player.id == id && player.threadID == threadID
    );
  }
  addPlayer(player) {
    if (this.hasPlayer(player.id, player.threadID)) return null;
    this.players.push(player);
    if (this.clearPlayerTime) {
      setTimeout(() => {
        this.removePlayer(player.id, player.threadID);
      }, this.clearPlayerTime);
    }
    return player;
  }
  getPlayer(id, threadID) {
    return this.players.find(
      (player) => player.id == id && player.threadID == threadID
    );
  }
  removePlayer(id, threadID) {
    const player = this.getPlayer(id, threadID);
    if (!player) return null;
    this.players.splice(this.players.indexOf(player), 1);
    return player;
  }
}

// const div = document.createElement("div");
// const body = document.querySelector("body");
// const button = document.createElement("button");
// const stopButton = document.createElement("button");
// const remove = document.createElement("button");
// stopButton.innerText = "Stop Spam";
// button.innerText = "Start Spam";
// remove.innerText = "Remove";

// remove.addEventListener("click", () => {
//   div.remove();
// });
// button.addEventListener("click", () => {
//   if (window.myrun) clearInterval(window.myrun);
//   window.myrun = setInterval(() => {
//     const rand = Math.floor(Math.random() * 9);
//     let e = document.querySelectorAll(".Ce1Y1c")[rand];
//     e.click();
//     setTimeout(() => {
//       clearInterval(window.myrun);
//     }, 20000);
//   }, 20);
// });

// stopButton.addEventListener("click", () => {
//   clearInterval(window.myrun);
// });

// div.appendChild(button);
// div.appendChild(stopButton);
// div.appendChild(remove);
// div.style = `
//     position: fixed;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     right: 80px;
//     top: 0;
//     z-index: 10;
//     width: 200px;
//     height: 200px;
//     background: lightblue;
//   `;
// div.classList.add("my-button");
// body.appendChild(div);
