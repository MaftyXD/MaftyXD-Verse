# OpenCode Autonomous Development Template

This template provides a structured workflow for autonomous software development with OpenCode.

It combines:

- Product Requirements
- Persistent Project Context
- Level 3 Autonomous Development
- Safety Gate
- Skill-based specialized development
- Task Tracking
- Decision Tracking
- Automated validation and error recovery

The goal is to allow OpenCode to work independently on normal development tasks while still requiring user input for sensitive, irreversible, or materially ambiguous actions.

## 1. Project Structure

```text
project/
│
├── AGENTS.md
├── PRD.md
├── PROJECT.md
├── TASKS.md
├── DECISIONS.md
├── AUTONOMOUS_PROMPT.md
│
└── .opencode/
    └── skills/
        ├── ui-ux/
        │   └── SKILL.md
        ├── frontend/
        │   └── SKILL.md
        ├── backend/
        │   └── SKILL.md
        ├── database/
        │   └── SKILL.md
        ├── security/
        │   └── SKILL.md
        ├── performance/
        │   └── SKILL.md
        ├── debugging/
        │   └── SKILL.md
        └── testing/
            └── SKILL.md
```

Not every project needs every skill.

Only install or include skills that are relevant to the project.

## 2. Purpose of Each File

### `AGENTS.md`

Defines how the autonomous agent should behave.

It contains:

- autonomous development rules
- Level 3 autonomy
- Safety Gate
- decision-making rules
- Skill Usage
- error recovery
- code quality rules
- security rules
- performance rules
- UI / UX rules
- dependency rules
- scope control
- validation requirements
- communication rules

This is the primary behavioral instruction file for the project.

### `PRD.md`

Defines the product requirements.

It describes:

- product idea
- problem
- goals
- target users
- roles
- features
- user flows
- business rules
- data requirements
- product scope
- UI / UX requirements
- testing requirements
- deployment requirements

`PRD.md` is especially recommended for medium and large projects.

### `PROJECT.md`

Defines the current project and implementation context.

It contains:

- project identity
- platform
- technology stack
- technical constraints
- repository structure
- architecture
- development commands
- environment information
- database context
- authentication context
- security context
- performance context
- testing context
- deployment context
- current implementation status
- project conventions

Do not turn `PROJECT.md` into a second PRD.

### `TASKS.md`

Tracks implementation progress.

It contains:

- current phase
- current objective
- in-progress work
- completed work
- remaining work
- discovered issues
- blockers
- next priority

### `DECISIONS.md`

Stores important decisions made during development.

It prevents the agent from repeatedly reconsidering decisions that have already been made.

It can record decisions related to:

- architecture
- database
- security
- UI / UX
- performance
- dependencies
- product behavior
- technology choices
- important changes made while using specialized skills

### `AUTONOMOUS_PROMPT.md`

Contains the master prompt used to start or resume autonomous development.

It instructs the agent to:

- read project context
- inspect the repository
- determine current project state
- select relevant skills
- implement changes
- run validation
- fix errors
- update project tracking
- continue until the objective is completed

## 3. Recommended Workflow

The recommended workflow is:

```text
IDEA
↓
PRD.md
↓
PROJECT.md
↓
AGENTS.md
↓
TASKS.md + DECISIONS.md
↓
AUTONOMOUS_PROMPT.md
↓
OpenCode
↓
ANALYZE
↓
SELECT RELEVANT SKILLS
↓
PLAN
↓
IMPLEMENT
↓
RUN
↓
INSPECT
↓
FIX
↓
VALIDATE
↓
DOCUMENT
↓
CONTINUE
↓
DONE
```

## 4. Creating a New Project

### Step 1 — Create the Project

Create the project directory and initialize the desired technology stack.

Examples:

```bash
npm create vite@latest
```

or:

```bash
npx create-next-app
```

or:

```bash
flutter create .
```

Use the appropriate command for the selected stack.

### Step 2 — Add the Autonomous Files

Copy these files into the project root:

```text
AGENTS.md
PRD.md
PROJECT.md
TASKS.md
DECISIONS.md
AUTONOMOUS_PROMPT.md
```

For a small project, `PRD.md` may be optional.

### Step 3 — Fill `PRD.md`

For medium or large projects, describe:

- what you want to build
- why it exists
- who uses it
- required features
- user flows
- business rules
- project scope
- important constraints

You do not need to know every technical detail.

The PRD should focus primarily on product requirements rather than low-level implementation.

### Step 4 — Fill `PROJECT.md`

Record:

- platform
- technology stack
- important constraints
- development commands
- environment information
- known architecture
- current implementation state
- important technical conventions

Technical details that are unknown can be left for the autonomous agent to decide when safe.

### Step 5 — Initialize `TASKS.md`

Add the first meaningful development tasks.

Example:

```text
## Current Phase

Setup

## Current Objective

Prepare the initial application architecture.

## In Progress

- [ ] Project initialization

## Remaining

- [ ] Authentication
- [ ] Database
- [ ] Core UI
```

### Step 6 — Initialize `DECISIONS.md`

Record only decisions that are already known.

Example:

