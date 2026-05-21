import { useState } from "react";
import { questions } from "../data/questions";

export default function Quiz({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [direction, setDirection] = useState("next");

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const handleSelect = (index) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected === null) return;

    const newAnswers = [...answers, q.options[selected]];
    setAnswers(newAnswers);
    setSelected(null);

    if (current + 1 >= questions.length) {
      onComplete(newAnswers);
    } else {
      setDirection("next");
      setCurrent(current + 1);
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-xl">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-text-muted mb-2">
            <span>
              问题 {current + 1} / {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 问题卡片 */}
        <div
          key={q.id}
          className="glass-card rounded-2xl p-6 md:p-8 mb-6 animate-fade-in"
        >
          <div className="text-5xl mb-4">{q.emoji}</div>
          <h2 className="text-xl md:text-2xl font-bold text-text mb-6">
            {q.question}
          </h2>

          <div className="flex flex-col gap-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selected === idx
                    ? "border-primary bg-primary/10 text-white"
                    : "border-white/10 bg-surface-light/50 text-text hover:border-white/30 hover:bg-surface-light"
                }`}
              >
                <span className="font-medium">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 下一题按钮 */}
        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 cursor-pointer ${
            selected !== null
              ? "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
              : "bg-surface-light text-text-muted cursor-not-allowed"
          }`}
        >
          {current + 1 >= questions.length ? "查看结果 ✨" : "下一题 →"}
        </button>
      </div>
    </div>
  );
}
