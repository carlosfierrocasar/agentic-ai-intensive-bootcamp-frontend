import { useEffect, useState, type KeyboardEvent } from "react";
import "./index.css";
import { TRAINING_CATALOG } from "./trainingCatalog";
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
              7-Week Accelerated Training · 6–8 hrs/day
            </p>
          </div>
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
  options: Array<{ value: number; label: string }>;
  selectedValue?: number;
  onSelect: (value: number) => void;
};

function Question({ label, name, options, selectedValue, onSelect }: QuestionProps) {
  return (
    <div className="question-block">
      <p className="question-label">{label}</p>
      <div className="question-options">
        {options.map((opt) => (
          <label key={opt.value} className="radio-option">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selectedValue === opt.value}
              onChange={() => onSelect(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}


function PlacementTab() {
  const placementTest = [
    {
      id: 1,
      question: "How comfortable are you with Python programming?",
      options: [
        { value: 0, label: "No experience" },
        { value: 1, label: "Basic (variables, loops)" },
        { value: 2, label: "Intermediate (functions, modules)" },
        { value: 3, label: "Advanced (classes, async)" }
      ],
      weight: 2
    },
    {
      id: 2,
      question: "How familiar are you with SQL and databases?",
      options: [
        { value: 0, label: "No experience" },
        { value: 1, label: "Basic queries (SELECT, WHERE)" },
        { value: 2, label: "Joins, aggregations, indexes" },
        { value: 3, label: "Advanced (optimization, complex queries)" }
      ],
      weight: 2
    },
    {
      id: 3,
      question: "How much experience do you have with API integration?",
      options: [
        { value: 0, label: "No experience" },
        { value: 1, label: "Used APIs as a consumer" },
        { value: 2, label: "Built simple APIs" },
        { value: 3, label: "Designed and maintained production APIs" }
      ],
      weight: 2
    },
    {
      id: 4,
      question: "How comfortable are you with web development (frontend/backend)?",
      options: [
        { value: 0, label: "No experience" },
        { value: 1, label: "Basic HTML/CSS" },
        { value: 2, label: "Built simple web apps" },
        { value: 3, label: "Built full-stack applications" }
      ],
      weight: 2
    },
    {
      id: 5,
      question: "Have you worked with AI/LLM concepts before?",
      options: [
        { value: 0, label: "No" },
        { value: 1, label: "Heard of LLMs, basic understanding" },
        { value: 2, label: "Used ChatGPT/Claude regularly" },
        { value: 3, label: "Built LLM apps (RAG, agents, etc.)" }
      ],
      weight: 3
    },
    {
      id: 6,
      question: "How much time can you realistically dedicate per week?",
      options: [
        { value: 0, label: "1-2 hours" },
        { value: 1, label: "3-5 hours" },
        { value: 2, label: "6-10 hours" },
        { value: 3, label: "10+ hours" }
      ],
      weight: 3
    }
  ] as const;

  const [placementAnswers, setPlacementAnswers] = useState<Record<number, number>>({});
  const [placementResult, setPlacementResult] = useState<{
    startWeek: number;
    recommendation: string;
    percentage: number;
  } | null>(null);

  const calculatePlacement = () => {
    let totalScore = 0;
    let maxScore = 0;

    placementTest.forEach((q) => {
      const answer = placementAnswers[q.id] ?? 0;
      totalScore += answer * q.weight;
      maxScore += 3 * q.weight;
    });

    const percentage = Math.round((totalScore / maxScore) * 100);
    let startWeek = 1;
    let recommendation = "";

    if (percentage >= 75) {
      startWeek = 5;
      recommendation =
        "You have strong fundamentals! Start with Week 5 (Advanced Agentic Workflows).";
    } else if (percentage >= 55) {
      startWeek = 4;
      recommendation =
        "You have good foundations. Start with Week 4 (Vector Databases & Advanced Retrieval).";
    } else if (percentage >= 35) {
      startWeek = 3;
      recommendation =
        "You have some experience. Start with Week 3 (Embeddings & Basic RAG).";
    } else if (percentage >= 20) {
      startWeek = 2;
      recommendation =
        "You are getting started. Start with Week 2 (Data Connectors & Chunking).";
    } else {
      startWeek = 1;
      recommendation =
        "Start from Week 1 to build your foundations: Intro to Agents + Core Tools.";
    }

    setPlacementResult({ startWeek, recommendation, percentage });
  };

  return (
    <div className="grid gap-lg">
      <section className="card card--soft">
        <h2 className="card-title">Placement Assessment</h2>
        <p className="muted">
          Answer the questions below, then calculate your recommended starting week.
        </p>

        <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
          {placementTest.map((q) => (
            <Question
              key={q.id}
              label={q.question}
              name={`placement-q-${q.id}`}
              options={[...q.options]}
              selectedValue={placementAnswers[q.id]}
              onSelect={(value) =>
                setPlacementAnswers((prev) => ({ ...prev, [q.id]: value }))
              }
            />
          ))}

          <div className="row gap-md">
            <button type="button" className="btn" onClick={calculatePlacement}>
              Calculate My Starting Week
            </button>
          </div>
        </form>
      </section>

      {placementResult && (
        <section className="card">
          <h3 className="card-title">Your Results</h3>
          <div style={{ marginTop: 8 }}>
            <div className="muted" style={{ fontSize: 13, marginBottom: 6 }}>
              Proficiency Score
            </div>

            <div
              style={{
                width: "100%",
                height: 10,
                backgroundColor: "#e5e7eb",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${placementResult.percentage}%`,
                  height: "100%",
                  backgroundColor: "#1f2937",
                  borderRadius: 999,
                  transition: "width 0.35s ease",
                }}
              />
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 12,
                textAlign: "right",
                color: "#111",
                fontWeight: 600,
              }}
            >
              {placementResult.percentage}%
            </div>
          </div>
<p>
            Recommended starting week: <strong>Week {placementResult.startWeek}</strong>
          </p>
          <p className="muted">{placementResult.recommendation}</p>
        </section>
      )}
    </div>
  );
}



/* =========================================================
   SCHEDULE TAB (funcional)
   ========================================================= */

type ScheduleModule = {
  title: string;
  duration: string;
  resourceKey?: keyof typeof TRAINING_CATALOG;
type: string;
};

type ScheduleDay = {
  day: string;
  modules: ScheduleModule[];
};

type ScheduleAssessment = {
  passingScore: number;
  topics: string[];
};

type ScheduleWeek = {
  week: number;
  title: string;
  dailyHours: number;
  days: ScheduleDay[];
  assessment: ScheduleAssessment;
};

const bootcampSchedule = {
    engineer: [
      {
        week: 1,
        title: 'Foundations: Python & LLM Basics',
        dailyHours: 6,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Python Essential Training', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_PYTHON_ESSENTIAL_TRAINING_18764650", type: 'video' },
              { title: 'Introduction to Large Language Models', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_INTRODUCTION_TO_LARGE_LANGUAGE_MODELS", type: 'video' },
              { title: 'Learning Python', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_LEARNING_PYTHON_25309312", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Asynchronous Python: Boost Performance and Efficiency for Real-World Apps', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_ASYNCHRONOUS_PYTHON_BOOST_PERFORMANCE_AND_EFFICIENCY_F", type: 'video' },
              { title: 'Python: Working with REST and Web Data', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_PYTHON_WORKING_WITH_REST_AND_WEB_DATA", type: 'video' },
              { title: 'Lab: Building Your First API Client', duration: '2h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'AI Fundamentals for Data Professionals', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_AI_FUNDAMENTALS_FOR_DATA_PROFESSIONALS", type: 'video' },
              { title: 'Generative AI: Working with Large Language Models', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_GENERATIVE_AI_WORKING_WITH_LARGE_LANGUAGE_MODELS", type: 'video' },
              { title: 'Lab: Token Counting & Cost Estimation', duration: '2h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Introduction to Prompt Engineering', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_INTRODUCTION_TO_PROMPT_ENGINEERING_FOR_GENERATIVE_AI_2", type: 'video' },
              { title: 'Data Modeling and Model Evaluation', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_MODELING_AND_MODEL_EVALUATION_METRICS", type: 'video' },
              { title: 'Lab: Testing Different LLM Models', duration: '2h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 1 Project: Build a Simple LLM Application', duration: '4h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 1 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 70,
          topics: ['Python basics', 'LLM fundamentals', 'API usage', 'Basic prompting']
        }
      },
      {
        week: 2,
        title: 'LLM APIs & Advanced Prompting',
        dailyHours: 7,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'OpenAI API Deep Dive', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_OPENAI_API_INTRODUCTION", type: 'video' },
              { title: 'OpenAI API: Introduction', duration: '2h', resourceKey: "DOCS_ANTHROPIC_COM_EN_DOCS", type: 'video' },
              { title: 'Lab: API Authentication & Basic Calls', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Advanced Prompt Patterns', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_PROMPT_ENGINEERING_HOW_TO_TALK_TO_THE_AIS", type: 'video' },
              { title: 'Chain-of-Thought Prompting', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_ADVANCED_PROMPT_ENGINEERING_TECHNIQUES", type: 'video' },
              { title: 'Advanced Prompt Engineering Techniques', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'Few-Shot Learning Techniques', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_FEW_SHOT_TECHNIQUES", type: 'video' },
              { title: 'Multi-Step Prompt Structuring', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_ADVANCED_PROMPT_ENGINEERING_TECHNIQUES", type: 'video' },
              { title: 'Lab: Multi-Turn Conversations', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Function Calling & Tool Use', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_OPENAI_API_INTRODUCTION", type: 'video' },
              { title: 'Streaming Responses', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_STREAMING_RESPONSES", type: 'docs' },
              { title: 'Lab: Building Tools for LLMs', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 2 Project: Prompt Engineering Challenge', duration: '5h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 2 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 75,
          topics: ['API integration', 'Advanced prompting', 'Function calling', 'Prompt optimization']
        }
      },
      {
        week: 3,
        title: 'AI Frameworks: LangChain & LlamaIndex',
        dailyHours: 7,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Introduction to LangChain', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_PROMPT_ENGINEERING_WITH_LANGCHAIN", type: 'video' },
              { title: 'LangChain Core Concepts', duration: '2h', resourceKey: "PYTHON_LANGCHAIN_COM_DOCS_GET_STARTED_INTRODUCTION", type: 'docs' },
              { title: 'Lab: First LangChain Application', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Chains and Sequences', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_LANGCHAIN_SEQUENCES", type: 'video' },
              { title: 'Memory Systems', duration: '2h', resourceKey: "PYTHON_LANGCHAIN_COM_DOCS_MODULES_MEMORY", type: 'docs' },
              { title: 'Lab: Building Stateful Conversations', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'LangChain Agents Architecture', duration: '2.5h', resourceKey: "WWWWW_LINKEDIN_COM_LEARNING_AGENTS_ARCHITECTURE_LANGCHAIN", type: 'docs' },
              { title: 'Tool Integration Patterns', duration: '2h', resourceKey: "PYTHON_LANGCHAIN_COM_DOCS_MODULES_AGENTS", type: 'docs' },
              { title: 'Lab: Creating Custom Tools', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Introduction to LlamaIndex', duration: '2h', resourceKey: "DOCS_LLAMAINDEX_AI_EN_STABLE", type: 'docs' },
              { title: 'Data Connectors & Loaders', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_DATA_COLLECTION_AND_LOADERS", type: 'docs' },
              { title: 'Lab: Building Data Ingestion Pipelines', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 3 Project: Multi-Agent System', duration: '5h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 3 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 75,
          topics: ['LangChain fundamentals', 'Agent architecture', 'Memory systems', 'Tool integration']
        }
      },
      {
        week: 4,
        title: 'RAG & Context Engineering',
        dailyHours: 7,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Embeddings & Vector Representations', duration: '2.5h', resourceKey: "WWW_VECTOR_EMBEDINGS", type: 'docs' },
              { title: 'Vector Databases Overview', duration: '2h', resourceKey: "WWW_VECTOR_DATABASES", type: 'docs' },
              { title: 'Lab: Creating and Storing Embeddings', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'RAG Architecture & Patterns', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_HANDS_ON_AI_INTRODUCTION_TO_RETRIEVAL_AUGMENTED_GENERA", type: 'video' },
              { title: 'Chunking Strategies', duration: '2h', resourceKey: "WLANGFLOW_CHUNKING_STRATEGIES", type: 'docs' },
              { title: 'Lab: Building Your First RAG System', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'Advanced Retrieval Strategies', duration: '2.5h', resourceKey: "LONGHAIN_ADVANCED_RETRIEVAL_ESTRATEGY", type: 'docs' },
              { title: 'Hybrid Search (Vector + Keyword)', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Optimizing Retrieval Quality', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Context Assembly & Optimization', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_PROMPT_ENGINEERING_HOW_TO_TALK_TO_THE_AIS", type: 'video' },
              { title: 'Reranking & Filtering', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Advanced RAG Optimization', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 4 Project: Production RAG System', duration: '5h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 4 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 80,
          topics: ['Embeddings', 'Vector databases', 'RAG architecture', 'Retrieval optimization']
        }
      },
      {
        week: 5,
        title: 'Agent Orchestration & Advanced Patterns',
        dailyHours: 7,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Agentic Workflow Design', duration: '2.5h', resourceKey: "LONGHAIN_AGENTIC_WORKFLOW_DESIGN", type: 'docs' },
              { title: 'Multi-Agent Architectures', duration: '2h', resourceKey: "PYTHON_LANGCHAIN_COM_DOCS_USE_CASES_MULTI_AGENT", type: 'docs' },
              { title: 'Lab: Designing Agent Workflows', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Task Decomposition & Planning', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_ARTIFICIAL_INTELLIGENCE_FOUNDATIONS_THINKING_MACHINES", type: 'video' },
              { title: 'Agent Coordination Patterns', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Building Collaborative Agents', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'State Management in Agents', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_STATE_MANAGEMENT", type: 'docs' },
              { title: 'Error Handling & Recovery', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Robust Agent Systems', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Agent Observability & Monitoring', duration: '2.5h', resourceKey: "LONGHAIN_OBSERVABILITY", type: 'docs' },
              { title: 'Performance Optimization', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Instrumenting Agents', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 5 Project: Complex Agentic System', duration: '5h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 5 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 80,
          topics: ['Workflow orchestration', 'Multi-agent systems', 'State management', 'Monitoring']
        }
      },
      {
        week: 6,
        title: 'Quality, Safety & Production Deployment',
        dailyHours: 7,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Agent Testing Strategies', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_SOFTWARE_TESTING_FOUNDATIONS_TEST_TECHNIQUES", type: 'video' },
              { title: 'Evaluation Frameworks', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Building Test Suites', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Safety Guardrails & Moderation', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_ARTIFICIAL_INTELLIGENCE_FOUNDATIONS_MACHINE_LEARNING", type: 'video' },
              { title: 'Content Filtering', duration: '2h', resourceKey: "PLATFORM_OPENAI_COM_DOCS_GUIDES_MODERATION", type: 'docs' },
              { title: 'Lab: Implementing Safety Controls', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'Deployment Patterns', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_DEVOPS_FOUNDATIONS_CONTAINERS", type: 'video' },
              { title: 'CI/CD for AI Systems', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_CI_CD", type: 'video' },
              { title: 'Lab: Containerizing Agents', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Monitoring & Alerting', duration: '2.5h', resourceKey: "WWW_LEARNING_PROMETHEUS", type: 'docs' },
              { title: 'Cost Optimization', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Production Monitoring Setup', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 6 Project: Production-Ready Agent', duration: '5h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 6 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 80,
          topics: ['Testing', 'Safety', 'Deployment', 'Monitoring', 'Cost optimization']
        }
      },
      {
        week: 7,
        title: 'Capstone Project & Certification',
        dailyHours: 8,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Capstone Project Kickoff', duration: '1h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Requirements Analysis', duration: '3h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Architecture Design', duration: '4h', resourceKey: "INTERNAL_PROJECT", type: 'project' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Implementation: Core Agent Logic', duration: '8h', resourceKey: "INTERNAL_PROJECT", type: 'project' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'Implementation: Integration & Testing', duration: '8h', resourceKey: "INTERNAL_PROJECT", type: 'project' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Deployment & Documentation', duration: '6h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Presentation Preparation', duration: '2h', resourceKey: "INTERNAL_PROJECT", type: 'project' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Final Presentations', duration: '4h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' },
              { title: 'Final Certification Exam', duration: '3h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' },
              { title: 'Graduation & Next Steps', duration: '1h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 85,
          topics: ['End-to-end agent development', 'Production deployment', 'Documentation', 'Presentation']
        }
      }
    ],
    architect: [
      {
        week: 1,
        title: 'AI Architecture Foundations',
        dailyHours: 6,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Enterprise Architecture Fundamentals', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_ENTERPRISE_ARCHITECTURE_FOUNDATIONS", type: 'video' },
              { title: 'AI System Design Principles', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_AI_ARCHITECTURE_FOUNDATIONS", type: 'video' },
              { title: 'Lab: Analyzing Existing Architectures', duration: '2h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'LLM Architecture Overview', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_INTRODUCTION_TO_LARGE_LANGUAGE_MODELS", type: 'video' },
              { title: 'Agentic System Patterns', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_GENERATIVE_AI_WORKING_WITH_LARGE_LANGUAGE_MODELS", type: 'video' },
              { title: 'Lab: Pattern Identification Exercise', duration: '2h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'Component Design & Integration', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_SOFTWARE_ARCHITECTURE_FOUNDATIONS", type: 'video' },
              { title: 'Technology Stack Selection', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_SOFTWARE_ARCHITECTURE_FOUNDATIONS", type: 'video' },
              { title: 'Lab: Technology Evaluation Matrix', duration: '2h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Requirements Analysis for AI', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_SOFTWARE_DESIGN_FROM_REQUIREMENTS_TO_RELEASE", type: 'video' },
              { title: 'Use Case Mapping', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_USER_EXPERIENCE_FOR_WEB_DESIGN", type: 'video' },
              { title: 'Lab: Requirements Documentation', duration: '2h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 1 Project: Solution Design Document', duration: '4h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 1 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 70,
          topics: ['Architecture fundamentals', 'AI system design', 'Requirements analysis', 'Documentation']
        }
      },
      {
        week: 2,
        title: 'Vector Databases & Data Architecture',
        dailyHours: 7,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Vector Database Fundamentals', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_DATABASE_FOUNDATIONS_INTRO_TO_DATABASES", type: 'video' },
              { title: 'Embeddings Architecture', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_EMBEDDINGS", type: 'video' },
              { title: 'Lab: Vector DB Comparison Analysis', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Pinecone Architecture', duration: '2h', resourceKey: "DOCS_PINECONE_IO", type: 'docs' },
              { title: 'Weaviate & Milvus Comparison', duration: '2.5h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Designing Vector DB Solutions', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'Index Optimization Strategies', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_INTRODUCTION_TO_SQLITE", type: 'video' },
              { title: 'Performance Tuning', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Performance Benchmarking', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Hybrid Search Architecture', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_SEARCH_TECHNIQUES_FOR_WEB_DEVELOPERS", type: 'video' },
              { title: 'Data Pipeline Design', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_DATA_PIPELINE_AUTOMATION_WITH_GITHUB_ACTIONS_USING_R_A", type: 'video' },
              { title: 'Lab: End-to-End Data Architecture', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 2 Project: Vector DB Architecture Design', duration: '5h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 2 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 75,
          topics: ['Vector databases', 'Index optimization', 'Performance design', 'Data pipelines']
        }
      },
      {
        week: 3,
        title: 'Cloud Infrastructure & IaC',
        dailyHours: 7,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Cloud Architecture Fundamentals', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_AWS_ESSENTIAL_TRAINING_FOR_ARCHITECTS", type: 'video' },
              { title: 'Infrastructure as Code Principles', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_LEARNING_INFRASTRUCTURE_AS_CODE", type: 'video' },
              { title: 'Lab: Cloud Architecture Diagrams', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Terraform Fundamentals', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_LEARNING_TERRAFORM_15575129", type: 'video' },
              { title: 'CloudFormation Basics', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_AMAZON_WEB_SERVICES_CLOUDFORMATION", type: 'video' },
              { title: 'Lab: IaC for AI Workloads', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'AI Infrastructure Patterns', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_MLOPS_ESSENTIALS", type: 'video' },
              { title: 'Compute & Storage for LLMs', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_AWS_ESSENTIAL_TRAINING_FOR_ARCHITECTS", type: 'video' },
              { title: 'Lab: Designing AI Infrastructure', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Auto-scaling & Load Balancing', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_AMAZON_WEB_SERVICES_HIGH_AVAILABILITY", type: 'video' },
              { title: 'Deployment Automation', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_DEVOPS_FOUNDATIONS_CONTINUOUS_DELIVERY_CONTINUOUS_INTE", type: 'video' },
              { title: 'Lab: Scalable Architecture Design', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 3 Project: Complete Infrastructure Design', duration: '5h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 3 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 75,
          topics: ['Cloud architecture', 'Terraform/CloudFormation', 'AI infrastructure', 'Scalability']
        }
      },
      {
        week: 4,
        title: 'Integration Patterns & APIs',
        dailyHours: 7,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'API Architecture & Design', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_API_DEVELOPMENT", type: 'video' },
              { title: 'Microservices for AI', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_MICROSERVICES_FOUNDATIONS", type: 'video' },
              { title: 'Lab: API Design Exercise', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Event-Driven Architectures', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_SOFTWARE_ARCHITECTURE_PATTERNS_FOR_DEVELOPERS", type: 'video' },
              { title: 'Message Queues & Streams', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_LEARNING_APACHE_KAFKA", type: 'video' },
              { title: 'Lab: Event-Driven AI Systems', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'Enterprise Integration Patterns', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_SOFTWARE_ARCHITECTURE_PATTERNS_FOR_DEVELOPERS", type: 'video' },
              { title: 'Legacy System Integration', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_ENTERPRISE_ARCHITECTURE_FOUNDATIONS", type: 'video' },
              { title: 'Lab: Integration Strategy Design', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Security Architecture', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_CYBERSECURITY_ARCHITECTURE", type: 'video' },
              { title: 'Authentication & Authorization', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_PROGRAMMING_FOUNDATIONS_APIS_AND_WEB_SERVICES", type: 'video' },
              { title: 'Lab: Secure AI System Design', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 4 Project: Enterprise Integration Architecture', duration: '5h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 4 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 80,
          topics: ['API design', 'Integration patterns', 'Event-driven architecture', 'Security']
        }
      },
      {
        week: 5,
        title: 'Cost Optimization & Risk Management',
        dailyHours: 7,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'AI Cost Modeling', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_CLOUD_ARCHITECTURE_COST_OPTIMIZATION", type: 'video' },
              { title: 'Token Economics', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Cost Estimation Models', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Infrastructure Cost Optimization', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_AWS_COST_OPTIMIZATION", type: 'video' },
              { title: 'Caching Strategies', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_SOFTWARE_ARCHITECTURE_PATTERNS_FOR_DEVELOPERS", type: 'video' },
              { title: 'Lab: Cost Optimization Strategy', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'Risk Assessment Frameworks', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_ENTERPRISE_RISK_MANAGEMENT", type: 'video' },
              { title: 'AI-Specific Risks', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Risk Matrix Development', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Ethical AI & Governance', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_ARTIFICIAL_INTELLIGENCE_ETHICS", type: 'video' },
              { title: 'Compliance & Regulations', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_DATA_PRIVACY_AND_SECURITY", type: 'video' },
              { title: 'Lab: Governance Framework Design', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 5 Project: Cost & Risk Analysis', duration: '5h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 5 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 80,
          topics: ['Cost modeling', 'Optimization strategies', 'Risk management', 'Ethics & governance']
        }
      },
      {
        week: 6,
        title: 'Stakeholder Management & Documentation',
        dailyHours: 7,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Technical Communication', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_COMMUNICATING_ABOUT_ARCHITECTURE", type: 'video' },
              { title: 'Stakeholder Analysis', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_PROJECT_MANAGEMENT_PROJECT_STAKEHOLDERS", type: 'video' },
              { title: 'Lab: Stakeholder Mapping', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Architecture Documentation', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_TECHNICAL_DOCUMENTING_GITHUB", type: 'video' },
              { title: 'Diagramming Best Practices', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_LEARNING_UML", type: 'video' },
              { title: 'Lab: Documentation Creation', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'ROI & Business Case Development', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_BUILDING_A_BUSINESS_CASE", type: 'video' },
              { title: 'Value Proposition Design', duration: '2h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_BUSINESS_ANALYSIS_FOUNDATIONS", type: 'video' },
              { title: 'Lab: Business Case Workshop', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Vendor Evaluation & Selection', duration: '2.5h', resourceKey: "WWW_LINKEDIN_COM_LEARNING_VENDOR_MANAGEMENT_FOUNDATIONS", type: 'video' },
              { title: 'Technology Radar', duration: '2h', resourceKey: "INTERNAL_DOCS", type: 'docs' },
              { title: 'Lab: Technology Selection Matrix', duration: '2.5h', resourceKey: "INTERNAL_LAB", type: 'lab' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Week 6 Project: Complete Solution Proposal', duration: '5h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Week 6 Assessment', duration: '2h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 80,
          topics: ['Communication', 'Documentation', 'Business cases', 'Vendor management']
        }
      },
      {
        week: 7,
        title: 'Capstone Architecture Project',
        dailyHours: 8,
        days: [
          {
            day: 'Monday',
            modules: [
              { title: 'Capstone Project Kickoff', duration: '1h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Requirements Gathering & Analysis', duration: '7h', resourceKey: "INTERNAL_PROJECT", type: 'project' }
            ]
          },
          {
            day: 'Tuesday',
            modules: [
              { title: 'Solution Architecture Design', duration: '8h', resourceKey: "INTERNAL_PROJECT", type: 'project' }
            ]
          },
          {
            day: 'Wednesday',
            modules: [
              { title: 'Technical Documentation & Diagrams', duration: '8h', resourceKey: "INTERNAL_PROJECT", type: 'project' }
            ]
          },
          {
            day: 'Thursday',
            modules: [
              { title: 'Business Case & ROI Analysis', duration: '4h', resourceKey: "INTERNAL_PROJECT", type: 'project' },
              { title: 'Risk Assessment & Mitigation Plan', duration: '4h', resourceKey: "INTERNAL_PROJECT", type: 'project' }
            ]
          },
          {
            day: 'Friday',
            modules: [
              { title: 'Final Architecture Presentations', duration: '4h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' },
              { title: 'Final Certification Exam', duration: '3h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' },
              { title: 'Graduation & Next Steps', duration: '1h', resourceKey: "INTERNAL_ASSESSMENT", type: 'assessment' }
            ]
          }
        ],
        assessment: {
          passingScore: 85,
          topics: ['Complete solution architecture', 'Documentation', 'Business case', 'Presentation']
        }
      }
    ]
  }

type TrackKey = "engineer" | "architect";

function ScheduleTab() {
  const [track, setTrack] = useState<TrackKey>("engineer");
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const weeksForTrack: ScheduleWeek[] = (bootcampSchedule as any)[track] || [];

  const toggleWeek = (weekNum: number) => {
    setExpandedWeek((prev) => (prev === weekNum ? null : weekNum));
  };

  const handleKeyToggle = (e: KeyboardEvent, weekNum: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleWeek(weekNum);
    }
  };

  const trackLabel =
    track === "engineer"
      ? "Agentic AI Engineer Track"
      : "AI Agentic Solution Architect Track";

  return (
    <div className="grid gap-lg">
      <section className="card card--soft">
        <div className="schedule-header">
          <div>
            <h2 className="card-title">Training Schedule</h2>
            <p className="card-subtitle">
              Weeks are designed as building blocks; each one assumes the previous
              has been completed or validated through the placement test.
            </p>
          </div>

          <select
            className="select"
            value={trackLabel}
            onChange={(e) => {
              const val = e.target.value;
              const next: TrackKey =
                val === "AI Agentic Solution Architect Track" ? "architect" : "engineer";
              setTrack(next);
              setExpandedWeek(null);
            }}
          >
            <option>Agentic AI Engineer Track</option>
            <option>AI Agentic Solution Architect Track</option>
          </select>
        </div>

        <ol className="week-list">
          {weeksForTrack.map((w) => {
            const isOpen = expandedWeek === w.week;
            const meta = `${w.dailyHours} hours/day · Assessment on Friday`;

            return (
              <li
                key={w.week}
                className="week-item"
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => toggleWeek(w.week)}
                onKeyDown={(e) => handleKeyToggle(e, w.week)}
                style={{ cursor: "pointer", flexWrap: "wrap" }}
              >
                <div className="week-number">{w.week}</div>
                <div>
                  <div className="week-title">{w.title}</div>
                  <div className="week-meta">{meta}</div>
                </div>
                <div className="week-pill">Assessment on Friday</div>

                {isOpen && (
                  <div
                    className="week-detail"
                    style={{ flexBasis: "100%", marginTop: "1rem" }}
                  >
                    {w.days.map((d) => (
                      <div key={d.day} style={{ marginTop: "0.75rem" }}>
                        <div className="section-heading">{d.day}</div>

                        <div style={{ display: "grid", gap: "0.75rem" }}>
                          {d.modules.map((m, idx) => (
                            <div
                              key={`${d.day}-${idx}`}
                              className="card"
                              style={{
                                padding: "0.55rem 0.75rem",
                                borderRadius: "12px",
                                background: "rgba(255,255,255,0.65)",
                                border: "1px solid rgba(15, 23, 42, 0.08)",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.85rem",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                  style={{
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  title={((m.resourceKey ? TRAINING_CATALOG[m.resourceKey] : undefined)?.title ?? m.title)}
                                >
                                  {((m.resourceKey ? TRAINING_CATALOG[m.resourceKey] : undefined)?.title ?? m.title)}
                                </div>

                                <div
                                  className="muted"
                                  style={{
                                    marginTop: "0.1rem",
                                    fontSize: "0.85rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <span>Duration: {m.duration}</span>

                                  {(() => {
                                  const href = m.resourceKey ? TRAINING_CATALOG[m.resourceKey]?.url : "";
                                  const isInternal = [
                                    "internal-docs",
                                    "internal-lab",
                                    "internal-project",
                                    "internal-assessment",
                                  ].includes(href);
                                  if (!href || isInternal) return null;
                                  return (
                                    <a href={href} target="_blank" rel="noreferrer">
                                      Access Course →
                                    </a>
                                  );
                                })()}
                                </div>
                              </div>

                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "0.2rem 0.55rem",
                                  borderRadius: "999px",
                                  fontSize: "0.75rem",
                                  border: "1px solid rgba(15, 23, 42, 0.12)",
                                  background: "rgba(15, 23, 42, 0.03)",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {m.type}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div style={{ marginTop: "1rem", width: "100%", flexBasis: "100%", gridColumn: "1 / -1" }} onClick={(e) => e.stopPropagation()}>
                      <div className="section-heading">Week {w.week} Assessment</div>

                      <div
                        className="muted"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.9rem",
                          alignItems: "baseline",
                          marginTop: "0.25rem",
                        }}
                      >
                        <div>
                          <b>Passing Score:</b> {w.assessment.passingScore}%
                        </div>
                        <div>
                          <b>Topics Covered:</b> {w.assessment.topics.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
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
              Hands-on exercises in a safe, sandboxed environment with sample data.
            </p>
          </div>
          <div className="resource-card">
            <h3 className="section-heading">Instructor Support</h3>
            <p className="muted">
              Daily office hours and async Q&amp;A for blockers and design reviews.
            </p>
          </div>
          <div className="resource-card">
            <h3 className="section-heading">Peer Learning</h3>
            <p className="muted">Cohort collaboration via dedicated Slack / Teams spaces.</p>
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

function UserIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProgressTab() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [form, setForm] = useState<NewLearnerForm>(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [expandedById, setExpandedById] = useState<Record<number, boolean>>({});

  function toggleExpanded(learnerId: number) {
    setExpandedById((prev) => ({ ...prev, [learnerId]: !prev[learnerId] }));
  }


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

    const tempId = -Date.now();
    setExpandedById((prev) => ({ ...prev, [tempId]: true }));
    const tempLearner: Learner = {
      id: tempId,
      name: form.name.trim(),
      source_role: form.source_role,
      target_role: form.target_role,
      start_week: Number(form.start_week),
      // opcional: algunos backends pueden omitir estos; los dejamos seguros
      overall_progress_pct: 0,
      overall_modules_total: 0,
      overall_modules_completed: 0,
      progress: [],
    };

    try {
      setIsAdding(true);

      // Optimistic UI: aparece de inmediato en la lista
      setLearners((prev) => [...prev, tempLearner]);

      const created = await createLearner({
        name: tempLearner.name,
        source_role: tempLearner.source_role,
        target_role: tempLearner.target_role,
        start_week: tempLearner.start_week,
      });

      // Reemplaza el temporal por el real
      setLearners((prev) => prev.map((l) => (l.id === tempId ? created : l)));
      setExpandedById((prev) => {
        const next = { ...prev };
        delete next[tempId];
        next[created.id] = true;
        return next;
      });
      setForm(DEFAULT_FORM);
    } catch (err) {
      console.error(err);
      // Quita el temporal si falló
      setLearners((prev) => prev.filter((l) => l.id !== tempId));
      setExpandedById((prev) => {
        const next = { ...prev };
        delete next[tempId];
        return next;
      });
      alert(`Error creating learner: ${String(err)}`);
    } finally {
      setIsAdding(false);
    }
  }

  async function handleDelete(learnerId: number) {
    if (!confirm("Delete this learner and all its progress?")) return;
    try {
      await deleteLearner(learnerId);
      setLearners((prev) => prev.filter((l) => l.id !== learnerId));
      setExpandedById((prev) => {
        const next = { ...prev };
        delete next[learnerId];
        return next;
      });
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
    <div className="grid gap-lg progress-page">
      <section className="card card--soft card--narrow">
        <h2 className="card-title">Add New Learner</h2>

        <form className="add-learner-form" onSubmit={(e) => e.preventDefault()}>
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
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "+ Add Learner"}
          </button>
        </form>
      </section>

      <section className="card card--soft card--narrow">
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
            const isExpanded = expandedById[learner.id] ?? false;

            return (
              <article className="learner-card learner-card--compact" key={learner.id}>
                <header className="learner-row">
                  <div className="learner-row-main">
                    <div className="avatar-circle" aria-hidden="true">
                      <UserIcon size={18} />
                    </div>
                    <div className="learner-row-text">
                      <span className="learner-row-name">{learner.name}</span>
                      <span className="learner-row-sep">•</span>
                      <span className="learner-row-roles">
                        {learner.source_role} → {learner.target_role}
                      </span>
                      <span className="learner-row-sep">•</span>
                      <span className="learner-row-start">
                        Start W{learner.start_week}
                      </span>
                    </div>
                  </div>

                  <div className="learner-row-right">
                    <div className="learner-row-metrics">
                      <span className="learner-row-overall">{overall}%</span>
                      <span className="learner-row-modules">
                        {completedModules}/{totalModules} modules
                      </span>
                    </div>

                    <div className="learner-row-actions">
                      <button
                        type="button"
                        className="btn-primary btn-sm"
                        onClick={() => toggleExpanded(learner.id)}
                      >
                        {isExpanded ? "Collapse details" : "Expand details"}
                      </button>

                      <button
                        type="button"
                        className="btn btn--primary btn-sm"
                        onClick={() => handleDelete(learner.id)}
                      >
                        Delete learner
                      </button>
                    </div>
                  </div>
                </header>

                {isExpanded && (
                  <div className="learner-details">
                    <div className="progress-bar-row">
                      <div className="progress-bar-track">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${overall}%` }}
                        />
                      </div>
                      <div className="progress-bar-label">{overall}% Complete</div>
                    </div>

                    <div className="week-rows">
                      {learner.progress.map((week) => {
                        const status = getWeekStatus(learner, week);
                        const statusClass =
                          status === "Completed"
                            ? "week-row--completed"
                            : status === "Skipped"
                              ? "week-row--skipped"
                              : status === "In progress"
                                ? "week-row--inprogress"
                                : "week-row--notstarted";

                        return (
                          <div key={week.week} className={`week-row ${statusClass}`}>
                            <div className="week-cell week-cell--week">
                              Week {week.week}
                            </div>

                            <div className="week-cell week-cell--modules">
                              <span className="week-cell-label">Modules</span>
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
                                className="week-input week-input--compact"
                              />
                              <span className="week-cell-suffix">/ {week.total_modules}</span>
                            </div>

                            <div className="week-cell week-cell--assessment">
                              <span className="week-cell-label">Assessment</span>
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
                                className="week-input week-input--compact"
                              />
                              <span className="week-cell-suffix">%</span>
                            </div>

                            <div className="week-cell week-cell--status">
                              <span className="week-status-pill">{status}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );

}

export default App;