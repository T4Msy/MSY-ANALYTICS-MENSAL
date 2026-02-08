document.getElementById("analisarBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("chatFile");
  const dataInicio = document.getElementById("dataInicio").value;
  const dataFim = document.getElementById("dataFim").value;
  const resultadoDiv = document.getElementById("resultadoHTML");

  if (!fileInput.files.length || !dataInicio || !dataFim) {
    alert("Envie o arquivo e selecione as datas.");
    return;
  }

  const text = await fileInput.files[0].text();
  resultadoDiv.innerHTML = "<p style='text-align:center; padding:20px;'>⏳ Processando na central Masayoshi...</p>";

  try {
    const response = await fetch("https://warm-polls-treasury-gay.trycloudflare.com/webhook/relatorio-mensal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat: text, inicio: dataInicio, fim: dataFim })
    });

    const data = await response.json();
    if (data.html) {
      resultadoDiv.innerHTML = data.html;
      configurarFiltros();
    }
  } catch (err) {
    resultadoDiv.innerHTML = "<p style='color:red; text-align:center;'>Erro ao conectar com o n8n.</p>";
  }
});

function configurarFiltros() {
  const container = document.getElementById("tagsContainer");
  const searchInput = document.getElementById("searchMembro");
  const table = document.querySelector(".resultado-box table");
  if (!table) return;

  document.getElementById("filterSection").style.display = "grid";
  container.innerHTML = "";
  
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const members = rows.map(r => r.cells[0].innerText);

  // Criar tags de filtro baseadas na image_f58842.png
  members.forEach(name => {
    const tag = document.createElement("div");
    tag.className = "member-tag active";
    tag.innerText = name;
    tag.onclick = () => {
      tag.classList.toggle("active");
      executarFiltro();
    };
    container.appendChild(tag);
  });

  function executarFiltro() {
    const term = searchInput.value.toLowerCase();
    const activeTags = Array.from(document.querySelectorAll(".member-tag.active")).map(t => t.innerText);

    rows.forEach(row => {
      const memberName = row.cells[0].innerText;
      const isVisible = activeTags.includes(memberName) && memberName.toLowerCase().includes(term);
      row.style.display = isVisible ? "" : "none";
    });

    recalcularRodape(); // 🔥 FUNÇÃO QUE CORRIGE O SEU PROBLEMA
  }

  function recalcularRodape() {
    const visibleRows = rows.filter(r => r.style.display !== "none");
    const footerCells = table.querySelectorAll("tfoot td");
    const numCols = table.querySelectorAll("thead th").length;

    // Começa da coluna 1 (pula o nome do membro) até a última
    for (let colIndex = 1; colIndex < numCols; colIndex++) {
      let sum = 0;
      visibleRows.forEach(row => {
        const val = parseFloat(row.cells[colIndex].innerText.replace(',', '.')) || 0;
        sum += val;
      });

      // Se for a última coluna (MÉDIA), divide pelo número de semanas
      if (colIndex === numCols - 1) {
        // Pega a quantidade de colunas de semanas (total - membro - total - média)
        const numWeeks = numCols - 3; 
        const avg = numWeeks > 0 ? (sum / numWeeks).toFixed(1) : 0;
        footerCells[colIndex].innerHTML = `<strong>${avg}</strong>`;
      } else {
        footerCells[colIndex].innerHTML = `<strong>${Math.floor(sum)}</strong>`;
      }
    }
  }

  searchInput.oninput = executarFiltro;
}