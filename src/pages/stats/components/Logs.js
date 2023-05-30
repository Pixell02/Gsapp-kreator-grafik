import React from 'react';
import { useCollection } from '../../../hooks/useCollection';

export default function Logs() {
  const { documents: logs } = useCollection('logs');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className='w-25'>Dodane przez</th>
            <th>Opis</th>
            <th>Dla konta</th>
            <th>Czas</th>
          </tr>
        </thead>
        <tbody>
          {logs &&
            logs.map((log) => (
              <tr key={log.id}>
                <td>{log.from}</td>
                <td>{log.description}</td>
                <td>{log.to}</td>
                <td>{formatDate(log.date)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
