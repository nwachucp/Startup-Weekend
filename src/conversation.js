// UI-facing conversation adapter. A future authenticated Voice Live transport can
// implement this interface without embedding credentials or audio logic in views.
export function createDemoConversation(scenario) {
  let step = 0;
  return {
    mode: "scripted-demo",
    start: () => ({ role: "customer", text: scenario.lines[0] }),
    respond: (choice) => {
      const result = { choice, strong: choice === 0 };
      step += 1;
      return {
        ...result,
        done: step >= scenario.lines.length,
        message:
          step < scenario.lines.length
            ? { role: "customer", text: scenario.lines[step] }
            : null,
      };
    },
    stop: () => {
      step = 0;
    },
  };
}
