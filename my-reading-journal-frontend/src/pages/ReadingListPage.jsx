import React from "react";
import RecordList from "../components/RecordList";

function ReadingListPage() {
    return (
        <div>
            <h2 className="text-center my-4">📚 나의 독서 기록</h2>
            <RecordList />
        </div>
    );
}

export default ReadingListPage;
