"use client";

import { Card } from "@/components/ui/card";
import { HumanizedText } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useAction } from "next-safe-action/hooks";
import { humanizeTextForm } from "@/actions/humanize-text";
import { CircleCheck, Loader2, ThumbsUp, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface Score {
  human: number;
  gptzero: number;
  openai: number;
  writer: number;
  crossplag: number;
  copyleaks: number;
  sapling: number;
  contentatscale: number;
  zerogpt: number;
}

// Typeguard
function isScore(value: any): value is Score {
  return (
    typeof value === "object" &&
    value !== null &&
    "human" in value &&
    "gptzero" in value &&
    "openai" in value &&
    "writer" in value &&
    "crossplag" in value &&
    "copyleaks" in value &&
    "sapling" in value &&
    "contentatscale" in value &&
    "zerogpt" in value
  );
}

export default function DocumentList({
  documents,
}: {
  documents: HumanizedText[];
}) {
  const { execute, isExecuting } = useAction(humanizeTextForm);

  return (
    <Card className="mx-auto flex h-full w-full flex-col space-y-2 py-2">
      {documents?.map((document) => {
        const score = isScore(document.score)
          ? (document.score as Score)
          : null;
        return (
          <Dialog key={document.id}>
            <DialogTrigger asChild>
              <div
                key={document.id}
                className={cn(
                  "documents-center mx-4 cursor-pointer truncate rounded-md border border-solid border-gray-300 px-3 py-2 text-sm shadow-lg duration-300 hover:scale-105",
                  score && score.human >= 75 && "bg-green-700",
                  score &&
                    score.human <= 75 &&
                    score.human >= 51 &&
                    "bg-yellow-500 text-black",
                  score && score.human < 51 && "bg-red-500 text-white"
                )}
              >
                <p>{document.output}</p>
              </div>
            </DialogTrigger>
            <DialogContent className="flex h-auto flex-col space-y-4 sm:max-w-[900px]">
              <DialogTitle>Retest Text</DialogTitle>
              <DialogHeader className="m-0 flex h-auto w-full flex-row items-center justify-start space-x-20 px-0">
                <div className="flex flex-col">
                  <strong>READABILITY:</strong>
                  <p>{document.readability} </p>
                </div>
                <div className="flex flex-col">
                  <strong>PURPOSE:</strong> <p>{document.purpose} </p>
                </div>
                <div className="flex flex-col">
                  <strong>STRENGTH:</strong> <p>{document.strength}</p>
                </div>
                <div className="flex flex-col">
                  <strong>WORD COST:</strong> <p>{document.cost}</p>
                </div>
              </DialogHeader>
              <div className="h-auto">
                <div className="h-auto items-center">
                  <Label className="text-2xl font-bold" htmlFor="name">
                    Result
                  </Label>
                  <Textarea
                    id="name"
                    disabled
                    className="col-span-3 h-[150px] border-none pt-5 text-xl font-semibold text-white"
                    value={document.output!}
                  />
                </div>
              </div>
              <Separator />
              {score && (
                <div>
                  <h1>AI Detection Likelihood</h1>
                  <div className="my-0 flex flex-wrap items-center justify-center gap-2">
                    {Object.entries(score).map(([key, value]) => {
                      const numericalValue = Number(value); // Assert value as a number
                      return (
                        <div
                          key={key}
                          className={cn(
                            "flex items-center space-x-0.5 overflow-x-visible rounded-md p-1 text-lg"
                          )}
                        >
                          {75 <= numericalValue && (
                            <CircleCheck className="text-green-500" />
                          )}
                          {numericalValue < 75 && numericalValue >= 51 && (
                            <ThumbsUp className="text-yellow-500" />
                          )}
                          {numericalValue < 51 && (
                            <TriangleAlert className="text-red-500" />
                          )}
                          <span>{key.toUpperCase()}</span>
                        </div>
                      );
                    })}
                  </div>
                  <span className="flex space-x-3">
                    <h1>KEY</h1>
                    <span className="text-green-500">100% Human</span>
                    <span className="text-yellow-400">50% Human</span>
                    <span className="text-red-500">0% Human</span>
                  </span>
                </div>
              )}
              <div className="w-full rounded-md bg-slate-900 p-2">
                <h1 className="text-xl font-semibold">Original Submission:</h1>
                <p className="text-sm text-slate-400">{document.input}</p>
              </div>
              <DialogFooter className="justify-end">
                {isExecuting ? (
                  <Loader2 className="w-6" />
                ) : (
                  <Button
                    onClick={async () => {
                      const strengthValue = document.strength as
                        | "Quality"
                        | "Balanced"
                        | "More Human";
                      const readabilityValue = document.readability as
                        | "High School"
                        | "University"
                        | "Doctorate"
                        | "Journalist"
                        | "Marketing";
                      const purposeValue = document.purpose as
                        | "General Writing"
                        | "Essay"
                        | "Article"
                        | "Marketing Material"
                        | "Story"
                        | "Cover Letter"
                        | "Report"
                        | "Business Material"
                        | "Legal Material";

                      execute({
                        content: document.output!,
                        purpose: purposeValue,
                        strength: strengthValue,
                        readability: readabilityValue,
                        predecessorId: document.id,
                      });
                    }}
                    type="submit"
                  >
                    Retest Text
                  </Button>
                )}
              </DialogFooter>
              <div className="flex w-full items-center justify-between space-x-7">
                <p className="flex items-center text-sm">
                  Document ID:
                  <span className="rounded-md bg-slate-500 p-1">
                    {document.id}
                  </span>
                </p>
                {document.predecessorId && (
                  <p className="flex items-center">
                    Predecessor ID:
                    <span className="rounded-md bg-slate-500 p-1">
                      {document.predecessorId}
                    </span>
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </Card>
  );
}
