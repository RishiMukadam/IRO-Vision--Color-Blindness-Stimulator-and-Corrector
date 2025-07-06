import { createCanvas, loadImage, Canvas, Image } from 'canvas';

export type ColorBlindnessType = 'Protanomaly' | 'Deuteranomaly' | 'Tritanomaly' | 'Severe Tritanomaly';

interface RGB {
  r: number;
  g: number;
  b: number;
}

class ImageProcessor {
  private static instance: ImageProcessor;
  private canvas: Canvas | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  private constructor() {}

  public static getInstance(): ImageProcessor {
    if (!ImageProcessor.instance) {
      ImageProcessor.instance = new ImageProcessor();
    }
    return ImageProcessor.instance;
  }

  private initCanvas(width: number, height: number) {
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext('2d');
  }

  private async loadImageToCanvas(imageData: string): Promise<void> {
    try {
      const img = await loadImage(imageData);
      this.initCanvas(img.width, img.height);
      this.ctx?.drawImage(img, 0, 0);
    } catch (error) {
      console.error('Error loading image:', error);
      throw new Error('Failed to load image');
    }
  }

  private getRGBMatrix(): RGB[][] {
    if (!this.canvas || !this.ctx) throw new Error('Canvas not initialized');

    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const matrix: RGB[][] = [];

    for (let y = 0; y < this.canvas.height; y++) {
      matrix[y] = [];
      for (let x = 0; x < this.canvas.width; x++) {
        const i = (y * this.canvas.width + x) * 4;
        matrix[y][x] = {
          r: imageData.data[i],
          g: imageData.data[i + 1],
          b: imageData.data[i + 2]
        };
      }
    }

    return matrix;
  }

  private setRGBMatrix(matrix: RGB[][]) {
    if (!this.canvas || !this.ctx) throw new Error('Canvas not initialized');

    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < this.canvas.height; y++) {
      for (let x = 0; x < this.canvas.width; x++) {
        const i = (y * this.canvas.width + x) * 4;
        imageData.data[i] = matrix[y][x].r;
        imageData.data[i + 1] = matrix[y][x].g;
        imageData.data[i + 2] = matrix[y][x].b;
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  private simulateColorBlindness(rgb: RGB, type: ColorBlindnessType): RGB {
    const { r, g, b } = rgb;
    let result: RGB = { r, g, b };

    switch (type) {
      case 'Protanomaly':
        result = {
          r: Math.round(r * 0.56667 + g * 0.43333 + b * 0),
          g: Math.round(r * 0.55833 + g * 0.44167 + b * 0),
          b: Math.round(r * 0 + g * 0.24167 + b * 0.75833)
        };
        break;
      case 'Deuteranomaly':
        result = {
          r: Math.round(r * 0.625 + g * 0.375 + b * 0),
          g: Math.round(r * 0.7 + g * 0.3 + b * 0),
          b: Math.round(r * 0 + g * 0.3 + b * 0.7)
        };
        break;
      case 'Tritanomaly':
        result = {
          r: Math.round(r * 0.95 + g * 0.05 + b * 0),
          g: Math.round(r * 0 + g * 0.43333 + b * 0.56667),
          b: Math.round(r * 0 + g * 0.475 + b * 0.525)
        };
        break;
      case 'Severe Tritanomaly':
        result = {
          r: Math.round(r * 0.95 + g * 0.05 + b * 0),
          g: Math.round(r * 0 + g * 0.25833 + b * 0.74167),
          b: Math.round(r * 0 + g * 0.275 + b * 0.725)
        };
        break;
    }

    return {
      r: Math.min(255, Math.max(0, result.r)),
      g: Math.min(255, Math.max(0, result.g)),
      b: Math.min(255, Math.max(0, result.b))
    };
  }

  private correctColorBlindness(rgb: RGB, type: ColorBlindnessType): RGB {
    const { r, g, b } = rgb;
    let result: RGB = { r, g, b };

    switch (type) {
      case 'Protanomaly':
        result = {
          r: Math.round(r),
          g: Math.round(g * 1.2),
          b: Math.round(b * 1.1)
        };
        break;
      case 'Deuteranomaly':
        result = {
          r: Math.round(r * 1.2),
          g: Math.round(g),
          b: Math.round(b * 1.1)
        };
        break;
      case 'Tritanomaly':
      case 'Severe Tritanomaly':
        result = {
          r: Math.round(r * 1.2),
          g: Math.round(g * 1.2),
          b: Math.round(b)
        };
        break;
    }

    return {
      r: Math.min(255, Math.max(0, result.r)),
      g: Math.min(255, Math.max(0, result.g)),
      b: Math.min(255, Math.max(0, result.b))
    };
  }

  public async processImage(
    imageData: string,
    type: ColorBlindnessType,
    mode: 'simulate' | 'correct'
  ): Promise<string> {
    try {
      await this.loadImageToCanvas(imageData);
      const rgbMatrix = this.getRGBMatrix();

      const processedMatrix = rgbMatrix.map(row =>
        row.map(pixel =>
          mode === 'simulate'
            ? this.simulateColorBlindness(pixel, type)
            : this.correctColorBlindness(pixel, type)
        )
      );

      this.setRGBMatrix(processedMatrix);
      return this.canvas?.toDataURL() || '';
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error('Failed to process image');
    }
  }
}

export const imageProcessor = ImageProcessor.getInstance();