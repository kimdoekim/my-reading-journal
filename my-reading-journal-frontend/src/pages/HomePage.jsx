import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReadingRecords } from '../api/readingApi';
import { getDailyLogs }     from '../api/logApi';
import ReadingLogListPreview from '../components/ReadingLogListPreview';

function HomePage() {
  // 리뷰 전용 상태
  const [reviews, setReviews]               = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // 로그 전용 상태
  const [logs, setLogs]                     = useState([]);
  const [loadingLogs, setLoadingLogs]       = useState(true);

  useEffect(() => {
    // 1) 리뷰 불러오기
    getReadingRecords()
      .then(res => setReviews(res.data.reverse().slice(0, 3)))
      .catch(err => console.error(err))
      .finally(() => setLoadingReviews(false));

    // 2) 로그 불러오기
    getDailyLogs()
      .then(res => setLogs(res.data.reverse().slice(0, 3)))
      .catch(err => console.error(err))
      .finally(() => setLoadingLogs(false));
  }, []);

  return (
    <div className="space-y-8">

      {/* 독서 시작 버튼 */}
      <section className="text-center">
        <Link
          to="/logs/add"
          className="inline-block bg-pink-200 hover:bg-pink-300 text-pink-800 px-6 py-2 rounded-lg font-semibold transition"
        >
          ⏱️ 독서 시작
        </Link>
      </section>

      {/* 리뷰 섹션 (이전 UI) */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">📚 최근 도서 리뷰 기록</h2>

        {loadingReviews ? (
          <p className="text-sm text-gray-500">불러오는 중...</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-gray-500">아직 기록이 없습니다.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1">
            {reviews.map((review) => (
              <Link key={review.id} to={`/records/${review.id}`}>  
                <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex gap-6 min-h-[140px]">
                  {review.cover && (
                    <img
                      src={review.cover}
                      alt={review.title}
                      className="w-24 h-32 object-cover rounded shadow-sm"
                    />
                  )}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-blue-700 mb-1 line-clamp-1">
                        📘 {review.title}
                      </h3>
                      {review.memo && (
                        <p className="text-sm text-gray-700 italic mb-2 line-clamp-2">
                          “{review.memo}”
                        </p>
                      )}
                    </div>
                    {review.startDate && review.endDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        {review.startDate} ~ {review.endDate}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-4 text-right">
          <Link
            to="/reading-list"
            className="text-sm text-blue-300 hover:underline font-medium"
          >
            전체 도서 리뷰 보기 →
          </Link>
        </div>
      </section>

      {/* 로그 섹션 */}
      <section>
        <h2 className="text-lg font-semibold mb-3">⏱️ 최근 독서 기록 </h2>
        {loadingLogs ? (
          <p className="text-sm text-gray-500">불러오는 중...</p>
        ) : logs.length === 0 ? (
          <p className="text-sm text-gray-500">아직 독서 기록이 없습니다.</p>
        ) : (
          <ReadingLogListPreview logs={logs} />
        )}
        <div className="mt-4 text-right">
          <Link to="/logs" className="text-sm text-blue-300 hover:underline font-medium">
            전체 독서 기록 보기 →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
