import React, { useEffect, useState } from "react";

interface UserMark {
  id?: number;
  mark: number;
  timestamp: string;
  date: string;
}

export const UserMarks = () => {
  const [userMarks, setUserMarks] = useState<UserMark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserMarks = async () => {
      try {
        const marks = await (window as any).api.getUserMarks();
        setUserMarks(marks);
      } catch (err) {
        console.error("Failed to fetch user marks:", err);
        setError("Failed to load user marks.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserMarks();
  }, []);

  if (loading) {
    return <div>Loading user marks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Marks:</h1>
      {userMarks.length === 0 ? (
        <p>No user marks found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mark</th>
              <th>Timestamp</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {userMarks.map((mark) => (
              <tr key={mark.id}>
                <td>{mark.id}</td>
                <td>{mark.mark}</td>
                <td>{mark.timestamp}</td>
                <td>{mark.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};