const misteriesMapper = {
  0: 'Mistérios Gloriosos',
  1: 'Mistérios Gozosos',
  2: 'Mistérios Dolorosos',
  3: 'Mistérios Gloriosos',
  4: 'Mistérios Luminosos',
  5: 'Mistérios Dolorosos',
  6: 'Mistérios Gozosos',
};

export function getMisteriosByDayOfWeek(date: Date) {
  const dayOfWeek = date.getDay() as keyof typeof misteriesMapper;

  return misteriesMapper[dayOfWeek];
}
