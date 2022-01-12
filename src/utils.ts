

/** creates only 2d combination */
export function combination<T>(ls: T[]): [T, T][] {

  const result = new Set<string>();

  for (let i = 0; i < ls.length; i++) {
    const current = ls[i];
    const rest = ls.filter(x => x !== current);

    for (const other of rest) {
      result.add(JSON.stringify([current, other].sort()));
    }
  }

  return [...result.values()].map(x => JSON.parse(x));
}
