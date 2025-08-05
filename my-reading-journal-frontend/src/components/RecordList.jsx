import React, { useEffect, useState } from "react";
import axios from "axios";
import { differenceInDays } from "date-fns";
import toast from 'react-hot-toast';

function RecordList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/records")
      .then((res) => {
        setRecords(res.data)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:8080/api/records/${id}`)
        .then(() => {
          setRecords(records.filter((r) => r.id !== id));
          toast.success('🗑️ 기록이 삭제되었습니다.');
        })
        .catch((err) => {
          console.error(err);
          toast.error('❗ 삭제에 실패했습니다.');
        });
    }
  };

  const filteredRecords = records.filter(
    (record) =>
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center my-10">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <input
        type="text"
        placeholder="제목 또는 저자 검색"
        className="w-full mb-5 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white shadow p-4 rounded relative flex gap-4">
            {record.cover && (
              <img
                src={record.cover}
                alt={record.title}
                className="w-20 h-28 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-bold break-words">{record.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{record.author}</p>
              {record.startDate && record.endDate && (
                <p className="text-sm text-gray-700 mb-1">
                  독서 기간: {record.startDate} ~ {record.endDate} (
                  {differenceInDays(new Date(record.endDate), new Date(record.startDate)) + 1}일)
                </p>
              )}
              <p className="text-sm text-gray-800">{record.memo}</p>
            </div>

            <button
              onClick={() => handleDelete(record.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="삭제"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecordList;
