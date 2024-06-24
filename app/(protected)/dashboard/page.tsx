"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { useStateAction } from "next-safe-action/stateful-hooks";
import { useAction } from "next-safe-action/hooks";

import { Input } from "@/components/ui/input";
import { HumanizeTextFormSchema } from "@/zod-schemas";
import { humanizeTextForm } from "@/actions/humanize-text";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const { execute, result, status, isExecuting } = useAction(humanizeTextForm);

  const form = useForm<z.infer<typeof HumanizeTextFormSchema>>({
    resolver: zodResolver(HumanizeTextFormSchema),
    defaultValues: {
      humanizeText: result.data?.humanizeText || "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className='px-56 py-4'>
      <Form {...form}>
        <form
          ref={formRef}
          className='space-y-3'
          onSubmit={form.handleSubmit(async (data) => {
            execute(data);
          })}
        >
          <FormField
            control={form.control}
            name='humanizeText'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please Enter Text</FormLabel>
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
          <Button type='submit' disabled={isExecuting}>
            Humanize Text
          </Button>
        </form>
      </Form>
    </div>
  );
}
