import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDailyLogById, updateDailyLog } from '../api/logApi';
import toast from 'react-hot-toast';

export default function EditLogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bookTitle: '',
    pagesRead: '',
    startTime: '',
    endTime: '',
    memo: '',
    coverUrl: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDailyLogById(id)
      .then(res => {
        const log = res.data;
        setForm({
          bookTitle: log.bookTitle || '',
          pagesRead: log.pagesRead || '',

          startTime: log.startTime?.slice(0,16) || '',
          endTime:   log.endTime?.slice(0,16)   || '',
          memo:      log.memo      || '',
          coverUrl:  log.coverUrl  || '',
        });
      })
      .catch(err => {
        console.error(err);
        toast.error('로그 정보를 불러올 수 없습니다.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };


  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateDailyLog(id, {
        ...form,

        startTime: new Date(form.startTime).toISOString(),
        endTime:   new Date(form.endTime).toISOString(),
      });
      toast.success('수정되었습니다.');
      navigate(`/logs/${id}`);
    } catch (err) {
      console.error(err);
      toast.error('수정에 실패했습니다.');
    }
  };

  if (loading) return <p className="text-center p-6">불러오는 중...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">✏️ 독서 세션 수정</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {form.coverUrl && (
            <div className="mb-4 text-center">
            <img
                src={form.coverUrl}
                alt={form.bookTitle}
                className="w-32 h-auto mx-auto rounded-lg shadow"
            />
            </div>
        )}
        
        {/* 책 제목 */}
        <div>
          <label className="block mb-1 font-medium">책 제목</label>
          <input
            name="bookTitle"
            value={form.bookTitle}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>



        {/* 읽은 페이지 */}
        <div>
          <label className="block mb-1 font-medium">읽은 페이지 수</label>
          <input
            type="number"
            name="pagesRead"
            value={form.pagesRead}
            onChange={handleChange}
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* 시작/종료 시간 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">시작 시간</label>
            <input
              type="datetime-local"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">종료 시간</label>
            <input
              type="datetime-local"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* 메모 */}
        <div>
          <label className="block mb-1 font-medium">메모</label>
          <textarea
            name="memo"
            value={form.memo}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
