import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecordForm from '../components/RecordForm';
import { getReadingRecordById, updateReadingRecord } from '../api/readingApi';
import toast from 'react-hot-toast';

function EditRecordPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    getReadingRecordById(id)
      .then(res => setInitialData(res.data))
      .catch(err => {
        console.error(err);
        toast.error('기록 불러오기 실패');
      });
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateReadingRecord(id, formData);
      toast.success('✏️ 리뷰가 수정되었습니다!');
      navigate(`/records/${id}`);
    } catch (err) {
      console.error(err);
      toast.error('수정에 실패했습니다.');
    }
  };

  if (!initialData) {
    return <p className="text-center mt-10">불러오는 중...</p>;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">✏️ 리뷰 수정</h2>
      <RecordForm onSubmit={handleSubmit} initialData={initialData} />
    </div>
  );
}

export default EditRecordPage;
