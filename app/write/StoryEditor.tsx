"use client";

import { useState, useMemo, useActionState } from "react";
import { marked } from "marked";
import { publishStory, type PublishStoryState } from "./actions";
import { CATEGORIES } from "@/lib/story-types";
import { predictCategory } from "@/lib/categorizer";

type StoryEditorProps = {
  profileDisplayName: string;
};

export default function StoryEditor({ profileDisplayName }: StoryEditorProps) {
  const [state, formAction, isPending] = useActionState<PublishStoryState, FormData>(
    publishStory,
    {}
  );

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [selectedCategory, setSelectedCategory] = useState<string>("auto");
  const [authorType, setAuthorType] = useState<"profile" | "pen_name" | "anonymous">("profile");
  const [penName, setPenName] = useState("");

  // Real-time category prediction based on content
  const prediction = useMemo(() => {
    if (!title && !body) return null;
    return predictCategory(title, body);
  }, [title, body]);

  // Live preview HTML parsed from markdown
  const previewHtml = useMemo(() => {
    if (!body) return "";
    return marked.parse(body, { async: false }) as string;
  }, [body]);

  // Quick insertion helpers for Markdown
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("story-body-input") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = body.substring(start, end) || "text";
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newBody = body.substring(0, start) + replacement + body.substring(end);
    setBody(newBody);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50/90 p-5 text-sm text-rose-800 shadow-sm">
          {state.error}
        </div>
      )}

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="sr-only">
          Story Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of your story..."
          className="w-full border-b border-line bg-transparent pb-3 font-serif text-3xl font-semibold text-foreground placeholder:text-muted/40 focus:border-accent focus:outline-none sm:text-5xl"
        />
      </div>

      {/* Subtitle / Excerpt (Optional) */}
      <div>
        <label htmlFor="excerpt" className="block text-xs font-medium tracking-widest text-muted uppercase">
          Short premise or subtitle <span className="font-normal text-muted/60">(optional)</span>
        </label>
        <input
          id="excerpt"
          name="excerpt"
          type="text"
          maxLength={300}
          placeholder="A one-sentence glimpse into your journey..."
          className="mt-1.5 w-full rounded-2xl border border-line bg-card/60 px-4 py-3 text-sm text-foreground transition placeholder:text-muted/50 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/15"
        />
      </div>

      {/* Auto-Categorization & Theme Picker */}
      <div className="rounded-3xl border border-line bg-card/60 p-5 shadow-xs backdrop-blur sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Story Shade & Theme
            </h3>
            <p className="text-xs text-muted">
              Our detector suggests the best shade as you write, or you can pick one yourself.
            </p>
          </div>

          {prediction && selectedCategory === "auto" && (
            <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-petal/80 px-3.5 py-1 text-xs text-accent-deep shadow-xs">
              <span>✨ Detected Shade:</span>
              <strong className="font-semibold">{prediction.category}</strong>
              <span className="text-[10px] text-muted">({prediction.confidence})</span>
            </div>
          )}
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          <input type="hidden" name="category" value={selectedCategory} />
          <button
            type="button"
            onClick={() => setSelectedCategory("auto")}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              selectedCategory === "auto"
                ? "bg-accent text-white shadow-xs"
                : "border border-line bg-white/70 text-muted hover:border-accent/40"
            }`}
          >
            Auto Detect {prediction ? `(${prediction.category})` : ""}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                selectedCategory === cat
                  ? "bg-accent text-white shadow-xs"
                  : "border border-line bg-white/70 text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="rounded-3xl border border-line bg-card/80 shadow-sm backdrop-blur">
        {/* Editor Toolbar & Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("write")}
              className={`rounded-full px-4 py-1.5 font-medium transition ${
                activeTab === "write"
                  ? "bg-accent text-white"
                  : "text-muted hover:bg-petal hover:text-foreground"
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`rounded-full px-4 py-1.5 font-medium transition ${
                activeTab === "preview"
                  ? "bg-accent text-white"
                  : "text-muted hover:bg-petal hover:text-foreground"
              }`}
            >
              Preview
            </button>
          </div>

          {activeTab === "write" && (
            <div className="flex flex-wrap items-center gap-1 text-xs text-muted">
              <button
                type="button"
                onClick={() => insertFormatting("## ", "")}
                title="Heading"
                className="rounded-lg px-2.5 py-1 font-serif font-bold transition hover:bg-petal hover:text-accent-deep"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("**", "**")}
                title="Bold"
                className="rounded-lg px-2.5 py-1 font-bold transition hover:bg-petal hover:text-accent-deep"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("*", "*")}
                title="Italic"
                className="rounded-lg px-2.5 py-1 italic transition hover:bg-petal hover:text-accent-deep"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("> ", "")}
                title="Quote"
                className="rounded-lg px-2.5 py-1 font-serif italic transition hover:bg-petal hover:text-accent-deep"
              >
                &ldquo;Quote&rdquo;
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Writing area */}
        {activeTab === "write" ? (
          <div className="p-5 sm:p-8">
            <textarea
              id="story-body-input"
              name="body"
              required
              rows={16}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell your story here. Speak with your whole voice — every detail, every emotion, every lesson learned in the quiet seasons..."
              className="w-full resize-y bg-transparent text-base leading-relaxed text-foreground placeholder:text-muted/50 focus:outline-none sm:text-lg sm:leading-loose"
            />
            <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs text-muted">
              <span>Markdown supported</span>
              <span>{body.trim().split(/\s+/).filter(Boolean).length} words</span>
            </div>
          </div>
        ) : (
          /* Tab 2: Live Preview */
          <div className="p-6 sm:p-10">
            {previewHtml ? (
              <div
                className="story-body drop-cap prose max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            ) : (
              <p className="py-12 text-center font-serif text-lg text-muted italic">
                Nothing to preview yet. Switch to &ldquo;Write&rdquo; to start your draft.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Author Identity & Privacy Controls */}
      <div className="rounded-3xl border border-line bg-card/60 p-5 shadow-xs backdrop-blur sm:p-6">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          How would you like your name to appear?
        </h3>
        <p className="mt-0.5 text-xs text-muted">
          Your story is linked to your private account, but you control what the public sees.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {/* Option 1: Public Profile */}
          <label
            className={`flex cursor-pointer flex-col rounded-2xl border p-4 transition ${
              authorType === "profile"
                ? "border-accent bg-petal/50 shadow-xs"
                : "border-line bg-white/70 hover:border-accent/40"
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="authorType"
                value="profile"
                checked={authorType === "profile"}
                onChange={() => setAuthorType("profile")}
                className="accent-accent"
              />
              <span className="font-medium text-foreground text-sm">Public Profile</span>
            </div>
            <span className="mt-1 text-xs text-muted">
              Published under <strong>{profileDisplayName}</strong>
            </span>
          </label>

          {/* Option 2: Custom Pen Name */}
          <label
            className={`flex cursor-pointer flex-col rounded-2xl border p-4 transition ${
              authorType === "pen_name"
                ? "border-accent bg-petal/50 shadow-xs"
                : "border-line bg-white/70 hover:border-accent/40"
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="authorType"
                value="pen_name"
                checked={authorType === "pen_name"}
                onChange={() => setAuthorType("pen_name")}
                className="accent-accent"
              />
              <span className="font-medium text-foreground text-sm">Custom Pen Name</span>
            </div>
            <span className="mt-1 text-xs text-muted">A pseudonym of your choice</span>
          </label>

          {/* Option 3: Anonymous */}
          <label
            className={`flex cursor-pointer flex-col rounded-2xl border p-4 transition ${
              authorType === "anonymous"
                ? "border-accent bg-petal/50 shadow-xs"
                : "border-line bg-white/70 hover:border-accent/40"
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="authorType"
                value="anonymous"
                checked={authorType === "anonymous"}
                onChange={() => setAuthorType("anonymous")}
                className="accent-accent"
              />
              <span className="font-medium text-foreground text-sm">Anonymous</span>
            </div>
            <span className="mt-1 text-xs text-muted">Displays as &ldquo;Anonymous&rdquo;</span>
          </label>
        </div>

        {authorType === "pen_name" && (
          <div className="mt-4">
            <label htmlFor="penName" className="block text-xs font-medium tracking-wider text-muted uppercase">
              Enter your pen name
            </label>
            <input
              id="penName"
              name="penName"
              type="text"
              required
              value={penName}
              onChange={(e) => setPenName(e.target.value)}
              placeholder="e.g. A Woman from Kyoto"
              className="mt-1.5 max-w-sm rounded-2xl border border-line bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/15"
            />
          </div>
        )}
      </div>

      {/* Submission Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <p className="text-xs text-muted">
          Stories can be edited or removed from your profile at any time.
        </p>

        <button
          type="submit"
          disabled={isPending || !title || !body}
          className="rounded-full bg-accent px-8 py-3.5 font-medium tracking-wide text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:bg-accent-deep disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Publishing your shade..." : "Publish story"}
        </button>
      </div>
    </form>
  );
}
