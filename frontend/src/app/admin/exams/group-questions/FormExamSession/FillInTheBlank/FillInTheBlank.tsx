import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

interface Answer {
  questionText: string;
  correctAnswer: string;
  explanation: string;
}

interface FillInTheBlankProps {
  question: {
    _id: string;
    questionType: string;
    questionText: string;
    options: any[];
    correctAnswer: Answer[] | string;
    explanation: string;
  };
  index: number;
  onChangeQuestion: (index: number, field: keyof any, value: any) => void;
}

const FillInTheBlank = ({ question, index, onChangeQuestion }: FillInTheBlankProps) => {
 
  useEffect(() => {
    if (typeof question.correctAnswer === 'string') {
      onChangeQuestion(index, 'correctAnswer', [
        {
          questionText: question.questionText,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        }
      ]);
    }
  }, [question.correctAnswer]);

  const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];

  const handleAddAnswer = () => {
    const newAnswers = [
      ...correctAnswers,
      { questionText: '', correctAnswer: '', explanation: '' }
    ];
    onChangeQuestion(index, 'correctAnswer', newAnswers);
  };

  const handleRemoveAnswer = (answerIndex: number) => {
    const newAnswers = correctAnswers.filter((_, i) => i !== answerIndex);
    onChangeQuestion(index, 'correctAnswer', newAnswers);
  };

  const handleAnswerFieldChange = (answerIndex: number, field: keyof Answer, value: string) => {
    const newAnswers = [...correctAnswers];
    newAnswers[answerIndex][field] = value;
    onChangeQuestion(index, 'correctAnswer', newAnswers);
  };

  return (
    <div>
      {correctAnswers.map((answer, answerIndex) => (
        <div key={answerIndex} style={{ marginBottom: '16px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <Form.Item label={`Câu hỏi ${answerIndex + 1}`}>
            <Input
              value={answer.questionText}
              onChange={(e) => handleAnswerFieldChange(answerIndex, 'questionText', e.target.value)}
              placeholder="Nhập câu hỏi"
            />
          </Form.Item>

          <Form.Item label={`Đáp án đúng ${answerIndex + 1}`}>
            <Input
              value={answer.correctAnswer}
              onChange={(e) => handleAnswerFieldChange(answerIndex, 'correctAnswer', e.target.value)}
              placeholder="Nhập đáp án đúng"
            />
          </Form.Item>

          <Form.Item label={`Giải thích ${answerIndex + 1}`}>
            <Input
              value={answer.explanation}
              onChange={(e) => handleAnswerFieldChange(answerIndex, 'explanation', e.target.value)}
              placeholder="Nhập giải thích"
            />
          </Form.Item>

          {correctAnswers.length > 1 && (
            <Button
              type="link"
              icon={<MinusCircleOutlined />}
              onClick={() => handleRemoveAnswer(answerIndex)}
            >
              Xóa đáp án
            </Button>
          )}
        </div>
      ))}

      <Button type="dashed" onClick={handleAddAnswer} icon={<PlusOutlined />}>
        Thêm đáp án
      </Button>
    </div>
  );
};

export default FillInTheBlank;
