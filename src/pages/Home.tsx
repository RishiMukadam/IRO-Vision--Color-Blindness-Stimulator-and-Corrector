import { useState } from 'react';
import { Upload, Eye, Wand2, Download } from 'lucide-react';
import { imageProcessor, ColorBlindnessType } from '../services/imageProcessor';

export function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedType, setSelectedType] =
    useState<ColorBlindnessType>('Protanomaly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setProcessedImage(null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.onerror = () => {
        setError('Failed to read the image file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulate = async () => {
    if (!selectedImage) return;

    try {
      setIsProcessing(true);
      setError(null);
      const processed = await imageProcessor.processImage(
        selectedImage,
        selectedType,
        'simulate'
      );
      setProcessedImage(processed);
    } catch (err) {
      setError('Failed to simulate color blindness');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCorrect = async () => {
    if (!selectedImage) return;

    try {
      setIsProcessing(true);
      setError(null);
      const processed = await imageProcessor.processImage(
        selectedImage,
        selectedType,
        'correct'
      );
      setProcessedImage(processed);
    } catch (err) {
      setError('Failed to correct image');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `iro-vision-${selectedType.toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 flex flex-col items-center text-center">
            <main className="flex flex-col items-center justify-center text-center w-full">
              <div className="max-w-3xl">
                {/* Centered Heading */}
                <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="block">
                    "Bringing Colors to Life – Enhance Vision, Empower Perception!"
                  </span>
                  <span className="block text-purple-600 font-semibold">
                    and see the world, through different eyes.
                  </span>
                </h2>

                {/* Centered Paragraph */}
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:text-xl lg:max-w-3xl">
                  Experience how others see the world. Upload your images and
                  simulate different types of color vision deficiencies and
                  correct the image for colorful vision.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div
            className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Upload and Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Upload Image
                </h2>
                <label className="block">
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {selectedImage && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Original Image
                </h3>
                <img
                  src={selectedImage}
                  alt="Original"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Right Column - Controls and Simulation */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Simulation Controls
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Color Vision Type
                  </label>
                  <div className="mt-2 space-y-2">
                    {[
                      'Protanomaly',
                      'Deuteranomaly',
                      'Tritanomaly',
                      'Severe Tritanomaly',
                    ].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="colorblindness-type"
                          value={type}
                          checked={selectedType === type}
                          onChange={(e) =>
                            setSelectedType(
                              e.target.value as ColorBlindnessType
                            )
                          }
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleSimulate}
                    disabled={!selectedImage || isProcessing}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isProcessing ? 'Processing...' : 'Simulate'}
                  </button>
                  <button
                    onClick={handleCorrect}
                    disabled={!selectedImage || isProcessing}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {isProcessing ? 'Processing...' : 'Correct'}
                  </button>
                </div>
              </div>
            </div>

            {processedImage && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Processed Image
                  </h3>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
                <img
                  src={processedImage}
                  alt="Processed"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}