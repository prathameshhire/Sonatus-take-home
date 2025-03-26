import React, { useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

type SortField = 'name' | 'email';
type SortDirection = 'asc' | 'desc';

export function UserList({ users, isLoading, error }: UserListProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const compareValue =
        sortDirection === 'asc'
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      return compareValue;
    });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 border-b">
          <button
            className="flex items-center gap-2 font-semibold text-gray-700"
            onClick={() => handleSort('name')}
          >
            Name
            <ArrowUpDown size={16} className="text-gray-400" />
          </button>
          <button
            className="flex items-center gap-2 font-semibold text-gray-700"
            onClick={() => handleSort('email')}
          >
            Email
            <ArrowUpDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-gray-50">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <button
                  className="text-blue-600 hover:text-blue-800 font-medium text-left"
                  onClick={() => setSelectedUser(user === selectedUser ? null : user)}
                >
                  {user.name}
                </button>
                <div className="text-gray-600">{user.email}</div>
              </div>

              {selectedUser?.id === user.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">User Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-gray-800">
                        {user.address.street}, {user.address.suite}
                        <br />
                        {user.address.city}, {user.address.zipcode}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Company</p>
                      <p className="text-gray-800">
                        {user.company.name}
                        <br />
                        <span className="text-sm italic">{user.company.catchPhrase}</span>
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-800">{user.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}