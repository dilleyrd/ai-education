/**
 * Shared module factory for the industry and engineering tracks.
 *
 * Every applied module follows the same original four-course progression:
 *   1. The Current Landscape      — where the field is today
 *   2. Emerging Operating Models  — how AI reshapes the way the work is done
 *   3. Mapping Opportunities      — task-based and problem-first methods
 *   4. Implementation & Tooling   — tools, deployment, hands-on lab
 *   +  Final assessment
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
        title: `${name}: The Current Landscape`,
        summary: state.summary,
        lessons: state.lessons,
        examples: state.examples || [],
      },
      {
        title: `${name}: Emerging Operating Models`,
        summary: future.summary,
        lessons: future.lessons,
        examples: future.examples || [],
      },
      {
        title: `${name}: Mapping Opportunities`,
        summary: advantage.summary,
        lessons: advantage.lessons,
        examples: advantage.examples || [],
      },
      {
        title: `${name}: Implementation & Tooling`,
        summary: applied.summary,
        lessons: applied.lessons,
        examples: applied.examples || [],
      },
    ],
    deliverables,
    exam: 'Comprehensive final assessment across all four courses; completion certificate awarded on passing. Generate AI knowledge checks in each course as practice.',
  };
}

module.exports = { makeModule };
