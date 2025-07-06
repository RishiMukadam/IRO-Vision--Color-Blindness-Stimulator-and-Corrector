import { BookOpen, Eye, Brain, Palette } from 'lucide-react';

export function Info() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Understanding Color Blindness
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Color blindness affects approximately 1 in 12 men and 1 in 200 women
            worldwide. Learn about different types of color vision deficiency and
            how they impact daily life.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-purple-50 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                What is Color Blindness?
              </h2>
            </div>
            <p className="text-gray-600">
              Color blindness is a condition where someone cannot distinguish
              between certain colors. It occurs when light-sensitive cells in the
              retina don't respond properly to variations in wavelengths of light.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Types of Color Blindness
              </h2>
            </div>
            <ul className="space-y-4 text-gray-600">
              <li>
                <strong>Protanomaly:</strong> Reduced sensitivity to red light
              </li>
              <li>
                <strong>Deuteranomaly:</strong> Reduced sensitivity to green light
              </li>
              <li>
                <strong>Tritanomaly:</strong> Reduced sensitivity to blue light
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <Palette className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Impact on Daily Life
              </h2>
            </div>
            <p className="text-gray-600">
              Color blindness can affect many aspects of daily life, from choosing
              clothes to reading maps and charts. However, many people develop
              adaptive strategies and lead full, successful lives.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="w-8 h-8 text-gray-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Detailed Information
              </h2>
            </div>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Protanomaly (Red-Weak)
                </h3>
                <p>
                  People with protanomaly have a reduced sensitivity to red light.
                  Red, orange, and yellow appear greener and less bright. This type
                  affects approximately 1% of males.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Deuteranomaly (Green-Weak)
                </h3>
                <p>
                  The most common type of color blindness. People with
                  deuteranomaly have difficulty distinguishing between red and
                  green. Yellow and green appear redder. This affects about 5% of
                  males.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Tritanomaly (Blue-Weak)
                </h3>
                <p>
                  A rare condition affecting both males and females equally.
                  People with tritanomaly have difficulty distinguishing between
                  blue and yellow, purple and red, and blue and green.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}