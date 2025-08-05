import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReadingRecords } from '../api/readingApi';

function ReadingRecordListPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReadingRecords()
      .then((res) => setRecords(res.data.reverse()))
      .catch((err) => console.error('기록 불러오기 실패:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">📚 전체 독서 기록</h2>

      {loading ? (
        <p className="text-center text-gray-500">불러오는 중...</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-500">아직 기록이 없습니다.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {records.map((record) => (
            <Link to={`/records/${record.id}`} key={record.id}>
              <div className="bg-white border border-gray-200 p-4 rounded-xl shadow hover:shadow-md transition">
                <h3 className="font-semibold text-blue-700 mb-1 truncate">📘 {record.title}</h3>
                {record.memo && (
                  <p className="text-sm text-gray-700 italic line-clamp-2">
                    “{record.memo}”
                  </p>
                )}
                {(record.startDate || record.startTime) && (
                  <p className="text-xs text-gray-500 mt-1">
                    {record.startDate ?? record.startTime} ~ {record.endDate ?? record.endTime}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReadingRecordListPage;
