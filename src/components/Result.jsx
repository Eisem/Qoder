import { useState } from "react";
import {
  getMBTIResult,
  generateMoment,
  generateXiaohongshu,
  generateCareerAdvice,
} from "../utils/personality";

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
        active
          ? "bg-primary text-white"
          : "bg-surface-light text-text-muted hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`glass-card rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export default function Result({ answers, onRestart }) {
  const mbti = getMBTIResult(answers.type);
  const moment = generateMoment(answers);
  const xhs = generateXiaohongshu(answers);
  const careerAdvice = generateCareerAdvice(answers);
  const [activeTab, setActiveTab] = useState("profile");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("已复制到剪贴板！");
  };

  return (
    <div className="relative z-10 flex flex-col items-center min-h-screen px-6 py-10">
      <div className="w-full max-w-2xl">
        {/* 头部 */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-float">{mbti.avatar}</div>
          <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
            {answers.type} · {mbti.name}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
            {mbti.title}
          </h1>
          <p className="text-text-muted max-w-md mx-auto">{mbti.desc}</p>
        </div>

        {/* 标签页 */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <TabButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
            人格画像
          </TabButton>
          <TabButton active={activeTab === "career"} onClick={() => setActiveTab("career")}>
            职业预测
          </TabButton>
          <TabButton active={activeTab === "moment"} onClick={() => setActiveTab("moment")}>
            朋友圈
          </TabButton>
          <TabButton active={activeTab === "xhs"} onClick={() => setActiveTab("xhs")}>
            小红书
          </TabButton>
        </div>

        {/* 内容区 */}
        {activeTab === "profile" && (
          <div className="space-y-4 animate-fade-in">
            <Card>
              <h3 className="text-lg font-bold text-text mb-4">性格标签</h3>
              <div className="flex flex-wrap gap-2">
                {mbti.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-surface-light text-sm text-text border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-text mb-4">MBTI维度分析</h3>
              <div className="space-y-4">
                <DimensionBar
                  labelLeft="外向 E"
                  labelRight="内向 I"
                  left={answers.scores.E}
                  right={answers.scores.I}
                  color="from-pink-500 to-purple-500"
                />
                <DimensionBar
                  labelLeft="实感 S"
                  labelRight="直觉 N"
                  left={answers.scores.S}
                  right={answers.scores.N}
                  color="from-blue-500 to-cyan-500"
                />
                <DimensionBar
                  labelLeft="思考 T"
                  labelRight="情感 F"
                  left={answers.scores.T}
                  right={answers.scores.F}
                  color="from-amber-500 to-orange-500"
                />
                <DimensionBar
                  labelLeft="判断 J"
                  labelRight="知觉 P"
                  left={answers.scores.J}
                  right={answers.scores.P}
                  color="from-emerald-500 to-teal-500"
                />
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-text mb-3">虚拟形象设定</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                你的数字分身是一个
                <span className="text-primary font-medium"> {mbti.vibe} </span>
                气质的存在，TA的标志性特征是
                <span className="text-secondary font-medium"> {mbti.tags[0]} </span>
                和
                <span className="text-accent font-medium"> {mbti.tags[1]}</span>。
                在虚拟世界里，TA总是
                {answers.type.startsWith("I")
                  ? "在安静的角落观察一切，用独特的方式表达自我"
                  : "活跃在人群中心，用热情感染每一个遇到的人"}
                。
              </p>
            </Card>
          </div>
        )}

        {activeTab === "career" && (
          <div className="space-y-4 animate-fade-in">
            <Card className="text-center">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-text mb-2">未来职业预测</h3>
              <p className="text-primary font-semibold text-lg mb-4">{mbti.career}</p>
              <p className="text-text-muted text-sm leading-relaxed">{careerAdvice}</p>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-text mb-3">职场超能力</h3>
              <div className="grid grid-cols-2 gap-3">
                {mbti.tags.slice(0, 4).map((tag, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-surface-light border border-white/5 text-center"
                  >
                    <div className="text-2xl mb-1">
                      {["⚡", "🎯", "🔥", "💎"][i]}
                    </div>
                    <div className="text-sm text-text">{tag}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "moment" && (
          <div className="space-y-4 animate-fade-in">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg">
                    {mbti.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text">我的数字分身</div>
                    <div className="text-xs text-text-muted">刚刚</div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(moment)}
                  className="px-3 py-1.5 rounded-lg bg-surface-light text-xs text-text-muted hover:text-text transition-colors cursor-pointer"
                >
                  复制
                </button>
              </div>
              <p className="text-text leading-relaxed whitespace-pre-line">
                {moment}
              </p>
            </Card>
          </div>
        )}

        {activeTab === "xhs" && (
          <div className="space-y-4 animate-fade-in">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-lg">
                    📝
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text">数字分身笔记</div>
                    <div className="text-xs text-text-muted">小红书风格</div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(xhs)}
                  className="px-3 py-1.5 rounded-lg bg-surface-light text-xs text-text-muted hover:text-text transition-colors cursor-pointer"
                >
                  复制
                </button>
              </div>
              <div className="text-text leading-relaxed whitespace-pre-line">
                {xhs}
              </div>
            </Card>
          </div>
        )}

        {/* 重新测试 */}
        <div className="text-center mt-10">
          <button
            onClick={onRestart}
            className="px-8 py-3 rounded-full border-2 border-white/20 text-text-muted hover:text-text hover:border-white/40 transition-all cursor-pointer"
          >
            再测一次 🔄
          </button>
        </div>
      </div>
    </div>
  );
}

function DimensionBar({ labelLeft, labelRight, left, right, color }) {
  const total = left + right || 1;
  const leftPct = (left / total) * 100;
  const rightPct = (right / total) * 100;

  return (
    <div>
      <div className="flex justify-between text-xs text-text-muted mb-1">
        <span>
          {labelLeft} {left}
        </span>
        <span>
          {labelRight} {right}
        </span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-surface-light">
        <div
          className={`bg-gradient-to-r ${color}`}
          style={{ width: `${leftPct}%` }}
        />
        <div className="bg-surface-light" style={{ width: `${rightPct}%` }} />
      </div>
    </div>
  );
}
