# Versioning

## TL;DR

This versioning is based on Conventional Commits, replacing one commit type.
It uses **patch** for any user-visible change that is significant enough to
raise a PATCH version. **patch** also replaces **fix** as the type under which
repairs are recorded.

The version number is three digits, `G.B.P`.
The shape matches Semantic Versioning. The digits mean product growth.

---

## Version number

A version is `G.B.P`.

- `G` — generation
- `B` — step
- `P` — patch

The version number is a generation.step.patch approach.

The version number tells the generation of the app, how many significant steps
there were in this generation, and how many patches were applied within this
generation step.

`G` stays `0` until a generation is declared.

### G

Increase `G` when the amount of development steps brought your app to the goal
you had in mind.
Resets `B` and `P`.

### B

Increase `B` when development has made a new feature step towards your
business-defined goal, or when the application receives a significant
user-experience update, such as an undo/redo system for an application without
user action history, an i18n system for a single-language application, offline
mode for a purely online application, etc.
Resets `P`.

### P

Increase `P` when you either fix a bug, or change a theme accent color,
add a button, swap UI elements, etc.

---

## Commit message

```
<type>(<scope>): <description>

[optional body]
```

`<type>` is required.
`<scope>` is optional. It is a noun for the area of the product.
`<description>` is a short summary in the imperative.

The type must match the change the user can see or do, not the size of the diff.
A new screen structure is not a refactor.

### Types

| Type       | Role                                             | Digit                      |
| ---------- | ------------------------------------------------ | -------------------------- |
| `feat`     | New job, or first appearance of a kind of system | B                          |
| `patch`    | A fix, or dressing of the same job and face      | P                          |
| `perf`     | Changes which impact performance                 | none                       |
| `style`    | Formatting of source only                        | none                       |
| `refactor` | Internal structure; behaviour and face unchanged | none                       |
| `docs`     | Documentation only                               | none                       |
| `test`     | Tests only                                       | none                       |
| `build`    | Build tooling                                    | none                       |
| `ci`       | Pipelines                                        | none                       |
| `chore`    | Housekeeping                                     | none                       |
| `revert`   | Reverts another commit                           | same digit as the original |

### Release commit

The version in the product is written in a separate commit after the unit is finished:

```
chore(release): G.B.P
```

Do not write a new version on every file save.
Do not increase `B` twice for implementing a step and integrating that step.

An unfinished step may keep the last shipped version, optionally with a `-dev` suffix.

---

## Changelog

On `chore(release):` record the unit under Generation, Step, or Patch.
Omit types that do not change the product a person can see, unless they explain a visible side effect.
