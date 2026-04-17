import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "What is a 'target market'?",
    options: [
      "A goal for how much you want to sell",
      "A specific group of people most likely to buy your product",
      "A type of advertisement",
      "A store where you sell products",
    ],
    answer: 1,
    explanation:
      "A target market is the specific group of customers you aim your product or service at — defined by things like age, location, interests, or income. Knowing your target market helps you spend marketing dollars wisely.",
  },
  {
    id: 2,
    question: "What does 'USP' stand for in marketing?",
    options: [
      "Universal Sales Platform",
      "Unique Selling Proposition",
      "User Support Program",
      "Unlimited Service Package",
    ],
    answer: 1,
    explanation:
      "A Unique Selling Proposition (USP) is what makes your product or service different from — and better than — the competition. It answers: 'Why should I buy from YOU?'",
  },
  {
    id: 3,
    question: "Which of the following is an example of 'inbound marketing'?",
    options: [
      "Cold-calling potential customers",
      "Running TV commercials",
      "Writing a helpful blog post that attracts visitors to your website",
      "Sending mass promotional emails to strangers",
    ],
    answer: 2,
    explanation:
      "Inbound marketing attracts customers to you by creating useful content (blogs, videos, guides). Outbound marketing pushes messages out to people — like cold calls or ads. Inbound tends to build more trust.",
  },
  {
    id: 4,
    question: "A customer 'funnel' refers to:",
    options: [
      "A tool used in manufacturing",
      "The journey a potential customer takes from awareness to purchase",
      "A technique for pouring liquids safely",
      "A type of email marketing campaign",
    ],
    answer: 1,
    explanation:
      "The sales funnel describes the stages a buyer moves through: Awareness → Interest → Consideration → Purchase. It's 'funnel'-shaped because many people enter at the top, but fewer complete a purchase.",
  },
  {
    id: 5,
    question: "What is 'brand identity'?",
    options: [
      "The legal name of a business",
      "How much a brand is worth financially",
      "The visual and emotional elements that define how a brand looks and feels",
      "A type of government registration for businesses",
    ],
    answer: 2,
    explanation:
      "Brand identity includes your logo, colors, fonts, tone of voice, and the overall feeling people get from your brand. Strong brand identity builds recognition and trust.",
  },
  {
    id: 6,
    question: "What does 'conversion rate' measure?",
    options: [
      "How quickly your website loads",
      "The percentage of visitors who take a desired action (like buying)",
      "How many currencies you accept",
      "The number of new social media followers per month",
    ],
    answer: 1,
    explanation:
      "Conversion rate = (number of conversions ÷ total visitors) × 100. If 200 people visit your site and 10 buy something, your conversion rate is 5%. Higher is better!",
  },
  {
    id: 7,
    question: "What is 'word-of-mouth' marketing?",
    options: [
      "Advertising through spoken radio commercials",
      "Customers recommending your business to others based on their experience",
      "A face-to-face sales technique",
      "Posting videos online",
    ],
    answer: 1,
    explanation:
      "Word-of-mouth is when satisfied customers tell friends, family, or colleagues about your business. It's one of the most powerful (and free!) forms of marketing because people trust recommendations from people they know.",
  },
];

const TOTAL = questions.length;

