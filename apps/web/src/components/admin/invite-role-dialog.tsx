"use client";

import { useMutation, useQuery } from "convex/react";
import { Mail, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

type Role = "admin" | "staff" | "super_admin";

interface PendingInvite {
  _id: Id<"role_invites">;
  email: string;
  role: string;
  createdAt: number;
}

export function InviteRoleDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("staff");
  const [isLoading, setIsLoading] = useState(false);

  const inviteToRole = useMutation(api.profiles.inviteToRole);
  const revokeInvite = useMutation(api.profiles.revokeInvite);
  const pendingInvites = useQuery(api.profiles.getPendingInvites);
  const currentRole = useQuery(api.profiles.getRole);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error("Please enter an email address");
      return;
    }

    setIsLoading(true);
    try {
      await inviteToRole({ email: trimmedEmail, role });
      toast.success(`Invited ${trimmedEmail} as ${role}`);
      setEmail("");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send invite";
      toast.error(errorMessage);
    }
    setIsLoading(false);
  };

  const handleRevoke = async (inviteEmail: string) => {
    try {
      await revokeInvite({ email: inviteEmail });
      toast.success("Invite revoked");
    } catch {
      toast.error("Failed to revoke invite");
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="size-4" />
          Invite User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite User to Role</DialogTitle>
          <DialogDescription>
            Invite a user to a privileged role. They will receive the role when
            they next sign up or log in.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleInvite}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="invite-email">Email Address</Label>
            <Input
              className="h-10"
              id="invite-email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              type="email"
              value={email}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="invite-role">Role</Label>
            <Select
              onValueChange={(value: Role) => setRole(value)}
              value={role}
            >
              <SelectTrigger className="h-10" id="invite-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                {currentRole === "super_admin" && (
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="h-10 bg-primary-violet text-white hover:bg-primary-violet-700"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                Sending…
              </div>
            ) : (
              <>
                <Mail className="size-4" />
                Send Invite
              </>
            )}
          </Button>
        </form>

        {pendingInvites && pendingInvites.length > 0 && (
          <div className="flex flex-col gap-3 border-border border-t pt-4">
            <h4 className="font-medium text-foreground text-sm">
              Pending Invites
            </h4>
            <div className="flex flex-col gap-2">
              {pendingInvites.map((invite: PendingInvite) => (
                <div
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2"
                  key={invite._id}
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="font-medium text-foreground text-sm">
                      {invite.email}
                    </p>
                    <p className="text-muted-foreground text-xs capitalize">
                      {invite.role}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleRevoke(invite.email)}
                    size="icon"
                    variant="ghost"
                  >
                    <Trash2 className="size-4 text-error-red" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
