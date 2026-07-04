"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "./navigation"
import { ModeToggle } from "@/components/mode-toggle"

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - fixa */}
      <aside className="fixed top-0 left-0 z-20 flex h-screen w-64 flex-col gap-6 overflow-y-auto border-r bg-sidebar p-6 text-sidebar-foreground">
        <div className="flex items-center justify-between">
          <Link href="/styleguide" className="text-xl font-bold">
            Design System
          </Link>
          <ModeToggle />
        </div>

        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Conteúdo principal - deslocado pela largura da sidebar */}
      <main className="ml-64 flex-1 overflow-auto">{children}</main>
    </div>
  )
}
