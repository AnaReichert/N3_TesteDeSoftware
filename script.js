const form = document.querySelector('#formulario');
const lista = document.querySelector('#lista');

const API = 'http://127.0.0.1:5000/cadastro';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;

    const res = await fetch(API, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, email})
    });

    form.reset();
    loadData();
});

async function loadData() {
    const res = await fetch(API);
    const data = await res.json();

    lista.innerHTML = data.map(d => `
        <p>
            ${d.nome} - ${d.email}
            <button onclick="deletar(${d.id})">Excluir</button>
        </p>
    `).join('');
}

async function deletar(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadData();
}

loadData();
