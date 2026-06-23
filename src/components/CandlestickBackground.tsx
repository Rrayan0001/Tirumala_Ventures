import { useEffect, useRef } from "react";

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export default function CandlestickBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Initial setup parameters
    const candleWidth = 10;
    const gap = 6;
    const step = candleWidth + gap;
    const maxCandles = Math.ceil(width / step) + 5;

    // Generate random walk prices for initial candles
    const candles: Candle[] = [];
    let currentPrice = height * 0.5; // Start in the middle

    const generateCandle = (prevClose: number): Candle => {
      const change = (Math.random() - 0.5) * 45; // Price volatility
      const open = prevClose;
      const close = Math.max(
        height * 0.15,
        Math.min(height * 0.85, prevClose + change)
      );
      const high = Math.max(open, close) + Math.random() * 15;
      const low = Math.min(open, close) - Math.random() * 15;
      const volume = Math.random() * 40 + 10;

      return { open, high, low, close, volume };
    };

    // Pre-populate candles
    for (let i = 0; i < maxCandles; i++) {
      const prevClose = i === 0 ? currentPrice : candles[i - 1].close;
      candles.push(generateCandle(prevClose));
    }

    // Horizontal offset for sliding animation
    let offsetX = 0;
    const speed = 0.35; // Pixels per frame

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Scroll candles to the left
      offsetX -= speed;
      if (Math.abs(offsetX) >= step) {
        offsetX = 0;
        // Remove first candle and generate new one at the end
        candles.shift();
        const lastCandle = candles[candles.length - 1];
        candles.push(generateCandle(lastCandle.close));
      }

      // Draw subtle horizontal grid lines
      ctx.strokeStyle = "rgba(212, 175, 55, 0.03)";
      ctx.lineWidth = 1;
      const gridCount = 6;
      for (let i = 1; i < gridCount; i++) {
        const y = (height / gridCount) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw candlesticks
      candles.forEach((candle, index) => {
        const x = index * step + offsetX - step; // Draw slightly offscreen to the left to hide transitions

        const isBullish = candle.close >= candle.open;
        const color = isBullish
          ? "rgba(16, 185, 129, 0.12)" // Translucent green
          : "rgba(239, 68, 68, 0.12)"; // Translucent red
        const wickColor = isBullish
          ? "rgba(16, 185, 129, 0.2)"
          : "rgba(239, 68, 68, 0.2)";

        // Draw volume bar in background (bottom 15% of height)
        const volHeight = (candle.volume / 50) * (height * 0.15);
        ctx.fillStyle = isBullish
          ? "rgba(16, 185, 129, 0.04)"
          : "rgba(239, 68, 68, 0.04)";
        ctx.fillRect(
          x,
          height - volHeight,
          candleWidth,
          volHeight
        );

        // Draw wicks (high to low)
        ctx.strokeStyle = wickColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, candle.high);
        ctx.lineTo(x + candleWidth / 2, candle.low);
        ctx.stroke();

        // Draw candle body
        ctx.fillStyle = color;
        ctx.strokeStyle = wickColor;
        ctx.lineWidth = 1.5;
        const bodyHeight = Math.abs(candle.close - candle.open);
        const bodyY = Math.min(candle.open, candle.close);

        ctx.fillRect(x, bodyY, candleWidth, Math.max(2, bodyHeight));
        ctx.strokeRect(x, bodyY, candleWidth, Math.max(2, bodyHeight));
      });

      // Draw moving horizontal dashed price line at last price
      if (candles.length > 0) {
        const lastCandle = candles[candles.length - 2]; // Match visible end candle
        ctx.strokeStyle = "rgba(212, 175, 55, 0.18)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, lastCandle.close);
        ctx.lineTo(width, lastCandle.close);
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        // Draw current price tag bubble
        ctx.fillStyle = "rgba(212, 175, 55, 0.1)";
        ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
        ctx.lineWidth = 1;
        ctx.fillRect(width - 50, lastCandle.close - 10, 50, 20);
        ctx.strokeRect(width - 50, lastCandle.close - 10, 50, 20);

        ctx.font = "8px sans-serif";
        ctx.fillStyle = "rgba(212, 175, 55, 0.8)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          (lastCandle.close / 10).toFixed(2) + " %",
          width - 25,
          lastCandle.close
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
