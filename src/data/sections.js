// One source of truth for navigation, the editor tabs, the file tree and the
// minimap. `density` roughly reflects how much content a section holds, so the
// minimap's proportions match the real page.

export const sections = [
  {
    id: "top",
    label: "intro",
    file: "README.md",
    dir: "",
    lang: "Markdown",
    color: "#64748b",
    density: 10,
  },
  {
    id: "do",
    label: "what i do",
    file: "responsibilities.md",
    dir: "src/career/",
    lang: "Markdown",
    color: "#60a5fa",
    density: 12,
  },
  {
    id: "work",
    label: "work",
    file: "experience.java",
    dir: "src/career/",
    lang: "Java",
    color: "#fbbf24",
    density: 30,
  },
  {
    id: "projects",
    label: "projects",
    file: "salarylens.java",
    dir: "src/career/projects/",
    lang: "Java",
    color: "#fbbf24",
    density: 24,
  },
  {
    id: "skills",
    label: "skills",
    file: "skills.yaml",
    dir: "src/career/",
    lang: "YAML",
    color: "#4ade80",
    density: 26,
  },
  {
    id: "learning",
    label: "learning",
    file: "insurance-copilot.py",
    dir: "src/now_building/",
    lang: "Python",
    color: "#22d3ee",
    density: 16,
  },
  {
    id: "contact",
    label: "contact",
    file: "contact.json",
    dir: "src/career/",
    lang: "JSON",
    color: "#a78bfa",
    density: 8,
  },
];

/** Folder structure for the file-tree panel. */
export const fileTree = [
  {
    type: "dir",
    name: "src",
    children: [
      {
        type: "dir",
        name: "career",
        children: [
          { type: "file", id: "do" },
          { type: "file", id: "work" },
          {
            type: "dir",
            name: "projects",
            children: [{ type: "file", id: "projects" }],
          },
          { type: "file", id: "skills" },
          { type: "file", id: "contact" },
        ],
      },
      {
        type: "dir",
        name: "now_building",
        children: [{ type: "file", id: "learning" }],
      },
    ],
  },
  { type: "file", id: "top" },
];
