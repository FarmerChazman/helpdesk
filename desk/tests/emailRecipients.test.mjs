import assert from "node:assert/strict";
import test from "node:test";
import { syncDefaultRecipients } from "../src/utils/emailRecipients.js";

test("fills a recipient loaded after the composer mounts", () => {
  assert.deepEqual(
    syncDefaultRecipients([], [], ["customer@example.invalid"]),
    ["customer@example.invalid"]
  );
});

test("follows a changed default while recipients are untouched", () => {
  assert.deepEqual(
    syncDefaultRecipients(
      ["old@example.invalid"],
      ["old@example.invalid"],
      ["new@example.invalid"]
    ),
    ["new@example.invalid"]
  );
});

test("preserves recipients edited by the agent", () => {
  const edited = ["chosen@example.invalid"];
  assert.equal(
    syncDefaultRecipients(edited, [], ["customer@example.invalid"]),
    edited
  );
});

test("preserves an explicitly cleared recipient", () => {
  const cleared = [];
  assert.equal(
    syncDefaultRecipients(
      cleared,
      ["old@example.invalid"],
      ["new@example.invalid"]
    ),
    cleared
  );
});

test("copies defaults instead of sharing the parent's array", () => {
  const defaults = ["customer@example.invalid"];
  const recipients = syncDefaultRecipients([], [], defaults);
  recipients.push("cc@example.invalid");
  assert.deepEqual(defaults, ["customer@example.invalid"]);
});

test("clears a removed default only while untouched", () => {
  assert.deepEqual(
    syncDefaultRecipients(["old@example.invalid"], ["old@example.invalid"], []),
    []
  );
});

test("preserves the draft list when the defaults are unchanged", () => {
  const edited = ["chosen@example.invalid"];
  assert.equal(syncDefaultRecipients(edited, [], []), edited);
});
