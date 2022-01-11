

/** creates only 2d combination */
export function combination(ls: string[]) {
  const result: [string, string][] = [];

  for (let i = 0; i < ls.length; i++) {
    const current = ls[i];
    const rest = ls.filter(x => x !== current);

    for (const other of rest) {
      result.push([current, other]);
    }
  }

  return result
    .map(x => x.sort())
    .reduce((acc, v) => {

      for (const pair of acc) {
        if (pair.includes(v[0]) && pair.includes(v[1])) {
          return acc;
        }
      }

      return [...acc, v];

    }, [] as [string, string][])
}