export default function MarketingQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = questions[current];
  const isCorrect = selected === q.answer;

  const handleSelect = (i) => {
    if (!confirmed) setSelected(i);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === q.answer) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { correct: selected === q.answer }]);
  };

  const handleNext = () => {
    if (current + 1 >= TOTAL) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  const pct = Math.round((score / TOTAL) * 100);
  const grade =
    pct === 100 ? "Perfect Score! 🏆" :
    pct >= 80 ? "Great Work! 🎉" :
    pct >= 60 ? "Good Effort! 📈" :
    "Keep Practicing! 💪";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'Georgia', serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .quiz-card { font-family: 'DM Sans', sans-serif; }
        .quiz-title { font-family: 'DM Serif Display', serif; }
        .opt-btn {
          width: 100%;
          text-align: left;
          padding: 14px 18px;
          border-radius: 10px;
          border: 1.5px solid #2a2a2a;
          background: #161616;
          color: #d4d0c8;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.18s ease;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.4;
        }
        .opt-btn:hover:not(:disabled) {
          border-color: #f0a500;
          background: #1e1a10;
          color: #fff;
        }
        .opt-btn:disabled { cursor: default; }
        .opt-selected {
          border-color: #f0a500 !important;
          background: #1e1a10 !important;
          color: #fff !important;
        }
        .opt-correct {
          border-color: #4caf7d !important;
          background: #0d1f16 !important;
          color: #6fcf97 !important;
        }
        .opt-wrong {
          border-color: #e05a5a !important;
          background: #1f0d0d !important;
          color: #e07a7a !important;
        }
        .confirm-btn {
          background: #f0a500;
          color: #0d0d0d;
          border: none;
          padding: 13px 32px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .confirm-btn:hover { background: #ffc22a; }
        .confirm-btn:disabled { background: #333; color: #666; cursor: default; }
        .next-btn {
          background: transparent;
          color: #f0a500;
          border: 1.5px solid #f0a500;
          padding: 12px 28px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .next-btn:hover { background: #f0a500; color: #0d0d0d; }
        .progress-bar-bg {
          width: 100%;
          height: 6px;
          background: #222;
          border-radius: 99px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #f0a500, #ffc22a);
          border-radius: 99px;
          transition: width 0.4s ease;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1.5px solid #333;
          background: #1a1a1a;
          transition: all 0.2s;
        }
        .dot-done-correct { background: #4caf7d; border-color: #4caf7d; }
        .dot-done-wrong { background: #e05a5a; border-color: #e05a5a; }
        .dot-current { border-color: #f0a500; box-shadow: 0 0 0 2px #f0a50033; }
        .restart-btn {
          background: #f0a500;
          color: #0d0d0d;
          border: none;
          padding: 14px 36px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s;
        }
        .restart-btn:hover { background: #ffc22a; }
      `}</style>

      <div className="quiz-card" style={{
        width: "100%",
        maxWidth: 600,
        background: "#111",
        borderRadius: 18,
        border: "1px solid #222",
        padding: "36px 32px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
      }}>

        {!finished ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span className="quiz-title" style={{ color: "#f0a500", fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>
                  Marketing & Sales · Beginner
                </span>
                <span style={{ color: "#555", fontSize: 13 }}>
                  {current + 1} / {TOTAL}
                </span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${((current + (confirmed ? 1 : 0)) / TOTAL) * 100}%` }} />
              </div>

              {/* Dots */}
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                {questions.map((_, i) => {
                  let cls = "dot";
                  if (i < answers.length) cls += answers[i].correct ? " dot-done-correct" : " dot-done-wrong";
                  else if (i === current) cls += " dot-current";
                  return <div key={i} className={cls} />;
                })}
              </div>
            </div>

            {/* Score chip */}
            <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
              <span style={{
                background: "#1a1a1a", border: "1px solid #2a2a2a",
                borderRadius: 99, padding: "4px 14px",
                color: "#4caf7d", fontSize: 13, fontWeight: 600,
              }}>
                ✓ {score} correct
              </span>
              <span style={{
                background: "#1a1a1a", border: "1px solid #2a2a2a",
                borderRadius: 99, padding: "4px 14px",
                color: "#e05a5a", fontSize: 13, fontWeight: 600,
              }}>
                ✗ {answers.length - score} wrong
              </span>
            </div>

            {/* Question */}
            <p style={{
              color: "#f5f2e8",
              fontSize: 20,
              lineHeight: 1.5,
              marginBottom: 22,
              fontFamily: "'DM Serif Display', serif",
            }}>
              {q.question}
            </p>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {q.options.map((opt, i) => {
                let cls = "opt-btn";
                if (confirmed) {
                  if (i === q.answer) cls += " opt-correct";
                  else if (i === selected && selected !== q.answer) cls += " opt-wrong";
                } else if (i === selected) {
                  cls += " opt-selected";
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleSelect(i)}
                    disabled={confirmed}
                  >
                    <span style={{ color: "#555", marginRight: 10, fontWeight: 600 }}>
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {confirmed && (
              <div style={{
                background: isCorrect ? "#0d1f16" : "#1a0f0f",
                border: `1px solid ${isCorrect ? "#2d6a4a" : "#5a2020"}`,
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 22,
                color: "#c8c4bb",
                fontSize: 14,
                lineHeight: 1.6,
              }}>
                <div style={{ fontWeight: 700, marginBottom: 6, color: isCorrect ? "#6fcf97" : "#e07a7a" }}>
                  {isCorrect ? "✓ Correct!" : "✗ Not quite."}
                </div>
                {q.explanation}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              {!confirmed ? (
                <button className="confirm-btn" onClick={handleConfirm} disabled={selected === null}>
                  Submit Answer
                </button>
              ) : (
                <button className="next-btn" onClick={handleNext}>
                  {current + 1 >= TOTAL ? "See Results →" : "Next Question →"}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Results screen */
          <div style={{ textAlign: "center" }}>
            <div className="quiz-title" style={{ fontSize: 42, color: "#f0a500", marginBottom: 8, fontFamily: "'DM Serif Display', serif" }}>
              {grade}
            </div>
            <p style={{ color: "#888", fontSize: 15, marginBottom: 28 }}>
              You scored <strong style={{ color: "#f5f2e8" }}>{score} out of {TOTAL}</strong> questions correctly.
            </p>

            {/* Big score ring */}
            <div style={{
              width: 130, height: 130, borderRadius: "50%",
              background: `conic-gradient(#f0a500 ${pct * 3.6}deg, #1a1a1a 0deg)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 28px",
            }}>
              <div style={{
                width: 104, height: 104, borderRadius: "50%",
                background: "#111", display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column",
              }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "#f5f2e8", fontFamily: "'DM Serif Display', serif" }}>{pct}%</span>
              </div>
            </div>

            {/* Per-question breakdown */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
              {answers.map((a, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: a.correct ? "#0d1f16" : "#1a0f0f",
                  border: `1.5px solid ${a.correct ? "#4caf7d" : "#e05a5a"}`,
                  color: a.correct ? "#4caf7d" : "#e05a5a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700,
                }}>
                  {a.correct ? "✓" : "✗"}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 24, color: "#666", fontSize: 14, lineHeight: 1.7 }}>
              {pct < 60 && "No worries — marketing fundamentals take time. Try again and check the explanations after each question!"}
              {pct >= 60 && pct < 80 && "Solid start! Review the ones you missed and you'll nail it next time."}
              {pct >= 80 && pct < 100 && "You've got a strong grasp of the basics. Ready to level up to intermediate?"}
              {pct === 100 && "Flawless! You've mastered the beginner level. Time to tackle something harder!"}
            </div>

            <button className="restart-btn" onClick={handleRestart}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
