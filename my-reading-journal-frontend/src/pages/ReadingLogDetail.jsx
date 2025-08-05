import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDailyLogById, deleteDailyLog } from '../api/logApi';
import toast from 'react-hot-toast';

function ReadingLogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDailyLogById(id)
      .then(res => setLog(res.data))
      .catch(err => {
        console.error(err);
        toast.error('세션 정보를 불러오지 못했습니다.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('이 기록을 삭제하시겠습니까?')) return;
    try {
      await deleteDailyLog(id);
      toast.success('독서 세션이 삭제되었습니다.');
      navigate('/logs');
    } catch (err) {
      console.error(err);
      toast.error('삭제에 실패했습니다.');
    }
  };

  if (loading) return <p className="text-center p-6">불러오는 중...</p>;
  if (!log) return <p className="text-center p-6 text-red-500">기록을 찾을 수 없습니다.</p>;

  // 총 경과 시간을 초 단위로 계산
  const durationSec = Math.floor((new Date(log.endTime) - new Date(log.startTime)) / 1000);

  // 친숙한 한국어 형식으로 변환 (예: "2시간 38분", "23분")
  const formatDuration = (sec) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${minutes}분`;
  };

  // 한국 로케일, 24시간 포맷
  const formatDateTime = (isoString) =>
    new Date(isoString).toLocaleString('ko-KR', { hour12: false });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">⏱️ 독서 세션 상세</h2>

      {/* 커버 이미지 */}
      {log.coverUrl && (
        <div className="mb-4 text-center">
          <img
            src={log.coverUrl}
            alt={log.bookTitle}
            className="w-32 h-auto mx-auto rounded-lg shadow"
          />
        </div>
      )}

      <p><strong>책 제목 :</strong> {log.bookTitle}</p>
      {log.pagesRead && <p><strong>페이지 :</strong> {log.pagesRead}쪽</p>}
      <p><strong>시작 :</strong> {formatDateTime(log.startTime)}</p>
      <p><strong>종료 :</strong> {formatDateTime(log.endTime)}</p>
      <p><strong>총 독서 시간 :</strong> {formatDuration(durationSec)}</p>
      {log.memo && <p className="mt-2"><strong>메모:</strong> {log.memo}</p>}

      <div className="flex gap-4 mt-6">
        <Link to="/logs" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ← 목록으로
        </Link>
        <Link
          to={`/logs/${id}/edit`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          수정
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default ReadingLogDetail;
