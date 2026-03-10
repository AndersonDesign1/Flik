"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SPRING_PHYSICS } from "@/lib/design-system";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen space-y-24 bg-background p-12 text-foreground">
      {/* Header */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        transition={SPRING_PHYSICS.slow}
      >
        <h1 className="font-semibold text-4xl tracking-tight">Design System</h1>
        <p className="text-lg text-muted-foreground">
          Foundation for property-dey.
        </p>
      </motion.div>

      {/* Core Components (Stage 2) */}
      <section className="space-y-8">
        <h2 className="font-mono text-muted-foreground text-sm uppercase tracking-wider">
          Core Components & Primitives
        </h2>

        {/* Buttons */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm">Buttons & Badges</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button>Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="glass">Glass Variant</Button>
          </div>
          <div className="flex gap-4">
            <Badge>Default Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        {/* Inputs */}
        <div className="max-w-md space-y-4">
          <h3 className="font-medium text-sm">Inputs</h3>
          <div className="grid gap-4">
            <Input placeholder="Default input..." />
            <Input disabled placeholder="Disabled input..." />
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-2xl space-y-4">
          <h3 className="font-medium text-sm">Surfaces</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Glass Card (Default)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  This card uses the default glass styles with subtle borders.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="sm">
                  Action
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none bg-card/100 shadow-md">
              <CardHeader>
                <CardTitle>Opaque Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  An opaque variant if needed for overriding glass.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-8">
        <h2 className="font-mono text-muted-foreground text-sm uppercase tracking-wider">
          Colors (oklch)
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <ColorCard
            className="border border-border bg-background"
            label="Background"
          />
          <ColorCard className="border border-border bg-card" label="Card" />
          <ColorCard
            className="bg-primary text-primary-foreground"
            label="Primary"
          />
          <ColorCard
            className="bg-secondary text-secondary-foreground"
            label="Secondary"
          />
          <ColorCard className="bg-muted text-muted-foreground" label="Muted" />
          <ColorCard
            className="bg-accent text-accent-foreground"
            label="Accent"
          />
          <ColorCard
            className="border border-border bg-transparent"
            label="Border"
          />
          <ColorCard
            className="border border-input bg-transparent"
            label="Input"
          />
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-8">
        <h2 className="font-mono text-muted-foreground text-sm uppercase tracking-wider">
          Typography (Geist)
        </h2>
        <div className="space-y-6 border-border border-l-2 pl-6">
          <div className="space-y-2">
            <span className="text-muted-foreground text-xs">Display</span>
            <h1 className="font-bold text-5xl tracking-tight">
              The quick brown fox
            </h1>
          </div>
          <div className="space-y-2">
            <span className="text-muted-foreground text-xs">Heading 2</span>
            <h2 className="font-semibold text-3xl tracking-tight">
              The quick brown fox
            </h2>
          </div>
          <div className="space-y-2">
            <span className="text-muted-foreground text-xs">Body</span>
            <p className="max-w-prose text-base leading-relaxed">
              The quick brown fox jumps over the lazy dog. Design is not just
              what it looks like and feels like. Design is how it works. Good
              design is barely noticeable.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-muted-foreground text-xs">
              Caption / Mono
            </span>
            <p className="font-mono text-muted-foreground text-sm">
              src/components/design-system.tsx
            </p>
          </div>
        </div>
      </section>

      {/* Physics / Motion */}
      <section className="space-y-8">
        <h2 className="font-mono text-muted-foreground text-sm uppercase tracking-wider">
          Physics & Interaction
        </h2>
        <div className="flex flex-wrap gap-8">
          {/* Hover Spring */}
          <motion.div
            className="cursor-pointer rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground"
            transition={SPRING_PHYSICS.fast}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pure Motion Box
          </motion.div>

          {/* Glass Card */}
          <motion.div
            className="glass flex h-32 w-64 items-center justify-center rounded-xl p-6 font-medium text-sm"
            transition={SPRING_PHYSICS.default}
            whileHover={{ y: -5 }}
          >
            Spring Glass Card
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ColorCard({ label, className }: { label: string; className: string }) {
  return (
    <div className={`flex h-32 items-end rounded-lg p-4 ${className}`}>
      <span className="font-mono text-xs opacity-80">{label}</span>
    </div>
  );
}
