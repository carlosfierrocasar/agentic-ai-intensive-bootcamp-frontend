// src/api.ts

export interface WeekProgress {
  week: number;
  modules_completed: number;
  total_modules: number;
  assessment_pct: number;
}

export interface Learner {
  id: number;
  name: string;
  source_role: string;
  target_role: string;
  start_week: number;

  // Manual, editable start date (YYYY-MM-DD). Not "created_at".
  start_date?: string | null;

  progress: WeekProgress[];
  overall_modules_completed: number;
  overall_modules_total: number;
  overall_progress_pct: number;
}

const API_URL =
  import.meta.env.VITE_API_URL || "https://agentic-ai-backend-mfey.onrender.com";

async function handleResponse(res: Response) {
  if (!res.ok) {
    // Try to extract a useful error message (JSON or text)
    const contentType = res.headers.get("content-type") || "";
    let detail = "";
    try {
      if (contentType.includes("application/json")) {
        const data = await res.json();
        detail = JSON.stringify(data);
      } else {
        detail = await res.text();
      }
    } catch {
      // ignore parse failures
    }

    const msg = detail?.trim()
      ? detail
      : `HTTP ${res.status} ${res.statusText}`;

    throw new Error(msg);
  }

  if (res.status === 204) return null;
  return res.json();
}

export async function getLearners(): Promise<Learner[]> {
  const res = await fetch(`${API_URL}/learners`);
  return handleResponse(res);
}

export async function createLearner(payload: {
  name: string;
  source_role: string;
  target_role: string;
  start_week: number;
  start_date?: string | null; // YYYY-MM-DD
}): Promise<Learner> {
  const res = await fetch(`${API_URL}/learners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteLearner(learnerId: number): Promise<void> {
  const res = await fetch(`${API_URL}/learners/${learnerId}`, {
    method: "DELETE",
  });
  await handleResponse(res);
}

export async function updateLearnerProgress(
  learnerId: number,
  progress: WeekProgress[]
): Promise<Learner> {
  const res = await fetch(`${API_URL}/learners/${learnerId}/progress`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: progress }),
  });
  return handleResponse(res);
}

/**
 * Update learner fields (currently: start_date).
 * This enables editing start_date for existing learners.
 */
export async function updateLearner(
  learnerId: number,
  payload: { start_date?: string | null }
): Promise<Learner> {
  const res = await fetch(`${API_URL}/learners/${learnerId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}
