# Brain Bloom: a beginner CI/CD project 🌸

A playable static brain-training game:

1. **CI:** On pull requests and pushes, validate `index.html`, game modes, timers, and local browser storage with Node's built-in test runner.
2. **CD:** After tests pass on `main`, publish the exact tested website to GitHub Pages.
3. **Post-deploy verification:** `version.txt` records the published commit SHA. A verification job waits for the public site to serve that SHA and confirms the timer code is in the published HTML.

## Files

```text
brain-bloom/
├── index.html                 # Actual playable game, with timers
├── tests/
│   └── game.test.mjs          # No-dependency automated smoke tests
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # CI -> CD -> verification
└── README.md
```

## Install into your EXISTING Brain Bloom repository

1. **Extract** this ZIP on your PC. Do not upload the ZIP itself as a single file.
2. Copy `index.html`, `tests/game.test.mjs`, and `.github/workflows/ci-cd.yml` to the matching locations in your **existing** GitHub repository. Preserve the `.github/workflows/` folders. You can do this with git on your PC, github.dev, or GitHub's web interface when it supports the paths.
3. In the repository, open **Settings → Pages → Build and deployment → Source** and change the source to **GitHub Actions** (not "Deploy from a branch"). Save.
4. Open **Actions**. If GitHub asks you to enable workflows, do so. Push changes to `main` or use **Run workflow** in the Actions tab.
5. Check the three jobs: **CI - verify Brain Bloom**, **CD - publish GitHub Pages**, and **Verify that the new version is live**.
6. Open **Settings → Pages** and click **Visit site**. Inside Berry Quick Math you should see the countdown timer.

**Note:** `index.html` in this ZIP includes the timer version. If you have edited your own game beyond the last shared version, keep your current code and upload just the workflow and tests; the tests assume the existing Brain Bloom timer functions are still present.

## Test locally (optional)

Install Node.js 22 or later and run this at the repository root:

```bash
node --test tests/*.test.mjs
```

No npm dependencies, server, database, paid hosting, or API keys are required.

## A tiny CI experiment

1. In a branch, change `const TIME_LIMITS` to `const CLOCK_LIMITS` without updating the rest of the game.
2. Push and open a pull request. The timer smoke test should fail; the PR will not trigger a deployment.
3. Fix the name, push again, and check the green workflow.
4. Merge the PR to `main`; GitHub publishes and checks the public page.

## What to add next

- **Browser tests:** Playwright tests that click `Berry Quick Math`, wait for the timer, and assert it counts down; unlike these basic smoke tests, they test real user interaction.
- **Accessibility / quality:** keyboard support, Lighthouse checks, optional linting.
- **ML feature:** adapt difficulty based on answer accuracy, response time, and streak; start with rule-based logic as a baseline.
- **MLOps:** consented or simulated gameplay data, scikit-learn training, MLflow experiment tracking, versioned model artifacts, evaluation gates, manual retraining and monitoring.

Keep player progress private by default. Browser `localStorage` does not send gameplay data to a server.

## Troubleshooting

- **Workflow passes but website seems old:** Open the `verify` job. If it passed, check with Ctrl+Shift+R in your browser.
- **Workflow does not deploy:** Confirm **Settings → Pages → Source = GitHub Actions** and that you pushed to `main`, not only a feature branch.
- **CI fails:** Check the test job logs; fix or update the related game code before publishing.
- **Verify fails but deploy passes:** The site may still be propagating or Pages could have the wrong URL; check Settings → Pages and the emitted version marker.

This initial pipeline uses text-level smoke tests, not full browser integration tests. It catches missing timer configuration and a stale published commit, but it does not prove every timer interaction works.
