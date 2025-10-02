import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbDemo() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // Remove empty segments

  // Handle special cases for login and register
  if (pathname === "/login" || pathname === "/register") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              {pathname === "/login" ? "Login" : "Register"}
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {segments.map((segment, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink asChild>
              <Link href={`/${segments.slice(0, index + 1).join("/")}`}>
                {segment.length > 20 ? "Product Details" : segment}
              </Link>
            </BreadcrumbLink>
            {index < segments.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
