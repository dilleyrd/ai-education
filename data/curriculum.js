/**
 * Curriculum index — assembles all 19 modules across three tracks.
 *
 *   core         (01-03)  Fundamentals → Piloting → Scaling
 *   industry     (04-14)  11 functional/sector modules
 *   engineering  (15-19)  5 engineering & science modules (custom additions)
 *
 * Each module is a structured object consumed by the API and frontend.
 */
const core = require('./core');
const industryA = require('./industry-a');
const industryB = require('./industry-b');
const engineering = require('./engineering');

module.exports = [...core, ...industryA, ...industryB, ...engineering];
