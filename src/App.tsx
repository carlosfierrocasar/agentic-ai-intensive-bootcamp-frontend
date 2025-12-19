import { useEffect, useState } from "react";
import "./index.css";
import {
  getLearners,
  createLearner,
  deleteLearner,
  updateLearnerProgress,
  type Learner,
  type WeekProgress,
} from "./api";

type TabKey = "overview" | "placement" | "schedule" | "progress";

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="shell">
      <header className="shell-header">
        <div className="shell-header-left">
          <div className="shell-logo">
            {/* Logo de Concentrix en public/concentrix-logo.png */}
            <img
              src="/concentrix-logo.png"
              alt="Concentrix"
              className="shell-logo-img"
            />
          </div>
          <div>
            <h1 className="shell-title">Agentic AI Intensive Bootcamp</h1>
            <p className="shell-subtitle">
              7-Week Accelerated Training · 6–8 hrs/day · Internal Prototype
            </p>
          </div>
        </div>
        <div className="shell-header-right">
          <span className="shell-chip">Cohort demo · Carlos</span>
        </div>
      </header>

      <main className="shell-main">
        <nav className="shell-tabs">
          <TabButton
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <TabButton
            label="Placement Test"
            active={activeTab === "placement"}
            onClick={() => setActiveTab("placement")}
          />
          <TabButton
            label="Training Schedule"
            active={activeTab === "schedule"}
            onClick={() => setActiveTab("schedule")}
          />
          <TabButton
            label="Progress Tracking"
            active={activeTab === "progress"}
            onClick={() => setActiveTab("progress")}
          />
        </nav>

        <section className="shell-content">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "placement" && <PlacementTab />}
          {activeTab === "schedule" && <ScheduleTab />}
          {activeTab === "progress" && <ProgressTab />}
        </section>
      </main>
    </div>
  );
}

type TabButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      className={`tab-pill ${active ? "tab-pill--active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/* =========================================================
   OVERVIEW TAB (resumen visual, sin cambios funcionales)
   ========================================================= */

function OverviewTab() {
  return (
    <div className="grid gap-lg">
      <section className="card card--soft">
        <div className="card-header-row">
          <div>
            <h2 className="card-title">Program Overview</h2>
            <p className="card-subtitle">
              High-intensity, role-based training to move engineers into Agentic
              AI delivery in 7 weeks.
            </p>
          </div>
          <div className="pill-row">
            <span className="pill pill-soft">Full time · 6–8 hrs/day</span>
            <span className="pill pill-soft">2 Career Paths</span>
            <span className="pill pill-soft">Internal delivery focus</span>
          </div>
        </div>

        <div className="overview-grid">
          <div className="stat-card stat-card--light">
            <div className="stat-label">Total Duration</div>
            <div className="stat-value">7 Weeks</div>
            <p className="stat-note">
              Structured from foundations to capstone delivery with weekly
              assessments.
            </p>
          </div>
          <div className="stat-card stat-card--light">
            <div className="stat-label">Daily Format</div>
            <div className="stat-value">6–8 hrs/day</div>
            <p className="stat-note">
              Morning theory &amp; labs, afternoon project work and
              implementation.
            </p>
          </div>
          <div className="stat-card stat-card--light">
            <div className="stat-label">Career Paths</div>
            <div className="stat-value">Engineer / Architect</div>
            <p className="stat-note">
              Participants pick a primary track but can cross-audit key modules.
            </p>
          </div>
        </div>

        <p className="note">
          This bootcamp is designed for existing engineers who already work with
          data, software or cloud. The goal is not only to learn LLM APIs, but
          to ship agentic solutions that are secure, observable and aligned with
          business constraints.
        </p>
      </section>

      <section className="card card-split card--soft-alt">
        <div className="card-column">
          <h2 className="card-title">Agentic AI Engineer Track</h2>
          <p className="card-subtitle">
            Focused on implementation: building, wiring and shipping agents.
          </p>
          <ul className="simple-list">
            <li>Week 1 · Python &amp; LLM foundations</li>
            <li>Week 2 · LLM APIs &amp; advanced prompting patterns</li>
            <li>Week 3 · LangChain / LlamaIndex &amp; orchestration</li>
            <li>Week 4 · RAG, context engineering &amp; retrieval quality</li>
            <li>Week 5 · Multi-agent orchestration &amp; tools</li>
            <li>Week 6 · Quality, safety, evaluation &amp; guardrails</li>
            <li>Week 7 · Capstone: end-to-end agentic solution</li>
          </ul>
        </div>
        <div className="card-column">
          <h2 className="card-title">AI Agentic Solution Architect</h2>
          <p className="card-subtitle">
            Focused on architecture, governance and stakeholder alignment.
          </p>
          <ul className="simple-list">
            <li>Week 1 · AI architecture foundations &amp; patterns</li>
            <li>Week 2 · Vector DBs, data topology &amp; SLAs</li>
            <li>Week 3 · Cloud infra, observability &amp; CI/CD for LLMs</li>
            <li>Week 4 · Integration patterns &amp; API-first design</li>
            <li>Week 5 · Cost modelling, risk and compliance</li>
            <li>Week 6 · Documentation, playbooks &amp; handover</li>
            <li>Week 7 · Capstone: reference architecture &amp; review board</li>
          </ul>
        </div>
      </section>

      <section className="card card--soft-green">
        <h2 className="card-title">Assessment &amp; Certification</h2>
        <div className="assessment-grid">
          <div className="assessment-column">
            <h3 className="section-heading">Weekly Cadence</h3>
            <ul className="simple-list">
              <li>Short daily checks to validate understanding.</li>
              <li>Lab-based assignments for applied practice.</li>
              <li>Weekly Friday assessments with score thresholds.</li>
            </ul>
          </div>
          <div className="assessment-column">
            <h3 className="section-heading">Scoring Targets</h3>
            <ul className="simple-list">
              <li>Weeks 1–2 · Passing score 70–75%.</li>
              <li>Weeks 3–4 · Passing score 78–80%.</li>
              <li>Weeks 5–6 · Higher bar on applied labs (80%+).</li>
              <li>Week 7 · Final certification exam ≥ 85%.</li>
            </ul>
          </div>
          <div className="assessment-column">
            <h3 className="section-heading">Outcomes</h3>
            <ul className="simple-list">
              <li>Certified Agentic AI Engineer / Architect.</li>
              <li>Capstone artifact ready to demo to stakeholders.</li>
              <li>Internal profile flagged as “Agentic AI ready”.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   PLACEMENT TAB (solo UI)
   ========================================================= */

type QuestionProps = {
  label: string;
  name: string;
  options: string[];
};

function Question({ label, name, options }: QuestionProps) {
  return (
    <div className="question-block">
      <p className="question-label">{label}</p>
      <div className="question-options">
        {options.map((opt) => (
          <label key={opt} className="radio-option">
            <input type="radio" name={name} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function PlacementTab() {
  return (
    <div className="grid gap-lg">
      <section className="card card--soft">
        <h2 className="card-title">Placement Assessment</h2>
        <p className="muted">
          This questionnaire estimates your optimal starting week. In the final
          version this screen will be backed by an Agentic evaluation service;
          for now it is a static prototype.
        </p>

        <form className="form-grid">
          <Question
            label="How comfortable are you with Python programming?"
            name="python_level"
            options={[
              "No experience",
              "Basic (variables, loops, functions)",
              "Intermediate (OOP, error handling, packages)",
              "Advanced (async, decorators, production code)",
            ]}
          />

          <Question
            label="Have you worked with LLM APIs (OpenAI, Anthropic, etc.)?"
            name="llm_apis"
            options={[
              "Never used",
              "Familiar with concepts, no hands-on",
              "Basic API calls and simple prompts",
              "Advanced usage with complex workflows",
            ]}
          />

          <Question
            label="What is your experience with prompt engineering?"
            name="prompt"
            options={[
              "No experience",
              "Basic chat prompts",
              "Structured prompts with examples",
              "Advanced techniques (CoT, few-shot, multi-step)",
            ]}
          />

          <Question
            label="Experience with AI frameworks (LangChain, LlamaIndex)?"
            name="frameworks"
            options={[
              "Never heard of them",
              "Aware but not used",
              "Built simple applications",
              "Production-level implementations",
            ]}
          />

          <Question
            label="Knowledge of RAG (Retrieval Augmented Generation)?"
            name="rag"
            options={[
              "No knowledge",
              "Understand the concept",
              "Implemented basic RAG systems",
              "Optimized RAG with hybrid search",
            ]}
          />

          <Question
            label="Experience with vector databases?"
            name="vector_dbs"
            options={[
              "No experience",
              "Understand embeddings conceptually",
              "Used vector DBs in projects",
              "Optimized vector search performance",
            ]}
          />

          <div className="form-actions">
            <button type="button" className="btn-primary">
              Calculate My Starting Week
            </button>
            <button type="button" className="btn-secondary">
              Smart Recommendation (AI – demo only)
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

/* =========================================================
   SCHEDULE TAB (solo UI)
   ========================================================= */

const TRACKS = {
  engineer: [
    {
      week: 1,
      title: "Foundations: Python & LLM Basics",
      meta: "6 hrs/day · Fundamentals, tooling, mental models",
    },
    {
      week: 2,
      title: "LLM APIs & Advanced Prompting",
      meta: "7 hrs/day · API usage, patterns, prompt libraries",
    },
    {
      week: 3,
      title: "AI Frameworks: LangChain & LlamaIndex",
      meta: "7 hrs/day · Chains, graphs, tools, context integration",
    },
    {
      week: 4,
      title: "RAG & Context Engineering",
      meta: "7 hrs/day · Retrieval quality, evals, hybrid search",
    },
    {
      week: 5,
      title: "Agent Orchestration & Advanced Patterns",
      meta: "7 hrs/day · Multi-agent systems, workflows, tools",
    },
    {
      week: 6,
      title: "Quality, Safety & Production Deployment",
      meta: "7 hrs/day · Guardrails, monitoring, rollout",
    },
    {
      week: 7,
      title: "Capstone Project & Certification",
      meta: "8 hrs/day · Final build & exam",
    },
],
  architect: [
    {
      week: 1,
      title: "AI Architecture Foundations",
      meta: "6 hrs/day · Architecture fundamentals & agentic patterns",
    },
    {
      week: 2,
      title: "Vector Databases & Data Architecture",
      meta: "7 hrs/day · Embeddings, indexes, data pipelines",
    },
    {
      week: 3,
      title: "Cloud Infrastructure & IaC",
      meta: "7 hrs/day · Cloud design, IaC, scalability",
    },
    {
      week: 4,
      title: "Integration Patterns & APIs",
      meta: "7 hrs/day · APIs, integration, security",
    },
    {
      week: 5,
      title: "Cost Optimization & Risk Management",
      meta: "7 hrs/day · Cost modeling, caching, risk",
    },
    {
      week: 6,
      title: "Stakeholder Management & Documentation",
      meta: "7 hrs/day · Docs, diagrams, communication",
    },
    {
      week: 7,
      title: "Capstone Architecture Project",
      meta: "8 hrs/day · End-to-end architecture & presentation",
    },
],
} as const;

type TrackKey = keyof typeof TRACKS;

function ScheduleTab() {
  const [selectedRole, setSelectedRole] = useState<TrackKey>("engineer");
  const weeks = TRACKS[selectedRole];
  return (
    <div className="grid gap-lg">
      <section className="card card--soft">
        <div className="schedule-header">
          <div>
            <h2 className="card-title">Training Schedule</h2>
            <p className="card-subtitle">
              Weeks are designed as building blocks; each one assumes the
              previous has been completed or validated through the placement
              test.
            </p>
          </div>
          <select
            className="select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as TrackKey)}
          >
            <option value="engineer">Agentic AI Engineer Track</option>
            <option value="architect">AI Agentic Solution Architect Track</option>
          </select>
        </div>

        <ol className="week-list">
          {weeks.map(({ week, title, meta }) => (
            <li key={week} className="week-item">
              <div className="week-number">{week}</div>
              <div>
                <div className="week-title">{title}</div>
                <div className="week-meta">{meta}</div>
              </div>
              <div className="week-pill">Assessment on Friday</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="card card--soft-green">
        <h2 className="card-title">Resources &amp; Support</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3 className="section-heading">LinkedIn Learning</h3>
            <p className="muted">
              Curated playlists aligned with each week, accessible via corporate
              license.
            </p>
          </div>
          <div className="resource-card">
            <h3 className="section-heading">Internal Labs</h3>
            <p className="muted">
              Hands-on exercises in a safe, sandboxed environment with sample
              data.
            </p>
          </div>
          <div className="resource-card">
            <h3 className="section-heading">Instructor Support</h3>
            <p className="muted">
              Daily office hours and async Q&amp;A for blockers and design
              reviews.
            </p>
          </div>
          <div className="resource-card">
            <h3 className="section-heading">Peer Learning</h3>
            <p className="muted">
              Cohort collaboration via dedicated Slack / Teams spaces.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   PROGRESS TAB (LO IMPORTANTE)
   ========================================================= */

type NewLearnerForm = {
  name: string;
  source_role: string;
  target_role: string;
  start_week: number;
};

const DEFAULT_FORM: NewLearnerForm = {
  name: "",
  source_role: "",
  target_role: "",
  start_week: 1,
};

function ProgressTab() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [form, setForm] = useState<NewLearnerForm>(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    try {
      setLoading(true);
      const data = await getLearners();
      setLearners(data);
    } catch (err) {
      console.error(err);
      alert(`Error loading learners from backend: ${String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAddLearner() {
    if (!form.name || !form.source_role || !form.target_role) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const created = await createLearner({
        name: form.name.trim(),
        source_role: form.source_role,
        target_role: form.target_role,
        start_week: Number(form.start_week),
      });
      setLearners((prev) => [...prev, created]);
      setForm(DEFAULT_FORM);
    } catch (err) {
      console.error(err);
      alert(`Error creating learner: ${String(err)}`);
    }
  }

  async function handleDelete(learnerId: number) {
    if (!confirm("Delete this learner and all its progress?")) return;
    try {
      await deleteLearner(learnerId);
      setLearners((prev) => prev.filter((l) => l.id !== learnerId));
    } catch (err) {
      console.error(err);
      alert(`Error deleting learner: ${String(err)}`);
    }
  }

  function getWeekStatus(
    learner: Learner,
    weekProgress: WeekProgress
  ): string {
    if (weekProgress.week < learner.start_week) return "Skipped";
    if (
      weekProgress.modules_completed === 0 &&
      weekProgress.assessment_pct === 0
    )
      return "Not started";
    if (
      weekProgress.modules_completed >= weekProgress.total_modules &&
      weekProgress.assessment_pct >= 70
    )
      return "Completed";
    return "In progress";
  }

  async function handleWeekChange(
    learnerId: number,
    week: number,
    field: "modules_completed" | "assessment_pct",
    value: number
  ) {
    const learner = learners.find((l) => l.id === learnerId);
    if (!learner) return;

    const safeProgress = Array.isArray(learner.progress) ? learner.progress : [];
    const weekTotals = [5, 5, 5, 5, 5, 5, 4];
    const normalizedProgress =
      safeProgress.length > 0
        ? safeProgress
        : weekTotals.map((t, i) => ({
          week: i + 1,
          modules_completed: 0,
          total_modules: t,
          assessment_pct: 0,
        }));

    const newProgress = normalizedProgress.map((p) =>


      p.week === week
        ? {
          ...p,
          [field]:
            field === "modules_completed"
              ? Math.max(0, Math.min(value, p.total_modules))
              : Math.max(0, Math.min(value, 100)),
        }
        : p
    );

    // update local de inmediato
    setLearners((prev) =>
      prev.map((l) => (l.id === learnerId ? { ...l, progress: newProgress } : l))
    );

    // guardar en backend y refrescar datos de ese learner (incluye overall %)
    try {
      const updated = await updateLearnerProgress(learnerId, newProgress);
      setLearners((prev) =>
        prev.map((l) => (l.id === learnerId ? updated : l))
      );
    } catch (err) {
      console.error(err);
      alert(`Error saving progress: ${String(err)}`);
      // recargar desde backend para no dejar datos chuecos
      loadData();
    }
  }

  return (
    <div className="grid gap-lg">
      <section className="card card--soft">
        <h2 className="card-title">Add New Learner</h2>

        <form
          className="add-learner-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="input-line"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="input-line"
            value={form.source_role}
            onChange={(e) => setForm({ ...form, source_role: e.target.value })}
          >
            <option value="">Source Role</option>
            <option>Data Engineer</option>
            <option>Software Engineer</option>
            <option>Solution Architect</option>
          </select>

          <select
            className="input-line"
            value={form.target_role}
            onChange={(e) => setForm({ ...form, target_role: e.target.value })}
          >
            <option value="">Target Role</option>
            <option>Agentic AI Engineer</option>
            <option>AI Agentic Solution Architect</option>
          </select>

          <select
            className="input-line"
            value={form.start_week}
            onChange={(e) =>
              setForm({ ...form, start_week: Number(e.target.value) })
            }
          >
            <option value={1}>Start Week 1</option>
            <option value={2}>Start Week 2</option>
            <option value={3}>Start Week 3</option>
            <option value={4}>Start Week 4</option>
            <option value={5}>Start Week 5</option>
            <option value={6}>Start Week 6</option>
            <option value={7}>Start Week 7</option>
          </select>

          <button
            type="button"
            className="btn-primary btn-full"
            onClick={handleAddLearner}
          >
            + Add Learner
          </button>
        </form>
      </section>

      <section className="card card--soft">
        <div className="card-header-row">
          <div>
            <h2 className="card-title">Learners</h2>
            <p className="card-subtitle">
              Track progress week by week. Fields are editable and stored in
              PostgreSQL.
            </p>
          </div>
        </div>

        {loading && <p className="muted">Loading...</p>}

        {!loading && learners.length === 0 && (
          <p className="muted">No learners yet. Add one above.</p>
        )}

        <div className="learner-list">
          {learners.map((learner) => {
            const overall = Math.round(learner.overall_progress_pct || 0);
            const totalModules = learner.overall_modules_total || 34;
            const completedModules = learner.overall_modules_completed || 0;

            return (
              <article className="learner-card" key={learner.id}>
                <header className="learner-card-header">
                  <div className="learner-meta">
                    <div className="avatar-circle">
                      {/* icono simple "person" usando inicial */}
                      <span className="avatar-initial">
                        {learner.name.charAt(0).toUpperCase() || "A"}
                      </span>
                    </div>
                    <div className="learner-meta-text">
                      <div className="learner-name">{learner.name}</div>
                      <div className="learner-roles">
                        {learner.source_role} → {learner.target_role}
                      </div>
                      <div className="learner-start">
                        Starting from Week {learner.start_week}
                      </div>
                    </div>
                  </div>

                  <div className="learner-summary">
                    <div className="overall-label">Overall Progress</div>
                    <div className="overall-value">{overall}%</div>
                    <div className="overall-sub">
                      {completedModules} / {totalModules} modules
                    </div>
                    <button
                      type="button"
                      className="link-button link-button-danger"
                      onClick={() => handleDelete(learner.id)}
                    >
                      Delete learner
                    </button>
                  </div>
                </header>

                <div className="progress-bar-row">
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${overall}%` }}
                    />
                  </div>
                  <div className="progress-bar-label">
                    {overall}% Complete
                  </div>
                </div>

                <div className="week-progress-grid">
                  {learner.progress.map((week) => {
                    const status = getWeekStatus(learner, week);

                    return (
                      <div
                        key={week.week}
                        className={`week-progress-card ${status === "Completed"
                          ? "week-progress-card--completed"
                          : status === "Skipped"
                            ? "week-progress-card--skipped"
                            : ""
                          }`}
                      >
                        <div className="week-title-row">
                          <div className="week-label">Week {week.week}</div>
                        </div>

                        <div className="week-field">
                          <label className="week-field-label">
                            Modules completed
                          </label>
                          <div className="week-field-input-row">
                            <input
                              type="number"
                              min={0}
                              max={week.total_modules}
                              value={week.modules_completed}
                              onChange={(e) =>
                                handleWeekChange(
                                  learner.id,
                                  week.week,
                                  "modules_completed",
                                  Number(e.target.value || 0)
                                )
                              }
                              className="week-input"
                            />
                            <span className="week-field-suffix">
                              / {week.total_modules}
                            </span>
                          </div>
                        </div>

                        <div className="week-field">
                          <label className="week-field-label">
                            Assessment %
                          </label>
                          <div className="week-field-input-row">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={week.assessment_pct}
                              onChange={(e) =>
                                handleWeekChange(
                                  learner.id,
                                  week.week,
                                  "assessment_pct",
                                  Number(e.target.value || 0)
                                )
                              }
                              className="week-input"
                            />
                            <span className="week-field-suffix">%</span>
                          </div>
                        </div>

                        <div className="week-status">{status}</div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
