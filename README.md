# Jones Automation - Exercise

A simple web automation built with **Playwright** (Node.js) that fills and
submits the contact form on <https://test.netlify.app/>.

## What the automation does

The script (`automation.js`) performs the following flow:

1. Opens a browser and navigates to the website.
2. Fills in the **Name, Email, Phone, Company and Website** fields.
3. **Bonus:** changes the *Number of Employees* dropdown from `1-10` to `51-500`.
4. Takes a screenshot of the page **before** clicking the button
   (saved as `before-submit.png`).
5. Clicks the **"Request a call back"** button.
6. Writes a message to the console when the thank-you page is reached.

## Requirements

- [Node.js](https://nodejs.org/) (v18 or newer)

## How to run

```bash
# 1. Install the dependencies
npm install

# 2. Download the browser (first time only)
npx playwright install chromium

# 3. Run the automation
node automation.js
```

Expected console output:

```
Screenshot saved as before-submit.png
Reached the thank you page!
```

## Note about the browser

On the machine used for development, Playwright's bundled Chromium failed to
launch with the error *"side-by-side configuration is incorrect"* (a missing
Visual C++ Redistributable). To keep the setup simple and avoid installing extra
system components, the script launches Microsoft **Edge** instead, using the
`channel: 'msedge'` option. Since Edge is Chromium-based, the result is the same.

## Files

| File | Description |
|------|-------------|
| `automation.js` | The automation script |
| `before-submit.png` | Screenshot taken before submitting the form |
| `package.json` | Project configuration and dependencies |
| `.gitignore` | Files ignored by git (e.g. `node_modules`) |

---

## AI Usage (transparency note)

I used an AI assistant (Claude) as a **learning and guidance tool** during this
exercise. I want to be fully transparent about how:

- **I planned and structured the work myself**, dividing it into clear stages:
  setup → writing the code → testing → pushing to GitHub.
- **I ran every command myself** (npm, Playwright, git) and pushed the project
  to GitHub on my own.
- The AI **explained each concept and each line of code**, and I made sure I
  understood everything before moving on — I can explain any part of the code.
- **We debugged together:** when the browser failed to launch, I investigated
  the error with the AI's help and solved it by switching to Edge
  (`channel: 'msedge'`).
- I reviewed and understood the full solution before submitting it.

In short, the AI helped me learn faster and understand the tools, but the
thinking, the execution, and the decisions were mine.
