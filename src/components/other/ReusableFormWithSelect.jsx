import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LoadingButton } from "./LoadingButton";

const ReusableFormWithSelect = ({ schema, inputs, onSubmit }) => {
  const defaultValues = Object.fromEntries(
    Object.keys(inputs).map((key) => [key, inputs[key].defaultValue || ""])
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(inputs).map(([key, input]) => (
            <FormField
              key={key}
              control={form.control}
              name={key}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    {input.type === "select" ? (
                      input?.options?.length > 0 ? (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={input.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {input?.options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input placeholder="No options available" disabled />
                      )
                    ) : (
                      <Input
                        type={input.type}
                        placeholder={input.placeholder}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div>
          <LoadingButton
            type="submit"
            isLoading={form.formState.isSubmitting}
            name="Save"
            loadingText="Saving..."
          />
        </div>
      </form>
    </Form>
  );
};

export default ReusableFormWithSelect;
