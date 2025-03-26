import React, { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import { User } from './types';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      // Try catch block for Error handling
      try {
        // Fetching the data
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        // Throws an error if the response is unsuccessful
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">User Directory</h1>
        <UserList users={users} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}

export default App;