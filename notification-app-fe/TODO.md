# TODO - Fix Frontend Errors

## Plan summary (to be executed)

### Step 1: Fix build-stopper import
- Update `src/pages/NotificationsPage.jsx` import of `Log` to use the correct path (`../../logging_middleware/logger.js`).

### Step 2: Make logger usage safe
- Update `logging_middleware/logger.js` to be non-async (or adjust all callsites to `await`).

### Step 3: Remove/clean unused imports
- Remove unused MUI imports and `NotificationFilter` import if not used, to satisfy ESLint.

### Step 4: Fix hook dependency
- Update `useNotifications` to refetch when all relevant filters change.

### Step 5: Confirm data shape
- Normalize notification fields (ID/Type/Timestamp/Message) or adjust mapping to match backend response.

### Step 6: Run checks
- Run `npm run lint` and `npm run build` and iterate until clean.

