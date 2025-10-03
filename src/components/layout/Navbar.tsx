"use client";
import { Heart, MenuIcon, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { useCart } from "@/context/CartContext";
import { useWihlist } from "@/context/WishlistContext";
const links = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/categories", label: "Categories" },
  { path: "/brands", label: "Brands" },
  // { path: "/allorders", label: "Orders" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { status } = useSession();
  const { cartDetails } = useCart();
  const { wishlistDetails } = useWihlist();

  return (
    <section className="py-4 px-10 lg:px-40  bg-white sticky top-0 z-50">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {links.map((link, idx) => (
                <NavigationMenuItem key={idx}>
                  <Link
                    href={link.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      link.path === pathname && "!text-red-500 underline"
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
              {status === "authenticated" && (
                <NavigationMenuItem>
                  <Link
                    href={"/allorders"}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/allorders" && "!text-red-500 underline"
                    )}
                  >
                    Orders
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "loading" ? (
              <>loading...</>
            ) : status === "unauthenticated" ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <Link href="/wishlist" className="mr-2 relative">
                    {wishlistDetails && (
                      <Badge
                        className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                        variant="destructive"
                      >
                        {wishlistDetails?.data?.count}
                      </Badge>
                    )}
                    <Tooltip>
                      <TooltipTrigger>
                        <Heart className="size-8 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Wishlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                  <Link href="/cart" className="mr-2 relative">
                    {cartDetails && (
                      <Badge
                        className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                        variant="destructive"
                      >
                        {cartDetails.numOfCartItems}
                      </Badge>
                    )}
                    <Tooltip>
                      <TooltipTrigger>
                        <ShoppingCart className="size-8 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cart</p>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* <Button variant="outline"> */}
                      <User className="size-8 cursor-pointer" />
                      {/* </Button> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/change-password" className="mr-2">
                          Change Password
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="cursor-pointer"
                      >
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      Exclusive
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.path}
                      className={cn(
                        "font-medium",
                        link.path === pathname && "!text-red-500 underline"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {status === "authenticated" && (
                    // <NavigationMenuItem>
                    <Link
                      href={"/allorders"}
                      className={cn(
                        "font-medium",
                        pathname === "/allorders" && "!text-red-500 underline"
                      )}
                    >
                      Orders
                    </Link>
                    // </NavigationMenuItem>
                  )}
                </div>
                <div className="flex justify-center items-center gap-4 lg:flex">
                  {status === "loading" ? (
                    <>loading...</>
                  ) : status === "unauthenticated" ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign up</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-4">
                        <Link href="/wishlist" className="mr-2 relative">
                          {wishlistDetails && (
                            <Badge
                              className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                              variant="destructive"
                            >
                              {wishlistDetails?.data?.count}
                            </Badge>
                          )}
                          <Tooltip>
                            <TooltipTrigger>
                              <Heart className="size-8 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Wishlist</p>
                            </TooltipContent>
                          </Tooltip>
                        </Link>
                        <Link href="/cart" className="mr-2 relative">
                          {cartDetails && (
                            <Badge
                              className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                              variant="destructive"
                            >
                              {cartDetails.numOfCartItems}
                            </Badge>
                          )}
                          <Tooltip>
                            <TooltipTrigger>
                              <ShoppingCart className="size-8 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cart</p>
                            </TooltipContent>
                          </Tooltip>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            {/* <Button variant="outline"> */}
                            <User className="size-8 cursor-pointer" />
                            {/* </Button> */}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href="/change-password" className="mr-2">
                                Change Password
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => signOut({ callbackUrl: "/login" })}
                              className="cursor-pointer"
                            >
                              Sign out
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
        {/* <Breadcrumb /> */}
      </div>
    </section>
  );
};

export { Navbar };
