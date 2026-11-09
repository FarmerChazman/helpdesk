// Follow recipient defaults until the agent edits or clears the current list.
export function syncDefaultRecipients(current, previous, next) {
  const equal = (a, b) => JSON.stringify(a || []) === JSON.stringify(b || []);
  return !equal(previous, next) && equal(current, previous)
    ? [...(next || [])]
    : current;
}
