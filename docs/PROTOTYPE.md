# Bridge SE prototype

Bridge SE (Sales Engineering) is a frontend-only React + Vite prototype. It uses bundled fonts, Lucide icons, and original CSS/SVG illustrations. No credentials or external application services are needed.

## Run locally

Requires Node.js 20.19+ or 22.12+ (built with Node 24).

```sh
cd /workspace/Startup-Weekend
npm ci
npm run dev
```

On a normal local checkout, use its directory instead of the cloud path above. If the default npm cache is not writable in the cloud, use `npm ci --cache /tmp/bridge-npm-cache`.

`npm run build` creates `dist/`; `npm run preview` serves that build locally. There is no deployment step. The production build was checked; no test suite was run.

## Suggested walkthrough

1. Start in Student → Overview. Open a learning card, read the sample lesson, and mark it complete. Progress and demo badges update across the workspace.
2. Visit My profile. Edit the headline and career interests. Resume selection sets only a boolean in memory: the app does not read file contents, retain the filename, upload, parse, or persist a document.
3. Open Practice, select a scenario, read the brief, and start the simulated conversation. Choose three responses to see illustrative feedback and a practice history entry.
4. Switch to Company. Open Alex Morgan, choose an assessment, and click Send assessment.
5. Switch to Student → Overview. Open the new invitation and complete its scripted scenario. Switch to Company → Assessments to see its updated status.

All candidates and companies are fictional. Jordan and Sam invitations appear in the company list; the single Student persona is Alex. All app state lives in React memory and resets on page refresh. The first fundamentals lesson is pre-completed as sample data. Video areas are placeholders; avatars are CSS illustrations. Conversations and feedback are deterministic, with no AI, camera, microphone, recording, speech recognition, or computer vision connected. Demo badges are not accredited or employer-recognized certifications. There is no authentication, database, email delivery, payment flow, or company integration.

## Organization

- `src/main.jsx`: navigation, views, and shared local demo state
- `src/data.js`: fictional lessons, scenarios, candidates, and assessment choices
- `src/conversation.js`: scripted conversation adapter with `start`, `respond`, and `stop` methods
- `src/styles.css`: responsive visual system and illustrations

## Separate next phase: one live avatar scenario

Reference reviewed: Microsoft's [Voice Live API Sales Coach](https://github.com/Azure-Samples/voicelive-api-salescoach) README, specifically scenario selection → conversation → feedback. No sample application code was copied and Azure was not configured.

A separate integration task would need:

1. A supported Azure Voice Live resource, avatar availability in the chosen region, model capacity, and an explicitly approved Azure budget. Confirm current SDK/API and browser support at implementation time.
2. A small authenticated backend that holds service credentials securely, authorizes sessions, manages short-lived session access, and keeps secrets out of the browser. Choose an appropriate supported identity mechanism; no keys belong in source code.
3. One tightly scoped plant-manager scenario: a system prompt, technical facts, customer constraints, conversation boundaries, and a feedback rubric focused on discovery and engineering judgment.
4. A live adapter alongside `createDemoConversation`, extending the contract for async connection state, transcript events, audio input/output, avatar media, interruptions, cancellation, cleanup, and errors. Keep scenario content independent from transport.
5. Browser microphone permission, WebRTC/avatar rendering as supported by the selected Azure API, mute/end controls, connection and reconnection states, and a visible demo fallback. Add clear consent and retention behavior before capturing real audio.
6. Evaluate technical accuracy, latency, turn-taking, technical objections, and permission/error paths with the one scenario before expanding. Live evaluation scores should be clearly distinguished from the current scripted feedback.

This phase would require a new explicit decision to connect paid Azure services; the current prototype makes no Azure calls.
