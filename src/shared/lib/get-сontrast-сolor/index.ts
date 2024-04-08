export const getContrastColor = (backgroundColor: string): string => {
  const hexToRgb = (hex: string): number[] => hex.match(/[A-Za-z0-9]{2}/g)!.map((v) => parseInt(v, 16));

  const rgb = hexToRgb(backgroundColor);

  // Вычисление контрастного отношения по формуле
  const getContrastRatio = (rgb1: number[], rgb2: number[]): number => {
    const l1 = 0.2126 * rgb1[0] / 255 + 0.7152 * rgb1[1] / 255 + 0.0722 * rgb1[2] / 255;
    const l2 = 0.2126 * rgb2[0] / 255 + 0.7152 * rgb2[1] / 255 + 0.0722 * rgb2[2] / 255;
    const L = Math.max(l1, l2);
    const l = Math.min(l1, l2);

    return (L + 0.05) / (l + 0.05);
  };

  // Белый цвет
  const white = [255, 255, 255];

  // Черный цвет
  const black = [0, 0, 0];

  // Получение контрастного отношения между цветом фона и белым/черным текстом
  const contrastWithWhite = getContrastRatio(rgb, white);
  const contrastWithBlack = getContrastRatio(rgb, black);

  // Выбор цвета текста на основе контрастного отношения
  const textColor: string = contrastWithWhite > contrastWithBlack ? "#FFFFFF" : "#000000";

  return textColor;
};
