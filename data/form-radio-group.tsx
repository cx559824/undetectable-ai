// "use client";
//
// import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
// import { Info } from "lucide-react";
// import type { ComponentPropsWithoutRef, ElementRef } from "react";
// import { forwardRef } from "react";
//
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import type { ModalText } from "@/lib/types/shared/shared-data-type";
// import { cn } from "@/lib/utils";
//
// import { Label } from "./label";
// import { Separator } from "./separator";
//
// const FormRadioGroup = forwardRef<
//   ElementRef<typeof RadioGroupPrimitive.Root>,
//   ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
// >(({ className, ...props }, ref) => {
//   return (
//     <RadioGroupPrimitive.Root
//       className={cn("grid gap-2", className)}
//       {...props}
//       ref={ref}
//     />
//   );
// });
// FormRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
//
// const FormRadioGroupItem = forwardRef<
//   ElementRef<typeof RadioGroupPrimitive.Item>,
//   {
//     label: string;
//     modalContents: ModalText;
//   } & ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
// >(({ className, label, modalContents, ...props }, ref) => {
//   return (
//     <RadioGroupPrimitive.Item
//       ref={ref}
//       className={cn(
//         "light relative mx-auto flex h-full w-auto cursor-pointer items-center gap-x-2 rounded-full border border-primary px-2 py-1 text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:text-primary-foreground dark:border-white dark:text-white data-[state=checked]:dark:text-black",
//         className
//       )}
//       {...props}
//     >
//       <Label className="relative flex w-auto text-xs">
//         {label?.toUpperCase()}
//       </Label>
//       <Dialog>
//         <DialogTrigger asChild>
//           <Info className="xs:hidden mr-auto h-4 font-bold" />
//         </DialogTrigger>
//         <DialogContent className="mx-auto flex min-h-[280px] min-w-[320px] max-w-[500px] flex-col justify-start overflow-y-auto p-7">
//           <DialogHeader>
//             <DialogTitle className="w-full text-center text-2xl font-bold">
//               {modalContents?.title}
//             </DialogTitle>
//           </DialogHeader>
//           <Separator className="dark" />
//           {modalContents?.headerAndDescription?.map((value) => (
//             <span key={value.header} className="py-2">
//               <h1 className="mx-auto flex w-full items-center justify-center gap-2 text-center text-xl font-bold">
//                 {value.header === "Quality"
//                   ? "More Readable".toUpperCase()
//                   : value.header.toUpperCase()}
//               </h1>
//               <p className="txt-lg whitespace-nowrap text-center">
//                 {value.description}
//               </p>
//             </span>
//           ))}
//         </DialogContent>
//       </Dialog>
//     </RadioGroupPrimitive.Item>
//   );
// });
// FormRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
//
// export { FormRadioGroup, FormRadioGroupItem };
