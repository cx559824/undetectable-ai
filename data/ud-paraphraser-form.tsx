// "use client";
//
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Bot, Clipboard } from "lucide-react";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useAction } from "next-safe-action/hooks";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Tooltip } from "react-tooltip";
// import type { z } from "zod";
//
// import { paraphraseTextForm } from "@/actions/paraphrase-text";
// import { showToast } from "@/app/utils/toast";
// import animationlogo from "@/assets/home/waiting_for_output.gif";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   FormRadioGroup,
//   FormRadioGroupItem,
// } from "@/components/ui/form-radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import type { HomePage } from "@/lib/types/home";
// import { cn, countWords } from "@/lib/utils";
// import { useTextInputDetectorStore } from "@/store/text-input-detector-store";
// import {
//   DocumentSchema,
//   PURPOSE_VALUES,
//   READABILITY_VALUES,
//   STRENGTH_VALUES,
// } from "@/zod-schemas";
//
// import { sampleText } from "./sample-text";
// import UDButton from "../Common/ud-button";
// import ThemeButton from "../home/theme-button";
// import { Label } from "../ui/label";
//
// export default function ParaphraserForm({ data }: { data: HomePage }) {
//   const formContent = data?.attributes.heroSection;
//   const { text, setText } = useTextInputDetectorStore();
//   const { execute } = useAction(paraphraseTextForm); //  destructure result to get result from server action: const { execute, result } = useAction(paraphraseTextForm);
//   const [hovered, setHovered] = useState(false);
//   const session = useSession();
//
//   const form = useForm<z.infer<typeof DocumentSchema>>({
//     resolver: zodResolver(DocumentSchema),
//     defaultValues: {
//       content: text,
//       readability: READABILITY_VALUES[0],
//       purpose: PURPOSE_VALUES[0],
//       strength: STRENGTH_VALUES[0],
//     },
//   });
//
//   const handlePasteText = () => {
//     navigator.clipboard
//       .readText()
//       .then((text) => {
//         form.setValue("content", text);
//       })
//       .catch(() => {
//         showToast("error", "Failed to paste text");
//       });
//   };
//
//   // Update form value when the Zustand store text changes
//   useEffect(() => {
//     form.setValue("content", text);
//   }, [text, form]);
//
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit((values) => {
//           execute(values);
//           // console.log(result.data?.result);
//         })}
//         className="mb-10 flex w-full flex-col items-center justify-center gap-y-2.5 self-center px-1.5 max-md:w-full md:px-[15px] lg:w-[995px]"
//       >
//         <div className="border-translucentNavy bg-darkSapphire my-5 mb-2.5 mt-10 flex min-h-24 w-full flex-col rounded-[16px] border border-solid max-md:mr-0 max-md:mt-10 max-md:max-w-full lg:w-[965px]">
//           <div className="flex flex-col">
//             <div className="mb-5">
//               <div
//                 className={cn(
//                   "bg-dark-navy flex h-auto w-full flex-col rounded-[16px] pt-5 text-white max-md:max-w-full",
//                   session.data?.user && "p-0.5"
//                 )}
//               >
//                 {session.data?.user && (
//                   <span className="flex-center my-3 flex w-full flex-col items-center space-y-4 sm:mx-auto sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 sm:px-4">
//                     <FormField
//                       control={form.control}
//                       name="readability"
//                       render={({ field }) => (
//                         <FormItem className="mt-0 flex items-center justify-between gap-3 space-y-0">
//                           <FormLabel className="font-bold">
//                             {formContent?.readabilityLabel}
//                           </FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger className="h-6 rounded-full bg-transparent text-center">
//                                 <SelectValue
//                                   placeholder={READABILITY_VALUES[0]}
//                                   defaultValue={READABILITY_VALUES[0]}
//                                 />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               {formContent.readabilitySelectPlaceholders.map(
//                                 (val) => (
//                                   <SelectItem
//                                     key={val.selectPlaceHolders}
//                                     value={val.selectPlaceHolders}
//                                     defaultValue={val.selectPlaceHolders}
//                                   >
//                                     {val.selectPlaceHolders}
//                                   </SelectItem>
//                                 )
//                               )}
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="purpose"
//                       render={({ field }) => (
//                         <FormItem className="mt-0 flex items-center justify-between gap-3 space-y-0">
//                           <FormLabel className="font-bold">
//                             {formContent?.purposeLabel}
//                           </FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger className="h-6 rounded-full bg-transparent text-center">
//                                 <SelectValue
//                                   placeholder={PURPOSE_VALUES[0]}
//                                   defaultValue={PURPOSE_VALUES[0]}
//                                 />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               {formContent?.purposeSelectPlaceholders.map(
//                                 (val) => (
//                                   <SelectItem
//                                     key={val.purposeSelectPlaceholder}
//                                     value={val.purposeSelectPlaceholder}
//                                     defaultValue={val.purposeSelectPlaceholder}
//                                   >
//                                     {val.purposeSelectPlaceholder}
//                                   </SelectItem>
//                                 )
//                               )}
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <p className="text text-sm font-semibold leading-3 text-gray-400 sm:mr-auto sm:flex sm:w-full sm:justify-end">
//                       {form.watch("content").length}/15000{" "}
//                       {formContent?.characterCountLabel} ≈{" "}
//                       {countWords(form.watch("content"))}{" "}
//                       {countWords(form.watch("content")) > 1 ? "WORDS" : "WORD"}
//                     </p>
//                   </span>
//                 )}
//                 <FormField
//                   control={form.control}
//                   name="content"
//                   render={({ field }) => (
//                     <FormItem className="relative">
//                       <div
//                         className={cn(
//                           "absolute inset-0 m-auto flex w-full flex-col items-center justify-center self-center text-black",
//                           (form.watch("content").length > 0 ||
//                             form.getFieldState("content").isTouched) &&
//                             "hidden"
//                         )}
//                       >
//                         <div className="text-dark-navy text-center text-base dark:text-white md:w-full">
//                           <div className="flex w-full flex-row justify-center gap-[6px] self-center font-bold max-md:flex-col">
//                             <div
//                               className="flex w-full max-w-[115px] flex-col self-center duration-300 hover:scale-105"
//                               onClick={() =>
//                                 form.setValue("content", sampleText)
//                               }
//                             >
//                               <span className="border-dark-navy text-dark-navy flex h-24 min-h-20 cursor-pointer flex-col justify-center gap-y-[6px] rounded-[10px] border border-solid p-2.5 text-center dark:border-white dark:text-white max-lg:mt-2.5">
//                                 <Bot className="w-full" />
//                                 <div className="self-center text-xs">
//                                   Paste AI Text
//                                 </div>
//                               </span>
//                             </div>
//                             <div
//                               className="flex w-full max-w-[115px] flex-col self-center duration-300 hover:scale-105"
//                               onClick={handlePasteText}
//                             >
//                               <span className="border-dark-navy text-dark-navy flex h-24 min-h-20 cursor-pointer flex-col justify-center gap-y-[6px] rounded-[10px] border border-solid p-2.5 text-center dark:border-white dark:text-white max-lg:mt-2.5">
//                                 <Clipboard className="w-full" />
//                                 <div className="self-center text-xs">
//                                   Paste Your Text
//                                 </div>
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <FormControl>
//                         <Textarea
//                           placeholder="PASTE YOUR TEXT HERE"
//                           className="h-52 resize-none rounded-none border-none text-black dark:text-white"
//                           {...field}
//                           onChange={(e) => {
//                             field.onChange(e);
//                             setText(e.target.value);
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <div className="mx-3 my-2.5 flex w-full items-center max-lg:mr-2.5 max-lg:px-2 max-md:flex-wrap lg:px-5">
//                   <div className="mx-auto flex w-full justify-between md:flex-grow-0 md:space-x-6">
//                     <div className="flex items-center">
//                       <Image
//                         loading="lazy"
//                         src={animationlogo}
//                         alt="animationlogo"
//                         width={24}
//                         height={24}
//                         className="my-auto mr-2.5 h-5 w-5"
//                       />
//                       <p className="my-auto items-center text-left text-xs font-semibold leading-3 text-white">
//                         {formContent?.waitingInputText
//                           .split(" ")
//                           .slice(0, 2)
//                           .join(" ")}
//                         <br />
//                         {formContent?.waitingInputText
//                           .split(" ")
//                           .slice(2)
//                           .join(" ")}
//                       </p>
//                     </div>
//                     <FormField
//                       control={form.control}
//                       name="strength"
//                       render={({ field }) => (
//                         <FormItem className="flex items-center">
//                           <FormLabel hidden>Readability</FormLabel>
//                           <FormControl>
//                             <FormRadioGroup
//                               onValueChange={field.onChange}
//                               defaultValue={field.value}
//                               className="hidden flex-grow items-center justify-center text-center md:flex"
//                             >
//                               {formContent?.radioGroupText?.map((val) => (
//                                 <FormItem key={val.text}>
//                                   <FormLabel hidden className="font-normal">
//                                     {val.text}
//                                   </FormLabel>
//                                   <FormControl>
//                                     <FormRadioGroupItem
//                                       modalContents={formContent.modalText}
//                                       label={
//                                         val.text === "Quality"
//                                           ? "More Readable"
//                                           : val.text
//                                       }
//                                       value={val.text}
//                                     />
//                                   </FormControl>
//                                 </FormItem>
//                               ))}
//                             </FormRadioGroup>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <div className="flex items-center justify-end">
//                       <ThemeButton className="flex-end ml-auto mr-2 flex" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//
//             <div className="mb-5 flex max-w-full justify-center gap-2.5 px-2.5 max-md:mr-2.5 max-md:flex-wrap lg:justify-end">
//               <div className="">
//                 <Tooltip
//                   id="checkForAI-tooltip"
//                   place="top"
//                   className="border-sunflower absolute z-10 -mt-4 border"
//                   style={{
//                     display: "flex",
//                     justifyItems: "start",
//                     alignItems: "start",
//                     backgroundColor: "rgb(23 23 23)",
//                     color: "#E9C979",
//                     padding: "10px",
//                     width: "auto",
//                     borderRadius: "12px",
//                   }}
//                 >
//                   <p className="w-full text-sm font-bold">
//                     {formContent?.tooltipText}
//                   </p>
//                 </Tooltip>
//               </div>
//               <div className="flex w-full items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="terms"
//                     className="border-black bg-gray-400 text-black"
//                     checked={true}
//                   />
//                   <Label
//                     htmlFor="terms"
//                     className="text-xs font-semibold text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                   >
//                     {formContent && formContent.termsOfServiceText
//                       ? formContent.termsOfServiceText
//                           .split(" ")
//                           .map((word, i, arr) =>
//                             i === 7
//                               ? [<br key={i} />, word]
//                               : i !== arr.length - 1
//                                 ? [word, " "]
//                                 : word
//                           )
//                       : null}{" "}
//                   </Label>
//                 </div>
//                 <UDButton
//                   type="submit"
//                   data-tooltip-id="humanize-tooltip"
//                   className={cn(
//                     "border-darkNight bg-darkNight justify-end rounded-[20px] border border-solid px-[15px] py-2.5 text-sm text-white duration-300",
//                     hovered &&
//                       form.watch("content") === "" &&
//                       "border-none bg-red-500",
//                     form.watch("content") !== "" &&
//                       "border-none bg-green-400 text-white"
//                   )}
//                   onMouseEnter={() => setHovered(true)}
//                   onMouseLeave={() => setHovered(false)}
//                 >
//                   {hovered && form.watch("content") === ""
//                     ? "PLEASE INPUT YOUR TEXT ABOVE"
//                     : "PARAPHRASE"}
//                 </UDButton>
//                 <Tooltip
//                   id="humanize-tooltip"
//                   place="top-end"
//                   className="border-sunflower absolute z-10 -mt-4 border"
//                   style={{
//                     display: "flex",
//                     justifyItems: "start",
//                     alignItems: "start",
//                     backgroundColor: "rgb(23 23 23)",
//                     color: "#E9C979",
//                     padding: "10px",
//                     width: "auto",
//                     borderRadius: "12px",
//                   }}
//                 >
//                   <p className="w-full text-sm font-bold">
//                     {formContent.tooltipText}
//                   </p>
//                 </Tooltip>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// }
