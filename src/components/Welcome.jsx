export default function Welcome({ onStart }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="animate-float mb-8">
        <span className="text-8xl">🌌</span>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
        数字人格分身
      </h1>

      <p className="text-lg md:text-xl text-text-muted mb-2 max-w-lg">
        回答12个脑洞大开的问题，解锁你的专属人格画像
      </p>
      <p className="text-sm text-text-muted/60 mb-10">
        MBTI性格 · 虚拟形象 · 职业预测 · 社交文案
      </p>

      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={onStart}
          className="px-10 py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 animate-pulse-glow cursor-pointer"
        >
          开始探索 ✨
        </button>

        <div className="flex gap-6 mt-8 text-sm text-text-muted">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">🎯</span>
            <span>12道精选题</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">🔮</span>
            <span>16种人格</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">📝</span>
            <span>专属文案</span>
          </div>
        </div>
      </div>
    </div>
  );
}
