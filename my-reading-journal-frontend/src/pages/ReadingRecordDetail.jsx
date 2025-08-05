import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReadingRecordById } from '../api/readingApi'; // <- 이 부분 변경

function ReadingRecordDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReadingRecordById(id)
      .then(res => setRecord(res.data))
      .catch(err => console.error('기록 불러오기 실패:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:8080/api/records/${id}`)
        .then(() => {
          toast.success('🗑️ 리뷰가 삭제되었습니다.');
          navigate("/reading-list"); // ← 목록 페이지로 이동
        })
        .catch((err) => {
          console.error(err);
          toast.error('❗ 삭제에 실패했습니다.');
        });
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">불러오는 중...</p>;
  }

  if (!record) {
    return <p className="text-center text-red-500 mt-10">기록이 존재하지 않습니다.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {/* 제목 */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📖 {record.title}</h2>

      {/* ✅ 커버 이미지 */}
      {record.cover && (
        <div className="mb-4 text-center">
          <img
            src={record.cover}
            alt={record.title}
            className="w-32 h-auto mx-auto rounded shadow"
          />
        </div>
      )}

      {/* 저자 */}
      {record.author && (
        <p className="text-sm text-gray-500 mb-2">👤 저자: {record.author}</p>
      )}

      {/* ISBN */}
      {record.isbn13 && (
        <p className="text-sm text-gray-500 mb-2">🔖 ISBN: {record.isbn13}</p>
      )}

      {/* 읽은 기간 */}
      {(record.startDate && record.endDate) && (
        <p className="text-sm text-gray-500 mb-2">
          ⏳ 읽은 기간:{' '}
          {new Date(record.startDate).toLocaleDateString()} ~ {new Date(record.endDate).toLocaleDateString()}
        </p>
      )}

      {/* 페이지 수 (옵션) */}
      {record.pagesRead && (
        <p className="text-sm text-gray-500 mb-2">📄 읽은 페이지 수: {record.pagesRead}쪽</p>
      )}

      {/* 메모 */}
      {record.memo && (
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-700 mb-1">📝 메모</h3>
          <p className="text-gray-800 whitespace-pre-line bg-gray-50 p-3 rounded border border-gray-100">
            {record.memo}
          </p>
        </div>
      )}

      {/* 뒤로가기 */}
      <div className="mt-6 flex justify-between flex-wrap gap-2">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          ← 뒤로가기
        </button>

        <div className="ml-auto flex gap-2">
          <button
            onClick={() => navigate(`/records/${record.id}/edit`)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            ✏ 수정
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            🗑 삭제
          </button>
        </div>
      </div>

    </div>
  );

}

export default ReadingRecordDetail;
