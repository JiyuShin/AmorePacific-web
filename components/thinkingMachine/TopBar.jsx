"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { normalizeReasoningStage } from "@/lib/thinkingMachine/nodeMeta";

const TOPBAR_SIDE_SLOT_WIDTH = 382;
const TOPBAR_TEXT_STYLE = {
  fontFamily: '"Instrument Sans", sans-serif',
  lineHeight: "100%",
  letterSpacing: "-0.352px",
};
const TOPBAR_META_TEXT_STYLE = {
  fontFamily: '"Instrument Sans", sans-serif',
  lineHeight: "130%",
  letterSpacing: "-0.176px",
};
const TOPBAR_CENTER_TEXT_STYLE = {
  fontFamily: '"Instrument Sans", sans-serif',
  lineHeight: "110%",
  letterSpacing: "-0.32px",
};
function parseStage(stage) {
  const value = normalizeReasoningStage(stage);
  const isDesign = value.startsWith("design-");
  const isConverge = value.endsWith("-converge");
  return {
    mode: isDesign ? "design" : "research",
    flow: isConverge ? "converge" : "diverge",
  };
}

export default function TopBar({
  stage = "research-diverge",
  onStageChange,
  projectTitle = "Thinking Machine",
  onProjectTitleChange,
  projectMetaHref = "/projects",
  projectMetaLabel = "Project workspace",
  canvasMode = "personal",
  onCanvasModeChange,
  drawerMode = "tip",
  onDrawerModeChange,
  isDrawerOpen = false,
}) {
  const { mode, flow } = parseStage(stage);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [draftTitle, setDraftTitle] = useState(projectTitle);

  useEffect(() => {
    setDraftTitle(projectTitle);
  }, [projectTitle]);

  const handleModeClick = (nextMode) => {
    if (!onStageChange) return;
    const nextStage = `${nextMode}-${flow}`;
    onStageChange(nextStage);
  };

  const handleFlowClick = (nextFlow) => {
    if (!onStageChange) return;
    const nextStage = `${mode}-${nextFlow}`;
    onStageChange(nextStage);
  };

  const isTipSelected = isDrawerOpen && drawerMode === "tip";
  const isChatSelected = isDrawerOpen && drawerMode === "chat";

  const commitTitle = () => {
    const nextTitle = draftTitle.trim() || "Untitled Project";
    setDraftTitle(nextTitle);
    onProjectTitleChange?.(nextTitle);
    setIsEditingTitle(false);
  };

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-[60] px-6 py-4">
      <div
        className="grid items-start"
        style={{ gridTemplateColumns: `${TOPBAR_SIDE_SLOT_WIDTH}px minmax(0, 1fr) ${TOPBAR_SIDE_SLOT_WIDTH}px` }}
      >
        <div className="pointer-events-auto flex w-[382px] justify-self-start pt-0.5">
          <motion.div
            layout
            className="flex w-full max-w-[420px] items-center gap-2 text-[14px] font-medium text-slate-700/88"
            style={TOPBAR_CENTER_TEXT_STYLE}
            transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
          >
              <Link
                href={projectMetaHref}
                className="inline-flex shrink-0 transition hover:text-slate-900"
                style={TOPBAR_CENTER_TEXT_STYLE}
              >
                {projectMetaLabel}
              </Link>
              <span className="text-slate-400/80">/</span>
              <div className="min-w-0 flex-1">
                {isEditingTitle ? (
                  <motion.input
                    layout="position"
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    onBlur={commitTitle}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        commitTitle();
                      }
                      if (event.key === "Escape") {
                        setDraftTitle(projectTitle || "Untitled Project");
                        setIsEditingTitle(false);
                      }
                    }}
                    autoFocus
                    className="w-full border-none bg-transparent px-0 py-0 text-[14px] font-medium text-slate-800 outline-none shadow-none"
                    style={TOPBAR_CENTER_TEXT_STYLE}
                    aria-label="Project title"
                    transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                  />
                ) : (
                  <motion.button
                    layout="position"
                    type="button"
                    onClick={() => setIsEditingTitle(true)}
                    className="max-w-full truncate text-left text-[14px] font-medium text-slate-700/88 transition hover:text-slate-900"
                    style={TOPBAR_CENTER_TEXT_STYLE}
                    aria-label="Edit project title"
                    title="Rename project"
                    transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                  >
                    {projectTitle || "Untitled Project"}
                  </motion.button>
                )}
              </div>
          </motion.div>
        </div>

        <div />

        <div className="w-[382px] translate-x-[7px] justify-self-end">
          <div className="flex flex-col items-end gap-3">
          <div className="pointer-events-auto flex w-full items-start justify-end">
            <div
              className="inline-flex h-[27px] w-[130px] items-center rounded-[25px] px-[3px] shadow-[0.5px_1px_5px_rgba(0,0,0,0.1)]"
              style={{ background: "#F6F6F2" }}
            >
              <button
                type="button"
                onClick={() => onCanvasModeChange?.("personal")}
                className="inline-flex h-[22px] w-[64px] items-center justify-center rounded-[25px] transition"
                style={{
                  background: canvasMode === "personal" ? "#7BA592" : "transparent",
                  fontFamily: '"Pretendard Variable", "Instrument Sans", sans-serif',
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "10.3838px",
                  lineHeight: "180%",
                  color: canvasMode === "personal" ? "#FFFFFF" : "#929B94",
                }}
              >
                Personal
              </button>
              <button
                type="button"
                onClick={() => onCanvasModeChange?.("team")}
                className="inline-flex h-[22px] w-[60px] items-center justify-center rounded-[25px] transition"
                style={{
                  background: canvasMode === "team" ? "#7BA592" : "transparent",
                  fontFamily: '"Pretendard Variable", "Instrument Sans", sans-serif',
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "10.3838px",
                  lineHeight: "180%",
                  color: canvasMode === "team" ? "#FFFFFF" : "#929B94",
                }}
              >
                Team
              </button>
            </div>
          </div>
          <div className="pointer-events-auto flex w-full translate-y-[5px] justify-end gap-2">
            <button
              type="button"
              onClick={() => onDrawerModeChange?.("tip")}
              className="inline-flex h-[44.75px] w-[44.75px] items-center justify-center rounded-full transition"
              style={{
                background: isTipSelected ? "linear-gradient(180deg, #3E5A8F 0%, #182338 100%)" : "#FFFFFF",
                border: isTipSelected ? "none" : "0.965264px solid #364E7B",
                color: isTipSelected ? "#FFFFFF" : "#2C4065",
                boxShadow: isTipSelected ? "0 6px 14px rgba(24,35,56,0.22)" : "none",
                fontFamily: '"Pretendard Variable", "Instrument Sans", sans-serif',
                fontWeight: 600,
                fontSize: "11.9258px",
                lineHeight: "180%",
                opacity: isTipSelected ? 1 : 0.88,
              }}
            >
              Tip
            </button>
            <button
              type="button"
              onClick={() => onDrawerModeChange?.("chat")}
              className="inline-flex h-[43.2px] w-[43.2px] items-center justify-center rounded-full transition"
              style={{
                background: isChatSelected ? "linear-gradient(180deg, #3E5A8F 0%, #182338 100%)" : "#FFFFFF",
                border: isChatSelected ? "none" : "0.965264px solid #364E7B",
                color: isChatSelected ? "#FFFFFF" : "#2C4065",
                boxShadow: isChatSelected ? "0 6px 14px rgba(24,35,56,0.22)" : "none",
                fontFamily: '"Pretendard Variable", "Instrument Sans", sans-serif',
                fontWeight: 600,
                fontSize: "11.5115px",
                lineHeight: "180%",
                opacity: isChatSelected ? 1 : 0.88,
              }}
            >
              Chat
            </button>
          </div>
          </div>
        </div>
      </div>
    </header>
  );
}
