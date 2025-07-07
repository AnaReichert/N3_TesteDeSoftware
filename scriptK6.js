import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 10,
    duration: '10s',
};

export default function () {
    let res = http.get('http://127.0.0.1:5000/cadastro');
    check(res, { 'status is 200': (r) => r.status === 200 });

    http.post('http://127.0.0.1:5000/cadastro', JSON.stringify({ nome: 'Teste', email: 'teste@exemplo.com' }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
