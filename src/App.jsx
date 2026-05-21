import { useState, useCallback } from "react";
import StarBackground from "./components/StarBackground";
import Welcome from "./components/Welcome";
import Quiz from "./components/Quiz";
import Loading from "./components/Loading";
import Result from "./components/Result";
import { calculateMBTI } from "./utils/personality";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [result, setResult] = useState(null);

  const handleStart = useCallback(() => {
    setScreen("quiz");
  }, []);

  const handleComplete = useCallback((answers) => {
    setScreen("loading");
    const mbtiResult = calculateMBTI(answers);

    // 模拟分析时间
    setTimeout(() => {
      setResult(mbtiResult);
      setScreen("result");
    }, 4000);
  }, []);

  const handleRestart = useCallback(() => {
    setResult(null);
    setScreen("welcome");
  }, []);

  return (
    <div className="relative min-h-screen bg-bg">
      <StarBackground />

      {screen === "welcome" && <Welcome onStart={handleStart} />}
      {screen === "quiz" && <Quiz onComplete={handleComplete} />}
      {screen === "loading" && <Loading />}
      {screen === "result" && result && <Result answers={result} onRestart={handleRestart} />}
    </div>
  );
}

export default App;
