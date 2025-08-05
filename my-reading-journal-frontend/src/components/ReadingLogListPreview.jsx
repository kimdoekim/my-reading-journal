import React from 'react';
import { Link } from 'react-router-dom';

function ReadingLogListPreview({ logs }) {
  return (
    <ul className="space-y-2">
      {logs.map(log => (
        <li key={log.id} className="flex justify-between p-2 bg-white rounded shadow">
          <Link to={`/logs/${log.id}`} className="flex-1">
            {log.bookTitle} — {new Date(log.startTime).toLocaleDateString()}
          </Link>
          <span className="text-sm text-gray-500">{`${Math.floor((new Date(log.endTime) - new Date(log.startTime)) / 60000)}분`}</span>
        </li>
      ))}
    </ul>
  );
}
export default ReadingLogListPreview;