import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  LayoutDashboard,
  Compass,
  BookOpen,
  MessagesSquare,
  UserRound,
  Award,
  BriefcaseBusiness,
  ChevronRight,
  ChevronDown,
  Check,
  Clock,
  Play,
  FileText,
  Upload,
  Search,
  Bell,
  Plus,
  X,
  Building2,
  Users,
  Send,
  CheckCircle2,
  Target,
  Layers,
  Monitor,
  ShieldCheck,
  Factory,
  Settings2,
  Volume2,
  MicOff,
  VideoOff,
  ExternalLink,
  TrendingUp,
  GraduationCap,
  Menu,
} from "lucide-react";
import { lessons, scenarios, candidates, assessments } from "./data";
import { createDemoConversation } from "./conversation";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./styles.css";
const icons = {
  compass: Compass,
  messages: MessagesSquare,
  layers: Layers,
  monitor: Monitor,
  shield: ShieldCheck,
  users: Users,
  factory: Factory,
};
const initialCompleted = [1];
function BridgeLogo() {
  return (
    <div className="brand">
      <span className="brand-icon">
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M5 24V10m22 14V10M5 19h22M5 12c7 0 7 11 11 11s4-11 11-11M11 19v-3m10 3v-3"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>
        bridge<span className="brand-se">SE</span>
        <small>SALES ENGINEERING</small>
      </span>
    </div>
  );
}
function IndustryArt({ compact = false }) {
  return (
    <div
      className={"industry-art " + (compact ? "compact" : "")}
      aria-hidden="true"
    >
      <div className="art-grid" />
      <svg viewBox="0 0 440 300">
        <defs>
          <linearGradient id="building" x2="1" y2="1">
            <stop stopColor="#387c72" />
            <stop offset="1" stopColor="#1a5149" />
          </linearGradient>
        </defs>
        <path
          d="m45 215 180-101 173 97-180 100z"
          fill="#367b6a"
          opacity=".35"
        />
        <path d="m89 181 116-65 129 74-116 67z" fill="#68ad91" />
        <path d="m89 181 129 74v-83L89 99z" fill="#337267" />
        <path d="m218 255 116-65v-83l-116 65z" fill="url(#building)" />
        <path d="m89 99 116-65 129 73-116 65z" fill="#a1c9af" />
        <path d="m106 99 99-55 112 63-99 56z" fill="#79ac90" />
        <path
          d="m116 101 88-49 1 27-64 36zM158 125l87-49 1 27-64 37z"
          fill="#cae1cb"
        />
        <path
          d="m110 145 22 12v30l-22-12zm39 22 22 12v30l-22-12zm39 22 16 9v30l-16-9z"
          fill="#c1e5c8"
        />
        <path
          d="m237 181 25-14v32l-25 14zm42-24 25-14v32l-25 14z"
          fill="#9ed6c4"
        />
        <path d="m274 91 18-10V35l-18 10z" fill="#b8d6be" />
        <path d="m255 35 19 10 18-10-19-10z" fill="#def0d9" />
        <path d="m255 35 19 10v46l-19-11z" fill="#7aab92" />
        <path
          d="m61 228 17 10 49-28-18-10zm249 17 19 11 48-28-19-11z"
          fill="#6ec6a2"
        />
        <path d="m65 206 13 7v25l-13-7zm263 27 13 7v16l-13-7z" fill="#9ed9b7" />
        <circle cx="356" cy="103" r="25" fill="#4ea682" opacity=".3" />
        <path
          d="m345 102 8 8 15-17"
          stroke="#b6f5c7"
          strokeWidth="3"
          fill="none"
        />
      </svg>
      <div className="art-label">
        <span className="live-dot" /> ENGINEERING MEETS OPPORTUNITY
      </div>
    </div>
  );
}
function App() {
  const [activeInvitation, setActiveInvitation] = useState(null),
    [view, setView] = useState("student"),
    [page, setPage] = useState("dashboard"),
    [completed, setCompleted] = useState(initialCompleted),
    [lesson, setLesson] = useState(null),
    [scenario, setScenario] = useState(null),
    [session, setSession] = useState(false),
    [transcript, setTranscript] = useState([]),
    [turn, setTurn] = useState(0),
    [score, setScore] = useState(0),
    [feedback, setFeedback] = useState(false),
    [history, setHistory] = useState([]),
    [candidate, setCandidate] = useState(null),
    [assessment, setAssessment] = useState(assessments[0]),
    [invitations, setInvitations] = useState([]),
    [toast, setToast] = useState(""),
    [query, setQuery] = useState(""),
    [profile, setProfile] = useState({
      name: "Alex Morgan",
      headline: "Mechanical engineering student. Future sales engineer.",
      school: "State University",
      year: "Class of 2027",
      interests: ["Industrial automation", "AI infrastructure"],
    }),
    [editing, setEditing] = useState(false),
    [resume, setResume] = useState(false),
    [mobile, setMobile] = useState(false),
    [filter, setFilter] = useState("All scenarios");
  const adapter = useRef(null),
    timer = useRef(null);
  useEffect(() => {
    if (!candidate) return;
    const previous = document.activeElement;
    const dialog = document.querySelector("[role=dialog]");
    const controls = () =>
      Array.from(dialog.querySelectorAll('button,select,input,[tabindex="0"]'));
    controls()[0]?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setCandidate(null);
      if (event.key === "Tab") {
        const items = controls(),
          first = items[0],
          last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [candidate]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const notify = (message) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 4000);
  };
  const navigate = (p) => {
    setPage(p);
    setLesson(null);
    setScenario(null);
    setSession(false);
    setFeedback(false);
    setMobile(false);
    setQuery("");
    setActiveInvitation(null);
  };
  const switchView = (v) => {
    setView(v);
    navigate("dashboard");
  };
  const start = () => {
    adapter.current = createDemoConversation(scenario);
    setTranscript([adapter.current.start()]);
    setTurn(0);
    setScore(0);
    setSession(true);
    setFeedback(false);
  };
  const respond = (i) => {
    const result = adapter.current.respond(i);
    setTranscript((t) => [
      ...t,
      { role: "student", text: scenario.choices[turn][i] },
      ...(result.message ? [result.message] : []),
    ]);
    setScore((s) => s + (result.strong ? 1 : 0));
    setTurn((t) => t + 1);
    if (result.done) {
      if (activeInvitation)
        setInvitations((a) =>
          a.map((x) =>
            x.id === activeInvitation ? { ...x, status: "Completed" } : x,
          ),
        );
      setHistory((h) => [
        {
          title: scenario.title,
          date: "Just now",
          score: Math.round(((score + (result.strong ? 1 : 0)) / 3) * 100),
        },
        ...h,
      ]);
      setFeedback(true);
    }
  };
  const sendAssessment = () => {
    if (
      invitations.some(
        (i) => i.candidateId === candidate.id && i.title === assessment,
      )
    ) {
      notify("This assessment has already been sent.");
      return;
    }
    setInvitations((i) => [
      ...i,
      {
        id: Date.now(),
        candidateId: candidate.id,
        name: candidate.name,
        title: assessment,
        status: "Pending",
      },
    ]);
    notify("Demo invitation sent to " + candidate.name);
    setCandidate(null);
  };
  const complete = () => {
    if (!completed.includes(lesson.id)) {
      setCompleted((c) => [...c, lesson.id]);
      notify("Lesson complete. You earned a demo learning badge!");
    }
  };
  const greeting = profile.name.split(" ")[0];
  const nav =
    view === "student"
      ? [
          ["dashboard", LayoutDashboard, "Overview"],
          ["learn", BookOpen, "Learn"],
          ["practice", MessagesSquare, "Practice"],
          ["profile", UserRound, "My profile"],
          ["badges", Award, "My badges"],
        ]
      : [
          ["dashboard", LayoutDashboard, "Overview"],
          ["candidates", Users, "Candidates"],
          ["assessments", FileText, "Assessments"],
        ];
  const IconBox = ({ name, color = "blue" }) => {
    const Icon = icons[name] || BookOpen;
    return (
      <span className={"icon-box " + color}>
        <Icon size={23} />
      </span>
    );
  };
  const lessonCard = (l) => (
    <button className="lesson-card" key={l.id} onClick={() => setLesson(l)}>
      <div className="card-top">
        <IconBox name={l.icon} color={l.color} />
        <span className="time">
          <Clock size={13} />
          {l.time} min
        </span>
      </div>
      <span className="eyebrow">{l.category}</span>
      <h3>{l.title}</h3>
      <p>{l.description}</p>
      <div className="lesson-bottom">
        {completed.includes(l.id) ? (
          <span className="complete-label">
            <CheckCircle2 size={14} /> Completed
          </span>
        ) : (
          <span>
            {l.id === 2 ? "Continue learning" : "Start lesson"}{" "}
            <ArrowRight size={15} />
          </span>
        )}
        <span
          className={
            "tiny-progress " + (completed.includes(l.id) ? "done" : "")
          }
        />
      </div>
    </button>
  );
  const practiceCards = () =>
    scenarios
      .filter(
        (s) =>
          (filter === "All scenarios" || s.difficulty === filter) &&
          `${s.title} ${s.subtitle}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      )
      .map((s, i) => (
        <button
          className="scenario-card"
          key={s.id}
          onClick={() => {
            setScenario(s);
            setFeedback(false);
            setSession(false);
          }}
        >
          <div className={"scenario-visual " + s.color}>
            <span className="visual-ring" />
            {i === 0 ? (
              <Factory size={50} strokeWidth={1.3} />
            ) : i === 1 ? (
              <Layers size={50} strokeWidth={1.3} />
            ) : (
              <Settings2 size={50} strokeWidth={1.3} />
            )}
            <span className="scenario-tag">{s.subtitle}</span>
          </div>
          <div className="scenario-body">
            <div className="meta">
              <span className={"level " + s.color}>{s.difficulty}</span>
              <span>
                <Clock size={13} />
                {s.time}
              </span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.goal}</p>
            <span className="text-link">
              Explore scenario <ArrowUpRight size={17} />
            </span>
          </div>
        </button>
      ));
  return (
    <div className="app-shell">
      <aside className={"sidebar " + (mobile ? "open" : "")}>
        <BridgeLogo />
        <div className="workspace-label">YOUR WORKSPACE</div>
        <div className="view-switch">
          <button
            className={view === "student" ? "active" : ""}
            onClick={() => switchView("student")}
          >
            <GraduationCap size={16} />
            Student
          </button>
          <button
            className={view === "company" ? "active" : ""}
            onClick={() => switchView("company")}
          >
            <Building2 size={15} />
            Company
          </button>
        </div>
        <nav>
          {nav.map(([id, Icon, label]) => (
            <button
              key={id}
              className={page === id ? "active" : ""}
              onClick={() => navigate(id)}
            >
              <Icon size={19} />
              {label}
              {id === "badges" && (
                <span className="nav-count">{completed.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-card">
          <span className="sparkle">✦</span>
          <h4>
            Technical mind.
            <br />
            Customer impact.
          </h4>
          <p>Build the bridge to your next career.</p>
          <button
            onClick={() => {
              switchView("student");
              navigate("learn");
            }}
          >
            Explore the role <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="sidebar-bottom">
          <span className="demo-dot" />
          INTERACTIVE DEMO <span>v0.1</span>
        </div>
        <button
          className="sidebar-user"
          onClick={() => {
            if (view === "student") navigate("profile");
            else notify("Northline Automation is a fictional demo company.");
          }}
        >
          <span className="avatar">{view === "student" ? "AM" : "NA"}</span>
          <span>
            <strong>
              {view === "student" ? profile.name : "Northline Automation"}
            </strong>
            <small>
              {view === "student" ? "Student account" : "Company demo"}
            </small>
          </span>
          <ChevronDown size={15} />
        </button>
      </aside>
      <div className="main-wrap">
        <header className="topbar">
          <button
            className="mobile-toggle"
            aria-label="Toggle navigation"
            onClick={() => setMobile(!mobile)}
          >
            <Menu />
          </button>
          <div className="breadcrumb">
            Workspace <ChevronRight size={14} />
            <strong>
              {lesson
                ? "Learning studio"
                : scenario
                  ? "Practice studio"
                  : page === "dashboard"
                    ? "Overview"
                    : page === "profile"
                      ? "My profile"
                      : page[0].toUpperCase() + page.slice(1)}
            </strong>
          </div>
          <div className="topbar-right">
            <span className="demo-pill">
              <span />
              Demo workspace
            </span>
            <button
              className="notification"
              aria-label="View invitations"
              onClick={() => {
                navigate(view === "student" ? "dashboard" : "assessments");
                notify(
                  invitations.length
                    ? `${invitations.length} demo invitation${invitations.length === 1 ? "" : "s"}`
                    : "You’re all caught up.",
                );
              }}
            >
              <Bell size={19} />
              {invitations.length > 0 && <i />}
            </button>
            <span className="avatar small">
              {view === "student" ? "AM" : "NA"}
            </span>
          </div>
        </header>
        <main>
          {lesson ? (
            <>
              <button className="back" onClick={() => setLesson(null)}>
                <ArrowLeft size={16} />
                Back to learning
              </button>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">{lesson.category}</span>
                  <h1>{lesson.title}</h1>
                  <p>
                    <Clock size={15} /> {lesson.time} minute lesson · Sales
                    engineering foundations
                  </p>
                </div>
              </div>
              <div className="lesson-layout">
                <section className="panel lesson-content">
                  <div className="video-placeholder">
                    <span className="video-play">
                      <Play size={32} fill="currentColor" />
                    </span>
                    <h3>A closer look at {lesson.category.toLowerCase()}</h3>
                    <p>Video placeholder · Demo lesson</p>
                  </div>
                  <h2>Lesson overview</h2>
                  <p>{lesson.summary}</p>
                  <div className="takeaway">
                    <Target size={22} />
                    <div>
                      <strong>Your key takeaway</strong>
                      <p>{lesson.takeaway}</p>
                    </div>
                  </div>
                  <button className="primary" onClick={complete}>
                    {completed.includes(lesson.id) ? (
                      <>
                        <Check size={17} />
                        Completed
                      </>
                    ) : (
                      <>
                        Mark complete <CheckCircle2 size={17} />
                      </>
                    )}
                  </button>
                </section>
                <aside className="panel lesson-aside">
                  <Award size={32} color="#238063" />
                  <h3>Small steps. Real momentum.</h3>
                  <p>
                    Complete this lesson to add a demo learning badge to your
                    profile.
                  </p>
                  <div className="notice">
                    Demo badges reflect completion in this prototype. They are
                    not accredited or employer-recognized certifications.
                  </div>
                </aside>
              </div>
            </>
          ) : scenario ? (
            <>
              <button
                className="back"
                onClick={() => {
                  setScenario(null);
                  setSession(false);
                  setFeedback(false);
                }}
              >
                <ArrowLeft size={16} />
                Back to practice
              </button>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">
                    {scenario.subtitle} · SCRIPTED DEMO
                  </span>
                  <h1>{scenario.title}</h1>
                  <p>
                    A safe place to build your customer-facing engineering
                    skills.
                  </p>
                </div>
                <span className="outline-chip">{scenario.time}</span>
              </div>
              {!session ? (
                <div className="scenario-detail">
                  <div className="panel brief">
                    <span className="eyebrow">YOUR MISSION</span>
                    <h2>Meet your customer.</h2>
                    <p>{scenario.brief}</p>
                    <div className="takeaway">
                      <Target />
                      <div>
                        <strong>What you’re working toward</strong>
                        <p>{scenario.goal}</p>
                      </div>
                    </div>
                    <h3>How this practice works</h3>
                    <p>
                      Choose a response across three conversation turns, then
                      review feedback. This is a scripted simulation with a CSS
                      avatar. No live AI, microphone, camera, or recording is
                      connected.
                    </p>
                    <button className="primary" onClick={start}>
                      Start simulated conversation <ArrowRight size={17} />
                    </button>
                  </div>
                  <CustomerPanel scenario={scenario} />
                </div>
              ) : feedback ? (
                <div className="feedback-layout">
                  <section className="panel">
                    <span className="eyebrow">PRACTICE COMPLETE</span>
                    <h2>A stronger conversation starts here.</h2>
                    <p className="muted">
                      Scripted demo feedback · Based on the responses you
                      selected
                    </p>
                    <div className="score-banner">
                      <span>
                        {Math.round((score / 3) * 100)}
                        <small>/ 100</small>
                      </span>
                      <div>
                        <strong>
                          {score === 3
                            ? "Thoughtful discovery. Clear next steps."
                            : "Keep asking before prescribing."}
                        </strong>
                        <p>
                          {score} of 3 responses followed the suggested
                          approach.
                        </p>
                      </div>
                    </div>
                    {[
                      "Discovery",
                      "Technical explanation",
                      "Solution fit",
                      "Objection handling",
                    ].map((name, i) => (
                      <div className="feedback-row" key={name}>
                        <CheckCircle2 size={20} />
                        <div>
                          <strong>{name}</strong>
                          <p>
                            {
                              [
                                score > 0
                                  ? "Continue asking about measurable operational impact."
                                  : "Start with impact and constraints before discussing products.",
                                "Explain technical tradeoffs and avoid unverified guarantees.",
                                "Agree on a limited pilot and measurable acceptance criteria.",
                                "Clarify the risk and involve the customer’s technical owner.",
                              ][i]
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                    <button className="primary" onClick={start}>
                      Practice again <ArrowRight size={17} />
                    </button>
                  </section>
                  <section className="panel transcript-review">
                    <h3>Conversation recap</h3>
                    {transcript.map((m, i) => (
                      <div key={i} className={"chat-message " + m.role}>
                        <small>
                          {m.role === "student"
                            ? "YOU"
                            : scenario.role.toUpperCase()}
                        </small>
                        <p>{m.text}</p>
                      </div>
                    ))}
                  </section>
                </div>
              ) : (
                <div className="call-layout">
                  <CustomerPanel scenario={scenario} inCall />
                  <section className="panel conversation">
                    <div className="conversation-heading">
                      <h3>Customer conversation</h3>
                      <span className="outline-chip">Turn {turn + 1} / 3</span>
                    </div>
                    <div className="chat-log" aria-live="polite">
                      {transcript.map((m, i) => (
                        <div key={i} className={"chat-message " + m.role}>
                          <small>
                            {m.role === "student"
                              ? "YOU"
                              : scenario.role.toUpperCase()}
                          </small>
                          <p>{m.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="response-options">
                      <span className="eyebrow">CHOOSE YOUR RESPONSE</span>
                      {scenario.choices[turn]?.map((text, i) => (
                        <button key={i} onClick={() => respond(i)}>
                          {text}
                          <ArrowUpRight size={17} />
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </>
          ) : view === "student" ? (
            <>
              {page === "dashboard" && (
                <>
                  <div className="page-heading">
                    <div>
                      <div className="eyebrow">
                        YOUR NEXT CHAPTER STARTS HERE
                      </div>
                      <h1>
                        Welcome back, {greeting} <span className="wave">✳</span>
                      </h1>
                      <p>
                        Bring your technical knowledge. Build your customer
                        impact.
                      </p>
                    </div>
                    <button
                      className="secondary"
                      onClick={() => navigate("profile")}
                    >
                      View my profile <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <section className="hero">
                    <div className="hero-copy">
                      <span className="hero-kicker">
                        <span />
                        ENGINEERING YOUR FUTURE
                      </span>
                      <h2>
                        Great engineers solve problems.
                        <br />
                        Sales engineers connect the dots.
                      </h2>
                      <p>
                        Learn the role. Practice the conversation.
                        <br />
                        Turn technical expertise into a career that connects.
                      </p>
                      <button
                        className="white-button"
                        onClick={() => {
                          navigate("learn");
                          setLesson(lessons[1]);
                        }}
                      >
                        Continue learning <ArrowRight size={17} />
                      </button>
                      <span className="hero-footnote">
                        YOUR PATH TO SALES ENGINEERING
                      </span>
                    </div>
                    <IndustryArt />
                  </section>
                  <div className="stats-grid">
                    <Stat
                      icon={BookOpen}
                      label="Learning progress"
                      value={`${completed.length} of 7`}
                      detail="lessons completed"
                      color="blue"
                    />
                    <Stat
                      icon={MessagesSquare}
                      label="Practice sessions"
                      value={history.length.toString().padStart(2, "0")}
                      detail="conversations explored"
                      color="green"
                    />
                    <Stat
                      icon={Award}
                      label="Badges earned"
                      value={completed.length.toString().padStart(2, "0")}
                      detail="demo learning badges"
                      color="purple"
                    />
                    <Stat
                      icon={BriefcaseBusiness}
                      label="Your next opportunity"
                      value={invitations
                        .filter((i) => i.candidateId === 1)
                        .length.toString()
                        .padStart(2, "0")}
                      detail="assessment invitations"
                      color="orange"
                    />
                  </div>
                  {invitations
                    .filter((i) => i.candidateId === 1)
                    .map((inv) => (
                      <div className="invitation" key={inv.id}>
                        <div className="icon-box green">
                          <Send size={22} />
                        </div>
                        <div>
                          <span className="eyebrow">NEW DEMO ASSESSMENT</span>
                          <h3>{inv.title}</h3>
                          <p>
                            Northline Automation · Fictional company ·{" "}
                            {inv.status}
                          </p>
                        </div>
                        <button
                          className="primary"
                          onClick={() => {
                            setActiveInvitation(inv.id);
                            setInvitations((a) =>
                              a.map((x) =>
                                x.id === inv.id
                                  ? { ...x, status: "Started" }
                                  : x,
                              ),
                            );
                            setScenario(
                              scenarios[
                                inv.title.startsWith("Cloud")
                                  ? 1
                                  : inv.title.startsWith("Technical")
                                    ? 2
                                    : 0
                              ],
                            );
                            setSession(false);
                          }}
                        >
                          Open assessment <ArrowRight size={16} />
                        </button>
                      </div>
                    ))}
                  <div className="section-heading">
                    <div>
                      <h2>Keep building your foundation</h2>
                      <p>
                        A little learning today. A more confident conversation
                        tomorrow.
                      </p>
                    </div>
                    <button
                      className="text-link"
                      onClick={() => navigate("learn")}
                    >
                      All learning <ArrowRight size={16} />
                    </button>
                  </div>
                  <div className="lesson-grid">
                    {lessons.slice(1, 4).map(lessonCard)}
                  </div>
                  <div className="lower-grid">
                    <section className="panel practice-feature">
                      <div className="feature-icon">
                        <MessagesSquare size={25} />
                      </div>
                      <div>
                        <span className="eyebrow">PUT IT INTO PRACTICE</span>
                        <h2>Your first customer is waiting.</h2>
                        <p>
                          Step into a plant manager’s shoes—and start asking the
                          right questions.
                        </p>
                        <button
                          className="text-link"
                          onClick={() => {
                            navigate("practice");
                            setScenario(scenarios[0]);
                          }}
                        >
                          Try a discovery scenario <ArrowRight size={17} />
                        </button>
                      </div>
                      <span className="abstract-chat">“</span>
                    </section>
                    <section className="panel profile-nudge">
                      <div className="section-heading">
                        <h3>Your profile, your potential</h3>
                        <span>75%</span>
                      </div>
                      <div className="progress-track">
                        <span style={{ width: resume ? "100%" : "75%" }} />
                      </div>
                      <p>
                        {resume
                          ? "You’re ready to explore your next chapter."
                          : "Make your engineering story stand out."}
                      </p>
                      <button
                        className="text-link"
                        onClick={() => navigate("profile")}
                      >
                        {resume
                          ? "View your career profile"
                          : "Add a demo resume"}{" "}
                        <ArrowUpRight size={16} />
                      </button>
                    </section>
                  </div>
                </>
              )}
              {page === "learn" && (
                <>
                  <div className="page-heading">
                    <div>
                      <span className="eyebrow">
                        THE KNOWLEDGE BEHIND THE CONVERSATION
                      </span>
                      <h1>Learn sales engineering.</h1>
                      <p>
                        Build technical credibility. Learn to connect it to
                        customer outcomes.
                      </p>
                    </div>
                    <span className="outline-chip">
                      {completed.length} / 7 complete
                    </span>
                  </div>
                  <div className="learning-banner">
                    <BookOpen size={28} />
                    <div>
                      <h3>Your sales engineering foundation</h3>
                      <p>
                        Seven practical lessons, from discovery to the factory
                        floor.
                      </p>
                    </div>
                    <div className="banner-progress">
                      <span>{Math.round((completed.length / 7) * 100)}%</span>
                      <div className="progress-track">
                        <span
                          style={{ width: `${(completed.length / 7) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lesson-grid library">
                    {lessons.map(lessonCard)}
                  </div>
                  <p className="disclaimer">
                    All lesson content and completion badges are part of this
                    demo. No accredited certifications are offered.
                  </p>
                </>
              )}
              {page === "practice" && (
                <>
                  <div className="page-heading">
                    <div>
                      <span className="eyebrow">
                        TECHNICAL SKILLS. HUMAN CONVERSATIONS.
                      </span>
                      <h1>A little practice. A lot more confidence.</h1>
                      <p>
                        Explore realistic sales engineering scenarios in a
                        pressure-free space.
                      </p>
                    </div>
                  </div>
                  <div className="toolbar">
                    <div className="tabs">
                      {["All scenarios", "Beginner", "Intermediate"].map(
                        (f) => (
                          <button
                            className={filter === f ? "active" : ""}
                            onClick={() => setFilter(f)}
                            key={f}
                          >
                            {f}
                          </button>
                        ),
                      )}
                    </div>
                    <label className="search">
                      <Search size={17} />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find a scenario"
                      />
                    </label>
                  </div>
                  <div className="scenario-grid">{practiceCards()}</div>
                  <div className="notice inline">
                    <MicOff size={18} />
                    Scripted conversations, illustrative avatars, and sample
                    feedback. No live AI, audio, video, or recording.
                  </div>
                  <div className="section-heading">
                    <h2>Your practice history</h2>
                  </div>
                  <section className="panel">
                    {history.length ? (
                      history.map((h, i) => (
                        <div className="history-row" key={i}>
                          <MessagesSquare size={22} />
                          <div>
                            <strong>{h.title}</strong>
                            <small>{h.date} · Scripted practice</small>
                          </div>
                          <span>{h.score}%</span>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <MessagesSquare />
                        <h3>Your first conversation is a click away.</h3>
                        <p>
                          Complete a scenario to see your practice history here.
                        </p>
                      </div>
                    )}
                  </section>
                </>
              )}
              {page === "profile" && (
                <>
                  <div className="page-heading">
                    <div>
                      <span className="eyebrow">YOUR ENGINEERING STORY</span>
                      <h1>My career profile</h1>
                      <p>
                        A snapshot of where you are—and where you want to go.
                      </p>
                    </div>
                    <button
                      className="secondary"
                      onClick={() => setEditing(!editing)}
                    >
                      {editing ? "Done editing" : "Edit profile"}{" "}
                      <UserRound size={16} />
                    </button>
                  </div>
                  <div className="profile-cover">
                    <div className="cover-lines" />
                    <span>BUILT TO CONNECT.</span>
                  </div>
                  <div className="profile-layout">
                    <section className="panel profile-main">
                      <span className="avatar profile-avatar">AM</span>
                      <span className="demo-pill">Fictional student</span>
                      {editing ? (
                        <div className="edit-fields">
                          <label>
                            Full name
                            <input
                              value={profile.name}
                              onChange={(e) =>
                                setProfile({ ...profile, name: e.target.value })
                              }
                            />
                          </label>
                          <label>
                            Headline
                            <input
                              value={profile.headline}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  headline: e.target.value,
                                })
                              }
                            />
                          </label>
                          <label>
                            University
                            <input
                              value={profile.school}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  school: e.target.value,
                                })
                              }
                            />
                          </label>
                        </div>
                      ) : (
                        <>
                          <h2>{profile.name}</h2>
                          <p>{profile.headline}</p>
                          <p className="school">
                            <GraduationCap size={17} />
                            {profile.school} · {profile.year}
                          </p>
                        </>
                      )}
                      <hr />
                      <h3>Career direction</h3>
                      <p className="muted">
                        Exploring Sales Engineer, Solutions Engineer,
                        Applications Engineer, and Technical Consultant roles.
                      </p>
                      <h3>Industries I’m curious about</h3>
                      <div className="interest-options">
                        {[
                          "Industrial automation",
                          "Cloud & data centers",
                          "Embedded systems",
                          "AI infrastructure",
                        ].map((i) => (
                          <button
                            key={i}
                            className={
                              profile.interests.includes(i) ? "selected" : ""
                            }
                            onClick={() =>
                              setProfile((p) => ({
                                ...p,
                                interests: p.interests.includes(i)
                                  ? p.interests.filter((x) => x !== i)
                                  : [...p.interests, i],
                              }))
                            }
                          >
                            {profile.interests.includes(i) ? (
                              <Check size={14} />
                            ) : (
                              <Plus size={14} />
                            )}{" "}
                            {i}
                          </button>
                        ))}
                      </div>
                      <hr />
                      <h3>Skills taking shape</h3>
                      <div className="chips">
                        {[
                          "Technical discovery",
                          "Systems thinking",
                          "Customer communication",
                          "PLC fundamentals",
                        ].map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </section>
                    <div className="profile-right">
                      <section className="panel">
                        <div className="section-heading">
                          <h3>My resume</h3>
                          <FileText size={21} />
                        </div>
                        <p className="muted">
                          Tell the rest of your engineering story.
                        </p>
                        <label className="upload-zone">
                          <Upload size={25} />
                          <strong>
                            {resume
                              ? "Demo resume attached"
                              : "Try a local resume selection"}
                          </strong>
                          <span>
                            {resume
                              ? "No file content was read or stored."
                              : "Selection only · No file content is read or sent"}
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              if (e.target.files.length) {
                                setResume(true);
                                notify(
                                  "Demo resume selected. No file content was read, stored, or transmitted.",
                                );
                                e.target.value = "";
                              }
                            }}
                          />
                        </label>
                        {resume && (
                          <button
                            className="text-link remove"
                            onClick={() => setResume(false)}
                          >
                            Remove demo attachment <X size={14} />
                          </button>
                        )}
                      </section>
                      <section className="panel">
                        <div className="section-heading">
                          <h3>Learning & badges</h3>
                          <Award size={21} />
                        </div>
                        <p className="muted">
                          {completed.length} lessons complete · {history.length}{" "}
                          practice sessions
                        </p>
                        <div className="badge-mini">
                          <Award size={31} />
                          <span>
                            Sales engineering explorer
                            <small>Demo completion badge</small>
                          </span>
                        </div>
                        <button
                          className="text-link"
                          onClick={() => navigate("badges")}
                        >
                          View all badges <ArrowRight size={16} />
                        </button>
                      </section>
                    </div>
                  </div>
                </>
              )}
              {page === "badges" && (
                <>
                  <div className="page-heading">
                    <div>
                      <span className="eyebrow">PROGRESS WORTH SHOWING</span>
                      <h1>Your learning, made visible.</h1>
                      <p>
                        Every completed lesson is another step toward your sales
                        engineering career.
                      </p>
                    </div>
                  </div>
                  <div className="notice inline">
                    <Award size={22} />
                    Demo completion badges only. These are not accredited or
                    employer-recognized certifications.
                  </div>
                  <div className="badge-grid">
                    {lessons.map((l) => (
                      <div
                        key={l.id}
                        className={
                          "panel badge-card " +
                          (!completed.includes(l.id) ? "locked" : "")
                        }
                      >
                        <div className="badge-emblem">
                          <Award size={42} />
                        </div>
                        <span className="eyebrow">
                          {completed.includes(l.id)
                            ? "DEMO BADGE · EARNED"
                            : "COMPLETE LESSON TO UNLOCK"}
                        </span>
                        <h3>{l.title}</h3>
                        <p>
                          {completed.includes(l.id)
                            ? "Completed in this demo workspace"
                            : "Your next milestone is within reach."}
                        </p>
                        <button
                          className="text-link"
                          onClick={() => setLesson(l)}
                        >
                          {completed.includes(l.id)
                            ? "Revisit lesson"
                            : "Explore lesson"}{" "}
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">
                    NORTHLINE AUTOMATION · FICTIONAL COMPANY
                  </span>
                  <h1>
                    {page === "candidates"
                      ? "Find your next technical storyteller."
                      : page === "assessments"
                        ? "Assess the skills that connect."
                        : "Build your next sales engineering team."}
                  </h1>
                  <p>
                    Discover emerging engineers. See how they approach real
                    customer challenges.
                  </p>
                </div>
                <span className="outline-chip">Company demo</span>
              </div>
              {page === "dashboard" && (
                <>
                  <section className="company-hero">
                    <div>
                      <span className="hero-kicker">
                        TECHNICAL TALENT. CUSTOMER POTENTIAL.
                      </span>
                      <h2>
                        Look beyond the resume.
                        <br />
                        See their thinking in action.
                      </h2>
                      <p>
                        Send practical assessments built for sales engineering.
                      </p>
                      <button
                        className="white-button"
                        onClick={() => navigate("candidates")}
                      >
                        Explore candidates <ArrowRight size={17} />
                      </button>
                    </div>
                    <div className="company-art">
                      <Users size={86} strokeWidth={1} />
                      <span>
                        <CheckCircle2 size={19} /> Potential meets opportunity
                      </span>
                    </div>
                  </section>
                  <div className="stats-grid company-stats">
                    <Stat
                      icon={Users}
                      label="Sample candidates"
                      value="03"
                      detail="fictional engineering students"
                      color="blue"
                    />
                    <Stat
                      icon={Send}
                      label="Assessments sent"
                      value={String(invitations.length).padStart(2, "0")}
                      detail="local demo invitations"
                      color="green"
                    />
                    <Stat
                      icon={FileText}
                      label="Assessment library"
                      value="03"
                      detail="role-relevant scenarios"
                      color="purple"
                    />
                  </div>
                </>
              )}
              {page !== "assessments" && (
                <>
                  <div className="section-heading">
                    <div>
                      <h2>Meet the next generation of sales engineers</h2>
                      <p>Fictional profiles. Realistic potential.</p>
                    </div>
                  </div>
                  <div className="candidate-grid">
                    {candidates.map((c) => (
                      <button
                        className="panel candidate-card"
                        key={c.id}
                        onClick={() => {
                          setCandidate(c);
                          setAssessment(assessments[0]);
                        }}
                      >
                        <div className={"avatar candidate-avatar " + c.color}>
                          {c.initials}
                        </div>
                        <h3>{c.name}</h3>
                        <p>{c.school}</p>
                        <span className="industry-chip">{c.interest}</span>
                        <div className="chips">
                          {c.skills.map((s) => (
                            <span key={s}>{s}</span>
                          ))}
                        </div>
                        <div className="candidate-footer">
                          View candidate <ArrowUpRight size={17} />
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {(page === "assessments" || page === "dashboard") && (
                <>
                  <div className="section-heading">
                    <div>
                      <h2>
                        {page === "assessments"
                          ? "Assessment library"
                          : "Recent invitations"}
                      </h2>
                      <p>
                        {page === "assessments"
                          ? "Evaluate discovery, technical judgment, and customer communication."
                          : "All invitations stay inside this demo workspace."}
                      </p>
                    </div>
                  </div>
                  {page === "assessments" && (
                    <div className="assessment-grid">
                      {assessments.map((a, i) => (
                        <section className="panel assessment-card" key={a}>
                          <IconBox
                            name={["factory", "monitor", "shield"][i]}
                            color={["green", "blue", "purple"][i]}
                          />
                          <h3>{a}</h3>
                          <p>{scenarios[i].goal}</p>
                          <span className="time">
                            <Clock size={14} />
                            {scenarios[i].time} · Simulated assessment
                          </span>
                          <button
                            className="secondary"
                            onClick={() => {
                              setCandidate(candidates[0]);
                              setAssessment(a);
                            }}
                          >
                            Choose candidate <ArrowRight size={16} />
                          </button>
                        </section>
                      ))}
                    </div>
                  )}
                  <section className="panel invitation-list">
                    {invitations.length ? (
                      invitations.map((i) => (
                        <div className="history-row" key={i.id}>
                          <span className="icon-box green">
                            <Send size={18} />
                          </span>
                          <div>
                            <strong>{i.title}</strong>
                            <small>{i.name} · Demo invitation</small>
                          </div>
                          <span className="status-pill">{i.status}</span>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <Send />
                        <h3>Your first invitation starts a connection.</h3>
                        <p>
                          Open a sample candidate and send a sales engineering
                          assessment.
                        </p>
                        <button
                          className="text-link"
                          onClick={() => navigate("candidates")}
                        >
                          Explore candidates <ArrowRight size={16} />
                        </button>
                      </div>
                    )}
                  </section>
                </>
              )}
              <div className="notice inline">
                <Users size={20} />
                All companies and candidates are fictional. To see an invitation
                on the Student dashboard, send one to Alex Morgan.
              </div>
            </>
          )}
          <footer>
            <span>
              <span className="footer-brand">bridge SE</span> Engineering
              expertise. Human connection.
            </span>
            <span>Prototype · Fictional data · Local interactions</span>
          </footer>
        </main>
      </div>
      {candidate && (
        <div className="modal-backdrop" onClick={() => setCandidate(null)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="candidate-name"
            className="modal panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close"
              aria-label="Close candidate"
              onClick={() => setCandidate(null)}
            >
              <X />
            </button>
            <span className="eyebrow">FICTIONAL CANDIDATE PROFILE</span>
            <div className={"avatar candidate-avatar " + candidate.color}>
              {candidate.initials}
            </div>
            <h2 id="candidate-name">{candidate.name}</h2>
            <p>{candidate.school}</p>
            <span className="industry-chip">{candidate.interest}</span>
            <h3>Sales engineering interests</h3>
            <p className="muted">
              Exploring technical discovery, customer solution design, and
              customer-facing engineering roles.
            </p>
            <div className="chips">
              {candidate.skills.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <hr />
            <h3>Send a practical assessment</h3>
            <label className="select-label">
              Choose a sales engineering assessment
              <select
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
              >
                {assessments.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </label>
            <div className="notice">
              Demo only. No email is sent.{" "}
              {candidate.id === 1
                ? "The invitation will appear on Alex’s Student dashboard."
                : "The invitation will appear in Company → Assessments. The Student demo belongs to Alex Morgan."}
            </div>
            <button className="primary full" onClick={sendAssessment}>
              Send assessment <Send size={17} />
            </button>
          </section>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={20} />
          {toast}
          <button
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
function Stat({ icon: Icon, label, value, detail, color }) {
  return (
    <section className="stat">
      <div className="stat-top">
        <span>{label}</span>
        <Icon className={color} size={19} />
      </div>
      <div className="stat-value">{value}</div>
      <small>{detail}</small>
    </section>
  );
}
function CustomerPanel({ scenario, inCall = false }) {
  return (
    <div className="customer-panel">
      <div className="call-tag">
        <span className="live-dot" />
        {inCall ? "SIMULATED SESSION" : "YOUR VIRTUAL CUSTOMER"}
      </div>
      <div className="factory-backdrop">
        <span />
        <span />
        <span />
        <div className="factory-window" />
      </div>
      <div className="person">
        <div className="person-hair" />
        <div className="person-head">
          <span />
          <i />
        </div>
        <div className="person-neck" />
        <div className="person-body">
          <div />
        </div>
      </div>
      <div className="customer-info">
        <span className="outline-chip">CSS avatar · Demo</span>
        <h2>{scenario.role}</h2>
        <p>{scenario.job}</p>
        <div className="call-controls">
          <span title="Microphone is not connected">
            <MicOff size={18} />
          </span>
          <span title="Camera is not connected">
            <VideoOff size={18} />
          </span>
          <span title="No audio playback">
            <Volume2 size={18} />
          </span>
        </div>
        <small>No audio or video is being captured.</small>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
