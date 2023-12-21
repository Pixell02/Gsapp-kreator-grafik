import { useEffect, useState } from 'react';

export default function UserStats({ generated }) {
  const [posters, setPosters] = useState([]);
  const [nameCounts, setNameCounts] = useState({});
  useEffect(() => {
    if (generated) {
      setPosters(Array.from(new Set(generated.map(generated => generated.posterId))));

      const counts = generated.reduce((accumulator, current) => {
        const { name } = current;
        accumulator[name] = accumulator[name] ? accumulator[name] + 1 : 1;
        return accumulator;
      }, {});

      setNameCounts(counts);
    }
  }, [generated]);
  return (
    <div className="ml-5">
      Prace w toku
      <table>
        <tr>
          <th>Grafika</th>
          <th>Typ</th>
          <th>Motyw</th>
          <th>kolor</th>
          <th>Ilość wygenerowań</th>
        </tr>
        {posters &&
          posters.map((poster, i) => (
            <>
              <tr key={poster}>
                <td className="dimension">{poster !== undefined ? poster : null}</td>

                {generated &&
                  generated
                    .filter(generated => generated.posterId === posters[i])
                    .filter((item, index, self) => self.findIndex(t => t.name === item.name) === index)
                    .map(generated => (
                      <>
                        <td>{generated.name}</td>
                        <td>{generated.theme}</td>
                        <td>{generated.color}</td>
                        <td>{nameCounts[generated.name]}</td>
                      </>
                    ))}
              </tr>
              <tr></tr>
            </>
          ))}
      </table>
    </div>
  );
}
