var socket = io();

socket.on("Data", function (Data) {
  var keys = Object.keys(Data);
  var values = Object.values(Data);
  var container = document.getElementById("tarjetas");
  for (var i = 1; i <= 100; i++) {
    if (document.getElementById(`card${i}`)) {
      document.getElementById(`card${i}`).remove();
    }
  }

  for (var i = 1; i <= keys.length; i++) {
    var el = document.createElement("div");
    el.className = "card";
    el.id = "card" + i;
    el.innerHTML = `
                <div class="card-body">
                    <h6 class="text-center card-title" id="titulo${i}">${
      keys[i - 1]
    }</h4>
                    <p class="text-center card-text" id="valor${i}">${
      values[i - 1]
    }</p>
                </div>
                `;
    container.append(el);
  }
  // var b = document.getElementById('B');
  // b.textContent = Data["Temperatura"]
  // // var c = document.getElementById('C');
  // c.textContent = `${num.toString().padStart(3)} %`;
  // var barra = document.getElementById('barra');
  // barra.style = `width: ${num}%`;
  //console.log(num)
});
