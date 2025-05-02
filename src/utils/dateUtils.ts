const days: {[key: number]: string} = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
};

export function parseDateString(date: Date) {
  return `${days[date.getDay()]}, ${date.toLocaleDateString()}`;
}