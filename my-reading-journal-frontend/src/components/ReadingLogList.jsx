import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDailyLogs, deleteDailyLog } from '../api/logApi';
import toast from 'react-hot-toast';

function ReadingLogList() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await getDailyLogs();
      const sorted = res.data.sort(
        (a, b) => new Date(b.startTime) - new Date(a.startTime)
      );
      setLogs(sorted);
    } catch (err) {
      console.error(err);
      toast.error('세션 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('이 기록을 삭제하시겠습니까?')) return;
    try {
      await deleteDailyLog(id);
      toast.success('세션이 삭제되었습니다.');
      fetchLogs();
    } catch (err) {
      console.error(err);
      toast.error('삭제에 실패했습니다.');
    }
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const [datePart, timePart] = isoString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    return `${year}. ${month}. ${day}. ${hour}:${minute}`;
  };

  if (loading) {
    return <p className="text-center mt-4 text-gray-500">불러오는 중...</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-5">
      <h2 className="text-2xl font-bold text-center text-gray-800">📚 나의 독서 기록</h2>

      {logs.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">아직 기록이 없습니다.</p>
      ) : (
        logs.map((log) => (
          <div
            key={log.id}
            className="bg-white border border-gray-200 rounded-lg shadow flex p-4 space-x-4"
          >
            {/* 왼쪽에 커버 */}
            {log.coverUrl && (
              <Link
                to={`/logs/${log.id}`}
              >
                <div className="aspect-[3/4] w-24">
                  <img
                    src={log.coverUrl}
                    alt={log.bookTitle}
                    className="w-full h-full object-contain rounded-lg shadow-sm"
                  />
                </div>
              </Link>
            )}
          <div className="flex-1 space-y-1 min-w-0">
              <Link
                to={`/logs/${log.id}`}
                className="block text-lg font-semibold text-blue-800 hover:underline truncate"
              >
                {log.bookTitle}
              </Link>
              <div className="text-sm text-gray-600">
                {formatDateTime(log.startTime)} ~ {formatDateTime(log.endTime)}
              </div>
              <div className="text-sm text-gray-700">{log.pagesRead}페이지 읽음</div>
              {log.memo && (
                <div className="text-sm italic text-gray-600">
                  “{log.memo.length > 30 ? `${log.memo.slice(0, 30)}...` : log.memo}”
                </div>
              )}
              <button
                onClick={() => handleDelete(log.id)}
                className="text-sm text-red-500 hover:underline"
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReadingLogList;
