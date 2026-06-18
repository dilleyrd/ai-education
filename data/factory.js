/**
 * Shared module factory for the industry and engineering tracks.
 *
 * Every applied module follows the four-course certificate arc used by the
 * SmarterX AI Academy series:
 *   1. The State of AI for X      — where the field is today
 *   2. The Future of X            — how AI reshapes the operating model
 *   3. Find Your AI Advantage     — use-case and problem-based frameworks
 *   4. Applied AI for X           — tools, implementation, hands-on lab
 *   +  Final certification exam
 */
function makeModule({
  id,
  number,
  title,
  name, // short field name used in course titles, e.g. "Manufacturing"
  track,
  level = 'Beginner–Intermediate',
  duration = '4 hours',
  tagline,
  description,
  audience,
  outcomes,
  state,
  future,
  advantage,
  applied,
  deliverables,
}) {
  return {
    id,
    number,
    title,
    track,
    level,
    duration,
    tagline,
    description,
    audience,
    outcomes,
    courses: [
      {
        title: `The State of AI for ${name}`,
        summary: state.summary,
        lessons: state.lessons,
        examples: state.examples || [],
      },
      {
        title: `The Future of ${name}`,
        summary: future.summary,
        lessons: future.lessons,
        examples: future.examples || [],
      },
      {
        title: `Find Your AI Advantage in ${name}`,
        summary: advantage.summary,
        lessons: advantage.lessons,
        examples: advantage.examples || [],
      },
      {
        title: `Applied AI for ${name}`,
        summary: applied.summary,
        lessons: applied.lessons,
        examples: applied.examples || [],
      },
    ],
    deliverables,
    exam: 'Comprehensive final exam across all four courses; Professional Certificate awarded on passing. Generate AI knowledge checks in each course as practice.',
  };
}

module.exports = { makeModule };
