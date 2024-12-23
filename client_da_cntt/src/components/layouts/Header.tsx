"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  AlignJustify,
  BadgeDollarSign,
  BriefcaseBusiness,
  Car,
  ChevronDown,
  Heart,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Repeat,
  Search,
  User,
  UserPlus,
  Users,
} from "lucide-react";

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
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/common/ModeToggle";
import DropdownMenuTriggerCustom from "@/components/customize/DropdownMenuTriggerCustom";

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
import WrapperContent from "@/components/common/WrapperContent";
const formSchema = z.object({
  username: z.string(),
});

export default function Header() {
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
    <WrapperContent>
      <header className="lg:block relative ml-auto mr-auto py-2">
        <div className="flex items-center pb-1">
          <div className="">
            <a href="home-v1.html" className="custom-logo-link" rel="home">
              <Image
                src="https://suno.vn/blog/wp-content/uploads/2014/12/nike-lich-su-thiet-ke-logo.jpg"
                alt="Logo"
                width={100}
                height={50}
              />
            </a>
          </div>

          {/* middle menu */}
          <ul className="flex items-center gap-14 uppercase mx-auto">
            <li className="leading-2 pl-0 inline-block font-medium ">
              <Link title="Super deals" href="product-category.html">
                Super deals
              </Link>
            </li>

            <DropdownMenu>
              <DropdownMenuTriggerCustom className="outline-none flex items-center justify-center gap-1 uppercase">
                <span>Mother day</span>
                <ChevronDown></ChevronDown>
              </DropdownMenuTriggerCustom>

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
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTriggerCustom className="outline-none flex items-center justify-center gap-1 uppercase">
                <span>Super deals</span>
                <ChevronDown></ChevronDown>
              </DropdownMenuTriggerCustom>
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
          </ul>
          {/* middle menu */}

          <ul className="ml-auto flex items-center justify-center gap-5 text-sm font-light">
            <li className="">
              <Link href="#" className="flex items-center justify-center gap-1">
                <Car />
                <span>Car</span>
              </Link>
            </li>
            <li className="border-l border-gray-300 pl-4">
              <DropdownMenu>
                <DropdownMenuTriggerCustom className="outline-none flex items-center justify-center gap-1">
                  <BadgeDollarSign />
                  <span>Dolar (USD)</span>
                  <ChevronDown></ChevronDown>
                </DropdownMenuTriggerCustom>
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
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="border-l border-gray-300 pl-4">
              <Link href="#" className="flex items-center justify-center gap-1">
                <User />
                <span>Register or Sign in</span>
              </Link>
            </li>
            <li className="border-l border-gray-300 pl-4">
              <ModeToggle />
            </li>
          </ul>
        </div>
        {/* bottom header */}
        {/* bottom header */}
        {/* bottom header */}
        <div className="flex items-center justify-center gap-5">
          <DropdownMenu>
            <DropdownMenuTriggerCustom className="outline-none flex items-center justify-center gap-2 border-solid border-2 p-4 rounded-sm">
              <AlignJustify />
              <span>All deparments</span>
              <ChevronDown></ChevronDown>
            </DropdownMenuTriggerCustom>
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
                    <DropdownMenuTriggerCustom className="outline-none flex items-center justify-center gap-1">
                      <span className="flex flex-shrink-0">TIm kiem</span>
                      <ChevronDown></ChevronDown>
                    </DropdownMenuTriggerCustom>
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

          <div className="flex items-center gap-10 flex-shrink-0">
            <div className="flex items-center gap-4 justify-center">
              <Repeat />
              <span>3</span>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <Heart />
              <span>3</span>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <DropdownMenu>
                <DropdownMenuTriggerCustom className="outline-none flex items-center justify-center gap-2">
                  <BriefcaseBusiness />
                  <span className="">3</span>
                  <div className="">
                    <span>Your car</span>
                  </div>
                </DropdownMenuTriggerCustom>

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
          </div>
        </div>
      </header>
    </WrapperContent>
  );
}
