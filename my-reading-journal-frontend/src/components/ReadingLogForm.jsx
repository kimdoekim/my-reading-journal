import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { saveDailyLog } from '../api/logApi';
import { useNavigate } from 'react-router-dom';
import SearchBookModal from '../components/SearchBookModal';

function ReadingLogForm({ initialData = null }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bookTitle: '',
    isbn13: '',
    coverUrl: '',
    pagesRead: '',
    startTime: '',
    endTime: '',
    memo: '',
  });
  const [isTiming, setIsTiming] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        bookTitle: initialData.bookTitle || '',
        isbn13: initialData.isbn13 || '',
        coverUrl: initialData.coverUrl || '',
        pagesRead: initialData.pagesRead || '',
        startTime: initialData.startTime || '',
        endTime: initialData.endTime || '',
        memo: initialData.memo || '',
      });
    }
  }, [initialData]);

  const formatTimeDisplay = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const getLocalIso = () => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}` +
      `T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  };

  const handleBookSelect = (book) => {
    setForm((f) => ({
      ...f,
      bookTitle: book.title,
      isbn13: book.isbn13,
      coverUrl: book.cover,
    }));
    setShowModal(false);
  };

  const handleStart = () => {
    const iso = getLocalIso();
    setForm((f) => ({ ...f, startTime: iso }));
    setIsTiming(true);
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  };

  const handleStop = () => {
    const iso = getLocalIso();
    setForm((f) => ({ ...f, endTime: iso }));
    setIsTiming(false);
    clearInterval(timerRef.current);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearInterval(timerRef.current);
    let payload = { ...form };
    if (isTiming) {
      payload.endTime = getLocalIso();
      setIsTiming(false);
    }
    try {
      await saveDailyLog(payload);
      toast.success('⏲️ 일일 독서 기록이 저장되었습니다!');
      setForm({ bookTitle: '', isbn13: '', coverUrl: '', pagesRead: '', startTime: '', endTime: '', memo: '' });
      setElapsed(0);
      navigate('/logs');
    } catch (err) {
      console.error(err);
      toast.error('저장에 실패했습니다.');
    }
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
        <h2 className="text-center text-2xl font-semibold text-gray-800">⏱️ 일일 독서 기록</h2>

        {/* 책 검색 & 제목 입력 */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            name="bookTitle"
            placeholder="책 제목"
            value={form.bookTitle}
            onChange={handleChange}
            required
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >🔍</button>
        </div>

        {/* 커버 + 페이지/타이머 레이아웃: 4열 그리드 */}
        <div className="grid grid-cols-4 gap-4">
          {/* 왼쪽 2열: 커버 이미지 */}
          <div className="col-span-2 row-span-2">
            {form.coverUrl ? (
              <img
                src={form.coverUrl}
                alt="cover"
                className="w-full h-56 object-contain rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full h-56 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">커버 없음</span>
              </div>
            )}
          </div>

          {/* 오른쪽 상단 2열: 읽은 페이지 입력 */}
          <div className="col-span-2">
            <input
              type="number"
              name="pagesRead"
              placeholder="읽은 페이지 수"
              value={form.pagesRead}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* 오른쪽 하단 2열: 타이머 UI */}
          <div className="col-span-2 space-y-2">
            <div aria-live="polite" className="text-center text-4xl font-mono text-blue-600">
              ⏱️ {formatTimeDisplay(elapsed)}
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={handleStart}
                disabled={isTiming}
                className={`px-5 py-2 rounded-lg ${isTiming ? 'bg-gray-400' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                시작
              </button>
              <button
                type="button"
                onClick={handleStop}
                disabled={!isTiming}
                className={`px-5 py-2 rounded-lg ${!isTiming ? 'bg-gray-400' : 'bg-red-500 text-white hover:bg-red-600'}`}>
                종료
              </button>
            </div>
          </div>
        </div>

        {/* 메모 입력 */}
        <textarea
          name="memo"
          placeholder="간단한 메모나 감상"
          rows="3"
          value={form.memo}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        {/* 숨은 필드: ISBN, coverUrl */}
        <input type="hidden" name="isbn13" value={form.isbn13} />
        <input type="hidden" name="coverUrl" value={form.coverUrl} />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
        >
          기록 저장
        </button>
      </form>

      {/* 책 검색 모달 */}
      <SearchBookModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleBookSelect}
      />
    </>
  );
}

export default ReadingLogForm;
