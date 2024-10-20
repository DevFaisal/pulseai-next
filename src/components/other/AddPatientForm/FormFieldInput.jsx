import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

export default function FormFieldInput({
  form,
  name,
  label,
  type,
  placeholder,
  options,
  min,
  max,
  step,
  disabled,
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "text" ||
            type === "email" ||
            type === "date" ||
            type === "number" ? (
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                disabled={disabled}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              />
            ) : type === "select" ? (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={disabled}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`Select ${label.toLowerCase()}`}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                {...field}
                disabled={disabled}
              />
            ) : type === "checkbox" ? (
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                />
                <span>{label}</span>
              </div>
            ) : type === "radio" ? (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {options.map((option) => (
                  <FormItem
                    key={option.value}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem
                        value={option.value}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            ) : type === "slider" ? (
              <Slider
                min={min}
                max={max}
                step={step}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                disabled={disabled}
              />
            ) : null}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
