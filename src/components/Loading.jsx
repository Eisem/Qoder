import { useEffect, useState } from "react";

const messages = [
  "正在扫描你的脑电波...",
  "分析你的梦境数据...",
  "和你的潜意识对话中...",
  "读取你的网易云年度歌单...",
  "计算你的社恐指数...",
  "匹配你的灵魂颜色...",
  "生成你的虚拟形象...",
  "撰写你的朋友圈文案...",
];

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* 旋转光环 */}
      <div className="relative w-32 h-32 mb-10">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin-slow" />
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-secondary animate-spin"
          style={{ animationDuration: "1.5s" }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          🔮
        </div>
      </div>

      <h2 className="text-2xl font-bold text-text mb-3">正在生成你的数字分身</h2>

      <div className="h-8">
        <p
          key={index}
          className="text-text-muted animate-fade-in"
        >
          {messages[index]}
        </p>
      </div>

      {/* 装饰点 */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
