import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const colorBlindnessTests = [
  {
    id: 1,
    imageUrl:
      'https://res.cloudinary.com/dkx06h0xi/image/upload/v1743337885/colorblind-test-image10_ri84ca.jpg',
    question: 'What number do you see in this image?',
    options: ['12', '8', '3', 'Cannot see any number'],
    correctAnswer: '12',
    type: 'Protanomaly/Deuteranomaly',
  },
  {
    id: 2,
    imageUrl:
      'https://res.cloudinary.com/dkx06h0xi/image/upload/v1743338084/280px-Ishihara_9.svg_audxtm.png',
    question: 'What number do you see in this image?',
    options: ['74', '21', '26', 'Cannot see any number'],
    correctAnswer: '74',
    type: 'Tritanomaly',
  },
  {
    id: 3,
    imageUrl:
      'https://res.cloudinary.com/dkx06h0xi/image/upload/v1743337851/colorblind-test-image5_nmpq6j.jpg',
    question: 'What number do you see in this image?',
    options: ['6', '8', '5', 'Cannot see any number'],
    correctAnswer: '6',
    type: 'General Color Vision',
  },
];

export function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < colorBlindnessTests.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    let potentialIssues: string[] = [];
    answers.forEach((answer, index) => {
      if (answer !== colorBlindnessTests[index].correctAnswer) {
        potentialIssues.push(colorBlindnessTests[index].type);
      }
    });
    return potentialIssues;
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const issues = calculateResults();
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Test Results
          </h2>
          {issues.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Potential Color Vision Deficiency Detected
                  </p>
                  <p className="text-gray-600 mt-1">
                    Based on your answers, you might have difficulty with:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    {Array.from(new Set(issues)).map((issue) => (
                      <li key={issue}>{issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <p className="text-sm text-yellow-700">
                  Note: This is a preliminary screening test and should not be
                  considered as a medical diagnosis. Please consult an eye care
                  professional for a comprehensive evaluation.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-medium text-green-600">
                No color vision deficiencies detected!
              </p>
              <p className="text-gray-600 mt-2">
                You correctly identified all the numbers in the test images.
              </p>
            </div>
          )}
          <button
            onClick={resetTest}
            className="mt-8 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Take Test Again
          </button>
        </div>
      </div>
    );
  }

  const currentTest = colorBlindnessTests[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Color Vision Test
            </h2>
            <p className="mt-2 text-gray-600">
              Question {currentQuestion + 1} of {colorBlindnessTests.length}
            </p>
          </div>

          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 max-w-md mx-auto">
              <img
                src={currentTest.imageUrl}
                alt="Color blindness test plate"
                className="w-full h-full object-contain rounded-lg shadow-md"
              />
            </div>
            <p className="text-lg font-medium text-gray-900 text-center">
              {currentTest.question}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentTest.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
