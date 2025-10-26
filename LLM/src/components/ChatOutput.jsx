import React from "react";
import { useLLMOutput, throttleBasic } from "@llm-ui/react";
import { markdownLookBack } from "@llm-ui/markdown";
import MarkdownComponent from "./MarkdownComponent";

export default function ChatOutput({ llmOutput, isFinished }) {
  const { blockMatches } = useLLMOutput({
    llmOutput,
    isStreamFinished: isFinished,
    // fallback markdown renderer
    fallbackBlock: {
      component: ({ blockMatch }) => (
        <MarkdownComponent content={blockMatch.output} />
      ),
      lookBack: markdownLookBack(),
    },
    // no custom blocks to avoid shiki dependency
    blocks: [],
    throttle: throttleBasic({ targetBufferChars: 80 }),
  });

  return (
    <div className="space-y-4 m-2">
      {blockMatches.map((bm, i) => {
        const Comp = bm.block.component;
        return (
          <div key={i} className="  w-full max-w-full p-3 rounded-lg bg-zinc-800 text-zinc-300
            break-words whitespace-pre-wrap
            [&_pre]:whitespace-pre [&_pre]:overflow-x-auto [&_pre]:max-w-full
            [&_code]:whitespace-pre-wrap">
            <Comp blockMatch={bm} />
          </div>
        );
      })}
    </div>
  );
}