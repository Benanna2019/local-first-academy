import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { validateEmail } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
const formSchema = z.object({
  email: z.string().email(),
});

export function ConvertKitForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();

  // 2. Define a submit handler.
  async function onSubmit(formInputs: z.infer<typeof formSchema>) {
    const email = formInputs.email;

    // email exists
    if (!email) {
      return toast({
        title: "Please provide an email address",
        variant: "destructive",
      });
    }

    // validate email
    if (!validateEmail((email as string).trim())) {
      return toast({
        title: "Please provide a valid email address",
        variant: "destructive",
      });
    }

    try {
      const res = await fetch("/api/subscribe.json", {
        method: "POST",
        body: JSON.stringify(formInputs),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Yikes!");
      }

      const successMessage = await res.json();

      toast({
        title: successMessage.message,
      });

      form.reset();
    } catch (e) {
      toast({
        title: "There was a problem subscribing you. Please try again.",
        variant: "destructive",
      });
      if (e instanceof Error) {
        return console.error(e.message);
      }
      console.error(e);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 pt-8">
                <FormControl>
                  <Input
                    className="border-black rounded-none h-12 text-lg placeholder:text-lg"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full h-12 text-lg rounded-none" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
