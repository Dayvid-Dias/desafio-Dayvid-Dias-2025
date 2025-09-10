import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
  test('deve retornar erro quando houver animais duplicados', () => {
  const abrigo = new AbrigoAnimais();
  const resultado = abrigo.encontraPessoas('RATO,BOLA', 'NOVELO', 'Rex,Rex');
  expect(resultado).toEqual({ erro: 'Animal inválido' });
});
test('deve retornar erro quando houver animal inexistente', () => {
  const abrigo = new AbrigoAnimais();
  const resultado = abrigo.encontraPessoas('RATO', 'BOLA', 'Rex,Lulu');
  expect(resultado).toEqual({ erro: 'Animal inválido' });
});
test('quando ambos podem adotar o mesmo cão, o animal fica no abrigo', () => {
  const abrigo = new AbrigoAnimais();
  const resultado = abrigo.encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
  expect(resultado).toEqual({ lista: ['Rex - abrigo'] });
});
});
