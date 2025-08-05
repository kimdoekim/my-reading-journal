import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReadingListPage from './pages/ReadingListPage';
import AddRecordPage from './pages/AddRecordPage';
import ReadingLogForm from './components/ReadingLogForm';
import ReadingLogList from './components/ReadingLogList';
import { Toaster } from 'react-hot-toast';
import ReadingRecordDetail from './pages/ReadingRecordDetail';
import EditRecordPage from './pages/EditRecordPage';
import ReadingLogDetail from './pages/ReadingLogDetail';
import EditLogPage from './pages/EditLogPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* 상단 네비게이션 바 */}
      <header className="bg-gray-900 text-white py-4 shadow-md">
        <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-lg font-semibold">
            📖 My Reading Journal
          </Link>
          <nav className="flex gap-3 text-sm flex-nowrap overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:underline">홈</Link>
            <Link to="/logs"         className="hover:underline">독서 기록</Link>
            <Link to="/reading-list" className="hover:underline">도서 리뷰</Link> {/* ← 텍스트만 변경 */}
            <Link
              to="/records/add"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md font-medium transition-colors"
            >
              + 리뷰 작성
            </Link>
          </nav>
        </div>
      </header>


      {/* 콘텐츠 영역 */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reading-list" element={<ReadingListPage />} />
    
          {/* <Route path="/records" element={<ReadingRecordListPage />} /> */}
          <Route path="/records/add" element={<AddRecordPage />} />
          <Route path='/records/:id' element={<ReadingRecordDetail/>} />
          <Route path="/records/:id/edit" element={<EditRecordPage />} />
          
          <Route path="/logs" element={<ReadingLogList />} />
          <Route path="/logs/add" element={<ReadingLogForm />} />
          <Route path="/logs/:id" element={<ReadingLogDetail />} />
          <Route path="/logs/:id/edit" element={<EditLogPage />} />

        </Routes>
      </main>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