```text
### 001 — Technology Stack

Decision:
Use Next.js + TypeScript + Supabase.

Reason:
The application requires server rendering, authentication, database access, and realtime features.
```

The agent can add additional decisions later.

## 5. Starting OpenCode

Open OpenCode inside the project directory.

The project should contain the autonomous context files before starting the main development workflow.

The recommended startup instruction is:

```text
Read AGENTS.md, PRD.md, PROJECT.md, TASKS.md, and DECISIONS.md if present.

Then follow AUTONOMOUS_PROMPT.md.

Work in Level 3 autonomous mode.

Select and use relevant skills automatically.

Do not ask unnecessary questions.

Start implementing the project and continue until the current objectives are completed and appropriately validated.
```

## 6. Persistent Project Context

The persistent context is distributed across several files.

```text
PRD.md
→ What product should exist?

PROJECT.md
→ What is the current project context?

TASKS.md
→ What has been completed and what should happen next?

DECISIONS.md
→ What important decisions have already been made?

AGENTS.md
→ How should the autonomous agent behave?

AUTONOMOUS_PROMPT.md
→ How should the agent start or resume autonomous execution?
```

This allows a new OpenCode session to resume work without requiring the user to explain the entire project again.

## 7. Level 3 Autonomous Development

Level 3 means the agent should normally be able to:

- inspect the repository
- inspect project files
- create files
- edit files
- refactor code
- install required dependencies
- run development commands
- run tests
- run linting
- run type checks
- run builds
- inspect errors
- fix errors
- continue to the next task
- update `TASKS.md`
- update `DECISIONS.md`

The user should not need to manually instruct the agent to perform each ordinary development step.

## 8. Autonomous Execution Loop

The normal execution loop is:

```text
ANALYZE
↓
SELECT RELEVANT SKILLS
↓
PLAN
↓
IMPLEMENT
↓
RUN
↓
INSPECT
↓
FIX
↓
VALIDATE
↓
DOCUMENT
↓
CONTINUE
```

If an error occurs:

```text
ERROR
↓
INSPECT
↓
IDENTIFY ROOT CAUSE
↓
LOAD DEBUGGING / SPECIALIZED SKILL
↓
FIX
↓
RUN AGAIN
↓
VALIDATE
```

The agent should repeat this process without asking the user when the problem can reasonably be solved autonomously.

## 9. Safety Gate

Level 3 autonomy does not mean unrestricted autonomy.

The agent must stop and ask for user input when the action genuinely requires human authorization or cannot be safely inferred.

Examples include:

- permanent destruction of important data
- missing production credentials
- unavailable API keys or secrets
- real financial transactions
- production deployment
- changes to a live production environment
- major product requirement changes
- materially ambiguous business rules
- unavailable external systems

Normal development work should not trigger the Safety Gate.

## 10. Skill System

Skills provide specialized expertise for specific tasks.

### Recommended Core Skills

```text
ui-ux
frontend
backend
database
security
performance
debugging
testing
```

### Recommended Additional Skills

```text
architecture
code-review
refactoring
git
documentation
accessibility
devops
```

Use only the skills that are relevant to the project.

## 11. Skill Selection

The agent should automatically determine whether a specialized skill is relevant.

Examples:

```text
UI design
→ UI/UX skill

Frontend implementation
→ Frontend skill

Backend/API implementation
→ Backend skill

Database design
→ Database skill

Authentication/security
→ Security skill

Performance investigation
→ Performance skill

Bug or error
→ Debugging skill

Testing
→ Testing skill

Architecture decisions
→ Architecture skill

Code cleanup/review
→ Code-review / Refactoring skill
```

When a task spans multiple domains, multiple skills may be used.

For example:

```text
Database performance issue
↓
Database skill
+
Performance skill
+
Debugging skill when necessary
```

## 12. Skill Locations

Project-specific skills should be placed in:

```text
.opencode/skills/<skill-id>/SKILL.md
```

Reusable skills can be placed in the global OpenCode skills directory when supported by the installed OpenCode version:

```text
~/.config/opencode/skills/<skill-id>/SKILL.md
```

The exact skill names available to the agent depend on the installed skills.

`AGENTS.md` should describe the type of expertise to select rather than assuming that every project contains every skill.

## 13. UI / UX Skill

A UI / UX skill should help the agent with:

- visual hierarchy
- spacing
- typography
- layout
- responsive design
- component consistency
- usability
- accessibility
- loading states
- empty states
- error states
- forms
- navigation
- dashboards
- visual polish

The goal is not merely to make an interface look attractive.

The goal is to make it usable, clear, consistent, responsive, and appropriate for the product.

## 14. Performance Skill

A performance skill should help the agent identify meaningful bottlenecks such as:

- unnecessary renders
- expensive calculations
- unnecessary requests
- duplicate data fetching
- inefficient database queries
- missing indexes
- excessive memory use
- large bundles
- unoptimized images
- blocking work
- unnecessary polling
- unnecessary realtime subscriptions

Performance improvements should be validated when practical.

## 15. Security Skill

A security skill should help the agent review and implement:

