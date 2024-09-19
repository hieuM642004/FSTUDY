'use client';
import React from 'react';
import Table from '@/components/admin/Table/Table';

interface DataType {
  id: string;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const dataSource: DataType[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 32,
    address: 'New York',
  },
  {
    id: '2',
    name: 'Jane Doe',
    age: 28,
    address: 'London',
  },
];

function App() {
  const handleAdd = () => {
    console.log('Add button clicked');
  };

  const handleEdit = (record: DataType) => {
    console.log('Edit button clicked', record);
  };

  const handleDelete = (record: DataType) => {
    console.log('Delete button clicked', record);
  };

  return (
    <div>
      <Table<DataType>
        
        columns={columns}
        dataSource={dataSource}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addLink="/add-new-item"  
        editLink={(record) => `/edit-item/${record.id}`}  
      />
    </div>
  );
}

export default App;
