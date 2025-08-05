import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SearchBookModal from "./SearchBookModal";
import { saveReadingRecord, updateReadingRecord } from "../api/readingApi";

function RecordForm({ onSubmit, initialData = null }) {
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    startDate: "",
    endDate: "",
    memo: "",
    isbn13: "",
    cover: "",
  });

  // initialData 반영
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        author: initialData.author || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        memo: initialData.memo || "",
        isbn13: initialData.isbn13 || "",
        cover: initialData.cover || "",
      });
    }
  }, [initialData]);

  const handleBookSelect = (book) => {
    setForm((f) => ({
      ...f,
      title: book.title,
      author: book.author,
      isbn13: book.isbn13,
      cover: book.cover,
    }));
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialData && initialData.id) {
        // 수정 모드
        await updateReadingRecord(initialData.id, form);
        toast.success("✏️ 리뷰가 수정되었습니다!");
        navigate(`/records/${initialData.id}`);
      } else {
        // 생성 모드
        await saveReadingRecord(form);
        toast.success("📚 기록이 저장되었습니다!");
        navigate("/reading-list");
      }
    } catch (err) {
      console.error(err);
      toast.error("❗ 저장에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 제목 & 커버 미리보기 */}
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          📖 {form.title || (initialData ? "리뷰 수정" : "리뷰 작성")}
        </h2>

        {form.cover && (
          <div className="mb-4 text-center">
            <img
              src={form.cover}
              alt={form.title}
              className="w-32 h-auto mx-auto rounded shadow"
            />
          </div>
        )}

        {/* 책 제목 입력 & 검색 버튼 */}
        <div className="flex gap-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="책 제목"
            required
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-gray-300 px-3 rounded hover:bg-gray-400"
          >
            🔍
          </button>
        </div>

        {/* 저자 */}
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="저자"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
        />

        {/* 날짜 */}
        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* 메모 */}
        <textarea
          name="memo"
          value={form.memo}
          onChange={handleChange}
          rows="3"
          placeholder="메모"
          className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
        />

        {/* 숨겨진 필드 */}
        <input type="hidden" name="isbn13" value={form.isbn13} />
        <input type="hidden" name="cover" value={form.cover} />

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          {initialData ? "수정 완료" : "저장"}
        </button>
      </form>

      <SearchBookModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleBookSelect}
      />
    </div>
  );
}

export default RecordForm;
