"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function AppBreadcrumb({ items = [] }) {
  // Ensure "Home" always appears first
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    ...items,
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index > 0 && <BreadcrumbSeparator />}

            {index === breadcrumbItems.length - 1 ? (
              <BreadcrumbPage className=" font-medium">
                {item.label}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink
                href={item.href}
                className="transition-colors"
              >
                {item.label}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
