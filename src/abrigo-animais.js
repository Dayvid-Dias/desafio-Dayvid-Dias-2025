class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    const animais = {
      Rex:   { tipo: 'cão',   brinquedos: ['RATO','BOLA'] },
      Mimi:  { tipo: 'gato',  brinquedos: ['BOLA','LASER'] },
      Fofo:  { tipo: 'gato',  brinquedos: ['BOLA','RATO','LASER'] },
      Zero:  { tipo: 'gato',  brinquedos: ['RATO','BOLA'] },
      Bola:  { tipo: 'cão',   brinquedos: ['CAIXA','NOVELO'] },
      Bebe:  { tipo: 'cão',   brinquedos: ['LASER','RATO','BOLA'] },
      Loco:  { tipo: 'jabuti', brinquedos: ['SKATE','RATO'] }
    };

    const todosBrinquedos = new Set();
    Object.values(animais).forEach(a => a.brinquedos.forEach(b => todosBrinquedos.add(b)));

    const p1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const p2 = brinquedosPessoa2.split(',').map(b => b.trim());
    const ordem = ordemAnimais.split(',').map(a => a.trim());

    const temDuplicatas = arr => new Set(arr).size !== arr.length;

    if (temDuplicatas(ordem) || ordem.some(a => !(a in animais))) {
      return { erro: 'Animal inválido' };
    }

    if (temDuplicatas(p1) || temDuplicatas(p2) || p1.some(b => !todosBrinquedos.has(b)) || p2.some(b => !todosBrinquedos.has(b))) {
      return { erro: 'Brinquedo inválido' };
    }

    const contagem = { 1: 0, 2: 0 };

    const consegueAdotar = (animal, pessoaBrinquedos) => {
      if (animal.tipo === 'jabuti') return true;
      const prefs = animal.brinquedos;
      let idx = 0;
      for (let b of pessoaBrinquedos) {
        if (b === prefs[idx]) idx++;
        if (idx === prefs.length) break;
      }
      return idx === prefs.length;
    };

    const resultado = [];

    for (let nomeAnimal of ordem) {
      const animal = animais[nomeAnimal];

      const p1Pode = consegueAdotar(animal, p1);
      const p2Pode = consegueAdotar(animal, p2);

      let dono = 'abrigo';
      if (animal.tipo === 'gato') {
        if (p1Pode && !p2Pode && contagem[1] < 3) dono = 'pessoa 1';
        else if (!p1Pode && p2Pode && contagem[2] < 3) dono = 'pessoa 2';
      } else if (animal.tipo === 'jabuti') {
        
        if ((contagem[1] > 0 || contagem[2] > 0)) {
          dono = contagem[1] > contagem[2] ? 'pessoa 1' : 'pessoa 2';
        }
      } else {
        if (p1Pode && !p2Pode && contagem[1] < 3) dono = 'pessoa 1';
        else if (!p1Pode && p2Pode && contagem[2] < 3) dono = 'pessoa 2';
        else if (p1Pode && p2Pode) dono = 'abrigo';
      }

      if (dono === 'pessoa 1') contagem[1]++;
      if (dono === 'pessoa 2') contagem[2]++;

      resultado.push(`${nomeAnimal} - ${dono}`);
    }

    return { lista: resultado.sort() };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
