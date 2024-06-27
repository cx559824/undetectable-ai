"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  PURPOSE_VALUES,
  READABILITY_VALUES,
  STRENGTH_VALUES,
} from "@/zod-schemas";
import { HumanizeTextFormSchema } from "@/zod-schemas";
import { humanizeTextForm } from "@/actions/humanize-text";
import { Loader2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";

import { Separator } from "@/components/ui/separator";

export default function ClientForm() {
  const { execute, result, isExecuting } = useAction(humanizeTextForm);

  const [text, setText] = useState("");
  const minLength = 10;
  const maxLength = 250;
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const form = useForm<z.infer<typeof HumanizeTextFormSchema>>({
    resolver: zodResolver(HumanizeTextFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className='mx-auto h-full w-full space-y-3 overflow-x-hidden rounded-2xl border-2 border-gray-500 p-4'
        onSubmit={form.handleSubmit(async (data) => {
          execute(data);
          console.log(result);
        })}
      >
        <div className='grid w-full grid-cols-1 justify-start md:flex md:justify-between'>
          <div className='grid grid-cols-1 gap-y-1 md:flex md:flex-row md:gap-y-0 md:space-x-3'>
            <FormField
              control={form.control}
              name='readability'
              render={({ field }) => (
                <FormItem className='mt-0 flex items-center justify-center gap-3 space-y-0'>
                  <FormLabel>READABILITY</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={READABILITY_VALUES[0]}
                          defaultValue={READABILITY_VALUES[0]}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {READABILITY_VALUES.map((val) => (
                        <SelectItem key={val} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='purpose'
              render={({ field }) => (
                <FormItem className='mt-0 flex items-center justify-center gap-3 space-y-0'>
                  <FormLabel>PURPOSE</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={PURPOSE_VALUES[0]}
                          defaultValue={PURPOSE_VALUES[0]}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PURPOSE_VALUES.map((val) => (
                        <SelectItem key={val} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>Todo Word Count</div>
        </div>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Please Enter Text</FormLabel> */}
              <FormControl>
                <Textarea
                  placeholder='Enter text here with at least 50 characters'
                  className='h-40'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='relative'>
          <FormField
            control={form.control}
            name='strength'
            render={({ field }) => (
              <FormItem className='flex w-full justify-center space-y-3'>
                {/* ... other form elements */}
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-row space-x-2'
                  >
                    {STRENGTH_VALUES.map((val) => (
                      <div
                        key={val}
                        className='peer flex items-center space-x-3 space-y-0 rounded-full border-2 border-black p-2 dark:border-gray-400'
                      >
                        <FormItem className='peer:checked:bg-blue-500'>
                          <FormControl>
                            <RadioGroupItem value={val} />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {val === "Quality" ? "More Readable" : val}
                          </FormLabel>

                          {/* Background color applied only when checked */}
                        </FormItem>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex w-full justify-end'>
          {isExecuting ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <>
              <Button
                className='flex-end flex'
                type='submit'
                disabled={isExecuting}
              >
                Humanize Text
              </Button>
              <Button className='flex-end flex' type='submit'>
                Check for AI
              </Button>
            </>
          )}
        </div>
        <Separator />
      </form>
    </Form>
  );
}
