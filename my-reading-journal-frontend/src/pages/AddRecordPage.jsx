import React from "react";
import RecordForm from "../components/RecordForm";
import { saveReadingRecord } from "../api/readingApi";
import { useNavigate } from "react-router-dom";

function AddRecordPage() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    saveReadingRecord(formData)
      .then(() => {
        alert("저장되었습니다!");
        navigate("/reading-list");
      })
      .catch((err) => {
        console.error(err);
        alert("저장에 실패했습니다.");
      });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">📘 새 기록 추가</h2>
      <RecordForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddRecordPage;