- authentication
- authorization
- input validation
- secret handling
- secure database access
- least privilege
- safe file handling
- secure API handling
- sensitive error handling
- dependency risks

Real production secrets must never be written into source code or documentation.

## 16. Testing Skill

A testing skill should help the agent determine appropriate tests.

Depending on the project, this may include:

```text
Unit Testing
Integration Testing
End-to-End Testing
Regression Testing
Build Validation
Manual Critical-Flow Validation
```

The agent should prioritize testing critical user flows and high-risk functionality.

## 17. Error Recovery

The autonomous agent should not stop at the first error.

Use:

```text
READ ERROR
↓
UNDERSTAND ROOT CAUSE
↓
INSPECT RELEVANT FILES
↓
SELECT RELEVANT SKILL
↓
FIX
↓
RERUN
↓
VERIFY
```

If the issue cannot reasonably be resolved without information from the user, use the Safety Gate.

## 18. Task Tracking

`TASKS.md` should represent the current project state.

Example:

```text
Current Phase:
Development

Current Objective:
Complete authentication.

In Progress:
- [ ] Login flow

Completed:
- [x] Database setup
- [x] User schema

Remaining:
- [ ] Password reset
- [ ] Role authorization
```

The agent should update the file after meaningful progress.

## 19. Decision Tracking

`DECISIONS.md` should record meaningful decisions.

Example:

```text
### 004 — State Management

Decision:
Use Zustand.

Reason:
The application requires lightweight client state without a large state architecture.

Impact:
Authentication and UI state will use centralized Zustand stores.

Skills Used:
frontend
architecture
```

Do not log every minor code change.

## 20. Definition of Done

The project should not be declared complete merely because the requested code exists.

Before completion, validate applicable items:

- dependencies install correctly
- application compiles
- application builds
- type checking passes
- linting passes
- tests pass
- main user flows work
- important error states are handled
- security basics are addressed
- performance concerns are reviewed
- UI / UX is consistent
- production build succeeds when relevant

For UI-heavy projects, also verify:

- major screens
- responsive behavior
- loading states
- empty states
- error states
- accessibility basics

## 21. Starting a New Session

When returning to a project later, use:

```text
Read AGENTS.md, PRD.md, PROJECT.md, TASKS.md, and DECISIONS.md if present.

Inspect the current repository state.

Determine what has already been completed.

Identify the highest-priority remaining task.

Select relevant skills automatically.

Resume development autonomously.

Continue until the remaining objective is completed and validated.
```

The user should not need to explain the project from the beginning again.

## 22. Small Projects

For a small project, the minimal recommended structure is:

```text
AGENTS.md
PROJECT.md
TASKS.md
DECISIONS.md
AUTONOMOUS_PROMPT.md
```

`PRD.md` is optional.

Examples:

- simple portfolio
- landing page
- small CRUD
- small utility application

## 23. Medium and Large Projects

For medium or large projects, use:

```text
AGENTS.md
PRD.md
PROJECT.md
TASKS.md
DECISIONS.md
AUTONOMOUS_PROMPT.md
```

plus the appropriate skills.

Examples:

- desktop application
- mobile application
- marketplace
- information system
- SaaS
- multi-role application
- backend platform

## 24. Recommended Final Structure

```text
project/
│
├── AGENTS.md
│
├── PRD.md
├── PROJECT.md
├── TASKS.md
├── DECISIONS.md
├── AUTONOMOUS_PROMPT.md
│
└── .opencode/
    └── skills/
        ├── ui-ux/
        ├── frontend/
        ├── backend/
        ├── database/
        ├── security/
        ├── performance/
        ├── debugging/
        ├── testing/
        ├── architecture/
        ├── code-review/
        ├── refactoring/
        ├── git/
        ├── documentation/
        ├── accessibility/
        └── devops/
```

Not every skill needs to exist.

Only maintain skills that provide real value for the current project.

## 25. Final System

The complete autonomous development system works like this:

```text
USER IDEA
↓
PRD.md
↓
PROJECT.md
↓
AGENTS.md
↓
TASKS.md + DECISIONS.md
↓
AUTONOMOUS_PROMPT.md
↓
OPENCODE
↓
ANALYZE
↓
SELECT SKILLS
↓
PLAN
↓
IMPLEMENT
↓
RUN
↓
INSPECT
↓
FIX
↓
VALIDATE
↓
DOCUMENT
↓
CONTINUE
↓
DONE
```

The responsibilities are:

```text
PRD.md
→ What and why the product exists

PROJECT.md
→ Current project and implementation context

AGENTS.md
→ How the autonomous agent should behave

SKILLS
→ Specialized expertise

TASKS.md
→ Current progress

DECISIONS.md
→ Important persistent decisions

AUTONOMOUS_PROMPT.md
→ Start / resume autonomous execution
```

The intended operating model is:

```text
User
→ defines the product and important constraints

OpenCode
→ plans, implements, tests, debugs, validates, documents, and continues

Safety Gate
→ protects sensitive or irreversible actions

Skills
→ provide specialized expertise when needed
```

The goal is not to remove the user from the development process completely.

The goal is to remove unnecessary interruptions while keeping the user in control of important product, security, financial, and production decisions.