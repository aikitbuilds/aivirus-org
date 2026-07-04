#!/usr/bin/env bash
# pre-deploy-check.sh — safety verification gate. Run before every deploy:
#   bash scripts/pre-deploy-check.sh
# Exits non-zero if any check fails. Designed to be boring and strict.

set -u
FAIL=0
pass() { echo "  ✓ $1"; }
fail() { echo "  ✕ $1"; FAIL=1; }

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "── 1. Secrets safety ──────────────────────────────────"
if git check-ignore -q .env 2>/dev/null || [ ! -f .env ]; then
  pass ".env is gitignored (or absent)"
else
  fail ".env exists and is NOT gitignored"
fi
if git ls-files | grep -qE "^\.env$|serviceAccount.*\.json|\.firebase/"; then
  fail "secret-looking files are tracked by git"
else
  pass "no secret files tracked by git"
fi

echo "── 3. TypeScript clean compile ────────────────────────"
if npx tsc --noEmit > /tmp/predeploy-tsc.log 2>&1; then
  pass "tsc --noEmit clean"
else
  fail "tsc errors — see /tmp/predeploy-tsc.log"
fi

echo "── 4. Fabricated-stat audit ───────────────────────────"
if grep -rn "% of people share this profile" src/ 2>/dev/null | grep -v "TODO" | grep -q .; then
  fail "a hardcoded share-percentage claim is back in the UI"
else
  pass "no fabricated share-percentage claims in UI"
fi

echo "── 5. Workspace runbooks present ──────────────────────"
for f in CLAUDE.md docs/PROJECT_STATUS.md .env.example README.md; do
  if [ -f "$f" ]; then pass "$f exists"; else fail "$f missing"; fi
done

echo "── 6. Uncommitted work ────────────────────────────────"
DIRTY=$(git status --porcelain 2>/dev/null | wc -l | tr -d " ")
if [ "$DIRTY" = "0" ]; then
  pass "working tree clean"
else
  fail "$DIRTY uncommitted files — commit before deploying"
fi

echo "───────────────────────────────────────────────────────"
if [ $FAIL -eq 0 ]; then
  echo "ALL CHECKS PASSED — safe to deploy."
else
  echo "CHECKS FAILED — fix the ✕ items before deploying."
fi
exit $FAIL
