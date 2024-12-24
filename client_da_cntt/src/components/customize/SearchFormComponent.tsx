"use client";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
const formSchema = z.object({
  username: z.string(),
});
export default function SearchFormComponent() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-center gap-2 lg:basis-0 lg:grow max-w-full  mb-0 ml-10 border-2 rounded-sm flex-grow basis-0"
        autoComplete="off"
      >
        <div className="relative flex w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex w-full relative">
                <FormControl>
                  <Input
                    placeholder="Enter search..."
                    {...field}
                    className="focus:outline-none border-none border-transparent bg-white shadow-none p-7 border rounded-tl-[5px] rounded-bl-[5px] border-r-0 flex flex-col justify-center"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="2xl:pr-16 bg-transparent flex flex-shrink-0 border-l border-gray-300 pl-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none flex items-center justify-center gap-1">
                <span className="flex flex-shrink-0">TIm kiem</span>
                <ChevronDown></ChevronDown>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Profile</span>
                  </DropdownMenuItem>{" "}
                  <DropdownMenuItem>
                    <span>Profile</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Users />
                    <span>Team</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Plus />
                    <span>New Team</span>
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative whitespace-nowrap align-middle flex flex-col justify-center">
            <Input type="hidden" />
            <Button
              type="submit"
              className="z-10 ml-[-1px] relative flex-1 font-medium bg-slate-600 text-white px-10 rounded-sm"
            >
              <Search className="2xl:hidden" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
