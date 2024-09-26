"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ReusableForm = ({ schema, inputs, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: Object.keys(inputs).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {}),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {Object.entries(inputs).map(([key, input]) => (
          <FormField
            key={key}
            control={form.control}
            name={key}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={input.placeholder}
                    type={input.type}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ReusableForm;
