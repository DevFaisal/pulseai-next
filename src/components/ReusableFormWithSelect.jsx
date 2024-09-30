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

const ReusableFormWithSelect = ({ schema, inputs, onSubmit }) => {
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
                  {/* Render Input or Select based on input type */}
                  {input.type === "select" ? (
                    input.options && input.options.length > 0 ? (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={input.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {input.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        placeholder="No options available"
                        type="text"
                        disabled
                      />
                    )
                  ) : (
                    <Input
                      placeholder={input.placeholder}
                      type={input.type}
                      {...field}
                    />
                  )}
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

export default ReusableFormWithSelect;
