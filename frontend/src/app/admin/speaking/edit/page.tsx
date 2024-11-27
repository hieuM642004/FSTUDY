'use client';
import React, { useEffect, useState } from 'react';
import { Table, Input, message, Spin } from 'antd';
import GoogleSheetsService from '@/services/sheet/sheet';

const GoogleSheetsManager: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRows = async () => {
    setLoading(true);
    try {
      const rows = await GoogleSheetsService.getAllRows();
      setData(
        rows.map((row: any, index: number) => ({
          key: index + 1,
          topic: row.topic,
          step: row.step,
          response: row.response,
        }))
      );
    } catch (error) {
      console.error('Error fetching rows:', error);
      message.error('Failed to fetch rows!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const handleSave = async (key: number, field: string, value: string) => {
    const newData = [...data];
    const index = newData.findIndex((item) => item.key === key);
    if (index > -1) {
      const item = newData[index];
      item[field] = value;

      try {
        await GoogleSheetsService.updateRow(key, item);
        setData(newData);
        message.success('Row updated successfully!');
      } catch (error) {
        console.error('Error updating row:', error);
        message.error('Failed to update row!');
      }
    }
  };

  const handleAddRow = () => {
    const newRow = {
      key: data.length + 1,
      topic: '',
      step: '',
      response: '',
    };
    setData([...data, newRow]);
  };

  const handleDelete = async (key: number) => {
    const newData = data.filter((item) => item.key !== key);
    try {
      await GoogleSheetsService.deleteRow(key);
      setData(newData);
      message.success('Row deleted successfully!');
    } catch (error) {
      console.error('Error deleting row:', error);
      message.error('Failed to delete row!');
    }
  };

  const EditableCell = ({
    title,
    editable,
    children,
    record,
    dataIndex,
    ...restProps
  }: any) => {
    const [value, setValue] = useState(record ? record[dataIndex] : '');

    const handleBlur = () => {
      if (record[dataIndex] !== value) {
        handleSave(record.key, dataIndex, value);
      }
    };

    return (
      <td {...restProps}>
        {editable ? (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
      editable: true,
    },
    {
      title: 'Step',
      dataIndex: 'step',
      key: 'step',
      editable: true,
    },
    {
      title: 'Response',
      dataIndex: 'response',
      key: 'response',
      editable: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <span
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => handleDelete(record.key)}
        >
          Delete
        </span>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div style={{ padding: 20 }}>
      
      <Spin spinning={loading}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{ pageSize: 100 }}
          footer={() => (
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={handleAddRow}
            >
              + Add Row
            </span>
          )}
        />
      </Spin>
    </div>
  );
};

export default GoogleSheetsManager;