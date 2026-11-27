# Неотложка+ — Project Handover

## Purpose
An electronic clinical handbook and clinical decision-support reference for emergency medicine physicians in the Republic of Kazakhstan. It is designed for clinical use during emergency shifts, not as a patient-facing blog or general encyclopedia.

## Existing implementation
The original standalone application was preserved in `source-chunks/index.html.part-01` through `part-10`. The original file was too large for a single GitHub Contents API write, so it is stored as ordered text chunks. A repository workflow reassembles these chunks into `index.html`.

The source includes a standalone React application and embedded PDF resources. Preserve it before making structural changes. Audit the existing implementation before rebuilding it.

## Main priorities
1. Clinical safety and source traceability.
2. Current Kazakhstan Ministry of Health clinical protocols.
3. Fast access to critical actions and algorithms.
4. Clear, mobile-first interface.
5. Expandable architecture for adult, pediatric and neonatal emergencies.

## Main architecture
- Initial assessment/resuscitation: PAT, ABCDE, Pediatric BLS, PALS.
- Organ systems: respiratory, cardiovascular, neurological, endocrine/metabolic, gastrointestinal, renal/urinary, infectious/sepsis, allergy/anaphylaxis, toxicology, trauma/emergency surgery, hematology, neonatal and other critical conditions.

## First clinical content scope
Pediatric respiratory emergencies:
1. Severe pneumonia
2. Croup
3. Bronchiolitis
4. Epiglottitis
5. Acute asthma exacerbation
6. Foreign body aspiration
7. Central hypoventilation

## Clinical page template
Definition; etiology/pathophysiology; presentation; severity assessment; red flags; initial assessment/stabilization; investigations; differential diagnosis; treatment; hospitalization/ICU criteria; respiratory support/intubation criteria where applicable; monitoring/reassessment; discharge criteria; references.

## Clinical safety rules
- Never invent doses, concentrations, infusion rates, thresholds, oxygen targets, intubation criteria or treatment pathways.
- Prioritize current official Kazakhstan protocols. Use authoritative international guidelines as supplementary references and explicitly identify material differences.
- Every page must show its review state: Draft, Content prepared, Awaiting medical review, Under review, Verified, Approved for publication.
- Record author, reviewer, review date, approver, guideline version and references.
- Never claim medical verification or national approval without evidence.
- Clearly label incomplete content; do not make placeholder content look like clinical advice.

## Product and UI requirements
Search, favorites, history, light/dark theme, mobile navigation, age filters, clinical warning boxes, severity indicators, tables, flowcharts, medical diagrams, PDF viewing, references and visible review status. Russian/Kazakh support and offline functionality are future priorities.

## Technical direction
Original preferred stack: React, TypeScript, Tailwind CSS, Lucide, React Router, local JSON/TypeScript content and SVG diagrams. Keep components modular and make adding conditions and algorithms straightforward. Maintain Netlify compatibility.

## Development order
1. Audit source and current functionality.
2. Identify placeholders and broken navigation.
3. Verify the seven respiratory topics against Kazakhstan protocols and authoritative sources.
4. Improve search, navigation and age separation.
5. Add validated calculators and interactive algorithms only with documented clinical sources.
6. Expand organ systems and adult emergency medicine.
7. Test mobile, offline behavior and deployment.

## Original project website
https://emergencymedicinekz.netlify.app/#/

## Source specification
See `docs/MASTER_PROMPT.md`.
